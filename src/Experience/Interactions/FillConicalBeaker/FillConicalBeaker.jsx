import {
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

const FillConicalBeaker = ({
  modelRef,

  amount = 1,
  fillSpeed = 1,

  // Liquid opacity
  opacity = 0.3,
}) => {
  const liquidRef = useRef(null)

  const startScaleYRef = useRef(0)
  const progressRef = useRef(0)
  const isFinishedRef = useRef(false)

  console.log("Fill Conical Beaker")

  useEffect(() => {
    if (!modelRef?.current) return

    liquidRef.current = null

    modelRef.current.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (childName.includes("liquid")) {
        liquidRef.current = child
      }
    })

    if (!liquidRef.current) {
      console.log(
        "Conical beaker liquid not found"
      )

      return
    }

    const liquid =
      liquidRef.current

    // ==========================================
    // SHOW LIQUID
    // ==========================================

    liquid.visible = true

    // ==========================================
    // SET LIQUID OPACITY
    // ==========================================

    if (liquid.material) {
      // Clone material so other objects
      // using the same material are not affected
      liquid.material =
        liquid.material.clone()

      liquid.material.transparent =
        true

      liquid.material.opacity =
        opacity

      liquid.material.needsUpdate =
        true
    }

    // ==========================================
    // SAVE STARTING SCALE
    // ==========================================

    startScaleYRef.current =
      liquid.scale.y

    progressRef.current = 0
    isFinishedRef.current = false

    console.log(
      "Conical beaker liquid found:",
      liquid
    )

    console.log(
      "Liquid opacity:",
      opacity
    )
  }, [
    modelRef,
    amount,
    opacity,
  ])

  useFrame((_, delta) => {
    if (!liquidRef.current) return
    if (isFinishedRef.current) return

    progressRef.current +=
      fillSpeed * delta

    const progress =
      Math.min(
        progressRef.current,
        1
      )

    liquidRef.current.scale.y =
      startScaleYRef.current +
      (
        amount -
        startScaleYRef.current
      ) *
        progress

    liquidRef.current.updateMatrixWorld(
      true
    )

    // ==========================================
    // FILLING FINISHED
    // ==========================================

    if (progress >= 1) {
      liquidRef.current.scale.y =
        amount

      liquidRef.current.updateMatrixWorld(
        true
      )

      isFinishedRef.current =
        true

      console.log(
        "Conical beaker filling finished"
      )

      console.log(
        "Final liquid scale Y:",
        amount
      )
    }
  })

  return null
}

export default FillConicalBeaker