// props.ts

export interface PropConfig {
    scale?: number;
    rotation?: [number, number, number]; // [x, y, z] в радианах или градусах? Давай в радианах для THREE.
    yOffset?: number;
    label?: string;
}

/**
 * Конфигурация для "легализации" объектов из city.glb.
 * Ключ — это очищенное имя объекта (cleanName в Game.ts).
 */
export const PROP_CONFIGS: Record<string, PropConfig> = {
    "bus": {
        scale: 11.0,
        rotation: [0, -Math.PI / 2, 0],
    },
    "cartello": {
        rotation: [-Math.PI / 2, 0, 0],
        scale: 1.2
    },
    "cartello_direzione": {
        rotation: [-Math.PI / 2, 0, 0],
        scale: 1.2
    },
    "cartello_p": {
        rotation: [-Math.PI / 2, 0, 0],
        scale: 1.2
    },
    "cartello_triangolo": {
        rotation: [-Math.PI / 2, 0, 0],
        scale: 1.2
    },
    "base_casa": {
        scale: 5.0, // Увеличено в 2 раза (было 2.5) - теперь дом будет в 2 раза больше
        rotation: [-Math.PI / 2, 0, 0] // Поворот на -90° по X, чтобы дом стоял на земле (дверь не смотрит в небо)
    },
    "casa": {
        scale: 5.0, // Увеличено в 2 раза (было 2.5) - теперь дом будет в 2 раза больше
        rotation: [-Math.PI / 2, 0, 0] // Поворот на -90° по X, чтобы дом стоял на земле (дверь не смотрит в небо)
    },
    "cespuglio": {
        scale: 1.0
    },
    "macchina": {
        scale: 4.5,
        rotation: [-Math.PI / 2, 0, 0] // Поворот на -90° по X, чтобы машина стояла на колесах
    },
    "car": {
        scale: 4.5,
        rotation: [-Math.PI / 2, 0, 0] // Поворот на -90° по X, чтобы машина стояла на колесах
    },
    "car_gltf": {
        scale: 4.5,
        rotation: [-Math.PI / 2, 0, 0] // Поворот на -90° по X, чтобы машина стояла на колесах
    },
    // Исправление для фургона с мороженым
    "ice cream camion": {
        scale: 8.0,
        rotation: [-Math.PI / 2, 0, 0]
    },
    // На всякий случай вариант с подчеркиваниями
    "ice_cream_camion": {
        scale: 8.0,
        rotation: [-Math.PI / 2, 0, 0]
    },
    // Пример конфигурации для нового объекта дома
    // Раскомментируйте и настройте под ваш объект:
    // "custom_house": {
    //     scale: 5.0,  // Масштаб в метрах (обычно 5 для домов)
    //     rotation: [0, 0, 0],  // Поворот [x, y, z] в радианах, если нужно
    //     yOffset: 0  // Смещение по Y, если объект "утопает" в землю
    // },
    // "new_house": {
    //     scale: 5.0
    // },
    // "my_house": {
    //     scale: 5.0
    // }
};

/**
 * Получить конфиг для объекта по его очищенному имени (key)
 */
export function getPropConfig(key: string): PropConfig | undefined {
    // Сначала ищем точное совпадение
    if (PROP_CONFIGS[key]) return PROP_CONFIGS[key];

    // Затем ищем по префиксу до первого подчёркивания или точки (например, "cartello_p" -> "cartello")
    const baseKey = key.split(/[._ ]/)[0];
    if (PROP_CONFIGS[baseKey]) return PROP_CONFIGS[baseKey];

    return undefined;
}
