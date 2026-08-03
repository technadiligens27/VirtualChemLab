import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const PourPowderFromTestube = ({
  isPouring,
  fallDistance = 0.4,
  totalDuration = 6,
  particleFallDuration = 1,
  randomMovement = 0.5,
  leftMovement = 0.5,
  powderFadeSpeed = 0.5,
  model,
}) => {
  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const {
    setIsPottasiumCarobnateInTestube01,
  } = useContext(InteractionContext)

  const powderParticlesRef = useRef([])
  const testTubePowderMeshesRef = useRef([])

  const elapsedTimeRef = useRef(0)
  const wasPouringRef = useRef(false)
  const shouldFadePowderRef = useRef(false)
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    if (!model) return

    const fallingPowderMeshes = []
    const insidePowderMeshes = []

    model.traverse((child) => {
      if (!child.isMesh) return

      const name =
        child.name?.toLowerCase() || ""

      if (name.includes("pour-powder")) {
        child.visible = false
        child.scale.set(1, 1, 1)

        child.material =
          child.material.clone()

        child.material.color.set("white")

        fallingPowderMeshes.push(child)
      }

      if (
        name.includes(
          "testube01-powder"
        )
      ) {
        child.visible = true

        child.material =
          child.material.clone()

        child.material.transparent = true
        child.material.opacity = 1
        child.material.needsUpdate = true

        insidePowderMeshes.push({
          object: child,

          isBottomResidue:
            name.includes(
              "testube01-powder-bottom"
            ),
        })
      }
    })

    testTubePowderMeshesRef.current =
      insidePowderMeshes

    const maximumDelay = Math.max(
      totalDuration -
        particleFallDuration,
      0
    )

    powderParticlesRef.current =
      fallingPowderMeshes.map(
        (powder, index) => {
          const progress =
            fallingPowderMeshes.length <= 1
              ? 0
              : index /
                (fallingPowderMeshes.length -
                  1)

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
        }
      )

    return () => {
      powderParticlesRef.current.forEach(
        (particle) => {
          particle.object.visible = false
        }
      )

      powderParticlesRef.current = []
      testTubePowderMeshesRef.current = []
    }
  }, [
    model,
    fallDistance,
    totalDuration,
    particleFallDuration,
    randomMovement,
  ])

  useFrame((_, delta) => {
    if (
      isPouring &&
      !wasPouringRef.current
    ) {
      elapsedTimeRef.current = 0
      shouldFadePowderRef.current = false
      hasCompletedRef.current = false

      powderParticlesRef.current.forEach(
        (particle) => {
          particle.object.position.copy(
            particle.originalPosition
          )

          particle.object.visible = false
          particle.hasFinished = false
        }
      )

      testTubePowderMeshesRef.current.forEach(
        (powderData) => {
          const powder = powderData.object

          powder.visible = true
          powder.material.transparent = true
          powder.material.opacity = 1
          powder.material.needsUpdate = true
        }
      )
    }

    wasPouringRef.current = isPouring

    if (!isPouring) {
      powderParticlesRef.current.forEach(
        (particle) => {
          particle.object.visible = false
        }
      )

      return
    }

    if (hasCompletedRef.current) return

    elapsedTimeRef.current += delta

    powderParticlesRef.current.forEach(
      (particle) => {
        if (particle.hasFinished) return

        if (
          elapsedTimeRef.current <
          particle.delay
        ) {
          return
        }

        const powder = particle.object

        powder.visible = true

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

        if (
          distanceFallen >= fallDistance
        ) {
          powder.visible = false
          particle.hasFinished = true
        }
      }
    )

    const allParticlesFinished =
      powderParticlesRef.current.length > 0 &&
      powderParticlesRef.current.every(
        (particle) =>
          particle.hasFinished
      )

    if (allParticlesFinished) {
      shouldFadePowderRef.current = true
    }

    if (!shouldFadePowderRef.current) return

    testTubePowderMeshesRef.current.forEach(
      (powderData) => {
        const powder = powderData.object

        if (powderData.isBottomResidue) {
          powder.visible = true
          powder.material.opacity = 1
          powder.material.needsUpdate = true

          return
        }

        powder.material.opacity =
          Math.max(
            powder.material.opacity -
              powderFadeSpeed * delta,
            0
          )

        powder.material.needsUpdate = true

        if (
          powder.material.opacity <= 0
        ) {
          powder.material.opacity = 0
          powder.visible = false
        }
      }
    )

    const allMainPowderHidden =
      testTubePowderMeshesRef.current.length >
        0 &&
      testTubePowderMeshesRef.current.every(
        (powderData) => {
          if (
            powderData.isBottomResidue
          ) {
            return true
          }

          return (
            powderData.object.material
              .opacity <= 0
          )
        }
      )

    if (!allMainPowderHidden) return

    shouldFadePowderRef.current = false
    hasCompletedRef.current = true

    if (
      lessonStep === 35 &&
      selectedLesson === 8
    ) {
      setLessonStep(36)

      setIsPottasiumCarobnateInTestube01(
        false
      )
    }
  })

  return null
}

export default PourPowderFromTestube