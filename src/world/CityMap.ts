import * as THREE from "three";
import { TrafficGraph, type TrafficNode } from "./TrafficGraph";
export type BlockType = "empty" | "road" | "intersection";

export interface CityBlock {
    type: BlockType;
    // Grid coordinates
    x: number;
    z: number;

    // Logic
    connections: { n: boolean; e: boolean; s: boolean; w: boolean };
}

export class CityMap {
    private blocks = new Map<string, CityBlock>();
    private readonly gridSize = 10; // 10 units per block

    constructor() { }

    /**
     * Helper to generate key from coordinates
     */
    private key(x: number, z: number): string {
        return `${Math.round(x)},${Math.round(z)}`;
    }

    /**
     * Add a road at specific grid coordinates
     */
    public addRoadBlock(x: number, z: number) {
        const k = this.key(x, z);
        // If already exists, just return (or update)
        if (this.blocks.has(k)) {
            const b = this.blocks.get(k)!;
            if (b.type !== "empty") return;
        }

        this.blocks.set(k, {
            type: "road",
            x,
            z,
            connections: { n: false, e: false, s: false, w: false }
        });

        this.updateConnections(x, z);
    }

    /**
     * Remove block at coordinates
     */
    public removeBlock(x: number, z: number) {
        const k = this.key(x, z);
        if (this.blocks.has(k)) {
            this.blocks.delete(k);
            // Update neighbors to remove connection to this block
            this.updateNeighbors(x, z);
        }
    }

    /**
     * Fill a rectangular area with roads
     * (The "Square" requirement)
     */
    public fillArea(xStart: number, zStart: number, width: number, depth: number) {
        for (let x = xStart; x < xStart + width; x++) {
            for (let z = zStart; z < zStart + depth; z++) {
                this.addRoadBlock(x, z);
            }
        }
    }

    /**
     * Update connections for a specific block and its neighbors
     * Determines if a block is a straight road or an intersection
     */
    private updateConnections(x: number, z: number) {
        const block = this.blocks.get(this.key(x, z));
        if (!block) return;

        // Check neighbors
        const n = this.blocks.has(this.key(x, z - 1));
        const s = this.blocks.has(this.key(x, z + 1));
        const e = this.blocks.has(this.key(x + 1, z));
        const w = this.blocks.has(this.key(x - 1, z));

        block.connections = { n, e, s, w };

        // Determine type based on connection count
        const count = (n ? 1 : 0) + (s ? 1 : 0) + (e ? 1 : 0) + (w ? 1 : 0);

        if (count > 2) {
            block.type = "intersection";
        } else if (count === 2) {
            // Check for curve vs straight
            if ((n && s) || (e && w)) {
                block.type = "road"; // Straight
            } else {
                block.type = "intersection"; // Corner
            }
        } else {
            block.type = "road"; // Dead end or single
        }

        // Also update neighbors
        this.updateNeighbors(x, z);
    }

    private updateNeighbors(x: number, z: number) {
        // Prevent infinite recursion by not calling updateNeighbors again inside here?
        // Actually simplicity: just update the 4 neighbors' Types/Connections without recursing further.
        // But neighbors' neighbors connect to THEM, so it is local.
        const neighbors = [
            { bx: x, bz: z - 1 },
            { bx: x, bz: z + 1 },
            { bx: x + 1, bz: z },
            { bx: x - 1, bz: z }
        ];

        for (const { bx, bz } of neighbors) {
            if (this.blocks.has(this.key(bx, bz))) {
                this.recalcBlock(bx, bz);
            }
        }
    }

    private recalcBlock(x: number, z: number) {
        const block = this.blocks.get(this.key(x, z));
        if (!block) return;

        const n = this.blocks.has(this.key(x, z - 1));
        const s = this.blocks.has(this.key(x, z + 1));
        const e = this.blocks.has(this.key(x + 1, z));
        const w = this.blocks.has(this.key(x - 1, z));

        block.connections = { n, e, s, w };
        const count = (n ? 1 : 0) + (s ? 1 : 0) + (e ? 1 : 0) + (w ? 1 : 0);

        if (count > 2) {
            block.type = "intersection";
        } else if (count === 2) {
            if ((n && s) || (e && w)) {
                block.type = "road";
            } else {
                block.type = "intersection"; // Corner
            }
        } else {
            block.type = "road";
        }
    }

    /**
     * Import legacy roads from WORLD_CONFIG
     */
    public importFromConfig(roads: Array<{ position: { x: number; z: number }; width: number; length: number; rotation?: number }>) {
        for (const r of roads) {
            const rot = r.rotation ?? 0;
            // Normalize rotation to 0 or PI/2
            const isHorizontal = Math.abs(Math.cos(rot)) < 0.1; // Rotated 90 deg (PI/2) means cos is ~0.

            // Grid 0,0 is World 0,0.

            const startX = Math.round(r.position.x / this.gridSize);
            const startZ = Math.round(r.position.z / this.gridSize);

            const lenBlocks = Math.round(r.length / this.gridSize);
            const numBlocks = Math.max(1, lenBlocks);

            // We iterate from -halfLength to +halfLength (centered)
            const halfLen = Math.floor(numBlocks / 2);

            if (isHorizontal) {
                // Along X axis (Rotation PI/2)
                // Meaning width is along Z, length along X? 
                // Usually: Rotation 0 => Length is along Z (Visual convention in this project based on config comments)
                // Config says: x:0, z:0, width:10, length:380, rot: PI/2 is "East-West"
                // So PI/2 means Length is along X.
                for (let i = -halfLen; i <= halfLen; i++) {
                    this.addRoadBlock(startX + i, startZ);
                }
            } else {
                // Along Z axis (Rotation 0)
                for (let i = -halfLen; i <= halfLen; i++) {
                    this.addRoadBlock(startX, startZ + i);
                }
            }
        }
    }

    // --- Visuals helper ---
    public getAllBlocks(): CityBlock[] {
        return Array.from(this.blocks.values());
    }

    public getWorldPosition(gx: number, gz: number) {
        return {
            x: gx * this.gridSize,
            z: gz * this.gridSize
        };
    }

    public buildTrafficGraph(): TrafficGraph {
        const graph = new TrafficGraph();

        console.log(`[CityMap] Building Traffic Graph from ${this.blocks.size} blocks...`);

        // A block is a node if it is an intersection (count != 2) OR if it connects 2 non-straight neighbors (turns).
        const isNode = (b: CityBlock) => {
            const c = b.connections;
            const count = (c.n ? 1 : 0) + (c.s ? 1 : 0) + (c.e ? 1 : 0) + (c.w ? 1 : 0);
            if (count !== 2) return true;
            if ((c.n && c.s) || (c.e && c.w)) return false; // Straight road
            return true; // Turn
        };

        const nodesMap = new Map<string, TrafficNode>();

        this.blocks.forEach((block) => {
            if (block.type === "empty") return;
            if (isNode(block)) {
                const wx = block.x * this.gridSize;
                const wz = block.z * this.gridSize;
                const node = graph.addNode(wx, wz);
                nodesMap.set(this.key(block.x, block.z), node);
            }
        });

        // 2. Build Edges (BFS/Walk from each node)
        const directions = [
            { dx: 0, dz: -1, name: "n" },
            { dx: 0, dz: 1, name: "s" },
            { dx: 1, dz: 0, name: "e" },
            { dx: -1, dz: 0, name: "w" }
        ];

        nodesMap.forEach((node, key) => {
            const [sx, sz] = key.split(",").map(Number);
            const startBlock = this.blocks.get(key)!;

            directions.forEach(dir => {
                if (!(startBlock.connections as any)[dir.name]) return;

                // Calculate Right-Hand Traffic Offset
                // Direction (dx, dz). Right vector is (-dz, dx).
                // Grid size 10 => Lane center offset 2.5
                const offset = 2.5;
                const offX = -dir.dz * offset;
                const offZ = dir.dx * offset;

                // Walk
                let cx = sx + dir.dx;
                let cz = sz + dir.dz;

                // Start Point (Node center + offset)
                const points: THREE.Vector3[] = [
                    new THREE.Vector3(node.x + offX, 0, node.z + offZ)
                ];

                // Safety limiter
                for (let i = 0; i < 500; i++) {
                    const blockKey = this.key(cx, cz);
                    const block = this.blocks.get(blockKey);
                    if (!block) break;

                    const wx = cx * this.gridSize;
                    const wz = cz * this.gridSize;

                    // If Node found
                    if (nodesMap.has(blockKey)) {
                        const endNode = nodesMap.get(blockKey)!;
                        points.push(new THREE.Vector3(endNode.x + offX, 0, endNode.z + offZ));
                        graph.addEdge(node, endNode, points);
                        break;
                    }

                    // Middle Point
                    points.push(new THREE.Vector3(wx + offX, 0, wz + offZ));
                    cx += dir.dx;
                    cz += dir.dz;
                }
            });
        });

        return graph;
    }
}
