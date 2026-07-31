import "./HessReactionResult.css"

const HessReactionResult = ({ onButtonContinue }) => {
  const initialTestTubeMass = 24.70
  const finalTestTubeMass = 21.72

  const potassiumCarbonateMass = (
    initialTestTubeMass - finalTestTubeMass
  ).toFixed(2)

  const startingTemperature = 24.5
  const highestTemperature = 31.8

  const temperatureChange = (
    highestTemperature - startingTemperature
  ).toFixed(1)

  return (
    <div className="lesson-details-overlay">
    <div className="main-reaction-results">
      <div className="reaction-results">
        <div className="reaction-results-header">
          <h1>Step 14 – Results: Reaction 1</h1>
        </div>

        <div className="reaction-results-inner">
          <div className="reaction-results-title">
            <h1>Complete the First Results Section</h1>

            <p>
              Enter your recorded values in the table below.
              The temperature change for Reaction 1 is calculated
              automatically.
            </p>
          </div>



          <div className="reaction-results-content">
            <div className="reaction-results-left">
              <div className="reaction-results-table">
                <div className="reaction-table-header">
                  <p>Measurement</p>
                  <p>Your Value</p>
                  <p>Unit</p>
                </div>

                <div className="reaction-table-row">
                  <div className="reaction-measurement">
                    <div className="reaction-row-icon">
                      🧪
                    </div>

                    <p>
                      Mass of test tube with potassium
                      carbonate
                    </p>
                  </div>

                  <div className="reaction-value-box">
                    {initialTestTubeMass.toFixed(2)}
                  </div>

                  <p className="reaction-unit">g</p>
                </div>

                <div className="reaction-table-row">
                  <div className="reaction-measurement">
                    <div className="reaction-row-icon">
                      🧪
                    </div>

                    <p>
                      Mass of test tube after emptying
                    </p>
                  </div>

                  <div className="reaction-value-box">
                    {finalTestTubeMass.toFixed(2)}
                  </div>

                  <p className="reaction-unit">g</p>
                </div>

                <div className="reaction-table-row">
                  <div className="reaction-measurement">
                    <div className="reaction-row-icon">
                      ⚖
                    </div>

                    <div>
                      <p className="reaction-important-text">
                        Mass of potassium carbonate used
                      </p>

                      <span>
                        Initial mass − Final mass
                      </span>
                    </div>
                  </div>

                  <div className="reaction-value-box">
                    {potassiumCarbonateMass}
                  </div>

                  <p className="reaction-unit">g</p>
                </div>

                <div className="reaction-table-row">
                  <div className="reaction-measurement">
                    <div className="reaction-row-icon">
                      🌡
                    </div>

                    <p>
                      Starting temperature
                      {" "}
                      (T<sub>start</sub>)
                    </p>
                  </div>

                  <div className="reaction-value-box">
                    {startingTemperature.toFixed(1)}
                  </div>

                  <p className="reaction-unit">°C</p>
                </div>

                <div className="reaction-table-row">
                  <div className="reaction-measurement">
                    <div className="reaction-row-icon">
                      🌡
                    </div>

                    <p>
                      Highest temperature
                      {" "}
                      (T<sub>highest</sub>)
                    </p>
                  </div>

                  <div className="reaction-value-box">
                    {highestTemperature.toFixed(1)}
                  </div>

                  <p className="reaction-unit">°C</p>
                </div>

                <div className="reaction-table-row reaction-final-row">
                  <div className="reaction-measurement">
                    <div className="reaction-row-icon">
                      △
                    </div>

                    <div>
                      <p className="reaction-important-text">
                        Temperature change
                        {" "}
                        (ΔT<sub>1</sub>)
                      </p>

                      <span>
                        ΔT<sub>1</sub> =
                        T<sub>highest</sub> −
                        T<sub>start</sub>
                      </span>
                    </div>
                  </div>

                  <div className="reaction-value-box reaction-final-value">
                    {temperatureChange}
                  </div>

                  <p className="reaction-unit reaction-final-unit">
                    °C
                  </p>
                </div>
              </div>
            </div>

            <div className="reaction-results-right">
                          <div className="reaction-formula-banner">
            <div className="reaction-formula-icon">
              💡
            </div>

            <p>
              ΔT<sub>1</sub> = T<sub>highest</sub> −
              T<sub>start</sub>
            </p>

            <span>
              This value should be positive.
            </span>
          </div>
              <div className="reaction-information-box">
                <div className="reaction-information-title">
                  <h2>
                    About ΔT<sub>1</sub>
                  </h2>

                  <span>ⓘ</span>
                </div>

                <p>
                  The temperature change is the difference
                  between the highest temperature recorded
                  and the starting temperature.
                </p>

                <div className="reaction-information-divider" />

                <h3>Formula:</h3>

                <div className="reaction-side-formula">
                  ΔT<sub>1</sub> =
                  T<sub>highest</sub> −
                  T<sub>start</sub>
                </div>
              </div>

              <div className="reaction-reminder-box">
                <div className="reaction-reminder-title">
                  <span>★</span>
                  <h2>Remember</h2>
                </div>

                <p>
                  Reaction 1 is exothermic, so
                  ΔT<sub>1</sub> should be a positive value.
                </p>
              </div>
            </div>
          </div>

          <button
            className="reaction-results-button"
            onClick={onButtonContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
        </div>
  )
}

export default HessReactionResult