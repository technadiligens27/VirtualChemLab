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

  return (
    <group ref={labelRef}>
      <Html center>
        <div
          style={{
            background: fillData?.color || "#ffbd00",
            color: "black",
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "700",
            whiteSpace: "nowrap",
            border: "2px solid white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            pointerEvents: "none",
          }}
        >
          {fillData?.name || "Liquid"}
        </div>
      </Html>
    </group>
  )
}

export default LiquidLabels