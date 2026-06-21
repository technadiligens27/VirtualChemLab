import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const FillUpBeaker = ({ beakerRef, hand }) => {
  const { leftBeakerFillData, rightBeakerFillData } =
    useContext(InteractionContext)

  const fillData =
    hand === "left" ? leftBeakerFillData : rightBeakerFillData

  const liquidRef = useRef(null)

  useEffect(() => {
    if (!beakerRef?.current) return

    liquidRef.current = null

    beakerRef.current.traverse((child) => {
      if (child.name?.toLowerCase().includes("liquid")) {
        liquidRef.current = child

        child.material = child.material.clone()

        if (fillData?.color) {
          child.material.color.set(fillData.color)
        }

        child.visible = true
      }
    })
  }, [beakerRef, hand, fillData])

  let amount = 0

  if (beakerRef?.current?.name === "main-normal-beaker") {
    amount = fillData.amount * 0.75
  }

  if (beakerRef?.current?.name === "main-Conical-Flask") {
    amount = fillData.amount * 0.15
  }

  useFrame((state, delta) => {
    if (!liquidRef.current) return

    if (liquidRef.current.scale.y < amount) {
      liquidRef.current.scale.y = Math.min(
        liquidRef.current.scale.y + 25 * delta,
        amount
      )
    }
  })

  return null
}

export default FillUpBeaker