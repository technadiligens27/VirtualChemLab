import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { ModelContext } from "../../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../../Contexts/InteractionContext/InteractionContext"
import FillLiquidBeaker from "../../FillLiquid/FillLiquidBeaker/FillLiquidBeaker"

const PourFromKettle = ({
  isPouring,
}) => {
  const {
    kettleRef,normalBeakerRef
  } = useContext(ModelContext)

  const {
    setFillBeakerLiquid,
    fillBeakerLiquid,
  } = useContext(InteractionContext)

  const pourLiquidRef = useRef(null)

  useEffect(() => {
    if (!kettleRef?.current) {
      return
    }

    pourLiquidRef.current = null

    kettleRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (child.isMesh && childName.includes("pour-fluid")) {
        pourLiquidRef.current = child

        child.visible = false
        child.scale.set(1, 0, 1)
      }
    })

    return () => {
      if (!pourLiquidRef.current) {
        return
      }

      pourLiquidRef.current.visible = false
      pourLiquidRef.current.scale.y = 0
    }
  }, [kettleRef])

  useFrame((_, delta) => {
    if (!pourLiquidRef.current) {
      return
    }

    if (!isPouring) {
      pourLiquidRef.current.visible = false
      pourLiquidRef.current.scale.y = 0
      return
    }

    if (!fillBeakerLiquid) {
      setFillBeakerLiquid(true)
    }

    pourLiquidRef.current.visible = true

    pourLiquidRef.current.scale.y = Math.min(
      pourLiquidRef.current.scale.y + delta * 50,
      25
    )
  })

  return (
    <>
      {fillBeakerLiquid && (
        <FillLiquidBeaker modelRef={normalBeakerRef} amount={45} color={"#0073a0"} />
      )}
    </>
  )
}

export default PourFromKettle