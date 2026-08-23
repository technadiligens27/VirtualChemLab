import {
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

const SwirlModel = ({
  modelRef,

  swirlSpeed = 8,
  swirlAmount = 0.15,

  stopDelay = 0.5,
  returnSpeed = 5,
}) => {

  const isSwirlingRef = useRef(false)

  // Keeps increasing continuously.
  // NEVER reset this when scrolling.
  const swirlTimeRef = useRef(0)

  // Used to know when user stopped scrolling.
  const timeSinceLastScrollRef = useRef(0)

  const originalRotationRef = useRef({
    x: 0,
    y: 0,
    z: 0,
  })


  // ==========================================
  // STORE ORIGINAL ROTATION
  // ==========================================

  useEffect(() => {

    if (!modelRef?.current) return

    const model = modelRef.current

    originalRotationRef.current = {
      x: model.rotation.x,
      y: model.rotation.y,
      z: model.rotation.z,
    }

  }, [modelRef])


  // ==========================================
  // WHEEL
  // ==========================================

  useEffect(() => {

    const handleWheel = () => {

      if (!modelRef?.current) return

      // Start / continue swirling.
      isSwirlingRef.current = true

      // Reset ONLY the "user stopped scrolling" timer.
      // Do NOT reset swirlTimeRef.
      timeSinceLastScrollRef.current = 0

    }


    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: true,
      }
    )


    return () => {

      window.removeEventListener(
        "wheel",
        handleWheel
      )

    }

  }, [modelRef])


  // ==========================================
  // ANIMATION
  // ==========================================

  useFrame((_, delta) => {

    if (!modelRef?.current) return

    const model = modelRef.current


    // ========================================
    // USER IS / WAS SCROLLING
    // ========================================

    if (isSwirlingRef.current) {

      // Keep the swirl angle moving forward.
      // NEVER starts from zero again.
      swirlTimeRef.current += delta * swirlSpeed

      timeSinceLastScrollRef.current += delta


      const angle =
        swirlTimeRef.current


      model.rotation.x =
        originalRotationRef.current.x +
        Math.sin(angle) * swirlAmount


      model.rotation.z =
        originalRotationRef.current.z +
        Math.cos(angle) * swirlAmount


      // If user hasn't scrolled for a moment,
      // begin returning to normal.
      if (
        timeSinceLastScrollRef.current >=
        stopDelay
      ) {
        isSwirlingRef.current = false
      }


      return
    }


    // ========================================
    // RETURN SMOOTHLY TO ORIGINAL ROTATION
    // ========================================

    model.rotation.x +=
      (
        originalRotationRef.current.x -
        model.rotation.x
      ) *
      Math.min(returnSpeed * delta, 1)


    model.rotation.z +=
      (
        originalRotationRef.current.z -
        model.rotation.z
      ) *
      Math.min(returnSpeed * delta, 1)

  })


  return null
}

export default SwirlModel