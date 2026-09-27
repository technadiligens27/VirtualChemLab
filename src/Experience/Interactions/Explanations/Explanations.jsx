import { useContext } from "react"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import "./Explanations.css"


const Explanations = ({
  text = "",

  top = null,
  right = null,
  bottom = null,
  left = null,

  width = "350px",
  height = "300px",
}) => {
  const {
    setIsExplanationOpen,
  } = useContext(
    MainGuidelineContext
  )


  const positionStyle = {
    top,
    right,
    bottom,
    left,
    width,
    height,
  }


  return (
    <div className="explanation-outer-container">
      <div
        className="explanation-container"
        style={positionStyle}
      >
        <div className="explanation-header">
          <h1>Explanation</h1>

          <img
            onClick={() => {
              setIsExplanationOpen(false)
            }}
            src="./cross.png"
            alt="Close"
          />
        </div>

        <div className="explanation-paragraph">
          <p>{text}</p>
        </div>

        <div className="explanation-btn-container">
          <button
            onClick={() => {
              setIsExplanationOpen(false)
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}


export default Explanations