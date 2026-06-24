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

    isHclUniversal,
    setIsHclUniversal,

    isNaohUniversal,
    setIsNaohUniversal,

    isStarchIodine,
    setIsStarchIodine,

    isCopperSulfateNaoh,
    setIsCopperSulfateNaoh,

    stirrLiquidRef,
  } = useContext(ReactionContext)

  const liquidRef = useRef(null)
  const targetColorRef = useRef(null)
  const activeReactionRef = useRef(null)

  const reactions = [
    {
      name: "salt-water",
      chemicals: ["Water (H2O)", "Salt (NaCl)"],
      color: "#62b3f0",
      run: () => {
        setIsSaltWaterReaction(true)
        setIsHclUniversal(false)
      },
    },
    {
      name: "hcl-universal",
      chemicals: ["Hydrochloric Acid (HCl)", "Universal indicator"],
      color: "#ef4444",
      run: () => {
        setIsHclUniversal(true)
        setIsSaltWaterReaction(false)
      },
    },

    // ================================
    // FUTURE REACTIONS TEMPLATE
    // Copy one block, uncomment it, then change:
    // name, chemicals, color, and state setters.
    // ================================

    {
      name: "naoh-universal",
      chemicals: ["Sodium Hydroxide (NaOH)", "Universal indicator"],
      color: "#8b5cf6",
      run: () => {
        setIsNaohUniversal(true)

        setIsSaltWaterReaction(false)
        setIsHclUniversal(false)
      },
    },

    {
      name: "iodine-starch",
      chemicals: ["Iodine solution", "Starch solution"],
      color: "#0f172a",
      run: () => {
        setIsStarchIodine(true)
        setIsSaltWaterReaction(false)
        setIsHclUniversal(false)
      },
    },

    {
      name: "copper-sulfate-naoh",
      chemicals: ["Copper Sulfate (CuSO4)", "Sodium Hydroxide (NaOH)"],
      color: "#7dd3fc",
      run: () => {
        setIsCopperSulfateNaoh(true)

        setIsSaltWaterReaction(false)
        setIsHclUniversal(false)
      },
    },
  ]

  useEffect(() => {
    if (!pouredFromLeft && !pouredFromRight) return

    const left = leftBeakerFillData?.name
    const right = rightBeakerFillData?.name

    const reaction = reactions.find(
      (r) =>
        r.chemicals.includes(left) &&
        r.chemicals.includes(right)
    )

    if (!reaction) return

    reaction.run()

    activeReactionRef.current = reaction.name
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
    selectedLeftHand,
    selectedRightHand,
  ])

  useFrame((_, delta) => {
    if (!liquidRef.current || !targetColorRef.current) return

    const canLerp =
      isSaltWaterReaction ||
      isHclUniversal ||
      isNaohUniversal ||
      isCopperSulfateNaoh ||
      activeReactionRef.current

    if (!canLerp) return

    const materials = Array.isArray(liquidRef.current.material)
      ? liquidRef.current.material
      : [liquidRef.current.material]

    materials.forEach((mat) => {
      if (!mat.color) return

      mat.color.lerp(targetColorRef.current, delta * 0.8)
      mat.needsUpdate = true
    })
  })

  return null
}

export default Reaction