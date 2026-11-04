
import {
  useContext,
  useEffect,
} from "react"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

const ShowPowderInEmptyContainer = ({
  duration = 0.5,
  powderColor = "#ffffff",
}) => {
  const {
    metalSaltRef,
  } = useContext(ModelContext)

  useEffect(() => {
    const metalSalt = metalSaltRef?.current

    if (!metalSalt) return

    const materials = []
    const originalMeshes = []

    // ============================================
    // SHOW POWDER
    // ============================================

    metalSalt.visible = true

    metalSalt.traverse((child) => {
      if (!child.isMesh) return

      originalMeshes.push({
        mesh: child,
        material: child.material,
      })

      child.visible = true

      const childMaterials = Array.isArray(child.material)
        ? child.material
        : [child.material]

      const clonedMaterials = childMaterials.map((material) => {
        if (!material) return material

        const clonedMaterial = material.clone()

        clonedMaterial.transparent = true
        clonedMaterial.opacity = 0

        if (clonedMaterial.color) {
          clonedMaterial.color.set(powderColor)
        }

        clonedMaterial.needsUpdate = true

        materials.push(clonedMaterial)

        return clonedMaterial
      })

      child.material = Array.isArray(child.material)
        ? clonedMaterials
        : clonedMaterials[0]
    })

    // ============================================
    // FADE-IN ANIMATION
    // ============================================

    const startTime = performance.now()
    let animationFrameId

    const animatePowderAppearance = (currentTime) => {
      const elapsedSeconds =
        (currentTime - startTime) / 1000

      const progress =
        duration <= 0
          ? 1
          : Math.min(elapsedSeconds / duration, 1)

      const smoothProgress =
        progress * progress * (3 - 2 * progress)

      materials.forEach((material) => {
        material.opacity = smoothProgress
      })

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(
          animatePowderAppearance
        )
      }
    }

    if (duration <= 0) {
      materials.forEach((material) => {
        material.opacity = 1
      })
    } else {
      animationFrameId = requestAnimationFrame(
        animatePowderAppearance
      )
    }

    // ============================================
    // CLEANUP - HIDE POWDER ON UNMOUNT
    // ============================================

    return () => {
      cancelAnimationFrame(animationFrameId)

      // Hide entire powder model
      metalSalt.visible = false

      // Restore original materials
      originalMeshes.forEach(({ mesh, material }) => {
        mesh.visible = false
        mesh.material = material
      })

      // Dispose cloned materials
      materials.forEach((material) => {
        material.dispose()
      })
    }
  }, [
    metalSaltRef,
    duration,
    powderColor,
  ])

  return null
}

export default ShowPowderInEmptyContainer
