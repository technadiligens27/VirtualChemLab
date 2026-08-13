import { useEffect, useRef, useState } from "react"
import "./ReactionTimer.css"

const ReactionTimer = ({
  isRunning,
  onStop,
  text
}) => {
  const [elapsedTime, setElapsedTime] = useState(0)

  const startTimeRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      return
    }

    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now()
      console.log("⏱️ Reaction timer started")
    }

    intervalRef.current = setInterval(() => {
      if (startTimeRef.current === null) return

      const elapsed = (Date.now() - startTimeRef.current) / 1000

      setElapsedTime(elapsed)
    }, 100)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning])

  const minutes = Math.floor(elapsedTime / 60)
  const seconds = Math.floor(elapsedTime % 60)
  const decimal = Math.floor((elapsedTime % 1) * 10)

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${decimal}`

  return (
    <div className="reaction-timer">

      <div className="reaction-timer-header">

        <div className="reaction-timer-icon">
          <span className="reaction-timer-clock-hand"></span>
        </div>

        <p>Reaction Time</p>

      </div>

      <div className="reaction-timer-body">

        <p className="reaction-timer-status">
          {isRunning ? "Reaction in progress..." : "Reaction stopped"}
        </p>

        <h2>
          {formattedTime}
        </h2>

        <div className="reaction-timer-divider">
          <span></span>
        </div>

        <div className="reaction-timer-info">

          <div className="reaction-timer-info-icon">
            i
          </div>

          <p>
            {text}
          </p>

        </div>

      </div>

      {isRunning && (
        <div className="reaction-timer-small-status">

          <span></span>

          <p>
            Reaction in progress...
          </p>

        </div>
      )}

    </div>
  )
}

export default ReactionTimer