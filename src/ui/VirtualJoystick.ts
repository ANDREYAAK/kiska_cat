import { clamp } from "@utils/math";

export class VirtualJoystick {
  private readonly base: HTMLDivElement;
  private readonly stick: HTMLDivElement;
  private readonly radius = 40;
  private pointerId: number | null = null;
  private vector = { x: 0, y: 0 };

  constructor(container: HTMLElement) {
    this.base = document.createElement("div");
    this.base.className = "joystick";
    this.stick = document.createElement("div");
    this.stick.className = "joystick-stick";
    this.base.appendChild(this.stick);
    container.appendChild(this.base);
    this.base.addEventListener("pointerdown", this.onPointerDown);
    this.base.addEventListener("pointermove", this.onPointerMove);
    this.base.addEventListener("pointerup", this.onPointerUp);
    this.base.addEventListener("pointercancel", this.onPointerUp);
  }

  getVector() {
    return { ...this.vector };
  }

  private onPointerDown = (event: PointerEvent) => {
    this.pointerId = event.pointerId;
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    this.updateStick(event);
  };

  private onPointerMove = (event: PointerEvent) => {
    if (event.pointerId !== this.pointerId) return;
    this.updateStick(event);
  };

  private onPointerUp = (event: PointerEvent) => {
    if (event.pointerId !== this.pointerId) return;
    this.pointerId = null;
    this.vector = { x: 0, y: 0 };
    this.stick.style.transform = "translate(0px, 0px)";
  };

  private updateStick(event: PointerEvent) {
    const rect = this.base.getBoundingClientRect();
    const localX = event.clientX - rect.left - rect.width / 2;
    const localY = event.clientY - rect.top - rect.height / 2;
    const distance = Math.hypot(localX, localY);
    const clamped = Math.min(distance, this.radius);
    const angle = Math.atan2(localY, localX);
    const x = Math.cos(angle) * clamped;
    const y = Math.sin(angle) * clamped;
    this.vector = {
      x: clamp(x / this.radius, -1, 1),
      y: clamp(y / this.radius, -1, 1)
    };
    this.stick.style.transform = `translate(${x}px, ${y}px)`;
  }
}
