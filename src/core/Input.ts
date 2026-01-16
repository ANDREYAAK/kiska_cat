import { VirtualJoystick } from "@ui/VirtualJoystick";

export class Input {
  private readonly keys = new Set<string>();
  private readonly joystick: VirtualJoystick;
  private runHeld = false;
  private jumpQueued = false;
  private exitQueued = false;
  private enterQueued = false;
  private exitButton: HTMLButtonElement | null = null;

  private runButton: HTMLButtonElement | null = null;
  private jumpButton: HTMLButtonElement | null = null;

  constructor(uiLayer: HTMLElement) {
    this.joystick = new VirtualJoystick(uiLayer);
    this.createTouchButtons(uiLayer);
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  setDriving(isDriving: boolean) {
    if (this.runButton) this.runButton.style.display = isDriving ? "none" : "";
    if (this.jumpButton) this.jumpButton.style.display = isDriving ? "none" : "";
    this.setExitVisible(isDriving);
  }

  getMoveVector() {
    let x = 0;
    let z = 0;
    // ... existing keyboard logic ...
    if (this.keys.has("KeyW") || this.keys.has("ArrowUp")) z += 1;
    if (this.keys.has("KeyS") || this.keys.has("ArrowDown")) z -= 1;
    if (this.keys.has("KeyA") || this.keys.has("ArrowLeft")) x -= 1;
    if (this.keys.has("KeyD") || this.keys.has("ArrowRight")) x += 1;

    if (x !== 0 || z !== 0) {
      const len = Math.hypot(x, z) || 1;
      return { x: x / len, z: z / len };
    }

    const joy = this.joystick.getVector();
    const joyLen = Math.hypot(joy.x, joy.y);
    if (joyLen > 0.05) {
      // Apply sensitivity curve to steering (X)
      const steering = joy.x * Math.abs(joy.x);
      return { x: steering, z: -joy.y };
    }

    return { x: 0, z: 0 };
  }

  isSprinting() {
    // Клавиатура: Shift. Мобилки: либо удержание кнопки "Бег", либо сильное отклонение джойстика.
    if (this.keys.has("ShiftLeft") || this.keys.has("ShiftRight")) return true;
    if (this.runHeld) return true;
    const joy = this.joystick.getVector();
    const joyLen = Math.hypot(joy.x, joy.y);
    return joyLen >= 0.85;
  }

  consumeJumpPressed() {
    // Одноразовый "импульс" (нажатие). Держать не нужно.
    const v = this.jumpQueued;
    this.jumpQueued = false;
    return v;
  }

  consumeExitPressed() {
    const v = this.exitQueued;
    this.exitQueued = false;
    return v;
  }

  consumeEnterPressed() {
    const v = this.enterQueued;
    this.enterQueued = false;
    return v;
  }

  setExitVisible(visible: boolean) {
    if (!this.exitButton) return;
    this.exitButton.style.display = visible ? "" : "none";
  }

  private createTouchButtons(uiLayer: HTMLElement) {
    const wrap = document.createElement("div");
    wrap.className = "action-buttons";

    const run = document.createElement("button");
    run.className = "action-button";
    run.type = "button";
    run.textContent = "БЕГ";
    this.runButton = run;

    const jump = document.createElement("button");
    jump.className = "action-button";
    jump.type = "button";
    jump.textContent = "ПРЫЖОК";
    this.jumpButton = jump;

    const exit = document.createElement("button");
    exit.className = "action-button";
    exit.type = "button";
    exit.textContent = "ВЫЙТИ";
    exit.style.display = "none";
    this.exitButton = exit;

    const holdOn = (e: Event) => {
      e.preventDefault();
      this.runHeld = true;
    };
    const holdOff = (e: Event) => {
      e.preventDefault();
      this.runHeld = false;
    };

    run.addEventListener("pointerdown", holdOn);
    run.addEventListener("pointerup", holdOff);
    run.addEventListener("pointercancel", holdOff);
    run.addEventListener("pointerleave", holdOff);

    jump.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      this.jumpQueued = true;
    });

    exit.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      this.exitQueued = true;
    });

    wrap.append(exit, run, jump);
    uiLayer.appendChild(wrap);
  }

  private onKeyDown = (event: KeyboardEvent) => {
    this.keys.add(event.code);
    if (event.code === "Space" && !event.repeat) {
      this.jumpQueued = true;
    }
    if (event.code === "KeyE" && !event.repeat) {
      this.exitQueued = true;
    }
    if (event.code === "Enter" && !event.repeat) {
      this.enterQueued = true;
    }
  };

  private onKeyUp = (event: KeyboardEvent) => {
    this.keys.delete(event.code);
  };
}
