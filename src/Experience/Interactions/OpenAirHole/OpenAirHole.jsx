import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const OpenAirHole = ({
  speed = 0.08,
  rotateAmount = Math.PI,
  rotateAxis = "y",
}) => {
  const {
    bunsenBurnerRef,
  } = useContext(
    ModelContext
  )

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const startRotationRef =
    useRef(0)

  const rotatedAmountRef =
    useRef(0)

  const hasFullyOpenedRef =
    useRef(false)

  const latestLessonRef =
    useRef(selectedLesson)

  const latestLessonStepRef =
    useRef(lessonStep)

  latestLessonRef.current =
    selectedLesson

  latestLessonStepRef.current =
    lessonStep

  useEffect(() => {
    const bunsenBurner =
      bunsenBurnerRef?.current

    if (!bunsenBurner) {
      return
    }

    let rotatePart = null

    bunsenBurner.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        !rotatePart &&
        childName.includes("rotate")
      ) {
        rotatePart = child
      }
    })

    if (!rotatePart) {
      console.log(
        "OpenAirHole: rotate child not found"
      )

      return
    }

    const validAxis =
      ["x", "y", "z"].includes(
        rotateAxis
      )
        ? rotateAxis
        : "z"

    startRotationRef.current =
      rotatePart.rotation[validAxis]

    rotatedAmountRef.current = 0

    hasFullyOpenedRef.current =
      false

    const handleWheel = (event) => {
      if (event.deltaY <= 0) {
        return
      }

      if (hasFullyOpenedRef.current) {
        return
      }

      const remainingRotation =
        rotateAmount -
        rotatedAmountRef.current

      if (remainingRotation <= 0) {
        return
      }

      const rotationStep =
        Math.min(
          speed,
          remainingRotation
        )

      rotatePart.rotation[validAxis] +=
        rotationStep

      rotatedAmountRef.current +=
        rotationStep

      rotatePart.updateMatrixWorld(true)

      if (
        rotatedAmountRef.current <
        rotateAmount
      ) {
        return
      }

      hasFullyOpenedRef.current =
        true

      rotatePart.rotation[validAxis] =
        startRotationRef.current +
        rotateAmount

      rotatePart.updateMatrixWorld(true)

      if (
        latestLessonRef.current === 15 &&
        latestLessonStepRef.current === 18.1
      ) {
        setLessonStep(19)
      }
    }

    window.addEventListener(
      "wheel",
      handleWheel
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [
    bunsenBurnerRef,
    speed,
    rotateAmount,
    rotateAxis,
    setLessonStep,
  ])

  return null
}

export default OpenAirHole