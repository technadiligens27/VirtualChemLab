import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

const FillThermometer = ({
  amount = 0,
  fillSpeed = 3,
}) => {
  const { mainThermometerRef } =
    useContext(ModelContext)

  const liquidRef = useRef(null)
  const originalScaleRef = useRef(null)
  const targetScaleYRef = useRef(0)
  const lastLoggedScaleRef = useRef(0)

  useEffect(() => {
    const thermometer =
      mainThermometerRef?.current

    if (!thermometer) {
      console.log(
        "Main thermometer was not found"
      )

      return
    }

    let liquidFound = false

    thermometer.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      if (
        child.isMesh &&
        name.includes("liquid")
      ) {
        liquidFound = true

        console.log(
          "Thermometer liquid found:",
          child.name
        )

        liquidRef.current = child
        originalScaleRef.current =
          child.scale.clone()

        child.scale.y = 0
        child.visible = false

        child.updateMatrixWorld(true)
      }
    })

    if (!liquidFound) {
      console.log(
        "Thermometer liquid mesh was not found"
      )
    }
  }, [mainThermometerRef])

  useEffect(() => {
    targetScaleYRef.current =
      Math.max(amount, 0)

    console.log(
      "Target liquid scale Y:",
      targetScaleYRef.current
    )
  }, [amount])

  useFrame((_, delta) => {
    const liquid = liquidRef.current
    const originalScale =
      originalScaleRef.current

    if (!liquid || !originalScale) return

    const targetScaleY =
      targetScaleYRef.current

    liquid.scale.y =
      THREE.MathUtils.damp(
        liquid.scale.y,
        targetScaleY,
        fillSpeed,
        delta
      )

    if (
      Math.abs(
        liquid.scale.y -
          targetScaleY
      ) < 0.01
    ) {
      liquid.scale.y = targetScaleY
    }

    liquid.scale.x =
      originalScale.x

    liquid.scale.z =
      originalScale.z

    liquid.visible =
      liquid.scale.y > 0.001

    if (
      Math.abs(
        liquid.scale.y -
          lastLoggedScaleRef.current
      ) > 0.05
    ) {
      console.log(
        "Liquid scaling:",
        liquid.scale.y.toFixed(2),
        "Target:",
        targetScaleY.toFixed(2),
        "Visible:",
        liquid.visible
      )

      lastLoggedScaleRef.current =
        liquid.scale.y
    }

    liquid.updateMatrixWorld(true)
  })

  return null
}

export default FillThermometer