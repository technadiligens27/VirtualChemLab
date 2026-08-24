import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import StirReaction from "../StirReaction/StirReaction"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const StirMode = ({
  spoonRef,
  beakerRef,
  hand,
}) => {
  const {
    isStirring,
    setIsStirring,
    isStirMode,
  } = useContext(InteractionContext)

  const {
    lessonStep,
    setLessonStep,
    selectedLesson,
    labResetVersionRef,
  } = useContext(MainGuidelineContext)

  const centerWorldRef = useRef(
    new THREE.Vector3()
  )

  const centerLocalRef = useRef(
    new THREE.Vector3()
  )

  const foundStirPointRef =
    useRef(false)

  const targetAngleRef =
    useRef(0)

  const currentAngleRef =
    useRef(0)

  const scrollStopTimerRef =
    useRef(null)

  const originalBeakerPositionRef =
    useRef(null)

  const originalSpoonPositionRef =
    useRef(null)

  const originalSpoonRotationRef =
    useRef(null)

  const stirStartResetVersionRef =
    useRef(0)

  const radius = 0.2
  const heightOffset = 0.5

  // =========================================================
  // LESSON STEP CHANGES
  // =========================================================

  useEffect(() => {
    if (
      selectedLesson === 1 &&
      lessonStep === 8
    ) {
      setLessonStep(9)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12.1 &&
      lessonStep === 23
    ) {
      setLessonStep(24)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  // =========================================================
  // PREPARE STIR MODE
  // =========================================================

  useEffect(() => {
    if (
      !beakerRef?.current ||
      !spoonRef?.current
    ) {
      return
    }

    const beaker =
      beakerRef.current

    const spoon =
      spoonRef.current

    stirStartResetVersionRef.current =
      labResetVersionRef.current

    targetAngleRef.current = 0
    currentAngleRef.current = 0

    foundStirPointRef.current =
      false

    // -------------------------------------------------------
    // SAVE ORIGINAL POSITIONS
    // -------------------------------------------------------

    originalBeakerPositionRef.current =
      beaker.position.clone()

    originalSpoonPositionRef.current =
      spoon.position.clone()

    originalSpoonRotationRef.current =
      spoon.rotation.clone()

    // -------------------------------------------------------
    // MOVE BEAKER
    // -------------------------------------------------------

    if (hand === "left") {
      beaker.position.x -= 2.5
    }

    if (hand === "right") {
      beaker.position.x += 4
    }

    beaker.updateMatrixWorld(true)

    // -------------------------------------------------------
    // FIND STIR POINT
    // -------------------------------------------------------

    beaker.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        childName.includes("stir")
      ) {
        child.visible = true

        child.updateMatrixWorld(
          true
        )

        child.getWorldPosition(
          centerWorldRef.current
        )

        foundStirPointRef.current =
          true
      }
    })

    // =======================================================
    // CLEANUP
    // =======================================================

    return () => {
      setIsStirring(false)

      foundStirPointRef.current =
        false

      targetAngleRef.current = 0
      currentAngleRef.current = 0

      if (
        scrollStopTimerRef.current
      ) {
        clearTimeout(
          scrollStopTimerRef.current
        )

        scrollStopTimerRef.current =
          null
      }

      const wasFullLabReset =
        labResetVersionRef.current !==
        stirStartResetVersionRef.current

      // -----------------------------------------------------
      // HIDE STIR POINT
      // -----------------------------------------------------

      beaker.traverse((child) => {
        const childName =
          child.name?.toLowerCase() || ""

        if (
          childName.includes("stir")
        ) {
          child.visible = false
        }
      })

      // -----------------------------------------------------
      // FULL LAB RESET
      // -----------------------------------------------------

      if (wasFullLabReset) {
        originalBeakerPositionRef.current =
          null

        originalSpoonPositionRef.current =
          null

        originalSpoonRotationRef.current =
          null

        return
      }

      // -----------------------------------------------------
      // NORMAL EXIT
      // -----------------------------------------------------

      if (
        originalBeakerPositionRef.current
      ) {
        beaker.position.copy(
          originalBeakerPositionRef.current
        )
      }

      if (
        originalSpoonPositionRef.current
      ) {
        spoon.position.copy(
          originalSpoonPositionRef.current
        )
      }

      if (
        originalSpoonRotationRef.current
      ) {
        spoon.rotation.copy(
          originalSpoonRotationRef.current
        )
      }

      beaker.updateMatrixWorld(true)
      spoon.updateMatrixWorld(true)

      originalBeakerPositionRef.current =
        null

      originalSpoonPositionRef.current =
        null

      originalSpoonRotationRef.current =
        null
    }
  }, [
    beakerRef,
    spoonRef,
    hand,
    setIsStirring,
    labResetVersionRef,
  ])

  // =========================================================
  // MOUSE WHEEL
  // =========================================================

  useEffect(() => {
    const handleWheel = (event) => {
      const labWasReset =
        labResetVersionRef.current !==
        stirStartResetVersionRef.current

      if (
        !isStirMode ||
        labWasReset ||
        !foundStirPointRef.current
      ) {
        return
      }

      event.preventDefault()

      targetAngleRef.current +=
        event.deltaY * 0.004

      setIsStirring(true)

      if (
        scrollStopTimerRef.current
      ) {
        clearTimeout(
          scrollStopTimerRef.current
        )
      }

      scrollStopTimerRef.current =
        setTimeout(() => {
          setIsStirring(false)
        }, 250)
    }

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )

      if (
        scrollStopTimerRef.current
      ) {
        clearTimeout(
          scrollStopTimerRef.current
        )

        scrollStopTimerRef.current =
          null
      }
    }
  }, [
    isStirMode,
    setIsStirring,
    labResetVersionRef,
  ])

  // =========================================================
  // SPOON MOVEMENT
  // =========================================================

  useFrame((_, delta) => {
    const labWasReset =
      labResetVersionRef.current !==
      stirStartResetVersionRef.current

    if (
      !isStirMode ||
      labWasReset ||
      !spoonRef?.current ||
      !foundStirPointRef.current
    ) {
      return
    }

    const spoon =
      spoonRef.current

    currentAngleRef.current =
      THREE.MathUtils.lerp(
        currentAngleRef.current,
        targetAngleRef.current,
        1 - Math.exp(-8 * delta)
      )

    const x =
      Math.cos(
        currentAngleRef.current
      ) * radius

    const z =
      Math.sin(
        currentAngleRef.current
      ) * radius

    centerLocalRef.current.copy(
      centerWorldRef.current
    )

    if (spoon.parent) {
      spoon.parent.worldToLocal(
        centerLocalRef.current
      )
    }

    spoon.position.set(
      centerLocalRef.current.x + x,
      centerLocalRef.current.y +
        heightOffset,
      centerLocalRef.current.z + z
    )

    spoon.lookAt(
      centerWorldRef.current
    )

    spoon.rotateX(-1.4285)
    spoon.rotateY(-5.3011)
    spoon.rotateZ(0.0213)
  })

  // =========================================================
  // RESET CHECK
  // =========================================================

  const labWasReset =
    labResetVersionRef.current !==
    stirStartResetVersionRef.current

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {isStirMode &&
        !labWasReset && (
          <StirReaction
            modelRef={beakerRef}

            targetColor="#EAFBFF"

            liquidOpacity={0.35}

            duration={2}

            hasPrecipitate={true}

            isActive={isStirring}
          />
        )}
    </>
  )
}

export default StirMode