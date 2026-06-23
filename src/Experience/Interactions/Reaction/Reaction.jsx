import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"

const Reaction = () => {
  const {
    leftBeakerFillData,
    rightBeakerFillData,
    pouredFromLeft,
    pouredFromRight,
    selectedLeftHand,
    selectedRightHand,
  } = useContext(InteractionContext)

  const {
    isSaltWaterReaction,
    setIsSaltWaterReaction,
    stirrLiquidRef,
  } = useContext(ReactionContext)

  const liquidRef = useRef(null)
  const targetColorRef = useRef(null)

  const reactions = [
    {
      name: "salt-water",
      chemicals: ["Water (H2O)", "Salt (NaCl)"],
      color: "#62b3f0",
      run: () => setIsSaltWaterReaction(true),
    },

    // Add acid reactions here later
    // {
    //   name: "acid-base",
    //   chemicals: ["Hydrochloric Acid (HCl)", "Sodium Hydroxide (NaOH)"],
    //   color: "#FFD6A5",
    //   run: () => console.log("Acid reaction started"),
    // },
  ]

  useEffect(() => {
    if (!pouredFromLeft && !pouredFromRight) return

    const left = leftBeakerFillData?.name
    const right = rightBeakerFillData?.name

    const reaction = reactions.find((r) =>
      r.chemicals.includes(left) && r.chemicals.includes(right)
    )

    if (!reaction) return

    reaction.run()
    targetColorRef.current = new THREE.Color(reaction.color)

    const targetBeaker = pouredFromLeft
      ? selectedRightHand?.ref?.current
      : selectedLeftHand?.ref?.current

    if (!targetBeaker) return

    targetBeaker.traverse((child) => {
      if (
        child.isMesh &&
        child.name?.toLowerCase().includes("liquid") &&
        child.material
      ) {
        child.material = Array.isArray(child.material)
          ? child.material.map((mat) => mat.clone())
          : child.material.clone()

        liquidRef.current = child
        stirrLiquidRef.current = child
      }
    })
  }, [
    pouredFromLeft,
    pouredFromRight,
    leftBeakerFillData,
    rightBeakerFillData,
  ])

  useFrame((_, delta) => {
    if (!liquidRef.current || !targetColorRef.current) return
    if (!isSaltWaterReaction) return

    const materials = Array.isArray(liquidRef.current.material)
      ? liquidRef.current.material
      : [liquidRef.current.material]

    materials.forEach((mat) => {
      mat.color?.lerp(targetColorRef.current, delta * 0.8)
      mat.needsUpdate = true
    })
  })

  return null
}

export default Reaction