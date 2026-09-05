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
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const PlaceModelCentre = ({
  modelRef,

  modelXOffset = 2,
  modelYOffset = 2.5,
  modelZOffset = 2,

  modelXScale = 1.3,
  modelYScale = 1,
  modelZScale = 1.3,
}) => {
  const {
    balancePositionRef,
  } = useContext(ModelContext)

  const {setSelectedRightHand,setSelectedLeftHand} = useContext(InteractionContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const originalTransformRef =
    useRef(null)

  // =============================================
  // LESSON STEP
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
  ])



  // =============================================
  // PLACE MODEL AT BALANCE POSITION
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
    // SAVE ORIGINAL MODEL STATE
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
    // GET BALANCE POSITION IN WORLD SPACE
    // =============================================

    const targetWorldPosition =
      balancePosition.getWorldPosition(
        new THREE.Vector3()
      )

    // =============================================
    // GET TARGET PARENT
    // =============================================

    const targetParent =
      balancePosition.parent

    // =============================================
    // MOVE MODEL FROM CAMERA TO TARGET PARENT
    // =============================================

    if (
      targetParent
    ) {
      targetParent.attach(
        model
      )
    }

    // =============================================
    // CONVERT TARGET POSITION TO LOCAL POSITION
    // =============================================

    let targetLocalPosition =
      targetWorldPosition.clone()

    if (
      targetParent
    ) {
      targetLocalPosition =
        targetParent.worldToLocal(
          targetWorldPosition.clone()
        )
    }

    // =============================================
    // POSITION MODEL
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
    // SCALE MODEL X / Y / Z
    // =============================================

    model.scale.set(
      modelXScale,
      modelYScale,
      modelZScale
    )

    model.updateMatrixWorld(
      true
    )

    console.log(
      "✅ Model placed at balance position"
    )

    // =============================================
    // CLEANUP / UNMOUNT
    // =============================================

    return () => {
      const original =
        originalTransformRef.current

      if (
        !model ||
        !original
      ) {
        return
      }

      // ===========================================
      // RETURN MODEL TO ORIGINAL PARENT
      // ===========================================

      if (
        original.parent
      ) {
        original.parent.add(
          model
        )
      }

      // ===========================================
      // RESTORE ORIGINAL POSITION
      // ===========================================

      model.position.copy(
        original.position
      )

      // ===========================================
      // RESTORE ORIGINAL ROTATION
      // ===========================================

      model.quaternion.copy(
        original.quaternion
      )

      // ===========================================
      // RESTORE ORIGINAL SCALE
      // ===========================================

      model.scale.copy(
        original.scale
      )

      model.updateMatrixWorld(
        true
      )

      console.log(
        "✅ Model returned to original camera position"
      )
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