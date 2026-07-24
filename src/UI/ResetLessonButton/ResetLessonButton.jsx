import { useContext, useEffect } from "react"

import { ModelContext } from "../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ReactionContext } from "../../Contexts/ReactionContext/ReactionContext"

import { resetModel } from "../../Experience/resetModels/resetModels.jsx"

import "./ResetLessonButton.css"

const ResetLessonButton = () => {
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
    funnelRef,mainDropperRef,
    dropperAnimationAction,mainPolystereneRef
  } = useContext(ModelContext)

  const { resetInteractions } =
    useContext(InteractionContext)

  const { resetLessonGuidelines,labResetKey} =
    useContext(MainGuidelineContext)

  const { resetReactions } =
    useContext(ReactionContext)

      const resetDropperAnimation = () => {
  if (!dropperAnimationAction) return

  // Remove the final-frame clamp
  dropperAnimationAction.stop()

  // Return the action time to the beginning
  dropperAnimationAction.reset()
  dropperAnimationAction.time = 0

  // Prepare it for scroll-controlled animation again
  dropperAnimationAction.enabled = true
  dropperAnimationAction.clampWhenFinished = true
  dropperAnimationAction.paused = true

  dropperAnimationAction.setEffectiveWeight(1)
  dropperAnimationAction.setEffectiveTimeScale(1)

  // The action must be active for its first frame to be applied
  dropperAnimationAction.play()

  // Immediately apply frame 0
  const mixer = dropperAnimationAction.getMixer()
  mixer.update(0)
}

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

    mainPolystereneRef
  ]

  // This turns isLitmusMode off
  resetInteractions()

  resetReactions()
  resetLessonGuidelines()
  resetDropperAnimation()


  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      labModels.forEach((modelRef) => {
        if (modelRef.current) {
          resetModel(modelRef.current)
        }
      })

      if (dropperAnimationAction) {
        dropperAnimationAction.time = 0
        dropperAnimationAction
          .getMixer()
          .update(0)
      }
    })
  })
}
  
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