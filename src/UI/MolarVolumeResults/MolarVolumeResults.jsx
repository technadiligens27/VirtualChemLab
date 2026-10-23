import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import {
  gsap,
} from "gsap"



import "./MolarVolumeResults.css"
import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext"

const resultSets = [
  [
    { trial: 1, mass: "0.05", volume: "12.0" },
    { trial: 2, mass: "0.10", volume: "24.0" },
    { trial: 3, mass: "0.15", volume: "36.0" },
    { trial: 4, mass: "0.20", volume: "48.0" },
    { trial: 5, mass: "0.25", volume: "60.0" },
    { trial: 6, mass: "0.30", volume: "72.0" },
    { trial: 7, mass: "0.35", volume: "84.0" },
  ],

  [
    { trial: 1, mass: "0.05", volume: "11.9" },
    { trial: 2, mass: "0.10", volume: "23.8" },
    { trial: 3, mass: "0.15", volume: "35.7" },
    { trial: 4, mass: "0.20", volume: "47.6" },
    { trial: 5, mass: "0.25", volume: "59.5" },
    { trial: 6, mass: "0.30", volume: "71.4" },
    { trial: 7, mass: "0.35", volume: "83.3" },
  ],

  [
    { trial: 1, mass: "0.05", volume: "12.1" },
    { trial: 2, mass: "0.10", volume: "24.2" },
    { trial: 3, mass: "0.15", volume: "36.2" },
    { trial: 4, mass: "0.20", volume: "48.3" },
    { trial: 5, mass: "0.25", volume: "60.4" },
    { trial: 6, mass: "0.30", volume: "72.5" },
    { trial: 7, mass: "0.35", volume: "84.6" },
  ],
]

const MolarVolumeResults = ({
  onButtonContinue,
  autoFillDelay = 1000,
  onButtonResult
}) => {
  const {
    molarVolumeResultsState,
    setMolarVolumeResultsState,
  } = useContext(InteractionContext)

  const panelRef = useRef(null)
  const arrowRef = useRef(null)

  const isPanelOpenRef = useRef(true)
  const autoFillTimeoutRef = useRef(null)

  const [
    isPanelOpen,
    setIsPanelOpen,
  ] = useState(true)

  const {
    resultSetIndex,
    visibleResultCount,
    isAutoSimulating,
  } = molarVolumeResultsState

  const results =
    resultSets[resultSetIndex]

  const visibleResults =
    results.slice(
      0,
      visibleResultCount
    )

  const isSimulationComplete =
    visibleResultCount >=
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

  // =========================================================
  // INITIAL PANEL ANIMATION
  // =========================================================

  useLayoutEffect(() => {
    const panel =
      panelRef.current

    const arrow =
      arrowRef.current

    if (!panel || !arrow) {
      return
    }

    gsap.set(panel, {
      x: getClosedPosition(),
    })

    gsap.set(arrow, {
      rotation: 0,
    })

    gsap.to(panel, {
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
      if (isPanelOpenRef.current) {
        return
      }

      gsap.set(panel, {
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

      gsap.killTweensOf(panel)
      gsap.killTweensOf(arrow)
    }
  }, [])

  // =========================================================
  // AUTO SIMULATION
  // Continues even when this component remounts because
  // its state is stored in InteractionContext.
  // =========================================================

  useEffect(() => {
    if (!isAutoSimulating) {
      return
    }

    if (
      visibleResultCount >=
      results.length
    ) {
      setMolarVolumeResultsState(
        (previous) => ({
          ...previous,
          isAutoSimulating: false,
        })
      )

      return
    }

    autoFillTimeoutRef.current =
      setTimeout(() => {
        setMolarVolumeResultsState(
          (previous) => ({
            ...previous,

            visibleResultCount:
              Math.min(
                previous.visibleResultCount + 1,
                results.length
              ),
          })
        )
      }, autoFillDelay)

    return () => {
      if (autoFillTimeoutRef.current) {
        clearTimeout(
          autoFillTimeoutRef.current
        )
      }
    }
  }, [
    isAutoSimulating,
    visibleResultCount,
    results.length,
    autoFillDelay,
    setMolarVolumeResultsState,
  ])

  useEffect(() => {
    return () => {
      if (autoFillTimeoutRef.current) {
        clearTimeout(
          autoFillTimeoutRef.current
        )
      }
    }
  }, [])

  // =========================================================
  // PANEL OPEN / CLOSE
  // =========================================================

  const animatePanel = (
    shouldOpen,
    onAnimationComplete
  ) => {
    const panel =
      panelRef.current

    const arrow =
      arrowRef.current

    if (!panel || !arrow) {
      return
    }

    isPanelOpenRef.current =
      shouldOpen

    setIsPanelOpen(
      shouldOpen
    )

    gsap.killTweensOf(panel)
    gsap.killTweensOf(arrow)

    gsap.to(panel, {
      x: shouldOpen
        ? 0
        : getClosedPosition(),

      duration: 0.8,
      ease: "power3.inOut",

      onComplete:
        onAnimationComplete,
    })

    gsap.to(arrow, {
      rotation:
        shouldOpen
          ? 180
          : 0,

      duration: 0.8,
      ease: "power3.inOut",
    })
  }

  const handlePanelToggle = () => {
    animatePanel(
      !isPanelOpenRef.current
    )
  }

  // =========================================================
  // AUTO SIMULATE / SIMULATE AGAIN
  // =========================================================

  const handleAutoSimulate = () => {
    if (isAutoSimulating) {
      return
    }

    // Start a fresh data set after the previous
    // seven trials have completed.
    if (isSimulationComplete) {
      setMolarVolumeResultsState(
        (previous) => ({
          resultSetIndex:
            (previous.resultSetIndex + 1) %
            resultSets.length,

          visibleResultCount: 1,

          isAutoSimulating: true,
        })
      )

      return
    }

    setMolarVolumeResultsState(
      (previous) => ({
        ...previous,
        isAutoSimulating: true,
      })
    )
  }

  const handleContinue = () => {
    animatePanel(
      false,
      () => {
        onButtonContinue?.()
      }
    )
  }



  return (
    <div
      className={`
        Molar-results-overlay
        ${
          isPanelOpen
            ? "Molar-results-overlay-open"
            : "Molar-results-overlay-closed"
        }
      `}
    >
      <div
        ref={panelRef}
        className="Molar-results-wrapper"
      >
        <div className="Molar-results-label">
          <h1>
            Experiment Results
          </h1>
        </div>

        <button
          type="button"
          className="Molar-results-side-container"
          onClick={handlePanelToggle}
          aria-label={
            isPanelOpen
              ? "Close results panel"
              : "Open results panel"
          }
        >
          <img
            ref={arrowRef}
            src="./side-arrow.png"
            alt=""
          />
        </button>

        <div className="Molar-results-inner">
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
                      key={result.trial}
                      className="Molar-results-new-row"
                    >
                      <td>
                        <span className="Molar-results-trial-number">
                          {result.trial}
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
                type="button"
                className="Molar-results-auto-button"
                onClick={handleAutoSimulate}
                disabled={isAutoSimulating}
              >
                {isAutoSimulating
                  ? "Simulating..."
                  : isSimulationComplete
                    ? "Simulate Again"
                    : "Auto Simulate"}
              </button>

              <button
                type="button"
                className="Molar-results-continue-button"
                onClick={handleContinue}
              >
                Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MolarVolumeResults