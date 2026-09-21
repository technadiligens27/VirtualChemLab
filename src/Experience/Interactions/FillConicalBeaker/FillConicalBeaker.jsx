import {
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

const FillConicalBeaker = ({
  modelRef,

  amount = 1,
  fillSpeed = 1,

  color = "#ffffff",
  opacity = 0.3,
}) => {
  const liquidRef =
    useRef(null)

  const startScaleYRef =
    useRef(0)

  const progressRef =
    useRef(0)

  const isFinishedRef =
    useRef(false)

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

    const liquid =
      liquidRef.current

    if (!liquid) return

    liquid.visible = true

    if (liquid.material) {
      liquid.material =
        liquid.material.clone()

      liquid.material.transparent =
        true

      liquid.material.opacity =
        opacity

      if (liquid.material.color) {
        liquid.material.color.set(color)
      }

      liquid.material.needsUpdate =
        true
    }

    startScaleYRef.current =
      liquid.scale.y

    progressRef.current = 0
    isFinishedRef.current = false
  }, [
    modelRef,
    amount,
    color,
    opacity,
  ])

  useFrame((_, delta) => {
    const liquid =
      liquidRef.current

    if (!liquid) return
    if (isFinishedRef.current) return

    progressRef.current +=
      fillSpeed * delta

    const progress =
      Math.min(
        progressRef.current,
        1
      )

    liquid.scale.y =
      startScaleYRef.current +
      (
        amount -
        startScaleYRef.current
      ) *
        progress

    liquid.updateMatrixWorld(true)

    if (progress >= 1) {
      liquid.scale.y = amount
      liquid.updateMatrixWorld(true)

      isFinishedRef.current = true
    }
  })

  return null
}

export default FillConicalBeaker