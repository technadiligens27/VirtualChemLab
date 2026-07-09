import { Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useContext, useRef, useState } from "react"
import * as THREE from "three"
import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext"


const LiquidLabels = ({ modelRef, hand }) => {
  const {
    leftBeakerFillData,
    rightBeakerFillData,
  } = useContext(InteractionContext)

  const labelRef = useRef(null)
  const positionRef = useRef(new THREE.Vector3())

  const [showLabel, setShowLabel] = useState(false)

  const fillData = hand === "left" ? leftBeakerFillData : rightBeakerFillData

  useFrame(() => {
    if (!modelRef?.current) return

    let liquidFound = false

    modelRef.current.traverse((child) => {
      if (liquidFound) return

      const childName = child.name?.toLowerCase()

      if (!childName?.includes("liquid")) return
      if (!child.isMesh) return

      if (child.visible && child.scale.y > 0.01) {
        liquidFound = true
      }
    })

    setShowLabel(liquidFound)

    if (liquidFound && labelRef.current) {
      modelRef.current.getWorldPosition(positionRef.current)

      positionRef.current.y += 1.3

      labelRef.current.position.copy(positionRef.current)
    }
  })

  if (!showLabel) return null

  const colorOfLiquid = (name) => {
    if (name === "Hydrochloric Acid (HCl)") return "Colourless"
    if (name === "Sodium Hydroxide (NaOH)") return "Colourless"
    if (name === "Copper Sulfate (CuSO4)") return "Blue"
    if (name === "Universal indicator") return "Green"
    if (name === "Water (H2O)") return "Colourless"
    if (name === "Salt (NaCl)") return "White"

    return fillData?.color || "Unknown colour"
  }

  return (
    <group ref={labelRef}>
      <Html center>
        <div className="liquid-label">
          {fillData?.name || "Liquid"}
          <p>{colorOfLiquid(fillData.name)}</p>
        </div>
      </Html>
    </group>
  )
}

export default LiquidLabels