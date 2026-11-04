import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./HessLessonIntroduction.css"

const HessLessonIntroduction = ({
  onStartLesson,
}) => {
  const introductionRef = useRef(null)
  const arrowRef = useRef(null)

  const isIntroductionOpenRef =
    useRef(true)

  const [
    isIntroductionOpen,
    setIsIntroductionOpen,
  ] = useState(true)

  useLayoutEffect(() => {
    const introduction =
      introductionRef.current

    const arrow = arrowRef.current

    if (!introduction || !arrow) return

    const getClosedPosition = () => {
      return -(
        window.innerWidth / 2 +
        introduction.offsetWidth / 2
      )
    }

    gsap.set(introduction, {
      x: getClosedPosition(),
    })

    gsap.set(arrow, {
      rotation: 0,
    })

    gsap.to(introduction, {
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
        isIntroductionOpenRef.current
      ) return

      gsap.set(introduction, {
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

      gsap.killTweensOf(introduction)
      gsap.killTweensOf(arrow)
    }
  }, [])

  const getClosedPosition = () => {
    const introduction =
      introductionRef.current

    if (!introduction) return 0

    return -(
      window.innerWidth / 2 +
      introduction.offsetWidth / 2
    )
  }

  const animateIntroduction = (
    shouldOpen,
    onAnimationComplete
  ) => {
    const introduction =
      introductionRef.current

    const arrow = arrowRef.current

    if (!introduction || !arrow) return

    isIntroductionOpenRef.current =
      shouldOpen

    setIsIntroductionOpen(shouldOpen)

    gsap.killTweensOf(introduction)
    gsap.killTweensOf(arrow)

    gsap.to(introduction, {
      x: shouldOpen
        ? 0
        : getClosedPosition(),
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: onAnimationComplete,
    })

    gsap.to(arrow, {
      rotation: shouldOpen ? 180 : 0,
      duration: 0.8,
      ease: "power3.inOut",
    })
  }

  const handleIntroductionToggle = () => {
    const nextOpenState =
      !isIntroductionOpenRef.current

    animateIntroduction(nextOpenState)
  }

  const handleStartLesson = () => {
    animateIntroduction(false, () => {
      if (onStartLesson) {
        onStartLesson()
      }
    })
  }

  return (
    <div
      className={`hess-introduction-overlay ${
        isIntroductionOpen
          ? "hess-introduction-overlay-open"
          : "hess-introduction-overlay-closed"
      }`}
    >
      <div className="hess-introduction-panel" ref={introductionRef}>
        <div className="hess-introduction-header">
          <h1>Before You Begin</h1>
        </div>

        <button className="hess-introduction-side-button" onClick={handleIntroductionToggle} aria-label={isIntroductionOpen
  ? "Close lesson introduction"
  : "Open lesson introduction"}
        >
          <img ref={arrowRef} src="./side-arrow.png" alt=""/>
        </button>

        <div className="hess-introduction-inner">
          <div className="hess-introduction-top">
            <div className="hess-introduction-heading">
              <h1>
                Core Practical 2 — Enthalpy
                Change Using Hess’s Law
              </h1>

              <p>
                In this practical, you will
                measure the temperature changes
                for two reactions. You will calculate their molar
                enthalpy changes and use Hess’s
                Law to determine the enthalpy
                change for the thermal
                decomposition of potassium
                hydrogencarbonate.
              </p>
            </div>

            <div className="hess-introduction-objective">
              <div className="hess-objective-header">
                <div className="hess-objective-icon">
                  ◎
                </div>

                <h2>What You Will Do</h2>
              </div>

              <div className="hess-objective-content">
                <p>
                  You will carry out two
                  reactions, measure their
                  temperature changes, and use
                  Hess’s Law to calculate the
                  enthalpy change for a third
                  reaction.
                </p>
              </div>
            </div>
          </div>

          <div className="hess-reactions-section">
            <div className="hess-reactions-title">
              <span className="hess-flask-icon">
                ⚗
              </span>

              <h1>The Reactions</h1>

              <div className="hess-title-line" />
            </div>

            <div className="hess-reactions-list">
              <div className="hess-reaction-row hess-reaction-one">
                <div className="hess-reaction-label">
                  <h1>Reaction 1</h1>

                  <p>(Exothermic)</p>
                </div>

                <div className="hess-reaction-details">
                  <div className="hess-reaction-equation">
                    <span>
                      K<sub>2</sub>CO
                      <sub>3</sub>(s) + 2HCl(aq)
                      {" → "}
                      2KCl(aq) + CO
                      <sub>2</sub>(g) + H
                      <sub>2</sub>O(l)
                    </span>
                  </div>

                  <div className="hess-reaction-explanation">
                    <p>
                      This reaction releases
                      heat.
                    </p>

                    <p>
                      You should see the
                      temperature rise.
                    </p>
                  </div>
                </div>
              </div>

              <div className="hess-reaction-row hess-reaction-two">
                <div className="hess-reaction-label">
                  <h1>Reaction 2</h1>
                  <p>(Endothermic)</p>
                </div>

                <div className="hess-reaction-details">
                  <div className="hess-reaction-equation">
                    <span>
                      KHCO<sub>3</sub>(s) +
                      HCl(aq)
                      {" → "}
                      KCl(aq) + CO
                      <sub>2</sub>(g) + H
                      <sub>2</sub>O(l)
                    </span>
                  </div>

                  <div className="hess-reaction-explanation">
                    <p>
                      This reaction absorbs
                      heat.
                    </p>

                    <p>
                      You should see the
                      temperature fall.
                    </p>
                  </div>
                </div>
              </div>

              <div className="hess-reaction-row hess-reaction-three">
                <div className="hess-reaction-label hess-calculated-label">
                  <h1>
                    Reaction to be calculated
                  </h1>

                  <p>
                    (Using Hess’s Law)
                  </p>
                </div>

                <div className="hess-reaction-details">
                  <div className="hess-reaction-equation">
                    <span>
                      2KHCO<sub>3</sub>(s)
                      {" → "}
                      K<sub>2</sub>CO
                      <sub>3</sub>(s) + CO
                      <sub>2</sub>(g) + H
                      <sub>2</sub>O(l)
                    </span>
                  </div>

                  <div className="hess-reaction-explanation">
                    <p>
                      This reaction is not
                      carried out directly.
                    </p>

                    <p>
                      It is calculated using the
                      results from Reactions 1
                      and 2.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hess-introduction-bottom">
            <div className="hess-important-box">
              <div className="hess-important-icon">
                !
              </div>

              <h3>Important</h3>

              <div className="hess-important-text">
                <p>
                  The temperature change in
                  Reaction 1 should be a rise.
                </p>

                <p>
                  The temperature change in
                  Reaction 2 should be a fall.
                </p>
              </div>
            </div>

            <button
              className="hess-start-lesson-button"
              onClick={handleStartLesson}
            >
              Start Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HessLessonIntroduction