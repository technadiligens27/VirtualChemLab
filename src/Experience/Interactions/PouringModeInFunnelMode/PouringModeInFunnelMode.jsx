import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import * as THREE from "three"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import PourFromVolumetricFlask from "../Pouring/PourFromVolumetricFlask/PourFromVolumetricFlask"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

const PouringModeInFunnelMode = ({
  modelRef,
  pouringModelRef,

  modelScale = 1,
  modelYOffset = -0.5,

  pouringModelScale = 1,
  pouringModelXOffset = 0,
  pouringModelYOffset = 0,

  maxRotation = Math.PI / 4,
  rotationSpeed = 8.5,
  scrollSensitivity = 0.05,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const {selectedLeftHand,selectedRightHand} = useContext(InteractionContext);
  const {mainBuiretteRef,volumetricRef} = useContext(ModelContext)

  const [
    isPouring,
    setIsPouring,
  ] = useState(false)

  const mouthRef =
    useRef(null)

  const targetRotationRef =
    useRef(0)

  const originalModelPositionRef =
    useRef(null)

  const originalModelRotationRef =
    useRef(null)

  const originalModelScaleRef =
    useRef(null)

  const originalPouringPositionRef =
    useRef(null)

  const originalPouringRotationRef =
    useRef(null)

  const originalPouringScaleRef =
    useRef(null)

  const targetWorldPositionRef =
    useRef(
      new THREE.Vector3()
    )

  const targetLocalPositionRef =
    useRef(
      new THREE.Vector3()
    )

  // =====================================================
  // LESSON STEP
  // =====================================================

  useEffect(() => {
    if (
      selectedLesson === 12.2 &&
      lessonStep === 56
    ) {
      setLessonStep(57)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  // =====================================================
  // SETUP
  // =====================================================

  useEffect(() => {
    if (!modelRef?.current) return
    if (!pouringModelRef?.current) return

    const model =
      modelRef.current

    const pouringModel =
      pouringModelRef.current

    // Store original model transforms
    originalModelPositionRef.current =
      model.position.clone()

    originalModelRotationRef.current =
      model.rotation.clone()

    originalModelScaleRef.current =
      model.scale.clone()

    // Store original pouring model transforms
    originalPouringPositionRef.current =
      pouringModel.position.clone()

    originalPouringRotationRef.current =
      pouringModel.rotation.clone()

    originalPouringScaleRef.current =
      pouringModel.scale.clone()

    // Find mouth
    mouthRef.current = null

    model.position.x = 0

    model.position.y +=
      modelYOffset

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        childName.includes("mouth")
      ) {
        mouthRef.current =
          child
      }
    })

    if (!mouthRef.current) {
      console.log(
        "Mouth child not found"
      )

      return
    }

    // Apply scales
    model.scale.setScalar(
      modelScale
    )

    pouringModel.scale.setScalar(
      pouringModelScale
    )

    targetRotationRef.current =
      pouringModel.rotation.z

    // =====================================================
    // RESTORE ON UNMOUNT
    // =====================================================

    return () => {
      if (modelRef?.current) {
        if (
          originalModelPositionRef.current
        ) {
          modelRef.current.position.copy(
            originalModelPositionRef.current
          )
        }

        if (
          originalModelRotationRef.current
        ) {
          modelRef.current.rotation.copy(
            originalModelRotationRef.current
          )
        }

        if (
          originalModelScaleRef.current
        ) {
          modelRef.current.scale.copy(
            originalModelScaleRef.current
          )
        }

        modelRef.current.updateMatrixWorld(
          true
        )
      }

      if (pouringModelRef?.current) {
        if (
          originalPouringPositionRef.current
        ) {
          pouringModelRef.current.position.copy(
            originalPouringPositionRef.current
          )
        }

        if (
          originalPouringRotationRef.current
        ) {
          pouringModelRef.current.rotation.copy(
            originalPouringRotationRef.current
          )
        }

        if (
          originalPouringScaleRef.current
        ) {
          pouringModelRef.current.scale.copy(
            originalPouringScaleRef.current
          )
        }

        pouringModelRef.current.updateMatrixWorld(
          true
        )
      }

      setIsPouring(false)
    }
  }, [
    modelRef,
    pouringModelRef,
    modelScale,
    modelYOffset,
    pouringModelScale,
  ])

  // =====================================================
  // SCROLL
  // DOWN = POUR
  // UP = RETURN UPRIGHT
  // =====================================================

  useEffect(() => {
    const handleWheel = (event) => {
      if (!pouringModelRef?.current) {
        return
      }

      event.preventDefault()

      // Scroll down
      if (event.deltaY > 0) {
        setIsPouring(true)

        targetRotationRef.current +=
          Math.abs(
            event.deltaY
          ) *
          scrollSensitivity
      }

      // Scroll up
      if (event.deltaY < 0) {
        targetRotationRef.current -=
          Math.abs(
            event.deltaY
          ) *
          scrollSensitivity
      }

      targetRotationRef.current =
        THREE.MathUtils.clamp(
          targetRotationRef.current,
          0,
          maxRotation
        )

      // Fully upright again
      if (
        targetRotationRef.current <= 0
      ) {
        setIsPouring(false)
      }
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
    }
  }, [
    maxRotation,
    scrollSensitivity,
    pouringModelRef,
  ])

  // =====================================================
  // POSITION + SMOOTH ROTATION
  // =====================================================

  useFrame((_, delta) => {
    if (!mouthRef.current) return
    if (!pouringModelRef?.current) return

    const pouringModel =
      pouringModelRef.current

    // Get mouth world position
    mouthRef.current.getWorldPosition(
      targetWorldPositionRef.current
    )

    targetLocalPositionRef.current.copy(
      targetWorldPositionRef.current
    )

    // Convert to pouring model parent's local position
    if (pouringModel.parent) {
      pouringModel.parent.worldToLocal(
        targetLocalPositionRef.current
      )
    }

    // Apply offsets
    targetLocalPositionRef.current.x +=
      pouringModelXOffset

    targetLocalPositionRef.current.y +=
      pouringModelYOffset

    // Keep pouring object beside mouth
    pouringModel.position.copy(
      targetLocalPositionRef.current
    )

    // Smooth rotation
    pouringModel.rotation.z =
      THREE.MathUtils.damp(
        pouringModel.rotation.z,
        targetRotationRef.current,
        rotationSpeed,
        delta
      )
  })

  return (
    <>
      {isPouring && selectedLeftHand?.name==="main-buirette" && selectedRightHand?.name ==="volumetric-flask" &&
        <PourFromVolumetricFlask modelRef={volumetricRef} otherModelRef={mainBuiretteRef}/>
      }
    </>
  )
}

export default PouringModeInFunnelMode