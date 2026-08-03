import {
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

const ReleaseGasBubbles = ({
  modelRef,
  riseDistance = 1,
  minimumSpeed = 0.15,
  maximumSpeed = 0.3,
  releaseDelay = 1.5,
  sidewaysMovement = 0.04,
}) => {
  const bubblesRef = useRef([])
  const elapsedTimeRef = useRef(0)

  useEffect(() => {
    const model = modelRef?.current

    if (!model) {
      console.log(
        "Gas bubble model was not found"
      )

      return
    }

    const bubbles = []

    model.traverse((child) => {
      if (!child.isMesh) return

      const name =
        child.name?.toLowerCase() || ""

      if (
        name.includes("gas-bubbles")
      ) {
        child.visible = false

        bubbles.push({
          object: child,

          originalPosition:
            child.position.clone(),

          delay:
            Math.random() * releaseDelay,

          speed:
            minimumSpeed +
            Math.random() *
              (maximumSpeed -
                minimumSpeed),

          movementOffset:
            Math.random() *
            Math.PI *
            2,

          movementSpeed:
            1 + Math.random() * 2,
        })
      }
    })

    bubblesRef.current = bubbles
    elapsedTimeRef.current = 0

    return () => {
      bubblesRef.current.forEach(
        (bubble) => {
          bubble.object.visible = false

          bubble.object.position.copy(
            bubble.originalPosition
          )
        }
      )

      bubblesRef.current = []
    }
  }, [
    modelRef,
    minimumSpeed,
    maximumSpeed,
    releaseDelay,
  ])

  useFrame((_, delta) => {
    elapsedTimeRef.current += delta

    bubblesRef.current.forEach(
      (bubble) => {
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
          distanceRisen >= riseDistance
        ) {
          bubbleObject.visible = false

          bubbleObject.position.copy(
            bubble.originalPosition
          )

          bubble.delay =
            elapsedTimeRef.current +
            Math.random() *
              releaseDelay

          bubble.speed =
            minimumSpeed +
            Math.random() *
              (maximumSpeed -
                minimumSpeed)
        }
      }
    )
  })

  return null
}

export default ReleaseGasBubbles