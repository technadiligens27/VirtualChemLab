import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

import HCLTitrationReaction from "../../AllReactions/HCLTitrationReaction/HCLTitrationReaction"
import SwirlModel from "../SwirlModel/SwirlModel"

const BuiretteTitrationFlow = ({
  modelRef,

  totalTime = 10,

  totalLiquidDecreasePercent = 80,
  dropletDecreasePercent = 12,

  streamTimeRatio = 0.8,

  pourScaleY = 80,
  pourSmoothSpeed = 3,

  dropletCount = 3,
  dropletFallDistance = 2,
  dropletDelay = 0.8,
  dropletFallSpeed = 1,

  endpointHoldTime = 5,
}) => {

  const { conicalBeakerRef } = useContext(ModelContext)
  const [showSwirlModel, setShowSwirlModel] = useState(false)

  const {
    showHCLTitrationReaction,
    setShowHCLTitrationReaction,
  } = useContext(InteractionContext)

  // ==========================================
  // REACTION STATE
  // ==========================================

  const [reactionPhase, setReactionPhase] =
    useState("idle")

  const [
    endpointConfirmed,
    setEndpointConfirmed,
  ] = useState(false)

  // ==========================================
  // BURETTE REFS
  // ==========================================

  const liquidRef = useRef(null)
  const pourRef = useRef(null)
  const dropletsRef = useRef([])

  const originalDropletPositionsRef = useRef([])

  // ==========================================
  // BURETTE LIQUID SCALES
  // ==========================================

  const startLiquidScaleRef = useRef(0)
  const streamEndScaleRef = useRef(0)
  const finalLiquidScaleRef = useRef(0)

  // ==========================================
  // ANIMATION STATE
  // ==========================================

  const elapsedTimeRef = useRef(0)
  const isStartedRef = useRef(false)
  const finishedRef = useRef(false)
  const dropletPhaseStartedRef = useRef(false)

  // ==========================================
  // SHARED TITRATION PROGRESS
  // ==========================================

  const titrationProgressRef = useRef(0)

  // ==========================================
  // FIND BURETTE CHILDREN
  // ==========================================

  useEffect(() => {
    if (!modelRef?.current) return

    const model = modelRef.current

    let liquidObject = null
    let pourObject = null

    const foundDroplets = []

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        child.isMesh &&
        childName.includes("liquid")
      ) {
        liquidObject = child
      }

      if (
        child.isMesh &&
        childName.includes("pour")
      ) {
        pourObject = child
      }

      if (
        child.isMesh &&
        childName.includes("droplet")
      ) {
        foundDroplets.push(child)
      }
    })

    if (!liquidObject) {
      console.log("❌ Burette liquid not found")
      return
    }

    liquidRef.current = liquidObject

    // ========================================
    // BURETTE LIQUID CALCULATIONS
    // ========================================

    const currentScale =
      liquidObject.scale.y

    startLiquidScaleRef.current =
      currentScale

    const totalDecrease =
      currentScale *
      (totalLiquidDecreasePercent / 100)

    const dropletDecrease =
      totalDecrease *
      (dropletDecreasePercent / 100)

    const streamDecrease =
      totalDecrease - dropletDecrease

    streamEndScaleRef.current =
      Math.max(
        currentScale - streamDecrease,
        0
      )

    finalLiquidScaleRef.current =
      Math.max(
        currentScale - totalDecrease,
        0
      )

    // ========================================
    // POUR STREAM
    // ========================================

    if (pourObject) {
      pourRef.current = pourObject

      pourObject.visible = false
      pourObject.scale.y = 0
    } else {
      console.log(
        "❌ Burette pour child not found"
      )
    }

    // ========================================
    // DROPLETS
    // ========================================

    const selectedDroplets =
      foundDroplets.slice(
        0,
        dropletCount
      )

    dropletsRef.current =
      selectedDroplets

    originalDropletPositionsRef.current =
      selectedDroplets.map((droplet) =>
        droplet.position.clone()
      )

    selectedDroplets.forEach((droplet) => {
      droplet.visible = false
    })

    // ========================================
    // RESET
    // ========================================

    elapsedTimeRef.current = 0
    titrationProgressRef.current = 0

    isStartedRef.current = false
    finishedRef.current = false
    dropletPhaseStartedRef.current = false

    setReactionPhase("idle")
    setEndpointConfirmed(false)

    console.log("✅ Titration ready")
    console.log(
      "Starting BURETTE scale:",
      currentScale
    )
    console.log(
      "Stream end scale:",
      streamEndScaleRef.current
    )
    console.log(
      "Final BURETTE scale:",
      finalLiquidScaleRef.current
    )

    // ========================================
    // CLEANUP
    // ========================================

    return () => {
      if (pourRef.current) {
        pourRef.current.visible = false
        pourRef.current.scale.y = 0
      }

      dropletsRef.current.forEach(
        (droplet, index) => {
          const originalPosition =
            originalDropletPositionsRef.current[
              index
            ]

          if (originalPosition) {
            droplet.position.copy(
              originalPosition
            )
          }

          droplet.visible = false

          droplet.updateMatrixWorld(true)
        }
      )
    }
  }, [
    modelRef,
    totalLiquidDecreasePercent,
    dropletDecreasePercent,
    dropletCount,
  ])

  // ==========================================
  // START TITRATION ON SCROLL DOWN
  // ==========================================

  useEffect(() => {
      const handleWheel = (event) => {
        if (event.deltaY <= 0) return
        if (isStartedRef.current) return
        if (finishedRef.current) return
        if (!liquidRef.current) return

        isStartedRef.current = true
        elapsedTimeRef.current = 0
        titrationProgressRef.current = 0
        dropletPhaseStartedRef.current = false

        setEndpointConfirmed(false)
        setShowHCLTitrationReaction(true)

        // render SwirlModel
        setShowSwirlModel(true)

        setReactionPhase("stream")

        console.log("✅ Titration started")
      }

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: true,
      }
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [setShowHCLTitrationReaction])

  // ==========================================
  // TITRATION ANIMATION
  // ==========================================

  useFrame((_, delta) => {
    if (!isStartedRef.current) return
    if (finishedRef.current) return

    const liquid = liquidRef.current

    if (!liquid) return

    // ========================================
    // TIME
    // ========================================

    elapsedTimeRef.current += delta

    const elapsed =
      elapsedTimeRef.current

    // ========================================
    // SHARED PROGRESS
    // ========================================

    titrationProgressRef.current =
      Math.min(
        elapsed / totalTime,
        1
      )

    // ========================================
    // PHASE TIMES
    // ========================================

    const streamTime =
      totalTime * streamTimeRatio

    const dropletTime =
      totalTime - streamTime

    // ========================================
    // PHASE 1
    // CONTINUOUS STREAM
    // ========================================

    if (elapsed < streamTime) {
      if (pourRef.current) {
        pourRef.current.visible = true

        pourRef.current.scale.y =
          THREE.MathUtils.damp(
            pourRef.current.scale.y,
            pourScaleY,
            pourSmoothSpeed,
            delta
          )
      }

      const streamProgress =
        Math.min(
          elapsed / streamTime,
          1
        )

      liquid.scale.y =
        THREE.MathUtils.lerp(
          startLiquidScaleRef.current,
          streamEndScaleRef.current,
          streamProgress
        )

      liquid.updateMatrixWorld(true)

      return
    }

    // ========================================
    // PHASE 2
    // FINAL DROPLETS
    // ========================================

    if (
      !dropletPhaseStartedRef.current
    ) {
      dropletPhaseStartedRef.current =
        true

      setReactionPhase("droplets")

      console.log(
        "💧 Reaction phase: DROPLETS"
      )
    }

    if (pourRef.current) {
      pourRef.current.visible = false
      pourRef.current.scale.y = 0
    }

    const dropletElapsed =
      elapsed - streamTime

    const dropletProgress =
      Math.min(
        dropletElapsed / dropletTime,
        1
      )

    // ========================================
    // BURETTE LIQUID
    // ========================================

    liquid.scale.y =
      THREE.MathUtils.lerp(
        streamEndScaleRef.current,
        finalLiquidScaleRef.current,
        dropletProgress
      )

    liquid.updateMatrixWorld(true)

    // ========================================
    // DROPLET ANIMATION
    // ========================================

    let finishedDroplets = 0

    dropletsRef.current.forEach(
      (droplet, index) => {
        const originalPosition =
          originalDropletPositionsRef.current[
            index
          ]

        if (!originalPosition) return

        const startTime =
          index * dropletDelay

        if (
          dropletElapsed < startTime
        ) {
          droplet.visible = false
          return
        }

        // ====================================
        // DROPLET VISIBILITY FIX
        // ====================================

        droplet.visible = true

        droplet.traverse((child) => {
          child.visible = true
        })

        // ====================================
        // EXISTING DROPLET LOGIC
        // ====================================

        const targetY =
          originalPosition.y -
          dropletFallDistance

        droplet.position.y -=
          dropletFallSpeed * delta

        if (
          droplet.position.y <= targetY
        ) {
          droplet.position.y = targetY
          droplet.visible = false

          finishedDroplets += 1
        }

        droplet.updateMatrixWorld(true)
      }
    )

    // ========================================
    // CORRECT ENDPOINT REACHED
    // ========================================

    if (
      dropletProgress >= 1 &&
      finishedDroplets ===
        dropletsRef.current.length
    ) {
      finishedRef.current = true
      isStartedRef.current = false

      titrationProgressRef.current = 1

      liquid.scale.y =
        finalLiquidScaleRef.current

      setReactionPhase("endpoint")

      if (pourRef.current) {
        pourRef.current.visible = false
        pourRef.current.scale.y = 0
      }

      dropletsRef.current.forEach(
        (droplet) => {
          droplet.visible = false
        }
      )

      console.log(
        "🌸 Pale pink endpoint visual started"
      )

      console.log(
        "⏱️ Starting 5-second endpoint timer"
      )

      console.log(
        "Final BURETTE liquid scale:",
        liquid.scale.y
      )
    }
  })

  // ==========================================
  // 5 SECOND ENDPOINT CONFIRMATION
  // ==========================================

  useEffect(() => {
    if (
      reactionPhase !== "endpoint"
    ) {
      return
    }

    setEndpointConfirmed(false)

    const timer = setTimeout(() => {
      setEndpointConfirmed(true)

      console.log(
        "✅ Endpoint reached"
      )

      console.log(
        `✅ Pale pink persisted for ${endpointHoldTime} seconds`
      )
    }, endpointHoldTime * 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [
    reactionPhase,
    endpointHoldTime,
  ])

  return (
    <>
      {showHCLTitrationReaction && (
        <HCLTitrationReaction
          modelRef={conicalBeakerRef}
          amount={0.1}
          progressRef={titrationProgressRef}
          reactionPhase={reactionPhase}
          endpointConfirmed={endpointConfirmed}

          streamCloudColor="#FF6FA8"
          streamCloudOpacity={0.32}

          dropletCloudColor="#ff7db3"
          dropletCloudOpacity={0.5}

          cloudShowSpeed={5}
          cloudFadeSpeed={2.5}

          endpointColor="#F3AFC8"
          endpointOpacity={0.38}
          endpointColorSpeed={1.2}
        />
      )}

      {showSwirlModel && (
        <SwirlModel
          modelRef={conicalBeakerRef}
        />
      )}
    </>
  )
}

export default BuiretteTitrationFlow