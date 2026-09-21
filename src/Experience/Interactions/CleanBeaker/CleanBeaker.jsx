import {
  useContext,
  useEffect,
} from "react"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const CleanBeaker = ({
  modelRef,
  onDone,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  useEffect(() => {
    const model =
      modelRef?.current

    if (!model) return

    model.traverse((child) => {
      // Do NOT hide the main model itself.
      if (child === model) return

      const childName =
        child.name?.toLowerCase() || ""

      // Hide every child of the model.
      child.visible = false

      // Liquid children are also emptied.
      if (childName.includes("liquid")) {
        child.scale.set(
          child.scale.x,
          0,
          child.scale.z
        )
      }

      child.updateMatrixWorld(true)
    })

    if (
      selectedLesson === 11.1 &&
      lessonStep === 54
    ) {
      setLessonStep(55)
    }

    if (
      selectedLesson === 12.2 &&
      lessonStep === 87
    ) {
      setLessonStep(88)
    }

    if (
      selectedLesson === 14.3 &&
      lessonStep === 106.2
    ) {
      setLessonStep(106.3)
    }

    onDone?.()
  }, [
    modelRef,
    selectedLesson,
    lessonStep,
    setLessonStep,
    onDone,
  ])

  return null
}

export default CleanBeaker