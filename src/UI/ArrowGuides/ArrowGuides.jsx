import { useContext, useEffect, useRef } from "react"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ModelContext } from "../../Contexts/ModelContext/ModelContext"
import { useFrame } from "@react-three/fiber"

const ArrowGuides = () => {
  const { arrowChairRef } = useContext(ModelContext)
  const { showArrrowChair } = useContext(MainGuidelineContext)

  const originalY = useRef(null)

  useEffect(() => {
    if (!arrowChairRef?.current) return

    arrowChairRef.current.visible = showArrrowChair

    if (originalY.current === null) {
      originalY.current = arrowChairRef.current.position.y
    }
  }, [showArrrowChair, arrowChairRef])

  useFrame((state) => {
    if (!arrowChairRef?.current) return
    if (!showArrrowChair) return

    const time = state.clock.elapsedTime

    arrowChairRef.current.position.y =
      originalY.current + Math.sin(time * 3) * 2
  })

  return null
}

export default ArrowGuides