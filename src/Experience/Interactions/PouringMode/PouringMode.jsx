import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

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
    isPouringMode,setIsPouringMode
  } = useContext(InteractionContext)

  const {
    lessonStep,
    setLessonStep,
    setShowErrorMsgNo,
    labResetKey,isTutorialMode
    
  } = useContext(MainGuidelineContext)

  const emptyRef = useRef(null)

  const rotationZRef = useRef(0)
  const baseRotationRef = useRef(
    new THREE.Euler(0, 0, 0)
  )

  const originalPositionRef = useRef(null)
  const originalRotationRef = useRef(null)

  const otherOriginalPositionRef = useRef(null)
  const otherOriginalRotationRef = useRef(null)

  const activeOtherObjectRef = useRef(null)

  const [activeObject, setActiveObject] =
    useState(null)

  /*
   * Find the mouth of the receiving object.
   */
  useEffect(() => {
    emptyRef.current = null

    const receivingObject =
      hand === "right"
        ? selectedLeftHand?.ref?.current
        : selectedRightHand?.ref?.current

    if (!receivingObject) return

    receivingObject.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (childName.includes("mouth")) {
        emptyRef.current = child
      }
    })
  }, [
    hand,
    selectedLeftHand,
    selectedRightHand,
  ])

  /*
   * Clear local pouring state after the lab is reset.
   *
   * resetInteractions() sets pouringModeHand to null.
   * This stops useFrame() from controlling the old object.
   */
  useLayoutEffect(() => {
    if (pouringModeHand === hand) return

    rotationZRef.current = 0
    baseRotationRef.current.set(0, 0, 0)

    originalPositionRef.current = null
    originalRotationRef.current = null

    otherOriginalPositionRef.current = null
    otherOriginalRotationRef.current = null

    activeOtherObjectRef.current = null

    setActiveObject(null)
  }, [
    labResetKey,
    pouringModeHand,
    hand,
  ])

  /*
   * Enter and exit pouring mode with:
   *
   * P         = right hand
   * Shift + P = left hand
   */
  useEffect(() => {
    const getPouringObjects = () => {
      if (hand === "right") {
        return {
          targetObject:
            selectedRightHand?.ref?.current,

          otherObject:
            selectedLeftHand?.ref?.current,
        }
      }

      return {
        targetObject:
          selectedLeftHand?.ref?.current,

        otherObject:
          selectedRightHand?.ref?.current,
      }
    }

    const saveOriginalTransforms = (
      targetObject,
      otherObject
    ) => {
      originalPositionRef.current =
        targetObject.position.clone()

      originalRotationRef.current =
        targetObject.rotation.clone()

      if (otherObject) {
        otherOriginalPositionRef.current =
          otherObject.position.clone()

        otherOriginalRotationRef.current =
          otherObject.rotation.clone()
      } else {
        otherOriginalPositionRef.current = null
        otherOriginalRotationRef.current = null
      }

      activeOtherObjectRef.current = otherObject
    }

    const restoreOriginalTransforms = (
      targetObject,
      otherObject
    ) => {
      if (
        targetObject &&
        originalPositionRef.current
      ) {
        targetObject.position.copy(
          originalPositionRef.current
        )
      }

      if (
        targetObject &&
        originalRotationRef.current
      ) {
        targetObject.rotation.copy(
          originalRotationRef.current
        )
      }

      if (otherObject &&otherOriginalPositionRef.current) {
          otherObject.position.copy(
          otherOriginalPositionRef.current
        )
      }

      if (
        otherObject &&
        otherOriginalRotationRef.current
      ) {
        otherObject.rotation.copy(
          otherOriginalRotationRef.current
        )
      }

      targetObject?.updateMatrixWorld(true)
      otherObject?.updateMatrixWorld(true)
    }

    const resetLocalPouringState = () => {
      rotationZRef.current = 0
      baseRotationRef.current.set(0, 0, 0)

      setIsPouring(false)
      setPouredFromLeft(false)
      setPouredFromRight(false)

      setActiveObject(null)

      originalPositionRef.current = null
      originalRotationRef.current = null

      otherOriginalPositionRef.current = null
      otherOriginalRotationRef.current = null

      activeOtherObjectRef.current = null
    }

    const moveRightHandObject = (
      targetObject,
      otherObject
    ) => {
      if (!emptyRef.current) return

      if (otherObject) {
        otherObject.position.set(
          -1,
          -0.5,
          -5
        )
      }

      const otherObjectName =
        otherObject?.name?.toLowerCase() || ""

      const isConicalFlask =
        otherObjectName.includes(
          "main-conical-flask"
        )

      if (isConicalFlask && otherObject) {
        otherObject.rotation.y = Math.PI
      }

      const worldPosition =
        new THREE.Vector3()

      emptyRef.current.getWorldPosition(
        worldPosition
      )

      const localPosition =
        camera.worldToLocal(
          worldPosition.clone()
        )

      if (isConicalFlask) {
        localPosition.add(
          new THREE.Vector3(
            2,
            -0.3,
            -0.5
          )
        )
      } else {
        localPosition.add(
          new THREE.Vector3(
            1,
            -0.3,
            -0.5
          )
        )
      }

      targetObject.position.copy(
        localPosition
      )

      targetObject.updateMatrixWorld(true)
      otherObject?.updateMatrixWorld(true)
    }

    const moveLeftHandObject = (
      targetObject,
      otherObject
    ) => {
      if (!emptyRef.current) return

      if (otherObject) {
        otherObject.position.set(
          1,
          -0.5,
          -5
        )
      }

      const otherObjectName =
        otherObject?.name?.toLowerCase() || ""

      const isNormalBeaker =
        otherObjectName.includes(
          "main-normal-beaker"
        )

      const worldPosition =
        new THREE.Vector3()

      emptyRef.current.getWorldPosition(
        worldPosition
      )

      const localPosition =
        camera.worldToLocal(
          worldPosition.clone()
        )

      if (isNormalBeaker) {
        localPosition.add(
          new THREE.Vector3(
            -1,
            0.1,
            -0.5
          )
        )
      } else {
        localPosition.add(
          new THREE.Vector3(
            -2,
            0.1,
            -0.5
          )
        )
      }

      targetObject.position.copy(
        localPosition
      )

      targetObject.updateMatrixWorld(true)
      otherObject?.updateMatrixWorld(true)
    }

    const setStartingRotation = (
      targetObject
    ) => {
      rotationZRef.current = 0
      baseRotationRef.current.set(0, 0, 0)

      const targetName =
        targetObject.name?.toLowerCase() || ""

      const isRightNormalBeaker =
        hand === "right" &&
        targetName.includes(
          "main-normal-beaker"
        )

      if (isRightNormalBeaker) {
        baseRotationRef.current.y = Math.PI
      }

      targetObject.rotation.copy(
        baseRotationRef.current
      )

      targetObject.updateMatrixWorld(true)
    }

    const handleKeyDown = (event) => {
      if (event.code !== "KeyP") return

      const requestedHand =
        event.shiftKey ? "left" : "right"

      if (requestedHand !== hand) return

      /*
       * Prevent both hands from entering
       * pouring mode at the same time.
       */
      if (
        pouringModeHand &&
        pouringModeHand !== requestedHand
      ) {
        setShowErrorMsgNo(3)
        return
      }

      const {
        targetObject,
        otherObject,
      } = getPouringObjects()

      /*
       * Exit pouring mode.
       */
      if (pouringModeHand === requestedHand && activeObject) {
        if(isTutorialMode && isPouringMode && lessonStep>8){
          setShowErrorMsgNo(12)
          return
        }
        restoreOriginalTransforms(activeObject,activeOtherObjectRef.current)

        resetLocalPouringState()
        setPouringModeHand(null)

        return
      }

      /*
       * Enter pouring mode.
       */
      if (
        !emptyRef.current ||
        !targetObject
      ) {
        return
      }

      setIsPouringMode(true)

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

    window.addEventListener(
      "keydown",
      handleKeyDown
    )

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      )
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
    isPouringMode,
    lessonStep,
    isTutorialMode
  ])

  /*
   * Rotate the pouring object with
   * the mouse wheel.
   */
  useEffect(() => {
    const handleWheel = (event) => {
      if (
        !activeObject ||
        pouringModeHand !== hand
      ) {
        return
      }

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

    window.addEventListener(
      "wheel",
      handleWheel,
      { passive: false }
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [
    activeObject,
    pouringModeHand,
    hand,
  ])

  /*
   * Continuously apply the pouring rotation.
   *
   * The pouringModeHand check is important:
   * after reset it becomes null, so this frame
   * loop immediately stops controlling the model.
   */
  useFrame(() => {
    if (
      !activeObject ||
      pouringModeHand !== hand
    ) {
      return
    }

    activeObject.rotation.set(
      baseRotationRef.current.x,
      baseRotationRef.current.y,
      baseRotationRef.current.z +
        rotationZRef.current
    )

    const pouringAngle = Math.PI / 5

    const pouringNow =
      Math.abs(rotationZRef.current) >=
      pouringAngle

    if (pouringNow !== isPouring) {
      setIsPouring(pouringNow)
    }
  })

  return (
    <>
      {activeObject &&
        pouringModeHand === hand && (
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