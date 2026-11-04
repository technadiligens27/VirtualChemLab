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

  startDelay = 0,

  // Distance above the final settled level.
  startHeight = 0.8,

  // Base final powder level relative to modelRef.
  finalYLevel = -1.25,

  // Maximum total variation between powder heights.
  // Example: 0.2 creates offsets from -0.1 to +0.1.
  // Set to 0 for a perfectly flat powder surface.
  finalHeightRandomness = 0.2,

  fallSpeed = 0.1,

  powderColor = "#ffffff",

  endOpacity = 0.8,

  powderScale = 1,

  randomDelay = 4,

  sidewaysAmount = 0,
}) => {
  const powderParticlesRef =
    useRef([])

  const elapsedTimeRef =
    useRef(0)

  // =========================================================
  // SET OBJECT WORLD POSITION
  // =========================================================

  const setObjectWorldPosition = (
    object,
    worldPosition
  ) => {
    if (!object?.parent) {
      return
    }

    const localPosition =
      object.parent.worldToLocal(
        worldPosition.clone()
      )

    object.position.copy(
      localPosition
    )
  }

  // =========================================================
  // INITIALIZE POWDER PARTICLES
  // =========================================================

  useEffect(() => {
    const model =
      modelRef?.current

    if (!model) {
      return
    }

    model.updateMatrixWorld(
      true
    )

    // Convert the model-local finalYLevel
    // to the shared world Y level.
    const baseFinalWorldPoint =
      new THREE.Vector3(
        0,
        finalYLevel,
        0
      )

    model.localToWorld(
      baseFinalWorldPoint
    )

    const baseFinalWorldY =
      baseFinalWorldPoint.y

    const powderParticles = []

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        !child.isMesh ||
        !childName.includes("powder")
      ) {
        return
      }

      // =============================================
      // SAVE ORIGINAL STATE
      // =============================================

      const originalPosition =
        child.position.clone()

      const originalScale =
        child.scale.clone()

      const originalMaterial =
        child.material

      // =============================================
      // CLONE MATERIALS
      // =============================================

      const sourceMaterials =
        Array.isArray(originalMaterial)
          ? originalMaterial
          : [originalMaterial]

      const clonedMaterials =
        sourceMaterials.map((material) => {
          const clonedMaterial =
            material.clone()

          clonedMaterial.transparent =
            true

          clonedMaterial.opacity =
            0

          if (clonedMaterial.color) {
            clonedMaterial.color.set(
              powderColor
            )
          }

          clonedMaterial.needsUpdate =
            true

          return clonedMaterial
        })

      child.material = Array.isArray(
        originalMaterial
      )
        ? clonedMaterials
        : clonedMaterials[0]

      child.scale.set(
        originalScale.x *
          powderScale,

        originalScale.y *
          powderScale,

        originalScale.z *
          powderScale
      )

      child.visible =
        true

      child.updateMatrixWorld(
        true
      )

      // =============================================
      // FIND ACTUAL POWDER MESH BOTTOM
      // =============================================

      const powderBounds =
        new THREE.Box3().setFromObject(
          child
        )

      const currentBottomWorldY =
        powderBounds.min.y

      // =============================================
      // RANDOM FINAL HEIGHT
      //
      // Every powder settles near finalYLevel,
      // with a small natural variation.
      // =============================================

      const randomFinalHeightOffset =
        (
          Math.random() -
          0.5
        ) *
        finalHeightRandomness

      const particleFinalWorldY =
        baseFinalWorldY +
        randomFinalHeightOffset

      const particleStartWorldY =
        particleFinalWorldY +
        startHeight

      // =============================================
      // MOVE THE VISUAL MESH BOTTOM TO START LEVEL
      // =============================================

      const moveToStartAmount =
        particleStartWorldY -
        currentBottomWorldY

      const currentWorldPosition =
        child.getWorldPosition(
          new THREE.Vector3()
        )

      const startWorldPosition =
        currentWorldPosition.clone()

      startWorldPosition.y +=
        moveToStartAmount

      setObjectWorldPosition(
        child,
        startWorldPosition
      )

      child.updateMatrixWorld(
        true
      )

      // =============================================
      // RANDOM X / Z SETTLING MOVEMENT
      // =============================================

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

      child.visible =
        false

      powderParticles.push({
        object: child,

        originalPosition,
        originalScale,
        originalMaterial,

        startWorldPosition,

        startBottomWorldY:
          particleStartWorldY,

        finalBottomWorldY:
          particleFinalWorldY,

        randomX,
        randomZ,

        delay:
          Math.random() *
          randomDelay,

        progress: 0,
      })
    })

    powderParticlesRef.current =
      powderParticles

    elapsedTimeRef.current =
      0

    return () => {
      powderParticles.forEach(
        ({
          object,
          originalPosition,
          originalScale,
          originalMaterial,
        }) => {
          object.position.copy(
            originalPosition
          )

          object.scale.copy(
            originalScale
          )

          object.material =
            originalMaterial

          object.visible =
            true

          object.updateMatrixWorld(
            true
          )
        }
      )

      powderParticlesRef.current = []
    }
  }, [
    modelRef,
    startHeight,
    finalYLevel,
    finalHeightRandomness,
    powderColor,
    powderScale,
    randomDelay,
    sidewaysAmount,
  ])

  // =========================================================
  // ANIMATE PARTICLES
  // =========================================================

  useFrame((_, delta) => {
    elapsedTimeRef.current +=
      delta

    if (
      elapsedTimeRef.current <
      startDelay
    ) {
      return
    }

    const reactionTime =
      elapsedTimeRef.current -
      startDelay

    powderParticlesRef.current.forEach(
      (particle) => {
        const {
          object,
          startWorldPosition,
          startBottomWorldY,
          finalBottomWorldY,
          randomX,
          randomZ,
          delay,
        } = particle

        if (reactionTime < delay) {
          return
        }

        particle.progress +=
          delta * fallSpeed

        const progress =
          THREE.MathUtils.clamp(
            particle.progress,
            0,
            1
          )

        const currentBottomWorldY =
          THREE.MathUtils.lerp(
            startBottomWorldY,
            finalBottomWorldY,
            progress
          )

        const worldYMovement =
          currentBottomWorldY -
          startBottomWorldY

        const targetWorldPosition =
          startWorldPosition.clone()

        targetWorldPosition.y +=
          worldYMovement

        targetWorldPosition.x +=
          randomX * progress

        targetWorldPosition.z +=
          randomZ * progress

        setObjectWorldPosition(
          object,
          targetWorldPosition
        )

        const materials =
          Array.isArray(
            object.material
          )
            ? object.material
            : [object.material]

        materials.forEach(
          (material) => {
            if (!material) {
              return
            }

            material.opacity =
              THREE.MathUtils.lerp(
                0,
                endOpacity,
                progress
              )

            material.needsUpdate =
              true
          }
        )

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