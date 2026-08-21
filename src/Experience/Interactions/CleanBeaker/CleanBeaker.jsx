import { useContext, useEffect } from "react"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

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
    if (!modelRef?.current) return

    modelRef.current.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (childName.includes("liquid")) {
        // child.scale.set(0, 0, 0)
        child.visible = false

        child.updateMatrixWorld(true)

        console.log(
          "✅ Liquid cleaned:",
          child.name
        )
      }
    })

    if (
      selectedLesson === 11.1 &&
      lessonStep === 54
    ) {
      setLessonStep(55)
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