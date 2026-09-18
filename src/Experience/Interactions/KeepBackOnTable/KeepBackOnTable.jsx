import {
  useLayoutEffect,
} from "react"

import {
  useThree,
} from "@react-three/fiber"

import * as THREE from "three"

const KeepBackOnTable = ({
  modelRef,
  modelTablePosRef,

  modelScale = 0.5,

  modelYOffset = 1.1,
  modelXOffset = 0,
  modelZOffset = 0,
}) => {
  const { scene } = useThree()

  useLayoutEffect(() => {
    const model = modelRef?.current
    const tablePosition = modelTablePosRef?.current

    if (!model || !tablePosition) {
      console.warn(
        "KeepBackOnTable: model or table position was not found"
      )

      return
    }

    // Get the empty object's world position before
    // changing the model's parent.
    const targetWorldPosition =
      new THREE.Vector3()

    tablePosition.getWorldPosition(
      targetWorldPosition
    )

    // Detach the model from the camera and attach it
    // back to the main Three.js scene.
    scene.attach(model)

    // Convert the empty's world position into the
    // scene's local coordinate system.
    const targetScenePosition =
      scene.worldToLocal(
        targetWorldPosition.clone()
      )

    model.position.set(
      targetScenePosition.x + modelXOffset,
      targetScenePosition.y + modelYOffset,
      targetScenePosition.z + modelZOffset
    )

    // Supports either a single scale number or [x, y, z].
    if (Array.isArray(modelScale)) {
      model.scale.set(
        modelScale[0] ?? 1,
        modelScale[1] ?? modelScale[0] ?? 1,
        modelScale[2] ?? modelScale[0] ?? 1
      )
    } else {
      model.scale.setScalar(modelScale)
    }

    model.updateMatrixWorld(true)
  }, [
    modelRef,
    modelTablePosRef,
    modelScale,
    modelXOffset,
    modelYOffset,
    modelZOffset,
    scene,
  ])

  return null
}

export default KeepBackOnTable