import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./MolarVolumeLiveDataPanel.css"

const MolarVolumeLiveDataPanel = ({
  // =========================================================
  // TRIAL
  // =========================================================

  trialNumber = 1,

  totalTrials = 7,


  // =========================================================
  // ETHANOIC ACID
  // =========================================================

  ethanoicAcidVolume = null,


  // =========================================================
  // CALCIUM CARBONATE
  // =========================================================

  massBeforeTransfer = null,

  massAfterTransfer = null,

  calciumCarbonateMass = null,


  // =========================================================
  // GAS COLLECTION
  // =========================================================

  currentCO2Volume = null,

  finalCO2Volume = null,

  reactionStatus = null,


  // =========================================================
  // RESULTS
  // =========================================================

  trialResults = [],


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
  // AUTO HIDE / AUTO SHOW CONDITIONS
  // =========================================================

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


  // =========================================================
  // AUTO HIDE / AUTO SHOW
  // =========================================================

  useEffect(() => {

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
    shouldAutoHide,
    shouldAutoShow,
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
      className="molar-live-data-panel"
    >

      {/* =====================================================
          TOGGLE
      ===================================================== */}

      <button
        type="button"

        className="molar-live-data-toggle"

        onClick={
          handlePanelToggle
        }

        aria-label={
          isPanelOpen
            ? "Close molar volume live data panel"
            : "Open molar volume live data panel"
        }
      >

        <span
          ref={arrowRef}

          className="molar-live-data-toggle-arrow"
        >
          ❯
        </span>

      </button>


      <div className="molar-live-data-inner">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="molar-live-data-header">

          <h1>
            Molar Volume of a Gas
          </h1>

          <p>
            Live Data
          </p>

        </div>


        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="molar-live-data-content">


          {/* =================================================
              CURRENT TRIAL
          ================================================= */}

          <div className="molar-live-data-section">

            <div className="molar-live-data-section-title">

              <span className="molar-live-data-dot" />

              <h2>
                Current Trial
              </h2>

            </div>


            <div className="molar-live-data-divider" />


            {/* TRIAL NUMBER */}

            <div className="molar-live-data-row">

              <div className="molar-live-data-label">

                <p>
                  Trial
                </p>

                <span>
                  Experiment progress
                </span>

              </div>


              <div className="molar-live-data-value molar-live-data-value-status">

                <p>
                  {trialNumber} / {totalTrials}
                </p>

              </div>

            </div>


            {/* ETHANOIC ACID */}

            <div className="molar-live-data-row">

              <div className="molar-live-data-label">

                <p>
                  Ethanoic acid
                </p>

                <span>
                  Volume measured
                </span>

              </div>


              <div
                className={`molar-live-data-value ${
                  ethanoicAcidVolume ==
                  null
                    ? "molar-live-data-value-pending"
                    : "molar-live-data-value-complete"
                }`}
              >

                <p>
                  {
                    formatVolume(
                      ethanoicAcidVolume,
                      1
                    )
                  }
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              CALCIUM CARBONATE
          ================================================= */}

          <div
            className="
              molar-live-data-section
              molar-live-data-secondary-section
            "
          >

            <div className="molar-live-data-section-title">

              <span className="molar-live-data-dot" />

              <h2>
                Calcium Carbonate
              </h2>

            </div>


            <div className="molar-live-data-divider" />


            {/* MASS BEFORE */}

            <div className="molar-live-data-row">

              <div className="molar-live-data-label">

                <p>
                  Tube + CaCO₃
                </p>

                <span>
                  Before transfer
                </span>

              </div>


              <div
                className={`molar-live-data-value ${
                  massBeforeTransfer ==
                  null
                    ? "molar-live-data-value-pending"
                    : "molar-live-data-value-complete"
                }`}
              >

                <p>
                  {
                    formatMass(
                      massBeforeTransfer
                    )
                  }
                </p>

              </div>

            </div>


            {/* MASS AFTER */}

            <div className="molar-live-data-row">

              <div className="molar-live-data-label">

                <p>
                  Tube + remaining CaCO₃
                </p>

                <span>
                  After transfer
                </span>

              </div>


              <div
                className={`molar-live-data-value ${
                  massAfterTransfer ==
                  null
                    ? "molar-live-data-value-pending"
                    : "molar-live-data-value-complete"
                }`}
              >

                <p>
                  {
                    formatMass(
                      massAfterTransfer
                    )
                  }
                </p>

              </div>

            </div>


            {/* MASS USED */}

            <div className="molar-live-data-row">

              <div className="molar-live-data-label">

                <p>
                  CaCO₃ used
                </p>

                <span>
                  Mass by difference
                </span>

              </div>


              <div
                className={`molar-live-data-value ${
                  calciumCarbonateMass ==
                  null
                    ? "molar-live-data-value-pending"
                    : "molar-live-data-value-complete"
                }`}
              >

                <p>
                  {
                    formatMass(
                      calciumCarbonateMass
                    )
                  }
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              GAS COLLECTION
          ================================================= */}

          <div
            className="
              molar-live-data-section
              molar-live-data-secondary-section
            "
          >

            <div className="molar-live-data-section-title">

              <span className="molar-live-data-dot" />

              <h2>
                Carbon Dioxide
              </h2>

            </div>


            <div className="molar-live-data-divider" />


            {/* REACTION STATUS */}

            <div className="molar-live-data-row">

              <div className="molar-live-data-label">

                <p>
                  Reaction
                </p>

                <span>
                  Gas production status
                </span>

              </div>


              <div
                className={`molar-live-data-value ${
                  reactionStatus ==
                  null
                    ? "molar-live-data-value-pending"
                    : "molar-live-data-value-status"
                }`}
              >

                <p>
                  {
                    formatStatus(
                      reactionStatus
                    )
                  }
                </p>

              </div>

            </div>


            {/* CURRENT CO2 */}

            <div className="molar-live-data-row">

              <div className="molar-live-data-label">

                <p>
                  CO₂ collected
                </p>

                <span>
                  Current gas volume
                </span>

              </div>


              <div
                className={`molar-live-data-value ${
                  currentCO2Volume ==
                  null
                    ? "molar-live-data-value-pending"
                    : finalCO2Volume ==
                      null
                      ? "molar-live-data-value-live"
                      : "molar-live-data-value-complete"
                }`}
              >

                <p>
                  {
                    formatVolume(
                      currentCO2Volume,
                      1
                    )
                  }
                </p>

              </div>

            </div>


            {/* FINAL CO2 */}

            <div className="molar-live-data-row">

              <div className="molar-live-data-label">

                <p>
                  Final CO₂ volume
                </p>

                <span>
                  Recorded when bubbling stops
                </span>

              </div>


              <div
                className={`molar-live-data-value ${
                  finalCO2Volume ==
                  null
                    ? "molar-live-data-value-pending"
                    : "molar-live-data-value-complete"
                }`}
              >

                <p>
                  {
                    formatVolume(
                      finalCO2Volume,
                      1
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
              molar-live-data-section
              molar-live-data-secondary-section
            "
          >

            <div className="molar-live-data-section-title">

              <span className="molar-live-data-dot" />

              <h2>
                Results
              </h2>

            </div>


            <div className="molar-live-data-divider" />


            {
              Array.from(
                {
                  length:
                    totalTrials,
                }
              ).map(
                (
                  _,
                  index
                ) => {

                  const trial =
                    trialResults[
                      index
                    ]

                  return (
                    <div
                      key={
                        index
                      }
                      className="molar-live-data-result-row"
                    >

                      <div className="molar-live-data-result-trial">

                        <p>
                          Trial {
                            index + 1
                          }
                        </p>

                      </div>


                      <div
                        className={`molar-live-data-result-value ${
                          trial?.mass ==
                          null
                            ? "molar-live-data-result-pending"
                            : ""
                        }`}
                      >

                        <span>
                          CaCO₃
                        </span>

                        <p>
                          {
                            formatMass(
                              trial?.mass
                            )
                          }
                        </p>

                      </div>


                      <div
                        className={`molar-live-data-result-value ${
                          trial?.co2Volume ==
                          null
                            ? "molar-live-data-result-pending"
                            : ""
                        }`}
                      >

                        <span>
                          CO₂
                        </span>

                        <p>
                          {
                            formatVolume(
                              trial?.co2Volume,
                              1
                            )
                          }
                        </p>

                      </div>

                    </div>
                  )
                }
              )
            }

          </div>

        </div>


        {/* ===================================================
            FOOTER
        =================================================== */}

        <div className="molar-live-data-footer">

          <div className="molar-live-data-info-icon">
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

export default MolarVolumeLiveDataPanel