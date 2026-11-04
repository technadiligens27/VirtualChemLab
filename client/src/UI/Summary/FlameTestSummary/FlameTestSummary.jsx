import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import {
  gsap,
} from "gsap"

import "./FlameTestSummary.css"

const flameTestResults = [
  {
    id: "lithium-chloride",
    name: "Lithium Chloride",
    colour: "crimson-red",
    image: "./lithium-chloride-flame.png",
    className: "crimson-text",
  },
  {
    id: "sodium-chloride",
    name: "Sodium Chloride",
    colour: "yellow-orange",
    image: "./sodium-chloride-flame.png",
    className: "yellow-text",
  },
  {
    id: "potassium-chloride",
    name: "Potassium Chloride",
    colour: "lilac",
    image: "./potassium-chloride-flame.png",
    className: "lilac-text",
  },
  {
    id: "calcium-chloride",
    name: "Calcium Chloride",
    colour: "brick-red",
    image: "./calcium-chloride-flame.png",
    className: "brick-red-text",
  },
  {
    id: "copper-chloride",
    name: "Copper Chloride",
    colour: "blue-green",
    image: "./copper-chloride-flame.png",
    className: "blue-green-text",
  },
  {
    id: "barium-chloride",
    name: "Barium Chloride",
    colour: "apple-green",
    image: "./barium-chloride-flame.png",
    className: "apple-green-text",
  },
]

const FlameTestSummary = ({
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

  const [
    selectedResult,
    setSelectedResult,
  ] = useState(
    flameTestResults[0]
  )

  const learnedItems = [
    "Nichrome wire withstands high temperatures.",
    "Hydrochloric acid removes impurities.",
    "Heat the wire until no unwanted colour appears.",
    "Use a blue Bunsen flame.",
    "Metal ions produce characteristic flame colours.",
  ]

  // =========================================================
  // GET CLOSED LEFT POSITION
  // =========================================================

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
  // OPEN / CLOSE PANEL
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
        flame-summary-overlay
        ${
          isSummaryOpen
            ? "flame-summary-overlay-open"
            : "flame-summary-overlay-closed"
        }
      `}
    >
      <section
        ref={summaryRef}
        className="flame-summary-container"
      >
        <div className="flame-summary-tab">
          Summary
        </div>

        <button
          type="button"
          className="flame-summary-side-toggle"
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

        <div className="flame-summary-layout">
          <aside className="flame-result-card">
            <div className="flame-result-card-header">
              <span className="flame-result-icon">
                ◉
              </span>

              <h2>
                Flame Test Result
              </h2>
            </div>

            <div className="flame-image-wrapper">
              <img
                src={selectedResult.image}
                alt={`${selectedResult.name} flame test`}
              />
            </div>

            <label className="flame-salt-label">
              <select
                value={selectedResult.id}
                onChange={(event) => {
                  const nextResult =
                    flameTestResults.find(
                      (result) =>
                        result.id ===
                        event.target.value
                    )

                  if (nextResult) {
                    setSelectedResult(
                      nextResult
                    )
                  }
                }}
              >
                {flameTestResults.map(
                  (result) => (
                    <option
                      key={result.id}
                      value={result.id}
                    >
                      {result.name}
                    </option>
                  )
                )}
              </select>

              <span className="flame-chevron">
                ▼
              </span>
            </label>

            <p className="flame-result-text">
              <strong>
                {selectedResult.name}
              </strong>
              {" "}produces a{" "}
              <strong
                className={
                  selectedResult.className
                }
              >
                {selectedResult.colour} flame.
              </strong>
            </p>
          </aside>

          <main className="flame-summary-content">
            <div className="flame-summary-card flame-aim-card">
              <h2>
                Our Aim
              </h2>

              <div className="summary-heading-line" />

              <p>
                <span className="summary-check">
                  ✓
                </span>

                Identify metal ions by their
                characteristic flame colours.
              </p>
            </div>

            <div className="flame-summary-card flame-learned-card">
              <h2>
                What We Learned
              </h2>

              <div className="summary-heading-line" />

              <ul>
                {learnedItems.map((item) => (
                  <li key={item}>
                    <span className="summary-check">
                      ✓
                    </span>

                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flame-summary-card flame-conclusion-card">
              <h2>
                Conclusion
              </h2>

              <div className="summary-heading-line" />

              <p>
                Flame tests help identify certain
                metal ions by the colours they
                produce when heated. Cleaning the
                wire loop between tests ensures
                more accurate observations.
              </p>
            </div>

            <div className="flame-summary-actions">
              <button
                type="button"
                className="flame-summary-button flame-summary-questions"
                onClick={handleQuestions}
              >
                Questions
              </button>

              <button
                type="button"
                className="flame-summary-button flame-summary-finish"
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

export default FlameTestSummary