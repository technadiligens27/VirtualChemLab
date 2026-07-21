import { useEffect } from "react"
import * as THREE from "three"

const ClickHitbox = ({
  modelRef,
  multiplier = 2,
  minSize = 0.35,
}) => {
  useEffect(() => {
    const model = modelRef?.current

    if (!model) return

    // Prevent adding the hitbox more than once
    const existingHitbox = model.getObjectByName(
      "__click-hitbox"
    )

    if (existingHitbox) return

    model.updateMatrixWorld(true)

    const modelBounds = new THREE.Box3()
    const inverseModelMatrix = model.matrixWorld
      .clone()
      .invert()

    model.traverse((child) => {
      if (
        !child.isMesh ||
        !child.geometry ||
        child.name === "__click-hitbox"
      ) {
        return
      }

      child.geometry.computeBoundingBox()

      if (!child.geometry.boundingBox) return

      const childBounds =
        child.geometry.boundingBox.clone()

      const childToModelMatrix =
        new THREE.Matrix4().multiplyMatrices(
          inverseModelMatrix,
          child.matrixWorld
        )

      childBounds.applyMatrix4(childToModelMatrix)
      modelBounds.union(childBounds)
    })

    if (modelBounds.isEmpty()) return

    const size = new THREE.Vector3()
    const center = new THREE.Vector3()

    modelBounds.getSize(size)
    modelBounds.getCenter(center)

    // Make the clickable area larger
    size.multiplyScalar(multiplier)

    // Prevent very thin hitboxes
    size.x = Math.max(size.x, minSize)
    size.y = Math.max(size.y, minSize)
    size.z = Math.max(size.z, minSize)

    const geometry = new THREE.BoxGeometry(
      size.x,
      size.y,
      size.z
    )

    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      colorWrite: false,
    })

    const hitbox = new THREE.Mesh(
      geometry,
      material
    )

    hitbox.name = "__click-hitbox"
    hitbox.userData.isClickHitbox = true
    hitbox.position.copy(center)

    model.add(hitbox)

    return () => {
      model.remove(hitbox)
      geometry.dispose()
      material.dispose()
    }
  }, [modelRef, multiplier, minSize])

  // The component does not display anything itself
  return null
}

export default ClickHitbox