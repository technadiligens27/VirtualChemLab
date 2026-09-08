import {
  useContext,
  useEffect,
} from "react"

import * as THREE from "three"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const DeliveryTubeGasRise = ({
  loopCount = 3,
  animationSpeed = 1,
  startDelay = 2000,
}) => {
  const {
    deliveryAnimationActions,
  } = useContext(
    InteractionContext
  )

  const {
    deliveryTubeBungRef,
  } = useContext(
    ModelContext
  )

  const {
    setLessonStep,selectedLesson,lessonStep
  } = useContext(
    MainGuidelineContext
  )

  useEffect(() => {
    if (!deliveryAnimationActions) {
      return
    }

    // ==========================================
    // SHOW GAS BUBBLES
    // ==========================================

    if (
      deliveryTubeBungRef?.current
    ) {
      deliveryTubeBungRef.current.traverse(
        (child) => {
          const childName =
            child.name?.toLowerCase() ||
            ""

          if (
            childName.includes(
              "bubble"
            )
          ) {
            child.visible = true
          }
        }
      )
    }

    // ==========================================
    // GAS ANIMATION ACTIONS
    // ==========================================

    const actions = [
      deliveryAnimationActions.deliveryGas01,
      deliveryAnimationActions.deliveryGas02,
      deliveryAnimationActions.deliveryGas03,
    ].filter(Boolean)

    if (
      actions.length === 0
    ) {
      return
    }

    // ==========================================
    // TRACK FINISHED ACTIONS
    // ==========================================

    const finishedActions =
      new Set()

    const mixers =
      new Set(
        actions.map(
          (action) =>
            action.getMixer()
        )
      )

    const handleFinished = (
      event
    ) => {
      if (
        !actions.includes(
          event.action
        )
      ) {
        return
      }

      finishedActions.add(
        event.action
      )

      // ========================================
      // WAIT UNTIL ALL GAS ANIMATIONS FINISH
      // ========================================

      if (
        finishedActions.size !==
        actions.length
      ) {
        return
      }

      // ========================================
      // ALL ANIMATIONS FINISHED
      // ========================================
if(selectedLesson===13 && lessonStep ===28){
      setLessonStep(29)

}

    }

    // ==========================================
    // ADD FINISHED LISTENERS
    // ==========================================

    mixers.forEach(
      (mixer) => {
        mixer.addEventListener(
          "finished",
          handleFinished
        )
      }
    )

    // ==========================================
    // START AFTER DELAY
    // ==========================================

    const timeout =
      setTimeout(() => {
        actions.forEach(
          (action) => {
            action.reset()

            action.setLoop(
              THREE.LoopRepeat,
              loopCount
            )

            action.timeScale =
              animationSpeed

            action.clampWhenFinished =
              true

            action.paused =
              false

            action.play()
          }
        )
      }, startDelay)

    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {
      clearTimeout(
        timeout
      )

      mixers.forEach(
        (mixer) => {
          mixer.removeEventListener(
            "finished",
            handleFinished
          )
        }
      )

      actions.forEach(
        (action) => {
          action.stop()
        }
      )

      if (
        deliveryTubeBungRef?.current
      ) {
        deliveryTubeBungRef.current.traverse(
          (child) => {
            const childName =
              child.name?.toLowerCase() ||
              ""

            if (
              childName.includes(
                "bubble"
              )
            ) {
              child.visible =
                false
            }
          }
        )
      }
    }
  }, [
    deliveryAnimationActions,
    deliveryTubeBungRef,
    loopCount,
    animationSpeed,
    startDelay,
    setLessonStep,
  ])

  return null
}

export default DeliveryTubeGasRise