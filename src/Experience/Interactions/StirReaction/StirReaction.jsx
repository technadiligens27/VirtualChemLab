import { useFrame } from "@react-three/fiber"
import { useContext, useMemo } from "react"
import * as THREE from "three"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"

const StirReaction = () => {
  const { isSaltWaterReaction,stirrLiquidRef } = useContext(ReactionContext)


  // Final color after stirring
  const stirColor = useMemo(() => {
    return new THREE.Color("#DFF6FF")
  }, [])

  useFrame((_, delta) => {
    if (!isSaltWaterReaction) return
    if (!stirrLiquidRef?.current) return
    if (!stirrLiquidRef.current.material) return

    const materials = Array.isArray(stirrLiquidRef.current.material)
      ? stirrLiquidRef.current.material
      : [stirrLiquidRef.current.material]

    materials.forEach((material) => {
      if (!material?.color) return

      material.color.lerp(stirColor, delta * 0.8)
      material.needsUpdate = true
    })
  })

  return null
}

export default StirReaction