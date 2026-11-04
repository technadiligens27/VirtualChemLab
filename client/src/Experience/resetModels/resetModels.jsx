export const saveModelStartState = (model) => {
  if (!model) return

  const objects = []

  model.traverse((child) => {
    objects.push(child)
  })

  objects.forEach((child) => {
    child.userData.startState = {
      parent: child.parent,

      position: child.position.clone(),
      rotation: child.rotation.clone(),
      quaternion: child.quaternion.clone(),
      scale: child.scale.clone(),

      visible: child.visible,

      color: child.material?.color
        ? child.material.color.clone()
        : null,

      opacity:
        child.material &&
        typeof child.material.opacity === "number"
          ? child.material.opacity
          : null,
    }
  })
}

export const resetModel = (model) => {
  if (!model) return

  const objects = []

  model.traverse((child) => {
    objects.push(child)
  })

  objects.forEach((child) => {
    const startState =
      child.userData.startState

    if (!startState) return

    if (
      startState.parent &&
      child.parent !== startState.parent
    ) {
      startState.parent.add(child)
    }

    child.position.copy(
      startState.position
    )

    /*
     * Restore the exact original rotation.
     */
    if (startState.quaternion) {
      child.quaternion.copy(
        startState.quaternion
      )
    } else {
      child.rotation.copy(
        startState.rotation
      )
    }

    child.scale.copy(
      startState.scale
    )

    child.visible =
      startState.visible

    if (
      startState.color &&
      child.material?.color
    ) {
      child.material.color.copy(
        startState.color
      )
    }

    if (
      startState.opacity !== null &&
      child.material
    ) {
      child.material.opacity =
        startState.opacity

      child.material.needsUpdate = true
    }

    child.updateMatrix()
  })

  model.updateMatrixWorld(true)
}