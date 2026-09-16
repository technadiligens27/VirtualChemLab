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

  modelXOffset = 0.5,
  modelYOffset = 0,

  hand,
}) => {
  const {
    buretteClampRef,
    seperatingFunnelRef,
    normalBeakerRef,conicalBeakerRef02
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

  const [
    isPouring,
    setIsPouring,
  ] = useState(false)

  const originalModelTransformRef =
    useRef(null)

  // Latest lesson values for cleanup.
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

    if (
      selectedLesson === 14.1 &&
      lessonStep === 59
    ) {
      setLessonStep(60)
    }

    if (
      selectedLesson === 14.2 &&
      lessonStep === 80
    ) {
      setLessonStep(81)
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
      ![14.1,14.2].includes(selectedLesson) ||
      ![43, 61,81,84].includes(lessonStep)
    ) {
      return
    }

    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        setIsPouring(true)
      } else if (event.deltaY < 0) {
        setIsPouring(false)
      }
    }

    const listenerDelay =
      setTimeout(() => {
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
  // ATTACH MODEL TO CLAMP
  // =============================================

  useLayoutEffect(() => {
    const model =
      modelRef?.current

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

    // Save only the model transform.
    originalModelTransformRef.current = {
      parent: model.parent,

      position:
        model.position.clone(),

      rotation:
        model.rotation.clone(),

      scale:
        model.scale.clone(),
    }

    /*
     * Do not change the clamp position or scale.
     * PlaceClampInCenter owns the clamp transform.
     */

    clamp.updateMatrixWorld(true)
    clampPosition.updateMatrixWorld(true)

    // Attach the model to the clamp.
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

    // ===========================================
    // UNCLAMP CLEANUP
    // ===========================================

    return () => {
      const originalModel =
        originalModelTransformRef.current

      if (
        originalModel?.parent
      ) {
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

      /*
       * Do not restore the clamp position or
       * scale here. PlaceClampInCenter controls it.
       */

      const shouldMoveToRightHand = [14.1,14.2].includes(selectedLessonRef.current) && [51,70].includes(lessonStepRef.current) &&
        model === seperatingFunnelRef?.current &&  originalModel?.parent

      if (shouldMoveToRightHand) {
        requestAnimationFrame(() => {
          setSelectedRightHand({
            hand: "right",

            name:
              "separating-funnel",

            ref:
              seperatingFunnelRef,

            originalParent:
              originalModel.parent,

            originalPosition:
              originalModel.position.clone(),

            originalRotation:
              originalModel.rotation.clone(),

            originalScale:
              originalModel.scale.clone(),
          })

        })
      }

      originalModelTransformRef.current =
        null
    }
  }, [
    modelRef,
    buretteClampRef,
    seperatingFunnelRef,

    modelScale,
    modelXOffset,
    modelYOffset,

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
        lessonStep === 61 && (
          <PourFromModel
            isPouring={isPouring}
            otherLiquidEndScale={0.5}
            otherModelRef={
              normalBeakerRef
            }
            modelRef={
              seperatingFunnelRef
            }
            modelLiquidEndScale={0.7}
          />
        )}


      {selectedLesson === 14.2 &&
        lessonStep === 81 && (
          <PourFromModel
            isPouring={isPouring}
            otherLiquidEndScale={0.5}
            otherModelRef={
              normalBeakerRef
            }
            modelRef={
              seperatingFunnelRef
            }
            modelLiquidEndScale={0.7}
          />
        )}

      {selectedLesson === 14.2 &&
        lessonStep === 84 && (
          <PourFromModel
            isPouring={isPouring}
            otherLiquidEndScale={0.3}
            otherModelRef={
              conicalBeakerRef02
            }
            modelRef={
              seperatingFunnelRef
            }
            modelLiquidEndScale={0}
          />
        )}

      {selectedLesson === 14.1 &&
        [44, 62].includes(
          lessonStep
        ) && (
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

      {selectedLesson === 14.2 &&
        [68,69].includes(
          lessonStep
        ) && (
          <ChlorinationSeparatingFunnelColorChange
            modelRef={
              seperatingFunnelRef
            }
            upperLiquidColor="#F4D35E"
            bottomLiquidColor="#DCEFF7"
            colorChangeDelay={0}
            liquidOpacity={0.35}
          />
        )}



    </>
  )
}

export default ClampModel