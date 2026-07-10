import { useContext, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"

import PouringLiquid from "../PouringLiquid/PouringLiquid"

const PouringMode = ({ hand }) => {
  const { camera } = useThree()

  const {
    selectedRightHand,
    selectedLeftHand,
    setPouredFromLeft,
    isPouring,
    setIsPouring,
  } = useContext(InteractionContext)

  const { isReactionRef } = useContext(ReactionContext)

  const { lessonStep, setLessonStep, setShowErrorMsgNo } =
    useContext(MainGuidelineContext)

  const emptyRef = useRef(null)
  const rotationZRef = useRef(0)

  const originalPositionRef = useRef(null)
  const originalRotationRef = useRef(null)

  const otherOriginalPositionRef = useRef(null)
  const otherOriginalRotationRef = useRef(null)

  // Stores the base rotation before adding pouring rotation
  const baseRotationRef = useRef(new THREE.Euler(0, 0, 0))

  const [activeObject, setActiveObject] = useState(null)

  // Find the mouth empty from the receiving object
  useEffect(() => {
    emptyRef.current = null

    const sourceObject =
      hand === "right"
        ? selectedLeftHand?.ref?.current
        : selectedRightHand?.ref?.current

    if (!sourceObject) return

    sourceObject.traverse((child) => {
      if (child.name?.toLowerCase().includes("mouth")) {
        emptyRef.current = child
      }
    })
  }, [hand, selectedLeftHand, selectedRightHand])

  useEffect(() => {
    // Get pouring object and receiving object based on hand
    const getPouringObjects = () => {
      const targetObject =
        hand === "right"
          ? selectedRightHand?.ref?.current
          : selectedLeftHand?.ref?.current

      const otherObject =
        hand === "right"
          ? selectedLeftHand?.ref?.current
          : selectedRightHand?.ref?.current

      return { targetObject, otherObject }
    }

    // Save object positions and rotations before moving to pouring position
    const saveOriginalTransforms = (targetObject, otherObject) => {
      originalPositionRef.current = targetObject.position.clone()
      originalRotationRef.current = targetObject.rotation.clone()

      if (otherObject) {
        otherOriginalPositionRef.current = otherObject.position.clone()
        otherOriginalRotationRef.current = otherObject.rotation.clone()
      }
    }

    // Restore both objects when pressing P again
    const restoreOriginalTransforms = (targetObject, otherObject) => {
      if (originalPositionRef.current) {
        targetObject.position.copy(originalPositionRef.current)
      }

      if (originalRotationRef.current) {
        targetObject.rotation.copy(originalRotationRef.current)
      }

      if (otherObject && otherOriginalPositionRef.current) {
        otherObject.position.copy(otherOriginalPositionRef.current)
      }

      if (otherObject && otherOriginalRotationRef.current) {
        otherObject.rotation.copy(otherOriginalRotationRef.current)
      }
    }

    // Clear pouring state after stopping pouring mode
    const resetPouringState = () => {
      rotationZRef.current = 0
      setIsPouring(false)
      setActiveObject(null)

      originalPositionRef.current = null
      originalRotationRef.current = null
      otherOriginalPositionRef.current = null
      otherOriginalRotationRef.current = null
    }

    // Move right hand object near the left hand object's mouth empty
    const moveRightHandPouringObject = (targetObject, otherObject) => {
      // Move left hand object slightly aside
      otherObject?.position.set(-1, -0.5, -5)

      const otherObjectName = otherObject?.name
      console.log("otherObjectName:", otherObjectName)

      // If left hand object is conical flask, rotate it 180 degrees on Y
      if (otherObjectName === "main-Conical-Flask") {
        otherObject.rotation.y = Math.PI
      }

      const worldPosition = new THREE.Vector3()
      emptyRef.current.getWorldPosition(worldPosition)

      const localPosition = camera.worldToLocal(worldPosition.clone())

      // Different offset when pouring into conical flask
      if (otherObjectName === "main-Conical-Flask") {
        localPosition.add(new THREE.Vector3(2, -0.3, -0.5))
      } else {
        localPosition.add(new THREE.Vector3(1, -0.3, -0.5))
      }

      targetObject.position.copy(localPosition)
    }

    // Move left hand object near the right hand object's mouth empty
    const moveLeftHandPouringObject = (targetObject, otherObject) => {
      // Move right hand object slightly aside
      otherObject?.position.set(1, -0.5, -5)

      const worldPosition = new THREE.Vector3()
      emptyRef.current.getWorldPosition(worldPosition)

      const localPosition = camera.worldToLocal(worldPosition.clone())

      // Different offset when right hand object is normal beaker
      if (otherObject.name === "main-normal-beaker") {
        localPosition.add(new THREE.Vector3(-1, 0.1, -0.5))
      } else {
        localPosition.add(new THREE.Vector3(-2, 0.1, -0.5))
      }

      targetObject.position.copy(localPosition)
    }

    // Set the base rotation before pouring tilt starts
    const setupBaseRotation = (targetObject) => {
      rotationZRef.current = 0

      const targetName = targetObject.name?.toLowerCase()

      // Default pouring rotation
      baseRotationRef.current = new THREE.Euler(0, 0, 0)

      // Only right hand normal beaker gets 180 Y rotation
      if (hand === "right" && targetName?.includes("main-normal-beaker")) {
        baseRotationRef.current.y = Math.PI
      }

      targetObject.rotation.copy(baseRotationRef.current)
    }

    const handleKeyDown = (e) => {
      // Only P is allowed for pouring mode
      if (e.key.toLowerCase() !== "p") {
        setShowErrorMsgNo(3)
        return
      }

      setLessonStep(10)

      // Right hand pouring = P
      if (hand === "right" && e.shiftKey) return

      // Left hand pouring = Shift + P
      if (hand === "left" && !e.shiftKey) return

      const { targetObject, otherObject } = getPouringObjects()

      if (!emptyRef.current || !targetObject) return

      // If already pouring, pressing P again returns objects back
      if (activeObject === targetObject) {
        restoreOriginalTransforms(targetObject, otherObject)
        resetPouringState()
        return
      }

      saveOriginalTransforms(targetObject, otherObject)

      if (hand === "right") {
        moveRightHandPouringObject(targetObject, otherObject)
      }

      if (hand === "left") {
        moveLeftHandPouringObject(targetObject, otherObject)
      }

      setupBaseRotation(targetObject)

      setIsPouring(false)
      setActiveObject(targetObject)
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [
    hand,
    selectedRightHand,
    selectedLeftHand,
    camera,
    activeObject,
    setIsPouring,
    setLessonStep,
    setShowErrorMsgNo,
  ])

  // Mouse wheel controls pouring tilt
  useEffect(() => {
    const handleWheel = (e) => {
      if (!activeObject) return

      e.preventDefault()

      const maxRotation = Math.PI / 5

      if (e.deltaY > 0) {
        rotationZRef.current = Math.max(
          rotationZRef.current - 0.15,
          -maxRotation
        )
      } else {
        rotationZRef.current = Math.min(
          rotationZRef.current + 0.15,
          maxRotation
        )
      }
    }

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    })

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [activeObject])

  useEffect(() => {
    console.log("LessonStep:", lessonStep)
  }, [lessonStep])

  useFrame(() => {
    if (!activeObject) return

    // Keep base X and Y rotation.
    // Only Z changes when pouring.
    activeObject.rotation.set(
      baseRotationRef.current.x,
      baseRotationRef.current.y,
      baseRotationRef.current.z + rotationZRef.current
    )

    const pouringAngle = Math.PI / 5
    const pouringNow = Math.abs(rotationZRef.current) >= pouringAngle

    if (pouringNow !== isPouring) {
      setIsPouring(pouringNow)

      if (pouringNow && hand === "right") {
        setPouredFromLeft?.(true)
      }
    }
  })

  return (
    <>
      {activeObject && (
        <PouringLiquid
          modelRef={{ current: activeObject }}
          hand={hand}
          isPouring={isPouring}
        />
      )}
    </>
  )
}

export default PouringMode