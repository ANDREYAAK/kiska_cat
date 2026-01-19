
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export class AssetLoader {
    private loader = new GLTFLoader();
    private cache: Map<string, THREE.Group> = new Map();
    
    constructor() {
        // Настраиваем DRACO loader для сжатых моделей (если нужно)
        // const dracoLoader = new DRACOLoader();
        // dracoLoader.setDecoderPath('/draco/');
        // this.loader.setDRACOLoader(dracoLoader);
    }

    public async loadGLTF(url: string): Promise<THREE.Group> {
        if (this.cache.has(url)) {
            return this.cache.get(url)!.clone();
        }

        return new Promise((resolve, reject) => {
            // Проверяем, что URL правильный
            console.log("[AssetLoader] Loading GLTF from:", url);
            
            this.loader.load(
                url,
                (gltf) => {
                    console.log("[AssetLoader] ✓ Successfully loaded GLTF:", url);
                    this.cache.set(url, gltf.scene);
                    resolve(gltf.scene.clone());
                },
                (progress) => {
                    // Прогресс загрузки (опционально)
                    if (progress.lengthComputable) {
                        const percent = (progress.loaded / progress.total) * 100;
                        console.log(`[AssetLoader] Loading ${url}: ${percent.toFixed(1)}%`);
                    }
                },
                (error) => {
                    console.error(`[AssetLoader] ✗ Error loading ${url}:`, error);
                    console.error("[AssetLoader] Error details:", {
                        message: error.message,
                        type: error.type,
                        status: (error as any).status,
                        responseURL: (error as any).responseURL
                    });
                    // Пробуем альтернативный путь, если основной не сработал
                    if (url.startsWith("/city/")) {
                        // Может быть нужно без начального слеша или с другим путем
                        console.warn("[AssetLoader] Original path failed, file might not be accessible at this URL");
                    }
                    reject(error);
                }
            );
        });
    }

    /**
     * Extracts a specific node (mesh/group) from the loaded scene by name.
     * Checks recursively.
     */
    public extractNode(scene: THREE.Group, nodeName: string): THREE.Object3D | null {
        let found: THREE.Object3D | null = null;
        scene.traverse((child) => {
            if (found) return;
            if (child.name === nodeName) {
                found = child.clone();
            }
        });
        return found;
    }
}
