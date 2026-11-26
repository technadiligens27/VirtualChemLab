import {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react"

import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

import HCLTitrationReaction from "../../AllReactions/HCLTitrationReaction/HCLTitrationReaction"

const PourFromBurette = ({
  scaleSpeed = 0.09,

  // Pour model target Y scale
  pourScaleY = 180,

  // How quickly pour model reaches target scale
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

  const {
    isTouchDevice,
    mobilePour,
    setMobilePour,
    setShowMobilePourButton,
  } = useContext(InteractionContext)

  // ==========================================
  // REFS
  // ==========================================

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

  const [isBuretteReady, setIsBuretteReady] =
    useState(false)

  // ==========================================
  // FIND BURETTE POUR + LIQUID
  // ==========================================

  useEffect(() => {

    const burette = mainBuiretteRef.current

    if (!burette) {

      console.log("No Burette Found")

      return
    }

    pourRef.current = null
    liquidRef.current = null

    burette.traverse((child) => {

      const childName =
        child.name?.toLowerCase() || ""

      // ======================================
      // POUR MODEL
      // ======================================

      if (
        child.isMesh &&
        childName.includes("pour")
      ) {

        pourRef.current = child

        child.scale.y = 0

        child.visible = false

      }

      // ======================================
      // BURETTE LIQUID
      // ======================================

      if (
        child.isMesh &&
        childName.includes("liquid")
      ) {

        liquidRef.current = child

      }

    })

    setIsBuretteReady(
      Boolean(
        pourRef.current &&
        liquidRef.current &&
        liquidRef.current.scale.y > 0
      )
    )

  }, [
    mainBuiretteRef,
  ])

  // ==========================================
  // SHARED START POURING FUNCTION
  // ==========================================

  const startPouring = useCallback(() => {

    const liquid = liquidRef.current

    const pour = pourRef.current

    if (!liquid || !pour) return false

    if (liquid.scale.y <= 0) return false

    if (isScrollingRef.current) return false

    if (isPourFinishedRef.current) return false

    isScrollingRef.current = true

    setIsPouring(true)

    console.log("Burette pouring started")

    return true

  }, [])

  // ==========================================
  // DESKTOP SCROLL CONTROL
  // ==========================================

  useEffect(() => {

    if (isTouchDevice) return

    const handleWheel = (event) => {

      if (event.deltaY <= 0) return

      startPouring()

    }

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: true,
      }
    )

    return () => {

      window.removeEventListener(
        "wheel",
        handleWheel
      )

    }

  }, [
    isTouchDevice,
    startPouring,
  ])

  // ==========================================
  // SHOW MOBILE POUR BUTTON
  // ==========================================

  useEffect(() => {

    if (
      !isTouchDevice ||
      !isBuretteReady
    ) {
      return
    }

    if (
      isScrollingRef.current ||
      isPourFinishedRef.current
    ) {
      return
    }

    setMobilePour(false)

    setShowMobilePourButton(true)

    return () => {

      setShowMobilePourButton(false)

      setMobilePour(false)

    }

  }, [
    isTouchDevice,
    isBuretteReady,
    setMobilePour,
    setShowMobilePourButton,
  ])

  // ==========================================
  // MOBILE POUR BUTTON CLICK
  // ==========================================

  useEffect(() => {

    if (
      !isTouchDevice ||
      !mobilePour ||
      !isBuretteReady
    ) {
      return
    }

    const didStartPouring =
      startPouring()

    if (
      didStartPouring ||
      isScrollingRef.current ||
      isPourFinishedRef.current
    ) {

      setShowMobilePourButton(false)

    }

    setMobilePour(false)

  }, [
    isTouchDevice,
    mobilePour,
    isBuretteReady,
    startPouring,
    setMobilePour,
    setShowMobilePourButton,
  ])

  // ==========================================
  // BURETTE POURING ANIMATION
  // ==========================================

  useFrame((_, delta) => {

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

      pour.scale.y = 0

      isScrollingRef.current = false

      isPourFinishedRef.current = true

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
        pourScaleY,
        smoothSpeed,
        delta
      )

    // ========================================
    // LOWER BURETTE LIQUID
    // ========================================

    liquid.scale.y =
      Math.max(
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

      pour.scale.y = 0

      isScrollingRef.current = false

      isPourFinishedRef.current = true

      setIsPouring(false)

      console.log("Burette pouring finished")

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

      if (selectedLesson === 11.1) {

        setIsEndpoint(true)

        console.log(
          "Rough titration endpoint reached"
        )

      }

    }

  })

  return (
    <>
      {selectedLesson === 11.1 && (

        <HCLTitrationReaction

          conicalFlaskRef={
            conicalBeakerRef
          }

          isPouring={
            isPouring
          }

          isEndpoint={
            isEndpoint
          }

          localPinkColor="#f4a6c1"

          localPinkOpacity={1}

          localPinkFadeSpeed={0.6}

          endpointColor="#f7c1d6"

          endpointOpacity={0.28}

          liquidRiseSpeed={0.03}

          maxLiquidScaleY={0.5}

        />

      )}
    </>
  )
}

export default PourFromBurette