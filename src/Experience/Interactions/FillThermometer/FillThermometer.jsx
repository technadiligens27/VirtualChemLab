import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const FillThermometer = ({
  amount,
  startingAmount = 2.5,
  highestAmount = 4.5,
  finalAmount = 4,
  fillSpeed = 3,
}) => {
  const { mainThermometerRef } =
    useContext(ModelContext)

  const {
    selectedLesson,
    lessonStep,
  } = useContext(MainGuidelineContext)

  const liquidRef = useRef(null)
  const originalScaleRef = useRef(null)
  const targetScaleYRef = useRef(0)

  const reactionTimerRef = useRef(0)
  const reactionStartedRef = useRef(false)

  useEffect(() => {
    const thermometer =
      mainThermometerRef?.current

    if (!thermometer) {
      console.log(
        "Main thermometer was not found"
      )

      return
    }

    let liquidFound = false

    thermometer.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      if (
        child.isMesh &&
        name.includes("liquid")
      ) {
        liquidFound = true

        console.log(
          "Thermometer liquid found:",
          child.name
        )

        liquidRef.current = child

        originalScaleRef.current =
          child.scale.clone()

        child.scale.y = 0
        child.visible = false

        child.updateMatrixWorld(true)
      }
    })

    if (!liquidFound) {
      console.log(
        "Thermometer liquid mesh was not found"
      )
    }
  }, [mainThermometerRef])

  useEffect(() => {
    const isReactionTemperatureStep =
      selectedLesson === 8 &&
      lessonStep === 11

    if (isReactionTemperatureStep) {
      reactionTimerRef.current = 0
      reactionStartedRef.current = true

      targetScaleYRef.current =
        startingAmount

      return
    }

    reactionTimerRef.current = 0
    reactionStartedRef.current = false

    targetScaleYRef.current =
      Math.max(amount || 0, 0)
  }, [
    amount,
    selectedLesson,
    lessonStep,
    startingAmount,
  ])

  useFrame((_, delta) => {
    const liquid = liquidRef.current
    const originalScale =
      originalScaleRef.current

    if (!liquid || !originalScale) return

    const isReactionTemperatureStep =
      selectedLesson === 8 &&
      lessonStep === 11 &&
      reactionStartedRef.current

    if (isReactionTemperatureStep) {
      reactionTimerRef.current += delta

      const elapsed =
        reactionTimerRef.current

      // Start at the initial temperature
      if (elapsed < 1) {
        targetScaleYRef.current =
          startingAmount
      }

      // Rise gradually to the highest temperature
      if (elapsed >= 1 && elapsed < 6) {
        const progress =
          (elapsed - 1) / 5

        targetScaleYRef.current =
          THREE.MathUtils.lerp(
            startingAmount,
            highestAmount,
            progress
          )
      }

      // Stay briefly at the highest temperature
      if (elapsed >= 6 && elapsed < 7) {
        targetScaleYRef.current =
          highestAmount
      }

      // Slowly fall to the final temperature
      if (elapsed >= 7 && elapsed < 13) {
        const progress =
          (elapsed - 7) / 6

        targetScaleYRef.current =
          THREE.MathUtils.lerp(
            highestAmount,
            finalAmount,
            progress
          )
      }

      // Remain at the final temperature
      if (elapsed >= 13) {
        targetScaleYRef.current =
          finalAmount
      }
    }

    const targetScaleY =
      targetScaleYRef.current

    liquid.scale.y =
      THREE.MathUtils.damp(
        liquid.scale.y,
        targetScaleY,
        fillSpeed,
        delta
      )

    if (
      Math.abs(
        liquid.scale.y -
          targetScaleY
      ) < 0.01
    ) {
      liquid.scale.y =
        targetScaleY
    }

    liquid.scale.x =
      originalScale.x

    liquid.scale.z =
      originalScale.z

    liquid.visible =
      liquid.scale.y > 0.001

    liquid.updateMatrixWorld(true)
  })

  return null
}

export default FillThermometer