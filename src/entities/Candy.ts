import * as THREE from "three";

export class Candy {
    mesh: THREE.Group;
    active: boolean = true;
    private floatOffset: number;
    private floatSpeed: number;
    private baseHeight: number;

    constructor(position: { x: number; z: number }, baseHeight: number = 0.5) {
        this.baseHeight = baseHeight;
        this.floatOffset = Math.random() * Math.PI * 2;
        this.floatSpeed = 2.0 + Math.random();

        this.mesh = new THREE.Group();
        this.mesh.position.set(position.x, baseHeight, position.z);

        // 1. Candy Body (Sphere)
        const wrapperGeo = new THREE.SphereGeometry(0.22, 16, 16);
        const color = Math.random() < 0.5 ? 0xff0000 : 0xffcc00; // Red or Gold
        const wrapperMat = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.3,
            metalness: 0.2,
            emissive: 0x330000,
            emissiveIntensity: 0.1
        });
        const wrapper = new THREE.Mesh(wrapperGeo, wrapperMat);
        this.mesh.add(wrapper);

        // 2. Wrapper Wings (Flares)
        // usage: CylinderGeometry(radiusTop, radiusBottom, height, ...)
        // We want a cone that starts small (pinch) and gets distinctively wider (flare)
        // radiusTop = 0.02 (pinch), radiusBottom = 0.15 (flare), height = 0.25
        const flareGeo = new THREE.CylinderGeometry(0.04, 0.18, 0.3, 8, 1, true);
        const flareMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.5,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9
        });

        // Left Wing
        const leftWing = new THREE.Mesh(flareGeo, flareMat);
        // Cylinder is vertical (Y). We want it along X.
        // Rotation Z: Math.PI / 2 puts top at -X, bottom at +X.
        // We want pinch (Top) near center (0), Flare (Bottom) to left (-X).
        // So we want Top pointing +X ??
        // Let's rotate -pi/2? Top at +X?
        // Let's just rotate Z 90 deg (PI/2).
        // Cylinder Y+ becomes X-. Top is at X-0.15, Bottom at X+0.15.
        // We want "Pinch" (Top) at X near 0. "Flare" (Bottom) at X near -0.3.
        // So we want Top to point closer to origin.
        leftWing.rotation.z = Math.PI / 2;
        leftWing.position.set(-0.35, 0, 0);
        this.mesh.add(leftWing);

        // Right Wing
        const rightWing = new THREE.Mesh(flareGeo, flareMat);
        // We want Pinch (Top) near 0, Flare (Bottom) at +X.
        // Rotate Z -90 deg (-PI/2). Cylinder Y+ becomes X+.
        // Top is at X+, Bottom at X-.
        // Wait. Cylinder origin is center of height.
        // If we want Top (Pinch) to be "left" relative to the wing center (towards Origin),
        // and Bottom (Flare) to be "right" (away).
        rightWing.rotation.z = -Math.PI / 2;
        rightWing.position.set(0.35, 0, 0);
        this.mesh.add(rightWing);
    }

    update(dt: number, time: number) {
        if (!this.active) return;
        this.mesh.rotation.y += dt * 1.5;
        this.mesh.position.y = this.baseHeight + Math.sin(time * this.floatSpeed + this.floatOffset) * 0.15;
    }
}
