import "./EnthalpyLessonOverview.css"

const EnthalpyLessonOverview = ({onStartLesson}) => {
  return (
    <div className="reaction-one-overlay">
      <div className="reaction-one-container">
        {/* <div className="reaction-one-progress">
          <div className="reaction-one-progress-number">
            1 of 3
          </div>

          <div className="reaction-one-progress-dots">
            <span className="reaction-one-dot reaction-one-dot-active" />
            <span className="reaction-one-dot" />
            <span className="reaction-one-dot" />
          </div>
        </div> */}

        <div className="reaction-one-top-title">
          <h1>Reaction 1</h1>
        </div>

        <div className="reaction-one-content">
          <div className="reaction-one-main">
            <div className="reaction-one-heading">
              <p className="reaction-one-label">
                First Experimental Reaction
              </p>

              <h1>
                Potassium Carbonate with
                Hydrochloric Acid
              </h1>
            </div>

            <div className="reaction-one-type">
              <div className="reaction-one-fire-icon">
                ♨
              </div>

              <span>Exothermic Reaction</span>
            </div>

            <div className="reaction-one-equation">
              <div className="reaction-one-flask-icon">
                ⚗
              </div>

              <div className="reaction-one-equation-text">
                <span>
                  K<sub>2</sub>CO<sub>3</sub>(s)
                </span>

                <span>+</span>

                <span>
                  2HCl(aq)
                </span>

                <span className="reaction-one-arrow">
                  →
                </span>

                <span>
                  2KCl(aq)
                </span>

                <span>+</span>

                <span>
                  CO<sub>2</sub>(g)
                </span>

                <span>+</span>

                <span>
                  H<sub>2</sub>O(l)
                </span>
              </div>
            </div>

            <div className="reaction-one-notice">
              <div className="reaction-one-section-heading">
                <div className="reaction-one-eye-icon">
                  ◉
                </div>

                <h2>What You Should Notice</h2>

                <div className="reaction-one-heading-line" />
              </div>

              <div className="reaction-one-notice-list">
                <div className="reaction-one-notice-item">
                  <span className="reaction-one-check">
                    ✓
                  </span>

                  <p>
                    The temperature of the reaction
                    mixture rises.
                  </p>
                </div>

                <div className="reaction-one-notice-item">
                  <span className="reaction-one-check">
                    ✓
                  </span>

                  <p>
                    Carbon dioxide gas is produced.
                  </p>
                </div>

                <div className="reaction-one-notice-item">
                  <span className="reaction-one-check">
                    ✓
                  </span>

                  <p>
                    Heat is released to the
                    surroundings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="reaction-one-information">
            <div className="reaction-one-information-header">
              <div className="reaction-one-information-icon">
                i
              </div>

              <h2>What Happens</h2>
            </div>

            <div className="reaction-one-information-content">
              <p>
                Potassium carbonate reacts with
                hydrochloric acid.
              </p>

              <p>
                The reaction releases heat, causing
                the temperature inside the
                polystyrene cup to rise.
              </p>
            </div>
          </div>
        </div>

        <div className="reaction-one-footer">
          <div className="reaction-one-important">
            <div className="reaction-one-warning-icon">
              !
            </div>

            <p>
              <strong>Important:</strong>

              <span>
                Reaction 1 must produce a positive
                temperature change.
              </span>
            </p>
          </div>

          <button
            className="reaction-one-next-button"
            type="button"
            onClick={onStartLesson}
          >
            <span>Next</span>

            {/* <span className="reaction-one-next-arrow">
              ›
            </span> */}
          </button>
        </div>
{/* 
        <button
          className="reaction-one-side-button"
          type="button"
          onClick={onButtonContinue}
          aria-label="Continue to the next section"
        >
          »
        </button> */}
      </div>
    </div>
  )
}

export default EnthalpyLessonOverview