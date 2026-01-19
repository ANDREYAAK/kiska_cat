import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class OrbitCameraController {
  private readonly controls: OrbitControls;
  private readonly camera: THREE.PerspectiveCamera;
  private target: THREE.Object3D;
  private readonly offset = new THREE.Vector3(0, 2, 0);
  private readonly lastTarget = new THREE.Vector3();
  private readonly tmp = new THREE.Vector3();
  private isFreeMode = false;

  constructor(camera: THREE.PerspectiveCamera, domElement: HTMLElement, target: THREE.Object3D) {
    this.camera = camera;
    this.target = target;
    this.controls = new OrbitControls(camera, domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 80;
    this.controls.maxPolarAngle = Math.PI / 2.2;
    // Важно: Shift у нас используется для бега, а OrbitControls трактует Shift+мышь как PAN.
    // Из-за этого “точка орбиты” уезжает от котика, и камера визуально открепляется.
    // Поэтому панорамирование выключаем — камера всегда остаётся привязана к игроку.
    this.controls.enablePan = false;
    this.controls.screenSpacePanning = false;
    this.controls.target.copy(this.target.position).add(this.offset);
    // Стартовая позиция камеры: держим её "спереди" относительно мирового -Z,
    // чтобы при спавне у зданий камера не оказывалась внутри крыши/стен.
    camera.position.copy(this.controls.target).add(new THREE.Vector3(0, 8, -14));
    this.lastTarget.copy(this.target.position);
  }

  setTarget(target: THREE.Object3D) {
    if (this.target === target) return;
    const delta = target.position.clone().sub(this.target.position);
    this.camera.position.add(delta);
    this.controls.target.add(delta);
    this.target = target;
    this.lastTarget.copy(target.position);
  }

  update() {
    // В Free Mode мы не привязываемся к таргету (игроку), камера летит сама по себе
    if (this.isFreeMode) {
      this.controls.update();
      return;
    }

    // 1) Двигаем камеру вместе с котиком только по земле (X/Z),
    // чтобы прыжок был визуально заметен (камера не "подпрыгивает" вместе с игроком).
    this.tmp.copy(this.target.position).sub(this.lastTarget);
    this.tmp.y = 0;
    if (this.tmp.lengthSq() > 0) {
      this.camera.position.add(this.tmp);
      this.controls.target.add(this.tmp);
    }

    // 2) Страховка: если точка орбиты уехала (например, из-за PAN),
    // возвращаем её к котику, сдвигая камеру на тот же вектор (без “рывка”).
    const desiredX = this.target.position.x + this.offset.x;
    const desiredZ = this.target.position.z + this.offset.z;
    const corrX = desiredX - this.controls.target.x;
    const corrZ = desiredZ - this.controls.target.z;
    if (Math.abs(corrX) > 1e-4 || Math.abs(corrZ) > 1e-4) {
      this.tmp.set(corrX, 0, corrZ);
      this.camera.position.add(this.tmp);
      this.controls.target.add(this.tmp);
    }

    // Центр орбиты по высоте обновляем всегда — камера продолжает смотреть на котика.
    this.controls.target.y = this.target.position.y + this.offset.y;
    this.lastTarget.copy(this.target.position);
    this.controls.update();
  }

  updateFollowYaw(targetYaw: number, dt: number) {
    // Current angle from target to camera (in XZ plane)
    const dx = this.camera.position.x - this.controls.target.x;
    const dz = this.camera.position.z - this.controls.target.z;
    const currentAng = Math.atan2(dx, dz); // 0 is +Z (camera behind car looking at +Z? No, wait)

    // We want camera to be BEHIND the car. 
    // If car yaw is 0 (facing +Z), back is -Z? 
    // Let's assume standard Model: 0 yaw = +Z direction.
    // Camera behind means camera is at -Z relative to car.
    // So desired camera angle (vector from target TO camera) should be yaw + PI (backwards).

    // Let's smooth angle. 
    let desiredAng = targetYaw + Math.PI; // behind

    // Shortest path interpolation for angles
    let diff = desiredAng - currentAng;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;

    // Determine how "fast" we are driving (or turning). 
    // We only want to auto-rotate if difference is significant but not fight user too much.
    // For now, simple gentle drift.
    // If user is actively rotating manually, OrbitControls might fight this. 
    // But since we enable damping, direct property mutation is tricky.
    // Safest way with OrbitControls is to rotate the camera position around target.

    const factor = 2.0 * dt; // Slow auto-align
    if (Math.abs(diff) > 0.01) {
      const newAng = currentAng + diff * factor;
      const dist = Math.sqrt(dx * dx + dz * dz);
      const newX = Math.sin(newAng) * dist;
      const newZ = Math.cos(newAng) * dist;

      this.camera.position.x = this.controls.target.x + newX;
      this.camera.position.z = this.controls.target.z + newZ;
    }
  }

  /**
   * Manually pan the camera (used for Free Mode keyboard control)
   * Moves both camera and target
   */
  public panCamera(moveX: number, moveZ: number) {
    if (!this.controls.enabled) return;

    // Get forward/right vectors of camera (projected to XZ plane)
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    // Scale movement (adjust speed as needed, e.g. 1.0)
    const speed = 1.0;
    const move = new THREE.Vector3()
      .addScaledVector(right, moveX * speed)
      .addScaledVector(forward, moveZ * speed);

    this.camera.position.add(move);
    this.controls.target.add(move);
    this.lastTarget.copy(this.controls.target).sub(this.offset);
    // ^ Synchronize lastTarget to prevent update() from pulling it back?
    // Actually update() logic pulls camera TO target. 
    // In Free Mode, update() logic step 1) follows 'this.target'. 
    // IF we are in free mode, we probably shouldn't be following 'this.target' (player) at all in update().
    // So we need to skip step 1 in update() if free mode is on.
  }

  public setEnabled(enabled: boolean) {
    this.controls.enabled = enabled;
  }

  public setFreeMode(enabled: boolean) {
    this.isFreeMode = enabled;
    this.controls.enablePan = enabled;
    this.controls.screenSpacePanning = enabled;
    if (enabled) {
      // When entering free mode, maybe relax constraints?
      this.controls.maxDistance = 200;
      this.controls.minDistance = 1;
    } else {
      // Restore game constraints
      this.controls.maxDistance = 80;
      this.controls.minDistance = 5;
      this.controls.enablePan = false;
      this.controls.screenSpacePanning = false;
      // Immediate re-snap to target to avoid drift
      this.lastTarget.copy(this.target.position);
      this.controls.target.copy(this.target.position).add(this.offset);
      // We might want to keep the current camera orientation but shift position to be relative to target?
      // For simplicity, just letting the next 'update()' handle smooth correction or snap it here.
    }
  }
}
