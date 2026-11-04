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

  // How long panel stays open
  // after automatically showing
  autoDelay = 2000,
}) => {
  // ==========================================
  // REFS
  // ==========================================

  const panelRef = useRef(null)

  const arrowRef = useRef(null)

  const autoCloseTimeoutRef =
    useRef(null)

  // ==========================================
  // PANEL STATE
  // START CLOSED
  // ==========================================

  const isPanelOpenRef =
    useRef(false)

  const [
    isPanelOpen,
    setIsPanelOpen,
  ] = useState(false)

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
  // AUTO SHOW CONDITION
  // ==========================================

  const shouldAutoShow =
    autoShowConditions.some(
      (condition) =>
        condition.selectedLesson ===
          selectedLesson &&
        condition.lessonStep ===
          lessonStep
    )

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
  // INITIAL PANEL POSITION
  // START CLOSED
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

    isPanelOpenRef.current =
      false

    setIsPanelOpen(false)

    // ========================================
    // RESIZE
    // ========================================

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
    // Only run when the current
    // lesson + step matches
    if (!shouldAutoShow) {
      return
    }

    // Clear previous timer
    if (
      autoCloseTimeoutRef.current
    ) {
      clearTimeout(
        autoCloseTimeoutRef.current
      )

      autoCloseTimeoutRef.current =
        null
    }

    // ========================================
    // OPEN
    // ========================================

    openPanel()

    // ========================================
    // AUTO CLOSE
    // ========================================

    autoCloseTimeoutRef.current =
      setTimeout(() => {
        closePanel()

        autoCloseTimeoutRef.current =
          null
      }, autoDelay)

    // ========================================
    // CLEANUP
    // ========================================

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
    shouldAutoShow,
    autoDelay,
  ])

  // ==========================================
  // COMPONENT CLEANUP
  // ==========================================

  useEffect(() => {
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
  }, [])

  // ==========================================
  // MANUAL TOGGLE
  // ==========================================

  const handlePanelToggle = () => {
    // Stop auto-close timer
    // if user interacts manually

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
      {/* ======================================
          TOGGLE BUTTON
      ====================================== */}

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

      {/* ======================================
          INNER
      ====================================== */}

      <div className="hess-live-data-inner">

        {/* ====================================
            HEADER
        ==================================== */}

        <div className="hess-live-data-header">
          <h1>
            Reaction{" "}
            {reactionNumber}
          </h1>

          <p>
            Live Data
          </p>
        </div>

        {/* ====================================
            CONTENT
        ==================================== */}

        <div className="hess-live-data-content">

          {/* ==================================
              SOLUTION
          ================================== */}

          <div className="hess-live-data-section">

            <div className="hess-live-data-section-title">
              <span className="hess-live-data-dot" />

              <h2>
                Solution
              </h2>
            </div>

            <div className="hess-live-data-divider" />

            {/* =================================
                VOLUME
            ================================= */}

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

            {/* =================================
                MASS
            ================================= */}

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

            {/* =================================
                STARTING TEMPERATURE
            ================================= */}

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

            {/* =================================
                HIGHEST TEMPERATURE
            ================================= */}

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

            {/* =================================
                TEMPERATURE CHANGE
            ================================= */}

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

          {/* ==================================
              SOLID TRANSFERRED
          ================================== */}

          <div className="hess-live-data-section hess-live-data-solid-section">

            <div className="hess-live-data-section-title">
              <span className="hess-live-data-dot" />

              <h2>
                Solid Transferred
              </h2>
            </div>

            <div className="hess-live-data-divider" />

            {/* =================================
                TEST TUBE + POWDER
            ================================= */}

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

            {/* =================================
                TEST TUBE AFTER EMPTYING
            ================================= */}

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

            {/* =================================
                POWDER USED
            ================================= */}

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