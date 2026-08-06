import { useContext } from "react"
import "./DialogBox.css"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const DialogBox = ({
  text,
  onbtnClick,
  onbtn2Click
}) => {

  const {showEnthalyResultOne} = useContext(InteractionContext)

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
            <button className="question-btn" onClick={onbtnClick}>
              Continue (Reaction 02)
            </button>
          )
        )
      }

      
      
    </div>
  )
}

export default DialogBox