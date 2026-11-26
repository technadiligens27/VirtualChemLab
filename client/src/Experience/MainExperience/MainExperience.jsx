import { Canvas } from "@react-three/fiber"
import { Perf } from "r3f-perf"

import ChemEnvironment from "../ChemEnvironment/ChemEnvironment"

import {
  Environment,
  OrbitControls,
  PointerLockControls,
} from "@react-three/drei"

import PlayerController from "../PlayerController/PlayerController"

import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext"
import { ModelContext } from "../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

import Interaction from "../Interactions/Interaction"

import MobileJoystick from "../../UI/MobileJoystick/MobileJoystick"
import MobileLookControls from "../../UI/MobileLookControls/MobileLookControls"
import MobileLookIndicator from "../../UI/MobileLookControls/MobileLookIndicator"

const MainExperience = () => {

  const {
    isSitting,isTouchDevice
  } = useContext(InteractionContext)

  const {
    frontWallRef,
    leftWallRef,
    rightWallRef,
    backWallRef,
  } = useContext(ModelContext)

  const {
    isMainGuideline,
  } = useContext(MainGuidelineContext)


  // =========================================================
  // MOBILE JOYSTICK MOVEMENT
  // =========================================================

  const mobileMovementRef = useRef({
    x: 0,
    y: 0,
  })


  // // =========================================================
  // // DETECT TOUCHSCREEN INPUT
  // // =========================================================

  // const [
  //   isTouchDevice,
  //   setIsTouchDevice,
  // ] = useState(
  //   () => window.matchMedia(
  //     "(pointer: coarse)"
  //   ).matches
  // )

  useEffect(() => {

    const mediaQuery = window.matchMedia(
      "(pointer: coarse)"
    )

    const handleChange = (event) => {

      setIsTouchDevice(event.matches)

    }

    mediaQuery.addEventListener(
      "change",
      handleChange
    )

    return () => {

      mediaQuery.removeEventListener(
        "change",
        handleChange
      )

    }

  }, [])


  // =========================================================
  // EXIT POINTER LOCK
  // =========================================================

  useEffect(() => {

    if (
      isMainGuideline ||
      isTouchDevice ||
      isSitting
    ) {

      if (document.pointerLockElement) {

        document.exitPointerLock?.()

      }

    }

  }, [
    isMainGuideline,
    isTouchDevice,
    isSitting,
  ])


  return (
    <>

      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 150,
          position: [-5, 0, 45],
        }}

        gl={{
          antialias: true,
        }}

        style={{
          touchAction: isTouchDevice
            ? "none"
            : "auto",
        }}

        dpr={[1, 1.5]}
      >

        <ambientLight intensity={1} />

        <ChemEnvironment />

        {/* <OrbitControls /> */}

        <Environment preset="sunset" />


        {/* ======================================
            PLAYER CONTROLLER
        ====================================== */}

        <PlayerController
          blockedModels={[
            frontWallRef,
            leftWallRef,
            rightWallRef,
            backWallRef,
          ]}

          mobileMovementRef={mobileMovementRef}
        />


        {/* ======================================
            DESKTOP CAMERA CONTROLS
        ====================================== */}

        {!isTouchDevice &&
          !isSitting &&
          !isMainGuideline && (

            <PointerLockControls />

        )}


        {/* ======================================
            MOBILE CAMERA CONTROLS
        ====================================== */}

        {isTouchDevice &&
          !isSitting &&
          !isMainGuideline && (

            <MobileLookControls
              sensitivity={0.003}
              maxLookAngle={85}
            />

        )}


        <Interaction />

        {/* <Perf position="top-right" /> */}

      </Canvas>


      {/* ======================================
          MOBILE UI CONTROLS
      ====================================== */}

      {isTouchDevice &&
        !isSitting &&
        !isMainGuideline && (

          <>

            <MobileJoystick
              movementRef={mobileMovementRef}
            />

            <MobileLookIndicator />

          </>

      )}

    </>
  )
}

export default MainExperience