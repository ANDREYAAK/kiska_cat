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

        // create a striped texture
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(0, 0, 64, 64);
            ctx.fillStyle = "#ffffff";
            // Draw diagonal stripes
            for (let i = -64; i < 128; i += 16) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i + 16, 0);
                ctx.lineTo(i - 16 + 64, 64);
                ctx.lineTo(i - 32 + 64, 64);
                ctx.closePath();
                ctx.fill();
            }
        }
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        // Wrapper/Body
        const wrapperGeo = new THREE.SphereGeometry(0.25, 16, 16);
        const wrapperMat = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.3,
            metalness: 0.1,
            emissive: "#aa0000",
            emissiveIntensity: 0.1
        });
        const wrapper = new THREE.Mesh(wrapperGeo, wrapperMat);
        wrapper.rotation.z = Math.PI / 4; // Tilt texture
        this.mesh.add(wrapper);

        // "Wings" (Pyramids pointing out)
        const wingGeo = new THREE.ConeGeometry(0.18, 0.35, 8, 1, true);
        const wingMat = new THREE.MeshStandardMaterial({
            color: "#ffffff",
            roughness: 0.4,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9
        });

        const leftWing = new THREE.Mesh(wingGeo, wingMat);
        leftWing.position.set(-0.35, 0, 0);
        leftWing.rotation.z = Math.PI / 2;
        this.mesh.add(leftWing);

        const rightWing = new THREE.Mesh(wingGeo, wingMat);
        rightWing.position.set(0.35, 0, 0);
        rightWing.rotation.z = -Math.PI / 2;
        this.mesh.add(rightWing);
    }

    update(dt: number, time: number) {
        if (!this.active) return;
        this.mesh.rotation.y += dt;
        this.mesh.position.y = this.baseHeight + Math.sin(time * this.floatSpeed + this.floatOffset) * 0.15;
    }
}
