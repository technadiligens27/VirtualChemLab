import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

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
]

const MoveModelByScrolling = ({
  modelRef,
  moveAxis = "x",
  distance = 1,
  speed = 0.01,

  // Mobile movement speed
  mobileMoveSpeed = 2,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const {
    isTouchDevice,
    mobileMove,
    setMobileMove,
  } = useContext(InteractionContext)

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

  // =========================================
  // INITIALIZATION + DESKTOP SCROLLING
  // =========================================

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

      // Disable desktop scrolling on mobile.
      if (isTouchDevice) return

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
    isTouchDevice,
  ])

  // =========================================
  // MOBILE MOVEMENT
  // =========================================

  useFrame((_, delta) => {

    if (!isTouchDevice) return

    if (!mobileMove) return

    const model = modelRef?.current

    if (!model) return

    if (!startPositionRef.current) return

    const currentLesson =
      latestLessonRef.current

    const currentStep =
      latestLessonStepRef.current

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
    // MOBILE — MOVE FORWARD
    // =====================================

    if (
      scrollDownStep &&
      !hasReachedEndRef.current
    ) {

      const remainingDistance =
        distance - movedDistanceRef.current

      const moveAmount = Math.min(
        mobileMoveSpeed * delta,
        Math.max(0, remainingDistance)
      )

      model.position[moveAxis] +=
        moveAmount

      movedDistanceRef.current +=
        moveAmount

      // ===================================
      // FORWARD MOVEMENT COMPLETED
      // ===================================

      if (
        movedDistanceRef.current >=
        distance - 0.000001
      ) {

        movedDistanceRef.current =
          distance

        model.position[moveAxis] =
          startPositionRef.current[moveAxis] +
          distance

        hasReachedEndRef.current = true

        setMobileMove(false)

        setLessonStep(
          scrollDownStep.nextStep
        )
      }
    }

    // =====================================
    // MOBILE — RETURN TO START
    // =====================================

    else if (scrollUpStep) {

      const moveAmount = Math.min(
        mobileMoveSpeed * delta,
        movedDistanceRef.current
      )

      model.position[moveAxis] -=
        moveAmount

      movedDistanceRef.current -=
        moveAmount

      // ===================================
      // RETURN MOVEMENT COMPLETED
      // ===================================

      if (
        movedDistanceRef.current <=
        0.000001
      ) {

        movedDistanceRef.current = 0

        model.position[moveAxis] =
          startPositionRef.current[
            moveAxis
          ]

        hasReachedEndRef.current = false

        setMobileMove(false)

        setLessonStep(
          scrollUpStep.nextStep
        )
      }
    }

    model.updateMatrixWorld(true)
  })

  // =========================================
  // MOBILE CLEANUP
  // =========================================

  useEffect(() => {
    return () => {
      setMobileMove(false)
    }
  }, [setMobileMove])

  return null
}

export default MoveModelByScrolling