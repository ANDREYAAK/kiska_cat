type BuildingConfig = {
  position: { x: number; z: number };
  size: { x: number; y: number; z: number };
  color: string;
  roof: string;
  rotation?: number;
  label?: string;
  labelBg?: string;
  labelTextColor?: string;
  labelAnchor?: "center" | "edgeLeft" | "edgeRight";
  labelAllSides?: boolean;
  shutters?: boolean;
};

export const WORLD_CONFIG = {
  roads: [
    // === Дорожная сеть: “дороги в горизонт” (длинные) + торговая улица ===
    { position: { x: 0, z: 0 }, width: 10, length: 380, center: "dashed" }, // North-South уходит в даль
    { position: { x: 0, z: 0 }, width: 10, length: 380, rotation: Math.PI / 2, center: "dashed" }, // East-West уходит в даль

    // Торговая улица (вдоль неё стоят банк и продукты)
    { position: { x: 0, z: 70 }, width: 10, length: 220, rotation: Math.PI / 2, center: "dashed" },

    // Подъезд к парку/пруду
    { position: { x: -70, z: -10 }, width: 10, length: 170, center: "dashed" },

    // “Европейская” улица: отдельная дорога + ряд домиков на одной стороне
    { position: { x: 65, z: 120 }, width: 8, length: 130, rotation: Math.PI / 2, center: "none" }
  ],
  crosswalks: [] as {
    position: { x: number; z: number };
    width: number;
    length: number;
    rotation?: number;
  }[],
  // === Районы ===
  parks: [
    // Район парк + пруд
    { position: { x: -120, z: -40 }, width: 70, depth: 60 }
  ] as {
    position: { x: number; z: number };
    width: number;
    depth: number;
  }[],

  // Используется генерацией мира (перенесли воду/пляж в “свои” зоны, чтобы ничего не упиралось)
  waterAreas: [
    // Пруд в парке
    { position: { x: -120, z: -50 }, width: 34, depth: 24 }
  ] as { position: { x: number; z: number }; width: number; depth: number }[],
  beachAreas: [
    // Район пляжа
    { position: { x: -150, z: -150 }, width: 90, depth: 46 }
  ] as { position: { x: number; z: number }; width: number; depth: number }[],
  buildings: [
    {
      // Торговый район вдоль торговой улицы (z=28)
      position: { x: -40, z: 102 },
      size: { x: 10, y: 7.5, z: 10 },
      color: "#e30611",
      roof: "#2980b9",
      rotation: Math.PI, // фасад/вход к дороге (чтобы тропинка не шла в стену)
      label: "МТС БАНК"
    },
    {
      position: { x: 40, z: 92 },
      // Делаем одноэтажным и воспринимаем как продуктовый магазин
      size: { x: 12, y: 4.2, z: 8 },
      color: "#27ae60",
      roof: "#27ae60",
      rotation: Math.PI, // дверь к торговой улице
      label: "ПРОДУКТЫ",
      shutters: true
    },
    // Район у парка
    {
      // "МЕДСИ" — большой дом (примерно 3 этажа/ряда окон)
      // Сдвигаем так, чтобы точно не стоял на дороге.
      position: { x: -96, z: 26 },
      size: { x: 24, y: 10, z: 12 },
      color: "#eeeeee",
      roof: "#20b2aa",
      rotation: -Math.PI / 2,
      label: "МЕДСИ",
      // Белая табличка + текст цвета морской волны (и по центру)
      labelTextColor: "#20b2aa",
      labelBg: "#ffffff",
      labelAnchor: "center",
      // Дублируем вывеску на все стороны здания.
      labelAllSides: true
    },
    {
      // Небольшой павильон МТС в зелёной зоне рядом с МЕДСИ
      // Стоит через дорогу от МЕДСИ, фасадом к дороге (как у остальных домов)
      position: { x: -52, z: 26 },
      size: { x: 10, y: 5, z: 8 },
      color: "#e30611",
      roof: "#ffffff",
      rotation: -Math.PI / 2,
      label: "МТС SHOP",
      labelBg: "#ffffff",
      labelTextColor: "#e30611",
      labelAnchor: "center"
    },
    // "Магазин одежды" — переносим ближе к району парка с прудом:
    // ставим через дорогу (восточнее подъездной дороги к парку) и поворачиваем входом к дороге.
    {
      position: { x: -55, z: -40 },
      size: { x: 20, y: 5, z: 8 },
      color: "#9b59b6",
      roof: "#8e44ad",
      rotation: -Math.PI / 2,
      label: "Магазин одежды"
    },

    // === Ряд домиков (стоят близко друг к другу, параллельно дороге) ===
    { position: { x: 29, z: 130 }, size: { x: 7.2, y: 7.2, z: 7.6 }, color: "#f6e3d3", roof: "#c65b4a", rotation: Math.PI },
    { position: { x: 37, z: 130 }, size: { x: 7.2, y: 7.0, z: 7.6 }, color: "#e8f2ff", roof: "#4a6fa8", rotation: Math.PI },
    { position: { x: 45, z: 130 }, size: { x: 7.2, y: 7.4, z: 7.6 }, color: "#f3f0d7", roof: "#b85d3d", rotation: Math.PI },
    { position: { x: 53, z: 130 }, size: { x: 7.2, y: 7.1, z: 7.6 }, color: "#fde2ea", roof: "#a84a6a", rotation: Math.PI },
    { position: { x: 61, z: 130 }, size: { x: 7.2, y: 7.3, z: 7.6 }, color: "#e8ffe9", roof: "#4f8b6b", rotation: Math.PI },
    { position: { x: 69, z: 130 }, size: { x: 7.2, y: 7.0, z: 7.6 }, color: "#fff0d6", roof: "#b06a3c", rotation: Math.PI },
    { position: { x: 77, z: 130 }, size: { x: 7.2, y: 7.5, z: 7.6 }, color: "#e9e6ff", roof: "#5b4aa8", rotation: Math.PI },
    { position: { x: 85, z: 130 }, size: { x: 7.2, y: 7.1, z: 7.6 }, color: "#f7f7f2", roof: "#3f4a57", rotation: Math.PI },
    { position: { x: 93, z: 130 }, size: { x: 7.2, y: 7.3, z: 7.6 }, color: "#e6f7ff", roof: "#3b6c7d", rotation: Math.PI },
    { position: { x: 101, z: 130 }, size: { x: 7.2, y: 7.2, z: 7.6 }, color: "#ffe6d8", roof: "#b34e3b", rotation: Math.PI }
  ] as BuildingConfig[],
  // Деревья/фонари/скамейки теперь генерируем “умно” (в World.ts) — чтобы не попадали на дороги
  trees: [],
  lamps: [],
  umbrellas: [
    // В пляжной зоне
    { x: -170, z: -150, color: "#ffb3c1" },
    { x: -150, z: -142, color: "#ffe08a" },
    { x: -132, z: -156, color: "#9fd3ff" }
  ],
  benches: [],
  rocks: [
    // Камни у пляжа
    { x: -188, z: -160, size: 1.2 },
    { x: -176, z: -168, size: 1 },
    { x: -160, z: -158, size: 0.8 }
  ],

  // Парковка у каждого здания на 2 машины
  parkingLots: [
    { buildingIndex: 0, spots: 10 },
    { buildingIndex: 1, spots: 2 },
    { buildingIndex: 2, spots: 2 },
    { buildingIndex: 3, spots: 2 },
    { buildingIndex: 4, spots: 2 }
  ] as { buildingIndex: number; spots: number }[],

  billboards: [
    {
      position: { x: -18, z: 62 }, // Intersection corner (Trading St @ z=70 & NS Road @ x=0)
      rotation: Math.PI / 2, // Perpendicular to Trading St (Faces East)
      size: { x: 4, y: 2.5 }, // Smaller
      text: "Персик, вам одобрено\n500 000 рублей,\nзаезжайте в МТС Банк\nи оформляйте заявку"
    }
  ] as { position: { x: number; z: number }; rotation: number; size: { x: number; y: number }; text: string }[]
};
