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

  const foundStirPointRef = useRef(false)

  const targetAngleRef = useRef(0)
  const currentAngleRef = useRef(0)

  const scrollStopTimerRef = useRef(null)

  const originalBeakerPositionRef =
    useRef(null)

  const originalSpoonPositionRef =
    useRef(null)

  const originalSpoonRotationRef =
    useRef(null)

  /*
   * Store the reset version that existed
   * when this StirMode session started.
   */
  const stirStartResetVersionRef =
    useRef(0)

  const radius = 0.2
  const heightOffset = 0.5

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

  /*
   * Prepare objects for Stir Mode.
   */
  useEffect(() => {
    if (
      !beakerRef?.current ||
      !spoonRef?.current
    ) {
      return
    }

    const beaker = beakerRef.current
    const spoon = spoonRef.current

    /*
     * Save which reset version this
     * Stir Mode session belongs to.
     */
    stirStartResetVersionRef.current =
      labResetVersionRef.current

    targetAngleRef.current = 0
    currentAngleRef.current = 0
    foundStirPointRef.current = false

    /*
     * Save the positions before entering
     * Stir Mode.
     */
    originalBeakerPositionRef.current =
      beaker.position.clone()

    originalSpoonPositionRef.current =
      spoon.position.clone()

    originalSpoonRotationRef.current =
      spoon.rotation.clone()

    /*
     * Move the beaker to the stirring area.
     */
    if (hand === "left") {
      beaker.position.x -= 2.5
    }

    if (hand === "right") {
      beaker.position.x += 4
    }

    beaker.updateMatrixWorld(true)

    /*
     * Find the hidden stir-point object.
     */
    beaker.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (childName.includes("stir")) {
        child.visible = true
        child.updateMatrixWorld(true)

        child.getWorldPosition(
          centerWorldRef.current
        )

        foundStirPointRef.current = true
      }
    })

    /*
     * Cleanup when StirMode unmounts.
     */
    return () => {
      setIsStirring(false)

      foundStirPointRef.current = false
      targetAngleRef.current = 0
      currentAngleRef.current = 0

      if (scrollStopTimerRef.current) {
        clearTimeout(
          scrollStopTimerRef.current
        )

        scrollStopTimerRef.current = null
      }

      /*
       * Check whether the entire lab was reset.
       */
      const wasFullLabReset =
        labResetVersionRef.current !==
        stirStartResetVersionRef.current

      /*
       * Always hide the helper stir point.
       */
      beaker.traverse((child) => {
        const childName =
          child.name?.toLowerCase() || ""

        if (childName.includes("stir")) {
          child.visible = false
        }
      })

      /*
       * A full reset is happening.
       *
       * Do not restore the pre-stir positions,
       * because resetModel() has already restored
       * the true original lab positions.
       */
      if (wasFullLabReset) {
        originalBeakerPositionRef.current = null
        originalSpoonPositionRef.current = null
        originalSpoonRotationRef.current = null

        return
      }

      /*
       * Normal Exit Stir Mode:
       * restore the positions from before
       * Stir Mode started.
       */
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

      originalBeakerPositionRef.current = null
      originalSpoonPositionRef.current = null
      originalSpoonRotationRef.current = null
    }
  }, [
    beakerRef,
    spoonRef,
    hand,
    setIsStirring,
    labResetVersionRef,
  ])

  /*
   * Mouse-wheel stirring.
   */
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

      if (scrollStopTimerRef.current) {
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
      { passive: false }
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )

      if (scrollStopTimerRef.current) {
        clearTimeout(
          scrollStopTimerRef.current
        )

        scrollStopTimerRef.current = null
      }
    }
  }, [
    isStirMode,
    setIsStirring,
    labResetVersionRef,
  ])

  /*
   * Move the spoon every frame.
   */
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

    const spoon = spoonRef.current

    currentAngleRef.current =
      THREE.MathUtils.lerp(
        currentAngleRef.current,
        targetAngleRef.current,
        1 - Math.exp(-8 * delta)
      )

    const x =
      Math.cos(currentAngleRef.current) *
      radius

    const z =
      Math.sin(currentAngleRef.current) *
      radius

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

    spoon.lookAt(centerWorldRef.current)

    spoon.rotateX(-1.4285)
    spoon.rotateY(-5.3011)
    spoon.rotateZ(0.0213)
  })

  const labWasReset =
    labResetVersionRef.current !==
    stirStartResetVersionRef.current

  return (
    <>
      {isStirMode &&
        isStirring &&
        !labWasReset && (
          <StirReaction
            hand={hand}
            spoonRef={spoonRef}
            beakerRef={beakerRef}
          />
        )}
    </>
  )
}

export default StirMode