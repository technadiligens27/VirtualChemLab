import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

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
  } = useContext(
    MainGuidelineContext
  )



  const {
    setIsPottasiumCarobnateInTestube01,isMolarVolumeReaction,setIsMolarVolumeReaction
  } = useContext(
    InteractionContext
  )

  // =====================================================
  // REFS
  // =====================================================

  const powderParticlesRef =
    useRef([])

  const testTubePowderMeshesRef =
    useRef([])

  const elapsedTimeRef =
    useRef(0)

  const wasPouringRef =
    useRef(false)

  const shouldFadePowderRef =
    useRef(false)

  const hasCompletedRef =
    useRef(false)

  // =====================================================
  // FIND POWDER CHILDREN
  // =====================================================

  useEffect(() => {
    if (!model) {
      return
    }

    const fallingPowderMeshes =
      []

    const insidePowderMeshes =
      []

    // =====================================================
    // TRAVERSE MODEL
    // =====================================================

    model.traverse(
      (child) => {
        if (
          !child.isMesh
        ) {
          return
        }

        const name =
          child.name
            ?.toLowerCase() ||
          ""

        // =================================================
        // FALLING POWDER
        // =================================================

        if (
          name.includes(
            "pour-powder"
          )
        ) {
          child.visible =
            false

          child.material =
            child.material.clone()

          child.material.color.set(
            "white"
          )

          fallingPowderMeshes.push(
            child
          )
        }

        // =================================================
        // POWDER INSIDE TEST TUBE
        // =================================================

        if (
          name.includes(
            "testube01-powder"
          ) ||
          name.includes(
            "testube03-powder"
          )
        ) {
          child.visible =
            true

          child.material =
            child.material.clone()

          child.material.transparent =
            true

          child.material.opacity =
            1

          child.material.needsUpdate =
            true

          insidePowderMeshes.push({
            object:
              child,
          })
        }
      }
    )

    // =====================================================
    // STORE INSIDE POWDER
    // =====================================================

    testTubePowderMeshesRef.current =
      insidePowderMeshes

    // =====================================================
    // CREATE PARTICLE DELAYS
    // =====================================================

    const maximumDelay =
      Math.max(
        totalDuration -
          particleFallDuration,

        0
      )

    powderParticlesRef.current =
      fallingPowderMeshes.map(
        (
          powder,
          index
        ) => {
          const progress =
            fallingPowderMeshes.length <=
            1
              ? 0
              : index /
                (
                  fallingPowderMeshes.length -
                  1
                )

          return {
            object:
              powder,

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

            hasFinished:
              false,
          }
        }
      )

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      powderParticlesRef.current.forEach(
        (particle) => {
          particle.object.visible =
            false
        }
      )

      powderParticlesRef.current =
        []

      testTubePowderMeshesRef.current =
        []
    }
  }, [
    model,
    fallDistance,
    totalDuration,
    particleFallDuration,
    randomMovement,
  ])

  // =====================================================
  // ANIMATION
  // =====================================================

  useFrame(
    (
      _,
      delta
    ) => {
      // ===================================================
      // POUR STARTED
      // ===================================================

      if (
        isPouring &&
        !wasPouringRef.current
      ) {
        elapsedTimeRef.current =
          0

        shouldFadePowderRef.current =
          false

        hasCompletedRef.current =
          false

        // =================================================
        // RESET FALLING PARTICLES
        // =================================================

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

        // =================================================
        // RESET POWDER INSIDE TEST TUBE
        // =================================================

        testTubePowderMeshesRef.current.forEach(
          (powderData) => {
            const powder =
              powderData.object

            powder.visible =
              true

            powder.material.transparent =
              true

            powder.material.opacity =
              1

            powder.material.needsUpdate =
              true
          }
        )
      }

      wasPouringRef.current =
        isPouring

      // ===================================================
      // NOT POURING
      // ===================================================

      if (
        !isPouring
      ) {
        powderParticlesRef.current.forEach(
          (particle) => {
            particle.object.visible =
              false
          }
        )

        return
      }

      // ===================================================
      // ALREADY COMPLETED
      // ===================================================

      if (
        hasCompletedRef.current
      ) {
        return
      }

      elapsedTimeRef.current +=
        delta

      // ===================================================
      // FALLING POWDER
      // ===================================================

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

          // =================================================
          // SHOW POWDER
          // =================================================

          powder.visible =
            true

          // =================================================
          // FALL DOWN
          // =================================================

          powder.position.y -=
            particle.speed *
            delta

          // =================================================
          // MOVE LEFT
          // =================================================

          powder.position.x -=
            leftMovement *
            delta

          // =================================================
          // RANDOM MOVEMENT
          // =================================================

          powder.position.x +=
            particle.randomX *
            delta

          powder.position.z +=
            particle.randomZ *
            delta

          // =================================================
          // DISTANCE FALLEN
          // =================================================

          const distanceFallen =
            particle
              .originalPosition
              .y -
            powder.position.y

          // =================================================
          // PARTICLE FINISHED
          // =================================================

          if (
            distanceFallen >=
            fallDistance
          ) {
            powder.visible =
              false

            particle.hasFinished =
              true
          }
        }
      )

      // ===================================================
      // CHECK ALL FALLING PARTICLES
      // ===================================================

      const allParticlesFinished =
        powderParticlesRef.current
          .length > 0 &&
        powderParticlesRef.current.every(
          (particle) =>
            particle.hasFinished
        )

      if (
        allParticlesFinished
      ) {
        shouldFadePowderRef.current =
          true
      }

      // ===================================================
      // WAIT UNTIL PARTICLES FINISH
      // ===================================================

      if (
        !shouldFadePowderRef.current
      ) {
        return
      }

      // ===================================================
      // FADE POWDER INSIDE TEST TUBE
      // ===================================================

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
            powder.material.opacity =
              0

            powder.visible =
              false
          }
        }
      )

      // ===================================================
      // CHECK INSIDE POWDER IS GONE
      // ===================================================

      const allMainPowderHidden =
        testTubePowderMeshesRef.current
          .length > 0 &&
        testTubePowderMeshesRef.current.every(
          (powderData) =>
            powderData
              .object
              .material
              .opacity <=
            0
        )

      if (
        !allMainPowderHidden
      ) {
        return
      }

      // ===================================================
      // POUR COMPLETED
      // ===================================================

      shouldFadePowderRef.current =
        false

      hasCompletedRef.current =
        true

      // ===================================================
      // HIDE INSIDE POWDER
      // ===================================================

      testTubePowderMeshesRef.current.forEach(
        (powderData) => {
          const powder =
            powderData.object

          powder.material.opacity =
            0

          powder.visible =
            false

          powder.material.needsUpdate =
            true
        }
      )

      // ===================================================
      // HIDE FALLING PARTICLES
      // ===================================================

      powderParticlesRef.current.forEach(
        (particle) => {
          particle.object.visible =
            false
        }
      )

      // ===================================================
      // LESSON 8
      // ===================================================

      if (
        selectedLesson ===
          8 &&
        lessonStep ===
          35
      ) {
        setLessonStep(
          36
        )

        setIsPottasiumCarobnateInTestube01(
          false
        )
      }

      // ===================================================
      // LESSON 9
      // ===================================================

      if (
        selectedLesson ===
          9 &&
        lessonStep ===
          32
      ) {
        setLessonStep(
          33
        )

        setIsPottasiumCarobnateInTestube01(
          false
        )
      }

      // ===================================================
      // LESSON 12
      // ===================================================

      if (
        selectedLesson ===
          12 &&
        lessonStep ===
          19
      ) {
        setLessonStep(
          20
        )

        setIsPottasiumCarobnateInTestube01(
          false
        )
      }

      // ===================================================
      // LESSON 13
      // ===================================================

      if (
        selectedLesson ===
          13 &&
        lessonStep ===
          27
      ) {
        setLessonStep(
          28
        )
        setIsPottasiumCarobnateInTestube01(
          false
        )
      }
    }
  )

  return null
}

export default PourPowderFromTestube