import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./MolarVolumeReduced.css"

const MolarVolumeReduced = ({
  onButtonContinue,
  startingWaterVolume = 100,
  finalWaterVolume = 88,
  gasVolume = 12,
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
      className={`molar-volume-reduced-overlay ${
        isPanelOpen
          ? "molar-volume-reduced-overlay-open"
          : "molar-volume-reduced-overlay-closed"
      }`}
    >
      <div
        className="molar-volume-reduced-wrapper"
        ref={panelRef}
      >
        {/* ==========================================
            TITLE
        ========================================== */}

        <div className="molar-volume-reduced-label">
          <h1>
            Gas Collected
          </h1>
        </div>

        {/* ==========================================
            SIDE TOGGLE
        ========================================== */}

        <button
          className="molar-volume-reduced-side-container"
          onClick={
            handlePanelToggle
          }
          aria-label={
            isPanelOpen
              ? "Close gas volume panel"
              : "Open gas volume panel"
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

        <div className="molar-volume-reduced-inner">

          {/* ==========================================
              LEFT
          ========================================== */}

          <div className="molar-volume-reduced-left">

            <div className="molar-volume-reduced-heading">
              <h1>
                The water level has decreased:
              </h1>
            </div>

            {/* ==========================================
                MAIN READING
            ========================================== */}

            <div className="molar-volume-reduced-reading">

              <div className="molar-volume-reduced-icon">
                <span>
                  ↓
                </span>
              </div>

              <div>
                <p className="molar-volume-reduced-small-label">
                  CO₂ Collected
                </p>

                <h2>
                  {gasVolume}
                  <span>
                    {" "}
                    cm³
                  </span>
                </h2>
              </div>

            </div>

            {/* ==========================================
                EXPLANATION
            ========================================== */}

            <div className="molar-volume-reduced-explanation">

              <div className="molar-volume-reduced-explanation-title">

                <div className="molar-volume-reduced-info-icon">
                  i
                </div>

                <h2>
                  Why did the water level fall?
                </h2>

              </div>

              <p>
                Carbon dioxide produced in the
                boiling tube travels through
                the delivery tube and enters
                the inverted measuring
                cylinder.
              </p>

              <div className="molar-volume-reduced-divider" />

              <div className="molar-volume-reduced-room">

                <div className="molar-volume-reduced-room-icon">
                  <span>
                    ↓
                  </span>
                </div>

                <p>
                  The CO₂
                  <strong>
                    {" "}displaces the water{" "}
                  </strong>
                  inside the measuring
                  cylinder. The volume of
                  water displaced is equal to
                  the volume of gas collected.
                </p>

              </div>

            </div>

            {/* ==========================================
                CONTINUE
            ========================================== */}

            <button
              className="molar-volume-reduced-button"
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

          <div className="molar-volume-reduced-right">

            <img
              src="./measuringCylinderGas.png"
              alt="Carbon dioxide collected in an inverted measuring cylinder"
            />

            <div className="molar-volume-reduced-reading-label">

              <p>
                Water Volume
              </p>

              <h2>
                {startingWaterVolume}
                {" → "}
                {finalWaterVolume}
                {" cm³"}
              </h2>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default MolarVolumeReduced