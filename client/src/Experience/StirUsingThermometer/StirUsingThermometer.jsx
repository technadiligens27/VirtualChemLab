import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { ModelContext } from "../../Contexts/ModelContext/ModelContext"

const StirUsingThermometer = ({
  stirRadius = 0.3,
  stirSpeed = 0.35,
  smoothness = 8,
}) => {
  const { mainThermometerRef } =
    useContext(ModelContext)

  const centreRef = useRef(
    new THREE.Vector3()
  )

  const currentAngleRef = useRef(0)
  const targetAngleRef = useRef(0)
  const centreSavedRef = useRef(false)

  useEffect(() => {
    const thermometer =
      mainThermometerRef.current

    if (!thermometer) return

    centreRef.current.copy(
      thermometer.position
    )

    centreSavedRef.current = true

    const handleWheel = (event) => {
      if (event.deltaY <= 0) return

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
    mainThermometerRef,
    stirSpeed,
  ])

  useFrame((state, delta) => {
    const thermometer =
      mainThermometerRef.current

    if (
      !thermometer ||
      !centreSavedRef.current
    ) {
      return
    }

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