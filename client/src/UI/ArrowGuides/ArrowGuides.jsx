import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"

const ArrowGuides = ({
  arrowRef,
  speed = 2.5,
  height = 0.5,
  showStatus,
}) => {
  const startY = useRef(null)

  useEffect(() => {
    return () => {
      if (arrowRef?.current) {
        arrowRef.current.visible = false
      }
    }
  }, [arrowRef])

  useFrame((state) => {
    if (!arrowRef?.current) return

    arrowRef.current.visible = showStatus

    if (!showStatus) return

    if (startY.current === null) {
      startY.current = arrowRef.current.position.y
    }

    arrowRef.current.position.y =
      startY.current +
      Math.sin(state.clock.elapsedTime * speed) * height
  })

  return null
}

export default ArrowGuides