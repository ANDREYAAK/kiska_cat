import * as THREE from "three";

export interface TrafficNode {
    id: string; // "x,z"
    x: number;
    z: number;
    // Edges leaving this node. Key is rough direction "N","S","E","W" (optional, mainly for debug)
    out: TrafficEdge[];
}

export interface TrafficEdge {
    from: TrafficNode;
    to: TrafficNode;

    // The path curve logic
    // For grid-based city, we can store simply start/end for straight roads,
    // or a curve control path for intersections.
    pathPoints: THREE.Vector3[];

    length: number;
}

export class TrafficGraph {
    nodes = new Map<string, TrafficNode>();

    addNode(x: number, z: number): TrafficNode {
        const id = `${Math.round(x)},${Math.round(z)}`;
        if (this.nodes.has(id)) return this.nodes.get(id)!;

        const node: TrafficNode = { id, x, z, out: [] };
        this.nodes.set(id, node);
        return node;
    }

    addEdge(from: TrafficNode, to: TrafficNode, points: THREE.Vector3[]): TrafficEdge {
        const edge: TrafficEdge = {
            from,
            to,
            pathPoints: points,
            length: this.calculateLength(points)
        };
        from.out.push(edge);
        return edge;
    }

    private calculateLength(points: THREE.Vector3[]) {
        let len = 0;
        for (let i = 0; i < points.length - 1; i++) {
            len += points[i].distanceTo(points[i + 1]);
        }
        return len;
    }

    getRandomNode(): TrafficNode | null {
        const nodes = Array.from(this.nodes.values());
        if (nodes.length === 0) return null;
        return nodes[Math.floor(Math.random() * nodes.length)];
    }

    getClosestNode(x: number, z: number): TrafficNode | null {
        let closest: TrafficNode | null = null;
        let minDst = Infinity;

        for (const node of this.nodes.values()) {
            const d = Math.hypot(node.x - x, node.z - z);
            if (d < minDst) {
                minDst = d;
                closest = node;
            }
        }
        return closest;
    }

    findPath(start: TrafficNode, end: TrafficNode): TrafficEdge[] | null {
        // A* Implementation
        const openSet: { node: TrafficNode; f: number }[] = [];
        const closedSet = new Set<string>();

        // Map to reconstruct path: nodeID -> edge that led to it
        const comeFrom = new Map<string, TrafficEdge>();
        const gScore = new Map<string, number>();
        const fScore = new Map<string, number>();

        gScore.set(start.id, 0);
        fScore.set(start.id, this.heuristic(start, end));

        openSet.push({ node: start, f: fScore.get(start.id)! });

        while (openSet.length > 0) {
            // Sort by f score (lowest first)
            openSet.sort((a, b) => a.f - b.f);
            const currentObj = openSet.shift()!;
            const current = currentObj.node;

            if (current.id === end.id) {
                return this.reconstructPath(comeFrom, current);
            }

            closedSet.add(current.id);

            for (const edge of current.out) {
                const neighbor = edge.to;
                if (closedSet.has(neighbor.id)) continue;

                const tentativeG = gScore.get(current.id)! + edge.length;

                if (tentativeG < (gScore.get(neighbor.id) ?? Infinity)) {
                    comeFrom.set(neighbor.id, edge);
                    gScore.set(neighbor.id, tentativeG);
                    const f = tentativeG + this.heuristic(neighbor, end);
                    fScore.set(neighbor.id, f);

                    const existingIdx = openSet.findIndex(n => n.node.id === neighbor.id);
                    if (existingIdx !== -1) {
                        openSet[existingIdx].f = f;
                    } else {
                        openSet.push({ node: neighbor, f });
                    }
                }
            }
        }

        return null; // No path
    }

    private heuristic(a: TrafficNode, b: TrafficNode) {
        return Math.hypot(a.x - b.x, a.z - b.z);
    }

    private reconstructPath(comeFrom: Map<string, TrafficEdge>, current: TrafficNode): TrafficEdge[] {
        const totalPath: TrafficEdge[] = [];
        let currId = current.id;
        while (comeFrom.has(currId)) {
            const edge = comeFrom.get(currId)!;
            totalPath.unshift(edge);
            currId = edge.from.id;
        }
        return totalPath;
    }
}
