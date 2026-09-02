import {
  useEffect,
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

  selectedLesson,
  lessonStep,

  autoShowConditions = [],

  // How long the panel stays open
  // after an automatic show
  autoDelay = 3000,
}) => {
  const panelRef = useRef(null)
  const arrowRef = useRef(null)

  const autoCloseTimeoutRef =
    useRef(null)

  const isPanelOpenRef =
    useRef(true)

  const [
    isPanelOpen,
    setIsPanelOpen,
  ] = useState(true)

  // ==========================================
  // CALCULATED VALUES
  // ==========================================

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

  // ==========================================
  // GET CLOSED POSITION
  // ==========================================

  const getClosedPosition = () => {
    const panel = panelRef.current

    if (!panel) return 0

    return panel.offsetWidth - 34
  }

  // ==========================================
  // OPEN PANEL
  // ==========================================

  const openPanel = () => {
    const panel = panelRef.current
    const arrow = arrowRef.current

    if (!panel || !arrow) return

    isPanelOpenRef.current = true
    setIsPanelOpen(true)

    gsap.to(panel, {
      x: -60,
      duration: 0.65,
      ease: "power3.inOut",
    })

    gsap.to(arrow, {
      rotation: 0,
      duration: 0.65,
      ease: "power3.inOut",
    })
  }

  // ==========================================
  // CLOSE PANEL
  // ==========================================

  const closePanel = () => {
    const panel = panelRef.current
    const arrow = arrowRef.current

    if (!panel || !arrow) return

    isPanelOpenRef.current = false
    setIsPanelOpen(false)

    gsap.to(panel, {
      x: getClosedPosition(),
      duration: 0.65,
      ease: "power3.inOut",
    })

    gsap.to(arrow, {
      rotation: 180,
      duration: 0.65,
      ease: "power3.inOut",
    })
  }

  // ==========================================
  // INITIAL PANEL ANIMATION
  // ==========================================

  useLayoutEffect(() => {
    const panel = panelRef.current
    const arrow = arrowRef.current

    if (!panel || !arrow) return

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
      if (
        !isPanelOpenRef.current
      ) {
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

  // ==========================================
  // AUTO SHOW
  // ==========================================

  useEffect(() => {
    const shouldAutoShow =
      autoShowConditions.some(
        (condition) =>
          condition.selectedLesson ===
            selectedLesson &&
          condition.lessonStep ===
            lessonStep
      )

    if (!shouldAutoShow) return

    // Clear previous automatic timer
    if (
      autoCloseTimeoutRef.current
    ) {
      clearTimeout(
        autoCloseTimeoutRef.current
      )
    }

    // Open panel automatically
    openPanel()

    // Close automatically after delay
    autoCloseTimeoutRef.current =
      setTimeout(() => {
        closePanel()

        autoCloseTimeoutRef.current =
          null
      }, autoDelay)

    return () => {
      if (
        autoCloseTimeoutRef.current
      ) {
        clearTimeout(
          autoCloseTimeoutRef.current
        )

        autoCloseTimeoutRef.current =
          null
      }
    }
  }, [
    selectedLesson,
    lessonStep,
    autoShowConditions,
    autoDelay,
  ])

  // ==========================================
  // CLEANUP
  // ==========================================

  useEffect(() => {
    return () => {
      if (
        autoCloseTimeoutRef.current
      ) {
        clearTimeout(
          autoCloseTimeoutRef.current
        )
      }
    }
  }, [])

  // ==========================================
  // MANUAL TOGGLE
  // ==========================================

  const handlePanelToggle = () => {
    if (
      autoCloseTimeoutRef.current
    ) {
      clearTimeout(
        autoCloseTimeoutRef.current
      )

      autoCloseTimeoutRef.current =
        null
    }

    if (
      isPanelOpenRef.current
    ) {
      closePanel()
    } else {
      openPanel()
    }
  }

  // ==========================================
  // DISPLAY VALUE
  // ==========================================

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

  // ==========================================
  // CALCULATED VALUE
  // ==========================================

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

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div
      ref={panelRef}
      className="hess-live-data-panel"
    >
      <button
        type="button"
        className="hess-live-data-toggle"
        onClick={
          handlePanelToggle
        }
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
            Reaction{" "}
            {reactionNumber}
          </h1>

          <p>
            Live Data
          </p>
        </div>

        <div className="hess-live-data-content">

          {/* ======================================
              SOLUTION
          ====================================== */}

          <div className="hess-live-data-section">

            <div className="hess-live-data-section-title">
              <span className="hess-live-data-dot" />

              <h2>
                Solution
              </h2>
            </div>

            <div className="hess-live-data-divider" />

            {/* Volume */}

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Volume of HCl
                  solution
                </p>
              </div>

              <div
                className={`hess-live-data-value ${
                  volumeOfSolution ==
                  null
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

            {/* Mass */}

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Mass of solution
                </p>

                <span>
                  {solutionDensity ==
                  null
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
                  massOfSolution ==
                  null
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

            {/* Starting Temperature */}

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Starting
                  temperature
                </p>
              </div>

              <div
                className={`hess-live-data-value ${
                  startingTemperature ==
                  null
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

            {/* Highest Temperature */}

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Highest
                  temperature
                </p>
              </div>

              <div
                className={`hess-live-data-value ${
                  highestTemperature ==
                  null
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

            {/* Temperature Change */}

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Temperature change
                </p>
              </div>

              <div
                className={`hess-live-data-value ${
                  temperatureChange ==
                  null
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

          {/* ======================================
              SOLID TRANSFERRED
          ====================================== */}

          <div className="hess-live-data-section hess-live-data-solid-section">

            <div className="hess-live-data-section-title">
              <span className="hess-live-data-dot" />

              <h2>
                Solid Transferred
              </h2>
            </div>

            <div className="hess-live-data-divider" />

            {/* Test Tube + Powder */}

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
                  massWithPowder ==
                  null
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

            {/* Test Tube After Emptying */}

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Test tube after
                  emptying
                </p>
              </div>

              <div
                className={`hess-live-data-value ${
                  massAfterEmptying ==
                  null
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

            {/* Powder Used */}

            <div className="hess-live-data-row">
              <div className="hess-live-data-label">
                <p>
                  Mass of K
                  <sub>2</sub>
                  CO
                  <sub>3</sub>{" "}
                  used
                </p>
              </div>

              <div
                className={`hess-live-data-value ${
                  massOfPowderUsed ==
                  null
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

        {/* ======================================
            FOOTER
        ====================================== */}

        <div className="hess-live-data-footer">
          <div className="hess-live-data-info-icon">
            i
          </div>

          <p>
            Values update
            automatically.
          </p>
        </div>

      </div>
    </div>
  )
}

export default HessLiveDataPanel
