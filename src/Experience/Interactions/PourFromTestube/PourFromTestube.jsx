import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"

const PourFromTestube = ({
  isPouring,
  hand,
  model,
  liquidColor,
}) => {
  const pourRef = useRef(null)

  useEffect(() => {
    if (!model) return

    model.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      if (name.includes("pour")) {
        pourRef.current = child
        child.visible = false
        child.scale.y = 0
      }
    })
  }, [model])

  useEffect(() => {
    const pour = pourRef.current

    if (!pour || !liquidColor) return

    pour.traverse((child) => {
      if (!child.isMesh || !child.material) {
        return
      }

      child.material.color.set(liquidColor)
      child.material.needsUpdate = true
    })
  }, [liquidColor])

  useFrame((_, delta) => {
    const pour = pourRef.current

    if (!pour) return

    if (isPouring) {
      pour.visible = true

      pour.scale.y = Math.min(
        pour.scale.y + 80 * delta,
        25
      )
    } else {
      pour.scale.y = Math.max(
        pour.scale.y - 80 * delta,
        0
      )

      if (pour.scale.y === 0) {
        pour.visible = false
      }
    }
  })

  return null
}

export default PourFromTestube