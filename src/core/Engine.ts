import * as THREE from "three";

export type Updatable = {
  update: (dt: number) => void;
};

export class Engine {
  readonly scene = new THREE.Scene();
  readonly renderer: THREE.WebGLRenderer;
  readonly clock = new THREE.Clock();
  camera: THREE.PerspectiveCamera;
  private readonly container: HTMLElement;
  private readonly updatables: Updatable[] = [];

  constructor(container: HTMLElement) {
    this.container = container;
    // Важно для “горизонта”: дальняя плоскость должна видеть небо/холмы/дальние дороги.
    // При этом near поднимаем чуть выше, чтобы уменьшить артефакты глубины на дальнем плане.
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.5, 800);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    if ("physicallyCorrectLights" in this.renderer) {
      (this.renderer as THREE.WebGLRenderer & { physicallyCorrectLights?: boolean }).physicallyCorrectLights = false;
    }
    this.container.appendChild(this.renderer.domElement);
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  addUpdatable(...items: Updatable[]) {
    this.updatables.push(...items);
  }

  addToScene(...objects: THREE.Object3D[]) {
    objects.forEach((obj) => this.scene.add(obj));
  }

  start() {
    this.clock.start();
    const tick = () => {
      const dt = this.clock.getDelta();
      this.updatables.forEach((item) => item.update(dt));
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(tick);
    };
    tick();
  }

  private handleResize = () => {
    const { clientWidth, clientHeight } = this.container;
    this.camera.aspect = clientWidth / clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(clientWidth, clientHeight);
  };

  dispose() {
    window.removeEventListener("resize", this.handleResize);
    this.renderer.dispose();
    this.container.removeChild(this.renderer.domElement);
  }
}
