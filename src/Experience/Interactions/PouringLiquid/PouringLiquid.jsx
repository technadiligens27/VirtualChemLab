import { useFrame } from "@react-three/fiber"
import { useContext, useEffect, useRef } from "react"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const PouringLiquid = ({ modelRef, hand }) => {
  const { leftBeakerFillData, rightBeakerFillData } =
    useContext(InteractionContext)

  const pourLiquidRef = useRef(null)

  const fillData =
    hand === "left" ? leftBeakerFillData : rightBeakerFillData

  useEffect(() => {
    if (!modelRef?.current) return

    let found = null

    modelRef.current.traverse((child) => {
      if (child.name?.toLowerCase().includes("pour")) {
        found = child
      }
    })

    pourLiquidRef.current = found

    if (pourLiquidRef.current) {
      pourLiquidRef.current.visible = true
      pourLiquidRef.current.scale.set(1, 0, 1)

      pourLiquidRef.current.material = pourLiquidRef.current.material.clone()

      if (fillData?.color) {
        pourLiquidRef.current.material.color.set(fillData.color)
      }
    }

    return () => {
      if (pourLiquidRef.current) {
        pourLiquidRef.current.scale.set(1, 0, 1)
        pourLiquidRef.current.visible = false
      }
    }
  }, [modelRef, hand, fillData])

  useFrame((state, delta) => {
    if (!pourLiquidRef.current) return

    if (pourLiquidRef.current.scale.y < 25) {
      pourLiquidRef.current.scale.y = Math.min(
        pourLiquidRef.current.scale.y + 45 * delta,
        25
      )
    }
  })

  return null
}

export default PouringLiquid