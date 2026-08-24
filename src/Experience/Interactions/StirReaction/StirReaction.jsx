import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const StirReaction = ({
  modelRef,

  targetColor = "#EAFBFF",

  liquidOpacity = 0.35,

  duration = 2,

  hasPrecipitate = false,

  isActive = true,
}) => {

  const {selectedLesson,lessonSteop,setLessonStep} = useContext(MainGuidelineContext)

  const liquidRef =
    useRef(null)

  const precipitateMeshesRef =
    useRef([])

  const precipitateStartOpacityRef =
    useRef(new Map())

  const startColorRef =
    useRef(
      new THREE.Color()
    )

  const targetColorRef =
    useRef(
      new THREE.Color(
        targetColor
      )
    )

  const elapsedRef =
    useRef(0)

  const finishedRef =
    useRef(false)

  const currentColorRef =
    useRef(
      new THREE.Color()
    )

  // =========================================================
  // INITIALIZE REACTION
  // =========================================================

  useEffect(() => {
    if (
      !modelRef?.current
    ) {
      return
    }

    liquidRef.current =
      null

    precipitateMeshesRef.current =
      []

    precipitateStartOpacityRef.current =
      new Map()

    elapsedRef.current =
      0

    finishedRef.current =
      false

    targetColorRef.current.set(
      targetColor
    )

    // =======================================================
    // FIND LIQUID + PRECIPITATE
    // =======================================================

    modelRef.current.traverse(
      (child) => {
        const name =
          child.name
            ?.toLowerCase() ||
          ""

        // ---------------------------------------------------
        // LIQUID
        // ---------------------------------------------------

        if (
          child.isMesh &&
          name.includes(
            "liquid"
          )
        ) {
          liquidRef.current =
            child
        }

        // ---------------------------------------------------
        // PRECIPITATE
        // ---------------------------------------------------

        if (
          hasPrecipitate &&
          child.isMesh &&
          name.includes(
            "precipitate"
          )
        ) {
          if (
            Array.isArray(
              child.material
            )
          ) {
            child.material =
              child.material.map(
                (material) => {
                  const cloned =
                    material.clone()

                  cloned.transparent =
                    true

                  cloned.needsUpdate =
                    true

                  return cloned
                }
              )
          } else if (
            child.material
          ) {
            child.material =
              child.material.clone()

            child.material.transparent =
              true

            child.material.needsUpdate =
              true
          }

          // -----------------------------------------------
          // STORE CURRENT STARTING OPACITY
          // -----------------------------------------------

          if (
            Array.isArray(
              child.material
            )
          ) {
            const opacities =
              child.material.map(
                (material) =>
                  material.opacity ?? 1
              )

            precipitateStartOpacityRef.current.set(
              child.uuid,
              opacities
            )
          } else if (
            child.material
          ) {
            precipitateStartOpacityRef.current.set(
              child.uuid,
              child.material.opacity ??
                1
            )
          }

          precipitateMeshesRef.current.push(
            child
          )
        }
      }
    )

    // =======================================================
    // CHECK LIQUID
    // =======================================================

    if (
      !liquidRef.current
    ) {
      console.log(
        "Liquid child not found"
      )

      return
    }

    // =======================================================
    // PREPARE LIQUID
    // =======================================================

    const liquid =
      liquidRef.current

    if (
      Array.isArray(
        liquid.material
      )
    ) {
      liquid.material =
        liquid.material.map(
          (material) => {
            const cloned =
              material.clone()

            cloned.transparent =
              true

            cloned.opacity =
              liquidOpacity

            cloned.depthWrite =
              false

            cloned.needsUpdate =
              true

            return cloned
          }
        )

      const firstMaterial =
        liquid.material[0]

      if (
        firstMaterial?.color
      ) {
        startColorRef.current.copy(
          firstMaterial.color
        )
      }
    } else if (
      liquid.material
    ) {
      liquid.material =
        liquid.material.clone()

      liquid.material.transparent =
        true

      liquid.material.opacity =
        liquidOpacity

      liquid.material.depthWrite =
        false

      liquid.material.needsUpdate =
        true

      if (
        liquid.material.color
      ) {
        startColorRef.current.copy(
          liquid.material.color
        )
      }
    }

    console.log(
      "Liquid found:",
      liquidRef.current.name
    )

    if (
      hasPrecipitate
    ) {
      console.log(
        "Precipitate children found:",
        precipitateMeshesRef.current
          .length
      )
    }
  }, [
    modelRef,
    targetColor,
    liquidOpacity,
    hasPrecipitate,
  ])

  // =========================================================
  // REACTION
  // =========================================================

  useFrame((_, delta) => {
    // -------------------------------------------------------
    // PAUSE WHEN USER IS NOT STIRRING
    // -------------------------------------------------------

    if (!isActive) return

    if (
      !liquidRef.current
    ) {
      return
    }

    // -------------------------------------------------------
    // ONCE FINISHED -> NEVER RUN AGAIN
    // -------------------------------------------------------

    if (
      finishedRef.current
    ) {
      return
    }

    // -------------------------------------------------------
    // UPDATE TIME
    // -------------------------------------------------------

    elapsedRef.current +=
      delta

    const safeDuration =
      Math.max(
        duration,
        0.001
      )

    const progress =
      THREE.MathUtils.clamp(
        elapsedRef.current /
          safeDuration,
        0,
        1
      )

    // =======================================================
    // LIQUID COLOR
    // =======================================================

    currentColorRef.current.lerpColors(
      startColorRef.current,
      targetColorRef.current,
      progress
    )

    const liquid =
      liquidRef.current

    if (
      Array.isArray(
        liquid.material
      )
    ) {
      liquid.material.forEach(
        (material) => {
          if (
            material.color
          ) {
            material.color.copy(
              currentColorRef.current
            )
          }

          material.opacity =
            liquidOpacity

          material.needsUpdate =
            true
        }
      )
    } else if (
      liquid.material
    ) {
      if (
        liquid.material.color
      ) {
        liquid.material.color.copy(
          currentColorRef.current
        )
      }

      liquid.material.opacity =
        liquidOpacity

      liquid.material.needsUpdate =
        true
    }

    // =======================================================
    // PRECIPITATE FADE
    // =======================================================

    if (
      hasPrecipitate
    ) {
      precipitateMeshesRef.current.forEach(
        (precipitate) => {
          if (
            !precipitate
              ?.material
          ) {
            return
          }

          const startOpacity =
            precipitateStartOpacityRef.current.get(
              precipitate.uuid
            )

          // -----------------------------------------------
          // ARRAY MATERIAL
          // -----------------------------------------------

          if (
            Array.isArray(
              precipitate.material
            )
          ) {
            precipitate.material.forEach(
              (
                material,
                index
              ) => {
                const originalOpacity =
                  Array.isArray(
                    startOpacity
                  )
                    ? startOpacity[
                        index
                      ] ?? 1
                    : 1

                material.opacity =
                  THREE.MathUtils.lerp(
                    originalOpacity,
                    0,
                    progress
                  )

                material.needsUpdate =
                  true
              }
            )
          }

          // -----------------------------------------------
          // SINGLE MATERIAL
          // -----------------------------------------------

          else {
            const originalOpacity =
              typeof startOpacity ===
              "number"
                ? startOpacity
                : 1

            precipitate.material.opacity =
              THREE.MathUtils.lerp(
                originalOpacity,
                0,
                progress
              )

            precipitate.material.needsUpdate =
              true
          }
        }
      )
    }

    // =======================================================
    // REACTION FINISHED
    // =======================================================

    if (
      progress >= 1
    ) {
      // -----------------------------------------------------
      // PRECIPITATE STAYS GONE
      // -----------------------------------------------------

      if (
        hasPrecipitate
      ) {
        precipitateMeshesRef.current.forEach(
          (precipitate) => {
            if (
              !precipitate
            ) {
              return
            }

            if (
              Array.isArray(
                precipitate.material
              )
            ) {
              precipitate.material.forEach(
                (material) => {
                  material.opacity =
                    0

                  material.needsUpdate =
                    true
                }
              )
            } else if (
              precipitate.material
            ) {
              precipitate.material.opacity =
                0

              precipitate.material.needsUpdate =
                true
            }

            precipitate.visible =
              false
          }
        )
      }

      // -----------------------------------------------------
      // FORCE FINAL LIQUID COLOR
      // -----------------------------------------------------

      if (
        Array.isArray(
          liquid.material
        )
      ) {
        liquid.material.forEach(
          (material) => {
            material.color?.copy(
              targetColorRef.current
            )

            material.opacity =
              liquidOpacity

            material.needsUpdate =
              true
          }
        )
      } else if (
        liquid.material
      ) {
        liquid.material.color?.copy(
          targetColorRef.current
        )

        liquid.material.opacity =
          liquidOpacity

        liquid.material.needsUpdate =
          true
      }

      finishedRef.current =
        true

      console.log(
        "✅ Stir reaction finished"
      )

      if(selectedLesson===12.1 && lessonSteop===24){
        setLessonStep(25)
      }
    }
  })

  return null
}

export default StirReaction