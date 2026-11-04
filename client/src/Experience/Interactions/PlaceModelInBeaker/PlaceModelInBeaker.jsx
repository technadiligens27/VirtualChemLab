import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"


const PlaceModelInBeaker = ({
  modelRef,

  beakerRef = null,

  xOffset = 0,
  yOffset = 0,
  zOffset = 0,

  modelScale = 1,
}) => {
  const {
    normalBeakerRef,
  } = useContext(
    ModelContext
  )

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )


  const originalModelTransformRef =
    useRef(null)

  const originalBeakerTransformRef =
    useRef(null)


  // =========================================
  // LESSON STEP
  // =========================================

  useEffect(() => {
    if (
      selectedLesson === 14.4 &&
      lessonStep === 143
    ) {
      setLessonStep(144)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])


  // =========================================
  // PLACE MODEL IN BEAKER
  // =========================================

  useEffect(() => {
    const model =
      modelRef?.current


    const targetBeakerRef =
      beakerRef ||
      normalBeakerRef


    const beaker =
      targetBeakerRef?.current


    if (
      !model ||
      !beaker
    ) {
      return
    }


    // =========================================
    // SAVE ORIGINAL MODEL TRANSFORM
    // =========================================

    originalModelTransformRef.current = {
      parent:
        model.parent,

      position:
        model.position.clone(),

      rotation:
        model.rotation.clone(),

      scale:
        model.scale.clone(),
    }


    // =========================================
    // SAVE ORIGINAL BEAKER TRANSFORM
    // =========================================

    originalBeakerTransformRef.current = {
      parent:
        beaker.parent,

      position:
        beaker.position.clone(),

      rotation:
        beaker.rotation.clone(),

      scale:
        beaker.scale.clone(),
    }


    // =========================================
    // PLACE MODEL AT BEAKER POSITION
    // =========================================

    model.position.set(
      beaker.position.x +
        xOffset,

      beaker.position.y +
        yOffset,

      beaker.position.z +
        zOffset
    )


    // =========================================
    // MODEL SCALE
    // =========================================

    model.scale.set(
      modelScale,
      modelScale,
      modelScale
    )


    model.updateMatrixWorld(
      true
    )


    // =========================================
    // CLEANUP
    // =========================================

    return () => {
      const originalModel =
        originalModelTransformRef.current

      const originalBeaker =
        originalBeakerTransformRef.current


      // =========================================
      // RESTORE MODEL
      // =========================================

      if (
        originalModel &&
        modelRef?.current
      ) {
        const model =
          modelRef.current


        if (
          originalModel.parent
        ) {
          originalModel.parent.add(
            model
          )
        }


        model.position.copy(
          originalModel.position
        )

        model.rotation.copy(
          originalModel.rotation
        )

        model.scale.copy(
          originalModel.scale
        )


        model.updateMatrixWorld(
          true
        )
      }


      // =========================================
      // RESTORE BEAKER
      // =========================================

      if (
        originalBeaker &&
        targetBeakerRef?.current
      ) {
        const beaker =
          targetBeakerRef.current


        if (
          originalBeaker.parent
        ) {
          originalBeaker.parent.add(
            beaker
          )
        }


        beaker.position.copy(
          originalBeaker.position
        )

        beaker.rotation.copy(
          originalBeaker.rotation
        )

        beaker.scale.copy(
          originalBeaker.scale
        )


        beaker.updateMatrixWorld(
          true
        )
      }


      // =========================================
      // RESET
      // =========================================

      originalModelTransformRef.current =
        null

      originalBeakerTransformRef.current =
        null
    }
  }, [
    modelRef,
    beakerRef,
    normalBeakerRef,

    xOffset,
    yOffset,
    zOffset,

    modelScale,
  ])


  return null
}

export default PlaceModelInBeaker