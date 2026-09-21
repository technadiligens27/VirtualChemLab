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

const HeatingMantleSurfaceColourChange = ({
  color = "#ff0000",

  emissionColor = "#ff0000",
  emissionIntensity = 0.6,

  time = 1,
  startDelay = 0,
}) => {
  const {
    heatingMantleRef,
  } = useContext(ModelContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const animationRef = useRef({
    elapsedTime: 0,
    materials: [],
  })

  useEffect(() => {
    if (
      selectedLesson === 14.3 &&
      lessonStep === 108
    ) {
      setLessonStep(109)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  useEffect(() => {
    const heatingMantle =
      heatingMantleRef?.current

    if (!heatingMantle) return

    const targetColor =
      new THREE.Color(color)

    const targetEmissionColor =
      new THREE.Color(emissionColor)

    const materials = []

    // Find only direct heating-mantle children
    // named with "surface" or "cylinder".
    heatingMantle.children.forEach((model) => {
      const modelName =
        model.name?.toLowerCase() || ""

      const shouldChangeColour =
        modelName.includes("surface") ||
        modelName.includes("cylinder")

      if (!shouldChangeColour) return

      // A named model may contain one or more meshes.
      model.traverse((child) => {
        if (!child.isMesh) return

        const originalMaterials =
          Array.isArray(child.material)
            ? child.material
            : [child.material]

        const clonedMaterials =
          originalMaterials.map(
            (originalMaterial) => {
              const material =
                originalMaterial.clone()

              if (material.color) {
                materials.push({
                  material,

                  startColor:
                    material.color.clone(),

                  targetColor:
                    targetColor.clone(),

                  startEmissionColor:
                    material.emissive
                      ? material.emissive.clone()
                      : null,

                  targetEmissionColor:
                    material.emissive
                      ? targetEmissionColor.clone()
                      : null,

                  startEmissionIntensity:
                    material.emissiveIntensity ?? 0,

                  targetEmissionIntensity:
                    emissionIntensity,
                })
              }

              return material
            }
          )

        child.material =
          Array.isArray(child.material)
            ? clonedMaterials
            : clonedMaterials[0]
      })
    })

    animationRef.current = {
      elapsedTime: 0,
      materials,
    }
  }, [
    heatingMantleRef,
    color,
    emissionColor,
    emissionIntensity,
  ])

  useFrame((_, delta) => {
    const animation =
      animationRef.current

    if (!animation.materials.length) return

    animation.elapsedTime += delta

    if (
      animation.elapsedTime < startDelay
    ) {
      return
    }

    const progress =
      Math.min(
        (animation.elapsedTime - startDelay) /
          Math.max(time, 0.001),
        1
      )

    animation.materials.forEach(
      ({
        material,
        startColor,
        targetColor,
        startEmissionColor,
        targetEmissionColor,
        startEmissionIntensity,
        targetEmissionIntensity,
      }) => {
        material.color.lerpColors(
          startColor,
          targetColor,
          progress
        )

        if (
          material.emissive &&
          startEmissionColor &&
          targetEmissionColor
        ) {
          material.emissive.lerpColors(
            startEmissionColor,
            targetEmissionColor,
            progress
          )

          material.emissiveIntensity =
            THREE.MathUtils.lerp(
              startEmissionIntensity,
              targetEmissionIntensity,
              progress
            )
        }

        material.needsUpdate = true
      }
    )
  })

  return null
}

export default HeatingMantleSurfaceColourChange