import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"

import { ModelContext } from "../../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../../Contexts/InteractionContext/InteractionContext"

const FillPipette = ({
  amount = 19,
  fillSpeed = 9.9,
}) => {
  const { pipetteRef } = useContext(ModelContext)
  const { setIsPipetteFilled } = useContext(InteractionContext)

  const liquidRef = useRef(null)
  const isFinishedRef = useRef(false)

  useEffect(() => {
    if (!pipetteRef?.current) return

    pipetteRef.current.traverse((child) => {
      if (child.name?.toLowerCase().includes("liquid")) {
        liquidRef.current = child
      }
    })
  }, [pipetteRef])



  useFrame((_, delta) => {
    if (!liquidRef.current || isFinishedRef.current) return

    const currentScaleY = liquidRef.current.scale.y
    const targetScaleY = amount

    if (targetScaleY <= currentScaleY) {
      isFinishedRef.current = true
      setIsPipetteFilled(true)
      return
    }

    liquidRef.current.visible = true

    liquidRef.current.scale.y += fillSpeed * delta

    if (liquidRef.current.scale.y >= targetScaleY) {
      liquidRef.current.scale.y = targetScaleY

      isFinishedRef.current = true
      setIsPipetteFilled(true)
    }
  })

  return null
}

export default FillPipette