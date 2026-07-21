import { useFrame } from "@react-three/fiber"
import {
  useContext,
  useEffect,
  useRef,
} from "react"
import * as THREE from "three"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const LitmusReaction = ({ litmusRef, type }) => {
  const { lessonStep, setLessonStep } =
    useContext(MainGuidelineContext)

  const progressRef = useRef(0)
  const reactionFinishedRef = useRef(false)

  const materialRef = useRef(null)
  const originalMaterialRef = useRef(null)
  const originalColorRef = useRef(null)

  useEffect(() => {
    const litmusObject = litmusRef?.current

    if (!litmusObject?.material) return

    // Save the real original material
    originalMaterialRef.current =
      litmusObject.material

    originalColorRef.current =
      litmusObject.material.color.clone()

    // Create an independent material for the reaction
    const clonedMaterial =
      litmusObject.material.clone()

    clonedMaterial.color.copy(
      originalColorRef.current
    )

    litmusObject.material = clonedMaterial
    materialRef.current = clonedMaterial

    progressRef.current = 0
    reactionFinishedRef.current = false

    return () => {
      const currentLitmus = litmusRef?.current

      // Put the original material back
      if (
        currentLitmus &&
        originalMaterialRef.current
      ) {
        currentLitmus.material =
          originalMaterialRef.current

        currentLitmus.material.needsUpdate = true
      }

      // Dispose only the reaction clone
      clonedMaterial.dispose()

      materialRef.current = null
    }
  }, [litmusRef])

  useEffect(() => {
    progressRef.current = 0
    reactionFinishedRef.current = false

    // Start each reaction from the original color
    if (
      materialRef.current &&
      originalColorRef.current
    ) {
      materialRef.current.color.copy(
        originalColorRef.current
      )

      materialRef.current.needsUpdate = true
    }
  }, [type])

  useFrame((state, delta) => {
    if (
      !litmusRef?.current ||
      !type ||
      !materialRef.current ||
      !originalColorRef.current
    ) {
      return
    }

    const targetColor = new THREE.Color(
      type === "acid"
        ? "#000000"
        : "#0000ff"
    )

    progressRef.current = Math.min(
      progressRef.current + delta / 2,
      1
    )

    materialRef.current.color.lerpColors(
      originalColorRef.current,
      targetColor,
      progressRef.current
    )

    materialRef.current.needsUpdate = true

    if (
      progressRef.current >= 1 &&
      !reactionFinishedRef.current
    ) {
      reactionFinishedRef.current = true

      if (lessonStep === 8) {
        setLessonStep(9)
      }
    }
  })

  return null
}

export default LitmusReaction