import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./HessReactionOneResults.css"

const HessReactionOneResults = ({
  massWithPowder = 24.7,
  massAfterEmptying = 21.72,
  startingTemperature = 22.0,
  highestTemperature = 31.5,
  onButtonContinue,
}) => {
  const resultsRef = useRef(null)
  const arrowRef = useRef(null)

  const isResultsOpenRef = useRef(true)

  const [
    isResultsOpen,
    setIsResultsOpen,
  ] = useState(true)

  const massUsed =
    massWithPowder -
    massAfterEmptying

  const temperatureChange =
    highestTemperature -
    startingTemperature

  useLayoutEffect(() => {
    const results = resultsRef.current
    const arrow = arrowRef.current

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
        shouldOpen ? 180 : 0,

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
        if (onButtonContinue) {
          onButtonContinue()
        }
      }
    )
  }

  return (
    <div
      className={`reaction1-results-overlay ${
        isResultsOpen
          ? "reaction1-results-overlay-open"
          : "reaction1-results-overlay-closed"
      }`}
    >
      <div
        ref={resultsRef}
        className="reaction1-results"
      >
        <div className="reaction1-results-header">
          <h1>
            Reaction 01 Results
          </h1>
        </div>

        <button
          type="button"
          className="reaction1-results-side"
          onClick={
            handleResultsToggle
          }
          aria-label={
            isResultsOpen
              ? "Close reaction results"
              : "Open reaction results"
          }
        >
          <img
            ref={arrowRef}
            src="./side-arrow.png"
            alt=""
          />
        </button>

        <div className="reaction1-results-inner">
          <div className="reaction1-results-title">
            <h1>
              Results for Reaction 01
            </h1>

            <h2>
              Potassium carbonate +
              hydrochloric acid
            </h2>

            <p>
              Review the recorded
              measurements and calculate
              the temperature change.
            </p>
          </div>

          <div className="reaction1-results-table">
            <div className="reaction1-results-row reaction1-results-table-header">
              <div>
                Measurement
              </div>

              <div>
                Formula
              </div>

              <div>
                Value
              </div>

              <div>
                Unit
              </div>
            </div>

            <div className="reaction1-results-row">
              <div>
                Mass of test tube with
                potassium carbonate
              </div>

              <div>
                m<sub>1</sub>
              </div>

              <div className="reaction1-results-value">
                {massWithPowder.toFixed(
                  2
                )}
              </div>

              <div>
                g
              </div>
            </div>

            <div className="reaction1-results-row">
              <div>
                Mass of test tube after
                emptying
              </div>

              <div>
                m<sub>2</sub>
              </div>

              <div className="reaction1-results-value">
                {massAfterEmptying.toFixed(
                  2
                )}
              </div>

              <div>
                g
              </div>
            </div>

            <div className="reaction1-results-row">
              <div>
                Mass of potassium
                carbonate used
              </div>

              <div>
                m<sub>1</sub> − m
                <sub>2</sub>
              </div>

              <div className="reaction1-results-value">
                {massUsed.toFixed(2)}
              </div>

              <div>
                g
              </div>
            </div>

            <div className="reaction1-results-row">
              <div>
                Starting temperature
              </div>

              <div>
                T<sub>start</sub>
              </div>

              <div className="reaction1-results-value">
                {startingTemperature.toFixed(
                  1
                )}
              </div>

              <div>
                °C
              </div>
            </div>

            <div className="reaction1-results-row">
              <div>
                Highest temperature
              </div>

              <div>
                T<sub>highest</sub>
              </div>

              <div className="reaction1-results-value">
                {highestTemperature.toFixed(
                  1
                )}
              </div>

              <div>
                °C
              </div>
            </div>

            <div className="reaction1-results-row reaction1-results-final">
              <div>
                Temperature change
              </div>

              <div>
                ΔT<sub>1</sub> = T
                <sub>highest</sub> − T
                <sub>start</sub>
              </div>

              <div className="reaction1-results-change">
                +
                {temperatureChange.toFixed(
                  1
                )}
              </div>

              <div>
                °C
              </div>
            </div>
          </div>

          <div className="reaction1-results-observation">
            <div className="reaction1-results-info">
              i
            </div>

            <div>
              <h2>
                Observation
              </h2>

              <p>
                The temperature
                increased. Reaction 01
                released heat, so it is an
                <strong>
                  {" "}
                  exothermic reaction.
                </strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            className="reaction1-results-button"
            onClick={
              handleContinue
            }
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default HessReactionOneResults