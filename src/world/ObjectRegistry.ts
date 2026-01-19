/**
 * ObjectRegistry - Реестр всех размещённых объектов в мире
 * 
 * Обеспечивает:
 * - Хранение и поиск объектов
 * - Пространственные запросы (по радиусу, по области)
 * - Поиск пересечений для системы замены
 */
import * as THREE from "three";
import {
    PlaceableObject,
    PlaceableType,
    ConnectionPoint,
    computeBoundsFromMesh
} from "./PlaceableObject";

export class ObjectRegistry {
    /** Все объекты по ID */
    private readonly objects = new Map<string, PlaceableObject>();

    /** Индекс по типу для быстрого поиска */
    private readonly byType = new Map<PlaceableType, Set<string>>();

    /** Группа Three.js для всех размещённых игроком объектов */
    public readonly group = new THREE.Group();

    /** Колбэки для уведомления об изменениях */
    private onChangeCallbacks: Array<() => void> = [];

    constructor() {
        // Инициализируем индексы для всех типов
        const types: PlaceableType[] = [
            "road", "bridge", "house", "tree", "fence",
            "car", "bus", "rock", "bush", "lamp", "bench", "sport", "prop"
        ];
        for (const type of types) {
            this.byType.set(type, new Set());
        }
    }

    // ============================
    // CRUD операции
    // ============================

    /**
     * Добавить объект в реестр
     */
    add(obj: PlaceableObject): void {
        if (this.objects.has(obj.id)) {
            console.warn(`[ObjectRegistry] Object ${obj.id} already exists`);
            return;
        }

        this.objects.set(obj.id, obj);
        this.byType.get(obj.type)?.add(obj.id);

        // Добавляем меш в группу только для объектов игрока
        if (obj.placedByPlayer && obj.mesh) {
            this.group.add(obj.mesh);
        }

        console.log(`[ObjectRegistry] Added ${obj.type} (id: ${obj.id})`);

        // Уведомляем об изменении (для автосохранения)
        if (obj.placedByPlayer) {
            this.notifyObjectChanged(obj.id);
        }
    }

    /**
     * Удалить объект из реестра
     */
    remove(id: string): PlaceableObject | null {
        const obj = this.objects.get(id);
        if (!obj) return null;

        const wasPlayerObject = obj.placedByPlayer;

        // Отключаем соединения
        for (const cp of obj.connectionPoints) {
            if (cp.connectedTo) {
                // Находим ответную точку соединения и отключаем
                for (const otherCp of cp.connectedTo.connectionPoints) {
                    if (otherCp.connectedTo === obj) {
                        otherCp.connectedTo = undefined;
                    }
                }
            }
        }

        // Удаляем меш из сцены
        if (obj.mesh && obj.mesh.parent) {
            obj.mesh.parent.remove(obj.mesh);
        }

        // Удаляем из индексов
        this.objects.delete(id);
        this.byType.get(obj.type)?.delete(id);

        console.log(`[ObjectRegistry] Removed ${obj.type} (id: ${id})`);

        // Уведомляем об изменении (для автосохранения)
        if (wasPlayerObject) {
            this.notifyObjectChanged(id);
        }

        return obj;
    }

    /**
     * Получить объект по ID
     */
    get(id: string): PlaceableObject | undefined {
        return this.objects.get(id);
    }

    /**
     * Получить все объекты
     */
    getAll(): PlaceableObject[] {
        return Array.from(this.objects.values());
    }

    /**
     * Очистить реестр
     */
    clear(): void {
        // Удаляем все меши
        while (this.group.children.length > 0) {
            this.group.remove(this.group.children[0]);
        }

        this.objects.clear();
        for (const set of this.byType.values()) {
            set.clear();
        }
    }

    // ============================
    // Пространственные запросы
    // ============================

    /**
     * Найти все объекты в радиусе от точки
     */
    queryRadius(pos: THREE.Vector3, radius: number): PlaceableObject[] {
        const result: PlaceableObject[] = [];
        const radiusSq = radius * radius;

        for (const obj of this.objects.values()) {
            const dx = obj.position.x - pos.x;
            const dz = obj.position.z - pos.z;
            if (dx * dx + dz * dz <= radiusSq) {
                result.push(obj);
            }
        }

        return result;
    }

    /**
     * Найти все объекты определённого типа
     */
    queryByType(type: PlaceableType): PlaceableObject[] {
        const ids = this.byType.get(type);
        if (!ids) return [];

        return Array.from(ids)
            .map(id => this.objects.get(id))
            .filter((obj): obj is PlaceableObject => obj !== undefined);
    }

    /**
     * Найти все объекты нескольких типов в радиусе
     */
    queryTypesInRadius(
        pos: THREE.Vector3,
        radius: number,
        types: PlaceableType[]
    ): PlaceableObject[] {
        return this.queryRadius(pos, radius)
            .filter(obj => types.includes(obj.type));
    }

    /**
     * Найти объекты, пересекающиеся с заданной областью (AABB)
     * Оптимизировано через предварительный фильтр по радиусу
     */
    findIntersections(bounds: THREE.Box3): PlaceableObject[] {
        const result: PlaceableObject[] = [];
        const center = new THREE.Vector3();
        bounds.getCenter(center);

        const size = new THREE.Vector3();
        bounds.getSize(size);
        const radius = size.length() / 2 + 5; // Запас 5м

        // Сначала берем только объекты поблизости
        const candidates = this.queryRadius(center, radius);

        for (const obj of candidates) {
            if (bounds.intersectsBox(obj.bounds)) {
                result.push(obj);
            }
        }

        return result;
    }

    /**
     * Найти ближайшую точку соединения к позиции
     */
    findNearestConnectionPoint(
        pos: THREE.Vector3,
        maxDistance: number,
        connectionType?: "road" | "bridge"
    ): { point: ConnectionPoint; object: PlaceableObject; distance: number } | null {
        let nearest: { point: ConnectionPoint; object: PlaceableObject; distance: number } | null = null;

        for (const obj of this.objects.values()) {
            for (const cp of obj.connectionPoints) {
                // Фильтр по типу соединения
                if (connectionType && cp.type !== connectionType) continue;

                // Пропускаем уже подключённые точки
                if (cp.connectedTo) continue;

                const dist = pos.distanceTo(cp.position);
                if (dist <= maxDistance && (!nearest || dist < nearest.distance)) {
                    nearest = { point: cp, object: obj, distance: dist };
                }
            }
        }

        return nearest;
    }

    /**
     * Найти все свободные точки соединения в радиусе
     */
    findFreeConnectionPoints(
        pos: THREE.Vector3,
        radius: number,
        connectionType?: "road" | "bridge"
    ): Array<{ point: ConnectionPoint; object: PlaceableObject }> {
        const result: Array<{ point: ConnectionPoint; object: PlaceableObject }> = [];

        for (const obj of this.queryRadius(pos, radius)) {
            for (const cp of obj.connectionPoints) {
                if (connectionType && cp.type !== connectionType) continue;
                if (cp.connectedTo) continue;

                if (pos.distanceTo(cp.position) <= radius) {
                    result.push({ point: cp, object: obj });
                }
            }
        }

        return result;
    }

    // ============================
    // Обновление объектов
    // ============================

    /**
     * Обновить позицию объекта (пересчитывает bounds)
     */
    updatePosition(id: string, newPosition: THREE.Vector3): void {
        const obj = this.objects.get(id);
        if (!obj) return;

        obj.position.copy(newPosition);
        if (obj.mesh) {
            obj.mesh.position.copy(newPosition);
            obj.bounds = computeBoundsFromMesh(obj.mesh);
        }

        // Уведомляем о изменении (для автосохранения)
        this.notifyObjectChanged(id);
    }

    /**
     * Обновить поворот объекта (пересчитывает bounds)
     */
    updateRotation(id: string, newRotation: number): void {
        const obj = this.objects.get(id);
        if (!obj) return;

        obj.rotation = newRotation;
        if (obj.mesh) {
            obj.mesh.rotation.y = newRotation;
            obj.bounds = computeBoundsFromMesh(obj.mesh);
        }

        // Уведомляем о изменении (для автосохранения)
        this.notifyObjectChanged(id);
    }

    // ============================
    // Статистика
    // ============================

    /**
     * Количество объектов в реестре
     */
    get count(): number {
        return this.objects.size;
    }

    /**
     * Количество объектов по типу
     */
    countByType(type: PlaceableType): number {
        return this.byType.get(type)?.size ?? 0;
    }

    /**
     * Вывести статистику в консоль
     */
    logStats(): void {
        console.log(`[ObjectRegistry] Total objects: ${this.count}`);
        for (const [type, ids] of this.byType.entries()) {
            if (ids.size > 0) {
                console.log(`  - ${type}: ${ids.size}`);
            }
        }
    }

    /**
     * Подписаться на изменения объектов
     */
    onChange(callback: () => void): void {
        this.onChangeCallbacks.push(callback);
    }

    /**
     * Уведомить об изменении объекта
     */
    private notifyObjectChanged(id: string): void {
        // Уведомляем только если объект был размещён игроком
        const obj = this.objects.get(id);
        if (obj && obj.placedByPlayer) {
            for (const callback of this.onChangeCallbacks) {
                callback();
            }
        }
    }
}
