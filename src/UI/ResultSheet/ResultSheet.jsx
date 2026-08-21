import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./ResultsSheet.css"

const ResultsSheet = ({
  data,
  onButtonContinue,
}) => {
  const resultsRef = useRef(null)
  const arrowRef = useRef(null)

  const isResultsOpenRef = useRef(true)

  const [
    isResultsOpen,
    setIsResultsOpen,
  ] = useState(true)

  useLayoutEffect(() => {
    const results =
      resultsRef.current

    const arrow =
      arrowRef.current

    if (!results || !arrow) return

    const getClosedPosition = () => {
      return -(
        window.innerWidth / 2 +
        results.offsetWidth / 2
      )
    }

    gsap.set(results, {
      x: getClosedPosition(),
    })

    gsap.set(arrow, {
      rotation: 0,
    })

    gsap.to(results, {
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
      if (
        isResultsOpenRef.current
      ) {
        return
      }

      gsap.set(results, {
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

      gsap.killTweensOf(results)
      gsap.killTweensOf(arrow)
    }
  }, [])

  const getClosedPosition = () => {
    const results =
      resultsRef.current

    if (!results) return 0

    return -(
      window.innerWidth / 2 +
      results.offsetWidth / 2
    )
  }

  const animateResults = (
    shouldOpen,
    onAnimationComplete
  ) => {
    const results =
      resultsRef.current

    const arrow =
      arrowRef.current

    if (!results || !arrow) return

    isResultsOpenRef.current =
      shouldOpen

    setIsResultsOpen(
      shouldOpen
    )

    gsap.killTweensOf(results)
    gsap.killTweensOf(arrow)

    gsap.to(results, {
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

  const handleResultsToggle = () => {
    const nextOpenState =
      !isResultsOpenRef.current

    animateResults(
      nextOpenState
    )
  }

  const handleContinue = () => {
    animateResults(
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
      className={`results-sheet-overlay ${
        isResultsOpen
          ? "results-sheet-overlay-open"
          : "results-sheet-overlay-closed"
      }`}
    >
      <div
        ref={resultsRef}
        className="results-sheet-panel"
      >
        {/* HEADER */}

        <div className="results-sheet-header">
          <h1>
            {data.headerTitle}
          </h1>
        </div>

        {/* SIDE TOGGLE */}

        <button
          type="button"
          className="results-sheet-side"
          onClick={
            handleResultsToggle
          }
          aria-label={
            isResultsOpen
              ? "Close results"
              : "Open results"
          }
        >
          <img
            ref={arrowRef}
            src="./side-arrow.png"
            alt=""
          />
        </button>

        <div className="results-sheet-inner">
          {/* TITLE */}

          <div className="results-sheet-title">
            {data.title && (
              <h1>
                {data.title}
              </h1>
            )}

            {data.subtitle && (
              <h2>
                {data.subtitle}
              </h2>
            )}

            {data.description && (
              <p>
                {data.description}
              </p>
            )}
          </div>

          {/* TABLE */}

          {data.table && (
            <div className="results-sheet-table">
              <div className="results-sheet-row results-sheet-table-header">
                {data.table.columns.map(
                  (
                    column,
                    index
                  ) => (
                    <div key={index}>
                      {column}
                    </div>
                  )
                )}
              </div>

              {data.table.rows.map(
                (
                  row,
                  rowIndex
                ) => (
                  <div
                    key={rowIndex}
                    className={`results-sheet-row ${
                      row.isFinal
                        ? "results-sheet-final"
                        : ""
                    }`}
                  >
                    {row.cells.map(
                      (
                        cell,
                        cellIndex
                      ) => (
                        <div
                          key={
                            cellIndex
                          }
                          className={
                            cell.className ||
                            ""
                          }
                        >
                          {
                            cell.content
                          }
                        </div>
                      )
                    )}
                  </div>
                )
              )}
            </div>
          )}

          {/* CALCULATION */}

          {data.calculation && (
            <div className="results-sheet-calculation">
              {data.calculation
                .title && (
                <h2>
                  {
                    data
                      .calculation
                      .title
                  }
                </h2>
              )}

              {data.calculation
                .formula && (
                <div className="results-sheet-formula">
                  {
                    data
                      .calculation
                      .formula
                  }
                </div>
              )}

              {data.calculation
                .working && (
                <div className="results-sheet-working">
                  {
                    data
                      .calculation
                      .working
                  }
                </div>
              )}

              {data.calculation
                .result && (
                <div className="results-sheet-answer">
                  {
                    data
                      .calculation
                      .result
                  }
                </div>
              )}
            </div>
          )}

          {/* OBSERVATION */}

          {data.observation && (
            <div className="results-sheet-observation">
              <div className="results-sheet-info">
                i
              </div>

              <div>
                {data.observation
                  .title && (
                  <h2>
                    {
                      data
                        .observation
                        .title
                    }
                  </h2>
                )}

                {data.observation
                  .description && (
                  <p>
                    {
                      data
                        .observation
                        .description
                    }
                  </p>
                )}
              </div>
            </div>
          )}

          {/* CONTINUE */}

          <button
            type="button"
            className="results-sheet-button"
            onClick={
              handleContinue
            }
          >
            {data.buttonText ||
              "Continue"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultsSheet