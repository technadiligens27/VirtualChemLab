import {
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

const ScaleLiquid = ({
  modelRef,
  finalLiquidAmount = 1,
  speed = 1,
}) => {
  const liquidRef = useRef(null)

  useEffect(() => {
    if (!modelRef?.current) return

    liquidRef.current = null

    modelRef.current.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        childName.includes("liquid") &&
        child.isMesh
      ) {
        liquidRef.current = child
      }
    })
  }, [modelRef])

  useFrame((_, delta) => {
    if (!liquidRef.current) return

    const currentY =
      liquidRef.current.scale.y

    if (currentY >= finalLiquidAmount) {
      liquidRef.current.scale.y =
        finalLiquidAmount

      return
    }

    liquidRef.current.scale.y =
      Math.min(
        currentY + speed * delta,
        finalLiquidAmount
      )
  })

  return null
}

export default ScaleLiquid