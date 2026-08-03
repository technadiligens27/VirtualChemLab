import "./DialogBox.css"

const DialogBox = ({
  text,
  onbtnClick,
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

      {onbtnClick && (
        <button onClick={onbtnClick}>
          Results
        </button>
      )}
    </div>
  )
}

export default DialogBox