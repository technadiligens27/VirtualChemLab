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

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const ChairSit = () => {

  const {
    chairRef,
  } = useContext(ModelContext)

  const {
    hasSat,
    setIsSitting,
    setChairStep,
    mobileChairSlide,
    setMobileChairSlide,
  } = useContext(InteractionContext)

  const {
    setSafetyStep,
    safetyStep,
  } = useContext(MainGuidelineContext)

  const [
    isCompactScreen,
    setIsCompactScreen,
  ] = useState(
    () => window.innerWidth <= 1024
  )

  const { camera } = useThree()

  const [show, setShow] = useState(false)

  const chairPosition = useRef(
    new THREE.Vector3()
  )

  const beforeSitPosition = useRef(
    new THREE.Vector3()
  )

  const beforeSitRotation = useRef(
    new THREE.Euler()
  )

  const isSittingAnimation = useRef(false)


  // ==========================================
  // SCREEN SIZE DETECTION
  // ==========================================

  useEffect(() => {

    const handleResize = () => {

      setIsCompactScreen(
        window.innerWidth <= 1024
      )

    }

    window.addEventListener(
      "resize",
      handleResize
    )

    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      )

    }

  }, [])


  // ==========================================
  // CHECK DISTANCE FROM CHAIR
  // ==========================================

  useFrame(() => {

    if (!chairRef.current) return

    chairRef.current.getWorldPosition(
      chairPosition.current
    )

    const distance =
      camera.position.distanceTo(
        chairPosition.current
      )

    setShow(distance < 10 || hasSat.current)

  })


  // ==========================================
  // SITTING FUNCTION
  // ==========================================

  const handleChairSit = useCallback(() => {

    if (!show) return
    if (hasSat.current) return
    if (!chairRef.current) return
    if (isSittingAnimation.current) return

    isSittingAnimation.current = true

    beforeSitPosition.current.copy(
      camera.position
    )

    beforeSitRotation.current.copy(
      camera.rotation
    )


    // CAMERA POSITION ANIMATION

    gsap.to(camera.position, {

      x: chairPosition.current.x,

      y: isCompactScreen
        ? chairPosition.current.y - 16
        : chairPosition.current.y - 4,

      z: chairPosition.current.z,

      duration: 1.5,

      ease: "power2.inOut",

      onUpdate: () => {

        console.log(
          "Camera Y:",
          camera.position.y
        )

      },

      onComplete: () => {

        console.log(
          "Final Camera Y:",
          camera.position.y
        )

        hasSat.current = true

        setIsSitting(true)

        setChairStep(0)

        setSafetyStep(1)

        isSittingAnimation.current = false

      },

    })


    // CAMERA ROTATION ANIMATION

    gsap.to(camera.rotation, {

      x: 0,
      y: 0,
      z: 0,

      duration: 1.5,

      ease: "power2.inOut",

    })

  }, [
    show,
    hasSat,
    chairRef,
    camera,
    isCompactScreen,
    setIsSitting,
    setChairStep,
    setSafetyStep,
  ])


  // ==========================================
  // STAND UP FUNCTION
  // ==========================================

  const handleStandUp = useCallback(() => {

    if (!hasSat.current) return
    if (isSittingAnimation.current) return

    gsap.to(camera.position, {

      x: beforeSitPosition.current.x,
      y: beforeSitPosition.current.y,
      z: beforeSitPosition.current.z,

      duration: 1.5,

      ease: "power2.inOut",

    })

    gsap.to(camera.rotation, {

      x: beforeSitRotation.current.x,
      y: beforeSitRotation.current.y,
      z: beforeSitRotation.current.z,

      duration: 1.5,

      ease: "power2.inOut",

    })

    hasSat.current = false

    setIsSitting(false)

  }, [
    camera,
    hasSat,
    setIsSitting,
  ])


  // ==========================================
  // DESKTOP KEYBOARD CONTROLS
  // ==========================================

  useEffect(() => {

    const handleKeyDown = (event) => {

      if (event.code === "KeyE") {

        handleChairSit()

      }

      if (event.code === "KeyG") {

        handleStandUp()

      }

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
    handleChairSit,
    handleStandUp,
  ])


  // ==========================================
  // MOBILE SITTING CONTROLS
  // ==========================================

  useEffect(() => {

    if (!mobileChairSlide) return

    handleChairSit()

    setMobileChairSlide(false)

  }, [
    mobileChairSlide,
    handleChairSit,
    setMobileChairSlide,
  ])


  return null
}

export default ChairSit