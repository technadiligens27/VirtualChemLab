import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const StirReaction = ({ hand, spoonRef, beakerRef }) => {
  const liquidRef = useRef(null)
  const saltRef = useRef(null)
  const canReactRef = useRef(false)

  const targetColor = useRef(new THREE.Color("#dff6ff"))

  const {
    rightBeakerFillData,
    leftBeakerFillData,
  } = useContext(InteractionContext)

  const {
    setLessonStep,
    selectedLesson,
    lessonStep,
  } = useContext(MainGuidelineContext)

  const beakerFillData =
    hand === "left"
      ? rightBeakerFillData
      : leftBeakerFillData

  useEffect(() => {
    if (!beakerRef?.current || !spoonRef?.current) return

    liquidRef.current = null
    saltRef.current = null
    canReactRef.current = false

    beakerRef.current.traverse((child) => {
      if (
        child.name?.toLowerCase().includes("liquid") &&
        child.visible
      ) {
        liquidRef.current = child
      }
    })

    spoonRef.current.traverse((child) => {
      if (
        child.name?.toLowerCase().includes("salt") &&
        child.visible
      ) {
        saltRef.current = child
      }
    })

    const liquidName =
      beakerFillData?.name?.toLowerCase() || ""

    const isWater =
      liquidName.includes("water") ||
      liquidName.includes("h2o")

    if (liquidRef.current && saltRef.current && isWater) {
      canReactRef.current = true
      saltRef.current.visible = false

      console.log("Salt-water reaction started")
    }
  }, [beakerRef, spoonRef, beakerFillData])

  useEffect(() => {
    if (
      canReactRef.current &&
      selectedLesson === 1 &&
      lessonStep === 9
    ) {
      setLessonStep(10)
    }
  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])

  useFrame((state, delta) => {
    if (!canReactRef.current) return
    if (!liquidRef.current?.material?.color) return

    liquidRef.current.material.color.lerp(
      targetColor.current,
      delta * 0.2
    )
  })

  return null
}

export default StirReaction