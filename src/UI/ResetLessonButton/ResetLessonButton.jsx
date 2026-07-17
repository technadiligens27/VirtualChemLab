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
    funnelRef,mainDropperRef
  } = useContext(ModelContext)

  const { resetInteractions } =
    useContext(InteractionContext)

  const { resetLessonGuidelines,labResetKey} =
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
      mainDropperRef
    ]

    /*
    * First stop PouringMode, StirMode,
    * selected hands and all other interactions.
    */
    resetInteractions()
    resetReactions()
    resetLessonGuidelines()

    /*
    * Wait until React has removed/stopped the
    * interaction components before resetting
    * the Three.js model transforms.
    */
    requestAnimationFrame(() => {
      labModels.forEach((modelRef) => {
        if (modelRef.current) {
          resetModel(modelRef.current)
        }
      })
    })
  }

  useEffect(()=>{
    console.log('labResetKey:',labResetKey)
  },[labResetKey])
  
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