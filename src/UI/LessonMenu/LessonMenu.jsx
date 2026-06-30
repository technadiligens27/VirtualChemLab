import { useContext, useEffect } from "react"
import "./LessonMenu.css"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const LessonMenu = () => {

    console.log('lessonMenu')
  const { setIsMainGuideline,selectedLesson,setSelectedLesson,
    isLessonStart,setIsLessonStart,setShowLessonMenu,lessonStep,
    setLessonStep,setSelectedMainGuideline} = useContext(MainGuidelineContext)

  const lessons = [
    {
      id: 1,
      name: "Salt Dissolving in Water",
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

  return (
    <div className="main-guidelines">
      <div className="lesson-container">
        <h1>Select A Lesson</h1>

        <div className="lesson-btn-container">
          {lessons.map((lesson) => (
            <button onClick={()=>{setSelectedLesson(lesson.id);setIsLessonStart(true);
            setShowLessonMenu(false);setSelectedMainGuideline(null);setLessonStep(1)}} key={lesson.id}>
              {lesson.name}
            </button> 
          ))}
        </div>               
      </div>
    </div>
  )
}

export default LessonMenu