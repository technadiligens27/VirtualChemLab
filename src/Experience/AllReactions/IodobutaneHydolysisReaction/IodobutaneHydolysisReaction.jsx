import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const IodobutaneHydolysisReaction = ({
  liquidRef,
  modelRef,

  // Total visual reaction duration
  reactionDuration = 15,

  // Time when cloudiness is first considered visible
  cloudinessVisibleTime = 5,

  // Final opacity of the liquid
  targetOpacity = 0.85,

  // Final liquid yellow color
  liquidTargetColor = "#e5b61c",

  // Final opacity of powder particles
  powderTargetOpacity = 1,

  // Powder color
  powderColor = "#E6B82E",

  // Powder position spread
  powderXRadius = 0.3,
  powderYRadius = 0.7,
  powderZRadius = 0.1,

  // Powder size
  powderScaleMultiplier = 0.6,

  // Random powder size variation
  powderScaleRandomness = 0,
}) => {
  const {
    setIsReactionTimerRunning,
  } = useContext(InteractionContext)

  const liquidMaterialsRef = useRef([])
  const liquidStartColorsRef = useRef([])
  const liquidStartOpacitiesRef = useRef([])

  const powderObjectsRef = useRef([])
  const powderMaterialsRef = useRef([])

  const powderOriginalScalesRef = useRef(
    new Map()
  )

  const visiblePowderCountRef = useRef(0)

  const reactionTimeRef = useRef(0)
  const reactionProgressRef = useRef(0)

  const cloudinessTriggeredRef = useRef(false)

  const targetColorRef = useRef(
    new THREE.Color(
      liquidTargetColor
    )
  )

  useEffect(() => {
    targetColorRef.current.set(
      liquidTargetColor
    )
  }, [liquidTargetColor])

  useEffect(() => {
    if (!liquidRef?.current) return

    liquidMaterialsRef.current = []
    liquidStartColorsRef.current = []
    liquidStartOpacitiesRef.current = []

    const liquid =
      liquidRef.current

    const prepareMaterial = (material) => {
      if (!material) return null

      const clonedMaterial =
        material.clone()

      clonedMaterial.transparent = true
      clonedMaterial.depthWrite = false

      if ("roughness" in clonedMaterial) clonedMaterial.roughness = 0.35
      if ("metalness" in clonedMaterial) clonedMaterial.metalness = 0
      if ("transmission" in clonedMaterial) clonedMaterial.transmission = 0.15
      if ("thickness" in clonedMaterial) clonedMaterial.thickness = 0.3

      liquidStartColorsRef.current.push(
        clonedMaterial.color.clone()
      )

      liquidStartOpacitiesRef.current.push(
        clonedMaterial.opacity
      )

      clonedMaterial.needsUpdate = true

      liquidMaterialsRef.current.push(
        clonedMaterial
      )

      return clonedMaterial
    }

    if (Array.isArray(liquid.material)) {
      liquid.material =
        liquid.material.map(
          prepareMaterial
        )
    } else if (liquid.material) {
      liquid.material =
        prepareMaterial(
          liquid.material
        )
    }

    return () => {
      liquidMaterialsRef.current = []
      liquidStartColorsRef.current = []
      liquidStartOpacitiesRef.current = []
    }
  }, [liquidRef])

  useEffect(() => {
    if (!modelRef?.current || !liquidRef?.current) return

    const powders = []

    powderObjectsRef.current = []
    powderMaterialsRef.current = []

    visiblePowderCountRef.current = 0

    reactionTimeRef.current = 0
    reactionProgressRef.current = 0

    cloudinessTriggeredRef.current = false

    modelRef.current.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (!childName.includes("powder")) return
      if (!child.isMesh) return

      powders.push(child)

      if (!powderOriginalScalesRef.current.has(child.uuid)) {
        powderOriginalScalesRef.current.set(
          child.uuid,
          child.scale.clone()
        )
      }

      child.visible = false
    })

    if (powders.length === 0) {
      console.log(
        "No powder objects found"
      )

      return
    }

    const liquidBox =
      new THREE.Box3().setFromObject(
        liquidRef.current
      )

    const liquidCenter =
      new THREE.Vector3()

    liquidBox.getCenter(
      liquidCenter
    )

    const shuffledPowders = [
      ...powders,
    ].sort(
      () => Math.random() - 0.5
    )

    powderObjectsRef.current =
      shuffledPowders

    shuffledPowders.forEach((powder) => {
      const randomX =
        THREE.MathUtils.randFloat(
          -powderXRadius,
          powderXRadius
        )

      const randomY =
        THREE.MathUtils.randFloat(
          -powderYRadius,
          powderYRadius
        )

      const randomZ =
        THREE.MathUtils.randFloat(
          -powderZRadius,
          powderZRadius
        )

      const targetPosition =
        liquidCenter.clone()

      targetPosition.x += randomX
      targetPosition.y += randomY
      targetPosition.z += randomZ

      if (powder.parent) {
        powder.parent.worldToLocal(
          targetPosition
        )
      }

      powder.position.copy(
        targetPosition
      )

      powder.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )

      const originalScale =
        powderOriginalScalesRef.current.get(
          powder.uuid
        ) ||
        new THREE.Vector3(
          1,
          1,
          1
        )

      const randomScaleOffset =
        THREE.MathUtils.randFloat(
          -powderScaleRandomness,
          powderScaleRandomness
        )

      const finalScaleMultiplier =
        Math.max(
          0.001,
          powderScaleMultiplier +
            randomScaleOffset
        )

      powder.scale.set(
        originalScale.x *
          finalScaleMultiplier,

        originalScale.y *
          finalScaleMultiplier,

        originalScale.z *
          finalScaleMultiplier
      )

      const preparePowderMaterial = (material) => {
        if (!material) return material

        const clonedMaterial =
          material.clone()

        clonedMaterial.transparent = true
        clonedMaterial.opacity = 0
        clonedMaterial.depthWrite = false

        clonedMaterial.color?.set(
          powderColor
        )

        if ("roughness" in clonedMaterial) clonedMaterial.roughness = 0.5
        if ("metalness" in clonedMaterial) clonedMaterial.metalness = 0

        clonedMaterial.needsUpdate = true

        powderMaterialsRef.current.push(
          clonedMaterial
        )

        return clonedMaterial
      }

      if (Array.isArray(powder.material)) {
        powder.material =
          powder.material.map(
            preparePowderMaterial
          )
      } else if (powder.material) {
        powder.material =
          preparePowderMaterial(
            powder.material
          )
      }

      powder.visible = false
    })

    return () => {
      powders.forEach((powder) => {
        powder.visible = false

        const originalScale =
          powderOriginalScalesRef.current.get(
            powder.uuid
          )

        if (originalScale) {
          powder.scale.copy(
            originalScale
          )
        }
      })

      powderObjectsRef.current = []
      powderMaterialsRef.current = []

      visiblePowderCountRef.current = 0

      reactionTimeRef.current = 0
      reactionProgressRef.current = 0

      cloudinessTriggeredRef.current = false
    }
  }, [
    modelRef,
    liquidRef,
    powderColor,
    powderXRadius,
    powderYRadius,
    powderZRadius,
    powderScaleMultiplier,
    powderScaleRandomness,
  ])

  useFrame((_, delta) => {
    /*
      Increase reaction time.
    */

    reactionTimeRef.current =
      Math.min(
        reactionTimeRef.current +
          delta,
        reactionDuration
      )

    /*
      Stop reaction timer when
      cloudiness becomes visible.
    */

    if (reactionTimeRef.current >= cloudinessVisibleTime && !cloudinessTriggeredRef.current) {
      cloudinessTriggeredRef.current = true

      setIsReactionTimerRunning(false)

      console.log(
        "Cloudiness visible - timer stopped"
      )
    }

    /*
      Convert time to 0 → 1 progress.
    */

    reactionProgressRef.current =
      reactionDuration > 0
        ? reactionTimeRef.current /
          reactionDuration
        : 1

    const reactionProgress =
      reactionProgressRef.current

    /*
      LIQUID COLOR + OPACITY

      Both gradually reach their
      final values at reactionDuration.
    */

    liquidMaterialsRef.current.forEach(
      (material, index) => {
        if (!material) return

        const startColor =
          liquidStartColorsRef.current[
            index
          ]

        const startOpacity =
          liquidStartOpacitiesRef.current[
            index
          ]

        if (startColor) {
          material.color.copy(
            startColor
          )

          material.color.lerp(
            targetColorRef.current,
            reactionProgress
          )
        }

        if (startOpacity !== undefined) {
          material.opacity =
            THREE.MathUtils.lerp(
              startOpacity,
              targetOpacity,
              reactionProgress
            )
        }
      }
    )

    if (powderObjectsRef.current.length === 0) return

    /*
      POWDER AMOUNT

      0 sec = 0%
      halfway = 50%
      reactionDuration = 100%
    */

    const currentVisiblePowderCount =
      Math.floor(
        powderObjectsRef.current.length *
          reactionProgress
      )

    while (visiblePowderCountRef.current < currentVisiblePowderCount) {
      const powder =
        powderObjectsRef.current[
          visiblePowderCountRef.current
        ]

      if (powder) {
        powder.visible = true
      }

      visiblePowderCountRef.current += 1
    }

    /*
      POWDER OPACITY

      Also reaches full opacity at
      reactionDuration.
    */

    const powderOpacity =
      THREE.MathUtils.lerp(
        0,
        powderTargetOpacity,
        reactionProgress
      )

    powderMaterialsRef.current.forEach(
      (material) => {
        if (!material) return

        material.opacity =
          powderOpacity
      }
    )
  })

  return <></>
}

export default IodobutaneHydolysisReaction