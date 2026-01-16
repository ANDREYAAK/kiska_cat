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
                new THREE.Vector3(-40, 0, 107), // !!! START: Bank Door
                new THREE.Vector3(-40, 0, 70),  // Go straight North to Road (Trading St, Z=70)
                new THREE.Vector3(-52, 0, 70),  // Go West along Road to intersection with Shop Logic
                new THREE.Vector3(-52, 0, 21)   // Go South straight to SHOP Door
                // Note: Shop is at Z=26, size Z=8. Z range [22, 30]. Door usually at front (-Z or +Z?).
                // Config says rot -PI/2.
                // Building size x=10, z=8.
                // If rot -PI/2, Local X is World Z. Local Z is World -X.
                // Door is typically at local Z+. So World -X side.
                // Wait, let's just trace to the "front" visually.
                // Z=21 is "in front" if Z grows South.
            ]
        },
        {
            id: 1,
            label: "Идите в МЕДСИ",
            targetMissions: ["МЕДСИ"],
            pathPoints: [
                new THREE.Vector3(-52, 0, 21),  // Start at Shop
                new THREE.Vector3(-52, 0, 70),  // Back to Road
                new THREE.Vector3(-96, 0, 70),  // Along Road West
                new THREE.Vector3(-96, 0, 21)   // To MEDSI Door 
                // Medsi pos: x=-96, z=26. Size z=12. Half=6. Front at 20? 
            ]
        }
    ];

    constructor(sceneGroup: THREE.Group, hud: Hud) {
        this.group = sceneGroup;
        this.hud = hud;

        // Marker - big arrow
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
            const count = Math.ceil(dist / 2.5); // Closer candies (2.5m)

            for (let j = 0; j < count; j++) {
                const t = j / count;
                const pos = new THREE.Vector3().lerpVectors(a, b, t);

                // Avoid duplicate on corners
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
            if (dx * dx + dz * dz < 1.44) { // 1.2m radius (generous)
                // Collect
                this.balance++;
                this.hud.updateCandyCount(this.balance);
                this.group.remove(candy.mesh);
                this.candies.splice(i, 1);
            }
        }
    }

    public checkObjectiveReached(buildingLabel: string) {
        const quest = this.quests[this.currentQuestIndex];
        if (!quest) return;

        if (quest.targetMissions.includes(buildingLabel)) {
            // Quest Complete Logic
            this.currentQuestIndex++;

            // Show success message immediately
            this.hud.showMessage(`Задание "${quest.label}" выполнено!`);

            if (this.currentQuestIndex < this.quests.length) {
                // Start next quest with a slight delay or immediately? Immediately is better for flow.
                this.startQuest(this.currentQuestIndex);
            } else {
                this.hud.setQuestMessage("Все задания выполнены!");
                this.targetMarker.visible = false;
                this.clearCandies();
                this.hud.showMessage("Поздравляем! Вы прошли все квесты!");
            }
        }
    }
}
