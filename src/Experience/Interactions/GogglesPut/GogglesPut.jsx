import { useContext, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const GogglesPut = () => {
  const { gogglesRef } = useContext(ModelContext)
  const { gogglesOn, hasSat } = useContext(InteractionContext)

  const {
    setSafetyStep,
    setshowGogglesArrow,
    setShowLeftGloveArrow,
  } = useContext(MainGuidelineContext)

  const [showPutButton, setShowPutButton] = useState(false)
  const [isNearGoggles, setIsNearGoggles] = useState(false)

  const gogglePosition = useRef(new THREE.Vector3())
  const isAnimating = useRef(false)

  const { camera, gl } = useThree()

  useFrame(() => {
    if (!gogglesRef.current) return
    if (gogglesOn.current || isAnimating.current) return

    gogglesRef.current.getWorldPosition(gogglePosition.current)

    const distance = camera.position.distanceTo(gogglePosition.current)

    setIsNearGoggles(distance < 10 && hasSat.current)
  })

  const putOnGoggles = () => {
    if (!gogglesRef.current) return
    if (gogglesOn.current) return
    if (!hasSat.current) return
    if (isAnimating.current) return

    isAnimating.current = true
    setShowPutButton(false)

    const goggles = gogglesRef.current

    gsap.to(goggles.rotation, {
      z: goggles.rotation.z + Math.PI,
      duration: 1,
      ease: "power2.inOut",
    })

    gsap.to(goggles.position, {
      y: goggles.position.y + 3.5,
      z: goggles.position.z + 8,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        goggles.visible = false
        gogglesOn.current = true
        isAnimating.current = false

        setshowGogglesArrow(false)
        setShowLeftGloveArrow(true)
        setSafetyStep(2)
      },
    })
  }

  useEffect(() => {
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleClick = (event) => {
      if (!isNearGoggles) return
      if (!gogglesRef.current) return
      if (gogglesOn.current) return
      if (!hasSat.current) return
      if (isAnimating.current) return

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)

      const intersects = raycaster.intersectObject(gogglesRef.current, true)

      if (intersects.length === 0) {
        setShowPutButton(false)
        return
      }

      setShowPutButton(true)
    }

    gl.domElement.addEventListener("click", handleClick)

    return () => {
      gl.domElement.removeEventListener("click", handleClick)
    }
  }, [isNearGoggles, gogglesRef, gogglesOn, hasSat, camera, gl])

  if (!showPutButton) return null

  return (
    <Html
      position={[
        gogglePosition.current.x,
        gogglePosition.current.y + 1,
        gogglePosition.current.z,
      ]}
      center
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          putOnGoggles()
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
  )
}

export default GogglesPut