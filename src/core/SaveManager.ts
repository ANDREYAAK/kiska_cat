/**
 * SaveManager - Менеджер сохранений игры
 * 
 * Управляет сохранением и загрузкой игрового состояния:
 * - Объекты, размещённые игроком
 * - Позиция игрока
 * - Состояние игры (в машине, и т.д.)
 * 
 * Архитектура:
 * - Использует StorageAdapter для абстракции хранилища
 * - Поддерживает несколько слотов сохранений
 * - Автосохранение (опционально)
 */
import { StorageAdapter, LocalStorageAdapter, IndexedDBAdapter } from "./StorageAdapter";
import { SaveSerializer, GameSaveData } from "./SaveSerializer";
import { PlaceableObject } from "@world/PlaceableObject";
import * as THREE from "three";

export interface SaveSlotInfo {
    slotId: string;
    name: string;
    timestamp: number;
    objectCount: number;
}

export interface SaveLoadCallbacks {
    onSaveStart?: () => void;
    onSaveComplete?: (slotId: string) => void;
    onSaveError?: (error: Error) => void;
    onLoadStart?: () => void;
    onLoadComplete?: (slotId: string) => void;
    onLoadError?: (error: Error) => void;
}

export class SaveManager {
    private storage: StorageAdapter;
    private callbacks: SaveLoadCallbacks = {};
    // private autoSaveEnabled = false;
    private autoSaveInterval: number | null = null;
    private lastAutoSaveTime = 0;
    private readonly autoSaveCooldown = 30000; // 30 секунд

    constructor(storage?: StorageAdapter) {
        // По умолчанию используем IndexedDB, если доступен, иначе localStorage
        if (storage) {
            this.storage = storage;
        } else if (typeof indexedDB !== "undefined") {
            this.storage = new IndexedDBAdapter();
        } else {
            this.storage = new LocalStorageAdapter();
        }
    }

    /**
     * Установить колбэки для событий сохранения/загрузки
     */
    setCallbacks(callbacks: SaveLoadCallbacks): void {
        this.callbacks = { ...this.callbacks, ...callbacks };
    }

    /**
     * Сохранить игру в слот
     */
    async save(
        slotId: string,
        objects: PlaceableObject[],
        playerPosition?: THREE.Vector3,
        playerRotation?: number,
        isDriving?: boolean,
        drivingCarId?: string
    ): Promise<void> {
        try {
            this.callbacks.onSaveStart?.();

            const saveData = SaveSerializer.createSaveData(
                objects,
                playerPosition,
                playerRotation,
                isDriving,
                drivingCarId
            );

            await this.storage.save(slotId, saveData);

            this.callbacks.onSaveComplete?.(slotId);
            console.log(`[SaveManager] Saved to slot: ${slotId} (${saveData.objects.length} objects)`);
        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            console.error("[SaveManager] Save failed:", err);
            this.callbacks.onSaveError?.(err);
            throw err;
        }
    }

    /**
     * Загрузить игру из слота
     */
    async load(slotId: string): Promise<GameSaveData | null> {
        try {
            this.callbacks.onLoadStart?.();

            const saveData = await this.storage.load(slotId);

            if (!saveData) {
                console.warn(`[SaveManager] Save slot not found: ${slotId}`);
                return null;
            }

            // Валидация данных
            if (!SaveSerializer.validateSaveData(saveData)) {
                throw new Error("Invalid save data format");
            }

            this.callbacks.onLoadComplete?.(slotId);
            console.log(`[SaveManager] Loaded from slot: ${slotId} (${saveData.objects.length} objects)`);

            return saveData;
        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            console.error("[SaveManager] Load failed:", err);
            this.callbacks.onLoadError?.(err);
            throw err;
        }
    }

    /**
     * Удалить сохранение
     */
    async delete(slotId: string): Promise<void> {
        try {
            await this.storage.delete(slotId);
            console.log(`[SaveManager] Deleted slot: ${slotId}`);
        } catch (error) {
            console.error("[SaveManager] Delete failed:", error);
            throw error;
        }
    }

    /**
     * Получить список всех сохранений
     */
    async listSaves(): Promise<SaveSlotInfo[]> {
        try {
            const keys = await this.storage.listKeys();
            const saves: SaveSlotInfo[] = [];

            for (const key of keys) {
                const data = await this.storage.load(key);
                if (data) {
                    saves.push({
                        slotId: key,
                        name: this.getSlotName(key),
                        timestamp: data.timestamp,
                        objectCount: data.objects.length
                    });
                }
            }

            // Сортируем по времени (новые первыми)
            saves.sort((a, b) => b.timestamp - a.timestamp);

            return saves;
        } catch (error) {
            console.error("[SaveManager] List saves failed:", error);
            return [];
        }
    }

    /**
     * Проверить, существует ли сохранение
     */
    async exists(slotId: string): Promise<boolean> {
        return await this.storage.exists(slotId);
    }

    /**
     * Автосохранение (сохраняет в слот "autosave")
     */
    async autoSave(
        objects: PlaceableObject[],
        playerPosition?: THREE.Vector3,
        playerRotation?: number,
        isDriving?: boolean,
        drivingCarId?: string
    ): Promise<void> {
        const now = Date.now();
        if (now - this.lastAutoSaveTime < this.autoSaveCooldown) {
            return; // Слишком рано для автосохранения
        }

        try {
            await this.save("autosave", objects, playerPosition, playerRotation, isDriving, drivingCarId);
            this.lastAutoSaveTime = now;
        } catch (error) {
            console.warn("[SaveManager] Auto-save failed:", error);
        }
    }

    /**
     * Включить/выключить автосохранение
     */
    setAutoSave(enabled: boolean, _intervalMs: number = 60000): void {
        // this.autoSaveEnabled = enabled;

        if (this.autoSaveInterval !== null) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }

        if (enabled) {
            // Автосохранение будет вызываться вручную через autoSave()
            // Интервал здесь не устанавливаем, чтобы не дублировать логику
        }
    }

    /**
     * Получить имя слота (для отображения)
     */
    private getSlotName(slotId: string): string {
        if (slotId === "autosave") return "Автосохранение";
        if (slotId.startsWith("slot_")) {
            const num = slotId.replace("slot_", "");
            return `Слот ${num}`;
        }
        return slotId;
    }

    /**
     * Генерировать уникальный ID для нового слота
     */
    generateSlotId(): string {
        const timestamp = Date.now();
        return `slot_${timestamp}`;
    }
}
