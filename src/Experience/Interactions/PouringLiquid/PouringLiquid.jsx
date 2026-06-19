import { useFrame } from "@react-three/fiber"
import { useContext, useEffect, useRef } from "react"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const PouringLiquid = ({ modelRef }) => {

  const pourLiquidRef = useRef(null)

  useEffect(() => {
    if (!modelRef?.current) return

    let found = null

    modelRef.current.traverse((child) => {
      if (
        child.name &&
        child.name.toLowerCase().includes("pour")
      ) {
        found = child
      }
    })

    pourLiquidRef.current = found

    // Reset liquid when pouring starts
    if (pourLiquidRef.current) {
      pourLiquidRef.current.visible = true
      pourLiquidRef.current.scale.set(1, 0, 1)
    }

    return () => {
      if (pourLiquidRef.current) {
        pourLiquidRef.current.scale.set(1, 0, 1)
        pourLiquidRef.current.visible = false
      }
    }
  }, [modelRef])

  useFrame((state, delta) => {
    if (!pourLiquidRef.current) return

    // pourLiquidRef.current.scale.y += Math.min(
    //   pourLiquidRef.current.scale.y + delta * 10,
    //   1
    // )

    if(pourLiquidRef.current.scale.y <25){
        pourLiquidRef.current.scale.y += 2
    }
    
  })

  return null
}

export default PouringLiquid