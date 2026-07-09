import { useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import CopperPrecipitate from "../../AllReactions/CopperPrecipitate/CopperPrecipitate"

const Reaction = ({ hand }) => {
  const {
    leftBeakerFillData,
    rightBeakerFillData,

    pouredFromLeft,
    pouredFromRight,

    selectedLeftHand,
    selectedRightHand,

    liquidLeftModel,
    liquidRightModel,

    isPouring,
  } = useContext(InteractionContext)

  const { lessonStep, setLessonStep, setShowErrorMsgNo } =
    useContext(MainGuidelineContext)

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

    stirrLiquidRef,isReactionRef
  } = useContext(ReactionContext)

  const liquidRef = useRef(null)
  const targetColorRef = useRef(null)
  const activeReactionRef = useRef(null)
  const targetBeakerRef = useRef(null)
const finishLoggedRef = useRef(false)
  const lessonStepChangedRef = useRef(false)

  const resetReactions = useCallback(() => {
    setIsSaltWaterReaction(false)
    setIsHclUniversal(false)
    setIsNaohUniversal(false)
    setIsStarchIodine(false)
    setIsCopperSulfateNaoh(false)
    setIsAcidBase(false)
  }, [
    setIsSaltWaterReaction,
    setIsHclUniversal,
    setIsNaohUniversal,
    setIsStarchIodine,
    setIsCopperSulfateNaoh,
    setIsAcidBase,
  ])

  const clearReactionRefs = useCallback(() => {
    liquidRef.current = null
    targetColorRef.current = null
    activeReactionRef.current = null
    targetBeakerRef.current = null
    stirrLiquidRef.current = null
  }, [stirrLiquidRef])

  const reactions = useMemo(
    () => [
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
    ],
    [
      resetReactions,
      setIsSaltWaterReaction,
      setIsHclUniversal,
      setIsNaohUniversal,
      setIsStarchIodine,
      setIsCopperSulfateNaoh,
      setIsAcidBase,
    ]
  )

  const findLiquidMesh = (model) => {
    if (!model) return null

    if (typeof model.traverse !== "function") {
      console.log("This is not a Three.js object:", model)
      return null
    }

    let liquidMesh = null

    model.traverse((child) => {
      if (liquidMesh) return

      if (child.isMesh && child.name?.toLowerCase().includes("liquid")) {
        liquidMesh = child
      }
    })

    return liquidMesh
  }

  const prepareLiquidMaterial = (mesh) => {
    if (!mesh?.material) return

    mesh.material = Array.isArray(mesh.material)
      ? mesh.material.map((mat) => mat.clone())
      : mesh.material.clone()

    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material]

    materials.forEach((mat) => {
      mat.transparent = true
      mat.opacity = 0.55
      mat.needsUpdate = true
    })
  }

  const getLiquidMaxScaleY = (liquidMesh) => {
    const name = liquidMesh?.name?.toLowerCase()

    if (name?.includes("conical")) return 200
    if (name?.includes("normal")) return 55

    return 55
  }

  const increaseLiquidScaleY = (liquidMesh, delta) => {
      if (!liquidMesh) return false

      const maxScaleY = getLiquidMaxScaleY(liquidMesh)

      liquidMesh.visible = true

      liquidMesh.scale.y = Math.min(liquidMesh.scale.y + delta * 2, maxScaleY)

      if (liquidMesh.scale.y >= maxScaleY && !finishLoggedRef.current) {
        setShowErrorMsgNo(10)
        finishLoggedRef.current = true
        return true
      }

      return false
}

  const isLiquidEmpty = (liquidMesh) => {
    if (!liquidMesh) return true
    if (!liquidMesh.visible) return true
    if (liquidMesh.scale.y <= 0.01) return true

    return false
  }

  useEffect(() => {
    const leftModel = selectedLeftHand?.ref?.current
    const rightModel = selectedRightHand?.ref?.current

    const leftLiquid = findLiquidMesh(leftModel)
    const rightLiquid = findLiquidMesh(rightModel)

    if (leftLiquid) {
      liquidLeftModel.current = leftLiquid
    }

    if (rightLiquid) {
      liquidRightModel.current = rightLiquid
    }
  }, [selectedLeftHand, selectedRightHand, liquidLeftModel, liquidRightModel])

  useEffect(() => {
    if (!pouredFromLeft && !pouredFromRight) return

    const left = leftBeakerFillData?.name
    const right = rightBeakerFillData?.name

    const reaction = reactions.find(
      (r) => r.chemicals.includes(left) && r.chemicals.includes(right)
    )

    if (!reaction) {
      console.log("No Visible Reaction Found")

      isReactionRef.current = false

      resetReactions()
      clearReactionRefs()

      setShowErrorMsgNo(8)

      return
    }

    reaction.run()

    isReactionRef.current = true

    activeReactionRef.current = reaction.name
    targetColorRef.current = new THREE.Color(reaction.color)

    targetBeakerRef.current = pouredFromLeft
      ? selectedRightHand?.ref?.current
      : selectedLeftHand?.ref?.current

    if (!targetBeakerRef.current) return

    liquidRef.current = findLiquidMesh(targetBeakerRef.current)

    if (!liquidRef.current) return

    prepareLiquidMaterial(liquidRef.current)

    stirrLiquidRef.current = liquidRef.current
  }, [
    hand,
    pouredFromLeft,
    pouredFromRight,
    leftBeakerFillData,
    rightBeakerFillData,
    selectedLeftHand,
    selectedRightHand,
    reactions,
    resetReactions,
    clearReactionRefs,
    setShowErrorMsgNo,
    stirrLiquidRef,
  ])

  useEffect(() => {
    if (lessonStep !== 10) {
      lessonStepChangedRef.current = false
    }
  }, [lessonStep])

  useFrame((_, delta) => {
    if (!isReactionRef.current) return
    if (!liquidRef.current || !targetColorRef.current) return

    const canLerp =
      isSaltWaterReaction ||
      isHclUniversal ||
      isNaohUniversal ||
      isStarchIodine ||
      isCopperSulfateNaoh ||
      isAcidBase

    if (!canLerp) return
    if (!isPouring) return

    if (pouredFromLeft) {
      const sourceLiquid = liquidLeftModel.current
      const targetLiquid = liquidRightModel.current

      if (!isLiquidEmpty(sourceLiquid)) {
        increaseLiquidScaleY(targetLiquid, delta)
      }
    }

    if (pouredFromRight) {
      const sourceLiquid = liquidRightModel.current
      const targetLiquid = liquidLeftModel.current

      if (!isLiquidEmpty(sourceLiquid)) {
        increaseLiquidScaleY(targetLiquid, delta)
      }
    }

    const materials = Array.isArray(liquidRef.current.material)
      ? liquidRef.current.material
      : [liquidRef.current.material]

    materials.forEach((mat) => {
      if (!mat.color) return

      mat.color.lerp(targetColorRef.current, delta * 0.8)
      mat.needsUpdate = true
    })

    if (lessonStep === 10 && !lessonStepChangedRef.current) {
      lessonStepChangedRef.current = true
      setLessonStep(11)
    }
  })

  return (
    <>
      {isCopperSulfateNaoh && targetBeakerRef.current && (
        <CopperPrecipitate beakerRef={targetBeakerRef} />
      )}
    </>
  )
}

export default Reaction