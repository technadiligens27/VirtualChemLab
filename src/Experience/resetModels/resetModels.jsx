// Utils/resetModel.js

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
    const startState = child.userData.startState

    if (!startState) return

    // Put the object back under its original parent.
    if (
      startState.parent &&
      child.parent !== startState.parent
    ) {
      startState.parent.add(child)
    }

    child.position.copy(startState.position)
    child.rotation.copy(startState.rotation)
    child.scale.copy(startState.scale)
    child.visible = startState.visible

    if (
      startState.color &&
      child.material?.color
    ) {
      child.material.color.copy(startState.color)
    }

    if (
      startState.opacity !== null &&
      child.material
    ) {
      child.material.opacity = startState.opacity
      child.material.needsUpdate = true
    }
  })
}