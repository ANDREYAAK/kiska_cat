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
  /** Количество этажей (влияет на высоту, если не задана явно в size.y) */
  floors?: number;
  /** Стороны, на которых нужно скрыть выносы фундамента/крыши для слияния (local coords: +x, -x, +z, -z) */
  hideSides?: ("px" | "nx" | "pz" | "nz")[];
  /** Подтип дома (например, "casa" для Case) */
  houseSubtype?: string;
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
    outward: 0.6, // насколько "вылетает" дверь от стены (+Z)
    frameOutward: 0.45,
    localZOutset: 0.9 // для расчёта тропинки/точки входа
  },
  windows: {
    width: 1.1,
    height: 1.3,
    // "Сетка": шаг по X/Z и высота этажа — легко менять, чтобы добавлять/убирать окна/этажи
    desiredStep: 2.4,
    floorHeight: 2.4,
    // поля от краёв фасада и от крыши
    marginX: 1.2,
    marginTop: 1.1,
    sillFromBase: 1.2,
    doorClearance: 0.6 // запас вокруг дверного проёма, чтобы окна никогда не "сливались" с дверью
  },
  roof: {
    minHeight: 0.7,
    maxHeight: 1.2,
    relative: 0.12
  }
} as const;

/**
 * Creates a procedural roof tile texture
 */
const createRoofTileTexture = (colorStr: string) => {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Fill background
    ctx.fillStyle = colorStr;
    ctx.fillRect(0, 0, 128, 128);

    // Draw tiles pattern
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.lineWidth = 2;

    const rowH = 16;
    const tileW = 16;

    // Rows
    for (let y = 0; y < 128; y += rowH) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(128, y);
      ctx.stroke();

      // Tiles
      const offset = (y / rowH) % 2 === 0 ? 0 : tileW / 2;
      for (let x = offset; x < 128; x += tileW) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + rowH);
        ctx.stroke();
      }

      // Shading for depth
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, y, 128, 4); // Shadow under the previous tile row
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4); // Repeat texture
  return tex;
};

/**
 * Creates a procedural "beaver tail" (rounded/scale-like) roof tile texture
 * Returns a grayscale texture meant to be tinted by material color
 */
const createBeaverTailRoofTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 256, 256);

    const rowH = 32;
    const tileW = 32;

    for (let y = 0; y < 256 + rowH; y += rowH) {
      const offset = (Math.floor(y / rowH) % 2) * (tileW / 2);
      for (let x = -tileW; x < 256 + tileW; x += tileW) {
        const posX = x + offset;
        const posY = y;

        // Draw tile shape
        ctx.beginPath();
        // Top straight part
        ctx.rect(posX + 1, posY, tileW - 2, rowH / 2);
        // Bottom rounded part
        ctx.arc(posX + tileW / 2, posY + rowH / 2, tileW / 2 - 1, 0, Math.PI);

        // Fill with slight grey variation for depth
        ctx.fillStyle = "#f0f0f0";
        ctx.fill();

        // Border - darker and thicker for visibility
        ctx.strokeStyle = "rgba(0,0,0,0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Shading on the bottom of the tile
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.beginPath();
        ctx.arc(posX + tileW / 2, posY + rowH / 2, tileW / 2 - 3, 0, Math.PI);
        ctx.fill();
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
};

/**
 * Создает "Классический магазин" (процедурный)
 * Перенесено из BuildingSystem.ts
 */
const createClassicShop = (options: BuildingOptions) => {
  const group = new THREE.Group();

  // --- COLORS ---
  const wallColor = "#F2E8D5"; // Cream/Beige
  const roofColor = "#8B4513"; // SaddleBrown
  const trimColor = "#FFFFFF";
  const awningGreen = "#2E7D32";
  const awningWhite = "#F5F5F5";

  // TRANSPARENCY for Windows/Doors (Bus style)
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x87CEEB,
    transparent: true,
    opacity: 0.4, // Прозрачность как у автобуса
    roughness: 0.1,
    metalness: 0.1
  });

  // --- DIMENSIONS ---
  const width = 12;
  const depth = 6;
  const groundFloorH = 4;
  const secondFloorH = 3.5;
  const totalWallH = groundFloorH + secondFloorH;

  // 1. MAIN WALLS
  const wallGeo = new THREE.BoxGeometry(width, totalWallH, depth);
  const wallMat = new THREE.MeshStandardMaterial({ color: wallColor });
  const walls = new THREE.Mesh(wallGeo, wallMat);
  walls.position.y = totalWallH / 2;
  walls.traverse(c => { c.castShadow = true; c.receiveShadow = true; });
  group.add(walls);

  // 2. WHITE TRIM (Stepped Profile)
  const trimMat = new THREE.MeshStandardMaterial({ color: trimColor });
  const trimGroup = new THREE.Group();
  trimGroup.position.y = groundFloorH;
  group.add(trimGroup);

  // Main wide strip
  const t1 = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.2, 0.15, depth + 0.2),
    trimMat
  );
  trimGroup.add(t1);

  // Narrower strip above (Stepped effect)
  const t2 = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.1, 0.1, depth + 0.1),
    trimMat
  );
  t2.position.y = 0.125;
  trimGroup.add(t2);

  // 3. ROOF (Neat Hip/Pyramid Roof) with TILES
  const roofHeight = 2.5;
  const overhang = 0.6;
  const roofW = width + overhang * 2;
  const roofD = depth + overhang * 2;

  const roofGeo = new THREE.ConeGeometry(1, 1, 4);
  roofGeo.rotateY(Math.PI / 4);

  // Create tiled texture
  const roofTex = createRoofTileTexture(roofColor);

  const roofMesh = new THREE.Mesh(roofGeo, new THREE.MeshStandardMaterial({
    map: roofTex,
    color: roofColor,
    roughness: 0.8
  }));
  const scX = roofW / Math.sqrt(2);
  const scZ = roofD / Math.sqrt(2);

  roofMesh.scale.set(scX, roofHeight, scZ);
  roofMesh.position.y = totalWallH + roofHeight / 2;
  roofMesh.castShadow = true;
  group.add(roofMesh);

  // 3.1. ROOF BASE TRIM
  const roofTrimGeo = new THREE.BoxGeometry(width + 0.4, 0.4, depth + 0.4);
  const roofTrim = new THREE.Mesh(roofTrimGeo, trimMat);
  roofTrim.position.y = totalWallH - 0.2;
  group.add(roofTrim);

  // 4. WINDOWS (Second Floor) - 3-Element Layout (Window - Door/Balcony - Window)
  const winY = groundFloorH + 1.6; // Center height

  // Layout: 3 positions.
  const sideOffset = 3.5;
  const positions = [-sideOffset, 0, sideOffset]; // x coords

  // Materials
  const frameColor = "#F5F5F5"; // White trim
  const frameMat = new THREE.MeshStandardMaterial({ color: frameColor });

  // Geometry Shared
  // Window: W=1.8, H=2.2
  const wWidth = 1.6;
  const wHeight = 2.4;

  // Door: W=1.6, H=2.8 ?
  const dWidth = 1.6;
  const dHeight = 2.8;

  positions.forEach((xPos, idx) => {
    const isCenter = (idx === 1);

    const groupX = xPos;
    const groupY = winY;
    const groupZ = depth / 2 + 0.05; // On wall

    const elGroup = new THREE.Group();
    elGroup.position.set(groupX, groupY, groupZ);
    group.add(elGroup);

    const curW = isCenter ? dWidth : wWidth;
    const curH = isCenter ? dHeight : wHeight;

    // 1. FRAME (Cornice, Sides, Sill)
    // Top Cornice
    const cornW = curW + 0.4;
    const cornH = 0.15;
    const cornD = 0.1;
    const cornice = new THREE.Mesh(new THREE.BoxGeometry(cornW, cornH, cornD), frameMat);
    cornice.position.set(0, curH / 2 + cornH / 2, 0);
    cornice.castShadow = true;
    elGroup.add(cornice);

    // Bottom Sill (Refined - smaller/thinner to avoid "block" look)
    const sillW = curW + 0.1;
    const sillH = 0.05;
    const sillD = 0.05;
    const sill = new THREE.Mesh(new THREE.BoxGeometry(sillW, sillH, sillD), frameMat);
    sill.position.set(0, -curH / 2 - sillH / 2, 0);
    elGroup.add(sill);

    // Side Frames
    const sideW = 0.1;
    const sideD = 0.05;
    const sidesH = curH;
    const leftFrame = new THREE.Mesh(new THREE.BoxGeometry(sideW, sidesH, sideD), frameMat);
    leftFrame.position.set(-curW / 2 + sideW / 2, 0, 0);
    elGroup.add(leftFrame);

    const rightFrame = new THREE.Mesh(new THREE.BoxGeometry(sideW, sidesH, sideD), frameMat);
    rightFrame.position.set(curW / 2 - sideW / 2, 0, 0);
    elGroup.add(rightFrame);

    // 2. INNER CONTENT (Glass)
    if (!isCenter) {
      // Window: Transparent Glass
      const paneW = curW - sideW * 2;
      const paneH = curH;
      const inner = new THREE.Mesh(new THREE.BoxGeometry(paneW, paneH, 0.02), glassMat);
      inner.position.z = -0.01;
      elGroup.add(inner);

      // Vertical divider
      const div = new THREE.Mesh(new THREE.BoxGeometry(0.04, paneH, 0.04), frameMat);
      div.position.z = 0;
      elGroup.add(div);
    } else {
      // Door: Transparent Glass
      const paneW = curW - sideW * 2;
      const paneH = curH;
      const inner = new THREE.Mesh(new THREE.BoxGeometry(paneW, paneH, 0.02), glassMat);
      inner.position.z = -0.01;
      elGroup.add(inner);

      // Door Divider (Horizontal)
      const hDiv = new THREE.Mesh(new THREE.BoxGeometry(paneW, 0.05, 0.04), frameMat);
      hDiv.position.y = 0.2;
      elGroup.add(hDiv);
    }
  });

  // 5. BALCONY (Center Only)
  const balcW = 2.0;
  const balcH = 0.8;
  const balcD = 1.0;
  const balcY = groundFloorH + 0.2;

  const balcGroup = new THREE.Group();
  balcGroup.position.set(0, balcY, depth / 2 + 0.1);
  group.add(balcGroup);

  const balcMat = new THREE.MeshStandardMaterial({ color: "#E0D0B8" }); // Beige

  // Floor
  const floor = new THREE.Mesh(new THREE.BoxGeometry(balcW, 0.1, balcD), balcMat);
  floor.position.z = balcD / 2;
  floor.receiveShadow = true;
  balcGroup.add(floor);

  // Front Wall (Railing) - Simplified to look cleaner
  const wallThick = 0.1;
  const botH = 0.2;
  const botWall = new THREE.Mesh(new THREE.BoxGeometry(balcW, botH, wallThick), balcMat);
  botWall.position.set(0, botH / 2, balcD - wallThick / 2);
  balcGroup.add(botWall);

  const topH = 0.15;
  const topWall = new THREE.Mesh(new THREE.BoxGeometry(balcW, topH, wallThick), balcMat);
  topWall.position.set(0, balcH - topH / 2, balcD - wallThick / 2);
  balcGroup.add(topWall);

  const numPillars = 3; // Reduced pillars for cleaner look
  const pillarW = 0.15;
  const holeH = balcH - botH - topH;
  for (let k = 0; k < numPillars; k++) {
    const t = k / (numPillars - 1);
    const px = -balcW / 2 + pillarW / 2 + t * (balcW - pillarW);
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(pillarW, holeH, wallThick), balcMat);
    pillar.position.set(px, botH + holeH / 2, balcD - wallThick / 2);
    balcGroup.add(pillar);
  }

  const sideGeo = new THREE.BoxGeometry(wallThick, balcH, balcD - wallThick);
  const leftSide = new THREE.Mesh(sideGeo, balcMat);
  leftSide.position.set(-balcW / 2 + wallThick / 2, balcH / 2, balcD / 2 - wallThick / 2);
  balcGroup.add(leftSide);

  const rightSide = new THREE.Mesh(sideGeo, balcMat);
  rightSide.position.set(balcW / 2 - wallThick / 2, balcH / 2, balcD / 2 - wallThick / 2);
  balcGroup.add(rightSide);

  // 5.5. CURVED AWNING (Left Shop Window)
  // Re-implemented using ExtrudeGeometry for smooth curved stripes
  const awningW = 4.5; // Slightly wider than window
  const awningRadius = 1.0;
  const awningY = groundFloorH + 0.3;
  const shopWinX = -3;

  const awningGroup = new THREE.Group();
  awningGroup.position.set(shopWinX, awningY, depth / 2);
  group.add(awningGroup);

  const numStripes = 10;
  const stripeW = awningW / numStripes;

  const greenMat = new THREE.MeshStandardMaterial({ color: awningGreen, side: THREE.DoubleSide });
  const whiteMat = new THREE.MeshStandardMaterial({ color: awningWhite, side: THREE.DoubleSide });

  // Define Profile Shape (Quarter Circle Down)
  const shape = new THREE.Shape();
  const R = awningRadius;
  const thick = 0.05;

  // Arc from top (0,0) to front-down
  shape.absarc(0, -R, R, Math.PI / 2, 0, true);
  shape.lineTo(R - thick, -R);
  shape.absarc(0, -R, R - thick, 0, Math.PI / 2, false);
  shape.lineTo(0, 0);

  const extrudeSettings = {
    steps: 1,
    depth: stripeW,
    bevelEnabled: false
  };

  const stripeGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  // Center the geometry depth-wise for easier placement if needed, 
  // but here it simply extrudes along +Z (which corresponds to our width X after rotation)

  // We place stripes along X.
  // Extrude creates depth Z. We rotate geometry so it aligns with X.
  stripeGeo.rotateY(-Math.PI / 2);
  // Now "depth" is along X. "Shape" is in YZ plane.

  // Start from right side of the awning area
  const startX = awningW / 2;

  for (let i = 0; i < numStripes; i++) {
    const mat = i % 2 === 0 ? greenMat : whiteMat;
    const stripe = new THREE.Mesh(stripeGeo, mat);

    // Position: i * stripeW shift
    const xOffset = startX - (i * stripeW);
    // The geometry is extruded from 0 to -stripeW (due to rotation) or 0 to +stripeW?
    // Extrude default is +Z. Rotated -90deg Y => +X.
    // So it goes from 0 to +stripeW.

    // We want to place them side by side.
    stripe.position.set(xOffset, 0, 0);
    stripe.castShadow = true;
    awningGroup.add(stripe);
  }

  // 6. SHOP WINDOW (Glass) - Left side
  const shopGroup = new THREE.Group();
  shopGroup.position.set(shopWinX, 1.4, depth / 2 + 0.05);
  group.add(shopGroup);

  const frameMatGrey = new THREE.MeshStandardMaterial({ color: "#9E9E9E" });
  const sTop = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.2, 0.1), frameMatGrey);
  sTop.position.y = 1.35;
  shopGroup.add(sTop);

  const sBot = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.2, 0.15), frameMatGrey);
  sBot.position.y = -1.35;
  shopGroup.add(sBot);

  // Glass
  const shopGlass = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.5, 0.05), glassMat);
  shopGlass.position.z = -0.02;
  shopGroup.add(shopGlass);

  // Bench (Outside)
  const benchGroup = new THREE.Group();
  benchGroup.position.set(-3, 0.3, depth / 2 + 0.6);
  group.add(benchGroup);
  const benchSeat = new THREE.Mesh(new THREE.BoxGeometry(3, 0.1, 0.4), new THREE.MeshStandardMaterial({ color: "#D7CCC8" }));
  benchGroup.add(benchSeat);
  const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 0.3), new THREE.MeshStandardMaterial({ color: "#5D4037" }));
  leg1.position.set(-1.2, -0.15, 0);
  benchGroup.add(leg1);
  const leg2 = leg1.clone();
  leg2.position.set(1.2, -0.15, 0);
  benchGroup.add(leg2);


  // 7. GARAGE DOORS (Right side)
  const garageGroup = new THREE.Group();
  garageGroup.position.set(3, 1.4, depth / 2 + 0.05);
  group.add(garageGroup);

  const garFrame = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.7, 0.1), new THREE.MeshStandardMaterial({ color: "#424242" }));
  garageGroup.add(garFrame);

  // Doors - metal grey
  const garDoorL = new THREE.Mesh(new THREE.BoxGeometry(1.9, 2.5, 0.05), new THREE.MeshStandardMaterial({ color: "#90A4AE" }));
  garDoorL.position.set(-1.0, 0, 0.05);
  garageGroup.add(garDoorL);

  const garDoorR = new THREE.Mesh(new THREE.BoxGeometry(1.9, 2.5, 0.05), new THREE.MeshStandardMaterial({ color: "#90A4AE" }));
  garDoorR.position.set(1.0, 0, 0.05);
  garageGroup.add(garDoorR);

  // Lanterns - REMOVED per user feedback "extra blocks"? (Or to clean up)
  // Pots - REMOVED per user feedback "extra blocks"

  // Quoins (Corner stones)
  const quoinMat = new THREE.MeshStandardMaterial({ color: "#FFFFFF" });
  const qW = 0.4;
  const qH = 0.3;
  const qD = 0.45; // slightly more than wall corner
  for (let yQ = 0.5; yQ < totalWallH; yQ += 0.6) {
    const q = new THREE.Mesh(new THREE.BoxGeometry(qW, qH, 0.1), quoinMat);
    // Front Left Corner
    q.position.set(-width / 2 + qW / 2, yQ, depth / 2 + 0.05); // Face
    group.add(q);

    const q2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, qH, qW), quoinMat);
    q2.position.set(-width / 2 - 0.05, yQ, depth / 2 - qW / 2); // Side
    group.add(q2);

    // Front Right Corner
    const q3 = q.clone();
    q3.position.set(width / 2 - qW / 2, yQ, depth / 2 + 0.05);
    group.add(q3);

    const q4 = q2.clone();
    q4.position.set(width / 2 + 0.05, yQ, depth / 2 - qW / 2);
    group.add(q4);
  }

  group.position.set(options.position.x, 0, options.position.z);
  group.rotation.y = options.rotation || 0;
  return group;
};


/**
 * Создает магазин Case на основе оригинальной GLB модели "2nd__low_poly_shop"
 * ВСЕ размеры и позиции взяты ТОЧНО из GLTF файла (accessors min/max и node matrices)
 */
const createCaseBuilding = (options: BuildingOptions, textures: BuildingTextures) => {
  const group = new THREE.Group();
  group.rotation.y = options.rotation ?? 0;

  // МАСШТАБ: В GLTF модель масштабирована на 0.01 в корневом node
  const POS_SCALE = 0.01; // Масштаб для позиций из node matrices
  const SIZE_SCALE = 1.0; // Размеры из accessors используем напрямую (они уже в правильных единицах)

  // ========== ТОЧНЫЕ РАЗМЕРЫ ИЗ GLTF ACCESSORS ==========

  // ACCESSOR 0 (base_vasi_0): min [-1, -1, -1], max [1, 1, 1.077]
  const baseSize = { w: 2.0 * SIZE_SCALE, h: 2.077 * SIZE_SCALE, d: 2.0 * SIZE_SCALE };

  // ACCESSOR 4 (porta_arancio_0): min [-1.9, -2.7, 1.4], max [1.9, 2.65, 1.8]
  const doorSize = { w: 3.8 * SIZE_SCALE, h: 5.35 * SIZE_SCALE, d: 0.4 * SIZE_SCALE };

  // ACCESSOR 8 (tetto_arancio_0): min [-1.75, -4.96, -1.34], max [1.75, -0.013, 1.36]
  const roofSize = { w: 3.5 * SIZE_SCALE, h: 4.947 * SIZE_SCALE, d: 2.7 * SIZE_SCALE };
  const roofHeight = 0.3 * SIZE_SCALE; // Высота крыши

  // ACCESSOR 12 (casa base_casa base.001_0): min [-1.75, -4.96, -1.34], max [1.75, -0.013, 1.36]
  const wallSize = { w: 3.5 * SIZE_SCALE, h: 4.947 * SIZE_SCALE, d: 2.7 * SIZE_SCALE };

  // ACCESSOR 16 (casa base_arancio_0): min [-1.613, -4.96, -1.34], max [1.75, -0.013, 0.839]
  const orangeDecoSize = { w: 3.363 * SIZE_SCALE, h: 4.947 * SIZE_SCALE, d: 2.179 * SIZE_SCALE };

  // ACCESSOR 20 (base.002_base condizionatore.001_0): min [-0.372, -0.428, -0.014], max [0.372, 0.428, 0.014]
  const acSize = { w: 0.744 * SIZE_SCALE, h: 0.856 * SIZE_SCALE, d: 0.028 * SIZE_SCALE };

  // ACCESSOR 28 (cassetta.001): min [-0.298, -0.352, -0.162], max [0.298, 0.352, 0.162]
  const cassettaSize = { w: 0.596 * SIZE_SCALE, h: 0.704 * SIZE_SCALE, d: 0.324 * SIZE_SCALE };

  const tubeRadius = 0.04 * SIZE_SCALE; // Радиус трубы
  const tubeHeight = 0.6 * SIZE_SCALE; // Высота трубы

  // ACCESSOR 40 (Cylinder_nero.002_0): min [-0.172, -1.792, 0.136], max [0.172, 0.172, 0.136]
  const fanSize = { r: 0.172 * SIZE_SCALE, h: 0.04 * SIZE_SCALE };

  // ACCESSOR 44 (tenda frontale.001): min [-0.235, -1.855, -0.216], max [0.235, 0.352, 0.168]
  const mainAwningSize = { w: 0.47 * SIZE_SCALE, h: 2.207 * SIZE_SCALE, d: 0.384 * SIZE_SCALE };

  // ACCESSOR 52 (tenda frontale piccola): min [-0.192, -0.192, -0.011], max [0.191, 0.191, 0.011]
  const smallAwningSize = { w: 0.383 * SIZE_SCALE, h: 0.383 * SIZE_SCALE, d: 0.022 * SIZE_SCALE };

  // ACCESSOR 60 (vetri porta_vetri_0): min [-0.264, 0.286, -0.113], max [0.264, 0.286, 0.113]
  const doorGlassSize = { w: 0.528 * SIZE_SCALE, h: 0.0 * SIZE_SCALE, d: 0.226 * SIZE_SCALE };

  // ACCESSOR 64 (vetro dx_vetri_0): min [-0.143, -0.888, -0.152], max [0.599, 0.942, 0.383]
  const rightWindowSize = { w: 0.742 * SIZE_SCALE, h: 1.83 * SIZE_SCALE, d: 0.535 * SIZE_SCALE };

  // ACCESSOR 68 (vetro facciata sxx_vetri_0): min [-1.75, -4.96, -1.34], max [1.75, -0.013, 1.36]
  const backWindowSize = { w: 3.5 * SIZE_SCALE, h: 4.947 * SIZE_SCALE, d: 2.7 * SIZE_SCALE };

  // ACCESSOR 72 (vetro sx_vetri_0): min [-0.143, -0.888, -0.152], max [0.599, 0.942, 0.383]
  const leftWindowSize = { w: 0.742 * SIZE_SCALE, h: 1.83 * SIZE_SCALE, d: 0.535 * SIZE_SCALE };

  // ACCESSOR 76 (piante_vasi_0): min [-0.235, -1.855, -0.216], max [0.235, 0.352, 0.168]
  const plantPotSize = { w: 0.47 * SIZE_SCALE, h: 2.207 * SIZE_SCALE, d: 0.384 * SIZE_SCALE };
  const potRadius = 0.22 * SIZE_SCALE;
  const potHeight = 0.4 * SIZE_SCALE;

  // ACCESSOR 84 (cespugli_foglie_0): min [-0.172, -1.792, 0.136], max [0.172, 0.172, 0.136]
  const bushSize = { r: 0.172 * SIZE_SCALE, h: 1.964 * SIZE_SCALE };

  // ========== ТОЧНЫЕ ПОЗИЦИИ ИЗ GLTF NODE MATRICES ==========
  // (последние 3 значения матрицы - позиция x, y, z)

  const basePos = { x: 0, y: 10.522814750671387 * POS_SCALE, z: 2.9771993160247803 * POS_SCALE };
  const doorPos = { x: -197.67088317871094 * POS_SCALE, y: 107.45271301269531 * POS_SCALE, z: -42.98966979980469 * POS_SCALE };
  const roofPos = { x: 0, y: 151.0302276611328 * POS_SCALE, z: 0 };
  const wallPos = { x: 0, y: 154.68421936035156 * POS_SCALE, z: -245.9105987548828 * POS_SCALE };
  const acPos = { x: 109.95315551757813 * POS_SCALE, y: 292.468505859375 * POS_SCALE, z: -135.00799560546875 * POS_SCALE };
  const cassettaPos = { x: 109.95315551757813 * POS_SCALE, y: 310.10943603515625 * POS_SCALE, z: -135.00799560546875 * POS_SCALE };
  const tubePos = { x: 121.94667053222656 * POS_SCALE, y: 317.60003662109375 * POS_SCALE, z: -195.26766967773438 * POS_SCALE };
  const fanPos = { x: 111.13909149169922 * POS_SCALE, y: 327.6739807128906 * POS_SCALE, z: -123.80570220947266 * POS_SCALE };
  const mainAwningPos = { x: -4.563438892364502 * POS_SCALE, y: 214.87197875976563 * POS_SCALE, z: -304.6491394042969 * POS_SCALE };
  const smallAwningPos = { x: -140.32156372070313 * POS_SCALE, y: 233.71954345703125 * POS_SCALE, z: 287.75238037109375 * POS_SCALE };
  const doorGlassPos = { x: -197.67088317871094 * POS_SCALE, y: 107.45271301269531 * POS_SCALE, z: -42.98966979980469 * POS_SCALE };
  const rightWindowPos = { x: 0, y: 160.52281188964844 * POS_SCALE, z: 0 };
  const backWindowPos = { x: 0, y: 154.68421936035156 * POS_SCALE, z: -245.9105987548828 * POS_SCALE };
  const leftWindowPos = { x: 0, y: 160.52281188964844 * POS_SCALE, z: 0 };
  const plantPos = { x: -214.2523956298828 * POS_SCALE, y: 21.484310150146484 * POS_SCALE, z: -91.54924011230469 * POS_SCALE };
  const bushPos = { x: -214.2523956298828 * POS_SCALE, y: 21.484310150146484 * POS_SCALE, z: -91.54924011230469 * POS_SCALE };

  // ========== МАТЕРИАЛЫ ИЗ GLTF ==========
  const wallColor = "#d89c6a"; // RGB(0.846, 0.612, 0.418) - бежевый/кремовый
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: wallColor,
    map: textures.wall,
    roughness: 0.8,
    metalness: 0.0
  });

  const orangeColor = "#ed1401"; // RGB(0.931, 0.079, 0.006) - ярко-оранжевый
  const orangeMaterial = new THREE.MeshStandardMaterial({
    color: orangeColor,
    roughness: 0.8,
    metalness: 0.0
  });

  const glassColor = new THREE.Color(0.204, 0.418, 0.568);
  const glassMaterial = new THREE.MeshStandardMaterial({
    color: glassColor,
    transparent: true,
    opacity: 0.48,
    roughness: 0.8,
    metalness: 0.0
  });

  const acColor = "#24201c"; // RGB(0.144, 0.128, 0.113)
  const acMaterial = new THREE.MeshStandardMaterial({
    color: acColor,
    roughness: 0.8,
    metalness: 0.0
  });

  const potColor = "#37271a"; // RGB(0.218, 0.154, 0.103)
  const potMaterial = new THREE.MeshStandardMaterial({
    color: potColor,
    roughness: 0.98,
    metalness: 0.0
  });

  const plantColor = "#059625"; // RGB(0.020, 0.590, 0.037)
  const plantMaterial = new THREE.MeshStandardMaterial({
    color: plantColor,
    roughness: 0.8,
    metalness: 0.0
  });

  const tubeColor = "#e1bf00"; // RGB(0.883, 0.749, 0.001)
  const tubeMaterial = new THREE.MeshStandardMaterial({
    color: tubeColor,
    roughness: 0.8,
    metalness: 0.0
  });

  const whiteColor = "#cccccc"; // RGB(0.8, 0.8, 0.8) - для навесов

  // ========== СОЗДАНИЕ ЭЛЕМЕНТОВ ==========

  // --- Основание (base) ---
  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(baseSize.w, 0.1 * SIZE_SCALE, baseSize.d),
    new THREE.MeshStandardMaterial({ color: "#7f8c8d", roughness: 0.9, metalness: 0.02 })
  );
  foundation.position.set(basePos.x, basePos.y + 0.05 * SIZE_SCALE, basePos.z);
  foundation.castShadow = true;
  foundation.receiveShadow = true;
  group.add(foundation);

  // --- Основной корпус (casa base) ---
  const mainWalls = new THREE.Mesh(
    new THREE.BoxGeometry(wallSize.w, wallSize.h, wallSize.d),
    wallMaterial
  );
  mainWalls.position.set(wallPos.x, wallPos.y + wallSize.h / 2, wallPos.z);
  mainWalls.castShadow = true;
  mainWalls.receiveShadow = true;
  group.add(mainWalls);

  // Оранжевые декоративные элементы (casa base_arancio)
  const orangeDeco = new THREE.Mesh(
    new THREE.BoxGeometry(orangeDecoSize.w, orangeDecoSize.h, orangeDecoSize.d),
    orangeMaterial
  );
  orangeDeco.position.set(wallPos.x, wallPos.y + orangeDecoSize.h / 2, wallPos.z);
  orangeDeco.castShadow = true;
  group.add(orangeDeco);

  // --- Дверь (porta) ---
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(doorSize.w, doorSize.h, doorSize.d),
    orangeMaterial
  );
  door.position.set(doorPos.x, doorPos.y + doorSize.h / 2, doorPos.z);
  door.castShadow = true;
  group.add(door);

  // Стекло в двери (vetri porta)
  const doorGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(doorGlassSize.w, doorGlassSize.d),
    glassMaterial
  );
  doorGlass.position.set(doorGlassPos.x, doorGlassPos.y + doorSize.h / 2, doorGlassPos.z + doorSize.d / 2 + 0.01);
  group.add(doorGlass);

  // --- Крыша (tetto) ---
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(roofSize.w, roofHeight, roofSize.d),
    orangeMaterial
  );
  roof.position.set(roofPos.x, roofPos.y + roofHeight / 2, roofPos.z);
  roof.castShadow = true;
  roof.receiveShadow = true;
  group.add(roof);

  // --- Окна ---
  // Правое окно (vetro dx) - позиция из node: (0, 160.52, 0)
  const rightWindow = new THREE.Mesh(
    new THREE.PlaneGeometry(rightWindowSize.w, rightWindowSize.h),
    glassMaterial
  );
  rightWindow.position.set(rightWindowPos.x, rightWindowPos.y + rightWindowSize.h / 2, rightWindowPos.z);
  group.add(rightWindow);

  // Левое окно (vetro sx) - та же позиция что и правое
  const leftWindow = new THREE.Mesh(
    new THREE.PlaneGeometry(leftWindowSize.w, leftWindowSize.h),
    glassMaterial
  );
  leftWindow.position.set(-rightWindowPos.x, leftWindowPos.y + leftWindowSize.h / 2, leftWindowPos.z);
  group.add(leftWindow);

  // Заднее окно (vetro facciata sxx) - та же позиция что и casa base
  const backWindow = new THREE.Mesh(
    new THREE.PlaneGeometry(backWindowSize.w, backWindowSize.h),
    glassMaterial
  );
  backWindow.rotation.y = Math.PI;
  backWindow.position.set(backWindowPos.x, backWindowPos.y + backWindowSize.h / 2, backWindowPos.z);
  group.add(backWindow);

  // --- Навесы (tenda) ---
  // Большой навес (tenda frontale.001) - белый с оранжевыми полосками
  const awningCanvas = document.createElement("canvas");
  awningCanvas.width = 128;
  awningCanvas.height = 32;
  const awningCtx = awningCanvas.getContext("2d");
  if (awningCtx) {
    awningCtx.fillStyle = whiteColor;
    awningCtx.fillRect(0, 0, 128, 32);
    awningCtx.fillStyle = orangeColor;
    for (let i = 0; i < 8; i++) {
      awningCtx.fillRect(i * 16, 0, 8, 32);
    }
  }
  const awningTexture = new THREE.CanvasTexture(awningCanvas);
  const awningMat = new THREE.MeshStandardMaterial({
    map: awningTexture,
    roughness: 0.82,
    metalness: 0.0
  });

  const mainAwning = new THREE.Mesh(
    new THREE.BoxGeometry(mainAwningSize.w, mainAwningSize.h, mainAwningSize.d),
    awningMat
  );
  mainAwning.position.set(mainAwningPos.x, mainAwningPos.y + mainAwningSize.h / 2, mainAwningPos.z);
  mainAwning.castShadow = true;
  group.add(mainAwning);

  // Маленький навес (tenda frontale piccola)
  const smallAwning = new THREE.Mesh(
    new THREE.BoxGeometry(smallAwningSize.w, smallAwningSize.h, smallAwningSize.d),
    awningMat
  );
  smallAwning.position.set(smallAwningPos.x, smallAwningPos.y + smallAwningSize.h / 2, smallAwningPos.z);
  smallAwning.castShadow = true;
  group.add(smallAwning);

  // --- Клумбы (piante) ---
  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(potRadius, potRadius * 0.9, potHeight, 8),
    potMaterial
  );
  pot.position.set(plantPos.x, plantPos.y + potHeight / 2, plantPos.z);
  pot.castShadow = true;
  group.add(pot);

  const plant = new THREE.Mesh(
    new THREE.ConeGeometry(plantPotSize.w / 2, plantPotSize.h, 8),
    plantMaterial
  );
  plant.position.set(plantPos.x, plantPos.y + potHeight + plantPotSize.h / 2, plantPos.z);
  plant.castShadow = true;
  group.add(plant);

  // --- Кусты (cespugli) ---
  const bush = new THREE.Mesh(
    new THREE.SphereGeometry(bushSize.r, 8, 8),
    plantMaterial
  );
  bush.position.set(bushPos.x, bushPos.y + bushSize.h / 2, bushPos.z);
  bush.scale.set(1, bushSize.h / (bushSize.r * 2), 1);
  bush.castShadow = true;
  group.add(bush);

  // --- Кондиционер (base.002) ---
  const ac = new THREE.Mesh(
    new THREE.BoxGeometry(acSize.w, acSize.h, acSize.d),
    acMaterial
  );
  ac.position.set(acPos.x, acPos.y + acSize.h / 2, acPos.z);
  ac.castShadow = true;
  group.add(ac);

  // Вентилятор (Cylinder_nero.002)
  const fan = new THREE.Mesh(
    new THREE.CylinderGeometry(fanSize.r, fanSize.r, fanSize.h, 16),
    new THREE.MeshStandardMaterial({ color: "#000000", roughness: 0.8, metalness: 0.0 })
  );
  fan.position.set(fanPos.x, fanPos.y, fanPos.z);
  fan.rotation.x = Math.PI / 2;
  fan.castShadow = true;
  group.add(fan);

  // Труба (tubo.001)
  const tube = new THREE.Mesh(
    new THREE.CylinderGeometry(tubeRadius, tubeRadius, tubeHeight, 8),
    tubeMaterial
  );
  tube.position.set(tubePos.x, tubePos.y + tubeHeight / 2, tubePos.z);
  tube.rotation.z = Math.PI / 6;
  tube.castShadow = true;
  group.add(tube);

  // Коробка (cassetta.001) - зеленая с оранжевой крышкой
  const cassetta = new THREE.Mesh(
    new THREE.BoxGeometry(cassettaSize.w, cassettaSize.h, cassettaSize.d),
    plantMaterial
  );
  cassetta.position.set(cassettaPos.x, cassettaPos.y + cassettaSize.h / 2, cassettaPos.z);
  cassetta.castShadow = true;
  group.add(cassetta);

  const cassettaLid = new THREE.Mesh(
    new THREE.BoxGeometry(cassettaSize.w * 1.1, 0.1 * SIZE_SCALE, cassettaSize.d * 1.1),
    orangeMaterial
  );
  cassettaLid.position.set(cassettaPos.x, cassettaPos.y + cassettaSize.h, cassettaPos.z);
  cassettaLid.castShadow = true;
  group.add(cassettaLid);

  group.position.set(options.position.x, 0, options.position.z);
  return group;
};

/**
 * Создает "Жилой дом" (высокий, красно-коричневый, с лифтовой шахтой)
 */
const createResidentialBuilding = (options: BuildingOptions) => {
  const group = new THREE.Group();

  // --- COLORS ---
  // --- COLORS ---
  const wallColor = options.color || "#A0522D"; // Sienna / Reddish Brown
  const roofColor = "#cccccc"; // Light Gray concrete
  const trimColor = "#ffffff"; // White cornice
  const glassColor = 0x87CEEB; // SkyBlue

  // TRANSPARENCY for Windows/Doors
  const glassMat = new THREE.MeshStandardMaterial({
    color: glassColor,
    transparent: true,
    opacity: 0.4,
    roughness: 0.1,
    metalness: 0.1
  });

  const wallMat = new THREE.MeshStandardMaterial({ color: wallColor });
  const trimMat = new THREE.MeshStandardMaterial({ color: trimColor });
  const roofMat = new THREE.MeshStandardMaterial({ color: roofColor });
  const frameMat = new THREE.MeshStandardMaterial({ color: "#dddddd" });
  const metalMat = new THREE.MeshStandardMaterial({ color: "#777777", metalness: 0.5, roughness: 0.5 });

  // --- DIMENSIONS ---
  // Default sizes if not provided (though usually passed from BuildingSystem)
  // We want it tall.
  const width = options.size.x || 8;
  const depth = options.size.z || 8;
  const floors = options.floors || 5;

  const floorHeight = 3.0;
  const groundFloorH = 4.0;
  const totalWallH = groundFloorH + (floors * floorHeight);

  // 1. MAIN BODY
  const bodyGeo = new THREE.BoxGeometry(width, totalWallH, depth);
  const body = new THREE.Mesh(bodyGeo, wallMat);
  body.position.y = totalWallH / 2;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // 2. ROOF (Cornice + Flat Roof)
  // White Cornice
  const corniceH = 0.5;
  const corniceOverhang = 0.4;
  const cornice = new THREE.Mesh(
    new THREE.BoxGeometry(width + corniceOverhang * 2, corniceH, depth + corniceOverhang * 2),
    trimMat
  );
  cornice.position.y = totalWallH + corniceH / 2;
  cornice.castShadow = true;
  group.add(cornice);

  // Flat Roof Top
  const roofH = 0.2;
  const roofTop = new THREE.Mesh(
    new THREE.BoxGeometry(width + corniceOverhang * 2 - 0.2, roofH, depth + corniceOverhang * 2 - 0.2),
    roofMat
  );
  roofTop.position.y = totalWallH + corniceH + roofH / 2;
  roofTop.receiveShadow = true;
  group.add(roofTop);

  // 3. ELEVATOR SHAFT (on roof)
  const shaftW = 1.4;
  const shaftD = 1.4;
  const shaftH = 0.8;
  // Position slightly offset? or center? Screenshot shows it quite prominent.
  // Let's put it slightly offset to the back-right or user preference? Center is safe.
  const shaft = new THREE.Mesh(
    new THREE.BoxGeometry(shaftW, shaftH, shaftD),
    new THREE.MeshStandardMaterial({ color: "#999999" }) // Darker gray
  );
  shaft.position.y = totalWallH + corniceH + roofH + shaftH / 2;
  shaft.position.x = width / 4;
  shaft.position.z = depth / 4;
  shaft.castShadow = true;
  group.add(shaft);

  // Add some details to shaft (vents or dish)
  // Satellite Dish
  const dishSupport = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 0.5),
    metalMat
  );
  dishSupport.position.set(0, shaftH / 2 + 0.25, 0);
  dishSupport.rotation.z = -Math.PI / 6;
  shaft.add(dishSupport);

  const dishGeo = new THREE.SphereGeometry(0.6, 16, 8, 0, Math.PI * 2, 0, 0.6); // Part of sphere
  const dish = new THREE.Mesh(dishGeo, new THREE.MeshStandardMaterial({ color: "#eeeeee", side: THREE.DoubleSide }));
  dish.rotation.x = -Math.PI / 2;
  dish.position.y = 0.4;
  dishSupport.add(dish);

  // 4. WINDOWS
  const winW = 1.2;
  const winH = 1.8;
  const winGapX = 0.8;

  const createWindow = () => {
    const wg = new THREE.Group();
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(winW, winH), glassMat);
    glass.position.z = 0.02; // flush
    wg.add(glass);

    const sill = new THREE.Mesh(new THREE.BoxGeometry(winW + 0.1, 0.1, 0.1), frameMat);
    sill.position.y = -winH / 2;
    wg.add(sill);

    const topFrame = new THREE.Mesh(new THREE.BoxGeometry(winW + 0.1, 0.1, 0.05), frameMat);
    topFrame.position.y = winH / 2;
    wg.add(topFrame);

    return wg;
  };

  // Loop for all 4 sides
  const sides = [
    { angle: 0, w: width }, // Front
    { angle: Math.PI, w: width }, // Back
    { angle: Math.PI / 2, w: depth }, // Right
    { angle: -Math.PI / 2, w: depth } // Left
  ];

  sides.forEach(side => {
    const sideGroup = new THREE.Group();
    sideGroup.rotation.y = side.angle;

    const faceW = side.w;
    const numWin = Math.floor((faceW - 2.0) / (winW + winGapX));

    if (numWin > 0) {
      const totalWinW = numWin * winW + (numWin - 1) * winGapX;
      const startX = -totalWinW / 2 + winW / 2;

      for (let f = 0; f < floors; f++) {
        const y = groundFloorH + f * floorHeight + floorHeight / 2 - 0.5; // Centered roughly

        for (let i = 0; i < numWin; i++) {
          const x = startX + i * (winW + winGapX);
          const w = createWindow();

          // Distance from center is always the perpendicular dimension / 2.
          // For a box of w,d:
          // Front (0): dist = d/2
          // Back (PI): dist = d/2
          // Right (PI/2): dist = w/2
          // Left (-PI/2): dist = w/2

          const dist = (Math.abs(side.angle) < 0.1 || Math.abs(side.angle - Math.PI) < 0.1) ? depth / 2 : width / 2;

          w.position.set(x, y, dist + 0.01);
          sideGroup.add(w);
        }
      }
    }
    group.add(sideGroup);
  });


  // 5. ENTRANCE (Front Only)
  // Double doors, glass, handles.
  const doorW = 2.5;
  const doorH = 3.2;
  const doorGroup = new THREE.Group();
  doorGroup.position.set(0, doorH / 2 + 0.2, depth / 2 + 0.05);
  group.add(doorGroup);

  // Frame
  const dFrame = new THREE.Mesh(
    new THREE.BoxGeometry(doorW + 0.4, doorH + 0.4, 0.2),
    new THREE.MeshStandardMaterial({ color: "#555555" })
  );
  dFrame.position.z = -0.05;
  doorGroup.add(dFrame);

  // Glass Panes (Double)
  const paneW = doorW / 2 - 0.1;
  const paneH = doorH - 0.2;

  const leftPane = new THREE.Mesh(new THREE.BoxGeometry(paneW, paneH, 0.05), glassMat);
  leftPane.position.set(-doorW / 4, 0, 0);
  doorGroup.add(leftPane);

  const rightPane = new THREE.Mesh(new THREE.BoxGeometry(paneW, paneH, 0.05), glassMat);
  rightPane.position.set(doorW / 4, 0, 0);
  doorGroup.add(rightPane);

  // Handles (Vertical Bars)
  const handleGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.6);
  const handleLeft = new THREE.Mesh(handleGeo, metalMat);
  handleLeft.position.set(-0.2, 0, 0.06);
  leftPane.add(handleLeft);

  const handleRight = new THREE.Mesh(handleGeo, metalMat);
  handleRight.position.set(0.2, 0, 0.06);
  rightPane.add(handleRight);

  // Canopy (Visor) over door
  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(doorW + 0.8, 0.2, 1.5),
    new THREE.MeshStandardMaterial({ color: "#444444" })
  );
  visor.position.set(0, doorH / 2 + 0.4, 0.6);
  doorGroup.add(visor);

  // Support cables for visor? Or brackets.
  // Simple brackets
  const bracketGeo = new THREE.BoxGeometry(0.05, 0.5, 0.8);
  const b1 = new THREE.Mesh(bracketGeo, metalMat);
  b1.position.set(-doorW / 2 - 0.2, doorH / 2 + 0.1, 0.3);
  b1.rotation.x = -0.5;
  doorGroup.add(b1); // Attached to group, positioning might be tricky relative to visor
  // Actually simpler: just angled boxes


  group.position.set(options.position.x, 0, options.position.z);
  group.rotation.y = options.rotation || 0;

  return group;
};

/**
 * Создает "CatDonalds" - ресторан с красными/белыми стенами, желтой "М", парковкой и столиками.
 */
const createCatDonalds = (options: BuildingOptions) => {
  const group = new THREE.Group();

  // COLORS
  const wallRed = "#D32F2F"; // McDonald's Red
  const wallWhite = "#F5F5F5";
  const roofGray = "#9E9E9E";
  const yellowM = "#FFEB3B"; // McDonald's Yellow
  const asphaltColor = "#3f464d";
  const glassColor = 0x87CEEB;

  const redMat = new THREE.MeshStandardMaterial({ color: wallRed });
  const whiteMat = new THREE.MeshStandardMaterial({ color: wallWhite });
  const roofMat = new THREE.MeshStandardMaterial({ color: roofGray });
  const yellowMat = new THREE.MeshStandardMaterial({ color: yellowM, emissive: yellowM, emissiveIntensity: 0.2 });
  const glassMat = new THREE.MeshStandardMaterial({
    color: glassColor,
    transparent: true,
    opacity: 0.4,
    roughness: 0.1,
    metalness: 0.1
  });
  const asphaltMat = new THREE.MeshStandardMaterial({ color: asphaltColor, roughness: 0.9 });
  const lineMat = new THREE.MeshStandardMaterial({ color: "#ecf0f1" });

  // DIMENSIONS
  // Main building
  const bW = 8;
  const bD = 8;
  const bH = 4.5; // Single story but tall

  // 1. FLOOR / BASE
  // We need a larger base to accommodate parking (Right) and Tables (Left)
  // Let's say total plot is 20x12?
  // Or purely visual extensions.
  // Building is at 0,0.
  // Parking on Right (+X), Tables on Left (-X).

  // Main Block (Red bottom, White top stripe)
  // Red part
  const redH = 3.5;
  const redBox = new THREE.Mesh(new THREE.BoxGeometry(bW, redH, bD), redMat);
  redBox.position.y = redH / 2;
  redBox.castShadow = true;
  redBox.receiveShadow = true;
  group.add(redBox);

  // White stripe/cornice
  const whiteH = 1.0;
  const whiteBox = new THREE.Mesh(new THREE.BoxGeometry(bW + 0.2, whiteH, bD + 0.2), whiteMat);
  whiteBox.position.y = redH + whiteH / 2;
  whiteBox.castShadow = true;
  whiteBox.receiveShadow = true;
  group.add(whiteBox);

  // Roof
  const roofBox = new THREE.Mesh(new THREE.BoxGeometry(bW - 0.5, 0.2, bD - 0.5), roofMat);
  roofBox.position.y = bH + 0.1;
  group.add(roofBox);

  // 2. SIGNAGE "M"
  // Make a "M" shape using 2 arches or just scaledtorus/cylinders?
  // Simple "M": Two arches.
  // Let's use 2 Torus slices standing up.
  // Or just 4 cylinders forming 'M' legs.
  // Torus: Radius 1.5, Tube 0.3.
  const signGroup = new THREE.Group();
  signGroup.position.set(0, bH + 0.2, 0); // On roof center
  group.add(signGroup);

  const archGeo = new THREE.TorusGeometry(1.2, 0.25, 8, 16, Math.PI); // Half torus
  const arch1 = new THREE.Mesh(archGeo, yellowMat);
  arch1.position.set(-1.1, 0, 0);
  arch1.rotation.y = Math.PI / 2; // Face front? No, side view?
  // If we want M visible from front (Z), arches should be in XY plane.
  arch1.rotation.set(0, 0, 0); // XY plane
  arch1.position.set(-1.0, 0, 0);
  signGroup.add(arch1);

  const arch2 = new THREE.Mesh(archGeo, yellowMat);
  arch2.position.set(1.0, 0, 0); // Overlap slightly to look connected in middle?
  // M usually connects at bottom middle? No, McD M connects at middle bottom.
  // Actually standard McD arch is two parabolas.
  // Let's just place them side by side.
  arch2.position.set(1.0, 0, 0);
  signGroup.add(arch2);

  // Legs for arches? Torus ends at y=0.
  // We need to lift them up or add legs.
  // Let's just lift them so y=0 is roof.
  arch1.position.y = 1.2; // Radius
  arch1.scale.set(1, 2.0, 1); // Make them taller
  arch2.position.y = 1.2;
  arch2.scale.set(1, 2.0, 1); // Make them taller

  // Sign Box base
  const signBase = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.5, 0.8), redMat);
  signBase.position.y = 0.25;
  signGroup.add(signBase);

  // Text "catdonalds" on the white stripe front
  // We'll use a canvas texture for text.
  const textCanvas = document.createElement("canvas");
  textCanvas.width = 512;
  textCanvas.height = 128;
  const ctx = textCanvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#F5F5F5"; // Match white background
    ctx.fillRect(0, 0, 512, 128);
    ctx.fillStyle = "#D32F2F"; // Red text
    ctx.font = "bold 80px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("CatDonalds", 256, 64);
  }
  const textTex = new THREE.CanvasTexture(textCanvas);
  const textPlate = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 1.5),
    new THREE.MeshStandardMaterial({ map: textTex, transparent: true })
  );
  textPlate.position.set(0, redH + whiteH / 2, bD / 2 + 0.11);
  group.add(textPlate);


  // 3. WINDOWS & DOORS
  // Front Glass Wall
  const glassW = bW - 2.0;
  const glassH = 2.5;
  const frontGlass = new THREE.Mesh(new THREE.PlaneGeometry(glassW, glassH), glassMat);
  frontGlass.position.set(0, 1.5, bD / 2 + 0.01);
  group.add(frontGlass);

  // Door Frame
  const doorGroup = new THREE.Group();
  doorGroup.position.set(0, 1.5, bD / 2 + 0.02);
  group.add(doorGroup);
  // Vertical bars
  const barGeo = new THREE.BoxGeometry(0.1, glassH, 0.1);
  const b1 = new THREE.Mesh(barGeo, whiteMat); b1.position.x = -1; doorGroup.add(b1);
  const b2 = new THREE.Mesh(barGeo, whiteMat); b2.position.x = 1; doorGroup.add(b2);
  const b3 = new THREE.Mesh(barGeo, whiteMat); b3.position.x = 0; doorGroup.add(b3); // Center split

  // Awnings? Red/White striped awnings over windows.
  const awningCanvas = document.createElement("canvas");
  awningCanvas.width = 64;
  awningCanvas.height = 64;
  const awCtx = awningCanvas.getContext("2d");
  if (awCtx) {
    awCtx.fillStyle = "#F5F5F5";
    awCtx.fillRect(0, 0, 64, 64);
    awCtx.fillStyle = "#D32F2F";
    // Stripes
    for (let i = 0; i < 4; i++) {
      awCtx.fillRect(i * 16, 0, 8, 64);
    }
  }
  const awningTex = new THREE.CanvasTexture(awningCanvas);
  awningTex.wrapS = THREE.RepeatWrapping;
  awningTex.wrapT = THREE.RepeatWrapping;
  awningTex.repeat.set(4, 1);

  const awningMat = new THREE.MeshStandardMaterial({ map: awningTex, roughness: 0.8 });
  const awningGeo = new THREE.BoxGeometry(glassW + 0.4, 0.1, 1.0);
  const awning = new THREE.Mesh(awningGeo, awningMat);
  awning.position.set(0, 1.5 + glassH / 2 + 0.2, bD / 2 + 0.5);
  awning.rotation.x = 0.5; // Slope down
  group.add(awning);

  // --- EXTRA WINDOWS (Sides & Back) ---
  const createSideWindow = () => {
    const wg = new THREE.Group();
    // Frame
    const frame = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.7, 0.15), whiteMat);
    wg.add(frame);
    // Glass
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.5), glassMat);
    glass.position.z = 0.08;
    wg.add(glass);
    return wg;
  };

  // Right Side (Parking side) - 2 windows
  const wR1 = createSideWindow();
  wR1.rotation.y = Math.PI / 2;
  wR1.position.set(bW / 2 + 0.05, 2.0, -1.5);
  group.add(wR1);
  const wR2 = createSideWindow();
  wR2.rotation.y = Math.PI / 2;
  wR2.position.set(bW / 2 + 0.05, 2.0, 1.5);
  group.add(wR2);

  // Left Side (Patio side) - 2 windows
  const wL1 = createSideWindow();
  wL1.rotation.y = -Math.PI / 2;
  wL1.position.set(-bW / 2 - 0.05, 2.0, -1.5);
  group.add(wL1);
  const wL2 = createSideWindow();
  wL2.rotation.y = -Math.PI / 2;
  wL2.position.set(-bW / 2 - 0.05, 2.0, 1.5);
  group.add(wL2);

  // Back Side - 2 windows
  const wB1 = createSideWindow();
  wB1.rotation.y = Math.PI;
  wB1.position.set(-2, 2.0, -bD / 2 - 0.05);
  group.add(wB1);
  const wB2 = createSideWindow();
  wB2.rotation.y = Math.PI;
  wB2.position.set(2, 2.0, -bD / 2 - 0.05);
  group.add(wB2);


  // 4. PARKING (Right Side)
  const parkingW = 10;
  const parkingD = 12; // Same as building depth + extra
  const parkingGroup = new THREE.Group();
  parkingGroup.position.set(bW / 2 + parkingW / 2 + 1, 0.02, 0); // Offset to right
  group.add(parkingGroup);

  // Asphalt
  const pAsphalt = new THREE.Mesh(new THREE.BoxGeometry(parkingW, 0.05, parkingD), asphaltMat);
  pAsphalt.receiveShadow = true;
  parkingGroup.add(pAsphalt);

  // White Lines for spots (Rectangular outlines)
  const spotW = 2.5;
  const spotDepth = 4.5;
  const numSpots = 3;
  // We want rectangular boxes for each spot.
  for (let i = 0; i < numSpots; i++) {
    const z = -parkingD / 2 + 2 + i * (spotW + 0.5);
    const xCenter = 2; // relative to parkingGroup

    // Create a U-shape or Box outline
    const frameGroup = new THREE.Group();
    frameGroup.position.set(xCenter, 0.051, z); // slightly above asphalt
    parkingGroup.add(frameGroup);

    // Left line
    const l1 = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.02, 0.1), lineMat);
    l1.position.z = -spotW / 2;
    frameGroup.add(l1);

    // Right line
    const l2 = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.02, 0.1), lineMat);
    l2.position.z = spotW / 2;
    frameGroup.add(l2);

    // Back line (connecting)
    const l3 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.02, spotW), lineMat);
    l3.position.x = -2.0; // Back of the spot
    frameGroup.add(l3);

    // Front line? Usually open, but user asked for "square outlines". Let's close it if they want "square".
    // But usually parking spots are U-shaped (open entry).
    // Let's make it U-shape first (standard). If "square" meant literally a box, I'd add the 4th line.
    // "очертания мест на парковке сделай квадратными" -> make outlines square.
    // I will add the front line too to make it a Full Rectangle as requested.
    const l4 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.02, spotW), lineMat);
    l4.position.x = 2.0;
    frameGroup.add(l4);
  }

  // 5. TABLES & UMBRELLAS (Left Side)
  const patioW = 8;
  const patioGroup = new THREE.Group();
  patioGroup.position.set(-bW / 2 - patioW / 2 - 1, 0, 0);
  group.add(patioGroup);

  // Patio Base (Concrete)
  const pBase = new THREE.Mesh(new THREE.BoxGeometry(patioW, 0.1, bD), new THREE.MeshStandardMaterial({ color: "#e0e0e0" }));
  pBase.position.y = 0.05;
  pBase.receiveShadow = true;
  patioGroup.add(pBase);

  // Tables
  const tableGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 16);
  const legGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.8);
  const umbGeo = new THREE.ConeGeometry(1.5, 1.0, 16);
  const umbMatRed = new THREE.MeshStandardMaterial({ color: "#D32F2F" });

  const createTable = (x: number, z: number) => {
    const tG = new THREE.Group();
    tG.position.set(x, 0, z);

    // Leg
    const leg = new THREE.Mesh(legGeo, new THREE.MeshStandardMaterial({ color: "#555" }));
    leg.position.y = 0.4;
    tG.add(leg);

    // Top
    const top = new THREE.Mesh(tableGeo, redMat); // Red tables? Or White? Let's go Red.
    top.position.y = 0.85;
    tG.add(top);

    // Umbrella
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.5), new THREE.MeshStandardMaterial({ color: "#eee" }));
    pole.position.y = 1.25;
    tG.add(pole);

    const umb = new THREE.Mesh(umbGeo, umbMatRed); // Single color for simplicity, user asked for "red tables with umbrellas"
    umb.position.y = 2.5;
    tG.add(umb);

    tG.traverse(c => { c.castShadow = true; c.receiveShadow = true; });
    return tG;
  };

  patioGroup.add(createTable(-2.5, -2.5));
  patioGroup.add(createTable(2.5, 2.5));
  patioGroup.add(createTable(0, 0));
  patioGroup.add(createTable(-2.5, 2.5));
  patioGroup.add(createTable(2.5, -2.5));

  group.position.set(options.position.x, 0, options.position.z);
  group.rotation.y = options.rotation || 0;
  return group;
};



/**
 * Creates a "Coffee Cup" building - Blue cup, white lid, cat logo, interior with cats.
 */
const createCoffeeCup = (options: BuildingOptions) => {
  const group = new THREE.Group();

  // COLORS
  const cupBlue = "#1E88E5";
  const lidWhite = "#FFFFFF";
  const logoWhite = "#F0F0F0";
  const floorWood = "#A1887F";
  const glassColor = 0x87CEEB;

  const blueMat = new THREE.MeshStandardMaterial({ color: cupBlue, roughness: 0.3, side: THREE.DoubleSide });
  const whiteMat = new THREE.MeshStandardMaterial({ color: lidWhite, roughness: 0.4 });
  const logoMat = new THREE.MeshStandardMaterial({ color: logoWhite, emissive: logoWhite, emissiveIntensity: 0.1 });
  const floorMat = new THREE.MeshStandardMaterial({ color: floorWood });
  const glassMat = new THREE.MeshStandardMaterial({
    color: glassColor,
    transparent: true,
    opacity: 0.3,
    roughness: 0.0,
    metalness: 0.2,
    side: THREE.DoubleSide
  });

  // DIMENSIONS - Phase 3 Scale (Reduced ~50%)
  // Original Reference: 3.5 / 4.2 / 7.0
  // Phase 2 was: 6.0 / 7.5 / 12.0
  // Reduced Phase 3: 
  const bottomR = 3.5;
  const topR = 4.5;
  const height = 7.5;

  // 1. CUP BODY (The Shell)
  const cupGroup = new THREE.Group();
  group.add(cupGroup);

  // Outer Shell (Back Half - Solid)
  // 270 deg solid, 90 deg gap
  const solidGeo = new THREE.CylinderGeometry(topR, bottomR, height, 64, 1, true, Math.PI / 4, 3 * Math.PI / 2);
  const shell = new THREE.Mesh(solidGeo, blueMat);
  shell.rotation.y = Math.PI + Math.PI / 4; // Adjust to face front
  shell.castShadow = true;
  shell.receiveShadow = true;
  cupGroup.add(shell);

  // Front Glass Wall (Semi-transparent imitation of glass on the cut)
  // Fills the 90 deg gap
  const frontGlassGeo = new THREE.CylinderGeometry(topR, bottomR, height, 32, 1, true, -Math.PI / 4, Math.PI / 2);
  const frontGlass = new THREE.Mesh(frontGlassGeo, glassMat);
  frontGlass.rotation.y = Math.PI + Math.PI / 4;
  cupGroup.add(frontGlass);


  blueMat.side = THREE.DoubleSide;

  // 2. WINDOW BANDS (Decoration on top of glass)
  const midR = (bottomR + topR) / 2;
  const windowArc = Math.PI / 2;

  // Middle band
  const bandGeo = new THREE.CylinderGeometry(midR, midR, 0.5, 32, 1, true, -windowArc / 2, windowArc);
  const band = new THREE.Mesh(bandGeo, blueMat);
  band.rotation.y = Math.PI + Math.PI / 4;
  cupGroup.add(band);


  // Bottom Band
  const botBandGeo = new THREE.CylinderGeometry(bottomR, bottomR, 0.5, 32, 1, true, -windowArc / 2, windowArc);
  const botBand = new THREE.Mesh(botBandGeo, blueMat);
  botBand.position.y = -height / 2 + 0.25;
  botBand.rotation.y = Math.PI + Math.PI / 4;
  cupGroup.add(botBand);


  // Top Band
  const topBandGeo = new THREE.CylinderGeometry(topR, topR, 0.5, 32, 1, true, -windowArc / 2, windowArc);
  const topBand = new THREE.Mesh(topBandGeo, blueMat);
  topBand.position.y = height / 2 - 0.25;
  topBand.rotation.y = Math.PI + Math.PI / 4;
  cupGroup.add(topBand);


  // 3. LID (Roof) - IMPROVED

  // 3. LID (Roof) - Phase 3 MOLDED TEXTURE
  // Detailed lid structure:
  // - Base Rim (Overhangs cup)
  // - Sloped Riser
  // - Upper Flat Deck
  // - Inner Well (Recessed)

  const lidGroup = new THREE.Group();
  cupGroup.add(lidGroup);

  // Base Rim Y position: starts at top of cup
  const lidBaseY = height / 2;

  // 3a. Base Rim (The part that snaps on)
  const rimH = 0.6;
  const rimR = topR + 0.3;
  const lidRim = new THREE.Mesh(
    new THREE.CylinderGeometry(rimR, rimR, rimH, 64),
    whiteMat
  );
  lidRim.position.y = lidBaseY + rimH / 2;
  lidGroup.add(lidRim);

  // 3b. Sloped Riser (Connecting rim to top deck)
  const riserH = 0.4;
  const riserTopR = rimR - 0.5;
  const lidRiser = new THREE.Mesh(
    new THREE.CylinderGeometry(riserTopR, rimR, riserH, 64),
    whiteMat
  );
  lidRiser.position.y = lidBaseY + rimH + riserH / 2;
  lidGroup.add(lidRiser);

  // 3c. Upper Deck (Flat ring)
  const deckR = riserTopR;
  const deckInnerR = deckR - 0.8; // Wide ring
  // Use ring geometry for the flat top part 
  const deckGeo = new THREE.RingGeometry(deckInnerR, deckR, 64);
  const lidDeck = new THREE.Mesh(deckGeo, whiteMat);
  lidDeck.rotation.x = -Math.PI / 2;
  lidDeck.position.y = lidBaseY + rimH + riserH;
  lidGroup.add(lidDeck);

  // 3d. Inner Well (Recessed center)
  // Walls going down
  const wellDepth = 0.5;
  const wellGeo = new THREE.CylinderGeometry(deckInnerR, deckInnerR, wellDepth, 64, 1, true);
  const wellWall = new THREE.Mesh(wellGeo, whiteMat);
  wellWall.position.y = lidBaseY + rimH + riserH - wellDepth / 2;
  whiteMat.side = THREE.DoubleSide;
  lidGroup.add(wellWall);

  // Well Floor
  const wellFloor = new THREE.Mesh(
    new THREE.CircleGeometry(deckInnerR, 64),
    whiteMat
  );
  wellFloor.rotation.x = -Math.PI / 2;
  wellFloor.position.y = lidBaseY + rimH + riserH - wellDepth;
  lidGroup.add(wellFloor);

  // Sip Hole (Small cutout indication on the Deck)
  const sipHole = new THREE.Mesh(
    new THREE.CircleGeometry(0.3, 16),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
  );
  sipHole.rotation.x = -Math.PI / 2;
  sipHole.position.set(0, lidBaseY + rimH + riserH + 0.01, deckR - 0.4);
  lidGroup.add(sipHole);


  // Straw (Green/Black Thick Tube)
  // Positioned sticking out of the sip hole area, but usually central or offset.
  // Reference shows offset.
  const strawPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 2.0, 0)
  ]);
  const strawGeo = new THREE.TubeGeometry(strawPath, 4, 0.4, 16, false); // Radius 0.4
  const strawMat = new THREE.MeshStandardMaterial({ color: 0x2E7D32, roughness: 0.4 }); // Dark Green
  const straw = new THREE.Mesh(strawGeo, strawMat);
  // Coming out of sip hole
  straw.position.set(0, lidBaseY + rimH + riserH - 0.2, deckR - 0.6);
  straw.rotation.x = -0.1;
  cupGroup.add(straw);


  // 4. FLOORS (Interior)
  // Fix artifacts: Reduce Radius more (r - 0.4)
  const createFloor = (yPos: number, r: number) => {
    const f = new THREE.Mesh(new THREE.CylinderGeometry(r - 0.05, r - 0.05, 0.2, 32), floorMat);
    f.position.y = yPos;
    cupGroup.add(f);
    return f;
  };

  // Ground Floor
  createFloor(-height / 2 + 0.1, bottomR);
  // 2nd Floor
  createFloor(0, midR);

  // 5. CAT LOGO (On the side)
  const logoGroup = new THREE.Group();
  const logoR = (topR + bottomR) / 2 + 0.15;
  logoGroup.position.set(-logoR, 0, 0);
  logoGroup.rotation.y = -Math.PI / 2;
  cupGroup.add(logoGroup);

  // Head
  const lHead = new THREE.Mesh(new THREE.CircleGeometry(1.5, 64), logoMat);
  lHead.position.z = 0.2;
  logoGroup.add(lHead);
  // Ears
  const earShape = new THREE.Shape();
  earShape.moveTo(-0.8, 0.8);
  earShape.lineTo(-1.2, 2.0);
  earShape.lineTo(-0.2, 1.2);
  const earGeo = new THREE.ShapeGeometry(earShape);
  const lEarMesh = new THREE.Mesh(earGeo, logoMat);
  lEarMesh.position.z = 0.15;
  logoGroup.add(lEarMesh);
  const rEarMesh = lEarMesh.clone();
  rEarMesh.scale.x = -1;
  logoGroup.add(rEarMesh);

  // Text "МУРкофе" - CURVED LOGIC
  const textCanvas = document.createElement("canvas");
  textCanvas.width = 512;
  textCanvas.height = 512;
  const ctx = textCanvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, 512, 512);
    ctx.fillStyle = "#0D47A1";
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const text = "МУРкофе";
    const centerX = 256;
    const centerY = 256; // Center of canvas (and head)
    const radius = 180; // Radius for text path




    // Draw curved text manually
    ctx.save();
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      // Calculate angle. 
      // We want text at bottom, so angle around PI/2? No, Canvas 0 is Right, PI/2 is Down.
      // So we want angles around PI/2.
      // Let's spread 60 deg around PI/2.
      const totalArc = Math.PI / 2;
      const baseAngle = Math.PI / 2;
      // Reverse direction: Start from Left (larger angle) to Right (smaller angle)
      // i=0 (M) -> 3PI/4
      // i=max -> PI/4
      const charAngle = baseAngle + totalArc / 2 - (i / (text.length - 1)) * totalArc;

      ctx.save();
      ctx.translate(centerX + Math.cos(charAngle) * radius, centerY + Math.sin(charAngle) * radius);
      ctx.rotate(charAngle - Math.PI / 2); // Rotate character to point outward
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }
  const textTex = new THREE.CanvasTexture(textCanvas);
  const textMat = new THREE.MeshStandardMaterial({ map: textTex, transparent: true });
  const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), textMat);
  textMesh.position.z = 0.22;
  // Removed scale.x = -1 to fix individual letter mirroring
  logoGroup.add(textMesh);




  // 6. ENTRANCE (Door) - IMPROVED (Transparent, correct side)
  const doorGroup = new THREE.Group();
  // Move door 135 degrees left (-135 deg)
  const doorAngle = -135 * (Math.PI / 180);
  const doorRadius = bottomR - 0.2;
  // Raise door to accommodate 2 steps (0.2 * 2 = 0.4)
  // Original Y: -height / 2 + 1.2 (Bottom at 0)
  // New Y: -height / 2 + 1.6 (Bottom at 0.4)
  doorGroup.position.set(
    Math.sin(doorAngle) * doorRadius,
    -height / 2 + 1.6,
    Math.cos(doorAngle) * doorRadius
  );
  doorGroup.rotation.y = doorAngle;
  // cupGroup.add(doorGroup); // Removed "black square" door frame per user request
  cupGroup.add(doorGroup); // Re-enabled for glass door

  // Remove heavy frame, use just glass and handles
  // Glass Door
  const dGlassMesh = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.4, 0.05), glassMat);
  dGlassMesh.position.z = 0.05;
  doorGroup.add(dGlassMesh);

  // Handles
  const handleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6);
  const handleMat = new THREE.MeshStandardMaterial({ color: "#cccccc", metalness: 0.5, roughness: 0.2 });

  const h1 = new THREE.Mesh(handleGeo, handleMat);
  h1.position.set(-0.3, 0, 0.08);
  doorGroup.add(h1);

  const h2 = new THREE.Mesh(handleGeo, handleMat);
  h2.position.set(0.3, 0, 0.08);
  doorGroup.add(h2);

  // 2 White Steps leading to the door
  // Step 1 (Bottom) - World Y 0.1 (Center) -> Local Y -1.5
  const step1 = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.2, 0.8),
    whiteMat
  );
  step1.position.set(0, -1.5, 0.6); // 0.6 out
  doorGroup.add(step1);

  // Step 2 (Top) - World Y 0.3 (Center) -> Local Y -1.3
  const step2 = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 0.2, 0.6),
    whiteMat
  );
  step2.position.set(0, -1.3, 0.5); // 0.5 out (slightly less)
  doorGroup.add(step2);

  // Stone Path
  const pathMat = new THREE.MeshStandardMaterial({ color: 0x9E9E9E, roughness: 0.9 });
  const numRows = 5;
  // Moved further from 1.0 to 1.5
  const pathStartZ = 1.5;

  for (let i = 0; i < numRows; i++) {
    // Increased step from 0.6 to 0.9 (1.5x)
    const z = pathStartZ + i * 0.9;

    // Row 1: Left tile
    // Resized geometry: 0.5 -> 0.75, 0.4 -> 0.6
    const t1 = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.05, 0.6), pathMat);
    // Removed random offset for straight lines
    t1.position.set(-0.45, -1.5, z);
    doorGroup.add(t1);

    // Row 1: Right tile
    const t2 = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.05, 0.6), pathMat);
    // Removed random offset for straight lines
    t2.position.set(0.45, -1.5, z);
    doorGroup.add(t2);
  }

  // 7. INTERIOR CATS - SCALED & COLORED
  const catColors = [0xFFA000, 0x757575, 0x212121, 0xFFFFFF, 0xFFE0B2];

  const createSimpleCat = () => {
    const color = catColors[Math.floor(Math.random() * catColors.length)];
    const cat = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: color });
    const white = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const black = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const scale = 1.0;

    // Body
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.4 * scale, 16, 16), mat);
    body.scale.set(1, 0.8, 1.1);
    body.position.y = 0.4 * scale;
    cat.add(body);

    // Head
    const headGeo = new THREE.SphereGeometry(0.35 * scale, 16, 16);
    const head = new THREE.Mesh(headGeo, mat);
    head.position.set(0, 0.9 * scale, 0.15 * scale); // Adjusted slightly forward
    cat.add(head);

    // Ears
    const earGeo = new THREE.ConeGeometry(0.1 * scale, 0.3 * scale, 8);
    const earL = new THREE.Mesh(earGeo, mat);
    earL.position.set(-0.15 * scale, 0.3 * scale, 0);
    earL.rotation.z = 0.3;
    head.add(earL); // Attach to head
    const earR = new THREE.Mesh(earGeo, mat);
    earR.position.set(0.15 * scale, 0.3 * scale, 0);
    earR.rotation.z = -0.3;
    head.add(earR); // Attach to head

    // Face Features
    const eyeGeo = new THREE.SphereGeometry(0.06 * scale, 8, 8);
    const eyeL = new THREE.Mesh(eyeGeo, white);
    eyeL.position.set(-0.12 * scale, 0.05 * scale, 0.28 * scale);
    head.add(eyeL);
    const eyeR = new THREE.Mesh(eyeGeo, white);
    eyeR.position.set(0.12 * scale, 0.05 * scale, 0.28 * scale);
    head.add(eyeR);

    const pupilGeo = new THREE.SphereGeometry(0.03 * scale, 8, 8);
    const pupL = new THREE.Mesh(pupilGeo, black);
    pupL.position.set(-0.12 * scale, 0.05 * scale, 0.32 * scale);
    head.add(pupL);
    const pupR = new THREE.Mesh(pupilGeo, black);
    pupR.position.set(0.12 * scale, 0.05 * scale, 0.32 * scale);
    head.add(pupR);

    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.04 * scale, 8, 8), new THREE.MeshStandardMaterial({ color: 0xFFAB91 }));
    nose.position.set(0, -0.02 * scale, 0.32 * scale);
    head.add(nose);

    // Whiskers
    const whiskerLineMat = new THREE.LineBasicMaterial({ color: 0x444444 });
    const createWhisker = (x: number, y: number, z: number, rotY: number, len: number) => {
      const pts = [
        new THREE.Vector3(x, y, z),
        new THREE.Vector3(x + Math.cos(rotY) * len, y, z + Math.sin(rotY) * len)
      ];
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const l = new THREE.Line(g, whiskerLineMat);
      head.add(l);
    };

    createWhisker(-0.15, -0.05, 0.25, Math.PI - 0.3, 0.4);
    createWhisker(-0.15, -0.08, 0.25, Math.PI - 0.15, 0.35);
    createWhisker(-0.15, -0.11, 0.25, Math.PI, 0.3);

    createWhisker(0.15, -0.05, 0.25, 0.3, 0.4);
    createWhisker(0.15, -0.08, 0.25, 0.15, 0.35);
    createWhisker(0.15, -0.11, 0.25, 0, 0.3);

    // Tail
    const tailCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0.2, -0.3),
      new THREE.Vector3(0, 0.5, -0.4),
      new THREE.Vector3(0, 0.7, -0.2)
    ]);
    const tailGeo = new THREE.TubeGeometry(tailCurve, 12, 0.06 * scale, 8, false);
    const tailMesh = new THREE.Mesh(tailGeo, mat);
    tailMesh.position.set(0, 0.2 * scale, -0.35 * scale);
    cat.add(tailMesh);


    return cat;
  };


  const createTableSet = (x: number, y: number, z: number, catCount: number) => {
    const setG = new THREE.Group();
    setG.position.set(x, y, z);

    // Table
    const table = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.1, 16), new THREE.MeshStandardMaterial({ color: 0x8D6E63 }));
    table.position.y = 0.8;
    setG.add(table);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8), new THREE.MeshStandardMaterial({ color: 0x5D4037 }));
    leg.position.y = 0.4;
    setG.add(leg);

    // Cats
    if (catCount >= 1) {
      const cat1 = createSimpleCat();
      cat1.position.set(-0.95, 0, 0);
      cat1.lookAt(0, 0, 0);
      setG.add(cat1);
    }
    if (catCount >= 2) {
      const cat2 = createSimpleCat();
      cat2.position.set(0.95, 0, 0);
      cat2.lookAt(0, 0, 0);
      setG.add(cat2);
    }

    setG.scale.set(1.5, 1.5, 1.5); // Scaled up globally (Tables + Cats)
    return setG;

  };

  // Place tables on floors
  // Floor 1 (y = -height/2 + 0.1) -> Tables at y = -height/2 + 0.1
  const f1Y = -height / 2 + 0.1;
  const f2Y = 0.1;

  // Floor 1 tables
  // cupGroup.add(createTableSet(-0.9, f1Y, 0.5, 0)); // Empty - Removed to fix clipping with cat
  cupGroup.add(createTableSet(0.9, f1Y, 0.5, 2));

  // Floor 2
  cupGroup.add(createTableSet(0, f2Y, 2.0, 1));
  cupGroup.add(createTableSet(-1.3, f2Y, -0.8, 1));
  cupGroup.add(createTableSet(1.3, f2Y, -0.8, 2));


  // 8. TREES OUTSIDE (Entrance)
  const createTree = (x: number, z: number) => {
    const t = new THREE.Group();
    t.position.set(x, 0, z);

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 1.5, 8), new THREE.MeshStandardMaterial({ color: 0x5D4037 }));
    trunk.position.y = 0.75;
    t.add(trunk);

    const leaves = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2.5, 8), new THREE.MeshStandardMaterial({ color: 0x4CAF50 }));
    leaves.position.y = 2.0;
    t.add(leaves);

    return t;
  };

  // Moved closer to 0 (which is center X), and slightly forward (Z ~ 4-5)
  // group.add(createTree(-3.0, 5.0));
  // group.add(createTree(3.0, 5.0));

  // Relocate trees to flank the new door position (-135 deg)
  const treeRadius = 6.0;
  const angle1 = (-135 - 25) * (Math.PI / 180);
  const angle2 = (-135 + 25) * (Math.PI / 180);

  group.add(createTree(Math.sin(angle1) * treeRadius, Math.cos(angle1) * treeRadius));
  group.add(createTree(Math.sin(angle2) * treeRadius, Math.cos(angle2) * treeRadius));

  // Lift cup up so bottom is at 0 (It was centered at 0 in Y)
  cupGroup.position.y = height / 2;

  group.position.set(options.position.x, 0, options.position.z);
  group.rotation.y = options.rotation || 0;
  return group;
};


/**
 * Создает школу (School)
 * Желтые стены, красная крыша, красная окантовка снизу, колонны, часы, вывеска ШКОЛА.
 */
const createSchool = (options: BuildingOptions) => {
  const group = new THREE.Group();

  // --- COLORS ---
  const wallColor = "#FFF59D"; // Light Yellow
  const roofColor = "#D32F2F"; // Red
  const bottomColor = "#D32F2F"; // Red base/steps
  const columnColor = "#FFFFFF"; // White
  const windowColor = "#81D4FA"; // Light Blue
  const plantColor = "#388E3C"; // Green

  const wallMat = new THREE.MeshStandardMaterial({ color: wallColor });
  const bottomMat = new THREE.MeshStandardMaterial({ color: bottomColor });
  const colMat = new THREE.MeshStandardMaterial({ color: columnColor });
  const winMat = new THREE.MeshStandardMaterial({
    color: windowColor,
    transparent: true,
    opacity: 0.6,
    roughness: 0.2
  });
  const bushMat = new THREE.MeshStandardMaterial({ color: plantColor });

  // --- DIMENSIONS ---
  const sideWidth = 7;
  const centralWidth = 7;
  const mainDepth = 7;
  const sideHeight = 5.5;
  const centralHeight = 9;
  const baseH = 0.6;
  const fullWidth = sideWidth * 2 + centralWidth;

  // 1. BASE / BOTTOM TRIM (Red)
  const baseGeo = new THREE.BoxGeometry(fullWidth + 0.4, baseH, mainDepth + 0.4);
  const base = new THREE.Mesh(baseGeo, bottomMat);
  base.position.y = baseH / 2;
  base.castShadow = true;
  base.receiveShadow = true;
  group.add(base);

  // 2. SIDE WINGS (Lower sections)
  const wingGeo = new THREE.BoxGeometry(sideWidth, sideHeight, mainDepth);
  const leftWing = new THREE.Mesh(wingGeo, wallMat);
  leftWing.position.set(-(centralWidth + sideWidth) / 2, sideHeight / 2, 0);
  leftWing.castShadow = true;
  leftWing.receiveShadow = true;
  group.add(leftWing);

  const rightWing = new THREE.Mesh(wingGeo, wallMat);
  rightWing.position.set((centralWidth + sideWidth) / 2, sideHeight / 2, 0);
  rightWing.castShadow = true;
  rightWing.receiveShadow = true;
  group.add(rightWing);

  // 3. CENTRAL BLOCK (Redesigned with overhang)
  // Main back part
  const centralMainGeo = new THREE.BoxGeometry(centralWidth, centralHeight, mainDepth);
  const centralMain = new THREE.Mesh(centralMainGeo, wallMat);
  centralMain.position.set(0, centralHeight / 2, 0);
  centralMain.castShadow = true;
  centralMain.receiveShadow = true;
  group.add(centralMain);

  // Lower front part (Entrance)
  const lowerFrontDepth = 1.0;
  const lowerFrontHeight = 4.0;
  const lowerFrontGeo = new THREE.BoxGeometry(centralWidth, lowerFrontHeight, lowerFrontDepth);
  const lowerFront = new THREE.Mesh(lowerFrontGeo, wallMat);
  lowerFront.position.set(0, lowerFrontHeight / 2, mainDepth / 2 + lowerFrontDepth / 2);
  lowerFront.castShadow = true;
  lowerFront.receiveShadow = true;
  group.add(lowerFront);

  // Upper front part (Overhang)
  const overhangDepth = 2.2;
  const overhangHeight = centralHeight - 4.0;
  const overhangGeo = new THREE.BoxGeometry(centralWidth, overhangHeight, overhangDepth);
  const overhang = new THREE.Mesh(overhangGeo, wallMat);
  overhang.position.set(0, lowerFrontHeight + overhangHeight / 2, mainDepth / 2 + overhangDepth / 2);
  overhang.castShadow = true;
  overhang.receiveShadow = true;
  group.add(overhang);

  // 4. ROOFS (Gable style)
  const roofTex = createBeaverTailRoofTexture();
  roofTex.repeat.set(3, 2); // Even larger tile size (was 5, 4)

  const createGableRoof = (width: number, depth: number, height: number, color: string, overhangX: number, overhangZ: number) => {
    const roofGroup = new THREE.Group();
    const fullW = width + overhangX * 2;
    const fullD = depth + overhangZ * 2;

    // Calculate slope angle and length
    const slopeLen = Math.sqrt(Math.pow(fullW / 2, 2) + Math.pow(height, 2));
    const angle = Math.atan2(height, fullW / 2);

    // 1. Left Slope
    const leftSlope = new THREE.Mesh(
      new THREE.BoxGeometry(slopeLen, 0.1, fullD),
      new THREE.MeshStandardMaterial({ map: roofTex, color: color, roughness: 0.6 })
    );
    // Rotate and position to form the gable shape
    leftSlope.rotation.z = angle;
    leftSlope.position.set(-fullW / 4, height / 2, 0);
    roofGroup.add(leftSlope);

    // 2. Right Slope
    const rightSlope = new THREE.Mesh(
      new THREE.BoxGeometry(slopeLen, 0.1, fullD),
      new THREE.MeshStandardMaterial({ map: roofTex, color: color, roughness: 0.6 })
    );
    rightSlope.rotation.z = -angle;
    rightSlope.position.set(fullW / 4, height / 2, 0);
    roofGroup.add(rightSlope);

    // 3. Gable Ends (Front and Back triangular parts)
    const triangleShape = new THREE.Shape();
    triangleShape.moveTo(-width / 2, 0);
    triangleShape.lineTo(width / 2, 0);
    triangleShape.lineTo(0, height);
    triangleShape.lineTo(-width / 2, 0);

    const triangleGeo = new THREE.ShapeGeometry(triangleShape);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: wallColor });

    const frontGable = new THREE.Mesh(triangleGeo, wallMaterial);
    frontGable.position.z = depth / 2 - 0.01;
    roofGroup.add(frontGable);

    const backGable = new THREE.Mesh(triangleGeo, wallMaterial);
    backGable.position.z = -depth / 2 + 0.01;
    backGable.rotation.y = Math.PI;
    roofGroup.add(backGable);

    return roofGroup;
  };

  const roofOverhang = 0.5;

  // Side roofs
  const leftRoof = createGableRoof(sideWidth, mainDepth, 2.2, roofColor, roofOverhang, roofOverhang);
  leftRoof.position.set(-(centralWidth + sideWidth) / 2, sideHeight, 0);
  group.add(leftRoof);

  const rightRoof = createGableRoof(sideWidth, mainDepth, 2.2, roofColor, roofOverhang, roofOverhang);
  rightRoof.position.set((centralWidth + sideWidth) / 2, sideHeight, 0);
  group.add(rightRoof);

  // Central Roof (Higher and covering the extended central block)
  const centralRoofDepth = mainDepth + overhangDepth;
  const centralRoof = createGableRoof(centralWidth + 1.2, centralRoofDepth, 2.8, roofColor, 0.2, roofOverhang);
  centralRoof.position.set(0, centralHeight, (overhangDepth - 0) / 2); // Adjust Z to cover the overhang
  group.add(centralRoof);

  // 5. ENTRANCE DETAILS
  // Entrance Platform (Porch) - RED, under the columns
  const platformDepth = overhangDepth;
  const platformW = centralWidth;
  const platformGeo = new THREE.BoxGeometry(platformW, baseH, platformDepth);
  const platform = new THREE.Mesh(platformGeo, bottomMat);
  platform.position.set(0, baseH / 2, mainDepth / 2 + platformDepth / 2);
  platform.castShadow = true;
  platform.receiveShadow = true;
  group.add(platform);

  // Steps - leading to the platform
  const stepCount = 3;
  const stepH = baseH / stepCount; // 0.6 / 3 = 0.2
  const platformFrontZ = mainDepth / 2 + platformDepth;
  for (let i = 0; i < stepCount; i++) {
    const sW = 4.0 + (stepCount - i - 1) * 0.4;
    const sD = 0.6;
    const step = new THREE.Mesh(new THREE.BoxGeometry(sW, stepH, sD), bottomMat);
    // Lower steps are further out and lower
    step.position.set(0, (stepCount - i - 1) * stepH + stepH / 2, platformFrontZ + i * 0.5 + 0.3);
    group.add(step);
  }

  // Double Door - now starts exactly from the platform level
  const doorW = 2.4;
  const doorH = 2.6;
  const doorGroup = new THREE.Group();
  doorGroup.position.set(0, baseH + doorH / 2, mainDepth / 2 + lowerFrontDepth + 0.05);
  group.add(doorGroup);

  const doorLeafMat = new THREE.MeshStandardMaterial({ color: "#4E342E" });
  const doorLeft = new THREE.Mesh(new THREE.BoxGeometry(doorW / 2 - 0.05, doorH, 0.1), doorLeafMat);
  doorLeft.position.x = -doorW / 4;
  doorGroup.add(doorLeft);
  const doorRight = new THREE.Mesh(new THREE.BoxGeometry(doorW / 2 - 0.05, doorH, 0.1), doorLeafMat);
  doorRight.position.x = doorW / 4;
  doorGroup.add(doorRight);

  // Rectangular handles
  const handleGeo = new THREE.BoxGeometry(0.06, 0.5, 0.05);
  const handleMat = new THREE.MeshStandardMaterial({ color: "#FFD700" });
  const hL = new THREE.Mesh(handleGeo, handleMat); hL.position.set(0.4, 0, 0.06); doorLeft.add(hL);
  const hR = new THREE.Mesh(handleGeo, handleMat); hR.position.set(-0.4, 0, 0.06); doorRight.add(hR);

  // Entrance Columns (Supporting the overhang) - now start from the platform
  const colH = lowerFrontHeight - baseH;
  const colGeo = new THREE.CylinderGeometry(0.35, 0.35, colH, 16);
  // Positioned on the platform: Y = baseH + colH/2
  const cL = new THREE.Mesh(colGeo, wallMat); cL.position.set(-centralWidth / 2 + 0.6, baseH + colH / 2, mainDepth / 2 + overhangDepth - 0.5); group.add(cL);
  const cR = new THREE.Mesh(colGeo, wallMat); cR.position.set(centralWidth / 2 - 0.6, baseH + colH / 2, mainDepth / 2 + overhangDepth - 0.5); group.add(cR);

  // Sign "SCHOOL" (On the overhang)
  const canvas = document.createElement("canvas");
  canvas.width = 256; canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#FFF"; ctx.fillRect(0, 0, 256, 64);
    ctx.fillStyle = "#D32F2F"; ctx.font = "bold 44px Arial"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("SCHOOL", 128, 32);
  }
  const signTex = new THREE.CanvasTexture(canvas);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 0.8), new THREE.MeshStandardMaterial({ map: signTex }));
  sign.position.set(0, 4.6, mainDepth / 2 + overhangDepth + 0.05);
  group.add(sign);

  // Clock (On the overhang)
  const clockGroup = new THREE.Group();
  clockGroup.position.set(0, 8.2, mainDepth / 2 + overhangDepth + 0.1);
  group.add(clockGroup);
  const clockCase = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.1, 16), new THREE.MeshStandardMaterial({ color: "#333" }));
  clockCase.rotation.x = Math.PI / 2;
  clockGroup.add(clockCase);
  const clockFace = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.11, 16), new THREE.MeshStandardMaterial({ color: "#FFF" }));
  clockFace.rotation.x = Math.PI / 2;
  clockGroup.add(clockFace);
  const hHand = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.3, 0.02), new THREE.MeshStandardMaterial({ color: "#000" }));
  hHand.position.y = 0.1; hHand.position.z = 0.06; clockGroup.add(hHand);
  const mHand = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.4, 0.02), new THREE.MeshStandardMaterial({ color: "#000" }));
  mHand.rotation.z = -2; mHand.position.x = 0.15; mHand.position.z = 0.06; clockGroup.add(mHand);

  // 6. WINDOWS
  const createSchoolWindow = (x: number, y: number, z: number, orientation: number = 0) => {
    const wGroup = new THREE.Group();
    wGroup.position.set(x, y, z);
    wGroup.rotation.y = orientation;
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.3, 0.1), colMat);
    wGroup.add(frame);
    const glass = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.1, 0.12), winMat);
    wGroup.add(glass);
    const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.1, 0.14), colMat); wGroup.add(vBar);
    const hBar = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.05, 0.14), colMat); wGroup.add(hBar);
    group.add(wGroup);
  };

  // Distribution
  const y1 = baseH + 1.25;
  const y2 = baseH + 3.25;

  // Distribution calculations for width 7, 3 windows of 1.2 width
  // Total window width = 3.6. Remainder = 3.4. 4 gaps = 0.85 each.
  // Offsets from center of a 7m block: [-2.05, 0, 2.05]
  const windowOffsets = [-2.05, 0, 2.05];
  const leftWingPos = -(centralWidth + sideWidth) / 2; // -7
  const rightWingPos = (centralWidth + sideWidth) / 2;   // 7

  // Side Wings front
  windowOffsets.forEach(offset => {
    const lx = leftWingPos + offset;
    const rx = rightWingPos + offset;
    [y1, y2].forEach(y => {
      createSchoolWindow(lx, y, mainDepth / 2);
      createSchoolWindow(rx, y, mainDepth / 2);
    });
  });

  // Central Block front windows (between sign and clock)
  windowOffsets.forEach(offset => {
    createSchoolWindow(offset, 6.4, mainDepth / 2 + overhangDepth + 0.05);
  });

  // Side and Back windows (simplified)
  [y1, y2].forEach(y => {
    // Side walls
    createSchoolWindow(-(fullWidth / 2), y, 0, -Math.PI / 2);
    createSchoolWindow(fullWidth / 2, y, 0, Math.PI / 2);
    // Back wall
    for (let i = -6; i <= 6; i += 3) {
      createSchoolWindow(i, y, -mainDepth / 2);
    }
  });

  // 7. PLANTS
  const addBush = (x: number, z: number, r: number) => {
    const b = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 8), bushMat);
    b.scale.set(r, r * 0.8, r); b.position.set(x, r * 0.7, z); group.add(b);
  }
  addBush(-fullWidth / 2 - 1, 4, 1.5); addBush(fullWidth / 2 + 1, 4, 1.5);
  addBush(-5, mainDepth / 2 + 1.5, 0.8); addBush(5, mainDepth / 2 + 1.5, 0.8);

  group.position.set(options.position.x, 0, options.position.z);
  group.rotation.y = options.rotation || 0;
  return group;
};

export const createBuilding = (options: BuildingOptions, textures: BuildingTextures) => {
  // Для Case используем специальную функцию
  if (options.houseSubtype === "casa") {
    return createCaseBuilding(options, textures);
  }
  if (options.houseSubtype === "classic_shop") {
    return createClassicShop(options);
  }
  if (options.houseSubtype === "residential") {
    return createResidentialBuilding(options);
  }
  if (options.houseSubtype === "catdonalds") {
    return createCatDonalds(options);
  }
  if (options.houseSubtype === "coffeecup") {
    return createCoffeeCup(options);
  }
  if (options.houseSubtype === "school") {
    return createSchool(options);
  }

  const group = new THREE.Group();
  group.rotation.y = options.rotation ?? 0;

  // Рассчитываем реальную высоту и количество этажей
  const floorsCount = options.floors || Math.max(1, Math.floor((options.size.y - BUILDING_LAYOUT.windows.marginTop - BUILDING_LAYOUT.windows.sillFromBase) / BUILDING_LAYOUT.windows.floorHeight));
  const buildingHeight = BUILDING_LAYOUT.foundationHeight + BUILDING_LAYOUT.windows.sillFromBase + (floorsCount * BUILDING_LAYOUT.windows.floorHeight) + BUILDING_LAYOUT.windows.marginTop;
  const currentSize = { ...options.size, y: buildingHeight - BUILDING_LAYOUT.foundationHeight };

  const hideSides = options.hideSides || [];

  // --- Foundation ---
  const fWidth = currentSize.x * (hideSides.includes("px") || hideSides.includes("nx") ? 1.0 : 1.06);
  const fDepth = currentSize.z * (hideSides.includes("pz") || hideSides.includes("nz") ? 1.0 : 1.06);

  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(fWidth, 0.5, fDepth),
    new THREE.MeshStandardMaterial({ color: "#7f8c8d", roughness: 0.9, metalness: 0.02 })
  );

  if (hideSides.includes("px") && !hideSides.includes("nx")) foundation.position.x = -currentSize.x * 0.03;
  if (hideSides.includes("nx") && !hideSides.includes("px")) foundation.position.x = currentSize.x * 0.03;
  if (hideSides.includes("pz") && !hideSides.includes("nz")) foundation.position.z = -currentSize.z * 0.03;
  if (hideSides.includes("nz") && !hideSides.includes("pz")) foundation.position.z = currentSize.z * 0.03;

  foundation.position.y = BUILDING_LAYOUT.foundationHeight / 2;
  foundation.castShadow = true;
  foundation.receiveShadow = true;
  group.add(foundation);

  // --- Base Walls ---
  const baseGeometry = new THREE.BoxGeometry(currentSize.x, currentSize.y, currentSize.z);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: options.color,
    map: textures.wall,
    roughness: 0.7,
    metalness: 0.05
  });

  const baseWalls = new THREE.Mesh(baseGeometry, baseMaterial);
  baseWalls.position.y = BUILDING_LAYOUT.foundationHeight + currentSize.y / 2;
  baseWalls.castShadow = true;
  baseWalls.receiveShadow = true;
  group.add(baseWalls);

  // --- Windows ---
  const windowMaterial = new THREE.MeshStandardMaterial({
    map: textures.windows,
    emissive: new THREE.Color("#b3e5fc"),
    emissiveIntensity: 0.3,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
    opacity: 0.7
  });

  const windowFrameMaterial = options.houseSubtype === "casa"
    ? new THREE.MeshStandardMaterial({ color: "#1a237e", roughness: 0.4, metalness: 0.2 })
    : new THREE.MeshStandardMaterial({ color: "#e0e0e0", roughness: 0.4, metalness: 0.2 });

  const facadeZ = currentSize.z / 2 + BUILDING_LAYOUT.facadeInset;
  const windowStep = BUILDING_LAYOUT.windows.desiredStep;
  const floorHeight = BUILDING_LAYOUT.windows.floorHeight;
  const marginX = BUILDING_LAYOUT.windows.marginX;
  const marginTop = BUILDING_LAYOUT.windows.marginTop;
  const sillFromBase = BUILDING_LAYOUT.windows.sillFromBase;
  const doorClearance = BUILDING_LAYOUT.windows.doorClearance;

  const windowWidth = BUILDING_LAYOUT.windows.width;
  const windowHeight = BUILDING_LAYOUT.windows.height;

  for (let floor = 0; floor < floorsCount; floor++) {
    const windowY = BUILDING_LAYOUT.foundationHeight + sillFromBase + (floor * floorHeight) + windowHeight / 2;
    const windowsPerSide = Math.floor((currentSize.x - 2 * marginX - doorClearance) / windowStep);

    for (let i = 0; i < windowsPerSide; i++) {
      const windowX = -currentSize.x / 2 + marginX + doorClearance / 2 + (i + 0.5) * windowStep;

      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(windowWidth + 0.2, windowHeight + 0.2, 0.15),
        windowFrameMaterial
      );
      frame.position.set(windowX, windowY, facadeZ);
      frame.castShadow = true;
      group.add(frame);

      const window = new THREE.Mesh(
        new THREE.PlaneGeometry(windowWidth, windowHeight),
        windowMaterial
      );
      window.position.set(windowX, windowY, facadeZ + 0.1);
      group.add(window);
    }
  }

  // --- Door ---
  const doorWidth = BUILDING_LAYOUT.door.width;
  const doorHeight = BUILDING_LAYOUT.door.height;
  const doorFrameWidth = BUILDING_LAYOUT.door.frameWidth;
  const doorFrameHeight = BUILDING_LAYOUT.door.frameHeight;

  const doorFrame = new THREE.Mesh(
    new THREE.BoxGeometry(doorFrameWidth, doorFrameHeight, 0.3),
    new THREE.MeshStandardMaterial({ color: "#424242", roughness: 0.4, metalness: 0.2 })
  );
  doorFrame.position.set(0, BUILDING_LAYOUT.foundationHeight + doorHeight / 2, facadeZ + BUILDING_LAYOUT.door.frameOutward);
  doorFrame.castShadow = true;
  group.add(doorFrame);

  const doorCanvas = document.createElement("canvas");
  doorCanvas.width = 128;
  doorCanvas.height = 256;
  const doorCtx = doorCanvas.getContext("2d");
  if (doorCtx) {
    doorCtx.fillStyle = "#d4a574";
    doorCtx.fillRect(0, 0, 128, 256);
    doorCtx.strokeStyle = "rgba(0,0,0,0.3)";
    doorCtx.lineWidth = 3;
    doorCtx.strokeRect(10, 10, 108, 118);
    doorCtx.strokeRect(10, 128, 108, 118);
    doorCtx.beginPath();
    doorCtx.moveTo(10, 128);
    doorCtx.lineTo(118, 128);
    doorCtx.stroke();
  }
  const doorTexture = new THREE.CanvasTexture(doorCanvas);
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(doorWidth, doorHeight, 0.15),
    new THREE.MeshStandardMaterial({ map: doorTexture, roughness: 0.8 })
  );
  door.position.set(0, BUILDING_LAYOUT.foundationHeight + doorHeight / 2, facadeZ + BUILDING_LAYOUT.door.outward);
  door.castShadow = true;
  group.add(door);

  for (let k = 0; k < 3; k++) {
    const step = new THREE.Mesh(
      new THREE.BoxGeometry(doorWidth + 0.6 - k * 0.1, 0.15, 0.4 - k * 0.05),
      new THREE.MeshStandardMaterial({ color: "#c9c9c5", roughness: 0.8 })
    );
    step.position.set(0, BUILDING_LAYOUT.foundationHeight + 0.07 + k * 0.15, facadeZ + BUILDING_LAYOUT.door.outward + 0.3 + (2 - k) * 0.1);
    step.castShadow = true;
    group.add(step);
  }

  // --- Roof ---
  const roofHeight = BUILDING_LAYOUT.roof.minHeight + (BUILDING_LAYOUT.roof.maxHeight - BUILDING_LAYOUT.roof.minHeight) * (currentSize.y / 10);
  const roofWidth = currentSize.x * (1 + BUILDING_LAYOUT.roof.relative);
  const roofDepth = currentSize.z * (1 + BUILDING_LAYOUT.roof.relative);

  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(roofWidth, roofHeight, roofDepth),
    new THREE.MeshStandardMaterial({
      color: options.roof,
      map: textures.roof,
      roughness: 0.6,
      metalness: 0.1
    })
  );
  roof.position.y = BUILDING_LAYOUT.foundationHeight + currentSize.y + roofHeight / 2;
  if (hideSides.includes("px") && !hideSides.includes("nx")) roof.position.x = -currentSize.x * BUILDING_LAYOUT.roof.relative / 2;
  if (hideSides.includes("nx") && !hideSides.includes("px")) roof.position.x = currentSize.x * BUILDING_LAYOUT.roof.relative / 2;
  if (hideSides.includes("pz") && !hideSides.includes("nz")) roof.position.z = -currentSize.z * BUILDING_LAYOUT.roof.relative / 2;
  if (hideSides.includes("nz") && !hideSides.includes("pz")) roof.position.z = currentSize.z * BUILDING_LAYOUT.roof.relative / 2;
  roof.castShadow = true;
  roof.receiveShadow = true;
  group.add(roof);

  // --- Label ---
  if (options.label) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = options.labelBg || "#ffffff";
      ctx.fillRect(0, 0, 512, 128);
      ctx.fillStyle = options.labelTextColor || "#000000";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(options.label, 256, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    const labelMaterial = new THREE.MeshStandardMaterial({ map: texture, transparent: true });
    const label = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.5), labelMaterial);
    label.position.y = BUILDING_LAYOUT.foundationHeight + currentSize.y + 0.1;
    if (options.labelAnchor === "edgeLeft") label.position.x = -currentSize.x / 2 + 1;
    else if (options.labelAnchor === "edgeRight") label.position.x = currentSize.x / 2 - 1;
    label.rotation.x = -Math.PI / 2;
    group.add(label);

    if (options.labelAllSides) {
      const labelBack = label.clone();
      labelBack.rotation.y = Math.PI;
      group.add(labelBack);
      const labelLeft = label.clone();
      labelLeft.rotation.y = Math.PI / 2;
      group.add(labelLeft);
      const labelRight = label.clone();
      labelRight.rotation.y = -Math.PI / 2;
      group.add(labelRight);
    }
  }

  group.position.set(options.position.x, 0, options.position.z);
  return group;
};
