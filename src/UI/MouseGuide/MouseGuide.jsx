import { useContext, useEffect } from "react"
import "./MouseGuide.css"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const MouseGuide = ({ onButton1Click }) => {

  const {isMainGuideline,setIsMainGuideline} = useContext(MainGuidelineContext)

  useEffect(()=>{
    setIsMainGuideline(false)
  },[isMainGuideline])

  return (
    <div className="mouse-guide" onClick={onButton1Click}>
      <div className="mouse-img-container">
        <img src="./MouseIcon.png" alt="Mouse icon" />
      </div>

      <div className="mouse-content-container">
        <p className="mouse-content">
          {"Click anywhere to start looking around"}
        </p>
      </div>
    </div>
  )
}

export default MouseGuide