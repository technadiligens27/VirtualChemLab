import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import {
  useFrame,
  useThree,
} from "@react-three/fiber"

import { Html } from "@react-three/drei"

import * as THREE from "three"

import gsap from "gsap"

import "./GlovesPut.css"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"


const GlovesPut = () => {

  const {
    gloveleftRef,
    gloverightRef,
  } = useContext(
    ModelContext
  )


  const {
    glovesOn,
    gogglesOn,
  } = useContext(
    InteractionContext
  )


  const {
    setSafetyStep,
    setShowLeftGloveArrow,
    setShowRightGloveArrow,
  } = useContext(
    MainGuidelineContext
  )


  const [
    canClickLeft,
    setCanClickLeft,
  ] = useState(false)


  const [
    canClickRight,
    setCanClickRight,
  ] = useState(false)


  const [
    showLeftButton,
    setShowLeftButton,
  ] = useState(false)


  const [
    showRightButton,
    setShowRightButton,
  ] = useState(false)


  const leftDone =
    useRef(false)

  const rightDone =
    useRef(false)

  const isAnimating =
    useRef(false)


  const leftPosition =
    useRef(
      new THREE.Vector3()
    )


  const rightPosition =
    useRef(
      new THREE.Vector3()
    )


  const {
    camera,
    gl,
  } = useThree()


  // =====================================================
  // CONTROL WHICH GLOVE CAN BE CLICKED
  // =====================================================

  useFrame(() => {

    if (
      !gloveleftRef.current ||
      !gloverightRef.current
    ) {
      return
    }


    if (!gogglesOn.current) {
      setCanClickLeft(false)
      setCanClickRight(false)
      return
    }


    if (glovesOn.current) {
      setCanClickLeft(false)
      setCanClickRight(false)
      return
    }


    gloveleftRef.current.getWorldPosition(
      leftPosition.current
    )


    gloverightRef.current.getWorldPosition(
      rightPosition.current
    )


    const leftDistance =
      camera.position.distanceTo(
        leftPosition.current
      )


    const rightDistance =
      camera.position.distanceTo(
        rightPosition.current
      )


    // ===================================================
    // LEFT GLOVE MUST ALWAYS BE FIRST
    // ===================================================

    if (!leftDone.current) {

      setCanClickLeft(
        leftDistance < 10 &&
        !isAnimating.current
      )


      // Right glove completely disabled
      // until left glove has been put on.
      setCanClickRight(false)

      return
    }


    // ===================================================
    // LEFT DONE -> RIGHT GLOVE CAN NOW BE CLICKED
    // ===================================================

    setCanClickLeft(false)


    setCanClickRight(
      rightDistance < 10 &&
      !rightDone.current &&
      !isAnimating.current
    )
  })


  // =====================================================
  // PUT GLOVE ON
  // =====================================================

  const putGlove = (
    glove,
    side
  ) => {

    if (!glove) return

    if (!gogglesOn.current) {
      return
    }


    if (isAnimating.current) {
      return
    }


    // ===================================================
    // PREVENT RIGHT GLOVE BEFORE LEFT
    // ===================================================

    if (
      side === "right" &&
      !leftDone.current
    ) {
      return
    }


    // ===================================================
    // PREVENT REPEATING LEFT
    // ===================================================

    if (
      side === "left" &&
      leftDone.current
    ) {
      return
    }


    // ===================================================
    // PREVENT REPEATING RIGHT
    // ===================================================

    if (
      side === "right" &&
      rightDone.current
    ) {
      return
    }


    isAnimating.current =
      true


    setCanClickLeft(false)
    setCanClickRight(false)

    setShowLeftButton(false)
    setShowRightButton(false)


    gsap.to(
      glove.rotation,
      {
        z:
          side === "left"
            ? glove.rotation.z +
              Math.PI
            : glove.rotation.z -
              Math.PI,

        duration: 1,

        ease:
          "power2.inOut",
      }
    )


    gsap.to(
      glove.position,
      {
        y:
          glove.position.y +
          3.5,

        z:
          glove.position.z +
          8,

        duration: 1,

        ease:
          "power2.inOut",


        onComplete: () => {

          glove.visible =
            false


          // ===============================================
          // LEFT GLOVE FINISHED
          // ===============================================

          if (
            side === "left"
          ) {

            leftDone.current =
              true


            setSafetyStep(3)


            setShowLeftGloveArrow(
              false
            )


            setShowRightGloveArrow(
              true
            )
          }


          // ===============================================
          // RIGHT GLOVE FINISHED
          // ===============================================

          if (
            side === "right"
          ) {

            rightDone.current =
              true


            setSafetyStep(4)


            setShowRightGloveArrow(
              false
            )
          }


          // ===============================================
          // BOTH GLOVES COMPLETE
          // ===============================================

          if (
            leftDone.current &&
            rightDone.current
          ) {

            glovesOn.current =
              true
          }


          isAnimating.current =
            false
        },
      }
    )
  }


  // =====================================================
  // CLICK DETECTION
  // =====================================================

  useEffect(() => {

    const raycaster =
      new THREE.Raycaster()


    const mouse =
      new THREE.Vector2()


    const handleClick =
      (event) => {

        if (
          !gogglesOn.current
        ) {
          return
        }


        if (
          glovesOn.current
        ) {
          return
        }


        if (
          isAnimating.current
        ) {
          return
        }


        mouse.x =
          (
            event.clientX /
            window.innerWidth
          ) *
            2 -
          1


        mouse.y =
          -(
            event.clientY /
            window.innerHeight
          ) *
            2 +
          1


        raycaster.setFromCamera(
          mouse,
          camera
        )


        // =================================================
        // FIRST: ONLY LEFT GLOVE
        // =================================================

        if (
          !leftDone.current
        ) {

          if (
            canClickLeft &&
            gloveleftRef.current
          ) {

            const leftIntersects =
              raycaster.intersectObject(
                gloveleftRef.current,
                true
              )


            if (
              leftIntersects.length >
              0
            ) {

              setShowLeftButton(
                true
              )


              setShowRightButton(
                false
              )

              return
            }
          }


          // Clicking anywhere else before left is done
          // should NOT allow the right glove.

          setShowLeftButton(
            false
          )


          setShowRightButton(
            false
          )

          return
        }


        // =================================================
        // LEFT DONE: ONLY RIGHT GLOVE
        // =================================================

        if (
          leftDone.current &&
          !rightDone.current
        ) {

          if (
            canClickRight &&
            gloverightRef.current
          ) {

            const rightIntersects =
              raycaster.intersectObject(
                gloverightRef.current,
                true
              )


            if (
              rightIntersects.length >
              0
            ) {

              setShowRightButton(
                true
              )


              setShowLeftButton(
                false
              )

              return
            }
          }


          setShowLeftButton(
            false
          )


          setShowRightButton(
            false
          )

          return
        }


        setShowLeftButton(
          false
        )


        setShowRightButton(
          false
        )
      }


    gl.domElement.addEventListener(
      "click",
      handleClick
    )


    return () => {

      gl.domElement.removeEventListener(
        "click",
        handleClick
      )
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


  // =====================================================
  // JSX
  // =====================================================

  return (
    <>

      {/* =================================================
          LEFT GLOVE BUTTON
      ================================================= */}

      {showLeftButton &&
        !leftDone.current && (

          <Html
            position={[
              leftPosition.current.x,
              leftPosition.current.y +
                1,
              leftPosition.current.z,
            ]}
            center
          >

            <div className="click-btn-container">

              <button
                onClick={(e) => {

                  e.stopPropagation()


                  putGlove(
                    gloveleftRef.current,
                    "left"
                  )
                }}
                className="gloves-btn"
              >
                Put On
              </button>

            </div>

          </Html>

        )}


      {/* =================================================
          RIGHT GLOVE BUTTON
      ================================================= */}

      {showRightButton &&
        leftDone.current &&
        !rightDone.current && (

          <Html
            position={[
              rightPosition.current.x,
              rightPosition.current.y +
                1,
              rightPosition.current.z,
            ]}
            center
          >

            <div className="click-btn-container">

              <button
                onClick={(e) => {

                  e.stopPropagation()


                  putGlove(
                    gloverightRef.current,
                    "right"
                  )
                }}
                className="gloves-btn"
              >
                Put On
              </button>

            </div>

          </Html>

        )}

    </>
  )
}


export default GlovesPut