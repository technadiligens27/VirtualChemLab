import {
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

const FillConicalBeaker = ({
  modelRef,
  amount = 1,
  fillSpeed = 1,
}) => {
  const liquidRef = useRef(null)

  const startScaleYRef = useRef(0)
  const progressRef = useRef(0)
  const isFinishedRef = useRef(false)

  console.log("FIll Conical Beaker")

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
      console.log("Conical beaker liquid not found")
      return
    }

    liquidRef.current.visible = true

    startScaleYRef.current =
      liquidRef.current.scale.y

    progressRef.current = 0
    isFinishedRef.current = false

    console.log(
      "Conical beaker liquid found:",
      liquidRef.current
    )
  }, [modelRef, amount])

  useFrame((_, delta) => {
    if (!liquidRef.current) return
    if (isFinishedRef.current) return

    progressRef.current +=
      fillSpeed * delta

    const progress = Math.min(
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

    liquidRef.current.updateMatrixWorld(true)

    if (progress >= 1) {
      liquidRef.current.scale.y =
        amount

      liquidRef.current.updateMatrixWorld(true)

      isFinishedRef.current = true

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