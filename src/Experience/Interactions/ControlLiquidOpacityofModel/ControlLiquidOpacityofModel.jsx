import {
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import * as THREE from "three"

const ControlLiquidOpacityofModel = ({
  modelRef,

  // Final liquid colour.
  endColor = "#FFF8D6",

  // Final opacity between 0 and 1.
  endOpacity = 0.3,

  // Time taken to reach the final colour
  // and opacity, in seconds.
  transitionDuration = 2,

  // Delay before the transition starts,
  // in seconds.
  startDelay = 0,
}) => {
  const liquidMeshesRef = useRef([])
  const elapsedTimeRef = useRef(0)
  const initializedRef = useRef(false)

  useEffect(() => {
    const model = modelRef?.current

    if (!model) {
      console.warn(
        "[ControlLiquidOpacityofModel] Model was not found."
      )

      return
    }

    const liquidMeshes = []

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
          "liquid"
        )
      ) {
        return
      }

      const originalMaterial =
        child.material

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

            clonedMaterial.transparent =
              true

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

      child.visible = true
      child.frustumCulled = false

      liquidMeshes.push({
        object: child,

        materials:
          clonedMaterials.map(
            (material) => ({
              material,

              startColor:
                material?.color
                  ? material.color.clone()
                  : null,

              startOpacity:
                material?.opacity ?? 1,
            })
          ),
      })
    })

    liquidMeshesRef.current =
      liquidMeshes

    elapsedTimeRef.current = 0
    initializedRef.current = true

    if (liquidMeshes.length === 0) {
      console.warn(
        '[ControlLiquidOpacityofModel] No mesh containing "liquid" was found.'
      )
    }

    return () => {
      /*
       * The final colour and opacity remain
       * when the component unmounts.
       */
      liquidMeshesRef.current = []
      elapsedTimeRef.current = 0
      initializedRef.current = false
    }
  }, [
    modelRef,
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
        transitionDuration,
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

    // Smooth transition.
    const smoothProgress =
      THREE.MathUtils.smoothstep(
        progress,
        0,
        1
      )

    const targetColor =
      new THREE.Color(endColor)

    const targetOpacity =
      THREE.MathUtils.clamp(
        endOpacity,
        0,
        1
      )

    liquidMeshesRef.current.forEach(
      ({
        object,
        materials,
      }) => {
        object.visible =
          targetOpacity > 0

        materials.forEach(
          ({
            material,
            startColor,
            startOpacity,
          }) => {
            if (!material) {
              return
            }

            if (
              material.color &&
              startColor
            ) {
              material.color
                .copy(startColor)
                .lerp(
                  targetColor,
                  smoothProgress
                )
            }

            material.transparent = true

            material.opacity =
              THREE.MathUtils.lerp(
                startOpacity,
                targetOpacity,
                smoothProgress
              )

            material.depthWrite =
              material.opacity >= 1

            material.needsUpdate = true
          }
        )

        object.updateMatrixWorld(true)
      }
    )
  })

  return null
}

export default ControlLiquidOpacityofModel