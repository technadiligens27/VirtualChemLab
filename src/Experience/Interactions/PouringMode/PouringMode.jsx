import { useContext, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import PouringLiquid from "../PouringLiquid/PouringLiquid"

const PouringMode = ({ hand }) => {
  const { camera } = useThree()

  const {
    selectedRightHand,
    selectedLeftHand,
    setPouredFromLeft,
    setPouredFromRight,
    isPouring,
    setIsPouring,
    pouringModeHand,
    setPouringModeHand,
  } = useContext(InteractionContext)

  const {
    lessonStep,
    setLessonStep,
    setShowErrorMsgNo,
  } = useContext(MainGuidelineContext)

  const emptyRef = useRef(null)
  const rotationZRef = useRef(0)

  const originalPositionRef = useRef(null)
  const originalRotationRef = useRef(null)
  const otherOriginalPositionRef = useRef(null)
  const otherOriginalRotationRef = useRef(null)

  const baseRotationRef = useRef(new THREE.Euler(0, 0, 0))

  const [activeObject, setActiveObject] = useState(null)

  // Find the mouth of the receiving object.
  useEffect(() => {
    emptyRef.current = null

    const receivingObject =
      hand === "right"
        ? selectedLeftHand?.ref?.current
        : selectedRightHand?.ref?.current

    if (!receivingObject) return

    receivingObject.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (childName.includes("mouth")) {
        emptyRef.current = child
      }
    })
  }, [hand, selectedLeftHand, selectedRightHand])

  // Enter and exit pouring mode using P or Shift + P.
  useEffect(() => {
    const getPouringObjects = () => {
      if (hand === "right") {
        return {
          targetObject: selectedRightHand?.ref?.current,
          otherObject: selectedLeftHand?.ref?.current,
        }
      }

      return {
        targetObject: selectedLeftHand?.ref?.current,
        otherObject: selectedRightHand?.ref?.current,
      }
    }

    const saveOriginalTransforms = (targetObject, otherObject) => {
      originalPositionRef.current = targetObject.position.clone()
      originalRotationRef.current = targetObject.rotation.clone()

      if (otherObject) {
        otherOriginalPositionRef.current = otherObject.position.clone()
        otherOriginalRotationRef.current = otherObject.rotation.clone()
      }
    }

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

    const resetPouringState = () => {
      rotationZRef.current = 0

      setIsPouring(false)
      setPouredFromLeft(false)
      setPouredFromRight(false)
      setActiveObject(null)

      originalPositionRef.current = null
      originalRotationRef.current = null
      otherOriginalPositionRef.current = null
      otherOriginalRotationRef.current = null
    }

    const moveRightHandObject = (targetObject, otherObject) => {
      if (otherObject) {
        otherObject.position.set(-1, -0.5, -5)
      }

      const otherObjectName = otherObject?.name?.toLowerCase() || ""
      const isConicalFlask = otherObjectName.includes("main-conical-flask")

      console.log("Receiving object:", otherObject?.name)

      if (isConicalFlask) {
        otherObject.rotation.y = Math.PI
      }

      const worldPosition = new THREE.Vector3()
      emptyRef.current.getWorldPosition(worldPosition)

      const localPosition = camera.worldToLocal(worldPosition.clone())

      if (isConicalFlask) {
        localPosition.add(new THREE.Vector3(2, -0.3, -0.5))
      } else {
        localPosition.add(new THREE.Vector3(1, -0.3, -0.5))
      }

      targetObject.position.copy(localPosition)
    }

    const moveLeftHandObject = (targetObject, otherObject) => {
      if (otherObject) {
        otherObject.position.set(1, -0.5, -5)
      }

      const otherObjectName = otherObject?.name?.toLowerCase() || ""
      const isNormalBeaker = otherObjectName.includes("main-normal-beaker")

      const worldPosition = new THREE.Vector3()
      emptyRef.current.getWorldPosition(worldPosition)

      const localPosition = camera.worldToLocal(worldPosition.clone())

      if (isNormalBeaker) {
        localPosition.add(new THREE.Vector3(-1, 0.1, -0.5))
      } else {
        localPosition.add(new THREE.Vector3(-2, 0.1, -0.5))
      }

      targetObject.position.copy(localPosition)
    }

    const setStartingRotation = (targetObject) => {
      rotationZRef.current = 0

      const targetName = targetObject.name?.toLowerCase() || ""
      const isRightNormalBeaker =
        hand === "right" && targetName.includes("main-normal-beaker")

      baseRotationRef.current = new THREE.Euler(0, 0, 0)

      if (isRightNormalBeaker) {
        baseRotationRef.current.y = Math.PI
      }

      targetObject.rotation.copy(baseRotationRef.current)
    }

const handleKeyDown = (event) => {
  if (event.code !== "KeyP") return

  const requestedHand = event.shiftKey ? "left" : "right"

  if (requestedHand !== hand) return

  if (
    pouringModeHand &&
    pouringModeHand !== requestedHand
  ) {
    console.log(
      `${pouringModeHand} hand is already in pouring mode`
    )

    setShowErrorMsgNo(3)
    return
  }

  const { targetObject, otherObject } =
    getPouringObjects()

  // Exit pouring mode
  if (
    pouringModeHand === requestedHand &&
    activeObject
  ) {
    restoreOriginalTransforms(
      activeObject,
      otherObject
    )

    resetPouringState()
    setPouringModeHand(null)

    return
  }

  // Enter pouring mode
  if (!emptyRef.current || !targetObject) return

  saveOriginalTransforms(
    targetObject,
    otherObject
  )

  if (hand === "right") {
    moveRightHandObject(
      targetObject,
      otherObject
    )
  } else {
    moveLeftHandObject(
      targetObject,
      otherObject
    )
  }

  setStartingRotation(targetObject)

  setIsPouring(false)
  setPouredFromLeft(false)
  setPouredFromRight(false)

  setActiveObject(targetObject)
  setPouringModeHand(requestedHand)

  setLessonStep(10)
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
    pouringModeHand,
    setIsPouring,
    setPouredFromLeft,
    setPouredFromRight,
    setLessonStep,
    setShowErrorMsgNo,
    setPouringModeHand,
  ])

  // Rotate the pouring object with the mouse wheel.
  useEffect(() => {
    const handleWheel = (event) => {
      if (!activeObject) return

      event.preventDefault()

      const maxRotation = Math.PI / 5

      if (event.deltaY > 0) {
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

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [activeObject])

  useEffect(() => {
    console.log("LessonStep:", lessonStep)
  }, [lessonStep])

  // Apply the wheel rotation and check whether pouring has started.
  useFrame(() => {
    if (!activeObject) return

    activeObject.rotation.set(
      baseRotationRef.current.x,
      baseRotationRef.current.y,
      baseRotationRef.current.z + rotationZRef.current
    )

    const pouringAngle = Math.PI / 5
    const pouringNow = Math.abs(rotationZRef.current) >= pouringAngle

    if (pouringNow !== isPouring) {
      setIsPouring(pouringNow)
    }
  })

  return (
    <>
      {activeObject && (
        <PouringLiquid
          model={activeObject}
          hand={hand}
          isPouring={isPouring}
        />
      )}
    </>
  )
}

export default PouringMode