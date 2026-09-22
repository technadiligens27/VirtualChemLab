import {
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

const FillConicalBeaker = ({
  modelRef,

  amount = 1,
  fillSpeed = 1,

  color = "#ffffff",
  opacity = 0.3,
}) => {
  const liquidRef =
    useRef(null)

  const startScaleYRef =
    useRef(0)

  const progressRef =
    useRef(0)

  const isFinishedRef =
    useRef(false)

  const debugTimerRef =
    useRef(0)

  useEffect(() => {
    const model =
      modelRef?.current

    if (!model) {
      console.log(
        "[FillConicalBeaker] modelRef.current is missing"
      )

      return
    }

    liquidRef.current = null

    const liquidMeshes = []

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        child.isMesh &&
        childName.includes("liquid")
      ) {
        liquidMeshes.push(child)
      }
    })

    console.log(
      "[FillConicalBeaker] liquid mesh count:",
      liquidMeshes.length
    )

    if (!liquidMeshes.length) {
      console.log(
        "[FillConicalBeaker] No liquid mesh was found"
      )

      return
    }

    // ==========================================
    // MAKE ALL LIQUID MESHES VISIBLE
    // ==========================================

    liquidMeshes.forEach((liquid) => {
      liquid.visible = true

      liquid.updateMatrixWorld(true)

      console.log(
        "[FillConicalBeaker] Liquid made visible:",
        liquid.name
      )
    })

    // ==========================================
    // USE LAST LIQUID FOR FILL ANIMATION
    // ==========================================

    liquidRef.current =
      liquidMeshes[
        liquidMeshes.length - 1
      ]

    const liquid =
      liquidRef.current

    // ==========================================
    // MATERIAL
    // ==========================================

    if (liquid.material) {
      liquid.material =
        liquid.material.clone()

      liquid.material.transparent =
        true

      liquid.material.opacity =
        opacity

      if (liquid.material.color) {
        liquid.material.color.set(
          color
        )
      }

      liquid.material.needsUpdate =
        true
    }

    // ==========================================
    // FILL START
    // ==========================================

    startScaleYRef.current =
      liquid.scale.y

    progressRef.current = 0

    isFinishedRef.current =
      false

    debugTimerRef.current = 0

    console.log(
      "[FillConicalBeaker] Selected liquid:",
      {
        name: liquid.name,
        visible: liquid.visible,
        startingScaleY:
          startScaleYRef.current,
        targetAmount: amount,
        opacity,
        color,
      }
    )
  }, [
    modelRef,
    amount,
    color,
    opacity,
  ])

  useFrame((_, delta) => {
    const liquid =
      liquidRef.current

    if (!liquid) return

    if (
      isFinishedRef.current
    ) {
      return
    }

    // ==========================================
    // FILL PROGRESS
    // ==========================================

    progressRef.current +=
      fillSpeed * delta

    const progress =
      Math.min(
        progressRef.current,
        1
      )

    liquid.scale.y =
      startScaleYRef.current +
      (
        amount -
        startScaleYRef.current
      ) *
        progress

    liquid.visible = true

    liquid.updateMatrixWorld(true)

    // ==========================================
    // DEBUG
    // ==========================================

    debugTimerRef.current +=
      delta

    if (
      debugTimerRef.current >=
      0.5
    ) {
      debugTimerRef.current = 0

      console.log(
        "[FillConicalBeaker] Filling state:",
        {
          name: liquid.name,
          visible:
            liquid.visible,
          scaleY:
            liquid.scale.y,
          targetAmount:
            amount,
          progress,
          parentVisible:
            liquid.parent
              ?.visible,
        }
      )
    }

    // ==========================================
    // FINISHED
    // ==========================================

    if (progress >= 1) {
      liquid.scale.y =
        amount

      liquid.visible = true

      liquid.updateMatrixWorld(
        true
      )

      isFinishedRef.current =
        true

      console.log(
        "[FillConicalBeaker] Filling finished:",
        {
          name: liquid.name,
          visible:
            liquid.visible,
          finalScaleY:
            liquid.scale.y,
        }
      )
    }
  })

  return null
}

export default FillConicalBeaker