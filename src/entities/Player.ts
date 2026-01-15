import * as THREE from "three";
import { GAME_CONFIG } from "@config/game";

type CatParts = {
  head: THREE.Mesh;
  leftEar: THREE.Object3D;
  rightEar: THREE.Object3D;
  leftFrontLeg: THREE.Group;
  rightFrontLeg: THREE.Group;
  leftBackLeg: THREE.Group;
  rightBackLeg: THREE.Group;
  leftFrontPaw: THREE.Object3D;
  rightFrontPaw: THREE.Object3D;
  leftBackPaw: THREE.Object3D;
  rightBackPaw: THREE.Object3D;
  tail: THREE.Object3D;
  leftPupil: THREE.Object3D;
  rightPupil: THREE.Object3D;
  leftPupilHighlight: THREE.Object3D;
  rightPupilHighlight: THREE.Object3D;
};

export class Player {
  readonly object: THREE.Group;

  private readonly playerGroup: THREE.Group;
  private readonly catGroup: THREE.Group;
  private catParts: CatParts | null = null;
  private catAnimTime = 0;
  private readonly velocity = new THREE.Vector3();
  private verticalVelocity = 0;
  private eyeLookTimer = 0;
  private eyeLookDuration = 0;
  private eyeLookStart = new THREE.Vector2(0, 0);
  private eyeLookTarget = new THREE.Vector2(0, 0);
  private eyeLookOffset = new THREE.Vector2(0, 0);
  private leftPupilBase = new THREE.Vector3();
  private rightPupilBase = new THREE.Vector3();
  private leftHighlightBase = new THREE.Vector3();
  private rightHighlightBase = new THREE.Vector3();

  constructor() {
    this.playerGroup = new THREE.Group();
    this.playerGroup.position.set(0, 0, 4);
    this.playerGroup.rotation.y = Math.PI * 1.25;

    this.catGroup = new THREE.Group();
    this.catGroup.scale.set(0.6, 0.6, 0.6);
    this.playerGroup.add(this.catGroup);

    this.buildCat();

    this.object = this.playerGroup;
  }

  setSpawn(spawn: { x: number; z: number; y?: number; yaw?: number }) {
    this.playerGroup.position.set(spawn.x, spawn.y ?? 0, spawn.z);
    if (typeof spawn.yaw === "number") {
      this.playerGroup.rotation.y = spawn.yaw;
    }
    // На старте сбрасываем “прыжковую” скорость, чтобы котик не мог оказаться “в воздухе”.
    this.verticalVelocity = 0;
  }

  private buildCat() {
    const furTexture = this.createFurTexture();
    const catBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xf2a158,
      roughness: 0.55,
      metalness: 0.0,
      sheen: 1.0,
      sheenRoughness: 0.45,
      sheenColor: 0xffe1cc,
      map: furTexture
    });

    const catWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xfffaf0,
      roughness: 0.65,
      metalness: 0.05
    });

    const catBody = new THREE.Mesh(new THREE.SphereGeometry(1.35, 32, 24), catBodyMat);
    catBody.scale.set(1, 0.78, 1.1);
    catBody.position.y = 1.0;
    catBody.castShadow = true;
    this.catGroup.add(catBody);

    const catHead = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 24), catBodyMat);
    catHead.scale.set(1.05, 0.95, 1.05);
    catHead.position.set(0, 2.05, 0.45);
    catHead.castShadow = true;
    this.catGroup.add(catHead);

    const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 18), catWhiteMat);
    muzzle.scale.set(1.1, 0.7, 0.9);
    muzzle.position.set(0, -0.15, 0.65);
    muzzle.castShadow = true;
    catHead.add(muzzle);

    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.19, 1.01);
    catHead.add(mouthGroup);

    const mouthLineMat = new THREE.LineBasicMaterial({ color: 0x3b3b3b, linewidth: 2 });
    const mouthCurveL = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.2, -0.02, 0),
      new THREE.Vector3(-0.1, -0.1, 0),
      new THREE.Vector3(0, -0.06, 0)
    );
    const mouthGeoL = new THREE.BufferGeometry().setFromPoints(mouthCurveL.getPoints(10));
    const mouthLineL = new THREE.Line(mouthGeoL, mouthLineMat);
    mouthGroup.add(mouthLineL);

    const mouthCurveR = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, -0.06, 0),
      new THREE.Vector3(0.1, -0.1, 0),
      new THREE.Vector3(0.2, -0.02, 0)
    );
    const mouthGeoR = new THREE.BufferGeometry().setFromPoints(mouthCurveR.getPoints(10));
    const mouthLineR = new THREE.Line(mouthGeoR, mouthLineMat);
    mouthGroup.add(mouthLineR);

    const leftEar = this.createEar(-0.45, catBodyMat);
    const rightEar = this.createEar(0.45, catBodyMat);
    catHead.add(leftEar);
    catHead.add(rightEar);

    const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
    const leftEyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.23, 32, 24), eyeWhiteMat);
    leftEyeWhite.position.set(-0.34, 0.14, 0.74);
    leftEyeWhite.scale.set(1, 1, 0.85);
    catHead.add(leftEyeWhite);

    const rightEyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 24), eyeWhiteMat);
    rightEyeWhite.position.set(0.34, 0.14, 0.74);
    rightEyeWhite.scale.set(1, 1, 0.85);
    catHead.add(rightEyeWhite);

    const eyebrowMat = new THREE.MeshStandardMaterial({ color: 0xd07a3a, roughness: 0.55, metalness: 0.05 });

    const leftBrowCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.48, 0.44, 0.70),
      new THREE.Vector3(-0.32, 0.50, 0.72),
      new THREE.Vector3(-0.16, 0.44, 0.70)
    ]);
    const leftBrowGeo = new THREE.TubeGeometry(leftBrowCurve, 16, 0.035, 10, false);
    const leftBrowMesh = new THREE.Mesh(leftBrowGeo, eyebrowMat);
    leftBrowMesh.castShadow = true;
    catHead.add(leftBrowMesh);

    const rightBrowCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.16, 0.44, 0.70),
      new THREE.Vector3(0.32, 0.50, 0.72),
      new THREE.Vector3(0.48, 0.44, 0.70)
    ]);
    const rightBrowGeo = new THREE.TubeGeometry(rightBrowCurve, 16, 0.035, 10, false);
    const rightBrowMesh = new THREE.Mesh(rightBrowGeo, eyebrowMat);
    rightBrowMesh.castShadow = true;
    catHead.add(rightBrowMesh);

    const pupilMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.4 });
    const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 18), pupilMat);
    leftPupil.scale.set(1, 1, 0.45);
    leftPupil.position.set(-0.34, 0.14, 0.92);
    this.leftPupilBase.copy(leftPupil.position);
    catHead.add(leftPupil);

    const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 18), pupilMat);
    rightPupil.scale.set(1, 1, 0.45);
    rightPupil.position.set(0.34, 0.14, 0.92);
    this.rightPupilBase.copy(rightPupil.position);
    catHead.add(rightPupil);

    const pupilHighlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftPupilHighlight = new THREE.Mesh(new THREE.SphereGeometry(0.028, 12, 12), pupilHighlightMat);
    leftPupilHighlight.position.set(-0.3, 0.18, 0.98);
    this.leftHighlightBase.copy(leftPupilHighlight.position);
    catHead.add(leftPupilHighlight);

    const rightPupilHighlight = new THREE.Mesh(new THREE.SphereGeometry(0.028, 12, 12), pupilHighlightMat);
    rightPupilHighlight.position.set(0.27, 0.18, 0.98);
    this.rightHighlightBase.copy(rightPupilHighlight.position);
    catHead.add(rightPupilHighlight);

    // Highlights removed to keep flat pupils clean and centered.

    const catNose = this.createNose();
    catHead.add(catNose);

    const noseToMouthLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -0.09, 0.83),
        new THREE.Vector3(0, -0.19, 0.89)
      ]),
      new THREE.LineBasicMaterial({ color: 0x333333 })
    );
    catHead.add(noseToMouthLine);

    const whiskerLineMat = new THREE.LineBasicMaterial({ color: 0x444444 });
    this.createWhiskerLine(-0.35, -0.1, 0.73, Math.PI - 0.3, 1.3, whiskerLineMat, catHead);
    this.createWhiskerLine(-0.35, -0.17, 0.73, Math.PI - 0.15, 1.25, whiskerLineMat, catHead);
    this.createWhiskerLine(-0.35, -0.24, 0.73, Math.PI, 1.2, whiskerLineMat, catHead);
    this.createWhiskerLine(0.35, -0.1, 0.73, 0.3, 1.3, whiskerLineMat, catHead);
    this.createWhiskerLine(0.35, -0.17, 0.73, 0.15, 1.25, whiskerLineMat, catHead);
    this.createWhiskerLine(0.35, -0.24, 0.73, 0, 1.2, whiskerLineMat, catHead);

    const frontLegGeo = new THREE.CylinderGeometry(0.2, 0.22, 0.8, 16);
    const createLeg = (x: number, z: number) => {
      const legGroup = new THREE.Group();
      legGroup.position.set(x, 0.85, z);

      const leg = new THREE.Mesh(frontLegGeo, catBodyMat);
      leg.position.y = -0.4;
      leg.castShadow = true;
      legGroup.add(leg);

      const paw = this.createPaw(0, -0.72, 0, catWhiteMat);
      legGroup.add(paw);

      this.catGroup.add(legGroup);
      return { legGroup, paw };
    };

    const leftFrontLegData = createLeg(-0.6, 0.8);
    const rightFrontLegData = createLeg(0.6, 0.8);
    const leftBackLegData = createLeg(-0.7, -0.5);
    const rightBackLegData = createLeg(0.7, -0.5);

    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, 1.0, -1.2);
    const tailCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0.5, -0.4),
      new THREE.Vector3(0, 1.2, -0.2),
      new THREE.Vector3(0, 1.5, 0.2)
    ]);
    const tailGeo = new THREE.TubeGeometry(tailCurve, 20, 0.15, 8, false);
    const tailMesh = new THREE.Mesh(tailGeo, catBodyMat);
    tailMesh.castShadow = true;
    tailGroup.add(tailMesh);

    const tailTip = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), catWhiteMat);
    tailTip.position.set(0, 1.5, 0.2);
    tailTip.castShadow = true;
    tailGroup.add(tailTip);
    this.catGroup.add(tailGroup);

    const collar = new THREE.Mesh(
      new THREE.TorusGeometry(0.35, 0.06, 8, 32),
      new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.3 })
    );
    collar.position.set(0, 1.55, 0.3);
    collar.rotation.x = Math.PI / 2 - 0.2;
    this.catGroup.add(collar);

    const bell = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.8, roughness: 0.2 })
    );
    bell.position.set(0, 1.4, 0.6);
    this.catGroup.add(bell);

    this.catParts = {
      head: catHead,
      leftEar,
      rightEar,
      leftFrontLeg: leftFrontLegData.legGroup,
      rightFrontLeg: rightFrontLegData.legGroup,
      leftBackLeg: leftBackLegData.legGroup,
      rightBackLeg: rightBackLegData.legGroup,
      leftFrontPaw: leftFrontLegData.paw,
      rightFrontPaw: rightFrontLegData.paw,
      leftBackPaw: leftBackLegData.paw,
      rightBackPaw: rightBackLegData.paw,
      tail: tailGroup,
      leftPupil,
      rightPupil,
      leftPupilHighlight,
      rightPupilHighlight
    };
  }

  private createEar(xOffset: number, catBodyMat: THREE.Material) {
    const earRoot = new THREE.Group();

    const outer = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.95, 32), catBodyMat);
    outer.scale.set(1, 1.05, 1);
    earRoot.add(outer);

    const inner = new THREE.Mesh(
      new THREE.ConeGeometry(0.42, 0.78, 32),
      new THREE.MeshStandardMaterial({ color: 0xffb6c1, roughness: 0.45 })
    );
    inner.position.set(0, -0.08, 0.08);
    inner.scale.set(0.82, 0.82, 0.55);
    earRoot.add(inner);

    earRoot.position.set(xOffset, 0.45, 0.05);
    earRoot.rotation.z = xOffset > 0 ? -0.45 : 0.45;
    earRoot.rotation.x = -0.1;
    return earRoot;
  }

  private createNose() {
    const noseGeo = new THREE.SphereGeometry(0.13, 16, 16);
    const noseMat = new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.4 });
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.set(0, -0.02, 0.89);
    nose.scale.set(1.1, 0.85, 0.7);
    return nose;
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

  private createWhiskerLine(
    x: number,
    y: number,
    z: number,
    rotY: number,
    length: number,
    whiskerLineMat: THREE.LineBasicMaterial,
    parent: THREE.Object3D
  ) {
    const points = [
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x + Math.cos(rotY) * length, y, z + Math.sin(rotY) * length)
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, whiskerLineMat);
    parent.add(line);
  }

  private createPaw(x: number, y: number, z: number, catWhiteMat: THREE.Material) {
    const pawGroup = new THREE.Group();
    pawGroup.position.set(x, y, z);
    const pawBase = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), catWhiteMat);
    pawBase.scale.set(1.1, 0.6, 1.2);
    pawBase.castShadow = true;
    pawGroup.add(pawBase);
    return pawGroup;
  }

  update(dt: number, input: { x: number; z: number }, actions?: { sprint?: boolean; jump?: boolean }) {
    const length = Math.hypot(input.x, input.z);
    const sprintingRequested = !!actions?.sprint;

    if (length > 0) {
      const speed = GAME_CONFIG.playerSpeed * (sprintingRequested ? GAME_CONFIG.playerSprintMultiplier : 1);
      this.velocity.set(input.x / length, 0, input.z / length).multiplyScalar(speed);
      this.playerGroup.position.addScaledVector(this.velocity, dt);

      const targetYaw = Math.atan2(this.velocity.x, this.velocity.z);
      const isForwardDiagonal = input.z > 0.2 && Math.abs(input.x) > 0.2;
      const turnSpeed = isForwardDiagonal ? GAME_CONFIG.playerTurnSpeed * 0.5 : GAME_CONFIG.playerTurnSpeed;
      this.playerGroup.rotation.y = this.lerpYaw(
        this.playerGroup.rotation.y,
        targetYaw,
        turnSpeed * dt
      );
    } else {
      this.velocity.set(0, 0, 0);
    }

    const moving = this.velocity.length() > 0.1;
    const sprinting = moving && sprintingRequested;
    this.animateCat(dt, moving, sprinting);

    // Прыжок: простая вертикальная физика (земля на y=0).
    const grounded = this.playerGroup.position.y <= 0.0001;
    if (grounded) {
      this.playerGroup.position.y = 0;
      if (this.verticalVelocity < 0) this.verticalVelocity = 0;
      if (actions?.jump) {
        this.verticalVelocity = GAME_CONFIG.playerJumpSpeed;
      }
    }

    this.verticalVelocity -= GAME_CONFIG.playerGravity * dt;
    this.playerGroup.position.y += this.verticalVelocity * dt;
    if (this.playerGroup.position.y < 0) {
      this.playerGroup.position.y = 0;
      this.verticalVelocity = 0;
    }
  }

  private animateCat(dt: number, moving: boolean, sprinting: boolean) {
    if (!this.catParts) return;

    this.catAnimTime += dt * (sprinting ? 12 : 8);
    const t = this.catAnimTime;

    this.updateEyeLook(dt);

    if (moving) {
      const legSwing = Math.sin(t) * (sprinting ? 0.65 : 0.5);

      this.catParts.leftFrontLeg.rotation.x = legSwing;
      this.catParts.rightBackLeg.rotation.x = legSwing;
      this.catParts.rightFrontLeg.rotation.x = -legSwing;
      this.catParts.leftBackLeg.rotation.x = -legSwing;

      this.catParts.leftFrontPaw.rotation.x = -legSwing * 0.4;
      this.catParts.rightFrontPaw.rotation.x = legSwing * 0.4;
      this.catParts.leftBackPaw.rotation.x = legSwing * 0.4;
      this.catParts.rightBackPaw.rotation.x = -legSwing * 0.4;

      this.catGroup.position.y = Math.abs(Math.sin(t * 2)) * (sprinting ? 0.12 : 0.06);

      this.catParts.tail.rotation.z = Math.sin(t * 2) * 0.4;
      this.catParts.tail.rotation.x = Math.sin(t) * 0.15;
    } else {
      this.catParts.leftFrontLeg.rotation.x = 0;
      this.catParts.rightFrontLeg.rotation.x = 0;
      this.catParts.leftBackLeg.rotation.x = 0;
      this.catParts.rightBackLeg.rotation.x = 0;
      this.catParts.leftFrontPaw.rotation.x = 0;
      this.catParts.rightFrontPaw.rotation.x = 0;
      this.catParts.leftBackPaw.rotation.x = 0;
      this.catParts.rightBackPaw.rotation.x = 0;

      this.catParts.leftEar.rotation.x = -0.1 + Math.sin(t * 2.0) * 0.05;
      this.catParts.rightEar.rotation.x = -0.1 + Math.sin(t * 2.0) * 0.05;
      this.catParts.leftEar.rotation.z = 0.5 + Math.sin(t * 1.5) * 0.03;
      this.catParts.rightEar.rotation.z = -0.5 - Math.sin(t * 1.5) * 0.03;

      this.catGroup.position.y = Math.sin(t * 0.5) * 0.02;
      this.catParts.tail.rotation.z = Math.sin(t * 0.8) * 0.15;
    }
  }

  private updateEyeLook(dt: number) {
    if (!this.catParts) return;

    if (this.eyeLookDuration > 0) {
      this.eyeLookTimer += dt;
      const phase = Math.min(this.eyeLookTimer / this.eyeLookDuration, 1);
      this.eyeLookOffset.lerpVectors(this.eyeLookStart, this.eyeLookTarget, phase);
      if (phase >= 1) {
        if (this.eyeLookTarget.lengthSq() > 0.0001) {
          this.eyeLookStart.copy(this.eyeLookOffset);
          this.eyeLookTarget.set(0, 0);
          this.eyeLookDuration = 0.45;
          this.eyeLookTimer = 0;
        } else {
          this.eyeLookDuration = 0;
        }
      }
    } else if (Math.random() < dt * 0.9) {
      const maxX = 0.12;
      const maxY = 0.05;
      const dirX = (Math.random() * 2 - 1) * maxX;
      const dirY = (Math.random() * 2 - 1) * maxY;
      this.eyeLookStart.copy(this.eyeLookOffset);
      this.eyeLookTarget.set(dirX, dirY);
      this.eyeLookDuration = 0.5 + Math.random() * 0.35;
      this.eyeLookTimer = 0;
    }

    const offsetX = this.eyeLookOffset.x;
    const offsetY = this.eyeLookOffset.y;

    this.catParts.leftPupil.position.set(
      this.leftPupilBase.x + offsetX,
      this.leftPupilBase.y + offsetY,
      this.leftPupilBase.z
    );
    this.catParts.rightPupil.position.set(
      this.rightPupilBase.x + offsetX,
      this.rightPupilBase.y + offsetY,
      this.rightPupilBase.z
    );

    const highlightFactor = 1.2;
    this.catParts.leftPupilHighlight.position.set(
      this.leftHighlightBase.x + offsetX * highlightFactor,
      this.leftHighlightBase.y + offsetY * highlightFactor,
      this.leftHighlightBase.z
    );
    this.catParts.rightPupilHighlight.position.set(
      this.rightHighlightBase.x + offsetX * highlightFactor,
      this.rightHighlightBase.y + offsetY * highlightFactor,
      this.rightHighlightBase.z
    );
  }

  private lerpYaw(current: number, target: number, alpha: number) {
    const delta = THREE.MathUtils.euclideanModulo(target - current + Math.PI, Math.PI * 2) - Math.PI;
    return current + delta * alpha;
  }
}
