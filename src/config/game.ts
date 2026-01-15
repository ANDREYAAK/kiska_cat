export const GAME_CONFIG = {
  // Увеличили территорию города, чтобы всё умещалось без наложений
  worldSize: 260,
  groundColor: "#4caf50",
  pathColor: "#edf1f6",
  waterColor: "#6dc9e8",
  sandColor: "#f7e2b8",
  // Солнечный ясный день: небо чуть насыщеннее, у горизонта — более тёплая дымка
  skyTopColor: "#6ecbff",
  skyBottomColor: "#fff7e8",
  fogColor: "#eef8ff",
  // “Горизонт ближе”: туман начинается и заканчивается раньше, чтобы дальняя перспектива
  // быстрее “съедалась” и упиралась в холмы.
  // Для солнечной погоды делаем прозрачнее (дальше начинается и дальше заканчивается).
  fogNear: 80,
  fogFar: 520,
  playerSpeed: 6,
  playerSprintMultiplier: 1.75,
  playerTurnSpeed: 10,
  playerJumpSpeed: 8.5,
  playerGravity: 22,
  cameraOffset: { x: 0, y: 8.5, z: 10 },
  cameraLookAtHeight: 2.2,
  cameraSmooth: 5,
  sunColor: "#fff1c4",
  ambientColor: "#fff7ea",
  catModelUrl: "/models/cat.fbx"
};
