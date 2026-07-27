import {
  useContext,
  useEffect,
  useRef,
} from "react"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

const PlaceClampInCenter = () => {
  const {
    buretteClampRef,
    balancePositionRef,
  } = useContext(ModelContext)

  const originalTransformRef = useRef(null)

  useEffect(() => {
    const clamp = buretteClampRef?.current
    const centerPosition =
      balancePositionRef?.current

    if (!clamp || !centerPosition) {
      console.log("Clamp or centre position was not found")
      return
    }

    if (!originalTransformRef.current) {
      originalTransformRef.current = {
        parent: clamp.parent,
        position: clamp.position.clone(),
        rotation: clamp.rotation.clone(),
        scale: clamp.scale.clone(),
      }
    }

    const worldPosition = new THREE.Vector3()

    centerPosition.getWorldPosition(worldPosition)

    if (clamp.parent) {
      clamp.parent.worldToLocal(worldPosition)
    }

    clamp.position.copy(worldPosition)
    clamp.position.y += 7
    clamp.position.x += -2.5

    clamp.updateMatrixWorld(true)

    console.log("Clamp moved to centre")

    return () => {
      const original =
        originalTransformRef.current

      if (!original || !clamp) return

      if (original.parent) {
        original.parent.add(clamp)
      }

      clamp.position.copy(original.position)
      clamp.rotation.copy(original.rotation)
      clamp.scale.copy(original.scale)

      clamp.updateMatrixWorld(true)

      console.log(
        "Clamp returned to original position"
      )
    }
  }, [buretteClampRef, balancePositionRef])

  return null
}

export default PlaceClampInCenter