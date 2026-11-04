
import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./MolarVolumeCalciumCarbonateUsed.css"

const MolarVolumeCalciumCarbonateUsed = ({
  onButtonContinue,

  massBefore = 21.77,
  massAfter = 21.72,
  calciumCarbonateMass = 0.05,
}) => {
  const panelRef = useRef(null)
  const arrowRef = useRef(null)
  const isPanelOpenRef = useRef(true)

  const [
    isPanelOpen,
    setIsPanelOpen,
  ] = useState(true)

  useLayoutEffect(() => {
    const panel =
      panelRef.current

    const arrow =
      arrowRef.current

    if (
      !panel ||
      !arrow
    ) {
      return
    }

    const getClosedPosition = () => {
      return -(
        window.innerWidth / 2 +
        panel.offsetWidth / 2
      )
    }

    gsap.set(panel, {
      x: getClosedPosition(),
    })

    gsap.set(arrow, {
      rotation: 0,
    })

    gsap.to(panel, {
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
        isPanelOpenRef.current
      ) {
        return
      }

      gsap.set(panel, {
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

      gsap.killTweensOf(panel)
      gsap.killTweensOf(arrow)
    }
  }, [])

  const getClosedPosition = () => {
    const panel =
      panelRef.current

    if (!panel) {
      return 0
    }

    return -(
      window.innerWidth / 2 +
      panel.offsetWidth / 2
    )
  }

  const animatePanel = (
    shouldOpen,
    onAnimationComplete
  ) => {
    const panel =
      panelRef.current

    const arrow =
      arrowRef.current

    if (
      !panel ||
      !arrow
    ) {
      return
    }

    isPanelOpenRef.current =
      shouldOpen

    setIsPanelOpen(
      shouldOpen
    )

    gsap.killTweensOf(panel)
    gsap.killTweensOf(arrow)

    gsap.to(panel, {
      x: shouldOpen
        ? 0
        : getClosedPosition(),

      duration: 0.8,

      ease:
        "power3.inOut",

      onComplete:
        onAnimationComplete,
    })

    gsap.to(arrow, {
      rotation:
        shouldOpen
          ? 180
          : 0,

      duration: 0.8,

      ease:
        "power3.inOut",
    })
  }

  const handlePanelToggle = () => {
    const nextOpenState =
      !isPanelOpenRef.current

    animatePanel(
      nextOpenState
    )
  }

  const handleContinue = () => {
    animatePanel(
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
      className={`molar-caco3-overlay ${
        isPanelOpen
          ? "molar-caco3-overlay-open"
          : "molar-caco3-overlay-closed"
      }`}
    >
      <div
        className="molar-caco3-wrapper"
        ref={panelRef}
      >
        {/* ==========================================
            TITLE
        ========================================== */}

        <div className="molar-caco3-label">
          <h1>
            Calcium Carbonate Used
          </h1>
        </div>

        {/* ==========================================
            SIDE BUTTON
        ========================================== */}

        <button
          className="molar-caco3-side-container"
          onClick={
            handlePanelToggle
          }
          aria-label={
            isPanelOpen
              ? "Close calcium carbonate panel"
              : "Open calcium carbonate panel"
          }
        >
          <img
            ref={arrowRef}
            src="./side-arrow.png"
            alt=""
          />
        </button>

        {/* ==========================================
            INNER
        ========================================== */}

        <div className="molar-caco3-inner">

          {/* ==========================================
              LEFT
          ========================================== */}

          <div className="molar-caco3-left">

            <div className="molar-caco3-heading">
              <h1>
                Amount of calcium carbonate used:
              </h1>
            </div>

            {/* ==========================================
                MAIN READING
            ========================================== */}

            <div className="molar-caco3-reading">

              <div className="molar-caco3-icon">
                <span>
                  ⚖
                </span>
              </div>

              <div>
                <p className="molar-caco3-small-label">
                  CaCO₃ Mass
                </p>

                <h2>
                  {calciumCarbonateMass.toFixed(2)}
                  <span>
                    {" "}
                    g
                  </span>
                </h2>
              </div>

            </div>

            {/* ==========================================
                EXPLANATION
            ========================================== */}

            <div className="molar-caco3-explanation">

              <div className="molar-caco3-explanation-title">

                <div className="molar-caco3-info-icon">
                  i
                </div>

                <h2>
                  How is this calculated?
                </h2>

              </div>

              <p>
                The test tube is weighed
                before and after transferring
                the calcium carbonate into
                the boiling tube.
              </p>

              <div className="molar-caco3-divider" />

              <div className="molar-caco3-calculation">

                <div className="molar-caco3-calculation-row">
                  <span>
                    Before transfer
                  </span>

                  <strong>
                    {massBefore.toFixed(2)} g
                  </strong>
                </div>

                <div className="molar-caco3-calculation-row">
                  <span>
                    After transfer
                  </span>

                  <strong>
                    {massAfter.toFixed(2)} g
                  </strong>
                </div>

                <div className="molar-caco3-minus">
                  −
                </div>

                <div className="molar-caco3-result">
                  <span>
                    Mass transferred
                  </span>

                  <strong>
                    {calciumCarbonateMass.toFixed(2)} g
                  </strong>
                </div>

              </div>

            </div>

            {/* ==========================================
                CONTINUE
            ========================================== */}

            <button
              className="molar-caco3-button"
              onClick={
                handleContinue
              }
            >
              Continue
            </button>

          </div>

          {/* ==========================================
              RIGHT
          ========================================== */}

          <div className="molar-caco3-right">

            <img
              src="./calciumCarbonateUsed.png"
              alt="Test tube being weighed on a digital balance"
            />

            <div className="molar-caco3-reading-label">

              <p>
                Mass Difference
              </p>

              <h2>
                {massBefore.toFixed(2)}
                {" − "}
                {massAfter.toFixed(2)}
              </h2>

              <strong>
                = {calciumCarbonateMass.toFixed(2)} g
              </strong>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default MolarVolumeCalciumCarbonateUsed
