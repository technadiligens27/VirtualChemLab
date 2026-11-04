import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import {
  gsap,
} from "gsap"

import "./SulfamicSummary.css"

const SulfamicSummary = ({
  emptyTestTubeMass = 24.80,
  testTubeWithSulfamicAcidMass = 24.75,

  roughTitre = 24.8,
  trialOne = 24.80,
  trialTwo = 24.75,

  titrationImage =
    "./sulfamicRoughTitration.png",

  onQuestions,
  onEndLesson,
  onResult,

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

  const sulfamicAcidMass =
    testTubeWithSulfamicAcidMass -
    emptyTestTubeMass

  const meanTitre =
    (trialOne + trialTwo) / 2

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
        shouldOpen
          ? 180
          : 0,

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

  const handleResult = () => {
    animateSummary(
      false,
      () => {
        onResult?.()
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
        sulfamic-summary-overlay
        ${
          isSummaryOpen
            ? "sulfamic-summary-overlay-open"
            : "sulfamic-summary-overlay-closed"
        }
      `}
    >
      <section
        ref={summaryRef}
        className="sulfamic-summary-container"
      >
        <div className="sulfamic-summary-tab">
          Summary
        </div>

        <button
          type="button"
          className="sulfamic-summary-side-toggle"
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

        <div className="sulfamic-summary-layout">
          {/* =================================================
              LEFT RESULT CARD
          ================================================= */}

          <aside className="sulfamic-result-card">
            <div className="sulfamic-result-header">
              <span className="sulfamic-result-icon">
                ◉
              </span>

              <h2>
                Titration Result
              </h2>
            </div>

            <div className="sulfamic-image-area">
              <img
                className="sulfamic-image"
                src={titrationImage}
                alt="Sulfamic acid and sodium hydroxide titration"
              />

              <div className="sulfamic-titre-display">
                <span>
                  Mean titre
                </span>

                <strong>
                  {meanTitre.toFixed(2)}
                  <small>
                    {" "}cm³
                  </small>
                </strong>

                <p>
                  Sulfamic acid delivered
                </p>
              </div>
            </div>

            <div className="sulfamic-label">
              Sulfamic Acid Titration
            </div>

            {/* <p className="sulfamic-result-text">
              The prepared sulfamic acid solution
              neutralised the sodium hydroxide at the
              methyl orange endpoint.
            </p> */}

            <div className="sulfamic-mass-grid">
              <div>
                <span>
                  Trial 01
                </span>

                <strong>
                  {emptyTestTubeMass.toFixed(2)}
                  {" "}g
                </strong>
              </div>

              <div>
                <span>
                  Trial 02
                </span>

                <strong>
                  {testTubeWithSulfamicAcidMass.toFixed(
                    2
                  )}
                  {" "}g
                </strong>
              </div>

              <div className="sulfamic-mass-final">
                <span>
                  Sulfamic acid used
                </span>

                <strong>
                  {/* {sulfamicAcidMass.toFixed(2)} */}
                  {" 2.50 "}g
                </strong>
              </div>
            </div>

            <div className="sulfamic-equation-box">
              <span>
                NH<sub>2</sub>SO<sub>3</sub>H(aq)
              </span>

              <span>
                +
              </span>

              <span>
                NaOH(aq)
              </span>

              <span className="sulfamic-arrow">
                →
              </span>

              <span>
                NH<sub>2</sub>SO<sub>3</sub>Na(aq)
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
              RIGHT SUMMARY CONTENT
          ================================================= */}

          <main className="sulfamic-summary-content">
            <div className="sulfamic-summary-card sulfamic-aim-card">
              <h2>
                Our Aim
              </h2>

              <div className="sulfamic-heading-line" />

              <p>
                <span className="sulfamic-check">
                  ✓
                </span>

                Prepare a standard solution of sulfamic
                acid and use it to determine the
                concentration of sodium hydroxide.
              </p>
            </div>

            <div className="sulfamic-middle-grid">
              <div className="sulfamic-summary-card sulfamic-learned-card">
                <h2>
                  What We Learned
                </h2>

                <div className="sulfamic-heading-line" />

                <ul>
                  <li>
                    <span className="sulfamic-check">
                      ✓
                    </span>

                    Sulfamic acid is weighed accurately
                    by subtracting the empty test-tube
                    mass from the final mass.
                  </li>

                  <li>
                    <span className="sulfamic-check">
                      ✓
                    </span>

                    The sulfamic acid is dissolved in
                    water before being transferred to a
                    250 cm³ volumetric flask.
                  </li>

                  <li>
                    <span className="sulfamic-check">
                      ✓
                    </span>

                    The beaker washings are transferred
                    into the volumetric flask to avoid
                    losing any sulfamic acid.
                  </li>

                  <li>
                    <span className="sulfamic-check">
                      ✓
                    </span>

                    Methyl orange changes from yellow to
                    orange when the titration endpoint is
                    reached.
                  </li>
                </ul>
              </div>

              <div className="sulfamic-summary-card sulfamic-observation-card">
                <h2>
                  Key Observations
                </h2>

                <div className="sulfamic-heading-line" />

                <div className="sulfamic-observation-list">
                  <div>
                    <strong>
                      White solid dissolves
                    </strong>

                    <span>
                      Sulfamic acid produces a clear,
                      colourless solution in water.
                    </span>
                  </div>

                  <div>
                    <strong>
                      Yellow solution
                    </strong>

                    <span>
                      Sodium hydroxide with methyl orange
                      starts yellow.
                    </span>
                  </div>

                  <div>
                    <strong>
                      Orange endpoint
                    </strong>

                    <span>
                      The endpoint is reached when orange
                      remains after swirling.
                    </span>
                  </div>

                  <div>
                    <strong>
                      Concordant titres
                    </strong>

                    <span>
                      Similar titres make the calculated
                      concentration more reliable.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sulfamic-summary-card sulfamic-conclusion-card">
              <h2>
                Conclusion
              </h2>

              <div className="sulfamic-heading-line" />

              <p>
                A standard solution of <strong>sulfamic acid</strong> was prepared and used to neutralise sodium hydroxide. The <strong>mean concordant titre</strong> can be used with the 1 : 1 mole ratio to calculate the concentration of the sodium hydroxide solution.
              </p>
            </div>

            <div className="sulfamic-summary-actions">
              <button
                type="button"
                className="molar-summary-button molar-finish-button molar-result-button"
                onClick={handleResult}
              >
                Results
              </button>

              <button
                type="button"
                className="sulfamic-summary-button sulfamic-questions-button"
                onClick={handleQuestions}
              >
                Questions
              </button>

              <button
                type="button"
                className="sulfamic-summary-button sulfamic-finish-button"
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

export default SulfamicSummary