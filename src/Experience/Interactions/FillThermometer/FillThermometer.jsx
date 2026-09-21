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

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

const FillThermometer = ({
  amount,
  startingAmount = 2.5,
  highestAmount = 4.5,
  finalAmount = 4,
  fillSpeed = 3,
  startDelay = 0,
}) => {
  const {
    mainThermometerRef,
  } = useContext(ModelContext)

  const {
    selectedLesson,
    lessonStep,
  } = useContext(MainGuidelineContext)

  const {
    setIsThermometerRisen,
  } = useContext(InteractionContext)

  const liquidRef = useRef(null)
  const originalScaleRef = useRef(null)

  const targetScaleYRef = useRef(0)
  const normalAmountRef = useRef(0)

  const delayTimerRef = useRef(0)
  const reactionTimerRef = useRef(0)
  const reactionStartedRef = useRef(false)

  useEffect(() => {
    setIsThermometerRisen(true)
  }, [
    setIsThermometerRisen,
  ])

  useEffect(() => {
    const thermometer =
      mainThermometerRef?.current

    if (!thermometer) return

    thermometer.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      if (
        child.isMesh &&
        name.includes("liquid")
      ) {
        liquidRef.current = child

        originalScaleRef.current =
          child.scale.clone()

        child.scale.y = 0
        child.visible = false

        child.updateMatrixWorld(true)
      }
    })
  }, [
    mainThermometerRef,
  ])

  useEffect(() => {
    const isReactionTemperatureStep =
      selectedLesson === 8 &&
      lessonStep === 11

    delayTimerRef.current = 0
    reactionTimerRef.current = 0

    // Keep the liquid empty while waiting.
    targetScaleYRef.current = 0

    normalAmountRef.current =
      Math.max(amount || 0, 0)

    reactionStartedRef.current =
      isReactionTemperatureStep
  }, [
    amount,
    selectedLesson,
    lessonStep,
  ])

  useFrame((_, delta) => {
    const liquid = liquidRef.current
    const originalScale =
      originalScaleRef.current

    if (!liquid || !originalScale) return

    delayTimerRef.current += delta

    const hasDelayFinished =
      delayTimerRef.current >= startDelay

    if (!hasDelayFinished) {
      targetScaleYRef.current = 0
    } else {
      const isReactionTemperatureStep =
        selectedLesson === 8 &&
        lessonStep === 11 &&
        reactionStartedRef.current

      if (isReactionTemperatureStep) {
        reactionTimerRef.current += delta

        const elapsed =
          reactionTimerRef.current

        if (elapsed < 1) {
          targetScaleYRef.current =
            startingAmount
        }

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

        if (elapsed >= 6 && elapsed < 7) {
          targetScaleYRef.current =
            highestAmount
        }

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

        if (elapsed >= 13) {
          targetScaleYRef.current =
            finalAmount
        }
      } else {
        targetScaleYRef.current =
          normalAmountRef.current
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
        liquid.scale.y - targetScaleY
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