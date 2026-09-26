import {
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import * as THREE from "three"


const ChlorideIonReaction = ({
  modelRef,

  // Delay before the whole reaction starts
  startDelay = 0,

  // How far above the final level
  // the powder starts
  startHeight = 1,

  // Final Y level where powder settles
  finalYLevel = -1.2,

  // Small random difference in final height
  finalHeightRandomness = 0.3,

  fallSpeed = 0.3,

  powderColor = "#ffffff",
  endOpacity = 0.8,

  powderScale = 0.7,

  // Random delay for each powder particle
  randomDelay = 1,

  sidewaysAmount = 0,
}) => {
  const powdersRef =
    useRef([])

  const elapsedTimeRef =
    useRef(0)

  console.log("Chloride Ion Reaction")
  // =========================================
  // INITIALIZE
  // =========================================

  useEffect(() => {
    const model =
      modelRef?.current

    if (!model) return


    const powders = []


    model.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""


      if (
        !child.isMesh ||
        !name.includes("powder")
      ) {
        return
      }


      // =========================================
      // MATERIAL
      // =========================================

      if (child.material) {
        child.material =
          child.material.clone()

        child.material.transparent =
          true

        child.material.opacity =
          0

        child.material.color.set(
          powderColor
        )

        child.material.needsUpdate =
          true
      }


      // =========================================
      // ORIGINAL VALUES
      // =========================================

      const originalPosition =
        child.position.clone()

      const originalScale =
        child.scale.clone()


      // =========================================
      // RANDOM FINAL HEIGHT
      // =========================================

      const randomFinalOffset =
        (
          Math.random() -
          0.5
        ) *
        finalHeightRandomness


      const targetY =
        finalYLevel +
        randomFinalOffset


      // =========================================
      // START POSITION
      // =========================================

      const startY =
        targetY +
        startHeight


      child.position.y =
        startY


      // =========================================
      // SCALE
      // =========================================

      child.scale.set(
        originalScale.x *
          powderScale,

        originalScale.y *
          powderScale,

        originalScale.z *
          powderScale
      )


      // =========================================
      // RANDOM DELAY
      // =========================================

      const delay =
        Math.random() *
        randomDelay


      // =========================================
      // RANDOM SIDEWAYS POSITION
      // =========================================

      const randomX =
        (
          Math.random() -
          0.5
        ) *
        sidewaysAmount


      const randomZ =
        (
          Math.random() -
          0.5
        ) *
        sidewaysAmount


      powders.push({
        object: child,

        originalPosition,
        originalScale,

        startPosition:
          child.position.clone(),

        targetY,

        delay,

        randomX,
        randomZ,

        progress: 0,
      })
    })


    powdersRef.current =
      powders

    elapsedTimeRef.current =
      0


    // =========================================
    // CLEANUP
    // =========================================

    return () => {
      powders.forEach(
        ({
          object,
          originalPosition,
          originalScale,
        }) => {
          object.position.copy(
            originalPosition
          )

          object.scale.copy(
            originalScale
          )

          if (
            object.material
          ) {
            object.material.opacity =
              endOpacity
          }

          object.updateMatrixWorld(
            true
          )
        }
      )


      powdersRef.current =
        []
    }
  }, [
    modelRef,
    startHeight,
    finalYLevel,
    finalHeightRandomness,
    powderColor,
    endOpacity,
    powderScale,
    randomDelay,
    sidewaysAmount,
  ])


  // =========================================
  // FALL ANIMATION
  // =========================================

  useFrame((_, delta) => {
    elapsedTimeRef.current +=
      delta


    // =========================================
    // GLOBAL START DELAY
    // =========================================

    if (
      elapsedTimeRef.current <
      startDelay
    ) {
      return
    }


    const reactionTime =
      elapsedTimeRef.current -
      startDelay


    powdersRef.current.forEach(
      (powder) => {
        const {
          object,
          startPosition,
          targetY,
          delay,
          randomX,
          randomZ,
        } = powder


        // =========================================
        // RANDOM PARTICLE DELAY
        // =========================================

        if (
          reactionTime <
          delay
        ) {
          return
        }


        // =========================================
        // PROGRESS
        // =========================================

        powder.progress +=
          delta *
          fallSpeed


        const progress =
          THREE.MathUtils.clamp(
            powder.progress,
            0,
            1
          )


        // =========================================
        // FALL TO COMMON FINAL LEVEL
        // =========================================

        object.position.y =
          THREE.MathUtils.lerp(
            startPosition.y,
            targetY,
            progress
          )


        // =========================================
        // SMALL RANDOM SIDEWAYS MOVEMENT
        // =========================================

        object.position.x =
          THREE.MathUtils.lerp(
            startPosition.x,
            startPosition.x +
              randomX,
            progress
          )


        object.position.z =
          THREE.MathUtils.lerp(
            startPosition.z,
            startPosition.z +
              randomZ,
            progress
          )


        // =========================================
        // FADE IN
        // =========================================

        if (
          object.material
        ) {
          object.material.opacity =
            THREE.MathUtils.lerp(
              0,
              endOpacity,
              progress
            )
        }


        object.visible =
          true


        object.updateMatrixWorld(
          true
        )
      }
    )
  })


  return null
}

export default ChlorideIonReaction