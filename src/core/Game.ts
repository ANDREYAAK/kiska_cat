import * as THREE from "three";
import { Engine } from "@core/Engine";
import { Input } from "@core/Input";
import { OrbitCameraController } from "@core/OrbitCameraController";
import { World } from "@world/World";
import { Player } from "@entities/Player";
import { BUILDING_LAYOUT } from "@entities/Building";
import { Hud } from "@ui/Hud";
import { BuildingUI } from "@ui/BuildingUI";
import { BuildingSystem } from "@world/BuildingSystem";
import { AudioManager } from "@core/AudioManager";
import { QuestManager } from "@core/QuestManager";
import { GAME_CONFIG } from "@config/game";
import { WORLD_CONFIG } from "@config/world";
import { AssetLoader } from "@utils/AssetLoader";
import { SaveManager } from "@core/SaveManager";
import { AuthManager } from "@core/AuthManager";
import { HybridStorageAdapter } from "@core/HybridStorageAdapter";
import { AutoSaveManager } from "@core/AutoSaveManager";
import { normalizeObjectPivot } from "@utils/mesh";



export class Game {
    private engine: Engine;
    private hud: Hud;
    private buildingUI: BuildingUI;
    private buildingSystem: BuildingSystem;
    private input: Input;
    private world: World;
    private player: Player;
    private questManager: QuestManager;
    private audioManager: AudioManager;
    private cameraController: OrbitCameraController;
    private assetLoader: AssetLoader;
    private saveManager: SaveManager;
    private authManager: AuthManager;
    private autoSaveManager: AutoSaveManager;

    // State
    private promoDismissedByLabel: Record<string, boolean> = {};
    private activePromoLabel: string | null = null;
    private shownPromoLabel: string | null = null;
    private selectedParkedCar: THREE.Object3D | null = null;
    private drivingCar: THREE.Object3D | null = null;
    private isDriving = false;
    private drivingYaw = 0;
    private enterCarRadius = 8.0;
    private smokePuffs: Array<{
        mesh: THREE.Mesh;
        velocity: THREE.Vector3;
        life: number;
        maxLife: number;
    }> = [];
    private smokeGeo = new THREE.SphereGeometry(0.12, 8, 8);
    private parkedCarRoots: THREE.Object3D[] = [];

    private raycaster = new THREE.Raycaster();
    private pointer = new THREE.Vector2();
    private up = new THREE.Vector3(0, 1, 0);
    private carMove = new THREE.Vector3();
    private carForward = new THREE.Vector3();
    private carRight = new THREE.Vector3();
    public isFreeCamera = false;



    private readonly drivingSpeed = 12;
    private readonly drivingSprintMultiplier = 1.4;
    private readonly carCollisionRadius = 1.7;

    constructor(container: HTMLElement) {
        this.engine = new Engine(container);
        this.hud = new Hud(container);
        this.input = new Input(this.hud.element);
        this.world = new World();
        this.player = new Player();
        this.questManager = new QuestManager(this.world.group, this.hud);
        this.assetLoader = new AssetLoader();

        // Инициализация авторизации
        this.authManager = new AuthManager();

        // Гибридное хранилище: локальное + серверное
        // По умолчанию используем локальный сервер, чтобы работало без .env
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
        const storage = new HybridStorageAdapter(this.authManager, apiUrl);
        this.saveManager = new SaveManager(storage);

        // Настройка колбэков для сохранений
        this.saveManager.setCallbacks({
            onSaveComplete: (slotId) => {
                this.hud.showMessage(`Игра сохранена: ${slotId === "autosave" ? "Автосохранение" : slotId}`, { durationMs: 2000 });
            },
            onSaveError: (error) => {
                this.hud.showMessage(`Ошибка сохранения: ${error.message}`, { durationMs: 3000 });
            },
            onLoadComplete: (slotId) => {
                this.hud.showMessage(`Игра загружена: ${slotId === "autosave" ? "Автосохранение" : slotId}`, { durationMs: 2000 });
            },
            onLoadError: (error) => {
                this.hud.showMessage(`Ошибка загрузки: ${error.message}`, { durationMs: 3000 });
            }
        });

        // Building Mode: сначала создаём систему, потом UI (UI сразу вызывает колбэки)
        this.buildingSystem = new BuildingSystem(
            this.world,
            this.engine.camera,
            this.engine.renderer.domElement
        );
        // Автосохранение при изменениях
        this.autoSaveManager = new AutoSaveManager(this.saveManager);
        this.autoSaveManager.onSaveStart(() => {
            // Можно показать индикатор сохранения
        });
        this.autoSaveManager.onSaveComplete(() => {
            // Можно скрыть индикатор
        });

        // Подписываемся на изменения объектов
        this.buildingSystem.getRegistry().onChange(() => {
            this.autoSaveManager.updateState({
                objects: this.buildingSystem.getRegistry().getAll()
            });
        });
        this.buildingUI = new BuildingUI(container, {
            onToolSelect: (tool) => {
                this.buildingSystem.setTool(tool);
            },
            onScaleChange: (scale) => {
                if (!this.buildingSystem.hasActiveTool() && this.buildingSystem.getSelectedObject()) {
                    this.buildingSystem.setSelectedScale(scale);
                } else {
                    this.buildingSystem.setPlacementScale(scale);
                }
            },
            onGlbOptionsChange: (opts) => {
                this.buildingSystem.setFreePlacementForProps(opts.free);
                this.buildingSystem.setAlignPropsToSurface(opts.stick);
                this.buildingSystem.setFlipSurfaceNormal(opts.flip);
            },
            onColorChange: (color) => {
                this.buildingSystem.setCurrentColor(color);
            },
            onQuickRotate: () => {
                this.buildingSystem.rotateSelectedStep();
            },
            onMoveSelected: (dx, dz) => {
                const step = this.buildingSystem.getGridStep();
                this.buildingSystem.moveSelectedBy(dx * step, dz * step);
            },
            onFreeCamToggle: (enabled) => {
                this.isFreeCamera = enabled;
                this.cameraController.setFreeMode(enabled);
                if (enabled) {
                    this.hud.showMessage("Свободная камера: ВКЛ (Перемещение мышью + ПКМ)", { durationMs: 3000 });
                } else {
                    this.hud.showMessage("Свободная камера: ВЫКЛ", { durationMs: 2000 });
                    // Return camera to active target
                    const target = this.buildingSystem.getSelectedObject()?.mesh
                        ?? (this.isDriving && this.drivingCar ? this.drivingCar : this.player.object);
                    if (target) this.cameraController.setTarget(target);
                }
            }
        });
        this.buildingSystem.setOnToolChange((tool) => {
            this.buildingUI.syncActiveTool(tool);
        });
        this.buildingSystem.setAutoSelectAfterPlace(true);
        this.buildingSystem.setOnSelectionChange((obj) => {
            this.buildingUI.setSelectionControlsVisible(!!obj);
            if (!obj) {
                this.buildingUI.setSelectionHint(null);
                // DISABLED: Do not snap back to player on deselect, let user control camera.
                // if (!this.isFreeCamera) {
                //    const currentTarget = this.isDriving && this.drivingCar ? this.drivingCar : this.player.object;
                //    this.cameraController.setTarget(currentTarget);
                // }
                return;
            }
            // DISABLED: Do not snap to object on select.
            // this.cameraController.setTarget(obj.mesh);

            const isProp = obj.type === "prop";
            if (isProp) {
                const scale = this.buildingSystem.getSelectedScale();
                if (scale) this.buildingUI.setScaleValue(scale);
            }
            const hint = isProp
                ? "Кнопки-стрелки: двигать | Повернуть: 90° | Q/E: докрутка | F: перевернуть | X/Z: поворот (Shift: 90°) | Ctrl+R: сброс | +/-: масштаб"
                : "Кнопки-стрелки: двигать | Повернуть: 90° | Q/E: поворот | X/Z: на бок/вверх ногами (Shift: 90°) | Ctrl+R: сброс | Shift: быстрый шаг";
            this.buildingUI.setSelectionHint(hint);
        });

        // Регистрация существующих объектов мира в системе строительства
        this.world.registerExistingObjects(this.buildingSystem.getRegistry());

        // Загружаем последнее сохранение при старте
        setTimeout(() => {
            this.loadGame("autosave").catch((err) => {
                console.warn("[Game] Auto-load failed:", err);
            });
        }, 0);

        // Audio
        this.audioManager = new AudioManager("./sounds/music.mp3", 0.8);
        this.hud.onMusicToggle(() => {
            const enabled = this.audioManager.toggle();
            this.hud.setMusicIcon(enabled);
        });

        // Save/Load handlers
        this.hud.onSaveGame(async () => {
            await this.saveGame("autosave");
        });
        this.hud.onLoadGame(async () => {
            await this.loadGame("autosave");
        });

        this.initScene();
        this.initPlayer();
        this.initInput();

        this.cameraController = new OrbitCameraController(
            this.engine.camera,
            this.engine.renderer.domElement,
            this.player.object
        );

        this.parkedCarRoots = this.world.getParkedCarObjects();

        // Автосохранение будет вызываться в update()

        // Loop
        this.engine.addUpdatable(this.world, { update: (dt) => this.update(dt) });

        // Обработка горячих клавиш для сохранения/загрузки
        this.initSaveHotkeys();
    }

    /**
     * Инициализация горячих клавиш для сохранения/загрузки
     */
    private initSaveHotkeys(): void {
        document.addEventListener("keydown", async (e) => {
            // Ctrl+S - сохранить
            if (e.ctrlKey && e.key === "s") {
                e.preventDefault();
                await this.saveGame("autosave");
            }
            // Ctrl+L - загрузить
            if (e.ctrlKey && e.key === "l") {
                e.preventDefault();
                await this.loadGame("autosave");
            }
        });
    }

    /**
     * Сохранить игру
     */
    public async saveGame(slotId: string = "autosave"): Promise<void> {
        const objects = this.buildingSystem.getRegistry().getAll();
        const playerPos = this.isDriving && this.drivingCar
            ? this.drivingCar.position
            : this.player.object.position;
        const playerRot = this.isDriving && this.drivingCar
            ? this.drivingCar.rotation.y
            : this.player.object.rotation.y;

        // Находим ID машины, если в машине
        let drivingCarId: string | undefined;
        if (this.isDriving && this.drivingCar) {
            const carObj = this.buildingSystem.getRegistry().getAll()
                .find(obj => obj.mesh === this.drivingCar);
            drivingCarId = carObj?.id;
        }

        await this.saveManager.save(
            slotId,
            objects,
            playerPos,
            playerRot,
            this.isDriving,
            drivingCarId
        );
    }



    /**
     * Загрузить игру
     */
    public async loadGame(slotId: string = "autosave"): Promise<void> {
        const saveData = await this.saveManager.load(slotId);
        if (!saveData) {
            this.hud.showMessage("Сохранение не найдено", { durationMs: 2000 });
            return;
        }

        // Очищаем все объекты игрока
        this.buildingSystem.clearPlayerObjects();

        // Восстанавливаем объекты
        for (const objData of saveData.objects) {
            try {
                this.buildingSystem.restoreObject(objData);
            } catch (error) {
                console.error(`[Game] Failed to restore object ${objData.id}:`, error);
            }
        }

        // Восстанавливаем позицию игрока
        if (saveData.playerPosition) {
            const pos = new THREE.Vector3(
                saveData.playerPosition.x,
                saveData.playerPosition.y,
                saveData.playerPosition.z
            );
            this.player.object.position.copy(pos);

            if (saveData.playerRotation !== undefined) {
                this.player.object.rotation.y = saveData.playerRotation;
            }
        }

        // Восстанавливаем состояние машины (если было)
        if (saveData.isDriving && saveData.drivingCarId) {
            // Находим машину по ID
            const carObj = this.buildingSystem.getRegistry().get(saveData.drivingCarId);
            if (carObj && carObj.mesh) {
                this.selectedParkedCar = carObj.mesh as THREE.Object3D;
            }
        } else {
            // Выходим из машины, если были в ней
            if (this.isDriving && this.drivingCar) {
                this.world.parkCarAt(this.drivingCar);
                this.parkedCarRoots = this.world.getParkedCarObjects();
                this.isDriving = false;
                this.drivingCar = null;
                this.player.object.visible = true;
                this.input.setDriving(false);
                this.cameraController.setTarget(this.player.object);
            }
        }

        this.hud.showMessage(`Загружено объектов: ${saveData.objects.length}`, { durationMs: 2000 });



    }

    /**
     * Получить менеджер сохранений (для UI)
     */
    public getSaveManager(): SaveManager {
        return this.saveManager;
    }

    /**
     * Получить менеджер авторизации (для UI)
     */
    public getAuthManager(): AuthManager {
        return this.authManager;
    }

    private initScene() {
        this.engine.scene.background = new THREE.Color(GAME_CONFIG.skyBottomColor);
        this.engine.scene.fog = new THREE.Fog(GAME_CONFIG.fogColor, GAME_CONFIG.fogNear, GAME_CONFIG.fogFar);
        this.engine.addToScene(this.world.group, this.player.object);

        const ambient = new THREE.AmbientLight(GAME_CONFIG.ambientColor, 0.7);
        const hemi = new THREE.HemisphereLight(GAME_CONFIG.skyBottomColor, "#a7e1c2", 0.95);
        const sun = new THREE.DirectionalLight(GAME_CONFIG.sunColor, 1.7);
        sun.position.set(16, 22, 10);
        sun.castShadow = true;
        sun.shadow.mapSize.set(1024, 1024);
        sun.shadow.camera.near = 2;
        sun.shadow.camera.far = 80;
        sun.shadow.camera.left = -30;
        sun.shadow.camera.right = 30;
        sun.shadow.camera.top = 30;
        sun.shadow.camera.bottom = -30;

        const fill = new THREE.DirectionalLight("#eaf5ff", 0.28);
        fill.position.set(-12, 14, -18);
        fill.castShadow = false;

        this.engine.addToScene(ambient, hemi, sun, fill);

        // --- city.glb DELETED (removed per user request) ---
        // Инициализируем переменные, которые использовались внутри колбэка
        const templates: Record<string, THREE.Object3D> = {};
        const catalogItems: Array<{ key: string; label: string; sizeLabel?: string }> = [];

        // Блок для изоляции, чтобы сохранить совместимость с существующей структурой (если нужно)
        {
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // ВАЖНО: Обновляем UI каталог, иначе игрок не увидит новые объекты в меню GLB
            this.buildingUI.setGlbCatalog(catalogItems);
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


            // Логируем все доступные ключи для отладки Casa
            console.log("[Game] Available GLB templates:", Object.keys(templates));
            if (templates["casa"]) console.log("[Game] Found 'casa' template");
            if (templates["base_casa"]) console.log("[Game] Found 'base_casa' template");

            // --- Загрузка lowpolycity_house_01.glb ---
            this.assetLoader.loadGLTF("/lowpolycity_house_01.glb").then((houseScene) => {
                console.log("[Game] Loading lowpolycity_house_01.glb...");

                // Из GLB хедера видно структуру: Sketchfab_model -> 3454... -> RootNode -> house_01
                // Попробуем найти house_01 напрямую или взять всю сцену
                let houseModel: THREE.Object3D | null = null;

                houseScene.traverse((child) => {
                    if (child.name === "house_01") {
                        houseModel = child;
                    }
                });

                if (!houseModel) {
                    console.log("[Game] 'house_01' node not found by name. Searching for ANY Mesh...");
                    houseScene.traverse((child) => {
                        if (!houseModel && child instanceof THREE.Mesh && child.geometry) {
                            houseModel = child;
                            console.log("[Game] Found fallback mesh:", child.name);
                        }
                    });

                    if (!houseModel) {
                        console.warn("[Game] No suitable mesh found in GLB. Cloning full scene.");
                        houseModel = houseScene.clone(true) as THREE.Object3D;
                    } else {
                        houseModel = (houseModel as THREE.Object3D).clone(true);
                    }
                } else {
                    houseModel = (houseModel as THREE.Object3D).clone(true);
                    console.log("[Game] Found specific 'house_01' node");
                }

                // --- Safe check to ensure we have a valid Object3D ---
                // FIX: Use 'let' so we can reassign it later (normalizeObjectPivot returns a new Group)
                let houseModelSafe = houseModel as THREE.Object3D;

                // HARD RESET TRANSFORMS
                houseModelSafe.position.set(0, 0, 0);
                // FIX ORIENTATION: User reported "lying on side".
                // Usually means we need -90 deg rotation on X.
                houseModelSafe.rotation.set(-Math.PI / 2, 0, 0);
                houseModelSafe.scale.set(1, 1, 1);
                houseModelSafe.updateMatrixWorld(true);

                // FORCE SCALE
                // 0.0005 invisible.
                // 0.01 invisible? Or maybe just underground due to rotation?
                // Let's try 0.02 and fix rotation.
                const forcedScale = 0.02;
                houseModelSafe.scale.setScalar(forcedScale);
                houseModelSafe.updateMatrixWorld(true);

                console.log(`[Game] Applied FORCED scale ${forcedScale} to 'house_01'`);

                // Fix: Assign the wrapper returned by normalizeObjectPivot
                houseModelSafe = normalizeObjectPivot(houseModelSafe);

                // RESTORE KEY: User reported "House with stairs" (house_01) broken.
                // We map this GLB model back to "house_01" so existing houses work.
                templates["house_01"] = houseModelSafe;

                // Remove any "new_house_01" entry from catalog if we added it previously
                const invalidIdx = catalogItems.findIndex(i => i.key === "new_house_01");
                if (invalidIdx !== -1) catalogItems.splice(invalidIdx, 1);

                // Add "house_01" to catalog correctly
                const existingIdx = catalogItems.findIndex(i => i.key === "house_01");
                if (existingIdx !== -1) catalogItems.splice(existingIdx, 1);

                const finalBox = new THREE.Box3().setFromObject(houseModelSafe);
                const finalSize = new THREE.Vector3();
                finalBox.getSize(finalSize);

                catalogItems.push({
                    key: "house_01",
                    label: "� Дом с лестницей",
                    sizeLabel: `${finalSize.x.toFixed(1)}x${finalSize.z.toFixed(1)}`
                });

                console.log("[Game] ✓ Restored 'house_01' template (House with Stairs)");

                this.buildingSystem.setObjectTemplates(templates);
                this.world.buildingManager.setGlbTemplates(templates);

                this.buildingUI.setGlbCatalog(catalogItems);
            }).catch(err => {
                console.error("[Game] Failed to load lowpolycity_house_01.glb:", err);
            });

            // Загружаем GLTF модель Case напрямую и извлекаем данные для игровой логики
            this.assetLoader.loadGLTF("/2nd__low_poly_shop/scene.gltf").then((caseScene) => {
                // Нормализуем модель Case (как в makeGlbTemplate)
                const caseModel = caseScene.clone(true);
                caseModel.scale.set(1, 1, 1);
                caseModel.rotation.set(0, 0, 0);
                caseModel.updateMatrixWorld(true);

                // Нормализуем размер до 1 единицы по максимальному измерению
                const box = new THREE.Box3().setFromObject(caseModel);
                const size = new THREE.Vector3();
                box.getSize(size);
                const maxDim = Math.max(0.0001, Math.max(size.x, size.y, size.z));
                const unitScale = 1 / maxDim;
                caseModel.scale.setScalar(unitScale);
                caseModel.updateMatrixWorld(true);

                // ИЗВЛЕКАЕМ ДАННЫЕ ИЗ GLTF для игровой логики:
                // Универсальный поиск двери по разным возможным названиям
                let doorNode: THREE.Object3D | null = null;
                const doorKeywords = ["porta", "door", "вход", "entrance", "дверь"];

                caseScene.traverse((child) => {
                    if (!doorNode && child.name) {
                        const lowerName = child.name.toLowerCase();
                        // Ищем по ключевым словам
                        if (doorKeywords.some(keyword => lowerName.includes(keyword))) {
                            doorNode = child;
                        }
                    }
                });

                // Вычисляем позицию двери относительно центра модели
                let doorLocalPos = { x: 0, z: 0 };
                if (doorNode) {
                    // Позиция двери из GLTF node matrix: (-197.67, 107.45, -42.99) * 0.01
                    // После нормализации нужно пересчитать
                    const doorWorldPos = new THREE.Vector3();
                    (doorNode as THREE.Object3D).getWorldPosition(doorWorldPos);

                    // Преобразуем в локальные координаты относительно центра модели
                    const modelCenter = new THREE.Vector3();
                    box.getCenter(modelCenter);
                    doorLocalPos = {
                        x: (doorWorldPos.x - modelCenter.x) * unitScale,
                        z: (doorWorldPos.z - modelCenter.z) * unitScale
                    };
                } else {
                    // Fallback: используем данные из GLTF напрямую
                    // porta node: позиция (-197.67, 107.45, -42.99) * 0.01 = (-1.977, 1.075, -0.43)
                    // После нормализации нужно учесть масштаб
                    doorLocalPos = { x: -1.977 * unitScale, z: -0.43 * unitScale };
                }

                // Нормализуем pivot (центрируем)
                normalizeObjectPivot(caseModel);

                // Сохраняем данные двери в userData модели для использования в игровой логике
                caseModel.userData.casaDoorPosition = doorLocalPos;
                caseModel.userData.casaBaseSize = {
                    width: size.x * unitScale,
                    depth: size.z * unitScale
                };

                // Добавляем в шаблоны
                templates["casa"] = caseModel;
                console.log("[Game] Loaded Case model from GLTF, size:", size, "scale:", unitScale, "door pos:", doorLocalPos);
            }).catch(err => {
                console.error("[Game] Failed to load Case GLTF:", err);
            });

            // Загружаем машину из city/scene.gltf
            // Используем правильный путь к файлу
            const carGltfPath = "/city/scene.gltf";
            console.log("[Game] Attempting to load car model from:", carGltfPath);

            // Проверяем доступность файла перед загрузкой (для диагностики)
            fetch(carGltfPath, { method: 'HEAD' })
                .then(response => {
                    console.log("[Game] File availability check:", {
                        url: carGltfPath,
                        status: response.status,
                        contentType: response.headers.get('content-type'),
                        ok: response.ok
                    });
                    if (!response.ok) {
                        console.warn("[Game] File may not be accessible:", response.status, response.statusText);
                    }
                })
                .catch(err => {
                    console.warn("[Game] Could not check file availability:", err);
                });

            this.assetLoader.loadGLTF(carGltfPath).then((cityScene) => {
                console.log("[Game] ✓ Successfully loaded city/scene.gltf, searching for car model...");
                // Ищем объект машины (macchina.001 или первый найденный)
                let carNode: THREE.Object3D | null = null;

                cityScene.traverse((child) => {
                    if (!carNode && child.name) {
                        const lowerName = child.name.toLowerCase();
                        const name = child.name;

                        // СТРОГО исключаем знаки ПЕРВЫМ делом - это критично!
                        // Проверяем на знаки ДО всех других проверок
                        if (lowerName.includes("cartello") ||
                            lowerName.includes("sign") ||
                            lowerName.includes("segnale") ||
                            lowerName.includes("semaforo")) {
                            return; // Это знак или светофор, пропускаем полностью
                        }

                        // Исключаем материалы и стекла
                        if (lowerName.includes("_materiale") ||
                            lowerName.includes("_vetro")) {
                            return;
                        }

                        // Исключаем автобусы
                        if (lowerName.includes("bus")) {
                            return;
                        }

                        // Проверяем, что это транспортное средство
                        let isVehicle = false;

                        // 1. Проверяем "macchina" (итальянское слово для машины)
                        // Поддерживаем разные варианты: macchina, macchina.001, macchina_001, macchina001, macchina 001
                        if (lowerName === "macchina" ||
                            lowerName.startsWith("macchina.") ||
                            lowerName.startsWith("macchina_") ||
                            lowerName.startsWith("macchina ") ||
                            // Добавляем поддержку "macchina001", "macchina002" и т.д. (без разделителя)
                            /^macchina\d+/.test(lowerName)) {
                            isVehicle = true;
                            console.log("[Game] ✓ Matched vehicle by 'macchina' pattern:", child.name);
                        }
                        // 2. Проверяем "car" - ТОЛЬКО как отдельное слово через regex
                        // \b означает границу слова, это НЕ найдет "car" внутри "cartello"
                        else if (/\bcar\b/i.test(name)) {
                            // Дополнительная проверка: убеждаемся, что это не "cartello"
                            // Если после "car" идет "t", то это может быть "cartello"
                            const carMatch = name.match(/\bcar\b/i);
                            if (carMatch) {
                                const afterCar = name.substring(carMatch.index! + 3).toLowerCase();
                                // Если после "car" идет "t" и потом еще буквы, это может быть "cartello"
                                // Но если это просто "car" или "car." или "car_", то это машина
                                if (!afterCar.startsWith("t") || afterCar.length === 0 || /^[^a-z]/.test(afterCar)) {
                                    isVehicle = true;
                                }
                            }
                        }
                        // 3. Другие варианты
                        else if (lowerName.includes("машина") || lowerName.includes("vehicle")) {
                            isVehicle = true;
                        }

                        // Если это транспортное средство и это меш/группа - сохраняем
                        if (isVehicle && (child instanceof THREE.Group || child instanceof THREE.Mesh)) {
                            carNode = child;
                            console.log("[Game] ✓ Found car node:", child.name);
                        }
                    }
                });

                if (carNode) {
                    // ФИНАЛЬНАЯ ПРОВЕРКА: убеждаемся, что это действительно машина, а не знак
                    const carNodeNonNull = carNode as THREE.Object3D; // TypeScript workaround
                    const finalCheck = carNodeNonNull.name.toLowerCase();
                    const isActuallySign = finalCheck.includes("cartello") || finalCheck.includes("sign") || finalCheck.includes("segnale");

                    if (isActuallySign) {
                        console.warn("[Game] Rejected object from city GLTF - it's a sign, not a car:", carNodeNonNull.name);
                        console.warn("[Game] Please check city/scene.gltf - car model may be missing or incorrectly named");
                    } else {
                        // Клонируем найденную машину
                        let carModel: THREE.Object3D = carNodeNonNull.clone(true);
                        carModel.scale.set(1, 1, 1);
                        carModel.rotation.set(0, 0, 0);
                        carModel.position.set(0, 0, 0);
                        carModel.updateMatrixWorld(true);

                        // СНАЧАЛА проверяем ориентацию ДО нормализации pivot
                        const boxBefore = new THREE.Box3().setFromObject(carModel);
                        const sizeBefore = new THREE.Vector3();
                        boxBefore.getSize(sizeBefore);

                        console.log("[Game] Car model initial orientation check:", {
                            size: sizeBefore,
                            maxDimension: Math.max(sizeBefore.x, sizeBefore.y, sizeBefore.z),
                            whichAxisIsMax: sizeBefore.x > sizeBefore.y && sizeBefore.x > sizeBefore.z ? "X" :
                                sizeBefore.y > sizeBefore.z ? "Y" : "Z"
                        });

                        // Определяем самую длинную ось
                        // const maxDimBefore = Math.max(sizeBefore.x, sizeBefore.y, sizeBefore.z);

                        // Если Y - самая длинная ось (или почти самая длинная), значит машина "стоит на носу/попе"
                        // Для машины высота должна быть меньше длины и ширины (обычно).
                        // Если высота больше ширины ИЛИ больше длины (с запасом) - значит надо повернуть.
                        const isStandingUp = sizeBefore.y > sizeBefore.x * 1.2 || sizeBefore.y > sizeBefore.z * 1.2;

                        if (isStandingUp) {
                            console.log("[Game] Car model is standing up (Y is large) - applying rotation correction (-90° X)");
                            // Поворачиваем модель на -90° по X, чтобы машина легла на колеса
                            carModel.rotation.x = -Math.PI / 2;
                            carModel.updateMatrixWorld(true);
                        } else {
                            console.log("[Game] Car model is flat (correct for car) - keeping orientation");
                        }

                        // ВАЖНО: После проверки и поворота нормализуем pivot (центрируем модель)
                        // normalizeObjectPivot возвращает новый Group - нужно сохранить результат
                        carModel = normalizeObjectPivot(carModel);
                        carModel.updateMatrixWorld(true);

                        // --- АВТОВЫРАВНИВАНИЕ МАШИНЫ ПО КОЛЁСАМ ---
                        // Применяем выравнивание после нормализации pivot
                        this.alignVehicleByWheels(carModel);

                        // Пересчитываем размеры после нормализации и выравнивания
                        const box = new THREE.Box3().setFromObject(carModel);
                        const size = new THREE.Vector3();
                        box.getSize(size);

                        const maxDim = Math.max(0.0001, Math.max(size.x, size.y, size.z));
                        const targetSize = 3.5;
                        const unitScale = targetSize / maxDim;
                        carModel.scale.setScalar(unitScale);
                        carModel.updateMatrixWorld(true);
                        console.log("[Game] Applied scaling: targetSize =", targetSize, "maxDim =", maxDim, "scale =", unitScale);

                        // ВАЖНО: Поворот 180° убран - выравнивание по колёсам уже правильно ориентирует машину

                        // Финальная проверка размеров
                        const finalBox = new THREE.Box3().setFromObject(carModel);
                        const finalSize = new THREE.Vector3();
                        finalBox.getSize(finalSize);

                        // Добавляем в шаблоны
                        templates["car_gltf"] = carModel;
                        console.log("[Game] ✓ Loaded car_gltf template:", {
                            name: carNodeNonNull.name,
                            finalSize: finalSize,
                            rotation: carModel.rotation,
                            scale: unitScale,
                            hasChildren: carModel.children.length > 0
                        });
                    }
                } else {
                    console.warn("[Game] ✗ Car model not found in city/scene.gltf by exact match");
                    console.warn("[Game] Attempting fallback: searching for ANY macchina object...");

                    // Fallback: берем первый найденный объект с "macchina" в названии (кроме знаков)
                    let fallbackCar: THREE.Object3D | null = null;
                    cityScene.traverse((child) => {
                        if (!fallbackCar && child.name && (child instanceof THREE.Group || child instanceof THREE.Mesh)) {
                            const lower = child.name.toLowerCase();
                            // Исключаем знаки и материалы
                            if ((lower.includes("macchina") || /\bcar\b/i.test(child.name)) &&
                                !lower.includes("cartello") &&
                                !lower.includes("sign") &&
                                !lower.includes("segnale") &&
                                !lower.includes("_materiale") &&
                                !lower.includes("_vetro") &&
                                !lower.includes("bus")) {
                                fallbackCar = child;
                                console.log("[Game] ✓ Found fallback car object:", child.name);
                            }
                        }
                    });

                    if (fallbackCar) {
                        // Используем найденный объект - применяем ТОЧНО ТАКИЕ ЖЕ настройки, как в основном коде
                        const fbCar = fallbackCar as THREE.Object3D;
                        let carModel: THREE.Object3D = fbCar.clone(true);
                        carModel.scale.set(1, 1, 1);
                        carModel.rotation.set(0, 0, 0);
                        carModel.position.set(0, 0, 0);
                        carModel.updateMatrixWorld(true);

                        // СНАЧАЛА проверяем ориентацию ДО нормализации pivot
                        const boxBefore = new THREE.Box3().setFromObject(carModel);
                        const sizeBefore = new THREE.Vector3();
                        boxBefore.getSize(sizeBefore);

                        // Если Y больше других измерений - модель стоит
                        const isStandingUp = sizeBefore.y > sizeBefore.x * 1.2 || sizeBefore.y > sizeBefore.z * 1.2;

                        if (isStandingUp) {
                            // Поворачиваем модель на -90° по X ДО нормализации pivot
                            carModel.rotation.x = -Math.PI / 2;
                            carModel.updateMatrixWorld(true);
                            console.log("[Game] [Fallback] Applied rotation correction (was standing up), size before:", sizeBefore);
                        } else {
                            console.log("[Game] [Fallback] Car model is flat (correct), keeping orientation");
                        }

                        // ВАЖНО: После проверки и поворота нормализуем pivot (центрируем модель)
                        // normalizeObjectPivot возвращает новый Group - нужно сохранить результат
                        carModel = normalizeObjectPivot(carModel);
                        carModel.updateMatrixWorld(true);


                        // Пересчитываем размеры после нормализации и выравнивания
                        const box = new THREE.Box3().setFromObject(carModel);
                        const size = new THREE.Vector3();
                        box.getSize(size);

                        // Нормализуем размер до 3.5 метров
                        const maxDim = Math.max(0.0001, Math.max(size.x, size.y, size.z));
                        const targetSize = 3.5;
                        const unitScale = targetSize / maxDim;
                        carModel.scale.setScalar(unitScale);
                        carModel.updateMatrixWorld(true);
                        console.log("[Game] [Fallback] Applied scaling: targetSize =", targetSize, "maxDim =", maxDim, "scale =", unitScale);

                        // ВАЖНО: Поворот 180° убран - выравнивание по колёсам уже правильно ориентирует машину

                        // Финальная проверка размеров
                        const finalBox = new THREE.Box3().setFromObject(carModel);
                        const finalSize = new THREE.Vector3();
                        finalBox.getSize(finalSize);

                        templates["car_gltf"] = carModel;
                        console.log("[Game] ✓ Loaded car_gltf using fallback object:", (fallbackCar as THREE.Object3D).name, "finalSize:", finalSize);
                    } else {
                        console.warn("[Game] ✗ No suitable fallback car object found in city/scene.gltf");
                        // Логируем все объекты для отладки
                        cityScene.traverse((child) => {
                            if (child.name) {
                                const lower = child.name.toLowerCase();
                                if (lower.includes("macchina") || lower.includes("car") || lower.includes("cartello")) {
                                    console.log("[Game] Found object:", child.name, "isSign:", lower.includes("cartello") || lower.includes("sign"));
                                }
                            }
                        });
                    }
                }
            }).catch(err => {
                console.error("[Game] ✗ Failed to load city/scene.gltf:", err);
                console.error("[Game] Error details:", {
                    message: err?.message || String(err),
                    type: (err as any)?.type,
                    status: (err as any)?.status,
                    responseURL: (err as any)?.responseURL,
                    url: carGltfPath
                });
                console.warn("[Game] Possible reasons:");
                console.warn("  1. File path is incorrect or file not accessible by server");
                console.warn("  2. Server returns HTML (404 page) instead of GLTF file");
                console.warn("  3. GLTF file references .bin file that can't be loaded");
                console.warn("[Game] Will try to use car from city.glb catalog as fallback for car_gltf");
                // Не добавляем car_gltf здесь - будет использован fallback из city.glb каталога ниже
            });

            // Если car_gltf не загрузился из /city/scene.gltf, но есть car из city.glb - используем его


            // Отладочное логирование шаблонов
            console.log("[Game] Setting object templates:");
            console.log("  - car_gltf available:", !!templates["car_gltf"]);
            console.log("  - car available:", !!templates["car"]);
            if (templates["car_gltf"]) {
                console.log("[Game] car_gltf template details:", {
                    name: templates["car_gltf"].name,
                    children: templates["car_gltf"].children.length,
                    position: templates["car_gltf"].position,
                    rotation: templates["car_gltf"].rotation,
                    scale: templates["car_gltf"].scale
                });
            }

            this.buildingSystem.setObjectTemplates(templates);
            this.buildingUI.setGlbCatalog(catalogItems);

            // Передаем шаблоны в BuildingManager для использования в статических зданиях
            this.world.buildingManager.setGlbTemplates(templates);

            // Реестр транспорта для TrafficSystem
            const vehicleTemplates: Record<string, THREE.Object3D> = {};
            if (templates.car) vehicleTemplates.car = templates.car;
            if (templates.bus) vehicleTemplates.bus = templates.bus;
            if (templates.truck) vehicleTemplates.truck = templates.truck;
            if (templates.camion) vehicleTemplates.bus = templates.camion; // Синоним

            if (this.world.trafficSystem) {
                this.world.trafficSystem.setVehicleTemplates(vehicleTemplates);
            }


        }
    }




    private initPlayer() {
        const bank = WORLD_CONFIG.buildings.find((b) => b.label === "МТС БАНК") ?? WORLD_CONFIG.buildings[0];
        if (bank) {
            const rot = (bank as { rotation?: number }).rotation ?? 0;
            const doorLocalZ = bank.size.z / 2 + BUILDING_LAYOUT.door.localZOutset;
            const dirX = Math.sin(rot);
            const dirZ = Math.cos(rot);
            const doorX = bank.position.x + dirX * doorLocalZ;
            const doorZ = bank.position.z + dirZ * doorLocalZ;
            const spawnDistance = 4.2;
            this.player.setSpawn({ x: doorX + dirX * spawnDistance, z: doorZ + dirZ * spawnDistance, yaw: rot });
        }

        this.hud.onPromoClosed(() => {
            if (this.shownPromoLabel) this.promoDismissedByLabel[this.shownPromoLabel] = true;
        });
    }

    /**
     * Попытка автоматически выровнять модель транспорта, анализируя положение колес.
     * Эвристика:
     * 1. Находим объекты с именами wheel/ruota/tire.
     * 2. Если колес >= 2, определяем направление оси машины.
     * 3. Ориентируем модель так, чтобы длинная сторона была вдоль Z.
     */
    private alignVehicleByWheels(model: THREE.Object3D) {
        // Ищем колёса
        const wheels: THREE.Object3D[] = [];
        model.traverse((child) => {
            const name = child.name.toLowerCase();
            if (name.includes("wheel") || name.includes("ruota") || name.includes("tire") ||
                name.includes("cerchione") || name.includes("gomma")) {
                wheels.push(child);
            }
        });

        console.log(`[alignVehicleByWheels] Found ${wheels.length} wheels in model "${model.name}"`);

        if (wheels.length >= 2) {
            // Получаем мировые позиции колёс
            const wheelPositions: THREE.Vector3[] = [];
            for (const wheel of wheels) {
                const worldPos = new THREE.Vector3();
                wheel.getWorldPosition(worldPos);
                wheelPositions.push(worldPos);
            }

            // Находим ось машины как линию между крайними колёсами по X или Z
            // Сортируем по Z
            wheelPositions.sort((a, b) => a.z - b.z);
            const front = wheelPositions[wheelPositions.length - 1];
            const back = wheelPositions[0];

            // Вектор от задних к передним колёсам
            const axisVec = new THREE.Vector3().subVectors(front, back);
            axisVec.y = 0; // Игнорируем высоту

            if (axisVec.length() > 0.01) {
                // Вычисляем угол относительно оси Z
                const angle = Math.atan2(axisVec.x, axisVec.z);

                console.log(`[alignVehicleByWheels] Axis vector: (${axisVec.x.toFixed(2)}, ${axisVec.z.toFixed(2)}), angle: ${(angle * 180 / Math.PI).toFixed(1)}°`);

                // Если угол существенный (больше 5°), корректируем
                if (Math.abs(angle) > Math.PI / 36) { // 5 градусов
                    model.rotation.y -= angle;
                    model.updateMatrixWorld(true);
                    console.log(`[alignVehicleByWheels] Applied rotation correction: ${(-angle * 180 / Math.PI).toFixed(1)}°`);
                }
            }
        } else {
            // Fallback: если колёс нет, используем bounding box
            model.updateMatrixWorld(true);
            const box = new THREE.Box3().setFromObject(model);
            const size = new THREE.Vector3();
            box.getSize(size);

            console.log(`[alignVehicleByWheels] No wheels found, using bounding box: ${size.x.toFixed(2)} x ${size.y.toFixed(2)} x ${size.z.toFixed(2)}`);

            // Для машины обычно длина (Z) должна быть больше ширины (X)
            // Если X ≈ Z, модель может быть повёрнута диагонально

            // Определяем, какая ось самая длинная (должна быть Z для машины)
            const maxDim = Math.max(size.x, size.y, size.z);
            // const minDim = Math.min(size.x, size.y, size.z);

            // Если Y самая длинная - модель стоит вертикально, это ошибка
            if (maxDim === size.y && size.y > size.x * 1.2 && size.y > size.z * 1.2) {
                console.log(`[alignVehicleByWheels] Model is standing vertically (Y is largest), skipping rotation`);
            }
            // Если X > Z (машина "широкая"), поворачиваем на 90°
            else if (size.x > size.z * 1.2) {
                console.log(`[alignVehicleByWheels] Model is sideways (X > Z), rotating 90°`);
                model.rotation.y += Math.PI / 2;
                model.updateMatrixWorld(true);
            }
            // Если X ≈ Z (диагональная ориентация), пытаемся найти правильную ориентацию по форме
            else if (Math.abs(size.x - size.z) / Math.max(size.x, size.z) < 0.15) {
                // X и Z примерно равны - модель может быть диагональной (повёрнута на 45°)
                // Пытаемся найти правильную ориентацию, поворачивая модель и проверяя размеры
                console.log(`[alignVehicleByWheels] Model has square-ish dimensions (X ≈ Z), attempting to find correct orientation`);

                // Для машин обычно длина должна быть больше ширины
                // Если после поворота на 45° получается правильное соотношение, используем это
                // Но так как мы не знаем правильную ориентацию, оставляем как есть
                // Использование угла парковки при размещении должно помочь
                console.log(`[alignVehicleByWheels] Cannot auto-align square-ish model, will rely on parking angle at placement`);
            }
            // Иначе модель уже правильно ориентирована (Z > X)
            else {
                console.log(`[alignVehicleByWheels] Model orientation looks correct (Z > X), no rotation needed`);
            }
        }
    }


    private startMusic = async () => {
        if (this.audioManager.isEnabled()) {
            try {
                this.hud.showMessage("Music: Resuming...", { durationMs: 1000 });
                const success = await this.audioManager.play();
                if (success) {
                    this.hud.showMessage("Music: Playing!", { durationMs: 2000 });
                    this.removeMusicListeners();
                } else {
                    this.hud.showMessage("Tap button to play music", { durationMs: 3000 });
                    this.removeMusicListeners();
                    this.hud.showPlayMusicButton(async () => {
                        await this.audioManager.play();
                        this.hud.showMessage("Music: Playing!", { durationMs: 2000 });
                    });
                }
            } catch (e) {
                this.hud.showMessage("Music Error: " + e, { durationMs: 3000 });
            }
        }
    };

    private removeMusicListeners() {
        document.removeEventListener("click", this.startMusic, true);
        document.removeEventListener("keydown", this.startMusic, true);
        document.removeEventListener("touchstart", this.startMusic, true);
        document.removeEventListener("pointerdown", this.startMusic, true);
    }

    private initInput() {
        document.addEventListener("click", this.startMusic, true);
        document.addEventListener("keydown", this.startMusic, true);
        document.addEventListener("touchstart", this.startMusic, true);
        document.addEventListener("pointerdown", this.startMusic, true);

        this.engine.renderer.domElement.addEventListener("pointerdown", (event) => {
            if (this.isDriving) return;
            if (event.button !== 0) return;

            const rect = this.engine.renderer.domElement.getBoundingClientRect();
            this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            this.raycaster.setFromCamera(this.pointer, this.engine.camera);
            const hits = this.raycaster.intersectObjects(this.parkedCarRoots, true);

            if (hits.length === 0) return;
            const root = this.findParkedCarRoot(hits[0]?.object ?? null);
            if (!root) return;

            const dx = this.player.object.position.x - root.position.x;
            const dz = this.player.object.position.z - root.position.z;
            const dist = Math.hypot(dx, dz);

            if (dist > this.enterCarRadius) {
                this.hud.showMessage("Подойдите ближе к машине");
                return;
            }
            this.selectedParkedCar = root;
        });
    }

    private findParkedCarRoot(obj: THREE.Object3D | null) {
        let cur: THREE.Object3D | null = obj;
        while (cur) {
            if (cur.userData?.parkedCar) return cur;
            cur = cur.parent;
        }
        return null;
    }

    private spawnExhaustSmoke(car: THREE.Object3D, yaw: number) {
        const back = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
        for (let i = 0; i < 6; i += 1) {
            const mat = new THREE.MeshStandardMaterial({ color: "#4a4f55", transparent: true, opacity: 0.65 });
            const puff = new THREE.Mesh(this.smokeGeo, mat);
            const localPos = new THREE.Vector3(0, 0.35, -2.1).add(
                new THREE.Vector3((Math.random() - 0.5) * 0.25, 0, (Math.random() - 0.5) * 0.2)
            );
            const worldPos = car.localToWorld(localPos);
            puff.position.copy(worldPos);
            puff.castShadow = false;
            puff.receiveShadow = false;
            this.engine.scene.add(puff);
            this.smokePuffs.push({
                mesh: puff,
                velocity: new THREE.Vector3(
                    back.x * (0.2 + Math.random() * 0.2),
                    0.6 + Math.random() * 0.4,
                    back.z * (0.2 + Math.random() * 0.2)
                ),
                life: 0,
                maxLife: 0.9 + Math.random() * 0.4
            });
        }
    }

    public start() {
        this.engine.start();
    }

    private update(dt: number) {
        if (!this.isDriving && this.selectedParkedCar) {
            this.drivingCar = this.world.occupyParkedCar(this.selectedParkedCar) ?? this.selectedParkedCar;
            this.selectedParkedCar = null;
            this.parkedCarRoots = this.world.getParkedCarObjects();
            this.isDriving = true;
            this.player.object.visible = false;
            this.hud.showMessage("Котик сел в машину");
            if (this.drivingCar) {
                this.cameraController.setTarget(this.drivingCar);
                this.drivingYaw = this.drivingCar.rotation.y;
                this.spawnExhaustSmoke(this.drivingCar, this.drivingYaw);
            }
            this.input.setExitVisible(true);
            this.input.setDriving(true);
        }

        const currentPos = this.isDriving && this.drivingCar ? this.drivingCar.position : this.player.object.position;
        this.questManager.update(dt, currentPos);

        const move = this.input.getMoveVector();
        const sprint = this.input.isSprinting();
        const jump = this.input.consumeJumpPressed();
        const length = Math.hypot(move.x, move.z);

        if (!this.isDriving && this.input.consumeEnterPressed()) {
            const nearby = this.world.findParkedCarNear(
                { x: this.player.object.position.x, z: this.player.object.position.z },
                this.enterCarRadius
            );
            if (nearby?.car?.object) {
                this.selectedParkedCar = nearby.car.object;
            } else {
                this.hud.showMessage("Подойдите ближе к машине");
            }
        }

        if (this.isDriving && this.drivingCar && (this.input.consumeExitPressed() || this.input.consumeEnterPressed())) {
            const parked = this.world.parkCarAt(this.drivingCar);
            this.parkedCarRoots = this.world.getParkedCarObjects();
            this.isDriving = false;
            this.drivingCar = null;
            this.player.object.visible = true;
            this.input.setDriving(false);
            this.cameraController.setTarget(this.player.object);
            if (parked) {
                const yaw = parked.rotation.y;
                this.carRight.set(Math.cos(yaw), 0, -Math.sin(yaw));
                const exitPos = parked.position.clone().addScaledVector(this.carRight, 2.2);
                this.player.object.position.set(exitPos.x, 0, exitPos.z);
                const resolved = this.world.resolvePlayerMovement(this.player.object.position, 0.9);
                this.player.object.position.x = resolved.x;
                this.player.object.position.z = resolved.z;
            }
            this.hud.showMessage("Котик вышел из машины");
        }

        if (this.isFreeCamera) {
            // Free Camera Movement
            if (length > 0.01) {
                // Determine speed (boost with sprint)
                const camSpeed = sprint ? 1.5 : 0.6; // Speed per frame or relative
                // Actually panCamera helper might use move.x/move.z which are normalized * speed?
                // Inputs are normalized direction. We apply speed here.
                this.cameraController.panCamera(move.x * camSpeed, move.z * camSpeed);
            }
            // Ensure player stays put (update checks gravity etc but no input movement)
            const gh = this.world.getWorldHeight(this.player.object.position.x, this.player.object.position.z);
            this.player.update(dt, { x: 0, z: 0 }, { sprint: false, jump: false }, gh);

        } else if (!this.isDriving) {
            if (length > 0.01) {
                const forward = new THREE.Vector3();
                this.engine.camera.getWorldDirection(forward);
                forward.y = 0;
                forward.normalize();

                const right = new THREE.Vector3().crossVectors(forward, this.up).normalize();
                const worldMove = new THREE.Vector3()
                    .addScaledVector(right, move.x)
                    .addScaledVector(forward, move.z);

                const gh = this.world.getWorldHeight(this.player.object.position.x, this.player.object.position.z);
                this.player.update(dt, { x: worldMove.x, z: worldMove.z }, { sprint, jump }, gh);
            } else {
                const gh = this.world.getWorldHeight(this.player.object.position.x, this.player.object.position.z);
                this.player.update(dt, { x: 0, z: 0 }, { sprint, jump }, gh);
            }
        } else if (this.drivingCar) {
            // Car Physics
            const throttle = move.z;
            const steerInput = -move.x;
            const maxSpeed = this.drivingSpeed * (sprint ? this.drivingSprintMultiplier : 1);
            const targetSpeed = throttle * maxSpeed;

            if (typeof this.drivingCar.userData.speed !== 'number') this.drivingCar.userData.speed = 0;

            const accel = 6.0 * dt;
            const decel = 10.0 * dt;

            if (Math.abs(targetSpeed) > Math.abs(this.drivingCar.userData.speed)) {
                this.drivingCar.userData.speed = THREE.MathUtils.lerp(this.drivingCar.userData.speed, targetSpeed, accel);
            } else {
                this.drivingCar.userData.speed = THREE.MathUtils.lerp(this.drivingCar.userData.speed, targetSpeed, decel);
            }

            if (Math.abs(this.drivingCar.userData.speed) < 0.1 && Math.abs(throttle) < 0.05) {
                this.drivingCar.userData.speed = 0;
            }

            const currentSteer = this.drivingCar.userData.currentSteer ?? 0;
            const steerLerpSpeed = 4.0;
            const maxSteerAngle = 0.6;
            const targetSteerAngle = steerInput * maxSteerAngle;
            const newSteer = THREE.MathUtils.lerp(currentSteer, targetSteerAngle, steerLerpSpeed * dt);
            this.drivingCar.userData.currentSteer = newSteer;

            const currentSpeed = this.drivingCar.userData.speed;
            const wheelbase = 2.4;

            if (Math.abs(currentSpeed) > 0.01) {
                const angularVelocity = (currentSpeed / wheelbase) * Math.tan(newSteer);
                this.drivingYaw += angularVelocity * dt;

                this.carForward.set(Math.sin(this.drivingYaw), 0, Math.cos(this.drivingYaw));
                this.carMove.copy(this.carForward).multiplyScalar(currentSpeed * dt);

                this.drivingCar.position.add(this.carMove);
                this.drivingCar.rotation.y = this.drivingYaw;

                this.cameraController.updateFollowYaw(this.drivingYaw, dt);
            }

            if (this.drivingCar.userData.carInstance) {
                const pwr = Math.abs(currentSpeed / maxSpeed);
                this.drivingCar.userData.carInstance.updateSmoke(dt, pwr);
            }
        }

        if (!this.isDriving) {
            const resolved = this.world.resolvePlayerMovement(this.player.object.position, 0.9);
            this.player.object.position.x = resolved.x;
            this.player.object.position.z = resolved.z;
        } else if (this.drivingCar) {
            const resolved = this.world.resolveCarMovement(this.drivingCar.position, this.carCollisionRadius, this.drivingCar);
            this.drivingCar.position.x = resolved.x;
            this.drivingCar.position.z = resolved.z;
        }

        if (this.drivingCar) {
            const h = this.world.getWorldHeight(this.drivingCar.position.x, this.drivingCar.position.z);
            this.drivingCar.position.y = h + 0.22;
        }

        if (!this.isDriving) {
            this.world.updateDoors(dt, this.player.object.position);
            this.world.updateParkedCarDoors(dt, this.player.object.position, this.enterCarRadius, this.enterCarRadius + 0.6);
        } else {
            this.world.closeAllParkedCarDoors(dt);
        }

        if (this.smokePuffs.length > 0) {
            for (let i = this.smokePuffs.length - 1; i >= 0; i -= 1) {
                const puff = this.smokePuffs[i]!;
                puff.life += dt;
                puff.mesh.position.addScaledVector(puff.velocity, dt);
                const k = 1 - Math.min(1, puff.life / puff.maxLife);
                puff.mesh.scale.setScalar(1 + (1 - k) * 0.8);
                const mat = puff.mesh.material as THREE.MeshStandardMaterial;
                mat.opacity = 0.65 * k;
                if (puff.life >= puff.maxLife) {
                    this.engine.scene.remove(puff.mesh);
                    this.smokePuffs.splice(i, 1);
                }
            }
        }

        this.checkPromos();

        // Обновляем состояние автосохранения (позиция игрока)
        this.autoSaveManager.updateState({
            playerPosition: this.isDriving && this.drivingCar
                ? this.drivingCar.position
                : this.player.object.position,
            playerRotation: this.isDriving && this.drivingCar
                ? this.drivingCar.rotation.y
                : this.player.object.rotation.y,
            isDriving: this.isDriving,
            drivingCarId: this.isDriving && this.drivingCar
                ? this.buildingSystem.getRegistry().getAll().find(obj => obj.mesh === this.drivingCar)?.id
                : undefined
        });

        this.cameraController.update();
        if (this.isDriving && this.drivingCar) {
            this.hud.updateMinimap({ x: this.drivingCar.position.x, z: this.drivingCar.position.z, yaw: this.drivingCar.rotation.y });
        } else {
            this.hud.updateMinimap({ x: this.player.object.position.x, z: this.player.object.position.z, yaw: this.player.object.rotation.y });
        }
    }

    private checkPromos() {
        const promos = [
            {
                label: "МТС БАНК",
                text: "УРА! Вам выдали кредитную карту. Изучите город, чтобы найти скидки!"
            },
            {
                label: "МТС SHOP",
                text: "С вашей Кредитной картой доступен кешбэк до 20% на всю технику",
                action: {
                    label: "Открыть каталог",
                    onClick: () => {
                        window.open("https://shop.mts.ru/catalog", "_blank");
                    }
                }
            },
            {
                label: "Магазин одежды",
                text: "Вам доступна скидка 3% на одежду по вашей кредитной карте"
            },
            {
                label: "МЕДСИ",
                text: "Кешбэк 10 процентов на любые процедуры"
            }
        ] as const;

        let nearPromo: (typeof promos)[number] | null = null;
        if (!this.isDriving) {
            for (const p of promos) {
                const building = WORLD_CONFIG.buildings.find((b) => b.label === p.label);
                if (!building) continue;

                const radius = Math.max(building.size.x, building.size.z) / 2 + 4.5;
                const dist = Math.hypot(
                    this.player.object.position.x - building.position.x,
                    this.player.object.position.z - building.position.z
                );

                if (dist <= radius) {
                    nearPromo = p;
                    break;
                }
            }
        }

        if (nearPromo) {
            if (this.activePromoLabel && this.activePromoLabel !== nearPromo.label) {
                this.promoDismissedByLabel[this.activePromoLabel] = false;
                this.shownPromoLabel = null;
            }
            this.activePromoLabel = nearPromo.label;

            this.questManager.checkObjectiveReached(nearPromo.label);

            const dismissed = this.promoDismissedByLabel[nearPromo.label] === true;
            if (!dismissed && this.shownPromoLabel !== nearPromo.label) {
                // @ts-ignore
                this.hud.showPromo(nearPromo.text, nearPromo.action);
                this.shownPromoLabel = nearPromo.label;
            }
        } else if (this.activePromoLabel) {
            this.promoDismissedByLabel[this.activePromoLabel] = false;
            this.activePromoLabel = null;
            this.shownPromoLabel = null;
            this.hud.hidePromo();
        }
    }

    dispose() {
        this.engine.dispose();
        this.removeMusicListeners();
    }
}
