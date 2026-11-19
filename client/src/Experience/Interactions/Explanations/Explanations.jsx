
import {
  useContext,
  useEffect,
  useState,
} from "react"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import "./Explanations.css"


const Explanations = ({
  text = "",
  text02 = "",

  top = null,
  right = null,
  bottom = null,
  left = null,

  width = "350px",
  height = "300px",

  // Compact screen parameters (<= 1024px)
  compactTop = null,
  compactLeft = null,
  compactWidth = null,
  compactHeight = null,
}) => {
  const {
    setIsExplanationOpen,
  } = useContext(
    MainGuidelineContext
  )

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1)

  const [
    isCompactScreen,
    setIsCompactScreen,
  ] = useState(
    () => window.innerWidth <= 1024
  )


  // =================================
  // SCREEN RESIZE
  // =================================

  useEffect(() => {
    const handleResize = () => {
      setIsCompactScreen(
        window.innerWidth <= 1024
      )
    }

    window.addEventListener(
      "resize",
      handleResize
    )

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      )
    }
  }, [])


  // =================================
  // POSITION
  // =================================

  const positionStyle = {
    top: isCompactScreen && compactTop !== null
      ? compactTop
      : top,

    right,
    bottom,

    left: isCompactScreen && compactLeft !== null
      ? compactLeft
      : left,

    width: isCompactScreen && compactWidth !== null
      ? compactWidth
      : width,

    height: isCompactScreen && compactHeight !== null
      ? compactHeight
      : height,
  }


  const hasText02 =
    text02 !== null &&
    text02 !== undefined &&
    text02 !== ""


  return (
    <div className="explanation-outer-container">
      <div
        className="explanation-container"
        style={positionStyle}
      >
        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="explanation-header">
          <h1>
            Explanation
          </h1>

          <img
            onClick={() => {
              setIsExplanationOpen(
                false
              )
            }}
            src="./cross.webp"
            alt="Close"
          />
        </div>


        {/* ========================= */}
        {/* TEXT */}
        {/* ========================= */}

        <div className="explanation-paragraph-container">
          {currentPage === 1 && (
            <div
              key="text01"
              className="explanation-paragraph"
            >
              <p>
                {text}
              </p>
            </div>
          )}


          {currentPage === 2 && (
            <div
              key="text02"
              className="explanation-paragraph explanation-slide-in"
            >
              <p>
                {text02}
              </p>
            </div>
          )}
        </div>


        {/* ========================= */}
        {/* BUTTONS */}
        {/* ========================= */}

        <div className="explanation-btn-container">
          <button
            onClick={() => {
              setIsExplanationOpen(
                false
              )
            }}
          >
            Continue
          </button>


          {hasText02 &&
            currentPage === 1 && (
              <button
                onClick={() => {
                  setCurrentPage(
                    2
                  )
                }}
              >
                Next
              </button>
            )}
        </div>
      </div>
    </div>
  )
}


export default Explanations
