/**
 * SaveSerializer - Сериализация и десериализация игровых данных
 * 
 * Преобразует игровые объекты в JSON и обратно для сохранения/загрузки
 */
import * as THREE from "three";
import { PlaceableObject, PlaceableType } from "@world/PlaceableObject";

/**
 * Сериализованное представление объекта
 */
export interface SerializedPlaceableObject {
    id: string;
    type: PlaceableType;
    position: { x: number; y: number; z: number };
    rotation: number;
    metadata?: Record<string, unknown>;
    placedByPlayer: boolean;
}

/**
 * Состояние игры для сохранения
 */
export interface GameSaveData {
    version: string;
    timestamp: number;
    playerPosition?: { x: number; y: number; z: number };
    playerRotation?: number;
    isDriving?: boolean;
    drivingCarId?: string;
    objects: SerializedPlaceableObject[];
}

export class SaveSerializer {
    private static readonly SAVE_VERSION = "1.0.0";

    /**
     * Сериализовать объект в JSON-совместимый формат
     */
    static serializeObject(obj: PlaceableObject): SerializedPlaceableObject {
        return {
            id: obj.id,
            type: obj.type,
            position: {
                x: obj.position.x,
                y: obj.position.y,
                z: obj.position.z
            },
            rotation: obj.rotation,
            metadata: obj.metadata ? { ...obj.metadata } : undefined,
            placedByPlayer: obj.placedByPlayer
        };
    }

    /**
     * Сериализовать все объекты игрока
     */
    static serializeObjects(objects: PlaceableObject[]): SerializedPlaceableObject[] {
        return objects
            .filter(obj => obj.placedByPlayer)
            .map(obj => this.serializeObject(obj));
    }

    /**
     * Создать полное сохранение игры
     */
    static createSaveData(
        objects: PlaceableObject[],
        playerPosition?: THREE.Vector3,
        playerRotation?: number,
        isDriving?: boolean,
        drivingCarId?: string
    ): GameSaveData {
        return {
            version: this.SAVE_VERSION,
            timestamp: Date.now(),
            playerPosition: playerPosition ? {
                x: playerPosition.x,
                y: playerPosition.y,
                z: playerPosition.z
            } : undefined,
            playerRotation,
            isDriving,
            drivingCarId,
            objects: this.serializeObjects(objects)
        };
    }

    /**
     * Валидация данных сохранения
     */
    static validateSaveData(data: unknown): data is GameSaveData {
        if (!data || typeof data !== "object") return false;
        const save = data as Partial<GameSaveData>;
        
        if (!save.version || typeof save.version !== "string") return false;
        if (typeof save.timestamp !== "number") return false;
        if (!Array.isArray(save.objects)) return false;

        // Проверяем структуру объектов
        for (const obj of save.objects) {
            if (!obj.id || typeof obj.id !== "string") return false;
            if (!obj.type || typeof obj.type !== "string") return false;
            if (!obj.position || typeof obj.position.x !== "number" || 
                typeof obj.position.y !== "number" || typeof obj.position.z !== "number") return false;
            if (typeof obj.rotation !== "number") return false;
        }

        return true;
    }

    /**
     * Получить версию сохранения
     */
    static getSaveVersion(): string {
        return this.SAVE_VERSION;
    }
}
