import {
  useContext,
} from "react"

import {
  ModelContext,
} from "../../Contexts/ModelContext/ModelContext"

import {
  InteractionContext,
} from "../../Contexts/InteractionContext/InteractionContext"

import {
  MainGuidelineContext,
} from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  ReactionContext,
} from "../../Contexts/ReactionContext/ReactionContext"

import {
  resetModel,
} from "../../Experience/resetModels/resetModels.jsx"

import "./ResetLessonButton.css"

// =====================================================
// RESET LESSON HOOK
// =====================================================

export const useResetLesson = () => {
  const {
    normalBeakerRef,
    conicalBeakerRef,
    roundBeakerRef,
    graduatedBeakerRef,

    spoonRef,
    saltRef,

    redLitmusRef,
    blueLitmusRef,

    testube01Ref,
    testube02Ref,
    testube03Ref,

    filterPaperRef,
    filterFoldedPaperRef,

    funnelRef,

    mainDropperRef,
    dropperAnimationAction,

    mainPolystereneRef,

    digitalBalanceRef,

    mainBuiretteRef,
    mainThermometerRef
  } = useContext(ModelContext)

  const {
    resetInteractions,
  } = useContext(
    InteractionContext
  )

  const {
    resetLessonGuidelines,
  } = useContext(
    MainGuidelineContext
  )

  const {
    resetReactions,
  } = useContext(
    ReactionContext
  )

  // =====================================================
  // RESET DROPPER ANIMATION
  // =====================================================

  const resetDropperAnimation = () => {
    if (!dropperAnimationAction) {
      return
    }

    // Remove final-frame clamp
    dropperAnimationAction.stop()

    // Return animation to beginning
    dropperAnimationAction.reset()

    dropperAnimationAction.time = 0

    // Prepare animation for
    // scroll-controlled usage again
    dropperAnimationAction.enabled =
      true

    dropperAnimationAction.clampWhenFinished =
      true

    dropperAnimationAction.paused =
      true

    dropperAnimationAction.setEffectiveWeight(
      1
    )

    dropperAnimationAction.setEffectiveTimeScale(
      1
    )

    // Action needs to be active
    // for frame 0 to apply
    dropperAnimationAction.play()

    const mixer =
      dropperAnimationAction.getMixer()

    mixer.update(0)
  }

  // =====================================================
  // RESET LESSON
  // =====================================================

  const resetLesson = () => {
    const labModels = [
      normalBeakerRef,

      conicalBeakerRef,

      roundBeakerRef,

      graduatedBeakerRef,

      spoonRef,

      saltRef,

      redLitmusRef,

      blueLitmusRef,

      testube01Ref,

      testube02Ref,

      testube03Ref,

      filterPaperRef,

      filterFoldedPaperRef,

      funnelRef,

      mainDropperRef,

      digitalBalanceRef,

      mainPolystereneRef,

      mainBuiretteRef,
      mainThermometerRef
    ]

    // Reset interaction states
    // such as Litmus Mode,
    // Pour Mode, etc.
    resetInteractions()

    // Reset reaction states
    resetReactions()

    // Reset lesson / guideline states
    resetLessonGuidelines()

    // Reset dropper animation
    resetDropperAnimation()

    // Wait until React state
    // resets have been applied
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Reset every 3D model
        labModels.forEach(
          (modelRef) => {
            if (
              modelRef?.current
            ) {
              resetModel(
                modelRef.current
              )
            }
          }
        )

        // Force dropper animation
        // back to frame 0
        if (
          dropperAnimationAction
        ) {
          dropperAnimationAction.time =
            0

          dropperAnimationAction
            .getMixer()
            .update(0)
        }
      })
    })
  }

  return resetLesson
}

// =====================================================
// RESET LESSON BUTTON
// =====================================================

const ResetLessonButton = () => {
  const resetLesson = useResetLesson()
  return (
    <button
      className="reset-btn"
      onClick={resetLesson}
    >
      Choose Another Lesson
    </button>
  )
}

export default ResetLessonButton