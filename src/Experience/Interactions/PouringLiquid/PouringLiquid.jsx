import { useFrame } from "@react-three/fiber"
import { useContext, useEffect, useRef } from "react"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import Reaction from "../Reaction/Reaction"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PouringLiquid = ({ modelRef, hand, isPouring }) => {
  const {
    leftBeakerFillData,
    rightBeakerFillData,

    setPouredFromLeft,
    pouredFromLeft,

    setPouredFromRight,
    pouredFromRight,
  } = useContext(InteractionContext)

  const { setShowErrorMsgNo } = useContext(MainGuidelineContext)

  const pourLiquidRef = useRef(null)
  const pourParentRef = useRef(null)
  const liquidInsideRef = useRef(null)

  const noLiquidLoggedRef = useRef(false)
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

    if (Array.isArray(pourLiquidRef.current.material)) {
      pourLiquidRef.current.material.forEach((mat) => {
        mat?.color?.set(fillData.color)
      })
    } else {
      pourLiquidRef.current.material.color?.set(fillData.color)
    }
  }, [fillData?.color])

  const hasLiquidInsideBeaker = () => {
    if (!modelRef?.current) return false

    let hasLiquid = false
    liquidInsideRef.current = null

    modelRef.current.traverse((child) => {
      if (hasLiquid) return

      const childName = child.name?.toLowerCase()

      if (!childName?.includes("liquid")) return

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

  const stopPouring = () => {
    if (pourLiquidRef.current) {
      pourLiquidRef.current.visible = false
      pourLiquidRef.current.scale.y = 0
    }

    if (actualPouringRef.current) {
      if (hand === "left") {
        setPouredFromLeft(false)
      }

      if (hand === "right") {
        setPouredFromRight(false)
      }

      actualPouringRef.current = false
    }
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

    noLiquidLoggedRef.current = false

    startPouring()

    pourLiquidRef.current.visible = true

    if (pourLiquidRef.current.parent) {
      pourLiquidRef.current.parent.visible = true
    }

    pourLiquidRef.current.scale.y = Math.min(
      pourLiquidRef.current.scale.y + 45 * delta,
      25
    )

    // This is the simple part: liquid inside beaker goes down
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
      {pouredFromLeft && <Reaction />}
      {pouredFromRight && <Reaction />}
    </>
  )
}

export default PouringLiquid