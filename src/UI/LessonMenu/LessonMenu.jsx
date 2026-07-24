import { useContext, useEffect, useState } from "react"
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
    showLessonMenu
  } = useContext(MainGuidelineContext)

  useEffect(()=>{
    setShowLessonMenu(true)
  },[showLessonMenu])

  const [page, setPage] = useState(0)
  const [animationClass, setAnimationClass] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  const lessons = [
    // {
    //   id: 1,
    //   name: "Salt Dissolving in Water",
    //   imgPath: "./SaltDissolve.png",
    //   text: "Mix salt into water to see how crystals break down and form a clear solution.",
    //   number: 1,
    //   divider: "",
    // },
    //         {
    //   id: 5,
    //   name: "Copper Sulfate Precipitation",
    //   imgPath: "./CopperSulphateTest.png",
    //   text: "Combine two solutions and observe the formation of a solid precipitate.",
    //   number: 2,
    //   divider: "blue",
    // },
    // {
    //   id: 2,
    //   name: "Acid Indicator Test",
    //   imgPath: "./IndicatorSolution.png",
    //   text: "Add a testing solution or paper to an acid and observe the color change to confirm its presence.",
    //   number: 3,
    //   divider: "purple",
    // },
    // {
    //   id: 6,
    //   name: "Acid Base Neutralization",
    //   imgPath: "./AcidBaseLesson.png",
    //   text: "Combine an acid and a base to create a neutral reaction, forming salt and water.",
    //   number: 4,
    //   divider: "green",
    // },



    // {
    //   id: 4,
    //   name: "Starch-Iodine Test",
    //   imgPath: "./StarchIodine.png",
    //   text: "Add iodine solution to a sample and observe the color change when starch is present.",
    //   number: 5,
    //   divider: "blue",
    // },
    // {
    //   id: 7,
    //   name: "Protein Identification",
    //   imgPath: "./ProteinTest.png",
    //   text: "Add Biuret reagent to a protein sample and observe the purple color change.",
    //   number: 6,
    //   divider: "purple",
    // },
    //     {
    //   id: 3,
    //   name: "Alkali Indicator Test",
    //   imgPath: "./AlkaliTest.png",
    //   text: "Use an indicator to test an alkali and observe the resulting color change.",
    //   number: 7,
    //   divider: "purple",
    // },

            {
      id: 8,
      name: "Enthalpy Change Using Hess’s Law",
      imgPath: "./AlkaliTest.png",
      text: "Measure temperature changes in two reactions, calculate their molar enthalpy changes, and use Hess’s Law to find the enthalpy change for potassium hydrogencarbonate decomposition.",
      number: 8,
      divider: "purple",
    },


  ]

  const lessonsPerPage = 3
  const totalPages = Math.ceil(lessons.length / lessonsPerPage)

  const visibleLessons = lessons.slice(
    page * lessonsPerPage,
    page * lessonsPerPage + lessonsPerPage
  )

  useEffect(() => {
    setIsMainGuideline(true)
  }, [setIsMainGuideline])

  const startLesson = (lessonId) => {
    setSelectedLesson(lessonId)
    setIsLessonStart(true)
    setShowLessonMenu(false)
    setSelectedMainGuideline(null)
    setLessonStep(1)
  }

  const changePage = (newPage) => {
    if (
      isAnimating ||
      newPage < 0 ||
      newPage >= totalPages ||
      newPage === page
    ) {
      return
    }

    const goingForward = newPage > page

    setIsAnimating(true)

    setAnimationClass(
      goingForward ? "slide-out-left" : "slide-out-right"
    )

    setTimeout(() => {
      setPage(newPage)

      setAnimationClass(
        goingForward ? "slide-in-right" : "slide-in-left"
      )

      setTimeout(() => {
        setAnimationClass("")
        setIsAnimating(false)
      }, 350)
    }, 300)
  }

  return (
    <div className="main-guidelines">
      <div className="lesson-container">
        <div className="select-lesson-container">
          <h1>SELECT A LESSON</h1>

          <p>
            Select a lesson from the given list and follow the steps accordingly
          </p>
        </div>

        <div className="lesson-inner-container">
          <div className={`lesson-btn-container ${animationClass}`}>
            {visibleLessons.map((lesson) => (
              <div
                className="lesson-btn"
                key={lesson.id}
                onClick={() => startLesson(lesson.id)}
              >
                <div className="number-container">
                  <p className="number">{lesson.number}</p>
                </div>

                <img
                  src={lesson.imgPath}
                  alt={lesson.name}
                />

                <p className="lesson-name">
                  {lesson.name}
                </p>

                <div
                  className={`divider ${lesson.divider}`}
                ></div>

                <p className="lesson-text">
                  {lesson.text}
                </p>
              </div>
            ))}
          </div>

          {page > 0 && (
            <div
              className="arrow-left"
              onClick={() => changePage(page - 1)}
            >
              <img
                src="./left-arrow.png"
                alt="Previous lessons"
              />
            </div>
          )}

          {page < totalPages - 1 && (
            <div
              className="arrow-right"
              onClick={() => changePage(page + 1)}
            >
              <img
                src="./right-arrow.png"
                alt="Next lessons"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LessonMenu