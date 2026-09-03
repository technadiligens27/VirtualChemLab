import "./DialogBox.css"

const DialogBox = ({
  text,

  button1Text = "Results",
  button2Text = "Continue",

  onbtnClick,
  onbtn2Click,
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

      </div>

    </div>
  )
}

export default DialogBox