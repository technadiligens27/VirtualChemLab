import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

import ShowBeakerPrecipitate from "../ShowBeakerPrecipitate/ShowBeakerPrecipitate"

const PourPowderFromTestube = ({
  isPouring,

  fallDistance = 0.4,
  totalDuration = 6,
  particleFallDuration = 1,

  randomMovement = 0.5,
  leftMovement = 0.5,

  powderFadeSpeed = 1,

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

  const {
    normalBeakerRef,
  } = useContext(ModelContext)

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

  /* =========================================================
     DEBUG SCALE CHANGES
     ========================================================= */

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

    if (
      changedChildren.length === 0
    ) {
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

            visible:
              child.visible,
          })
        )
      )
    }

    console.groupEnd()
  }

  /* =========================================================
     FIND POWDER CHILDREN
     ========================================================= */

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
        child.name
          ?.toLowerCase() || ""

      /* -----------------------------------------
         Falling powder particles
         ----------------------------------------- */

      if (
        name.includes(
          "pour-powder"
        )
      ) {
        child.visible = false

        // Do NOT force scale to 1,1,1.
        // Preserve Blender/original scale.

        child.material =
          child.material.clone()

        child.material.color.set(
          "white"
        )

        fallingPowderMeshes.push(
          child
        )
      }

      /* -----------------------------------------
         Powder initially inside test tube
         ----------------------------------------- */

      if (
        name.includes(
          "testube01-powder"
        )
      ) {
        child.visible = true

        child.material =
          child.material.clone()

        child.material.transparent =
          true

        child.material.opacity = 1

        child.material.needsUpdate =
          true

        insidePowderMeshes.push({
          object: child,
        })
      }
    })

    childScaleDataRef.current =
      childScaleData

    testTubePowderMeshesRef.current =
      insidePowderMeshes

    /* =========================================================
       CREATE PARTICLE DELAYS
       ========================================================= */

    const maximumDelay =
      Math.max(
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
              progress *
                maximumDelay +
              Math.random() *
                0.15,

            speed:
              fallDistance /
              particleFallDuration,

            randomX:
              (
                Math.random() -
                0.5
              ) *
              randomMovement,

            randomZ:
              (
                Math.random() -
                0.5
              ) *
              randomMovement,

            hasFinished: false,
          }
        }
      )

    return () => {
      /* -----------------------------------------
         Hide falling particles
         ----------------------------------------- */

      powderParticlesRef.current.forEach(
        (particle) => {
          particle.object.visible =
            false
        }
      )

      powderParticlesRef.current = []
      testTubePowderMeshesRef.current =
        []
      childScaleDataRef.current = []
    }
  }, [
    model,
    fallDistance,
    totalDuration,
    particleFallDuration,
    randomMovement,
  ])

  /* =========================================================
     ANIMATION
     ========================================================= */

  useFrame((_, delta) => {
    /* =========================================================
       POUR STARTED
       ========================================================= */

    if (
      isPouring &&
      !wasPouringRef.current
    ) {
      elapsedTimeRef.current = 0

      shouldFadePowderRef.current =
        false

      hasCompletedRef.current =
        false

      particlesFinishedLoggedRef.current =
        false

      finalCompletionLoggedRef.current =
        false

      console.log(
        "Powder pouring started"
      )

      /* Reset falling particles */

      powderParticlesRef.current.forEach(
        (particle) => {
          particle.object.position.copy(
            particle.originalPosition
          )

          particle.object.visible =
            false

          particle.hasFinished =
            false
        }
      )

      /* Reset powder inside tube */

      testTubePowderMeshesRef.current.forEach(
        (powderData) => {
          const powder =
            powderData.object

          powder.visible = true

          powder.material.transparent =
            true

          powder.material.opacity = 1

          powder.material.needsUpdate =
            true
        }
      )
    }

    wasPouringRef.current =
      isPouring

    /* =========================================================
       NOT POURING
       ========================================================= */

    if (!isPouring) {
      powderParticlesRef.current.forEach(
        (particle) => {
          particle.object.visible =
            false
        }
      )

      return
    }

    if (
      hasCompletedRef.current
    ) {
      return
    }

    elapsedTimeRef.current +=
      delta

    /* =========================================================
       FALLING POWDER
       ========================================================= */

    powderParticlesRef.current.forEach(
      (particle) => {
        if (
          particle.hasFinished
        ) {
          return
        }

        if (
          elapsedTimeRef.current <
          particle.delay
        ) {
          return
        }

        const powder =
          particle.object

        powder.visible = true

        /* Fall downward */

        powder.position.y -=
          particle.speed *
          delta

        /* Move left */

        powder.position.x -=
          leftMovement *
          delta

        /* Random horizontal movement */

        powder.position.x +=
          particle.randomX *
          delta

        powder.position.z +=
          particle.randomZ *
          delta

        const distanceFallen =
          particle.originalPosition.y -
          powder.position.y

        if (
          distanceFallen >=
          fallDistance
        ) {
          powder.visible = false

          particle.hasFinished =
            true
        }
      }
    )

    /* =========================================================
       CHECK FALLING PARTICLES
       ========================================================= */

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

    if (
      allParticlesFinished
    ) {
      shouldFadePowderRef.current =
        true
    }

    /* =========================================================
       FADE ALL POWDER INSIDE TEST TUBE
       ========================================================= */

    if (
      !shouldFadePowderRef.current
    ) {
      return
    }

    testTubePowderMeshesRef.current.forEach(
      (powderData) => {
        const powder =
          powderData.object

        powder.material.opacity =
          Math.max(
            powder.material.opacity -
              powderFadeSpeed *
                delta,
            0
          )

        powder.material.needsUpdate =
          true

        if (
          powder.material.opacity <=
          0
        ) {
          powder.material.opacity = 0

          powder.visible = false
        }
      }
    )

    /* =========================================================
       CHECK ALL TEST TUBE POWDER IS GONE
       ========================================================= */

    const allMainPowderHidden =
      testTubePowderMeshesRef.current
        .length > 0 &&
      testTubePowderMeshesRef.current.every(
        (powderData) =>
          powderData.object.material
            .opacity <= 0
      )

    if (
      !allMainPowderHidden
    ) {
      return
    }

    /* =========================================================
       POUR COMPLETED
       ========================================================= */

    shouldFadePowderRef.current =
      false

    hasCompletedRef.current =
      true

    /* -----------------------------------------
       Force EVERY test tube powder child hidden
       ----------------------------------------- */

    testTubePowderMeshesRef.current.forEach(
      (powderData) => {
        const powder =
          powderData.object

        powder.material.opacity = 0
        powder.visible = false

        powder.material.needsUpdate =
          true
      }
    )

    /* -----------------------------------------
       Hide every falling powder particle
       ----------------------------------------- */

    powderParticlesRef.current.forEach(
      (particle) => {
        particle.object.visible =
          false
      }
    )

    /* -----------------------------------------
       Restore original child scales
       ----------------------------------------- */

    childScaleDataRef.current.forEach(
      ({
        object,
        originalScale,
      }) => {
        object.scale.copy(
          originalScale
        )

        object.updateMatrixWorld(
          true
        )
      }
    )

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

    /* =========================================================
       LESSON 8
       ========================================================= */

    if (
      selectedLesson === 8 &&
      lessonStep === 35
    ) {
      setLessonStep(36)

      setIsPottasiumCarobnateInTestube01(
        false
      )
    }

    /* =========================================================
       LESSON 9
       ========================================================= */

    if (
      selectedLesson === 9 &&
      lessonStep === 32
    ) {
      setLessonStep(33)

      setIsPottasiumCarobnateInTestube01(
        false
      )
    }

    /* =========================================================
       LESSON 12 — SULFAMIC ACID
       ========================================================= */

    if (
      selectedLesson === 12 &&
      lessonStep === 19
    ) {
      setLessonStep(20)

      setIsPottasiumCarobnateInTestube01(
        false
      )
    }

    
  })

  return (
    <>
      
    </>
  )
}

export default PourPowderFromTestube