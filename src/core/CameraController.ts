import * as THREE from "three";
import { GAME_CONFIG } from "@config/game";
import { damp } from "@utils/math";

export class CameraController {
  private readonly camera: THREE.PerspectiveCamera;
  private readonly target: THREE.Object3D;
  private readonly offset = new THREE.Vector3(
    GAME_CONFIG.cameraOffset.x,
    GAME_CONFIG.cameraOffset.y,
    GAME_CONFIG.cameraOffset.z
  );
  private readonly desiredPosition = new THREE.Vector3();

  constructor(camera: THREE.PerspectiveCamera, target: THREE.Object3D) {
    this.camera = camera;
    this.target = target;
    this.camera.position.copy(this.offset).add(this.target.position);
  }

  update(dt: number) {
    this.desiredPosition.copy(this.target.position).add(this.offset);
    this.camera.position.set(
      damp(this.camera.position.x, this.desiredPosition.x, GAME_CONFIG.cameraSmooth, dt),
      damp(this.camera.position.y, this.desiredPosition.y, GAME_CONFIG.cameraSmooth, dt),
      damp(this.camera.position.z, this.desiredPosition.z, GAME_CONFIG.cameraSmooth, dt)
    );
    this.camera.lookAt(
      this.target.position.x,
      this.target.position.y + GAME_CONFIG.cameraLookAtHeight,
      this.target.position.z
    );
  }
}
