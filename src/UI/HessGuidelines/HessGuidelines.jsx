import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./HessGuidelines.css"

const HessGuidelines = ({ guidelineData }) => {
  const guidelineRef = useRef(null)
  const arrowRef = useRef(null)
  const isGuidelineOpenRef = useRef(true)

  const [isGuidelineOpen, setIsGuidelineOpen] =
    useState(true)

  useLayoutEffect(() => {
    const guideline = guidelineRef.current
    const arrow = arrowRef.current

    if (!guideline || !arrow) return

    const getClosedPosition = () => {
      return -(
        window.innerWidth / 2 +
        guideline.offsetWidth / 2
      )
    }

    gsap.set(guideline, {
      x: getClosedPosition(),
    })

    gsap.set(arrow, {
      rotation: 0,
    })

    gsap.to(guideline, {
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
      if (isGuidelineOpenRef.current) return

      gsap.set(guideline, {
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

      gsap.killTweensOf(guideline)
      gsap.killTweensOf(arrow)
    }
  }, [])

  if (!guidelineData) return null

  const {
    title,
    description,
    implementationSteps = [],
    image,
    onButtonContinue,
  } = guidelineData

  const getClosedPosition = () => {
    const guideline = guidelineRef.current

    if (!guideline) return 0

    return -(
      window.innerWidth / 2 +
      guideline.offsetWidth / 2
    )
  }

  const animateGuideline = (
    shouldOpen,
    onAnimationComplete
  ) => {
    const guideline = guidelineRef.current
    const arrow = arrowRef.current

    if (!guideline || !arrow) return

    isGuidelineOpenRef.current = shouldOpen
    setIsGuidelineOpen(shouldOpen)

    gsap.killTweensOf(guideline)
    gsap.killTweensOf(arrow)

    gsap.to(guideline, {
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

  const handleGuidelineToggle = () => {
    const nextOpenState =
      !isGuidelineOpenRef.current

    animateGuideline(nextOpenState)
  }

  const handleContinue = () => {
    animateGuideline(false, () => {
      if (onButtonContinue) {
        onButtonContinue()
      }
    })
  }

  return (
    <div
      className={`main-guidelines-2 ${
        isGuidelineOpen
          ? "guideline-overlay-open"
          : "guideline-overlay-closed"
      }`}
    >
      <div
        className="hess-guideline"
        ref={guidelineRef}
      >
        <div className="lesson-header-container">
          <h1>What to do</h1>
        </div>

        <button
          className="lesson-side-container"
          onClick={handleGuidelineToggle}
          aria-label={
            isGuidelineOpen
              ? "Close practical step"
              : "Open practical step"
          }
        >
          <img
            ref={arrowRef}
            src="./side-arrow.png"
            alt=""
          />
        </button>

        <div className="hess-guideline-inner">
          <div className="hess-left">
            <div className="hess-title-container">
              <h1>{title}</h1>
            </div>

            <p>{description}</p>

            <div className="hess-steps">
              <div className="hess-steps-title">
                <h1>Implementation</h1>
              </div>

              <div className="hess-inner-steps">
                {implementationSteps.map(
                  (step, index) => (
                    <div
                      className="hess-lesson-step"
                      key={index}
                    >
                      <img
                        src="./blue-tick.png"
                        alt=""
                      />

                      <p>{step}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <button
              className="hess-button"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>

          <div className="hess-right">
            <div className="hess-right-inner">
              <img
                src={image}
                alt={title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HessGuidelines