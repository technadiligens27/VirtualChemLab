import { useState } from "react"
import "./HessCalculationStep25.css"

const HessCalculationStep25 = ({
  massK2CO3 = 2.98,
  startingTemperature = 22.0,
  highestTemperature = 31.5,
  massOfSolution = 30,
  specificHeatCapacity = 4.2,

  onBack,
  onContinue,
}) => {
  const temperatureChange =
    highestTemperature -
    startingTemperature

  const correctQ =
    massOfSolution *
    specificHeatCapacity *
    temperatureChange

  const correctMoles =
    massK2CO3 / 138.2

  const correctDeltaH =
    -correctQ /
    (1000 * correctMoles)

  const [qAnswer, setQAnswer] =
    useState("")

  const [molesAnswer, setMolesAnswer] =
    useState("")

  const [deltaHAnswer, setDeltaHAnswer] =
    useState("")

  const [qSubmitted, setQSubmitted] =
    useState(false)

  const [
    molesSubmitted,
    setMolesSubmitted,
  ] = useState(false)

  const [
    deltaHSubmitted,
    setDeltaHSubmitted,
  ] = useState(false)

  const isClose = (
    value,
    correctValue,
    tolerance
  ) => {
    const number =
      Number(value)

    if (Number.isNaN(number)) {
      return false
    }

    return (
      Math.abs(
        number -
        correctValue
      ) <= tolerance
    )
  }

  const qCorrect =
    isClose(
      qAnswer,
      correctQ,
      1
    )

  const molesCorrect =
    isClose(
      molesAnswer,
      correctMoles,
      0.0001
    )

  const deltaHCorrect =
    isClose(
      deltaHAnswer,
      correctDeltaH,
      0.5
    )

  return (
    <div className="hess25-overlay">

      <div className="hess25-page">

        {/* ==============================
            HEADER
        ============================== */}

        <div className="hess25-header">


          <div className="hess25-header-title">

            <h1>
              Reaction 1 — Calculate q and ΔH₁
            </h1>

          </div>

        </div>


        {/* ==============================
            MAIN CONTENT
        ============================== */}

        <div className="hess25-main">

          {/* ==============================
              RECORDED VALUES
          ============================== */}

          <div className="hess25-recorded-card">

            <h2>
              Your recorded values
            </h2>

            <div className="hess25-recorded-list">

              <div className="hess25-recorded-row">

                <span>
                  Mass of K₂CO₃ used
                </span>

                <strong>
                  {massK2CO3.toFixed(2)} g
                </strong>

              </div>


              <div className="hess25-recorded-row">

                <span>
                  Starting temperature
                </span>

                <strong>
                  {startingTemperature.toFixed(
                    1
                  )} °C
                </strong>

              </div>


              <div className="hess25-recorded-row">

                <span>
                  Highest temperature
                </span>

                <strong>
                  {highestTemperature.toFixed(
                    1
                  )} °C
                </strong>

              </div>


              <div className="hess25-recorded-row">

                <span>
                  ΔT
                </span>

                <strong>
                  +
                  {temperatureChange.toFixed(
                    1
                  )} °C
                </strong>

              </div>

            </div>


            <div className="hess25-recorded-divider" />


            <div className="hess25-recorded-row">

              <span>
                Mass of solution, m
              </span>

              <strong>
                {massOfSolution} g
              </strong>

            </div>


            <div className="hess25-recorded-row">

              <span>
                Specific heat capacity, c
              </span>

              <strong>
                {specificHeatCapacity} J g⁻¹ °C⁻¹
              </strong>

            </div>

          </div>


          {/* ==============================
              CALCULATIONS
          ============================== */}

          <div className="hess25-calculations">

            {/* ==============================
                CALCULATE Q
            ============================== */}

            <div className="hess25-task-card">

              <div className="hess25-task-heading">

                <div className="hess25-task-number">
                  1
                </div>

                <h2>
                  Calculate q
                </h2>

              </div>


              <div className="hess25-formula">
                q = mcΔT
              </div>


              <div className="hess25-answer-row">

                <label>
                  Enter q (J):
                </label>

                <input
                  type="number"
                  value={qAnswer}
                  onChange={(event) => {
                    setQAnswer(
                      event.target.value
                    )

                    setQSubmitted(
                      false
                    )
                  }}
                />

                <button
                  type="button"
                  onClick={() => {
                    setQSubmitted(
                      true
                    )
                  }}
                >
                  Submit
                </button>

              </div>


              {qSubmitted && (
                <div
                  className={
                    qCorrect
                      ? "hess25-feedback hess25-feedback-correct"
                      : "hess25-feedback hess25-feedback-wrong"
                  }
                >

                  {qCorrect ? (
                    <>
                      ✓ Correct! The solution gained{" "}
                      {correctQ.toFixed(0)} J.
                      The temperature increased,
                      so Reaction 1 is exothermic.
                      Therefore the reaction energy
                      has a negative sign.
                    </>
                  ) : (
                    <>
                      Try again. Use
                      {" "}
                      q = 30 × 4.2 ×{" "}
                      {temperatureChange.toFixed(
                        1
                      )}.
                    </>
                  )}

                </div>
              )}

            </div>


            {/* ==============================
                CALCULATE MOLES
            ============================== */}

            <div
              className={`hess25-task-card ${
                !qCorrect
                  ? "hess25-task-disabled"
                  : ""
              }`}
            >

              <div className="hess25-task-heading">

                <div className="hess25-task-number">
                  2
                </div>

                <h2>
                  Calculate n(K₂CO₃)
                </h2>

              </div>


              <div className="hess25-formula">

                n(K₂CO₃)
                {" = "}

                <span className="hess25-fraction">

                  <span>
                    mass used
                  </span>

                  <span>
                    138.2
                  </span>

                </span>

              </div>


              <div className="hess25-answer-row">

                <label>
                  Enter n (mol):
                </label>

                <input
                  type="number"
                  step="0.0001"
                  disabled={!qCorrect}
                  value={
                    molesAnswer
                  }
                  onChange={(event) => {

                    setMolesAnswer(
                      event.target.value
                    )

                    setMolesSubmitted(
                      false
                    )
                  }}
                />

                <button
                  type="button"
                  disabled={!qCorrect}
                  onClick={() => {
                    setMolesSubmitted(
                      true
                    )
                  }}
                >
                  Submit
                </button>

              </div>


              {molesSubmitted && (
                <div
                  className={
                    molesCorrect
                      ? "hess25-feedback hess25-feedback-correct"
                      : "hess25-feedback hess25-feedback-wrong"
                  }
                >

                  {molesCorrect ? (
                    <>
                      ✓ Correct!
                      {" "}
                      n(K₂CO₃) ≈{" "}
                      {correctMoles.toFixed(
                        4
                      )} mol.
                    </>
                  ) : (
                    <>
                      Try again. Divide the mass
                      of K₂CO₃ used by 138.2.
                    </>
                  )}

                </div>
              )}

            </div>

          </div>

        </div>


        {/* ==============================
            CALCULATE DELTA H
        ============================== */}

        <div
          className={`hess25-delta-card ${
            !molesCorrect
              ? "hess25-task-disabled"
              : ""
          }`}
        >

          <div className="hess25-task-heading">

            <div className="hess25-task-number">
              3
            </div>

            <h2>
              Calculate ΔH₁
            </h2>

          </div>


          <div className="hess25-delta-content">

            <div className="hess25-formula hess25-delta-formula">

              ΔH₁
              {" = "}

              <span className="hess25-fraction">

                <span>
                  −q
                </span>

                <span>
                  1000n
                </span>

              </span>

            </div>


            <div className="hess25-answer-row hess25-delta-answer">

              <label>
                Enter ΔH₁ (kJ mol⁻¹):
              </label>

              <input
                type="number"
                step="0.1"
                disabled={
                  !molesCorrect
                }
                value={
                  deltaHAnswer
                }
                onChange={(event) => {

                  setDeltaHAnswer(
                    event.target.value
                  )

                  setDeltaHSubmitted(
                    false
                  )
                }}
              />

              <button
                type="button"
                disabled={
                  !molesCorrect
                }
                onClick={() => {
                  setDeltaHSubmitted(
                    true
                  )
                }}
              >
                Submit
              </button>

            </div>


            {deltaHSubmitted && (
              <div
                className={
                  deltaHCorrect
                    ? "hess25-feedback hess25-feedback-correct"
                    : "hess25-feedback hess25-feedback-wrong"
                }
              >

                {deltaHCorrect ? (
                  <>
                    ✓ Correct! ΔH₁ ≈{" "}
                    {correctDeltaH.toFixed(
                      1
                    )} kJ mol⁻¹.
                  </>
                ) : (
                  <>
                    Check the sign and remember
                    to convert joules to
                    kilojoules.
                  </>
                )}

              </div>
            )}

          </div>

        </div>


        {/* ==============================
            NAVIGATION
        ============================== */}

        <div className="hess25-navigation">

          {onBack && (
            <button
              type="button"
              className="hess25-back-button"
              onClick={onBack}
            >
              ‹ Back
            </button>
          )}


          <div className="hess25-navigation-spacer" />


          {onContinue && (
            <button
              type="button"
              className="hess25-next-button"
              disabled={
                !deltaHCorrect
              }
              onClick={
                onContinue
              }
            >
              Next ›
            </button>
          )}

        </div>

      </div>

    </div>
  )
}

export default HessCalculationStep25