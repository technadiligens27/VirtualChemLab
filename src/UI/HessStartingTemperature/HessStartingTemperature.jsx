import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { gsap } from "gsap"

import "./HessStartingTemperature.css"

const HessStartingTemperature = ({
  onButtonContinue,
}) => {
  const temperatureRef = useRef(null)
  const arrowRef = useRef(null)
  const isTemperatureOpenRef = useRef(true)

  const [
    isTemperatureOpen,
    setIsTemperatureOpen,
  ] = useState(true)

  useLayoutEffect(() => {
    const temperature =
      temperatureRef.current
    const arrow = arrowRef.current

    if (!temperature || !arrow) return

    const getClosedPosition = () => {
      return -(
        window.innerWidth / 2 +
        temperature.offsetWidth / 2
      )
    }

    gsap.set(temperature, {
      x: getClosedPosition(),
    })

    gsap.set(arrow, {
      rotation: 0,
    })

    gsap.to(temperature, {
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
      if (isTemperatureOpenRef.current) {
        return
      }

      gsap.set(temperature, {
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

      gsap.killTweensOf(temperature)
      gsap.killTweensOf(arrow)
    }
  }, [])

  const getClosedPosition = () => {
    const temperature =
      temperatureRef.current

    if (!temperature) return 0

    return -(
      window.innerWidth / 2 +
      temperature.offsetWidth / 2
    )
  }

  const animateTemperature = (
    shouldOpen,
    onAnimationComplete
  ) => {
    const temperature =
      temperatureRef.current
    const arrow = arrowRef.current

    if (!temperature || !arrow) return

    isTemperatureOpenRef.current =
      shouldOpen

    setIsTemperatureOpen(shouldOpen)

    gsap.killTweensOf(temperature)
    gsap.killTweensOf(arrow)

    gsap.to(temperature, {
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

  const handleTemperatureToggle = () => {
    const nextOpenState =
      !isTemperatureOpenRef.current

    animateTemperature(nextOpenState)
  }

  const handleContinue = () => {
    animateTemperature(false, () => {
      if (onButtonContinue) {
        onButtonContinue()
      }
    })
  }

  return (
    <div
      className={`hess-temperature-overlay ${
        isTemperatureOpen
          ? "hess-temperature-overlay-open"
          : "hess-temperature-overlay-closed"
      }`}
    >
      <div
        className="hess-temperature-wrapper"
        ref={temperatureRef}
      >
        <div className="hess-temperature-label">
          <h1>Starting Temperature</h1>
        </div>

        <button
          className="hess-temperature-side-container"
          onClick={handleTemperatureToggle}
          aria-label={
            isTemperatureOpen
              ? "Close starting temperature"
              : "Open starting temperature"
          }
        >
          <img
            ref={arrowRef}
            src="./side-arrow.png"
            alt=""
          />
        </button>

        <div className="hess-temperature-inner">
          <div className="hess-temperature-left">
            <div className="hess-temperature-heading">
              <h1>
                The starting temperature is:
              </h1>
            </div>

            <div className="hess-temperature-reading">
              <div className="hess-temperature-icon">
                <span>♨</span>
              </div>

              <h2>
                22.0 <span>°C</span>
              </h2>
            </div>

            <div className="hess-temperature-explanation">
              <div className="hess-temperature-explanation-title">
                <div className="hess-temperature-info-icon">
                  i
                </div>

                <h2>Why is it 22.0 °C?</h2>
              </div>

              <p>
                The hydrochloric acid,
                polystyrene cup, and
                thermometer are all at room
                temperature before the
                reaction begins.
              </p>

              <div className="hess-temperature-divider" />

              <div className="hess-temperature-room">
                <div className="hess-temperature-room-icon">
                  <span>⌂</span>
                </div>

                <p>
                  The room temperature in the
                  laboratory is approximately
                  <strong> 22.0 °C.</strong>
                </p>
              </div>
            </div>

            <button
              className="hess-temperature-button"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>

          <div className="hess-temperature-right">
            <img
              src="./beakerWithThermometer.png"
              alt="Thermometer inside a polystyrene cup"
            />

            <div className="hess-temperature-reading-label">
              <p>Room Temperature</p>
              <h2>22.0 °C</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HessStartingTemperature