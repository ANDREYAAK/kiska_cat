import * as THREE from "three";
import { WORLD_CONFIG } from "@config/world";
import { GAME_CONFIG } from "@config/game";
import { Car } from "@entities/Car";

import { localToWorldXZ, worldToLocalXZ } from "@utils/math";
import { TrafficSystem } from "./TrafficSystem";
import { CityMap } from "./CityMap";
import { RoadBuilder } from "./RoadBuilder";
import { TerrainManager } from "./TerrainManager";
import type { Updatable } from "@core/Engine";

import { BuildingManager, type Collider } from "./BuildingManager";
import { ObjectRegistry } from "./ObjectRegistry";
import {
  PlaceableObject,
  PlaceableType,
  generateObjectId,
  computeBoundsFromMesh,
  createConnectionPoint
} from "./PlaceableObject";



export class World implements Updatable {
  readonly group = new THREE.Group();
  readonly trafficSystem: TrafficSystem;
  public readonly terrainManager: TerrainManager;

  public readonly buildingManager: BuildingManager;
  private registry?: ObjectRegistry;



  private readonly colliders: Collider[] = [];

  private birds: Array<{
    group: THREE.Group;
    radius: number;
    speed: number;
    height: number;
    center: { x: number; z: number };
    phase: number;
  }> = [];
  private birdsTime = 0;

  private readonly bounds: { minX: number; maxX: number; minZ: number; maxZ: number };



  // --- Terrain Logic (Delegated) ---
  public getWorldHeight(x: number, z: number): number {
    return this.terrainManager.getWorldHeight(x, z);
  }

  // Delegate raw terrain height
  private getTerrainHeight(x: number, z: number): number {
    return this.terrainManager.getTerrainHeight(x, z);
  }



  constructor() {
    this.bounds = this.computeWorldBounds2D(0);

    this.terrainManager = new TerrainManager();
    this.group.add(this.terrainManager.group);

    this.buildingManager = new BuildingManager(this.terrainManager);
    this.group.add(this.buildingManager.group);

    // 1. Populate CityMap
    this.cityMap.importFromConfig(WORLD_CONFIG.roads ?? []);

    // 2. Build Graph & Traffic
    const graph = this.cityMap.buildTrafficGraph();
    this.trafficSystem = new TrafficSystem(this, graph);
    this.group.add(this.trafficSystem.group);

    // const debugSystem = new DebugSystem(GAME_CONFIG.worldSize, 20);
    // this.group.add(debugSystem.group);

    this.buildRoads();
    this.buildCrosswalks();
    this.buildTrees();
    this.buildLamps();
    this.buildUmbrellas();
    this.buildBenches();
    this.buildRocks();
    this.buildBirds();
  }

  update(dt: number) {
    this.trafficSystem.update(dt);
    this.updateBirds(dt);
  }

  /**
   * Зарегистрировать существующие объекты мира в реестре системы строительства
   */
  public registerExistingObjects(registry: ObjectRegistry) {
    this.registry = registry;
    console.log("[World] Registering existing world objects in BuildingSystem...");

    // Рекурсивно ищем все объекты с тегом placeableType
    this.group.traverse((obj) => {
      const type = obj.userData.placeableType as PlaceableType;
      if (type) {
        // Проверяем, не в реестре ли уже этот объект (через userData.placeableId)
        if (obj.userData.placeableId) return;

        const id = generateObjectId(type);
        obj.userData.placeableId = id;

        const placeableObj: PlaceableObject = {
          id,
          type,
          position: obj.position.clone(),
          rotation: obj.rotation.y,
          mesh: obj,
          bounds: computeBoundsFromMesh(obj),
          connectionPoints: [], // Статичные объекты пока без точек соединения
          placedByPlayer: false, // Флаг, что это системный объект
          metadata: { label: obj.userData.label }
        };

        registry.add(placeableObj);
      }
    });

    // Roads are handled primarily by CityMap and SnapSystem's connection snapping
    // We register each road block to allow snapping to existing infrastructure
    this.cityMap.getAllBlocks().forEach((block) => {
      const wx = block.x * 10;
      const wz = block.z * 10;
      const id = generateObjectId("road");

      const placeableObj: PlaceableObject = {
        id,
        type: "road",
        position: new THREE.Vector3(wx, 0, wz),
        rotation: 0,
        mesh: null as any, // Visuals are in RoadBuilder
        bounds: new THREE.Box3(
          new THREE.Vector3(wx - 5, -1, wz - 5),
          new THREE.Vector3(wx + 5, 1, wz + 5)
        ),
        connectionPoints: [
          createConnectionPoint(new THREE.Vector3(wx, 0, wz - 5), new THREE.Vector3(0, 0, -1), "road", "n"),
          createConnectionPoint(new THREE.Vector3(wx, 0, wz + 5), new THREE.Vector3(0, 0, 1), "road", "s"),
          createConnectionPoint(new THREE.Vector3(wx + 5, 0, wz), new THREE.Vector3(1, 0, 0), "road", "e"),
          createConnectionPoint(new THREE.Vector3(wx - 5, 0, wz), new THREE.Vector3(-1, 0, 0), "road", "w"),
        ],
        placedByPlayer: false
      };
      registry.add(placeableObj);
    });

    console.log(`[World] Registered ${registry.count} objects in total.`);
  }



  private computeWorldBounds2D(pad: number) {
    let minX = -GAME_CONFIG.worldSize / 2;
    let maxX = GAME_CONFIG.worldSize / 2;
    let minZ = -GAME_CONFIG.worldSize / 2;
    let maxZ = GAME_CONFIG.worldSize / 2;

    const grow = (x0: number, x1: number, z0: number, z1: number) => {
      minX = Math.min(minX, x0);
      maxX = Math.max(maxX, x1);
      minZ = Math.min(minZ, z0);
      maxZ = Math.max(maxZ, z1);
    };

    // Дороги (OBB -> AABB через проекцию на оси мира)
    for (const r of WORLD_CONFIG.roads ?? []) {
      const rot = r.rotation ?? 0;
      const c = Math.abs(Math.cos(rot));
      const s = Math.abs(Math.sin(rot));
      const halfW = r.width / 2;
      const halfL = r.length / 2;
      const ex = c * halfW + s * halfL;
      const ez = s * halfW + c * halfL;
      grow(r.position.x - ex, r.position.x + ex, r.position.z - ez, r.position.z + ez);
    }

    // Здания (для границ достаточно “с запасом” без точного учёта rotation)
    for (const b of WORLD_CONFIG.buildings ?? []) {
      const halfX = b.size.x / 2;
      const halfZ = b.size.z / 2;
      grow(b.position.x - halfX, b.position.x + halfX, b.position.z - halfZ, b.position.z + halfZ);
    }

    // Зоны воды/пляжа/парка
    const areas = [
      ...(((WORLD_CONFIG as unknown as { waterAreas?: any[] }).waterAreas ?? []) as Array<{ position: { x: number; z: number }; width: number; depth: number }>),
      ...(((WORLD_CONFIG as unknown as { beachAreas?: any[] }).beachAreas ?? []) as Array<{ position: { x: number; z: number }; width: number; depth: number }>),
      ...(((WORLD_CONFIG as unknown as { parks?: any[] }).parks ?? []) as Array<{ position: { x: number; z: number }; width: number; depth: number }>)
    ];
    for (const a of areas) {
      grow(a.position.x - a.width / 2, a.position.x + a.width / 2, a.position.z - a.depth / 2, a.position.z + a.depth / 2);
    }

    return { minX: minX - pad, maxX: maxX + pad, minZ: minZ - pad, maxZ: maxZ + pad };
  }



  private isPointInAreas(
    x: number,
    z: number,
    areas: Array<{ position: { x: number; z: number }; width: number; depth: number }> | undefined,
    padding: number
  ) {
    if (!areas) return false;
    return areas.some((a) => Math.abs(x - a.position.x) <= a.width / 2 + padding && Math.abs(z - a.position.z) <= a.depth / 2 + padding);
  }

  private isPointOnRoad(x: number, z: number, padding = 0) {
    const roads = WORLD_CONFIG.roads ?? [];
    for (const r of roads) {
      const rot = r.rotation ?? 0;
      const local = worldToLocalXZ(r.position.x, r.position.z, rot, x, z);
      if (Math.abs(local.x) <= r.width / 2 + padding && Math.abs(local.z) <= r.length / 2 + padding) return true;
    }
    return false;
  }

  private isPointNearBuilding(x: number, z: number, padding: number) {
    return this.buildingManager.isPointNearBuilding(x, z, padding);
  }



  private isPointInParking(x: number, z: number, padding = 0) {
    return this.buildingManager.isPointInParking(x, z, padding);
  }

  public intersectTerrain(raycaster: THREE.Raycaster) {
    return this.terrainManager.intersect(raycaster);
  }






  /*
   * NEW ARCHITECTURE: CityMap + RoadBuilder
   */
  public readonly cityMap = new CityMap();
  public readonly roadBuilder!: RoadBuilder;

  private buildRoads() {
    // 2. Build meshes (Data already imported in constructor)
    (this as any).roadBuilder = new RoadBuilder(this.cityMap, this.getTerrainHeight.bind(this));
    this.roadBuilder.build();

    // 3. Add to scene
    this.group.add(this.roadBuilder.getGroup());
  }

  // Removed unused _unused_buildBridgeStructure









  private buildCrosswalks() {
    if (!WORLD_CONFIG.crosswalks || WORLD_CONFIG.crosswalks.length === 0) return;

    // 1. Calculate total stripes
    let totalStripes = 0;
    const stripeDepth = 0.45;
    const gap = 0.75;

    WORLD_CONFIG.crosswalks.forEach(data => {
      const maxStripes = Math.floor(data.length / gap) + 2;
      const start = -data.length / 2 + stripeDepth / 2;
      for (let i = 0; i < maxStripes; i += 1) {
        const z = start + i * gap;
        if (z > data.length / 2) break;
        totalStripes++;
      }
    });

    if (totalStripes === 0) return;

    // 2. Create InstancedMesh
    const stripeGeo = new THREE.PlaneGeometry(1, 1);
    const stripeMaterial = new THREE.MeshStandardMaterial({ color: "#f7f9fc", roughness: 0.3 });
    const instancedStripes = new THREE.InstancedMesh(stripeGeo, stripeMaterial, totalStripes);
    instancedStripes.rotation.x = -Math.PI / 2;
    instancedStripes.position.y = 0.11; // Slightly above ground (0.05 + 0.06)

    // 3. Fill matrices
    const dummy = new THREE.Object3D();
    const parentDummy = new THREE.Object3D();
    let idx = 0;

    WORLD_CONFIG.crosswalks.forEach(data => {
      parentDummy.position.set(data.position.x, 0, data.position.z);
      parentDummy.rotation.set(0, data.rotation ?? 0, 0);
      parentDummy.updateMatrix();

      const maxStripes = Math.floor(data.length / gap) + 2;
      const start = -data.length / 2 + stripeDepth / 2;

      for (let i = 0; i < maxStripes; i += 1) {
        const z = start + i * gap;
        if (z > data.length / 2) break;

        dummy.position.set(0, 0, z); // Local to crosswalk group
        dummy.scale.set(data.width, stripeDepth, 1);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();

        const worldMatrix = parentDummy.matrix.clone().multiply(dummy.matrix);
        instancedStripes.setMatrixAt(idx++, worldMatrix);
      }
    });

    this.group.add(instancedStripes);
    console.log(`[World] Instanced ${totalStripes} crosswalk stripes.`);
  }









  private buildTrees() {
    // Деревья размещаем:
    // - в парке (зелёные массивы),
    // - вокруг зданий,
    // - вдоль дорог (аллеи), но не на самом полотне и не вплотную к фасадам.
    const parks = WORLD_CONFIG.parks ?? [];
    const waters = (WORLD_CONFIG as { waterAreas?: Array<{ position: { x: number; z: number }; width: number; depth: number }> }).waterAreas;
    const beaches = (WORLD_CONFIG as { beachAreas?: Array<{ position: { x: number; z: number }; width: number; depth: number }> }).beachAreas;

    const spawnInPark = (count: number) => {
      if (parks.length === 0) return;
      for (let i = 0; i < count; i += 1) {
        const park = parks[Math.floor(Math.random() * parks.length)];
        const x = park.position.x + (Math.random() - 0.5) * park.width;
        const z = park.position.z + (Math.random() - 0.5) * park.depth;
        if (this.isPointOnRoad(x, z, 2.0)) continue;
        if (this.isPointInParking(x, z, 2.2)) continue;
        if (this.isPointInAreas(x, z, waters, 2.0)) continue;
        if (this.isPointInAreas(x, z, beaches, 2.0)) continue;
        if (this.terrainManager.isPointInRiver(x, z, 2.0)) continue;
        if (this.isPointNearBuilding(x, z, 4.5)) continue;

        this.addTree(x, z);
      }
    };

    const spawnNearBuildings = () => {
      WORLD_CONFIG.buildings.forEach((b) => {
        const rot = (b as { rotation?: number }).rotation ?? 0;
        const halfX = b.size.x / 2 + 1.4;
        const halfZ = b.size.z / 2 + 1.4;
        // Больше деревьев рядом с домами (особенно у крупных зданий вроде “МЕДСИ”).
        const footprint = b.size.x * b.size.z;
        const base = footprint >= 180 ? 6 : footprint >= 110 ? 5 : 4;
        const count = base + Math.floor(Math.random() * 4); // 4..9
        let placed = 0;
        for (let i = 0; i < 24 && placed < count; i += 1) {
          const side = i % 2 === 0 ? 1 : -1;
          const alongAxis = Math.random() < 0.5 ? "z" : "x";
          const along = alongAxis === "z" ? (Math.random() < 0.5 ? halfZ : -halfZ) : (Math.random() < 0.5 ? halfX : -halfX);
          const offsetX =
            alongAxis === "z"
              ? side * (halfX + 1 + Math.random() * 2.2)
              : along + side * (1 + Math.random() * 2.2);
          const offsetZ =
            alongAxis === "z"
              ? along + (Math.random() - 0.5) * 2.6
              : side * (halfZ + 1 + Math.random() * 2.2);
          const w = localToWorldXZ(b.position.x, b.position.z, rot, offsetX, offsetZ);
          if (this.isPointOnRoad(w.x, w.z, 1.6)) continue;
          if (this.isPointInParking(w.x, w.z, 2.2)) continue;
          if (this.isPointInAreas(w.x, w.z, waters, 1.6)) continue;
          if (this.isPointInAreas(w.x, w.z, beaches, 1.6)) continue;
          if (this.terrainManager.isPointInRiver(w.x, w.z, 2.0)) continue;
          // Не ставим прямо в стену: держим небольшой зазор от фасада.
          if (this.isPointNearBuilding(w.x, w.z, 1.2)) continue;
          this.addTree(w.x, w.z);
          placed += 1;
        }
      });
    };

    const spawnAlongRoads = () => {
      const roads = WORLD_CONFIG.roads ?? [];
      if (roads.length === 0) return;

      const placeCandidate = (wx: number, wz: number) => {
        if (this.isPointOnRoad(wx, wz, 1.6)) return;
        if (this.isPointInParking(wx, wz, 2.2)) return;
        if (this.isPointInAreas(wx, wz, waters, 1.6)) return;
        if (this.isPointInAreas(wx, wz, beaches, 1.6)) return;
        if (this.terrainManager.isPointInRiver(wx, wz, 2.0)) return;
        if (this.isPointNearBuilding(wx, wz, 2.2)) return;
        this.addTree(wx, wz);
      };

      roads.forEach((r) => {
        const rot = r.rotation ?? 0;
        const halfL = r.length / 2;
        const cosR = Math.cos(rot);
        const sinR = Math.sin(rot);

        // Смещения от края дороги: слегка отодвигаем в сторону тротуара/газона.
        const offsets: number[] = [r.width / 2 + 2.4, -(r.width / 2 + 2.4)];
        const step = 10; // шаг вдоль дороги

        for (const off of offsets) {
          for (let z = -halfL + 6; z <= halfL - 6 + 1e-6; z += step) {
            const localX = off;
            const localZ = z + (Math.random() - 0.5) * 3.0; // чуть “шумим” по длине
            const wx = r.position.x + localX * cosR + localZ * sinR;
            const wz = r.position.z + -localX * sinR + localZ * cosR;
            placeCandidate(wx, wz);
          }
        }
      });
    };

    spawnInPark(90);
    spawnNearBuildings();
    spawnAlongRoads();

    this.finalizeTrees();
  }

  private treePositions: { x: number, z: number }[] = [];

  private addTree(x: number, z: number) {
    this.treePositions.push({ x, z });
    this.colliders.push({
      position: { x, z },
      half: { x: 0.6, z: 0.6 },
      rotation: 0,
      type: "tree"
    });
  }

  private finalizeTrees() {
    const count = this.treePositions.length;
    if (count === 0) return;

    const trunkGeo = new THREE.CylinderGeometry(0.35, 0.5, 2.6, 10);
    const trunkMat = new THREE.MeshStandardMaterial({ color: "#7a5138", roughness: 0.9 });
    const instancedTrunk = new THREE.InstancedMesh(trunkGeo, trunkMat, count);
    instancedTrunk.castShadow = true;
    instancedTrunk.receiveShadow = true;

    const leafColors = ["#3fbf74", "#34a96b", "#5cd18a"];
    const leafMeshes: THREE.InstancedMesh[] = [];

    for (let i = 0; i < 4; i++) {
      const leafGeo = new THREE.SphereGeometry(1.4 - i * 0.12, 12, 12);
      const leafMat = new THREE.MeshStandardMaterial({ color: leafColors[i % leafColors.length], roughness: 0.75 });
      const instancedLeaf = new THREE.InstancedMesh(leafGeo, leafMat, count);
      instancedLeaf.castShadow = true;
      instancedLeaf.receiveShadow = true;
      leafMeshes.push(instancedLeaf);
    }

    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const { x, z } = this.treePositions[i];
      const h = this.getWorldHeight(x, z);

      // Trunk
      dummy.position.set(x, h + 1.3, z);
      dummy.updateMatrix();
      instancedTrunk.setMatrixAt(i, dummy.matrix);

      // Leaves
      for (let j = 0; j < 4; j++) {
        dummy.position.set(x, h + 3.2 + j * 0.5, z + (j % 2 === 0 ? 0.2 : -0.2));
        dummy.updateMatrix();
        leafMeshes[j].setMatrixAt(i, dummy.matrix);
      }
    }

    this.group.add(instancedTrunk);
    leafMeshes.forEach(m => this.group.add(m));
    console.log(`[World] Instanced ${count} trees (${count * 5} meshes total) into 5 draw calls.`);
  }

  private buildLamps() {
    // Optimization: Use InstancedMesh for high performance
    const MAX_LAMPS = 2000;

    // 1. Materials - Grey Color
    const greyMat = new THREE.MeshStandardMaterial({
      color: "#9ca3af", // Grey
      roughness: 0.4,
      metalness: 0.3
    });
    const bulbMat = new THREE.MeshStandardMaterial({
      color: "#fff2cc",
      emissive: "#fffacd", // Slightly warmer/brighter
      emissiveIntensity: 2.0 // Make it pop without point light
    });

    // 2. Geometries for "Inverted L" shape
    // Pole: Vertical cylinder
    const poleH = 4.5;
    const poleR = 0.12;
    const poleGeo = new THREE.CylinderGeometry(poleR, poleR, poleH, 8);

    // Arm: Horizontal box attached to top of pole, pointing +Z
    const armLen = 1.2;
    const armW = 0.15;
    const armGeo = new THREE.BoxGeometry(armW, armW, armLen);

    // Bulb: Flat thing under the end of the arm
    const bulbGeo = new THREE.CylinderGeometry(0.2, 0.1, 0.1, 8); // Flat puck

    // 3. Instanced Meshes
    const meshPole = new THREE.InstancedMesh(poleGeo, greyMat, MAX_LAMPS);
    const meshArm = new THREE.InstancedMesh(armGeo, greyMat, MAX_LAMPS);
    const meshBulb = new THREE.InstancedMesh(bulbGeo, bulbMat, MAX_LAMPS);

    meshPole.castShadow = true;
    meshPole.receiveShadow = true;
    meshArm.castShadow = true;
    meshArm.receiveShadow = true;

    let instanceIdx = 0;
    const dummy = new THREE.Object3D();

    const addLampInstance = (x: number, z: number, rotation: number) => {
      if (instanceIdx >= MAX_LAMPS) return;

      const h = this.getWorldHeight(x, z);

      // Root transform for this lamp
      // We calculate world matrices for parts based on this root.

      // Pole: Centered at local Y = poleH/2.
      // World Pos = (x, h + poleH/2, z)
      dummy.position.set(x, h + poleH / 2, z);
      dummy.rotation.set(0, rotation, 0); // Rotate around Y
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      meshPole.setMatrixAt(instanceIdx, dummy.matrix);

      // Arm: Attached at top (h + poleH - tiny offset), extending along local +Z.
      // Center of Arm Box (length armLen) should be at Z = armLen/2.
      // This puts the start of the arm at Z=0 (center of pole).
      // Y Position: At pole top.

      // We act as if the Arm is child of the Lamp Root.
      // Lamp Root is at (x, h, z), Rotated `rotation`.
      // Arm Local Pos: (0, poleH - armW/2, armLen/2 - poleR/2) 
      // -> shifting Z slightly so it starts exactly from pole surface? 
      // Simpler: Center at armLen/2. Overlap is fine.

      const armLocalY = poleH - armW / 2;
      const armLocalZ = armLen / 2;

      // To convert local offset to world with rotation:
      // x' = x + localZ * sin(rot)
      // z' = z + localZ * cos(rot)
      // (Assuming standard 0 rot = +Z? No, usually 0 rot = -Z or +Z depend on system)
      // Let's use dummy for hierarchy helper.

      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);

      const wx_arm = x + armLocalZ * sin; // standard rotation Y formula for Z axis vector?
      // If rot=0, sin=0, x'=x. cos=1, z'=z+armLocalZ. (Points South/Z+)
      const wz_arm = z + armLocalZ * cos;

      dummy.position.set(wx_arm, h + armLocalY, wz_arm);
      dummy.rotation.set(0, rotation, 0);
      dummy.updateMatrix();
      meshArm.setMatrixAt(instanceIdx, dummy.matrix);

      // Bulb: At the end of the arm.
      const bulbLocalZ = armLen - 0.2; // Near tip
      const bulbLocalY = armLocalY - armW / 2 - 0.05; // Below arm

      const wx_bulb = x + bulbLocalZ * sin;
      const wz_bulb = z + bulbLocalZ * cos;

      dummy.position.set(wx_bulb, h + bulbLocalY, wz_bulb);
      dummy.rotation.set(0, rotation, 0);
      dummy.updateMatrix();
      meshBulb.setMatrixAt(instanceIdx, dummy.matrix);

      // Collider
      this.colliders.push({
        position: { x, z },
        half: { x: 0.2, z: 0.2 },
        rotation: 0,
        type: "lamp"
      });

      instanceIdx++;
    };

    // 1. Place along ROADS
    const roads = WORLD_CONFIG.roads ?? [];
    roads.forEach((r) => {
      const rot = r.rotation ?? 0;
      const halfL = r.length / 2;
      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);

      // Offset from road center. 
      // We want the POLE to be on the sidewalk.
      const distFromCenter = r.width / 2 + 1.5;

      const step = 40;
      const startZ = -halfL + 8;
      const endZ = halfL - 8;

      if (startZ >= endZ) return;

      for (let z = startZ; z <= endZ; z += step) {
        // Left Side (-X local)
        // We want Lamp to face Right (+X local).
        // Lamp Natural Direction is +Z. 
        // Rotate -PI/2 to face +X.
        // Was facing away, now rotate 180 deg.
        // Old: rot - Math.PI / 2
        // New: rot + Math.PI / 2
        {
          const localX = -distFromCenter;
          const wx = r.position.x + localX * cosR + z * sinR;
          const wz = r.position.z + -localX * sinR + z * cosR;
          addLampInstance(wx, wz, rot + Math.PI / 2);
        }

        // Right Side (+X local)
        // We want Lamp to face Left (-X local).
        // Rotate +PI/2 to face -X. (Assuming +Z -> +PI/2 = +X is Wrong? Wait)
        // Let's assume standard math.
        // Old: rot + Math.PI / 2
        // New: rot - Math.PI / 2
        {
          const localX = distFromCenter;
          const wx = r.position.x + localX * cosR + z * sinR;
          const wz = r.position.z + -localX * sinR + z * cosR;
          addLampInstance(wx, wz, rot - Math.PI / 2);
        }
      }
    });

    console.log(`[World] Built ${instanceIdx} street lamps`);

    [meshPole, meshArm, meshBulb].forEach(mesh => {
      mesh.count = instanceIdx;
      mesh.userData.isInstancedLamp = true;
      if (instanceIdx > 0) this.group.add(mesh);
    });
  }

  private buildUmbrellas() {
    const count = WORLD_CONFIG.umbrellas.length;
    if (count === 0) return;

    const poleGeo = new THREE.CylinderGeometry(0.08, 0.1, 2.4, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: "#f0f0f0" });
    const instancedPole = new THREE.InstancedMesh(poleGeo, poleMat, count);
    instancedPole.castShadow = true;

    const topGeo = new THREE.ConeGeometry(1.6, 0.9, 12);
    const topMat = new THREE.MeshStandardMaterial({ color: "#ffffff" }); // Base white, will be colored per instance
    const instancedTop = new THREE.InstancedMesh(topGeo, topMat, count);
    instancedTop.castShadow = true;

    const dummy = new THREE.Object3D();
    const colorObj = new THREE.Color();

    WORLD_CONFIG.umbrellas.forEach((data, i) => {
      const h = this.getWorldHeight(data.x, data.z);

      // Pole
      dummy.position.set(data.x, h + 1.2, data.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      instancedPole.setMatrixAt(i, dummy.matrix);

      // Top
      dummy.position.set(data.x, h + 2.2, data.z);
      dummy.updateMatrix();
      instancedTop.setMatrixAt(i, dummy.matrix);
      instancedTop.setColorAt(i, colorObj.set(data.color));
    });

    this.group.add(instancedPole);
    this.group.add(instancedTop);
    console.log(`[World] Instanced ${count} umbrellas.`);
  }

  private buildBenches() {
    const parks = WORLD_CONFIG.parks ?? [];
    if (parks.length === 0) return;

    // First collect all valid bench positions
    const benchPositions: { x: number, z: number, rotation: number }[] = [];
    const pick = () => parks[Math.floor(Math.random() * parks.length)];
    const waters = (WORLD_CONFIG as { waterAreas?: Array<{ position: { x: number; z: number }; width: number; depth: number }> }).waterAreas;

    const benchesToPlace = 5;
    for (let i = 0; i < benchesToPlace; i += 1) {
      const park = pick();
      const x = park.position.x + (Math.random() - 0.5) * (park.width - 8);
      const z = park.position.z + (Math.random() - 0.5) * (park.depth - 8);
      if (this.isPointOnRoad(x, z, 2.5)) continue;
      if (this.isPointInAreas(x, z, waters, 2.5)) continue;

      const rotation = Math.random() * Math.PI * 2;
      benchPositions.push({ x, z, rotation });
    }

    const count = benchPositions.length;
    if (count === 0) return;

    const seatGeo = new THREE.BoxGeometry(2.4, 0.2, 0.7);
    const seatMat = new THREE.MeshStandardMaterial({ color: "#8d5b3e" });
    const backGeo = new THREE.BoxGeometry(2.4, 0.7, 0.15);
    const backMat = new THREE.MeshStandardMaterial({ color: "#7b4f36" });

    const instancedSeat = new THREE.InstancedMesh(seatGeo, seatMat, count);
    const instancedBack = new THREE.InstancedMesh(backGeo, backMat, count);
    instancedSeat.castShadow = true;
    instancedBack.castShadow = true;

    const dummy = new THREE.Object3D();
    const helperGroup = new THREE.Group();
    const tempSeat = new THREE.Mesh(seatGeo);
    const tempBack = new THREE.Mesh(backGeo);
    tempSeat.position.set(0, 0.6, 0);
    tempBack.position.set(0, 1.0, -0.25);
    helperGroup.add(tempSeat, tempBack);

    benchPositions.forEach((pos, i) => {
      const h = this.getWorldHeight(pos.x, pos.z);

      // Seat
      dummy.position.set(pos.x, h, pos.z);
      dummy.rotation.set(0, pos.rotation, 0);
      dummy.updateMatrix();

      // Transform seat matrix
      tempSeat.updateMatrix();
      const seatMatrix = dummy.matrix.clone().multiply(tempSeat.matrix);
      instancedSeat.setMatrixAt(i, seatMatrix);

      // Transform back matrix
      tempBack.updateMatrix();
      const backMatrix = dummy.matrix.clone().multiply(tempBack.matrix);
      instancedBack.setMatrixAt(i, backMatrix);
    });

    this.group.add(instancedSeat);
    this.group.add(instancedBack);
    console.log(`[World] Instanced ${count} benches.`);
  }

  private buildRocks() {
    const count = WORLD_CONFIG.rocks.length;
    if (count === 0) return;

    const rockGeo = new THREE.SphereGeometry(1, 10, 10);
    const rockMat = new THREE.MeshStandardMaterial({ color: "#a2b1bf", roughness: 0.8 });
    const instancedRocks = new THREE.InstancedMesh(rockGeo, rockMat, count);
    instancedRocks.castShadow = true;
    instancedRocks.receiveShadow = true;

    const dummy = new THREE.Object3D();
    WORLD_CONFIG.rocks.forEach((data, i) => {
      const h = this.getWorldHeight(data.x, data.z);
      dummy.position.set(data.x, h + data.size * 0.5, data.z);
      dummy.scale.setScalar(data.size);
      dummy.updateMatrix();
      instancedRocks.setMatrixAt(i, dummy.matrix);
    });

    this.group.add(instancedRocks);
    console.log(`[World] Instanced ${count} rocks.`);
  }

  resolveCollisions(pos: THREE.Vector3, radius: number) {
    const resolved = pos.clone();

    // Check BuildingManager colliders (Buildings)
    for (const c of this.buildingManager.colliders) {
      this.resolveSingleCollider(resolved, radius, c);
    }

    // Check World colliders (Trees, Lamps, Rocks)
    for (const c of this.colliders) {
      this.resolveSingleCollider(resolved, radius, c);
    }

    return resolved;
  }

  private resolveSingleCollider(pos: THREE.Vector3, radius: number, c: Collider) {
    const rot = c.rotation;
    const dx = pos.x - c.position.x;
    const dz = pos.z - c.position.z;
    const cos = Math.cos(-rot);
    const sin = Math.sin(-rot);
    const localX = dx * cos + dz * sin;
    const localZ = -dx * sin + dz * cos;

    const hx = c.half.x;
    const hz = c.half.z;

    const clampedX = Math.max(-hx, Math.min(hx, localX));
    const clampedZ = Math.max(-hz, Math.min(hz, localZ));
    const diffX = localX - clampedX;
    const diffZ = localZ - clampedZ;
    const dist2 = diffX * diffX + diffZ * diffZ;

    let newLocalX = localX;
    let newLocalZ = localZ;
    const inside = Math.abs(localX) <= hx && Math.abs(localZ) <= hz;

    if (inside) {
      const penX = hx - Math.abs(localX) + radius;
      const penZ = hz - Math.abs(localZ) + radius;
      if (penX < penZ) {
        newLocalX = localX >= 0 ? hx + radius : -hx - radius;
      } else {
        newLocalZ = localZ >= 0 ? hz + radius : -hz - radius;
      }
    } else if (dist2 < radius * radius) {
      const dist = Math.max(1e-6, Math.sqrt(dist2));
      const push = radius - dist;
      const nx = diffX / dist;
      const nz = diffZ / dist;
      newLocalX += nx * push;
      newLocalZ += nz * push;
    } else {
      return;
    }

    const worldX = c.position.x + newLocalX * Math.cos(rot) + newLocalZ * Math.sin(rot);
    const worldZ = c.position.z + (-newLocalX * Math.sin(rot) + newLocalZ * Math.cos(rot));
    pos.x = worldX;
    pos.z = worldZ;
  }

  resolvePlayerMovement(pos: THREE.Vector3, radius: number) {
    const resolved = this.resolveCollisions(pos, radius);

    const pushFromObject = (obj: THREE.Object3D, otherRadius: number) => {
      const dx = resolved.x - obj.position.x;
      const dz = resolved.z - obj.position.z;
      const dist = Math.hypot(dx, dz);
      const minDist = radius + otherRadius;
      if (dist < 1e-6 || dist >= minDist) return;
      const push = minDist - dist;
      const nx = dx / dist;
      const nz = dz / dist;
      resolved.x += nx * push;
      resolved.z += nz * push;
    };

    for (const car of this.buildingManager.parkedCars) {
      pushFromObject(car.object, car.radius);
    }
    for (const car of this.trafficSystem.trafficCars) {
      pushFromObject(car.object, 2.2);
    }
    // РАССТАВЛЕННЫЕ ОБЪЕКТЫ (через ObjectRegistry)
    if (this.registry) {
      for (const obj of this.registry.getAll()) {
        if (obj.type === "car") pushFromObject(obj.mesh, 2.2);
        if (obj.type === "bus") pushFromObject(obj.mesh, 4.5);
      }
    }

    // --- Boundary Clamping ---
    if (this.bounds) {
      resolved.x = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, resolved.x));
      resolved.z = Math.max(this.bounds.minZ, Math.min(this.bounds.maxZ, resolved.z));
    }

    return resolved;
  }

  resolveCarMovement(pos: THREE.Vector3, radius: number, ignore?: THREE.Object3D) {
    const resolved = this.resolveCollisions(pos, radius);

    const pushFromObject = (obj: THREE.Object3D, otherRadius: number) => {
      if (obj === ignore) return;
      const dx = resolved.x - obj.position.x;
      const dz = resolved.z - obj.position.z;
      const dist = Math.hypot(dx, dz);
      const minDist = radius + otherRadius;
      if (dist < 1e-6 || dist >= minDist) return;
      const push = minDist - dist;
      const nx = dx / dist;
      const nz = dz / dist;
      resolved.x += nx * push;
      resolved.z += nz * push;
    };

    for (const car of this.buildingManager.parkedCars) {
      pushFromObject(car.object, car.radius);
    }
    for (const car of this.trafficSystem.trafficCars) {
      pushFromObject(car.object, 2.2);
    }
    if (this.registry) {
      for (const obj of this.registry.getAll()) {
        if (obj.mesh === ignore) continue;
        if (obj.type === "car") pushFromObject(obj.mesh, 2.2);
        if (obj.type === "bus") pushFromObject(obj.mesh, 4.5);
      }
    }

    // --- Boundary Clamping ---
    if (this.bounds) {
      resolved.x = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, resolved.x));
      resolved.z = Math.max(this.bounds.minZ, Math.min(this.bounds.maxZ, resolved.z));
    }

    return resolved;
  }

  updateDoors(dt: number, playerPos: THREE.Vector3) {
    this.buildingManager.update(dt, playerPos);
  }

  getBuildingDoorPosition(label: string) {
    return this.buildingManager.getBuildingDoorPosition(label);
  }

  getParkedCarObjects() {
    return this.buildingManager.getParkedCarObjects();
  }

  occupyParkedCar(target: THREE.Object3D) {
    const info = this.buildingManager.removeParkedCar(target);
    if (!info) return null;
    const { color, position: pos, rotation: yaw, style, plateText } = info;
    const car = new Car([new THREE.Vector3(pos.x, 0, pos.z)], {
      color,
      speed: 0,
      y: 0.23,
      parked: false,
      plateText: plateText || "ПЕРСИК 777",
      style: style as "bubble" | "square" | "sports"
    });
    car.object.position.set(pos.x, pos.y, pos.z);
    car.object.rotation.y = yaw;
    car.object.userData.carColor = color;
    car.object.userData.carStyle = style;
    car.object.userData.carInstance = car;
    this.group.add(car.object);
    return car.object;
  }

  parkCarAt(target: THREE.Object3D) {
    const color = (target.userData?.carColor as string) ?? "#ff6b6b";
    const style = (target.userData?.carStyle as string) ?? "bubble";
    const pos = target.position;
    const yaw = target.rotation.y;
    const plateText = (target.userData?.plateText as string);
    this.group.remove(target);

    const info = this.buildingManager.addParkedCar(pos, yaw, color, plateText, style as any);
    return info.object;
  }

  spawnParkedCar(x: number, z: number, yaw?: number) {
    const colors = ["#ff6b6b", "#6bcBff", "#ffd166", "#a29bfe", "#ffffff", "#000000"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const rotation = yaw ?? Math.random() * Math.PI * 2;
    const pos = new THREE.Vector3(x, 0.22, z);
    const plateText = "НОВАЯ";
    const info = this.buildingManager.addParkedCar(pos, rotation, color, plateText);
    return info.object;
  }

  updateParkedCarDoors(_dt: number, _playerPos: THREE.Vector3, _openDist = 4.6, _closeDist = 5.2) {
    // Handled by BuildingManager.update
  }

  closeAllParkedCarDoors(dt = 0) {
    this.buildingManager.closeAllParkedCarDoors(dt);
  }

  findParkedCarNear(pos: { x: number; z: number }, maxDist: number) {
    // 1. Check BuildingManager (pre-placed and its own registration)
    const found = this.buildingManager.findParkedCarNear(pos, maxDist);
    if (found) return { car: found, distance: 0 };

    // 2. Check ObjectRegistry (user-placed vehicles)
    const worldPos = new THREE.Vector3(pos.x, 0, pos.z);
    if (!this.registry) return null;
    const nearby = this.registry.queryRadius(worldPos, maxDist);
    const vehicle = nearby.find((obj: PlaceableObject) => obj.type === "car" || obj.type === "bus");

    if (vehicle && vehicle.mesh) {
      // Return a mock ParkedCarInfo so it's driveable
      return {
        car: (vehicle.mesh as any).carInstance || (vehicle.mesh as any)._busInstance || {
          setDoorOpen: () => { },
          updateDoorAnimation: () => { },
          object: vehicle.mesh
        },
        distance: worldPos.distanceTo(vehicle.position)
      } as any;
    }

    return null;
  }

  private buildBirds() {
    // Небольшие стайки птичек, которые летают высоко над городом по кругу
    const flockCenters = [
      { x: -60, z: 20 }, // район парка / МЕДСИ / МТС SHOP
      { x: 0, z: 80 }, // над торговой улицей с банком
      { x: 40, z: 130 } // над райончиком домиков
    ];

    flockCenters.forEach((center, index) => {
      const group = new THREE.Group();
      const birdCount = 4 + Math.floor(Math.random() * 3);
      const baseGeo = new THREE.PlaneGeometry(0.7, 0.35);
      const mat = new THREE.MeshBasicMaterial({
        color: "#2d3436",
        side: THREE.DoubleSide
      });

      for (let i = 0; i < birdCount; i += 1) {
        const bird = new THREE.Mesh(baseGeo, mat);
        bird.position.set(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 1.5
        );
        bird.rotation.x = -Math.PI / 2 + (Math.random() - 0.5) * 0.3;
        bird.rotation.z = (Math.random() - 0.5) * 0.5;
        group.add(bird);
      }

      const radius = 26 + Math.random() * 10;
      const height = 32 + Math.random() * 6;
      const speed = 0.18 + Math.random() * 0.08;
      const phase = index * Math.PI * 0.8;

      this.birds.push({
        group,
        radius,
        speed,
        height,
        center,
        phase
      });
      this.group.add(group);
    });
  }

  private updateBirds(dt: number) {
    if (this.birds.length === 0) return;
    this.birdsTime += dt;

    this.birds.forEach((flock) => {
      const t = this.birdsTime * flock.speed + flock.phase;
      const x = flock.center.x + Math.cos(t) * flock.radius;
      const z = flock.center.z + Math.sin(t) * flock.radius;
      flock.group.position.set(x, flock.height, z);

      // Поворачиваем стаю по направлению движения
      flock.group.rotation.y = -t + Math.PI / 2;
    });
  }
}
