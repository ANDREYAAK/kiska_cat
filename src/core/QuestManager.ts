import * as THREE from "three";
import { Candy } from "@entities/Candy";
import { Hud } from "@ui/Hud";

type Quest = {
    id: number;
    label: string;
    targetMissions: string[]; // Labels of buildings to reach
    pathPoints: THREE.Vector3[]; // Waypoints for candies
};

export class QuestManager {
    private group: THREE.Group;
    private hud: Hud;
    private candies: Candy[] = [];
    private balance: number = 0;
    private currentQuestIndex: number = 0;
    private time: number = 0;
    private targetMarker: THREE.Mesh;

    // Quest definitions
    private quests: Quest[] = [
        {
            id: 0,
            label: "Идите в MTS SHOP",
            targetMissions: ["MTS SHOP"],
            pathPoints: [
                new THREE.Vector3(-40, 0, 96), // Bank Door (Z=102 - 10/2 - offset)
                new THREE.Vector3(-40, 0, 70), // Walk straight to Main Road (Z=70)
                new THREE.Vector3(-56, 0, 70), // Walk along road to match MTS Shop X (-52.5 - 4)
                new THREE.Vector3(-56, 0, 26)  // Walk straight to MTS Shop Door (approx)
            ]
        },
        {
            id: 1,
            label: "Идите в МЕДСИ",
            targetMissions: ["МЕДСИ"],
            pathPoints: [
                new THREE.Vector3(-56, 0, 26), // Start at MTS Shop Door
                new THREE.Vector3(-56, 0, 70), // Back to road
                new THREE.Vector3(-102, 0, 70), // Along road to match Medsi X (-96 - 6)
                new THREE.Vector3(-102, 0, 26)  // Medsi Door
            ]
        }
    ];

    constructor(sceneGroup: THREE.Group, hud: Hud) {
        this.group = sceneGroup;
        this.hud = hud;

        // Marker
        const markerGeo = new THREE.ConeGeometry(0.5, 1.5, 16);
        const markerMat = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.8 });
        this.targetMarker = new THREE.Mesh(markerGeo, markerMat);
        this.targetMarker.rotation.x = Math.PI; // Point down
        this.targetMarker.visible = false;
        this.group.add(this.targetMarker);

        this.startQuest(0);
    }

    private startQuest(index: number) {
        if (index >= this.quests.length) return;
        this.currentQuestIndex = index;
        const quest = this.quests[index];

        // Clear old candies
        this.clearCandies();

        // Generate new candies along path
        this.spawnCandies(quest.pathPoints);

        this.hud.setQuestMessage(quest.label);
        this.hud.updateCandyCount(this.balance);

        // Position marker roughly at the end
        const last = quest.pathPoints[quest.pathPoints.length - 1];
        this.targetMarker.position.set(last.x, 6, last.z);
        this.targetMarker.visible = true;
    }

    private spawnCandies(points: THREE.Vector3[]) {
        for (let i = 0; i < points.length - 1; i++) {
            const a = points[i];
            const b = points[i + 1];
            const dist = a.distanceTo(b);
            const count = Math.ceil(dist / 3.0); // Candy every 3 meters

            for (let j = 0; j < count; j++) {
                const t = j / count;
                const pos = new THREE.Vector3().lerpVectors(a, b, t);
                // Skip if too close to last point (node overlap) except start
                if (i > 0 && j === 0) continue;

                const candy = new Candy({ x: pos.x, z: pos.z });
                this.candies.push(candy);
                this.group.add(candy.mesh);
            }
        }
        // Add one at the very end
        const last = points[points.length - 1];
        const candy = new Candy({ x: last.x, z: last.z });
        this.candies.push(candy);
        this.group.add(candy.mesh);
    }

    private clearCandies() {
        this.candies.forEach(c => this.group.remove(c.mesh));
        this.candies = [];
    }

    update(dt: number, playerPos: THREE.Vector3) {
        this.time += dt;

        // Update marker animation
        if (this.targetMarker.visible) {
            this.targetMarker.rotation.y += dt * 2;
            this.targetMarker.position.y = 6 + Math.sin(this.time * 3) * 0.5;
        }

        // Update candies
        for (let i = this.candies.length - 1; i >= 0; i--) {
            const candy = this.candies[i];
            candy.update(dt, this.time);

            // Collision
            const dx = playerPos.x - candy.mesh.position.x;
            const dz = playerPos.z - candy.mesh.position.z;
            if (dx * dx + dz * dz < 1.0) { // 1m radius
                // Collect
                this.balance++;
                this.hud.updateCandyCount(this.balance);
                this.group.remove(candy.mesh);
                this.candies.splice(i, 1);
                // Optional: play sound
            }
        }
    }

    public checkObjectiveReached(buildingLabel: string) {
        const quest = this.quests[this.currentQuestIndex];
        if (!quest) return;

        if (quest.targetMissions.includes(buildingLabel)) {
            // Quest Complete!
            this.currentQuestIndex++;
            if (this.currentQuestIndex < this.quests.length) {
                this.startQuest(this.currentQuestIndex);
            } else {
                this.hud.setQuestMessage("Все задания выполнены!");
                this.targetMarker.visible = false;
                this.clearCandies();
            }
        }
    }
}
