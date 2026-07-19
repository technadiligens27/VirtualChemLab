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
      imgPath:'./SaltDissolve.png',
      text:'Mix Salt into Water to see how crystals break down and form a clear solution',
      number:1
    },
    {
      id: 6,
      name: "Acid Base Neutralization",
    },
    {
      id: 2,
      name: "Acid Indicator Test",
    },
    // {
    //   id: 3,
    //   name: "Alkali Indicator Test",
    // },
    // {
    //   id: 4,
    //   name: "Starch-Iodine Test",
    // },
    // {
    //   id: 5,
    //   name: "Copper Sulfate Precipitation",
    // },
    // {
    //   id:7,
    //   name:'Protein Identification – Biuret Test'
    // }
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
        <div className="select-lesson-container">
          <h1>SELECT A LESSON</h1>
          <p>Select a lesson from the given list and follow the steps accordingly</p>
        </div>
          <div className="lesson-inner-container">
            <div className="lesson-btn-container">
              {lessons.map((lesson) => (
                <div className="lesson-btn"
                  key={lesson.id}
                  onClick={() => startLesson(lesson.id)}
                >
                  <div className="number-container">{lesson.number}</div>
                  <img src={lesson.imgPath}/>
                 <p className="lesson-name">{lesson.name}</p> 
                 <div className="divider"> </div>
                 <p className="lesson-text">{lesson.text}</p>
                </div>
              ))}
            </div>
          </div>

      </div>
    </div>
  )
}

export default LessonMenu