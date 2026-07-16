import { useContext, useEffect } from "react"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

const DropperPlaced = ({ beakerRef, hand }) => {
  const {
    mainDropperRef,
    dropperAnimationAction,
  } = useContext(ModelContext)

  useEffect(() => {
    const beaker = beakerRef?.current
    const dropper = mainDropperRef?.current

    if (!beaker || !dropper) return

    const originalBeakerPosition = beaker.position.clone()
    const originalDropperPosition = dropper.position.clone()
    const originalDropperQuaternion = dropper.quaternion.clone()

    let marker = null

    beaker.position.x = 0
    beaker.updateMatrixWorld(true)

    beaker.traverse((child) => {
      if (
        !marker &&
        child.name?.toLowerCase().includes("dropper")
      ) {
        marker = child
      }
    })

    if (!marker) {
      console.warn("Dropper marker not found")
      return
    }

    const position = new THREE.Vector3()
    const rotation = new THREE.Quaternion()

    marker.getWorldPosition(position)
    marker.getWorldQuaternion(rotation)

    position.y += 3

    if (dropper.parent) {
      dropper.parent.worldToLocal(position)

      const parentRotation = new THREE.Quaternion()

      dropper.parent.getWorldQuaternion(parentRotation)

      dropper.quaternion
        .copy(parentRotation.invert())
        .multiply(rotation)
    } else {
      dropper.quaternion.copy(rotation)
    }

    dropper.position.copy(position)
    dropper.updateMatrixWorld(true)

    return () => {
      beaker.position.copy(originalBeakerPosition)

      dropper.position.copy(originalDropperPosition)
      dropper.quaternion.copy(originalDropperQuaternion)

      beaker.updateMatrixWorld(true)
      dropper.updateMatrixWorld(true)
    }
  }, [beakerRef, mainDropperRef, hand])

  useEffect(() => {
    const action = dropperAnimationAction

    if (!action) return

    const duration = action.getClip().duration
    const scrollSpeed = 0.08

    action.reset()
    action.setLoop(THREE.LoopOnce, 1)
    action.clampWhenFinished = true
    action.play()
    action.paused = true
    action.time = 0

    const scrollDown = (amount) => {
      action.time = THREE.MathUtils.clamp(
        action.time + amount,
        0,
        duration
      )

      action.getMixer().update(0)
    }

    const scrollUp = (amount) => {
      action.time = THREE.MathUtils.clamp(
        action.time - amount,
        0,
        duration
      )

      action.getMixer().update(0)
    }

    const handleScroll = (event) => {
      event.preventDefault()

      const scrollAmount =
        Math.abs(event.deltaY) * scrollSpeed * 0.01

      if (event.deltaY > 0) {
        scrollDown(scrollAmount)
      } else if (event.deltaY < 0) {
        scrollUp(scrollAmount)
      }
    }

    window.addEventListener("wheel", handleScroll, {
      passive: false,
    })

    return () => {
      window.removeEventListener("wheel", handleScroll)

      action.time = 0
      action.paused = true
      action.getMixer().update(0)
    }
  }, [dropperAnimationAction])

  return null
}

export default DropperPlaced