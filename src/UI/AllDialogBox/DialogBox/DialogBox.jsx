import "./DialogBox.css"

const DialogBox = ({ text }) => {
  return (
    <div className="dialog-box-container">
      <div className="dialog-icon-container">
        <img src="./info.png" alt="Information" />
      </div>

      <p className="dialog-box-text">
        {text}
      </p>
    </div>
  )
}

export default DialogBox