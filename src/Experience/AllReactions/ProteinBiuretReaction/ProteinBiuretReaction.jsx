import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const ProteinBiuretReaction = ({ beakerRef, mainDropperRef }) => {
  const liquidRef = useRef(null)
  const dropperLiquidRef = useRef(null)
  const startReaction = useRef(false)

  useEffect(() => {
    const beaker = beakerRef?.current
    const dropper = mainDropperRef?.current

    if (!beaker || !dropper) return

    beaker.traverse((child) => {
      if (
        child.name?.toLowerCase().includes("liquid") &&
        child.visible
      ) {
        liquidRef.current = child
      }
    })

    dropper.traverse((child) => {
      if (child.name?.toLowerCase().includes("liquid")) {
        dropperLiquidRef.current = child
      }
    })

    if (
      liquidRef.current &&
      dropperLiquidRef.current &&
      dropperLiquidRef.current.visible &&
      dropperLiquidRef.current.scale.y > 0
    ) {
      startReaction.current = true
    }
  }, [beakerRef, mainDropperRef])

  useFrame((_, delta) => {
    const liquid = liquidRef.current
    const dropperLiquid = dropperLiquidRef.current

    if (!startReaction.current) return

    if (liquid?.material?.color) {
      const purpleColor = new THREE.Color("#8B5CF6")

      liquid.material.color.lerp(
        purpleColor,
        delta * 2
      )
    }

    if (dropperLiquid) {
      dropperLiquid.scale.y = Math.max(
        dropperLiquid.scale.y - delta * 2,
        0
      )

      if (dropperLiquid.scale.y === 0) {
        dropperLiquid.visible = false
      }
    }
  })

  return null
}

export default ProteinBiuretReaction