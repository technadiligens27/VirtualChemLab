import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import "./ReactionTimer.css"

import {
  MainGuidelineContext,
} from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const ReactionTimer = ({
  isRunning,

  onStop,

  onSkip,

  // Normal count-up stop time in seconds.
  stopTime = 7,

  // Countdown settings.
  reverseBoolean = true,
  reverseTime = 5,

  // ==========================================
  // POSITION
  // Use values such as "40px", "10%", or "auto".
  // ==========================================
  top,
  right,
  bottom,
  left,
}) => {
  const [
    elapsedTime,
    setElapsedTime,
  ] = useState(
    reverseBoolean
      ? reverseTime * 60
      : 0
  )

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const startTimeRef =
    useRef(null)

  const intervalRef =
    useRef(null)

  const hasStoppedRef =
    useRef(false)

  useEffect(() => {
    const isReverseTimer =
      reverseBoolean === true

    const reverseTimeInSeconds =
      Math.max(
        0,
        reverseTime * 60
      )

    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(
          intervalRef.current
        )

        intervalRef.current = null
      }

      return
    }

    if (
      startTimeRef.current === null
    ) {
      startTimeRef.current =
        Date.now()

      hasStoppedRef.current = false

      setElapsedTime(
        isReverseTimer
          ? reverseTimeInSeconds
          : 0
      )

      console.log(
        "⏱️ Reaction timer started"
      )
    }

    intervalRef.current = setInterval(
      () => {
        if (
          startTimeRef.current === null
        ) {
          return
        }

        const timePassed =
          (Date.now() -
            startTimeRef.current) /
          1000

        // ======================================
        // COUNTDOWN MODE
        // ======================================

        if (isReverseTimer) {
          const remainingTime =
            Math.max(
              0,
              reverseTimeInSeconds -
                timePassed
            )

          setElapsedTime(
            remainingTime
          )

          if (
            remainingTime <= 0 &&
            !hasStoppedRef.current
          ) {
            hasStoppedRef.current =
              true

            clearInterval(
              intervalRef.current
            )

            intervalRef.current = null

            onStop?.()

            if (
              selectedLesson === 14.4 &&
              lessonStep === 144
            ) {
              setLessonStep(145)
            }

            console.log(
              "⏹️ Countdown finished"
            )
          }

          return
        }

        // ======================================
        // COUNT-UP MODE
        // ======================================

        if (
          stopTime !== null &&
          timePassed >= stopTime
        ) {
          setElapsedTime(stopTime)

          clearInterval(
            intervalRef.current
          )

          intervalRef.current = null

          if (
            !hasStoppedRef.current
          ) {
            hasStoppedRef.current =
              true

            onStop?.()
          }

          return
        }

        setElapsedTime(timePassed)
      },
      100
    )

    return () => {
      if (intervalRef.current) {
        clearInterval(
          intervalRef.current
        )

        intervalRef.current = null
      }
    }
  }, [
    isRunning,
    stopTime,
    onStop,
    reverseBoolean,
    reverseTime,
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  const minutes =
    Math.floor(elapsedTime / 60)

  const seconds =
    Math.floor(elapsedTime % 60)

  const decimal =
    Math.floor(
      (elapsedTime % 1) * 10
    )

  const formattedTime =
    `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(
      2,
      "0"
    )}.${decimal}`

  return (
    <div
      className="reaction-timer"
      style={{
        top,
        right,
        bottom,
        left,
      }}
    >
      <div className="reaction-timer-header">
        <div className="reaction-timer-icon">
          <span className="reaction-timer-clock-hand" />
        </div>

        <p>
          Reaction Time
        </p>
      </div>

      <div className="reaction-timer-body">
        <p className="reaction-timer-status">
          {isRunning
            ? reverseBoolean
              ? "Countdown in progress..."
              : "Reaction in progress..."
            : "Reaction stopped"}
        </p>

        <h2>
          {formattedTime}
        </h2>

        <div className="reaction-timer-divider">
          <span />
        </div>

        <button
          type="button"
          className="reaction-timer-skip-button"
          onClick={() => {
            onSkip?.()
          }}
        >
          Skip
        </button>
      </div>

      {isRunning && (
        <div className="reaction-timer-small-status">
          <span />

          <p>
            {reverseBoolean
              ? "Countdown in progress..."
              : "Reaction in progress..."}
          </p>
        </div>
      )}
    </div>
  )
}

export default ReactionTimer