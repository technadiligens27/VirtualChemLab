import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import HCLTitrationReaction from "../../AllReactions/HCLTitrationReaction/HCLTitrationReaction"


const PourFromBurette = ({
  scaleSpeed = 0.09,
  minimumScaleY = 0,
  smoothSpeed = 2,
}) => {
  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const {
    mainBuiretteRef,
    conicalBeakerRef,
  } = useContext(ModelContext)

  const pourRef = useRef(null)
  const liquidRef = useRef(null)

  const isScrollingRef = useRef(false)
  const isPourFinishedRef = useRef(false)

  // ==========================================
  // REACTION STATE
  // ==========================================

  const [isPouring, setIsPouring] =
    useState(false)

  const [isEndpoint, setIsEndpoint] =
    useState(false)

  // ==========================================
  // START POURING ON SCROLL DOWN
  // ==========================================

  useEffect(() => {
    const handleWheel = (event) => {
      const liquid = liquidRef.current

      if (event.deltaY <= 0) return
      if (!liquid) return
      if (liquid.scale.y <= 0) return
      if (isScrollingRef.current) return
      if (isPourFinishedRef.current) return

      isScrollingRef.current = true

      // Tell reaction component that
      // NaOH is entering the conical flask
      setIsPouring(true)

      console.log(
        "Burette pouring started"
      )
    }

    window.addEventListener(
      "wheel",
      handleWheel,
      { passive: true }
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [])

  // ==========================================
  // FIND BURETTE POUR + LIQUID
  // ==========================================

  useEffect(() => {
    const burette =
      mainBuiretteRef.current

    if (!burette) {
      console.log("No Burette Found")
      return
    }

    burette.traverse((child) => {
      if (
        child.isMesh &&
        child.name
          ?.toLowerCase()
          .includes("pour")
      ) {
        pourRef.current = child

        child.scale.y =
          minimumScaleY

        child.visible = false
      }

      if (
        child.isMesh &&
        child.name
          ?.toLowerCase()
          .includes("liquid")
      ) {
        liquidRef.current = child
      }
    })
  }, [
    mainBuiretteRef,
    minimumScaleY,
  ])

  // ==========================================
  // BURETTE POURING ANIMATION
  // ==========================================

  useFrame((state, delta) => {
    const pour = pourRef.current
    const liquid = liquidRef.current

    if (!pour) return
    if (!liquid) return
    if (!isScrollingRef.current) return

    // ========================================
    // BURETTE EMPTY
    // ========================================

    if (liquid.scale.y <= 0) {
      liquid.scale.y = 0

      pour.visible = false

      pour.scale.y =
        minimumScaleY

      isScrollingRef.current = false
      isPourFinishedRef.current = true

      // Stop reaction pouring state
      setIsPouring(false)

      return
    }

    // ========================================
    // SHOW POUR STREAM
    // ========================================

    pour.visible = true

    pour.scale.y =
      THREE.MathUtils.damp(
        pour.scale.y,
        80,
        smoothSpeed,
        delta
      )

    // ========================================
    // LOWER BURETTE LIQUID
    // ========================================

    liquid.scale.y = Math.max(
      liquid.scale.y -
        scaleSpeed * delta,
      0
    )

    // ========================================
    // POUR FINISHED
    // ========================================

    if (liquid.scale.y <= 0) {
      liquid.scale.y = 0

      pour.visible = false

      pour.scale.y =
        minimumScaleY

      isScrollingRef.current = false
      isPourFinishedRef.current = true

      // NaOH is no longer flowing
      setIsPouring(false)

      console.log(
        "Burette pouring finished"
      )

      // ======================================
      // LESSON 8
      // ======================================

      if (
        selectedLesson === 8 &&
        lessonStep === 27
      ) {
        setLessonStep(28)
      }

      // ======================================
      // LESSON 9
      // ======================================

      if (
        selectedLesson === 9 &&
        lessonStep === 24
      ) {
        setLessonStep(25)
      }

      // ======================================
      // HCL TITRATION
      // ======================================

      if (
        selectedLesson === 11.1
      ) {
        // For now this marks the endpoint
        // when your chosen burette amount
        // has been delivered.
        setIsEndpoint(true)

        console.log(
          "✅ Rough titration endpoint reached"
        )
      }
    }
  })

  return (
    <>
      {/* ======================================
          HCL TITRATION REACTION
          ====================================== */}

      {selectedLesson === 11.1 && (
        <HCLTitrationReaction
          conicalFlaskRef={
            conicalBeakerRef
          }

          isPouring={isPouring}

          isEndpoint={isEndpoint}

          // Local pink patch while NaOH
          // is continuously entering
          localPinkColor="#f4a6c1"
          localPinkOpacity={1}
          localPinkFadeSpeed={0.6}

          // Whole flask becomes faint pink
          // once endpoint is reached
          endpointColor="#f7c1d6"
          endpointOpacity={0.28}

          // Conical flask liquid rises
          // while NaOH is entering
          liquidRiseSpeed={0.03}
          maxLiquidScaleY={0.5}
        />
      )}
    </>
  )
}

export default PourFromBurette