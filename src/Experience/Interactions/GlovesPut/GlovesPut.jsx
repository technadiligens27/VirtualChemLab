import { useContext, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import gsap from "gsap"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import Message from "../../Message/Message"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const GlovesPut = () => {
  const { gloveleftRef, gloverightRef } = useContext(ModelContext)
  const { glovesOn, gogglesOn } = useContext(InteractionContext)
  const {setSafetyStep,setShowLeftGloveArrow,setShowRightGloveArrow} = useContext(MainGuidelineContext)

  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  const leftDone = useRef(false)
  const rightDone = useRef(false)
  const isAnimating = useRef(false)

  const leftPosition = useRef(new THREE.Vector3())
  const rightPosition = useRef(new THREE.Vector3())

  const { camera, gl } = useThree()

  useFrame(() => {
    if (!gloveleftRef.current || !gloverightRef.current) return
    if (!gogglesOn.current) return
    if (glovesOn.current) return

    gloveleftRef.current.getWorldPosition(leftPosition.current)
    gloverightRef.current.getWorldPosition(rightPosition.current)

    const leftDistance = camera.position.distanceTo(leftPosition.current)
    const rightDistance = camera.position.distanceTo(rightPosition.current)

    setShowLeft(
      leftDistance < 10 &&
        !leftDone.current &&
        !isAnimating.current
    )

    setShowRight(
      rightDistance < 10 &&
        !rightDone.current &&
        !isAnimating.current
    )
  })

  const putGlove = (glove, side) => {
    if (!glove) return
    if (!gogglesOn.current) return
    if (isAnimating.current) return

    isAnimating.current = true
    setShowLeft(false)
    setShowRight(false)

    gsap.to(glove.rotation, {
      z:
        side === "left"
          ? glove.rotation.z + Math.PI
          : glove.rotation.z - Math.PI,
      duration: 1,
      ease: "power2.inOut",
    })

    gsap.to(glove.position, {
      y: glove.position.y + 3.5,
      z: glove.position.z + 8,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        glove.visible = false

        if (side === "left") {
          leftDone.current = true
          setSafetyStep(3);
          setShowLeftGloveArrow(false);
          setShowRightGloveArrow(true)
        }

        if (side === "right") {
          rightDone.current = true
          setSafetyStep(4);
          setShowRightGloveArrow(false)
        }

        if (leftDone.current && rightDone.current) {
          glovesOn.current = true
        }

        isAnimating.current = false
      },
    })
  }

  useEffect(() => {
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleClick = (event) => {
      if (!gogglesOn.current) return
      if (glovesOn.current) return
      if (isAnimating.current) return

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)

      if (showLeft && gloveleftRef.current && !leftDone.current) {
        const leftIntersects = raycaster.intersectObject(
          gloveleftRef.current,
          true
        )

        if (leftIntersects.length > 0) {
          putGlove(gloveleftRef.current, "left")
          return
        }
      }

      if (showRight && gloverightRef.current && !rightDone.current) {
        const rightIntersects = raycaster.intersectObject(
          gloverightRef.current,
          true
        )

        if (rightIntersects.length > 0) {
          putGlove(gloverightRef.current, "right")
        }
      }
    }

    gl.domElement.addEventListener("click", handleClick)

    return () => {
      gl.domElement.removeEventListener("click", handleClick)
    }
  }, [showLeft, showRight, camera, gl, gloveleftRef, gloverightRef])

  return (
    <>
      {showLeft && (
        <Message
          position={[
            leftPosition.current.x,
            leftPosition.current.y + 1,
            leftPosition.current.z,
          ]}
          message="Click Left Glove"
        />
      )}

      {showRight && (
        <Message
          position={[
            rightPosition.current.x,
            rightPosition.current.y + 1,
            rightPosition.current.z,
          ]}
          message="Click Right Glove"
        />
      )}
    </>
  )
}

export default GlovesPut