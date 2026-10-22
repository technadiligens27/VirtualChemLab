import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import {
  gsap,
} from "gsap"

import "./ExothermicReactionSummary.css"

const ExothermicReactionSummary = ({
  temperatureChange = "+9.5 °C",

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
    "Potassium carbonate reacts with hydrochloric acid.",
    "A polystyrene cup reduces heat loss.",
    "The starting temperature is recorded first.",
    "The solution is stirred continuously.",
    "Carbon dioxide gas causes visible bubbling.",
    "The temperature increases during the reaction.",
    "Heat energy is released to the surroundings.",
    "This is an exothermic reaction.",
    "Exothermic reactions have a negative ΔH.",
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
        exothermic-summary-overlay
        ${
          isSummaryOpen
            ? "exothermic-summary-overlay-open"
            : "exothermic-summary-overlay-closed"
        }
      `}
    >
      <section
        ref={summaryRef}
        className="exothermic-summary-container"
      >
        <div className="exothermic-summary-tab">
          Summary
        </div>

        <button
          type="button"
          className="exothermic-summary-side-toggle"
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

        <div className="exothermic-summary-layout">
          <aside className="exothermic-result-card">
            <div className="exothermic-result-header">
              <span className="exothermic-result-icon">
                ♨
              </span>

              <h2>
                Reaction Result
              </h2>
            </div>

            <div className="exothermic-temperature-area">
              <img
                className="exothermic-thermometer-image"
                src={thermometerImage}
                alt="Thermometer showing a temperature rise"
              />

              <div className="exothermic-temperature-info">
                <span>
                  Temperature Change
                </span>

                <strong>
                  {temperatureChange}
                </strong>

                <p>
                  The temperature increased.
                </p>
              </div>
            </div>

            <div className="exothermic-label">
              Exothermic Reaction
            </div>

            <p className="exothermic-result-text">
              Heat energy was
              <strong>
                {" "}released{" "}
              </strong>
              to the surroundings.
            </p>

            <div className="exothermic-equation-box">
              <span>
                K<sub>2</sub>CO<sub>3</sub>(s)
              </span>

              <span>+</span>

              <span>
                2HCl(aq)
              </span>

              <span className="exothermic-arrow">
                →
              </span>

              <span>
                2KCl(aq)
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

          <main className="exothermic-summary-content">
            <div className="exothermic-summary-card exothermic-aim-card">
              <h2>
                Our Aim
              </h2>

              <div className="exothermic-heading-line" />

              <p>
                <span className="exothermic-check">
                  ✓
                </span>

                Investigate potassium carbonate
                and hydrochloric acid to determine
                whether the reaction is exothermic.
              </p>
            </div>

            <div className="exothermic-middle-grid">
              <div className="exothermic-summary-card exothermic-learned-card">
                <h2>
                  What We Learned
                </h2>

                <div className="exothermic-heading-line" />

                <ul>
                  {learnedItems.map((item) => (
                    <li key={item}>
                      <span className="exothermic-check">
                        ✓
                      </span>

                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="exothermic-summary-card exothermic-observation-card">
                <h2>
                  Key Observations
                </h2>

                <div className="exothermic-heading-line" />

                <div className="exothermic-observation-list">
                  <div>
                    <strong>
                      Temperature rises
                    </strong>

                    <span>
                      Heat is released
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
                      Highest temperature
                    </strong>

                    <span>
                      Used to find ΔT
                    </span>
                  </div>

                  <div>
                    <strong>
                      ΔH is negative
                    </strong>

                    <span>
                      Reaction is exothermic
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="exothermic-summary-card exothermic-calculation-card">
              <div className="exothermic-calculation-content">
                <div>
                  <h2>
                    Energy Calculation
                  </h2>

                  <div className="exothermic-heading-line" />

                  <p>
                    The heat energy transferred is
                    calculated using:
                  </p>
                </div>

                <div className="exothermic-formula">
                  q = mcΔT
                </div>

                <div className="exothermic-formula-info">
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
            </div> */}

            {/* <div className="exothermic-summary-card exothermic-conclusion-card">
              <h2>
                Conclusion
              </h2>

              <div className="exothermic-heading-line" />

              <p>
                The reaction between
                <strong>
                  {" "}potassium carbonate
                </strong>
                {" "}and
                <strong>
                  {" "}hydrochloric acid
                </strong>
                {" "}is exothermic because the
                temperature increases. This shows
                that heat energy is released to
                the surroundings.
              </p>
            </div> */}

            <div className="exothermic-summary-actions">
              <button
                type="button"
                className="exothermic-summary-button exothermic-questions-button"
                onClick={handleQuestions}
              >
                Questions
              </button>

              <button
                type="button"
                className="exothermic-summary-button exothermic-finish-button"
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

export default ExothermicReactionSummary