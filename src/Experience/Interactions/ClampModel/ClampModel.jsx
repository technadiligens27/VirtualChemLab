import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

import PourFromModel from "../Pouring/PourFromModel/PourFromModel"

import ChlorinationSeparatingFunnelColorChange from "../ChlorinationSeparatingFunnelColorChange/ChlorinationSeparatingFunnelColorChange"

const ClampModel = ({
  modelRef,

  modelScale = 1,
  clampScale = 1,

  modelXOffset = 0.5,
  modelYOffset = 0,

  clampYOffset = 0,

  hand,
}) => {
  const {
    buretteClampRef,
    seperatingFunnelRef,
    normalBeakerRef,
  } = useContext(ModelContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const {
    setSelectedRightHand,
    setSelectedLeftHand,
  } = useContext(
    InteractionContext
  )

  const [isPouring, setIsPouring] =
    useState(false)

  const originalModelTransformRef =
    useRef(null)

  const originalClampTransformRef =
    useRef(null)

  // Keep the latest lesson values available
  // inside the useLayoutEffect cleanup.
  const selectedLessonRef =
    useRef(selectedLesson)

  const lessonStepRef =
    useRef(lessonStep)

  useEffect(() => {
    selectedLessonRef.current =
      selectedLesson

    lessonStepRef.current =
      lessonStep
  }, [
    selectedLesson,
    lessonStep,
  ])

  // =============================================
  // LESSON 14.1
  // =============================================

  useEffect(() => {
    if (
      selectedLesson === 14.1 &&
      lessonStep === 36
    ) {
      setLessonStep(37)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  // =============================================
  // LESSON 13
  // =============================================

  useEffect(() => {
    if (
      selectedLesson === 13 &&
      lessonStep === 4
    ) {
      setLessonStep(5)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  // =============================================
  // REMOVE MODEL FROM HAND WHEN CLAMPED
  // =============================================

  useEffect(() => {
    if (hand === "left") {
      setSelectedLeftHand(null)
    }

    if (hand === "right") {
      setSelectedRightHand(null)
    }
  }, [
    hand,
    setSelectedLeftHand,
    setSelectedRightHand,
  ])

  // =============================================
  // POURING CONTROL
  // =============================================

  useEffect(() => {
    setIsPouring(false)

    if (
      selectedLesson !== 14.1 ||
      lessonStep !== 43
    ) {
      return
    }

    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        // Scroll down — start pouring.
        setIsPouring(true)
      } else if (event.deltaY < 0) {
        // Scroll up — stop pouring.
        setIsPouring(false)
      }
    }

    // Prevent the same scroll used for clamping
    // from immediately starting the pouring.
    const listenerDelay = setTimeout(() => {
      window.addEventListener(
        "wheel",
        handleWheel,
        {
          passive: true,
        }
      )
    }, 200)

    return () => {
      clearTimeout(listenerDelay)

      window.removeEventListener(
        "wheel",
        handleWheel
      )

      setIsPouring(false)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  // =============================================
  // CLAMP MODEL
  // =============================================

  useLayoutEffect(() => {
    const model = modelRef?.current
    const clamp =
      buretteClampRef?.current

    if (!model || !clamp) {
      return
    }

    const clampPosition =
      clamp.getObjectByName(
        "clamp-position"
      )

    if (!clampPosition) {
      console.log(
        "❌ clamp-position not found"
      )

      return
    }

    // Save the model's original transform.
    originalModelTransformRef.current = {
      parent: model.parent,
      position: model.position.clone(),
      rotation: model.rotation.clone(),
      scale: model.scale.clone(),
    }

    // Save the clamp's original transform.
    originalClampTransformRef.current = {
      position: clamp.position.clone(),
      scale: clamp.scale.clone(),
    }

    // Scale and vertically reposition
    // the clamp.
    clamp.scale.set(
      clampScale,
      clampScale,
      clampScale
    )

    clamp.position.y =
      originalClampTransformRef.current
        .position.y + clampYOffset

    clamp.updateMatrixWorld(true)

    // Attach the model to clamp-position.
    clampPosition.attach(model)

    model.position.set(
      modelXOffset,
      modelYOffset,
      0
    )

    model.rotation.set(0, 0, 0)

    model.scale.set(
      modelScale,
      modelScale,
      modelScale
    )

    model.updateMatrixWorld(true)

    // =============================================
    // UNCLAMP CLEANUP
    // =============================================

    return () => {
      const originalModel =
        originalModelTransformRef.current

      const originalClamp =
        originalClampTransformRef.current

      // Restore the attached model.
      if (originalModel?.parent) {
        originalModel.parent.add(model)

        model.position.copy(
          originalModel.position
        )

        model.rotation.copy(
          originalModel.rotation
        )

        model.scale.copy(
          originalModel.scale
        )

        model.updateMatrixWorld(true)
      }

      // Restore the clamp.
      if (originalClamp) {
        clamp.position.copy(
          originalClamp.position
        )

        clamp.scale.copy(
          originalClamp.scale
        )

        clamp.updateMatrixWorld(true)
      }

      // When the separating funnel is unclamped
      // during lesson 14.1 step 51, place it
      // into the right hand.
      const shouldMoveToRightHand =
        selectedLessonRef.current === 14.1 &&
        lessonStepRef.current === 51 &&
        model ===
          seperatingFunnelRef?.current &&
        originalModel?.parent

      if (shouldMoveToRightHand) {
        requestAnimationFrame(() => {
          setSelectedRightHand({
            hand: "right",

            name: "separating-funnel",

            ref: seperatingFunnelRef,

            originalParent:
              originalModel.parent,

            originalPosition:
              originalModel.position.clone(),

            originalRotation:
              originalModel.rotation.clone(),

            originalScale:
              originalModel.scale.clone(),
          })

          setLessonStep(52)
        })
      }
    }
  }, [
    modelRef,
    buretteClampRef,
    seperatingFunnelRef,
    modelScale,
    clampScale,
    modelXOffset,
    modelYOffset,
    clampYOffset,
    setSelectedRightHand,
    setLessonStep,
  ])

  return (
    <>
      {selectedLesson === 14.1 &&
        lessonStep === 43 && (
          <PourFromModel
            isPouring={isPouring}
            otherLiquidEndScale={0.3}
            otherModelRef={
              normalBeakerRef
            }
            modelRef={
              seperatingFunnelRef
            }
            modelLiquidEndScale={0.7}
          />
        )}

      {selectedLesson === 14.1 &&
        lessonStep === 44 && (
          <ChlorinationSeparatingFunnelColorChange
            modelRef={
              seperatingFunnelRef
            }
            upperLiquidColor="#F4D35E"
            bottomLiquidColor="#F4D35E"
            colorChangeDelay={0}
            liquidOpacity={0.35}
          />
        )}
    </>
  )
}

export default ClampModel