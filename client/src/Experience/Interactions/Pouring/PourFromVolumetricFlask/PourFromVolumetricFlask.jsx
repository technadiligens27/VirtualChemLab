import {
    useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"
import { MainGuidelineContext } from "../../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PourFromVolumetricFlask = ({
  modelRef,
  otherModelRef,

  // Final scale of receiving liquid
  otherLiquidScale = 1,

  // How much source liquid should decrease
  modelLiquidDecreaseAmount = 0.2,

  // Total liquid-transfer duration
  duration = 4,

  // Pour stream
  pourScale = 1,
  pourScaleDuration = 0.3,
}) => {

  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)  

  const pourRef =
    useRef(null)

  const modelLiquidRef =
    useRef(null)

  const otherLiquidRef =
    useRef(null)

  const pourElapsedRef =
    useRef(0)

  const transferElapsedRef =
    useRef(0)

  const pourFinishedRef =
    useRef(false)

  const transferFinishedRef =
    useRef(false)

  const modelLiquidStartScaleRef =
    useRef(0)

  const modelLiquidTargetScaleRef =
    useRef(0)

  const otherLiquidStartScaleRef =
    useRef(0)

  // =====================================================
  // FIND OBJECTS
  // =====================================================

  useEffect(() => {
    if (!modelRef?.current) return
    if (!otherModelRef?.current) return

    pourRef.current = null
    modelLiquidRef.current = null
    otherLiquidRef.current = null

    // ===================================================
    // FIND POUR + SOURCE LIQUID
    // ===================================================

    modelRef.current.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        childName.includes("pour")
      ) {
        pourRef.current = child
      }

      if (
        childName.includes("liquid") &&
        !childName.includes("pour")
      ) {
        modelLiquidRef.current =
          child
      }
    })

    // ===================================================
    // FIND RECEIVING LIQUID
    // ===================================================

    otherModelRef.current.traverse(
      (child) => {
        const childName =
          child.name?.toLowerCase() || ""

        if (
          childName.includes("liquid")
        ) {
          otherLiquidRef.current =
            child

          otherLiquidRef.current.visible =
            true
        }
      }
    )

    // ===================================================
    // CHECKS
    // ===================================================

    if (!pourRef.current) {
      console.log(
        "Pour child not found"
      )
      return
    }

    if (!modelLiquidRef.current) {
      console.log(
        "Model liquid child not found"
      )
      return
    }

    if (!otherLiquidRef.current) {
      console.log(
        "Other liquid child not found"
      )
      return
    }

    // ===================================================
    // INITIAL VALUES
    // ===================================================

    pourRef.current.scale.y = 0
    pourRef.current.visible = true

    modelLiquidStartScaleRef.current =
      modelLiquidRef.current.scale.y

    modelLiquidTargetScaleRef.current =
      Math.max(
        modelLiquidStartScaleRef.current -
          modelLiquidDecreaseAmount,
        0
      )

    otherLiquidStartScaleRef.current =
      otherLiquidRef.current.scale.y

    pourElapsedRef.current = 0
    transferElapsedRef.current = 0

    pourFinishedRef.current = false
    transferFinishedRef.current = false

    // ===================================================
    // CLEANUP
    // ===================================================

    return () => {
      if (pourRef.current) {
        pourRef.current.scale.y = 0
        pourRef.current.visible = false
      }
    }
  }, [
    modelRef,
    otherModelRef,
    modelLiquidDecreaseAmount,
  ])

  // =====================================================
  // ANIMATION
  // =====================================================

  useFrame((_, delta) => {
    if (!pourRef.current) return
    if (!modelLiquidRef.current) return
    if (!otherLiquidRef.current) return

    // ===================================================
    // PHASE 1
    // QUICKLY SHOW POUR STREAM
    // ===================================================

    if (!pourFinishedRef.current) {
      pourElapsedRef.current += delta

      const pourProgress =
        Math.min(
          pourElapsedRef.current /
            pourScaleDuration,
          1
        )

      pourRef.current.scale.y =
        pourScale *
        pourProgress

      if (pourProgress >= 1) {
        pourRef.current.scale.y =
          pourScale

        pourFinishedRef.current =
          true

        transferElapsedRef.current =
          0
      }

      return
    }

    // ===================================================
    // PHASE 2
    // SOURCE DECREASE + RECEIVER INCREASE
    // BOTH USE SAME DURATION
    // ===================================================

    if (
      !transferFinishedRef.current
    ) {
      transferElapsedRef.current +=
        delta

      const progress =
        Math.min(
          transferElapsedRef.current /
            duration,
          1
        )

      // ---------------------------------
      // SOURCE LIQUID DECREASE
      // ---------------------------------

      modelLiquidRef.current.scale.y =
        modelLiquidStartScaleRef.current +
        (
          modelLiquidTargetScaleRef.current -
          modelLiquidStartScaleRef.current
        ) *
          progress

      // ---------------------------------
      // RECEIVING LIQUID INCREASE
      // ---------------------------------

      otherLiquidRef.current.scale.y =
        otherLiquidStartScaleRef.current +
        (
          otherLiquidScale -
          otherLiquidStartScaleRef.current
        ) *
          progress

      // ---------------------------------
      // FINISHED
      // ---------------------------------

      if (progress >= 1) {
        modelLiquidRef.current.scale.y =
          modelLiquidTargetScaleRef.current

        otherLiquidRef.current.scale.y =
          otherLiquidScale

        transferFinishedRef.current =
          true

        // Remove pour immediately
        pourRef.current.scale.y = 0
        pourRef.current.visible = false

        if(selectedLesson==12.2 && lessonStep ==57){
            setLessonStep(58)
        }
      }
    }
  })

  return null
}

export default PourFromVolumetricFlask