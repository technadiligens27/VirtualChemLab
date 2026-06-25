import { useFrame } from "@react-three/fiber"

const LitmusReaction = ({ litmusRef, type }) => {
    console.log("Reaction happened")
  useFrame(() => {
    if (!litmusRef?.current || !type) return
    if (!litmusRef.current.material) return

    let color = null

    if (type === "acid") {
      color = "#000000" 
    }

    if (type === "base") {
      color = "#0000ff" 
    }

    if (!color) return

    litmusRef.current.material.color.set(color)
    litmusRef.current.material.needsUpdate = true
  })

  return null
}

export default LitmusReaction