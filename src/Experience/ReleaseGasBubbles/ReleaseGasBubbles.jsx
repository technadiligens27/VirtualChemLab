import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"



const ReleaseGasBubbles = ({
  modelRef,

  riseDistance = 3,

  minimumSpeed = 0.15,
  maximumSpeed = 0.3,

  releaseDelay = 1.5,

  sidewaysMovement = 0.04,

  // 100 = all bubbles, 50 = half.
  bubblePercentage = 100,

  // Must be provided for the animation to finish.
  // Leave undefined for infinite looping.
  loopTimes,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const bubblesRef = useRef([])
  const elapsedTimeRef = useRef(0)
  const lessonAdvancedRef = useRef(false)

  useEffect(() => {
    const model = modelRef?.current

    if (!model) {
      console.log(
        "Gas bubble model was not found"
      )

      return
    }

    const availableBubbles = []

    model.traverse((child) => {
      if (!child.isMesh) {
        return
      }

      const name =
        child.name?.toLowerCase() || ""

      if (
        name.includes("gas-bubbles")
      ) {
        child.visible = false

        availableBubbles.push({
          object: child,

          originalPosition:
            child.position.clone(),
        })
      }
    })

    const safePercentage =
      Math.max(
        0,
        Math.min(
          100,
          bubblePercentage
        )
      )

    const bubbleCount =
      Math.round(
        availableBubbles.length *
        (safePercentage / 100)
      )

    const shuffledBubbles = [
      ...availableBubbles,
    ].sort(
      () => Math.random() - 0.5
    )

    const selectedBubbles =
      shuffledBubbles.slice(
        0,
        bubbleCount
      )

    bubblesRef.current =
      selectedBubbles.map(
        ({
          object,
          originalPosition,
        }) => ({
          object,

          originalPosition,

          delay:
            Math.random() *
            releaseDelay,

          speed:
            minimumSpeed +
            Math.random() *
              (
                maximumSpeed -
                minimumSpeed
              ),

          movementOffset:
            Math.random() *
            Math.PI *
            2,

          movementSpeed:
            1 +
            Math.random() *
              2,

          completedLoops: 0,

          finished: false,
        })
      )

    elapsedTimeRef.current = 0
    lessonAdvancedRef.current = false

    return () => {
      availableBubbles.forEach(
        ({
          object,
          originalPosition,
        }) => {
          object.visible = false

          object.position.copy(
            originalPosition
          )
        }
      )

      bubblesRef.current = []
      elapsedTimeRef.current = 0
      lessonAdvancedRef.current = false
    }
  }, [
    modelRef,
    minimumSpeed,
    maximumSpeed,
    releaseDelay,
    bubblePercentage,
    loopTimes,
  ])

  useFrame((_, delta) => {
    elapsedTimeRef.current += delta

    bubblesRef.current.forEach(
      (bubble) => {
        if (bubble.finished) {
          return
        }

        if (
          elapsedTimeRef.current <
          bubble.delay
        ) {
          return
        }

        const bubbleObject =
          bubble.object

        bubbleObject.visible = true

        bubbleObject.position.y +=
          bubble.speed * delta

        bubbleObject.position.x +=
          Math.sin(
            elapsedTimeRef.current *
              bubble.movementSpeed +
              bubble.movementOffset
          ) *
          sidewaysMovement *
          delta

        bubbleObject.position.z +=
          Math.cos(
            elapsedTimeRef.current *
              bubble.movementSpeed +
              bubble.movementOffset
          ) *
          sidewaysMovement *
          delta

        const distanceRisen =
          bubbleObject.position.y -
          bubble.originalPosition.y

        if (
          distanceRisen >=
          riseDistance
        ) {
          bubbleObject.visible = false

          bubbleObject.position.copy(
            bubble.originalPosition
          )

          bubble.completedLoops += 1

          if (
            loopTimes !== undefined &&
            bubble.completedLoops >=
              loopTimes
          ) {
            bubble.finished = true
            return
          }

          bubble.delay =
            elapsedTimeRef.current +
            Math.random() *
              releaseDelay

          bubble.speed =
            minimumSpeed +
            Math.random() *
              (
                maximumSpeed -
                minimumSpeed
              )
        }
      }
    )

    const hasBubbles =
      bubblesRef.current.length > 0

    const allBubblesFinished =
      hasBubbles &&
      loopTimes !== undefined &&
      bubblesRef.current.every(
        (bubble) => bubble.finished
      )

    if (
      allBubblesFinished &&
      !lessonAdvancedRef.current &&
      selectedLesson === 14.1 &&
      lessonStep === 53.1
    ) {
      lessonAdvancedRef.current = true
      setLessonStep(54)
    }

    if (
      allBubblesFinished &&
      !lessonAdvancedRef.current &&
      selectedLesson === 14.1 &&
      lessonStep === 56.1
    ) {
      lessonAdvancedRef.current = true
      setLessonStep(57)
    }
    if (
      allBubblesFinished &&
      !lessonAdvancedRef.current &&
      selectedLesson === 14.2 &&
      lessonStep === 73
    ) {
      lessonAdvancedRef.current = true
      setLessonStep(74)
    }

    if (
      allBubblesFinished &&
      !lessonAdvancedRef.current &&
      selectedLesson === 14.2 &&
      lessonStep === 77
    ) {
      lessonAdvancedRef.current = true
      setLessonStep(78)
    }
  })

  return null
}

export default ReleaseGasBubbles