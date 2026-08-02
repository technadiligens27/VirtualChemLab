import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./HessReactionOneResults.css"

const HessReactionOneResults = ({
  initialMass = "",
  finalMass = "",
  startingTemperature = "",
  highestTemperature = "",
  onButtonContinue,
}) => {
  const resultsPanelRef = useRef(null)
  const arrowRef = useRef(null)

  const isResultsOpenRef = useRef(true)

  const [isResultsOpen, setIsResultsOpen] =
    useState(true)

  const [massWithSolid, setMassWithSolid] =
    useState(initialMass)

  const [massAfterEmptying, setMassAfterEmptying] =
    useState(finalMass)

  const [startTemperature, setStartTemperature] =
    useState(startingTemperature)

  const [highestTemp, setHighestTemp] =
    useState(highestTemperature)

  useLayoutEffect(() => {
    const resultsPanel =
      resultsPanelRef.current

    const arrow = arrowRef.current

    if (!resultsPanel || !arrow) return

    const getClosedPosition = () => {
      return -(
        window.innerWidth / 2 +
        resultsPanel.offsetWidth / 2
      )
    }

    gsap.set(resultsPanel, {
      x: getClosedPosition(),
    })

    gsap.set(arrow, {
      rotation: 0,
    })

    gsap.to(resultsPanel, {
      x: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.inOut",
    })

    gsap.to(arrow, {
      rotation: 180,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.inOut",
    })

    const handleResize = () => {
      if (isResultsOpenRef.current) return

      gsap.set(resultsPanel, {
        x: getClosedPosition(),
      })
    }

    window.addEventListener(
      "resize",
      handleResize
    )

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      )

      gsap.killTweensOf(resultsPanel)
      gsap.killTweensOf(arrow)
    }
  }, [])

  const getClosedPosition = () => {
    const resultsPanel =
      resultsPanelRef.current

    if (!resultsPanel) return 0

    return -(
      window.innerWidth / 2 +
      resultsPanel.offsetWidth / 2
    )
  }

  const animateResultsPanel = (
    shouldOpen,
    onAnimationComplete
  ) => {
    const resultsPanel =
      resultsPanelRef.current

    const arrow = arrowRef.current

    if (!resultsPanel || !arrow) return

    isResultsOpenRef.current = shouldOpen

    setIsResultsOpen(shouldOpen)

    gsap.killTweensOf(resultsPanel)
    gsap.killTweensOf(arrow)

    gsap.to(resultsPanel, {
      x: shouldOpen
        ? 0
        : getClosedPosition(),
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: onAnimationComplete,
    })

    gsap.to(arrow, {
      rotation: shouldOpen ? 180 : 0,
      duration: 0.8,
      ease: "power3.inOut",
    })
  }

  const handleResultsToggle = () => {
    const nextOpenState =
      !isResultsOpenRef.current

    animateResultsPanel(nextOpenState)
  }

  const handleContinue = () => {
    animateResultsPanel(false, () => {
      if (onButtonContinue) {
        onButtonContinue({
          massWithSolid:
            Number(massWithSolid),
          massAfterEmptying:
            Number(massAfterEmptying),
          massUsed:
            Number(massUsed),
          startingTemperature:
            Number(startTemperature),
          highestTemperature:
            Number(highestTemp),
          temperatureChange:
            Number(temperatureChange),
        })
      }
    })
  }

  const calculateDifference = (
    firstValue,
    secondValue
  ) => {
    const firstNumber =
      Number(firstValue)

    const secondNumber =
      Number(secondValue)

    if (
      Number.isNaN(firstNumber) ||
      Number.isNaN(secondNumber) ||
      firstValue === "" ||
      secondValue === ""
    ) {
      return ""
    }

    return (
      firstNumber - secondNumber
    ).toFixed(2)
  }

  const massUsed = calculateDifference(
    massWithSolid,
    massAfterEmptying
  )

  const temperatureChange =
    calculateDifference(
      highestTemp,
      startTemperature
    )

  const isTemperaturePositive =
    Number(temperatureChange) > 0

  const isFormComplete =
    massWithSolid !== "" &&
    massAfterEmptying !== "" &&
    startTemperature !== "" &&
    highestTemp !== "" &&
    Number(massUsed) > 0 &&
    isTemperaturePositive

  return (
    <div
      className={`reaction-results-overlay ${
        isResultsOpen
          ? "reaction-results-overlay-open"
          : "reaction-results-overlay-closed"
      }`}
    >
      <div
        className="reaction-results-panel"
        ref={resultsPanelRef}
      >
        <div className="reaction-results-header">
          <h1>What to do</h1>
        </div>

        <button
          className="reaction-results-side-button"
          onClick={handleResultsToggle}
          aria-label={
            isResultsOpen
              ? "Close results section"
              : "Open results section"
          }
        >
          <img
            ref={arrowRef}
            src="./side-arrow.png"
            alt=""
          />
        </button>

        <div className="reaction-results-inner">
          <div className="reaction-results-left">
            <div className="reaction-results-title">
              <h1>
                Step 14 — Complete the
                first results section
              </h1>

              <p>
                Complete the results table using
                the measurements recorded during
                Reaction 1.
              </p>
            </div>

            <div className="reaction-results-recall">
              <h2>Recall</h2>

              <p>
                The temperature change should be
                calculated as:
              </p>

              <div className="reaction-results-formula">
                <span>
                  ΔT<sub>1</sub>
                  {" = "}
                  T<sub>highest</sub>
                  {" − "}
                  T<sub>start</sub>
                </span>
              </div>

              <p className="reaction-results-positive">
                The temperature change should be
                positive.
              </p>
            </div>

            <div className="reaction-results-tip">
              <div className="reaction-results-tip-heading">
                <span>☼</span>

                <h2>Tip</h2>
              </div>

              <p>
                Record all values to two decimal
                places.
              </p>

              <p>
                The mass of potassium carbonate
                used is calculated by weighing
                by difference.
              </p>
            </div>

            <button
              className="reaction-results-continue"
              onClick={handleContinue}
              disabled={!isFormComplete}
            >
              Continue
            </button>
          </div>

          <div className="reaction-results-right">
            <div className="reaction-results-table-box">
              <div className="reaction-results-table-header">
                <h2>
                  Results Table — Reaction 1
                </h2>

                <span>⚗</span>
              </div>

              <div className="reaction-results-column-headings">
                <div>Measurement</div>
                <div>Symbol</div>
                <div>Value</div>
                <div>Unit</div>
              </div>

              <div className="reaction-results-table-row">
                <div className="reaction-results-measurement">
                  Mass of test tube with
                  potassium carbonate
                </div>

                <div className="reaction-results-symbol">
                  m<sub>1</sub>
                </div>

                <div className="reaction-results-value">
                  <input
                    type="number"
                    step="0.01"
                    value={massWithSolid}
                    onChange={(event) => {
                      setMassWithSolid(
                        event.target.value
                      )
                    }}
                    placeholder="0.00"
                  />
                </div>

                <div className="reaction-results-unit">
                  g
                </div>
              </div>

              <div className="reaction-results-table-row">
                <div className="reaction-results-measurement">
                  Mass of test tube after
                  emptying
                </div>

                <div className="reaction-results-symbol">
                  m<sub>2</sub>
                </div>

                <div className="reaction-results-value">
                  <input
                    type="number"
                    step="0.01"
                    value={massAfterEmptying}
                    onChange={(event) => {
                      setMassAfterEmptying(
                        event.target.value
                      )
                    }}
                    placeholder="0.00"
                  />
                </div>

                <div className="reaction-results-unit">
                  g
                </div>
              </div>

              <div className="reaction-results-table-row reaction-results-calculated-row">
                <div className="reaction-results-measurement">
                  Mass of potassium carbonate
                  used
                </div>

                <div className="reaction-results-symbol">
                  m<sub>used</sub>
                </div>

                <div className="reaction-results-value">
                  <input
                    type="text"
                    value={
                      massUsed || "0.00"
                    }
                    readOnly
                  />
                </div>

                <div className="reaction-results-unit">
                  g
                </div>
              </div>

              <div className="reaction-results-equation-row">
                <span>
                  m<sub>used</sub>
                  {" = "}
                  m<sub>1</sub>
                  {" − "}
                  m<sub>2</sub>
                </span>
              </div>

              <div className="reaction-results-table-row">
                <div className="reaction-results-measurement">
                  Starting temperature
                </div>

                <div className="reaction-results-symbol">
                  T<sub>start</sub>
                </div>

                <div className="reaction-results-value">
                  <input
                    type="number"
                    step="0.01"
                    value={startTemperature}
                    onChange={(event) => {
                      setStartTemperature(
                        event.target.value
                      )
                    }}
                    placeholder="0.00"
                  />
                </div>

                <div className="reaction-results-unit">
                  °C
                </div>
              </div>

              <div className="reaction-results-table-row">
                <div className="reaction-results-measurement">
                  Highest temperature
                </div>

                <div className="reaction-results-symbol">
                  T<sub>highest</sub>
                </div>

                <div className="reaction-results-value">
                  <input
                    type="number"
                    step="0.01"
                    value={highestTemp}
                    onChange={(event) => {
                      setHighestTemp(
                        event.target.value
                      )
                    }}
                    placeholder="0.00"
                  />
                </div>

                <div className="reaction-results-unit">
                  °C
                </div>
              </div>

              <div className="reaction-results-table-row reaction-results-final-row">
                <div className="reaction-results-measurement">
                  Temperature change
                </div>

                <div className="reaction-results-symbol">
                  ΔT<sub>1</sub>
                </div>

                <div className="reaction-results-value">
                  <input
                    className={
                      temperatureChange &&
                      !isTemperaturePositive
                        ? "reaction-results-invalid"
                        : ""
                    }
                    type="text"
                    value={
                      temperatureChange ||
                      "0.00"
                    }
                    readOnly
                  />
                </div>

                <div className="reaction-results-unit">
                  °C
                </div>
              </div>

              <div className="reaction-results-bottom-formula">
                <span>
                  ΔT<sub>1</sub>
                  {" = "}
                  T<sub>highest</sub>
                  {" − "}
                  T<sub>start</sub>
                </span>

                <p>
                  Temperature change should be
                  positive
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HessReactionOneResults