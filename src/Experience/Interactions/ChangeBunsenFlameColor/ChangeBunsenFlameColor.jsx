import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import * as THREE from "three"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const ChangeBunsenFlameColor = ({
  innerColor = "#FF4569",
  outerColor = "#DC143C",
  duration = 1.5,
}) => {
  const {
    bunsenBurnerRef,
  } = useContext(ModelContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const transitionRef =
    useRef(null)

  const originalColorsRef =
    useRef([])

  const hasFinishedRef =
    useRef(false)

  const lessonStepTimeoutRef =
    useRef(null)

  // Keep the current lesson values available
  // inside useFrame and setTimeout.
  const latestLessonRef =
    useRef(selectedLesson)

  const latestLessonStepRef =
    useRef(lessonStep)

  latestLessonRef.current =
    selectedLesson

  latestLessonStepRef.current =
    lessonStep

  // =====================================================
  // INITIALIZE COLOUR TRANSITION
  // =====================================================

  useEffect(() => {
    const burner =
      bunsenBurnerRef?.current

    if (!burner) {
      return
    }

    const transitions = []
    const originalColors = []

    hasFinishedRef.current = false

    if (lessonStepTimeoutRef.current) {
      clearTimeout(
        lessonStepTimeoutRef.current
      )

      lessonStepTimeoutRef.current = null
    }

    burner.traverse((child) => {
      if (!child.isMesh) {
        return
      }

      const name =
        child.name?.toLowerCase() || ""

      const isInner =
        name.includes("inner")

      const isOuter =
        name.includes("outer")

      if (!isInner && !isOuter) {
        return
      }

      const targetColor =
        new THREE.Color(
          isInner
            ? innerColor
            : outerColor
        )

      const materials = Array.isArray(
        child.material
      )
        ? child.material
        : [child.material]

      materials.forEach((material) => {
        if (!material) {
          return
        }

        const originalColor =
          material.color
            ? material.color.clone()
            : null

        const originalEmissive =
          material.emissive
            ? material.emissive.clone()
            : null

        originalColors.push({
          material,
          originalColor,
          originalEmissive,
        })

        transitions.push({
          material,
          startColor:
            originalColor?.clone() || null,
          startEmissive:
            originalEmissive?.clone() || null,
          targetColor,
        })
      })
    })

    originalColorsRef.current =
      originalColors

    transitionRef.current = {
      transitions,
      elapsed: 0,
    }

    return () => {
      transitionRef.current = null

      if (lessonStepTimeoutRef.current) {
        clearTimeout(
          lessonStepTimeoutRef.current
        )

        lessonStepTimeoutRef.current = null
      }

      originalColors.forEach(
        ({
          material,
          originalColor,
          originalEmissive,
        }) => {
          if (
            material.color &&
            originalColor
          ) {
            material.color.copy(
              originalColor
            )
          }

          if (
            material.emissive &&
            originalEmissive
          ) {
            material.emissive.copy(
              originalEmissive
            )
          }

          material.needsUpdate = true
        }
      )

      originalColorsRef.current = []
    }
  }, [
    bunsenBurnerRef,
    innerColor,
    outerColor,
  ])

  // =====================================================
  // ANIMATE COLOUR TRANSITION
  // =====================================================

  useFrame((_, delta) => {
    const transition =
      transitionRef.current

    if (!transition) {
      return
    }

    transition.elapsed += delta

    const progress =
      duration <= 0
        ? 1
        : THREE.MathUtils.clamp(
            transition.elapsed / duration,
            0,
            1
          )

    const eased =
      progress *
      progress *
      (3 - 2 * progress)

    transition.transitions.forEach(
      ({
        material,
        startColor,
        startEmissive,
        targetColor,
      }) => {
        if (
          material.color &&
          startColor
        ) {
          material.color
            .copy(startColor)
            .lerp(
              targetColor,
              eased
            )
        }

        if (
          material.emissive &&
          startEmissive
        ) {
          material.emissive
            .copy(startEmissive)
            .lerp(
              targetColor,
              eased
            )
        }

        material.needsUpdate = true
      }
    )

    // ===================================================
    // TRANSITION FINISHED
    // ===================================================

    if (
      progress >= 1 &&
      !hasFinishedRef.current
    ) {
      hasFinishedRef.current = true

      transitionRef.current = null

      console.log(
        "Bunsen flame colour transition finished"
      )

      // Wait 3 seconds before moving to next lesson step.
      lessonStepTimeoutRef.current =
        setTimeout(() => {
          if (
            latestLessonRef.current ===
              15.2 &&
            latestLessonStepRef.current ===
              33
          ) {
            setLessonStep(34)
          }
        }, 3000)
    }
  })

  return null
}

export default ChangeBunsenFlameColor