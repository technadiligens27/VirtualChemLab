import { useContext, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const GlovesPut = () => {
  const { gloveleftRef, gloverightRef } = useContext(ModelContext)
  const { glovesOn, gogglesOn } = useContext(InteractionContext)

  const {
    setSafetyStep,
    setShowLeftGloveArrow,
    setShowRightGloveArrow,
  } = useContext(MainGuidelineContext)

  const [canClickLeft, setCanClickLeft] = useState(false)
  const [canClickRight, setCanClickRight] = useState(false)

  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(false)

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

    setCanClickLeft(
      leftDistance < 10 &&
        !leftDone.current &&
        !isAnimating.current
    )

    setCanClickRight(
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

    setShowLeftButton(false)
    setShowRightButton(false)

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
          setSafetyStep(3)
          setShowLeftGloveArrow(false)
          setShowRightGloveArrow(true)
        }

        if (side === "right") {
          rightDone.current = true
          setSafetyStep(4)
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

      if (canClickLeft && gloveleftRef.current && !leftDone.current) {
        const leftIntersects = raycaster.intersectObject(
          gloveleftRef.current,
          true
        )

        if (leftIntersects.length > 0) {
          setShowLeftButton(true)
          setShowRightButton(false)
          return
        }
      }

      if (canClickRight && gloverightRef.current && !rightDone.current) {
        const rightIntersects = raycaster.intersectObject(
          gloverightRef.current,
          true
        )

        if (rightIntersects.length > 0) {
          setShowRightButton(true)
          setShowLeftButton(false)
          return
        }
      }

      setShowLeftButton(false)
      setShowRightButton(false)
    }

    gl.domElement.addEventListener("click", handleClick)

    return () => {
      gl.domElement.removeEventListener("click", handleClick)
    }
  }, [
    canClickLeft,
    canClickRight,
    camera,
    gl,
    gloveleftRef,
    gloverightRef,
    gogglesOn,
    glovesOn,
  ])

  return (
    <>
      {showLeftButton && (
        <Html
          position={[
            leftPosition.current.x,
            leftPosition.current.y + 1,
            leftPosition.current.z,
          ]}
          center
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              putGlove(gloveleftRef.current, "left")
            }}
            style={{
              background: "white",
              padding: "8px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Put On
          </button>
        </Html>
      )}

      {showRightButton && (
        <Html
          position={[
            rightPosition.current.x,
            rightPosition.current.y + 1,
            rightPosition.current.z,
          ]}
          center
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              putGlove(gloverightRef.current, "right")
            }}
            style={{
              background: "white",
              padding: "8px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Put On
          </button>
        </Html>
      )}
    </>
  )
}

export default GlovesPut