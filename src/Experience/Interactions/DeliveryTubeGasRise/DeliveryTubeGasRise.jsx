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
  startDelay = 3000,
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
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  // ==========================================
  // FIND AND SHOW / HIDE GAS BUBBLE MESHES
  // ==========================================

  const setGasBubblesVisible = (
    shouldBeVisible
  ) => {
    const deliveryTubeBung =
      deliveryTubeBungRef?.current

    if (!deliveryTubeBung) {
      console.warn(
        "DeliveryTubeGasRise: deliveryTubeBungRef is not ready"
      )

      return
    }

    const foundBubbleNames = []

    deliveryTubeBung.traverse(
      (child) => {
        const childName =
          child.name?.toLowerCase() || ""

        const isGasBubble =
          childName.includes("gas") ||
          childName.includes("bubble")

        if (!isGasBubble) {
          return
        }

        child.visible =
          shouldBeVisible

        child.updateMatrixWorld(true)

        foundBubbleNames.push(
          child.name
        )
      }
    )

    console.log(
      "DeliveryTubeGasRise bubble objects:",
      foundBubbleNames
    )

    if (foundBubbleNames.length === 0) {
      console.warn(
        'DeliveryTubeGasRise: No child containing "gas" or "bubble" was found.'
      )
    }
  }

  // ==========================================
  // SHOW BUBBLES EVEN IF ANIMATION ACTIONS
  // HAVE NOT LOADED YET
  // ==========================================

  useEffect(() => {
    setGasBubblesVisible(true)

    return () => {
      setGasBubblesVisible(false)
    }
  }, [
    deliveryTubeBungRef,
  ])

  // ==========================================
  // PLAY DELIVERY TUBE GAS ANIMATIONS
  // ==========================================

  useEffect(() => {
    const actions = [
      deliveryAnimationActions?.deliveryGas01,
      deliveryAnimationActions?.deliveryGas02,
      deliveryAnimationActions?.deliveryGas03,
    ].filter(Boolean)

    console.log(
      "DeliveryTubeGasRise actions:",
      actions
    )

    if (actions.length === 0) {
      console.warn(
        "DeliveryTubeGasRise: Gas animation actions are not ready."
      )

      return
    }

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

      console.log(
        "Finished gas animation:",
        event.action.getClip().name
      )

      if (
        finishedActions.size !==
        actions.length
      ) {
        return
      }

      console.log(
        "All delivery gas animations finished"
      )

      if (
        selectedLesson === 13 &&
        lessonStep === 28
      ) {
        setLessonStep(29)
      }
    }

    mixers.forEach(
      (mixer) => {
        mixer.addEventListener(
          "finished",
          handleFinished
        )
      }
    )

    const timeout = setTimeout(
      () => {
        console.log(
          "Starting delivery tube gas animation"
        )

        // Ensure animation does not leave meshes hidden.
        setGasBubblesVisible(true)

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

            action.enabled =
              true

            action.paused =
              false

            action.play()

            console.log(
              "Playing gas action:",
              action.getClip().name
            )
          }
        )
      },
      startDelay
    )

    return () => {
      clearTimeout(timeout)

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
    }
  }, [
    deliveryAnimationActions,
    loopCount,
    animationSpeed,
    startDelay,
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  return null
}

export default DeliveryTubeGasRise