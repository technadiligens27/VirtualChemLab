import { useContext, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import gsap from "gsap"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import Message from "../../Message/Message"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const GogglesPut = () => {
  const { gogglesRef } = useContext(ModelContext)
  const { gogglesOn, hasSat } = useContext(InteractionContext)
  const {setSafetyStep,setshowGogglesArrow,setShowLeftGloveArrow} = useContext(MainGuidelineContext)

  const [show, setShow] = useState(false)
  const gogglePosition = useRef(new THREE.Vector3())
  const isAnimating = useRef(false)

  const { camera,gl } = useThree()

  useFrame(() => {
    if (!gogglesRef.current) return
    if (gogglesOn.current || isAnimating.current) return

    gogglesRef.current.getWorldPosition(gogglePosition.current)

    const distance = camera.position.distanceTo(gogglePosition.current)

    setShow(distance < 10 && hasSat.current)
  })

useEffect(() => {
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  const handleClick = (event) => {
    if (!show) return
    if (!gogglesRef.current) return
    if (gogglesOn.current) return
    if (!hasSat.current) return
    if (isAnimating.current) return

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObject(
      gogglesRef.current,
      true
    )

    if (intersects.length === 0) return

    isAnimating.current = true
    setShow(false)

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
        isAnimating.current = false;
        setshowGogglesArrow(false);
        setSafetyStep(2);
      },
    })

  }

  gl.domElement.addEventListener("click", handleClick)

  return () => {
    gl.domElement.removeEventListener("click", handleClick)
  }
}, [show, gogglesRef, gogglesOn, hasSat, camera, gl])

  if (!show) return null

  return (
    // <Message
    //   position={[
    //     gogglePosition.current.x,
    //     gogglePosition.current.y + 1,
    //     gogglePosition.current.z,
    //   ]}
    //   message="Press G to Put"
    // />
    null
  )
}

export default GogglesPut