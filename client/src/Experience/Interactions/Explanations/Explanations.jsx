import {
  useContext,
  useLayoutEffect,
  useState,
  useRef,
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

  // Compact screen positioning
  compactTop = null,
  compactLeft = null,

}) => {

  const {
    setIsExplanationOpen,
  } = useContext(
    MainGuidelineContext
  )

  const explanationRef = useRef(null)

  const paragraphRef = useRef(null)

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
  // LAB CONTAINER RESIZE
  // =================================

  useLayoutEffect(() => {

    const labContainer =
      explanationRef.current?.closest(
        ".lab-view"
      )

    const handleResize = () => {

      const labWidth =
        labContainer?.clientWidth ??
        window.innerWidth

      setIsCompactScreen(
        labWidth <= 1024
      )

    }

    handleResize()

    const resizeObserver =
      new ResizeObserver(handleResize)

    if (labContainer) {

      resizeObserver.observe(
        labContainer
      )

    }

    window.addEventListener(
      "resize",
      handleResize
    )

    return () => {

      resizeObserver.disconnect()

      window.removeEventListener(
        "resize",
        handleResize
      )

    }

  }, [])


  // =================================
  // RESET SCROLL WHEN PAGE CHANGES
  // =================================

  useLayoutEffect(() => {

    if (paragraphRef.current) {

      paragraphRef.current.scrollTop = 0

    }

  }, [currentPage])


  // =================================
  // POSITION
  // =================================

  const positionStyle = {

    top:
      isCompactScreen &&
      compactTop !== null
        ? compactTop
        : top,

    right,

    bottom,

    left:
      isCompactScreen &&
      compactLeft !== null
        ? compactLeft
        : left,

  }


  // =================================
  // CHECK SECOND PAGE
  // =================================

  const hasText02 =
    text02 !== null &&
    text02 !== undefined &&
    text02 !== ""


  // =================================
  // CLOSE EXPLANATION
  // =================================

  const handleClose = () => {

    setIsExplanationOpen(false)

  }


  // =================================
  // RENDER
  // =================================

  return (

    <div
      ref={explanationRef}
      className="explanation-outer-container"
    >

      <div
        className="explanation-container"
        style={positionStyle}
      >

        {/* =================================
            HEADER
        ================================= */}

        <div className="explanation-header">

          <h1>
            Explanation
          </h1>

          <img
            onClick={handleClose}
            src="./cross.webp"
            alt="Close"
          />

        </div>


        {/* =================================
            TEXT AREA
        ================================= */}

        <div
          ref={paragraphRef}
          className="explanation-paragraph-container"
        >

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
              className="
                explanation-paragraph
                explanation-slide-in
              "
            >

              <p>
                {text02}
              </p>

            </div>

          )}

        </div>


        {/* =================================
            BUTTONS
        ================================= */}

        <div className="explanation-btn-container">

          <button
            type="button"
            onClick={handleClose}
          >

            Continue

          </button>


          {hasText02 &&
            currentPage === 1 && (

              <button
                type="button"
                onClick={() => {

                  setCurrentPage(2)

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