import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import {
  gsap,
} from "gsap"

import "./MolarVolumeSummary.css"

const MolarVolumeSummary = ({
  carbonDioxideVolume = 60,
  calciumCarbonateMass = 0.25,

  gasCollectionImage =
    "./molarVolumeSetup.png",

  onQuestions,
  onEndLesson,

  autoSlide = true,
}) => {
  const summaryRef = useRef(null)
  const arrowRef = useRef(null)

  const isSummaryOpenRef =
    useRef(true)

  const [
    isSummaryOpen,
    setIsSummaryOpen,
  ] = useState(true)

  const molesOfCalciumCarbonate =
    calciumCarbonateMass / 100

  const molarVolumeCm3 =
    carbonDioxideVolume /
    molesOfCalciumCarbonate

  const molarVolumeDm3 =
    molarVolumeCm3 / 1000

  const getClosedPosition = () => {
    const summary =
      summaryRef.current

    if (!summary) {
      return 0
    }

    return -(
      window.innerWidth / 2 +
      summary.offsetWidth / 2
    )
  }

  // =========================================================
  // INITIAL SLIDE IN
  // =========================================================

  useLayoutEffect(() => {
    const summary =
      summaryRef.current

    const arrow =
      arrowRef.current

    if (!summary || !arrow) {
      return
    }

    if (autoSlide) {
      gsap.set(summary, {
        x: getClosedPosition(),
      })

      gsap.set(arrow, {
        rotation: 0,
      })

      gsap.to(summary, {
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
    } else {
      gsap.set(summary, {
        x: 0,
      })

      gsap.set(arrow, {
        rotation: 180,
      })
    }

    const handleResize = () => {
      if (isSummaryOpenRef.current) {
        return
      }

      gsap.set(summary, {
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

      gsap.killTweensOf(summary)
      gsap.killTweensOf(arrow)
    }
  }, [
    autoSlide,
  ])

  // =========================================================
  // OPEN / CLOSE
  // =========================================================

  const animateSummary = (
    shouldOpen,
    onAnimationComplete
  ) => {
    const summary =
      summaryRef.current

    const arrow =
      arrowRef.current

    if (!summary || !arrow) {
      return
    }

    isSummaryOpenRef.current =
      shouldOpen

    setIsSummaryOpen(
      shouldOpen
    )

    gsap.killTweensOf(summary)
    gsap.killTweensOf(arrow)

    gsap.to(summary, {
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
        shouldOpen ? 180 : 0,

      duration: 0.8,
      ease: "power3.inOut",
    })
  }

  const handleSummaryToggle = () => {
    animateSummary(
      !isSummaryOpenRef.current
    )
  }

  const handleQuestions = () => {
    animateSummary(
      false,
      () => {
        onQuestions?.()
      }
    )
  }

  const handleEndLesson = () => {
    animateSummary(
      false,
      () => {
        onEndLesson?.()
      }
    )
  }

  return (
    <div
      className={`
        molar-summary-overlay
        ${
          isSummaryOpen
            ? "molar-summary-overlay-open"
            : "molar-summary-overlay-closed"
        }
      `}
    >
      <section
        ref={summaryRef}
        className="molar-summary-container"
      >
        <div className="molar-summary-tab">
          Summary
        </div>

        <button
          type="button"
          className="molar-summary-side-toggle"
          onClick={handleSummaryToggle}
          aria-label={
            isSummaryOpen
              ? "Close summary"
              : "Open summary"
          }
        >
          <img
            ref={arrowRef}
            src="./side-arrow.png"
            alt=""
          />
        </button>

        <div className="molar-summary-layout">
          {/* =================================================
              LEFT RESULT CARD
          ================================================= */}

          <aside className="molar-result-card">
            <div className="molar-result-header">
              <span className="molar-result-icon">
                ◉
              </span>

              <h2>
                Molar Volume Result
              </h2>
            </div>

            <div className="molar-gas-area">
              <img
                className="molar-gas-image"
                src={gasCollectionImage}
                alt="Carbon dioxide collected in a measuring cylinder"
              />

              <div className="molar-gas-info">
                <span>
                  CO₂ collected
                </span>

                <strong>
                  {carbonDioxideVolume}
                  <small>
                    {" "}cm³
                  </small>
                </strong>

                <p>
                  From{" "}
                  {calciumCarbonateMass.toFixed(2)}
                  {" "}g of CaCO₃
                </p>
              </div>
            </div>

            <div className="molar-label">
              Carbon Dioxide Gas
            </div>

            <p className="molar-result-text">
              The volume of carbon dioxide was
              measured after the reaction had
              finished and bubbling had stopped.
            </p>

            <div className="molar-equation-box">
              <span>
                CaCO<sub>3</sub>(s)
              </span>

              <span>
                +
              </span>

              <span>
                2CH<sub>3</sub>COOH(aq)
              </span>

              <span className="molar-arrow">
                →
              </span>

              <span>
                CO<sub>2</sub>(g)
              </span>

              <span>
                +
              </span>

              <span>
                H<sub>2</sub>O(l)
              </span>
            </div>
          </aside>

          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <main className="molar-summary-content">
            <div className="molar-summary-card molar-aim-card">
              <h2>
                Our Aim
              </h2>

              <div className="molar-heading-line" />

              <p>
                <span className="molar-check">
                  ✓
                </span>

                Find the volume of one mole of
                carbon dioxide gas by reacting
                calcium carbonate with ethanoic acid.
              </p>
            </div>

            <div className="molar-middle-grid">
              <div className="molar-summary-card molar-learned-card">
                <h2>
                  What We Learned
                </h2>

                <div className="molar-heading-line" />

                <ul>
                  <li>
                    <span className="molar-check">
                      ✓
                    </span>

                    Calcium carbonate reacts with
                    ethanoic acid to produce carbon
                    dioxide gas.
                  </li>

                  <li>
                    <span className="molar-check">
                      ✓
                    </span>

                    Carbon dioxide displaces water
                    from the inverted measuring
                    cylinder.
                  </li>

                  <li>
                    <span className="molar-check">
                      ✓
                    </span>

                    The experiment is repeated
                    using different masses of
                    calcium carbonate.
                  </li>

                  <li>
                    <span className="molar-check">
                      ✓
                    </span>

                    A graph can be used to find
                    the molar volume of the gas.
                  </li>
                </ul>
              </div>

              <div className="molar-summary-card molar-observation-card">
                <h2>
                  Key Observation
                </h2>

                <div className="molar-heading-line" />

                <div className="molar-observation-list">
                  <div>
                    <strong>
                      Bubbles form
                    </strong>

                    <span>
                      Carbon dioxide gas is produced.
                    </span>
                  </div>

                  <div>
                    <strong>
                      Water level falls
                    </strong>

                    <span>
                      Gas collects in the cylinder.
                    </span>
                  </div>

                  <div>
                    <strong>
                      Volume increases
                    </strong>

                    <span>
                      More CaCO₃ produces more CO₂.
                    </span>
                  </div>

                  <div>
                    <strong>
                      Straight-line graph
                    </strong>

                    <span>
                      Volume is proportional to mass.
                    </span>
                  </div>
                </div>
              </div>
            </div>
{/* 
            <div className="molar-summary-card molar-calculation-card">
              <h2>
                Molar Volume Calculation
              </h2>

              <div className="molar-heading-line" />

              <div className="molar-calculation-content">
                <div>
                  <p>
                    Use the graph value for
                    <strong>
                      {" "}0.25 g of calcium carbonate
                    </strong>
                    {" "}and the 1 : 1 mole ratio
                    between CaCO₃ and CO₂.
                  </p>
                </div>

                <div className="molar-formula">
                  {molarVolumeDm3.toFixed(1)}
                  {" "}dm³ mol<sup>−1</sup>
                </div>
              </div>

              <div className="molar-formula-info">
                <span>
                  Moles of CaCO₃ =
                  {" "}
                  {calciumCarbonateMass.toFixed(2)}
                  {" "}÷ 100
                </span>

                <span>
                  ={" "}
                  {molesOfCalciumCarbonate.toFixed(
                    4
                  )}
                  {" "}mol
                </span>

                <span>
                  Volume of CO₂ =
                  {" "}
                  {carbonDioxideVolume}
                  {" "}cm³
                </span>

                <span>
                  Molar volume =
                  {" "}
                  {carbonDioxideVolume}
                  {" "}÷{" "}
                  {molesOfCalciumCarbonate.toFixed(
                    4
                  )}
                </span>
              </div>
            </div> */}

            <div className="molar-summary-card molar-conclusion-card">
              <h2>
                Conclusion
              </h2>

              <div className="molar-heading-line" />

            <p>
            The reaction between <strong>calcium carbonate and ethanoic acid</strong> produces carbon dioxide gas. The gas volume increases as the mass of calcium carbonate increases, allowing the molar volume of carbon dioxide to be calculated.
            </p>
            </div>

            <div className="molar-summary-actions">
              <button
                type="button"
                className="molar-summary-button molar-questions-button"
                onClick={handleQuestions}
              >
                Questions
              </button>

              <button
                type="button"
                className="molar-summary-button molar-finish-button"
                onClick={handleEndLesson}
              >
                Finish Lesson

                <span>
                  ›
                </span>
              </button>
            </div>
          </main>
        </div>
      </section>
    </div>
  )
}

export default MolarVolumeSummary