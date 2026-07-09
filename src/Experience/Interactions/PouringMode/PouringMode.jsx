import { useContext, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import PouringLiquid from "../PouringLiquid/PouringLiquid"
import * as THREE from "three"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"

const PouringMode = ({ hand }) => {
  const { camera } = useThree()

  const {
    selectedRightHand,
    selectedLeftHand,
    setPouredFromLeft,
    isPouring, setIsPouring
  } = useContext(InteractionContext)

  const {isReactionRef} = useContext(ReactionContext)

  const {lessonStep,setLessonStep,setShowErrorMsgNo} = useContext(MainGuidelineContext)

  const emptyRef = useRef(null)
  const rotationZRef = useRef(0)

  const originalPositionRef = useRef(null)
  const originalRotationRef = useRef(null)

  const otherOriginalPositionRef = useRef(null)
  const otherOriginalRotationRef = useRef(null)

  // const [isPouring, setIsPouring] = useState(false)
  const [activeObject, setActiveObject] = useState(null)

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
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() !== "p") {
        setShowErrorMsgNo(3)
        return
      }

      setLessonStep(10)
      // Right hand pouring = P
      if (hand === "right" && e.shiftKey) return

      // Left hand pouring = Shift + P
      if (hand === "left" && !e.shiftKey) return

      const targetObject =
        hand === "right"
          ? selectedRightHand?.ref?.current
          : selectedLeftHand?.ref?.current

      const otherObject =
        hand === "right"
          ? selectedLeftHand?.ref?.current
          : selectedRightHand?.ref?.current

      if (!emptyRef.current || !targetObject) return

      // If already pouring, pressing P again returns objects back
      if (activeObject === targetObject) {
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

        rotationZRef.current = 0
        setIsPouring(false)
        setActiveObject(null)

        originalPositionRef.current = null
        originalRotationRef.current = null
        otherOriginalPositionRef.current = null
        otherOriginalRotationRef.current = null

        return
      }

      // Save original positions before moving
      originalPositionRef.current = targetObject.position.clone()
      originalRotationRef.current = targetObject.rotation.clone()

      if (otherObject) {
        otherOriginalPositionRef.current = otherObject.position.clone()
        otherOriginalRotationRef.current = otherObject.rotation.clone()
      }

      if (hand === "right") {
        // Move left hand object slightly aside
        otherObject?.position.set(-1, -0.5, -5)

        const worldPosition = new THREE.Vector3()
        emptyRef.current.getWorldPosition(worldPosition)

        const localPosition = camera.worldToLocal(worldPosition.clone())
        localPosition.add(new THREE.Vector3(1, -0.3, -0.5))

        targetObject.position.copy(localPosition)
      }

      if (hand === "left") {
        // Move right hand object slightly aside
        otherObject?.position.set(1, -0.5, -5)

        const worldPosition = new THREE.Vector3()
        emptyRef.current.getWorldPosition(worldPosition)

        const localPosition = camera.worldToLocal(worldPosition.clone())
        localPosition.add(new THREE.Vector3(-2, 0.1, -0.5))

        targetObject.position.copy(localPosition)
      }

      rotationZRef.current = 0
      targetObject.rotation.set(0, 0, 0)

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
  ])

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

  // useEffect(()=>{
  //   if(lessonStep === 9){
  //     setLessonStep(10)
  //   }
  // },[lessonStep])
  useEffect(()=>{
    console.log("LessonStep:",lessonStep)
  },[lessonStep])

  useFrame(() => {
    if (!activeObject) return

    activeObject.rotation.set(0, 0, rotationZRef.current)

    const pouringAngle = Math.PI / 5
    const pouringNow = Math.abs(rotationZRef.current) >= pouringAngle

    if (pouringNow !== isPouring) {
      setIsPouring(pouringNow)

      if (pouringNow && hand === "right") {
        setPouredFromLeft?.(true)
        // if (lessonStep === 9) {
        //   setLessonStep(10)
        // }
      }
    }
  })

  return (
    <>
      {activeObject  && (
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