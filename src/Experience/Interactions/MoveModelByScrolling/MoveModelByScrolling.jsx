import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

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

  // Keeps the wheel event updated without
  // resetting the model when lessonStep changes.
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
      if (!startPositionRef.current) {
        return
      }

      // =========================================
      // SCROLL DOWN — MOVE FORWARD
      // =========================================

      if (event.deltaY > 0) {
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

          if (
            latestLessonRef.current === 15 &&
            latestLessonStepRef.current === 19
          ) {
            setLessonStep(20)
          }
        }
      }

      // =========================================
      // SCROLL UP — MOVE BACK TO ORIGINAL POSITION
      // =========================================

      if (event.deltaY < 0) {
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

        // Ensure it reaches the exact original
        // position without tiny decimal errors.
                if (movedDistanceRef.current <= 0) {
          movedDistanceRef.current = 0

          model.position[moveAxis] =
            startPositionRef.current[
              moveAxis
            ]

          hasReachedEndRef.current = false

          if (
            latestLessonRef.current === 15 &&
            latestLessonStepRef.current === 20
          ) {
            setLessonStep(21)
          }
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

      // Restore original position on unmount.
      // if (startPositionRef.current) {
      //   model.position.copy(
      //     startPositionRef.current
      //   )

      //   model.updateMatrixWorld(true)
      // }
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