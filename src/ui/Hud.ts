import { GAME_CONFIG } from "@config/game";
import { WORLD_CONFIG } from "@config/world";

export class Hud {
  readonly element: HTMLDivElement;
  private readonly minimapWrap: HTMLDivElement;
  private readonly minimapCanvas: HTMLCanvasElement;
  private readonly minimapCtx: CanvasRenderingContext2D;
  private readonly toastEl: HTMLDivElement;
  private readonly promoEl: HTMLDivElement;
  private readonly promoTextEl: HTMLDivElement;
  private toastTimer: number | null = null;
  private staticCanvas: HTMLCanvasElement | null = null;
  private staticCtx: CanvasRenderingContext2D | null = null;
  private mapOpen = false;
  private bounds: { minX: number; maxX: number; minZ: number; maxZ: number } | null = null;
  private lastCanvasW = 0;
  private lastCanvasH = 0;
  private promoCloseHandler: (() => void) | null = null;

  constructor(container: HTMLElement) {
    this.element = document.createElement("div");
    this.element.className = "ui";
    this.element.innerHTML = `
      <div class="ui-top">
        <div class="logo">MTS City</div>
      </div>
      <div class="ui-buttons">
        <button class="ui-button" type="button" data-action="toggle-help">≡</button>
      </div>
      <div class="ui-toast" data-role="toast" aria-live="polite" hidden></div>
      <div class="ui-modal" data-role="promo" hidden>
        <div class="ui-modal__card">
          <div class="ui-modal__text" data-role="promo-text"></div>
          <button class="ui-modal__close" type="button" data-role="promo-close" aria-label="Закрыть уведомление">×</button>
        </div>
      </div>
      <div class="ui-hint">WASD/стрелки, джойстик • Shift — быстрый бег • Space — прыжок • E — выйти из машины • мышь/палец для обзора • колесо/пинч для масштаба</div>
      <div class="minimap" data-role="minimap">
        <canvas data-role="minimap-canvas"></canvas>
      </div>
    `;
    container.appendChild(this.element);

    const toast = this.element.querySelector<HTMLDivElement>('[data-role="toast"]');
    const wrap = this.element.querySelector<HTMLDivElement>('[data-role="minimap"]');
    const canvas = this.element.querySelector<HTMLCanvasElement>('[data-role="minimap-canvas"]');
    const promo = this.element.querySelector<HTMLDivElement>('[data-role="promo"]');
    const promoText = this.element.querySelector<HTMLDivElement>('[data-role="promo-text"]');
    const promoClose = this.element.querySelector<HTMLButtonElement>('[data-role="promo-close"]');
    if (!toast || !wrap || !canvas || !promo || !promoText || !promoClose) throw new Error("UI DOM not found");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Minimap 2d context not available");

    this.toastEl = toast;
    this.minimapWrap = wrap;
    this.minimapCanvas = canvas;
    this.minimapCtx = ctx;
    this.promoEl = promo;
    this.promoTextEl = promoText;

    // Кнопки
    // Клик по миникарте открывает большую карту
    this.minimapWrap.addEventListener("click", () => this.toggleMap());
    // Кнопка помощи
    const helpBtn = this.element.querySelector<HTMLButtonElement>('[data-action="toggle-help"]');
    helpBtn?.addEventListener("click", () => this.toggleHelp());

    // Закрытие всплывающего сообщения по клику/тапу
    this.toastEl.addEventListener("click", () => this.hideMessage());

    // Закрытие промо-уведомления
    promoClose.addEventListener("click", () => {
      this.hidePromo();
      this.promoCloseHandler?.();
    });

    // Подготавливаем границы и “статический слой” карты (дороги/здания/районы)
    this.bounds = this.computeWorldBounds();
  }

  showMessage(text: string, options?: { durationMs?: number }) {
    // Если показываем новое сообщение — сбрасываем старый таймер.
    if (this.toastTimer != null) {
      window.clearTimeout(this.toastTimer);
      this.toastTimer = null;
    }
    this.toastEl.textContent = text;
    this.toastEl.hidden = false;
    this.element.classList.add("toast-open");

    const durationMs = options?.durationMs ?? 6500;
    if (durationMs > 0) {
      this.toastTimer = window.setTimeout(() => {
        this.hideMessage();
      }, durationMs);
    }
  }

  hideMessage() {
    if (this.toastTimer != null) {
      window.clearTimeout(this.toastTimer);
      this.toastTimer = null;
    }
    this.toastEl.hidden = true;
    this.element.classList.remove("toast-open");
  }

  showPromo(text: string) {
    this.promoTextEl.textContent = text;
    this.promoEl.hidden = false;
    this.promoEl.classList.add("open");
  }

  hidePromo() {
    this.promoEl.hidden = true;
    this.promoEl.classList.remove("open");
  }

  isPromoVisible() {
    return !this.promoEl.hidden;
  }

  onPromoClosed(handler: () => void) {
    this.promoCloseHandler = handler;
  }

  private toggleMap() {
    this.mapOpen = !this.mapOpen;
    this.element.classList.toggle("map-open", this.mapOpen);
    // При смене режима размер карты меняется — переинициализируем слой.
    this.lastCanvasW = 0;
    this.lastCanvasH = 0;
  }

  private toggleHelp() {
    // Пока просто прячет/показывает подсказку — чтобы кнопка была “живой”.
    this.element.classList.toggle("help-hidden");
  }

  updateMinimap(player: { x: number; z: number; yaw: number }) {
    if (!this.bounds) this.bounds = this.computeWorldBounds();
    this.ensureMinimapSize();
    this.ensureStaticLayer();

    // 1) Статический слой
    if (this.staticCanvas) {
      this.minimapCtx.clearRect(0, 0, this.minimapCanvas.width, this.minimapCanvas.height);
      this.minimapCtx.drawImage(this.staticCanvas, 0, 0);
    }

    // 2) Игрок (стрелка)
    const p = this.worldToMap(player.x, player.z);
    const ctx = this.minimapCtx;
    ctx.save();
    ctx.translate(p.x, p.y);
    // Разворачиваем стрелку на 180 градусов (Math.PI), так как она смотрела назад
    ctx.rotate(-player.yaw + Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(0,0,0,0.45)";
    ctx.lineWidth = Math.max(1, Math.round(this.minimapCanvas.width * 0.006));
    ctx.beginPath();
    const s = Math.max(8, Math.round(this.minimapCanvas.width * 0.03));
    ctx.moveTo(0, -s);
    ctx.lineTo(s * 0.65, s);
    ctx.lineTo(0, s * 0.55);
    ctx.lineTo(-s * 0.65, s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  private ensureMinimapSize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.minimapWrap.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (w === this.lastCanvasW && h === this.lastCanvasH) return;

    this.lastCanvasW = w;
    this.lastCanvasH = h;
    this.minimapCanvas.width = w;
    this.minimapCanvas.height = h;
    // Перестраиваем статический слой под новый размер
    this.staticCanvas = null;
    this.staticCtx = null;
  }

  private ensureStaticLayer() {
    if (this.staticCanvas && this.staticCtx) return;

    const canvas = document.createElement("canvas");
    canvas.width = this.minimapCanvas.width;
    canvas.height = this.minimapCanvas.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    this.staticCanvas = canvas;
    this.staticCtx = ctx;

    this.renderStaticMap(ctx, canvas.width, canvas.height);
  }

  private computeWorldBounds() {
    // Берём реальные объекты из WORLD_CONFIG, чтобы карта покрывала весь “город”.
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

    // Дороги
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

    // Здания (с запасом)
    for (const b of WORLD_CONFIG.buildings ?? []) {
      const halfX = b.size.x / 2;
      const halfZ = b.size.z / 2;
      grow(b.position.x - halfX, b.position.x + halfX, b.position.z - halfZ, b.position.z + halfZ);
    }

    // Зоны
    const areas = [
      ...(((WORLD_CONFIG as unknown as { parks?: any[] }).parks ?? []) as Array<{ position: { x: number; z: number }; width: number; depth: number }>),
      ...(((WORLD_CONFIG as unknown as { waterAreas?: any[] }).waterAreas ?? []) as Array<{ position: { x: number; z: number }; width: number; depth: number }>),
      ...(((WORLD_CONFIG as unknown as { beachAreas?: any[] }).beachAreas ?? []) as Array<{ position: { x: number; z: number }; width: number; depth: number }>)
    ];
    for (const a of areas) {
      grow(a.position.x - a.width / 2, a.position.x + a.width / 2, a.position.z - a.depth / 2, a.position.z + a.depth / 2);
    }

    // Небольшой “воздух” по краям
    const pad = 18;
    return { minX: minX - pad, maxX: maxX + pad, minZ: minZ - pad, maxZ: maxZ + pad };
  }

  private worldToMap(x: number, z: number) {
    if (!this.bounds) return { x: 0, y: 0 };
    const { minX, maxX, minZ, maxZ } = this.bounds;
    const w = this.minimapCanvas.width;
    const h = this.minimapCanvas.height;
    const nx = (x - minX) / Math.max(1e-6, maxX - minX);
    const nz = (z - minZ) / Math.max(1e-6, maxZ - minZ);
    // На экране Y растёт вниз, поэтому Z инвертируем.
    return { x: nx * w, y: (1 - nz) * h };
  }

  private renderStaticMap(ctx: CanvasRenderingContext2D, w: number, h: number) {
    // Фон (слегка прозрачный, чтобы не мешал игре)
    ctx.clearRect(0, 0, w, h);
    // Фон: если открыта — почти непрозрачный, если мини — полупрозрачный
    ctx.fillStyle = this.mapOpen ? "rgba(10, 24, 34, 0.95)" : "rgba(10, 24, 34, 0.55)";
    ctx.fillRect(0, 0, w, h);

    // Рамка
    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.lineWidth = Math.max(2, Math.round(w * 0.01));
    ctx.strokeRect(ctx.lineWidth / 2, ctx.lineWidth / 2, w - ctx.lineWidth, h - ctx.lineWidth);

    // Районы: парк/пляж/вода (под дорогами/зданиями)
    const drawArea = (x: number, z: number, width: number, depth: number, color: string) => {
      const p0 = this.worldToMap(x - width / 2, z - depth / 2);
      const p1 = this.worldToMap(x + width / 2, z + depth / 2);
      const left = Math.min(p0.x, p1.x);
      const right = Math.max(p0.x, p1.x);
      const top = Math.min(p0.y, p1.y);
      const bottom = Math.max(p0.y, p1.y);
      ctx.fillStyle = color;
      ctx.fillRect(left, top, right - left, bottom - top);
    };

    for (const p of (WORLD_CONFIG as unknown as { parks?: any[] }).parks ?? []) {
      drawArea(p.position.x, p.position.z, p.width, p.depth, "rgba(88, 190, 124, 0.22)");
    }
    for (const wa of (WORLD_CONFIG as unknown as { waterAreas?: any[] }).waterAreas ?? []) {
      drawArea(wa.position.x, wa.position.z, wa.width, wa.depth, "rgba(120, 210, 255, 0.22)");
    }
    for (const ba of (WORLD_CONFIG as unknown as { beachAreas?: any[] }).beachAreas ?? []) {
      drawArea(ba.position.x, ba.position.z, ba.width, ba.depth, "rgba(255, 220, 160, 0.18)");
    }

    // Дороги
    ctx.fillStyle = "rgba(205, 220, 235, 0.18)";
    for (const r of WORLD_CONFIG.roads ?? []) {
      this.drawRotatedRect(ctx, r.position.x, r.position.z, r.width, r.length, r.rotation ?? 0, "rgba(145, 160, 175, 0.55)");
    }

    // Здания (с акцентом на подписанные)
    for (const b of WORLD_CONFIG.buildings ?? []) {
      const color = b.label ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)";
      this.drawRotatedRect(ctx, b.position.x, b.position.z, b.size.x, b.size.z, (b as { rotation?: number }).rotation ?? 0, color);
    }

    // Подписи — только в раскрытом режиме, чтобы не превращать миникарту в кашу
    if (this.mapOpen) {
      ctx.font = `${Math.max(12, Math.round(w * 0.03))}px Arial`;
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (const b of WORLD_CONFIG.buildings ?? []) {
        if (!b.label) continue;
        const p = this.worldToMap(b.position.x, b.position.z);
        ctx.fillText(b.label, p.x, p.y + Math.max(6, Math.round(w * 0.018)));
      }
    }
  }

  private drawRotatedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    z: number,
    width: number,
    depth: number,
    rotY: number,
    fill: string
  ) {
    // Строим 4 угла в мире, поворачиваем, затем переводим в координаты карты.
    const hw = width / 2;
    const hd = depth / 2;
    const c = Math.cos(rotY);
    const s = Math.sin(rotY);
    const pts = [
      { x: -hw, z: -hd },
      { x: hw, z: -hd },
      { x: hw, z: hd },
      { x: -hw, z: hd }
    ].map((p) => ({
      x: x + p.x * c + p.z * s,
      z: z + (-p.x * s + p.z * c)
    }));

    const m0 = this.worldToMap(pts[0].x, pts[0].z);
    ctx.beginPath();
    ctx.moveTo(m0.x, m0.y);
    for (let i = 1; i < pts.length; i += 1) {
      const mi = this.worldToMap(pts[i].x, pts[i].z);
      ctx.lineTo(mi.x, mi.y);
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
  }
}
