import "./HessGuidelines.css"

const HessGuidelines = ({
  onButton1Click,
  onButton2Click,
}) => {
  const step = 9
  const totalSteps = 34
  const progress = (step / totalSteps) * 100

  return (
    <div className="hess-guide-overlay">
      <div className="hess-guide-wrapper">
        <div className="hess-guide-topbar">
          <div className="hess-guide-brand">
            <span className="hess-guide-brand-icon">
              ⚗
            </span>

            <h1>
              HESS’S LAW <span>LAB</span>
            </h1>
          </div>

          <div className="hess-guide-progress-box">
            <p>
              <span>Step {step}</span> of {totalSteps}
            </p>

            <div className="hess-guide-progress-track">
              <div
                className="hess-guide-progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="hess-guide-panel">
          <div className="hess-guide-heading">
            <div className="hess-guide-step-box">
              {step}
            </div>

            <div className="hess-guide-heading-text">
              <h2>Prepare to stir</h2>

              <div className="hess-guide-heading-line" />
            </div>
          </div>

          <div className="hess-guide-content-grid">
            <div className="hess-guide-left">
              <p className="hess-guide-description">
                Pick up the stirring rod. The potassium
                carbonate must be added gradually while
                the acid is stirred continuously.
              </p>

              <div className="hess-guide-checklist">
                <div className="hess-guide-checklist-title">
                  <div className="hess-guide-checklist-icon">
                    ✓
                  </div>

                  <h3>Implementation</h3>
                </div>

                <div className="hess-guide-checklist-items">
                  <div className="hess-guide-check-item">
                    <div className="hess-guide-check-circle">
                      ✓
                    </div>

                    <p>Pick up the stirring rod.</p>
                  </div>

                  <div className="hess-guide-check-item">
                    <div className="hess-guide-check-circle">
                      ✓
                    </div>

                    <p>
                      Hold the test tube containing
                      potassium carbonate in the left hand.
                    </p>
                  </div>

                  <div className="hess-guide-check-item">
                    <div className="hess-guide-check-circle">
                      ✓
                    </div>

                    <p>
                      Hold the stirring rod in the right
                      hand.
                    </p>
                  </div>

                  <div className="hess-guide-check-item">
                    <div className="hess-guide-check-circle">
                      ✓
                    </div>

                    <p>
                      Add the potassium carbonate gradually.
                    </p>
                  </div>

                  <div className="hess-guide-check-item">
                    <div className="hess-guide-check-circle">
                      ✓
                    </div>

                    <p>
                      Keep stirring continuously while
                      adding the solid.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hess-guide-visual">
              <img
                src="/beakerWithThermometer.png"
                alt="Preparing to stir potassium carbonate with hydrochloric acid"
              />
            </div>

            <div className="hess-guide-hands">
              <div className="hess-guide-hands-title">
                <div className="hess-guide-hands-icon">
                  ✋
                </div>

                <h3>
                  Recommended
                  <br />
                  hand setup
                </h3>
              </div>

              <div className="hess-guide-hand-card">
                <div className="hess-guide-hand-img">
                  <img
                    src="beakerWithThermometer.png"
                    alt="Test tube"
                  />
                </div>

                <div className="hess-guide-hand-text">
                  <h4>Left hand:</h4>

                  <p>
                    Test tube containing potassium
                    carbonate
                  </p>
                </div>
              </div>

              <div className="hess-guide-hand-card">
                <div className="hess-guide-hand-img">
                  <img
                    src="beakerWithThermometer.png"
                    alt="Stirring rod"
                  />
                </div>

                <div className="hess-guide-hand-text">
                  <h4>Right hand:</h4>

                  <p>Stirring rod</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hess-guide-info-box">
            <div className="hess-guide-info-icon">
              !
            </div>

            <p>
              This setup allows the solid to be added
              slowly while stirring at the same time.
            </p>
          </div>

          <div className="hess-guide-footer">
            <button
              onClick={onButton1Click}
              className="hess-guide-btn hess-guide-back-btn"
            >
              <span>‹</span>
              Back
            </button>

            <div className="hess-guide-footer-info">
              <span>ⓘ</span>

              <p>
                Follow the recommended hand setup before
                proceeding.
              </p>
            </div>

            <button
              onClick={onButton2Click}
              className="hess-guide-btn hess-guide-next-btn"
            >
              Next
              <span>›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HessGuidelines