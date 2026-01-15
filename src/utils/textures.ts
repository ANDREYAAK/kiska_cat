import * as THREE from "three";

type TextureKind = "grass" | "sand" | "path" | "roof" | "wall" | "windows" | "road" | "clouds";

export const createProceduralTexture = (kind: TextureKind, colorHex: string) => {
  // Чуть выше разрешение — меньше “пикселения” на фасадах/окнах
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    const texture = new THREE.Texture();
    texture.needsUpdate = true;
    return texture;
  }

  // Для облаков нужен прозрачный фон.
  if (kind !== "clouds") {
    ctx.fillStyle = colorHex;
    ctx.fillRect(0, 0, size, size);
  } else {
    ctx.clearRect(0, 0, size, size);
  }

  const addNoise = (amount: number) => {
    const img = ctx.getImageData(0, 0, size, size);
    const data = img.data;
    for (let i = 0; i < data.length; i += 4) {
      const diff = (Math.random() - 0.5) * amount;
      data[i] += diff;
      data[i + 1] += diff;
      data[i + 2] += diff;
    }
    ctx.putImageData(img, 0, 0);
  };

  if (kind === "grass") {
    addNoise(40);
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    for (let i = 0; i < 600; i++) {
      ctx.fillRect(Math.random() * size, Math.random() * size, 1, 2);
    }
  }

  if (kind === "sand") {
    addNoise(30);
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    for (let i = 0; i < 400; i++) {
      ctx.fillRect(Math.random() * size, Math.random() * size, 2, 1);
    }
  }

  if (kind === "path") {
    addNoise(25);
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    for (let i = 0; i < 500; i++) {
      ctx.fillRect(Math.random() * size, Math.random() * size, 2, 2);
    }
  }

  if (kind === "road") {
    // асфальт: лёгкий шум и «гравий» (цвет задаётся снаружи)
    addNoise(35);
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    for (let i = 0; i < 500; i++) {
      ctx.fillRect(Math.random() * size, Math.random() * size, 2, 2);
    }
  }

  if (kind === "roof") {
    addNoise(15);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
    ctx.lineWidth = 2;
    const rows = 8;
    const rowH = size / rows;
    for (let i = 0; i <= rows; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * rowH);
      ctx.lineTo(size, i * rowH);
      ctx.stroke();
    }
  }

  if (kind === "wall") {
    // “Штукатурка”: лёгкий вертикальный градиент + шум + пятна, чтобы фасад выглядел не плоским
    const grad = ctx.createLinearGradient(0, 0, 0, size);
    grad.addColorStop(0, "rgba(255,255,255,0.18)");
    grad.addColorStop(1, "rgba(0,0,0,0.12)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    addNoise(22);

    // Мелкие “поры”/точки
    ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
    for (let i = 0; i < 900; i++) {
      ctx.fillRect(Math.random() * size, Math.random() * size, 1, 1);
    }

    // Небольшие пятна разного тона
    for (let i = 0; i < 140; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = 4 + Math.random() * 16;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 0, 0, ${0.025 + Math.random() * 0.03})`;
      ctx.fill();
    }

    // Едва заметные горизонтальные “швы” (в стиле панелей/кладки)
    ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
    ctx.lineWidth = 2;
    const step = 48;
    for (let y = 0; y < size; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y + (Math.random() * 2 - 1));
      ctx.lineTo(size, y + (Math.random() * 2 - 1));
      ctx.stroke();
    }
  }

  if (kind === "windows") {
    // Более реалистичное окно: стекло с градиентом + отражение + тонкие переплёты
    const glass = ctx.createLinearGradient(0, 0, 0, size);
    glass.addColorStop(0, "rgba(170, 210, 235, 0.95)");
    glass.addColorStop(1, "rgba(45, 75, 95, 0.95)");
    ctx.fillStyle = glass;
    ctx.fillRect(0, 0, size, size);

    // Отражение (диагональная “полоса”)
    ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
    ctx.beginPath();
    ctx.moveTo(size * 0.1, size * 0.9);
    ctx.lineTo(size * 0.9, size * 0.1);
    ctx.lineTo(size * 0.9, size * 0.28);
    ctx.lineTo(size * 0.28, size * 0.9);
    ctx.closePath();
    ctx.fill();

    // Рамка
    ctx.strokeStyle = "rgba(25, 35, 45, 0.95)";
    ctx.lineWidth = 22;
    ctx.strokeRect(0, 0, size, size);

    // Тонкий внутренний контур
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 6;
    ctx.strokeRect(18, 18, size - 36, size - 36);

    // Переплёты (2x2) — не “решётка”, а аккуратные рамки
    ctx.fillStyle = "rgba(25, 35, 45, 0.9)";
    const mullion = 14;
    ctx.fillRect(size / 2 - mullion / 2, 18, mullion, size - 36);
    ctx.fillRect(18, size / 2 - mullion / 2, size - 36, mullion);

    // Чуть-чуть шума, чтобы стекло не было пластиком
    addNoise(10);
  }

  if (kind === "clouds") {
    // Альфа‑маска для мультяшных облаков (без “тени/грязи”, чтобы не получались тучи).
    // Цвет задаём материалом в мире, а тут рисуем только “пухлую” форму.
    const clusters = 26;
    for (let c = 0; c < clusters; c += 1) {
      const baseX = Math.random() * size;
      const baseY = Math.random() * size;
      const baseR = 34 + Math.random() * 62;
      const puffs = 5 + Math.floor(Math.random() * 5);

      for (let p = 0; p < puffs; p += 1) {
        const ox = (Math.random() - 0.5) * baseR * 0.9;
        const oy = (Math.random() - 0.5) * baseR * 0.45;
        const rx = baseR * (1.0 + (Math.random() - 0.5) * 0.35) * 1.35;
        const ry = baseR * (0.7 + Math.random() * 0.35);

        ctx.save();
        ctx.translate(baseX + ox, baseY + oy);
        ctx.scale(rx / Math.max(1e-4, ry), 1);

        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, ry);
        const a0 = 0.34 + Math.random() * 0.18;
        g.addColorStop(0, `rgba(255, 255, 255, ${a0})`);
        g.addColorStop(0.62, `rgba(255, 255, 255, ${a0 * 0.62})`);
        g.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, ry, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
};

export const createLicensePlateTexture = (text: string) => {
  const width = 256;
  const height = 64;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  // Белый фон
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // Черная рамка
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 8;
  ctx.strokeRect(0, 0, width, height);

  // Текст
  ctx.fillStyle = "#000000";
  ctx.font = "bold 40px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // toUpperCase для красоты
  ctx.fillText(text.toUpperCase(), width / 2, height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
};
