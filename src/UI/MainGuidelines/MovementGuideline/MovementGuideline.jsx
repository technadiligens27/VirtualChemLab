import "./MovementGuideline.css"

const MovementGuideline = ({
  mainContent,
  onButton1Click,
  onButton2Click,
}) => {
  if (!mainContent) return null

  const {
    title,
    content,
    button1,
    button2,
    info,
    MainImg='./Arrow.png',
  } = mainContent


  return (
    <div className="main-guidelines">
      <div className="guideline-container">
        <div className="main-guidelines-title">
          <h1>{title}</h1>
        </div>

        <div className={"guideline-inner-container guideline-inner-container-row"}>
          <button className="main-guidelines-btn back-btn">Back</button>

          <div className="guideline-image-container arrow-img-container">
            <img src={MainImg} alt="Chemistry equipment" />
          </div>

          <div className="guideline-content-container">
            <p className="movement-content guideline-description">{content}</p>

            <div className="main-guidelines-btn-container movement-guidelines-btn-container">
              {button1 && (
                <button
                  onClick={onButton1Click}
                  className="main-guidelines-btn"
                >
                  {button1}
                </button>
              )}

              {button2 && (
                <button
                  onClick={onButton2Click}
                  className="main-guidelines-btn"
                >
                  {button2}
                </button>
              )}
            </div>
          </div>

          {info && (
            <div className="guide-info">
              {infoImg && (
                <div className="guide-info-img-container">
                  <img src={infoImg} alt="Information" />
                </div>
              )}

              <p>{info}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovementGuideline