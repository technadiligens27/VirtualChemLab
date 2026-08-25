import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const PourVolumetricPipette = ({
  modelRef,
  otherModelRef,

  amount = 1,
  otherLiquidAmount = 0.25,

  scaleSpeed = 0.5,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const {
    setPourFromVolumetricPipette,
    setIsVolumetricPipetteFilled,
  } = useContext(InteractionContext)

  // ==========================================
  // REFS
  // ==========================================

  const pourRef = useRef(null)

  const modelLiquidRef = useRef(null)
  const verticalRef = useRef(null)
  const otherLiquidRef = useRef(null)

  const pourStartScaleRef = useRef(0)

  const modelLiquidStartScaleRef =
    useRef(0)

  const verticalStartScaleRef =
    useRef(0)

  const otherLiquidStartScaleRef =
    useRef(0)

  // ==========================================
  // PROGRESS
  // ==========================================

  const verticalProgressRef =
    useRef(0)

  const liquidProgressRef =
    useRef(0)

  const isVerticalFinishedRef =
    useRef(false)

  const isFinishedRef =
    useRef(false)

  // ==========================================
  // FIND CHILDREN
  // ==========================================

  useEffect(() => {
    if (
      !modelRef?.current ||
      !otherModelRef?.current
    ) {
      return
    }

    pourRef.current = null
    modelLiquidRef.current = null
    verticalRef.current = null
    otherLiquidRef.current = null

    // ========================================
    // SOURCE PIPETTE
    // ========================================

    modelRef.current.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      // Pour stream
      if (
        childName.includes("pour")
      ) {
        pourRef.current = child
      }

      // Normal liquid
      if (
        childName.includes("liquid") &&
        !childName.includes("vertical")
      ) {
        modelLiquidRef.current = child
      }

      // Vertical liquid section
      if (
        childName.includes("vertical")
      ) {
        verticalRef.current = child
      }
    })

    // ========================================
    // RECEIVER LIQUID
    // ========================================

    otherModelRef.current.traverse(
      (child) => {
        const childName =
          child.name?.toLowerCase() || ""

        if (
          childName.includes("liquid")
        ) {
          otherLiquidRef.current = child
        }
      }
    )

    // ========================================
    // CHECK
    // ========================================

    if (!pourRef.current) {
      console.log(
        "❌ Pour child not found"
      )
      return
    }

    if (!modelLiquidRef.current) {
      console.log(
        "❌ Volumetric pipette liquid not found"
      )
      return
    }

    if (!otherLiquidRef.current) {
      console.log(
        "❌ Other model liquid not found"
      )
      return
    }

    if (!verticalRef.current) {
      console.log(
        "ℹ️ Vertical child not found"
      )
    }

    // ========================================
    // STORE START VALUES
    // ========================================

    pourStartScaleRef.current =
      pourRef.current.scale.y

    modelLiquidStartScaleRef.current =
      modelLiquidRef.current.scale.y

    otherLiquidStartScaleRef.current =
      otherLiquidRef.current.scale.y

    if (verticalRef.current) {
      verticalStartScaleRef.current =
        verticalRef.current.scale.y
    }

    // ========================================
    // VISIBILITY
    // ========================================

    pourRef.current.visible = true

    modelLiquidRef.current.visible =
      true

    otherLiquidRef.current.visible =
      true

    if (verticalRef.current) {
      verticalRef.current.visible =
        true
    }

    // ========================================
    // RESET
    // ========================================

    verticalProgressRef.current = 0
    liquidProgressRef.current = 0

    isVerticalFinishedRef.current =
      false

    isFinishedRef.current =
      false

    console.log(
      "🧪 Volumetric pipette pouring started"
    )

    console.log(
      "Vertical start:",
      verticalStartScaleRef.current
    )

    console.log(
      "Normal liquid start:",
      modelLiquidStartScaleRef.current
    )

    console.log(
      "Receiver start:",
      otherLiquidStartScaleRef.current
    )
  }, [
    modelRef,
    otherModelRef,
    amount,
    otherLiquidAmount,
  ])

  // ==========================================
  // FINISH TRANSFER
  // ==========================================

  const finishTransfer = () => {
    if (isFinishedRef.current) {
      return
    }

    isFinishedRef.current = true

    // ========================================
    // SOURCE NORMAL LIQUID EMPTY
    // ========================================

    if (modelLiquidRef.current) {
      modelLiquidRef.current.scale.y =
        0

      modelLiquidRef.current.visible =
        false
    }

    // ========================================
    // VERTICAL EMPTY
    // ========================================

    if (verticalRef.current) {
      verticalRef.current.scale.y = 0

      verticalRef.current.visible =
        false
    }

    // ========================================
    // RECEIVER FINAL
    // ========================================

    if (otherLiquidRef.current) {
      otherLiquidRef.current.scale.y =
        otherLiquidStartScaleRef.current +
        otherLiquidAmount

      otherLiquidRef.current.visible =
        true
    }

    // ========================================
    // POUR STREAM OFF
    // ========================================

    if (pourRef.current) {
      pourRef.current.scale.y = 0
      pourRef.current.visible = false
    }

    // ========================================
    // UPDATE
    // ========================================

    modelLiquidRef.current?.updateMatrixWorld(
      true
    )

    verticalRef.current?.updateMatrixWorld(
      true
    )

    otherLiquidRef.current?.updateMatrixWorld(
      true
    )

    pourRef.current?.updateMatrixWorld(
      true
    )

    console.log(
      "✅ Volumetric pipette pouring finished"
    )

    console.log(
      "Vertical final:",
      verticalRef.current?.scale.y
    )

    console.log(
      "Normal liquid final:",
      modelLiquidRef.current?.scale.y
    )

    console.log(
      "Other liquid final:",
      otherLiquidRef.current?.scale.y
    )

    setPourFromVolumetricPipette(false)

    setIsVolumetricPipetteFilled(false)

    if (
      selectedLesson === 11 &&
      lessonStep === 14
    ) {
      setLessonStep(15)
    }

    if (
      selectedLesson === 12.2 &&
      lessonStep === 74
    ) {
      setLessonStep(75)
    }    
  }

  // ==========================================
  // ANIMATION
  // ==========================================

  useFrame((_, delta) => {
    if (
      !pourRef.current ||
      !modelLiquidRef.current ||
      !otherLiquidRef.current
    ) {
      return
    }

    if (isFinishedRef.current) {
      return
    }

    // ========================================
    // STAGE 1
    //
    // VERTICAL EMPTIES FIRST
    // ========================================

    if (
      verticalRef.current &&
      !isVerticalFinishedRef.current
    ) {
      verticalProgressRef.current +=
        scaleSpeed * delta

      const progress =
        Math.min(
          verticalProgressRef.current,
          1
        )

      // ======================================
      // VERTICAL SCALE DOWN
      // ======================================

      verticalRef.current.scale.y =
        verticalStartScaleRef.current *
        (1 - progress)

      // ======================================
      // POUR STREAM
      // ======================================

      pourRef.current.scale.y =
        pourStartScaleRef.current +
        (
          amount -
          pourStartScaleRef.current
        ) *
          progress

      // ======================================
      // RECEIVER FIRST HALF
      // ======================================

      const totalProgress =
        progress * 0.5

      otherLiquidRef.current.scale.y =
        otherLiquidStartScaleRef.current +
        otherLiquidAmount *
          totalProgress

      // ======================================
      // UPDATE
      // ======================================

      verticalRef.current.updateMatrixWorld(
        true
      )

      pourRef.current.updateMatrixWorld(
        true
      )

      otherLiquidRef.current.updateMatrixWorld(
        true
      )

      // ======================================
      // VERTICAL FINISHED
      // ======================================

      if (progress >= 1) {
        verticalRef.current.scale.y = 0

        verticalRef.current.visible =
          false

        isVerticalFinishedRef.current =
          true

        console.log(
          "✅ Vertical liquid emptied"
        )
      }

      return
    }

    // ========================================
    // NO VERTICAL CHILD
    // ========================================

    if (
      !verticalRef.current &&
      !isVerticalFinishedRef.current
    ) {
      isVerticalFinishedRef.current =
        true
    }

    // ========================================
    // STAGE 2
    //
    // NORMAL LIQUID EMPTIES SECOND
    // ========================================

    liquidProgressRef.current +=
      scaleSpeed * delta

    const progress =
      Math.min(
        liquidProgressRef.current,
        1
      )

    // ========================================
    // NORMAL LIQUID SCALE DOWN
    // ========================================

    modelLiquidRef.current.scale.y =
      modelLiquidStartScaleRef.current *
      (1 - progress)

    // ========================================
    // KEEP POUR STREAM VISIBLE
    // ========================================

    pourRef.current.visible = true
    pourRef.current.scale.y = amount

    // ========================================
    // RECEIVER SECOND HALF
    // ========================================

    const totalProgress =
      0.5 +
      progress * 0.5

    otherLiquidRef.current.scale.y =
      otherLiquidStartScaleRef.current +
      otherLiquidAmount *
        totalProgress

    // ========================================
    // UPDATE
    // ========================================

    modelLiquidRef.current.updateMatrixWorld(
      true
    )

    otherLiquidRef.current.updateMatrixWorld(
      true
    )

    pourRef.current.updateMatrixWorld(
      true
    )

    // ========================================
    // EVERYTHING FINISHED
    // ========================================

    if (progress >= 1) {
      modelLiquidRef.current.scale.y = 0

      otherLiquidRef.current.scale.y =
        otherLiquidStartScaleRef.current +
        otherLiquidAmount

      finishTransfer()
    }
  })

  return null
}

export default PourVolumetricPipette