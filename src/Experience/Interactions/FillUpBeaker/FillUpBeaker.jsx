import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const FillUpBeaker = ({ beakerRef, hand }) => {
  const { pourAmount } = useContext(InteractionContext)

  const liquidRef = useRef(null)

  useEffect(() => {
    if (!beakerRef?.current) return

    liquidRef.current = null

    beakerRef.current.traverse((child) => {
      if (child.name?.toLowerCase().includes("liquid")) {
        liquidRef.current = child

        liquidRef.current.visible = true

        console.log(`${hand} hand beaker liquid found`)
      }
    })
  }, [beakerRef, hand])

  let amount = 0

  if (beakerRef?.current?.name === "main-normal-beaker") {
    amount = pourAmount * 0.75
  }

  if (beakerRef?.current?.name === "main-Conical-Flask") {
    amount = pourAmount * 0.15
  }

  useFrame((state, delta) => {
    if (!liquidRef.current) return

    // if (liquidRef.current.scale.y < amount) {
    //   liquidRef.current.scale.y = Math.min(
    //     liquidRef.current.scale.y + delta * 25.5,
    //     amount
    //   )
    // } else if (liquidRef.current.scale.y > amount) {
    //   liquidRef.current.scale.y = Math.max(
    //     liquidRef.current.scale.y - delta * 25.5,
    //     amount
    //   )
    // }

    if(liquidRef.current.scale.y < amount){
      liquidRef.current.scale.y +=25 * delta
    }
  })

  return null
}

export default FillUpBeaker