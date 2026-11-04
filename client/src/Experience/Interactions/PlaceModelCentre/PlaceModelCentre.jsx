import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"

import * as THREE from "three"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

const PlaceModelCentre = ({
  modelRef,

  modelXOffset = 2,
  modelYOffset = 2.5,
  modelZOffset = 2,

  modelXScale = 1.3,
  modelYScale = 1,
  modelZScale = 1.3,

  modelXRotation = 0,
  modelYRotation = 0,
  modelZRotation = 0,

  hand,
}) => {
  const {
    balancePositionRef,
  } = useContext(ModelContext)

  const {
    setSelectedRightHand,
    setSelectedLeftHand,
  } = useContext(InteractionContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const originalTransformRef = useRef(null)

  const latestLessonRef =
    useRef(selectedLesson)

  const latestLessonStepRef =
    useRef(lessonStep)

  latestLessonRef.current =
    selectedLesson

  latestLessonStepRef.current =
    lessonStep

  // =============================================
  // LESSON STEPS
  // =============================================

  useEffect(() => {
    if (
      selectedLesson === 15 &&
      lessonStep === 3
    ) {
      setLessonStep(4)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 14.1 &&
      lessonStep === 42
    ) {
      setLessonStep(43)
    }

    if (
      selectedLesson === 14.1 &&
      lessonStep === 60
    ) {
      setLessonStep(61)
    }

    if (
      selectedLesson === 14.2 &&
      lessonStep === 83
    ) {
      setLessonStep(84)

      setSelectedLeftHand(null)
    }

    if (
      selectedLesson === 14.3 &&
      lessonStep === 98
    ) {
      setLessonStep(99)

      setSelectedLeftHand(null)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
    setSelectedLeftHand,
  ])

  // =============================================
  // LESSON 13
  // =============================================

  useEffect(() => {
    if (
      selectedLesson === 13 &&
      lessonStep === 12
    ) {
      setLessonStep(13)

      setSelectedRightHand(null)
      setSelectedLeftHand(null)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
    setSelectedRightHand,
    setSelectedLeftHand,
  ])

  // =============================================
  // PLACE MODEL AT CENTRE
  // =============================================

  useLayoutEffect(() => {
    const model = modelRef?.current

    const balancePosition =
      balancePositionRef?.current

    if (!model || !balancePosition) {
      return
    }

    const shouldSkipOriginalSave =
      selectedLesson === 14.3 &&
      (
        model.name === "main-Conical-Flask-02" ||
        model.name === "separating-funnel"
      )

    // Save current model state before moving it.
    if (!shouldSkipOriginalSave) {
      originalTransformRef.current = {
        parent: model.parent,
        position: model.position.clone(),
        quaternion: model.quaternion.clone(),
        scale: model.scale.clone(),
      }
    } else {
      originalTransformRef.current = null
    }

    const targetWorldPosition =
      balancePosition.getWorldPosition(
        new THREE.Vector3()
      )

    const targetParent =
      balancePosition.parent

    // Move model under the centre marker's parent.
    if (targetParent) {
      targetParent.attach(model)
    }

    let targetLocalPosition =
      targetWorldPosition.clone()

    if (targetParent) {
      targetLocalPosition =
        targetParent.worldToLocal(
          targetWorldPosition.clone()
        )
    }

    // Position
    model.position.set(
      targetLocalPosition.x + modelXOffset,
      targetLocalPosition.y + modelYOffset,
      targetLocalPosition.z + modelZOffset
    )

    // Rotation
    model.rotation.set(
      modelXRotation,
      modelYRotation,
      modelZRotation
    )

    // Scale
    model.scale.set(
      modelXScale,
      modelYScale,
      modelZScale
    )

    model.updateMatrixWorld(true)

    return () => {
      // Keep the current transform for this special case.
      if (
        latestLessonRef.current === 14.3 &&
        latestLessonStepRef.current === 98
      ) {
        return
      }

      const original =
        originalTransformRef.current

      if (!original) {
        return
      }

      // Restore original parent.
      if (original.parent) {
        original.parent.add(model)
      }

      // Restore original transform.
      model.position.copy(
        original.position
      )

      model.quaternion.copy(
        original.quaternion
      )

      model.scale.copy(
        original.scale
      )

      model.updateMatrixWorld(true)

      originalTransformRef.current = null
    }
  }, [
    modelRef,
    balancePositionRef,

    modelXOffset,
    modelYOffset,
    modelZOffset,

    modelXScale,
    modelYScale,
    modelZScale,

    modelXRotation,
    modelYRotation,
    modelZRotation,

    selectedLesson,
  ])

  return null
}

export default PlaceModelCentre