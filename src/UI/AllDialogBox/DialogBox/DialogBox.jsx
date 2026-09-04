import "./DialogBox.css"

const DialogBox = ({
  text,

  button1Text = "Results",
  button2Text = "Continue",
  button3Text = "End Lesson",

  onbtnClick,
  onbtn2Click,
  onbtn3Click,
}) => {
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

      <div className="result-dialog-btn-container">

        {onbtnClick && (
          <button
            className="result-btn"
            onClick={onbtnClick}
          >
            {button1Text}
          </button>
        )}

        {onbtn2Click && (
          <button
            className="question-btn"
            onClick={onbtn2Click}
          >
            {button2Text}
          </button>
        )}

        {onbtn3Click && (
          <button
            className="dialog-third-btn"
            onClick={onbtn3Click}
          >
            {button3Text}
          </button>
        )}

      </div>

    </div>
  )
}

export default DialogBox