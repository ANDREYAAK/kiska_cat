
import * as THREE from "three";
import { WORLD_CONFIG } from "@config/world";
import { GAME_CONFIG } from "@config/game";
import { createProceduralTexture } from "@utils/textures";
import { worldToLocalXZ } from "@utils/math";

export class TerrainManager {
    public readonly group = new THREE.Group();

    private readonly groundTexture = createProceduralTexture("grass", GAME_CONFIG.groundColor);
    private readonly sandTexture = createProceduralTexture("sand", GAME_CONFIG.sandColor);
    private readonly cloudTexture = createProceduralTexture("clouds", "rgba(0,0,0,0)");

    // River parameters
    private readonly riverWidth = 26;
    private readonly riverDepthMax = 4.0;

    // Cache for optimized geometric checks
    private roadBounds: THREE.Box2[] = [];
    private buildingBounds: THREE.Box2[] = [];

    constructor() {
        this.groundTexture.repeat.set(10, 10);
        this.cloudTexture.wrapS = this.cloudTexture.wrapT = THREE.RepeatWrapping;
        this.cloudTexture.repeat.set(1, 1);

        this.buildSky();
        this.buildHills();
        this.buildGround();
        this.buildWater();
        this.buildRiverBanks();
        this.buildBridge();
        this.buildBeach();
        this.buildParks();
    }

    public intersect(raycaster: THREE.Raycaster) {
        return raycaster.intersectObjects(this.group.children, true);
    }

    public getWorldHeight(x: number, z: number): number {
        const tH = this.getTerrainHeight(x, z);

        // Unified Road Height Logic
        if (this.isPointOnRoad(x, z, 0)) {
            // Check if we are over the river (bridge case)
            if (this.isPointInRiver(x, z)) {
                return 0.22;
            }

            const baseH = Math.max(tH, 0);
            const thickness = 0.4;
            return baseH + thickness / 2 + 0.02;
        }

        return tH;
    }

    public getTerrainHeight(x: number, z: number): number {
        let h = 0;

        // 1. River (Highest Priority)
        const riverZ = this.getRiverCenterZ(x);
        const riverDist = Math.abs(z - riverZ);

        if (riverDist < this.riverWidth) {
            const k = riverDist / this.riverWidth;
            const depth = this.riverDepthMax * (Math.cos(k * Math.PI) + 1) * 0.5;
            return -depth;
        }

        // 2. Flatten for Buildings and Parking
        if (this.isPointNearBuilding(x, z, 6.0) || this.isPointInParking(x, z, 4.0)) {
            return 0;
        }

        // 3. Hills in Park Area (Procedural)
        const hillX = -110;
        const hillZ = -80;
        const hillR = 45;
        const distSq = (x - hillX) ** 2 + (z - hillZ) ** 2;
        if (distSq < hillR * hillR) {
            const dist = Math.sqrt(distSq);
            const k = dist / hillR;
            h += 7.0 * (Math.cos(k * Math.PI) + 1) * 0.5;
        }

        return h;
    }

    public getRiverCenterZ(x: number): number {
        return 160 + 12 * Math.sin(x * 0.04);
    }

    public isPointInRiver(x: number, z: number, margin = 0): boolean {
        const riverZ = this.getRiverCenterZ(x);
        return Math.abs(z - riverZ) < (this.riverWidth - 2 + margin);
    }

    private isPointNearBuilding(x: number, z: number, padding: number) {
        const buildings = WORLD_CONFIG.buildings;

        if (this.buildingBounds.length !== buildings.length) {
            this.buildingBounds = buildings.map(b => {
                const maxDim = Math.max(b.size.x, b.size.z) / 2;
                return new THREE.Box2(
                    new THREE.Vector2(b.position.x - maxDim, b.position.z - maxDim),
                    new THREE.Vector2(b.position.x + maxDim, b.position.z + maxDim)
                );
            });
        }

        for (let i = 0; i < buildings.length; i++) {
            const b = buildings[i];
            const bounds = this.buildingBounds[i];

            // Fast AABB check
            if (x < bounds.min.x - padding || x > bounds.max.x + padding ||
                z < bounds.min.y - padding || z > bounds.max.y + padding) {
                continue;
            }

            const rot = (b as { rotation?: number }).rotation ?? 0;
            const local = worldToLocalXZ(b.position.x, b.position.z, rot, x, z);
            if (Math.abs(local.x) <= b.size.x / 2 + padding && Math.abs(local.z) <= b.size.z / 2 + padding) return true;
        }
        return false;
    }

    private isPointInParking(_x: number, _z: number, _padding: number) {
        return false;
    }

    private computeWorldBounds2D(pad: number) {
        let minX = -100;
        let maxX = 100;
        let minZ = -100;
        let maxZ = 100;

        const grow = (x0: number, x1: number, z0: number, z1: number) => {
            minX = Math.min(minX, x0);
            maxX = Math.max(maxX, x1);
            minZ = Math.min(minZ, z0);
            maxZ = Math.max(maxZ, z1);
        };

        // Initialize with core world size (increased for hills)
        grow(-350, 350, -350, 350);

        return { minX: minX - pad, maxX: maxX + pad, minZ: minZ - pad, maxZ: maxZ + pad };
    }

    private buildHills() {
        // --- MOUNTAIN RING CONFIGURATION ---
        const innerRadius = 260;
        const outerRadius = 450;
        const heightScale = 40; // Reduced from 70
        const segmentsTheta = 120; // Resolution around the ring
        const segmentsPhi = 20;    // Resolution from inner to outer radius

        // Create Ring Geometry
        // innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength
        const geometry = new THREE.RingGeometry(innerRadius, outerRadius, segmentsTheta, segmentsPhi);

        // Rotate to lie flat on XZ plane (RingGeometry is created on XY plane by default)
        geometry.rotateX(-Math.PI / 2);

        const count = geometry.attributes.position.count;
        const pos = geometry.attributes.position;
        const colors = [];

        // Simple pseudo-random noise function
        const noise = (x: number, z: number) => {
            return Math.sin(x * 0.02) * Math.cos(z * 0.02) * 1.5 +
                Math.sin(x * 0.05 + z * 0.05) * 0.8 +
                Math.sin(x * 0.1 - z * 0.05) * 0.4;
        };



        for (let i = 0; i < count; i++) {
            const x = pos.getX(i);
            // const y = pos.getY(i); 
            // After rotateX(-PI/2), Z becomes Y, Y becomes -Z. 
            // Let's rely on getting 'y' as the vertical component which is now 0.
            // Actually, let's work with raw coordinates assuming Y is UP.

            // Re-read current position to be sure after rotation
            const vx = x;
            // const vy = pos.getY(i); 
            const vz = pos.getZ(i);

            // Radius check to blend edges?
            const dist = Math.sqrt(vx * vx + vz * vz);
            const normalizedDist = (dist - innerRadius) / (outerRadius - innerRadius);

            // Bell curve shape for cross-section (low at inner, high middle, low outer)
            // sin(PI * normalizedDist) -> 0 at edges, 1 at middle
            const profile = Math.sin(Math.PI * normalizedDist);

            // Calculate Height
            let h = 0;

            // Check for River Gap (East-West flow roughly a Z=160?)
            // Our river is roughly at Z=160.
            // Let's make a gap where the river intersects the ring.
            // River flows along X mostly? Logic says getRiverCenterZ(x)..
            const rZ = this.getRiverCenterZ(vx);
            const distToRiver = Math.abs(vz - rZ);

            let riverMask = 1.0;
            if (distToRiver < this.riverWidth + 20) {
                riverMask = 0.0; // Flat at river
            } else if (distToRiver < this.riverWidth + 60) {
                riverMask = (distToRiver - (this.riverWidth + 20)) / 40.0; // Smooth transition
            }

            // Apply Noise
            // Use world coords for consistent noise
            const baseNoise = noise(vx, vz); // -2.7 to +2.7 range approx

            // Mountain shape
            // Add some "sharpness" by using absolute value or power
            // const sharpNoise = Math.pow(Math.abs(baseNoise), 1.2);

            h = profile * heightScale * riverMask * Math.max(0, (baseNoise + 1.5) * 0.4);

            // Sector variations to make some areas "hills" and some "mountains"
            // Angle around center
            const ang = Math.atan2(vz, vx);
            // Modulate height by a low frequency noise around the ring
            const sectorMod = Math.sin(ang * 3.0 + 1.0) * 0.5 + 0.5; // 0..1 wave
            // Mix: 0 -> hills (low), 1 -> mountains (high)
            // Apply min height for hills so they aren't flat
            const finalScale = 0.3 + 0.7 * sectorMod;

            h *= finalScale;
            // Add detail
            h += Math.random() * 2.0 * riverMask * profile;

            pos.setY(i, h - 2); // -2 to base it slightly below ground

            // --- COLORING ---
            // Gradient: Green -> Grey -> White
            // Normalize height 0..heightScale
            const hRatio = h / heightScale;

            const c = new THREE.Color();

            if (hRatio < 0.15) {
                // Forest / Grass
                c.set(GAME_CONFIG.groundColor);
                // Darken slightly for density
                c.lerp(new THREE.Color("#2d4c1e"), 0.5);
            } else if (hRatio < 0.45) {
                // Transition to Rock
                c.set("#5fae6a"); // Light green
                c.lerp(new THREE.Color("#7f8c8d"), (hRatio - 0.15) / 0.3);
            } else if (hRatio < 0.7) {
                // Rock
                c.set("#7f8c8d");
                c.lerp(new THREE.Color("#5d6d7e"), (hRatio - 0.45) / 0.25);
            } else {
                // Snow
                c.set("#5d6d7e");
                c.lerp(new THREE.Color("#ffffff"), (hRatio - 0.7) / 0.25);
            }

            colors.push(c.r, c.g, c.b);
        }

        geometry.computeVertexNormals();
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.MeshStandardMaterial({
            vertexColors: true,
            roughness: 0.9,
            metalness: 0.1,
            flatShading: true
        });

        const mesh = new THREE.Mesh(geometry, material);
        this.group.add(mesh);

        // --- FOREST BORDER ---
        this.buildForestBorder(innerRadius, outerRadius);
    }

    private buildForestBorder(innerR: number, outerR: number) {
        // --- SIMPLIFIED TREE GEOMETRY ---
        // "Several cones on a leg" style
        // Smaller, cleaner, less geometric errors

        const geometries: THREE.BufferGeometry[] = [];
        const colors: THREE.Color[] = [];

        // 1. Trunk (Leg)
        const trunkH = 1.0;
        const trunkGeo = new THREE.CylinderGeometry(0.3, 0.4, trunkH, 5);
        trunkGeo.translate(0, trunkH / 2, 0); // Pivot at bottom
        geometries.push(trunkGeo.toNonIndexed());
        colors.push(new THREE.Color("#5d4037")); // Brown

        // 2. Cone 1 (Bottom)
        const c1H = 2.0;
        const c1R = 1.5;
        const c1 = new THREE.ConeGeometry(c1R, c1H, 5);
        c1.translate(0, trunkH + c1H / 2 - 0.2, 0); // Overlap slightly
        geometries.push(c1.toNonIndexed());
        colors.push(new THREE.Color("#1a5e20")); // Deep Green

        // 3. Cone 2 (Mid)
        const c2H = 1.8;
        const c2R = 1.2;
        const c2 = new THREE.ConeGeometry(c2R, c2H, 5);
        c2.translate(0, trunkH + c1H + c2H / 2 - 0.6, 0);
        geometries.push(c2.toNonIndexed());
        colors.push(new THREE.Color("#2e7d32")); // Forest Green

        // 4. Cone 3 (Top)
        const c3H = 1.5;
        const c3R = 0.8;
        const c3 = new THREE.ConeGeometry(c3R, c3H, 5);
        c3.translate(0, trunkH + c1H + c2H + c3H / 2 - 1.0, 0);
        geometries.push(c3.toNonIndexed());
        colors.push(new THREE.Color("#43a047")); // Bright Green

        // Merge logic
        let totalVerts = 0;
        geometries.forEach(g => totalVerts += g.attributes.position.count);

        const mergedPos = new Float32Array(totalVerts * 3);
        const mergedNorm = new Float32Array(totalVerts * 3);
        const mergedColor = new Float32Array(totalVerts * 3);

        let offset = 0;
        geometries.forEach((g, idx) => {
            const count = g.attributes.position.count;
            const pos = g.attributes.position;
            const norm = g.attributes.normal;
            const color = colors[idx];

            for (let i = 0; i < count; i++) {
                mergedPos.set([pos.getX(i), pos.getY(i), pos.getZ(i)], (offset + i) * 3);
                mergedNorm.set([norm.getX(i), norm.getY(i), norm.getZ(i)], (offset + i) * 3);
                mergedColor.set([color.r, color.g, color.b], (offset + i) * 3);
            }
            offset += count;
        });

        const finalGeo = new THREE.BufferGeometry();
        finalGeo.setAttribute('position', new THREE.BufferAttribute(mergedPos, 3));
        finalGeo.setAttribute('normal', new THREE.BufferAttribute(mergedNorm, 3));
        finalGeo.setAttribute('color', new THREE.BufferAttribute(mergedColor, 3));
        // finalGeo.computeVertexNormals(); // Recalculate smooth or use existing? 
        // Existing normals from prims are good for flat shading look.

        const material = new THREE.MeshStandardMaterial({
            vertexColors: true,
            roughness: 0.8,
            metalness: 0.0,
            flatShading: true,
            side: THREE.FrontSide
        });

        const count = 5000; // Increased count for density since trees are smaller
        const mesh = new THREE.InstancedMesh(finalGeo, material, count);

        const dummy = new THREE.Object3D();
        let idx = 0;

        const noise = (x: number, z: number) => {
            return Math.sin(x * 0.05) * Math.cos(z * 0.05);
        };

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = innerR - 20 + Math.random() * (outerR - innerR + 40);

            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;

            if (this.isPointInRiver(x, z, this.riverWidth + 8)) continue;

            const n = noise(x, z);
            // Smaller scale variation
            const scale = 1.0 + Math.random() * 0.8 + n * 0.2;

            dummy.position.set(x, 0, z);
            dummy.position.y = -0.5; // Slightly buried

            dummy.rotation.y = Math.random() * Math.PI * 2;
            // Uniform scaling to preserve proportions
            dummy.scale.set(scale, scale, scale);

            dummy.updateMatrix();
            mesh.setMatrixAt(idx++, dummy.matrix);
        }

        mesh.count = idx;
        this.group.add(mesh);
    }



    private buildSky() {
        const skyRadius = 2000; // Increase sky to enclose distant sun
        const geometry = new THREE.SphereGeometry(skyRadius, 32, 32);
        const material = new THREE.ShaderMaterial({
            side: THREE.BackSide,
            uniforms: {
                topColor: { value: new THREE.Color(GAME_CONFIG.skyTopColor) },
                bottomColor: { value: new THREE.Color(GAME_CONFIG.skyBottomColor) },
                offset: { value: 24 },
                exponent: { value: 0.42 }
            },
            vertexShader: `
            varying vec3 vWorldPosition;
            void main() {
              vec4 worldPosition = modelMatrix * vec4(position, 1.0);
              vWorldPosition = worldPosition.xyz;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
            fragmentShader: `
            uniform vec3 topColor;
            uniform vec3 bottomColor;
            uniform float offset;
            uniform float exponent;
            varying vec3 vWorldPosition;
            void main() {
              float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
              float mixValue = max(pow(max(h, 0.0), exponent), 0.0);
              gl_FragColor = vec4(mix(bottomColor, topColor, mixValue), 1.0);
            }
          `
        });
        const sky = new THREE.Mesh(geometry, material);
        this.group.add(sky);

        this.buildSunAndClouds();
    }

    private buildSunAndClouds() {
        const sunGroup = new THREE.Group();
        // Move sun far behind mountains (radius ~450)
        sunGroup.position.set(0, 400, -1000);

        const sunCore = new THREE.Mesh(new THREE.SphereGeometry(15, 16, 16), new THREE.MeshBasicMaterial({ color: 0xfff1b0 }));
        sunGroup.add(sunCore);

        this.group.add(sunGroup);
    }

    private buildGround() {
        const bounds = this.computeWorldBounds2D(15);
        const width = bounds.maxX - bounds.minX;
        const depth = bounds.maxZ - bounds.minZ;
        const centerX = (bounds.minX + bounds.maxX) / 2;
        const centerZ = (bounds.minZ + bounds.maxZ) / 2;

        const segmentsX = Math.floor(width / 2);
        const segmentsZ = Math.floor(depth / 2);

        const geometry = new THREE.PlaneGeometry(width, depth, segmentsX, segmentsZ);
        const pos = geometry.attributes.position;

        for (let i = 0; i < pos.count; i++) {
            const lx = pos.getX(i);
            const ly = pos.getY(i);
            const wx = centerX + lx;
            const wz = centerZ - ly;

            const h = this.getTerrainHeight(wx, wz);
            pos.setZ(i, h);
        }
        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial({
            color: GAME_CONFIG.groundColor,
            map: this.groundTexture,
            roughness: 0.9,
            metalness: 0.05
        });

        const ground = new THREE.Mesh(geometry, material);
        ground.rotation.x = -Math.PI / 2;
        ground.position.set(centerX, 0, centerZ);
        ground.receiveShadow = true;
        this.group.add(ground);
    }

    private isPointOnRoad(x: number, z: number, padding = 0) {
        const roads = WORLD_CONFIG.roads ?? [];

        if (this.roadBounds.length !== roads.length) {
            this.roadBounds = roads.map(r => {
                const maxDim = Math.max(r.width, r.length) / 2;
                return new THREE.Box2(
                    new THREE.Vector2(r.position.x - maxDim, r.position.z - maxDim),
                    new THREE.Vector2(r.position.x + maxDim, r.position.z + maxDim)
                );
            });
        }

        for (let i = 0; i < roads.length; i++) {
            const r = roads[i];
            const bounds = this.roadBounds[i];

            if (x < bounds.min.x - padding || x > bounds.max.x + padding ||
                z < bounds.min.y - padding || z > bounds.max.y + padding) {
                continue;
            }

            const rot = r.rotation ?? 0;
            const local = worldToLocalXZ(r.position.x, r.position.z, rot, x, z);
            if (Math.abs(local.x) <= r.width / 2 + padding && Math.abs(local.z) <= r.length / 2 + padding) return true;
        }
        return false;
    }

    private buildWater() {
        const waterMat = new THREE.MeshStandardMaterial({
            color: "#0077be", // Keep blue
            roughness: 0.1,
            metalness: 0.1,
            transparent: true,
            opacity: 0.9,
            side: THREE.BackSide // FIX: Normals are pointing down due to geometry flip, so Top is BackFace.
        });

        const areas = (WORLD_CONFIG as { waterAreas?: Array<{ position: { x: number; z: number }; width: number; depth: number }> }).waterAreas ?? [];
        areas.forEach(area => {
            const m = new THREE.Mesh(new THREE.PlaneGeometry(area.width, area.depth), waterMat);
            m.rotation.x = -Math.PI / 2;
            m.position.set(area.position.x, -1.5, area.position.z);
            this.group.add(m);
        });

        const bounds = this.computeWorldBounds2D(20);
        const riverLen = (bounds.maxX - bounds.minX) * 1.1;
        const centerX = (bounds.maxX + bounds.minX) / 2;

        const segments = 128;
        // FIX: riverWidth is radius (26), so total channel is 52. 
        // We use 2.2 multiplier to ensure it covers the full width and clips into banks.
        const widthMultiplier = 2.2;
        const finalRiverGeo = new THREE.PlaneGeometry(riverLen, this.riverWidth * widthMultiplier, segments, 4);
        const fPos = finalRiverGeo.attributes.position;

        for (let i = 0; i < fPos.count; i++) {
            const lx = fPos.getX(i);
            const ly = fPos.getY(i);
            const wx = centerX + lx;

            const riverCenterZ = this.getRiverCenterZ(wx);

            const wZ = riverCenterZ + ly; // ly includes local width offset

            fPos.setX(i, lx);
            fPos.setY(i, -wZ); // Inverted Z because of rotation
            fPos.setZ(i, 0);
        }
        finalRiverGeo.computeVertexNormals();

        const riverMesh = new THREE.Mesh(finalRiverGeo, waterMat);
        riverMesh.rotation.x = -Math.PI / 2;
        // LOWERED WATER LEVEL from -0.2 to -1.5 per user request
        riverMesh.position.set(centerX, -1.5, 0);
        this.group.add(riverMesh);

        // --- SKIRTS (Visual Depth) ---
        // Create vertical walls along the river edges to hide the "floating sheet" look
        const skirtDepth = 15.0; // INCREASED: Make it very deep to ensure it goes into the ground
        const skirtGeo = new THREE.BufferGeometry();
        const skirtVerts: number[] = [];
        const skirtNormals: number[] = [];
        const skirtUVs: number[] = [];

        // Two skirts: Left edge and Right edge
        // River width is this.riverWidth * 1.1 (from PlaneGeo logic above)?
        // Wait, PlaneGeometry height is `this.riverWidth * 1.1`.
        // So edges are at +/- (this.riverWidth * 1.1) / 2
        const halfWidth = (this.riverWidth * 1.1) / 2;
        // Correction: Skirts should be slightly INSIDE to ensure no gap? No, edges are fine.
        const sides = [-halfWidth, halfWidth];

        sides.forEach((sideOffset) => {
            // Need to reverse vertex order for one side if using FrontSide/BackSide logic?
            // With DoubleSide it didnt matter.
            // With FrontSide:
            // We want the outside of the skirt to be visible.
            // "Outside" means facing away from the river center.
            // Left skirt (sideOffset < 0): Normal should point -Y (local) which is +Z (world).
            // Right skirt (sideOffset > 0): Normal should point +Y (local) which is -Z (world).
            // Actually, in local space of riverMesh (-90 rot):
            // Local Y is World -Z.
            // Left side is World +Z (smaller Z in riverZ? No riverZ is Z coord).
            // Let's rely on standard winding.

            for (let i = 0; i < segments; i++) {
                // Segment i and i+1
                const x0 = -riverLen / 2 + (i / segments) * riverLen;
                const x1 = -riverLen / 2 + ((i + 1) / segments) * riverLen;

                const wx0 = centerX + x0;
                const wx1 = centerX + x1;

                const rz0 = this.getRiverCenterZ(wx0);
                const rz1 = this.getRiverCenterZ(wx1);

                // Local Y in river mesh (which corresponds to -WorldZ)
                const y0 = -(rz0 + sideOffset);
                const y1 = -(rz1 + sideOffset);

                // Quad vertices (Two triangles)
                // Top-Left, Bottom-Left, Top-Right, Bottom-Right relative to the quad
                // TL: (x0, y0, 0)
                // BL: (x0, y0, -skirtDepth)
                // TR: (x1, y1, 0)
                // BR: (x1, y1, -skirtDepth)

                // Winding order matters for FrontSide.
                // We want normals pointing OUT.
                // Left side (sideOffset < 0): Local Y grows (World Z decreases). Wait. wZ = riverCenterZ + ly.
                // If sideOffset is negative, we are at smaller Z.
                // We want normal pointing towards smaller Z (World).
                // In local space, Normal should point +Y (Local)?
                // It's confusing. Let's create DOUBLE sided skirts just to be safe and visible.
                // Or generate both windings.

                // Let's just create TL->BL->TR and TR->BL->BR.
                // And duplicate with reverse winding for "solid" look from both sides.

                // Front face
                skirtVerts.push(x0, y0, 0);
                skirtVerts.push(x0, y0, -skirtDepth);
                skirtVerts.push(x1, y1, 0);

                skirtVerts.push(x1, y1, 0);
                skirtVerts.push(x0, y0, -skirtDepth);
                skirtVerts.push(x1, y1, -skirtDepth);

                // Back face (Reverse winding)
                skirtVerts.push(x0, y0, 0);
                skirtVerts.push(x1, y1, 0);
                skirtVerts.push(x0, y0, -skirtDepth);

                skirtVerts.push(x1, y1, 0);
                skirtVerts.push(x1, y1, -skirtDepth);
                skirtVerts.push(x0, y0, -skirtDepth);

                for (let k = 0; k < 12; k++) {
                    skirtNormals.push(0, 1, 0); // Dummy
                    skirtUVs.push(0, 0);
                }
            }
        });

        skirtGeo.setAttribute('position', new THREE.Float32BufferAttribute(skirtVerts, 3));
        skirtGeo.setAttribute('normal', new THREE.Float32BufferAttribute(skirtNormals, 3));
        skirtGeo.setAttribute('uv', new THREE.Float32BufferAttribute(skirtUVs, 2));

        // Use DoubleSide material for skirts specifically to ensure visibility
        // But we want Main Water to be FrontSide.
        // So we need a separate material or object for skirts if we want main water to be FrontSide?
        // Actually, riverMesh uses waterMat.
        // If we want riverMesh to be FrontSide, we can't reuse waterMat for skirts if we want them DoubleSide.
        // Unless we make a new material.

        const skirtMat = waterMat.clone();
        skirtMat.side = THREE.DoubleSide; // Ensure skirts are always visible

        const skirtMesh = new THREE.Mesh(skirtGeo, skirtMat);
        skirtMesh.rotation.x = -Math.PI / 2;
        skirtMesh.position.set(centerX, -1.5, 0);
        this.group.add(skirtMesh);
    }

    private buildBeach() {
        const beaches = (WORLD_CONFIG as { beachAreas?: Array<{ position: { x: number; z: number }; width: number; depth: number }> }).beachAreas ?? [];
        beaches.forEach(b => {
            const geo = new THREE.PlaneGeometry(b.width, b.depth, 16, 16);
            const pos = geo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const lx = pos.getX(i);
                const ly = pos.getY(i);
                const wx = b.position.x + lx;
                const wz = b.position.z - ly;
                const h = this.getTerrainHeight(wx, wz);
                pos.setZ(i, h + 0.05);
            }
            geo.computeVertexNormals();
            const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
                map: this.sandTexture, color: GAME_CONFIG.sandColor, roughness: 1.0
            }));
            m.rotation.x = -Math.PI / 2;
            m.position.set(b.position.x, 0, b.position.z);
            this.group.add(m);
        });
    }

    private buildParks() {
        const parkMaterial = new THREE.MeshStandardMaterial({
            color: "#76d09a",
            roughness: 0.85,
            metalness: 0.03
        });
        const parks = (WORLD_CONFIG as { parks?: any[] }).parks ?? [];
        parks.forEach((park) => {
            const segs = 16;
            const parkMesh = new THREE.Mesh(new THREE.PlaneGeometry(park.width, park.depth, segs, segs), parkMaterial);

            const pos = parkMesh.geometry.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const lx = pos.getX(i);
                const ly = pos.getY(i);
                const wx = park.position.x + lx;
                const wz = park.position.z - ly;
                const h = this.getTerrainHeight(wx, wz);
                pos.setZ(i, h);
            }
            parkMesh.geometry.computeVertexNormals();
            parkMesh.rotation.x = -Math.PI / 2;
            parkMesh.position.set(park.position.x, 0.15, park.position.z);
            parkMesh.receiveShadow = true;
            this.group.add(parkMesh);
        });
    }

    private buildRiverBanks() {
        const riverLength = GAME_CONFIG.worldSize * 3.0; // Extend significantly
        const segments = 128;
        const bankWidth = 4.0;
        const sandMat = new THREE.MeshStandardMaterial({
            map: this.sandTexture,
            color: GAME_CONFIG.sandColor,
            roughness: 1.0
        });

        const buildBank = (isRight: boolean) => {
            const geo = new THREE.PlaneGeometry(riverLength, bankWidth, segments, 1);
            const pos = geo.attributes.position;

            for (let i = 0; i < pos.count; i++) {
                const x = pos.getX(i);
                const y = pos.getY(i);

                const rZ = this.getRiverCenterZ(x);
                const sideDir = isRight ? 1 : -1;
                const baseOffset = this.riverWidth + 1.5;

                const zBase = rZ + sideDir * baseOffset;
                const zOffset = y;

                const finalZ = zBase + zOffset;
                const h = this.getTerrainHeight(x, finalZ);
                pos.setXYZ(i, x, -finalZ, h + 0.1);
            }
            geo.computeVertexNormals();
            const mesh = new THREE.Mesh(geo, sandMat);
            mesh.rotation.x = -Math.PI / 2;
            this.group.add(mesh);
        };

        buildBank(false);
        buildBank(true);
    }

    private buildBridge() {
        const bridgeZ = 160;
        const bridgeX = 0;
        const bridgeWidth = 12;
        const bridgeLength = 32;

        const bridgeGroup = new THREE.Group();
        bridgeGroup.position.set(bridgeX, 0, bridgeZ);

        const woodMat = new THREE.MeshStandardMaterial({ color: "#8d6e63", roughness: 0.9 });
        const railMat = new THREE.MeshStandardMaterial({ color: "#5d4037", roughness: 0.8 });
        const stoneMat = new THREE.MeshStandardMaterial({ color: "#7f8c8d", roughness: 0.7 });

        const deck = new THREE.Mesh(new THREE.BoxGeometry(bridgeWidth, 0.5, bridgeLength), stoneMat);
        deck.position.y = -0.25;
        bridgeGroup.add(deck);

        const archCount = 2;
        const archSpacing = 14;
        for (let i = 0; i < archCount; i++) {
            const z = -archSpacing / 2 + i * archSpacing;
            const pL = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 8), stoneMat);
            pL.position.set(-bridgeWidth / 2 + 1, -4, z);
            bridgeGroup.add(pL);

            const pR = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 8), stoneMat);
            pR.position.set(bridgeWidth / 2 - 1, -4, z);
            bridgeGroup.add(pR);

            const beam = new THREE.Mesh(new THREE.BoxGeometry(bridgeWidth, 1.0, 1.5), stoneMat);
            beam.position.set(0, -0.5, z);
            bridgeGroup.add(beam);
        }

        const railH = 1.1;
        const railGeo = new THREE.BoxGeometry(0.2, railH, bridgeLength);
        const rLeft = new THREE.Mesh(railGeo, railMat);
        rLeft.position.set(-bridgeWidth / 2, 0.5 + railH / 2, 0);
        bridgeGroup.add(rLeft);
        const rRight = new THREE.Mesh(railGeo, railMat);
        rRight.position.set(bridgeWidth / 2, 0.5 + railH / 2, 0);
        bridgeGroup.add(rRight);

        const postGeo = new THREE.BoxGeometry(0.4, railH + 0.2, 0.4);
        const postCount = Math.floor(bridgeLength / 3);
        for (let i = 0; i <= postCount; i++) {
            const z = -bridgeLength / 2 + i * (bridgeLength / postCount);
            const pL = new THREE.Mesh(postGeo, woodMat);
            pL.position.set(-bridgeWidth / 2, 0.5 + railH / 2, z);
            bridgeGroup.add(pL);
            const pR = new THREE.Mesh(postGeo, woodMat);
            pR.position.set(bridgeWidth / 2, 0.5 + railH / 2, z);
            bridgeGroup.add(pR);

            if (i % 3 === 0) {
                const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.3), new THREE.MeshStandardMaterial({ color: "#ffffcc", emissive: "#ffffcc" }));
                lamp.position.set(0, 0.8, 0);
                pL.add(lamp.clone());
                pR.add(lamp.clone());
            }
        }
        this.group.add(bridgeGroup);
    }
}
