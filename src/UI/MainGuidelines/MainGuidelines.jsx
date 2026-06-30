import "./MainGuidelines.css"

const MainGuidelines = ({ mainContent,onButton1Click, onButton2Click }) => {
  if (!mainContent) return null

  const { title, content, button1, button2 } = mainContent

  return (
    <div className="main-guidelines">

      <div className="guideline-container">
        <div className="main-guidelines-title">
           <h1>{title}</h1>
        </div>

        <div className="guideline-inner-container">
          <p>{content}</p>
        </div>

      <div className="main-guidelines-btn-container">
        {button1 && (
          <button onClick={onButton1Click} className="main-guidelines-btn">
            {button1}
          </button>
        )}

        {button2 && (
          <button className="main-guidelines-btn">
            {button2}
          </button>
        )}
      </div>
    </div>

    </div>

  )
}

export default MainGuidelines