export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, t: number) =>
  from + (to - from) * t;

export const damp = (from: number, to: number, smoothing: number, dt: number) =>
  lerp(from, to, 1 - Math.exp(-smoothing * dt));

export const worldToLocalXZ = (originX: number, originZ: number, rotY: number, x: number, z: number) => {
  const dx = x - originX;
  const dz = z - originZ;
  const c = Math.cos(-rotY);
  const s = Math.sin(-rotY);
  return {
    x: dx * c + dz * s,
    z: -dx * s + dz * c
  };
};

export const localToWorldXZ = (originX: number, originZ: number, rotY: number, x: number, z: number) => {
  // Rotate (x,z) by rotY then translate
  // Assuming standard 2D rotation for Y-axis (which is usually yaw):
  // But here we follow the logic used in the game code:
  // x' = x*cos + z*sin
  // z' = -x*sin + z*cos
  const c = Math.cos(rotY);
  const s = Math.sin(rotY);
  return {
    x: originX + x * c + z * s,
    z: originZ + (-x * s + z * c)
  };
};
