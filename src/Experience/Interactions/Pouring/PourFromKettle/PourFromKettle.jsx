import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import { useFrame } from "@react-three/fiber"

import { ModelContext } from "../../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../../Contexts/InteractionContext/InteractionContext"
import FillLiquidBeaker from "../../FillLiquid/FillLiquidBeaker/FillLiquidBeaker"

const PourFromKettle = ({
  isPouring,
  color,
}) => {
  const {
    kettleRef,
    normalBeakerRef,
  } = useContext(ModelContext)

  const {
    setFillBeakerLiquid,
    fillBeakerLiquid,
  } = useContext(InteractionContext)

  const pourLiquidRef = useRef(null)
  const hasReachedFullScaleRef = useRef(false)

  const [pourStreamFullyScaled, setPourStreamFullyScaled] = useState(false)

  useEffect(() => {
    if (!kettleRef?.current) return

    pourLiquidRef.current = null

    kettleRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (child.isMesh && childName.includes("pour-fluid")) {
        pourLiquidRef.current = child

        child.material = child.material.clone()

        if (color) {
          child.material.color.set(color)
          child.material.needsUpdate = true
        }

        child.visible = false
        child.scale.set(1, 0, 1)
      }
    })

    return () => {
      if (!pourLiquidRef.current) return

      pourLiquidRef.current.visible = false
      pourLiquidRef.current.scale.y = 0
    }
  }, [kettleRef, color])

  useEffect(() => {
    if (isPouring) return

    hasReachedFullScaleRef.current = false
    setPourStreamFullyScaled(false)
    setFillBeakerLiquid(false)
  }, [isPouring, setFillBeakerLiquid])

  useFrame((_, delta) => {
    if (!pourLiquidRef.current) return

    if (!isPouring) {
      pourLiquidRef.current.visible = false
      pourLiquidRef.current.scale.y = 0
      return
    }

    pourLiquidRef.current.visible = true

    pourLiquidRef.current.scale.y = Math.min(
      pourLiquidRef.current.scale.y + delta * 50,
      25
    )

    if (pourLiquidRef.current.scale.y >= 25 && !hasReachedFullScaleRef.current) {
      hasReachedFullScaleRef.current = true

      setPourStreamFullyScaled(true)
      setFillBeakerLiquid(true)

      console.log("Pour stream fully scaled")
      console.log("Beaker filling started")
    }
  })

  return (
    <>
      {fillBeakerLiquid && pourStreamFullyScaled && (
        <FillLiquidBeaker
          modelRef={normalBeakerRef}
          amount={45}
          color={color}
          isPouring={isPouring}
        />
      )}
    </>
  )
}

export default PourFromKettle