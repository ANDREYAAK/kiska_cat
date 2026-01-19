
export class BuildingUI {
    private container: HTMLElement;
    private hintEl: HTMLDivElement;
    private buttons: Record<string, HTMLButtonElement> = {};
    private activeToolKey: string | null = null;
    private activeButtonId: string | null = null;
    private onToolSelect: (tool: string | null) => void;
    private onScaleChange: (scale: number) => void;
    private onGlbOptionsChange: (opts: { free: boolean; stick: boolean; flip: boolean }) => void;
    private selectionHint: string | null = null;
    private onMoveSelected: (dx: number, dz: number) => void;
    private onFreeCamToggle: (enabled: boolean) => void;
    private isFreeCam = false;

    // Selection Controls UI
    private selectionRow: HTMLDivElement;
    private onQuickRotate: (() => void) | null = null;

    // GLB catalog UI
    private glbPanel: HTMLDivElement;
    private glbSearchInput: HTMLInputElement;
    private glbSelect: HTMLSelectElement;
    private glbItems: Array<{ key: string; label: string; sizeLabel?: string }> = [];
    private scaleRow: HTMLDivElement;
    private scaleValueEl: HTMLSpanElement;
    private scaleInput: HTMLInputElement;

    // Color UI
    private colorRow: HTMLDivElement;
    private colorInput: HTMLInputElement;
    private onColorChange: (color: string) => void;

    // Подменю для домов
    private houseSubmenu!: HTMLDivElement;
    private houseSubmenuOpen = false;

    // Подменю для машин
    private carSubmenu!: HTMLDivElement;
    private carSubmenuOpen = false;

    constructor(
        parent: HTMLElement,
        opts: {
            onToolSelect: (tool: string | null) => void;
            onScaleChange?: (scale: number) => void;
            onGlbOptionsChange?: (opts: { free: boolean; stick: boolean; flip: boolean }) => void;
            onQuickRotate?: () => void;
            onMoveSelected?: (dx: number, dz: number) => void;
            onFreeCamToggle?: (enabled: boolean) => void;
            onColorChange?: (color: string) => void;
        }
    ) {
        this.onToolSelect = opts.onToolSelect;
        this.onScaleChange = opts.onScaleChange ?? (() => { });
        this.onGlbOptionsChange = opts.onGlbOptionsChange ?? (() => { });
        this.onQuickRotate = opts.onQuickRotate ?? null;
        this.onMoveSelected = opts.onMoveSelected ?? (() => { });
        this.onFreeCamToggle = opts.onFreeCamToggle ?? (() => { });
        this.onColorChange = opts.onColorChange ?? (() => { });
        this.container = document.createElement("div");
        this.container.style.position = "absolute";
        this.container.style.bottom = "20px";
        this.container.style.left = "50%";
        this.container.style.transform = "translateX(-50%)";
        this.container.style.display = "flex";
        this.container.style.gap = "10px";
        this.container.style.pointerEvents = "auto";
        this.container.style.zIndex = "20"; // Above joystick

        this.container.style.zIndex = "20"; // Above joystick
        this.container.style.flexDirection = "column";
        this.container.style.alignItems = "center";

        parent.appendChild(this.container);

        // --- GLB catalog panel (collapsed by default) ---
        this.glbPanel = document.createElement("div");
        this.glbPanel.style.display = "none";
        this.glbPanel.style.pointerEvents = "auto";
        this.glbPanel.style.background = "rgba(0,0,0,0.55)";
        this.glbPanel.style.border = "1px solid rgba(255,255,255,0.15)";
        this.glbPanel.style.borderRadius = "10px";
        this.glbPanel.style.padding = "10px";
        this.glbPanel.style.width = "320px";
        this.glbPanel.style.maxWidth = "90vw";
        this.glbPanel.style.backdropFilter = "blur(6px)";
        this.glbPanel.style.marginBottom = "10px";
        this.container.appendChild(this.glbPanel);

        const glbTitle = document.createElement("div");
        glbTitle.textContent = "GLB Объекты";
        glbTitle.style.color = "white";
        glbTitle.style.fontFamily = "sans-serif";
        glbTitle.style.fontWeight = "bold";
        glbTitle.style.marginBottom = "8px";
        this.glbPanel.appendChild(glbTitle);

        this.glbSearchInput = document.createElement("input");
        this.glbSearchInput.type = "text";
        this.glbSearchInput.placeholder = "Поиск (дерево, машина, ...)";
        this.glbSearchInput.style.width = "100%";
        this.glbSearchInput.style.boxSizing = "border-box";
        this.glbSearchInput.style.padding = "8px 10px";
        this.glbSearchInput.style.borderRadius = "8px";
        this.glbSearchInput.style.border = "none";
        this.glbSearchInput.style.outline = "none";
        this.glbSearchInput.style.marginBottom = "8px";
        this.glbPanel.appendChild(this.glbSearchInput);

        this.glbSelect = document.createElement("select");
        this.glbSelect.size = 7;
        this.glbSelect.style.width = "100%";
        this.glbSelect.style.boxSizing = "border-box";
        this.glbSelect.style.borderRadius = "8px";
        this.glbSelect.style.border = "none";
        this.glbSelect.style.padding = "6px";
        this.glbSelect.style.fontFamily = "sans-serif";
        this.glbPanel.appendChild(this.glbSelect);
        this.glbSelect.addEventListener("wheel", (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });

        const glbHelp = document.createElement("div");
        glbHelp.style.color = "rgba(255,255,255,0.85)";
        glbHelp.style.fontSize = "11px";
        glbHelp.style.marginTop = "8px";
        glbHelp.style.lineHeight = "1.4";
        glbHelp.innerHTML = "Выберите объект → кликните по карте.<br/>" +
            "По умолчанию: ставится на землю.<br/>" +
            "«Прилипание»: можно на крышу/стену.";
        this.glbPanel.appendChild(glbHelp);

        // Options row: free placement + stick to surface + flip
        const optsRow = document.createElement("div");
        optsRow.style.display = "flex";
        optsRow.style.flexDirection = "column";
        optsRow.style.gap = "6px";
        optsRow.style.marginTop = "10px";
        this.glbPanel.appendChild(optsRow);

        const makeToggle = (label: string, defaultOn: boolean) => {
            const row = document.createElement("label");
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.gap = "8px";
            row.style.color = "white";
            row.style.fontSize = "12px";
            row.style.fontFamily = "sans-serif";
            const cb = document.createElement("input");
            cb.type = "checkbox";
            cb.checked = defaultOn;
            row.appendChild(cb);
            const txt = document.createElement("span");
            txt.textContent = label;
            row.appendChild(txt);
            optsRow.appendChild(row);
            return cb;
        };

        const cbFree = makeToggle("Свободно (можно ставить поверх дороги/объектов)", false);
        const cbStick = makeToggle("Прилипать к поверхности (крыша/стена)", false);
        const cbFlip = makeToggle("Поменять сторону (если “утопает” в стену)", false);

        const emit = () => this.onGlbOptionsChange({
            free: cbFree.checked,
            stick: cbStick.checked,
            flip: cbFlip.checked
        });
        cbFree.addEventListener("change", emit);
        cbStick.addEventListener("change", emit);
        cbFlip.addEventListener("change", emit);
        // initial
        emit();

        // Scale row
        this.scaleRow = document.createElement("div");
        this.scaleRow.style.display = "flex";
        this.scaleRow.style.alignItems = "center";
        this.scaleRow.style.gap = "10px";
        this.scaleRow.style.marginTop = "10px";
        this.glbPanel.appendChild(this.scaleRow);

        const scaleLabel = document.createElement("div");
        scaleLabel.textContent = "Масштаб:";
        scaleLabel.style.color = "white";
        scaleLabel.style.fontSize = "12px";
        scaleLabel.style.fontFamily = "sans-serif";
        this.scaleRow.appendChild(scaleLabel);

        this.scaleInput = document.createElement("input");
        this.scaleInput.type = "range";
        this.scaleInput.min = "0.1";
        this.scaleInput.max = "3.0";
        this.scaleInput.step = "0.1";
        this.scaleInput.value = "1.0";
        this.scaleInput.style.flex = "1";
        this.scaleRow.appendChild(this.scaleInput);
        this.scaleInput.addEventListener("wheel", (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });

        this.scaleValueEl = document.createElement("span");
        this.scaleValueEl.textContent = "1.0×";
        this.scaleValueEl.style.color = "white";
        this.scaleValueEl.style.fontSize = "12px";
        this.scaleValueEl.style.fontFamily = "monospace";
        this.scaleRow.appendChild(this.scaleValueEl);

        // Hint element
        this.hintEl = document.createElement("div");
        this.hintEl.style.color = "white";
        this.hintEl.style.background = "rgba(0,0,0,0.6)";
        this.hintEl.style.padding = "4px 8px";
        this.hintEl.style.borderRadius = "4px";
        this.hintEl.style.marginBottom = "8px";
        this.hintEl.style.fontSize = "12px";
        this.hintEl.style.fontFamily = "monospace";
        this.hintEl.style.display = "none";
        this.container.appendChild(this.hintEl);

        const btnRow = document.createElement("div");
        btnRow.style.display = "flex";
        btnRow.style.gap = "10px";
        this.container.appendChild(btnRow);

        this.createHouseButton();
        this.createButton("tree", "🌲 Елка");
        this.createButton("sport", "🏀 Спорт");
        this.createCarButton(); // Создаем кнопку с подменю для машин
        this.createButton("bus", "🚌 Автобус");
        this.createButton("lamp", "💡 Фонарь");
        this.createButton("fence", "🚧 Забор");
        this.createButton("bridge", "🌉 Мост");
        this.createButton("glb", "🧩 Объекты");
        this.createButton("delete", "🗑️ Удалить");

        // Free Cam Button
        const freeCamBtn = document.createElement("button");
        freeCamBtn.textContent = "📷 Free Cam";
        freeCamBtn.style.padding = "10px 15px";
        freeCamBtn.style.borderRadius = "8px";
        freeCamBtn.style.border = "none";
        freeCamBtn.style.background = "rgba(40, 40, 40, 0.8)";
        freeCamBtn.style.color = "white";
        freeCamBtn.style.cursor = "pointer";
        freeCamBtn.style.marginLeft = "20px";
        freeCamBtn.onclick = () => {
            this.isFreeCam = !this.isFreeCam;
            freeCamBtn.style.background = this.isFreeCam ? "#f39c12" : "rgba(40, 40, 40, 0.8)";
            this.onFreeCamToggle(this.isFreeCam);
        };
        this.container.lastElementChild?.appendChild(freeCamBtn);

        // --- Color Picker Row ---
        this.colorRow = document.createElement("div");
        this.colorRow.style.display = "none";
        this.colorRow.style.alignItems = "center";
        this.colorRow.style.gap = "10px";
        this.colorRow.style.marginTop = "5px";
        this.colorRow.style.background = "rgba(0,0,0,0.6)";
        this.colorRow.style.padding = "5px 10px";
        this.colorRow.style.borderRadius = "8px";
        this.container.appendChild(this.colorRow);

        const colorLabel = document.createElement("span");
        colorLabel.textContent = "Цвет стен:";
        colorLabel.style.color = "white";
        colorLabel.style.fontSize = "12px";
        colorLabel.style.fontFamily = "sans-serif";
        this.colorRow.appendChild(colorLabel);

        this.colorInput = document.createElement("input");
        this.colorInput.type = "color";
        this.colorInput.value = "#A0522D"; // Default
        this.colorInput.style.border = "none";
        this.colorInput.style.width = "40px";
        this.colorInput.style.height = "25px";
        this.colorInput.style.cursor = "pointer";
        this.colorInput.style.borderRadius = "4px";
        this.colorRow.appendChild(this.colorInput);

        this.colorInput.addEventListener("input", () => {
            this.onColorChange(this.colorInput.value);
        });

        // Selection Controls Row (move + rotate)
        this.selectionRow = document.createElement("div");
        this.selectionRow.style.display = "none"; // Hidden by default
        this.selectionRow.style.flexDirection = "row"; // Направление строки
        this.selectionRow.style.gap = "10px";
        this.selectionRow.style.marginTop = "5px";
        this.selectionRow.style.alignItems = "center";
        this.container.appendChild(this.selectionRow);

        // Move buttons row
        const moveRow = document.createElement("div");
        moveRow.style.display = "grid";
        moveRow.style.gridTemplateColumns = "32px 32px 32px";
        moveRow.style.gridTemplateRows = "32px 32px 32px";
        moveRow.style.gap = "4px";
        this.selectionRow.appendChild(moveRow);

        const makeMoveBtn = (label: string, dx: number, dz: number) => {
            const btn = document.createElement("button");
            btn.textContent = label;
            btn.style.width = "32px";
            btn.style.height = "32px";
            btn.style.borderRadius = "6px";
            btn.style.border = "none";
            btn.style.background = "rgba(60, 60, 60, 0.9)";
            btn.style.color = "white";
            btn.style.cursor = "pointer";
            btn.style.fontFamily = "sans-serif";
            btn.style.fontSize = "12px";
            btn.type = "button"; // Предотвращаем отправку формы
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation(); // Предотвращаем всплытие события
                this.onMoveSelected(dx, dz);
            };
            moveRow.appendChild(btn);
            return btn;
        };

        // Layout: empty, up, empty / left, center, right / empty, down, empty
        // Стрелки движения: ▲ вверх, ▼ вниз, ◀ влево, ▶ вправо
        const empty1 = makeMoveBtn("", 0, 0);
        empty1.style.visibility = "hidden";
        empty1.style.pointerEvents = "none"; // Отключаем кликабельность для пустых кнопок

        makeMoveBtn("▲", 0, 1); // Вверх (положительное Z)

        const empty2 = makeMoveBtn("", 0, 0);
        empty2.style.visibility = "hidden";
        empty2.style.pointerEvents = "none";

        makeMoveBtn("◀", -1, 0); // Влево (отрицательное X)

        const centerBtn = makeMoveBtn("•", 0, 0); // Центр (не используется для движения)
        centerBtn.style.visibility = "hidden";
        centerBtn.style.pointerEvents = "none";

        makeMoveBtn("▶", 1, 0); // Вправо (положительное X)

        const empty3 = makeMoveBtn("", 0, 0);
        empty3.style.visibility = "hidden";
        empty3.style.pointerEvents = "none";

        makeMoveBtn("▼", 0, -1); // Вниз (отрицательное Z)

        const empty4 = makeMoveBtn("", 0, 0);
        empty4.style.visibility = "hidden";
        empty4.style.pointerEvents = "none";

        // Rotate button
        const rotateBtn = document.createElement("button");
        rotateBtn.innerHTML = "🔄 <b>Повернуть</b>";
        rotateBtn.style.padding = "8px 12px";
        rotateBtn.style.borderRadius = "6px";
        rotateBtn.style.border = "none";
        rotateBtn.style.background = "#f39c12";
        rotateBtn.style.color = "white";
        rotateBtn.style.cursor = "pointer";
        rotateBtn.style.fontFamily = "sans-serif";
        rotateBtn.style.fontSize = "12px";
        rotateBtn.type = "button"; // Предотвращаем отправку формы
        rotateBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation(); // Предотвращаем всплытие события
            if (this.onQuickRotate) this.onQuickRotate();
        };
        this.selectionRow.appendChild(rotateBtn);

        // Clear selection button
        const clearBtn = document.createElement("button");
        clearBtn.textContent = "❌";
        clearBtn.style.padding = "8px 12px";
        clearBtn.style.borderRadius = "6px";
        clearBtn.style.border = "none";
        clearBtn.style.background = "#e74c3c";
        clearBtn.style.color = "white";
        clearBtn.style.cursor = "pointer";
        clearBtn.style.fontFamily = "sans-serif";
        clearBtn.style.fontSize = "12px";
        clearBtn.onclick = () => this.selectTool(null);
        this.selectionRow.appendChild(clearBtn);

        // --- Events ---
        this.glbSearchInput.addEventListener("input", () => this.renderGlbOptions());
        this.glbSelect.addEventListener("change", () => {
            const key = this.glbSelect.value;
            if (key) {
                this.selectTool(`glb:${key}`, "glb");
            }
        });
        this.scaleInput.addEventListener("input", () => {
            const value = parseFloat(this.scaleInput.value);
            this.scaleValueEl.textContent = `${value.toFixed(1)}×`;
            this.onScaleChange(value);
        });
    }

    private createHouseButton() {
        // Создаем контейнер для кнопки и подменю
        const houseContainer = document.createElement("div");
        houseContainer.style.position = "relative";
        houseContainer.style.display = "inline-block";
        this.container.lastElementChild?.appendChild(houseContainer);

        // Основная кнопка "Дом"
        const btn = document.createElement("button");
        btn.textContent = "🏠 Дом";
        btn.style.padding = "10px 15px";
        btn.style.borderRadius = "8px";
        btn.style.border = "none";
        btn.style.background = "rgba(40, 40, 40, 0.8)";
        btn.style.color = "white";
        btn.style.cursor = "pointer";
        btn.style.fontFamily = "sans-serif";
        btn.style.fontWeight = "bold";
        btn.style.transition = "all 0.2s";
        houseContainer.appendChild(btn);
        this.buttons["house"] = btn;

        // Подменю
        this.houseSubmenu = document.createElement("div");
        this.houseSubmenu.style.display = "none";
        this.houseSubmenu.style.position = "absolute";
        this.houseSubmenu.style.bottom = "100%";
        this.houseSubmenu.style.left = "0";
        this.houseSubmenu.style.marginBottom = "5px";
        this.houseSubmenu.style.background = "rgba(0, 0, 0, 0.85)";
        this.houseSubmenu.style.border = "1px solid rgba(255, 255, 255, 0.2)";
        this.houseSubmenu.style.borderRadius = "8px";
        this.houseSubmenu.style.padding = "5px";
        this.houseSubmenu.style.display = "flex";
        this.houseSubmenu.style.flexDirection = "column";
        this.houseSubmenu.style.gap = "5px";
        this.houseSubmenu.style.zIndex = "100";
        this.houseSubmenu.style.backdropFilter = "blur(6px)";
        houseContainer.appendChild(this.houseSubmenu);

        // Кнопки подменю
        const createSubButton = (id: string, label: string) => {
            const subBtn = document.createElement("button");
            subBtn.textContent = label;
            subBtn.style.padding = "8px 12px";
            subBtn.style.borderRadius = "6px";
            subBtn.style.border = "none";
            subBtn.style.background = "rgba(60, 60, 60, 0.9)";
            subBtn.style.color = "white";
            subBtn.style.cursor = "pointer";
            subBtn.style.fontFamily = "sans-serif";
            subBtn.style.fontSize = "13px";
            subBtn.style.transition = "all 0.2s";
            subBtn.style.textAlign = "left";
            subBtn.onmouseenter = () => {
                subBtn.style.background = "rgba(80, 80, 80, 0.9)";
            };
            subBtn.onmouseleave = () => {
                subBtn.style.background = "rgba(60, 60, 60, 0.9)";
            };
            subBtn.onclick = () => {
                this.houseSubmenuOpen = false;
                this.houseSubmenu.style.display = "none";
                this.selectTool(id);
            };
            this.houseSubmenu.appendChild(subBtn);
            return subBtn;
        };

        createSubButton("house:standard", "🏠 Стандартный дом");
        createSubButton("house:shop", "🏪 Магазин");
        createSubButton("house:casa", "🏡 Casa");
        createSubButton("house:house_01", "🏠 Дом с лестницей");
        createSubButton("house:house_01", "🏠 Дом с лестницей");
        createSubButton("house:classic_shop", "🏛️ Классический магазин");
        createSubButton("house:residential", "🏢 Жилой дом");
        createSubButton("house:catdonalds", "🍔 CatDonalds");
        createSubButton("house:coffeecup", "☕ Кофейня");
        createSubButton("house:school", "🏫 Школа");

        // Обработчик клика на основную кнопку
        btn.onclick = () => {
            if (this.houseSubmenuOpen) {
                // Закрываем подменю
                this.houseSubmenuOpen = false;
                this.houseSubmenu.style.display = "none";
                if (this.activeButtonId && this.activeButtonId.startsWith("house:")) {
                    this.selectTool(null);
                }
            } else {
                // Открываем подменю
                this.houseSubmenuOpen = true;
                this.houseSubmenu.style.display = "flex";
                // Если уже выбран какой-то тип дома, подсвечиваем кнопку
                if (this.activeButtonId && this.activeButtonId.startsWith("house:")) {
                    this.applyActiveButton("house");
                } else {
                    this.applyActiveButton("house");
                }
            }
        };

        // Закрываем подменю при клике вне его
        document.addEventListener("click", (e) => {
            if (this.houseSubmenuOpen && !houseContainer.contains(e.target as Node)) {
                this.houseSubmenuOpen = false;
                this.houseSubmenu.style.display = "none";
            }
        });
    }

    private createCarButton() {
        // Создаем контейнер для кнопки и подменю
        const carContainer = document.createElement("div");
        carContainer.style.position = "relative";
        carContainer.style.display = "inline-block";
        this.container.lastElementChild?.appendChild(carContainer);

        // Основная кнопка "Авто"
        const btn = document.createElement("button");
        btn.textContent = "🚗 Авто";
        btn.style.padding = "10px 15px";
        btn.style.borderRadius = "8px";
        btn.style.border = "none";
        btn.style.background = "rgba(40, 40, 40, 0.8)";
        btn.style.color = "white";
        btn.style.cursor = "pointer";
        btn.style.fontFamily = "sans-serif";
        btn.style.fontWeight = "bold";
        btn.style.transition = "all 0.2s";
        carContainer.appendChild(btn);
        this.buttons["car"] = btn;

        // Подменю
        this.carSubmenu = document.createElement("div");
        this.carSubmenu.style.display = "none";
        this.carSubmenu.style.position = "absolute";
        this.carSubmenu.style.bottom = "100%";
        this.carSubmenu.style.left = "0";
        this.carSubmenu.style.marginBottom = "5px";
        this.carSubmenu.style.background = "rgba(0, 0, 0, 0.85)";
        this.carSubmenu.style.border = "1px solid rgba(255, 255, 255, 0.2)";
        this.carSubmenu.style.borderRadius = "8px";
        this.carSubmenu.style.padding = "5px";
        this.carSubmenu.style.flexDirection = "column";
        this.carSubmenu.style.gap = "5px";
        this.carSubmenu.style.zIndex = "100";
        this.carSubmenu.style.backdropFilter = "blur(6px)";
        carContainer.appendChild(this.carSubmenu);

        // Кнопки подменю
        const createSubButton = (id: string, label: string) => {
            const subBtn = document.createElement("button");
            subBtn.textContent = label;
            subBtn.style.padding = "8px 12px";
            subBtn.style.borderRadius = "6px";
            subBtn.style.border = "none";
            subBtn.style.background = "rgba(60, 60, 60, 0.9)";
            subBtn.style.color = "white";
            subBtn.style.cursor = "pointer";
            subBtn.style.fontFamily = "sans-serif";
            subBtn.style.fontSize = "13px";
            subBtn.style.transition = "all 0.2s";
            subBtn.style.textAlign = "left";
            subBtn.onmouseenter = () => {
                subBtn.style.background = "rgba(80, 80, 80, 0.9)";
            };
            subBtn.onmouseleave = () => {
                subBtn.style.background = "rgba(60, 60, 60, 0.9)";
            };
            subBtn.onclick = () => {
                this.carSubmenuOpen = false;
                this.carSubmenu.style.display = "none";
                this.selectTool(id);
            };
            this.carSubmenu.appendChild(subBtn);
            return subBtn;
        };

        createSubButton("car", "🚗 Старое авто (с дверью)");
        createSubButton("car:gltf", "🚙 Новое авто (GLTF)");
        createSubButton("bus", "🚌 Автобус");

        // Обработчик клика на основную кнопку
        btn.onclick = () => {
            if (this.carSubmenuOpen) {
                // Закрываем подменю
                this.carSubmenuOpen = false;
                this.carSubmenu.style.display = "none";
                if (this.activeButtonId && (this.activeButtonId === "car" || this.activeButtonId === "car:gltf" || this.activeButtonId === "bus")) {
                    this.selectTool(null);
                }
            } else {
                // Открываем подменю
                this.carSubmenuOpen = true;
                this.carSubmenu.style.display = "flex";
                // Если уже выбран какой-то тип транспорта, подсвечиваем кнопку
                if (this.activeButtonId && (this.activeButtonId === "car" || this.activeButtonId === "car:gltf" || this.activeButtonId === "bus")) {
                    this.applyActiveButton("car");
                } else {
                    this.applyActiveButton("car");
                }
            }
        };

        // Закрываем подменю при клике вне его
        document.addEventListener("click", (e) => {
            if (this.carSubmenuOpen && !carContainer.contains(e.target as Node)) {
                this.carSubmenuOpen = false;
                this.carSubmenu.style.display = "none";
            }
        });
    }

    private createButton(id: string, label: string) {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.style.padding = "10px 15px";
        btn.style.borderRadius = "8px";
        btn.style.border = "none";
        btn.style.background = "rgba(40, 40, 40, 0.8)";
        btn.style.color = "white";
        btn.style.cursor = "pointer";
        btn.style.fontFamily = "sans-serif";
        btn.style.fontWeight = "bold";
        btn.style.transition = "all 0.2s";

        btn.onclick = () => {
            // Закрываем подменю домов и машин при выборе другого инструмента
            if (this.houseSubmenuOpen) {
                this.houseSubmenuOpen = false;
                this.houseSubmenu.style.display = "none";
            }
            if (this.carSubmenuOpen) {
                this.carSubmenuOpen = false;
                this.carSubmenu.style.display = "none";
            }

            // GLB button toggles panel; tool is selected via dropdown.
            if (id === "glb") {
                const isOpen = this.glbPanel.style.display !== "none";
                this.glbPanel.style.display = isOpen ? "none" : "block";
                // Если уже выбран GLB-объект — просто подсветим кнопку.
                if (this.activeButtonId === "glb") {
                    this.applyActiveButton("glb");
                } else {
                    this.applyActiveButton(isOpen ? null : "glb");
                }
                return;
            }

            if (this.activeButtonId === id) {
                this.selectTool(null);
            } else {
                this.selectTool(id);
            }
        };

        this.container.lastElementChild?.appendChild(btn);
        this.buttons[id] = btn;
    }

    public setSelectionControlsVisible(visible: boolean) {
        this.selectionRow.style.display = visible ? "flex" : "none";
    }

    private selectTool(toolKey: string | null, buttonIdOverride?: string) {
        this.activeToolKey = toolKey;

        // Для подтипов домов используем "house" как активную кнопку
        if (toolKey && toolKey.startsWith("house:")) {
            this.activeButtonId = "house";
        } else {
            this.activeButtonId = buttonIdOverride ?? toolKey;
        }

        this.applyActiveButton(this.activeButtonId);

        // Показываем панель, если выбран GLB-объект
        if (toolKey && toolKey.startsWith("glb:")) {
            this.glbPanel.style.display = "block";
        }

        this.onToolSelect(toolKey);
        this.updateHint(toolKey);

        // Show color picker for residential houses
        if (toolKey && toolKey.startsWith("house:")) {
            this.colorRow.style.display = "flex";
        } else {
            this.colorRow.style.display = "none";
        }
    }

    private applyActiveButton(buttonId: string | null) {
        // Reset styles
        Object.values(this.buttons).forEach(b => {
            b.style.background = "rgba(40, 40, 40, 0.8)";
            b.style.transform = "scale(1)";
        });

        if (buttonId && this.buttons[buttonId]) {
            this.buttons[buttonId].style.background = "#27ae60"; // Green
            this.buttons[buttonId].style.transform = "scale(1.1)";
        }
    }

    private updateHint(toolKey: string | null) {
        if (!toolKey) {
            if (this.selectionHint) {
                this.hintEl.textContent = this.selectionHint;
                this.hintEl.style.display = "block";
            } else {
                this.hintEl.style.display = "none";
            }
            return;
        }

        let text = "";
        if (toolKey === "house" || (toolKey && toolKey.startsWith("house:"))) {
            text = "↑↓: Floors | ←→: Size | R: Rotate";
        } else if (toolKey === "fence") {
            text = "↑↓: Height | ←→: Length | R: Rotate";
        } else if (toolKey.startsWith("glb:")) {
            text = "R: Поворот | Q/E: докрутка | Масштаб: ползунок | Shift: серия";
        } else {
            text = "R: Rotate";
        }

        this.hintEl.textContent = text;
        this.hintEl.style.display = "block";
    }

    public isBuildingMode() {
        return this.activeToolKey !== null;
    }

    public syncActiveTool(toolKey: string | null) {
        this.activeToolKey = toolKey;
        // Для подтипов домов используем "house" как активную кнопку
        if (toolKey && toolKey.startsWith("house:")) {
            this.activeButtonId = "house";
        } else {
            this.activeButtonId = toolKey ? (toolKey.startsWith("glb:") ? "glb" : toolKey) : null;
        }
        this.applyActiveButton(this.activeButtonId);
        this.updateHint(toolKey);
    }

    public setScaleValue(value: number) {
        const clamped = Math.min(6, Math.max(0.1, value));
        this.scaleInput.value = clamped.toFixed(1);
        this.scaleValueEl.textContent = `${clamped.toFixed(1)}×`;
    }

    public setSelectionHint(text: string | null) {
        this.selectionHint = text;
        if (!this.activeToolKey) {
            this.updateHint(null);
        }
    }

    /**
     * Загрузить список объектов, найденных в city.glb
     */
    public setGlbCatalog(items: Array<{ key: string; label: string; sizeLabel?: string }>) {
        this.glbItems = items;
        this.renderGlbOptions();
    }

    private renderGlbOptions() {
        const q = (this.glbSearchInput.value ?? "").trim().toLowerCase();
        const filtered = q.length === 0
            ? this.glbItems
            : this.glbItems.filter(i => (i.label + " " + (i.sizeLabel ?? "")).toLowerCase().includes(q));

        this.glbSelect.innerHTML = "";
        for (const item of filtered) {
            const opt = document.createElement("option");
            opt.value = item.key;
            opt.textContent = item.sizeLabel ? `${item.label} (${item.sizeLabel})` : item.label;
            this.glbSelect.appendChild(opt);
        }
    }

}
