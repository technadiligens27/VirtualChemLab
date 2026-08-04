import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./HessLiveDataPanel.css"

const HessLiveDataPanel = ({
  reactionNumber = 1,

  volumeOfSolution,
  solutionDensity,

  startingTemperature,
  currentTemperature,
  highestTemperature,

  massWithPowder,
  massAfterEmptying,
}) => {
  const panelRef = useRef(null)
  const arrowRef = useRef(null)

  const isPanelOpenRef = useRef(true)

  const [
    isPanelOpen,
    setIsPanelOpen,
  ] = useState(true)

  const massOfSolution =
    volumeOfSolution != null &&
    solutionDensity != null
      ? volumeOfSolution *
        solutionDensity
      : null

  const temperatureChange =
    startingTemperature != null &&
    highestTemperature != null
      ? highestTemperature -
        startingTemperature
      : null

  const massOfPowderUsed =
    massWithPowder != null &&
    massAfterEmptying != null
      ? massWithPowder -
        massAfterEmptying
      : null

  useLayoutEffect(() => {
    const panel = panelRef.current
    const arrow = arrowRef.current

    if (!panel || !arrow) return

    const getClosedPosition = () => {
      return (
        panel.offsetWidth -
        34
      )
    }

    gsap.set(panel, {
      x: getClosedPosition(),
    })

    gsap.set(arrow, {
      rotation: 180,
    })

    gsap.to(panel, {
      x: -60,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.inOut",
    })

    gsap.to(arrow, {
      rotation: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.inOut",
    })

    isPanelOpenRef.current = true

    setIsPanelOpen(true)

    const handleResize = () => {
      if (!isPanelOpenRef.current) {
        gsap.set(panel, {
          x: getClosedPosition(),
        })
      }
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
    }
  }, [])

  const handlePanelToggle = () => {
    const panel = panelRef.current
    const arrow = arrowRef.current

    if (!panel || !arrow) return

    const nextOpenState =
      !isPanelOpenRef.current

    isPanelOpenRef.current =
      nextOpenState

    setIsPanelOpen(
      nextOpenState
    )

    gsap.to(panel, {
      x: nextOpenState
        ? -60
        : panel.offsetWidth - 34,

      duration: 0.65,
      ease: "power3.inOut",
    })

    gsap.to(arrow, {
      rotation: nextOpenState
        ? 0
        : 180,

      duration: 0.65,
      ease: "power3.inOut",
    })
  }

  const getDisplayValue = (
    value,
    decimals,
    unit
  ) => {
    if (value == null) {
      return "TBD"
    }

    const numericValue =
      Number(value)

    if (
      Number.isNaN(
        numericValue
      )
    ) {
      return "TBD"
    }

    return `${numericValue.toFixed(
      decimals
    )} ${unit}`
  }

  const getCalculatedValue = (
    value,
    decimals,
    unit,
    showPositiveSign = false
  ) => {
    if (value == null) {
      return "TBD"
    }

    const numericValue =
      Number(value)

    if (
      Number.isNaN(
        numericValue
      )
    ) {
      return "TBD"
    }

    const positiveSign =
      showPositiveSign &&
      numericValue >= 0
        ? "+"
        : ""

    return `${positiveSign}${numericValue.toFixed(
      decimals
    )} ${unit}`
  }

  return (
    <div
      ref={panelRef}
      className="hess-live-data-panel"
    >
      <button
        type="button"
        className="hess-live-data-toggle"
        onClick={handlePanelToggle}
        aria-label={
          isPanelOpen
            ? "Close live data panel"
            : "Open live data panel"
        }
      >
        <span
          ref={arrowRef}
          className="hess-live-data-toggle-arrow"
        >
          ❯
        </span>
      </button>

      <div className="hess-live-data-inner">
        <div className="hess-live-data-header">
          <h1>
            Reaction {reactionNumber}
          </h1>

          <p>
            Live Data
          </p>
        </div>

        <div className="hess-live-data-content">
          <div className="hess-live-data-section">
            <div className="hess-live-data-section-title">
              <span className="hess-live-data-dot" />

              <h2>
                Solution
              </h2>
            </div>

            <div className="hess-live-data-divider" />

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Volume of HCl solution
                </p>
              </div>

              <div
                className={`hess-live-data-value ${
                  volumeOfSolution == null
                    ? "hess-live-data-value-pending"
                    : ""
                }`}
              >
                <p>
                  {getDisplayValue(
                    volumeOfSolution,
                    2,
                    "cm³"
                  )}
                </p>
              </div>
            </div>

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Mass of solution
                </p>

                <span>
                  {solutionDensity == null
                    ? "Density yet to be provided"
                    : `Density assumed ${Number(
                        solutionDensity
                      ).toFixed(
                        2
                      )} g cm⁻³`}
                </span>
              </div>

              <div
                className={`hess-live-data-value ${
                  massOfSolution == null
                    ? "hess-live-data-value-pending"
                    : ""
                }`}
              >
                <p>
                  {getCalculatedValue(
                    massOfSolution,
                    2,
                    "g"
                  )}
                </p>
              </div>
            </div>

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Starting temperature
                </p>
              </div>

              <div
                className={`hess-live-data-value ${
                  startingTemperature == null
                    ? "hess-live-data-value-pending"
                    : ""
                }`}
              >
                <p>
                  {getDisplayValue(
                    startingTemperature,
                    1,
                    "°C"
                  )}
                </p>
              </div>
            </div>

            {/* <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Current temperature
                </p>
              </div>

              <div
                className={`hess-live-data-value ${
                  currentTemperature == null
                    ? "hess-live-data-value-pending"
                    : "hess-live-data-value-live"
                }`}
              >
                <p>
                  {getDisplayValue(
                    currentTemperature,
                    1,
                    "°C"
                  )}
                </p>
              </div>
            </div> */}

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Highest temperature
                </p>
              </div>

              <div
                className={`hess-live-data-value ${
                  highestTemperature == null
                    ? "hess-live-data-value-pending"
                    : "hess-live-data-value-highest"
                }`}
              >
                <p>
                  {getDisplayValue(
                    highestTemperature,
                    1,
                    "°C"
                  )}
                </p>
              </div>
            </div>

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Temperature change
                </p>
              </div>

              <div
                className={`hess-live-data-value ${
                  temperatureChange == null
                    ? "hess-live-data-value-pending"
                    : "hess-live-data-value-complete"
                }`}
              >
                <p>
                  {getCalculatedValue(
                    temperatureChange,
                    1,
                    "°C",
                    true
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="hess-live-data-section hess-live-data-solid-section">
            <div className="hess-live-data-section-title">
              <span className="hess-live-data-dot" />

              <h2>
                Solid Transferred
              </h2>
            </div>

            <div className="hess-live-data-divider" />

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Test tube + K
                  <sub>2</sub>
                  CO
                  <sub>3</sub>
                </p>
              </div>

              <div
                className={`hess-live-data-value ${
                  massWithPowder == null
                    ? "hess-live-data-value-pending"
                    : ""
                }`}
              >
                <p>
                  {getDisplayValue(
                    massWithPowder,
                    2,
                    "g"
                  )}
                </p>
              </div>
            </div>

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Test tube after emptying
                </p>
              </div>

              <div
                className={`hess-live-data-value ${
                  massAfterEmptying == null
                    ? "hess-live-data-value-pending"
                    : ""
                }`}
              >
                <p>
                  {getDisplayValue(
                    massAfterEmptying,
                    2,
                    "g"
                  )}
                </p>
              </div>
            </div>

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Mass of K
                  <sub>2</sub>
                  CO
                  <sub>3</sub> used
                </p>
              </div>

              <div
                className={`hess-live-data-value ${
                  massOfPowderUsed == null
                    ? "hess-live-data-value-pending"
                    : "hess-live-data-value-complete"
                }`}
              >
                <p>
                  {getCalculatedValue(
                    massOfPowderUsed,
                    2,
                    "g"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hess-live-data-footer">
          <div className="hess-live-data-info-icon">
            i
          </div>

          <p>
            Values update automatically.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HessLiveDataPanel