import { useContext, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import gsap from "gsap"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import Message from "../../Message/Message"

const GogglesPut = () => {
  const { gogglesRef } = useContext(ModelContext)
  const { gogglesOn, hasSat } = useContext(InteractionContext)

  const [show, setShow] = useState(false)
  const gogglePosition = useRef(new THREE.Vector3())
  const isAnimating = useRef(false)

  const { camera } = useThree()

  useFrame(() => {
    if (!gogglesRef.current) return
    if (gogglesOn.current || isAnimating.current) return

    gogglesRef.current.getWorldPosition(gogglePosition.current)

    const distance = camera.position.distanceTo(gogglePosition.current)

    setShow(distance < 10 && hasSat.current)
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code !== "KeyG") return
      if (!gogglesRef.current) return
      if (gogglesOn.current) return
      if (!hasSat.current) return
      if (isAnimating.current) return

      isAnimating.current = true
      setShow(false)

      const goggles = gogglesRef.current

      gsap.to(goggles.rotation, {
        z: goggles.rotation.y + Math.PI,
        duration: 1,
        ease: "power2.inOut",
      })

      gsap.to(goggles.position, {
        y:goggles.position.y +3.5,
        z: goggles.position.z +7,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          goggles.visible = false
          gogglesOn.current = true
          isAnimating.current = false
        },
      })
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [gogglesRef, gogglesOn, hasSat])

  if (!show) return null

  return (
    <Message
      position={[
        gogglePosition.current.x,
        gogglePosition.current.y + 1,
        gogglePosition.current.z,
      ]}
      message="Press G to Put"
    />
  )
}

export default GogglesPut