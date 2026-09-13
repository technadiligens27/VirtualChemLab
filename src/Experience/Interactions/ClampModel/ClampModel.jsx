import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

const ClampModel = ({
  modelRef,

  modelScale = 1,
  clampScale = 1,

  modelXOffset = 0.5,
  modelYOffset = 0,

  clampYOffset = 0,

  hand,
}) => {
  const {
    buretteClampRef,
  } = useContext(ModelContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const {
    setSelectedRightHand,
    setSelectedLeftHand,
  } = useContext(InteractionContext)

  const originalModelTransformRef = useRef(null)
  const originalClampTransformRef = useRef(null)


   useEffect(() => {
    if (
      selectedLesson === 14.1 &&
      lessonStep === 36
    ) {
      setLessonStep(37)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 13 &&
      lessonStep === 4
    ) {
      setLessonStep(5)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  useEffect(() => {
    if (hand === "left") {
      setSelectedLeftHand(null)
    }

    if (hand === "right") {
      setSelectedRightHand(null)
    }
  }, [
    hand,
    setSelectedLeftHand,
    setSelectedRightHand,
  ])

  useLayoutEffect(() => {
    const model = modelRef?.current
    const clamp = buretteClampRef?.current

    if (!model || !clamp) {
      return
    }

    const clampPosition =
      clamp.getObjectByName("clamp-position")

    if (!clampPosition) {
      console.log("❌ clamp-position not found")
      return
    }

    // Save the model's original transform.
    originalModelTransformRef.current = {
      parent: model.parent,
      position: model.position.clone(),
      rotation: model.rotation.clone(),
      scale: model.scale.clone(),
    }

    // Save the clamp's original transform.
    originalClampTransformRef.current = {
      position: clamp.position.clone(),
      scale: clamp.scale.clone(),
    }

    // Scale and vertically reposition the clamp.
    clamp.scale.set(
      clampScale,
      clampScale,
      clampScale
    )

    clamp.position.y =
      originalClampTransformRef.current.position.y +
      clampYOffset

    clamp.updateMatrixWorld(true)

    // Attach the model to clamp-position.
    clampPosition.attach(model)

    model.position.set(
      modelXOffset,
      modelYOffset,
      0
    )

    model.rotation.set(0, 0, 0)

    model.scale.set(
      modelScale,
      modelScale,
      modelScale
    )

    model.updateMatrixWorld(true)

    return () => {
      const originalModel =
        originalModelTransformRef.current

      const originalClamp =
        originalClampTransformRef.current

      // Restore the attached model.
      if (originalModel?.parent) {
        originalModel.parent.add(model)

        model.position.copy(
          originalModel.position
        )

        model.rotation.copy(
          originalModel.rotation
        )

        model.scale.copy(
          originalModel.scale
        )

        model.updateMatrixWorld(true)
      }

      // Restore the clamp.
      if (originalClamp) {
        clamp.position.copy(
          originalClamp.position
        )

        clamp.scale.copy(
          originalClamp.scale
        )

        clamp.updateMatrixWorld(true)
      }
    }
  }, [
    modelRef,
    buretteClampRef,
    modelScale,
    clampScale,
    modelXOffset,
    modelYOffset,
    clampYOffset,
  ])

  return null
}

export default ClampModel