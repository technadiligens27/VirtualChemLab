import { useContext, useId } from "react"
import "./ConfirmResetLesson.css"
import { useResetLesson } from "../ResetLessonButton/ResetLessonButton"
import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext"

const ConfirmResetLesson = ({ onYesClick, onNoClick }) => {
  const questionId = useId()
  console.log("confirm-reset-lesson")  
  const resetLesson = useResetLesson()

  const {setShowConfirmAnotherLesson} = useContext(InteractionContext)

  return (
    <div
      className="confirm-reset-lesson"
      role="dialog"
      aria-labelledby={questionId}
    >
      <div className="confirm-reset-lesson__content">
        <div className="confirm-reset-lesson__icon">
          <img src="./info.webp" alt="" />
        </div>

        <p id={questionId} className="confirm-reset-lesson__question">
          Do you want to choose another lesson?
        </p>
      </div>

      <div className="confirm-reset-lesson__actions">
        <button
          type="button"
          className="confirm-reset-lesson__button confirm-reset-lesson__button--yes"
          onClick={()=>{resetLesson()}}
        >
          Yes
        </button>

        <button
          type="button"
          className="confirm-reset-lesson__button confirm-reset-lesson__button--no"
          onClick={()=>{setShowConfirmAnotherLesson(false)}}
        >
          No
        </button>
      </div>
    </div>
  )
}

export default ConfirmResetLesson