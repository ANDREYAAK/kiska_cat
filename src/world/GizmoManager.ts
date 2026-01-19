import * as THREE from "three";
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

export class GizmoManager {
    private transformControls: TransformControls | null = null;
    private isDragging = false;
    private onDragChangeCallback: ((isDragging: boolean) => void) | null = null;
    private onChangeCallback: (() => void) | null = null;
    private onModeChangeCallback: ((mode: 'translate' | 'rotate') => void) | null = null;

    constructor(
        private camera: THREE.Camera,
        private domElement: HTMLElement,
        private sceneGroup: THREE.Group
    ) {
        this.init();
    }

    private init() {
        this.transformControls = new TransformControls(this.camera, this.domElement);

        this.transformControls.addEventListener('dragging-changed', (event: any) => {
            this.isDragging = !!event.value;
            if (this.onDragChangeCallback) {
                this.onDragChangeCallback(this.isDragging);
            }
        });

        this.transformControls.addEventListener('change', () => {
            // CRITICAL FIX: Only propagate changes if actually dragging.
            // This prevents "jump on select" bugs where attach() triggers a change event
            // with unstable initial state or default values.
            if (this.isDragging && this.onChangeCallback) {
                this.onChangeCallback();
            }
        });

        // Aesthetics
        this.transformControls.size = 0.6;
        this.transformControls.setSpace('world');
        this.transformControls.setMode('translate');

        // Use standard snapping logic by default, controlled via API if needed
        this.transformControls.setTranslationSnap(0.1);
        // Отключаем привязку вращения к углам для свободного вращения
        // Привязка к 90° будет работать только при зажатии Shift (обрабатывается в TransformControls автоматически)
        this.transformControls.setRotationSnap(null);

        // By default hide Y axis for translate to discourage flying objects (can be toggled)
        this.transformControls.showY = false;

        this.sceneGroup.add(this.transformControls);
    }

    public attach(object: THREE.Object3D) {
        if (!this.transformControls) return;
        this.transformControls.attach(object);
        this.transformControls.visible = true;
    }

    public detach() {
        if (!this.transformControls) return;
        this.transformControls.detach();
        this.transformControls.visible = false;
    }

    public setMode(mode: 'translate' | 'rotate') {
        if (!this.transformControls) return;
        this.transformControls.setMode(mode);

        if (mode === 'translate') {
            this.transformControls.showX = true;
            this.transformControls.showZ = true;
            this.transformControls.showY = false; // Keep objects grounded
        } else {
            // Для вращения показываем только ось Y (вертикальное вращение)
            // Это стандартное поведение для объектов на земле
            this.transformControls.showX = false;
            this.transformControls.showY = true; // Только вертикальная ось
            this.transformControls.showZ = false;
        }

        if (this.onModeChangeCallback) {
            this.onModeChangeCallback(mode);
        }
    }

    public getObject(): THREE.Object3D | undefined {
        return this.transformControls?.object;
    }

    public isVisible(): boolean {
        return this.transformControls?.visible ?? false;
    }

    public setOnDragChange(cb: (isDragging: boolean) => void) {
        this.onDragChangeCallback = cb;
    }

    public setOnChange(cb: () => void) {
        this.onChangeCallback = cb;
    }

    public setOnModeChange(cb: (mode: 'translate' | 'rotate') => void) {
        this.onModeChangeCallback = cb;
    }

    public getControlObject(): THREE.Object3D | null {
        return this.transformControls;
    }
}
