import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./SulfamicTitrationLiveDataPanel.css"

const SulfamicTitrationLiveDataPanel = ({
  // =========================================================
  // SULFAMIC ACID PREPARATION
  // =========================================================

  emptyTestTubeMass = null,

  testTubeWithSulfamicMass = null,

  sulfamicAcidMass = null,

  beakerWaterAmount = null,

  volumetricFlaskAmount = null,


  // =========================================================
  // TITRATION PREPARATION
  // =========================================================

  buretteSulfamicAmount = null,

  conicalFlaskNaOHAmount = null,

  indicatorStatus = null,


  // =========================================================
  // TITRATION LIVE DATA
  // =========================================================

  initialBuretteReading = null,

  currentBuretteReading = null,

  sulfamicAcidDelivered = null,

  endpointStatus = null,


  // =========================================================
  // RESULTS
  // =========================================================

  roughTitre = null,

  trialOne = null,

  trialTwo = null,

  meanTitre = null,

  sulfamicAcidConcentration = null,

  naohConcentration = null,


  // =========================================================
  // LESSON CONTROL
  // =========================================================

  selectedLesson,

  lessonStep,

  autoHideConditions = [],

  autoShowConditions = [],

  autoHideDelay = 3000,
}) => {

  // =========================================================
  // REFS
  // =========================================================

  const panelRef =
    useRef(null)

  const arrowRef =
    useRef(null)

  const isPanelOpenRef =
    useRef(false)

  const autoHideTimeoutRef =
    useRef(null)


  // =========================================================
  // STATE
  // =========================================================

  const [
    isPanelOpen,
    setIsPanelOpen,
  ] = useState(false)


  // =========================================================
  // FORMAT MASS
  // =========================================================

  const formatMass = (
    value,
    decimals = 2
  ) => {
    if (
      value === null ||
      value === undefined
    ) {
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
    )} g`
  }


  // =========================================================
  // FORMAT VOLUME
  // =========================================================

  const formatVolume = (
    value,
    decimals = 1
  ) => {
    if (
      value === null ||
      value === undefined
    ) {
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
    )} cm³`
  }


  // =========================================================
  // FORMAT CONCENTRATION
  // =========================================================

  const formatConcentration = (
    value,
    decimals = 3
  ) => {
    if (
      value === null ||
      value === undefined
    ) {
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
    )} mol dm⁻³`
  }


  // =========================================================
  // FORMAT STATUS
  // =========================================================

  const formatStatus = (
    value
  ) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "TBD"
    }

    return value
  }


  // =========================================================
  // CLOSED POSITION
  // =========================================================

  const getClosedPosition = () => {
    const panel =
      panelRef.current

    if (!panel) {
      return 0
    }

    return (
      panel.offsetWidth -
      34
    )
  }


  // =========================================================
  // CLEAR AUTO HIDE TIMER
  // =========================================================

  const clearAutoHideTimer =
    () => {

      if (
        autoHideTimeoutRef.current
      ) {
        clearTimeout(
          autoHideTimeoutRef.current
        )

        autoHideTimeoutRef.current =
          null
      }
    }


  // =========================================================
  // CLOSE PANEL
  // =========================================================

  const closePanel = () => {
    const panel =
      panelRef.current

    const arrow =
      arrowRef.current

    if (
      !panel ||
      !arrow
    ) {
      return
    }

    clearAutoHideTimer()

    isPanelOpenRef.current =
      false

    setIsPanelOpen(
      false
    )

    gsap.to(panel, {
      x:
        getClosedPosition(),

      duration:
        0.65,

      ease:
        "power3.inOut",
    })

    gsap.to(arrow, {
      rotation:
        180,

      duration:
        0.65,

      ease:
        "power3.inOut",
    })
  }


  // =========================================================
  // OPEN PANEL
  // =========================================================

  const openPanel = (
    shouldAutoHide = true
  ) => {
    const panel =
      panelRef.current

    const arrow =
      arrowRef.current

    if (
      !panel ||
      !arrow
    ) {
      return
    }

    clearAutoHideTimer()

    isPanelOpenRef.current =
      true

    setIsPanelOpen(
      true
    )

    gsap.to(panel, {
      x:
        -60,

      duration:
        0.65,

      ease:
        "power3.inOut",
    })

    gsap.to(arrow, {
      rotation:
        0,

      duration:
        0.65,

      ease:
        "power3.inOut",
    })


    if (
      shouldAutoHide
    ) {
      autoHideTimeoutRef.current =
        setTimeout(
          () => {
            closePanel()
          },
          autoHideDelay
        )
    }
  }


  // =========================================================
  // START CLOSED
  // =========================================================

  useLayoutEffect(() => {
    const panel =
      panelRef.current

    const arrow =
      arrowRef.current

    if (
      !panel ||
      !arrow
    ) {
      return
    }


    gsap.set(panel, {
      x:
        getClosedPosition(),
    })


    gsap.set(arrow, {
      rotation:
        180,
    })


    isPanelOpenRef.current =
      false


    setIsPanelOpen(
      false
    )


    // =======================================================
    // RESIZE
    // =======================================================

    const handleResize =
      () => {

        if (
          !isPanelOpenRef.current
        ) {
          gsap.set(panel, {
            x:
              getClosedPosition(),
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

      gsap.killTweensOf(
        panel
      )

      gsap.killTweensOf(
        arrow
      )
    }

  }, [])


  // =========================================================
  // AUTO HIDE / AUTO SHOW
  // =========================================================

  useEffect(() => {

    const shouldAutoHide =
      autoHideConditions.some(
        (condition) =>
          condition.selectedLesson ===
            selectedLesson &&
          condition.lessonStep ===
            lessonStep
      )


    const shouldAutoShow =
      autoShowConditions.some(
        (condition) =>
          condition.selectedLesson ===
            selectedLesson &&
          condition.lessonStep ===
            lessonStep
      )


    if (
      shouldAutoHide
    ) {
      closePanel()

      return
    }


    if (
      shouldAutoShow
    ) {
      openPanel(
        true
      )
    }

  }, [
    selectedLesson,
    lessonStep,
    autoHideConditions,
    autoShowConditions,
    autoHideDelay,
  ])


  // =========================================================
  // CLEANUP
  // =========================================================

  useEffect(() => {
    return () => {
      clearAutoHideTimer()
    }
  }, [])


  // =========================================================
  // MANUAL TOGGLE
  // =========================================================

  const handlePanelToggle =
    () => {

      if (
        isPanelOpenRef.current
      ) {
        closePanel()
      }
      else {
        openPanel(
          false
        )
      }
    }


  // =========================================================
  // JSX
  // =========================================================

  return (
    <div
      ref={panelRef}
      className="sulfamic-live-data-panel"
    >

      {/* =====================================================
          TOGGLE
      ===================================================== */}

      <button
        type="button"

        className="sulfamic-live-data-toggle"

        onClick={
          handlePanelToggle
        }

        aria-label={
          isPanelOpen
            ? "Close sulfamic acid live data panel"
            : "Open sulfamic acid live data panel"
        }
      >
        <span
          ref={arrowRef}

          className="sulfamic-live-data-toggle-arrow"
        >
          ❯
        </span>
      </button>


      <div className="sulfamic-live-data-inner">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="sulfamic-live-data-header">

          <h1>
            Sulfamic Acid + NaOH
          </h1>

          <p>
            Live Data
          </p>

        </div>


        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="sulfamic-live-data-content">


          {/* =================================================
              STANDARD SOLUTION
          ================================================= */}

          <div className="sulfamic-live-data-section">

            <div className="sulfamic-live-data-section-title">

              <span className="sulfamic-live-data-dot" />

              <h2>
                Standard Solution
              </h2>

            </div>


            <div className="sulfamic-live-data-divider" />


            {/* EMPTY TEST TUBE */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Empty test tube
                </p>

                <span>
                  Initial mass
                </span>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  emptyTestTubeMass == null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-complete"
                }`}
              >
                <p>
                  {
                    formatMass(
                      emptyTestTubeMass
                    )
                  }
                </p>
              </div>

            </div>


            {/* TEST TUBE + ACID */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Tube + sulfamic acid
                </p>

                <span>
                  Final weighed mass
                </span>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  testTubeWithSulfamicMass ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-complete"
                }`}
              >
                <p>
                  {
                    formatMass(
                      testTubeWithSulfamicMass
                    )
                  }
                </p>
              </div>

            </div>


            {/* MASS USED */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Sulfamic acid used
                </p>

                <span>
                  Mass by difference
                </span>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  sulfamicAcidMass ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-complete"
                }`}
              >
                <p>
                  {
                    formatMass(
                      sulfamicAcidMass
                    )
                  }
                </p>
              </div>

            </div>


            {/* BEAKER WATER */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Beaker
                </p>

                <span>
                  Distilled water / washings
                </span>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  beakerWaterAmount ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : ""
                }`}
              >
                <p>
                  {
                    formatVolume(
                      beakerWaterAmount,
                      1
                    )
                  }
                </p>
              </div>

            </div>


            {/* VOLUMETRIC FLASK */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Volumetric flask
                </p>

                <span>
                  Sulfamic acid solution
                </span>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  volumetricFlaskAmount ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-live"
                }`}
              >
                <p>
                  {
                    formatVolume(
                      volumetricFlaskAmount,
                      1
                    )
                  }
                </p>
              </div>

            </div>

          </div>


          {/* =================================================
              TITRATION PREPARATION
          ================================================= */}

          <div
            className="
              sulfamic-live-data-section
              sulfamic-live-data-secondary-section
            "
          >

            <div className="sulfamic-live-data-section-title">

              <span className="sulfamic-live-data-dot" />

              <h2>
                Titration Setup
              </h2>

            </div>


            <div className="sulfamic-live-data-divider" />


            {/* BURETTE */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Burette
                </p>

                <span>
                  Sulfamic acid remaining
                </span>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  buretteSulfamicAmount ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-live"
                }`}
              >
                <p>
                  {
                    formatVolume(
                      buretteSulfamicAmount,
                      2
                    )
                  }
                </p>
              </div>

            </div>


            {/* CONICAL FLASK */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Conical flask
                </p>

                <span>
                  Sodium hydroxide
                </span>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  conicalFlaskNaOHAmount ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : ""
                }`}
              >
                <p>
                  {
                    formatVolume(
                      conicalFlaskNaOHAmount,
                      1
                    )
                  }
                </p>
              </div>

            </div>


            {/* INDICATOR */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Indicator
                </p>

                <span>
                  Methyl orange
                </span>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  indicatorStatus ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-status"
                }`}
              >
                <p>
                  {
                    formatStatus(
                      indicatorStatus
                    )
                  }
                </p>
              </div>

            </div>

          </div>


          {/* =================================================
              LIVE TITRATION
          ================================================= */}

          <div
            className="
              sulfamic-live-data-section
              sulfamic-live-data-secondary-section
            "
          >

            <div className="sulfamic-live-data-section-title">

              <span className="sulfamic-live-data-dot" />

              <h2>
                Titration
              </h2>

            </div>


            <div className="sulfamic-live-data-divider" />


            {/* INITIAL READING */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Initial burette reading
                </p>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  initialBuretteReading ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : ""
                }`}
              >
                <p>
                  {
                    formatVolume(
                      initialBuretteReading,
                      2
                    )
                  }
                </p>
              </div>

            </div>


            {/* CURRENT READING */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Current burette reading
                </p>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  currentBuretteReading ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-live"
                }`}
              >
                <p>
                  {
                    formatVolume(
                      currentBuretteReading,
                      2
                    )
                  }
                </p>
              </div>

            </div>


            {/* SULFAMIC DELIVERED */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Sulfamic acid delivered
                </p>

                <span>
                  From burette
                </span>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  sulfamicAcidDelivered ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-live"
                }`}
              >
                <p>
                  {
                    formatVolume(
                      sulfamicAcidDelivered,
                      2
                    )
                  }
                </p>
              </div>

            </div>


            {/* ENDPOINT */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Endpoint
                </p>

                <span>
                  Methyl orange
                </span>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  endpointStatus ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-status"
                }`}
              >
                <p>
                  {
                    formatStatus(
                      endpointStatus
                    )
                  }
                </p>
              </div>

            </div>

          </div>


          {/* =================================================
              TITRATION RESULTS
          ================================================= */}

          <div
            className="
              sulfamic-live-data-section
              sulfamic-live-data-secondary-section
            "
          >

            <div className="sulfamic-live-data-section-title">

              <span className="sulfamic-live-data-dot" />

              <h2>
                Results
              </h2>

            </div>


            <div className="sulfamic-live-data-divider" />


            {/* ROUGH TITRE */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Rough titre
                </p>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  roughTitre ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-complete"
                }`}
              >
                <p>
                  {
                    formatVolume(
                      roughTitre,
                      2
                    )
                  }
                </p>
              </div>

            </div>


            {/* TRIAL 1 */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Trial 1
                </p>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  trialOne ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-complete"
                }`}
              >
                <p>
                  {
                    formatVolume(
                      trialOne,
                      2
                    )
                  }
                </p>
              </div>

            </div>


            {/* TRIAL 2 */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Trial 2
                </p>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  trialTwo ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-complete"
                }`}
              >
                <p>
                  {
                    formatVolume(
                      trialTwo,
                      2
                    )
                  }
                </p>
              </div>

            </div>


            {/* MEAN TITRE */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Mean titre
                </p>

                <span>
                  Concordant titres
                </span>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  meanTitre ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-complete"
                }`}
              >
                <p>
                  {
                    formatVolume(
                      meanTitre,
                      2
                    )
                  }
                </p>
              </div>

            </div>

          </div>


          {/* =================================================
              CALCULATIONS
          ================================================= */}

          <div
            className="
              sulfamic-live-data-section
              sulfamic-live-data-secondary-section
            "
          >

            <div className="sulfamic-live-data-section-title">

              <span className="sulfamic-live-data-dot" />

              <h2>
                Calculations
              </h2>

            </div>


            <div className="sulfamic-live-data-divider" />


            {/* SULFAMIC CONCENTRATION */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Sulfamic acid
                </p>

                <span>
                  Standard concentration
                </span>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  sulfamicAcidConcentration ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-complete"
                }`}
              >
                <p>
                  {
                    formatConcentration(
                      sulfamicAcidConcentration
                    )
                  }
                </p>
              </div>

            </div>


            {/* NaOH CONCENTRATION */}

            <div className="sulfamic-live-data-row">

              <div className="sulfamic-live-data-label">

                <p>
                  Sodium hydroxide
                </p>

                <span>
                  Calculated concentration
                </span>

              </div>


              <div
                className={`sulfamic-live-data-value ${
                  naohConcentration ==
                  null
                    ? "sulfamic-live-data-value-pending"
                    : "sulfamic-live-data-value-complete"
                }`}
              >
                <p>
                  {
                    formatConcentration(
                      naohConcentration
                    )
                  }
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            FOOTER
        =================================================== */}

        <div className="sulfamic-live-data-footer">

          <div className="sulfamic-live-data-info-icon">
            i
          </div>

          <p>
            Values update automatically throughout the practical.
          </p>

        </div>

      </div>

    </div>
  )
}

export default SulfamicTitrationLiveDataPanel