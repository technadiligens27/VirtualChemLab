import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { ModelContext } from "../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext"

const StirUsingThermometer = ({
  stirRadius = 0.3,
  stirSpeed = 0.35,
  smoothness = 8,

  mobileStirSpeed = 3,
}) => {

  const {
    mainThermometerRef,
  } = useContext(ModelContext)

  const {
    isTouchDevice,
    isPouring,
  } = useContext(InteractionContext)

  const centreRef = useRef(
    new THREE.Vector3()
  )

  const currentAngleRef = useRef(0)

  const targetAngleRef = useRef(0)

  const centreSavedRef = useRef(false)

  // ==========================================
  // INITIAL SETUP
  // ==========================================

  useEffect(() => {

    const thermometer =
      mainThermometerRef.current

    if (!thermometer) return

    centreRef.current.copy(
      thermometer.position
    )

    centreSavedRef.current = true

    return () => {

      centreSavedRef.current = false

    }

  }, [
    mainThermometerRef,
  ])

  // ==========================================
  // DESKTOP SCROLL CONTROL
  // ==========================================

  useEffect(() => {

    if (isTouchDevice) return

    const handleWheel = (event) => {

      if (event.deltaY <= 0) return

      if (!centreSavedRef.current) return

      event.preventDefault()

      targetAngleRef.current += stirSpeed

    }

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    )

    return () => {

      window.removeEventListener(
        "wheel",
        handleWheel
      )

    }

  }, [
    isTouchDevice,
    stirSpeed,
  ])

  // ==========================================
  // STIRRING ANIMATION
  // ==========================================

  useFrame((_, delta) => {

    const thermometer =
      mainThermometerRef.current

    if (
      !thermometer ||
      !centreSavedRef.current
    ) {
      return
    }

    // ========================================
    // MOBILE AUTOMATIC STIRRING
    // ========================================

    if (isTouchDevice && isPouring) {

      targetAngleRef.current +=
        mobileStirSpeed * delta

    }

    // ========================================
    // SMOOTH ROTATION
    // ========================================

    currentAngleRef.current =
      THREE.MathUtils.damp(
        currentAngleRef.current,
        targetAngleRef.current,
        smoothness,
        delta
      )

    const angle =
      currentAngleRef.current

    const centre =
      centreRef.current

    // ========================================
    // CIRCULAR MOVEMENT
    // ========================================

    thermometer.position.x =
      centre.x +
      Math.cos(angle) * stirRadius

    thermometer.position.z =
      centre.z +
      Math.sin(angle) * stirRadius

    thermometer.rotation.y = angle

  })

  return null
}

export default StirUsingThermometer