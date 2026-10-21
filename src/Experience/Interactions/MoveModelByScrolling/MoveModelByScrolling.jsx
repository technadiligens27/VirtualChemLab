import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

// =========================================
// ALLOWED SCROLL STEPS
// =========================================

const scrollDownSteps = [
  {
    lesson: 15,
    step: 19,
    nextStep: 20,
  },
  {
    lesson: 15.2,
    step: 32,
    nextStep: 33,
  },
]

const scrollUpSteps = [
  {
    lesson: 15,
    step: 20,
    nextStep: 24,
  },
  // {
  //   lesson: 15.2,
  //   step: 32,
  //   nextStep: 33,
  // },
]

const MoveModelByScrolling = ({
  modelRef,
  moveAxis = "x",
  distance = 1,
  speed = 0.01,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const startPositionRef =
    useRef(null)

  const movedDistanceRef =
    useRef(0)

  const hasReachedEndRef =
    useRef(false)

  // Keep current values available without
  // resetting the movement effect.
  const latestLessonRef =
    useRef(selectedLesson)

  const latestLessonStepRef =
    useRef(lessonStep)

  latestLessonRef.current =
    selectedLesson

  latestLessonStepRef.current =
    lessonStep

  useEffect(() => {
    const model = modelRef?.current

    if (!model) {
      return
    }

    startPositionRef.current =
      model.position.clone()

    movedDistanceRef.current = 0
    hasReachedEndRef.current = false

    const handleWheel = (event) => {
      const currentLesson =
        latestLessonRef.current

      const currentStep =
        latestLessonStepRef.current

      if (!startPositionRef.current) {
        return
      }

      // =====================================
      // FIND CURRENT ALLOWED STEP
      // =====================================

      const scrollDownStep =
        scrollDownSteps.find(
          (item) =>
            item.lesson === currentLesson &&
            item.step === currentStep
        )

      const scrollUpStep =
        scrollUpSteps.find(
          (item) =>
            item.lesson === currentLesson &&
            item.step === currentStep
        )

      // =====================================
      // SCROLL DOWN — MOVE FORWARD
      // =====================================

      if (event.deltaY > 0) {
        if (!scrollDownStep) {
          return
        }

        const remainingDistance =
          distance - movedDistanceRef.current

        if (remainingDistance <= 0) {
          return
        }

        const moveAmount = Math.min(
          speed,
          remainingDistance
        )

        model.position[moveAxis] +=
          moveAmount

        movedDistanceRef.current +=
          moveAmount

        const hasFullyMoved =
          movedDistanceRef.current >= distance

        if (
          hasFullyMoved &&
          !hasReachedEndRef.current
        ) {
          hasReachedEndRef.current = true

          setLessonStep(
            scrollDownStep.nextStep
          )
        }
      }

      // =====================================
      // SCROLL UP — RETURN TO START
      // =====================================

      if (event.deltaY < 0) {
        if (!scrollUpStep) {
          return
        }

        if (movedDistanceRef.current <= 0) {
          return
        }

        const moveAmount = Math.min(
          speed,
          movedDistanceRef.current
        )

        model.position[moveAxis] -=
          moveAmount

        movedDistanceRef.current -=
          moveAmount

        const hasReturnedToStart =
          movedDistanceRef.current <= 0

        if (hasReturnedToStart) {
          movedDistanceRef.current = 0

          model.position[moveAxis] =
            startPositionRef.current[
              moveAxis
            ]

          hasReachedEndRef.current = false

          setLessonStep(
            scrollUpStep.nextStep
          )
        }
      }

      model.updateMatrixWorld(true)
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
    modelRef,
    moveAxis,
    distance,
    speed,
    setLessonStep,
  ])

  return null
}

export default MoveModelByScrolling