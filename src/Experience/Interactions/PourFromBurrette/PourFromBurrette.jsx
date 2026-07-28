import {
  useContext,
  useEffect,
  useRef,
} from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PourFromBurette = ({
  scaleSpeed = 0.05,
  minimumScaleY = 0,
  smoothSpeed = 6,
}) => {
  const { mainBuiretteRef } =
    useContext(ModelContext)

  const {
    lessonStep,
    setLessonStep,
    selectedLesson,
  } = useContext(MainGuidelineContext)

  const pourChildRef = useRef(null)
  const liquidChildRef = useRef(null)

  const originalPourScaleYRef = useRef(null)
  const originalLiquidScaleYRef = useRef(null)

  const targetPourScaleYRef = useRef(null)
  const targetLiquidScaleYRef = useRef(null)

  const pouringCompletedRef = useRef(false)

  useEffect(() => {
    const burette = mainBuiretteRef?.current

    if (!burette) {
      console.log(
        "Main burette was not found"
      )
      return
    }

    let pourChild = null
    let liquidChild = null

    burette.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        !pourChild &&
        childName.includes("pour")
      ) {
        pourChild = child
      }

      if (
        !liquidChild &&
        childName.includes("liquid")
      ) {
        liquidChild = child
      }
    })

    if (!pourChild) {
      console.log(
        'A child containing "pour" was not found'
      )
      return
    }

    if (!liquidChild) {
      console.log(
        'A child containing "liquid" was not found'
      )
      return
    }

    pourChildRef.current = pourChild
    liquidChildRef.current = liquidChild

    originalPourScaleYRef.current =
      pourChild.scale.y

    originalLiquidScaleYRef.current =
      liquidChild.scale.y

    targetPourScaleYRef.current =
      pourChild.scale.y

    targetLiquidScaleYRef.current =
      liquidChild.scale.y

    pouringCompletedRef.current = false

    // The stream should initially be hidden.
    // It becomes visible when the user scrolls.
    pourChild.visible = false

    const handleWheel = (event) => {
      const currentPourChild =
        pourChildRef.current

      const currentLiquidChild =
        liquidChildRef.current

      if (
        !currentPourChild ||
        !currentLiquidChild
      ) {
        return
      }

      // Only pour while scrolling downward.
      if (event.deltaY <= 0) return

      // Do not pour when the liquid is hidden.
      if (!currentLiquidChild.visible) {
        console.log(
          "Cannot pour because the burette has no visible liquid"
        )
        return
      }

      // Do not continue if pouring has finished.
      if (pouringCompletedRef.current) {
        return
      }

      if (
        targetLiquidScaleYRef.current <=
        minimumScaleY
      ) {
        return
      }

      event.preventDefault()

      // Show the pouring stream once pouring begins.
      currentPourChild.visible = true

      targetLiquidScaleYRef.current =
        Math.max(
          minimumScaleY,
          targetLiquidScaleYRef.current -
            scaleSpeed
        )

      /*
       * Make the pouring stream decrease according
       * to the amount of liquid remaining.
       */
      const originalLiquidScale =
        originalLiquidScaleYRef.current

      const originalPourScale =
        originalPourScaleYRef.current

      if (
        originalLiquidScale > 0 &&
        originalPourScale !== null
      ) {
        const liquidPercentage =
          targetLiquidScaleYRef.current /
          originalLiquidScale

        targetPourScaleYRef.current =
          Math.max(
            minimumScaleY,
            originalPourScale *
              liquidPercentage
          )
      }
    }

    window.addEventListener(
      "wheel",
      handleWheel,
      { passive: false }
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )

      if (
        pourChildRef.current &&
        originalPourScaleYRef.current !== null
      ) {
        pourChildRef.current.scale.y =
          originalPourScaleYRef.current

        pourChildRef.current.visible = false
      }

      if (
        liquidChildRef.current &&
        originalLiquidScaleYRef.current !== null
      ) {
        liquidChildRef.current.scale.y =
          originalLiquidScaleYRef.current

        liquidChildRef.current.visible = true
      }

      pourChildRef.current?.updateMatrixWorld(
        true
      )

      liquidChildRef.current?.updateMatrixWorld(
        true
      )

      pourChildRef.current = null
      liquidChildRef.current = null

      targetPourScaleYRef.current = null
      targetLiquidScaleYRef.current = null

      pouringCompletedRef.current = false
    }
  }, [
    mainBuiretteRef,
    scaleSpeed,
    minimumScaleY,
  ])

  useFrame((_, delta) => {
    const pourChild =
      pourChildRef.current

    const liquidChild =
      liquidChildRef.current

    const targetPourScaleY =
      targetPourScaleYRef.current

    const targetLiquidScaleY =
      targetLiquidScaleYRef.current

    if (
      !pourChild ||
      !liquidChild ||
      targetPourScaleY === null ||
      targetLiquidScaleY === null ||
      pouringCompletedRef.current
    ) {
      return
    }

    // Smoothly reduce the liquid inside the burette.
    liquidChild.scale.y =
      THREE.MathUtils.damp(
        liquidChild.scale.y,
        targetLiquidScaleY,
        smoothSpeed,
        delta
      )

    // Smoothly reduce the pouring stream.
    pourChild.scale.y =
      THREE.MathUtils.damp(
        pourChild.scale.y,
        targetPourScaleY,
        smoothSpeed,
        delta
      )

    const liquidReachedTarget =
      Math.abs(
        liquidChild.scale.y -
          targetLiquidScaleY
      ) < 0.0001

    const pourReachedTarget =
      Math.abs(
        pourChild.scale.y -
          targetPourScaleY
      ) < 0.0001

    if (liquidReachedTarget) {
      liquidChild.scale.y =
        targetLiquidScaleY
    }

    if (pourReachedTarget) {
      pourChild.scale.y =
        targetPourScaleY
    }

    const liquidIsEmpty =
      targetLiquidScaleY <= minimumScaleY &&
      liquidReachedTarget

    if (
      liquidIsEmpty &&
      !pouringCompletedRef.current
    ) {
      pouringCompletedRef.current = true

      liquidChild.scale.y = minimumScaleY
      pourChild.scale.y = minimumScaleY

      // There is now no liquid inside the burette.
      liquidChild.visible = false

      // Stop and hide the pouring stream.
      pourChild.visible = false

      liquidChild.updateMatrixWorld(true)
      pourChild.updateMatrixWorld(true)

      console.log(
        "Burette is empty and pouring has stopped"
      )

      if (
        selectedLesson === 8 &&
        lessonStep === 27
      ) {
        setLessonStep(28)
      }

      return
    }

    liquidChild.updateMatrixWorld(true)
    pourChild.updateMatrixWorld(true)
  })

  return null
}

export default PourFromBurette