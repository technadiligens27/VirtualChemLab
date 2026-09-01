import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./HCLTitrationLiveDataPanel.css"

const HCLTitrationLiveDataPanel = ({
  // =========================================================
  // CURRENT VOLUMES
  // =========================================================

  normalBeakerAmount = null,

  volumetricFlaskAmount = null,

  conicalFlaskAmount = null,

  buretteNaOHAmount = null,

  // =========================================================
  // TITRATION LIVE DATA
  // =========================================================

  initialBuretteReading = null,

  currentBuretteReading = null,

  naohDelivered = null,

  endpointStatus = null,

  // =========================================================
  // RESULTS
  // =========================================================

  roughTitre = null,

  trialOne = null,

  trialTwo = null,

  meanTitre = null,

  // =========================================================
  // AUTO SHOW CONTROL
  // =========================================================

  selectedLesson,

  lessonStep,

  autoShowConditions = [],

  showDuration = 3000,
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

  const autoCloseTimeoutRef =
    useRef(null)


  // =========================================================
  // STATE
  // =========================================================

  const [
    isPanelOpen,
    setIsPanelOpen,
  ] = useState(false)


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

  const getClosedPosition =
    () => {

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
  // CLEAR AUTO CLOSE
  // =========================================================

  const clearAutoClose =
    () => {

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


  // =========================================================
  // CLOSE PANEL
  // =========================================================

  const closePanel =
    () => {

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

      clearAutoClose()

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
    autoClose = false
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

    clearAutoClose()

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


    // =======================================================
    // AUTO CLOSE AFTER SHOW DURATION
    // =======================================================

    if (
      autoClose
    ) {

      autoCloseTimeoutRef.current =
        setTimeout(
          () => {

            closePanel()

          },
          showDuration
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
          isPanelOpenRef.current
        ) {

          gsap.set(panel, {
            x:
              -60,
          })

        }

        else {

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
  // AUTO SHOW
  // =========================================================

  useEffect(() => {

    const shouldAutoShow =
      autoShowConditions.some(
        (condition) =>
          condition.selectedLesson ===
            selectedLesson &&
          condition.lessonStep ===
            lessonStep
      )


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
    autoShowConditions,
    showDuration,
  ])


  // =========================================================
  // CLEANUP
  // =========================================================

  useEffect(() => {

    return () => {

      clearAutoClose()

    }

  }, [])


  // =========================================================
  // MANUAL TOGGLE
  // =========================================================

  const handlePanelToggle =
    () => {

      // If user manually interacts,
      // cancel automatic close timer.
      clearAutoClose()


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
      className="hcl-live-data-panel"
    >

      {/* =====================================================
          TOGGLE
      ===================================================== */}

      <button
        type="button"

        className="hcl-live-data-toggle"

        onClick={
          handlePanelToggle
        }

        aria-label={
          isPanelOpen
            ? "Close HCl titration live data panel"
            : "Open HCl titration live data panel"
        }
      >

        <span
          ref={arrowRef}

          className="hcl-live-data-toggle-arrow"
        >
          ❯
        </span>

      </button>


      <div className="hcl-live-data-inner">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="hcl-live-data-header">

          <h1>
            HCl Titration
          </h1>

          <p>
            Live Data
          </p>

        </div>


        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="hcl-live-data-content">


          {/* =================================================
              CURRENT VOLUMES
          ================================================= */}

          <div className="hcl-live-data-section">

            <div className="hcl-live-data-section-title">

              <span className="hcl-live-data-dot" />

              <h2>
                Current Volumes
              </h2>

            </div>


            <div className="hcl-live-data-divider" />


            {/* NORMAL BEAKER */}

            {/* <div className="hcl-live-data-row">

              <div className="hcl-live-data-label">

                <p>
                  Normal beaker
                </p>

                <span>
                  HCl / distilled water
                </span>

              </div>


              <div
                className={`hcl-live-data-value ${
                  normalBeakerAmount ==
                  null
                    ? "hcl-live-data-value-pending"
                    : ""
                }`}
              >

                <p>
                  {
                    formatVolume(
                      normalBeakerAmount,
                      1
                    )
                  }
                </p>

              </div>

            </div> */}


            {/* VOLUMETRIC FLASK */}

            <div className="hcl-live-data-row">

              <div className="hcl-live-data-label">

                <p>
                  Volumetric flask
                </p>

                <span>
                  Diluted HCl solution
                </span>

              </div>


              <div
                className={`hcl-live-data-value ${
                  volumetricFlaskAmount ==
                  null
                    ? "hcl-live-data-value-pending"
                    : "hcl-live-data-value-live"
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


            {/* CONICAL FLASK */}

            <div className="hcl-live-data-row">

              <div className="hcl-live-data-label">

                <p>
                  Conical flask
                </p>

                <span>
                  HCl + phenolphthalein
                </span>

              </div>


              <div
                className={`hcl-live-data-value ${
                  conicalFlaskAmount ==
                  null
                    ? "hcl-live-data-value-pending"
                    : ""
                }`}
              >

                <p>
                  {
                    formatVolume(
                      conicalFlaskAmount,
                      1
                    )
                  }
                </p>

              </div>

            </div>


            {/* BURETTE */}

            {/* <div className="hcl-live-data-row">

              <div className="hcl-live-data-label">

                <p>
                  Burette
                </p>

                <span>
                  Sodium hydroxide remaining
                </span>

              </div>


              <div
                className={`hcl-live-data-value ${
                  buretteNaOHAmount ==
                  null
                    ? "hcl-live-data-value-pending"
                    : "hcl-live-data-value-live"
                }`}
              >

                <p>
                  {
                    formatVolume(
                      buretteNaOHAmount,
                      2
                    )
                  }
                </p>

              </div>

            </div> */}

          </div>


          {/* =================================================
              TITRATION
          ================================================= */}

          <div
            className="
              hcl-live-data-section
              hcl-live-data-secondary-section
            "
          >

            <div className="hcl-live-data-section-title">

              <span className="hcl-live-data-dot" />

              <h2>
                Titration
              </h2>

            </div>


            <div className="hcl-live-data-divider" />


            {/* INITIAL BURETTE */}

            <div className="hcl-live-data-row">

              <div className="hcl-live-data-label">

                <p>
                  Initial burette reading
                </p>

                <span>
                  Before titration
                </span>

              </div>


              <div
                className={`hcl-live-data-value ${
                  initialBuretteReading ==
                  null
                    ? "hcl-live-data-value-pending"
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


            {/* CURRENT BURETTE */}

            <div className="hcl-live-data-row">

              <div className="hcl-live-data-label">

                <p>
                  Current burette reading
                </p>

                <span>
                  During titration
                </span>

              </div>


              <div
                className={`hcl-live-data-value ${
                  currentBuretteReading ==
                  null
                    ? "hcl-live-data-value-pending"
                    : "hcl-live-data-value-live"
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


            {/* NAOH DELIVERED */}

            <div className="hcl-live-data-row">

              <div className="hcl-live-data-label">

                <p>
                  NaOH delivered
                </p>

                <span>
                  From burette
                </span>

              </div>


              <div
                className={`hcl-live-data-value ${
                  naohDelivered ==
                  null
                    ? "hcl-live-data-value-pending"
                    : "hcl-live-data-value-live"
                }`}
              >

                <p>
                  {
                    formatVolume(
                      naohDelivered,
                      2
                    )
                  }
                </p>

              </div>

            </div>


            {/* ENDPOINT */}

            <div className="hcl-live-data-row">

              <div className="hcl-live-data-label">

                <p>
                  Endpoint
                </p>

                <span>
                  Phenolphthalein
                </span>

              </div>


              <div
                className={`hcl-live-data-value ${
                  endpointStatus ==
                  null
                    ? "hcl-live-data-value-pending"
                    : "hcl-live-data-value-status"
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
              RESULTS
          ================================================= */}

          <div
            className="
              hcl-live-data-section
              hcl-live-data-secondary-section
            "
          >

            <div className="hcl-live-data-section-title">

              <span className="hcl-live-data-dot" />

              <h2>
                Results
              </h2>

            </div>


            <div className="hcl-live-data-divider" />


            {/* ROUGH TITRE */}

            {/*
            <div className="hcl-live-data-row">

              <div className="hcl-live-data-label">

                <p>
                  Rough titre
                </p>

              </div>


              <div
                className={`hcl-live-data-value ${
                  roughTitre ==
                  null
                    ? "hcl-live-data-value-pending"
                    : "hcl-live-data-value-complete"
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
            */}


            {/* TRIAL 1 */}

            <div className="hcl-live-data-row">

              <div className="hcl-live-data-label">

                <p>
                  Trial 1
                </p>

                <span>
                  Accurate titre
                </span>

              </div>


              <div
                className={`hcl-live-data-value ${
                  trialOne ==
                  null
                    ? "hcl-live-data-value-pending"
                    : "hcl-live-data-value-complete"
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

            <div className="hcl-live-data-row">

              <div className="hcl-live-data-label">

                <p>
                  Trial 2
                </p>

                <span>
                  Accurate titre
                </span>

              </div>


              <div
                className={`hcl-live-data-value ${
                  trialTwo ==
                  null
                    ? "hcl-live-data-value-pending"
                    : "hcl-live-data-value-complete"
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

            {/* <div className="hcl-live-data-row">

              <div className="hcl-live-data-label">

                <p>
                  Mean titre
                </p>

                <span>
                  Concordant titres
                </span>

              </div>


              <div
                className={`hcl-live-data-value ${
                  meanTitre ==
                  null
                    ? "hcl-live-data-value-pending"
                    : "hcl-live-data-value-complete"
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

            </div> */}

          </div>

        </div>


        {/* ===================================================
            FOOTER
        =================================================== */}

        <div className="hcl-live-data-footer">

          <div className="hcl-live-data-info-icon">
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

export default HCLTitrationLiveDataPanel