import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import {
  gsap,
} from "gsap"

import "./EndothermicReactionSummary.css"

const EndothermicReactionSummary = ({
  temperatureChange = "-7.0 °C",

  thermometerImage =
    "./beakerWithThermometer.png",

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

  const learnedItems = [
    "Potassium hydrogencarbonate reacts with hydrochloric acid.",
    "A fresh polystyrene cup is used for the reaction.",
    "The starting temperature is recorded first.",
    "The solution is stirred continuously.",
    "Carbon dioxide gas causes visible bubbling.",
    "The temperature decreases during the reaction.",
    "Heat energy is absorbed from the surroundings.",
    "This is an endothermic reaction.",
    "Endothermic reactions have a positive ΔH.",
  ]

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

    setIsSummaryOpen(shouldOpen)

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
      rotation: shouldOpen
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
        endothermic-summary-overlay
        ${
          isSummaryOpen
            ? "endothermic-summary-overlay-open"
            : "endothermic-summary-overlay-closed"
        }
      `}
    >
      <section
        ref={summaryRef}
        className="endothermic-summary-container"
      >
        <div className="endothermic-summary-tab">
          Summary
        </div>

        <button
          type="button"
          className="endothermic-summary-side-toggle"
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

        <div className="endothermic-summary-layout">
          <aside className="endothermic-result-card">
            <div className="endothermic-result-header">
              <span className="endothermic-result-icon">
                ❄
              </span>

              <h2>
                Reaction Result
              </h2>
            </div>

            <div className="endothermic-temperature-area">
              <img
                className="endothermic-thermometer-image"
                src={thermometerImage}
                alt="Thermometer showing a temperature decrease"
              />

              <div className="endothermic-temperature-info">
                <span>
                  Temperature Change
                </span>

                <strong>
                  {temperatureChange}
                </strong>

                <p>
                  The temperature decreased.
                </p>
              </div>
            </div>

            <div className="endothermic-label">
              Endothermic Reaction
            </div>

            <p className="endothermic-result-text">
              Heat energy was
              <strong>
                {" "}absorbed{" "}
              </strong>
              from the surroundings.
            </p>

            <div className="endothermic-equation-box">
              <span>
                KHCO<sub>3</sub>(s)
              </span>

              <span>+</span>

              <span>
                HCl(aq)
              </span>

              <span className="endothermic-arrow">
                →
              </span>

              <span>
                KCl(aq)
              </span>

              <span>+</span>

              <span>
                H<sub>2</sub>O(l)
              </span>

              <span>+</span>

              <span>
                CO<sub>2</sub>(g)
              </span>
            </div>
          </aside>

          <main className="endothermic-summary-content">
            <div className="endothermic-summary-card endothermic-aim-card">
              <h2>
                Our Aim
              </h2>

              <div className="endothermic-heading-line" />

              <p>
                <span className="endothermic-check">
                  ✓
                </span>

                Investigate potassium
                hydrogencarbonate and hydrochloric
                acid to determine whether the
                reaction is endothermic.
              </p>
            </div>

            <div className="endothermic-middle-grid">
              <div className="endothermic-summary-card endothermic-learned-card">
                <h2>
                  What We Learned
                </h2>

                <div className="endothermic-heading-line" />

                <ul>
                  {learnedItems.map((item) => (
                    <li key={item}>
                      <span className="endothermic-check">
                        ✓
                      </span>

                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="endothermic-summary-card endothermic-observation-card">
                <h2>
                  Key Observations
                </h2>

                <div className="endothermic-heading-line" />

                <div className="endothermic-observation-list">
                  <div>
                    <strong>
                      Temperature falls
                    </strong>

                    <span>
                      Heat is absorbed
                    </span>
                  </div>

                  <div>
                    <strong>
                      Bubbles form
                    </strong>

                    <span>
                      CO₂ is produced
                    </span>
                  </div>

                  <div>
                    <strong>
                      Lowest temperature
                    </strong>

                    <span>
                      Used to find ΔT
                    </span>
                  </div>

                  <div>
                    <strong>
                      ΔH is positive
                    </strong>

                    <span>
                      Reaction is endothermic
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="endothermic-summary-card endothermic-calculation-card">
              <div className="endothermic-calculation-content">
                <div>
                  <h2>
                    Energy Calculation
                  </h2>

                  <div className="endothermic-heading-line" />

                  <p>
                    The heat energy transferred is
                    calculated using:
                  </p>
                </div>

                <div className="endothermic-formula">
                  q = mcΔT
                </div>

                <div className="endothermic-formula-info">
                  <span>
                    q = heat energy transferred
                  </span>

                  <span>
                    m = mass of the solution
                  </span>

                  <span>
                    c = specific heat capacity
                  </span>

                  <span>
                    ΔT = temperature change
                  </span>
                </div>
              </div>
            </div>

            {/* <div className="endothermic-summary-card endothermic-conclusion-card">
              <h2>
                Conclusion
              </h2>

              <div className="endothermic-heading-line" />

              <p>
                The reaction between
                <strong>
                  {" "}potassium hydrogencarbonate
                </strong>
                {" "}and
                <strong>
                  {" "}hydrochloric acid
                </strong>
                {" "}is endothermic because the
                temperature decreases. This shows
                that heat energy is absorbed from
                the surroundings.
              </p>
            </div> */}

            <div className="endothermic-summary-actions">
              <button
                type="button"
                className="endothermic-summary-button endothermic-questions-button"
                onClick={handleQuestions}
              >
                Questions
              </button>

              <button
                type="button"
                className="endothermic-summary-button endothermic-finish-button"
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

export default EndothermicReactionSummary