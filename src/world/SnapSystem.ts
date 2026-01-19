/**
 * SnapSystem - Система привязки (снаппинга) объектов
 * 
 * Обеспечивает:
 * - Привязку к сетке для дорог
 * - Привязку к краям/точкам соединения объектов
 * - Вычисление финальной позиции и поворота
 */
import * as THREE from "three";
import { ObjectRegistry } from "./ObjectRegistry";
import {
    PlaceableObject,
    PlaceableType,
    PlacementResult,
    ConnectionPoint,
    REPLACEMENT_RULES
} from "./PlaceableObject";

export interface SnapConfig {
    /** Размер сетки для привязки */
    gridSize: number;

    /** Максимальное расстояние для привязки к точке соединения */
    connectionSnapDistance: number;

    /** Максимальное расстояние для привязки к краю объекта */
    edgeSnapDistance: number;

    /** Включена ли привязка к сетке */
    gridSnapEnabled: boolean;

    /** Включена ли привязка к соединениям */
    connectionSnapEnabled: boolean;
}

const DEFAULT_CONFIG: SnapConfig = {
    gridSize: 10,
    connectionSnapDistance: 5,
    edgeSnapDistance: 3,
    gridSnapEnabled: true,
    connectionSnapEnabled: true,
};

export class SnapSystem {
    private readonly registry: ObjectRegistry;
    private config: SnapConfig;

    constructor(registry: ObjectRegistry, config: Partial<SnapConfig> = {}) {
        this.registry = registry;
        this.config = { ...DEFAULT_CONFIG, ...config };
    }

    /**
     * Обновить конфигурацию
     */
    setConfig(config: Partial<SnapConfig>): void {
        this.config = { ...this.config, ...config };
    }

    // ============================
    // Основные методы снаппинга
    // ============================

    /**
     * Вычислить финальную позицию для размещения объекта
     */
    calculatePlacement(
        type: PlaceableType,
        rawPosition: THREE.Vector3,
        rawRotation: number = 0,
        customSize?: THREE.Vector3
    ): PlacementResult {
        let position = rawPosition.clone();
        let rotation = rawRotation;
        const connectedTo: PlaceableObject[] = [];

        // 1. Пробуем привязаться к точке соединения (для мостов/дорог)
        // CRITICAL: Disable connection snap for cars to prevent them from jumping to intersections
        if (this.config.connectionSnapEnabled && (type === "bridge" || type === "road")) {
            const snapResult = this.snapToConnection(position, type);
            if (snapResult) {
                position = snapResult.position;
                rotation = snapResult.rotation;
                connectedTo.push(snapResult.object);
            }
        }

        // 2. Привязка к сетке (если не привязались к соединению)
        if (this.config.gridSnapEnabled && connectedTo.length === 0) {
            position = this.snapToGrid(position, type);
        }

        // 3. Вычисляем bounds для проверки пересечений
        const bounds = this.estimateBounds(type, position, rotation, customSize);

        // 4. Находим объекты для замены
        const intersecting = this.registry.findIntersections(bounds);
        const replacedObjects = this.filterReplaceable(type, intersecting);
        const blockers = intersecting.filter(obj => !replacedObjects.includes(obj));

        // 5. Проверяем, можно ли разместить
        let blocked = blockers.length > 0 && blockers.some(obj => {
            const rules = REPLACEMENT_RULES[type];
            const objRules = REPLACEMENT_RULES[obj.type];
            // Блокируем если приоритет выше ИЛИ если приоритет равен и это тот же тип (предотвращаем наложение)
            // ИСКЛЮЧЕНИЕ: Дома могут накладываться друг на друга для слияния
            if (type === "house" && obj.type === "house") return false;
            // Разрешаем ставить машины и автобусы на дороги и мосты
            if ((type === "car" || type === "bus") && (obj.type === "road" || obj.type === "bridge")) return false;

            return objRules.priority > rules.priority || (objRules.priority === rules.priority && obj.type === type);
        });

        // 6. Находим кандидатов на слияние
        const mergeWith = (type === "house") ? intersecting.filter(obj => obj.type === "house") : undefined;

        // Если есть пересечение с домом, но мы не заменяем его — это потенциальное слияние
        // Но если мы пытаемся поставить дом ТАМ ЖЕ где уже стоит точно такой же дом (по позиции и ротации), 
        // то это может быть избыточно, но BuildingSystem разберется.

        return {
            success: !blocked,
            reason: blocked ? "blocked" : undefined,
            replacedObjects,
            connectedTo,
            finalPosition: position,
            finalRotation: rotation,
            mergeWith
        };
    }

    /**
     * Привязка к сетке (зависит от типа объекта)
     */
    snapToGrid(pos: THREE.Vector3, type?: PlaceableType): THREE.Vector3 {
        let gs = this.config.gridSize;

        // Для домов и мелких объектов используем более мелкую сетку, чтобы не было больших "зазоров"
        if (type === "house") gs = 2;
        if (type === "car" || type === "bus" || type === "lamp" || type === "bench") gs = 0.1;
        if (type === "fence") gs = 0.5;
        if (type === "prop") gs = 0.1;

        return new THREE.Vector3(
            Math.round(pos.x / gs) * gs,
            pos.y,
            Math.round(pos.z / gs) * gs
        );
    }

    /**
     * Привязка к ближайшей точке соединения
     */
    snapToConnection(
        pos: THREE.Vector3,
        type: PlaceableType
    ): { position: THREE.Vector3; rotation: number; object: PlaceableObject } | null {
        const connectionType = type === "bridge" ? "bridge" : "road";

        const nearest = this.registry.findNearestConnectionPoint(
            pos,
            this.config.connectionSnapDistance,
            connectionType
        );

        if (!nearest) return null;

        const { point, object } = nearest;

        // Позиция = точка соединения + смещение в направлении "наружу"
        // Это позволяет новому объекту начинаться от точки соединения
        const offset = point.direction.clone().multiplyScalar(this.config.gridSize / 2);
        const newPosition = point.position.clone().add(offset);

        // Поворот = угол направления точки соединения
        const rotation = Math.atan2(point.direction.x, point.direction.z);

        return {
            position: newPosition,
            rotation,
            object,
        };
    }

    /**
     * Привязка к краю объекта (для заборов и т.д.)
     */
    snapToEdge(
        pos: THREE.Vector3,
        type: PlaceableType
    ): { position: THREE.Vector3; rotation: number; object: PlaceableObject } | null {
        // Находим ближайшие объекты того же типа
        const nearby = this.registry.queryTypesInRadius(pos, this.config.edgeSnapDistance, [type]);

        if (nearby.length === 0) return null;

        // Находим ближайший
        let closest: PlaceableObject | null = null;
        let closestDist = Infinity;

        for (const obj of nearby) {
            const dist = pos.distanceTo(obj.position);
            if (dist < closestDist) {
                closestDist = dist;
                closest = obj;
            }
        }

        if (!closest) return null;

        // Вычисляем позицию "рядом" с объектом
        // Определяем направление от объекта к точке клика
        const direction = new THREE.Vector3()
            .subVectors(pos, closest.position)
            .normalize();

        // Снаппим к краю (с учётом размера объекта)
        const objSize = this.getObjectSize(closest.type);
        const newPosition = closest.position.clone().add(
            direction.multiplyScalar(objSize.x)
        );

        return {
            position: newPosition,
            rotation: closest.rotation,
            object: closest,
        };
    }

    // ============================
    // Вспомогательные методы
    // ============================

    /**
     * Приблизительно оценить bounds объекта по типу с учётом поворота
     */
    public estimateBounds(
        type: PlaceableType,
        position: THREE.Vector3,
        rotation: number,
        customSize?: THREE.Vector3
    ): THREE.Box3 {
        const size = (customSize && customSize.x > 0 && customSize.y > 0 && customSize.z > 0)
            ? customSize
            : this.getObjectSize(type);

        // Учитываем поворот для прямоугольных объектов
        let sx = size.x;
        let sz = size.z;
        // Если поворот близок к 90 или 270 градусам, меняем X и Z местами
        if (Math.abs(Math.sin(rotation)) > 0.7) {
            sx = size.z;
            sz = size.x;
        }

        // Уменьшаем бокс на небольшую величину (зазор), чтобы можно было ставить объекты вплотную
        // Для зданий зазор больше, чтобы компенсировать фундамент
        const gap = type === "house" ? 0.6 : (type === "fence" ? 0.2 : 0.1);
        const halfSize = new THREE.Vector3(
            Math.max(0.1, (sx - gap) / 2),
            size.y / 2,
            Math.max(0.1, (sz - gap) / 2)
        );

        return new THREE.Box3(
            new THREE.Vector3().subVectors(position, halfSize),
            new THREE.Vector3().addVectors(position, halfSize)
        );
    }

    /**
     * Получить примерный размер объекта по типу
     */
    private getObjectSize(type: PlaceableType): THREE.Vector3 {
        switch (type) {
            case "house":
                return new THREE.Vector3(8, 8, 8);
            case "bridge":
                return new THREE.Vector3(10, 2, 10);
            case "road":
                return new THREE.Vector3(10, 0.5, 10);
            case "fence":
                return new THREE.Vector3(10, 1.5, 0.5);
            case "car":
                // Уменьшаем размер коллизии до более реалистичного для парковки
                // Было: 2.5 * 1.8, 1.5 * 3, 4.5 * 1.2 (~4.5 x 4.5 x 5.4)
                // Стало: ~3.5 метра в длину и ширину, чтобы влезать в парковку
                return new THREE.Vector3(3.5, 3.5, 3.5);
            case "bus":
                return new THREE.Vector3(3, 3, 11); // Scaled to new property config
            case "tree":
                return new THREE.Vector3(2, 5, 2);
            case "rock":
                return new THREE.Vector3(1.5, 1, 1.5);
            case "bush":
                return new THREE.Vector3(1, 0.8, 1);
            case "lamp":
                return new THREE.Vector3(0.5, 3, 0.5);
            case "bench":
                return new THREE.Vector3(2.5, 1, 0.8);
            case "prop":
                // Будет переопределяться через customSize при размещении/перемещении,
                // но оставим безопасный дефолт.
                return new THREE.Vector3(2, 2, 2);
            default:
                return new THREE.Vector3(1, 1, 1);
        }
    }

    /**
     * Отфильтровать объекты, которые можно заменить
     */
    private filterReplaceable(
        newType: PlaceableType,
        objects: PlaceableObject[]
    ): PlaceableObject[] {
        const rules = REPLACEMENT_RULES[newType];
        return objects.filter(obj => rules.replaces.includes(obj.type));
    }

    // ============================
    // Визуальная индикация
    // ============================

    /**
     * Получить точки соединения для визуализации при наведении
     */
    getVisibleConnectionPoints(
        pos: THREE.Vector3,
        radius: number,
        connectionType?: "road" | "bridge"
    ): ConnectionPoint[] {
        const points: ConnectionPoint[] = [];

        for (const obj of this.registry.queryRadius(pos, radius)) {
            for (const cp of obj.connectionPoints) {
                if (connectionType && cp.type !== connectionType) continue;
                if (cp.connectedTo) continue;

                points.push(cp);
            }
        }

        return points;
    }
}
