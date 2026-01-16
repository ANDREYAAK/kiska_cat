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

        // Wrapper
        const wrapperGeo = new THREE.SphereGeometry(0.2, 8, 8);
        const wrapperMat = new THREE.MeshStandardMaterial({
            color: Math.random() < 0.5 ? "#ff0000" : "#ffcc00",
            roughness: 0.4,
            metalness: 0.1,
            emissive: "#330000",
            emissiveIntensity: 0.2
        });
        const wrapper = new THREE.Mesh(wrapperGeo, wrapperMat);
        this.mesh.add(wrapper);

        // "Wings" of the candy wrapper
        const wingGeo = new THREE.ConeGeometry(0.15, 0.3, 8);
        const leftWing = new THREE.Mesh(wingGeo, wrapperMat);
        leftWing.position.set(-0.25, 0, 0);
        leftWing.rotation.z = Math.PI / 2;
        this.mesh.add(leftWing);

        const rightWing = new THREE.Mesh(wingGeo, wrapperMat);
        rightWing.position.set(0.25, 0, 0);
        rightWing.rotation.z = -Math.PI / 2;
        this.mesh.add(rightWing);
    }

    update(dt: number, time: number) {
        if (!this.active) return;
        this.mesh.rotation.y += dt;
        this.mesh.position.y = this.baseHeight + Math.sin(time * this.floatSpeed + this.floatOffset) * 0.15;
    }
}
