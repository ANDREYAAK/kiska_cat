import * as THREE from "three";
import { WORLD_CONFIG } from "@config/world";
import { GAME_CONFIG } from "@config/game";
import { BUILDING_LAYOUT, createBuilding } from "@entities/Building";
import { Car } from "@entities/Car";
import { createProceduralTexture, createLicensePlateTexture, createBillboardTexture } from "@utils/textures";
import type { Updatable } from "@core/Engine";

type TrafficDirection = "NS" | "EW";
type TrafficState = "NS_GO" | "NS_YELLOW" | "EW_GO" | "EW_YELLOW";

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

type Collider = {
  position: { x: number; z: number };
  half: { x: number; z: number };
  rotation: number;
  type: "building" | "tree";
};

type DoorState = {
  mesh: THREE.Object3D;
  position: { x: number; z: number };
  rotation: number;
  open: number; // 0 закрыта, 1 открыта
  label?: string;
};

type RoadInfo = {
  road: (typeof WORLD_CONFIG.roads)[number];
  worldOnRoad: { x: number; z: number };
  localOnRoad: { x: number; z: number };
  distance2: number;
};

type ParkedCarInfo = {
  car: Car;
  object: THREE.Object3D;
  radius: number;
  doorOpen: boolean;
};

type ParkingLayout = {
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

export class World implements Updatable {
  readonly group = new THREE.Group();
  private readonly wallTexture = createProceduralTexture("wall", "#f5efe8");
  private readonly roofTexture = createProceduralTexture("roof", "#d07055");
  private readonly windowTexture = createProceduralTexture("windows", "#7fc8ff");
  private readonly groundTexture = createProceduralTexture("grass", GAME_CONFIG.groundColor);
  private readonly sandTexture = createProceduralTexture("sand", GAME_CONFIG.sandColor);
  private readonly roadTexture = createProceduralTexture("road", "#555a60");

  private readonly tileTexture = createProceduralTexture("tile", "#e0e0e0");
  private readonly cloudTexture = createProceduralTexture("clouds", "rgba(0,0,0,0)");
  private readonly buildingPaths: Array<{ p1: THREE.Vector2; p2: THREE.Vector2; width: number }> = [];

  private readonly centerLineMaterial = new THREE.MeshStandardMaterial({
    color: "#ffffff",
    roughness: 0.4,
    metalness: 0.1,
    side: THREE.FrontSide // Ensure visibility
  });

  private readonly colliders: Collider[] = [];
  private readonly doors: DoorState[] = [];
  private mtsShopDoor?: { x: number; z: number };

  private birds: Array<{
    group: THREE.Group;
    radius: number;
    speed: number;
    height: number;
    center: { x: number; z: number };
    phase: number;
  }> = [];
  private birdsTime = 0;

  private readonly intersections = this.computeIntersections();

  private readonly trafficCars: Car[] = [];
  private readonly parkedCars: ParkedCarInfo[] = [];

  private readonly parkingParams = {
    spotW: 2.9,
    spotD: 5.8,
    gap: 0.4,
    pad: 1.2,
    aisle: 6.4,
    drivewayW: 3.2
  };

  private readonly parkingLayouts: ParkingLayout[] = [];

  private trafficState: TrafficState = "NS_GO";
  private trafficTimer = 0;
  private readonly trafficCycleTime = 5; // сек.
  private readonly trafficYellowTime = 1.5; // сек.
  private readonly trafficLights: Array<{
    type: TrafficDirection;
    red: THREE.MeshBasicMaterial;
    yellow: THREE.MeshBasicMaterial;
    green: THREE.MeshBasicMaterial;
  }> = [];

  // --- Terrain Logic ---
  public getWorldHeight(x: number, z: number): number {
    const tH = this.getTerrainHeight(x, z);

    // Check all roads. If x,z is ON A BRIDGE, return bridge height.
    // Optimization: Check the known bridge road efficiently.
    // Road at X=-70 crosses the river.
    // Now the river is curved. Logic needs update.
    // Simplified: If we are close to ANY road, we use the road's height rule.
    // But roads themselves follow terrain, EXCEPT bridges.

    // Let's rely on World.buildRoads logic which RAISES the road over the river.
    // But physics needs to know this.
    // Bridge location: X = -70, Z = -40 (approx).
    const isBridgeZone = Math.abs(x - (-70)) < 6 && Math.abs(z - (-40)) < 16;
    if (isBridgeZone) {
      // Bridge keeps height of the banks (approx 0).
      return Math.max(tH, 0.04);
    }

    // Check if on the main "Park Road" (if we want that to be a bridge too?)
    // No, only the X=-70 road is an explicit bridge for now.

    return tH;
  }

  private readonly riverWidth = 18;

  // --- River curve function ---
  // Returns the central Z of the river for a given X.
  private getRiverCenterZ(x: number): number {
    // River moved to Z=160 (North of all buildings) to avoid city flooding.
    // Oscillates slightly for visual interest.
    return 160 + 10 * Math.sin(x * 0.05);
  }

  private getTerrainHeight(x: number, z: number): number {
    // FIX: Flatten terrain near buildings and parking to prevent floating/sinking.
    if (this.isPointNearBuilding(x, z, 6.0) || this.isPointInParking(x, z, 4.0)) {
      return 0;
    }

    let h = 0;

    // 1) River (Curved)
    const riverZ = this.getRiverCenterZ(x);
    const riverDist = Math.abs(z - riverZ);

    if (riverDist < this.riverWidth) {
      const k = riverDist / this.riverWidth;
      const depth = 5.0 * (Math.cos(k * Math.PI) + 1) * 0.5;
      h -= depth;
    }

    // 2) Hill (Park Area)
    const hillX = -110;
    const hillZ = -80;
    const hillR = 45;
    const distSq = (x - hillX) ** 2 + (z - hillZ) ** 2;
    if (distSq < hillR * hillR) {
      const dist = Math.sqrt(distSq);
      const k = dist / hillR;
      h += 7.0 * (Math.cos(k * Math.PI) + 1) * 0.5;
    }

    return h;
  }

  private isPointInRiver(x: number, z: number, margin = 0): boolean {
    const riverZ = this.getRiverCenterZ(x);
    return Math.abs(z - riverZ) < (this.riverWidth - 2 + margin);
  }


  constructor() {
    this.wallTexture.repeat.set(2, 2);
    this.roofTexture.repeat.set(2, 2);
    this.windowTexture.repeat.set(1, 1);
    this.parkingLayouts = this.computeParkingLayouts();
    this.intersections = this.computeIntersections();

    this.buildSky();
    // Removed duplicate calls
    this.buildHills();
    this.buildGround();
    this.buildParks();
    this.buildBeach();
    this.buildWater();

    this.buildRoads(); // Теперь будет учитывать рельеф
    this.buildPathsToBuildings();
    this.buildParkingLots();
    this.buildCrosswalks();
    this.buildTrafficLights();
    this.buildBuildings();
    this.buildTrees();
    this.buildLamps();
    this.buildUmbrellas();
    this.buildBenches();
    this.buildRocks();
    this.buildBirds();
    this.generateBillboards();
    this.buildTrafficCars();
  }

  update(dt: number) {
    this.updateTrafficLights(dt);
    this.updateBirds(dt);
    this.updateTrafficCars(dt);
  }

  private updateTrafficCars(dt: number) {
    if (this.trafficCars.length === 0) return;

    const checkDistanceAhead = 18;
    const laneWidth = 2.2;
    const followDistance = 6.0;

    const sqr = (v: number) => v * v;

    const intersections = this.intersections;
    const innerStopRadius = 4.0;
    const outerStopRadius = 18.0;

    const getLightState = (dir: TrafficDirection) => this.getTrafficLightState(dir);

    for (const car of this.trafficCars) {
      const pos = car.object.position;
      const fwd = car.getForward2D();

      let speedScale = 1;

      // 1) Учёт машины впереди в той же полосе (простая модель очереди).
      let closestAheadDist = Infinity;
      for (const other of this.trafficCars) {
        if (other === car) continue;
        const op = other.object.position;
        const dx = op.x - pos.x;
        const dz = op.z - pos.z;
        const dist2 = sqr(dx) + sqr(dz);
        if (dist2 > checkDistanceAhead * checkDistanceAhead || dist2 < 1e-4) continue;

        const dist = Math.sqrt(dist2);
        const dirToOtherX = dx / dist;
        const dirToOtherZ = dz / dist;
        const aheadDot = dirToOtherX * fwd.x + dirToOtherZ * fwd.z;
        if (aheadDot < 0.7) continue; // не впереди

        // Поперечное смещение (насколько он в нашей полосе).
        const lateral = Math.abs(dx * fwd.z - dz * fwd.x);
        if (lateral > laneWidth) continue;

        if (dist < closestAheadDist) {
          closestAheadDist = dist;
        }
      }

      if (closestAheadDist < Infinity) {
        if (closestAheadDist < followDistance * 0.4) {
          speedScale = 0;
        } else if (closestAheadDist < followDistance) {
          const t = (closestAheadDist - followDistance * 0.4) / (followDistance * 0.6);
          speedScale = Math.min(speedScale, Math.max(0, t));
        }
      }

      // 2) Учёт светофора/перекрёстка: плавно тормозим, если едем на красный.
      for (const it of intersections) {
        const dx = it.x - pos.x;
        const dz = it.z - pos.z;
        const dist2 = sqr(dx) + sqr(dz);
        if (dist2 > outerStopRadius * outerStopRadius || dist2 < innerStopRadius * innerStopRadius) continue;

        const dist = Math.sqrt(dist2);
        const toCenterX = dx / dist;
        const toCenterZ = dz / dist;
        const movingTowards = toCenterX * fwd.x + toCenterZ * fwd.z > 0.4;
        if (!movingTowards) continue;

        // Определяем, по какой оси едем (NS/EW), как в TrafficSystem cat-banking-game.
        const dir: TrafficDirection = Math.abs(dz) > Math.abs(dx) ? "NS" : "EW";
        const light = getLightState(dir);
        const isStop = light === "RED" || light === "YELLOW";
        if (!isStop) continue;

        // Чем ближе к центру, тем сильнее тормозим.
        const t = (dist - innerStopRadius) / Math.max(outerStopRadius - innerStopRadius, 0.001);
        const factor = Math.max(0, Math.min(1, t));
        speedScale = Math.min(speedScale, factor);
      }

      car.setSpeedScale(speedScale);
      const h = this.getWorldHeight(pos.x, pos.z);
      car.update(dt, h);
    }
  }

  private buildTrafficCars() {
    const roads = WORLD_CONFIG.roads ?? [];
    if (roads.length === 0) return;

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    // Этап 1: простое “туда-обратно” по каждой дороге, но в виде замкнутого маршрута:
    // правая полоса в одну сторону + левая полоса в обратную (получается петля без телепорта).
    const buildLoopPathForRoad = (road: (typeof roads)[number]) => {
      const rot = road.rotation ?? 0;
      const halfL = road.length / 2;

      // Держимся ближе к центру дороги, чтобы машина не цепляла края даже на узких дорогах.
      const maxOffset = road.width / 2 - 1.15;
      const laneOffset = clamp(road.width * 0.25, 1.2, Math.max(1.2, maxOffset));

      const endPad = 4.0;
      const step = 4.5;

      const pointsForward: THREE.Vector3[] = [];
      for (let z = -halfL + endPad; z <= halfL - endPad + 1e-6; z += step) {
        const w = this.localToWorldXZ(road.position.x, road.position.z, rot, laneOffset, z);
        pointsForward.push(new THREE.Vector3(w.x, 0, w.z));
      }

      const pointsBack: THREE.Vector3[] = [];
      for (let z = halfL - endPad; z >= -halfL + endPad - 1e-6; z -= step) {
        const w = this.localToWorldXZ(road.position.x, road.position.z, rot, -laneOffset, z);
        pointsBack.push(new THREE.Vector3(w.x, 0, w.z));
      }

      // Склеиваем без дубля последней точки.
      if (pointsForward.length > 0 && pointsBack.length > 0) {
        const a = pointsForward[pointsForward.length - 1]!;
        const b = pointsBack[0]!;
        if (a.distanceTo(b) < 0.1) pointsBack.shift();
      }
      if (pointsBack.length > 0 && pointsForward.length > 0) {
        const a = pointsBack[pointsBack.length - 1]!;
        const b = pointsForward[0]!;
        if (a.distanceTo(b) < 0.1) pointsForward.shift();
      }

      return [...pointsForward, ...pointsBack];
    };

    const pickRoad = (idx: number) => roads[idx] ?? null;
    const carRoads = [pickRoad(0), pickRoad(1), pickRoad(2)].filter(Boolean) as Array<(typeof roads)[number]>;
    if (carRoads.length === 0) return;

    const colors = ["#ff6b6b", "#6bcBff", "#ffd166"];
    carRoads.forEach((r, i) => {
      const path = buildLoopPathForRoad(r);
      if (path.length < 4) return;
      const plateText = FUNNY_PLATES[Math.floor(Math.random() * FUNNY_PLATES.length)];
      const car = new Car(path, {
        color: colors[i % colors.length]!,
        speed: 8.0,
        y: 0.23,
        startIndex: Math.floor((path.length * i) / carRoads.length),
        plateText
      });
      this.trafficCars.push(car);
      this.group.add(car.object);
    });
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

  private buildSky() {
    const skyRadius = GAME_CONFIG.worldSize * 1.6;
    const geometry = new THREE.SphereGeometry(skyRadius, 32, 32);
    const material = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        topColor: { value: new THREE.Color(GAME_CONFIG.skyTopColor) },
        bottomColor: { value: new THREE.Color(GAME_CONFIG.skyBottomColor) },
        offset: { value: 24 },
        exponent: { value: 0.42 }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
          float mixValue = max(pow(max(h, 0.0), exponent), 0.0);
          gl_FragColor = vec4(mix(bottomColor, topColor, mixValue), 1.0);
        }
      `
    });
    const sky = new THREE.Mesh(geometry, material);
    this.group.add(sky);

    // Солнце (видимый диск) + лёгкие облака — чтобы “горизонт” смотрелся живее.
    this.buildSunAndClouds();
  }

  private buildSunAndClouds() {
    const cloudDistance = GAME_CONFIG.worldSize * 3.0;
    const cloudBaseY = 105;
    const cloudRangeY = 35;
    const skyRadius = GAME_CONFIG.worldSize * 1.6;

    // Солнце делаем “физическим” объектом как в cat-banking-game:
    // так его не “съедает” ориентация билборда/туман и оно гарантированно видно.
    // Ставим на дальность облаков, чтобы оно всегда было "за" сценой.
    const sunGroup = new THREE.Group();
    const sunDistance = Math.min(skyRadius * 0.78, cloudDistance * 0.6);
    const sunHeight = Math.min(skyRadius * 0.5, cloudBaseY + cloudRangeY * 0.45);
    sunGroup.position.set(0, sunHeight, -sunDistance);

    const sunCoreR = GAME_CONFIG.worldSize * 0.075;
    const sunCore = new THREE.Mesh(
      new THREE.SphereGeometry(sunCoreR, 28, 28),
      new THREE.MeshBasicMaterial({ color: 0xfff1b0, fog: false, depthWrite: false, depthTest: true })
    );
    sunCore.renderOrder = 3;
    sunGroup.add(sunCore);

    const glowOuter = new THREE.Mesh(
      new THREE.SphereGeometry(sunCoreR * 2.4, 28, 28),
      new THREE.MeshBasicMaterial({
        color: 0xffe7a3,
        fog: false,
        transparent: true,
        opacity: 0.42,
        side: THREE.BackSide,
        depthWrite: false,
        depthTest: true
      })
    );
    glowOuter.renderOrder = 2;
    sunGroup.add(glowOuter);

    const glowInner = new THREE.Mesh(
      new THREE.SphereGeometry(sunCoreR * 1.8, 28, 28),
      new THREE.MeshBasicMaterial({
        color: 0xffd38a,
        fog: false,
        transparent: true,
        opacity: 0.48,
        side: THREE.BackSide,
        depthWrite: false,
        depthTest: true
      })
    );
    glowInner.renderOrder = 2;
    sunGroup.add(glowInner);

    this.group.add(sunGroup);

    // Облака — объёмные “пухлые” гроздья, как в cat-banking-game.
    this.cloudTexture.wrapS = this.cloudTexture.wrapT = THREE.RepeatWrapping;
    this.cloudTexture.repeat.set(1, 1);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.85,
      emissive: "#ffffff",
      emissiveIntensity: 0.03,
      // Важно: используем текстуру ТОЛЬКО как альфа‑маску (без “грязного” цвета).
      alphaMap: this.cloudTexture,
      depthWrite: false
    });

    const makeCloud = (x: number, y: number, z: number, scale: number) => {
      const g = new THREE.Group();
      const puffCount = 5;
      for (let i = 0; i < puffCount; i += 1) {
        const r = 7 + Math.random() * 5;
        const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 18), cloudMaterial);
        puff.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 12);
        g.add(puff);
      }
      g.position.set(x, y, z);
      g.scale.setScalar(scale);
      g.rotation.y = Math.random() * Math.PI * 2;
      g.renderOrder = 2;
      return g;
    };

    const clouds = new THREE.Group();
    const count = 18;
    for (let i = 0; i < count; i += 1) {
      const x = (Math.random() - 0.5) * cloudDistance;
      const z = (Math.random() - 0.5) * cloudDistance;
      const y = cloudBaseY + Math.random() * cloudRangeY;
      const scale = 0.9 + Math.random() * 0.55;
      clouds.add(makeCloud(x, y, z, scale));
    }
    this.group.add(clouds);
  }

  private buildGround() {
    // Земля должна покрывать дороги/районы, чтобы “обрыв” не появлялся на горизонте.
    const bounds = this.computeWorldBounds2D(40);
    const groundSize = Math.max(bounds.maxX - bounds.minX, bounds.maxZ - bounds.minZ, GAME_CONFIG.worldSize);

    // Делаем сегментированную сетку для рельефа (128x128)
    const segments = 128;
    const geometry = new THREE.PlaneGeometry(groundSize, groundSize, segments, segments);

    // Применяем карту высот
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      // Plane создается в XY плоскости.
      // После поворота (rotation.x = -PI/2):
      // Local X -> World X
      // Local Y -> World -Z (именно минус Z, т.к. Y смотрит вверх по текстуре, а Z на нас)
      // Но проще мыслить в мировых, если трансформировать координаты.

      // В локальных координатах geom: x в [-size/2, size/2], y в [-size/2, size/2].
      // При дефолтном повороте меша:
      // WorldX = LocalX
      // WorldZ = -LocalY (или LocalY, зависит от UV, обычно PlaneGeometry UV v=0 at bottom (minY), v=1 at top (maxY))
      // В ThreeJS PlaneGeometry лежит в XY. Y+ это "вверх".
      // При повороте -90 по X: Y+ становится Z- (вглубь экрана), Y- становится Z+ (к зрителю).
      // Значит WorldZ = -LocalY.

      const lx = pos.getX(i);
      const ly = pos.getY(i);

      const wx = lx;
      const wz = -ly;

      let h = this.getTerrainHeight(wx, wz);

      // FIX: Lower ground under roads to curb clipping, but keep hill shape.
      // Use wider margin (+1.5) to ensure shoulders are lowered too.
      if (this.isPointOnRoad(wx, wz, 1.5)) {
        // Sink the ground by 0.4m relative to its natural height.
        // This ensures the road (at natural height + 0.04) floats above it.
        h -= 0.4;
      }

      // Z компонента в PlaneGeometry станет Y (высотой) после поворота.
      // НО смещение вершин работает в локальных осях. В PlaneGeometry "высота" (перпендикуляр) это Z.
      pos.setZ(i, h);
    }

    // Пересчет нормалей для правильного света на холмах
    geometry.computeVertexNormals();

    this.groundTexture.repeat.set(10, 10);
    const material = new THREE.MeshStandardMaterial({
      color: GAME_CONFIG.groundColor,
      map: this.groundTexture,
      roughness: 0.85,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.group.add(ground);

    const flowerColors = [
      "#ff6b6b",
      "#ff9ff3",
      "#ffeaa7",
      "#a29bfe",
      "#ff7675",
      "#fdcb6e",
      "#fef5e7",
      "#c8d6e5",
      "#ffcccc"
    ];

    const radius = GAME_CONFIG.worldSize * 0.5;
    // More flowers, different sizes
    for (let i = 0; i < 1200; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * radius;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      // Не сажаем цветы на дорогах/вокруг дорог
      if (this.isPointOnRoad(x, z, 1.2)) continue;
      // Не сажаем на тропинках
      if (this.isPointOnPath(x, z, 0.5)) continue;
      // Не сажаем цветы на парковках
      if (this.isPointInParking(x, z, 1.4)) continue;
      // И не сажаем цветы под зданиями (чтобы не “торчали” из фундамента).
      if (this.isPointNearBuilding(x, z, 2.8)) continue;
      // И не сажаем цветы на воде/пляже
      if (this.isPointInAreas(x, z, (WORLD_CONFIG as { waterAreas?: any[] }).waterAreas, 0)) continue;
      if (this.isPointInAreas(x, z, (WORLD_CONFIG as { beachAreas?: any[] }).beachAreas, 0)) continue;

      const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];

      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.6, 6),
        new THREE.MeshStandardMaterial({ color: "#27ae60" })
      );
      stem.position.set(x, 0.3, z);

      // Replaced with createFlowerHead
      const head = this.createFlowerHead(color);
      head.position.set(x, 0.65, z);
      head.castShadow = true;
      this.group.add(stem, head);

      // Random scale for variety
      const s = 0.8 + Math.random() * 1.0;
      stem.scale.set(s, s, s);
      head.scale.set(s, s, s);
    }

    // Additional "Big" flowers
    for (let i = 0; i < 300; i++) {
      // Copy loop logic but bigger scale
      // ... Or just rely on the main loop with wider scale range.
      // Let's just stick to the main loop but make it 1200 and varied.
    }

    this.buildBushes();
  }

  private isPointOnPath(x: number, z: number, margin = 0): boolean {
    for (const p of this.buildingPaths) {
      // Distance from point to segment p1-p2
      const l2 = p.p1.distanceToSquared(p.p2);
      if (l2 === 0) {
        if (p.p1.distanceTo(new THREE.Vector2(x, z)) < p.width / 2 + margin) return true;
        continue;
      }
      const t = ((x - p.p1.x) * (p.p2.x - p.p1.x) + (z - p.p1.y) * (p.p2.y - p.p1.y)) / l2;
      const tClamped = Math.max(0, Math.min(1, t));
      const projX = p.p1.x + tClamped * (p.p2.x - p.p1.x);
      const projZ = p.p1.y + tClamped * (p.p2.y - p.p1.y);
      const dist = Math.hypot(x - projX, z - projZ);
      if (dist < p.width / 2 + margin) return true;
    }
    return false;
  }

  private createFlowerHead(color: string) {
    // Simple petal flower
    const group = new THREE.Group();
    const center = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshStandardMaterial({ color: "#ffff00" }));
    group.add(center);

    const petalGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const petalMat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const petal = new THREE.Mesh(petalGeo, petalMat);
      petal.position.set(Math.cos(angle) * 0.1, 0, Math.sin(angle) * 0.1);
      group.add(petal);
    }
    return group;
  }

  private createBushMesh(scale: number) {
    const group = new THREE.Group();
    // Tiny trunk
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1 * scale, 0.15 * scale, 0.4 * scale, 6),
      new THREE.MeshStandardMaterial({ color: "#7a5138", roughness: 1.0 })
    );
    trunk.position.y = 0.2 * scale;
    trunk.castShadow = true;
    group.add(trunk);

    // Foliage - "tree style" (stacked spheres)
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

  private buildBushes() {
    for (let i = 0; i < 60; i++) {
      const r = 20 + Math.random() * 80;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;

      if (this.isPointOnRoad(x, z, 2)) continue;
      if (this.isPointNearBuilding(x, z, 3)) continue;
      if (this.isPointInRiver(x, z, 2)) continue;
      if (this.isPointInParking(x, z, 2)) continue;

      const h = this.getWorldHeight(x, z);
      const bush = this.createBushMesh(1.0 + Math.random() * 0.5);
      bush.position.set(x, h, z);
      this.group.add(bush);
    }
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
      const local = this.worldToLocalXZ(r.position.x, r.position.z, rot, x, z);
      if (Math.abs(local.x) <= r.width / 2 + padding && Math.abs(local.z) <= r.length / 2 + padding) return true;
    }
    return false;
  }

  private isPointNearBuilding(x: number, z: number, padding: number) {
    return WORLD_CONFIG.buildings.some((b) => {
      const rot = (b as { rotation?: number }).rotation ?? 0;
      const local = this.worldToLocalXZ(b.position.x, b.position.z, rot, x, z);
      return Math.abs(local.x) <= b.size.x / 2 + padding && Math.abs(local.z) <= b.size.z / 2 + padding;
    });
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
      const local = this.worldToLocalXZ(r.position.x, r.position.z, rot, x, z);
      const cx = clamp(local.x, -r.width / 2, r.width / 2);
      const cz = clamp(local.z, -r.length / 2, r.length / 2);
      const w = this.localToWorldXZ(r.position.x, r.position.z, rot, cx, cz);
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

  private isPointInParking(x: number, z: number, padding = 0) {
    return this.parkingLayouts.some((lot) => {
      const local = this.worldToLocalXZ(lot.center.x, lot.center.z, lot.rotation, x, z);
      return Math.abs(local.x) <= lot.totalW / 2 + padding && Math.abs(local.z) <= lot.totalD / 2 + padding;
    });
  }

  private worldToLocalXZ(originX: number, originZ: number, rotY: number, x: number, z: number) {
    const dx = x - originX;
    const dz = z - originZ;
    const c = Math.cos(-rotY);
    const s = Math.sin(-rotY);
    return {
      x: dx * c + dz * s,
      z: -dx * s + dz * c
    };
  }

  private computeIntersections() {
    // Перекрёсток — это пересечение центральных линий двух дорог (если точка попадает в обе полосы).
    // Нужен для:
    // - светофоров “на каждом перекрёстке”
    // - удаления разметки непосредственно в зоне перекрёстка
    const roads = WORLD_CONFIG.roads ?? [];
    const eps = 1e-6;

    const cross2 = (a: { x: number; z: number }, b: { x: number; z: number }) => a.x * b.z - a.z * b.x;

    const dir = (rotY: number) => ({ x: Math.sin(rotY), z: Math.cos(rotY) }); // локальная +Z

    const intersections: Array<{ x: number; z: number; halfSize: number; roadWidth: number }> = [];

    for (let i = 0; i < roads.length; i += 1) {
      for (let j = i + 1; j < roads.length; j += 1) {
        const a = roads[i];
        const b = roads[j];
        const aRot = a.rotation ?? 0;
        const bRot = b.rotation ?? 0;

        const p = { x: a.position.x, z: a.position.z };
        const q = { x: b.position.x, z: b.position.z };
        const r = dir(aRot);
        const s = dir(bRot);
        const rxs = cross2(r, s);
        if (Math.abs(rxs) < eps) continue; // параллельны

        const qmp = { x: q.x - p.x, z: q.z - p.z };
        const t = cross2(qmp, s) / rxs;
        const hit = { x: p.x + r.x * t, z: p.z + r.z * t };

        // Проверяем, что точка пересечения действительно лежит внутри обеих дорог (как прямоугольников).
        const aLocal = this.worldToLocalXZ(a.position.x, a.position.z, aRot, hit.x, hit.z);
        const bLocal = this.worldToLocalXZ(b.position.x, b.position.z, bRot, hit.x, hit.z);
        const inA = Math.abs(aLocal.x) <= a.width / 2 + 0.01 && Math.abs(aLocal.z) <= a.length / 2 + 0.01;
        const inB = Math.abs(bLocal.x) <= b.width / 2 + 0.01 && Math.abs(bLocal.z) <= b.length / 2 + 0.01;
        if (!inA || !inB) continue;

        // Полузона перекрёстка: радикально увеличиваем, чтобы убрать разметку наверняка.
        const roadWidth = Math.max(a.width, b.width);
        const halfSize = roadWidth / 2 + 7.5; // Exclusion zone radius

        // Дедупликация (если вдруг два раза нашли один и тот же перекрёсток).
        const already = intersections.some((it) => Math.hypot(it.x - hit.x, it.z - hit.z) < 0.5);
        if (!already) intersections.push({ x: hit.x, z: hit.z, halfSize, roadWidth });
      }
    }

    return intersections;
  }



  private buildHills() {
    // Холмы должны выглядеть как земляные насыпи:
    // - широкое основание (без “закруглённого края” как у сферы),
    // - плавная вершина (без острого конуса),
    // - разнообразные зелёно‑жёлтые оттенки,
    // - немного “неровности”, чтобы не были идеальными.

    const palette = ["#5fae6a", "#72bf76", "#86c56f", "#a7cf6a", "#c9c56a", "#8bbf8a"];
    const bounds = this.computeWorldBounds2D(0);
    const edge = Math.max(
      Math.abs(bounds.minX),
      Math.abs(bounds.maxX),
      Math.abs(bounds.minZ),
      Math.abs(bounds.maxZ)
    );

    // Ставим холмы так, чтобы дороги “упирались” в них, но не уходили далеко в туман.
    const radius = edge + 6;
    const count = 20;

    const distort = (geo: THREE.BufferGeometry, amount: number, maxY: number) => {
      const pos = geo.attributes.position;
      // Safety: если вдруг геометрия без позиций
      if (!pos) return;
      for (let i = 0; i < pos.count; i += 1) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);
        const r = Math.hypot(x, z);
        if (r < 1e-6) continue;

        // Простая “волна” + случайность, сильнее у основания, слабее у вершины.
        const ny = Math.min(1, Math.max(0, y / Math.max(1e-6, maxY))); // 0..1
        const weight = 1 - Math.min(1, Math.max(0, ny));
        const wave = Math.sin(x * 3.1) * 0.35 + Math.cos(z * 2.7) * 0.35;
        const jitter = (Math.random() - 0.5) * 0.5;
        const k = 1 + (wave + jitter) * amount * weight;

        pos.setXYZ(i, x * k, y, z * k);
      }
      geo.computeVertexNormals();
    };

    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2;
      const dist = radius + (Math.random() - 0.5) * 14;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      const baseR = 20 + Math.random() * 22;
      const height = 7 + Math.random() * 10;

      const color = palette[Math.floor(Math.random() * palette.length)];
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.95,
        metalness: 0
      });

      // Реальная форма холма: один гладкий “профиль”, вращаем вокруг оси (Lathe).
      // Так не будет “шляпы” (резкого бортика) и не будет “капли” (слишком круглой сферы).
      const profile: THREE.Vector2[] = [];
      const steps = 18;
      const R = baseR;
      const H = height;
      const p = 2.0; // форма склона
      const q = 1.05; // мягкость у края
      for (let s = 0; s <= steps; s += 1) {
        const t = s / steps;
        const r = t * R;
        const y = H * Math.pow(Math.max(0, 1 - Math.pow(t, p)), q);
        profile.push(new THREE.Vector2(r, y));
      }
      const hillGeo = new THREE.LatheGeometry(profile, 28);
      distort(hillGeo, 0.07, H);
      const hillMesh = new THREE.Mesh(hillGeo, mat);
      hillMesh.castShadow = false;
      hillMesh.receiveShadow = false;
      hillMesh.position.set(x, -1.6, z); // слегка “в землю”, чтобы стык выглядел естественно
      hillMesh.rotation.y = Math.random() * Math.PI * 2;
      this.group.add(hillMesh);

      // Деревья возле холмов (по “подножию”), чтобы стало живее.
      // Ставим на плоскость (y=0), не на склон — так не будет “висящих” деревьев.
      const trees = 6 + Math.floor(Math.random() * 10);
      for (let t = 0; t < trees; t += 1) {
        const a = Math.random() * Math.PI * 2;
        const d = baseR * (0.75 + Math.random() * 0.55);
        const tx = x + Math.cos(a) * d;
        const tz = z + Math.sin(a) * d;
        if (this.isPointOnRoad(tx, tz, 1.2)) continue;
        if (this.isPointNearBuilding(tx, tz, 4.5)) continue;
        if (this.isPointInAreas(tx, tz, (WORLD_CONFIG as { waterAreas?: any[] }).waterAreas, 2.0)) continue;
        if (this.isPointInAreas(tx, tz, (WORLD_CONFIG as { beachAreas?: any[] }).beachAreas, 2.0)) continue;
        this.addTree(tx, tz);
      }
    }
  }

  private buildBeach() {
    const beaches = (WORLD_CONFIG as { beachAreas?: Array<{ position: { x: number; z: number }; width: number; depth: number }> })
      .beachAreas;
    if (!beaches || beaches.length === 0) return;

    this.sandTexture.repeat.set(8, 6);
    const material = new THREE.MeshStandardMaterial({
      color: GAME_CONFIG.sandColor,
      map: this.sandTexture,
      roughness: 0.9,
      metalness: 0
    });

    beaches.forEach((b) => {
      // Need segments to follow terrain to avoid clipping?
      // Beaches are usually flat near water?
      // Let's segment them just in case.
      const segs = 16;
      const geo = new THREE.PlaneGeometry(b.width, b.depth, segs, segs);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const lx = pos.getX(i);
        const ly = pos.getY(i);
        const h = this.getWorldHeight(b.position.x + lx, b.position.z - ly);
        pos.setZ(i, h);
      }
      geo.computeVertexNormals();

      const beach = new THREE.Mesh(geo, material);
      beach.position.set(b.position.x, 0.12, b.position.z); // Lift up
      beach.rotation.x = -Math.PI / 2;
      beach.receiveShadow = true;
      this.group.add(beach);
    });
  }

  private buildWater() {
    // 1. Static water areas (Lake/Ponds)
    const waterMat = new THREE.MeshStandardMaterial({
      color: "#4FA4F4",
      roughness: 0.1,
      metalness: 0.5,
      transparent: true,
      opacity: 0.85
    });

    const waters = (WORLD_CONFIG as { waterAreas?: Array<{ position: { x: number; z: number }; width: number; depth: number }> }).waterAreas;
    waters?.forEach((w) => {
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w.width, w.depth), waterMat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(w.position.x, -1.8, w.position.z);
      this.group.add(mesh);
    });

    // 2. The Curved River
    // We construct a mesh that follows the river path along X.
    const riverLen = 400;
    const segs = 120;
    // FIX: Match riverWidth with class property
    const riverGeo = new THREE.PlaneGeometry(riverLen, this.riverWidth, segs, 4);

    const pos = riverGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const lx = pos.getX(i);
      const ly = pos.getY(i);

      // lx is along X world approx.
      const wx = lx;
      const centerZ = this.getRiverCenterZ(wx);

      // ly is width (local Y for plane, becomes Z after rotation).
      // Let's set X = wx.
      // Let's set Y = -(centerZ + ly). (Because RotX -90 flips Y->-Z)

      pos.setX(i, wx);
      pos.setY(i, -(centerZ + ly));
      pos.setZ(i, 0);
    }

    riverGeo.computeVertexNormals();
    riverGeo.computeBoundingBox();
    riverGeo.computeBoundingSphere();
    const river = new THREE.Mesh(riverGeo, waterMat);
    river.rotation.x = -Math.PI / 2;
    river.position.y = -3.8;
    this.group.add(river);
  }

  private buildRoads() {
    WORLD_CONFIG.roads?.forEach((road) => {
      const roadGroup = new THREE.Group();
      // Y поднимем чуть позже или внутри мешей, но база пусть будет 0
      roadGroup.position.set(road.position.x, 0, road.position.z);
      roadGroup.rotation.y = road.rotation ?? 0;

      // Сегментированная дорога, чтобы лечь на холмы
      const segs = Math.max(2, Math.ceil(road.length / 4)); // каждые 4 метра сегмент
      const geo = new THREE.PlaneGeometry(road.width, road.length, 4, segs);

      const pos = geo.attributes.position;
      // Removed unused vec, worldPos


      // Нужно трансформировать каждую вершину в мировые, узнать высоту и вернуть локальную Z (которая станет Y).
      // roadGroup имеет позицию и вращение.
      roadGroup.updateMatrixWorld(); // На всякий случай (хотя она еще не в сцене, матрица локальная нужна)

      // Ручная трансформация, т.к. roadGroup еще не приатачена и updateMatrixWorld может не сработать корректно с родителями.
      // Просто используем road.position и road.rotation.
      const rCos = Math.cos(road.rotation ?? 0);
      const rSin = Math.sin(road.rotation ?? 0);
      const rX = road.position.x;
      const rZ = road.position.z;

      // Массив для хранения высот, чтобы потом поднять разметку
      // Но разметка это отдельные меши... Сложно.
      // Проще: мы гнём "асфальт", а разметку рисуем тоже гнутой?
      // Или используем Decal? Нет.
      // Проще buildRoads сделать один меш с текстурой, где разметка нарисована? Нет.
      // Пока гнём только асфальт. Разметка (dashed line) останется плоской -> БАГ.
      // Решение: Разметку тоже надо гнуть. Или рисовать текстурой.
      // В текущем коде `addDashedLine` создает PlaneGeometry.

      // 1. Гнём Асфальт
      for (let i = 0; i < pos.count; i++) {
        const lx = pos.getX(i);
        const ly = pos.getY(i); // Вдоль дороги (Z локальная до поворота)
        // PlaneGeometry(W, L): X от -W/2 до W/2. Y от -L/2 до L/2.
        // Rotation X -90: Local (lx, ly, 0) -> Rotated (lx, 0, -ly).
        // + Position (rX, rZ) + Rotation Y (roadRot).

        // Координата вдоль дороги (ly) соответствует минус Z в локальной системе после поворота X-90.
        // И еще Rotation Y.
        // Давайте считать так:
        // Точка на плоскости дороги до поворотов (но с учетом геометрии):
        // У нас дорога лежит "как бы" вдоль Z (длина L).
        // После PlaneGeometry: Y - это длина.
        // После rotation -PI/2: Y становится -Z.
        // То есть "вперед" по дороге это -LocalY. (Верх текстуры).

        // Переводим в мировые:
        // Сначала поворот дороги (Y).
        // LocalRoad (lx, 0, -ly).
        // Rotated: 
        // wx = lx * cos - (-ly) * sin + rX
        // wz = lx * sin + (-ly) * cos + rZ

        const localZ = -ly;

        const wx = lx * rCos + localZ * rSin + rX;
        const wz = -lx * rSin + localZ * rCos + rZ;

        // Получаем высоту рельефа
        const tH = this.getTerrainHeight(wx, wz);

        // Logic for Bridge: If terrain drops significantly (river/canyon), keep road flat (at height ~0).
        let finalH = tH;
        if (finalH < -0.5) {
          finalH = 0;
        }

        // Lift slightly above ground to avoid z-fighting on flat terrain
        finalH += 0.04;

        pos.setZ(i, finalH);
      }
      geo.computeVertexNormals();

      const asphalt = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({
          color: "#555a60",
          map: this.roadTexture,
          roughness: 0.9,
          metalness: 0.08
        })
      );
      asphalt.rotation.x = -Math.PI / 2;
      asphalt.receiveShadow = true;
      roadGroup.add(asphalt);

      // ВАЖНО: Разметку пока отключаем/упрощаем, иначе она будет висеть в воздухе над холмом.
      // Чтобы сделать красиво, нужно "проецировать" разметку.
      // В рамках рефактора я пока оставлю addCenterLine плоскостью, она будет "протыкать" холмы.
      // FIX: Нужно, чтобы разметка тоже гнулась.
      // Или просто положить её "чуть выше" асфальта, используя ту же геометрию?
      // Самый простой способ (для MVP): использовать decal/offset polygons на том же меше.
      // Но у нас отдельный материал.
      // Пока оставим "как есть" (плоская разметка) — на мосту (0) будет ок. На холме будет баг.
      // Исправим, если пользователь пожалуется, или если успеем. 
      // А, пользователь просил "дорога идет по нему".
      // Я могу применить ТУ ЖЕ деформацию к разметке, если создать её тоже сегментированной.

      // Ок, оставим CenterLine/DashedLine как есть, но это вызовет артефакты на холмах.
      // Для моста (высота 0) все ок.
      // Для холма (высота > 0) разметка останется внутри холма.
      // Временно: строим мост!

      this.group.add(roadGroup);

      // --- MOVED: CenterLine is now uncommented and works correctly with height ---
      const centerType = (road.center ?? "none") as "double" | "dashed" | "solid" | "none";
      this.addCenterLine(roadGroup, centerType, road.length, road);

      // --- Dynamic Bridge Generation ---
      // Check along the road for deep terrain (river) and place pillars
      const step = 8; // Step size for checking
      // Variables inBridge/bridgeStart were unused


      // We check interval along the road. 
      // Local Z from -length/2 to length/2
      for (let z = -road.length / 2; z <= road.length / 2; z += step) {
        // Convert local road point to world to check terrain
        // Note: in worldToLocalXZ we used specific math. Let's match it.
        // worldToLocal: c=cos(-rot), s=sin(-rot).
        // Reverse: wx = localX*cos(rot) - localZ*sin(rot) ... wait.
        // Let's use standard rotation.
        // x' = x*cos - z*sin
        // z' = x*sin + z*cos
        // Here road is along Z local? "PlaneGeometry(width, length)". Default Y-axis is length.
        // We treated Y as localized Z in other places.
        // Let's stick to the manual transform we used in createSolidLine:
        // wx = roadX + localX*c + localZ*s
        // wz = roadZ + (-localX*s + localZ*c)
        // Here localX = 0 (center of road). localZ = z.
        const wP_x = road.position.x + 0 * rCos + z * rSin;
        const wP_z = road.position.z + (-0 * rSin + z * rCos);

        const h = this.getTerrainHeight(wP_x, wP_z);
        const isDeep = h < -0.5;

        // FIX: Do not build bridges near buildings or parking (prevents clipping artifacts)
        const nearStuff = this.isPointNearBuilding(wP_x, wP_z, 4) || this.isPointInParking(wP_x, wP_z, 4);

        if (isDeep && !nearStuff) {
          // Place pillar if we are deep
          // Maybe not every step, but sparse?
          // Or detect "Bridge Segments".
          // Simple approach: Place pillar every X steps if deep.
          // Also add railings along the deep part.

          // Railings are continuous? Hard to segment. 
          // Let's just place pillars for now.

          // Check if we already placed a pillar recently?
          // Let's just place pillars every 16m if deep.
          if (z % 16 === 0 || Math.abs(z % 16) < step / 2) {
            this.addPillar(roadGroup, z, road.width);
          }

          // Add railing segment for this step?
          // Railing segment length = step.
          this.addRailingSegment(roadGroup, z, step, road.width);
        }
      }
    });
  }



  private addPillar(parent: THREE.Group, localZ: number, width: number) {
    const pillarGeo = new THREE.CylinderGeometry(0.6, 0.6, 8); // Deep pillar
    const pillarMat = new THREE.MeshStandardMaterial({ color: "#555555" });

    const p1 = new THREE.Mesh(pillarGeo, pillarMat);
    p1.position.set(-width / 2 + 1, -4, localZ);
    parent.add(p1);

    const p2 = new THREE.Mesh(pillarGeo, pillarMat);
    p2.position.set(width / 2 - 1, -4, localZ);
    parent.add(p2);
  }

  private addRailingSegment(parent: THREE.Group, midZ: number, length: number, width: number) {
    const railH = 1.0;
    const mat = new THREE.MeshStandardMaterial({ color: "#888888", roughness: 0.5 });
    const railGeo = new THREE.BoxGeometry(0.3, railH, length);

    const left = new THREE.Mesh(railGeo, mat);
    left.position.set(-width / 2, railH / 2, midZ);
    parent.add(left);

    const right = new THREE.Mesh(railGeo, mat);
    right.position.set(width / 2, railH / 2, midZ);
    parent.add(right);
  }

  // Removed unused _unused_buildBridgeStructure





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

    // Helpers locally defined in original... I need to duplicate or assume they work?
    // They are defined inside the method in original. I must redefine them.
    const worldToLocal = (origin: { x: number; z: number }, rotY: number, x: number, z: number) => {
      const dx = x - origin.x;
      const dz = z - origin.z;
      const c = Math.cos(-rotY);
      const s = Math.sin(-rotY);
      return { x: dx * c + dz * s, z: -dx * s + dz * c };
    };
    const localToWorld = (origin: { x: number; z: number }, rotY: number, x: number, z: number) => {
      const c = Math.cos(rotY);
      const s = Math.sin(rotY);
      return { x: origin.x + x * c + z * s, z: origin.z + (-x * s + z * c) };
    };
    const closestPointOnRoad = (x: number, z: number) => {
      let best = { x: roads[0].position.x, z: roads[0].position.z };
      let bestD2 = Infinity;
      for (const r of roads) {
        const rot = r.rotation ?? 0;
        const local = worldToLocal(r.position, rot, x, z);
        const cx = clamp(local.x, -r.width / 2, r.width / 2);
        const cz = clamp(local.z, -r.length / 2, r.length / 2);
        const w = localToWorld(r.position, rot, cx, cz);
        const d2 = (x - w.x) ** 2 + (z - w.z) ** 2;
        if (d2 < bestD2) { bestD2 = d2; best = w; }
      }
      return best;
    };

    WORLD_CONFIG.buildings.forEach((b) => {
      const rot = (b as { rotation?: number }).rotation ?? 0;
      const doorLocalZ = b.size.z / 2 + BUILDING_LAYOUT.door.localZOutset;
      const doorWorld = localToWorld(b.position, rot, 0, doorLocalZ);
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

      // Store path for collision
      this.buildingPaths.push({
        p1: new THREE.Vector2(doorWorld.x, doorWorld.z),
        p2: new THREE.Vector2(roadWorld.x, roadWorld.z),
        width: pathWidth
      });

      // Add Bushes along the sides
      // Left and Right of the path vector.
      // Vector P = (dx, dz). Normal = (-dz, dx).
      const ndx = -dz / len;
      const ndz = dx / len;

      const bushSpacing = 3.5;
      const steps = Math.floor(len / bushSpacing);
      const offset = (pathWidth / 2) + 0.8; // Distance from center



      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const tx = roadWorld.x + dx * t;
        const tz = roadWorld.z + dz * t;

        // Left bush
        const lx = tx + ndx * offset;
        const lz = tz + ndz * offset;
        // Right bush
        const rx = tx - ndx * offset;
        const rz = tz - ndz * offset;

        const createMiniBush = (bx: number, bz: number) => {
          // Use new tree-style bush with smaller scale
          const b = this.createBushMesh(0.5);
          const h = this.getTerrainHeight(bx, bz);
          b.position.set(bx, h, bz);
          this.group.add(b);
        };

        if (Math.random() > 0.3) createMiniBush(lx, lz);
        if (Math.random() > 0.3) createMiniBush(rx, rz);
      }
    });
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
    const local = this.worldToLocalXZ(r.position.x, r.position.z, rRot, center.x, center.z);

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
      const doorWorld = this.localToWorldXZ(safePos.x, safePos.z, rot, 0, doorLocalZ);
      const roadForDoor = this.getClosestRoadInfo(doorWorld.x, doorWorld.z, true);
      const roadWorld = roadForDoor?.worldOnRoad ?? doorWorld;

      const lotZ = b.size.z / 2 + totalD / 2 + 3.2;
      const lotXRight = b.size.x / 2 + totalW / 2 + 1.2;
      const lotXLeft = -lotXRight;

      const rightWorld = this.localToWorldXZ(safePos.x, safePos.z, rot, lotXRight, lotZ);
      const leftWorld = this.localToWorldXZ(safePos.x, safePos.z, rot, lotXLeft, lotZ);
      const dRight = (rightWorld.x - roadWorld.x) ** 2 + (rightWorld.z - roadWorld.z) ** 2;
      const dLeft = (leftWorld.x - roadWorld.x) ** 2 + (leftWorld.z - roadWorld.z) ** 2;
      const chosen = dLeft < dRight ? { x: lotXLeft, z: lotZ } : { x: lotXRight, z: lotZ };

      let center = this.localToWorldXZ(safePos.x, safePos.z, rot, chosen.x, chosen.z);
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

    const localToWorld = (origin: { x: number; z: number }, rotY: number, x: number, z: number) => {
      const c = Math.cos(rotY);
      const s = Math.sin(rotY);
      return { x: origin.x + x * c + z * s, z: origin.z + (-x * s + z * c) };
    };

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

    this.parkingLayouts.forEach((layout) => {
      const { center, rotation: rot, totalW, totalD, rows, spotsRowA, spotsRowB, rowCentersLocalZ, aisleCenterZ } = layout;

      const lot = new THREE.Mesh(new THREE.BoxGeometry(totalW, 0.08, totalD), asphalt);
      lot.position.set(center.x, 0.025, center.z);
      lot.rotation.y = rot;
      lot.receiveShadow = true;
      this.group.add(lot);

      const placeLine = (localX: number, localZ: number, depth: number) => {
        const w = localToWorld({ x: center.x, z: center.z }, rot, localX, localZ);
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
        const stop = localToWorld({ x: center.x, z: center.z }, rot, 0, outerZ);
        const stopLine = new THREE.Mesh(new THREE.BoxGeometry(totalW - pad * 2, 0.06, 0.08), lineMat);
        stopLine.position.set(stop.x, 0.07, stop.z);
        stopLine.rotation.y = rot;
        this.group.add(stopLine);
      }

      const borderDepth = 0.08;
      const makeBorder = (localZ: number) => {
        const w = localToWorld({ x: center.x, z: center.z }, rot, 0, localZ);
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
        const lotLocalOnRoad = this.worldToLocalXZ(r.position.x, r.position.z, rRot, center.x, center.z);
        const side = Math.sign(lotLocalOnRoad.x) || 1;

        const curbInset = 0.25;
        const throatLen = 6.0;
        const roadEdge = localToWorld(r.position, rRot, side * (r.width / 2 + curbInset), roadForLot.localOnRoad.z);
        const throatEnd = localToWorld(r.position, rRot, side * (r.width / 2 + curbInset + throatLen), roadForLot.localOnRoad.z);

        const entryA = localToWorld({ x: center.x, z: center.z }, rot, -totalW / 2, aisleCenterZ);
        const entryB = localToWorld({ x: center.x, z: center.z }, rot, +totalW / 2, aisleCenterZ);
        const dA = (entryA.x - throatEnd.x) ** 2 + (entryA.z - throatEnd.z) ** 2;
        const dB = (entryB.x - throatEnd.x) ** 2 + (entryB.z - throatEnd.z) ** 2;
        const lotEntry = dA < dB ? entryA : entryB;

        const entryLocalOnRoad = this.worldToLocalXZ(r.position.x, r.position.z, rRot, lotEntry.x, lotEntry.z);
        const alignPoint = localToWorld(
          r.position,
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

      const parkedCount = Math.min(2, stallCenters.length);
      const parkedIdx =
        parkedCount === 1
          ? [Math.floor(stallCenters.length / 2)]
          : [0, Math.max(0, stallCenters.length - 1)];
      parkedIdx.slice(0, parkedCount).forEach((idx, i) => {
        const stall = stallCenters[idx];
        if (!stall) return;
        const w = localToWorld({ x: center.x, z: center.z }, rot, stall.x, stall.z);
        const carColor = parkedColors[(layout.buildingIndex + i) % parkedColors.length]!;
        const plateText = FUNNY_PLATES[Math.floor(Math.random() * FUNNY_PLATES.length)];
        const car = new Car([new THREE.Vector3(w.x, 0, w.z)], {
          color: carColor,
          speed: 0,
          parked: true,
          plateText
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

  private addCenterLine(
    group: THREE.Group,
    type: "solid" | "dashed" | "double" | "none",
    length: number,
    road: (typeof WORLD_CONFIG.roads)[number]
  ) {
    if (type === "none") return;

    if (type === "dashed") {
      // Пунктир уже “сам” пропускает перекрёстки (см. isInAnyIntersection)
      this.addDashedLine(group, 0, length, this.centerLineMaterial, road);
      return;
    }

    const addSolidWithGaps = (offsetX: number) => {
      const intervals = this.computeCenterLineIntervals(road);
      intervals.forEach((it) => {
        const segLen = it.b - it.a;
        if (segLen < 0.6) return;
        const centerZ = (it.a + it.b) / 2;
        group.add(this.createSolidLine(offsetX, segLen, this.centerLineMaterial, centerZ, road));
      });
    };

    if (type === "solid") {
      addSolidWithGaps(0);
      return;
    }
    if (type === "double") {
      addSolidWithGaps(-0.35);
      addSolidWithGaps(0.35);
    }
  }

  private computeCenterLineIntervals(road: (typeof WORLD_CONFIG.roads)[number]) {
    // Возвращает интервалы по локальной оси Z дороги, где можно рисовать “сплошную” разметку,
    // исключая зоны перекрёстков.
    const rot = road.rotation ?? 0;
    const start = -road.length / 2;
    const end = road.length / 2;

    const ranges: Array<{ a: number; b: number }> = [];
    for (const it of this.intersections) {
      const local = this.worldToLocalXZ(road.position.x, road.position.z, rot, it.x, it.z);
      // Перекрёсток относится к дороге, если центр перекрёстка попадает в полосу дороги по ширине.
      if (Math.abs(local.x) > road.width / 2 + 0.6) continue;
      const cut = it.halfSize + 1.0;
      const a = Math.max(start, local.z - cut);
      const b = Math.min(end, local.z + cut);
      if (b <= start || a >= end) continue;
      ranges.push({ a, b });
    }

    if (ranges.length === 0) return [{ a: start, b: end }];

    ranges.sort((r1, r2) => r1.a - r2.a);
    const merged: Array<{ a: number; b: number }> = [];
    for (const r of ranges) {
      const last = merged[merged.length - 1];
      if (!last || r.a > last.b) merged.push({ a: r.a, b: r.b });
      else last.b = Math.max(last.b, r.b);
    }

    const intervals: Array<{ a: number; b: number }> = [];
    let cur = start;
    for (const r of merged) {
      if (r.a > cur) intervals.push({ a: cur, b: r.a });
      cur = Math.max(cur, r.b);
    }
    if (end > cur) intervals.push({ a: cur, b: end });
    return intervals;
  }

  private buildCrosswalks() {
    const stripeMaterial = new THREE.MeshStandardMaterial({ color: "#f7f9fc", roughness: 0.3 });
    WORLD_CONFIG.crosswalks?.forEach((data) => {
      const group = new THREE.Group();
      const stripeDepth = 0.45;
      const gap = 0.75;
      const maxStripes = Math.floor(data.length / gap) + 2;
      const start = -data.length / 2 + stripeDepth / 2;
      for (let i = 0; i < maxStripes; i += 1) {
        const z = start + i * gap;
        if (z > data.length / 2) break;
        const stripe = new THREE.Mesh(new THREE.PlaneGeometry(data.width, stripeDepth), stripeMaterial);
        stripe.position.set(0, 0.06, z);
        stripe.rotation.x = -Math.PI / 2;
        group.add(stripe);
      }
      group.position.set(data.position.x, 0.05, data.position.z);
      group.rotation.y = data.rotation ?? 0;
      this.group.add(group);
    });
  }

  private createSolidLine(offsetX: number, length: number, material: THREE.MeshStandardMaterial, centerZ = 0, road: (typeof WORLD_CONFIG.roads)[number]) {
    // Segmented line to conform to hills
    const segs = Math.max(2, Math.ceil(length / 4));
    const geo = new THREE.PlaneGeometry(0.18, length, 1, segs);
    const pos = geo.attributes.position;

    // We need the road's transform to convert local vertex to world to sample height.
    const rot = road.rotation ?? 0;
    const roadX = road.position.x;
    const roadZ = road.position.z;
    const c = Math.cos(rot);
    const s = Math.sin(rot);

    for (let i = 0; i < pos.count; i++) {
      // Plane is created at (0,0,0). centerZ shifts it?
      // PlaneGeometry center is 0.
      // We want it at offsetX, centerZ locally.
      // The vertex positions are relative to the center of the geometry.
      // We will manually transform them to World, get height, then back?
      // Easier: Just calculate "World Height" for each vertex and set it as Z (before rotation).

      // Geometry local coords (x, y) where y is along length (Z in our world frame)
      // because we rotate x = -PI/2 later.
      const lx = pos.getX(i); // This is width-wise (-0.09 to +0.09)
      const ly = pos.getY(i); // This is length-wise (-len/2 to +len/2)

      // Apply offsets in "Road Local" space
      // The geometry will be placed at (offsetX, 0, centerZ) relative to road group?
      // No, createSolidLine returns a Mesh that is added to road Group.
      // So we need World Coords:
      // Local to Road = (offsetX + lx, centerZ + ly)
      const effectiveLocalX = offsetX + lx;
      const effectiveLocalZ = centerZ + ly; // ly is -len/2..len/2 relative to the mesh center.
      // Wait, PlaneGeometry is centered at 0. If centerZ!=0, we need to account.
      // centerZ is the Z-position of the segment center relative to road center.
      // So yes, centerZ + ly.

      const wx = roadX + effectiveLocalX * c + effectiveLocalZ * s;
      const wz = roadZ + (-effectiveLocalX * s + effectiveLocalZ * c);

      let h = this.getWorldHeight(wx, wz);

      // FIX: If terrain is deep (river), keep marking flat at road level (0).
      if (h < -0.5) h = 0;

      // Lift slightly above road
      h += 0.055;

      // Set Z (which becomes Y). 
      pos.setZ(i, h);
    }

    geo.computeVertexNormals();

    // Bake offsets into vertices to match World logic easier.
    for (let i = 0; i < pos.count; i++) {
      const lx = pos.getX(i);
      const ly = pos.getY(i);

      pos.setX(i, lx + offsetX);
      pos.setY(i, ly + centerZ);
    }

    const line = new THREE.Mesh(geo, material);
    line.rotation.x = -Math.PI / 2;
    line.receiveShadow = false;
    return line;
  }

  private addDashedLine(group: THREE.Group, offsetX: number, length: number, material: THREE.MeshStandardMaterial, road: (typeof WORLD_CONFIG.roads)[number]) {
    const dashLength = 3;
    const gap = 2;
    const count = Math.floor(length / (dashLength + gap));

    const rot = road.rotation ?? 0;
    const c = Math.cos(rot);
    const s = Math.sin(rot);
    const roadX = road.position.x;
    const roadZ = road.position.z;

    for (let i = 0; i < count; i += 1) {
      const z = -length / 2 + dashLength / 2 + i * (dashLength + gap);

      // Calculate world pos just to check intersection and height
      // Check center, start, and end of dash to strictly avoid intersection
      const wCenter = this.localToWorldXZ(roadX, roadZ, rot, offsetX, z);
      const wStart = this.localToWorldXZ(roadX, roadZ, rot, offsetX, z - dashLength / 2);
      const wEnd = this.localToWorldXZ(roadX, roadZ, rot, offsetX, z + dashLength / 2);

      if (this.isInAnyIntersection(wCenter.x, wCenter.z) ||
        this.isInAnyIntersection(wStart.x, wStart.z) ||
        this.isInAnyIntersection(wEnd.x, wEnd.z)) {
        continue;
      }



      // Create a small segment. Since it's short (3m), we can keep it flat but tilted?
      // Or just flat at the sampled height. 3m on a hill might clip if flat.
      // Better: 2 segments for 3m? Or just 1 segment but placed accurately.
      // Let's use 1 segment but modify Z (height) of vertices like we did for solid line.

      const geo = new THREE.PlaneGeometry(0.18, dashLength, 1, 2);
      const pos = geo.attributes.position;

      for (let k = 0; k < pos.count; k++) {
        const lx = pos.getX(k);
        const ly = pos.getY(k); // -1.5 .. 1.5

        const effectiveZ = z + ly; // z is center of dash
        const effectiveX = offsetX + lx;

        const wx = roadX + effectiveX * c + effectiveZ * s;
        const wz = roadZ + (-effectiveX * s + effectiveZ * c);

        let vH = this.getWorldHeight(wx, wz);
        if (vH < -0.5) vH = 0;
        vH += 0.055;

        pos.setX(k, effectiveX);
        pos.setY(k, effectiveZ); // Local Z before rotation
        pos.setZ(k, vH);
      }

      const segment = new THREE.Mesh(geo, material);
      segment.rotation.x = -Math.PI / 2;
      segment.receiveShadow = false;
      group.add(segment);
    }
  }

  private isInAnyIntersection(x: number, z: number) {
    return this.intersections.some((it) => Math.abs(x - it.x) <= it.halfSize && Math.abs(z - it.z) <= it.halfSize);
  }

  private localToWorldXZ(groupX: number, groupZ: number, rotY: number, localX: number, localZ: number) {
    const c = Math.cos(rotY);
    const s = Math.sin(rotY);
    return {
      x: groupX + localX * c + localZ * s,
      z: groupZ + (-localX * s + localZ * c)
    };
  }

  private buildTrafficLights() {
    // Светофоры на каждом перекрёстке (по мотивам cat-banking-game)
    if (this.intersections.length === 0) return;

    const poleGeo = new THREE.CylinderGeometry(0.1, 0.1, 4, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50 });
    const boxGeo = new THREE.BoxGeometry(0.5, 1.2, 0.5);
    const lightGeo = new THREE.CircleGeometry(0.15, 16);


    this.intersections.forEach((it) => {
      // Ставим светофоры ближе к уголку перекрёстка (НЕ используем halfSize, который для разметки)
      const r = it.roadWidth / 2 + 0.6;
      const positions: Array<{ x: number; z: number; rot: number; type: TrafficDirection }> = [
        { x: -r, z: -r, rot: 0, type: "NS" },
        { x: r, z: -r, rot: -Math.PI / 2, type: "EW" },
        { x: r, z: r, rot: Math.PI, type: "NS" },
        { x: -r, z: r, rot: Math.PI / 2, type: "EW" }
      ];

      positions.forEach((pos) => {
        const tX = pos.x + it.x;
        const tZ = pos.z + it.z;
        // Check if traffic light would be inside a parking lot
        if (this.isPointInParking(tX, tZ, 1.0)) return;

        const tl = new THREE.Group();
        tl.position.set(tX, 0, tZ);

        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.y = 2;
        pole.castShadow = true;
        tl.add(pole);

        const box = new THREE.Mesh(boxGeo, poleMat);
        box.position.set(0, 3.5, 0);
        box.rotation.y = pos.rot;
        box.castShadow = true;
        tl.add(box);

        const redMat = new THREE.MeshBasicMaterial({ color: 0x330000 });
        const yellowMat = new THREE.MeshBasicMaterial({ color: 0x333300 });
        const greenMat = new THREE.MeshBasicMaterial({ color: 0x003300 });

        const redLight = new THREE.Mesh(lightGeo, redMat);
        redLight.position.set(0, 0.3, 0.26);
        box.add(redLight);

        const yellowLight = new THREE.Mesh(lightGeo, yellowMat);
        yellowLight.position.set(0, 0.0, 0.26);
        box.add(yellowLight);

        const greenLight = new THREE.Mesh(lightGeo, greenMat);
        greenLight.position.set(0, -0.3, 0.26);
        box.add(greenLight);

        this.trafficLights.push({ type: pos.type, red: redMat, yellow: yellowMat, green: greenMat });
        this.group.add(tl);
      });
    });

    this.applyTrafficLightVisuals();
  }

  private updateTrafficLights(dt: number) {
    if (this.trafficLights.length === 0) return;
    this.trafficTimer += dt;
    switch (this.trafficState) {
      case "NS_GO":
        if (this.trafficTimer >= this.trafficCycleTime) this.transitionTraffic("NS_YELLOW");
        break;
      case "NS_YELLOW":
        if (this.trafficTimer >= this.trafficYellowTime) this.transitionTraffic("EW_GO");
        break;
      case "EW_GO":
        if (this.trafficTimer >= this.trafficCycleTime) this.transitionTraffic("EW_YELLOW");
        break;
      case "EW_YELLOW":
        if (this.trafficTimer >= this.trafficYellowTime) this.transitionTraffic("NS_GO");
        break;
    }
  }

  private transitionTraffic(next: TrafficState) {
    this.trafficState = next;
    this.trafficTimer = 0;
    this.applyTrafficLightVisuals();
  }

  private getTrafficLightState(dir: TrafficDirection): "RED" | "YELLOW" | "GREEN" {
    if (this.trafficState === `${dir}_GO`) return "GREEN";
    if (this.trafficState === `${dir}_YELLOW`) return "YELLOW";
    return "RED";
  }

  private applyTrafficLightVisuals() {
    this.trafficLights.forEach((tl) => {
      tl.red.color.setHex(0x330000);
      tl.yellow.color.setHex(0x333300);
      tl.green.color.setHex(0x003300);

      const st = this.getTrafficLightState(tl.type);
      if (st === "RED") tl.red.color.setHex(0xff0000);
      if (st === "YELLOW") tl.yellow.color.setHex(0xffff00);
      if (st === "GREEN") tl.green.color.setHex(0x00ff00);
    });
  }

  private buildParks() {
    const parkMaterial = new THREE.MeshStandardMaterial({
      color: "#76d09a",
      roughness: 0.85,
      metalness: 0.03
    });
    WORLD_CONFIG.parks?.forEach((park) => {
      // Чтобы парк лежал на холме, нужно тоже сегментировать его.
      const segs = 16;
      const parkMesh = new THREE.Mesh(new THREE.PlaneGeometry(park.width, park.depth, segs, segs), parkMaterial);

      const pos = parkMesh.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const lx = pos.getX(i);
        const ly = pos.getY(i);
        // World coords of this vertex
        // park at park.position (center)
        // Park rotation -PI/2 X creates local Z -> world Y? No.
        // Plane is XY. rotated -90 X -> XZ.
        // WorldX = parkPos.x + lx
        // WorldZ = parkPos.z + (-ly)

        const wx = park.position.x + lx;
        const wz = park.position.z - ly;

        const h = this.getTerrainHeight(wx, wz);
        pos.setZ(i, h); // Z becomes Y after rotation
      }
      parkMesh.geometry.computeVertexNormals();

      parkMesh.rotation.x = -Math.PI / 2;
      // Raising to 0.15 to avoid z-fighting with ground
      parkMesh.position.set(park.position.x, 0.15, park.position.z);
      parkMesh.receiveShadow = true;
      this.group.add(parkMesh);
    });
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
      const local = this.worldToLocalXZ(r.position.x, r.position.z, rRot, pos.x, pos.z);
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
    WORLD_CONFIG.buildings.forEach((data) => {
      let safePos = this.getBuildingSafePosition(data);

      // Check if inside river. If so, move it.
      // River X ~ any. River Z getsRiverCenterZ(x). width 14.
      // We push it along Z axis north or south?
      const riverZ = this.getRiverCenterZ(safePos.x);
      const riverDist = safePos.z - riverZ;
      const margin = data.size.z / 2 + 9.0; // half building + river half width + buffer

      if (Math.abs(riverDist) < margin) {
        // Push away
        const pushDir = Math.sign(riverDist) || 1;
        const newZ = riverZ + pushDir * margin;
        safePos = { x: safePos.x, z: newZ };
      }

      const rot = (data as { rotation?: number }).rotation ?? 0;

      // Вычисляем высоту фундамента. Берем высоту в центре здания.
      // Можно было бы взять min/max по углам, но для простоты центр + возможный цоколь.
      const groundH = this.getWorldHeight(safePos.x, safePos.z);

      const building = createBuilding({ ...data, position: safePos }, {
        wall: this.wallTexture,
        roof: this.roofTexture,
        windows: this.windowTexture
      });
      // createBuilding внутри использует building.position.y (если мы передадим? Нет, interface BuildingConfig does not have y?)
      // Check config: size: {x,y,z}, position: {x,z}.
      // We need to patch createBuilding or just set building.position.y AFTER creation.

      building.position.y = groundH;

      // Коллайдер для здания (с небольшим запасом, чтобы не заходить в фундамент)
      this.colliders.push({
        position: { x: safePos.x, z: safePos.z },
        half: { x: data.size.x / 2 + 0.4, z: data.size.z / 2 + 0.4 },
        rotation: rot,
        type: "building"
      });

      // Информация о двери (для открытия)
      const doorMesh = (building.userData as { door?: THREE.Object3D }).door;
      const doorLocalZ = data.size.z / 2 + BUILDING_LAYOUT.door.localZOutset;
      const doorWorld = this.localToWorldXZ(safePos.x, safePos.z, rot, 0, doorLocalZ);
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
    });
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
        if (this.isPointInRiver(x, z, 2.0)) continue;
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
          const w = this.localToWorldXZ(b.position.x, b.position.z, rot, offsetX, offsetZ);
          if (this.isPointOnRoad(w.x, w.z, 1.6)) continue;
          if (this.isPointInParking(w.x, w.z, 2.2)) continue;
          if (this.isPointInAreas(w.x, w.z, waters, 1.6)) continue;
          if (this.isPointInAreas(w.x, w.z, beaches, 1.6)) continue;
          if (this.isPointInRiver(w.x, w.z, 2.0)) continue;
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
        if (this.isPointInRiver(wx, wz, 2.0)) return;
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
  }

  private addTree(x: number, z: number) {
    const h = this.getWorldHeight(x, z);
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.5, 2.6, 10),
      new THREE.MeshStandardMaterial({ color: "#7a5138", roughness: 0.9 })
    );
    trunk.position.set(x, h + 1.3, z);
    trunk.castShadow = true;
    const leafColors = ["#3fbf74", "#34a96b", "#5cd18a"];
    for (let i = 0; i < 4; i += 1) {
      const leaves = new THREE.Mesh(
        new THREE.SphereGeometry(1.4 - i * 0.12, 12, 12),
        new THREE.MeshStandardMaterial({ color: leafColors[i % leafColors.length], roughness: 0.75 })
      );
      leaves.position.set(x, h + 3.2 + i * 0.5, z + (i % 2 === 0 ? 0.2 : -0.2));
      leaves.castShadow = true;
      this.group.add(leaves);
    }
    this.group.add(trunk);
    this.colliders.push({
      position: { x, z },
      half: { x: 0.6, z: 0.6 },
      rotation: 0,
      type: "tree"
    });
  }

  private buildLamps() {
    const placeLamp = (x: number, z: number) => {
      const h = this.getWorldHeight(x, z);
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.12, 2.8, 8),
        new THREE.MeshStandardMaterial({ color: "#7a5a3a" })
      );
      pole.position.set(x, h + 1.4, z);
      pole.castShadow = true;

      const light = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 12, 12),
        new THREE.MeshStandardMaterial({ color: "#ffd77b", emissive: "#ffd77b", emissiveIntensity: 0.8 })
      );
      light.position.set(x, h + 2.9, z);
      light.castShadow = true;
      const glow = new THREE.PointLight("#ffd7a3", 0.5, 8);
      glow.position.set(x, h + 2.9, z);
      this.group.add(pole, light, glow);
    };

    // Оставляем всего “пару штук” возле домов: подсветка входов банка и магазина
    const targets = [0, 1]; // индекс здания в WORLD_CONFIG.buildings
    targets.forEach((idx) => {
      const b = WORLD_CONFIG.buildings[idx];
      if (!b) return;
      const rot = (b as { rotation?: number }).rotation ?? 0;

      // Ставим фонарь у входа, чуть сбоку от тропинки
      const doorLocalZ = b.size.z / 2 + BUILDING_LAYOUT.door.localZOutset;
      const side = b.size.x >= 10 ? 2.2 : 1.8;
      const pos = this.localToWorldXZ(b.position.x, b.position.z, rot, side, doorLocalZ + 1.2);
      // На всякий случай не ставим на дороге
      if (!this.isPointOnRoad(pos.x, pos.z, 0.8)) {
        placeLamp(pos.x, pos.z);
      }
    });
  }

  private buildUmbrellas() {
    WORLD_CONFIG.umbrellas.forEach((data) => {
      const h = this.getWorldHeight(data.x, data.z);
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.1, 2.4, 8),
        new THREE.MeshStandardMaterial({ color: "#f0f0f0" })
      );
      pole.position.set(data.x, h + 1.2, data.z);
      pole.castShadow = true;

      const top = new THREE.Mesh(
        new THREE.ConeGeometry(1.6, 0.9, 12),
        new THREE.MeshStandardMaterial({ color: data.color })
      );
      top.position.set(data.x, h + 2.2, data.z);
      top.castShadow = true;
      this.group.add(pole, top);
    });
  }

  private buildBenches() {
    // Скамейки только внутри парка (и не на дорожном полотне)
    const parks = WORLD_CONFIG.parks ?? [];
    if (parks.length === 0) return;

    const pick = () => parks[Math.floor(Math.random() * parks.length)];
    const waters = (WORLD_CONFIG as { waterAreas?: Array<{ position: { x: number; z: number }; width: number; depth: number }> }).waterAreas;

    const benchesToPlace = 5;
    for (let i = 0; i < benchesToPlace; i += 1) {
      const park = pick();
      const x = park.position.x + (Math.random() - 0.5) * (park.width - 8);
      const z = park.position.z + (Math.random() - 0.5) * (park.depth - 8);
      if (this.isPointOnRoad(x, z, 2.5)) continue;
      if (this.isPointInAreas(x, z, waters, 2.5)) continue;

      if (this.isPointInAreas(x, z, waters, 2.5)) continue;

      const h = this.getWorldHeight(x, z);
      const rotation = Math.random() * Math.PI * 2;
      const seat = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.2, 0.7),
        new THREE.MeshStandardMaterial({ color: "#8d5b3e" })
      );
      seat.position.set(x, h + 0.6, z);
      seat.rotation.y = rotation;
      seat.castShadow = true;

      const back = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.7, 0.15),
        new THREE.MeshStandardMaterial({ color: "#7b4f36" })
      );
      back.position.set(x, h + 1.0, z - 0.25);
      back.rotation.y = rotation;
      back.castShadow = true;
      this.group.add(seat, back);
    }
  }

  private buildRocks() {
    WORLD_CONFIG.rocks.forEach((data) => {
      const h = this.getWorldHeight(data.x, data.z);
      const rock = new THREE.Mesh(
        new THREE.SphereGeometry(data.size, 10, 10),
        new THREE.MeshStandardMaterial({ color: "#a2b1bf", roughness: 0.8 })
      );
      rock.position.set(data.x, h + data.size * 0.5, data.z);
      rock.castShadow = true;
      this.group.add(rock);
    });
  }

  resolveCollisions(pos: THREE.Vector3, radius: number) {
    const resolved = pos.clone();

    for (const c of this.colliders) {
      const rot = c.rotation;
      const dx = resolved.x - c.position.x;
      const dz = resolved.z - c.position.z;
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
        continue;
      }

      const worldX = c.position.x + newLocalX * Math.cos(rot) + newLocalZ * Math.sin(rot);
      const worldZ = c.position.z + (-newLocalX * Math.sin(rot) + newLocalZ * Math.cos(rot));
      resolved.x = worldX;
      resolved.z = worldZ;
    }

    return resolved;
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

    for (const car of this.parkedCars) {
      pushFromObject(car.object, car.radius);
    }
    for (const car of this.trafficCars) {
      pushFromObject(car.object, 2.2);
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

    for (const car of this.parkedCars) {
      pushFromObject(car.object, car.radius);
    }
    for (const car of this.trafficCars) {
      pushFromObject(car.object, 2.2);
    }

    return resolved;
  }

  updateDoors(dt: number, playerPos: THREE.Vector3) {
    const openDist = 2.6;
    const closeDist = 3.2;
    // Дверь теперь “правая”, поэтому угол открытия делаем с противоположным знаком,
    // чтобы створка уходила наружу от правого косяка, а не внутрь стены.
    const maxAngle = Math.PI * 0.45;

    this.doors.forEach((door) => {
      const d = Math.hypot(playerPos.x - door.position.x, playerPos.z - door.position.z);
      const target = d <= openDist ? 1 : d >= closeDist ? 0 : door.open;
      const speed = 6;
      door.open = THREE.MathUtils.clamp(door.open + (target - door.open) * Math.min(1, dt * speed), 0, 1);
      door.mesh.rotation.y = maxAngle * door.open;
    });
  }

  getBuildingDoorPosition(label: string) {
    if (label === "МТС SHOP" && this.mtsShopDoor) return this.mtsShopDoor;
    const door = this.doors.find((d) => d.label === label);
    return door?.position;
  }



  private generateBillboards() {
    const geo = new THREE.BoxGeometry(1, 1, 0.2); // Base unit box
    const poleMat = new THREE.MeshStandardMaterial({ color: "#555555", roughness: 0.7 });

    // Config doesn't exist on type yet, but we just added it to the file.
    // We'll cast to any for now to avoid TS error until types are updated or restart.
    const billboards = (WORLD_CONFIG as any).billboards || [];

    for (const b of billboards) {
      const group = new THREE.Group();
      group.position.set(b.position.x, 0, b.position.z);
      group.rotation.y = b.rotation;

      const w = b.size.x;
      const h = b.size.y;
      const poleH = 4.0; // Height from ground to bottom of board

      // Poles
      const poleGeo = new THREE.CylinderGeometry(0.15, 0.15, poleH + h / 2, 8);
      const leftPole = new THREE.Mesh(poleGeo, poleMat);
      leftPole.position.set(-w * 0.3, (poleH + h / 2) / 2, 0);
      leftPole.castShadow = true;

      const rightPole = new THREE.Mesh(poleGeo, poleMat);
      rightPole.position.set(w * 0.3, (poleH + h / 2) / 2, 0);
      rightPole.castShadow = true;

      group.add(leftPole, rightPole);

      // Board
      const tex = createBillboardTexture(b.text);
      const materials = [
        new THREE.MeshStandardMaterial({ color: "#dddddd" }), // Right
        new THREE.MeshStandardMaterial({ color: "#dddddd" }), // Left
        new THREE.MeshStandardMaterial({ color: "#dddddd" }), // Top
        new THREE.MeshStandardMaterial({ color: "#dddddd" }), // Bottom
        new THREE.MeshStandardMaterial({ map: tex }),         // Front
        new THREE.MeshStandardMaterial({ color: "#cccccc" }), // Back
      ];
      const board = new THREE.Mesh(geo, materials);
      board.scale.set(w, h, 1);
      board.position.y = poleH + h / 2;
      board.castShadow = true;
      group.add(board);

      this.group.add(group);

      // Collider (Approximation)
      this.colliders.push({
        position: { x: b.position.x, z: b.position.z },
        half: { x: w / 2, z: 0.5 }, // Thin z-depth for billboard
        rotation: b.rotation,
        type: "building"
      });
    }
  }

  getParkedCarObjects() {
    return this.parkedCars.map((car) => car.object);
  }

  occupyParkedCar(target: THREE.Object3D) {
    const idx = this.parkedCars.findIndex((car) => car.object === target);
    if (idx < 0) return null;
    const parked = this.parkedCars[idx]!;
    const color = (parked.object.userData?.carColor as string) ?? "#ff6b6b";
    const pos = parked.object.position;
    const yaw = parked.object.rotation.y;

    this.group.remove(parked.object);
    this.parkedCars.splice(idx, 1);

    this.parkedCars.splice(idx, 1);

    // Игрок садится в машину - она становится "ПЕРСИК 777"
    const car = new Car([new THREE.Vector3(pos.x, 0, pos.z)], { color, speed: 0, y: 0.23, parked: false, plateText: "ПЕРСИК 777" });
    car.object.position.set(pos.x, pos.y, pos.z);
    car.object.rotation.y = yaw;
    car.object.userData.carColor = color;
    car.object.userData.carInstance = car; // Link to instance for smoke updates
    this.group.add(car.object);
    return car.object;
  }

  parkCarAt(target: THREE.Object3D) {
    const color = (target.userData?.carColor as string) ?? "#ff6b6b";
    const pos = target.position;
    const yaw = target.rotation.y;
    this.group.remove(target);

    this.group.remove(target);

    // Сохраняем номер, если он был, или генерируем новый (если вдруг нет)
    const plateText = (target.userData?.plateText as string) || FUNNY_PLATES[Math.floor(Math.random() * FUNNY_PLATES.length)];

    const car = new Car([new THREE.Vector3(pos.x, 0, pos.z)], { color, speed: 0, y: 0.23, parked: true, plateText });
    car.object.position.set(pos.x, 0.23, pos.z);
    car.object.rotation.y = yaw;
    car.object.userData.parkedCar = true;
    car.object.userData.carColor = color;
    car.object.userData.carInstance = car;
    this.group.add(car.object);
    this.parkedCars.push({ car, object: car.object, radius: 2.6, doorOpen: false });
    return car.object;
  }

  updateParkedCarDoors(dt: number, playerPos: THREE.Vector3, openDist = 4.6, closeDist = 5.2) {
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

  closeAllParkedCarDoors(dt = 0) {
    for (const parked of this.parkedCars) {
      if (!parked.doorOpen) continue;
      parked.doorOpen = false;
      parked.car.setDoorOpen(false);
      if (dt > 0) parked.car.updateDoorAnimation(dt);
    }
  }

  findParkedCarNear(pos: { x: number; z: number }, maxDist: number) {
    let nearest: ParkedCarInfo | null = null;
    let best = maxDist;
    for (const car of this.parkedCars) {
      const dx = car.object.position.x - pos.x;
      const dz = car.object.position.z - pos.z;
      const d = Math.hypot(dx, dz);
      if (d <= best) {
        best = d;
        nearest = car;
      }
    }
    return nearest ? { car: nearest, distance: best } : null;
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
