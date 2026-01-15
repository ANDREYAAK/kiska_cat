import "./styles.css";
import * as THREE from "three";
import { Engine } from "@core/Engine";
import { Input } from "@core/Input";
import { OrbitCameraController } from "@core/OrbitCameraController";
import { World } from "@world/World";
import { Player } from "@entities/Player";
import { BUILDING_LAYOUT } from "@entities/Building";
import { Hud } from "@ui/Hud";
import { GAME_CONFIG } from "@config/game";
import { WORLD_CONFIG } from "@config/world";

const container = document.getElementById("app");
if (!container) {
  throw new Error("App container not found");
}

const engine = new Engine(container);
const hud = new Hud(container);
const input = new Input(hud.element);
const world = new World();
const player = new Player();
const promoDismissedByLabel: Record<string, boolean> = {};
let activePromoLabel: string | null = null;
let shownPromoLabel: string | null = null;
let selectedParkedCar: THREE.Object3D | null = null;
let drivingCar: THREE.Object3D | null = null;
let isDriving = false;
let drivingYaw = 0;
const enterCarRadius = 4.5;
const smokePuffs: Array<{
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}> = [];
const smokeGeo = new THREE.SphereGeometry(0.12, 8, 8);

let parkedCarRoots = world.getParkedCarObjects();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const findParkedCarRoot = (obj: THREE.Object3D | null) => {
  let cur: THREE.Object3D | null = obj;
  while (cur) {
    if (cur.userData?.parkedCar) return cur;
    cur = cur.parent;
  }
  return null;
};

// Старт сюжета: котик появляется у двери красного дома “МТС БАНК” + приветственное сообщение.
const bank = WORLD_CONFIG.buildings.find((b) => b.label === "МТС БАНК") ?? WORLD_CONFIG.buildings[0];
if (bank) {
  const rot = (bank as { rotation?: number }).rotation ?? 0;
  const doorLocalZ = bank.size.z / 2 + BUILDING_LAYOUT.door.localZOutset;
  const dirX = Math.sin(rot);
  const dirZ = Math.cos(rot);
  const doorX = bank.position.x + dirX * doorLocalZ;
  const doorZ = bank.position.z + dirZ * doorLocalZ;
  // Ставим котика рядом с дверью, но с небольшим "воздухом",
  // чтобы камера/геометрия не перекрывались.
  const spawnDistance = 4.2;
  player.setSpawn({ x: doorX + dirX * spawnDistance, z: doorZ + dirZ * spawnDistance, yaw: rot });
}
hud.onPromoClosed(() => {
  if (shownPromoLabel) promoDismissedByLabel[shownPromoLabel] = true;
});

engine.scene.background = new THREE.Color(GAME_CONFIG.skyBottomColor);
engine.scene.fog = new THREE.Fog(GAME_CONFIG.fogColor, GAME_CONFIG.fogNear, GAME_CONFIG.fogFar);
engine.addToScene(world.group, player.object);

// “Солнечная погода”: больше света и чуть теплее тон.
const ambient = new THREE.AmbientLight(GAME_CONFIG.ambientColor, 0.7);
const hemi = new THREE.HemisphereLight(GAME_CONFIG.skyBottomColor, "#a7e1c2", 0.95);
const sun = new THREE.DirectionalLight(GAME_CONFIG.sunColor, 1.7);
sun.position.set(16, 22, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.near = 2;
sun.shadow.camera.far = 80;
sun.shadow.camera.left = -30;
sun.shadow.camera.right = 30;
sun.shadow.camera.top = 30;
sun.shadow.camera.bottom = -30;
// Лёгкий “подсвет” с противоположной стороны, чтобы тени не были серыми/глухими.
const fill = new THREE.DirectionalLight("#eaf5ff", 0.28);
fill.position.set(-12, 14, -18);
fill.castShadow = false;

engine.addToScene(ambient, hemi, sun, fill);

const cameraController = new OrbitCameraController(engine.camera, engine.renderer.domElement, player.object);
const up = new THREE.Vector3(0, 1, 0);
const carMove = new THREE.Vector3();
const carForward = new THREE.Vector3();
const carRight = new THREE.Vector3();
const drivingSpeed = 12;
const drivingSprintMultiplier = 1.4;
const carTurnSpeed = 3.6;
const carCollisionRadius = 1.7;

const spawnExhaustSmoke = (car: THREE.Object3D, yaw: number) => {
  const back = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
  for (let i = 0; i < 6; i += 1) {
    const mat = new THREE.MeshStandardMaterial({ color: "#4a4f55", transparent: true, opacity: 0.65 });
    const puff = new THREE.Mesh(smokeGeo, mat);
    const localPos = new THREE.Vector3(0, 0.35, -2.1).add(
      new THREE.Vector3((Math.random() - 0.5) * 0.25, 0, (Math.random() - 0.5) * 0.2)
    );
    const worldPos = car.localToWorld(localPos);
    puff.position.copy(worldPos);
    puff.castShadow = false;
    puff.receiveShadow = false;
    engine.scene.add(puff);
    smokePuffs.push({
      mesh: puff,
      velocity: new THREE.Vector3(
        back.x * (0.2 + Math.random() * 0.2),
        0.6 + Math.random() * 0.4,
        back.z * (0.2 + Math.random() * 0.2)
      ),
      life: 0,
      maxLife: 0.9 + Math.random() * 0.4
    });
  }
};

engine.renderer.domElement.addEventListener("pointerdown", (event) => {
  if (isDriving) return;
  if (event.button !== 0) return;
  const rect = engine.renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, engine.camera);
  const hits = raycaster.intersectObjects(parkedCarRoots, true);
  if (hits.length === 0) return;
  const root = findParkedCarRoot(hits[0]?.object ?? null);
  if (!root) return;
  const dx = player.object.position.x - root.position.x;
  const dz = player.object.position.z - root.position.z;
  const dist = Math.hypot(dx, dz);
  if (dist > enterCarRadius) {
    hud.showMessage("Подойдите ближе к машине");
    return;
  }
  selectedParkedCar = root;
});

engine.addUpdatable(world, {
  update: (dt) => {
    if (!isDriving && selectedParkedCar) {
      drivingCar = world.occupyParkedCar(selectedParkedCar) ?? selectedParkedCar;
      selectedParkedCar = null;
      parkedCarRoots = world.getParkedCarObjects();
      isDriving = true;
      player.object.visible = false;
      hud.showMessage("Котик сел в машину");
      if (drivingCar) {
        cameraController.setTarget(drivingCar);
        drivingYaw = drivingCar.rotation.y;
        spawnExhaustSmoke(drivingCar, drivingYaw);
      }
      input.setExitVisible(true);
    }

    const move = input.getMoveVector();
    const sprint = input.isSprinting();
    const jump = input.consumeJumpPressed();
    const length = Math.hypot(move.x, move.z);
    if (!isDriving && input.consumeEnterPressed()) {
      const nearby = world.findParkedCarNear(
        { x: player.object.position.x, z: player.object.position.z },
        enterCarRadius
      );
      if (nearby?.car?.object) {
        selectedParkedCar = nearby.car.object;
      } else {
        hud.showMessage("Подойдите ближе к машине");
      }
    }

    if (isDriving && drivingCar && (input.consumeExitPressed() || input.consumeEnterPressed())) {
      const parked = world.parkCarAt(drivingCar);
      parkedCarRoots = world.getParkedCarObjects();
      isDriving = false;
      drivingCar = null;
      player.object.visible = true;
      input.setExitVisible(false);
      cameraController.setTarget(player.object);
      if (parked) {
        const yaw = parked.rotation.y;
        carRight.set(Math.cos(yaw), 0, -Math.sin(yaw));
        const exitPos = parked.position.clone().addScaledVector(carRight, 2.2);
        player.object.position.set(exitPos.x, 0, exitPos.z);
        const resolved = world.resolvePlayerMovement(player.object.position, 0.9);
        player.object.position.x = resolved.x;
        player.object.position.z = resolved.z;
      }
      hud.showMessage("Котик вышел из машины");
    }

    if (!isDriving) {
      if (length > 0.01) {
        const forward = new THREE.Vector3();
        engine.camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();
        const right = new THREE.Vector3().crossVectors(forward, up).normalize();
        const worldMove = new THREE.Vector3()
          .addScaledVector(right, move.x)
          .addScaledVector(forward, move.z);

        const gh = world.getWorldHeight(player.object.position.x, player.object.position.z);
        player.update(dt, { x: worldMove.x, z: worldMove.z }, { sprint, jump }, gh);
      } else {
        const gh = world.getWorldHeight(player.object.position.x, player.object.position.z);
        player.update(dt, { x: 0, z: 0 }, { sprint, jump }, gh);
      }
    } else if (drivingCar) {
      if (length > 0.01) {
        const throttle = move.z;
        const steer = -move.x;
        const speed = drivingSpeed * (sprint ? drivingSprintMultiplier : 1);
        const steerScale = Math.max(0.2, Math.abs(throttle));
        drivingYaw += steer * carTurnSpeed * steerScale * dt;

        carForward.set(Math.sin(drivingYaw), 0, Math.cos(drivingYaw));
        carMove.copy(carForward).multiplyScalar(speed * throttle * dt);
        drivingCar.position.add(carMove);
        drivingCar.rotation.y = drivingYaw;
      }

      // Обновляем дым у машины игрока (ВНЕ проверки на движение, чтобы дымил и на холостых)
      if (drivingCar.userData.carInstance) {
        // Передаем текущую "мощность" (throttle/speed) для адаптации дыма
        // length - это сила нажатия (0..1)
        drivingCar.userData.carInstance.updateSmoke(dt, length);
      }
    }

    // Столкновения с домами/деревьями/машинами
    if (!isDriving) {
      const resolved = world.resolvePlayerMovement(player.object.position, 0.9);
      player.object.position.x = resolved.x;
      player.object.position.z = resolved.z;
    } else if (drivingCar) {
      const resolved = world.resolveCarMovement(drivingCar.position, carCollisionRadius, drivingCar);
      drivingCar.position.x = resolved.x;
      drivingCar.position.z = resolved.z;
      // Адаптируем высоту машины под рельеф/мост
      const h = world.getWorldHeight(drivingCar.position.x, drivingCar.position.z);
      drivingCar.position.y = h + 0.22;
    }
    // Адаптируем высоту машины под рельеф/мост
    if (drivingCar) {
      const h = world.getWorldHeight(drivingCar.position.x, drivingCar.position.z);
      drivingCar.position.y = h + 0.22;
    }

    // Анимация дверей
    if (!isDriving) {
      world.updateDoors(dt, player.object.position);
      world.updateParkedCarDoors(dt, player.object.position, enterCarRadius, enterCarRadius + 0.6);
    } else {
      world.closeAllParkedCarDoors(dt);
    }

    // Небольшой дымок при посадке (затухает сам)
    if (smokePuffs.length > 0) {
      for (let i = smokePuffs.length - 1; i >= 0; i -= 1) {
        const puff = smokePuffs[i]!;
        puff.life += dt;
        puff.mesh.position.addScaledVector(puff.velocity, dt);
        const k = 1 - Math.min(1, puff.life / puff.maxLife);
        puff.mesh.scale.setScalar(1 + (1 - k) * 0.8);
        const mat = puff.mesh.material as THREE.MeshStandardMaterial;
        mat.opacity = 0.65 * k;
        if (puff.life >= puff.maxLife) {
          engine.scene.remove(puff.mesh);
          smokePuffs.splice(i, 1);
        }
      }
    }

    // Уведомления у зданий (появляются при подходе к двери).
    const promos = [
      {
        label: "МТС БАНК",
        // Специальное сообщение при старте (или если подойти к банку)
        text: "УРА! Вам выдали кредитную карту. Изучите город, чтобы найти скидки!"
      },
      {
        label: "МТС SHOP",
        text: "С вашей Кредитной картой доступен кешбэк до 20% на всю технику",
        action: {
          label: "Открыть каталог",
          onClick: () => {
            window.open("https://shop.mts.ru/catalog", "_blank");
          }
        }
      },
      {
        label: "Магазин одежды",
        text: "Вам доступна скидка 3% на одежду по вашей кредитной карте"
      },
      {
        label: "МЕДСИ",
        text: "Кешбэк 10 процентов на любые процедуры"
      }
    ] as const;

    let nearPromo: (typeof promos)[number] | null = null;
    if (!isDriving) {
      for (const p of promos) {
        // Ищем здание по имени в конфиге, чтобы узнать его размеры и позицию
        const building = WORLD_CONFIG.buildings.find((b) => b.label === p.label);
        if (!building) continue;

        // Определяем радиус "зоны действия" вокруг дома: половина размера + запас (4.5 метра)
        // Берём максимум из ширины/глубины для простоты (можно точнее, но круг удобнее)
        const radius = Math.max(building.size.x, building.size.z) / 2 + 4.5;

        const dist = Math.hypot(
          player.object.position.x - building.position.x,
          player.object.position.z - building.position.z
        );

        if (dist <= radius) {
          nearPromo = p;
          break;
        }
      }
    }

    if (nearPromo) {
      // Если вошли в другую зону промо — сбрасываем состояние старого, чтобы при следующем подходе снова показывалось.
      if (activePromoLabel && activePromoLabel !== nearPromo.label) {
        promoDismissedByLabel[activePromoLabel] = false;
        shownPromoLabel = null;
      }
      activePromoLabel = nearPromo.label;

      const dismissed = promoDismissedByLabel[nearPromo.label] === true;
      if (!dismissed && shownPromoLabel !== nearPromo.label) {
        // @ts-ignore
        hud.showPromo(nearPromo.text, nearPromo.action);
        shownPromoLabel = nearPromo.label;
      }
    } else if (activePromoLabel) {
      // Ушли от здания — прячем и разрешаем показывать снова при следующем подходе.
      promoDismissedByLabel[activePromoLabel] = false;
      activePromoLabel = null;
      shownPromoLabel = null;
      hud.hidePromo();
    }

    cameraController.update();
    if (isDriving && drivingCar) {
      hud.updateMinimap({ x: drivingCar.position.x, z: drivingCar.position.z, yaw: drivingCar.rotation.y });
    } else {
      hud.updateMinimap({ x: player.object.position.x, z: player.object.position.z, yaw: player.object.rotation.y });
    }
  }
});

engine.start();
