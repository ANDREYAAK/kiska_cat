import * as THREE from "three";

type BuildingOptions = {
  position: { x: number; z: number };
  size: { x: number; y: number; z: number };
  color: string;
  roof: string;
  rotation?: number;
  label?: string;
  labelBg?: string;
  labelTextColor?: string;
  labelAnchor?: "center" | "edgeLeft" | "edgeRight";
  labelAllSides?: boolean;
  shutters?: boolean;
};

type BuildingTextures = {
  wall: THREE.Texture;
  roof: THREE.Texture;
  windows: THREE.Texture;
};

export const BUILDING_LAYOUT = {
  foundationHeight: 0.5,
  facadeInset: 0.06, // насколько выносим элементы фасада вперёд, чтобы не мерцали
  // Дверь у нас на стороне +Z (в локальных координатах здания)
  door: {
    width: 2.0,
    height: 2.8,
    frameWidth: 2.4,
    frameHeight: 3.2,
    outward: 0.6, // насколько “вылетает” дверь от стены (+Z)
    frameOutward: 0.45,
    localZOutset: 0.9 // для расчёта тропинки/точки входа
  },
  windows: {
    width: 1.1,
    height: 1.3,
    // “Сетка”: шаг по X/Z и высота этажа — легко менять, чтобы добавлять/убирать окна/этажи
    desiredStep: 2.4,
    floorHeight: 2.4,
    // поля от краёв фасада и от крыши
    marginX: 1.2,
    marginTop: 1.1,
    sillFromBase: 1.2,
    doorClearance: 0.6 // запас вокруг дверного проёма, чтобы окна никогда не “сливались” с дверью
  },
  roof: {
    minHeight: 0.7,
    maxHeight: 1.2,
    relative: 0.12
  }
} as const;

export const createBuilding = (options: BuildingOptions, textures: BuildingTextures) => {
  const group = new THREE.Group();
  group.rotation.y = options.rotation ?? 0;

  // Foundation (как в примере: дом стоит на небольшом основании)
  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(options.size.x * 1.06, 0.5, options.size.z * 1.06),
    new THREE.MeshStandardMaterial({ color: "#7f8c8d", roughness: 0.9, metalness: 0.02 })
  );
  foundation.position.y = BUILDING_LAYOUT.foundationHeight / 2;
  foundation.castShadow = true;
  foundation.receiveShadow = true;
  group.add(foundation);

  const baseGeometry = new THREE.BoxGeometry(options.size.x, options.size.y, options.size.z);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: options.color,
    map: textures.wall,
    roughness: 0.7,
    metalness: 0.05
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.castShadow = true;
  base.receiveShadow = true;
  base.position.y = BUILDING_LAYOUT.foundationHeight + options.size.y / 2;
  group.add(base);

  // Flat roof (убрали треугольную крышу)
  const roofHeight = Math.max(
    BUILDING_LAYOUT.roof.minHeight,
    Math.min(BUILDING_LAYOUT.roof.maxHeight, options.size.y * BUILDING_LAYOUT.roof.relative)
  );
  const roofGeometry = new THREE.BoxGeometry(options.size.x * 1.05, roofHeight, options.size.z * 1.05);
  const roofMaterial = new THREE.MeshStandardMaterial({
    color: options.roof,
    map: textures.roof,
    roughness: 0.6,
    metalness: 0.08
  });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.castShadow = true;
  roof.position.y = BUILDING_LAYOUT.foundationHeight + options.size.y + roofHeight / 2 - 0.02;
  group.add(roof);

  const trimMaterial = new THREE.MeshStandardMaterial({
    color: "#f9f9f7",
    roughness: 0.6,
    metalness: 0.02
  });
  const trim = new THREE.Mesh(
    new THREE.BoxGeometry(options.size.x * 1.02, 0.12, options.size.z * 1.02),
    trimMaterial
  );
  trim.position.y = BUILDING_LAYOUT.foundationHeight + options.size.y + 0.02;
  trim.castShadow = true;
  trim.receiveShadow = true;
  group.add(trim);

  const windowMaterial = new THREE.MeshStandardMaterial({
    map: textures.windows,
    emissive: new THREE.Color("#ffd9a8"),
    // Чуть ярче и “стекляннее”, чтобы окна выглядели живее
    emissiveIntensity: 0.2,
    roughness: 0.16,
    metalness: 0.18,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1
  });

  // Общая рамка для всех окон (тонкий объёмный ободок вокруг стекла)
  const windowFrameMaterial = new THREE.MeshStandardMaterial({
    color: "#f4f6fb",
    roughness: 0.38,
    metalness: 0.16
  });

  // Окна: нормальная сетка, которая легко настраивается (шаг/поля/этажность/зона двери)
  const winGeo = new THREE.PlaneGeometry(BUILDING_LAYOUT.windows.width, BUILDING_LAYOUT.windows.height);
  const usableHeight = options.size.y - BUILDING_LAYOUT.windows.marginTop;
  const floors = Math.max(1, Math.floor((usableHeight - BUILDING_LAYOUT.windows.sillFromBase) / BUILDING_LAYOUT.windows.floorHeight));

  const makeCols = (width: number) => {
    const usable = Math.max(0.01, width - 2 * BUILDING_LAYOUT.windows.marginX);
    const cols = Math.max(1, Math.floor(usable / BUILDING_LAYOUT.windows.desiredStep));
    const step = usable / cols;
    const x0 = -usable / 2 + step / 2;
    return { cols, step, x0 };
  };

  // Фасад +Z (передний): здесь дверь, поэтому есть “дырка” под проём
  const front = makeCols(options.size.x);
  const doorClearX = BUILDING_LAYOUT.door.width / 2 + BUILDING_LAYOUT.windows.doorClearance;
  const doorClearY = BUILDING_LAYOUT.door.frameHeight + BUILDING_LAYOUT.windows.doorClearance;

  for (let f = 0; f < floors; f += 1) {
    let y =
      BUILDING_LAYOUT.foundationHeight +
      BUILDING_LAYOUT.windows.sillFromBase +
      BUILDING_LAYOUT.windows.height / 2 +
      f * BUILDING_LAYOUT.windows.floorHeight;

    // Для “МТС БАНК” чуть поднимаем окна, начиная со второго этажа,
    // чтобы они не “налезали” визуально на область двери/козырька.
    if (options.label === "МТС БАНК" && f >= 1) {
      y += 0.35;
    }

    for (let i = 0; i < front.cols; i += 1) {
      const x = front.x0 + i * front.step;
      // Всегда держим “окно-дверь” в порядке: в зоне проёма окна не ставим.
      const inDoorX = Math.abs(x) <= doorClearX;
      const inDoorY = y <= BUILDING_LAYOUT.foundationHeight + doorClearY;
      if (inDoorX && inDoorY) continue;

      const w = new THREE.Mesh(winGeo, windowMaterial);
      w.position.set(x, y, options.size.z / 2 + BUILDING_LAYOUT.facadeInset);
      w.renderOrder = 1;
      group.add(w);

      // Объёмная рамка вокруг стекла (фронтальный фасад)
      const frameDepth = 0.06;
      const frameGeo = new THREE.BoxGeometry(
        BUILDING_LAYOUT.windows.width + 0.18,
        BUILDING_LAYOUT.windows.height + 0.18,
        frameDepth
      );
      const frame = new THREE.Mesh(frameGeo, windowFrameMaterial);
      frame.position.set(x, y, options.size.z / 2 + BUILDING_LAYOUT.facadeInset - frameDepth / 2);
      frame.castShadow = true;
      frame.receiveShadow = true;
      frame.renderOrder = 0;
      group.add(frame);

      // Ставни (только если включены; по задаче — на зелёном магазине)
      if (options.shutters) {
        const shutterMat = new THREE.MeshStandardMaterial({ color: "#1f6f39", roughness: 0.75, metalness: 0.02 });
        const sw = 0.22;
        const sh = BUILDING_LAYOUT.windows.height * 1.02;
        const sd = 0.06;
        const gz = options.size.z / 2 + BUILDING_LAYOUT.facadeInset + 0.03;

        const left = new THREE.Mesh(new THREE.BoxGeometry(sw, sh, sd), shutterMat);
        left.position.set(x - BUILDING_LAYOUT.windows.width / 2 - sw / 2 - 0.06, y, gz);
        left.castShadow = true;
        left.renderOrder = 1;
        group.add(left);

        const right = new THREE.Mesh(new THREE.BoxGeometry(sw, sh, sd), shutterMat);
        right.position.set(x + BUILDING_LAYOUT.windows.width / 2 + sw / 2 + 0.06, y, gz);
        right.castShadow = true;
        right.renderOrder = 1;
        group.add(right);
      }
    }
  }

  // Боковой фасад +X (как было): без двери, но тоже сеткой
  const side = makeCols(options.size.z);
  for (let f = 0; f < floors; f += 1) {
    let y =
      BUILDING_LAYOUT.foundationHeight +
      BUILDING_LAYOUT.windows.sillFromBase +
      BUILDING_LAYOUT.windows.height / 2 +
      f * BUILDING_LAYOUT.windows.floorHeight;

    if (options.label === "МТС БАНК" && f >= 1) {
      y += 0.35;
    }
    for (let i = 0; i < side.cols; i += 1) {
      const z = side.x0 + i * side.step;
      const w = new THREE.Mesh(winGeo, windowMaterial);
      w.rotation.y = Math.PI / 2;
      w.position.set(options.size.x / 2 + BUILDING_LAYOUT.facadeInset, y, z);
      w.renderOrder = 1;
      group.add(w);

      // Рамка на боковом фасаде (+X)
      const frameDepth = 0.06;
      const frameGeo = new THREE.BoxGeometry(
        BUILDING_LAYOUT.windows.width + 0.18,
        BUILDING_LAYOUT.windows.height + 0.18,
        frameDepth
      );
      const frame = new THREE.Mesh(frameGeo, windowFrameMaterial);
      frame.rotation.y = Math.PI / 2;
      frame.position.set(
        options.size.x / 2 + BUILDING_LAYOUT.facadeInset - frameDepth / 2,
        y,
        z
      );
      frame.castShadow = true;
      frame.receiveShadow = true;
      frame.renderOrder = 0;
      group.add(frame);
    }
  }

  // Задний фасад -Z: добавляем окна (там двери нет)
  for (let f = 0; f < floors; f += 1) {
    let y =
      BUILDING_LAYOUT.foundationHeight +
      BUILDING_LAYOUT.windows.sillFromBase +
      BUILDING_LAYOUT.windows.height / 2 +
      f * BUILDING_LAYOUT.windows.floorHeight;

    if (options.label === "МТС БАНК" && f >= 1) {
      y += 0.35;
    }

    for (let i = 0; i < front.cols; i += 1) {
      const x = front.x0 + i * front.step;
      const w = new THREE.Mesh(winGeo, windowMaterial);
      w.rotation.y = Math.PI;
      w.position.set(x, y, -options.size.z / 2 - BUILDING_LAYOUT.facadeInset);
      w.renderOrder = 1;
      group.add(w);

      // Рамка на заднем фасаде (-Z)
      const frameDepth = 0.06;
      const frameGeo = new THREE.BoxGeometry(
        BUILDING_LAYOUT.windows.width + 0.18,
        BUILDING_LAYOUT.windows.height + 0.18,
        frameDepth
      );
      const frame = new THREE.Mesh(frameGeo, windowFrameMaterial);
      frame.rotation.y = Math.PI;
      frame.position.set(
        x,
        y,
        -options.size.z / 2 - BUILDING_LAYOUT.facadeInset + frameDepth / 2
      );
      frame.castShadow = true;
      frame.receiveShadow = true;
      frame.renderOrder = 0;
      group.add(frame);
    }
  }

  // Боковой фасад -X: добавляем окна (для симметрии и чтобы большие здания не были “пустыми”)
  for (let f = 0; f < floors; f += 1) {
    let y =
      BUILDING_LAYOUT.foundationHeight +
      BUILDING_LAYOUT.windows.sillFromBase +
      BUILDING_LAYOUT.windows.height / 2 +
      f * BUILDING_LAYOUT.windows.floorHeight;

    if (options.label === "МТС БАНК" && f >= 1) {
      y += 0.35;
    }
    for (let i = 0; i < side.cols; i += 1) {
      const z = side.x0 + i * side.step;
      const w = new THREE.Mesh(winGeo, windowMaterial);
      w.rotation.y = -Math.PI / 2;
      w.position.set(-options.size.x / 2 - BUILDING_LAYOUT.facadeInset, y, z);
      w.renderOrder = 1;
      group.add(w);

      // Рамка на боковом фасаде (-X)
      const frameDepth = 0.06;
      const frameGeo = new THREE.BoxGeometry(
        BUILDING_LAYOUT.windows.width + 0.18,
        BUILDING_LAYOUT.windows.height + 0.18,
        frameDepth
      );
      const frame = new THREE.Mesh(frameGeo, windowFrameMaterial);
      frame.rotation.y = -Math.PI / 2;
      frame.position.set(
        -options.size.x / 2 - BUILDING_LAYOUT.facadeInset + frameDepth / 2,
        y,
        z
      );
      frame.castShadow = true;
      frame.receiveShadow = true;
      frame.renderOrder = 0;
      group.add(frame);
    }
  }

  // Door + awning (вход как в примере, чтобы дом не выглядел “пустым”)
  const doorFrame = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 3.2, 0.35),
    new THREE.MeshStandardMaterial({
      color: "#2c3e50",
      roughness: 0.7,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2
    })
  );
  // Чуть выносим от стены вперёд, чтобы не “мерцало” (z-fighting)
  doorFrame.position.set(0, BUILDING_LAYOUT.foundationHeight + 1.85, options.size.z / 2 + BUILDING_LAYOUT.door.frameOutward);
  doorFrame.renderOrder = 2;
  group.add(doorFrame);

  const doorGeo = new THREE.BoxGeometry(2.0, 2.8, 0.15);
  const doorCanvas = document.createElement("canvas");
  doorCanvas.width = 256;
  doorCanvas.height = 512;
  const doorCtx = doorCanvas.getContext("2d");
  let doorTexture: THREE.Texture | undefined;
  if (doorCtx) {
    // Базовый цвет двери
    doorCtx.fillStyle = "#8b5a2b";
    doorCtx.fillRect(0, 0, doorCanvas.width, doorCanvas.height);

    // Вертикальный градиент для лёгкого объёма
    const grad = doorCtx.createLinearGradient(0, 0, 0, doorCanvas.height);
    grad.addColorStop(0, "rgba(255,255,255,0.16)");
    grad.addColorStop(0.5, "rgba(0,0,0,0.1)");
    grad.addColorStop(1, "rgba(0,0,0,0.22)");
    doorCtx.fillStyle = grad;
    doorCtx.fillRect(0, 0, doorCanvas.width, doorCanvas.height);

    // Простые “филенки”
    const panelInset = 32;
    const panelHeight = (doorCanvas.height - panelInset * 3) / 2;
    const panelWidth = doorCanvas.width - panelInset * 2;
    doorCtx.strokeStyle = "rgba(0,0,0,0.45)";
    doorCtx.lineWidth = 6;
    doorCtx.strokeRect(panelInset, panelInset, panelWidth, panelHeight);
    doorCtx.strokeRect(panelInset, panelInset * 2 + panelHeight, panelWidth, panelHeight);

    // Лёгкие вертикальные “волокна” дерева
    doorCtx.strokeStyle = "rgba(255,255,255,0.08)";
    doorCtx.lineWidth = 2;
    for (let x = 0; x < doorCanvas.width; x += 12) {
      doorCtx.beginPath();
      doorCtx.moveTo(x + Math.random() * 4, 0);
      doorCtx.lineTo(x + Math.random() * 4, doorCanvas.height);
      doorCtx.stroke();
    }

    doorTexture = new THREE.CanvasTexture(doorCanvas);
    doorTexture.wrapS = doorTexture.wrapT = THREE.ClampToEdgeWrapping;
    doorTexture.anisotropy = 4;
  }

  const doorMat = new THREE.MeshStandardMaterial({
    color: "#8B4513",
    roughness: 0.8,
    metalness: 0.15,
    polygonOffset: true,
    polygonOffsetFactor: -3,
    polygonOffsetUnits: -3,
    map: doorTexture
  });

  // Поворот вокруг петли: создаём pivot на краю дверного проёма,
  // а саму дверь смещаем внутрь pivot по X.
  const doorPivot = new THREE.Group();
  // Делаем дверь “правой”: петля на правом краю проёма (если смотреть спереди).
  const doorHingeX = BUILDING_LAYOUT.door.width / 2;
  doorPivot.position.set(
    doorHingeX,
    BUILDING_LAYOUT.foundationHeight + 1.75,
    options.size.z / 2 + BUILDING_LAYOUT.door.outward
  );

  const door = new THREE.Mesh(doorGeo, doorMat);
  // Центр полотна двери смещаем влево от петли.
  door.position.set(-BUILDING_LAYOUT.door.width / 2, 0, 0);
  door.castShadow = true;
  door.renderOrder = 3;
  door.name = "door";
  doorPivot.add(door);
  group.add(doorPivot);

  // Простая дверная ручка на свободном (левом) краю двери.
  const handleGroup = new THREE.Group();
  const handleBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.12, 12),
    new THREE.MeshStandardMaterial({ color: "#dcdcdc", metalness: 0.8, roughness: 0.25 })
  );
  handleBase.rotation.z = Math.PI / 2;
  handleGroup.add(handleBase);
  const handleKnob = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 12, 12),
    new THREE.MeshStandardMaterial({ color: "#f5f5f5", metalness: 0.9, roughness: 0.2 })
  );
  handleKnob.position.set(0.08, 0, 0);
  handleGroup.add(handleKnob);
  handleGroup.position.set(-BUILDING_LAYOUT.door.width / 2 + 0.08, 0, (doorGeo as any).parameters.depth / 2 + 0.02);
  door.add(handleGroup);

  // Лестница к двери: несколько текстурированных ступеней + перила.
  const stepCanvas = document.createElement("canvas");
  stepCanvas.width = 256;
  stepCanvas.height = 128;
  const stepCtx = stepCanvas.getContext("2d");
  let stepTex: THREE.Texture | undefined;
  if (stepCtx) {
    stepCtx.fillStyle = "#c9c9c5";
    stepCtx.fillRect(0, 0, stepCanvas.width, stepCanvas.height);

    const grad = stepCtx.createLinearGradient(0, 0, 0, stepCanvas.height);
    grad.addColorStop(0, "rgba(255,255,255,0.25)");
    grad.addColorStop(1, "rgba(0,0,0,0.18)");
    stepCtx.fillStyle = grad;
    stepCtx.fillRect(0, 0, stepCanvas.width, stepCanvas.height);

    stepCtx.strokeStyle = "rgba(0,0,0,0.25)";
    stepCtx.lineWidth = 2;
    for (let y = 22; y < stepCanvas.height; y += 24) {
      stepCtx.beginPath();
      stepCtx.moveTo(0, y + Math.random() * 3);
      stepCtx.lineTo(stepCanvas.width, y + Math.random() * 3);
      stepCtx.stroke();
    }

    stepTex = new THREE.CanvasTexture(stepCanvas);
    stepTex.wrapS = stepTex.wrapT = THREE.RepeatWrapping;
    stepTex.repeat.set(2, 1);
  }

  const stepMat = new THREE.MeshStandardMaterial({
    color: "#d0d0cc",
    roughness: 0.9,
    metalness: 0.02,
    map: stepTex
  });

  const stepWidth = BUILDING_LAYOUT.door.frameWidth + 0.8;
  const stepDepth = 0.55;
  const stepHeight = 0.16;
  const stepsCount = 3;
  const firstStepY = 0.08;
  // Центр верхней ступеньки: прямо перед дверью, чуть отступив, чтобы не врезаться в полотно.
  const doorFrontZ = options.size.z / 2 + BUILDING_LAYOUT.door.outward;
  const topStepCenterZ = doorFrontZ - stepDepth / 2 - 0.04;
  const bottomStepCenterZ = topStepCenterZ + (stepsCount - 1) * (stepDepth - 0.05);

  // Ступеньки: снизу вверх к двери.
  for (let i = 0; i < stepsCount; i += 1) {
    const h = stepHeight;
    const y = firstStepY + i * stepHeight; // чем выше индекс, тем выше ступень
    const z = bottomStepCenterZ - i * (stepDepth - 0.05); // чем выше, тем ближе к двери
    const step = new THREE.Mesh(new THREE.BoxGeometry(stepWidth - i * 0.18, h, stepDepth), stepMat);
    step.position.set(0, y, z);
    step.castShadow = true;
    step.receiveShadow = true;
    group.add(step);
  }

  const railingMat = new THREE.MeshStandardMaterial({
    color: "#c7b18a",
    roughness: 0.5,
    metalness: 0.25
  });
  const postGeo = new THREE.CylinderGeometry(0.05, 0.06, 0.9, 10);

  const makeRailing = (side: -1 | 1) => {
    const railGroup = new THREE.Group();

    const postsCount = stepsCount + 1;
    const zTop = topStepCenterZ - stepDepth / 2;
    const zBottom = bottomStepCenterZ + stepDepth / 2;
    const yBottom = firstStepY + 0.45;
    const yTop = yBottom + stepsCount * stepHeight * 0.6;

    const handrailPoints: THREE.Vector3[] = [];

    for (let i = 0; i < postsCount; i += 1) {
      const post = new THREE.Mesh(postGeo, railingMat);
      const t = i / (postsCount - 1 || 1);
      const z = zBottom + (zTop - zBottom) * t;
      const y = yBottom + (yTop - yBottom) * t;
      post.position.set((stepWidth / 2 + 0.06) * side, y, z);
      post.castShadow = true;
      railGroup.add(post);

      const topY = y + (postGeo.parameters.height as number) / 2;
      handrailPoints.push(new THREE.Vector3((stepWidth / 2 + 0.06) * side, topY, z));
    }

    if (handrailPoints.length >= 2) {
      const curve = new THREE.CatmullRomCurve3(handrailPoints);
      const handrailGeo = new THREE.TubeGeometry(curve, 16, 0.045, 10, false);
      const handrail = new THREE.Mesh(handrailGeo, railingMat);
      handrail.castShadow = true;
      railGroup.add(handrail);
    }

    group.add(railGroup);
  };

  makeRailing(-1);
  makeRailing(1);

  const awning = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.15, 1.4),
    new THREE.MeshStandardMaterial({ color: options.roof, roughness: 0.55, metalness: 0.05 })
  );
  awning.position.set(0, BUILDING_LAYOUT.foundationHeight + 3.55, options.size.z / 2 + 0.85);
  awning.rotation.x = -0.2;
  awning.castShadow = true;
  group.add(awning);

  // Вывеска (например, для банка)
  if (options.label) {
    const makeLabelTexture = (text: string, bg: string, textColor: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.Texture();

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = textColor;
      ctx.font = "bold 64px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // Читаемость: лёгкая тень, чтобы текст было видно на любом фоне.
      ctx.shadowColor = "rgba(0,0,0,0.45)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 3;
      ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.anisotropy = 8;
      return tex;
    };

    const labelTexture = makeLabelTexture(options.label, options.labelBg ?? options.color, options.labelTextColor ?? "#ffffff");

    const signH = 1.4;
    const y = BUILDING_LAYOUT.foundationHeight + options.size.y + 0.85;
    const zOut = 0.31;
    const xOut = 0.31;

    const makeSignMaterial = () =>
      new THREE.MeshStandardMaterial({
        map: labelTexture,
        color: "#ffffff",
        roughness: 0.25,
        metalness: 0.05,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
        side: THREE.FrontSide
      });

    const addSignFront = () => {
      const signW = Math.min(options.size.x * 0.9, 8);
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(signW, signH), makeSignMaterial());

      // По умолчанию вывеска по центру над входом, но для “МЕДСИ” ставим на край, как в реальности.
      const anchor = options.labelAnchor ?? "center";
      const edgePad = 0.35;
      const x =
        anchor === "edgeRight"
          ? options.size.x / 2 - signW / 2 - edgePad
          : anchor === "edgeLeft"
            ? -options.size.x / 2 + signW / 2 + edgePad
            : 0;

      // Крепим на фасад +Z (над входом/парапетом).
      sign.position.set(x, y, options.size.z / 2 + zOut);
      sign.castShadow = true;
      sign.renderOrder = 4;
      group.add(sign);
    };

    const addSignAllSides = () => {
      // Центрируем на остальных стенах, чтобы выглядело ровно со всех сторон.
      const signWFront = Math.min(options.size.x * 0.9, 8);
      const signWSide = Math.min(options.size.z * 0.9, 8);

      // Задний фасад (-Z)
      const back = new THREE.Mesh(new THREE.PlaneGeometry(signWFront, signH), makeSignMaterial());
      back.rotation.y = Math.PI;
      back.position.set(0, y, -options.size.z / 2 - zOut);
      back.castShadow = true;
      back.renderOrder = 4;
      group.add(back);

      // Правая сторона (+X)
      const right = new THREE.Mesh(new THREE.PlaneGeometry(signWSide, signH), makeSignMaterial());
      right.rotation.y = -Math.PI / 2;
      right.position.set(options.size.x / 2 + xOut, y, 0);
      right.castShadow = true;
      right.renderOrder = 4;
      group.add(right);

      // Левая сторона (-X)
      const left = new THREE.Mesh(new THREE.PlaneGeometry(signWSide, signH), makeSignMaterial());
      left.rotation.y = Math.PI / 2;
      left.position.set(-options.size.x / 2 - xOut, y, 0);
      left.castShadow = true;
      left.renderOrder = 4;
      group.add(left);
    };

    // Всегда добавляем “фронтальную” вывеску, а для выбранных зданий — дублируем на остальные стороны.
    addSignFront();
    if (options.labelAllSides) addSignAllSides();
  }

  group.position.set(options.position.x, 0, options.position.z);
  // Делаем pivot двери доступным извне (для анимации открытия).
  (group.userData as { door?: THREE.Object3D }).door = doorPivot;
  return group;
};
