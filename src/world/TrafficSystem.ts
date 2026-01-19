import * as THREE from "three";
import { Car } from "../entities/Car";
import { Bus } from "../entities/Bus";
import { TrafficGraph, TrafficEdge } from "./TrafficGraph";
import { WORLD_CONFIG } from "@config/world";
import { worldToLocalXZ } from "@utils/math";

type TrafficDirection = "NS" | "EW";
type TrafficState = "NS_GO" | "NS_YELLOW" | "EW_GO" | "EW_YELLOW";

const FUNNY_PLATES = [
    "КОТ-404",
    "МЯУ-007",
    "РЫБА",
    "С0Н",
    "ТЫГДЫК",
    "ЛАПКИ",
    "МУР",
    "КУСЬ",
    "ШЕРСТЬ",
    "ЖРАТЬ"
];

export interface IWorldPhysics {
    getWorldHeight(x: number, z: number): number;
}

export class TrafficSystem {
    readonly group = new THREE.Group();
    private readonly _trafficCars: (Car | Bus)[] = [];
    get trafficCars() { return this._trafficCars; }

    private vehicleTemplates: Record<string, THREE.Object3D> = {};

    public setVehicleTemplates(templates: Record<string, THREE.Object3D>) {
        this.vehicleTemplates = templates;
        // Перестраиваем трафик, чтобы учесть новые шаблоны (автобусы из GLB)
        console.log("[TrafficSystem] Vehicle templates registered:", Object.keys(templates));
        this.buildTrafficCars();
    }

    public spawnCar(x: number, z: number) {
        console.log("[DEBUG] spawnCar called at", x, z);
        const plate = FUNNY_PLATES[Math.floor(Math.random() * FUNNY_PLATES.length)];
        const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ffffff", "#000000"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        const isBus = Math.random() < 0.25; // 25% chance for a bus

        let vehicle: Car | Bus;
        const dummyPath = [new THREE.Vector3(x, 0, z), new THREE.Vector3(x, 0, z)];

        if (isBus) {
            vehicle = new Bus(dummyPath, {
                color: color,
                speed: 3.5, // Buses are slightly slower
                y: 0.22,
                plateText: plate,
                parked: false,
                template: this.vehicleTemplates["bus"]
            });
        } else {
            vehicle = new Car(dummyPath, {
                color: color,
                speed: 4,
                y: 0.22,
                plateText: plate,
                parked: false,
                template: this.vehicleTemplates["car"],
                style: this.getRandomStyle()
            });
        }

        // Position at click location (on terrain)
        const h = this.world.getWorldHeight(x, z);
        vehicle.object.position.set(x, h + 0.22, z);

        this.group.add(vehicle.object);

        // Find nearest edge and set path, but don't teleport
        if (this.graph) {
            const node = this.graph.getRandomNode();
            if (node && node.out.length > 0) {
                const edge = node.out[Math.floor(Math.random() * node.out.length)];
                vehicle.setPath(edge.pathPoints);
                vehicle.object.userData.currentEdge = edge;
            }
        }

        console.log("[DEBUG] spawnCar complete, vehicle at", vehicle.object.position);

        this._trafficCars.push(vehicle);
        return vehicle;
    }

    private trafficState: TrafficState = "NS_GO";
    private trafficTimer = 0;
    private readonly trafficCycleTime = 5; // сек.
    private readonly trafficYellowTime = 1.5; // сек.
    private readonly trafficLights: Array<{
        type: TrafficDirection;
        red: THREE.MeshBasicMaterial;
        yellow: THREE.MeshBasicMaterial;
        green: THREE.MeshBasicMaterial;
    }> = [];



    constructor(private world: IWorldPhysics, private graph: TrafficGraph) {
        // this.intersections = this.computeIntersections(); // Deprecated
        this.buildTrafficLights();
        this.buildTrafficCars();
    }

    private roadBounds: THREE.Box2[] = [];

    private isPointOnRoad(x: number, z: number, padding = 0): boolean {
        const roads = WORLD_CONFIG.roads ?? [];

        // Lazy initialization of road bounds for fast AABB check
        if (this.roadBounds.length !== roads.length) {
            this.roadBounds = roads.map(r => {
                const halfW = r.width / 2;
                const halfL = r.length / 2;
                // Simplified bounds (not accounting for rotation perfectly, but enough for a fast reject)
                const maxDim = Math.max(halfW, halfL);
                return new THREE.Box2(
                    new THREE.Vector2(r.position.x - maxDim, r.position.z - maxDim),
                    new THREE.Vector2(r.position.x + maxDim, r.position.z + maxDim)
                );
            });
        }

        for (let i = 0; i < roads.length; i++) {
            const r = roads[i];
            const bounds = this.roadBounds[i];

            // Fast AABB check first
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

    update(dt: number) {
        this.updateTrafficLights(dt);
        this.updateTrafficCars(dt);
    }

    private updateTrafficLights(dt: number) {
        this.trafficTimer += dt;
        let needed = false;

        // State machine
        if (this.trafficState === "NS_GO") {
            if (this.trafficTimer > this.trafficCycleTime) {
                this.trafficState = "NS_YELLOW";
                this.trafficTimer = 0;
                needed = true;
            }
        } else if (this.trafficState === "NS_YELLOW") {
            if (this.trafficTimer > this.trafficYellowTime) {
                this.trafficState = "EW_GO";
                this.trafficTimer = 0;
                needed = true;
            }
        } else if (this.trafficState === "EW_GO") {
            if (this.trafficTimer > this.trafficCycleTime) {
                this.trafficState = "EW_YELLOW";
                this.trafficTimer = 0;
                needed = true;
            }
        } else if (this.trafficState === "EW_YELLOW") {
            if (this.trafficTimer > this.trafficYellowTime) {
                this.trafficState = "NS_GO";
                this.trafficTimer = 0;
                needed = true;
            }
        }

        if (needed) {
            this.updateTrafficLightVisuals();
        }
    }

    private collisionTimer = 0;
    private readonly collisionInterval = 0.1; // Обновляем коллизии 10 раз в секунду
    private heightUpdateTimer = 0;
    private readonly heightUpdateInterval = 0.2; // Обновляем высоту 5 раз в секунду

    private updateTrafficCars(dt: number) {
        this.collisionTimer += dt;
        this.heightUpdateTimer += dt;

        const shouldCheckCollisions = this.collisionTimer >= this.collisionInterval;
        if (shouldCheckCollisions) this.collisionTimer = 0;

        const shouldUpdateHeight = this.heightUpdateTimer >= this.heightUpdateInterval;
        if (shouldUpdateHeight) this.heightUpdateTimer = 0;

        for (const car of this._trafficCars) {
            const pos = car.object.position;

            // 1. Raycast for height is expensive.
            // Update only periodically or if explicitly needed.
            if (shouldUpdateHeight || car.object.userData.lastHeight === undefined) {
                const h = this.world.getWorldHeight(pos.x, pos.z);
                car.object.userData.lastHeight = h;
            }
            const currentH = car.object.userData.lastHeight;

            // 2. Check if way is blocked
            if (shouldCheckCollisions) {
                const isOnRoad = this.isPointOnRoad(pos.x, pos.z, 1.5);
                if (this.checkWayBlocked(car) || !isOnRoad) {
                    car.setSpeedScale(0);
                } else {
                    car.setSpeedScale(1);
                }
            }

            // 3. Update car position
            const oldPos = pos.clone();
            car.update(dt, currentH);

            // 4. Stay on road check
            if (shouldCheckCollisions) {
                const newIsOnRoad = this.isPointOnRoad(pos.x, pos.z, 1.5);
                if (!newIsOnRoad) {
                    pos.copy(oldPos);
                }
            }

            if (car.finished) {
                this.routeCar(car);
            }
        }

        if (shouldCheckCollisions) {
            this.resolveCollisions();
        }
    }

    private resolveCollisions() {
        // Prevent vehicles from overlapping by pushing them apart
        for (let i = 0; i < this._trafficCars.length; i++) {
            const car1 = this._trafficCars[i];
            const pos1 = car1.object.position;

            for (let j = i + 1; j < this._trafficCars.length; j++) {
                const car2 = this._trafficCars[j];
                const pos2 = car2.object.position;

                const dx = pos1.x - pos2.x;
                const dz = pos1.z - pos2.z;
                const dist = Math.hypot(dx, dz);

                // Minimum safe distance between vehicles (bus scale makes them larger)
                const isBus1 = car1 instanceof Bus;
                const isBus2 = car2 instanceof Bus;
                // Reduce bus distance slightly to prevent cross-lane pushing (lanes are 5m apart)
                const minDist = (isBus1 || isBus2) ? 3.8 : 3.0;

                if (dist < minDist && dist > 0.001) {
                    // Push vehicles apart
                    const pushStrength = (minDist - dist) * 0.5;
                    const pushDir = new THREE.Vector3(dx / dist, 0, dz / dist);

                    // Move both vehicles away from each other
                    pos1.add(pushDir.clone().multiplyScalar(pushStrength * 0.5));
                    pos2.sub(pushDir.multiplyScalar(pushStrength * 0.5));
                }
            }
        }
    }

    private checkWayBlocked(car: Car | Bus): boolean {
        const myPos = car.object.position;
        const isBus = car instanceof Bus;
        const minDist = isBus ? 5.0 : 3.5;
        const minDistSq = minDist * minDist;

        for (const other of this._trafficCars) {
            if (other === car) continue;

            const dx = other.object.position.x - myPos.x;
            const dz = other.object.position.z - myPos.z;
            const distSq = dx * dx + dz * dz;

            if (distSq < minDistSq) {
                // Vector to other car (using squared dist for fast check)
                const myFwd = car.getForward2D();
                // Dot product without full normalization if possible? 
                // We need normalize to Other for correct angle.
                const dist = Math.sqrt(distSq);
                if (dist < 0.001) continue;

                const dot = (dx / dist) * myFwd.x + (dz / dist) * myFwd.z;

                if (dot > 0.5) {
                    return true;
                }
            }
        }

        // 2. Traffic Lights
        // Check if we are near the end of the current edge (approaching node)
        // userData.currentEdge
        const edge = car.object.userData.currentEdge as TrafficEdge;
        if (!edge) return false;

        // Are we close to `edge.to`?
        const distToNode = myPos.distanceTo(new THREE.Vector3(edge.to.x, myPos.y, edge.to.z));
        if (distToNode < 8.0) { // Approaching intersection
            // Identify direction of this edge coming into node
            // If abs(dx) > abs(dz) -> arriving from West or East -> EW Traffic
            const dx = edge.to.x - edge.from.x;
            const dz = edge.to.z - edge.from.z;
            const isEW = Math.abs(dx) > Math.abs(dz);

            const state = this.getTrafficLightState(isEW ? "EW" : "NS");
            // If Yellow or Red, stop.
            // BUT: If light turned yellow while we are VERY close, we should pass?
            // Simplification: Stop on Yellow/Red if dist > 2.0. If dist < 2.0, commit.
            if ((state === "RED" || state === "YELLOW") && distToNode > 3.0) {
                return true;
            }
        }

        return false;
    }

    public assignDestination(car: Car | Bus, x: number, z: number) {
        if (!this.graph) return;

        const currentEdge = car.object.userData.currentEdge as TrafficEdge;
        if (!currentEdge) return;

        const startNode = currentEdge.to; // Plan from the upcoming intersection
        const endNode = this.graph.getClosestNode(x, z);

        if (endNode) {
            const path = this.graph.findPath(startNode, endNode);
            if (path && path.length > 0) {
                car.setRoute(path);
                // Visual debug or log
                // console.log(`[Traffic] Assigned route to ${endNode.id}`);
            }
        }
    }

    private routeCar(car: Car | Bus) {
        const currentEdge = car.object.userData.currentEdge as TrafficEdge;
        if (!currentEdge) {
            this.respawnCar(car);
            return;
        }

        const node = currentEdge.to;
        if (node.out.length === 0) {
            this.respawnCar(car);
            return;
        }

        // --- Routing Logic ---
        // 1. If no route, plan one to a random destination
        if (car.routeQueue.length === 0) {
            const goal = this.graph?.getRandomNode();
            if (goal && goal.id !== node.id && this.graph) {
                const route = this.graph.findPath(node, goal);
                if (route && route.length > 0) {
                    car.setRoute(route);
                }
            }
        }

        let nextEdge: TrafficEdge | undefined;

        // 2. Try to get next edge from queue
        // We peek/shift.
        if (car.routeQueue.length > 0) {
            const candidate = car.routeQueue[0];
            // Check connectivity
            if (candidate.from.id === node.id) {
                nextEdge = car.routeQueue.shift();
            } else {
                // Route broke? Clear it.
                car.routeQueue.length = 0;
            }
        }

        // 3. Fallback: Random valid turn if no route or route failed
        if (!nextEdge) {
            // Improved Random: Prefer straight if possible (from old logic)
            // Get direction of arrival
            const pLast = currentEdge.pathPoints[currentEdge.pathPoints.length - 1];
            const pPrev = currentEdge.pathPoints[currentEdge.pathPoints.length - 2] || currentEdge.pathPoints[0];
            const arriveDir = new THREE.Vector3().subVectors(pLast, pPrev).normalize();

            // Sort choices by "straightness"
            const choices = node.out.map(edge => {
                const pFirst = edge.pathPoints[0];
                const pSecond = edge.pathPoints[1] || edge.pathPoints[edge.pathPoints.length - 1];
                const departDir = new THREE.Vector3().subVectors(pSecond, pFirst).normalize();
                const dot = arriveDir.dot(departDir);
                return { edge, score: dot };
            });

            // Try to find a "straight" path (score > 0.8)
            const straights = choices.filter(c => c.score > 0.8);
            const others = choices.filter(c => c.score <= 0.8);

            if (straights.length > 0 && Math.random() < 0.75) {
                nextEdge = straights[Math.floor(Math.random() * straights.length)].edge;
            } else {
                // Otherwise random turn
                const pool = others.length > 0 ? others : straights;
                if (pool.length === 0) {
                    nextEdge = node.out[Math.floor(Math.random() * node.out.length)];
                } else {
                    nextEdge = pool[Math.floor(Math.random() * pool.length)].edge;
                }
            }
        }

        // --- Curve Generation ---
        // Build curve: pStart is last point of current edge, pEnd is first point of next edge
        const pStart = currentEdge.pathPoints[currentEdge.pathPoints.length - 1];
        const pEnd = nextEdge.pathPoints[0];

        // Control points
        // Arrive Dir
        const pPrev = currentEdge.pathPoints[currentEdge.pathPoints.length - 2] || currentEdge.pathPoints[0];
        const arriveDir = new THREE.Vector3().subVectors(pStart, pPrev).normalize();

        // Depart Dir
        const nextP = nextEdge.pathPoints[1] || pEnd;
        const departDir = new THREE.Vector3().subVectors(nextP, pEnd).normalize(); // Points FROM pEnd TO nextP?
        // Wait, old code: dirOut = (nextP - pEnd).normalize(). 
        // Logic: Curve goes Start -> End. Tangent AT End should be same as line End->NextP.
        // So dirOut should be the tangent vector at pEnd.
        const dirOut = departDir;

        const dist = pStart.distanceTo(pEnd);
        // If distance is large, it's a gap. If small, it's a tight connection.
        const controlDist = Math.max(2, dist * 0.4);

        const cp1 = pStart.clone().add(arriveDir.clone().multiplyScalar(controlDist));
        // Curve enters pEnd matching the road direction?
        // Bezier ends at pEnd. Tangent at pEnd is (pEnd - cp2).
        // We want (pEnd - cp2) to be parallel to dirOut (Road direction).
        // So cp2 must be "behind" pEnd relative to dirOut.
        // cp2 = pEnd - dirOut * dist
        const cp2 = pEnd.clone().sub(dirOut.clone().multiplyScalar(controlDist));

        const curve = new THREE.CubicBezierCurve3(pStart, cp1, cp2, pEnd);
        const curvePoints = curve.getPoints(8);
        curvePoints.shift(); // Remove start point (duplicate of pStart)

        const newPath = [...curvePoints, ...nextEdge.pathPoints.slice(1)];

        if (newPath.length < 2) {
            this.respawnCar(car);
            return;
        }

        car.setPath(newPath);
        car.object.userData.currentEdge = nextEdge;
    }

    private respawnCar(car: Car | Bus) {
        if (!this.graph) return;
        const node = this.graph.getRandomNode();
        if (!node || node.out.length === 0) return;
        const edge = node.out[Math.floor(Math.random() * node.out.length)];

        car.setPath(edge.pathPoints);
        car.object.userData.currentEdge = edge;
        // Teleport
        const start = edge.pathPoints[0];
        // const h = this.world.getWorldHeight(start.x, start.z);
        car.object.position.set(start.x, 0.23, start.z);
    }
    private getTrafficLightState(dir: TrafficDirection): "RED" | "YELLOW" | "GREEN" {
        if (dir === "NS") {
            if (this.trafficState === "NS_GO") return "GREEN";
            if (this.trafficState === "NS_YELLOW") return "YELLOW";
            return "RED";
        } else {
            if (this.trafficState === "EW_GO") return "GREEN";
            if (this.trafficState === "EW_YELLOW") return "YELLOW";
            return "RED";
        }
    }

    private updateTrafficLightVisuals() {
        const nsState = this.getTrafficLightState("NS");
        const ewState = this.getTrafficLightState("EW");

        const setColors = (
            mats: { red: THREE.MeshBasicMaterial; yellow: THREE.MeshBasicMaterial; green: THREE.MeshBasicMaterial },
            state: "RED" | "YELLOW" | "GREEN"
        ) => {
            mats.red.color.setHex(state === "RED" ? 0xff0000 : 0x330000);
            mats.yellow.color.setHex(state === "YELLOW" ? 0xffff00 : 0x333300);
            mats.green.color.setHex(state === "GREEN" ? 0x00ff00 : 0x003300);
        };

        this.trafficLights.forEach((tl) => {
            if (tl.type === "NS") setColors(tl, nsState);
            else setColors(tl, ewState);
        });
    }

    private buildTrafficLights() {
        // Traffic lights at each intersection (nodes with > 2 connections)
        const boxGeo = new THREE.BoxGeometry(0.25, 0.7, 0.25);
        const poleGeo = new THREE.CylinderGeometry(0.06, 0.06, 3.5);
        const poleMat = new THREE.MeshStandardMaterial({ color: "#222" });
        const boxMat = new THREE.MeshStandardMaterial({ color: "#111" });

        // Reusable materials
        const redMat = new THREE.MeshBasicMaterial({ color: 0x330000 });
        const yellowMat = new THREE.MeshBasicMaterial({ color: 0x333300 });
        const greenMat = new THREE.MeshBasicMaterial({ color: 0x003300 });

        const bulbGeo = new THREE.CircleGeometry(0.06, 16);

        if (!this.graph) return;

        for (const node of this.graph.nodes.values()) {
            if (node.out.length < 3) continue; // Only intersections

            const halfW = 3.0; // Approx road width / 2
            const dist = halfW + 1.0;

            const corners = [
                { dx: 1, dz: 1, rot: 0, type: "NS" },
                { dx: -1, dz: -1, rot: Math.PI, type: "NS" },
                { dx: 1, dz: -1, rot: Math.PI / 2, type: "EW" },
                { dx: -1, dz: 1, rot: -Math.PI / 2, type: "EW" }
            ];

            corners.forEach((c) => {
                const x = node.x + c.dx * dist;
                const z = node.z + c.dz * dist;

                const g = new THREE.Group();
                g.position.set(x, 0, z);

                const pole = new THREE.Mesh(poleGeo, poleMat);
                pole.position.y = 1.75;
                g.add(pole);

                const box = new THREE.Mesh(boxGeo, boxMat);
                box.position.y = 3.2;
                box.rotation.y = c.rot;
                g.add(box);

                const addBulb = (yOff: number, mat: THREE.MeshBasicMaterial) => {
                    const b = new THREE.Mesh(bulbGeo, mat);
                    b.position.set(0, yOff, 0.13);
                    box.add(b);
                };

                // Clone materials for independent switching per direction
                const myRed = redMat.clone();
                const myYellow = yellowMat.clone();
                const myGreen = greenMat.clone();

                addBulb(0.2, myRed);
                addBulb(0, myYellow);
                addBulb(-0.2, myGreen);

                this.group.add(g);
                this.trafficLights.push({ type: c.type as TrafficDirection, red: myRed, yellow: myYellow, green: myGreen });
            });
        }
    }





    private buildTrafficCars() {
        if (!this.graph) {
            console.error("[TrafficSystem] No graph provided!");
            return;
        }



        // Gather all edges
        const allEdges: TrafficEdge[] = [];
        for (const node of this.graph.nodes.values()) {
            allEdges.push(...node.out);
        }

        if (allEdges.length === 0) return;

        // Clear existing traffic
        this._trafficCars.forEach(c => {
            if (c.object.parent) c.object.parent.remove(c.object);
        });
        this._trafficCars.length = 0;

        // Создаём 2 автобуса и легковые машины с котами
        const busCount = 2;
        const carCount = 5; // Легковые машины с котами
        const colors = ["#ff6b6b", "#6bcBff", "#ffd166", "#a29bfe", "#fd79a8", "#ffffff", "#2b2b2b"];

        // Создаём автобусы
        for (let i = 0; i < busCount; i++) {
            const edge = allEdges[Math.floor(Math.random() * allEdges.length)];
            const color = "#ffcc00";
            const plateText = FUNNY_PLATES[Math.floor(Math.random() * FUNNY_PLATES.length)];

            // Spawn at random index along the edge
            const startIndex = Math.floor(Math.random() * Math.max(1, edge.pathPoints.length - 2));

            // Используем шаблон автобуса, если он есть
            // Ignore GLB bus template to force new procedural School Bus
            const template = undefined;

            const bus = new Bus(edge.pathPoints, {
                color,
                speed: 7.0,
                y: 0.23,
                startIndex,
                parked: false,
                plateText,
                loop: false,
                template: template
            });
            bus.object.userData.currentEdge = edge;
            this._trafficCars.push(bus as any);
            this.group.add(bus.object);
        }

        // Создаём легковые машины с котами
        for (let i = 0; i < carCount; i++) {
            const edge = allEdges[Math.floor(Math.random() * allEdges.length)];
            const color = colors[i % colors.length];
            const plateText = FUNNY_PLATES[Math.floor(Math.random() * FUNNY_PLATES.length)];

            // Spawn at random index along the edge
            const startIndex = Math.floor(Math.random() * Math.max(1, edge.pathPoints.length - 2));

            // Для легковых машин всегда используем buildModel (с котом), даже если есть шаблон
            // Шаблоны используются только для автобусов и других специальных типов транспорта
            const car = new Car(edge.pathPoints, {
                color,
                speed: 8.0,
                y: 0.23,
                startIndex,
                parked: false,
                plateText,

                loop: false,
                style: this.getRandomStyle()
                // Не передаем template - будет использован buildModel с котом-водителем
            });
            car.object.userData.currentEdge = edge;
            this._trafficCars.push(car);
            this.group.add(car.object);
        }

    }

    private getRandomStyle(): "bubble" | "square" | "sports" {
        const r = Math.random();
        if (r < 0.33) return "bubble";
        if (r < 0.66) return "square";
        return "sports";
    }
}
