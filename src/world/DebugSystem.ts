import * as THREE from "three";

export class DebugSystem {
    readonly group = new THREE.Group();

    constructor(worldSize: number, cellSize: number) {
        this.createDebugGrid(worldSize, cellSize);
    }

    private createDebugGrid(size: number, cellSize: number) {
        // 1. Grid Helper
        // The built-in GridHelper is centered.
        // worldSize=260, cellSize=20 -> divisions = 13.
        const divisions = Math.floor(size / cellSize);
        const gridHelper = new THREE.GridHelper(size, divisions, 0xffff00, 0xffffff);
        // GridHelper is on XZ plane by default. y=0.
        // Lift slightly to be visible over roads (0) and markings (0.08) and caps (0.02)
        gridHelper.position.y = 0.5;
        this.group.add(gridHelper);


    }
}
