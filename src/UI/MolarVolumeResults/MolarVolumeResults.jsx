import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./MolarVolumeResults.css"

const MolarVolumeResults = ({
  onButtonContinue,

  autoFillDelay = 1000,
}) => {
  const panelRef = useRef(null)
  const arrowRef = useRef(null)
  const isPanelOpenRef = useRef(true)

  const autoFillTimeoutRef =
    useRef(null)

  const [
    isPanelOpen,
    setIsPanelOpen,
  ] = useState(true)

  const [
    visibleResultCount,
    setVisibleResultCount,
  ] = useState(1)

  const [
    isAutoSimulating,
    setIsAutoSimulating,
  ] = useState(false)

  const results = [
    {
      trial: 1,
      mass: "0.05",
      volume: "12",
    },
    {
      trial: 2,
      mass: "0.10",
      volume: "24",
    },
    {
      trial: 3,
      mass: "0.15",
      volume: "36",
    },
    {
      trial: 4,
      mass: "0.20",
      volume: "48",
    },
    {
      trial: 5,
      mass: "0.25",
      volume: "60",
    },
    {
      trial: 6,
      mass: "0.30",
      volume: "72",
    },
    {
      trial: 7,
      mass: "0.35",
      volume: "84",
    },
  ]

  const visibleResults =
    results.slice(
      0,
      visibleResultCount
    )

  const isSimulationComplete =
    visibleResultCount ===
    results.length

  const getClosedPosition = () => {
    const panel =
      panelRef.current

    if (!panel) {
      return 0
    }

    return -(
      window.innerWidth / 2 +
      panel.offsetWidth / 2
    )
  }

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
      x: -(
        window.innerWidth / 2 +
        panel.offsetWidth / 2
      ),
    })

    gsap.set(arrow, {
      rotation: 0,
    })

    gsap.to(panel, {
      x: 0,

      duration: 0.8,
      delay: 0.2,

      ease:
        "power3.inOut",
    })

    gsap.to(arrow, {
      rotation: 180,

      duration: 0.8,
      delay: 0.2,

      ease:
        "power3.inOut",
    })

    const handleResize = () => {
      if (
        isPanelOpenRef.current
      ) {
        return
      }

      gsap.set(panel, {
        x: -(
          window.innerWidth / 2 +
          panel.offsetWidth / 2
        ),
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

      gsap.killTweensOf(
        panel
      )

      gsap.killTweensOf(
        arrow
      )
    }
  }, [])

  useEffect(() => {
    return () => {
      if (
        autoFillTimeoutRef.current
      ) {
        clearTimeout(
          autoFillTimeoutRef.current
        )
      }
    }
  }, [])

  useEffect(() => {
    if (
      !isAutoSimulating
    ) {
      return
    }

    if (
      visibleResultCount >=
      results.length
    ) {
      setIsAutoSimulating(
        false
      )

      return
    }

    autoFillTimeoutRef.current =
      setTimeout(() => {
        setVisibleResultCount(
          (currentCount) =>
            Math.min(
              currentCount + 1,
              results.length
            )
        )
      }, autoFillDelay)

    return () => {
      if (
        autoFillTimeoutRef.current
      ) {
        clearTimeout(
          autoFillTimeoutRef.current
        )
      }
    }
  }, [
    isAutoSimulating,
    visibleResultCount,
    autoFillDelay,
    results.length,
  ])

  const animatePanel = (
    shouldOpen,
    onAnimationComplete
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

    isPanelOpenRef.current =
      shouldOpen

    setIsPanelOpen(
      shouldOpen
    )

    gsap.killTweensOf(
      panel
    )

    gsap.killTweensOf(
      arrow
    )

    gsap.to(panel, {
      x: shouldOpen
        ? 0
        : getClosedPosition(),

      duration: 0.8,

      ease:
        "power3.inOut",

      onComplete:
        onAnimationComplete,
    })

    gsap.to(arrow, {
      rotation:
        shouldOpen
          ? 180
          : 0,

      duration: 0.8,

      ease:
        "power3.inOut",
    })
  }

  const handlePanelToggle = () => {
    animatePanel(
      !isPanelOpenRef.current
    )
  }

  const handleAutoSimulate = () => {
    if (
      isAutoSimulating ||
      isSimulationComplete
    ) {
      return
    }

    setIsAutoSimulating(
      true
    )
  }

  const handleContinue = () => {
    animatePanel(
      false,
      () => {
        if (
          onButtonContinue
        ) {
          onButtonContinue()
        }
      }
    )
  }

  return (
    <div
      className={`Molar-results-overlay ${
        isPanelOpen
          ? "Molar-results-overlay-open"
          : "Molar-results-overlay-closed"
      }`}
    >
      <div
        className="Molar-results-wrapper"
        ref={panelRef}
      >
        {/* ==========================================
            TITLE
        ========================================== */}

        <div className="Molar-results-label">
          <h1>
            Experiment Results
          </h1>
        </div>

        {/* ==========================================
            SIDE BUTTON
        ========================================== */}

        <button
          className="Molar-results-side-container"
          onClick={
            handlePanelToggle
          }
          aria-label={
            isPanelOpen
              ? "Close results panel"
              : "Open results panel"
          }
          type="button"
        >
          <img
            ref={arrowRef}
            src="./side-arrow.png"
            alt=""
          />
        </button>

        {/* ==========================================
            INNER
        ========================================== */}

        <div className="Molar-results-inner">

          {/* ==========================================
              HEADING
          ========================================== */}

          <div className="Molar-results-heading">
            <div>
              <p>
                Core Practical 1
              </p>

              <h1>
                Molar Volume of a Gas
              </h1>
            </div>

            <div className="Molar-results-trial-count">
              <strong>
                {visibleResultCount}
              </strong>

              <span>
                {visibleResultCount === 1
                  ? "Trial completed"
                  : "Trials completed"}
              </span>
            </div>
          </div>

          {/* ==========================================
              INFORMATION
          ========================================== */}

          <div className="Molar-results-info">
            <span className="Molar-results-info-icon">
              i
            </span>

            <p>
              Trial 1 was completed manually.
              Select Auto Simulate to run and
              record the remaining six trials.
            </p>
          </div>

          {/* ==========================================
              RESULTS TABLE
          ========================================== */}

          <div className="Molar-results-table-container">
            <table className="Molar-results-table">
              <thead>
                <tr>
                  <th>
                    Trial
                  </th>

                  <th>
                    Mass of CaCO₃

                    <span>
                      / g
                    </span>
                  </th>

                  <th>
                    Volume of CO₂

                    <span>
                      / cm³
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleResults.map(
                  (result) => (
                    <tr
                      key={
                        result.trial
                      }
                      className="Molar-results-new-row"
                    >
                      <td>
                        <span className="Molar-results-trial-number">
                          {
                            result.trial
                          }
                        </span>
                      </td>

                      <td>
                        {result.mass}
                      </td>

                      <td>
                        {result.volume}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* ==========================================
              FOOTER
          ========================================== */}

          <div className="Molar-results-footer">
            <div className="Molar-results-next-step">
              <span>
                {isSimulationComplete
                  ? "Next"
                  : "Progress"}
              </span>

              <p>
                {isSimulationComplete
                  ? "Plot volume of CO₂ against mass of CaCO₃."
                  : `${visibleResultCount} of ${results.length} trials completed.`}
              </p>
            </div>

            <div className="Molar-results-actions">
              <button
                className="Molar-results-auto-button"
                onClick={
                  handleAutoSimulate
                }
                disabled={
                  isAutoSimulating ||
                  isSimulationComplete
                }
                type="button"
              >
                {isAutoSimulating
                  ? "Simulating..."
                  : isSimulationComplete
                    ? "Simulation Complete"
                    : "Auto Simulate"}
              </button>

              <button
                className="Molar-results-continue-button"
                onClick={
                  handleContinue
                }
                type="button"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MolarVolumeResults