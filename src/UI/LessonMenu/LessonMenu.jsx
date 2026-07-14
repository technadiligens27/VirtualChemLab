import { useContext, useEffect } from "react"
import "./LessonMenu.css"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const LessonMenu = () => {
  const {
    setIsMainGuideline,
    setSelectedLesson,
    setIsLessonStart,
    setShowLessonMenu,
    setLessonStep,
    setSelectedMainGuideline,
    setSafetyStep,
    labResetKey,
  } = useContext(MainGuidelineContext)

  const lessons = [
    {
      id: 1,
      name: "Salt Dissolving in Water",
    },
    {
      id: 6,
      name: "Acid Base Neutralization",
    },
    {
      id: 2,
      name: "Acid Indicator Test",
    },
    {
      id: 3,
      name: "Alkali Indicator Test",
    },
    {
      id: 4,
      name: "Starch-Iodine Test",
    },
    {
      id: 5,
      name: "Copper Sulfate Precipitation",
    },
  ]

  useEffect(() => {
    setIsMainGuideline(true)
  }, [setIsMainGuideline])

  const startLesson = (lessonId) => {
    setSelectedLesson(lessonId)
    setIsLessonStart(true)
    setShowLessonMenu(false)
    setSelectedMainGuideline(null)
    setLessonStep(1)

    // Skip completed safety instructions after the lab has been reset.
    // setSafetyStep(labResetKey > 0 ? 4 : 1)
  }

  return (
    <div className="main-guidelines">
      <div className="lesson-container">
        <h1>Select A Lesson</h1>

        <div className="lesson-btn-container">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => startLesson(lesson.id)}
            >
              {lesson.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LessonMenu