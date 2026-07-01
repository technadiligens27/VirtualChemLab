import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"

const ArrowGuides = ({ arrowRef,speed,height,showStatus }) => {
  const startY = useRef(0)

  useEffect(() => {
    if (!arrowRef?.current) return

    arrowRef.current.visible = true
    startY.current = arrowRef.current.position.y

    return()=>{
       arrowRef.current.visible = false
    }
  }, [arrowRef])

  useFrame((state) => {
    if (!arrowRef?.current) return

    arrowRef.current.position.y =
      startY.current + Math.sin(state.clock.elapsedTime * speed) * height
  })

  return null
}

export default ArrowGuides