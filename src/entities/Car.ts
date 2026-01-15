import * as THREE from "three";
import { createLicensePlateTexture } from "@utils/textures";
import type { Updatable } from "@core/Engine";

const smokeGeo = new THREE.SphereGeometry(0.1, 6, 6);
const smokeMat = new THREE.MeshBasicMaterial({
  color: 0x888888,
  transparent: true,
  opacity: 0.6,
  depthWrite: false
});


type CarOptions = {
  color: string;
  speed: number; // units/sec
  y?: number;
  startIndex?: number;
  parked?: boolean;
  plateText?: string;
};

export class Car implements Updatable {
  readonly object = new THREE.Group();
  private readonly path: THREE.Vector3[];
  private readonly speed: number;
  private targetIndex = 0;
  private readonly y: number;
  private animTime = 0;
  private speedScale = 1;
  private readonly isParked: boolean;
  private doorPivot?: THREE.Object3D;
  private doorVoid?: THREE.Object3D;
  private doorOpen = 0;
  private doorOpenTarget = 0;
  private readonly doorOpenSpeed = 7;
  private readonly doorMaxAngle = Math.PI * 0.65;
  private driver?: {
    head: THREE.Object3D;
    chest: THREE.Object3D;
    earL: THREE.Object3D;
    earR: THREE.Object3D;
    headBaseY: number;
    chestBaseY: number;
    earBaseY: number;
  };

  private smokeGroup = new THREE.Group();
  private smokeParticles: { mesh: THREE.Mesh; life: number; velocity: THREE.Vector3 }[] = [];
  private nextSmokeTime = 0;

  constructor(path: THREE.Vector3[], options: CarOptions) {
    this.path = path;
    this.speed = options.speed;
    this.y = options.y ?? 0.22;
    this.targetIndex = Math.max(0, Math.min(path.length - 1, options.startIndex ?? 0));
    this.isParked = !!options.parked;

    this.isParked = !!options.parked;

    this.object.add(this.buildModel(options.color, options.plateText));
    this.object.add(this.smokeGroup);

    // Стартуем прямо на маршруте.
    const p = this.path[this.targetIndex] ?? new THREE.Vector3(0, 0, 0);
    this.object.position.set(p.x, this.y, p.z);

    if (options.plateText) {
      this.object.userData.plateText = options.plateText;
    }
  }

  setSpeedScale(scale: number) {
    this.speedScale = Math.max(0, scale);
  }

  setDoorOpen(open: boolean) {
    this.doorOpenTarget = open ? 1 : 0;
  }

  getForward2D() {
    const yaw = this.object.rotation.y;
    return { x: Math.sin(yaw), z: Math.cos(yaw) };
  }

  update(dt: number) {
    if (this.path.length < 2) return;
    this.animTime += dt;

    const target = this.path[this.targetIndex]!;
    const px = this.object.position.x;
    const pz = this.object.position.z;
    const dx = target.x - px;
    const dz = target.z - pz;
    const dist = Math.hypot(dx, dz);

    // Переходим к следующей точке, когда почти доехали.
    if (dist < 0.55) {
      this.targetIndex = (this.targetIndex + 1) % this.path.length;
      return;
    }

    const inv = 1 / Math.max(dist, 1e-6);
    const dirX = dx * inv;
    const dirZ = dz * inv;

    const step = this.speed * this.speedScale * dt;
    this.object.position.x += dirX * Math.min(step, dist);
    this.object.position.z += dirZ * Math.min(step, dist);
    this.object.position.y = this.y;

    // Поворачиваем машину по направлению движения.
    this.object.rotation.y = Math.atan2(dirX, dirZ);

    this.updateDoorAnimation(dt);

    if (this.driver) {
      // Лёгкая “живость” головы в движении, чтобы котик выглядел как персонаж.
      const bob = Math.sin(this.animTime * 3.2) * 0.04;
      this.driver.head.position.y = this.driver.headBaseY + bob;
      this.driver.earL.position.y = this.driver.earBaseY + bob * 0.9;
      this.driver.earR.position.y = this.driver.earBaseY + bob * 0.9;
    }

    // Передаем speedScale для адаптации дыма (стоит/едет)
    this.updateSmoke(dt, this.speedScale);
  }

  private buildModel(color: string, plateText?: string) {
    const root = new THREE.Group();

    // Стиль как в cat-banking-game: “пузатый пузырь” из сфер с масштабом.
    const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.25, metalness: 0.1 });
    const glassMat = new THREE.MeshStandardMaterial({
      color: "#bfe6ff",
      roughness: 0.08,
      metalness: 0.05,
      transparent: true,
      opacity: 0.72
    });
    const darkMat = new THREE.MeshStandardMaterial({ color: "#1f2a33", roughness: 0.9, metalness: 0.05 });
    const innerCabinMat = new THREE.MeshStandardMaterial({
      color: "#151a1f",
      roughness: 0.95,
      metalness: 0.05,
      side: THREE.DoubleSide
    });
    const innerShellMat = new THREE.MeshStandardMaterial({
      color: "#151a1f",
      roughness: 0.95,
      metalness: 0.05,
      side: THREE.BackSide
    });
    // wheelMat удален, так как теперь используются tireMat, rimMat, hubcapMat в цикле создания колес.
    // Материалы котика — ближе к главному персонажу (чтобы “лицо было тем же”).
    const catMat = new THREE.MeshPhysicalMaterial({
      color: 0xf2a158,
      roughness: 0.55,
      metalness: 0.0,
      sheen: 1.0,
      sheenRoughness: 0.45,
      sheenColor: 0xffe1cc,
      map: this.createFurTexture()
    });
    const catWhiteMat = new THREE.MeshStandardMaterial({ color: 0xfffaf0, roughness: 0.65, metalness: 0.05 });
    const earInnerMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1, roughness: 0.45 });

    // === BODY (Bubble Style) ===
    const bodyGeometry = this.isParked
      ? new THREE.SphereGeometry(1, 18, 18, 0, Math.PI * 2, Math.PI * 0.18, Math.PI * 0.82)
      : new THREE.SphereGeometry(1, 18, 18);
    const body = new THREE.Mesh(bodyGeometry, bodyMat);
    body.scale.set(1.1, 0.8, 2.2); // ширина, высота, длина
    body.position.y = 0.82;
    body.castShadow = true;
    body.receiveShadow = true;
    root.add(body);

    if (this.isParked) {
      // Внутренний "кожух" кузова, чтобы салон не просвечивал наружу.
      const innerShell = new THREE.Mesh(bodyGeometry, innerShellMat);
      innerShell.scale.set(1.02, 0.74, 2.05);
      innerShell.position.y = 0.8;
      innerShell.castShadow = false;
      innerShell.receiveShadow = false;
      root.add(innerShell);
    }


    // === Windshield (Rounded "Bezel" Style) ===
    // По просьбе: "чуть больше, выпирает сверху, края закруглены".
    // Используем Shape + ExtrudeGeometry.

    const wS = 1.25; // Ширина
    const hS = 0.7;  // Высота
    const rS = 0.15; // Радиус скругления

    const shape = new THREE.Shape();
    // Рисуем скругленный прямоугольник (центр в 0,0)
    const xS = -wS / 2;
    const yS = -hS / 2;

    shape.moveTo(xS, yS + rS);
    shape.lineTo(xS, yS + hS - rS);
    shape.quadraticCurveTo(xS, yS + hS, xS + rS, yS + hS);
    shape.lineTo(xS + wS - rS, yS + hS);
    shape.quadraticCurveTo(xS + wS, yS + hS, xS + wS, yS + hS - rS);
    shape.lineTo(xS + wS, yS + rS);
    shape.quadraticCurveTo(xS + wS, yS, xS + wS - rS, yS);
    shape.lineTo(xS + rS, yS);
    shape.quadraticCurveTo(xS, yS, xS, yS + rS);

    const extrudeSettings = {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 4
    };

    const windShieldGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Центрируем геометрию (Extrude создает от 0,0)
    windShieldGeo.center();

    const windShield = new THREE.Mesh(windShieldGeo, glassMat);

    // Позиция:
    // z=0.95 (сдвинули сильно вперед от 0.62, чтобы точно не лезло в кота)
    // y=1.45 (чуть выше, было 1.35).
    windShield.position.set(0, 1.45, 0.95);
    windShield.rotation.x = -0.2; // Наклон назад (80 град к земле)

    root.add(windShield);

    // Тёмный тор (бублик) вокруг шеи кота — создаёт эффект глубины кабины.
    // Только для машин с котом-водителем (не для припаркованных).
    if (!this.isParked) {
      const cabinRingMat = new THREE.MeshStandardMaterial({
        color: "#0a0c0e",
        roughness: 1.0,
        metalness: 0.0
      });
      const cabinRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.55, 0.15, 12, 32),
        cabinRingMat
      );
      cabinRing.rotation.x = Math.PI / 2;
      cabinRing.position.set(0, 1.45, -0.1); // На уровне верха кузова, вокруг шеи кота
      root.add(cabinRing);
    }

    // Линии дверей должны “липнуть” к кривизне кузова.
    // Делам их кривыми трубочками по поверхности базовой сферы и добавляем как ДЕТЕЙ к `body`,
    // чтобы они корректно деформировались вместе с масштабом кузова (эллипсоид).
    const seamMat = new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.9, metalness: 0.02 });

    const surfacePointOnUnitSphere = (x: number, z: number, out = 1.008) => {
      const v = new THREE.Vector3(x, 0, z);
      const r2 = v.x * v.x + v.z * v.z;
      const y = Math.sqrt(Math.max(0, 1 - r2));
      v.y = y;
      // чуть наружу, чтобы не мерцало на поверхности
      return v.multiplyScalar(out);
    };

    const tubeOnSurface = (points: THREE.Vector3[], radius: number) => {
      const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.6);
      const geo = new THREE.TubeGeometry(curve, 40, radius, 6, false);
      const mesh = new THREE.Mesh(geo, seamMat);
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      return mesh;
    };

    const addDoorSeams = (side: 1 | -1) => {
      // Работаем в координатах БАЗОВОЙ сферы (радиус=1).
      // Потом `body.scale` превратит это в нужный эллипсоид и швы останутся “приклеенными”.
      const a = 1.1; // scale.x
      const c = 2.2; // scale.z
      const xu = side * (1.02 / a); // чуть ближе к боку, но в пределах сферы

      // Два “вертикальных” шва двери: фиксируем z и меняем y за счёт уравнения сферы.
      // На сфере “вертикаль” удобнее рисовать дугой от уровня окна к низу.
      const zFrontU = 0.35 / c;
      const zBackU = -0.55 / c;

      const arc = (zu: number) => {
        // Несколько точек по дуге: варьируем x чуть-чуть, чтобы линия выглядела не идеальной
        // и не пряталась в касательной.
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 10; i += 1) {
          const t = i / 10;
          const xwobble = xu * (1 - 0.02 * Math.sin(t * Math.PI));
          pts.push(surfacePointOnUnitSphere(xwobble, zu, 1.01));
        }
        return pts;
      };

      // Горизонтальный шов: фиксируем “высоту” через несколько z-точек по боку.
      const doorTop = () => {
        const pts: THREE.Vector3[] = [];
        const z0 = -0.55 / c;
        const z1 = 0.35 / c;
        for (let i = 0; i <= 10; i += 1) {
          const t = i / 10;
          const zu = z0 + (z1 - z0) * t;
          pts.push(surfacePointOnUnitSphere(xu, zu, 1.011));
        }
        return pts;
      };

      const seamRadius = 0.012;
      const seamV1 = tubeOnSurface(arc(zFrontU), seamRadius);
      const seamV2 = tubeOnSurface(arc(zBackU), seamRadius);
      const seamH = tubeOnSurface(doorTop(), seamRadius);

      // Ручка: маленькая капсула на поверхности.
      const handle = new THREE.Mesh(new THREE.CapsuleGeometry(0.03, 0.14, 4, 8), seamMat);
      handle.rotation.z = Math.PI / 2;
      const handleU = surfacePointOnUnitSphere(xu, -0.05 / c, 1.02);
      handle.position.copy(handleU);

      body.add(seamV1, seamV2, seamH, handle);
    };

    addDoorSeams(1);
    addDoorSeams(-1);

    // === OPEN CABIN (Convertible rim + small windshield) ===
    // Важный момент: борта не должны “съедать” котика сверху.
    // Поэтому делаем обод тоньше и ниже.
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.07, 10, 26), bodyMat);
    rim.rotation.x = Math.PI / 2;
    rim.scale.set(1.0, 1.0, 1.1);
    const rimY = this.isParked ? 0.96 : 1.02;
    const rimZ = -0.08;
    rim.position.set(0, rimY, rimZ);
    rim.castShadow = true;
    root.add(rim);

    // Внутренняя “кромка” салона — даёт тёмный контур изнутри, не торчит наружу.
    const innerLip = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.08, 10, 26), innerCabinMat);
    innerLip.rotation.x = Math.PI / 2;
    innerLip.scale.set(1.0, 1.0, 1.05);
    innerLip.position.set(0, rimY - 0.12, rimZ - 0.02);
    innerLip.castShadow = false;
    innerLip.receiveShadow = true;
    root.add(innerLip);

    // “Углубление” салона: визуальная ямка + стенки, чтобы котик не выглядел “приклеенным сверху”.
    // Реальный вырез из геометрии тут не нужен: достаточно правильных форм/теней/контраста.
    const cockpitWall = new THREE.Mesh(
      new THREE.CylinderGeometry(0.82, 0.82, 0.6, 26, 1, true),
      innerCabinMat
    );
    cockpitWall.position.set(0, this.isParked ? 0.86 : 0.92, -0.18);
    cockpitWall.castShadow = true;
    cockpitWall.receiveShadow = true;
    root.add(cockpitWall);

    const cockpitFloor = new THREE.Mesh(
      new THREE.CircleGeometry(this.isParked ? 0.9 : 0.74, 26),
      innerCabinMat
    );
    cockpitFloor.rotation.x = -Math.PI / 2;
    cockpitFloor.position.set(0, this.isParked ? 0.62 : 0.66, -0.18);
    cockpitFloor.receiveShadow = true;
    root.add(cockpitFloor);

    if (this.isParked) {
      // Настоящий проём + створка на петле, как у зданий.
      const doorWidth = 0.95;
      const doorHeight = 0.8;
      const doorThickness = 0.035;
      const doorY = 0.98;
      const doorZ = -0.12;
      const bodyCenterY = 0.82;
      const bodyScale = { x: 1.1, y: 0.8, z: 2.2 };

      // Петля на переднем крае двери (ближе к капоту) - как у обычных авто
      const hingeZ = doorZ + doorWidth / 2;
      const normYCenter = (doorY - bodyCenterY) / bodyScale.y;
      const normZHinge = hingeZ / bodyScale.z;
      const hingeX = bodyScale.x * Math.sqrt(Math.max(0, 1 - normYCenter * normYCenter - normZHinge * normZHinge));

      // Вспомогательная функция: строим тонкую панель, повторяющую кривизну эллипсоида кузова.
      const createCurvedDoorGeometry = (
        width: number,
        height: number,
        thickness: number,
        segmentsY: number,
        segmentsZ: number
      ) => {
        const positions: number[] = [];
        const normals: number[] = [];
        const indices: number[] = [];

        const addVertex = (x: number, y: number, z: number, nx: number, ny: number, nz: number) => {
          positions.push(x, y, z);
          normals.push(nx, ny, nz);
        };

        // Вычисляем точки на эллипсоиде + нормали.
        const outer: Array<{ x: number; y: number; z: number; nx: number; ny: number; nz: number }> = [];
        for (let iy = 0; iy <= segmentsY; iy += 1) {
          const ty = iy / segmentsY;
          const py = doorY + (ty - 0.5) * height;
          const ny = (py - bodyCenterY) / bodyScale.y;
          for (let iz = 0; iz <= segmentsZ; iz += 1) {
            const tz = iz / segmentsZ;
            const pz = doorZ + (tz - 0.5) * width;
            const nzl = pz / bodyScale.z;
            const inside = 1 - ny * ny - nzl * nzl;
            const px =
              inside > 0 ? bodyScale.x * Math.sqrt(inside) : bodyScale.x * 0.0001; // fallback если точка вне сферы
            const nx = px / (bodyScale.x * bodyScale.x);
            const nny = (py - bodyCenterY) / (bodyScale.y * bodyScale.y);
            const nnz = pz / (bodyScale.z * bodyScale.z);
            const len = Math.hypot(nx, nny, nnz) || 1;
            outer.push({ x: px, y: py, z: pz, nx: nx / len, ny: nny / len, nz: nnz / len });
          }
        }

        const rowVerts = segmentsZ + 1;
        // Добавляем наружные вершины
        for (const v of outer) addVertex(v.x, v.y, v.z, v.nx, v.ny, v.nz);
        // Добавляем внутренние вершины (смещаем по нормали внутрь)
        for (const v of outer) addVertex(v.x - v.nx * thickness, v.y - v.ny * thickness, v.z - v.nz * thickness, -v.nx, -v.ny, -v.nz);

        // Индексы для наружной поверхности
        for (let iy = 0; iy < segmentsY; iy += 1) {
          for (let iz = 0; iz < segmentsZ; iz += 1) {
            const a = iy * rowVerts + iz;
            const b = a + rowVerts;
            const c = b + 1;
            const d = a + 1;
            indices.push(a, b, d, b, c, d);
          }
        }

        // Индексы для внутренней поверхности (вторая половина массива вершин)
        const offset = outer.length;
        for (let iy = 0; iy < segmentsY; iy += 1) {
          for (let iz = 0; iz < segmentsZ; iz += 1) {
            const a = offset + iy * rowVerts + iz;
            const b = a + rowVerts;
            const c = b + 1;
            const d = a + 1;
            // Переворачиваем winding, чтобы нормали смотрели внутрь полотна
            indices.push(a, d, b, b, d, c);
          }
        }

        // Боковые грани (замыкаем толщину по периметру)
        const addSideQuad = (outerIdxA: number, outerIdxB: number, innerIdxA: number, innerIdxB: number) => {
          indices.push(outerIdxA, outerIdxB, innerIdxA, outerIdxB, innerIdxB, innerIdxA);
        };

        // Верхняя кромка
        for (let iz = 0; iz < segmentsZ; iz += 1) {
          const a = iz;
          const b = iz + 1;
          addSideQuad(a, b, offset + a, offset + b);
        }
        // Нижняя кромка
        for (let iz = 0; iz < segmentsZ; iz += 1) {
          const a = segmentsY * rowVerts + iz;
          const b = a + 1;
          addSideQuad(a, offset + a, b, offset + b);
        }
        // Левая кромка (по Z-)
        for (let iy = 0; iy < segmentsY; iy += 1) {
          const a = iy * rowVerts;
          const b = a + rowVerts;
          addSideQuad(a, offset + a, b, offset + b);
        }
        // Правая кромка (по Z+)
        for (let iy = 0; iy < segmentsY; iy += 1) {
          const a = iy * rowVerts + segmentsZ;
          const b = a + rowVerts;
          addSideQuad(a, b, offset + a, offset + b);
        }

        const geo = new THREE.BufferGeometry();
        geo.setIndex(indices);
        geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
        geo.computeBoundingSphere();
        // Переносим в систему pivot (петля на заднем крае двери).
        geo.translate(-hingeX, -doorY, -hingeZ);
        return geo;
      };

      // Створка цвета кузова с кривизной.
      const doorOuterMat = bodyMat.clone() as THREE.MeshStandardMaterial;
      doorOuterMat.side = THREE.DoubleSide; // Видна с обеих сторон

      const doorPivot = new THREE.Group();
      doorPivot.position.set(hingeX, doorY, hingeZ);

      // Делаем дверь толще чтобы гарантированно закрывала проём
      const doorGeo = createCurvedDoorGeometry(doorWidth, doorHeight, doorThickness * 2, 8, 10);
      const door = new THREE.Mesh(doorGeo, doorOuterMat);
      door.castShadow = true;
      door.receiveShadow = true;
      doorPivot.add(door);

      root.add(doorPivot);
      this.doorPivot = doorPivot;

      // Чёрная "заглушка" проёма — глубокая коробка, закрывающая внутренности.
      // Показывается когда дверь открыта.
      const voidDepth = 0.6; // глубина коробки внутрь
      const voidGeo = new THREE.BoxGeometry(voidDepth, doorHeight * 0.9, doorWidth * 0.9);
      const doorVoidMat = new THREE.MeshStandardMaterial({
        color: "#050607",
        roughness: 1.0,
        metalness: 0.0,
        side: THREE.FrontSide
      });
      const doorVoid = new THREE.Mesh(voidGeo, doorVoidMat);
      // Позиционируем на боку авто, в центре двери, коробка уходит внутрь
      const normZCenter = doorZ / bodyScale.z;
      const voidX = bodyScale.x * Math.sqrt(Math.max(0, 1 - normYCenter * normYCenter - normZCenter * normZCenter));
      doorVoid.position.set(voidX - voidDepth / 2, doorY, doorZ);
      doorVoid.castShadow = false;
      doorVoid.receiveShadow = false;
      doorVoid.visible = false; // Изначально скрыт, показывается когда дверь открыта
      root.add(doorVoid);
      this.doorVoid = doorVoid;
    }

    // Для припаркованных машин достаточно внутренней оболочки и пола.

    // Мини-приборка/торпедо перед рулём.
    const dash = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.18, 0.4), darkMat);
    dash.position.set(0, 1.06, 0.45);
    dash.castShadow = true;
    root.add(dash);

    // Руль + лапки котика на руле (лапки скрываем для припаркованных машин).
    const steering = new THREE.Group();
    const steeringPos = new THREE.Vector3(0, 1.22, 0.34);
    steering.position.copy(steeringPos);
    steering.rotation.x = -0.25; // лёгкий наклон к котику
    root.add(steering);

    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 10, 18), darkMat);
    wheel.castShadow = true;
    steering.add(wheel);

    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.3, 10), darkMat);
    column.rotation.x = Math.PI / 2;
    column.position.set(0, -0.12, -0.18);
    steering.add(column);

    // Лобовое стекло: ставим по границе отверстия кабриолета перед рулём,
    // чтобы оно чуть выступало наружу.
    const windshield = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 1.25, 8, 14), glassMat);
    windshield.rotation.x = Math.PI / 2;
    windshield.rotation.z = -0.55;
    windshield.scale.set(1.1, 0.75, 0.28);
    windshield.position.set(0, rimY + 0.18, steeringPos.z + 0.6);
    root.add(windshield);

    if (!this.isParked) {
      const pawGeo = new THREE.SphereGeometry(0.14, 16, 16);
      const pawL = new THREE.Mesh(pawGeo, catWhiteMat);
      pawL.scale.set(1.1, 0.65, 1.2);
      pawL.position.set(-0.18, 0.02, 0.02);
      pawL.castShadow = true;
      steering.add(pawL);

      const pawR = new THREE.Mesh(pawGeo, catWhiteMat);
      pawR.scale.set(1.1, 0.65, 1.2);
      pawR.position.set(0.18, 0.02, 0.02);
      pawR.castShadow = true;
      steering.add(pawR);
    }

    // Сиденье + “бустер”, чтобы котик выглядывал заметно (как детское кресло).
    const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.18, 18), darkMat);
    seat.position.set(0, 0.92, -0.22);
    seat.castShadow = true;
    root.add(seat);

    const booster = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.26, 16), darkMat);
    booster.position.set(0, 1.1, -0.22);
    booster.castShadow = true;
    root.add(booster);

    // “Мордашка” спереди: улыбка/бампер как у игрушечной машинки.
    const bumper = new THREE.Mesh(new THREE.SphereGeometry(0.55, 18, 14), bodyMat);
    bumper.scale.set(1.25, 0.55, 0.6);
    bumper.position.set(0, 0.55, 2.05);
    bumper.castShadow = true;
    root.add(bumper);

    const smile = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.05, 10, 18, Math.PI), darkMat);
    smile.position.set(0, 0.45, 2.15);
    smile.rotation.x = Math.PI / 2;
    root.add(smile);

    // Колеса (детализированные: шина + диск + колпачок).
    const wheelGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 16);
    const rimGeo = new THREE.CylinderGeometry(0.20, 0.20, 0.23, 16); // Чуть шире шины, чтобы выступал
    const hubcapGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.24, 16); // Еще чуть шире

    const tireMat = new THREE.MeshStandardMaterial({ color: "#20262c", roughness: 0.9, metalness: 0.1 });
    const rimMat = new THREE.MeshStandardMaterial({ color: "#A0A0A0", roughness: 0.4, metalness: 0.8 });
    const hubcapMat = new THREE.MeshStandardMaterial({ color: "#FFFFFF", roughness: 0.2, metalness: 0.2 });

    const wheelPositions: Array<[number, number, number, number]> = [
      [0.9, 0.32, 1.2, 1], // x, y, z, side (1 for left, -1 for right) - важно для вращения? тут симметрия.
      [-0.9, 0.32, 1.2, -1],
      [0.9, 0.32, -1.2, 1],
      [-0.9, 0.32, -1.2, -1]
    ];
    for (const [x, y, z] of wheelPositions) {
      const g = new THREE.Group();
      g.position.set(x, y, z);
      g.rotation.z = Math.PI / 2; // Кладем "на бок" всю группу

      const tire = new THREE.Mesh(wheelGeo, tireMat);
      tire.castShadow = true;
      g.add(tire);

      const rim = new THREE.Mesh(rimGeo, rimMat);
      g.add(rim);

      const hubcap = new THREE.Mesh(hubcapGeo, hubcapMat);
      g.add(hubcap);

      root.add(g);
    }

    if (!this.isParked) {
      // Котик-водитель: голова + ушки выглядывают из кабины.
      // Котик-водитель: делаем “выше и крупнее”, чтобы читался из камеры сверху/сзади.
      const headRadius = 0.66;
      const head = new THREE.Mesh(new THREE.SphereGeometry(headRadius, 22, 18), catMat);
      head.position.set(0, 1.93, -0.08);
      head.castShadow = true;
      root.add(head);

      // Добавим “шею/грудь”, чтобы было ощущение, что котик реально сидит в машине.
      const chest = new THREE.Mesh(new THREE.SphereGeometry(0.42, 18, 14), catMat);
      chest.scale.set(1.05, 0.75, 0.95);
      chest.position.set(0, 1.45, -0.28);
      chest.castShadow = true;
      root.add(chest);

      // Лицо котика — как у главного персонажа: мордочка, глаза, нос, рот, усики.
      this.addPlayerStyleFace(head, catWhiteMat, headRadius);

      const earL = this.createPlayerStyleEar(-0.34, catMat, earInnerMat);
      earL.position.set(-0.34, 2.43, -0.18);
      root.add(earL);

      const earR = this.createPlayerStyleEar(0.34, catMat, earInnerMat);
      earR.position.set(0.34, 2.43, -0.18);
      root.add(earR);

      this.driver = {
        head,
        chest,
        earL,
        earR,
        headBaseY: head.position.y,
        chestBaseY: chest.position.y,
        earBaseY: earL.position.y
      };
    }

    // Фары (упрощенные: белый круг + желтый центр)
    const lightGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const innerLightGeo = new THREE.SphereGeometry(0.14, 16, 16); // Чуть меньше

    // Эмиссивные материалы
    const headlightMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1.0,
      roughness: 0.2
    });
    const innerLightMat = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      emissive: 0xffff00,
      emissiveIntensity: 1.5,
      roughness: 0.2
    });

    const taillightMat = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 1.5,
      roughness: 0.2
    });

    // Создаем фару: белый круг + желтый в центре
    const createHeadlight = (x: number) => {
      const mesh = new THREE.Mesh(lightGeo, headlightMat);
      mesh.position.set(x, 0.82, 2.05);
      mesh.scale.set(1, 1, 0.4); // Сплюснутая сфера

      const inner = new THREE.Mesh(innerLightGeo, innerLightMat);
      inner.position.set(0, 0, 0.15); // Чуть вперед
      inner.scale.set(1, 1, 0.6);
      mesh.add(inner);

      return mesh;
    };

    const headlight1 = createHeadlight(0.6);
    root.add(headlight1);

    const headlight2 = createHeadlight(-0.6);
    root.add(headlight2);

    // Задние фары
    const createTaillight = (x: number) => {
      const mesh = new THREE.Mesh(lightGeo, taillightMat);
      mesh.position.set(x, 0.82, -2.05);
      mesh.scale.set(1, 1, 0.5);
      return mesh;
    };


    const taillight1 = createTaillight(0.6);
    root.add(taillight1);

    const taillight2 = createTaillight(-0.6);
    root.add(taillight2);

    // Номерной знак (если передан текст)
    if (plateText) {
      // Прямоугольник (Plane) 
      // width ~ 0.5, height ~ 0.12 (пропорция 4:1 как texture 256:64)
      const plateGeo = new THREE.PlaneGeometry(0.5, 0.125);
      const plateTex = createLicensePlateTexture(plateText);
      const plateMat = new THREE.MeshBasicMaterial({ map: plateTex, side: THREE.DoubleSide }); // Basic чтобы видно было в темноте

      const plate = new THREE.Mesh(plateGeo, plateMat);
      // Позиция: сзади, между фарами (x=0), чуть ниже крышки (y ~ 0.6), на поверхности (z ~ -2.12)
      // Фары на y=0.82, z=-2.05.
      // Бампер сфера r=1. 
      // z ~ -2.1 чуть выступает.
      plate.position.set(0, 0.6, -2.12);
      // Разворачиваем чтобы смотрел назад (повернуть на 180 вокруг Y)
      plate.rotation.y = Math.PI;
      // И чуть наклоним, если бампер покатый (хотя сфера вертикально почти тут)
      // Наклон чуть вверх, чтобы лучше читалось камерой?
      plate.rotation.x = -0.1;

      root.add(plate);
    }

    // Выхлопная труба
    const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 8), darkMat);
    exhaust.rotation.x = Math.PI / 2;
    // Поднимаем выше (0.43) и двигаем ближе к центру/вперед по Z (-2.05), чтобы торчала из кузова
    exhaust.position.set(0.45, 0.43, -2.05);
    root.add(exhaust);

    // Боковые зеркала (круглые, выше, на черной ножке)
    // Корпус зеркала - приплюснутая сфера или цилиндр. Возьмем цилиндр для четкости.
    const mirrorGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.08, 24);
    mirrorGeo.rotateX(Math.PI / 2); // Поворачиваем "блином" к зрителю (вдоль Z)

    const mirrorGlassGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.02, 24);
    mirrorGlassGeo.rotateX(Math.PI / 2);

    const mirrorGlassMat = new THREE.MeshStandardMaterial({ color: 0xadd8e6, roughness: 0.1, metalness: 0.9 });

    const createMirror = (x: number) => {
      const g = new THREE.Group();
      // Корпус
      const body = new THREE.Mesh(mirrorGeo, bodyMat);
      g.add(body);

      // Стекло
      const glass = new THREE.Mesh(mirrorGlassGeo, mirrorGlassMat);
      // Стекло должно быть спереди (по ходу авто) или сзади? Зеркало заднего вида смотрит НАЗАД.
      // Значит стекло должно быть повернуто назад (positive Z local?).
      // У нас модель смотрит лицом по Z+ (фары на 2.05).
      // Значит зеркало должно смотреть НАЗАД, то есть в сторону Z-.

      // Изначально Cylinder повернут "блином" по Z.
      // Если мы добавим glass на z=0.05, оно будет торчать вперед (Z+).
      // Нам нужно чтобы оно смотрело назад.

      // Но подождите, зеркала ставятся "перпендикулярно" машине.
      // Машина едет по Z+. Водитель сидит и смотрит вперед.
      // Зеркала по бокам должны отражать то что сзади. Значит "лицо" зеркала должно быть направлено назад (Z-).

      // Сейчас glass.position.z = 0.04 (вперед).
      // bodyMat - цвет машины.

      glass.position.set(0, 0, -0.05); // Сдвигаем НАЗАД (Z-)
      g.add(glass);

      // Ножка (черная)
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.35, 8), darkMat);
      // Ножка длиннее чтобы вынести зеркало из кузова.
      // Поворачиваем ножку чтобы уходила ВНУТРЬ кузова.
      stem.rotation.z = x > 0 ? -Math.PI / 2.5 : Math.PI / 2.5;
      stem.position.set(x > 0 ? -0.18 : 0.18, -0.1, 0);
      g.add(stem);

      // Позиция: Выше (1.2) -> поднимаем еще выше. Руль на 1.22. Сделаем 1.35.
      // И чуть шире (1.25 -> 1.3)
      const xPos = x > 0 ? 1.3 : -1.3;
      const yPos = 1.35;

      g.position.set(xPos, yPos, 0.4);

      // Ротация: чтобы зеркало смотрело чуть-чуть на водителя, но в целом назад.
      g.rotation.y = x > 0 ? 0.25 : -0.25;

      return g;
    };

    root.add(createMirror(1));
    root.add(createMirror(-1));

    return root;
  }

  public updateSmoke(dt: number, speedRatio: number = 1.0) {
    if (this.isParked) return;

    this.nextSmokeTime -= dt;
    if (this.nextSmokeTime <= 0) {
      // Если стоим (или почти стоим), дым реже и меньше.
      const isIdle = speedRatio < 0.1;

      this.nextSmokeTime = isIdle
        ? 0.15 + Math.random() * 0.15 // Реже на холостых
        : 0.05 + Math.random() * 0.05; // Часто на ходу

      const mesh = new THREE.Mesh(smokeGeo, smokeMat);
      // Начальная позиция (координаты трубы относительно центра машины)
      mesh.position.set(
        0.45 + (Math.random() - 0.5) * 0.1,
        0.43 + (Math.random() - 0.5) * 0.1,
        -2.15 // Чуть дальше трубы
      );

      // Размер: на холостых поменьше
      const baseScale = isIdle ? 0.35 : 0.6;
      mesh.scale.setScalar(baseScale + Math.random() * 0.4);

      // Случайный поворот для разнообразия
      mesh.rotation.z = Math.random() * Math.PI;

      this.smokeGroup.add(mesh);

      // Скорость вылета дыма (назад и вверх)
      // На холостых медленнее вылетает
      const speedMult = isIdle ? 0.4 : 1.0;

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.15,
        (0.4 + Math.random() * 0.4) * speedMult, // Вверх
        (-1.5 - Math.random() * 1.5) * speedMult // Назад
      );

      this.smokeParticles.push({ mesh, life: 1.0, velocity });
    }

    // Обновляем частицы
    for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
      const p = this.smokeParticles[i];
      p.life -= dt;

      if (p.life <= 0) {
        this.smokeGroup.remove(p.mesh);
        this.smokeParticles.splice(i, 1);
        continue;
      }

      // Движение
      p.mesh.position.addScaledVector(p.velocity, dt);

      // Рост облачка
      // const scale = 1.0 + (1.0 - p.life) * 1.5; // Unused
      p.mesh.scale.multiplyScalar(1.0 + dt * 0.5); // Просто плавное увеличение
    }
  }

  // Плавная анимация открывания двери припаркованной машины.
  updateDoorAnimation(dt: number) {
    if (!this.doorPivot) return;
    const step = Math.min(1, dt * this.doorOpenSpeed);
    this.doorOpen += (this.doorOpenTarget - this.doorOpen) * step;
    this.doorOpen = THREE.MathUtils.clamp(this.doorOpen, 0, 1);
    // Отрицательный угол - дверь открывается назад (петли спереди, как у обычных авто)
    this.doorPivot.rotation.y = -this.doorOpen * this.doorMaxAngle;

    // Чёрный проём виден только когда дверь приоткрыта (> 5%)
    if (this.doorVoid) {
      this.doorVoid.visible = this.doorOpen > 0.05;
    }
  }

  private addPlayerStyleFace(head: THREE.Object3D, catWhiteMat: THREE.Material, headRadius: number) {
    // Подгоняем “рецепт лица” из Player под текущий размер головы.
    // В Player базовая голова ~0.9, у машины другая — масштабирую относительно.
    const s = headRadius / 0.9;

    const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.42 * s, 24, 18), catWhiteMat);
    muzzle.scale.set(1.1, 0.7, 0.9);
    muzzle.position.set(0, -0.15 * s, 0.65 * s);
    muzzle.castShadow = true;
    head.add(muzzle);

    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.19 * s, 1.01 * s);
    head.add(mouthGroup);

    const mouthLineMat = new THREE.LineBasicMaterial({ color: 0x3b3b3b, linewidth: 2 });
    const mouthCurveL = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.2 * s, -0.02 * s, 0),
      new THREE.Vector3(-0.1 * s, -0.1 * s, 0),
      new THREE.Vector3(0, -0.06 * s, 0)
    );
    const mouthGeoL = new THREE.BufferGeometry().setFromPoints(mouthCurveL.getPoints(10));
    mouthGroup.add(new THREE.Line(mouthGeoL, mouthLineMat));

    const mouthCurveR = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, -0.06 * s, 0),
      new THREE.Vector3(0.1 * s, -0.1 * s, 0),
      new THREE.Vector3(0.2 * s, -0.02 * s, 0)
    );
    const mouthGeoR = new THREE.BufferGeometry().setFromPoints(mouthCurveR.getPoints(10));
    mouthGroup.add(new THREE.Line(mouthGeoR, mouthLineMat));

    const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
    const leftEyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.23 * s, 32, 24), eyeWhiteMat);
    leftEyeWhite.position.set(-0.34 * s, 0.14 * s, 0.74 * s);
    leftEyeWhite.scale.set(1, 1, 0.85);
    head.add(leftEyeWhite);

    const rightEyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.22 * s, 32, 24), eyeWhiteMat);
    rightEyeWhite.position.set(0.34 * s, 0.14 * s, 0.74 * s);
    rightEyeWhite.scale.set(1, 1, 0.85);
    head.add(rightEyeWhite);

    const pupilMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.4 });
    const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.12 * s, 24, 18), pupilMat);
    leftPupil.scale.set(1, 1, 0.45);
    // Moved slightly forward (0.95 * s)
    leftPupil.position.set(-0.34 * s, 0.14 * s, 0.95 * s);
    head.add(leftPupil);

    const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(0.12 * s, 24, 18), pupilMat);
    rightPupil.scale.set(1, 1, 0.45);
    // Moved slightly forward (0.95 * s)
    rightPupil.position.set(0.34 * s, 0.14 * s, 0.95 * s);
    head.add(rightPupil);

    const pupilHighlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftPupilHighlight = new THREE.Mesh(new THREE.SphereGeometry(0.028 * s, 12, 12), pupilHighlightMat);
    // Moved highlight forward to 1.05 * s to avoid clipping
    leftPupilHighlight.position.set(-0.3 * s, 0.18 * s, 1.05 * s);
    head.add(leftPupilHighlight);

    const rightPupilHighlight = new THREE.Mesh(new THREE.SphereGeometry(0.028 * s, 12, 12), pupilHighlightMat);
    // Moved highlight forward to 1.05 * s
    rightPupilHighlight.position.set(0.27 * s, 0.18 * s, 1.05 * s);
    head.add(rightPupilHighlight);


    const noseGeo = new THREE.SphereGeometry(0.13 * s, 16, 16);
    const noseMat = new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.4 });
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.set(0, -0.02 * s, 0.89 * s);
    nose.scale.set(1.1, 0.85, 0.7);
    head.add(nose);

    const noseToMouthLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -0.09 * s, 0.83 * s),
        new THREE.Vector3(0, -0.19 * s, 0.89 * s)
      ]),
      new THREE.LineBasicMaterial({ color: 0x333333 })
    );
    head.add(noseToMouthLine);

    const whiskerLineMat = new THREE.LineBasicMaterial({ color: 0x444444 });
    this.createWhiskerLine(-0.35 * s, -0.1 * s, 0.73 * s, Math.PI - 0.3, 1.3 * s, whiskerLineMat, head);
    this.createWhiskerLine(-0.35 * s, -0.17 * s, 0.73 * s, Math.PI - 0.15, 1.25 * s, whiskerLineMat, head);
    this.createWhiskerLine(-0.35 * s, -0.24 * s, 0.73 * s, Math.PI, 1.2 * s, whiskerLineMat, head);
    this.createWhiskerLine(0.35 * s, -0.1 * s, 0.73 * s, 0.3, 1.3 * s, whiskerLineMat, head);
    this.createWhiskerLine(0.35 * s, -0.17 * s, 0.73 * s, 0.15, 1.25 * s, whiskerLineMat, head);
    this.createWhiskerLine(0.35 * s, -0.24 * s, 0.73 * s, 0, 1.2 * s, whiskerLineMat, head);
  }

  private createWhiskerLine(
    x: number,
    y: number,
    z: number,
    rotY: number,
    length: number,
    whiskerLineMat: THREE.LineBasicMaterial,
    parent: THREE.Object3D
  ) {
    const points = [new THREE.Vector3(x, y, z), new THREE.Vector3(x + Math.cos(rotY) * length, y, z + Math.sin(rotY) * length)];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    parent.add(new THREE.Line(geometry, whiskerLineMat));
  }

  private createPlayerStyleEar(xOffset: number, outerMat: THREE.Material, innerMat: THREE.Material) {
    const earRoot = new THREE.Group();
    const outer = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.48, 14), outerMat);
    outer.scale.set(1, 1.05, 1);
    earRoot.add(outer);
    const inner = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.38, 14), innerMat);
    inner.position.set(0, -0.05, 0.06);
    inner.scale.set(0.82, 0.82, 0.55);
    earRoot.add(inner);
    earRoot.rotation.z = xOffset > 0 ? -0.45 : 0.45;
    earRoot.rotation.x = -0.1;
    earRoot.castShadow = false;
    return earRoot;
  }

  private createFurTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      const fallback = new THREE.Texture();
      fallback.needsUpdate = true;
      return fallback;
    }

    ctx.fillStyle = "#f2a158";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(194, 114, 49, 0.25)";
    for (let i = 0; i < 220; i += 1) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = 1 + Math.random() * 2.2;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    for (let i = 0; i < 80; i += 1) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = 0.8 + Math.random() * 1.4;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2.2, 2.2);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }
}

