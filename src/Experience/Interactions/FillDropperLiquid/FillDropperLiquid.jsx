import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

const FillDropperLiquid = ({
  color = "#ffffff",
  opacity = 0.3,

  amount = 2,
  speed = 1,

  otherModelRef,
  otherLiquidEndAmount = 0,
}) => {
  const {
    mainDropperRef,
  } = useContext(ModelContext)

  const dropperLiquidRef =
    useRef(null)

  const otherLiquidRef =
    useRef(null)

  const startDropperAmountRef =
    useRef(0)

  const startOtherAmountRef =
    useRef(0)

  const progressRef =
    useRef(0)

  const completedRef =
    useRef(false)

  // ============================================
  // FIND LIQUIDS
  // ============================================

  useEffect(() => {
    const dropper =
      mainDropperRef?.current

    const otherModel =
      otherModelRef?.current

    if (!dropper) {
      console.warn(
        "FillDropperLiquid: mainDropperRef was not found"
      )

      return
    }

    dropperLiquidRef.current = null
    otherLiquidRef.current = null

    // ============================================
    // FIND DROPPER LIQUID
    // ============================================

    dropper.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      if (
        child.isMesh &&
        name.includes("liquid")
      ) {
        dropperLiquidRef.current =
          child
      }
    })

    // ============================================
    // FIND OTHER MODEL LIQUID
    // ============================================

    if (otherModel) {
      otherModel.traverse((child) => {
        const name =
          child.name?.toLowerCase() || ""

        if (
          child.isMesh &&
          name.includes("liquid")
        ) {
          otherLiquidRef.current =
            child
        }
      })
    }

    const dropperLiquid =
      dropperLiquidRef.current

    const otherLiquid =
      otherLiquidRef.current

    if (!dropperLiquid) {
      console.warn(
        "FillDropperLiquid: dropper liquid was not found"
      )

      return
    }

    // ============================================
    // DROPPER LIQUID MATERIAL
    // ============================================

    if (dropperLiquid.material) {
      dropperLiquid.material =
        dropperLiquid.material.clone()

      dropperLiquid.material.transparent =
        true

      dropperLiquid.material.opacity =
        opacity

      if (
        dropperLiquid.material.color
      ) {
        dropperLiquid.material.color.set(
          color
        )
      }

      dropperLiquid.material.needsUpdate =
        true
    }

    // ============================================
    // START VALUES
    // ============================================

    dropperLiquid.visible = true

    startDropperAmountRef.current =
      dropperLiquid.scale.y

    if (otherLiquid) {
      startOtherAmountRef.current =
        otherLiquid.scale.y

      otherLiquid.visible = true
    }

    progressRef.current = 0
    completedRef.current = false
  }, [
    mainDropperRef,
    otherModelRef,
    color,
    opacity,
    amount,
    otherLiquidEndAmount,
  ])

  // ============================================
  // ANIMATION
  // ============================================

  useFrame((_, delta) => {
    if (completedRef.current) {
      return
    }

    const dropperLiquid =
      dropperLiquidRef.current

    if (!dropperLiquid) {
      return
    }

    progressRef.current +=
      speed * delta

    const progress =
      Math.min(
        progressRef.current,
        1
      )

    // ============================================
    // FILL DROPPER
    // ============================================

    dropperLiquid.scale.y =
      startDropperAmountRef.current +
      (
        amount -
        startDropperAmountRef.current
      ) *
        progress

    dropperLiquid.visible = true

    // ============================================
    // DECREASE OTHER LIQUID
    // ============================================

    const otherLiquid =
      otherLiquidRef.current

    if (otherLiquid) {
      otherLiquid.scale.y =
        startOtherAmountRef.current +
        (
          otherLiquidEndAmount -
          startOtherAmountRef.current
        ) *
          progress

      otherLiquid.visible =
        otherLiquid.scale.y > 0.001
    }

    // ============================================
    // FINISH
    // ============================================

    if (progress >= 1) {
      dropperLiquid.scale.y =
        amount

      if (otherLiquid) {
        otherLiquid.scale.y =
          otherLiquidEndAmount

        otherLiquid.visible =
          otherLiquidEndAmount >
          0.001
      }

      completedRef.current = true
    }
  })

  return null
}

export default FillDropperLiquid