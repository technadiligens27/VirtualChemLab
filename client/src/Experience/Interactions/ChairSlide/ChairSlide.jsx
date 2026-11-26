import { useFrame, useThree } from "@react-three/fiber"

import {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react"

import * as THREE from "three"
import gsap from "gsap"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

import ChairSit from "../ChairSit/ChairSit"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const ChairSlide = () => {

  const {
    chairRef,
  } = useContext(ModelContext)

  const {
    chairStep,
    setChairStep,
    mobileChairSit,
    setMobileChairSit,mobileChairSlide,setMobileChairSlide
  } = useContext(InteractionContext)

  const { camera } = useThree()

  const [show, setShow] = useState(false)
  const [slid, setSlid] = useState(false)

  const chairPosition = useRef(
    new THREE.Vector3()
  )

  const isSliding = useRef(false)


  // ==========================================
  // CHECK DISTANCE FROM CHAIR
  // ==========================================

  useFrame(() => {

    if (!chairRef.current) return

    if (slid || isSliding.current) return

    chairRef.current.getWorldPosition(
      chairPosition.current
    )

    const distance =
      camera.position.distanceTo(
        chairPosition.current
      )

    setShow(distance < 14)

    if (distance < 14) {

      setChairStep(1)

    }

  })


  // ==========================================
  // CHAIR SLIDING FUNCTION
  // ==========================================

  const handleChairSlide = useCallback(() => {

    if (!show) return
    if (!chairRef.current) return
    if (isSliding.current) return
    if (slid) return

    isSliding.current = true

    setShow(false)

    gsap.to(chairRef.current.position, {

      z: chairRef.current.position.z + 5,

      duration: 1,

      ease: "power2.out",

      onComplete: () => {

        isSliding.current = false

        setSlid(true)

        setChairStep(2)

      },

    })

  }, [
    show,
    slid,
    chairRef,
    setChairStep,
  ])


  // ==========================================
  // DESKTOP KEYBOARD INPUT
  // ==========================================

  useEffect(() => {

    const handleKeyDown = (event) => {

      if (event.code !== "KeyG") return

      handleChairSlide()

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

  }, [handleChairSlide])


  // ==========================================
  // MOBILE BUTTON INPUT
  // ==========================================

  useEffect(() => {

    if (!mobileChairSit) return

    handleChairSlide()

    setMobileChairSit(false)
    

  }, [
    mobileChairSit,
    handleChairSlide,
    setMobileChairSit,
  ])


  // ==========================================
  // DEBUG
  // ==========================================

  useEffect(() => {

    console.log("chairStep:", chairStep)

  }, [chairStep])


  return (
    <>

      {slid && <ChairSit />}

    </>
  )
}

export default ChairSlide