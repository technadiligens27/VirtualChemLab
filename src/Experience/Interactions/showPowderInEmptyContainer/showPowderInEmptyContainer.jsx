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
    const metalSalt =
      metalSaltRef?.current

    if (!metalSalt) {
      return
    }

    const materials = []

    metalSalt.visible = true

    metalSalt.traverse((child) => {
      if (!child.isMesh) {
        return
      }

      child.visible = true

      const childMaterials = Array.isArray(
        child.material
      )
        ? child.material
        : [child.material]

      const clonedMaterials =
        childMaterials.map((material) => {
          if (!material) {
            return material
          }

          const clonedMaterial =
            material.clone()

          clonedMaterial.transparent = true
          clonedMaterial.opacity = 0

          if (clonedMaterial.color) {
            clonedMaterial.color.set(
              powderColor
            )
          }

          clonedMaterial.needsUpdate = true

          materials.push(clonedMaterial)

          return clonedMaterial
        })

      // Assign cloned material(s) back to mesh.
      child.material = Array.isArray(
        child.material
      )
        ? clonedMaterials
        : clonedMaterials[0]
    })

    const startTime = performance.now()

    let animationFrameId

    const animatePowderAppearance = (
      currentTime
    ) => {
      const elapsedSeconds =
        (currentTime - startTime) / 1000

      const progress = Math.min(
        elapsedSeconds / duration,
        1
      )

      const smoothProgress =
        progress * progress * (3 - 2 * progress)

      materials.forEach((material) => {
        material.opacity = smoothProgress
        material.needsUpdate = true
      })

      if (progress < 1) {
        animationFrameId =
          requestAnimationFrame(
            animatePowderAppearance
          )
      }
    }

    if (duration <= 0) {
      materials.forEach((material) => {
        material.opacity = 1
        material.needsUpdate = true
      })

      return
    }

    animationFrameId =
      requestAnimationFrame(
        animatePowderAppearance
      )

    return () => {
      // Intentionally keep the powder's current
      // visibility, colour, and opacity on unmount.
      cancelAnimationFrame(animationFrameId)
    }
  }, [
    metalSaltRef,
    duration,
    powderColor,
  ])

  return null
}

export default ShowPowderInEmptyContainer