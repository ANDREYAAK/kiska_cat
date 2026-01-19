import * as THREE from "three";

/**
 * Normalizes an object's pivot point.
 * Creates a wrapper Group, centers the object horizontally within it,
 * and aligns the object's bottom (AABB min.y) to the wrapper's origin (y=0).
 * 
 * @param object The source object to normalize
 * @returns A new Group containing the object, with corrected pivot.
 */
export function normalizeObjectPivot(object: THREE.Object3D): THREE.Group {
    const wrapper = new THREE.Group();

    // Clone locally to ensure we don't mess up the original if it's reused elsewhere
    // (though usually we pass a clone in).
    const clone = object.clone(true);
    wrapper.add(clone);

    // Reset position to identity to measure geometry offset relative to local origin.
    // We KEEP rotation and scale so that we can normalize a pre-rotated/scaled object.
    clone.position.set(0, 0, 0);
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);

    // Calculate offset to bring bottom-center to (0,0,0)
    // We want:
    // newX = -center.x
    // newY = -min.y  (so that min.y becomes 0)
    // newZ = -center.z

    const center = new THREE.Vector3();
    box.getCenter(center);

    const matchBottom = -box.min.y;
    const centerX = -center.x;
    const centerZ = -center.z;

    // Apply offset to the mesh within the wrapper
    // Note: We used setFromObject(clone) which is in World Space (effective local space of wrapper)
    // So these offsets are correct for the clone's position.
    clone.position.set(centerX, matchBottom, centerZ);

    return wrapper;
}
