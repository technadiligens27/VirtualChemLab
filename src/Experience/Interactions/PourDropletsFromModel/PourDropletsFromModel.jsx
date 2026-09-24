import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PourDropletsFromModel = ({
  modelRef,

  fallDistance = 0.8,
  fallTime = 0.7,
  gap = 0.3,

  fallAxis = "x",

  // Seconds before first drop starts
  startDelay = 3,

  loopTimes = 10,

  // Reduce source model liquid
  reduceModelLiquid = false,

  // How much Y scale should be reduced
  reduceModelLiquidAmount = 0,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const dropletsRef =
    useRef([])

  const elapsedTimeRef =
    useRef(0)

  const hasAdvancedRef =
    useRef(false)

  const liquidRef =
    useRef(null)

  const originalLiquidScaleYRef =
    useRef(null)


  // =========================================
  // INITIALIZE
  // =========================================

  useEffect(() => {
    const model =
      modelRef?.current

    if (!model) return

    const droplets = []

    liquidRef.current = null
    originalLiquidScaleYRef.current = null


    model.traverse((child) => {
      const name =
        child.name?.toLowerCase() ||
        ""


      // =========================================
      // FIND DROPLETS
      // =========================================

      if (
        name.includes("droplet")
      ) {
        droplets.push({
          object: child,

          startPosition:
            child.position.clone(),
        })

        child.visible = true
      }


      // =========================================
      // FIND LIQUID
      // =========================================

      if (
        child.isMesh &&
        name.includes("liquid")
      ) {
        liquidRef.current =
          child

        originalLiquidScaleYRef.current =
          child.scale.y
      }
    })


    dropletsRef.current =
      droplets

    elapsedTimeRef.current =
      0

    hasAdvancedRef.current =
      false


    // =========================================
    // CLEANUP
    // =========================================

    return () => {
      droplets.forEach(
        (droplet) => {
          droplet.object.position.copy(
            droplet.startPosition
          )
        }
      )


      // Restore liquid scale
      if (
        liquidRef.current &&
        originalLiquidScaleYRef.current !==
          null
      ) {
        liquidRef.current.scale.y =
          originalLiquidScaleYRef.current

        liquidRef.current.updateMatrixWorld(
          true
        )
      }

      liquidRef.current = null

      originalLiquidScaleYRef.current =
        null
    }
  }, [
    modelRef,
  ])


  // =========================================
  // ANIMATION
  // =========================================

  useFrame((_, delta) => {
    const droplets =
      dropletsRef.current

    if (!droplets.length) return


    elapsedTimeRef.current +=
      delta


    // =========================================
    // START DELAY
    // =========================================

    if (
      elapsedTimeRef.current <
      startDelay
    ) {
      return
    }


    const animationTime =
      elapsedTimeRef.current -
      startDelay


    const safeFallTime =
      Math.max(
        fallTime,
        0.001
      )


    const safeGap =
      Math.max(
        gap,
        0
      )


    const fullCycleTime =
      safeFallTime +
      safeGap


    const hasLoopLimit =
      Number.isFinite(
        loopTimes
      )


    const totalLoops =
      hasLoopLimit
        ? Math.max(
            1,
            Math.floor(
              loopTimes
            )
          )
        : Infinity


    const totalLoopTime =
      hasLoopLimit
        ? totalLoops *
          fullCycleTime
        : Infinity


    const hasFinished =
      animationTime >=
      totalLoopTime


    // =========================================
    // CURRENT DROPLET CYCLE
    // =========================================

    const cycleTime =
      hasFinished
        ? safeFallTime
        : animationTime %
          fullCycleTime


    const isFalling =
      cycleTime <
      safeFallTime


    const fallProgress =
      isFalling
        ? cycleTime /
          safeFallTime
        : 1


    // =========================================
    // FALL AXIS
    // =========================================

    const axis =
      [
        "x",
        "y",
        "z",
      ].includes(
        fallAxis.toLowerCase()
      )
        ? fallAxis.toLowerCase()
        : "y"


    // =========================================
    // MOVE DROPLETS
    // =========================================

    droplets.forEach(
      ({
        object,
        startPosition,
      }) => {
        object.position.copy(
          startPosition
        )

        object.position[
          axis
        ] -=
          fallDistance *
          fallProgress

        object.visible = true

        object.updateMatrixWorld(
          true
        )
      }
    )


    // =========================================
    // REDUCE SOURCE LIQUID
    // =========================================

    // =========================================
    // REDUCE SOURCE LIQUID
    // =========================================

    if (
      reduceModelLiquid &&
      liquidRef.current &&
      originalLiquidScaleYRef.current !== null
    ) {
      let overallProgress = 0

      if (hasLoopLimit) {
        overallProgress =
          Math.min(
            animationTime / totalLoopTime,
            1
          )
      }

      const originalScaleY =
        originalLiquidScaleYRef.current

      const targetScaleY =
        reduceModelLiquidAmount

      const newScaleY =
        originalScaleY +
        (
          targetScaleY -
          originalScaleY
        ) *
        overallProgress

      liquidRef.current.scale.y =
        newScaleY

      liquidRef.current.updateMatrixWorld(
        true
      )
    }


    // =========================================
    // LESSON STEP
    // =========================================

    if (hasFinished &&!hasAdvancedRef.current &&selectedLesson === 14.3 && lessonStep === 109) {
      hasAdvancedRef.current = true
      setLessonStep(110)
    }
    if (hasFinished &&!hasAdvancedRef.current &&selectedLesson === 14.4 && lessonStep === 137) {
      hasAdvancedRef.current = true
      setLessonStep(138)
    }
    if (hasFinished &&!hasAdvancedRef.current &&selectedLesson === 14.4 && lessonStep === 151) {
      hasAdvancedRef.current = true
      setLessonStep(152)
    }

  })


  return null
}

export default PourDropletsFromModel