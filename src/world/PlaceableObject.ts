/**
 * Базовые типы и интерфейсы для системы размещения объектов
 */
import * as THREE from "three";

/**
 * Типы размещаемых объектов
 */
export type PlaceableType =
    | "road"
    | "bridge"
    | "house"
    | "tree"
    | "fence"
    | "car"
    | "rock"
    | "bush"
    | "lamp"
    | "bench"
    | "sport"
    | "sign"
    | "bus"
    | "prop";

/**
 * Точка соединения для мостов и дорог
 */
export interface ConnectionPoint {
    /** Мировая позиция точки соединения */
    position: THREE.Vector3;

    /** Направление "наружу" от объекта (нормализованный вектор) */
    direction: THREE.Vector3;

    /** Тип соединения */
    type: "road" | "bridge";

    /** Подключённый объект (если есть) */
    connectedTo?: PlaceableObject;

    /** Локальный ID точки в рамках объекта */
    localId: string;
}

/**
 * Правила замены для типа объекта
 */
export interface ReplacementRule {
    /** Какие типы объектов может заменить этот тип */
    replaces: PlaceableType[];

    /** Приоритет (чем выше, тем "сильнее" объект) */
    priority: number;
}

/**
 * Правила замены для всех типов
 */
export const REPLACEMENT_RULES: Record<PlaceableType, ReplacementRule> = {
    house: { replaces: ["tree", "rock", "bush", "bench"], priority: 10 },
    road: { replaces: ["tree", "rock", "bush"], priority: 8 },
    bridge: { replaces: ["tree", "rock", "bush"], priority: 9 },
    fence: { replaces: ["bush"], priority: 5 },
    car: { replaces: [], priority: 3 },
    tree: { replaces: [], priority: 2 },
    rock: { replaces: [], priority: 2 },
    bush: { replaces: [], priority: 1 },
    lamp: { replaces: ["bush"], priority: 4 },
    bench: { replaces: ["bush"], priority: 3 },
    sport: { replaces: ["tree", "bush", "rock"], priority: 6 },
    sign: { replaces: ["bush"], priority: 4 },
    bus: { replaces: [], priority: 3 },
    // "prop" — произвольные объекты из GLB (клумбы, декоративные элементы и т.д.)
    // По умолчанию ведёт себя как “обычный декор”: не должен пролезать сквозь дома/дороги,
    // но может заменять мелкую зелень вроде кустов.
    prop: { replaces: ["bush"], priority: 4 },
};

/**
 * Основной интерфейс для размещаемого объекта
 */
export interface PlaceableObject {
    /** Уникальный идентификатор объекта */
    id: string;

    /** Тип объекта */
    type: PlaceableType;

    /** Мировая позиция (центр объекта) */
    position: THREE.Vector3;

    /** Поворот вокруг оси Y (в радианах) */
    rotation: number;

    /** 3D-меш объекта */
    mesh: THREE.Object3D;

    /** Границы для проверки пересечений (AABB) */
    bounds: THREE.Box3;

    /** Точки соединения (для мостов/дорог) */
    connectionPoints: ConnectionPoint[];

    /** Был ли объект размещён игроком (или сгенерирован) */
    placedByPlayer: boolean;

    /** Метаданные (цвет машины, тип дерева и т.д.) */
    metadata?: Record<string, unknown>;
}

/**
 * Результат попытки размещения
 */
export interface PlacementResult {
    /** Успешно ли размещение */
    success: boolean;

    /** Причина неудачи (если есть) */
    reason?: "blocked" | "out_of_bounds" | "invalid_position";

    /** Объекты, которые будут заменены */
    replacedObjects: PlaceableObject[];

    /** Объекты, к которым произошло соединение */
    connectedTo: PlaceableObject[];

    /** Финальная позиция (после снаппинга) */
    finalPosition: THREE.Vector3;

    /** Финальный поворот (после снаппинга) */
    finalRotation: number;

    /** Объекты, с которыми можно объединиться (например, дома) */
    mergeWith?: PlaceableObject[];
}

/**
 * Конфигурация для создания объекта
 */
export interface PlaceableConfig {
    type: PlaceableType;
    position: THREE.Vector3;
    rotation?: number;
    metadata?: Record<string, unknown>;
}

/**
 * Утилита для генерации уникальных ID
 */
let objectIdCounter = 0;
export function generateObjectId(type: PlaceableType): string {
    return `${type}_${Date.now()}_${++objectIdCounter}`;
}

/**
 * Утилита для вычисления bounds по мешу
 */
export function computeBoundsFromMesh(mesh: THREE.Object3D): THREE.Box3 {
    const box = new THREE.Box3();
    box.setFromObject(mesh);
    return box;
}

/**
 * Утилита для создания ConnectionPoint
 */
export function createConnectionPoint(
    position: THREE.Vector3,
    direction: THREE.Vector3,
    type: "road" | "bridge",
    localId: string
): ConnectionPoint {
    return {
        position: position.clone(),
        direction: direction.clone().normalize(),
        type,
        localId,
        connectedTo: undefined,
    };
}
