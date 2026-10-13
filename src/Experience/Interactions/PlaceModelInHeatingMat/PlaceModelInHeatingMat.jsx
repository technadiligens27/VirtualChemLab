import {
  useContext,
  useEffect,
} from "react"

import * as THREE from "three"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

const PlaceModelInHeatingMat = ({
  modelRef,

  modelXOffset = 0,
  modelYOffset = 0,
  modelZOffset = 0,

  modelScale = [1, 1, 1],
  heatingMatScale = [1, 1, 1],
}) => {
  const {
    heatingMatRef,
  } = useContext(ModelContext)

  useEffect(() => {
    const model = modelRef?.current
    const heatingMat = heatingMatRef?.current

    if (!model || !heatingMat) {
      return
    }

    let centerChild = null

    heatingMat.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        !centerChild &&
        childName.includes("center")
      ) {
        centerChild = child
      }
    })

    if (!centerChild) {
      console.warn(
        'PlaceModelInHeatingMat: No child containing "center" was found.'
      )
      return
    }

    // Save original model state.
    const originalModelParent = model.parent
    const originalModelPosition =
      model.position.clone()
    const originalModelQuaternion =
      model.quaternion.clone()
    const originalModelScale =
      model.scale.clone()

    // Save original heating mat scale.
    const originalHeatingMatScale =
      heatingMat.scale.clone()

    heatingMat.scale.set(
      heatingMatScale[0],
      heatingMatScale[1],
      heatingMatScale[2]
    )

    heatingMat.updateMatrixWorld(true)
    centerChild.updateMatrixWorld(true)

    // Get the centre marker position in world space.
    const centerWorldPosition =
      new THREE.Vector3()

    centerChild.getWorldPosition(
      centerWorldPosition
    )

    // Add adjustable world-space offsets.
    centerWorldPosition.x += modelXOffset
    centerWorldPosition.y += modelYOffset
    centerWorldPosition.z += modelZOffset

    // Put the model at the centre marker position.
    if (model.parent) {
      model.parent.worldToLocal(
        centerWorldPosition
      )
    }

    model.position.copy(
      centerWorldPosition
    )

    model.scale.set(
      modelScale[0],
      modelScale[1],
      modelScale[2]
    )

    model.updateMatrixWorld(true)

    return () => {
      // Restore heating mat scale.
      heatingMat.scale.copy(
        originalHeatingMatScale
      )

      heatingMat.updateMatrixWorld(true)

      // Restore original model parent.
      if (originalModelParent) {
        originalModelParent.add(model)
      }

      // Restore model transform.
      model.position.copy(
        originalModelPosition
      )

      model.quaternion.copy(
        originalModelQuaternion
      )

      model.scale.copy(
        originalModelScale
      )

      model.updateMatrixWorld(true)
    }
  }, [
    modelRef,
    heatingMatRef,

    modelXOffset,
    modelYOffset,
    modelZOffset,

    modelScale[0],
    modelScale[1],
    modelScale[2],

    heatingMatScale[0],
    heatingMatScale[1],
    heatingMatScale[2],
  ])

  return null
}

export default PlaceModelInHeatingMat