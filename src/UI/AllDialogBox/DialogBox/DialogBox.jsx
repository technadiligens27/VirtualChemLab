import { useContext } from "react"
import "./DialogBox.css"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";
import {resetModel, saveModelStartState} from "../../../Experience/resetModels/resetModels.jsx"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext.jsx";

const DialogBox = ({
  text,
  onbtnClick,
  onbtn2Click
}) => {

  const {showEnthalyResultOne} = useContext(InteractionContext);
  const {    normalBeakerRef,
    conicalBeakerRef,
    roundBeakerRef,
    graduatedBeakerRef,
    spoonRef,
    saltRef,
    redLitmusRef,
    blueLitmusRef,
    testube01Ref,
    testube02Ref,
    testube03Ref,
    filterPaperRef,
    filterFoldedPaperRef, 
    funnelRef,
    mainDropperRef,
    digitalBalanceRef,
    mainPolystereneRef,
    mainBuiretteRef} = useContext(ModelContext)

  const {selectedLesson,setSelectedLesson,setLessonStep} = useContext(MainGuidelineContext)

  const labModels= [
    normalBeakerRef,
    conicalBeakerRef,
    roundBeakerRef,
    graduatedBeakerRef,
    spoonRef,
    saltRef,
    redLitmusRef,
    blueLitmusRef,
    testube01Ref,
    testube02Ref,
    testube03Ref,
    filterPaperRef,
    filterFoldedPaperRef, 
    funnelRef,
    mainDropperRef,
    digitalBalanceRef,
    mainPolystereneRef,
    mainBuiretteRef]

  return (
    <div className="dialog-box-container">
      <div className="dialog-box-inner">
        <div className="dialog-icon-container">
          <img
            src="./info.png"
            alt="Information"
          />
        </div>

        <p className="dialog-box-text">
          {text}
        </p>
      </div>

      {
        !showEnthalyResultOne ? (
          onbtnClick && (
            <button className="result-btn" onClick={onbtnClick}>
              Results
            </button>
          )
        ) : (
          onbtn2Click && (
            <button
              className="question-btn"
              onClick={() => {
                labModels.forEach((modelRef) => {
                  if (modelRef?.current) {
                    resetModel(modelRef.current)
                  }
                })

                setSelectedLesson(9)
                setLessonStep(2)
              }}
            >
              Continue (Reaction 02)
            </button>
          )
        )
      }

      
      
    </div>
  )
}

export default DialogBox