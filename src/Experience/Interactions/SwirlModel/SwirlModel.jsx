import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const SwirlModel = ({
  modelRef,

  swirlSpeed = 8,
  swirlAmount = 0.15,

  stopDelay = 0.5,
  returnSpeed = 5,

  useTargetSwirls = false,
  targetSwirls = 3,

  // ==========================================
  // LIQUID SWIRL
  // ==========================================

  liquidSwirlAmount = 0.08,
  liquidSwirlSpeed = 1.4,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const isSwirlingRef =
    useRef(false)

  const swirlTimeRef =
    useRef(0)

  const timeSinceLastScrollRef =
    useRef(0)

  const completedSwirlsRef =
    useRef(0)

  const hasFinishedRef =
    useRef(false)

  // Target reached,
  // now waiting to return home.
  const isReturningAfterFinishRef =
    useRef(false)

  // Make sure lesson step only changes once.
  const lessonAdvancedRef =
    useRef(false)

  const originalRotationRef =
    useRef({
      x: 0,
      y: 0,
      z: 0,
    })

  // ==========================================
  // LIQUID REFS
  // ==========================================

  const liquidObjectsRef =
    useRef([])

  const originalLiquidRotationsRef =
    useRef([])

  // ==========================================
  // STORE ORIGINAL ROTATION
  // ==========================================

  useEffect(() => {
    if (!modelRef?.current) {
      return
    }

    const model =
      modelRef.current

    originalRotationRef.current = {
      x: model.rotation.x,
      y: model.rotation.y,
      z: model.rotation.z,
    }

    // ========================================
    // FIND LIQUID CHILDREN
    // ========================================

    liquidObjectsRef.current = []

    originalLiquidRotationsRef.current = []

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        childName.includes("liquid")
      ) {
        liquidObjectsRef.current.push(
          child
        )

        originalLiquidRotationsRef.current.push({
          x: child.rotation.x,
          y: child.rotation.y,
          z: child.rotation.z,
        })
      }
    })

    swirlTimeRef.current = 0

    completedSwirlsRef.current = 0

    hasFinishedRef.current = false

    isReturningAfterFinishRef.current =
      false

    lessonAdvancedRef.current =
      false

    isSwirlingRef.current =
      false

    timeSinceLastScrollRef.current =
      0
  }, [
    modelRef,
    useTargetSwirls,
    targetSwirls,
  ])

  // ==========================================
  // WHEEL
  // ==========================================

  useEffect(() => {
    const handleWheel = () => {
      if (!modelRef?.current) {
        return
      }

      // Once target is reached,
      // don't allow more swirling.
      if (
        useTargetSwirls &&
        hasFinishedRef.current
      ) {
        return
      }

      isSwirlingRef.current =
        true

      timeSinceLastScrollRef.current =
        0
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
    modelRef,
    useTargetSwirls,
  ])

  // ==========================================
  // ANIMATION
  // ==========================================

  useFrame((_, delta) => {
    if (!modelRef?.current) {
      return
    }

    const model =
      modelRef.current

    // ========================================
    // SWIRLING
    // ========================================

    if (
      isSwirlingRef.current &&
      !hasFinishedRef.current
    ) {
      swirlTimeRef.current +=
        delta * swirlSpeed

      timeSinceLastScrollRef.current +=
        delta

      const angle =
        swirlTimeRef.current

      model.rotation.x =
        originalRotationRef.current.x +
        Math.sin(angle) *
          swirlAmount

      model.rotation.z =
        originalRotationRef.current.z +
        Math.cos(angle) *
          swirlAmount

      // ======================================
      // LIQUID SWIRLING
      // ======================================

      liquidObjectsRef.current.forEach(
        (liquid, index) => {
          const originalRotation =
            originalLiquidRotationsRef.current[
              index
            ]

          if (
            !liquid ||
            !originalRotation
          ) {
            return
          }

          const liquidAngle =
            angle *
            liquidSwirlSpeed

          liquid.rotation.x =
            originalRotation.x +
            Math.sin(
              liquidAngle
            ) *
              liquidSwirlAmount

          liquid.rotation.z =
            originalRotation.z +
            Math.cos(
              liquidAngle
            ) *
              liquidSwirlAmount
        }
      )

      // ======================================
      // TARGET SWIRL MODE
      // ======================================

      if (useTargetSwirls) {
        const completedSwirls =
          Math.floor(
            swirlTimeRef.current /
              (Math.PI * 2)
          )

        if (
          completedSwirls >
          completedSwirlsRef.current
        ) {
          completedSwirlsRef.current =
            completedSwirls

          console.log(
            "Swirl completed:",
            completedSwirlsRef.current
          )
        }

        // ====================================
        // TARGET REACHED
        // ====================================

        if (
          completedSwirlsRef.current >=
          targetSwirls
        ) {
          hasFinishedRef.current =
            true

          isSwirlingRef.current =
            false

          isReturningAfterFinishRef.current =
            true

          console.log(
            `✅ ${targetSwirls} swirls completed`
          )

          console.log(
            "Returning to original rotation..."
          )

          return
        }
      }

      // ======================================
      // USER STOPPED SCROLLING
      // ======================================

      if (
        timeSinceLastScrollRef.current >=
        stopDelay
      ) {
        isSwirlingRef.current =
          false
      }

      return
    }

    // ========================================
    // RETURN MODEL TO ORIGINAL ROTATION
    // ========================================

    const returnFactor =
      Math.min(
        returnSpeed * delta,
        1
      )

    model.rotation.x +=
      (
        originalRotationRef.current.x -
        model.rotation.x
      ) *
      returnFactor

    model.rotation.y +=
      (
        originalRotationRef.current.y -
        model.rotation.y
      ) *
      returnFactor

    model.rotation.z +=
      (
        originalRotationRef.current.z -
        model.rotation.z
      ) *
      returnFactor

    // ========================================
    // RETURN LIQUID TO ORIGINAL ROTATION
    // ========================================

    liquidObjectsRef.current.forEach(
      (liquid, index) => {
        const originalRotation =
          originalLiquidRotationsRef.current[
            index
          ]

        if (
          !liquid ||
          !originalRotation
        ) {
          return
        }

        liquid.rotation.x +=
          (
            originalRotation.x -
            liquid.rotation.x
          ) *
          returnFactor

        liquid.rotation.y +=
          (
            originalRotation.y -
            liquid.rotation.y
          ) *
          returnFactor

        liquid.rotation.z +=
          (
            originalRotation.z -
            liquid.rotation.z
          ) *
          returnFactor
      }
    )

    // ========================================
    // CHECK DISTANCE FROM ORIGINAL ROTATION
    // ========================================

    const xDifference =
      Math.abs(
        model.rotation.x -
          originalRotationRef.current.x
      )

    const yDifference =
      Math.abs(
        model.rotation.y -
          originalRotationRef.current.y
      )

    const zDifference =
      Math.abs(
        model.rotation.z -
          originalRotationRef.current.z
      )

    // ========================================
    // FULLY RETURNED
    // ========================================

    if (
      xDifference < 0.001 &&
      yDifference < 0.001 &&
      zDifference < 0.001
    ) {
      // Snap model exactly back.
      model.rotation.set(
        originalRotationRef.current.x,
        originalRotationRef.current.y,
        originalRotationRef.current.z
      )

      // ======================================
      // SNAP LIQUID EXACTLY BACK
      // ======================================

      liquidObjectsRef.current.forEach(
        (liquid, index) => {
          const originalRotation =
            originalLiquidRotationsRef.current[
              index
            ]

          if (
            !liquid ||
            !originalRotation
          ) {
            return
          }

          liquid.rotation.set(
            originalRotation.x,
            originalRotation.y,
            originalRotation.z
          )
        }
      )

      // ======================================
      // TARGET WAS COMPLETED
      // ======================================

      if (
        useTargetSwirls &&
        isReturningAfterFinishRef.current
      ) {
        isReturningAfterFinishRef.current =
          false

        console.log(
          "✅ Returned to original rotation"
        )

        // ====================================
        // LESSON STEP
        // ====================================

        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 12.1 &&
          lessonStep === 32
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(33)
        }

        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 12.1 &&
          lessonStep === 38
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(39)
        }
        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14 &&
          lessonStep === 17
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(18)
        }
        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14 &&
          lessonStep === 15
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(16)
        }

      }
    }
  })

  return null
}

export default SwirlModel