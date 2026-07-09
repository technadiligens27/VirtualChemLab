import { useFrame } from "@react-three/fiber"
import { useContext, useEffect, useRef } from "react"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import Reaction from "../Reaction/Reaction"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"

const visibleReactions = [
  ["Water (H2O)", "Salt (NaCl)"],
  ["Hydrochloric Acid (HCl)", "Universal indicator"],
  ["Sodium Hydroxide (NaOH)", "Universal indicator"],
  ["Iodine solution", "Starch solution"],
  ["Copper Sulfate (CuSO4)", "Sodium Hydroxide (NaOH)"],
  ["Hydrochloric Acid (HCl)", "Sodium Hydroxide (NaOH)"],
]

const PouringLiquid = ({ modelRef, hand, isPouring }) => {
  const {
    leftBeakerFillData,
    rightBeakerFillData,

    setPouredFromLeft,
    pouredFromLeft,

    setPouredFromRight,
    pouredFromRight,

    selectedLeftHand,
    selectedRightHand,
  } = useContext(InteractionContext)

  const { setShowErrorMsgNo } = useContext(MainGuidelineContext)
  const { isReactionRef } = useContext(ReactionContext)

  const pourLiquidRef = useRef(null)
  const pourParentRef = useRef(null)
  const liquidInsideRef = useRef(null)

  const noLiquidLoggedRef = useRef(false)
  const noReactionLoggedRef = useRef(false)
  const actualPouringRef = useRef(false)

  const fillData = hand === "left" ? leftBeakerFillData : rightBeakerFillData

  useEffect(() => {
    if (!modelRef?.current) return

    pourLiquidRef.current = null
    pourParentRef.current = null
    actualPouringRef.current = false

    modelRef.current.traverse((child) => {
      if (!child.name?.toLowerCase().includes("pour")) return

      pourParentRef.current = child
      child.visible = true

      child.traverse((innerChild) => {
        if (!innerChild.isMesh || !innerChild.material) return

        pourLiquidRef.current = innerChild
        innerChild.material = innerChild.material.clone()
        innerChild.visible = false
        innerChild.scale.set(1, 0, 1)
      })
    })
  }, [modelRef])

  useEffect(() => {
    if (!pourLiquidRef.current || !fillData?.color) return

    const materials = Array.isArray(pourLiquidRef.current.material)
      ? pourLiquidRef.current.material
      : [pourLiquidRef.current.material]

    materials.forEach((mat) => {
      mat.color?.set(fillData.color)
      mat.needsUpdate = true
    })
  }, [fillData?.color])

  const hasVisibleReaction = () => {
    const left = leftBeakerFillData?.name
    const right = rightBeakerFillData?.name

    if (!left || !right) return false

    return visibleReactions.some(
      (reaction) => reaction.includes(left) && reaction.includes(right)
    )
  }

  const findLiquidMesh = (model) => {
    if (!model) return null
    if (typeof model.traverse !== "function") return null

    let liquidMesh = null

    model.traverse((child) => {
      if (liquidMesh) return

      if (child.isMesh && child.name?.toLowerCase().includes("liquid")) {
        liquidMesh = child
      }
    })

    return liquidMesh
  }

  const getLiquidMaxScaleY = (liquidMesh) => {
    const name = liquidMesh?.name?.toLowerCase()

    if (name?.includes("conical")) return 200
    if (name?.includes("normal")) return 55

    return 55
  }

  const isTargetBeakerFull = () => {
    const targetModel =
      hand === "left"
        ? selectedRightHand?.ref?.current
        : selectedLeftHand?.ref?.current

    const targetLiquid = findLiquidMesh(targetModel)

    if (!targetLiquid) return false

    const maxScaleY = getLiquidMaxScaleY(targetLiquid)

    return targetLiquid.scale.y >= maxScaleY - 0.05
  }

  const hasLiquidInsideBeaker = () => {
    if (!modelRef?.current) return false

    let hasLiquid = false
    liquidInsideRef.current = null

    modelRef.current.traverse((child) => {
      if (hasLiquid) return

      const childName = child.name?.toLowerCase()

      if (!childName?.includes("liquid")) return

      if (child.isMesh && child.visible && child.scale.y > 0.01) {
        hasLiquid = true
        liquidInsideRef.current = child
        return
      }

      child.traverse((innerChild) => {
        if (hasLiquid) return
        if (!innerChild.isMesh) return

        if (innerChild.visible && innerChild.scale.y > 0.01) {
          hasLiquid = true
          liquidInsideRef.current = innerChild
        }
      })
    })

    return hasLiquid
  }

  const stopPouring = (forceReset = false) => {
    if (pourLiquidRef.current) {
      pourLiquidRef.current.visible = false
      pourLiquidRef.current.scale.y = 0
    }

    if (forceReset) {
      setPouredFromLeft(false)
      setPouredFromRight(false)
      actualPouringRef.current = false
      return
    }

    if (!actualPouringRef.current) return

    if (hand === "left") {
      setPouredFromLeft(false)
    }

    if (hand === "right") {
      setPouredFromRight(false)
    }

    actualPouringRef.current = false
  }

  const startPouring = () => {
    if (actualPouringRef.current) return

    if (hand === "left") {
      console.log("Pouring from left side")
      setPouredFromLeft(true)
      setPouredFromRight(false)
    }

    if (hand === "right") {
      console.log("Pouring from right side")
      setPouredFromRight(true)
      setPouredFromLeft(false)
    }

    actualPouringRef.current = true
  }

  useFrame((state, delta) => {
    if (!pourLiquidRef.current) return

    const hasLiquid = hasLiquidInsideBeaker()

    if (!isPouring) {
      noLiquidLoggedRef.current = false
      noReactionLoggedRef.current = false
      stopPouring()
      return
    }

    if (!hasLiquid) {
      if (!noLiquidLoggedRef.current) {
        setShowErrorMsgNo(9)
        noLiquidLoggedRef.current = true
      }

      stopPouring()
      return
    }

    if (isTargetBeakerFull()) {
      console.log("Target beaker is full. Stop pouring.")
      stopPouring()
      return
    }

    if (!hasVisibleReaction()) {
      if (!noReactionLoggedRef.current) {
        console.log("No Visible Reaction Found")
        setShowErrorMsgNo(8)
        noReactionLoggedRef.current = true
      }

      isReactionRef.current = false

      stopPouring(true)
      return
    }

    noLiquidLoggedRef.current = false
    noReactionLoggedRef.current = false

    startPouring()

    pourLiquidRef.current.visible = true

    if (pourLiquidRef.current.parent) {
      pourLiquidRef.current.parent.visible = true
    }

    pourLiquidRef.current.scale.y = Math.min(
      pourLiquidRef.current.scale.y + 45 * delta,
      25
    )

    if (liquidInsideRef.current) {
      liquidInsideRef.current.scale.y -= 5 * delta

      if (liquidInsideRef.current.scale.y <= 0.01) {
        liquidInsideRef.current.scale.y = 0
        liquidInsideRef.current.visible = false
        stopPouring()
      }
    }
  })

  return (
    <>
      {hand === "left" && pouredFromLeft && <Reaction hand="left" />}
      {hand === "right" && pouredFromRight && <Reaction hand="right" />}
    </>
  )
}

export default PouringLiquid