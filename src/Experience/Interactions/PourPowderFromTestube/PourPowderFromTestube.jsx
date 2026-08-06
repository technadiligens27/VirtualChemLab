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

  const childScaleDataRef = useRef([])

  const elapsedTimeRef = useRef(0)
  const wasPouringRef = useRef(false)
  const shouldFadePowderRef = useRef(false)
  const hasCompletedRef = useRef(false)

  const particlesFinishedLoggedRef =
    useRef(false)

  const finalCompletionLoggedRef =
    useRef(false)

  const logChangedChildScales = (
    debugStage
  ) => {
    const changedChildren = []

    childScaleDataRef.current.forEach(
      (childData) => {
        const {
          object,
          originalScale,
        } = childData

        const currentScale =
          object.scale

        const scaleChanged =
          Math.abs(
            currentScale.x -
              originalScale.x
          ) > 0.001 ||
          Math.abs(
            currentScale.y -
              originalScale.y
          ) > 0.001 ||
          Math.abs(
            currentScale.z -
              originalScale.z
          ) > 0.001

        if (!scaleChanged) return

        changedChildren.push({
          name:
            object.name ||
            "Unnamed child",

          uuid: object.uuid,

          originalScale: {
            x: originalScale.x,
            y: originalScale.y,
            z: originalScale.z,
          },

          currentScale: {
            x: currentScale.x,
            y: currentScale.y,
            z: currentScale.z,
          },

          visible: object.visible,

          type: object.type,
        })
      }
    )

    console.group(
      `Powder debug: ${debugStage}`
    )

    if (changedChildren.length === 0) {
      console.log(
        "No children changed scale."
      )
    } else {
      console.log(
        "Children with changed scales:",
        changedChildren
      )

      console.table(
        changedChildren.map(
          (child) => ({
            name: child.name,
            type: child.type,

            originalX:
              child.originalScale.x,

            originalY:
              child.originalScale.y,

            originalZ:
              child.originalScale.z,

            currentX:
              child.currentScale.x,

            currentY:
              child.currentScale.y,

            currentZ:
              child.currentScale.z,

            visible: child.visible,
          })
        )
      )
    }

    console.groupEnd()
  }

  useEffect(() => {
    if (!model) return

    const fallingPowderMeshes = []
    const insidePowderMeshes = []
    const childScaleData = []

    model.traverse((child) => {
      childScaleData.push({
        object: child,

        originalScale:
          child.scale.clone(),
      })

      if (!child.isMesh) return

      const name =
        child.name?.toLowerCase() || ""

      if (
        name.includes("pour-powder")
      ) {
        child.visible = false
        child.scale.set(1, 1, 1)

        child.material =
          child.material.clone()

        child.material.color.set(
          "white"
        )

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

    childScaleDataRef.current =
      childScaleData

    console.log(
      "All children being watched for scale changes:",
      childScaleData.map(
        (childData) => ({
          name:
            childData.object.name ||
            "Unnamed child",

          type:
            childData.object.type,

          scale: {
            x:
              childData.originalScale.x,

            y:
              childData.originalScale.y,

            z:
              childData.originalScale.z,
          },
        })
      )
    )

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
                (
                  fallingPowderMeshes.length -
                  1
                )

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
              (
                Math.random() -
                0.5
              ) * randomMovement,

            randomZ:
              (
                Math.random() -
                0.5
              ) * randomMovement,

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
      childScaleDataRef.current = []
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

      particlesFinishedLoggedRef.current =
        false

      finalCompletionLoggedRef.current =
        false

      console.log(
        "Powder pouring started"
      )

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
          const powder =
            powderData.object

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
          distanceFallen >=
          fallDistance
        ) {
          powder.visible = false
          particle.hasFinished = true
        }
      }
    )

    const allParticlesFinished =
      powderParticlesRef.current.length >
        0 &&
      powderParticlesRef.current.every(
        (particle) =>
          particle.hasFinished
      )

    if (
      allParticlesFinished &&
      !particlesFinishedLoggedRef.current
    ) {
      particlesFinishedLoggedRef.current =
        true

      console.log(
        "All falling powder particles have finished."
      )

      logChangedChildScales(
        "Falling particles finished"
      )
    }

    if (allParticlesFinished) {
      shouldFadePowderRef.current = true
    }

    if (
      !shouldFadePowderRef.current
    ) {
      return
    }

    testTubePowderMeshesRef.current.forEach(
      (powderData) => {
        const powder =
          powderData.object

        if (
          powderData.isBottomResidue
        ) {
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
      !finalCompletionLoggedRef.current
    ) {
      finalCompletionLoggedRef.current =
        true

      console.log(
        "Powder pouring is fully completed."
      )

      logChangedChildScales(
        "Pouring fully completed"
      )
    }

    if (
      lessonStep === 35 &&
      selectedLesson === 8
    ) {
      setLessonStep(36)

      setIsPottasiumCarobnateInTestube01(
        false
      )
    }

    if (
      lessonStep === 32 &&
      selectedLesson === 9
    ) {
      setLessonStep(33)

      setIsPottasiumCarobnateInTestube01(
        false
      )
    }
  })

  return null
}

export default PourPowderFromTestube