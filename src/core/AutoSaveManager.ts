/**
 * AutoSaveManager - Умное автосохранение при изменениях
 * 
 * Особенности:
 * - Debounce: сохраняет через N секунд после последнего изменения
 * - Batch updates: собирает все изменения и сохраняет разом
 * - Оптимистичные обновления: UI обновляется сразу
 * - Минимальная нагрузка на БД
 */
import { SaveManager } from "./SaveManager";
import { PlaceableObject } from "@world/PlaceableObject";
import * as THREE from "three";

export interface SaveState {
    objects: PlaceableObject[];
    playerPosition?: THREE.Vector3;
    playerRotation?: number;
    isDriving?: boolean;
    drivingCarId?: string;
}

export class AutoSaveManager {
    private saveManager: SaveManager;
    private saveState: SaveState | null = null;
    private saveTimer: number | null = null;
    private isSaving = false;
    private pendingChanges = false;

    // Настройки
    private readonly debounceDelay = 2000; // Сохранять через 2 секунды после последнего изменения
    private readonly minSaveInterval = 500; // Минимум 500мс между сохранениями
    private lastSaveTime = 0;

    // Колбэки
    private onSaveStartCallbacks: Array<() => void> = [];
    private onSaveCompleteCallbacks: Array<() => void> = [];
    private onSaveErrorCallbacks: Array<(error: Error) => void> = [];

    constructor(saveManager: SaveManager) {
        this.saveManager = saveManager;
    }

    /**
     * Обновить состояние для сохранения
     */
    updateState(state: Partial<SaveState>): void {
        if (!this.saveState) {
            this.saveState = {
                objects: state.objects || [],
                playerPosition: state.playerPosition,
                playerRotation: state.playerRotation,
                isDriving: state.isDriving,
                drivingCarId: state.drivingCarId
            };
        } else {
            if (state.objects) this.saveState.objects = state.objects;
            if (state.playerPosition !== undefined) this.saveState.playerPosition = state.playerPosition;
            if (state.playerRotation !== undefined) this.saveState.playerRotation = state.playerRotation;
            if (state.isDriving !== undefined) this.saveState.isDriving = state.isDriving;
            if (state.drivingCarId !== undefined) this.saveState.drivingCarId = state.drivingCarId;
        }

        this.scheduleSave();
    }

    /**
     * Запланировать сохранение (с debounce)
     */
    private scheduleSave(): void {
        this.pendingChanges = true;

        // Отменяем предыдущий таймер
        if (this.saveTimer !== null) {
            clearTimeout(this.saveTimer);
        }

        // Устанавливаем новый таймер
        this.saveTimer = window.setTimeout(() => {
            this.performSave();
        }, this.debounceDelay);
    }

    /**
     * Выполнить сохранение
     */
    private async performSave(): Promise<void> {
        if (this.isSaving || !this.saveState || !this.pendingChanges) {
            return;
        }

        // Проверяем минимальный интервал
        const now = Date.now();
        if (now - this.lastSaveTime < this.minSaveInterval) {
            // Переносим сохранение на чуть позже
            this.saveTimer = window.setTimeout(() => {
                this.performSave();
            }, this.minSaveInterval - (now - this.lastSaveTime));
            return;
        }

        this.isSaving = true;
        this.pendingChanges = false;
        this.saveTimer = null;

        try {
            this.onSaveStartCallbacks.forEach(cb => cb());

            await this.saveManager.save(
                "autosave",
                this.saveState.objects,
                this.saveState.playerPosition,
                this.saveState.playerRotation,
                this.saveState.isDriving,
                this.saveState.drivingCarId
            );

            this.lastSaveTime = Date.now();
            this.onSaveCompleteCallbacks.forEach(cb => cb());
        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            console.error("[AutoSaveManager] Save failed:", err);
            this.onSaveErrorCallbacks.forEach(cb => cb(err));
            // Помечаем, что есть несохранённые изменения
            this.pendingChanges = true;
        } finally {
            this.isSaving = false;
        }
    }

    /**
     * Принудительно сохранить сейчас (без debounce)
     */
    async forceSave(): Promise<void> {
        if (this.saveTimer !== null) {
            clearTimeout(this.saveTimer);
            this.saveTimer = null;
        }
        await this.performSave();
    }

    /**
     * Проверить, есть ли несохранённые изменения
     */
    hasPendingChanges(): boolean {
        return this.pendingChanges || this.isSaving;
    }

    /**
     * Колбэки
     */
    onSaveStart(callback: () => void): void {
        this.onSaveStartCallbacks.push(callback);
    }

    onSaveComplete(callback: () => void): void {
        this.onSaveCompleteCallbacks.push(callback);
    }

    onSaveError(callback: (error: Error) => void): void {
        this.onSaveErrorCallbacks.push(callback);
    }

    /**
     * Очистить таймеры при уничтожении
     */
    dispose(): void {
        if (this.saveTimer !== null) {
            clearTimeout(this.saveTimer);
            this.saveTimer = null;
        }
    }
}
