import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./SulfamicGuidelines.css"

const SulfamicGuidelines = ({
  guidelineData,

  // Auto slide in when mounted.
  // Defaults to true.
  autoSlide = true,
}) => {
  const guidelineRef = useRef(null)
  const arrowRef = useRef(null)

  const isGuidelineOpenRef =
    useRef(true)

  const [
    isGuidelineOpen,
    setIsGuidelineOpen,
  ] = useState(true)

  // =========================================================
  // INITIAL OPEN ANIMATION
  // =========================================================

  useLayoutEffect(() => {
    const guideline =
      guidelineRef.current

    const arrow =
      arrowRef.current

    if (!guideline || !arrow) {
      return
    }

    const getClosedPosition =
      () => {
        return -(
          window.innerWidth / 2 +
          guideline.offsetWidth / 2
        )
      }

    // =======================================================
    // AUTO SLIDE ENABLED
    // =======================================================

    if (autoSlide) {
      // Start outside screen.
      gsap.set(guideline, {
        x: getClosedPosition(),
      })

      gsap.set(arrow, {
        rotation: 0,
      })

      // Slide into view.
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
    }

    // =======================================================
    // AUTO SLIDE DISABLED
    // =======================================================

    else {
      // Immediately show panel without animation.
      gsap.set(guideline, {
        x: 0,
      })

      gsap.set(arrow, {
        rotation: 180,
      })

      isGuidelineOpenRef.current =
        true

      setIsGuidelineOpen(
        true
      )
    }

    // =======================================================
    // RESIZE
    // =======================================================

    const handleResize = () => {
      if (
        isGuidelineOpenRef.current
      ) {
        return
      }

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

      gsap.killTweensOf(
        guideline
      )

      gsap.killTweensOf(
        arrow
      )
    }
  }, [
    autoSlide,
  ])

  if (!guidelineData) {
    return null
  }

  // =========================================================
  // GUIDELINE DATA
  // =========================================================

  const {
    title,
    description,
    implementationSteps = [],
    image,
    onButtonContinue,
  } = guidelineData

  // =========================================================
  // GET CLOSED POSITION
  // =========================================================

  const getClosedPosition = () => {
    const guideline =
      guidelineRef.current

    if (!guideline) {
      return 0
    }

    return -(
      window.innerWidth / 2 +
      guideline.offsetWidth / 2
    )
  }

  // =========================================================
  // OPEN / CLOSE ANIMATION
  // =========================================================

  const animateGuideline = (
    shouldOpen,
    onAnimationComplete
  ) => {
    const guideline =
      guidelineRef.current

    const arrow =
      arrowRef.current

    if (!guideline || !arrow) {
      return
    }

    isGuidelineOpenRef.current =
      shouldOpen

    setIsGuidelineOpen(
      shouldOpen
    )

    gsap.killTweensOf(
      guideline
    )

    gsap.killTweensOf(
      arrow
    )

    gsap.to(guideline, {
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

  // =========================================================
  // SIDE TOGGLE
  // =========================================================

  const handleGuidelineToggle =
    () => {
      const nextOpenState =
        !isGuidelineOpenRef.current

      animateGuideline(
        nextOpenState
      )
    }

  // =========================================================
  // CONTINUE
  // =========================================================

  const handleContinue = () => {
    animateGuideline(
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

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      className={`
        sulfamic-guidelines-overlay
        ${
          isGuidelineOpen
            ? "sulfamic-overlay-open"
            : "sulfamic-overlay-closed"
        }
      `}
    >
      <div
        className="sulfamic-guideline"
        ref={guidelineRef}
      >
        {/* =================================================
            TOP LABEL
        ================================================= */}

        <div className="sulfamic-guideline-header">
          <h1>
            What to do
          </h1>
        </div>

        {/* =================================================
            SIDE TOGGLE
        ================================================= */}

        <button
          className="sulfamic-side-toggle"
          onClick={
            handleGuidelineToggle
          }
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

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="sulfamic-guideline-inner">
          {/* ===============================================
              LEFT SIDE
          =============================================== */}

          <div className="sulfamic-guideline-left">
            <div className="sulfamic-title-container">
              <h1>
                {title}
              </h1>
            </div>

            <p className="sulfamic-description">
              {description}
            </p>

            <div className="sulfamic-steps-container">
              <div className="sulfamic-steps-header">
                <h1>
                  Implementation
                </h1>
              </div>

              <div className="sulfamic-inner-steps">
                {implementationSteps.map(
                  (
                    step,
                    index
                  ) => (
                    <div
                      className="sulfamic-step"
                      key={index}
                    >
                      <img
                        src="./blue-tick.png"
                        alt=""
                      />

                      <p>
                        {step}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="sulfamic-continue-button-container">
              <button
                className="sulfamic-continue-button"
                onClick={
                  handleContinue
                }
              >
                Continue
              </button>
            </div>
          </div>

          {/* ===============================================
              RIGHT SIDE
          =============================================== */}

          <div className="sulfamic-guideline-right">
            <div className="sulfamic-image-container">
              {image && (
                <img
                  src={image}
                  alt={
                    title ||
                    "Sulfamic acid practical"
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SulfamicGuidelines