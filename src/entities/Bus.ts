import * as THREE from "three";
import { createLicensePlateTexture } from "@utils/textures";
import type { Updatable } from "@core/Engine";
import { TrafficEdge } from "../world/TrafficGraph";

const smokeGeo = new THREE.SphereGeometry(0.12, 6, 6);
const smokeMat = new THREE.MeshBasicMaterial({
    color: 0x999999,
    transparent: true,
    opacity: 0.5,
    depthWrite: false
});

export interface BusOptions {
    color?: string;
    speed?: number;
    y?: number;
    plateText?: string;
    loop?: boolean;
    parked?: boolean;
    template?: THREE.Object3D;
    startIndex?: number;
}

export class Bus implements Updatable {
    readonly object = new THREE.Group();
    private readonly path: THREE.Vector3[];
    private readonly speed: number;
    private targetIndex = 0;
    private readonly y: number;
    private animTime = 0;
    private speedScale = 1;
    private readonly isParked: boolean;
    private readonly loop: boolean;
    public finished = false;

    // Route support
    public routeQueue: TrafficEdge[] = [];
    public needsNewRoute = false;

    private doorPivot?: THREE.Object3D;
    private doorVoid?: THREE.Object3D;
    private doorOpen = 0;
    private doorOpenTarget = 0;
    private readonly doorOpenSpeed = 5;
    private readonly doorMaxAngle = Math.PI * 0.5;

    private wheels: THREE.Object3D[] = [];
    private driver?: {
        group: THREE.Object3D;
        baseY: number;
    };

    private smokeGroup = new THREE.Group();
    private smokeParticles: { mesh: THREE.Mesh; life: number; velocity: THREE.Vector3 }[] = [];
    private nextSmokeTime = 0;

    constructor(path: THREE.Vector3[], options: BusOptions = {}) {
        this.path = path;
        this.speed = options.speed ?? 4;
        this.y = options.y ?? 0.22;
        this.targetIndex = Math.max(0, Math.min(path.length - 1, options.startIndex ?? 0));
        this.isParked = !!options.parked;
        this.loop = options.loop ?? true;

        if (options.template) {
            this.object.add(options.template.clone(true));
            this.setupTemplateFeatures(options.template);
        } else {
            this.object.add(this.buildSchoolBusModel(options.color ?? "#ffcc00", options.plateText));
        }

        this.object.add(this.smokeGroup);

        if (this.path.length > 0) {
            const p = this.path[this.targetIndex] ?? new THREE.Vector3(0, 0, 0);
            this.object.position.set(p.x, this.y, p.z);
        }

        if (options.plateText) {
            this.object.userData.plateText = options.plateText;
        }

        this.object.scale.set(1.1, 1.1, 1.1);
    }

    private setupTemplateFeatures(template: THREE.Object3D) {
        template.traverse(child => {
            if (child.name.toLowerCase().includes("wheel")) {
                this.wheels.push(child);
            }
        });
    }

    // --- TEXTURE HELPERS ---

    private createFurTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            const fallback = new THREE.Texture();
            fallback.needsUpdate = true;
            return fallback;
        }

        ctx.fillStyle = "#f2a158";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(194, 114, 49, 0.25)";
        for (let i = 0; i < 220; i += 1) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = 1 + Math.random() * 2.2;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2.2, 2.2);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }

    private createTextTexture(text: string, options: { width: number; height: number; scale?: number; bgColor?: string; textColor?: string }) {
        const canvas = document.createElement("canvas");
        canvas.width = options.width;
        canvas.height = options.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            if (options.bgColor) {
                ctx.fillStyle = options.bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            ctx.fillStyle = options.textColor ?? "#000000";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const fontSize = Math.floor(canvas.height * (options.scale ?? 0.8));
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        }
        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
    }

    // --- CAT FACE GENERATION HELPERS ---

    private createPlayerStyleEar(xOffset: number, outerMat: THREE.Material, innerMat: THREE.Material) {
        const earRoot = new THREE.Group();
        const outer = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.48, 14), outerMat);
        outer.scale.set(1, 1.05, 1);
        earRoot.add(outer);
        const inner = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.38, 14), innerMat);
        inner.position.set(0, -0.05, 0.06);
        inner.scale.set(0.82, 0.82, 0.55);
        earRoot.add(inner);
        earRoot.rotation.z = xOffset > 0 ? -0.45 : 0.45;
        earRoot.rotation.x = -0.1;
        return earRoot;
    }

    private createWhiskerLine(x: number, y: number, z: number, rotY: number, length: number, mat: THREE.LineBasicMaterial, parent: THREE.Object3D) {
        const points = [new THREE.Vector3(x, y, z), new THREE.Vector3(x + Math.cos(rotY) * length, y, z + Math.sin(rotY) * length)];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        parent.add(new THREE.Line(geo, mat));
    }

    private addPlayerStyleFace(head: THREE.Object3D, whiteMat: THREE.Material, headRadius: number) {
        const s = headRadius / 0.9;

        // Muzzle
        const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.42 * s, 24, 18), whiteMat);
        muzzle.scale.set(1.1, 0.7, 0.9);
        muzzle.position.set(0, -0.15 * s, 0.65 * s);
        muzzle.castShadow = true;
        head.add(muzzle);

        // Mouth
        const mouthGroup = new THREE.Group();
        mouthGroup.position.set(0, -0.19 * s, 1.01 * s);
        head.add(mouthGroup);
        const mouthLineMat = new THREE.LineBasicMaterial({ color: 0x3b3b3b, linewidth: 2 });

        const mPtsL = [new THREE.Vector3(-0.2 * s, -0.02 * s, 0), new THREE.Vector3(-0.1 * s, -0.1 * s, 0), new THREE.Vector3(0, -0.06 * s, 0)];
        const mPtsR = [new THREE.Vector3(0, -0.06 * s, 0), new THREE.Vector3(0.1 * s, -0.1 * s, 0), new THREE.Vector3(0.2 * s, -0.02 * s, 0)];
        mouthGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(mPtsL), mouthLineMat));
        mouthGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(mPtsR), mouthLineMat));

        // Eyes
        const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
        const pupilMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.4 });
        const pupilHighlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

        const addEye = (xDir: number) => {
            const eye = new THREE.Mesh(new THREE.SphereGeometry(0.23 * s, 32, 24), eyeWhiteMat);
            eye.position.set(0.34 * s * xDir, 0.14 * s, 0.74 * s);
            eye.scale.set(1, 1, 0.85);
            head.add(eye);

            const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.12 * s, 24, 18), pupilMat);
            pupil.position.set(0.34 * s * xDir, 0.14 * s, 0.95 * s);
            pupil.scale.set(1, 1, 0.45);
            head.add(pupil);

            const highlight = new THREE.Mesh(new THREE.SphereGeometry(0.028 * s, 12, 12), pupilHighlightMat);
            highlight.position.set((0.34 * xDir - 0.05) * s, 0.18 * s, 1.05 * s);
            head.add(highlight);
        };
        addEye(1);
        addEye(-1);

        // Nose
        const noseMat = new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.4 });
        const nose = new THREE.Mesh(new THREE.SphereGeometry(0.13 * s, 16, 16), noseMat);
        nose.position.set(0, -0.02 * s, 0.89 * s);
        nose.scale.set(1.1, 0.85, 0.7);
        head.add(nose);

        // Whiskers
        const wMat = new THREE.LineBasicMaterial({ color: 0x444444 });
        this.createWhiskerLine(-0.35 * s, -0.1 * s, 0.73 * s, Math.PI - 0.3, 1.3 * s, wMat, head);
        this.createWhiskerLine(-0.35 * s, -0.17 * s, 0.73 * s, Math.PI - 0.15, 1.25 * s, wMat, head);
        this.createWhiskerLine(0.35 * s, -0.1 * s, 0.73 * s, 0.3, 1.3 * s, wMat, head);
        this.createWhiskerLine(0.35 * s, -0.17 * s, 0.73 * s, 0.15, 1.25 * s, wMat, head);
    }

    private createDetailedCat(scale: number, colorVal?: number | string): THREE.Group {
        const root = new THREE.Group();
        const mainColor = colorVal ?? 0xf2a158;

        const mat = new THREE.MeshPhysicalMaterial({
            color: mainColor,
            roughness: 0.55,
            metalness: 0.0,
            sheen: 1.0,
            sheenRoughness: 0.45,
            sheenColor: 0xffe1cc,
            map: (mainColor === 0xf2a158) ? this.createFurTexture() : null
        });

        const whiteMat = new THREE.MeshStandardMaterial({ color: 0xfffaf0, roughness: 0.65, metalness: 0.05 });
        const innerEarMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1, roughness: 0.45 });

        // Head Sphere
        const radius = 0.5;
        const head = new THREE.Mesh(new THREE.SphereGeometry(radius, 22, 18), mat);
        root.add(head);

        // Add Face details
        this.addPlayerStyleFace(head, whiteMat, radius);

        // Add Ears
        const earL = this.createPlayerStyleEar(-0.25, mat, innerEarMat);
        earL.position.set(-0.25, 0.4, -0.1);
        head.add(earL);

        const earR = this.createPlayerStyleEar(0.25, mat, innerEarMat);
        earR.position.set(0.25, 0.4, -0.1);
        head.add(earR);

        root.scale.setScalar(scale);
        return root;
    }

    // --- BUS BUILDING ---

    private buildSchoolBusModel(color: string, plateText?: string) {
        const root = new THREE.Group();

        // Materials
        const busYellow = "#FFD700";
        const bodyMat = new THREE.MeshStandardMaterial({ color: busYellow, roughness: 0.2, metalness: 0.1 });
        const blackMat = new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.8 });

        const glassMat = new THREE.MeshStandardMaterial({
            color: "#bfe6ff",
            roughness: 0.08,
            metalness: 0.05,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        });

        const silverMat = new THREE.MeshStandardMaterial({ color: "#cccccc", roughness: 0.3, metalness: 0.6 });
        const whiteLightMat = new THREE.MeshStandardMaterial({ color: "#ffffcc", emissive: "#ffffcc", emissiveIntensity: 0.5 });
        const redLightMat = new THREE.MeshStandardMaterial({ color: "#dd0000", emissive: "#aa0000", emissiveIntensity: 0.5 });

        const interiorMat = new THREE.MeshStandardMaterial({ color: "#555555", roughness: 1.0 });

        // Dimensions
        const busWidth = 2.4;
        const cabinL = 6.5;
        const noseL = 2.0;
        const totalL = cabinL + noseL;
        const chassisH = 0.6;
        const noseH = 1.05;
        const cabinH = 2.4;
        const winH = 0.9;

        // Z Anchors
        const cabinZ = -noseL / 2;
        const zNoseCenter = cabinZ + cabinL / 2 + noseL / 2;

        // 1. CHASSIS
        const chassis = new THREE.Mesh(new THREE.BoxGeometry(busWidth, chassisH, totalL), blackMat);
        chassis.position.set(0, 0.4 + chassisH / 2, 0);
        root.add(chassis);

        const bottomY = chassis.position.y + chassisH / 2; // Top of chassis, bottom of cabin

        // 2. CABIN CONSTRUCTION
        const winBottomY = bottomY + 0.9;
        const lowerH = winBottomY - bottomY;
        const lowerBody = new THREE.Mesh(new THREE.BoxGeometry(busWidth, lowerH, cabinL), bodyMat);
        lowerBody.position.set(0, bottomY + lowerH / 2, cabinZ);
        root.add(lowerBody);

        const winTopY = winBottomY + winH;
        const roofH = (bottomY + cabinH) - winTopY;
        const roof = new THREE.Mesh(new THREE.BoxGeometry(busWidth + 0.1, roofH + 0.1, cabinL + 0.2), bodyMat);
        roof.position.set(0, winTopY + roofH / 2, cabinZ);
        root.add(roof);

        // --- DISTRIBUTED SIGNAGE ---

        // 1. Sides
        const sideSignTex = this.createTextTexture("Котята", { width: 512, height: 128, bgColor: "#FFD700", textColor: "#000000", scale: 0.7 });
        const sideSignMat = new THREE.MeshStandardMaterial({ map: sideSignTex, roughness: 0.3, side: THREE.DoubleSide });

        const signW = 3.0; // Fit between ends
        const signH = 0.6; // Fit on roof side panel

        // Left Side
        const sLeft = new THREE.Mesh(new THREE.PlaneGeometry(signW, signH), sideSignMat);
        // Position on the side of the 'roof' box
        // roof width is busWidth + 0.1 = 2.5
        // x = -1.25 - 0.01
        sLeft.position.set(-busWidth / 2 - 0.06, winTopY + roofH / 2, cabinZ);
        sLeft.rotation.y = -Math.PI / 2;
        root.add(sLeft);

        // Right Side
        const sRight = new THREE.Mesh(new THREE.PlaneGeometry(signW, signH), sideSignMat);
        sRight.position.set(busWidth / 2 + 0.06, winTopY + roofH / 2, cabinZ);
        sRight.rotation.y = Math.PI / 2;
        root.add(sRight);

        // 2. Front & Back (Smaller)
        const smallSignTex = this.createTextTexture("Котята", { width: 256, height: 128, bgColor: "#FFD700", textColor: "#000000", scale: 0.6 });
        const smallSignMat = new THREE.MeshStandardMaterial({ map: smallSignTex, roughness: 0.3 });
        const smSignW = 1.2;
        const smSignH = 0.4;

        // Front (Above windshield)
        const frontWallZ = cabinZ + cabinL / 2 - 0.1;
        // Mounted on the front face of the roof box
        // Roof box front face is at cabinZ + (cabinL+0.2)/2 = cabinZ + cabinL/2 + 0.1 approx?
        // Roof Z size is cabinL + 0.2. Center at cabinZ.
        // Front face Z = cabinZ + cabinL/2 + 0.1.
        const sFront = new THREE.Mesh(new THREE.PlaneGeometry(smSignW, smSignH), smallSignMat);
        sFront.position.set(0, winTopY + roofH / 2, cabinZ + cabinL / 2 + 0.11);
        root.add(sFront);

        // Back (Above rear window)
        const backWallZ = cabinZ - cabinL / 2 + 0.1;
        // Roof Back face Z = cabinZ - cabinL/2 - 0.1.
        const sBack = new THREE.Mesh(new THREE.PlaneGeometry(smSignW, smSignH), smallSignMat);
        sBack.position.set(0, winTopY + roofH / 2, cabinZ - cabinL / 2 - 0.11);
        sBack.rotation.y = Math.PI;
        root.add(sBack);


        const interiorBox = new THREE.Mesh(new THREE.BoxGeometry(busWidth - 0.2, 0.5, cabinL - 0.2), interiorMat);
        interiorBox.position.set(0, winBottomY - 0.3, cabinZ);
        root.add(interiorBox);

        const sideWinCount = 5;
        const winGap = 0.15;
        const totalWinL = cabinL * 0.9;
        const singleSlotL = totalWinL / sideWinCount;
        const winPaneL = singleSlotL - winGap;
        const wStartZ = cabinZ - cabinL / 2 + (cabinL - totalWinL) / 2 + singleSlotL / 2;

        for (let i = 0; i < sideWinCount; i++) {
            const z = wStartZ + i * singleSlotL;

            const gL = new THREE.Mesh(new THREE.BoxGeometry(0.05, winH, winPaneL), glassMat);
            gL.position.set(-busWidth / 2 + 0.05, winBottomY + winH / 2, z);
            root.add(gL);

            const gR = new THREE.Mesh(new THREE.BoxGeometry(0.05, winH, winPaneL), glassMat);
            gR.position.set(busWidth / 2 - 0.05, winBottomY + winH / 2, z);
            root.add(gR);

            if (Math.random() > 0.4) {
                if (Math.random() > 0.7) {
                    this.addSittingKitten(root, -busWidth / 2 + 0.25, winBottomY + 0.35, z + 0.15, true);
                    this.addSittingKitten(root, -busWidth / 2 + 0.25, winBottomY + 0.35, z - 0.15, true);
                } else {
                    this.addSittingKitten(root, -busWidth / 2 + 0.25, winBottomY + 0.35, z, true);
                }
            }
            if (Math.random() > 0.4) {
                if (Math.random() > 0.7) {
                    this.addSittingKitten(root, busWidth / 2 - 0.25, winBottomY + 0.35, z + 0.15, false);
                    this.addSittingKitten(root, busWidth / 2 - 0.25, winBottomY + 0.35, z - 0.15, false);
                } else {
                    this.addSittingKitten(root, busWidth / 2 - 0.25, winBottomY + 0.35, z, false);
                }
            }

            if (i < sideWinCount - 1) {
                const pZ = z + singleSlotL / 2;
                const p = new THREE.Mesh(new THREE.BoxGeometry(busWidth - 0.05, winH, winGap), bodyMat);
                p.position.set(0, winBottomY + winH / 2, pZ);
                root.add(p);
            }
        }

        const fWall = new THREE.Mesh(new THREE.BoxGeometry(busWidth, winH, 0.2), bodyMat);
        fWall.position.set(0, winBottomY + winH / 2, frontWallZ);
        root.add(fWall);

        // Rear - Bigger Window
        // Use thinner frames
        // Top frame
        const backTop = new THREE.Mesh(new THREE.BoxGeometry(busWidth, 0.1, 0.2), bodyMat);
        backTop.position.set(0, winBottomY + winH - 0.05, backWallZ);
        root.add(backTop);
        // Bottom frame
        const backBot = new THREE.Mesh(new THREE.BoxGeometry(busWidth, 0.1, 0.2), bodyMat);
        backBot.position.set(0, winBottomY + 0.05, backWallZ);
        root.add(backBot);
        // Side Frames
        const backPillarW = 0.2; // Thinner
        const bL = new THREE.Mesh(new THREE.BoxGeometry(backPillarW, winH, 0.2), bodyMat);
        bL.position.set(-busWidth / 2 + backPillarW / 2, winBottomY + winH / 2, backWallZ);
        root.add(bL);
        const bR = new THREE.Mesh(new THREE.BoxGeometry(backPillarW, winH, 0.2), bodyMat);
        bR.position.set(busWidth / 2 - backPillarW / 2, winBottomY + winH / 2, backWallZ);
        root.add(bR);
        // Bigger Glass
        const backGlass = new THREE.Mesh(new THREE.BoxGeometry(busWidth - backPillarW * 2, winH - 0.2, 0.05), glassMat);
        backGlass.position.set(0, winBottomY + winH / 2, backWallZ);
        root.add(backGlass);

        // TAIL LIGHTS (Lower and Smaller)
        // Previous Y was winBottomY + 0.2 (on window level approx, too high)
        // Need to be on LOWER body. Lower body top is winBottomY.
        // Y = winBottomY - 0.4 maybe?
        const tlGeo = new THREE.SphereGeometry(0.15, 16, 16); // Smaller
        const tl1 = new THREE.Mesh(tlGeo, redLightMat);
        tl1.scale.z = 0.5;
        // Move down to the yellow panel area
        tl1.position.set(-0.8, winBottomY - 0.4, backWallZ - 0.15);
        root.add(tl1);
        const tl2 = new THREE.Mesh(tlGeo, redLightMat);
        tl2.scale.z = 0.5;
        tl2.position.set(0.8, winBottomY - 0.4, backWallZ - 0.15);
        root.add(tl2);

        // Nose
        const hoodW = busWidth * 0.6;
        const hood = new THREE.Mesh(new THREE.BoxGeometry(hoodW, noseH, noseL), bodyMat);
        hood.position.set(0, bottomY + noseH / 2, zNoseCenter);
        hood.castShadow = true;
        root.add(hood);

        const fenderW = (busWidth - hoodW) / 2;
        const fenderH = noseH * 0.6;
        const fenderL = noseL * 0.9;
        const fenderLMesh = new THREE.Mesh(new THREE.BoxGeometry(fenderW, fenderH, fenderL), bodyMat);
        fenderLMesh.position.set(-busWidth / 2 + fenderW / 2, bottomY + fenderH / 2, zNoseCenter);
        root.add(fenderLMesh);
        const fenderRMesh = new THREE.Mesh(new THREE.BoxGeometry(fenderW, fenderH, fenderL), bodyMat);
        fenderRMesh.position.set(busWidth / 2 - fenderW / 2, bottomY + fenderH / 2, zNoseCenter);
        root.add(fenderRMesh);

        const grillGroup = new THREE.Group();
        grillGroup.position.set(0, hood.position.y, zNoseCenter + noseL / 2 + 0.05);
        root.add(grillGroup);
        grillGroup.add(new THREE.Mesh(new THREE.BoxGeometry(hoodW * 0.8, noseH * 0.7, 0.1), blackMat));
        for (let i = 0; i < 4; i++) {
            const bar = new THREE.Mesh(new THREE.BoxGeometry(hoodW * 0.8, 0.05, 0.12), silverMat);
            bar.position.y = -noseH * 0.35 + 0.1 + i * 0.15;
            grillGroup.add(bar);
        }

        const bumpF = new THREE.Mesh(new THREE.BoxGeometry(busWidth + 0.1, 0.35, 0.3), blackMat);
        bumpF.position.set(0, chassis.position.y, zNoseCenter + noseL / 2 + 0.2);
        root.add(bumpF);
        const bumpR = new THREE.Mesh(new THREE.BoxGeometry(busWidth + 0.1, 0.35, 0.3), blackMat);
        bumpR.position.set(0, chassis.position.y, cabinZ - cabinL / 2 - 0.1);
        root.add(bumpR);

        const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.4), blackMat);
        exhaust.rotation.x = -Math.PI / 2 - 0.2;
        exhaust.position.set(0.6, chassis.position.y - 0.1, cabinZ - cabinL / 2);
        root.add(exhaust);

        const wsHeight = 1.3;
        const ws = new THREE.Mesh(new THREE.BoxGeometry(busWidth * 0.92, wsHeight, 0.1), glassMat);
        ws.position.set(0, winBottomY + 0.65, cabinZ + cabinL / 2 + 0.05);
        ws.rotation.x = -0.15;
        root.add(ws);

        const wiperGeo = new THREE.BoxGeometry(0.05, 0.8, 0.05);
        const wiper1 = new THREE.Mesh(wiperGeo, blackMat);
        wiper1.position.set(-0.5, 0, 0.1);
        wiper1.rotation.z = 0.2;
        ws.add(wiper1);
        const wiper2 = new THREE.Mesh(wiperGeo, blackMat);
        wiper2.position.set(0.5, 0, 0.1);
        wiper2.rotation.z = 0.2;
        ws.add(wiper2);


        const gapFiller = new THREE.Mesh(new THREE.BoxGeometry(hoodW, 0.5, 0.5), bodyMat);
        gapFiller.position.set(0, bottomY + noseH - 0.1, zNoseCenter - noseL / 2 + 0.2);
        gapFiller.rotation.x = -0.3;
        root.add(gapFiller);

        const wheelY = 0.55;
        const wheelX = busWidth / 2 - 0.2;
        const wheelZFront = zNoseCenter;
        const wheelZBack = cabinZ - cabinL / 2 + 1.5;
        const wheelPositions = [
            { x: -wheelX, z: wheelZFront },
            { x: wheelX, z: wheelZFront },
            { x: -wheelX, z: wheelZBack },
            { x: wheelX, z: wheelZBack },
        ];

        const wheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.45, 24);
        const wheelMat = new THREE.MeshStandardMaterial({ color: "#111" });
        const rimGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.47, 12);

        wheelPositions.forEach(pos => {
            const g = new THREE.Group();
            g.position.set(pos.x, wheelY, pos.z);
            root.add(g);
            this.wheels.push(g);
            const w = new THREE.Mesh(wheelGeo, wheelMat);
            w.rotation.z = Math.PI / 2;
            g.add(w);
            const r = new THREE.Mesh(rimGeo, silverMat);
            r.rotation.z = Math.PI / 2;
            g.add(r);
            if (pos.z < 0) {
                const mf = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.05), blackMat);
                mf.position.set(pos.x, wheelY + 0.3, pos.z - 0.6);
                root.add(mf);
            }
        });

        this.addDriver(root, 0.5, winBottomY + 0.1, cabinZ + cabinL / 2 - 0.8);

        const door = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.0, 0.8), blackMat);
        door.position.set(busWidth / 2 + 0.05, bottomY + 1.0, cabinZ + cabinL / 2 - 0.6);
        root.add(door);

        // MIRRORS with Stalks
        const mY = bottomY + 1.2;
        const mZ = zNoseCenter + 0.5;
        // Move closer: busWidth/2 = 1.2. 
        // Mirror Center at 1.28. Width 0.1 -> Inner edge 1.23.
        const mX = busWidth / 2 + 0.08;

        // Left Mirror
        const mirrorL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.3), blackMat);
        mirrorL.position.set(-mX, mY, mZ);
        root.add(mirrorL);
        // Stalk - slightly longer to ensure penetration
        const stalkL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 0.05), blackMat);
        stalkL.position.set(-mX + 0.1, mY, mZ);
        root.add(stalkL);

        // Right Mirror
        const mirrorR = mirrorL.clone();
        mirrorR.position.set(mX, mY, mZ);
        root.add(mirrorR);
        // Stalk
        const stalkR = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 0.05), blackMat);
        stalkR.position.set(mX - 0.1, mY, mZ);
        root.add(stalkR);

        const hl = new THREE.Mesh(new THREE.SphereGeometry(0.25), whiteLightMat);
        const hlL = hl.clone(); hlL.position.set(-0.8, hood.position.y - 0.2, zNoseCenter + noseL / 2 + 0.1);
        root.add(hlL);
        const hlR = hl.clone(); hlR.position.set(0.8, hood.position.y - 0.2, zNoseCenter + noseL / 2 + 0.1);
        root.add(hlR);

        const stop = new THREE.Mesh(new THREE.OctahedronGeometry(0.35, 0), redLightMat);
        stop.scale.z = 0.1;
        stop.rotation.y = Math.PI / 2;
        stop.position.set(-busWidth / 2 - 0.1, winBottomY + 0.2, cabinZ + 1.0);
        root.add(stop);

        return root;
    }

    private addDriver(root: THREE.Object3D, x: number, y: number, z: number) {
        const group = new THREE.Group();
        group.position.set(x, y, z);
        const head = this.createDetailedCat(0.5, 0xf2a158);
        group.add(head);
        const chest = new THREE.Mesh(new THREE.SphereGeometry(0.35, 18, 14), new THREE.MeshStandardMaterial({ color: 0xf2a158 }));
        chest.position.set(0, -0.6, -0.1);
        group.add(chest);
        this.driver = { group: head, baseY: 0 };
        root.add(group);
    }

    private addSittingKitten(root: THREE.Object3D, x: number, y: number, z: number, isLeft: boolean) {
        const colors = [0xf2a158, 0x333333, 0xffffff, 0x999999, 0xAA6600];
        const color = colors[Math.floor(Math.random() * colors.length)];

        const group = new THREE.Group();
        group.position.set(x, y, z);
        group.rotation.y = isLeft ? -Math.PI / 2 : Math.PI / 2;

        const head = this.createDetailedCat(0.32, color);
        group.add(head);

        const bodySuggestion = new THREE.Mesh(
            new THREE.SphereGeometry(0.2),
            new THREE.MeshStandardMaterial({ color: color })
        );
        bodySuggestion.position.y = -0.3;
        group.add(bodySuggestion);

        const bobOffset = Math.random() * 100;
        const bobSpeed = 2 + Math.random();
        group.userData.update = (t: number) => {
            group.position.y = y + Math.sin(t * bobSpeed + bobOffset) * 0.015;
        };

        if (!this.object.userData.passengers) this.object.userData.passengers = [];
        this.object.userData.passengers.push(group);

        root.add(group);
    }

    update(dt: number, groundHeight?: number) {
        if (this.path.length < 2 || this.finished) return;
        this.animTime += dt;

        const target = this.path[this.targetIndex];
        const px = this.object.position.x;
        const pz = this.object.position.z;
        const dx = target.x - px;
        const dz = target.z - pz;
        const dist = Math.hypot(dx, dz);

        if (dist < 0.6) {
            if (this.targetIndex < this.path.length - 1) {
                this.targetIndex++;
            } else {
                if (this.loop) this.targetIndex = 0;
                else this.finished = true;
            }
            return;
        }

        const moveStep = this.speed * this.speedScale * dt;
        this.object.position.x += (dx / dist) * Math.min(moveStep, dist);
        this.object.position.z += (dz / dist) * Math.min(moveStep, dist);

        if (groundHeight !== undefined) {
            this.object.position.y = groundHeight + this.y;
        } else {
            this.object.position.y = this.y;
        }

        this.object.rotation.y = Math.atan2(dx, dz);

        if (this.wheels.length > 0) {
            const rotStep = ((this.speed * this.speedScale) / 0.55) * dt;
            this.wheels.forEach(w => w.rotation.x += rotStep);
        }

        if (this.driver) {
            this.driver.group.position.y = this.driver.baseY + Math.sin(this.animTime * 5) * 0.03;
        }

        if (this.object.userData.passengers) {
            this.object.userData.passengers.forEach((p: THREE.Group) => {
                if (p.userData.update) p.userData.update(this.animTime);
            });
        }

        this.updateSmoke(dt);
    }

    private updateSmoke(dt: number) {
        this.nextSmokeTime -= dt;
        if (this.nextSmokeTime <= 0) {
            this.nextSmokeTime = 0.05 + Math.random() * 0.1;
            const mesh = new THREE.Mesh(smokeGeo, smokeMat);
            mesh.position.set(0.6, 0.4, -3.5);
            this.smokeGroup.add(mesh);
            this.smokeParticles.push({
                mesh,
                life: 0.8,
                velocity: new THREE.Vector3((Math.random() - 0.5) * 0.2, 0.2, -1.0)
            });
        }
        for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
            const p = this.smokeParticles[i];
            p.life -= dt;
            if (p.life <= 0) {
                this.smokeGroup.remove(p.mesh);
                this.smokeParticles.splice(i, 1);
            } else {
                p.mesh.position.addScaledVector(p.velocity, dt);
                const s = 1 + (1.0 - p.life) * 2;
                p.mesh.scale.setScalar(s);
                (p.mesh.material as THREE.MeshBasicMaterial).opacity = p.life * 0.5;
            }
        }
    }

    setSpeedScale(scale: number) { this.speedScale = scale; }
    setDoorOpen(open: boolean) { this.doorOpenTarget = open ? 1 : 0; }
    setPath(path: THREE.Vector3[]) {
        this.path.length = 0;
        this.path.push(...path);
        this.targetIndex = 0;
        this.finished = false;
    }

    setRoute(edges: TrafficEdge[]) {
        this.routeQueue = edges;
        this.needsNewRoute = false;
    }
    getForward2D() {
        const yaw = this.object.rotation.y;
        return { x: Math.sin(yaw), z: Math.cos(yaw) };
    }
}
