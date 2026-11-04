import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import {
  gsap,
} from "gsap"

import "./ChlorinationSummary.css"

const ChlorinationSummary = ({
  productImage =
    "./assembleDistillationApparatus.png",

  onQuestions,
  onEndLesson,

  autoSlide = true,
}) => {
  const summaryRef =
    useRef(null)

  const arrowRef =
    useRef(null)

  const isSummaryOpenRef =
    useRef(true)

  const [
    isSummaryOpen,
    setIsSummaryOpen,
  ] = useState(true)

  const learnedItems = [
    "2-methylpropan-2-ol reacts with concentrated hydrochloric acid to produce 2-chloro-2-methylpropane.",
    "The reaction mixture is swirled and vented regularly to release pressure safely.",
    "Two layers form: the upper organic layer contains the crude product and the lower layer is aqueous.",
    "Anhydrous calcium chloride helps remove unreacted alcohol from the organic layer.",
    "Sodium hydrogencarbonate washes remove remaining acid and produce carbon dioxide bubbles.",
    "Anhydrous sodium sulfate dries the organic product before distillation.",
    "The pure product is collected at a boiling range of 50–52°C.",
    "A white silver chloride precipitate confirms chloride ions after hydrolysis.",
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
        chlorination-summary-overlay
        ${
          isSummaryOpen
            ? "chlorination-summary-overlay-open"
            : "chlorination-summary-overlay-closed"
        }
      `}
    >
      <section
        ref={summaryRef}
        className="chlorination-summary-container"
      >
        <div className="chlorination-summary-tab">
          Summary
        </div>

        <button
          type="button"
          className="chlorination-summary-side-toggle"
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

        <div className="chlorination-summary-layout">
          <aside className="chlorination-result-card">
            <div className="chlorination-result-header">
              <span className="chlorination-result-icon">
                ✓
              </span>

              <h2>
                Product Prepared
              </h2>
            </div>

            <div className="chlorination-image-wrapper">
              <img
                src={productImage}
                alt="Purified 2-chloro-2-methylpropane product"
              />
            </div>

            <div className="chlorination-product-name">
              2-Chloro-2-methylpropane
            </div>

            <div className="chlorination-product-facts">
              <div>
                <span>
                  Boiling range
                </span>

                <strong>
                  50–52°C
                </strong>
              </div>

              <div>
                <span>
                  Appearance
                </span>

                <strong>
                  Clear colourless liquid
                </strong>
              </div>
            </div>

            <p className="chlorination-result-text">
              The purified chloroalkane was collected
              by distillation and tested successfully
              for chloride ions.
            </p>
          </aside>

          <main className="chlorination-summary-content">
            <div className="chlorination-summary-card chlorination-aim-card">
              <h2>
                Our Aim
              </h2>

              <div className="chlorination-heading-line" />

              <p>
                <span className="chlorination-check">
                  ✓
                </span>

                Produce, purify, and confirm a sample
                of 2-chloro-2-methylpropane.
              </p>
            </div>

            <div className="chlorination-summary-card chlorination-reaction-card">
              <h2>
                Reaction
              </h2>

              <div className="chlorination-heading-line" />

              <div className="chlorination-equation">
                <span>
                  (CH₃)₃COH
                </span>

                <span>
                  +
                </span>

                <span>
                  HCl
                </span>

                <span className="chlorination-arrow">
                  →
                </span>

                <span>
                  (CH₃)₃CCl
                </span>

                <span>
                  +
                </span>

                <span>
                  H₂O
                </span>
              </div>

              <p>
                2-methylpropan-2-ol reacts with
                concentrated hydrochloric acid to form
                2-chloro-2-methylpropane and water.
              </p>
            </div>

            <div className="chlorination-summary-card chlorination-learned-card">
              <h2>
                What We Learned
              </h2>

              <div className="chlorination-heading-line" />

              <ul>
                {learnedItems.map(
                  (item) => (
                    <li key={item}>
                      <span className="chlorination-check">
                        ✓
                      </span>

                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="chlorination-summary-card chlorination-observation-card">
              <h2>
                Key Observations
              </h2>

              <div className="chlorination-heading-line" />

              <div className="chlorination-observations">
                <div className="chlorination-observation-row">
                  <span className="chlorination-observation-dot chlorination-upper-dot" />

                  <p>
                    <strong>
                      Upper layer:
                    </strong>
                    {" "}
                    crude organic product.
                  </p>
                </div>

                <div className="chlorination-observation-row">
                  <span className="chlorination-observation-dot chlorination-lower-dot" />

                  <p>
                    <strong>
                      Lower layer:
                    </strong>
                    {" "}
                    aqueous solution.
                  </p>
                </div>

                <div className="chlorination-observation-row">
                  <span className="chlorination-observation-dot chlorination-bubble-dot" />

                  <p>
                    Sodium hydrogencarbonate produced
                    carbon dioxide bubbles during
                    washing.
                  </p>
                </div>

                <div className="chlorination-observation-row">
                  <span className="chlorination-observation-dot chlorination-precipitate-dot" />

                  <p>
                    Silver nitrate gave a white silver
                    chloride precipitate.
                  </p>
                </div>
              </div>
            </div>

            <div className="chlorination-summary-card chlorination-conclusion-card">
              <h2>
                Conclusion
              </h2>

              <div className="chlorination-heading-line" />

              <p>
                2-chloro-2-methylpropane was prepared
                from 2-methylpropan-2-ol, purified by
                washing, drying, and distillation, then
                confirmed by the formation of a white
                silver chloride precipitate.
              </p>
            </div>

            <div className="chlorination-summary-actions">
              <button
                type="button"
                className="chlorination-summary-button chlorination-questions-button"
                onClick={handleQuestions}
              >
                Questions
              </button>

              <button
                type="button"
                className="chlorination-summary-button chlorination-finish-button"
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

export default ChlorinationSummary