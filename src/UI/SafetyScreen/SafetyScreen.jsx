import "./SafetyScreen.css"

const SafetyScreen = ({
  safetyData,
  onBack,
  onContinue,
}) => {
  if (!safetyData) return null

  const {
    topTitle = "Safety First",
    title = "Safety Instructions",
    description = [],
    illustration,
    instructions = [],
    importantTitle = "Your safety is important.",
    importantText =
      "Follow these instructions carefully at all times.",
    backButtonText = "Back",
    continueButtonText = "Continue",
  } = safetyData

  return (
    <div className="safety-overlay">
      <div className="safety-container">
        <div className="safety-top-title">
          <h1>{topTitle}</h1>
        </div>

        <div className="safety-content">
          <div className="safety-left-section">
            <div className="safety-heading">
              <h2>{title}</h2>

              <div className="safety-description">
                {description.map(
                  (paragraph, index) => (
                    <p
                      key={`${paragraph}-${index}`}
                    >
                      {paragraph}
                    </p>
                  )
                )}
              </div>
            </div>

            <div className="safety-illustration-card">
              <div className="safety-illustration-glow" />

              {illustration?.gogglesImage && (
                <img
                  className="safety-goggles-image"
                  src={illustration.gogglesImage}
                  alt="Laboratory safety goggles"
                />
              )}

              {illustration?.flaskImage && (
                <img
                  className="safety-flask-image"
                  src={illustration.flaskImage}
                  alt="Conical flask"
                />
              )}

              <div className="safety-shield">
                <span>✓</span>
              </div>

              <span className="safety-sparkle safety-sparkle-one">
                ✦
              </span>

              <span className="safety-sparkle safety-sparkle-two">
                ✦
              </span>
            </div>
          </div>

          <div className="safety-instruction-list">
            {instructions.map(
              (instruction, index) => (
                <div
                  className="safety-instruction-card"
                  key={instruction.id || index}
                >
                  <div
                    className={`safety-instruction-icon safety-instruction-icon-${
                      instruction.theme ||
                      "purple"
                    }`}
                  >
                    {instruction.image ? (
                      <img
                        src={instruction.image}
                        alt=""
                      />
                    ) : (
                      <span>
                        {instruction.icon}
                      </span>
                    )}
                  </div>

                  <div className="safety-instruction-information">
                    <h3>
                      {instruction.title}
                    </h3>

                    <p>
                      {instruction.description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="safety-important">
          <div className="safety-important-icon">
            <span>✓</span>
          </div>

          <div className="safety-important-text">
            <strong>{importantTitle}</strong>

            <p>{importantText}</p>
          </div>

          <div className="safety-important-decoration">
            <span>⚗</span>
            <span>△</span>
            <span>▯</span>
          </div>
        </div>

        <div className="safety-footer">
          {onBack && (
            <button
              className="safety-back-button"
              type="button"
              onClick={onBack}
            >
              <span className="safety-back-arrow">
                ←
              </span>

              <span>{backButtonText}</span>
            </button>
          )}

          {onContinue && (
            <button
              className="safety-continue-button"
              type="button"
              onClick={onContinue}
            >
              <span>{continueButtonText}</span>

              <span className="safety-continue-arrow">
                →
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SafetyScreen