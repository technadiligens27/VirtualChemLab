import { useFrame } from "@react-three/fiber"
import { useContext, useEffect, useRef } from "react"
import * as THREE from "three"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const LitmusReaction = ({ litmusRef, type }) => {
  const { lessonStep, setLessonStep } = useContext(MainGuidelineContext)

  const progressRef = useRef(0)
  const reactionFinishedRef = useRef(false)
  const materialRef = useRef(null)

  useEffect(() => {
    if (!litmusRef?.current) return

    // Give this litmus paper its own independent material
    const clonedMaterial = litmusRef.current.material.clone()

    litmusRef.current.material = clonedMaterial
    materialRef.current = clonedMaterial

    progressRef.current = 0
    reactionFinishedRef.current = false

    return () => {
      clonedMaterial.dispose()
    }
  }, [litmusRef])

  useEffect(() => {
    progressRef.current = 0
    reactionFinishedRef.current = false
  }, [type])

  useFrame((state, delta) => {
    if (!litmusRef?.current || !type || !materialRef.current) return

    const targetColor = new THREE.Color(
      type === "acid" ? "#000000" : "#0000ff"
    )

    progressRef.current = Math.min(
      progressRef.current + delta / 2,
      1
    )

    materialRef.current.color.lerp(
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