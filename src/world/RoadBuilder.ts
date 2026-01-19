
import * as THREE from "three";
import { CityMap, CityBlock } from "./CityMap";
import { WORLD_CONFIG } from "@config/world";
import { getRoadVisualConfig } from "@config/road";
import { worldToLocalXZ } from "@utils/math";

export class RoadBuilder {
    private group = new THREE.Group();
    private roadMaterial: THREE.MeshStandardMaterial;
    private intersectionMaterial: THREE.MeshStandardMaterial;
    private markingMaterial: THREE.MeshStandardMaterial;
    private curbMaterial: THREE.MeshStandardMaterial;

    private readonly gridSize = 10;

    // Callback to get height from World
    private getTerrainHeight: (x: number, z: number) => number;

    // Store roads config for width lookup
    private roadsConfig: Array<{ position: { x: number; z: number }; width: number; length: number; rotation?: number }>;

    constructor(private cityMap: CityMap, getTerrainHeight: (x: number, z: number) => number) {
        this.getTerrainHeight = getTerrainHeight;
        this.roadsConfig = WORLD_CONFIG.roads ?? [];

        // Load textures if possible, but for now standard materials
        this.roadMaterial = new THREE.MeshStandardMaterial({ color: "#555a60", roughness: 0.9, metalness: 0.1 });
        this.intersectionMaterial = new THREE.MeshStandardMaterial({ color: "#555a60", roughness: 0.9, metalness: 0.1 });
        this.markingMaterial = new THREE.MeshStandardMaterial({ color: "#ffffff", side: THREE.DoubleSide });
        // Бордюр - темно-серый материал, слегка светлее дороги
        this.curbMaterial = new THREE.MeshStandardMaterial({ color: "#6f757a", roughness: 0.95, metalness: 0.05 });
    }

    public getGroup() {
        return this.group;
    }

    /**
     * Replace road material with extracted material from GLB
     */
    public setRoadMaterial(material: THREE.Material) {
        // Update existing meshes
        this.group.traverse((child) => {
            if (child instanceof THREE.Mesh &&
                (child.material === this.roadMaterial || child.material === this.intersectionMaterial)) {
                child.material = material;
            }
        });
        // Update stored materials for future roads
        if (material instanceof THREE.MeshStandardMaterial) {
            this.roadMaterial = material;
            this.intersectionMaterial = material;
        }
    }

    public build() {
        this.group.clear();
        const blocks = this.cityMap.getAllBlocks();

        for (const block of blocks) {
            if (block.type === "road") {
                this.buildRoadMesh(block);
            } else if (block.type === "intersection") {
                this.buildIntersectionMesh(block);
            }
        }
    }

    /**
     * Determines the road surface height at a specific world coordinate.
     * This is the SINGLE SOURCE OF TRUTH for road geometry to ensure continuity.
     * It clamps the road to a minimum height (e.g. 0 for water bridges) but otherwise follows terrain.
     */
    private getRoadSurfaceHeight(worldX: number, worldZ: number): number {
        const h = this.getTerrainHeight(worldX, worldZ);
        // Ensure continuity: Road glides over water/deep terrain at level 0.
        // Using Math.max guarantees no jump discontinuities.
        return Math.max(h, 0);
    }

    private getRoadWidthForBlock(block: CityBlock): number {
        const roadInfo = this.getRoadInfoForBlock(block);
        return roadInfo?.width ?? 10;
    }

    private getRoadInfoForBlock(block: CityBlock): { width: number; center?: string } | null {
        const center = this.cityMap.getWorldPosition(block.x, block.z);

        for (const road of this.roadsConfig) {
            const rot = road.rotation ?? 0;
            const local = worldToLocalXZ(road.position.x, road.position.z, rot, center.x, center.z);

            const blockHalfSize = this.gridSize / 2;
            if (Math.abs(local.x) <= road.width / 2 + blockHalfSize &&
                Math.abs(local.z) <= road.length / 2 + blockHalfSize) {
                return {
                    width: road.width,
                    center: (road as any).center
                };
            }
        }
        return null;
    }

    private buildRoadMesh(block: CityBlock) {
        const roadWidth = this.getRoadWidthForBlock(block);
        const config = getRoadVisualConfig(roadWidth);
        const center = this.cityMap.getWorldPosition(block.x, block.z);

        const roadGroup = new THREE.Group();
        roadGroup.position.set(center.x, 0, center.z);

        const roadThickness = config.roadThickness;
        // Use this.gridSize
        const roadSize = this.gridSize + 0.05; // Tiny overlap to seal cracks

        // 1. Deformed Road Geometry
        const roadGeo = this.createDeformedRoadGeometry(roadSize, roadThickness, center);
        roadGeo.computeBoundingBox(); // Ensure raycast collision data is ready
        roadGeo.computeBoundingSphere();

        const roadMesh = new THREE.Mesh(roadGeo, this.roadMaterial);
        roadMesh.name = `Road_${block.x}_${block.z}`;

        // Ensure visibility
        roadMesh.renderOrder = 1;
        roadMesh.material = this.roadMaterial.clone();
        (roadMesh.material as THREE.MeshStandardMaterial).transparent = false;
        (roadMesh.material as THREE.MeshStandardMaterial).opacity = 1.0;

        roadGroup.add(roadMesh);

        // 2. Pillars / Bridge Supports (Visual Only)
        this.addBridgeSupports(roadGroup, block, center, roadThickness);

        // 3. Curbs
        this.addCurbs(roadGroup, block, config, center, roadSize);

        this.group.add(roadGroup);

        // 4. Markings
        this.addRoadMarkings(roadGroup, block, roadWidth, center);
    }

    private buildIntersectionMesh(block: CityBlock) {
        const roadWidth = this.getRoadWidthForBlock(block);
        const config = getRoadVisualConfig(roadWidth);
        const center = this.cityMap.getWorldPosition(block.x, block.z);

        const intersectionGroup = new THREE.Group();
        intersectionGroup.position.set(center.x, 0, center.z);

        const roadThickness = config.roadThickness;
        const roadSize = this.gridSize + 0.2; // Overlap road ends

        // Pass offset 0.01 (1cm) - physical separation to prevent z-fighting without visible gap
        const roadGeo = this.createDeformedRoadGeometry(roadSize, roadThickness, center, 0.01);
        roadGeo.computeBoundingBox();
        roadGeo.computeBoundingSphere();

        const roadMesh = new THREE.Mesh(roadGeo, this.intersectionMaterial);
        roadMesh.name = `Intersection_${block.x}_${block.z}`;

        roadMesh.renderOrder = 1;
        roadMesh.material = this.intersectionMaterial.clone();
        (roadMesh.material as THREE.MeshStandardMaterial).transparent = false;
        (roadMesh.material as THREE.MeshStandardMaterial).opacity = 1.0;
        intersectionGroup.add(roadMesh);

        this.addBridgeSupports(intersectionGroup, block, center, roadThickness);

        this.addCurbs(intersectionGroup, block, config, center, roadSize, true);

        this.group.add(intersectionGroup);

        this.addIntersectionMarkings(intersectionGroup, block, center);
    }

    private createDeformedRoadGeometry(
        size: number,
        thickness: number,
        center: { x: number; z: number },
        extraYOffset: number = 0
    ): THREE.BufferGeometry {
        const segments = 10;
        const geo = new THREE.BoxGeometry(size, thickness, size, segments, 1, segments);
        const pos = geo.attributes.position;

        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const z = pos.getZ(i);
            const y = pos.getY(i);

            const worldX = center.x + x;
            const worldZ = center.z - z;

            // Get surface height from central authority
            const surfaceH = this.getRoadSurfaceHeight(worldX, worldZ);

            if (y > 0) {
                // Top surface
                pos.setY(i, surfaceH + thickness / 2 + 0.02 + extraYOffset);
            } else {
                // Bottom surface
                pos.setY(i, surfaceH - thickness / 2 + 0.02 + extraYOffset);
            }
        }

        geo.computeVertexNormals();
        return geo;
    }

    /**
     * Creates a deformed strip (ribbon) for markings that perfectly follows the road surface.
     */
    private createDeformedStrip(
        width: number,
        length: number,
        center: { x: number; z: number },
        localOffset: { x: number; z: number },
        vertical: boolean,
        verticalOffset: number = 0.25
    ): THREE.BufferGeometry {
        const segments = Math.max(2, Math.floor(length));
        const geo = new THREE.PlaneGeometry(
            vertical ? width : length,
            vertical ? length : width,
            vertical ? 1 : segments,
            vertical ? segments : 1
        );

        const pos = geo.attributes.position;

        for (let i = 0; i < pos.count; i++) {
            const px = pos.getX(i);
            const py = pos.getY(i);

            // Standard PlaneGeometry is XY. We want XZ mapping.
            // py maps to -z

            let lx = px;
            let lz = -py;

            // Apply the offset (where this strip should be relative to block center)
            lx += localOffset.x;
            lz += localOffset.z;

            // Calculate World Position
            const wx = center.x + lx;
            const wz = center.z - lz;

            const h = this.getRoadSurfaceHeight(wx, wz);

            // Use provided verticalOffset (default 0.25, intersection needs more)
            pos.setXYZ(i, lx, h + verticalOffset, lz);
        }

        geo.computeVertexNormals();
        return geo;
    }

    private addCurbs(
        group: THREE.Group,
        block: CityBlock,
        config: any,
        center: { x: number, z: number },
        gridSize: number,
        isIntersection = false
    ) {
        const curbHeight = config.curbHeight;
        const curbWidth = config.curbWidth;
        const halfSize = this.gridSize / 2;

        const roadGoesVertical = block.connections.n || block.connections.s;
        const roadGoesHorizontal = block.connections.e || block.connections.w;

        let roadIsVertical = false;
        if (roadGoesVertical && roadGoesHorizontal) {
            const v = (block.connections.n ? 1 : 0) + (block.connections.s ? 1 : 0);
            const h = (block.connections.e ? 1 : 0) + (block.connections.w ? 1 : 0);
            roadIsVertical = v >= h;
        } else {
            roadIsVertical = roadGoesVertical && !roadGoesHorizontal;
        }

        const sides = [];
        if (isIntersection) {
            sides.push('left', 'right', 'top', 'bottom');
        } else {
            if (roadIsVertical) sides.push('left', 'right');
            else sides.push('top', 'bottom');
        }

        sides.forEach(side => {
            let lx = 0, lz = 0;
            let w = 0, d = 0;
            // OFFSET to clear road mesh overlap (road extends 0.05 past grid)
            const offset = 0.06;

            if (side === 'left') { lx = -halfSize - curbWidth / 2 - offset; w = curbWidth; d = gridSize; }
            if (side === 'right') { lx = halfSize + curbWidth / 2 + offset; w = curbWidth; d = gridSize; }
            if (side === 'top') { lz = -halfSize - curbWidth / 2 - offset; w = gridSize; d = curbWidth; }
            if (side === 'bottom') { lz = halfSize + curbWidth / 2 + offset; w = gridSize; d = curbWidth; }

            const wx = center.x + lx;
            const wz = center.z - lz;
            const h = this.getRoadSurfaceHeight(wx, wz);

            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(w, curbHeight, d),
                this.curbMaterial
            );
            mesh.position.set(lx, h + curbHeight / 2 + 0.1, lz);
            group.add(mesh);
        });
    }

    private addRoadMarkings(
        group: THREE.Group,
        block: CityBlock,
        _roadWidth: number,
        center: { x: number; z: number }
    ) {
        const roadInfo = this.getRoadInfoForBlock(block);
        const centerType = roadInfo?.center ?? "none";
        if (centerType === "none") return;

        const roadGoesVertical = block.connections.n || block.connections.s;
        const roadGoesHorizontal = block.connections.e || block.connections.w;
        let roadIsVertical = false;
        if (roadGoesVertical && roadGoesHorizontal) {
            const v = (block.connections.n ? 1 : 0) + (block.connections.s ? 1 : 0);
            const h = (block.connections.e ? 1 : 0) + (block.connections.w ? 1 : 0);
            roadIsVertical = v >= h;
        } else {
            roadIsVertical = roadGoesVertical && !roadGoesHorizontal;
        }

        const dashLength = 1.5;
        const gapLength = 1.2;
        const thickness = 0.12;

        // Use this.gridSize
        const totalLength = this.gridSize;

        if (centerType === "dashed") {
            const numDashes = Math.floor(totalLength / (dashLength + gapLength));
            const startOffset = -(numDashes * (dashLength + gapLength) - gapLength) / 2;

            for (let i = 0; i < numDashes; i++) {
                const dashCenter = startOffset + i * (dashLength + gapLength) + dashLength / 2;

                const localOffset = {
                    x: roadIsVertical ? 0 : dashCenter,
                    z: roadIsVertical ? -dashCenter : 0
                };

                const geo = this.createDeformedStrip(
                    thickness,
                    dashLength,
                    center,
                    localOffset,
                    roadIsVertical,
                    0.25 // Standard height for road
                );

                group.add(new THREE.Mesh(geo, this.markingMaterial));
            }
        } else if (centerType === "solid") {
            const geo = this.createDeformedStrip(
                thickness,
                totalLength,
                center,
                { x: 0, z: 0 },
                roadIsVertical,
                0.25
            );
            group.add(new THREE.Mesh(geo, this.markingMaterial));
        }
    }

    private addIntersectionMarkings(
        group: THREE.Group,
        block: CityBlock,
        center: { x: number; z: number }
    ) {
        const stopLineThickness = 0.4;
        // Stop line pushed back OUTSIDE the intersection block
        // Road block is gridSize/2 from center. Add 1.5m buffer.
        const offset = this.gridSize / 2 + 1.5;

        // Stop lines should only be on the entry side of the road (Right-hand traffic)
        // Road width is usually 10. Half width is 5.
        // We want the line to be roughly from the curb to the center.
        const halfWidth = this.gridSize / 2; // 5.0
        const lineLength = halfWidth - 0.5; // 4.5
        const quarterOffset = lineLength / 2; // 2.25

        for (const dir of ["n", "e", "s", "w"] as const) {
            if (block.connections[dir]) {
                let lx = 0;
                let lz = 0;
                let verticalStrip = false;

                // N: Road to North. Incoming traffic (South) is on West side (-X).
                if (dir === 'n') {
                    lz = -offset;
                    lx = -quarterOffset; // Shift left
                    verticalStrip = false;
                }
                // S: Road to South. Incoming traffic (North) is on East side (+X).
                if (dir === 's') {
                    lz = offset;
                    lx = quarterOffset; // Shift right
                    verticalStrip = false;
                }
                // E: Road to East. Incoming traffic (West) is on North side (-Z).
                if (dir === 'e') {
                    lx = offset;
                    lz = -quarterOffset; // Shift Up (North)
                    verticalStrip = true;
                }
                // W: Road to West. Incoming traffic (East) is on South side (+Z).
                if (dir === 'w') {
                    lx = -offset;
                    lz = quarterOffset; // Shift Down (South)
                    verticalStrip = true;
                }

                const geo = this.createDeformedStrip(
                    stopLineThickness,
                    lineLength,
                    center,
                    { x: lx, z: lz },
                    verticalStrip,
                    0.02 // Higher than intersection mesh (0.01) to sit on top
                );
                group.add(new THREE.Mesh(geo, this.markingMaterial));
            }
        }
    }

    private addBridgeSupports(
        parent: THREE.Group,
        block: CityBlock,
        center: { x: number; z: number },
        roadThickness: number
    ) {
        const half = this.gridSize / 2;
        const corners = [
            { x: -half, z: -half }, { x: half, z: -half },
            { x: -half, z: half }, { x: half, z: half }
        ];

        const pillarMat = new THREE.MeshStandardMaterial({ color: "#7f8c8d" });

        corners.forEach(c => {
            const wx = center.x + c.x;
            const wz = center.z - c.z;

            const surfaceH = this.getRoadSurfaceHeight(wx, wz);
            const groundH = this.getTerrainHeight(wx, wz);

            // If road is significantly higher than ground, add pillar
            if (surfaceH - groundH > 1.0) {
                const height = (surfaceH - roadThickness / 2) - groundH;
                if (height > 0.1) {
                    const pillar = new THREE.Mesh(
                        new THREE.CylinderGeometry(0.5, 0.5, height),
                        pillarMat
                    );
                    pillar.position.set(c.x, groundH + height / 2, c.z);

                    parent.add(pillar);
                }
            }
        });

        const ch = this.getRoadSurfaceHeight(center.x, center.z);
        const gh = this.getTerrainHeight(center.x, center.z);
        if (ch - gh > 1.0) {
            this.addRailings(parent, block, ch);
        }
    }

    private addRailings(parent: THREE.Group, block: CityBlock, height: number) {
        const railMat = new THREE.MeshStandardMaterial({ color: "#bdc3c7" });
        const railHeight = 0.5;

        const roadGoesVertical = block.connections.n || block.connections.s;
        const roadGoesHorizontal = block.connections.e || block.connections.w;

        const sides = [];
        if (roadGoesVertical && !roadGoesHorizontal) sides.push('left', 'right');
        else if (roadGoesHorizontal) sides.push('top', 'bottom');
        else sides.push('left', 'right'); // Default for unknown intersection?

        sides.forEach(side => {
            let lx = 0, lz = 0, sx = 1, sz = 1;
            if (side === 'left') { lx = -5; sx = 0.2; sz = 10; }
            if (side === 'right') { lx = 5; sx = 0.2; sz = 10; }
            if (side === 'top') { lz = -5; sx = 10; sz = 0.2; }
            if (side === 'bottom') { lz = 5; sx = 10; sz = 0.2; }

            const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, railHeight, sz), railMat);
            mesh.position.set(lx, height + 0.5, lz);
            parent.add(mesh);
        });
    }

    // --- Street Lamps Logic ---

    private templates: Record<string, THREE.Object3D> = {};
    private lampsGroup = new THREE.Group();

    public setTemplates(templates: Record<string, THREE.Object3D>) {
        this.templates = templates;
        // Rebuild lamps with new templates
        this.buildLamps();
        // Update road materials if available (optional, handled separately if needed)
    }

    private buildLamps() {
        this.lampsGroup.clear();

        // Add lamps group to main group if not already added
        if (this.lampsGroup.parent !== this.group) {
            this.group.add(this.lampsGroup);
        }

        const blocks = this.cityMap.getAllBlocks();
        for (const block of blocks) {
            if (block.type === "road") {
                this.placeLampAtBlock(block);
            }
        }
    }

    private placeLampAtBlock(block: CityBlock) {
        // "Not too often" -> Place every ~3 blocks (pseudo-random but deterministic)
        // Use a hash of coordinates to decide
        const hash = Math.abs(block.x * 73856093 ^ block.z * 19349663);
        const shouldPlace = (hash % 3) === 0;

        if (!shouldPlace) return;

        const roadWidth = this.getRoadWidthForBlock(block);
        const center = this.cityMap.getWorldPosition(block.x, block.z);
        const surfaceH = this.getRoadSurfaceHeight(center.x, center.z);

        // Determine orientation based on road direction
        const roadGoesVertical = block.connections.n || block.connections.s;
        const roadGoesHorizontal = block.connections.e || block.connections.w;

        let roadIsVertical = false;
        if (roadGoesVertical && roadGoesHorizontal) {
            // Priority to vertical for placement logic if both (rare for single block unless intersection, mainly for straight segments)
            const v = (block.connections.n ? 1 : 0) + (block.connections.s ? 1 : 0);
            const h = (block.connections.e ? 1 : 0) + (block.connections.w ? 1 : 0);
            roadIsVertical = v >= h;
        } else {
            roadIsVertical = roadGoesVertical && !roadGoesHorizontal;
        }

        // Place on one side (randomly chosen by hash per block to vary)
        const side = (hash % 2) === 0 ? 1 : -1;

        // Offset from center: Road Half Width + Curb/Sidewalk offset
        // Typically roadWidth is 10 or 16.
        // Lamp should be on the sidewalk.
        const offsetDist = roadWidth / 2 + 1.5; // 1.5m sidewalk margin

        const lx = roadIsVertical ? offsetDist * side : 0;
        const lz = roadIsVertical ? 0 : offsetDist * side;

        // Lamp position
        const px = center.x + lx;
        const pz = center.z + lz;
        const py = surfaceH; // Base at road height

        this.createLampMesh(px, py, pz, roadIsVertical ? (side > 0 ? -Math.PI / 2 : Math.PI / 2) : (side > 0 ? 0 : Math.PI));
    }

    private createLampMesh(x: number, y: number, z: number, rotationY: number) {
        let mesh: THREE.Object3D;

        if (this.templates["lamp"]) {
            // Use GLB template
            mesh = this.templates["lamp"].clone(true);
            mesh.scale.multiplyScalar(1.5); // Slightly larger for visibility?
        } else {
            // Procedural Fallback (Simple Post + Light)
            mesh = new THREE.Group();

            const pole = new THREE.Mesh(
                new THREE.CylinderGeometry(0.15, 0.2, 4, 8),
                new THREE.MeshStandardMaterial({ color: "#4a4a4a", roughness: 0.8 })
            );
            pole.position.y = 2;
            pole.castShadow = true;
            mesh.add(pole);

            const arm = new THREE.Mesh(
                new THREE.BoxGeometry(0.15, 0.15, 1.5),
                new THREE.MeshStandardMaterial({ color: "#4a4a4a" })
            );
            arm.position.set(0, 3.8, 0.5);
            mesh.add(arm);

            const bulb = new THREE.Mesh(
                new THREE.SphereGeometry(0.3, 8, 8),
                new THREE.MeshStandardMaterial({ color: "#ffaa00", emissive: "#ffaa00", emissiveIntensity: 2.0 })
            );
            bulb.position.set(0, 3.7, 1.1);
            mesh.add(bulb);

            // Point light for effect
            const light = new THREE.PointLight(0xffaa00, 1.0, 15);
            light.position.set(0, 3.5, 1.1);
            mesh.add(light);

            // Adjust rotation for procedural: Arm should point towards road
            // Current rotationY logic assumes template "front" faces road.
            // My procedural arm extends +Z.
            // If the road is at (0,0), and lamp is at +X (right side), it should point -X (local Left) or something.
            // Actually let's just rotate the whole group.
        }

        mesh.position.set(x, y, z);
        mesh.rotation.y = rotationY;

        // Procedural fix: Rotate such that it faces the road
        // The `rotationY` passed in assumes the object faces +Z? 
        // Let's refine based on the side logic.
        // If template, assume Front is +Z.
        // If procedural, arm is +Z. 
        // So just set rotation.

        // Add shadow casting to all meshes
        mesh.traverse(c => {
            if (c instanceof THREE.Mesh) c.castShadow = true;
        });

        this.lampsGroup.add(mesh);
    }
}
