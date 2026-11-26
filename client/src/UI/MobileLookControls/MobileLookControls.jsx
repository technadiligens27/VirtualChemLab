import {
  useThree,
} from "@react-three/fiber"

import {
  useEffect,
  useRef,
} from "react"

import * as THREE from "three"

const MobileLookControls = ({

  sensitivity = 0.003,

  maxLookAngle = 85,

}) => {

  const {
    camera,
    gl,
    invalidate,
  } = useThree()

  const pointerIdRef = useRef(null)

  const previousPositionRef = useRef({
    x: 0,
    y: 0,
  })

  const eulerRef = useRef(
    new THREE.Euler(0, 0, 0, "YXZ")
  )


  useEffect(() => {

    const canvas = gl.domElement

    const maxPitch =
      THREE.MathUtils.degToRad(
        maxLookAngle
      )


    // ==========================================
    // TOUCH START
    // ==========================================

    const handlePointerDown = (event) => {

      if (event.pointerType !== "touch") {
        return
      }

      if (
        pointerIdRef.current !== null
      ) {
        return
      }

      const rect =
        canvas.getBoundingClientRect()

      // Only start camera movement
      // on the right half of the screen.

      if (
        event.clientX <
        rect.left + rect.width / 2
      ) {
        return
      }

      pointerIdRef.current =
        event.pointerId

      previousPositionRef.current.x =
        event.clientX

      previousPositionRef.current.y =
        event.clientY

      canvas.setPointerCapture(
        event.pointerId
      )

    }


    // ==========================================
    // TOUCH MOVEMENT
    // ==========================================

    const handlePointerMove = (event) => {

      if (
        event.pointerId !==
        pointerIdRef.current
      ) {
        return
      }

      const deltaX =
        event.clientX -
        previousPositionRef.current.x

      const deltaY =
        event.clientY -
        previousPositionRef.current.y

      previousPositionRef.current.x =
        event.clientX

      previousPositionRef.current.y =
        event.clientY


      // Get the current camera rotation.

      const euler =
        eulerRef.current

      euler.setFromQuaternion(
        camera.quaternion,
        "YXZ"
      )


      // Horizontal camera rotation.

      euler.y -=
        deltaX * sensitivity


      // Vertical camera rotation.

      euler.x -=
        deltaY * sensitivity


      // Prevent the camera from
      // flipping upside down.

      euler.x =
        THREE.MathUtils.clamp(
          euler.x,
          -maxPitch,
          maxPitch
        )


      // Prevent unwanted camera roll.

      euler.z = 0


      // Apply the new camera rotation.

      camera.quaternion.setFromEuler(
        euler
      )

      invalidate()

    }


    // ==========================================
    // TOUCH END
    // ==========================================

    const handlePointerEnd = (event) => {

      if (
        event.pointerId !==
        pointerIdRef.current
      ) {
        return
      }

      pointerIdRef.current = null

      if (
        canvas.hasPointerCapture(
          event.pointerId
        )
      ) {

        canvas.releasePointerCapture(
          event.pointerId
        )

      }

    }


    // ==========================================
    // RESET TOUCH INPUT
    // ==========================================

    const resetPointer = () => {

      const pointerId =
        pointerIdRef.current

      pointerIdRef.current = null

      if (
        pointerId !== null &&
        canvas.hasPointerCapture(pointerId)
      ) {
        canvas.releasePointerCapture(pointerId)
      }

    }


    // ==========================================
    // EVENT LISTENERS
    // ==========================================

    canvas.addEventListener(
      "pointerdown",
      handlePointerDown
    )

    canvas.addEventListener(
      "pointermove",
      handlePointerMove
    )

    canvas.addEventListener(
      "pointerup",
      handlePointerEnd
    )

    canvas.addEventListener(
      "pointercancel",
      handlePointerEnd
    )

    canvas.addEventListener(
      "lostpointercapture",
      handlePointerEnd
    )

    window.addEventListener(
      "blur",
      resetPointer
    )

    window.addEventListener(
      "resize",
      resetPointer
    )


    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {

      resetPointer()

      canvas.removeEventListener(
        "pointerdown",
        handlePointerDown
      )

      canvas.removeEventListener(
        "pointermove",
        handlePointerMove
      )

      canvas.removeEventListener(
        "pointerup",
        handlePointerEnd
      )

      canvas.removeEventListener(
        "pointercancel",
        handlePointerEnd
      )

      canvas.removeEventListener(
        "lostpointercapture",
        handlePointerEnd
      )

      window.removeEventListener(
        "blur",
        resetPointer
      )

      window.removeEventListener(
        "resize",
        resetPointer
      )

    }

  }, [
    camera,
    gl,
    invalidate,
    sensitivity,
    maxLookAngle,
  ])

  return null
}

export default MobileLookControls