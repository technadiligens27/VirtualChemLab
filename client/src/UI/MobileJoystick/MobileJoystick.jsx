import { useEffect } from "react"
import { Joystick } from "react-joystick-component"

import "./MobileJoystick.css"

const MobileJoystick = ({
  movementRef,
}) => {

  const handleMove = (event) => {

    movementRef.current.x = event.x ?? 0
    movementRef.current.y = event.y ?? 0

  }

  const handleStop = () => {

    movementRef.current.x = 0
    movementRef.current.y = 0

  }

  useEffect(() => {

    const resetMovement = () => {
      movementRef.current.x = 0
      movementRef.current.y = 0
    }

    window.addEventListener("blur", resetMovement)
    window.addEventListener("resize", resetMovement)

    document.addEventListener(
      "visibilitychange",
      resetMovement
    )

    return () => {

      resetMovement()

      window.removeEventListener("blur", resetMovement)
      window.removeEventListener("resize", resetMovement)

      document.removeEventListener(
        "visibilitychange",
        resetMovement
      )
    }

  }, [movementRef])

  return (
    <div
      className="mobile-joystick"
      onPointerCancel={handleStop}
      onLostPointerCapture={handleStop}
    >

      <Joystick
        size={110}
        stickSize={48}

        baseColor="rgba(0, 0, 0, 0.25)"
        stickColor="#4f7f93"

        sticky={false}

        move={handleMove}
        stop={handleStop}
      />

    </div>
  )
}

export default MobileJoystick