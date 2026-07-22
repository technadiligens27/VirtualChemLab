import { Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useContext, useRef, useState } from "react"
import * as THREE from "three"

import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext"
import "./LiquidLabels.css"

const colorOfLiquid = (name, fallbackColor) => {
  if (name === "Hydrochloric Acid (HCl)")
    return "Colourless"

  if (name === "Sodium Hydroxide (NaOH)")
    return "Colourless"

  if (name === "Copper Sulfate (CuSO4)")
    return "Blue"

  if (name === "Universal indicator")
    return "Green"

  if (name === "Water (H2O)")
    return "Colourless"

  if (name === "Salt (NaCl)")
    return "White"

  if (name === "Starch solution")
    return "Cloudy white"

  if (name === "Iodine solution")
    return "Brown"

  if (name === "Protein Sample")
    return "Pale cream"

  if (name === "Biuret Reagent")
    return "Blue"

  return fallbackColor || "Unknown colour"
}

const getColourClass = (colour) => {
  const normalizedColour =
    colour?.toLowerCase().trim() || ""

  if (normalizedColour === "blue") {
    return "liquid-color-blue"
  }

  if (normalizedColour === "green") {
    return "liquid-color-green"
  }

  if (normalizedColour === "white") {
    return "liquid-color-white"
  }

  if (normalizedColour === "cloudy white") {
    return "liquid-color-cloudy-white"
  }

  if (normalizedColour === "brown") {
    return "liquid-color-brown"
  }

  if (normalizedColour === "pale cream") {
    return "liquid-color-pale-cream"
  }

  if (normalizedColour === "colourless") {
    return "liquid-color-colourless"
  }

  return "liquid-color-default"
}

const LiquidLabels = ({
  modelRef,
  hand,
  liquidData = null,
}) => {
  const {
    leftBeakerFillData,
    rightBeakerFillData,
  } = useContext(InteractionContext)

  const labelRef = useRef(null)
  const positionRef = useRef(new THREE.Vector3())

  const [showLabel, setShowLabel] = useState(false)

  const handFillData =
    hand === "left"
      ? leftBeakerFillData
      : rightBeakerFillData

  // Use manually supplied data for the dropper.
  // Otherwise, use normal hand-based beaker data.
  const fillData = liquidData || handFillData

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

    setShowLabel((previousValue) =>
      previousValue === liquidFound
        ? previousValue
        : liquidFound
    )

    if (liquidFound && labelRef.current) {
      modelRef.current.getWorldPosition(
        positionRef.current
      )

      positionRef.current.y += 1.3

      labelRef.current.position.copy(
        positionRef.current
      )
    }
  })

  if (!showLabel) return null

  const liquidColour = colorOfLiquid(
    fillData?.name,
    fillData?.color
  )

  return (
    <group ref={labelRef}>
      <Html center>
        <div className="liquid-label">
          <span className="liquid-name">
            {fillData?.name || "Unknown liquid"}
          </span>

          <p
            className={`liquid-color ${getColourClass(
              liquidColour
            )}`}
          >
            {liquidColour}
          </p>
        </div>
      </Html>
    </group>
  )
}

export default LiquidLabels