import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./HessGuidelines.css"

const HessGuidelines = ({
  guidelineData,
}) => {
  const guidelineRef =
    useRef(null)

  const arrowRef =
    useRef(null)

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

    if (
      !guideline ||
      !arrow
    ) {
      return
    }

    const getClosedPosition =
      () => {
        return -(
          window.innerWidth / 2 +
          guideline.offsetWidth / 2
        )
      }

    // Start outside screen
    gsap.set(guideline, {
      x: getClosedPosition(),
    })

    gsap.set(arrow, {
      rotation: 0,
    })

    // Slide in
    gsap.to(guideline, {
      x: 0,

      duration: 0.8,

      delay: 0.2,

      ease: "power3.inOut",
    })

    // Rotate arrow
    gsap.to(arrow, {
      rotation: 180,

      duration: 0.8,

      delay: 0.2,

      ease: "power3.inOut",
    })

    // =======================================================
    // HANDLE WINDOW RESIZE
    // =======================================================

    const handleResize =
      () => {
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
  }, [])

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

  const getClosedPosition =
    () => {
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

    if (
      !guideline ||
      !arrow
    ) {
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

  const handleContinue =
    () => {
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
        main-guidelines-2
        ${
          isGuidelineOpen
            ? "guideline-overlay-open"
            : "guideline-overlay-closed"
        }
      `}
    >
      <div
        className="hess-guideline"
        ref={guidelineRef}
      >
        {/* ===============================================
            TOP LABEL
        =============================================== */}

        <div className="lesson-header-container">
          <h1>
            What to do
          </h1>
        </div>

        {/* ===============================================
            SIDE TOGGLE
        =============================================== */}

        <button
          className="lesson-side-container"
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

        {/* ===============================================
            MAIN CONTENT
        =============================================== */}

        <div className="hess-guideline-inner">
          {/* =============================================
              LEFT SIDE
          ============================================= */}

          <div className="hess-left">
            {/* TITLE */}

            <div className="hess-title-container">
              <h1>
                {title}
              </h1>
            </div>

            {/* DESCRIPTION */}

            <p className="hess-description">
              {description}
            </p>

            {/* IMPLEMENTATION */}

            {implementationSteps.length >
              0 && (
              <div className="hess-steps">
                <div className="hess-steps-title">
                  <h1>
                    Implementation
                  </h1>
                </div>

                <div className="hess-inner-steps">
                  {implementationSteps.map(
                    (
                      step,
                      index
                    ) => (
                      <div
                        className="hess-lesson-step"
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
            )}

            {/* CONTINUE BUTTON */}

            <button
              className="hess-button"
              onClick={
                handleContinue
              }
            >
              Continue
            </button>
          </div>

          {/* =============================================
              RIGHT SIDE
          ============================================= */}

          {image && (
            <div className="hess-right">
              <div className="hess-right-inner">
                <img
                  src={image}
                  alt={
                    title ||
                    "Practical guideline"
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HessGuidelines