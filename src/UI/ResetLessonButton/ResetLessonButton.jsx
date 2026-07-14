import { useContext } from "react"

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
    funnelRef,
  } = useContext(ModelContext)

  const { resetInteractions } =
    useContext(InteractionContext)

  const { resetLessonGuidelines } =
    useContext(MainGuidelineContext)

  const { resetReactions } =
    useContext(ReactionContext)

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
    ]

    // Reset positions, rotations, scales and visibility.
    labModels.forEach((modelRef) => {
      if (modelRef.current) {
        resetModel(modelRef.current)
      }
    })

    // Reset context states.
    resetInteractions()
    resetReactions()
    resetLessonGuidelines()
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