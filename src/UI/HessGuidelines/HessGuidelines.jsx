import "./HessGuidelines.css"

const HessGuidelines = ({ guidelineData }) => {
  if (!guidelineData) return null

  const {
    title,
    description,
    implementationSteps = [],
    image,
    onButtonContinue
  } = guidelineData

  return (
    <div className="main-guidelines">
      <div className="hess-guideline">
        <div className="hess-guideline-inner">
          <div className="hess-left">
            <div className="hess-title-container">
              <h1>{title}</h1>
            </div>

            <p>{description}</p>

            <div className="hess-steps">
              <div className="hess-steps-title">
                <h2>Implementation</h2>
              </div>

              <div className="hess-inner-steps">
                {implementationSteps.map((step, index) => (
                  <div
                    className="hess-lesson-step"
                    key={index}
                  >
                    <img
                      src="./blue-tick.png"
                      alt=""
                    />

                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <button type="button" onClick={onButtonContinue} >
              Continue
            </button>
          </div>

          <div className="hess-right">
            <div className="hess-right-inner">
              <img
                src={image}
                alt={title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HessGuidelines