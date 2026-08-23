import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const FillVolumetricPipette = ({
  modelRef,
  otherModelRef,

  amount = 1.3,
  decreaseAmount = 0,
  verticalAmount = 1.3,

  fillSpeed = 0.5,
}) => {
  // ==========================================
  // REFS
  // ==========================================

  const liquidRef = useRef(null)
  const verticalRef = useRef(null)
  const otherLiquidRef = useRef(null)

  const liquidStartScaleRef = useRef(0)
  const verticalStartScaleRef = useRef(0)
  const otherStartScaleRef = useRef(0)

  // Stage 1 progress
  const liquidProgressRef = useRef(0)

  // Stage 2 progress
  const verticalProgressRef = useRef(0)

  const isLiquidFinishedRef =
    useRef(false)

  const isFinishedRef =
    useRef(false)

  // ==========================================
  // CONTEXT
  // ==========================================

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const {
    setIsVolumetricPipetteFilled,
    setFillVolumetricPipette,
  } = useContext(InteractionContext)

  // ==========================================
  // LESSON STEP
  // ==========================================

  useEffect(() => {
    if (
      selectedLesson === 11 &&
      lessonStep === 9
    ) {
      setLessonStep(10)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

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

    liquidRef.current = null
    verticalRef.current = null
    otherLiquidRef.current = null

    // ========================================
    // FIND PIPETTE LIQUID + VERTICAL
    // ========================================

    modelRef.current.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      // Normal liquid
      if (
        childName.includes("liquid") &&
        !childName.includes("vertical")
      ) {
        liquidRef.current = child
      }

      // Vertical liquid section
      if (
        childName.includes("vertical")
      ) {
        verticalRef.current = child
      }
    })

    // ========================================
    // FIND OTHER MODEL LIQUID
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
    // CHECK REFS
    // ========================================

    if (!liquidRef.current) {
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
    // VISIBILITY
    // ========================================

    liquidRef.current.visible = true

    otherLiquidRef.current.visible =
      true

    // ========================================
    // STORE START SCALES
    // ========================================

    liquidStartScaleRef.current =
      liquidRef.current.scale.y

    otherStartScaleRef.current =
      otherLiquidRef.current.scale.y

    // ========================================
    // VERTICAL START
    // ========================================

    if (verticalRef.current) {
      verticalStartScaleRef.current =
        0

      verticalRef.current.scale.y = 0

      verticalRef.current.visible =
        false

      verticalRef.current.updateMatrixWorld(
        true
      )
    }

    // ========================================
    // RESET PROGRESS
    // ========================================

    liquidProgressRef.current = 0

    verticalProgressRef.current = 0

    isLiquidFinishedRef.current =
      false

    isFinishedRef.current =
      false

    console.log(
      "🧪 Volumetric pipette filling started"
    )

    console.log(
      "Normal liquid start:",
      liquidStartScaleRef.current
    )

    console.log(
      "Normal liquid target:",
      amount
    )

    console.log(
      "Vertical target:",
      verticalAmount
    )

    console.log(
      "Other liquid start:",
      otherStartScaleRef.current
    )

    console.log(
      "Other liquid target:",
      decreaseAmount
    )
  }, [
    modelRef,
    otherModelRef,
    amount,
    decreaseAmount,
    verticalAmount,
  ])

  // ==========================================
  // FINISH TRANSFER
  // ==========================================

  const finishTransfer = () => {
    if (isFinishedRef.current) return

    isFinishedRef.current = true

    // ========================================
    // NORMAL LIQUID FINAL
    // ========================================

    if (liquidRef.current) {
      liquidRef.current.scale.y =
        amount

      liquidRef.current.updateMatrixWorld(
        true
      )
    }

    // ========================================
    // VERTICAL FINAL
    // ========================================

    if (verticalRef.current) {
      verticalRef.current.scale.y =
        verticalAmount

      verticalRef.current.visible =
        true

      verticalRef.current.updateMatrixWorld(
        true
      )
    }

    // ========================================
    // OTHER LIQUID FINAL
    // ========================================

    if (otherLiquidRef.current) {
      otherLiquidRef.current.scale.y =
        decreaseAmount

      if (decreaseAmount <= 0) {
        otherLiquidRef.current.visible =
          false
      }

      otherLiquidRef.current.updateMatrixWorld(
        true
      )
    }

    console.log(
      "✅ Full liquid transfer finished"
    )

    console.log(
      "Normal liquid:",
      liquidRef.current?.scale.y
    )

    console.log(
      "Vertical liquid:",
      verticalRef.current?.scale.y
    )

    console.log(
      "Other liquid:",
      otherLiquidRef.current?.scale.y
    )

    setIsVolumetricPipetteFilled(true)

    setFillVolumetricPipette(false)
  }

  // ==========================================
  // ANIMATION
  // ==========================================

  useFrame((_, delta) => {
    if (
      !liquidRef.current ||
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
    // NORMAL LIQUID FILLS FIRST
    // ========================================

    if (
      !isLiquidFinishedRef.current
    ) {
      liquidProgressRef.current +=
        fillSpeed * delta

      const progress =
        Math.min(
          liquidProgressRef.current,
          1
        )

      // ======================================
      // NORMAL LIQUID SCALE UP
      // ======================================

      liquidRef.current.scale.y =
        liquidStartScaleRef.current +
        (
          amount -
          liquidStartScaleRef.current
        ) *
          progress

      // ======================================
      // OTHER LIQUID
      //
      // DECREASE FIRST 50%
      // ======================================

      const totalProgress =
        progress * 0.5

      otherLiquidRef.current.scale.y =
        otherStartScaleRef.current +
        (
          decreaseAmount -
          otherStartScaleRef.current
        ) *
          totalProgress

      // ======================================
      // UPDATE
      // ======================================

      liquidRef.current.updateMatrixWorld(
        true
      )

      otherLiquidRef.current.updateMatrixWorld(
        true
      )

      // ======================================
      // NORMAL LIQUID FINISHED
      // ======================================

      if (progress >= 1) {
        liquidRef.current.scale.y =
          amount

        isLiquidFinishedRef.current =
          true

        console.log(
          "✅ Normal pipette liquid filled"
        )

        // ====================================
        // START VERTICAL
        // ====================================

        if (verticalRef.current) {
          verticalRef.current.scale.y =
            0

          verticalRef.current.visible =
            true

          verticalRef.current.updateMatrixWorld(
            true
          )

          console.log(
            "⬆️ Vertical filling started"
          )
        }
      }

      return
    }

    // ========================================
    // STAGE 2
    //
    // VERTICAL FILLS AFTER NORMAL LIQUID
    // ========================================

    if (verticalRef.current) {
      verticalProgressRef.current +=
        fillSpeed * delta

      const verticalProgress =
        Math.min(
          verticalProgressRef.current,
          1
        )

      // ======================================
      // VERTICAL SCALE UP
      // ======================================

      verticalRef.current.scale.y =
        verticalStartScaleRef.current +
        (
          verticalAmount -
          verticalStartScaleRef.current
        ) *
          verticalProgress

      // ======================================
      // OTHER LIQUID
      //
      // DECREASE SECOND 50%
      // ======================================

      const totalProgress =
        0.5 +
        verticalProgress * 0.5

      otherLiquidRef.current.scale.y =
        otherStartScaleRef.current +
        (
          decreaseAmount -
          otherStartScaleRef.current
        ) *
          totalProgress

      // ======================================
      // UPDATE
      // ======================================

      verticalRef.current.updateMatrixWorld(
        true
      )

      otherLiquidRef.current.updateMatrixWorld(
        true
      )

      // ======================================
      // EVERYTHING FINISHED
      // ======================================

      if (verticalProgress >= 1) {
        verticalRef.current.scale.y =
          verticalAmount

        otherLiquidRef.current.scale.y =
          decreaseAmount

        finishTransfer()
      }
    }

    // ========================================
    // NO VERTICAL CHILD
    // ========================================

    else {
      otherLiquidRef.current.scale.y =
        decreaseAmount

      finishTransfer()
    }
  })

  return null
}

export default FillVolumetricPipette