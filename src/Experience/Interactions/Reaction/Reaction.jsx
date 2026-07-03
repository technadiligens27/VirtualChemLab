import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const Reaction = () => {
  const {
    leftBeakerFillData,
    rightBeakerFillData,
    pouredFromLeft,
    pouredFromRight,
    selectedLeftHand,
    selectedRightHand,
  } = useContext(InteractionContext)

  const {lessonStep,setLessonStep} = useContext(MainGuidelineContext);

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

    isAcidBase,
    setIsAcidBase,

    stirrLiquidRef,
  } = useContext(ReactionContext)

  const liquidRef = useRef(null)
  const targetColorRef = useRef(null)
  const activeReactionRef = useRef(null)

  const resetReactions = () => {
    setIsSaltWaterReaction(false)
    setIsHclUniversal(false)
    setIsNaohUniversal(false)
    setIsStarchIodine(false)
    setIsCopperSulfateNaoh(false)
    setIsAcidBase(false)
  }

  const reactions = [
    {
      name: "salt-water",
      chemicals: ["Water (H2O)", "Salt (NaCl)"],
      color: "#62b3f0",
      run: () => {
        resetReactions()
        setIsSaltWaterReaction(true)
      },
    },
    {
      name: "hcl-universal",
      chemicals: ["Hydrochloric Acid (HCl)", "Universal indicator"],
      color: "#ef4444",
      run: () => {
        resetReactions()
        setIsHclUniversal(true)
      },
    },
    {
      name: "naoh-universal",
      chemicals: ["Sodium Hydroxide (NaOH)", "Universal indicator"],
      color: "#8b5cf6",
      run: () => {
        resetReactions()
        setIsNaohUniversal(true)
      },
    },
    {
      name: "iodine-starch",
      chemicals: ["Iodine solution", "Starch solution"],
      color: "#0f172a",
      run: () => {
        resetReactions()
        setIsStarchIodine(true)
      },
    },
    {
      name: "copper-sulfate-naoh",
      chemicals: ["Copper Sulfate (CuSO4)", "Sodium Hydroxide (NaOH)"],
      color: "#7dd3fc",
      run: () => {
        resetReactions()
        setIsCopperSulfateNaoh(true)
      },
    },
    {
      name: "acid-base-neutralization",
      chemicals: ["Hydrochloric Acid (HCl)", "Sodium Hydroxide (NaOH)"],
      color: "#22c55e",
      run: () => {
        resetReactions()
        setIsAcidBase(true)
      },
    },
  ]

  useEffect(() => {
    if (!pouredFromLeft && !pouredFromRight) return

    const left = leftBeakerFillData?.name
    const right = rightBeakerFillData?.name

    const reaction = reactions.find(
      (r) => r.chemicals.includes(left) && r.chemicals.includes(right)
    )

    if (!reaction) return

    reaction.run()

    activeReactionRef.current = reaction.name
    targetColorRef.current = new THREE.Color(reaction.color)

    const targetBeaker = pouredFromLeft
      ? selectedRightHand?.ref?.current
      : selectedLeftHand?.ref?.current

    if (!targetBeaker) return

    liquidRef.current = null

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

        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material]

        materials.forEach((mat) => {
          mat.transparent = true
          mat.opacity = 0.55
          mat.needsUpdate = true
        })
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
      isStarchIodine ||
      isCopperSulfateNaoh ||
      isAcidBase

    if (!canLerp) return

    const materials = Array.isArray(liquidRef.current.material)
      ? liquidRef.current.material
      : [liquidRef.current.material]

    materials.forEach((mat) => {
      if (!mat.color) return

      mat.color.lerp(targetColorRef.current, delta * 0.8)
      mat.needsUpdate = true
    })

    if(lessonStep===10){
      setLessonStep(11)
    }
  })

  return null
}

export default Reaction