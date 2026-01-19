import * as THREE from "three";
import { WORLD_CONFIG } from "@config/world";

import { BUILDING_LAYOUT, createBuilding } from "@entities/Building";
import { Car } from "@entities/Car";
import { createProceduralTexture, createBillboardTexture } from "@utils/textures";
import { localToWorldXZ, worldToLocalXZ } from "@utils/math";
import { TerrainManager } from "./TerrainManager";

const FUNNY_PLATES = [
    "КОТ-404",
    "МЯУ-007",
    "РЫБА",
    "С0Н",
    "ТЫГДЫК",
    "ЛАПКИ",
    "МУР",
    "КУСЬ",
    "ШЕРСТЬ",
    "ЖРАТЬ"
];

export type Collider = {
    position: { x: number; z: number };
    half: { x: number; z: number };
    rotation: number;
    type: "building" | "tree" | "lamp"; // 'tree' colliders also managed here? No, 'tree' colliders are from nature. But 'building' are here.
    // Actually World aggregates colliding objects. 
    // If BuildingManager manages buildings, it generates building colliders.
    // NatureManager (future) will generate tree colliders.
    // World needs to collect all of them.
};

export type DoorState = {
    mesh: THREE.Object3D;
    position: { x: number; z: number };
    rotation: number;
    open: number; // 0 closed, 1 open
    label?: string;
};

export type RoadInfo = {
    road: (typeof WORLD_CONFIG.roads)[number];
    worldOnRoad: { x: number; z: number };
    localOnRoad: { x: number; z: number };
    distance2: number;
};

export type ParkedCarInfo = {
    car: Car;
    object: THREE.Object3D;
    radius: number;
    doorOpen: boolean;
};

export type ParkingLayout = {
    buildingIndex: number;
    center: { x: number; z: number };
    rotation: number;
    totalW: number;
    totalD: number;
    rows: number;
    spots: number;
    spotsRowA: number;
    spotsRowB: number;
    rowCentersLocalZ: number[];
    aisleCenterZ: number;
    roadForLot: RoadInfo | null;
};

export class BuildingManager {
    public readonly group = new THREE.Group();

    // Public state for World/Interaction
    public readonly colliders: Collider[] = [];
    public readonly doors: DoorState[] = [];
    public mtsShopDoor?: { x: number; z: number };
    public readonly parkedCars: ParkedCarInfo[] = [];

    private readonly parkingLayouts: ParkingLayout[] = [];

    // Textures
    public readonly wallTexture = createProceduralTexture("wall", "#f5efe8");
    public readonly roofTexture = createProceduralTexture("roof", "#d07055");
    public readonly windowTexture = createProceduralTexture("windows", "#7fc8ff");
    public readonly tileTexture = createProceduralTexture("tile", "#e0e0e0");

    private readonly buildingPaths: Array<{ p1: THREE.Vector2; p2: THREE.Vector2; width: number }> = [];

    private readonly parkingParams = {
        spotW: 2.9,
        spotD: 5.8,
        gap: 0.4,
        pad: 1.2,
        aisle: 6.4,
        drivewayW: 3.2
    };

    private terrainManager: TerrainManager;
    private glbTemplates: Record<string, THREE.Object3D> = {};

    constructor(terrainManager: TerrainManager) {
        this.terrainManager = terrainManager;

        this.buildBuildings();
        // Parking lots depend on buildings
        const layouts = this.computeParkingLayouts();
        this.parkingLayouts = layouts;
        this.buildParkingLots();
        this.buildPathsToBuildings();
        this.generateBillboards();
    }

    /**
     * Устанавливает шаблоны GLB моделей для использования в зданиях
     */
    public setGlbTemplates(templates: Record<string, THREE.Object3D>) {
        this.glbTemplates = templates;
        // Пересоздаем здания, которые используют GLB модели
        this.rebuildGlbBuildings();
    }

    private rebuildGlbBuildings() {
        // Находим все здания, которые используют GLB модели
        WORLD_CONFIG.buildings.forEach((data, index) => {
            const glbKey = (data as any).glbModelKey;
            if (!glbKey || !this.glbTemplates[glbKey]) return;

            // Находим существующее здание в группе
            const existingBuilding = this.group.children.find(
                (child) => child.userData.buildingIndex === index
            );

            if (existingBuilding) {
                // Удаляем старое здание
                this.group.remove(existingBuilding);
                // Удаляем связанные коллайдеры и двери
                const colliderIndex = this.colliders.findIndex(
                    (c) => c.position.x === data.position.x && c.position.z === data.position.z
                );
                if (colliderIndex >= 0) this.colliders.splice(colliderIndex, 1);
                const doorIndex = this.doors.findIndex((d) => d.label === data.label);
                if (doorIndex >= 0) this.doors.splice(doorIndex, 1);
            }

            // Создаем новое здание с GLB моделью
            this.createGlbBuilding(data, index);
        });
    }

    public isPointNearBuilding(x: number, z: number, padding: number) {
        return WORLD_CONFIG.buildings.some((b) => {
            const rot = (b as { rotation?: number }).rotation ?? 0;
            const local = worldToLocalXZ(b.position.x, b.position.z, rot, x, z);
            return Math.abs(local.x) <= b.size.x / 2 + padding && Math.abs(local.z) <= b.size.z / 2 + padding;
        });
    }

    public isPointInParking(x: number, z: number, padding = 0) {
        return this.parkingLayouts.some((lot) => {
            const local = worldToLocalXZ(lot.center.x, lot.center.z, lot.rotation, x, z);
            return Math.abs(local.x) <= lot.totalW / 2 + padding && Math.abs(local.z) <= lot.totalD / 2 + padding;
        });
    }

    /**
     * Получить угол поворота парковки для точки размещения
     * @returns Угол поворота парковки в радианах, или null если точка не на парковке
     */
    public getParkingRotation(x: number, z: number, padding = 0): number | null {
        for (const lot of this.parkingLayouts) {
            const local = worldToLocalXZ(lot.center.x, lot.center.z, lot.rotation, x, z);
            if (Math.abs(local.x) <= lot.totalW / 2 + padding && Math.abs(local.z) <= lot.totalD / 2 + padding) {
                return lot.rotation;
            }
        }
        return null;
    }

    private isMainRoad(road: (typeof WORLD_CONFIG.roads)[number]) {
        const center = (road.center ?? "none") as "double" | "dashed" | "solid" | "none";
        return center !== "none" || road.width >= 10;
    }

    private getClosestRoadInfo(x: number, z: number, preferMain = false): RoadInfo | null {
        const roads = WORLD_CONFIG.roads ?? [];
        if (roads.length === 0) return null;

        const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

        let best: RoadInfo | null = null;
        let bestMain: RoadInfo | null = null;
        for (const r of roads) {
            const rot = r.rotation ?? 0;
            const local = worldToLocalXZ(r.position.x, r.position.z, rot, x, z);
            const cx = clamp(local.x, -r.width / 2, r.width / 2);
            const cz = clamp(local.z, -r.length / 2, r.length / 2);
            const w = localToWorldXZ(r.position.x, r.position.z, rot, cx, cz);
            const dx = x - w.x;
            const dz = z - w.z;
            const d2 = dx * dx + dz * dz;
            const info: RoadInfo = { road: r, worldOnRoad: w, localOnRoad: { x: cx, z: cz }, distance2: d2 };
            if (!best || d2 < best.distance2) best = info;
            if (this.isMainRoad(r)) {
                if (!bestMain || d2 < bestMain.distance2) bestMain = info;
            }
        }

        if (!preferMain || !bestMain || !best) return best;
        if (bestMain.distance2 <= best.distance2 * 1.6) return bestMain;
        return best;
    }

    private getBuildingSafePosition(data: (typeof WORLD_CONFIG.buildings)[number]) {
        const roads = WORLD_CONFIG.roads ?? [];
        const clearance = 0.8;
        let pos = { x: data.position.x, z: data.position.z };
        const rot = (data as { rotation?: number }).rotation ?? 0;
        const halfX = data.size.x / 2;
        const halfZ = data.size.z / 2;

        for (const r of roads) {
            const rRot = r.rotation ?? 0;
            const local = worldToLocalXZ(r.position.x, r.position.z, rRot, pos.x, pos.z);
            const rel = rot - rRot;
            const c = Math.abs(Math.cos(rel));
            const s = Math.abs(Math.sin(rel));
            const extentPerp = c * halfX + s * halfZ;
            const extentAlong = s * halfX + c * halfZ;

            const minPerp = r.width / 2 + extentPerp + clearance;
            const minAlong = r.length / 2 + extentAlong + clearance;

            if (Math.abs(local.x) < minPerp && Math.abs(local.z) < minAlong) {
                const delta = minPerp - Math.abs(local.x);
                const side = Math.sign(local.x) || 1;
                const nx = Math.cos(rRot) * side;
                const nz = -Math.sin(rRot) * side;
                pos = { x: pos.x + nx * delta, z: pos.z + nz * delta };
            }
        }
        return pos;
    }

    private buildBuildings() {
        WORLD_CONFIG.buildings.forEach((data, index) => {
            const glbKey = (data as any).glbModelKey;
            // Если указана GLB модель, но она еще не загружена - пропускаем (создадим позже)
            if (glbKey && !this.glbTemplates[glbKey]) {
                return;
            }

            if (glbKey) {
                this.createGlbBuilding(data, index);
            } else {
                this.createProceduralBuilding(data, index);
            }
        });
    }

    private createGlbBuilding(data: typeof WORLD_CONFIG.buildings[number], index: number) {
        const glbKey = (data as any).glbModelKey;
        if (!glbKey) return;

        // Пробуем найти модель по разным вариантам ключа
        let template = this.glbTemplates[glbKey];
        if (!template) {
            // Пробуем варианты с разными регистрами и подчеркиваниями
            const variants = [
                glbKey.toLowerCase(),
                glbKey.toLowerCase().replace(/_/g, ""),
                glbKey.toLowerCase().replace(/base_?/g, ""),
                `base_${glbKey.toLowerCase()}`,
                glbKey
            ];
            for (const variant of variants) {
                if (this.glbTemplates[variant]) {
                    template = this.glbTemplates[variant];
                    break;
                }
            }
        }
        if (!template) {
            console.warn(`[BuildingManager] GLB модель "${glbKey}" не найдена для здания "${data.label}"`);
            return;
        }

        let safePos = this.getBuildingSafePosition(data);

        const riverZ = this.terrainManager.getRiverCenterZ(safePos.x);
        const riverDist = safePos.z - riverZ;
        const margin = data.size.z / 2 + 9.0;

        if (Math.abs(riverDist) < margin) {
            const pushDir = Math.sign(riverDist) || 1;
            const newZ = riverZ + pushDir * margin;
            safePos = { x: safePos.x, z: newZ };
        }

        const rot = (data as { rotation?: number }).rotation ?? 0;
        const groundH = this.terrainManager.getWorldHeight(safePos.x, safePos.z);

        // Клонируем GLB модель
        const building = template.clone(true);

        // Применяем корректировку ориентации ПЕРЕД масштабированием
        const rotX = (data as any).glbRotationX ?? 0;
        const rotZ = (data as any).glbRotationZ ?? 0;
        building.rotation.set(rotX, rot, rotZ);

        // Применяем масштаб, если указан
        const glbScale = (data as any).glbScale ?? 1.0;
        building.scale.setScalar(glbScale);

        // Вычисляем bounding box для правильного позиционирования на земле
        building.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(building);
        const size = new THREE.Vector3();
        box.getSize(size);
        const minY = box.min.y;

        // Логируем размеры для отладки
        console.log(`[BuildingManager] "${data.label}" размеры: ${size.x.toFixed(2)}x${size.y.toFixed(2)}x${size.z.toFixed(2)}м, масштаб: ${glbScale}, поворот X: ${(rotX * 180 / Math.PI).toFixed(0)}°`);

        // Позиционируем здание так, чтобы его нижняя точка была на уровне земли
        building.position.set(safePos.x, groundH - minY, safePos.z);

        // Включаем тени для всех мешей
        building.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        building.userData.placeableType = "house";
        building.userData.label = data.label;
        building.userData.buildingIndex = index;

        this.colliders.push({
            position: { x: safePos.x, z: safePos.z },
            half: { x: data.size.x / 2 + 0.4, z: data.size.z / 2 + 0.4 },
            rotation: rot,
            type: "building"
        });

        this.group.add(building);
    }

    private createProceduralBuilding(data: typeof WORLD_CONFIG.buildings[number], index: number) {
        let safePos = this.getBuildingSafePosition(data);

        const riverZ = this.terrainManager.getRiverCenterZ(safePos.x);
        const riverDist = safePos.z - riverZ;
        const margin = data.size.z / 2 + 9.0;

        if (Math.abs(riverDist) < margin) {
            const pushDir = Math.sign(riverDist) || 1;
            const newZ = riverZ + pushDir * margin;
            safePos = { x: safePos.x, z: newZ };
        }

        const rot = (data as { rotation?: number }).rotation ?? 0;
        const groundH = this.terrainManager.getWorldHeight(safePos.x, safePos.z);

        const building = createBuilding({ ...data, position: safePos }, {
            wall: this.wallTexture,
            roof: this.roofTexture,
            windows: this.windowTexture
        });

        building.position.y = groundH;
        building.userData.placeableType = "house";
        building.userData.label = data.label;
        building.userData.buildingIndex = index;

        this.colliders.push({
            position: { x: safePos.x, z: safePos.z },
            half: { x: data.size.x / 2 + 0.4, z: data.size.z / 2 + 0.4 },
            rotation: rot,
            type: "building"
        });

        const doorMesh = (building.userData as { door?: THREE.Object3D }).door;
        const doorLocalZ = data.size.z / 2 + BUILDING_LAYOUT.door.localZOutset;
        const doorWorld = localToWorldXZ(safePos.x, safePos.z, rot, 0, doorLocalZ);
        if (doorMesh) {
            this.doors.push({
                mesh: doorMesh,
                position: doorWorld,
                rotation: rot,
                open: 0,
                label: data.label
            });
            if (data.label === "МТС SHOP") {
                this.mtsShopDoor = { x: doorWorld.x, z: doorWorld.z };
            }
        }

        this.group.add(building);
    }

    private buildPathsToBuildings() {
        const mat = new THREE.MeshStandardMaterial({
            color: "#dcdcdc",
            map: this.tileTexture,
            roughness: 0.9,
            metalness: 0.1
        });

        const roads = WORLD_CONFIG.roads ?? [];
        if (roads.length === 0) return;

        const pathWidth = 2.4;
        const y = 0.03;
        const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

        // Helper: closestPointOnRoad
        const closestPointOnRoad = (x: number, z: number) => {
            let best = { x: roads[0].position.x, z: roads[0].position.z };
            let bestD2 = Infinity;
            for (const r of roads) {
                const rot = r.rotation ?? 0;
                const local = worldToLocalXZ(r.position.x, r.position.z, rot, x, z);
                const cx = clamp(local.x, -r.width / 2, r.width / 2);
                const cz = clamp(local.z, -r.length / 2, r.length / 2);
                const w = localToWorldXZ(r.position.x, r.position.z, rot, cx, cz);
                const d2 = (x - w.x) ** 2 + (z - w.z) ** 2;
                if (d2 < bestD2) { bestD2 = d2; best = w; }
            }
            return best;
        };

        WORLD_CONFIG.buildings.forEach((b) => {
            const rot = (b as { rotation?: number }).rotation ?? 0;
            const doorLocalZ = b.size.z / 2 + BUILDING_LAYOUT.door.localZOutset;
            const doorWorld = localToWorldXZ(b.position.x, b.position.z, rot, 0, doorLocalZ);
            const roadWorld = closestPointOnRoad(doorWorld.x, doorWorld.z);

            const dx = doorWorld.x - roadWorld.x;
            const dz = doorWorld.z - roadWorld.z;
            const len = Math.hypot(dx, dz);
            if (len < 0.5) return;

            const mesh = new THREE.Mesh(new THREE.BoxGeometry(len, 0.06, pathWidth), mat);
            const midX = (doorWorld.x + roadWorld.x) / 2;
            const midZ = (doorWorld.z + roadWorld.z) / 2;
            mesh.position.set(midX, y, midZ);
            const angle = -Math.atan2(dz, dx);
            mesh.rotation.y = angle;
            mesh.receiveShadow = true;
            this.group.add(mesh);

            this.buildingPaths.push({
                p1: new THREE.Vector2(doorWorld.x, doorWorld.z),
                p2: new THREE.Vector2(roadWorld.x, roadWorld.z),
                width: pathWidth
            });

            // Bushes
            const ndx = -dz / len;
            const ndz = dx / len;
            const bushSpacing = 3.5;
            const steps = Math.floor(len / bushSpacing);
            const offset = (pathWidth / 2) + 0.8;

            for (let i = 1; i < steps; i++) {
                const t = i / steps;
                const tx = roadWorld.x + dx * t;
                const tz = roadWorld.z + dz * t;

                const lx = tx + ndx * offset;
                const lz = tz + ndz * offset;
                const rx = tx - ndx * offset;
                const rz = tz - ndz * offset;

                const createMiniBush = (bx: number, bz: number) => {
                    const b = this.createBushMesh(0.5);
                    const h = this.terrainManager.getTerrainHeight(bx, bz);
                    b.position.set(bx, h, bz);
                    this.group.add(b);
                };

                if (Math.random() > 0.3) createMiniBush(lx, lz);
                if (Math.random() > 0.3) createMiniBush(rx, rz);
            }
        });
    }

    private createBushMesh(scale: number) {
        const group = new THREE.Group();
        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.1 * scale, 0.15 * scale, 0.4 * scale, 6),
            new THREE.MeshStandardMaterial({ color: "#7a5138", roughness: 1.0 })
        );
        trunk.position.y = 0.2 * scale;
        trunk.castShadow = true;
        group.add(trunk);

        const colors = ["#2ecc71", "#27ae60", "#16a085", "#2ecc71"];
        const col = colors[Math.floor(Math.random() * colors.length)];
        const foliageMat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.8 });

        const puffs = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < puffs; i++) {
            const s = (0.5 + Math.random() * 0.3) * scale;
            const f = new THREE.Mesh(new THREE.SphereGeometry(s, 7, 7), foliageMat);
            f.position.set(
                (Math.random() - 0.5) * 0.3 * scale,
                (0.4 + i * 0.4) * scale,
                (Math.random() - 0.5) * 0.3 * scale
            );
            f.castShadow = true;
            group.add(f);
        }
        return group;
    }

    private pushLotAwayFromRoadIfNeeded(
        center: { x: number; z: number },
        lotRot: number,
        halfW: number,
        halfD: number,
        clearance: number
    ) {
        const info = this.getClosestRoadInfo(center.x, center.z, true);
        if (!info) return center;

        const r = info.road;
        const rRot = r.rotation ?? 0;
        const local = worldToLocalXZ(r.position.x, r.position.z, rRot, center.x, center.z);

        const rel = lotRot - rRot;
        const extentPerp = Math.abs(Math.cos(rel)) * halfW + Math.abs(Math.sin(rel)) * halfD;
        const minPerp = r.width / 2 + extentPerp + clearance;

        const currentPerp = Math.abs(local.x);
        if (currentPerp >= minPerp) return center;

        const delta = minPerp - currentPerp;
        const side = Math.sign(local.x) || 1;
        const nx = Math.cos(rRot) * side;
        const nz = -Math.sin(rRot) * side;
        return { x: center.x + nx * delta, z: center.z + nz * delta };
    }

    private computeParkingLayouts(): ParkingLayout[] {
        const parkingLots = (WORLD_CONFIG as { parkingLots?: Array<{ buildingIndex: number; spots: number }> }).parkingLots;
        if (!parkingLots || parkingLots.length === 0) return [];

        const { spotW, spotD, gap, pad, aisle } = this.parkingParams;
        const layouts: ParkingLayout[] = [];

        parkingLots.forEach((p) => {
            const b = WORLD_CONFIG.buildings[p.buildingIndex];
            if (!b) return;
            const rot = (b as { rotation?: number }).rotation ?? 0;
            const spots = Math.max(1, Math.floor(p.spots));

            const rows = spots <= 5 ? 1 : 2;
            const spotsRowA = rows === 1 ? spots : Math.ceil(spots / 2);
            const spotsRowB = rows === 2 ? Math.floor(spots / 2) : 0;
            const cols = Math.max(spotsRowA, spotsRowB, 1);
            const totalW = cols * spotW + (cols - 1) * gap + pad * 2;
            const totalD = rows === 1 ? spotD + aisle + pad * 2 : 2 * spotD + aisle + pad * 2;

            const safePos = this.getBuildingSafePosition(b);
            const doorLocalZ = b.size.z / 2 + BUILDING_LAYOUT.door.localZOutset;
            const doorWorld = localToWorldXZ(safePos.x, safePos.z, rot, 0, doorLocalZ);
            const roadForDoor = this.getClosestRoadInfo(doorWorld.x, doorWorld.z, true);
            const roadWorld = roadForDoor?.worldOnRoad ?? doorWorld;

            const lotZ = b.size.z / 2 + totalD / 2 + 3.2;
            const lotXRight = b.size.x / 2 + totalW / 2 + 1.2;
            const lotXLeft = -lotXRight;

            const rightWorld = localToWorldXZ(safePos.x, safePos.z, rot, lotXRight, lotZ);
            const leftWorld = localToWorldXZ(safePos.x, safePos.z, rot, lotXLeft, lotZ);
            const dRight = (rightWorld.x - roadWorld.x) ** 2 + (rightWorld.z - roadWorld.z) ** 2;
            const dLeft = (leftWorld.x - roadWorld.x) ** 2 + (leftWorld.z - roadWorld.z) ** 2;
            const chosen = dLeft < dRight ? { x: lotXLeft, z: lotZ } : { x: lotXRight, z: lotZ };

            let center = localToWorldXZ(safePos.x, safePos.z, rot, chosen.x, chosen.z);
            center = this.pushLotAwayFromRoadIfNeeded(center, rot, totalW / 2, totalD / 2, 0.8);

            const aisleCenterZ = rows === 2 ? 0 : -totalD / 2 + pad + spotD + aisle / 2;
            const rowCentersLocalZ =
                rows === 1
                    ? [-aisle / 2]
                    : [
                        -(aisle / 2 + spotD / 2),
                        +(aisle / 2 + spotD / 2)
                    ];

            const roadForLot = this.getClosestRoadInfo(center.x, center.z, true);
            layouts.push({
                buildingIndex: p.buildingIndex,
                center,
                rotation: rot,
                totalW,
                totalD,
                rows,
                spots,
                spotsRowA,
                spotsRowB,
                rowCentersLocalZ,
                aisleCenterZ,
                roadForLot
            });
        });

        return layouts;
    }

    private buildParkingLots() {
        if (this.parkingLayouts.length === 0) return;

        const asphalt = new THREE.MeshStandardMaterial({ color: "#3f464d", roughness: 0.95, metalness: 0.05 });
        const lineMat = new THREE.MeshStandardMaterial({ color: "#f7f9fc", roughness: 0.4, metalness: 0.05 });

        const { spotW, spotD, gap, pad, aisle, drivewayW } = this.parkingParams;
        const drivewayY = 0.024;

        const addSegment = (a: { x: number; z: number }, b: { x: number; z: number }, width: number, material: THREE.Material) => {
            const dx = b.x - a.x;
            const dz = b.z - a.z;
            const len = Math.hypot(dx, dz);
            if (len < 0.25) return;
            const seg = new THREE.Mesh(new THREE.BoxGeometry(len, 0.06, width), material);
            seg.position.set((a.x + b.x) / 2, drivewayY, (a.z + b.z) / 2);
            seg.rotation.y = -Math.atan2(dz, dx);
            seg.receiveShadow = true;
            this.group.add(seg);
        };
        const parkedColors = ["#ff6b6b", "#6bcBff", "#ffd166", "#a29bfe"];
        const FUNNY_PLATES = ["КОТ-404", "МЯУ-007", "РЫБА", "С0Н", "ТЫГДЫК", "ЛАПКИ", "МУР", "КУСЬ", "ШЕРСТЬ", "ЖРАТЬ"];

        this.parkingLayouts.forEach((layout) => {
            const { center, rotation: rot, totalW, totalD, rows, spotsRowA, spotsRowB, rowCentersLocalZ, aisleCenterZ } = layout;

            const lot = new THREE.Mesh(new THREE.BoxGeometry(totalW, 0.08, totalD), asphalt);
            lot.position.set(center.x, 0.025, center.z);
            lot.rotation.y = rot;
            lot.receiveShadow = true;
            this.group.add(lot);

            const placeLine = (localX: number, localZ: number, depth: number) => {
                const w = localToWorldXZ(center.x, center.z, rot, localX, localZ);
                const line = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, depth), lineMat);
                line.position.set(w.x, 0.07, w.z);
                line.rotation.y = rot;
                this.group.add(line);
            };

            for (let rowIndex = 0; rowIndex < rowCentersLocalZ.length; rowIndex += 1) {
                const rowZ = rowCentersLocalZ[rowIndex];
                const rowDepth = spotD;
                const stallsHere = rows === 1 ? spotsRowA : rowIndex === 0 ? spotsRowA : spotsRowB;
                const usedCols = Math.max(1, stallsHere);

                for (let i = 0; i <= usedCols; i += 1) {
                    const x = -totalW / 2 + pad + i * (spotW + gap);
                    placeLine(x, rowZ, rowDepth);
                }

                const sign = Math.sign(rowZ) || -1;
                const outerZ = rowZ + sign * (spotD / 2 - 0.12);
                const stop = localToWorldXZ(center.x, center.z, rot, 0, outerZ);
                const stopLine = new THREE.Mesh(new THREE.BoxGeometry(totalW - pad * 2, 0.06, 0.08), lineMat);
                stopLine.position.set(stop.x, 0.07, stop.z);
                stopLine.rotation.y = rot;
                this.group.add(stopLine);
            }

            const borderDepth = 0.08;
            const makeBorder = (localZ: number) => {
                const w = localToWorldXZ(center.x, center.z, rot, 0, localZ);
                const border = new THREE.Mesh(new THREE.BoxGeometry(totalW - pad * 2, 0.06, borderDepth), lineMat);
                border.position.set(w.x, 0.07, w.z);
                border.rotation.y = rot;
                this.group.add(border);
            };
            if (rows === 2) {
                makeBorder(-aisle / 2);
                makeBorder(+aisle / 2);
            } else {
                makeBorder(rowCentersLocalZ[0] + spotD / 2);
            }

            const roadForLot = layout.roadForLot;
            if (roadForLot) {
                const r = roadForLot.road;
                const rRot = r.rotation ?? 0;
                const lotLocalOnRoad = worldToLocalXZ(r.position.x, r.position.z, rRot, center.x, center.z);
                const side = Math.sign(lotLocalOnRoad.x) || 1;

                const curbInset = 0.25;
                const throatLen = 6.0;
                const roadEdge = localToWorldXZ(r.position.x, r.position.z, rRot, side * (r.width / 2 + curbInset), roadForLot.localOnRoad.z);
                const throatEnd = localToWorldXZ(r.position.x, r.position.z, rRot, side * (r.width / 2 + curbInset + throatLen), roadForLot.localOnRoad.z);

                const entryA = localToWorldXZ(center.x, center.z, rot, -totalW / 2, aisleCenterZ);
                const entryB = localToWorldXZ(center.x, center.z, rot, +totalW / 2, aisleCenterZ);
                const dA = (entryA.x - throatEnd.x) ** 2 + (entryA.z - throatEnd.z) ** 2;
                const dB = (entryB.x - throatEnd.x) ** 2 + (entryB.z - throatEnd.z) ** 2;
                const lotEntry = dA < dB ? entryA : entryB;

                const entryLocalOnRoad = worldToLocalXZ(r.position.x, r.position.z, rRot, lotEntry.x, lotEntry.z);
                const alignPoint = localToWorldXZ(
                    r.position.x, r.position.z,
                    rRot,
                    side * (r.width / 2 + curbInset + throatLen),
                    entryLocalOnRoad.z
                );

                addSegment(roadEdge, throatEnd, drivewayW, asphalt);
                addSegment(throatEnd, alignPoint, drivewayW, asphalt);
                addSegment(alignPoint, lotEntry, drivewayW, asphalt);
            }

            const stallCenters: Array<{ x: number; z: number; yaw: number }> = [];
            for (let rowIndex = 0; rowIndex < rowCentersLocalZ.length; rowIndex += 1) {
                const rowZ = rowCentersLocalZ[rowIndex];
                const stallsHere = rows === 1 ? spotsRowA : rowIndex === 0 ? spotsRowA : spotsRowB;
                const usedCols = Math.max(1, stallsHere);
                const faceYaw = rowZ >= 0 ? Math.PI : 0;
                for (let i = 0; i < usedCols; i += 1) {
                    const localX = -totalW / 2 + pad + spotW / 2 + i * (spotW + gap);
                    stallCenters.push({ x: localX, z: rowZ, yaw: faceYaw });
                }
            }

            const parkedCount = layout.buildingIndex === 0
                ? Math.min(4, stallCenters.length) // More cars for MTS Bank
                : Math.min(2, stallCenters.length);

            // Custom styles for MTS Bank (Index 0)
            const targetStyles = layout.buildingIndex === 0
                ? ["sports", "square"]
                : ["bubble"];

            const parkedIdx =
                parkedCount === 1
                    ? [Math.floor(stallCenters.length / 2)]
                    : (layout.buildingIndex === 0
                        ? [0, 1, 2, 3].slice(0, parkedCount) // Fill first spots for MTS
                        : [0, Math.max(0, stallCenters.length - 1)]); // Ends for others

            parkedIdx.slice(0, parkedCount).forEach((idx, i) => {
                const stall = stallCenters[idx];
                if (!stall) return;
                const w = localToWorldXZ(center.x, center.z, rot, stall.x, stall.z);
                const carColor = parkedColors[(layout.buildingIndex + i) % parkedColors.length]!;
                const plateText = FUNNY_PLATES[Math.floor(Math.random() * FUNNY_PLATES.length)];

                // Select style: if MTS Bank, cycle through sports/square. Else bubble.
                // We use type assertion to allow string, assuming style was added to CarOptions type
                const style = targetStyles[i % targetStyles.length];

                const car = new Car([new THREE.Vector3(w.x, 0, w.z)], {
                    color: carColor,
                    speed: 0,
                    parked: true,
                    plateText,
                    style: style as "bubble" | "square" | "sports"
                });
                car.object.position.set(w.x, 0.23, w.z);
                car.object.rotation.y = rot + stall.yaw;
                car.object.userData.parkedCar = true;
                car.object.userData.carColor = carColor;
                this.group.add(car.object);
                this.parkedCars.push({ car, object: car.object, radius: 2.6, doorOpen: false });
            });
        });
    }

    public update(dt: number, playerPos: THREE.Vector3) {
        this.updateDoors(dt, playerPos);
        this.updateParkedCarDoors(dt, playerPos);
    }

    private updateDoors(dt: number, playerPos: THREE.Vector3) {
        const openDist = 2.6;
        const closeDist = 3.2;
        const maxAngle = Math.PI * 0.45;

        this.doors.forEach((door) => {
            const d = Math.hypot(playerPos.x - door.position.x, playerPos.z - door.position.z);
            const target = d <= openDist ? 1 : d >= closeDist ? 0 : door.open;
            const speed = 6;
            door.open = THREE.MathUtils.clamp(door.open + (target - door.open) * Math.min(1, dt * speed), 0, 1);
            door.mesh.rotation.y = maxAngle * door.open;
        });
    }

    private updateParkedCarDoors(dt: number, playerPos: THREE.Vector3, openDist = 4.6, closeDist = 5.2) {
        for (const parked of this.parkedCars) {
            const dx = playerPos.x - parked.object.position.x;
            const dz = playerPos.z - parked.object.position.z;
            const d = Math.hypot(dx, dz);
            if (d <= openDist && !parked.doorOpen) {
                parked.doorOpen = true;
                parked.car.setDoorOpen(true);
            } else if (d >= closeDist && parked.doorOpen) {
                parked.doorOpen = false;
                parked.car.setDoorOpen(false);
            }
            parked.car.updateDoorAnimation(dt);
        }
    }

    public closeAllParkedCarDoors(dt = 0) {
        for (const parked of this.parkedCars) {
            if (!parked.doorOpen) continue;
            parked.doorOpen = false;
            parked.car.setDoorOpen(false);
            if (dt > 0) parked.car.updateDoorAnimation(dt);
        }
    }

    public getBuildingDoorPosition(label: string) {
        if (label === "МТС SHOP" && this.mtsShopDoor) return this.mtsShopDoor;
        const door = this.doors.find((d) => d.label === label);
        return door?.position;
    }

    public findParkedCarNear(pos: { x: number; z: number }, maxDist: number) {
        let nearest: ParkedCarInfo | null = null;
        let best = maxDist;
        for (const car of this.parkedCars) {
            const dx = car.object.position.x - pos.x;
            const dz = car.object.position.z - pos.z;
            const d = Math.hypot(dx, dz);
            if (d < best) {
                best = d;
                nearest = car;
            }
        }
        return nearest;
    }

    public getParkedCarObjects() {
        return this.parkedCars.map((car) => car.object);
    }

    public removeParkedCar(target: THREE.Object3D) {
        const idx = this.parkedCars.findIndex((car) => car.object === target);
        if (idx < 0) return null;
        const parked = this.parkedCars[idx]!;
        const color = (parked.object.userData?.carColor as string) ?? "#ff6b6b";
        const style = (parked.object.userData?.carStyle as string) ?? "bubble";
        const pos = parked.object.position;
        const yaw = parked.object.rotation.y;
        const plateText = parked.object.userData?.plateText as string | undefined;

        this.group.remove(parked.object);
        this.parkedCars.splice(idx, 1);

        return { color, position: pos, rotation: yaw, style, plateText };
    }

    public addParkedCar(pos: THREE.Vector3, rotationY: number, color: string, plateText?: string, style: "bubble" | "square" | "sports" = "bubble") {
        const plate = plateText || FUNNY_PLATES[Math.floor(Math.random() * FUNNY_PLATES.length)];
        const car = new Car([new THREE.Vector3(pos.x, 0, pos.z)], { color, speed: 0, y: 0.23, parked: true, plateText: plate, style });
        car.object.position.set(pos.x, 0.23, pos.z);
        car.object.rotation.y = rotationY;
        car.object.userData.parkedCar = true;
        car.object.userData.carColor = color;
        car.object.userData.carStyle = style;
        car.object.userData.carInstance = car;

        this.group.add(car.object);
        const info: ParkedCarInfo = { car, object: car.object, radius: 2.6, doorOpen: false };
        this.parkedCars.push(info);
        return info;
    }

    private generateBillboards() {
        const geo = new THREE.BoxGeometry(1, 1, 0.2);
        const poleMat = new THREE.MeshStandardMaterial({ color: "#555555", roughness: 0.7 });

        const billboards = (WORLD_CONFIG as any).billboards || [];

        for (const b of billboards) {
            const group = new THREE.Group();
            group.position.set(b.position.x, 0, b.position.z);
            group.rotation.y = b.rotation;

            const w = b.size.x;
            const h = b.size.y;
            const poleH = 4.0;

            const poleGeo = new THREE.CylinderGeometry(0.08, 0.08, poleH + h / 2, 8);
            const pole = new THREE.Mesh(poleGeo, poleMat);
            pole.position.set(0, (poleH + h / 2) / 2, 0);
            pole.castShadow = true;

            group.add(pole);

            const tex = createBillboardTexture(b.text);
            const materials = [
                new THREE.MeshStandardMaterial({ color: "#dddddd" }),
                new THREE.MeshStandardMaterial({ color: "#dddddd" }),
                new THREE.MeshStandardMaterial({ color: "#dddddd" }),
                new THREE.MeshStandardMaterial({ color: "#dddddd" }),
                new THREE.MeshStandardMaterial({ map: tex }),
                new THREE.MeshStandardMaterial({ map: tex }),
            ];
            const board = new THREE.Mesh(geo, materials);
            board.scale.set(w, h, 1);
            board.position.y = poleH + h / 2;
            board.castShadow = true;
            group.add(board);

            this.group.add(group);

            this.colliders.push({
                position: { x: b.position.x, z: b.position.z },
                half: { x: w / 2, z: 0.5 },
                rotation: b.rotation,
                type: "building"
            });
        }
    }
}
