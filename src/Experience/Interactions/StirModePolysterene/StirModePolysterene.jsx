import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const StirModePolysterene = ({
  stirSpeed = 4,
}) => {
  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const {
    setShowBubbles,
  } = useContext(
    InteractionContext
  )

  // ==========================================
  // REFS
  // ==========================================

  const isStirringRef =
    useRef(false)

  const angleRef =
    useRef(0)

  const stopTimerRef =
    useRef(null)

  const hasCompletedRotationRef =
    useRef(false)

  // ==========================================
  // LESSON STEP
  // ==========================================

  useEffect(() => {
    if (
      selectedLesson === 8 &&
      lessonStep === 33
    ) {
      setLessonStep(34)
    }
  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])

  // ==========================================
  // SCROLL / STIR DETECTION
  // ==========================================

  useEffect(() => {
    angleRef.current = 0

    hasCompletedRotationRef.current =
      false

    const handleWheel = (event) => {
      if (
        event.deltaY <= 0
      ) {
        return
      }

      isStirringRef.current =
        true

      clearTimeout(
        stopTimerRef.current
      )

      stopTimerRef.current =
        setTimeout(() => {
          isStirringRef.current =
            false
        }, 150)
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

      clearTimeout(
        stopTimerRef.current
      )

      isStirringRef.current =
        false

      angleRef.current = 0

      hasCompletedRotationRef.current =
        false
    }
  }, [])

  // ==========================================
  // STIR PROGRESS
  // ==========================================

  useFrame((_, delta) => {
    if (
      !isStirringRef.current
    ) {
      return
    }

    angleRef.current +=
      stirSpeed *
      delta

    const oneFullRotation =
      Math.PI * 2

    // ========================================
    // STIRRING COMPLETE
    // ========================================

    if (
      angleRef.current >=
        oneFullRotation &&
      !hasCompletedRotationRef.current
    ) {
      hasCompletedRotationRef.current =
        true

      setShowBubbles(true)

      console.log(
        "✅ Stirring complete - bubbles shown"
      )
    }
  })

  return null
}

export default StirModePolysterene