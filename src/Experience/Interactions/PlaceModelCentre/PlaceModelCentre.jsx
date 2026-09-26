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

  hand,
}) => {
  const {
    balancePositionRef,
  } = useContext(
    ModelContext
  )


  const {
    setSelectedRightHand,
    setSelectedLeftHand,
  } = useContext(
    InteractionContext
  )


  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )


  // =============================================
  // ORIGINAL TRANSFORM
  // =============================================

  const originalTransformRef =
    useRef(null)


  // =============================================
  // KEEP LATEST LESSON / STEP
  // =============================================

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

      setSelectedLeftHand(
        null
      )
    }


    if (
      selectedLesson === 14.3 &&
      lessonStep === 98
    ) {
      setLessonStep(99)

      setSelectedLeftHand(
        null
      )
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

      setSelectedRightHand(
        null
      )

      setSelectedLeftHand(
        null
      )
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
    const model =
      modelRef?.current

    const balancePosition =
      balancePositionRef?.current


    if (
      !model ||
      !balancePosition
    ) {
      return
    }


    // =============================================
    // SAVE ORIGINAL TRANSFORM
    // =============================================

    originalTransformRef.current = {
      parent:
        model.parent,

      position:
        model.position.clone(),

      quaternion:
        model.quaternion.clone(),

      scale:
        model.scale.clone(),
    }


    // =============================================
    // TARGET WORLD POSITION
    // =============================================

    const targetWorldPosition =
      balancePosition.getWorldPosition(
        new THREE.Vector3()
      )


    const targetParent =
      balancePosition.parent


    // =============================================
    // ATTACH TO TARGET PARENT
    // =============================================

    if (targetParent) {
      targetParent.attach(
        model
      )
    }


    // =============================================
    // CONVERT WORLD POSITION TO LOCAL
    // =============================================

    let targetLocalPosition =
      targetWorldPosition.clone()


    if (targetParent) {
      targetLocalPosition =
        targetParent.worldToLocal(
          targetWorldPosition.clone()
        )
    }


    // =============================================
    // POSITION
    // =============================================

    model.position.set(
      targetLocalPosition.x +
        modelXOffset,

      targetLocalPosition.y +
        modelYOffset,

      targetLocalPosition.z +
        modelZOffset
    )


    // =============================================
    // SCALE
    // =============================================

    model.scale.set(
      modelXScale,
      modelYScale,
      modelZScale
    )


    model.updateMatrixWorld(
      true
    )


    // =============================================
    // CLEANUP
    // =============================================

    return () => {
      // Do NOT restore model at lesson 14.3 step 97
      if (
        latestLessonRef.current ===
          14.3 &&
        latestLessonStepRef.current ===
          98
      ) {
        return
      }


      const original =
        originalTransformRef.current


      if (
        !model ||
        !original
      ) {
        return
      }


      // =========================================
      // RETURN TO ORIGINAL PARENT
      // =========================================

      if (
        original.parent
      ) {
        original.parent.add(
          model
        )
      }


      // =========================================
      // RESTORE ORIGINAL TRANSFORM
      // =========================================

      model.position.copy(
        original.position
      )

      model.quaternion.copy(
        original.quaternion
      )

      model.scale.copy(
        original.scale
      )


      model.updateMatrixWorld(
        true
      )


      // Liquid visibility is intentionally
      // NOT changed here.


      originalTransformRef.current =
        null
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
  ])


  return null
}

export default PlaceModelCentre