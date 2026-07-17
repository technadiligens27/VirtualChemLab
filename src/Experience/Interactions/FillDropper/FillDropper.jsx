import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

const FillDropper = () => {
  const { mainDropperRef } = useContext(ModelContext)

  const liquidRef = useRef(null)

  const maxScaleY = 8
  const fillSpeed = 7.5

  useEffect(() => {
    const dropper = mainDropperRef?.current

    if (!dropper) return

    dropper.traverse((child) => {
      if (
        child.name?.toLowerCase().includes("liquid")
      ) {
        liquidRef.current = child
      }
    })

    if (!liquidRef.current) {
      console.warn("Dropper liquid not found")
      return
    }

    liquidRef.current.visible = true
    liquidRef.current.scale.y = 0
  }, [mainDropperRef])

  useFrame((_, delta) => {
    const liquid = liquidRef.current

    if (!liquid) return

    liquid.scale.y = Math.min(
      liquid.scale.y + fillSpeed * delta,
      maxScaleY
    )

  })

  return null
}

export default FillDropper