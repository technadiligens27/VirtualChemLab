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

  startHeight = 2,
  fallDistance = 2,

  fallSpeed = 1,

  powderColor = "#ffffff",
  endOpacity = 1,

  powderScale = 1,

  randomDelay = 1,
  sidewaysAmount = 0.15,
}) => {
  const powdersRef =
    useRef([])

  const elapsedTimeRef =
    useRef(0)


  // =========================================
  // INITIALIZE POWDER
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
      // CLONE MATERIAL
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
      // SAVE ORIGINAL DATA
      // =========================================

      const originalPosition =
        child.position.clone()

      const originalScale =
        child.scale.clone()


      // =========================================
      // START ABOVE ORIGINAL POSITION
      // =========================================

      child.position.y =
        originalPosition.y +
        startHeight


      // =========================================
      // APPLY SCALE
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
      // RANDOM SETTINGS
      // =========================================

      const delay =
        Math.random() *
        randomDelay

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


    powdersRef.current.forEach(
      (powder) => {
        const {
          object,
          startPosition,
          delay,
          randomX,
          randomZ,
        } = powder


        // =========================================
        // WAIT FOR RANDOM DELAY
        // =========================================

        if (
          elapsedTimeRef.current <
          delay
        ) {
          return
        }


        // =========================================
        // INCREASE PROGRESS
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
        // FALL DOWN
        // =========================================

        object.position.y =
          startPosition.y -
          (
            fallDistance *
            progress
          )


        // =========================================
        // RANDOM SIDEWAYS MOVEMENT
        // =========================================

        object.position.x =
          startPosition.x +
          (
            randomX *
            progress
          )

        object.position.z =
          startPosition.z +
          (
            randomZ *
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