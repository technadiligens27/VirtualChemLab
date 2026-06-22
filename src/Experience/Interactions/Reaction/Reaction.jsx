import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const Reaction = () => {
  const {
    leftBeakerFillData,
    rightBeakerFillData,
    pouredFromLeft,
    selectedRightHand,
  } = useContext(InteractionContext)

  const liquidMeshRef = useRef(null)
  const isReactingRef = useRef(false)

  useEffect(() => {
    if (
      pouredFromLeft &&
      leftBeakerFillData?.name === "Water (H2O)" &&
      rightBeakerFillData?.name === "Salt (NaCl)"
    ) {
      selectedRightHand?.ref?.current?.traverse((child) => {
        if (!child.name?.toLowerCase().includes("liquid")) return

        child.traverse((innerChild) => {
          if (!innerChild.isMesh || !innerChild.material) return

          liquidMeshRef.current = innerChild
          isReactingRef.current = true
        })
      })
    }
  }, [
    pouredFromLeft,
    leftBeakerFillData?.name,
    rightBeakerFillData?.name,
    selectedRightHand,
  ])

  useFrame((state, delta) => {
    if (!isReactingRef.current || !liquidMeshRef.current) return

    const targetColor = new THREE.Color("#D6EAF8")

    liquidMeshRef.current.material.color.lerp(
      targetColor,
      delta * 0.8
    )
  })

  return null
}

export default Reaction