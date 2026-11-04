import {
  useEffect,
} from "react"

import {
  useThree,
} from "@react-three/fiber"

import * as THREE from "three"

const PlaceModelNearModel = ({
  modelRef,
  otherModelRef,

  isAttachedToCamera = false,

  modelRefScale = [1, 1, 1],
  otherModelRefScale = [1, 1, 1],

  xOffset = 0,
  yOffset = 0,
  zOffset = 0,

  xRotation = 0,
  yRotation = 0,
  zRotation = 0,
}) => {
  const {
    camera,
  } = useThree()

  useEffect(() => {
    const model = modelRef?.current
    const otherModel = otherModelRef?.current

    if (!model || !otherModel) {
      return
    }

    // =============================================
    // SAVE ORIGINAL MODEL STATE
    // =============================================

    const originalModelParent =
      model.parent

    const originalModelPosition =
      model.position.clone()

    const originalModelQuaternion =
      model.quaternion.clone()

    const originalModelScale =
      model.scale.clone()

    // =============================================
    // SAVE ORIGINAL OTHER MODEL SCALE
    // =============================================

    const originalOtherModelScale =
      otherModel.scale.clone()

    // =============================================
    // SCALE OTHER MODEL
    // =============================================

    otherModel.scale.set(
      otherModelRefScale[0],
      otherModelRefScale[1],
      otherModelRefScale[2]
    )

    otherModel.updateMatrixWorld(true)

    // =============================================
    // GET OTHER MODEL WORLD POSITION
    // =============================================

    const targetWorldPosition =
      new THREE.Vector3()

    otherModel.getWorldPosition(
      targetWorldPosition
    )

    const targetParent =
      otherModel.parent

    // =============================================
    // DETACH MODEL FROM CAMERA / ATTACH TO TARGET
    // =============================================

    if (
      isAttachedToCamera &&
      model.parent === camera &&
      targetParent
    ) {
      targetParent.attach(model)
    } else if (targetParent) {
      targetParent.attach(model)
    }

    // =============================================
    // CONVERT TARGET WORLD POSITION TO LOCAL POSITION
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
    // POSITION WITH OFFSETS
    // =============================================

    model.position.set(
      targetLocalPosition.x + xOffset,
      targetLocalPosition.y + yOffset,
      targetLocalPosition.z + zOffset
    )

    // =============================================
    // ROTATION
    // =============================================

    model.rotation.set(
      xRotation,
      yRotation,
      zRotation
    )

    // =============================================
    // SCALE MODEL
    // =============================================

    model.scale.set(
      modelRefScale[0],
      modelRefScale[1],
      modelRefScale[2]
    )

    model.updateMatrixWorld(true)

    // =============================================
    // CLEANUP ON UNMOUNT
    // =============================================

    return () => {
      // Return the model to its held position.
      if (isAttachedToCamera) {
        camera.add(model)
      } else if (originalModelParent) {
        originalModelParent.add(model)
      }

      model.position.copy(
        originalModelPosition
      )

      model.quaternion.copy(
        originalModelQuaternion
      )

      model.scale.copy(
        originalModelScale
      )

      otherModel.scale.copy(
        originalOtherModelScale
      )

      model.updateMatrixWorld(true)
      otherModel.updateMatrixWorld(true)
    }
  }, [
    modelRef,
    otherModelRef,
    isAttachedToCamera,
    camera,

    modelRefScale[0],
    modelRefScale[1],
    modelRefScale[2],

    otherModelRefScale[0],
    otherModelRefScale[1],
    otherModelRefScale[2],

    xOffset,
    yOffset,
    zOffset,

    xRotation,
    yRotation,
    zRotation,
  ])

  return null
}

export default PlaceModelNearModel