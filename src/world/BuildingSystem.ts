/**
 * BuildingSystem - Система размещения объектов игроком
 */
import * as THREE from "three";
import { World } from "./World";
import { ObjectRegistry } from "./ObjectRegistry";
import { SnapSystem } from "./SnapSystem";
import {
    PlaceableObject,
    PlaceableType,
    PlacementResult,
    generateObjectId,
    computeBoundsFromMesh
} from "./PlaceableObject";
import { createBuilding } from "@entities/Building";
import { Car } from "../entities/Car";
import { Bus } from "../entities/Bus";
import { WORLD_CONFIG } from "@config/world";
import { worldToLocalXZ, localToWorldXZ } from "@utils/math";
import { BUILDING_LAYOUT } from "@entities/Building";

export class BuildingSystem {
    private raycaster = new THREE.Raycaster();
    private previewMesh: THREE.Object3D | null = null;
    private activeTool: string | "delete" | null = null;
    private objectTemplates: Record<string, THREE.Object3D> = {};
    private objectTemplateSizes: Record<string, THREE.Vector3> = {};
    private placementScale = 1;
    private freePlacementForProps = true;
    private alignPropsToSurface = false;
    private surfaceNormal = new THREE.Vector3(0, 1, 0);
    private surfaceRoll = 0; // вращение вокруг нормали поверхности
    private flipSurfaceNormal = false;
    private autoSelectAfterPlace = true;
    private onToolChange: ((tool: string | null) => void) | null = null;
    private onSelectionChange: ((obj: PlaceableObject | null) => void) | null = null;

    // UI State
    private currentColor: string = "#A0522D"; // Default reddish brown

    // Вспомогательные объекты, чтобы не создавать лишние каждый кадр
    private _tmpQuatA = new THREE.Quaternion();
    private _tmpQuatB = new THREE.Quaternion();
    private _tmpMat3 = new THREE.Matrix3();

    public setObjectTemplates(templates: Record<string, THREE.Object3D>) {
        this.objectTemplates = templates;
        this.objectTemplateSizes = {};

        // Предварительно считаем габариты шаблонов — чтобы корректно работали пересечения/снаппинг.
        for (const [key, tpl] of Object.entries(templates)) {
            try {
                const clone = tpl.clone(true);
                clone.position.set(0, 0, 0);
                clone.rotation.set(0, 0, 0);
                clone.updateMatrixWorld(true);
                const box = new THREE.Box3().setFromObject(clone);
                const size = new THREE.Vector3();
                box.getSize(size);
                this.objectTemplateSizes[key] = size;
            } catch (e) {
                console.warn(`[BuildingSystem] Failed to compute template size for "${key}"`, e);
            }
        }
    }

    public setPlacementScale(scale: number) {
        const s = Number.isFinite(scale) ? scale : 1;
        this.placementScale = Math.min(20, Math.max(0.05, s));
        if (this.previewMesh && this.activeTool && this.activeTool !== "delete") {
            this.updatePreview();
        }
    }

    public setCurrentColor(color: string) {
        this.currentColor = color;
        if (this.previewMesh && this.activeTool && this.activeTool.startsWith("house:")) {
            this.updatePreview();
        }
    }

    public setFreePlacementForProps(enabled: boolean) {
        this.freePlacementForProps = !!enabled;
        if (this.lastPointerEvent) this.onMove(this.lastPointerEvent);
    }

    public setAlignPropsToSurface(enabled: boolean) {
        this.alignPropsToSurface = !!enabled;
        if (this.lastPointerEvent) this.onMove(this.lastPointerEvent);
    }

    public setFlipSurfaceNormal(enabled: boolean) {
        this.flipSurfaceNormal = !!enabled;
        if (this.lastPointerEvent) this.onMove(this.lastPointerEvent);
    }

    public setAutoSelectAfterPlace(enabled: boolean) {
        this.autoSelectAfterPlace = !!enabled;
    }

    public setOnToolChange(cb: ((tool: string | null) => void) | null) {
        this.onToolChange = cb ?? null;
    }

    public setOnSelectionChange(cb: ((obj: PlaceableObject | null) => void) | null) {
        this.onSelectionChange = cb ?? null;
    }

    public hasActiveTool(): boolean {
        return !!this.activeTool;
    }

    public getSelectedObject(): PlaceableObject | null {
        if (!this.selectedObjectId) return null;
        return this.registry.get(this.selectedObjectId) ?? null;
    }

    public getSelectedScale(): number | null {
        const obj = this.getSelectedObject();
        if (!obj || obj.type !== "prop") return null;
        const scale = (obj.metadata as any)?.scale;
        return Number.isFinite(scale) ? scale : null;
    }

    public getGridStep(): number {
        return this.gridStep;
    }

    public moveSelectedBy(dx: number, dz: number): boolean {
        return this.moveSelected(dx, dz);
    }

    public setSelectedScale(scale: number): boolean {
        const obj = this.getSelectedObject();
        if (!obj || obj.type !== "prop") return false;
        const clamped = Math.min(6, Math.max(0.1, scale));
        const meta = (obj.metadata as any) ?? {};
        const templateKey = meta.templateKey as string | undefined;
        const template = templateKey ? this.objectTemplates[templateKey] : undefined;
        if (template) {
            obj.mesh.scale.copy(template.scale).multiplyScalar(clamped);
        } else {
            obj.mesh.scale.setScalar(clamped);
        }
        meta.scale = clamped;

        const baseSize = this.getBaseSizeForProp(meta, templateKey);
        if (baseSize) {
            meta.size = { x: baseSize.x * clamped, y: baseSize.y * clamped, z: baseSize.z * clamped };
        }
        obj.metadata = meta;
        obj.bounds = computeBoundsFromMesh(obj.mesh);
        return true;
    }

    private isBuiltInTool(key: string): key is PlaceableType {
        return (
            key === "road" ||
            key === "bridge" ||
            key === "house" ||
            key === "tree" ||
            key === "fence" ||
            key === "car" ||
            key === "bus" ||
            key === "rock" ||
            key === "bush" ||
            key === "lamp" ||
            key === "bench" ||
            key === "sport" ||
            key === "prop"
        );
    }



    private getPlacementHit(e: PointerEvent): { point: THREE.Vector3; normal: THREE.Vector3 } | null {
        const mouse = this.getPointerNDC(e);
        this.raycaster.setFromCamera(mouse, this.camera);

        // Луч по всему миру: можно кликать по дороге, крыше, стене и т.д.
        const hits = this.raycaster.intersectObject(this.world.group, true);

        const isInRegistryGroup = (obj: THREE.Object3D | null) => {
            let cur = obj;
            while (cur) {
                if (cur === this.registry.group) return true;
                cur = cur.parent;
            }
            return false;
        };

        const MAX_DISTANCE = 200; // Не ставить объекты дальше 200м от камеры
        const MIN_HEIGHT = -10; // Не ставить ниже -10м (под землю)

        let bestHit: { point: THREE.Vector3; normal: THREE.Vector3; distance: number } | null = null;

        for (const h of hits) {
            const obj = h.object;
            if (!obj) continue;
            if (obj.name === "placementPreview") continue;
            if (!this.freePlacementForProps && isInRegistryGroup(obj)) continue;

            const distance = h.distance;
            if (distance > MAX_DISTANCE) continue; // Слишком далеко
            if (distance < 0.1) continue; // Слишком близко (это может быть сам объект)

            const point = h.point.clone();
            if (point.y < MIN_HEIGHT) continue; // Слишком низко

            // Нормаль поверхности в мировых координатах (если есть face)
            let normal = new THREE.Vector3(0, 1, 0);
            if (h.face?.normal) {
                this._tmpMat3.getNormalMatrix(obj.matrixWorld);
                normal.copy(h.face.normal).applyMatrix3(this._tmpMat3).normalize();
            }

            // Фильтруем "небо" и перевёрнутые поверхности
            // Нормаль "вверх" имеет Y близкий к 1
            // Нормаль "вниз" имеет Y близкий к -1
            // Если нормаль смотрит вниз (Y < -0.3) - это "потолок" или перевёрнутая поверхность, пропускаем
            if (normal.y < -0.3) continue;

            // Если включено "прилипание к поверхности", принимаем поверхности с разумным углом
            // Иначе принимаем только "горизонтальные" поверхности (Y > 0.7) - земля, крыши
            if (!this.alignPropsToSurface) {
                if (normal.y < 0.7) continue; // Только "почти горизонтальные" поверхности
            }

            // Если это стена (нормаль почти вертикальна), принимаем только если явно запрошено прилипание
            if (Math.abs(normal.y) < 0.3) {
                if (!this.alignPropsToSurface) continue; // Стены только при явном "прилипании"
            }

            // Находим ближайшее валидное пересечение
            if (!bestHit || distance < bestHit.distance) {
                bestHit = { point, normal, distance };
            }
        }

        // Если не нашли подходящую поверхность, используем fallback: луч вниз от курсора к земле
        if (!bestHit) {
            // Более простой подход: используем пересечение с землёй
            const terrainHits = this.world.intersectTerrain(this.raycaster);
            if (terrainHits && terrainHits.length > 0) {
                const hit = terrainHits[0];
                if (hit.distance < MAX_DISTANCE && hit.point.y >= MIN_HEIGHT) {
                    return {
                        point: hit.point.clone(),
                        normal: new THREE.Vector3(0, 1, 0) // Земля всегда горизонтальна
                    };
                }
            }

            return null;
        }

        return { point: bestHit.point, normal: bestHit.normal };
    }

    /**
     * Finds the real visual height of the ground at (x, z) using Raycast.
     * This ensures objects sit on top of roads, sidewalks, etc., not just the terrain.
     */
    private getVisualGroundHeight(x: number, z: number, ignore: THREE.Object3D[] = []): number {
        const rayStart = new THREE.Vector3(x, 100, z); // Start high up
        const rayDir = new THREE.Vector3(0, -1, 0);
        this.raycaster.set(rayStart, rayDir);

        // Targeted Raycast: Only check Terrain, Roads, and Buildings.
        // Avoid hitting sensors, debug gizmos, or the object itself (if not in these groups).
        const targetObjects: THREE.Object3D[] = [];

        // 1. Terrain
        if (this.world.terrainManager) {
            targetObjects.push(this.world.terrainManager.group);
        }

        // 2. Roads
        if (this.world.roadBuilder) {
            targetObjects.push(this.world.roadBuilder.getGroup());
        }

        // 3. Other Buildings (except self)
        if (this.world.buildingManager) {
            targetObjects.push(this.world.buildingManager.group);
        }

        const hits = this.raycaster.intersectObjects(targetObjects, true);

        // Optimized ignore check - проверяем всю иерархию parent для корректного игнорирования
        const isIgnored = (obj: THREE.Object3D) => {
            let cur: THREE.Object3D | null = obj;
            // Получаем mesh выбранного объекта для игнорирования
            const selectedObj = this.selectedObjectId ? this.registry?.get(this.selectedObjectId) : null;
            const selectedMesh = selectedObj?.mesh;

            while (cur) {
                // Игнорируем объекты из списка ignore
                for (const ignored of ignore) {
                    if (cur === ignored) return true;
                    // Проверяем всю иерархию ignore объектов
                    let check: THREE.Object3D | null = ignored;
                    while (check) {
                        if (cur === check) return true;
                        check = check.parent;
                    }
                }
                // Игнорируем preview mesh
                if (cur === this.previewMesh || (this.previewMesh && cur.parent === this.previewMesh)) return true;
                // Игнорируем выбранный объект и все его части
                if (selectedMesh && (cur === selectedMesh || cur.parent === selectedMesh)) {
                    // Проверяем всю иерархию выбранного объекта
                    let check: THREE.Object3D | null = cur;
                    while (check) {
                        if (check === selectedMesh) return true;
                        check = check.parent;
                    }
                }
                cur = cur.parent;
            }
            return false;
        };

        for (const hit of hits) {
            if (isIgnored(hit.object)) continue;
            // Ignore points below a reasonable threshold (e.g. way below ground)
            // And ignore 'sensor' objects if they accidentally got into the groups
            if (hit.point.y < -50) continue;

            // Assume the first valid hit is the visual "ground" (road, roof, terrain)
            return hit.point.y;
        }

        // Fallback to terrain height if nothing hit
        return this.world.getWorldHeight(x, z);
    }




    private applySurfaceOrientation(target: THREE.Object3D, normal: THREE.Vector3) {
        // Направление “наружу” от поверхности
        const n = normal.clone().normalize();
        if (this.flipSurfaceNormal) n.multiplyScalar(-1);

        // Считаем, что “лицо” объекта смотрит вдоль +Z.
        // Выравниваем +Z по нормали, затем докручиваем вокруг нормали (surfaceRoll).
        this._tmpQuatA.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
        this._tmpQuatB.setFromAxisAngle(n, this.surfaceRoll);
        target.quaternion.copy(this._tmpQuatB).multiply(this._tmpQuatA);
    }

    private applySurfaceOrientationCustom(
        target: THREE.Object3D,
        normal: THREE.Vector3,
        roll: number,
        flip: boolean
    ) {
        const n = normal.clone().normalize();
        if (flip) n.multiplyScalar(-1);
        this._tmpQuatA.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
        this._tmpQuatB.setFromAxisAngle(n, roll);
        target.quaternion.copy(this._tmpQuatB).multiply(this._tmpQuatA);
    }

    private applyObjectRotation(obj: PlaceableObject) {
        const meta = (obj.metadata as any) ?? {};
        const rotX = Number(meta.rotationX) || 0;
        const rotY = obj.rotation;
        const rotZ = Number(meta.rotationZ) || 0;

        // Если нет поворотов X и Z, используем простой rotation.y
        if (Math.abs(rotX) < 0.001 && Math.abs(rotZ) < 0.001) {
            obj.mesh.rotation.set(rotX, rotY, rotZ);
            return;
        }

        // Для объектов с прилипанием к поверхности - используем кватернионы
        const hasSurface = (obj.type as string) === "prop" && meta?.alignToSurface && meta?.surfaceNormal;
        if (hasSurface) {
            // Если объект прилипает к поверхности, применяем повороты через кватернионы
            const normal = new THREE.Vector3(meta.surfaceNormal.x, meta.surfaceNormal.y, meta.surfaceNormal.z);
            const roll = Number(meta.surfaceRoll) || 0;
            const flip = !!meta.flipNormal;
            this.applySurfaceOrientationCustom(obj.mesh, normal, roll, flip);
            // Затем применяем дополнительные повороты X и Z в локальном пространстве
            if (Math.abs(rotX) > 0.001 || Math.abs(rotZ) > 0.001) {
                this._tmpQuatA.setFromAxisAngle(new THREE.Vector3(1, 0, 0), rotX);
                this._tmpQuatB.setFromAxisAngle(new THREE.Vector3(0, 0, 1), rotZ);
                obj.mesh.quaternion.multiply(this._tmpQuatA).multiply(this._tmpQuatB);
            }
            return;
        }

        // Для обычных объектов: применяем повороты в порядке Y -> X -> Z
        // Это позволяет вращать объект в любую сторону
        obj.mesh.rotation.set(rotX, rotY, rotZ);
    }

    private getBaseSizeForProp(meta: any, templateKey?: string): THREE.Vector3 | null {
        if (templateKey && this.objectTemplateSizes[templateKey]) {
            return this.objectTemplateSizes[templateKey].clone();
        }
        const size = meta?.size;
        const scale = meta?.scale;
        if (size && Number.isFinite(scale) && scale > 0) {
            return new THREE.Vector3(size.x / scale, size.y / scale, size.z / scale);
        }
        return null;
    }

    private moveSelected(dx: number, dz: number): boolean {
        if (!this.selectedObjectId) return false;
        const obj = this.registry.get(this.selectedObjectId);
        if (!obj) return false;

        const newPos = obj.position.clone();
        newPos.x += dx;
        newPos.z += dz;
        // Обновляем высоту на основе поверхности (используем визуальный Raycast, чтобы видеть дороги)
        newPos.y = this.getVisualGroundHeight(newPos.x, newPos.z, [obj.mesh]);

        // Для всех объектов движение работает всегда - просто перемещаем на новую позицию
        // Проверка размещения нужна только для новых объектов, а не для уже размещенных
        const surfaceHeight = this.getVisualGroundHeight(newPos.x, newPos.z, [obj.mesh]);
        newPos.y = surfaceHeight;

        // Вычисляем смещение для объектов на дорогах
        const roadOffset = this.getRoadOffsetForObject(obj.mesh, newPos, obj.type);

        // Обновляем позицию объекта
        this.registry.updatePosition(obj.id, newPos);
        obj.mesh.position.copy(newPos);

        // Выравниваем объект на земле после перемещения
        this.adjustPositionToGround(obj.mesh, surfaceHeight + roadOffset);

        // Синхронизируем позицию из меша (после adjustPositionToGround она могла измениться)
        this.registry.updatePosition(obj.id, obj.mesh.position);

        return true;
    }

    public rotateSelected(deltaRad: number): boolean {
        if (!this.selectedObjectId) return false;
        const obj = this.registry.get(this.selectedObjectId);
        if (!obj) return false;

        // Для поворота всегда применяем новый угол, даже если есть пересечения
        // Поворот должен работать всегда - пользователь может поворачивать объект на месте
        let newRot = (obj.rotation + deltaRad) % (Math.PI * 2);
        if (newRot < 0) newRot += Math.PI * 2;

        // ВЫРАВНИВАНИЕ К СЕТКЕ: округляем угол к ближайшим 90° (0, 90, 180, 270)
        // Для автомобилей разрешаем произвольные углы, для остальных - выравнивание к 90°
        const snapToGrid = obj.type !== "car" && obj.type !== "bus"; // Для автомобилей не выравниваем
        if (snapToGrid) {
            const snapAngle = Math.PI / 2; // 90 градусов
            newRot = Math.round(newRot / snapAngle) * snapAngle;
            // Нормализуем в диапазон 0-2π
            newRot = newRot % (Math.PI * 2);
            if (newRot < 0) newRot += Math.PI * 2;
        }

        // Применяем поворот к мешу
        obj.mesh.rotation.y = newRot;

        // Обновляем поворот в реестре
        this.registry.updateRotation(obj.id, newRot);
        obj.rotation = newRot;

        // Применяем полные повороты объекта (если есть X/Z повороты в метаданных)
        this.applyObjectRotation(obj);

        // Пересчитываем высоту после поворота (объект может "присесть" или "подняться")
        const h = this.getVisualGroundHeight(obj.position.x, obj.position.z, [obj.mesh]);
        this.adjustPositionToGround(obj.mesh, h);

        // Обновляем позицию в реестре после корректировки высоты
        this.registry.updatePosition(obj.id, obj.mesh.position);

        return true;
    }

    public rotateSelectedStep(): boolean {
        return this.rotateSelected(Math.PI / 2); // 90 degrees
    }

    private readonly registry: ObjectRegistry;
    private readonly snapSystem: SnapSystem;
    private readonly gridStep: number;

    private selectedObjectId: string | null = null;
    // Перетаскивание мышью убрано: управление только кнопками/клавишами

    // Параметры для динамических размеров
    private currentFloors = 1;
    private currentWidth = 8; // For houses
    private currentDepth = 8; // For houses
    private currentLength = 10; // For fences
    private currentHeight = 1.5; // For fences

    private previewPos: THREE.Vector3 | null = null;

    // Визуальные индикаторы
    private connectionIndicators: THREE.Mesh[] = [];
    private lastPlacementResult: PlacementResult | null = null;
    private currentRotation: number = 0;
    private lastPointerEvent: PointerEvent | null = null;
    private lastGridPos = { x: Infinity, z: Infinity, rot: -1 };

    // Debug
    private debugGroup = new THREE.Group();


    // Материалы для превью
    private validMat = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 });
    private invalidMat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });
    private connectionMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.7 });

    constructor(
        private world: World,
        private camera: THREE.Camera,
        private domElement: HTMLElement,
        _ui?: any
    ) {
        this.registry = new ObjectRegistry();
        const gridSize = 10; // Для snap системы (сетка привязки)
        this.gridStep = 1; // Шаг перемещения кнопками (1 единица = более точное управление)
        this.snapSystem = new SnapSystem(this.registry, {
            gridSize,
            connectionSnapDistance: 8,
            edgeSnapDistance: 5,
        });

        this.world.group.add(this.registry.group);

        this.initInput();

        // Debug setup
        this.world.group.add(this.debugGroup);
        // this.debugGroup.add(this.debugHitBox);
        // this.debugGroup.add(this.debugLine);
    }

    // Гизмо удалено: управление выделенными объектами только через кнопки и клавиши

    /**
     * Adjusts object position.y so that its lowest point (visual bottom) sits exactly on groundY.
     * Use this after rotation/scale changes to prevent sinking.
     */
    private adjustPositionToGround(obj: THREE.Object3D, groundY: number) {
        // Calculate World AABB
        // Note: setFromObject uses world transforms. Ensure matrix is updated.
        obj.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(obj);

        // Find current bottom
        const currentBottom = box.min.y;

        // Calculate shift needed
        const shift = groundY - currentBottom;

        // Prevent massive jumps if something is wrong (optional, but safe)
        if (Math.abs(shift) > 50) return; // Suspiciously large shift

        obj.position.y += shift;

        // Add microscopic bias to prevent z-fighting
        obj.position.y += 0.01;

        obj.updateMatrixWorld(true);
    }

    getRegistry(): ObjectRegistry { return this.registry; }

    public setTool(tool: string | null) {
        this.activeTool = tool as any;
        // Отладочное логирование для машин
        if (tool && (tool.startsWith("car") || tool === "bus")) {
            console.log("[BuildingSystem] setTool:", tool);
        }
        if (this.previewMesh) {
            this.world.group.remove(this.previewMesh);
            this.previewMesh = null;
        }
        this.clearConnectionIndicators();
        this.deselect();

        // Сброс параметров при смене инструмента
        if (tool === "house:residential") {
            this.currentFloors = 5;
        } else {
            this.currentFloors = 1;
        }
        this.currentWidth = 8;
        this.currentDepth = 8;
        this.currentLength = 10;
        this.currentHeight = 1.5;

        if (tool && tool !== "delete") {
            this.updatePreview();
        }

        if (this.onToolChange) {
            this.onToolChange(this.activeTool);
        }
    }
    private updatePreview() {
        if (this.previewMesh) {
            this.world.group.remove(this.previewMesh);
            this.previewMesh = null;
        }

        if (!this.activeTool || this.activeTool === "delete") return;

        const toolKey = this.activeTool;
        // Обрабатываем подтипы домов и машин
        const normalizedToolKey = toolKey.startsWith("house:") ? "house" : (toolKey.startsWith("car:") ? "car" : toolKey);
        const type: PlaceableType = this.isBuiltInTool(normalizedToolKey) ? normalizedToolKey : "prop";
        let obj: THREE.Object3D;

        // Use template if available (но не для car и bus, они создаются через Car/Bus классы)
        if (this.objectTemplates[toolKey] && type !== "car" && type !== "bus" && !toolKey.startsWith("car:")) {
            obj = this.objectTemplates[toolKey].clone(true);
            obj.position.set(0, 0, 0);
            obj.rotation.set(0, 0, 0);
            obj.scale.multiplyScalar(this.placementScale);
        }
        // Для машин используем превью геометрию или шаблон для превью
        else if (type === "car" || toolKey.startsWith("car:")) {
            // НАДЕЖНОЕ РЕШЕНИЕ: Используем превью геометрию для всех машин
            // Это гарантирует, что превью соответствует реальному объекту (процедурная модель)
            obj = new THREE.Mesh(this.createPreviewGeometry("car"), this.validMat);
        }
        // Все дома (включая Case) создаются процедурно
        else if (type === "house") {
            // Если это Case и есть GLTF шаблон - используем его для превью
            if (toolKey.startsWith("house:casa") && this.objectTemplates["casa"]) {
                obj = this.objectTemplates["casa"].clone(true);
                obj.rotation.y = this.currentRotation;
                const scale = Math.max(this.currentWidth, this.currentDepth) / 3.5;
                obj.scale.setScalar(scale);
            }
            // Если это Новый Дом и есть GLTF шаблон
            else if (toolKey.startsWith("house:house_01")) {
                if (this.objectTemplates["house_01"]) {
                    console.log("[BuildingSystem] Using house_01 template");
                    obj = this.objectTemplates["house_01"].clone(true);
                    obj.rotation.y = this.currentRotation;
                    // Масштаб 1.0 как в world.ts, или можно дать пользователю менять размер
                    // Используем currentWidth как множитель
                    const scale = this.currentWidth / 8.0; // 8.0 - базовый размер
                    obj.scale.setScalar(scale);
                } else {
                    console.error("[BuildingSystem] 'house_01' template NOT found! Keys:", Object.keys(this.objectTemplates));
                    // Fallback to procedural to avoid crash, but log error
                    const houseMetadata: any = {
                        width: this.currentWidth,
                        depth: this.currentDepth,
                        floors: this.currentFloors
                    };
                    obj = this.createHouseMesh(
                        this.previewPos || new THREE.Vector3(),
                        0,
                        this.currentRotation,
                        houseMetadata
                    );
                }
            }
            else {
                const houseMetadata: any = {
                    width: this.currentWidth,
                    depth: this.currentDepth,
                    floors: this.currentFloors
                };
                // Добавляем подтип дома в метаданные
                if (toolKey.startsWith("house:")) {
                    houseMetadata.houseSubtype = toolKey.substring(6); // "standard", "shop" или "casa"
                }
                houseMetadata.color = this.currentColor;
                obj = this.createHouseMesh(
                    this.previewPos || new THREE.Vector3(),
                    0,
                    this.currentRotation,
                    houseMetadata
                );
            }
        }

        else if (type === "bridge") obj = this.createBridgeMesh(new THREE.Vector3(), 0, this.currentRotation).mesh;
        else if (type === "road") obj = this.createRoadMesh(new THREE.Vector3(), 0, this.currentRotation).mesh;
        else if (type === "fence") {
            obj = this.createFenceMesh(
                this.previewPos || new THREE.Vector3(),
                0,
                this.currentRotation,
                { length: this.currentLength, height: this.currentHeight }
            );
        }
        else obj = new THREE.Mesh(this.createPreviewGeometry(type), this.validMat);

        this.previewMesh = obj;
        this.previewMesh.name = "placementPreview";

        // Применяем материал валидации ко всем мешам внутри (Case теперь процедурный)
        this.previewMesh.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material = this.validMat;
            }
        });

        if (this.previewPos) {
            this.previewMesh.position.copy(this.previewPos);
            if (type !== 'house' && type !== 'fence') this.previewMesh.rotation.y = this.currentRotation;
        }

        this.world.group.add(this.previewMesh);
    }

    // update select/deselect
    private deselect() {
        this.selectedObjectId = null;
        if (this.onSelectionChange) {
            this.onSelectionChange(null);
        }
    }

    private applyObjectRotationIfNeeded(obj: PlaceableObject) {
        const meta = (obj.metadata as any) ?? {};
        const rotX = Number(meta.rotationX) || 0;
        const rotZ = Number(meta.rotationZ) || 0;
        // Если есть повороты X или Z, применяем их
        if (Math.abs(rotX) > 0.001 || Math.abs(rotZ) > 0.001) {
            this.applyObjectRotation(obj);
        }
    }


    private selectObjectById(id: string | null) {
        if (!id) return;
        const obj = this.registry.get(id);
        if (!obj) return;
        this.selectedObjectId = id;

        // ВЫРАВНИВАНИЕ УГЛА К СЕТКЕ при выборе: если объект стоит неровно, выравниваем его
        // Это гарантирует, что все объекты всегда стоят ровно относительно сетки (как красное авто, а не как синее)
        this.snapRotationToGrid(obj);

        // Применяем повороты объекта при выборе
        this.applyObjectRotationIfNeeded(obj);
        if (this.onSelectionChange) {
            this.onSelectionChange(obj);
        }
    }

    /**
     * Выравнивает угол поворота объекта к сетке (округление к ближайшим 90°)
     * Для автомобилей не применяется - разрешаем произвольные углы
     */
    private snapRotationToGrid(obj: PlaceableObject): void {
        // Для автомобилей не выравниваем к сетке - разрешаем произвольные углы
        if (obj.type === "car" || obj.type === "bus") {
            return; // Не применяем выравнивание для автомобилей
        }

        const snapAngle = Math.PI / 2; // 90 градусов
        let currentRot = obj.rotation % (Math.PI * 2);
        if (currentRot < 0) currentRot += Math.PI * 2;

        // Округляем к ближайшим 90°
        const snappedRot = Math.round(currentRot / snapAngle) * snapAngle;
        const normalizedRot = snappedRot % (Math.PI * 2);
        const finalRot = normalizedRot < 0 ? normalizedRot + Math.PI * 2 : normalizedRot;

        // Если угол изменился - применяем новый угол
        if (Math.abs(finalRot - currentRot) > 0.01) {
            obj.rotation = finalRot;
            obj.mesh.rotation.y = finalRot;
            this.registry.updateRotation(obj.id, finalRot);

            // Пересчитываем высоту после выравнивания
            const h = this.getVisualGroundHeight(obj.position.x, obj.position.z, [obj.mesh]);
            this.adjustPositionToGround(obj.mesh, h);
            this.registry.updatePosition(obj.id, obj.mesh.position);
        }
    }

    private updateObjectRegistration(obj: PlaceableObject) {
        const width = (obj.metadata?.width as number) || 8;
        const depth = (obj.metadata?.depth as number) || 8;
        const floors = (obj.metadata?.floors as number) || 1;

        // Пересчитываем границы на основе реальных размеров из метаданных
        const sizeY = 0.5 + 1.2 + (floors * 2.4) + 1.1; // foundation + sill + floors + margin

        // Мы можем временно подменить size в snapSystem или передать параметры
        // Но проще использовать estimateBounds с типом, а потом расширить бокс если нужно.
        // Или добавить в SnapSystem поддержку кастомных размеров.

        const b = this.snapSystem.estimateBounds(obj.type, obj.position, obj.rotation);
        // Если размеры кастомные — расширяем bounds
        if (width > 8 || depth > 8 || floors > 1) {
            const halfX = width / 2 - 0.3;
            const halfZ = depth / 2 - 0.3;
            b.min.x = obj.position.x - halfX;
            b.max.x = obj.position.x + halfX;
            b.min.z = obj.position.z - halfZ;
            b.max.z = obj.position.z + halfZ;
            b.max.y = obj.position.y + sizeY;
        }
        obj.bounds = b;
        obj.mesh.userData.placeableId = obj.id;
    }

    private createPreviewGeometry(type: PlaceableType): THREE.BufferGeometry {
        const geo = new THREE.BoxGeometry(1, 1, 1);
        geo.translate(0, 0.5, 0);
        switch (type) {
            case "bridge": geo.scale(10, 1, 10); break;
            case "house": geo.scale(8, 8, 8); break;
            case "car": geo.scale(2, 2, 4); break;
            case "bus": geo.scale(2.8 * 3, 2.8 * 3, 9 * 3); break;
            case "fence": geo.scale(10, 1.5, 0.5); break;
            case "road": geo.scale(10, 0.3, 10); break;
            case "tree": geo.scale(2, 5, 2); break;
            case "lamp": geo.scale(0.5, 6, 0.5); break;
            case "sport": geo.scale(20, 0.2, 30); break;
            case "prop": geo.scale(2, 2, 2); break;
        }
        return geo;
    }

    private initInput() {
        this.domElement.addEventListener("pointermove", (e) => {
            this.lastPointerEvent = e;
            if (this.activeTool) {
                this.onMove(e);
            }
        });
        this.domElement.addEventListener("pointerdown", () => {
            const activeEl = document.activeElement as HTMLElement | null;
            if (activeEl) {
                const tag = (activeEl.tagName ?? "").toLowerCase();
                if (tag === "input" || tag === "select" || tag === "textarea") {
                    activeEl.blur();
                }
            }
            // onClick обрабатывается в pointerup
        });

        this.domElement.addEventListener("pointerup", (e) => {
            this.onClick(e);
        });
        // Важно: слушаем на document в capture, иначе стрелки могут “съедаться” браузером/фокусом.
        document.addEventListener("keydown", (e) => {
            const activeEl = document.activeElement as HTMLElement | null;
            const tag = (activeEl?.tagName ?? "").toLowerCase();
            const editingFocused =
                tag === "input" || tag === "textarea" || tag === "select" || activeEl?.isContentEditable === true;

            if (this.activeTool) {
                const key = e.key;
                const keyLower = key.toLowerCase();
                // const code = e.code;

                if (keyLower === "r") {
                    this.currentRotation = (this.currentRotation + Math.PI / 2) % (Math.PI * 2);
                    if (this.lastPointerEvent) this.onMove(this.lastPointerEvent);
                    this.updatePreview();
                }

                // Q/E: Fine rotation for ALL tools (cars, houses, props, etc.)
                if (!editingFocused && (key.toLowerCase() === "q" || key.toLowerCase() === "e")) {
                    const toolKey = this.activeTool as string;
                    const normalizedKey = toolKey.startsWith("car:") ? "car" : toolKey;
                    const type: PlaceableType = this.isBuiltInTool(normalizedKey) ? normalizedKey : "prop";

                    // If it's a surface-aligned prop, rotate roll
                    if (type === "prop" && this.alignPropsToSurface) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.surfaceRoll += (key.toLowerCase() === "q" ? -Math.PI / 8 : Math.PI / 8);
                        if (this.lastPointerEvent) this.onMove(this.lastPointerEvent);
                    } else {
                        // Standard Y-axis rotation for everything else (cars, houses, etc.)
                        e.preventDefault();
                        // Fine rotation step: 15 degrees (PI/12)
                        const step = Math.PI / 12;
                        this.currentRotation += (key.toLowerCase() === "q" ? -step : step);
                        // Normalize
                        this.currentRotation = (this.currentRotation + Math.PI * 2) % (Math.PI * 2);

                        if (this.lastPointerEvent) this.onMove(this.lastPointerEvent);
                        this.updatePreview();
                    }
                }

                // Обработка изменения размеров
                let changed = false;
                if (this.activeTool === "house" || (this.activeTool && this.activeTool.startsWith("house:"))) {
                    if (key === "ArrowUp") { this.currentFloors = Math.min(20, this.currentFloors + 1); changed = true; }
                    if (key === "ArrowDown") { this.currentFloors = Math.max(1, this.currentFloors - 1); changed = true; }
                    if (key === "ArrowRight") {
                        this.currentWidth += 2;
                        this.currentDepth += 2;
                        changed = true;
                    }
                    if (key === "ArrowLeft") {
                        this.currentWidth = Math.max(4, this.currentWidth - 2);
                        this.currentDepth = Math.max(4, this.currentDepth - 2);
                        changed = true;
                    }
                } else if (this.activeTool === "fence") {
                    if (key === "ArrowUp") { this.currentHeight = Math.min(5, this.currentHeight + 0.5); changed = true; }
                    if (key === "ArrowDown") { this.currentHeight = Math.max(0.5, this.currentHeight - 0.5); changed = true; }
                    if (key === "ArrowRight") { this.currentLength += 2; changed = true; }
                    if (key === "ArrowLeft") { this.currentLength = Math.max(2, this.currentLength - 2); changed = true; }
                }

                if (changed) {
                    e.preventDefault();
                    this.updatePreview();
                }
            } else if (this.selectedObjectId) {
                if (editingFocused) return;
                // Режим редактирования выделенного объекта (когда инструмент не выбран)
                const key = e.key;
                const keyLower = key.toLowerCase();
                const code = e.code;

                const obj = this.registry.get(this.selectedObjectId);

                // Удаление выделенного
                if (key === "Delete" || key === "Backspace") {
                    e.preventDefault();
                    const id = this.selectedObjectId;
                    this.deselect();
                    this.registry.remove(id);
                    return;
                }

                const isProp = obj?.type === "prop";
                const meta = (obj?.metadata as any) ?? {};
                const hasSurface = isProp && meta?.alignToSurface && meta?.surfaceNormal;

                // Вращение
                if (keyLower === "r") {
                    e.preventDefault();
                    if (hasSurface && obj) {
                        meta.surfaceRoll = (Number(meta.surfaceRoll) || 0) + Math.PI / 2;
                        obj.metadata = meta;
                        this.applySurfaceOrientationCustom(obj.mesh, new THREE.Vector3(
                            meta.surfaceNormal.x, meta.surfaceNormal.y, meta.surfaceNormal.z
                        ), meta.surfaceRoll, !!meta.flipNormal);
                        return;
                    }
                    this.rotateSelected(Math.PI / 2);
                    return;
                }
                if (keyLower === "q") {
                    e.preventDefault();
                    if (hasSurface && obj) {
                        meta.surfaceRoll = (Number(meta.surfaceRoll) || 0) - Math.PI / 8;
                        obj.metadata = meta;
                        this.applySurfaceOrientationCustom(obj.mesh, new THREE.Vector3(
                            meta.surfaceNormal.x, meta.surfaceNormal.y, meta.surfaceNormal.z
                        ), meta.surfaceRoll, !!meta.flipNormal);
                        return;
                    }
                    this.rotateSelected(-Math.PI / 4);
                    return;
                }
                if (keyLower === "e") {
                    e.preventDefault();
                    if (hasSurface && obj) {
                        meta.surfaceRoll = (Number(meta.surfaceRoll) || 0) + Math.PI / 8;
                        obj.metadata = meta;
                        this.applySurfaceOrientationCustom(obj.mesh, new THREE.Vector3(
                            meta.surfaceNormal.x, meta.surfaceNormal.y, meta.surfaceNormal.z
                        ), meta.surfaceRoll, !!meta.flipNormal);
                        return;
                    }
                    this.rotateSelected(Math.PI / 4);
                    return;
                }

                // Перевернуть сторону
                if (keyLower === "f" && obj) {
                    e.preventDefault();
                    if (hasSurface) {
                        meta.flipNormal = !meta.flipNormal;
                        obj.metadata = meta;
                        this.applySurfaceOrientationCustom(obj.mesh, new THREE.Vector3(
                            meta.surfaceNormal.x, meta.surfaceNormal.y, meta.surfaceNormal.z
                        ), Number(meta.surfaceRoll) || 0, !!meta.flipNormal);
                    } else {
                        this.rotateSelected(Math.PI);
                    }
                    return;
                }

                // Переворачивание вокруг X оси (на бок)
                // Shift+X: поворот на 90 градусов, X: поворот на 15 градусов
                const isKeyX = code === "KeyX" || keyLower === "x";
                if (isKeyX && obj) {
                    e.preventDefault();
                    e.stopPropagation();
                    const step = e.shiftKey ? Math.PI / 2 : Math.PI / 12; // 90° или 15°
                    const rotX = (Number(meta.rotationX) || 0) + step;
                    // Нормализуем угол в диапазон 0-2π
                    meta.rotationX = ((rotX % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2);
                    obj.metadata = meta;
                    this.applyObjectRotation(obj);
                    return;
                }

                // Переворачивание вокруг Z оси (вверх ногами)
                // Shift+Z: поворот на 90 градусов, Z: поворот на 15 градусов
                const isKeyZ = code === "KeyZ" || keyLower === "z";
                if (isKeyZ && obj) {
                    e.preventDefault();
                    e.stopPropagation();
                    const step = e.shiftKey ? Math.PI / 2 : Math.PI / 12; // 90° или 15°
                    const rotZ = (Number(meta.rotationZ) || 0) + step;
                    // Нормализуем угол в диапазон 0-2π
                    meta.rotationZ = ((rotZ % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2);
                    obj.metadata = meta;
                    this.applyObjectRotation(obj);
                    return;
                }

                // Сброс поворотов X и Z (Ctrl+R или 0)
                const isReset = key === "0" || code === "Digit0" || (e.ctrlKey && (keyLower === "r" || code === "KeyR"));
                if (isReset && obj) {
                    e.preventDefault();
                    meta.rotationX = 0;
                    meta.rotationZ = 0;
                    obj.metadata = meta;
                    this.applyObjectRotation(obj);
                    return;
                }

                // Масштаб (только для prop)
                if (isProp && (key === "+" || key === "=" || key === "-" || key === "_")) {
                    e.preventDefault();
                    const cur = Number(meta.scale) || 1;
                    const delta = (key === "-" || key === "_") ? -0.1 : 0.1;
                    this.setSelectedScale(cur + delta);
                    return;
                }

                // Перемещение стрелками
                const step = e.shiftKey ? this.gridStep * 2 : this.gridStep;
                if (key === "ArrowUp") { e.preventDefault(); e.stopPropagation(); this.moveSelected(0, step); return; }
                if (key === "ArrowDown" || keyLower === "s") { e.preventDefault(); e.stopPropagation(); this.moveSelected(0, -step); return; }
                if (key === "ArrowLeft" || key.toLowerCase() === "a") { e.preventDefault(); e.stopPropagation(); this.moveSelected(-step, 0); return; }
                if (key === "ArrowRight" || key.toLowerCase() === "d") { e.preventDefault(); e.stopPropagation(); this.moveSelected(step, 0); return; }
            }
        }, true);
    }

    private getIntersection(e: PointerEvent): THREE.Vector3 | null {
        const toolKey = (this.activeTool && this.activeTool !== "delete") ? (this.activeTool as string) : "";
        // Нормализуем toolKey: car:gltf -> car, house:casa -> house
        const normalizedKey = toolKey ? (toolKey.startsWith("car:") ? "car" : (toolKey.startsWith("house:") ? "house" : toolKey)) : "";
        const type: PlaceableType = normalizedKey ? (this.isBuiltInTool(normalizedKey) ? normalizedKey : "prop") : "prop";

        const mouse = this.getPointerNDC(e);
        this.raycaster.setFromCamera(mouse, this.camera);

        // Для “пропсов” с включённым “прилипанием к поверхности” — ищем любую подходящую поверхность
        if (type === "prop" && this.alignPropsToSurface) {
            const hit = this.getPlacementHit(e);
            if (hit) {
                this.surfaceNormal.copy(hit.normal);
                return hit.point;
            }
            // Если не нашли поверхность — fallback на землю
        }

        // Для остальных случаев (включая prop без прилипания) — всегда по земле
        const hits = this.world.intersectTerrain(this.raycaster);
        if (hits && hits.length > 0) {
            const point = hits[0].point;
            // Для prop без прилипания устанавливаем нормаль "вверх"
            if (type === "prop") {
                this.surfaceNormal.set(0, 1, 0);

                // CRITICAL: Upgrade height to Visual Ground (Roads/Sidewalks)
                // intersectTerrain only hits the terrain mesh. If there's a road above, we want to be on the road.
                const visualY = this.getVisualGroundHeight(point.x, point.z);
                // Only upgrade if visualY is higher (to avoid falling into basements or weird raycasts)
                // Actually getVisualGroundHeight handles prioritization (Raycast from sky).
                point.y = visualY;
            }
            return point;
        }

        return null;
    }

    private onMove(e: PointerEvent) {
        if (!this.activeTool || !this.previewMesh || this.activeTool === "delete") return;
        const point = this.getIntersection(e);
        if (!point) {
            this.previewMesh.visible = false;
            this.clearConnectionIndicators();
            return;
        }
        this.previewMesh.visible = true;
        const gx = Math.round(point.x / 1), gz = Math.round(point.z / 1);
        if (gx === this.lastGridPos.x && gz === this.lastGridPos.z && this.currentRotation === this.lastGridPos.rot) return;
        this.lastGridPos = { x: gx, z: gz, rot: this.currentRotation };

        const toolKey = this.activeTool as string;
        // Нормализуем toolKey: car:gltf -> car, house:casa -> house
        const normalizedKey = toolKey.startsWith("car:") ? "car" : (toolKey.startsWith("house:") ? "house" : toolKey);
        const type: PlaceableType = this.isBuiltInTool(normalizedKey) ? normalizedKey : "prop";
        const customSize =
            (type === "prop" && this.objectTemplateSizes[toolKey])
                ? this.objectTemplateSizes[toolKey].clone().multiplyScalar(this.placementScale)
                : undefined;
        // Если это “prop” или декорация и включён свободный режим — разрешаем ставить везде.
        const isDecoration = type === "prop" || type === "tree" || type === "rock" || type === "bush" ||
            type === "lamp" || type === "bench" || type === "car" || type === "bus" || type === "sign" || type === "fence";

        const result =
            (isDecoration && this.freePlacementForProps)
                ? {
                    success: true,
                    replacedObjects: [],
                    connectedTo: [],
                    finalPosition: point.clone(),
                    finalRotation: this.currentRotation,
                } as any
                : this.snapSystem.calculatePlacement(type, point, this.currentRotation, customSize);
        this.lastPlacementResult = result;

        this.previewPos = result.finalPosition.clone();
        this.previewMesh.position.copy(result.finalPosition);

        if (type !== 'house' && type !== 'fence') {
            this.previewMesh.rotation.y = result.finalRotation;
        }
        // House и fence обновляются через updatePreview/create... методы, где rotation уже зашит или требует пересоздания для визуализации (напр, если форма зависит от поворота? нет, но пусть будет единообразно)
        // Однако updatePreview вызывается при нажатии клавиш. При движении мыши (onMove) мы можем просто крутить меш, если он не меняет форму.
        // House/Fence shape не зависит от rotation в createHouseMesh (кроме hideSides логики, которая зависит от соседей).
        // Так что можно и тут крутить. 
        if (type === 'house' || type === 'fence') {
            this.previewMesh.rotation.y = result.finalRotation;
        }
        // Высота: для prop берём точку клика (можно ставить на крышу/стену),
        // для остальных оставляем “по земле”.
        if (type === "prop") {
            // Если включено прилипание к поверхности, используем точку пересечения (стена/крыша),
            // иначе берём высоту мира (земля/дорога), чтобы не проваливаться.
            if (this.alignPropsToSurface) {
                this.previewMesh.position.y = result.finalPosition.y;
            } else {
                this.previewMesh.position.y = this.world.getWorldHeight(result.finalPosition.x, result.finalPosition.z);
            }
        } else {
            const useVisualHeight = (type === "car" || type === "bus") || toolKey?.startsWith("car:");
            let h = this.world.getWorldHeight(result.finalPosition.x, result.finalPosition.z);
            if (useVisualHeight) {
                h = this.getVisualGroundHeight(result.finalPosition.x, result.finalPosition.z, [this.previewMesh]);
            }
            this.previewMesh.position.y = (type === "bridge") ? Math.max(0, h) : h;
        }

        // Ориентация prop по поверхности (для окон/кондиционеров на стенах)
        if (type === "prop" && this.alignPropsToSurface) {
            this.applySurfaceOrientation(this.previewMesh, this.surfaceNormal);
        } else if (type === "prop") {
            // If not aligning to surface, adjust based on bounding box to sit on ground
            const h = this.getVisualGroundHeight(result.finalPosition.x, result.finalPosition.z, [this.previewMesh]);
            this.previewMesh.position.y = h;
            this.adjustPositionToGround(this.previewMesh, h);
        }

        // Применяем материал валидации для всех домов (включая Case, так как он теперь процедурный)
        const mat = result.success ? this.validMat : this.invalidMat;
        this.previewMesh.traverse(child => { if (child instanceof THREE.Mesh) child.material = mat; });
        if (type === "bridge" || type === "road") this.updateConnectionIndicators(point, type);
        else this.clearConnectionIndicators();
    }

    private onClick(e: PointerEvent) {
        if (e.button !== 0) return;
        if (this.activeTool) {
            if (this.activeTool === "delete") this.deleteObject(e);
            else {
                // Отладочное логирование для машин
                if (this.activeTool.startsWith("car") || this.activeTool === "bus") {
                    console.log("[BuildingSystem] onClick:", {
                        activeTool: this.activeTool,
                        hasPlacementResult: !!this.lastPlacementResult,
                        placementSuccess: this.lastPlacementResult?.success
                    });
                }

                if (this.lastPlacementResult?.success) {
                    const point = this.getIntersection(e);
                    if (!point) {
                        console.warn("[BuildingSystem] No intersection point found");
                        return;
                    }
                    // Stop propagation to prevent player movement/entering cars
                    e.stopPropagation();

                    // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: lastPlacementResult может быть устаревшим
                    // Пересчитываем placement result с актуальным currentRotation перед размещением
                    const toolKey = this.activeTool as string;
                    const normalizedKey = toolKey.startsWith("car:") ? "car" : (toolKey.startsWith("house:") ? "house" : toolKey);
                    const type: PlaceableType = this.isBuiltInTool(normalizedKey) ? normalizedKey : "prop";
                    const isDecoration = type === "prop" || type === "tree" || type === "rock" || type === "bush" ||
                        type === "lamp" || type === "bench" || type === "car" || type === "bus" || type === "sign" || type === "fence";

                    // Пересчитываем result с актуальным currentRotation
                    const freshResult = (isDecoration && this.freePlacementForProps)
                        ? {
                            success: true,
                            replacedObjects: [],
                            connectedTo: [],
                            finalPosition: point.clone(),
                            finalRotation: this.currentRotation, // ИСПОЛЬЗУЕМ АКТУАЛЬНЫЙ currentRotation!
                        } as any
                        : this.snapSystem.calculatePlacement(type, point, this.currentRotation, undefined);

                    const placed = this.placeObject(this.activeTool as string, freshResult);
                    if (!placed) {
                        console.error("[BuildingSystem] Failed to place object, toolKey:", this.activeTool);
                        return;
                    }

                    if (this.autoSelectAfterPlace && !e.shiftKey) {
                        this.setTool(null);
                        this.selectObjectById(placed.id);
                    }
                } else {
                    console.warn("[BuildingSystem] Placement result not successful or missing, toolKey:", this.activeTool);
                }
            }
        } else {
            this.selectObjectAt(e);
        }
    }

    private selectObjectAt(e: PointerEvent) {
        const mouse = this.getPointerNDC(e);
        this.raycaster.setFromCamera(mouse, this.camera);
        const hits = this.raycaster.intersectObjects(this.registry.group.children, true);
        if (hits.length > 0) {
            let obj: THREE.Object3D | null = hits[0].object;
            while (obj && !obj.userData.placeableId) obj = obj.parent;
            if (obj && obj.userData.placeableId) {
                this.selectedObjectId = obj.userData.placeableId;
                const placeableObj = this.selectedObjectId ? this.registry.get(this.selectedObjectId) : null;
                // Stop propagation to prevent camera jump/player move
                e.stopPropagation();

                // ВЫРАВНИВАНИЕ УГЛА К СЕТКЕ при выборе: если объект стоит неровно, выравниваем его
                // Это гарантирует, что все объекты всегда стоят ровно относительно сетки (как красное авто, а не как синее)
                if (placeableObj) {
                    this.snapRotationToGrid(placeableObj);
                    this.applyObjectRotationIfNeeded(placeableObj);
                }
                if (this.onSelectionChange) {
                    this.onSelectionChange(placeableObj ?? null);
                }
                return;
            }
        }
        this.deselect();
    }



    private getPointerNDC(e: PointerEvent): THREE.Vector2 {
        const rect = this.domElement.getBoundingClientRect();
        return new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    }

    private isPointOnRoad(x: number, z: number, padding = 0): boolean {
        const roads = WORLD_CONFIG.roads ?? [];
        for (const r of roads) {
            const rot = r.rotation ?? 0;
            const local = worldToLocalXZ(r.position.x, r.position.z, rot, x, z);
            if (Math.abs(local.x) <= r.width / 2 + padding && Math.abs(local.z) <= r.length / 2 + padding) return true;
        }
        return false;
    }

    private getRoadOffsetForObject(mesh: THREE.Object3D, position: THREE.Vector3, _type: PlaceableType): number {
        // Для машин специальный оффсет не нужен, так как pivot уже настроен корректно (внизу)
        // и getWorldHeight возвращает верную высоту поверхности дороги.

        // Для других объектов проверяем, находится ли объект на дороге
        const isOnRoad = this.isPointOnRoad(position.x, position.z, 0);
        if (!isOnRoad) {
            return 0;
        }

        // Для объектов на дорогах вычисляем нижнюю точку mesh
        mesh.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(mesh);
        const minY = box.min.y;
        const meshBottomOffset = Math.abs(minY - mesh.position.y);

        // getWorldHeight возвращает поверхность дороги.
        // Поднимаем на meshBottomOffset (чтобы дно было на уровне h)
        // + маленький зазор 0.02 для избежания z-fighting.
        return meshBottomOffset + 0.02;
    }

    private placeObject(toolKey: string, result: PlacementResult): PlaceableObject | null {
        // Обрабатываем подтипы домов и машин
        // ВАЖНО: normalizedToolKey используется только для определения type, но для создания объекта используем оригинальный toolKey!
        const normalizedToolKey = toolKey.startsWith("house:") ? "house" : (toolKey.startsWith("car:") ? "car" : toolKey);
        const type: PlaceableType = this.isBuiltInTool(normalizedToolKey) ? normalizedToolKey : "prop";

        // Отладочное логирование
        if (toolKey.startsWith("car") || toolKey === "bus") {
            console.log("[BuildingSystem] placeObject:", {
                toolKey,
                normalizedToolKey,
                type,
                availableTemplates: {
                    car: !!this.objectTemplates["car"],
                    car_gltf: !!this.objectTemplates["car_gltf"],
                    bus: !!this.objectTemplates["bus"]
                }
            });
        }
        const { finalPosition, finalRotation: rawRotation, replacedObjects, connectedTo, mergeWith } = result;

        // ВЫРАВНИВАНИЕ УГЛА К СЕТКЕ ПЕРЕД созданием объекта
        // Для автомобилей разрешаем произвольные углы (или мелкую сетку), для остальных - 90 градусов
        let snapAngle: number;
        if (type === "car" || type === "bus" || toolKey?.startsWith("car:")) {
            // Для автомобилей: произвольные углы (без выравнивания к сетке)
            // Или можно использовать мелкую сетку, например 15 градусов: snapAngle = Math.PI / 12;
            snapAngle = 0; // 0 = без выравнивания, произвольные углы
        } else {
            // Для остальных объектов: выравнивание к 90 градусам
            snapAngle = Math.PI / 2; // 90 градусов
        }

        let finalRotation = rawRotation % (Math.PI * 2);
        if (finalRotation < 0) finalRotation += Math.PI * 2;

        // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Если автомобиль размещается на парковке, выравниваем его по углу парковки
        if ((type === "car" || type === "bus" || toolKey?.startsWith("car:")) && this.world.buildingManager) {
            const parkingRotation = this.world.buildingManager.getParkingRotation(finalPosition.x, finalPosition.z, 0.5);
            if (parkingRotation !== null) {
                // Используем угол поворота парковки - машина должна быть параллельна линиям разметки
                const oldRotation = finalRotation;
                finalRotation = parkingRotation;
                console.log(`[BuildingSystem] ✓ Car on parking lot - aligned to parking lines:`);
                console.log(`  Position: (${finalPosition.x.toFixed(2)}, ${finalPosition.z.toFixed(2)})`);
                console.log(`  Old rotation: ${(oldRotation * 180 / Math.PI).toFixed(1)}° → New rotation: ${(parkingRotation * 180 / Math.PI).toFixed(1)}°`);
            } else {
                console.log(`[BuildingSystem] Car NOT on parking lot at (${finalPosition.x.toFixed(2)}, ${finalPosition.z.toFixed(2)})`);
            }
        }

        // Отладочное логирование для автомобилей
        if (type === "car" || type === "bus" || toolKey?.startsWith("car:")) {
            const rawDeg = (rawRotation * 180 / Math.PI).toFixed(1);
            const finalDeg = (finalRotation * 180 / Math.PI).toFixed(1);
            console.log(`[BuildingSystem] Car rotation: rawRotation=${rawDeg}°, finalRotation=${finalDeg}°, snapAngle=${snapAngle > 0 ? (snapAngle * 180 / Math.PI).toFixed(0) + '°' : 'disabled'}`);
        }

        // Выравниваем к сетке только если snapAngle > 0
        if (snapAngle > 0) {
            finalRotation = Math.round(finalRotation / snapAngle) * snapAngle;
            finalRotation = finalRotation % (Math.PI * 2);
            if (finalRotation < 0) finalRotation += Math.PI * 2;
        }

        // const h = this.world.getWorldHeight(finalPosition.x, finalPosition.z); // Legacy terrain-only
        const h = this.getVisualGroundHeight(finalPosition.x, finalPosition.z); // Raycast including roads

        // Вертикальное слияние (дом на дом)
        if (type === "house" && mergeWith && mergeWith.length > 0) {
            const target = mergeWith[0];
            // Проверяем, находится ли новая позиция ПРЯМО над существующим домом
            const isVerticalMerge = Math.abs(finalPosition.x - target.position.x) < 0.5 &&
                Math.abs(finalPosition.z - target.position.z) < 0.5 &&
                finalPosition.y > target.position.y + 1;

            if (isVerticalMerge) {
                target.metadata = target.metadata || {};
                const currentFloors = (target.metadata.floors as number) || 1;
                target.metadata.floors = currentFloors + 1;
                this.refreshHouseVisual(target);
                console.log(`[BuildingSystem] Vertical merge: building ${target.id} now has ${target.metadata.floors} floors`);
                return null;
            }

            // Горизонтальное слияние (дом в дом такой же высоты)
            const targetFloors = (target.metadata?.floors as number) || 1;

            // Если дома одной высоты и стоят в ряд
            const isHorizontalMerge = Math.abs(finalPosition.y - target.position.y) < 0.5 && targetFloors === 1;
            // (Для простоты пока сливаем только 1-этажные в длинные, для многоэтажных оставим стыковку)

            if (isHorizontalMerge && Math.abs(finalRotation - target.rotation) < 0.1) {
                // Если они выравниваются по осям
                const diff = finalPosition.clone().sub(target.position).applyAxisAngle(new THREE.Vector3(0, 1, 0), -target.rotation);
                if (Math.abs(diff.x) > 7.5 && Math.abs(diff.x) < 8.5 && Math.abs(diff.z) < 0.5) {
                    // Сливаем по X
                    target.metadata = target.metadata || {};
                    target.metadata.width = ((target.metadata.width as number) || 8) + 8;
                    // Смещаем центр
                    target.position.add(finalPosition.clone().sub(target.position).multiplyScalar(0.5));
                    this.refreshHouseVisual(target);
                    return null;
                }
                if (Math.abs(diff.z) > 7.5 && Math.abs(diff.z) < 8.5 && Math.abs(diff.x) < 0.5) {
                    // Сливаем по Z
                    target.metadata = target.metadata || {};
                    target.metadata.depth = ((target.metadata.depth as number) || 8) + 8;
                    target.position.add(finalPosition.clone().sub(target.position).multiplyScalar(0.5));
                    this.refreshHouseVisual(target);
                    return null;
                }
            }
        }

        for (const obj of replacedObjects) this.registry.remove(obj.id);

        let mesh: THREE.Object3D;
        let connectionPoints: PlaceableObject["connectionPoints"] = [];

        // Case использует загруженный GLTF шаблон напрямую
        // Также поддерживаем generic houses (house:subtype) если есть шаблон
        const plainKey = toolKey.replace("house:", "");
        const templateToUse = this.objectTemplates[toolKey] || this.objectTemplates[plainKey];

        if (templateToUse && type !== "car" && type !== "bus" && !toolKey?.startsWith("car:")) {
            mesh = templateToUse.clone(true);
            // Для prop ставим по точке клика (можно на крышу/стену), для остальных — на землю.
            // ... (rest of logic)
            // FIX: Если prop без прилипания — форсируем высоту поверхности (дороги), чтобы не проваливался.
            let y = finalPosition.y;
            if (type === "prop" && !this.alignPropsToSurface) {
                // Determine best ground height
                y = this.getVisualGroundHeight(finalPosition.x, finalPosition.z);
            } else if (type !== "prop") {
                y = h;
            }
            mesh.position.set(finalPosition.x, y, finalPosition.z);

            // Поворот: для prop берём ориентацию превью (если была), иначе — yaw.
            if (type === "prop" && this.previewMesh) {
                mesh.quaternion.copy(this.previewMesh.quaternion);
            } else {
                // ВАЖНО: сбрасываем все повороты шаблона перед установкой нового угла
                // Это гарантирует, что объекты всегда стоят ровно относительно сетки
                mesh.rotation.set(0, 0, 0);
                mesh.quaternion.set(0, 0, 0, 1);
                mesh.rotation.y = finalRotation; // Устанавливаем выровненный угол
            }
            mesh.scale.multiplyScalar(this.placementScale);
            mesh.traverse(c => { if (c instanceof THREE.Mesh) { c.castShadow = true; c.receiveShadow = true; } });
        } else {
            switch (type) {
                case "car": {
                    // ВАЖНО: используем оригинальный toolKey, а не normalizedToolKey!
                    console.log("[BuildingSystem] Creating car, toolKey:", toolKey, "type:", type);

                    // НАДЕЖНОЕ РЕШЕНИЕ: Для car:gltf используем GLTF модель (квадратная), для car - процедурную (эллипс)
                    if (toolKey === "car:gltf") {
                        // Новая машина из GLTF модели (квадратная)
                        mesh = this.createCarFromGLTF(finalPosition, finalRotation, h, false);
                    } else if (toolKey === "car") {
                        // Старая машина - процедурная модель (эллипс)
                        mesh = this.createCarReliable(toolKey, finalPosition, finalRotation, h);
                    } else {
                        console.error("[BuildingSystem] Unknown car toolKey:", toolKey);
                        return null;
                    }
                } break;
                case "bus": {
                    console.log("[BuildingSystem] Creating bus, toolKey:", toolKey);
                    if (!this.objectTemplates["bus"]) {
                        console.error("[BuildingSystem] bus template not found!");
                        return null;
                    }
                    const bus = new Bus([], {
                        template: this.objectTemplates["bus"],
                        parked: true,
                        plateText: "BUS-" + Math.floor(Math.random() * 999)
                    });
                    // ВАЖНО: сбрасываем все повороты шаблона перед установкой нового угла
                    // Это гарантирует, что объект будет стоять ровно относительно сетки
                    bus.object.rotation.set(0, 0, 0);
                    bus.object.quaternion.set(0, 0, 0, 1);
                    bus.object.position.copy(finalPosition);
                    bus.object.position.y = h;
                    bus.object.rotation.y = finalRotation; // Устанавливаем выровненный угол
                    mesh = bus.object;
                } break;
                case "fence": mesh = this.createFenceMesh(finalPosition, h, finalRotation); break;
                case "bridge":
                    const br = this.createBridgeMesh(finalPosition, h, finalRotation);
                    mesh = br.mesh; connectionPoints = br.connectionPoints; break;
                case "road":
                    const rr = this.createRoadMesh(finalPosition, 0, finalRotation);
                    mesh = rr.mesh; connectionPoints = rr.connectionPoints; break;
                case "house": {
                    // 1. Classic Shop (Custom Procedural)


                    // 2. GLB Templates (casa, house_01, etc.)
                    const plainKey = toolKey.replace("house:", "");
                    const tpl = this.objectTemplates[toolKey] || this.objectTemplates[plainKey];

                    if (tpl) {
                        mesh = tpl.clone(true);
                        mesh.position.set(finalPosition.x, h, finalPosition.z);

                        // Reset rotation
                        mesh.rotation.set(0, 0, 0);
                        mesh.quaternion.set(0, 0, 0, 1);
                        mesh.rotation.y = finalRotation;

                        // Apply scale
                        let scale = this.currentWidth / 8.0; // Default
                        if (plainKey === "casa") {
                            scale = Math.max(this.currentWidth, this.currentDepth) / 3.5;
                        }
                        mesh.scale.setScalar(scale);

                        mesh.traverse(c => {
                            if (c instanceof THREE.Mesh) {
                                c.castShadow = true;
                                c.receiveShadow = true;
                            }
                        });
                    } else {
                        // 3. Missing Template Handling
                        const isGlbType = toolKey.includes("house_01") || toolKey.includes("casa") || toolKey.includes("new_house");
                        if (isGlbType) {
                            console.error(`[BuildingSystem] Template for ${toolKey} missing. Aborting to prevent box fallback.`);
                            return null;
                        }

                        // 4. Standard Procedural
                        const houseMetadata: any = {
                            width: this.currentWidth,
                            depth: this.currentDepth,
                            floors: this.currentFloors,
                            houseSubtype: plainKey || "standard"
                        };
                        mesh = this.createHouseMesh(finalPosition, h, finalRotation, houseMetadata);
                    }
                } break;

                default:
                    // Для неизвестных типов создаем куб, но логируем ошибку
                    console.error("[BuildingSystem] Unknown type in placeObject:", type, "toolKey:", toolKey);
                    const geo = new THREE.BoxGeometry(2, 2, 2); geo.translate(0, 1, 0);
                    mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff }));
                    mesh.position.set(finalPosition.x, h, finalPosition.z); break;
            }


            const id = generateObjectId(type);
            mesh.userData.placeableId = id;
            // Устанавливаем placeableId для всех дочерних объектов, чтобы можно было удалить вложенные объекты
            mesh.traverse((child) => {
                if (!child.userData.placeableId) {
                    child.userData.placeableId = id;
                }
            });

            const metadata: any = {};
            if (type === "house") {
                metadata.width = this.currentWidth;
                metadata.depth = this.currentDepth;
                metadata.floors = this.currentFloors;
                // Добавляем подтип дома в метаданные
                if (toolKey.startsWith("house:")) {
                    metadata.houseSubtype = toolKey.substring(6); // "standard", "shop" или "casa"
                    if (toolKey === "house:house_01") {
                        metadata.houseSubtype = "house_01";
                    }
                }
                // Для Case позиция двери вычисляется автоматически через getHouseDoorPosition
                // Ничего дополнительного сохранять не нужно
            }
            if (type === "car") {
                // Сохраняем данные машины для восстановления
                if (mesh.userData.plateText) {
                    metadata.plateText = mesh.userData.plateText;
                }
                if (mesh.userData.carColor) {
                    metadata.color = mesh.userData.carColor;
                }
                // Сохраняем подтип машины (car или car:gltf)
                if (toolKey.startsWith("car:")) {
                    metadata.carSubtype = toolKey.substring(4); // "gltf"
                }
            }
            if (type === "fence") {
                metadata.length = this.currentLength;
                metadata.height = this.currentHeight;
            }
            if (type === "prop" && this.objectTemplateSizes[toolKey]) {
                const sz = this.objectTemplateSizes[toolKey].clone().multiplyScalar(this.placementScale);
                metadata.templateKey = toolKey;
                metadata.size = { x: sz.x, y: sz.y, z: sz.z };
                metadata.scale = this.placementScale;
                metadata.alignToSurface = this.alignPropsToSurface;
                if (this.alignPropsToSurface) {
                    metadata.surfaceNormal = { x: this.surfaceNormal.x, y: this.surfaceNormal.y, z: this.surfaceNormal.z };
                    metadata.surfaceRoll = this.surfaceRoll;
                    metadata.flipNormal = this.flipSurfaceNormal;
                }
            }

            // Вычисляем смещение для объектов на дорогах, чтобы они не утопали
            // Вычисляем смещение для объектов на дорогах, чтобы они не утопали
            // (For props, we rely on adjustPositionToGround later or here)
            // Actually, adjustPositionToGround is better.

            if (type === "prop" && !metadata.alignToSurface) {
                // Apply strict ground adjustment for props
                let targetY = mesh.position.y;
                // If on road, use that height
                const roadH = this.getRoadOffsetForObject(mesh, finalPosition, type);
                if (roadH > 0) targetY += roadH; // heuristic

                // Better: use getVisualGroundHeight result
                const visualY = this.getVisualGroundHeight(finalPosition.x, finalPosition.z, [mesh]);
                this.adjustPositionToGround(mesh, visualY);
                finalPosition.y = mesh.position.y; // Sync
            } else {
                const roadOffset = this.getRoadOffsetForObject(mesh, finalPosition, type);
                if (roadOffset > 0) {
                    mesh.position.y += roadOffset;
                }
            }

            // ФИНАЛЬНАЯ КОРРЕКТИРОВКА для автомобилей: вычисляем реальный центр модели и корректируем позицию
            // Это важно, чтобы колеса не заезжали на разметку
            if (type === "car" || type === "bus") {
                mesh.updateMatrixWorld(true);
                // Вычисляем реальный центр модели после всех трансформаций
                const box = new THREE.Box3().setFromObject(mesh);
                const worldCenter = new THREE.Vector3();
                box.getCenter(worldCenter);
                // Вычисляем смещение: насколько центр модели смещен от желаемой позиции
                const offsetX = worldCenter.x - finalPosition.x;
                const offsetZ = worldCenter.z - finalPosition.z;
                // Корректируем позицию так, чтобы центр модели был в finalPosition
                mesh.position.x -= offsetX;
                mesh.position.z -= offsetZ;
                mesh.updateMatrixWorld(true);
            }

            // Проверяем, что mesh создан
            if (!mesh) {
                console.error("[BuildingSystem] mesh is null/undefined for toolKey:", toolKey, "type:", type);
                return null;
            }

            // Для автомобилей угол может быть произвольным (не выровнен к сетке)
            // Для остальных объектов проверяем, что угол выровнен к сетке
            if (type === "car" || type === "bus" || toolKey?.startsWith("car:")) {
                // Для автомобилей просто устанавливаем угол как есть (может быть произвольным)
                // ВАЖНО: Не перезаписываем угол, если он уже установлен в createCarFromGLTF или createCarReliable
                // mesh.rotation.y = finalRotation; 
                // Мы доверяем методам создания машины, они знают про внутренние повороты модели
                if (!toolKey?.startsWith("car:") && type !== "car") {
                    mesh.rotation.y = finalRotation;
                }
            } else {
                // Для остальных объектов проверяем выравнивание к сетке
                const snapAngle = Math.PI / 2; // 90 градусов
                let currentMeshRot = mesh.rotation.y % (Math.PI * 2);
                if (currentMeshRot < 0) currentMeshRot += Math.PI * 2;

                // Выравниваем текущий угол меша к сетке
                let snappedMeshRot = Math.round(currentMeshRot / snapAngle) * snapAngle;
                snappedMeshRot = snappedMeshRot % (Math.PI * 2);
                if (snappedMeshRot < 0) snappedMeshRot += Math.PI * 2;

                // Если угол отличается от выровненного - исправляем
                if (Math.abs(snappedMeshRot - finalRotation) > 0.01) {
                    mesh.rotation.y = finalRotation;
                } else {
                    mesh.rotation.y = snappedMeshRot;
                }
            }

            const placeableObj: PlaceableObject = {
                id, type, position: finalPosition.clone(), rotation: mesh.rotation.y, // Используем фактический угол меша
                mesh,
                bounds: this.snapSystem.estimateBounds(
                    type,
                    finalPosition,
                    mesh.rotation.y, // Используем фактический угол меша
                    (type === "prop" && metadata.size)
                        ? new THREE.Vector3(metadata.size.x, metadata.size.y, metadata.size.z)
                        : undefined
                ),
                connectionPoints, placedByPlayer: true, metadata
            };

            // Отладочное логирование перед добавлением в реестр
            if (toolKey.startsWith("car") || toolKey === "bus") {
                console.log("[BuildingSystem] About to add to registry:", {
                    id,
                    type,
                    toolKey,
                    hasMesh: !!mesh,
                    meshType: mesh?.constructor?.name,
                    meshChildren: mesh?.children?.length || 0,
                    position: finalPosition
                });
            }

            this.registry.add(placeableObj);

            // Проверяем, что объект действительно добавлен
            if (toolKey.startsWith("car") || toolKey === "bus") {
                const addedObj = this.registry.get(id);
                if (addedObj) {
                    console.log("[BuildingSystem] ✓ Object successfully added to registry, mesh in scene:", addedObj.mesh.parent !== null);
                } else {
                    console.error("[BuildingSystem] ✗ Object was NOT added to registry!");
                }
            }

            // Устанавливаем соединения
            for (const cObj of connectedTo) {
                const nearestCp = this.findNearestConnectionPoint(cObj, finalPosition);
                if (nearestCp && connectionPoints.length > 0) {
                    nearestCp.connectedTo = placeableObj;
                    connectionPoints[0].connectedTo = cObj;
                }
            }

            // Обновляем визуализацию домов (теперь Case тоже процедурный, так что можно обновлять)
            if (type === "house") {
                this.refreshHouseVisual(placeableObj);
                const neighbors = this.registry.queryRadius(finalPosition, 12).filter(o => o.type === "house" && o.id !== id);
                for (const n of neighbors) this.refreshHouseVisual(n);
            }
            console.log(`[BuildingSystem] Placed ${type} at (${finalPosition.x.toFixed(1)}, ${finalPosition.z.toFixed(1)})`);
            return placeableObj;
        }
        return null;
    }

    /**
     * Создание машины из GLTF модели с правильной нормализацией и выравниванием
     */
    private createCarFromGLTF(
        finalPosition: THREE.Vector3,
        finalRotation: number,
        h: number,
        _isRestored: boolean = false,
        carColor: string = "#6bcBff"
    ): THREE.Object3D {
        if (!this.objectTemplates["car_gltf"]) {
            console.warn("[createCarFromGLTF] GLTF template not found, falling back to procedural");
            return this.createCarReliable("car:gltf", finalPosition, finalRotation, h);
        }

        console.log(`[createCarFromGLTF] Creating GLTF car: position=(${finalPosition.x.toFixed(2)}, ${finalPosition.z.toFixed(2)}), rotation=${(finalRotation * 180 / Math.PI).toFixed(1)}°, color=${carColor}`);

        const car = new Car([], {
            template: this.objectTemplates["car_gltf"],
            parked: true,
            plateText: "CAR-" + Math.floor(Math.random() * 999),
            color: carColor
        });

        // Сохраняем цвет в userData для последующей проверки
        car.object.userData.carColor = carColor;

        // КРИТИЧЕСКИ ВАЖНО: GLTF модель может быть повернута неправильно
        // Сначала выравниваем модель по осям (длинная сторона по Z), потом применяем угол парковки

        // 1. Сброс всех поворотов car.object
        car.object.rotation.set(0, 0, 0);
        car.object.quaternion.set(0, 0, 0, 1);

        // 2. Сброс поворота шаблона внутри
        if (car.object.children.length > 0) {
            const templateClone = car.object.children[0];
            templateClone.rotation.set(0, 0, 0);
            templateClone.quaternion.set(0, 0, 0, 1);
            templateClone.updateMatrixWorld(true);
        }

        // 3. Установка позиции БЕЗ поворота для проверки ориентации
        car.object.position.set(finalPosition.x, h, finalPosition.z);
        car.object.updateMatrixWorld(true);

        // 4. КРИТИЧЕСКАЯ ПРОВЕРКА: Определяем ориентацию модели ПОСЛЕ сброса поворотов шаблона
        // Проверяем реальную ориентацию модели
        const boxBeforeRot = new THREE.Box3().setFromObject(car.object);
        const sizeBeforeRot = new THREE.Vector3();
        boxBeforeRot.getSize(sizeBeforeRot);

        console.log(`[createCarFromGLTF] Model dimensions after reset: ${sizeBeforeRot.x.toFixed(2)} x ${sizeBeforeRot.y.toFixed(2)} x ${sizeBeforeRot.z.toFixed(2)}`);
        console.log(`[createCarFromGLTF] Width/Length ratio: X/Z = ${(sizeBeforeRot.x / Math.max(sizeBeforeRot.z, 0.001)).toFixed(2)}`);

        // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Для машины должно быть: длина (Z) > ширина (X)
        // Если X > Z, значит длинная сторона по X - поворачиваем на 90° чтобы длинная сторона была по Z
        let alignmentRotation = 0;

        if (Math.abs(sizeBeforeRot.x - sizeBeforeRot.z) / Math.max(sizeBeforeRot.x, sizeBeforeRot.z) < 0.2) {
            // X ≈ Z - модель диагональная, пробуем повернуть на 45° в разные стороны
            console.warn(`[createCarFromGLTF] Model appears diagonal (X ≈ Z)! Trying to align by rotating...`);

            // Пробуем несколько углов: -45°, 45°, -135°, 135°
            let bestRotation = 0;
            let bestRatio = 0;

            for (const testAngle of [-Math.PI / 4, Math.PI / 4, -3 * Math.PI / 4, 3 * Math.PI / 4]) {
                car.object.rotation.y = testAngle;
                car.object.updateMatrixWorld(true);
                const testBox = new THREE.Box3().setFromObject(car.object);
                const testSize = new THREE.Vector3();
                testBox.getSize(testSize);
                const ratio = testSize.z / Math.max(testSize.x, 0.001); // Z/X соотношение

                if (ratio > bestRatio) {
                    bestRatio = ratio;
                    bestRotation = testAngle;
                }
            }

            // Сбрасываем и применяем лучший поворот
            car.object.rotation.y = bestRotation;
            car.object.updateMatrixWorld(true);
            alignmentRotation = bestRotation;

            const boxAfterTest = new THREE.Box3().setFromObject(car.object);
            const sizeAfterTest = new THREE.Vector3();
            boxAfterTest.getSize(sizeAfterTest);
            console.log(`[createCarFromGLTF] After diagonal alignment (${(bestRotation * 180 / Math.PI).toFixed(1)}°): ${sizeAfterTest.x.toFixed(2)} x ${sizeAfterTest.z.toFixed(2)} (ratio: ${bestRatio.toFixed(2)})`);
        }

        // КРИТИЧЕСКАЯ ПРОВЕРКА: Если X > Z (машина "широкая" - длинная сторона по X)
        // Поворачиваем на 90° чтобы длинная сторона была по Z (вдоль парковки)
        if (sizeBeforeRot.x > sizeBeforeRot.z * 1.05) {
            console.log(`[createCarFromGLTF] ⚠️ Model is sideways: X=${sizeBeforeRot.x.toFixed(2)} > Z=${sizeBeforeRot.z.toFixed(2)}`);
            console.log(`[createCarFromGLTF] Rotating 90° to align long side to Z axis`);
            alignmentRotation = Math.PI / 2;
            car.object.rotation.y = alignmentRotation;
            car.object.updateMatrixWorld(true);

            // Пересчитываем размеры после выравнивания
            const boxAfterAlign = new THREE.Box3().setFromObject(car.object);
            const sizeAfterAlign = new THREE.Vector3();
            boxAfterAlign.getSize(sizeAfterAlign);
            console.log(`[createCarFromGLTF] ✓ After 90° rotation: X=${sizeAfterAlign.x.toFixed(2)}, Z=${sizeAfterAlign.z.toFixed(2)}`);

            // Проверяем что теперь Z > X (длинная сторона по Z)
            if (sizeAfterAlign.z > sizeAfterAlign.x * 1.05) {
                console.log(`[createCarFromGLTF] ✓ Model correctly aligned: Z > X (length > width)`);
            } else {
                console.warn(`[createCarFromGLTF] ⚠️ WARNING: After 90° rotation, Z is still not > X!`);
                console.warn(`[createCarFromGLTF] Final dimensions: X=${sizeAfterAlign.x.toFixed(2)}, Z=${sizeAfterAlign.z.toFixed(2)}`);
            }
        } else if (sizeBeforeRot.z > sizeBeforeRot.x * 1.05) {
            console.log(`[createCarFromGLTF] ✓ Model correctly oriented: Z=${sizeBeforeRot.z.toFixed(2)} > X=${sizeBeforeRot.x.toFixed(2)} (length > width)`);
        } else {
            // X ≈ Z - модель квадратная или диагональная
            // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Для квадратных моделей применяем поворот на 45°
            // чтобы машина стояла правильно по разметке парковки
            console.warn(`[createCarFromGLTF] ⚠️ Model has similar X and Z dimensions (square/diagonal)!`);
            console.log(`[createCarFromGLTF] Applying 45° rotation for square models`);
            alignmentRotation = Math.PI / 4; // 45 градусов
        }

        // 5. ТЕПЕРЬ применяем угол парковки (к выровненной модели)
        // Для синих GLTF машин добавляем дополнительный поворот на 45° от текущего положения
        const box = new THREE.Box3().setFromObject(car.object);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const offsetX = center.x - finalPosition.x;
        const offsetZ = center.z - finalPosition.z;

        if (Math.abs(offsetX) > 0.01 || Math.abs(offsetZ) > 0.01) {
            console.log(`[createCarFromGLTF] Applying center correction: offset=(${offsetX.toFixed(3)}, ${offsetZ.toFixed(3)})`);
            car.object.position.x -= offsetX;
            car.object.position.z -= offsetZ;
            car.object.updateMatrixWorld(true);
        }

        console.log(`[createCarFromGLTF] ✓ GLTF car created: finalRotation=${(finalRotation * 180 / Math.PI).toFixed(1)}°`);
        return car.object;
    }

    /**
     * Надежное создание машины - использует процедурную модель
     * Гарантирует правильную ориентацию независимо от загруженных GLTF моделей
     */
    private createCarReliable(
        _toolKey: string,
        finalPosition: THREE.Vector3,
        finalRotation: number,
        h: number
    ): THREE.Object3D {
        // Используем процедурную модель - 100% надежность
        const color = "#" + Math.floor(Math.random() * 16777215).toString(16);

        console.log(`[createCarReliable] Creating procedural car: position=(${finalPosition.x.toFixed(2)}, ${finalPosition.z.toFixed(2)}), rotation=${(finalRotation * 180 / Math.PI).toFixed(1)}°`);

        const car = new Car([], {
            parked: true,
            plateText: "CAR-" + Math.floor(Math.random() * 999),
            color: color
        });

        // Процедурная модель всегда правильно ориентирована
        // Длинная сторона по Z (вперед/назад), ширина по X (влево/вправо)

        // 1. Сброс всех поворотов
        car.object.rotation.set(0, 0, 0);
        car.object.quaternion.set(0, 0, 0, 1);

        // 2. Установка позиции
        car.object.position.set(finalPosition.x, h, finalPosition.z);
        car.object.updateMatrixWorld(true);

        // 3. Установка поворота
        car.object.rotation.y = finalRotation;
        car.object.updateMatrixWorld(true);

        // 4. Коррекция центра
        const box = new THREE.Box3().setFromObject(car.object);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const offsetX = center.x - finalPosition.x;
        const offsetZ = center.z - finalPosition.z;

        if (Math.abs(offsetX) > 0.01 || Math.abs(offsetZ) > 0.01) {
            car.object.position.x -= offsetX;
            car.object.position.z -= offsetZ;
            car.object.updateMatrixWorld(true);
        }

        console.log(`[createCarReliable] ✓ Procedural car created: finalRotation=${(finalRotation * 180 / Math.PI).toFixed(1)}°`);
        return car.object;
    }

    private createHouseMesh(pos: THREE.Vector3, y: number, rotation: number, metadata?: Record<string, any>): THREE.Object3D {
        const bm = this.world.buildingManager;
        let width = (metadata?.width as number) || 8;
        let depth = (metadata?.depth as number) || 8;
        let floors = (metadata?.floors as number) || 1;
        const houseSubtype = (metadata?.houseSubtype as string) || "standard";

        // Для Casa используем более компактные размеры по умолчанию
        if (houseSubtype === "casa") {
            // Casa обычно более компактный (как в GLB с scale 2.5)
            if (width === 8 && depth === 8) {
                width = 6; // Более компактная ширина
                depth = 6; // Более компактная глубина
            }
            // Ограничиваем Casa максимум 2 этажами для характерного вида
            floors = Math.min(floors, 2);
        }

        const hideSides: ("px" | "nx" | "pz" | "nz")[] = [];
        const ns = this.registry.queryRadius(pos, 12).filter(o => o.type === "house" && o.position.distanceTo(pos) > 0.5);
        for (const n of ns) {
            const diff = n.position.clone().sub(pos).applyAxisAngle(new THREE.Vector3(0, 1, 0), -rotation);
            const nWidth = (n.metadata?.width as number) || 8;
            const nDepth = (n.metadata?.depth as number) || 8;

            // Расширенная логика скрытия сторон для зданий разного размера
            if (Math.abs(diff.x) > (width + nWidth) / 2 - 0.3 && Math.abs(diff.x) < (width + nWidth) / 2 + 0.3 && Math.abs(diff.z) < 0.5) hideSides.push(diff.x > 0 ? "px" : "nx");
            if (Math.abs(diff.z) > (depth + nDepth) / 2 - 0.3 && Math.abs(diff.z) < (depth + nDepth) / 2 + 0.3 && Math.abs(diff.x) < 0.5) hideSides.push(diff.z > 0 ? "pz" : "nz");
        }

        // Настройки для разных подтипов домов
        let color = "#f5efe8"; // Стандартный цвет стен
        let roof = "#d07055"; // Стандартный цвет крыши
        let label: string | undefined = undefined;

        if (houseSubtype === "shop") {
            color = "#e8d5c4"; // Более светлый цвет для магазина
            roof = "#c06045"; // Немного другой оттенок крыши
            label = "Магазин";
        } else if (houseSubtype === "casa") {
            // Case - бирюзовый магазин с синими деталями
            color = "#4dd0e1"; // Бирюзовый цвет стен
            roof = "#1a237e"; // Темно-синяя крыша
        } else if (houseSubtype === "classic_shop") {
            // "Классический магазин" с картинки (бежевый, коричневая крыша)
            color = "#F0E6D2"; // Cream / Beige
            roof = "#8B4513"; // SaddleBrown
            label = "Магазин";
        }

        // Override with custom color if provided
        if (metadata?.color) {
            color = metadata.color;
        }

        const mesh = createBuilding({
            position: { x: pos.x, z: pos.z },
            size: { x: width, y: 8, z: depth },
            floors,
            color,
            roof,
            rotation,
            hideSides,
            label,
            houseSubtype // Передаем подтип для добавления деталей (навесы, клумбы, кондиционер)
        }, { wall: bm.wallTexture, roof: bm.roofTexture, windows: bm.windowTexture });

        // Save color to metadata so it persists
        const bounds = computeBoundsFromMesh(mesh);
        mesh.userData.bounds = [bounds.min.x, bounds.min.y, bounds.min.z, bounds.max.x, bounds.max.y, bounds.max.z];
        mesh.userData.metadata = { ...metadata, color };

        mesh.position.set(pos.x, y, pos.z);
        return mesh;
    }

    // createCarMesh_REMOVED



    private createFenceMesh(pos: THREE.Vector3, y: number, rot: number, metadata?: Record<string, any>): THREE.Object3D {
        const length = (metadata?.length as number) || 10;
        const height = (metadata?.height as number) || 1.5;
        // const width = 0.2; // unused

        const geo = new THREE.BoxGeometry(length, height, 0.5);
        geo.translate(0, height / 2, 0);

        const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: "#e67e22" }));
        mesh.position.set(pos.x, y, pos.z);
        mesh.rotation.y = rot;
        return mesh;
    }

    private createBridgeMesh(pos: THREE.Vector3, _y: number, rot: number) {
        const centerH = this.world.getWorldHeight(pos.x, pos.z);
        const g = new THREE.Group(); g.position.set(pos.x, Math.max(0, centerH), pos.z); g.rotation.y = rot;
        const road = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ color: "#555a60" }));
        road.rotation.x = -Math.PI / 2; g.add(road);
        return { mesh: g, connectionPoints: [] };
    }

    private createRoadMesh(pos: THREE.Vector3, y: number, rot: number) {
        const g = new THREE.Group(); g.position.set(pos.x, y + 0.02, pos.z); g.rotation.y = rot;
        const road = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ color: "#3f464d" }));
        road.rotation.x = -Math.PI / 2; g.add(road);
        return { mesh: g, connectionPoints: [] };
    }

    private findNearestConnectionPoint(obj: PlaceableObject, pos: THREE.Vector3) {
        let n: PlaceableObject["connectionPoints"][0] | null = null, nd = Infinity;
        for (const cp of obj.connectionPoints) {
            const d = pos.distanceTo(cp.position);
            if (!cp.connectedTo && d < nd) { n = cp; nd = d; }
        }
        return n;
    }

    private updateConnectionIndicators(pos: THREE.Vector3, type: PlaceableType) {
        this.clearConnectionIndicators();
        const pts = this.snapSystem.getVisibleConnectionPoints(pos, 15, type === "bridge" ? "bridge" : "road");
        for (const p of pts) {
            const m = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), this.connectionMat);
            m.position.copy(p.position); this.world.group.add(m); this.connectionIndicators.push(m);
        }
    }



    private clearConnectionIndicators() {
        for (const m of this.connectionIndicators) this.world.group.remove(m);
        this.connectionIndicators = [];
    }

    // --- Helper methods restored/cleaned ---

    private refreshHouseVisual(obj: PlaceableObject) {
        if (obj.type !== "house") return;

        // Если это Case и есть GLTF шаблон - не обновляем (GLTF модели не нужно обновлять)
        const houseSubtype = (obj.metadata?.houseSubtype as string) || "";

        // PROTECTION: Never procedurally rebuild GLB-based houses, even if template is missing (delayed load)
        const glbSubtypes = ["house_01", "casa", "new_house_01"];
        if (glbSubtypes.includes(houseSubtype)) {
            return;
        }

        // Generic check for other potential templates
        if (houseSubtype && this.objectTemplates[houseSubtype]) {
            return;
        }

        // Удаляем старый меш из родителя
        if (obj.mesh.parent) {
            obj.mesh.parent.remove(obj.mesh);
        }

        // Recreate mesh with current metadata (для процедурных домов)
        const h = this.world.getWorldHeight(obj.position.x, obj.position.z);
        const mesh = this.createHouseMesh(obj.position, h, obj.rotation, obj.metadata);

        obj.mesh = mesh;
        mesh.userData.placeableId = obj.id;

        // Устанавливаем placeableId для всех дочерних объектов
        mesh.traverse((child) => {
            if (!child.userData.placeableId) {
                child.userData.placeableId = obj.id;
            }
        });

        this.updateObjectRegistration(obj);

        // Добавляем в registry.group (не в world.group)
        this.registry.group.add(obj.mesh);
    }



    private deleteObject(e: PointerEvent) {
        this.raycaster.setFromCamera(this.getPointerNDC(e), this.camera);
        // Ищем объекты не только в registry.group, но и во всем мире (включая вложенные объекты)
        const hits = this.raycaster.intersectObject(this.world.group, true);
        if (hits.length > 0) {
            let o: THREE.Object3D | null = hits[0].object;
            // Поднимаемся по иерархии, пока не найдем объект с placeableId или не дойдем до корня
            while (o) {
                // Если нашли placeableId - удаляем объект
                if (o.userData.placeableId) {
                    this.registry.remove(o.userData.placeableId);
                    return;
                }
                // Если дошли до registry.group - это объект из реестра, но без placeableId (странно, но пропускаем)
                if (o === this.registry.group) break;
                // Поднимаемся выше
                o = o.parent;
            }
        }
    }

    /**
     * Восстановить объект из сохранённых данных
     */
    public restoreObject(serialized: {
        id: string;
        type: PlaceableType;
        position: { x: number; y: number; z: number };
        rotation: number;
        metadata?: Record<string, unknown>;
    }): PlaceableObject | null {
        const pos = new THREE.Vector3(serialized.position.x, serialized.position.y, serialized.position.z);
        const h = this.world.getWorldHeight(pos.x, pos.z);
        pos.y = h;

        let mesh: THREE.Object3D;
        let connectionPoints: PlaceableObject["connectionPoints"] = [];

        const type = serialized.type;
        const metadata = serialized.metadata || {};

        // Для prop используем шаблон, если есть
        if (type === "prop" && metadata.templateKey && this.objectTemplates[metadata.templateKey as string]) {
            const templateKey = metadata.templateKey as string;
            mesh = this.objectTemplates[templateKey].clone(true);
            const scale = (metadata.scale as number) || 1;
            mesh.scale.multiplyScalar(scale);

            // Применяем ориентацию по поверхности, если была
            if (metadata.alignToSurface && metadata.surfaceNormal) {
                const normal = new THREE.Vector3(
                    (metadata.surfaceNormal as any).x,
                    (metadata.surfaceNormal as any).y,
                    (metadata.surfaceNormal as any).z
                );
                const roll = (metadata.surfaceRoll as number) || 0;
                const flip = !!(metadata.flipNormal as boolean);
                this.applySurfaceOrientationCustom(mesh, normal, roll, flip);

                // Применяем дополнительные повороты X и Z в локальном пространстве
                const rotX = (metadata.rotationX as number) || 0;
                const rotZ = (metadata.rotationZ as number) || 0;
                if (Math.abs(rotX) > 0.001 || Math.abs(rotZ) > 0.001) {
                    this._tmpQuatA.setFromAxisAngle(new THREE.Vector3(1, 0, 0), rotX);
                    this._tmpQuatB.setFromAxisAngle(new THREE.Vector3(0, 0, 1), rotZ);
                    mesh.quaternion.multiply(this._tmpQuatA).multiply(this._tmpQuatB);
                }
            } else {
                // Для объектов без прилипания к поверхности: применяем повороты через rotation
                mesh.rotation.y = serialized.rotation;
                const rotX = (metadata.rotationX as number) || 0;
                const rotZ = (metadata.rotationZ as number) || 0;
                mesh.rotation.x = rotX;
                mesh.rotation.z = rotZ;
            }

            mesh.position.set(pos.x, pos.y, pos.z);
            mesh.traverse(c => { if (c instanceof THREE.Mesh) { c.castShadow = true; c.receiveShadow = true; } });
        } else {
            // Для остальных типов используем стандартные методы создания
            switch (type) {
                case "house": {
                    // Если это Case и есть GLTF шаблон - используем его напрямую
                    const houseSubtype = (metadata.houseSubtype as string) || "";
                    if (houseSubtype === "casa" && this.objectTemplates["casa"]) {
                        mesh = this.objectTemplates["casa"].clone(true);
                        mesh.position.set(pos.x, pos.y, pos.z);
                        mesh.rotation.y = serialized.rotation;
                        const width = (metadata.width as number) || 8;
                        const depth = (metadata.depth as number) || 8;
                        const scale = Math.max(width, depth) / 3.5; // 3.5 - базовый размер Case из GLTF
                        mesh.scale.setScalar(scale);
                        mesh.traverse(c => { if (c instanceof THREE.Mesh) { c.castShadow = true; c.receiveShadow = true; } });
                    }
                    // Handling for House 01
                    else if (houseSubtype === "house_01" && this.objectTemplates["house_01"]) {
                        mesh = this.objectTemplates["house_01"].clone(true);
                        mesh.position.set(pos.x, pos.y, pos.z);
                        mesh.rotation.y = serialized.rotation;
                        // Use width as scale factor
                        const width = (metadata.width as number) || 8;
                        const scale = width / 8.0;
                        mesh.scale.setScalar(scale);
                        mesh.traverse(c => { if (c instanceof THREE.Mesh) { c.castShadow = true; c.receiveShadow = true; } });
                    }
                    else {
                        // Остальные дома создаются процедурно
                        mesh = this.createHouseMesh(pos, h, serialized.rotation, metadata);
                    }
                    break;
                }
                case "car": {
                    // Определяем тип машины и используем соответствующий метод
                    const carSubtype = (metadata.carSubtype as string) || "";
                    const finalPos = new THREE.Vector3(pos.x, 0, pos.z);
                    const savedColor = (metadata.color as string) || "#6bcBff";

                    if (carSubtype === "gltf") {
                        // Восстановленная машина из GLTF (квадратная) - serialized.rotation уже правильный
                        mesh = this.createCarFromGLTF(finalPos, serialized.rotation, h, true, savedColor);
                    } else {
                        // Старая машина - процедурная (эллипс)
                        mesh = this.createCarReliable("car", finalPos, serialized.rotation, h);
                        if (savedColor && mesh.userData) {
                            mesh.userData.carColor = savedColor;
                        }
                    }
                    break;
                }
                case "fence":
                    mesh = this.createFenceMesh(pos, h, serialized.rotation, metadata);
                    break;
                case "bridge": {
                    const br = this.createBridgeMesh(pos, h, serialized.rotation);
                    mesh = br.mesh;
                    connectionPoints = br.connectionPoints;
                    break;
                }
                case "road": {
                    const rr = this.createRoadMesh(pos, 0, serialized.rotation);
                    mesh = rr.mesh;
                    connectionPoints = rr.connectionPoints;
                    break;
                }
                default:
                    const geo = new THREE.BoxGeometry(2, 2, 2);
                    geo.translate(0, 1, 0);
                    mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x888888 }));
                    mesh.position.set(pos.x, h, pos.z);
                    mesh.rotation.y = serialized.rotation;
                    break;
            }
        }

        mesh.userData.placeableId = serialized.id;
        // Устанавливаем placeableId для всех дочерних объектов
        mesh.traverse((child) => {
            if (!child.userData.placeableId) {
                child.userData.placeableId = serialized.id;
            }
        });

        // Вычисляем смещение для объектов на дорогах
        const roadOffset = this.getRoadOffsetForObject(mesh, pos, type);
        if (roadOffset > 0) {
            mesh.position.y += roadOffset;
            pos.y += roadOffset;
        }

        const placeableObj: PlaceableObject = {
            id: serialized.id,
            type,
            position: pos,
            rotation: serialized.rotation,
            mesh,
            bounds: this.snapSystem.estimateBounds(
                type,
                pos,
                serialized.rotation,
                (type === "prop" && metadata.size)
                    ? new THREE.Vector3(
                        (metadata.size as any).x,
                        (metadata.size as any).y,
                        (metadata.size as any).z
                    )
                    : undefined
            ),
            connectionPoints,
            placedByPlayer: true,
            metadata
        };

        this.registry.add(placeableObj);

        // Обновляем визуализацию домов после восстановления
        if (type === "house") {
            this.refreshHouseVisual(placeableObj);
            const neighbors = this.registry.queryRadius(pos, 12).filter(o => o.type === "house" && o.id !== serialized.id);
            for (const n of neighbors) this.refreshHouseVisual(n);
        }

        return placeableObj;
    }

    /**
     * Очистить все объекты игрока
     */
    public clearPlayerObjects(): void {
        const playerObjects = this.registry.getAll().filter(obj => obj.placedByPlayer);
        for (const obj of playerObjects) {
            this.registry.remove(obj.id);
        }
    }

    /**
     * Удалить все объекты в радиусе от позиции
     */
    public removeObjectsInRadius(center: { x: number; z: number }, radius: number, types?: PlaceableType[]): number {
        const centerVec = new THREE.Vector3(center.x, 0, center.z);
        const nearby = this.registry.queryRadius(centerVec, radius);

        let removed = 0;
        for (const obj of nearby) {
            // Фильтруем по типу, если указан
            if (types && !types.includes(obj.type)) continue;

            // Удаляем только объекты, размещенные игроком
            if (obj.placedByPlayer) {
                this.registry.remove(obj.id);
                removed++;
            }
        }

        return removed;
    }

    /**
     * Получить позицию двери для размещенного игроком дома
     * Для Case использует данные из загруженного GLTF шаблона
     */
    public getHouseDoorPosition(obj: PlaceableObject): { x: number; z: number } | null {
        if (obj.type !== "house") return null;

        const metadata = obj.metadata as any || {};
        const houseSubtype = metadata.houseSubtype || "";

        // Для Case используем данные из GLTF шаблона
        if (houseSubtype === "casa" && this.objectTemplates["casa"]) {
            const casaTemplate = this.objectTemplates["casa"];
            const doorLocalPos = casaTemplate.userData.casaDoorPosition;

            if (doorLocalPos) {
                // Преобразуем локальную позицию двери в мировые координаты
                // Учитываем позицию объекта, его поворот и масштаб
                const width = metadata.width || 8;
                const depth = metadata.depth || 8;
                const scale = Math.max(width, depth) / 3.5; // Масштаб, примененный к модели

                const doorWorld = localToWorldXZ(
                    obj.position.x,
                    obj.position.z,
                    obj.rotation,
                    doorLocalPos.x * scale,
                    doorLocalPos.z * scale
                );
                return { x: doorWorld.x, z: doorWorld.z };
            }
        }

        // Если позиция двери уже сохранена в метаданных (legacy для старых сохранений)
        if (metadata.doorPosition) {
            return {
                x: metadata.doorPosition.x,
                z: metadata.doorPosition.z
            };
        }

        // Для процедурных домов вычисляем позицию двери стандартным способом
        // Дверь находится на стороне +Z (в локальных координатах)
        const width = metadata.width || 8;
        const depth = metadata.depth || 8;
        const doorLocalZ = depth / 2 + BUILDING_LAYOUT.door.localZOutset;

        // Преобразуем в мировые координаты
        const doorWorld = localToWorldXZ(
            obj.position.x,
            obj.position.z,
            obj.rotation,
            0,
            doorLocalZ
        );

        return { x: doorWorld.x, z: doorWorld.z };
    }
}
