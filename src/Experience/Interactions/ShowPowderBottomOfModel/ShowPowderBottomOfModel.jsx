import {
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import * as THREE from "three"

const ShowPowderBottomOfModel = ({
  modelRef,

  // Seconds before powder appears.
  startDelay = 0,

  // Fade duration in seconds.
  opacityDuration = 2,

  // Final opacity.
  endOpacity = 1,

  // Powder colour.
  powderColor = "#FFFFFF",

  // Number: 0.8
  // Or array: [1, 0.5, 1]
  powderScale = 1,
}) => {
  const powderMeshesRef = useRef([])
  const elapsedTimeRef = useRef(0)
  const initializedRef = useRef(false)

  useEffect(() => {
    const model = modelRef?.current

    if (!model) {
      console.warn(
        "[ShowPowderBottomOfModel] Model was not found."
      )

      return
    }

    const powderMeshes = []

    const targetScale =
      Array.isArray(powderScale)
        ? new THREE.Vector3(
            powderScale[0] ?? 1,
            powderScale[1] ?? 1,
            powderScale[2] ?? 1
          )
        : new THREE.Vector3(
            powderScale,
            powderScale,
            powderScale
          )

    model.traverse((child) => {
      if (!child.isMesh) {
        return
      }

      const normalizedName =
        (
          child.name?.toLowerCase() ||
          ""
        ).replace(/[-_\s]/g, "")

      if (
        !normalizedName.includes(
          "powder"
        )
      ) {
        return
      }

      const originalMaterial =
        child.material

      const originalVisible =
        child.visible

      const originalScale =
        child.scale.clone()

      const originalMaterials =
        Array.isArray(originalMaterial)
          ? originalMaterial
          : [originalMaterial]

      const clonedMaterials =
        originalMaterials.map(
          (material) => {
            if (!material) {
              return null
            }

            const clonedMaterial =
              material.clone()

            clonedMaterial.color?.set(
              powderColor
            )

            clonedMaterial.transparent =
              true

            clonedMaterial.opacity = 0
            clonedMaterial.depthWrite =
              false

            clonedMaterial.needsUpdate =
              true

            return clonedMaterial
          }
        )

      child.material =
        Array.isArray(originalMaterial)
          ? clonedMaterials
          : clonedMaterials[0]

      child.visible = false

      child.scale.copy(
        targetScale
      )

      child.frustumCulled = false
      child.updateMatrixWorld(true)

      powderMeshes.push({
        object: child,
        materials: clonedMaterials,
        originalMaterial,
        originalVisible,
        originalScale,
      })
    })

    powderMeshesRef.current =
      powderMeshes

    elapsedTimeRef.current = 0
    initializedRef.current = true

    if (powderMeshes.length === 0) {
      console.warn(
        '[ShowPowderBottomOfModel] No mesh containing "powder" was found.'
      )
    }

    return () => {
      powderMeshes.forEach(
        ({
          object,
          materials,
          originalMaterial,
          originalVisible,
          originalScale,
        }) => {
          materials.forEach(
            (material) => {
              material?.dispose()
            }
          )

          object.material =
            originalMaterial

          object.visible =
            originalVisible

          object.scale.copy(
            originalScale
          )

          object.updateMatrixWorld(true)
        }
      )

      powderMeshesRef.current = []
      elapsedTimeRef.current = 0
      initializedRef.current = false
    }
  }, [
    modelRef,
    powderColor,
    powderScale,
  ])

  useFrame((_, delta) => {
    if (!initializedRef.current) {
      return
    }

    elapsedTimeRef.current += delta

    if (
      elapsedTimeRef.current <
      startDelay
    ) {
      return
    }

    const safeDuration =
      Math.max(
        opacityDuration,
        0.001
      )

    const progress =
      THREE.MathUtils.clamp(
        (
          elapsedTimeRef.current -
          startDelay
        ) / safeDuration,
        0,
        1
      )

    const currentOpacity =
      THREE.MathUtils.lerp(
        0,
        THREE.MathUtils.clamp(
          endOpacity,
          0,
          1
        ),
        progress
      )

    powderMeshesRef.current.forEach(
      ({
        object,
        materials,
      }) => {
        object.visible = true

        materials.forEach(
          (material) => {
            if (!material) {
              return
            }

            material.transparent = true

            material.opacity =
              currentOpacity

            material.depthWrite =
              currentOpacity >= 1

            material.color?.set(
              powderColor
            )

            material.needsUpdate = true
          }
        )
      }
    )
  })

  return null
}

export default ShowPowderBottomOfModel