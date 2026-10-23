import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import {
  gsap,
} from "gsap"

import "./HCLTitrationSummary.css"

const HCLTitrationSummary = ({
  initialBuretteReading = 24.80,
  finalBuretteReading = 24.70,
  meanTitre = 24.75,

  titrationImage =
    "./roughTitration.png",

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
  // OPEN / CLOSE SUMMARY
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
        hcl-summary-overlay
        ${
          isSummaryOpen
            ? "hcl-summary-overlay-open"
            : "hcl-summary-overlay-closed"
        }
      `}
    >
      <section
        ref={summaryRef}
        className="hcl-summary-container"
      >
        <div className="hcl-summary-tab">
          Summary
        </div>

        <button
          type="button"
          className="hcl-summary-side-toggle"
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

        <div className="hcl-summary-layout">
          {/* =================================================
              LEFT RESULT CARD
          ================================================= */}

          <aside className="hcl-result-card">
            <div className="hcl-result-header">
              <span className="hcl-result-icon">
                ◉
              </span>

              <h2>
                Titration Result
              </h2>
            </div>

            <div className="hcl-titration-image-area">
              <img
                className="hcl-titration-image"
                src={titrationImage}
                alt="Hydrochloric acid titration setup"
              />

              <div className="hcl-titre-display">
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
                  Sodium hydroxide delivered
                </p>
              </div>
            </div>

            <div className="hcl-label">
              Hydrochloric Acid Titration
            </div>

            <p className="hcl-result-text">
              A measured volume of standard sodium
              hydroxide was required to neutralise
              the diluted hydrochloric acid.
            </p>

            <div className="hcl-reading-grid">
              <div>
                <span>
                  Reading 01
                </span>

                <strong>
                  {initialBuretteReading.toFixed(2)}
                  {" "}cm³
                </strong>
              </div>

              <div>
                <span>
                  Reading 02
                </span>

                <strong>
                  {finalBuretteReading.toFixed(2)}
                  {" "}cm³
                </strong>
              </div>
            </div>

            <div className="hcl-equation-box">
              <span>
                HCl(aq)
              </span>

              <span>
                +
              </span>

              <span>
                NaOH(aq)
              </span>

              <span className="hcl-arrow">
                →
              </span>

              <span>
                NaCl(aq)
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

          <main className="hcl-summary-content">
            <div className="hcl-summary-card hcl-aim-card">
              <h2>
                Our Aim
              </h2>

              <div className="hcl-heading-line" />

              <p>
                <span className="hcl-check">
                  ✓
                </span>

                Find the concentration of hydrochloric
                acid by titrating it against a known
                concentration of sodium hydroxide.
              </p>
            </div>

            <div className="hcl-middle-grid">
              <div className="hcl-summary-card hcl-learned-card">
                <h2>
                  What We Learned
                </h2>

                <div className="hcl-heading-line" />

                <ul>
                  <li>
                    <span className="hcl-check">
                      ✓
                    </span>

                    The hydrochloric acid is diluted
                    accurately in a 250 cm³ volumetric
                    flask.
                  </li>

                  <li>
                    <span className="hcl-check">
                      ✓
                    </span>

                    A 25.0 cm³ aliquot of diluted
                    hydrochloric acid is transferred
                    into a conical flask.
                  </li>

                  <li>
                    <span className="hcl-check">
                      ✓
                    </span>

                    Standard sodium hydroxide is added
                    from the burette during titration.
                  </li>

                  <li>
                    <span className="hcl-check">
                      ✓
                    </span>

                    Phenolphthalein is colourless in
                    acid and becomes pale pink at the
                    endpoint.
                  </li>
                </ul>
              </div>

              <div className="hcl-summary-card hcl-observation-card">
                <h2>
                  Key Observations
                </h2>

                <div className="hcl-heading-line" />

                <div className="hcl-observation-list">
                  <div>
                    <strong>
                      Colourless solution
                    </strong>

                    <span>
                      Diluted HCl and phenolphthalein
                      are initially colourless.
                    </span>
                  </div>

                  <div>
                    <strong>
                      Temporary pale pink
                    </strong>

                    <span>
                      Near the endpoint, pink flashes
                      disappear when the flask is swirled.
                    </span>
                  </div>

                  <div>
                    <strong>
                      Persistent pale pink
                    </strong>

                    <span>
                      This shows the endpoint has been
                      reached.
                    </span>
                  </div>

                  <div>
                    <strong>
                      Concordant titres
                    </strong>

                    <span>
                      Repeated similar titres give a more
                      reliable result.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hcl-summary-card hcl-conclusion-card">
              <h2>
                Conclusion
              </h2>

              <div className="hcl-heading-line" />

              <p>
                The concentration of <strong>hydrochloric acid</strong> can be calculated from the volume of <strong>standard sodium hydroxide</strong> needed to reach the phenolphthalein endpoint. The reaction has a <strong>1 : 1 mole ratio</strong> between HCl and NaOH.
              </p>
            </div>

            <div className="hcl-summary-actions">
              <button
                type="button"
                className="molar-summary-button molar-finish-button molar-result-button"
                onClick={handleResult}
              >
                Results
              </button>

              <button
                type="button"
                className="hcl-summary-button hcl-questions-button"
                onClick={handleQuestions}
              >
                Questions
              </button>

              <button
                type="button"
                className="hcl-summary-button hcl-finish-button"
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

export default HCLTitrationSummary