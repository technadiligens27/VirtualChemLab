import {
  useEffect,
  useRef,
} from "react"
import { useFrame } from "@react-three/fiber"

const PourPowderFromTestube = ({
  isPouring,
  fallDistance = 5,
  totalDuration = 5,
  particleFallDuration = 3.5,
  randomMovement = 0.5,
  leftMovement = 1.9,
  model,
}) => {
  const powderParticlesRef = useRef([])
  const elapsedTimeRef = useRef(0)
  const wasPouringRef = useRef(false)

  useEffect(() => {
    const testTube = model

    if (!testTube) {
      console.log("Test tube was not found")
      return
    }

    const powderMeshes = []

    testTube.traverse((child) => {
      if (
        child.isMesh &&
        child.name
          ?.toLowerCase()
          .includes("pour-powder")
      ) {
        child.visible = true
        child.scale.set(1,1,1)

        child.material =
          child.material.clone()

        child.material.color.set("white")

        powderMeshes.push(child)
      }
    })

    const maximumDelay = Math.max(
      totalDuration - particleFallDuration,
      0
    )

    powderParticlesRef.current =
      powderMeshes.map((powder, index) => {
        const progress =
          powderMeshes.length <= 1
            ? 0
            : index /
              (powderMeshes.length - 1)

        return {
          object: powder,
          originalPosition:
            powder.position.clone(),

          delay:
            progress * maximumDelay +
            Math.random() * 0.15,

          speed:
            fallDistance /
            particleFallDuration,

          randomX:
            (Math.random() - 0.5) *
            randomMovement,

          randomZ:
            (Math.random() - 0.5) *
            randomMovement,

          hasFinished: false,
        }
      })

    console.log(
      "Powder particles:",
      powderMeshes.length
    )
  }, [
    model,
    fallDistance,
    totalDuration,
    particleFallDuration,
    randomMovement,
  ])

  useFrame((_, delta) => {
    if (isPouring && !wasPouringRef.current) {
      elapsedTimeRef.current = 0

      powderParticlesRef.current.forEach(
        (particle) => {
          particle.object.position.copy(
            particle.originalPosition
          )

          particle.object.visible = true
          particle.hasFinished = false
        }
      )
    }

    wasPouringRef.current = isPouring

    if (!isPouring) return

    elapsedTimeRef.current += delta

    powderParticlesRef.current.forEach(
      (particle) => {
        if (particle.hasFinished) return
        if (elapsedTimeRef.current < particle.delay) return

        const powder = particle.object

        powder.position.y -=
          particle.speed * delta

        powder.position.x -=
          leftMovement * delta

        powder.position.x +=
          particle.randomX * delta

        powder.position.z +=
          particle.randomZ * delta

        const distanceFallen =
          particle.originalPosition.y -
          powder.position.y

        if (distanceFallen >= fallDistance) {
          powder.visible = false
          particle.hasFinished = true
        }
      }
    )
  })

  return null
}

export default PourPowderFromTestube