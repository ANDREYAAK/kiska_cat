export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, t: number) =>
  from + (to - from) * t;

export const damp = (from: number, to: number, smoothing: number, dt: number) =>
  lerp(from, to, 1 - Math.exp(-smoothing * dt));
