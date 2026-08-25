import { useContext, useEffect, useRef } from "react"

import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const HCLTitrationReaction = ({
  modelRef,
  amount = 0.6,
  progressRef,

  reactionPhase = "idle",

  streamCloudColor = "#FF6FAE",
  streamCloudOpacity = 0.28,

  dropletCloudColor = "#FF4FA3",
  dropletCloudOpacity = 0.48,

  cloudShowSpeed = 5,
  cloudFadeSpeed = 2.5,

  endpointColor = "#F8D7E5",
  endpointOpacity = 0.3,
  endpointColorSpeed = 1.2,

  endpointConfirmed = false,
}) => {
  const liquidRef = useRef(null)
  const liquidMaterialRef = useRef(null)

  const cloudRef = useRef(null)
  const cloudMaterialRef = useRef(null)

  const startScaleRef = useRef(0)
  const targetScaleRef = useRef(0)

  const originalLiquidColorRef = useRef(null)
  const originalLiquidOpacityRef = useRef(0.3)

  const streamCloudColorRef = useRef(new THREE.Color(streamCloudColor))
  const dropletCloudColorRef = useRef(new THREE.Color(dropletCloudColor))
  const endpointColorRef = useRef(new THREE.Color(endpointColor))

  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)

  // ==========================================
  // FIND LIQUID
  // ==========================================




  useEffect(() => {
    if (!modelRef?.current) return

    let liquidObject = null

    modelRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (child.isMesh && childName.includes("liquid")) liquidObject = child
    })

    if (!liquidObject) {
      console.log("❌ Conical liquid not found")
      return
    }

    liquidRef.current = liquidObject

    startScaleRef.current = liquidObject.scale.y
    targetScaleRef.current = startScaleRef.current + amount

    if (liquidObject.material) {
      liquidObject.material = liquidObject.material.clone()
      liquidMaterialRef.current = liquidObject.material

      liquidMaterialRef.current.transparent = true
      liquidMaterialRef.current.depthWrite = false

      originalLiquidColorRef.current = liquidMaterialRef.current.color.clone()
      originalLiquidOpacityRef.current = liquidMaterialRef.current.opacity

      liquidMaterialRef.current.needsUpdate = true

      liquidObject.renderOrder = 1
    }

    console.log("✅ Conical liquid found")
    console.log("Starting CONICAL scale:", startScaleRef.current)
    console.log("Target CONICAL scale:", targetScaleRef.current)
  }, [modelRef, amount])

  // ==========================================
  // FIND CLOUD
  // ==========================================

  useEffect(() => {
    if (!modelRef?.current) return

    let cloudObject = null

    modelRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (child.isMesh && childName.includes("cloud")) cloudObject = child
    })

    if (!cloudObject) {
      console.log("❌ Cloud not found")
      return
    }

    cloudRef.current = cloudObject

    if (cloudObject.material) {
      cloudObject.material = cloudObject.material.clone()
      cloudMaterialRef.current = cloudObject.material

      cloudMaterialRef.current.transparent = true
      cloudMaterialRef.current.opacity = 0
      cloudMaterialRef.current.color.copy(streamCloudColorRef.current)
      cloudMaterialRef.current.depthWrite = false
      cloudMaterialRef.current.depthTest = true
      cloudMaterialRef.current.needsUpdate = true

      cloudObject.renderOrder = 2
    }

    cloudObject.visible = false

    console.log("✅ Cloud found:", cloudObject.name)
  }, [modelRef])

  // ==========================================
  // UPDATE COLORS
  // ==========================================

  useEffect(() => {
    streamCloudColorRef.current.set(streamCloudColor)
  }, [streamCloudColor])

  useEffect(() => {
    dropletCloudColorRef.current.set(dropletCloudColor)
  }, [dropletCloudColor])

  useEffect(() => {
    endpointColorRef.current.set(endpointColor)
  }, [endpointColor])

  // ==========================================
  // ANIMATION
  // ==========================================

  useFrame((state, delta) => {
    // ========================================
    // LIQUID LEVEL
    // ========================================

    const liquid = liquidRef.current

    if (liquid) {
      const progress = progressRef?.current ?? 0

      liquid.scale.y = THREE.MathUtils.lerp(
        startScaleRef.current,
        targetScaleRef.current,
        progress
      )

      liquid.updateMatrixWorld(true)
    }

    // ========================================
    // TEMPORARY PINK CLOUD
    // ========================================

    const cloud = cloudRef.current
    const cloudMaterial = cloudMaterialRef.current

    if (cloud && cloudMaterial) {
      const pulse = 0.9 + Math.sin(state.clock.elapsedTime * 5) * 0.1

      // ======================================
      // STREAM
      // ======================================

      if (reactionPhase === "stream") {
        cloud.visible = true

        const targetOpacity = streamCloudOpacity * pulse

        cloudMaterial.opacity = THREE.MathUtils.damp(
          cloudMaterial.opacity,
          targetOpacity,
          cloudShowSpeed,
          delta
        )

        cloudMaterial.color.lerp(
          streamCloudColorRef.current,
          Math.min(4 * delta, 1)
        )
      }

      // ======================================
      // FINAL DROPLETS
      // ======================================

      else if (reactionPhase === "droplets") {
        cloud.visible = true

        const targetOpacity = dropletCloudOpacity * pulse

        cloudMaterial.opacity = THREE.MathUtils.damp(
          cloudMaterial.opacity,
          targetOpacity,
          cloudShowSpeed,
          delta
        )

        cloudMaterial.color.lerp(
          dropletCloudColorRef.current,
          Math.min(5 * delta, 1)
        )
      }

      // ======================================
      // ENDPOINT / IDLE
      // ======================================

      else {
        cloudMaterial.opacity = THREE.MathUtils.damp(
          cloudMaterial.opacity,
          0,
          cloudFadeSpeed,
          delta
        )

        if (cloudMaterial.opacity < 0.01) {
          cloudMaterial.opacity = 0
          cloud.visible = false
        }
      }

      cloudMaterial.needsUpdate = true
      cloud.updateMatrixWorld(true)
    }

    // ========================================
    // MAIN LIQUID COLOR
    // ========================================

    const liquidMaterial = liquidMaterialRef.current

    if (!liquidMaterial) return

    // ======================================
    // BEFORE ENDPOINT
    // COLOURLESS
    // ======================================

    if (reactionPhase !== "endpoint") {
      if (originalLiquidColorRef.current) {
        liquidMaterial.color.lerp(
          originalLiquidColorRef.current,
          Math.min(3 * delta, 1)
        )
      }

      liquidMaterial.opacity = THREE.MathUtils.damp(
        liquidMaterial.opacity,
        originalLiquidOpacityRef.current,
        3,
        delta
      )
    }

    // ======================================
    // CORRECT ENDPOINT
    // WHOLE LIQUID PALE PINK
    // ======================================

    if (reactionPhase === "endpoint") {
      liquidMaterial.color.lerp(
        endpointColorRef.current,
        Math.min(endpointColorSpeed * delta, 1)
      )

      liquidMaterial.opacity = THREE.MathUtils.damp(
        liquidMaterial.opacity,
        endpointOpacity,
        endpointColorSpeed,
        delta
      )
    }

    liquidMaterial.needsUpdate = true

    // ======================================
    // ENDPOINT CONFIRMED
    // ======================================

    if (endpointConfirmed) {
      liquidMaterial.color.copy(endpointColorRef.current)
      liquidMaterial.opacity = endpointOpacity
      liquidMaterial.needsUpdate = true
      
      if(selectedLesson==11.1 && lessonStep==52){
        setLessonStep(53)
      }
      if(selectedLesson==11.1 && lessonStep==69){
        setLessonStep(70)
      }

      if(selectedLesson==12.2 && lessonStep==84){
        setLessonStep(85)
      }
    }


  })

  return null
}

export default HCLTitrationReaction