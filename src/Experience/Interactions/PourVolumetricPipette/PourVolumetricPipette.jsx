import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

const PourVolumetricPipette = ({
  modelRef,
  otherModelRef,

  // Final Y-scale of the visible pour stream.
  pourScaleAmount = 1,

  // Amount added to the receiving liquid.
  otherLiquidAmount = 0.25,

  otherLiquidColor = "#ffffff",
  otherLiquidOpacity = null,

  // Source and receiver liquid transfer speed.
  scaleSpeed = 0.5,

  // Pour-stream scale animation speed.
  pourScaleSpeed = 2,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const {
    setPourFromVolumetricPipette,
    setIsVolumetricPipetteFilled,
  } = useContext(
    InteractionContext
  )

  const pourRef = useRef(null)
  const modelLiquidRef = useRef(null)
  const verticalRef = useRef(null)
  const otherLiquidRef = useRef(null)

  const pourStartScaleRef = useRef(0)
  const modelLiquidStartScaleRef =
    useRef(0)

  const verticalStartScaleRef = useRef(0)
  const otherLiquidStartScaleRef =
    useRef(0)

  const pourProgressRef = useRef(0)
  const verticalProgressRef = useRef(0)
  const liquidProgressRef = useRef(0)

  const isVerticalFinishedRef = useRef(false)
  const isFinishedRef = useRef(false)

  // =========================================
  // FIND LIQUIDS AND POUR STREAM
  // =========================================

  useEffect(() => {
    const model = modelRef?.current
    const otherModel = otherModelRef?.current

    if (!model || !otherModel) {
      return
    }

    pourRef.current = null
    modelLiquidRef.current = null
    verticalRef.current = null
    otherLiquidRef.current = null

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (childName.includes("pour")) {
        pourRef.current = child
      }

      if (
        childName.includes("liquid") &&
        !childName.includes("vertical")
      ) {
        modelLiquidRef.current = child
      }

      if (childName.includes("vertical")) {
        verticalRef.current = child
      }
    })

    otherModel.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (childName.includes("liquid")) {
        otherLiquidRef.current = child
      }
    })

    if (!pourRef.current) {
      console.log("❌ Pour child not found")
      return
    }

    if (!modelLiquidRef.current) {
      console.log(
        "❌ Volumetric pipette liquid not found"
      )
      return
    }

    if (!otherLiquidRef.current) {
      console.log(
        "❌ Other model liquid not found"
      )
      return
    }

    pourStartScaleRef.current =
      pourRef.current.scale.y

    modelLiquidStartScaleRef.current =
      modelLiquidRef.current.scale.y

    otherLiquidStartScaleRef.current =
      otherLiquidRef.current.scale.y

    if (verticalRef.current) {
      verticalStartScaleRef.current =
        verticalRef.current.scale.y
    }

    // =======================================
    // RECEIVER LIQUID MATERIAL
    // =======================================

    const receiverLiquid =
      otherLiquidRef.current

    const updateMaterial = (material) => {
      if (!material) {
        return material
      }

      const clonedMaterial = material.clone()

      if (
        otherLiquidColor !== null &&
        clonedMaterial.color
      ) {
        clonedMaterial.color.set(
          otherLiquidColor
        )
      }

      if (otherLiquidOpacity !== null) {
        clonedMaterial.transparent = true
        clonedMaterial.opacity =
          otherLiquidOpacity

        clonedMaterial.depthWrite = false
      }

      clonedMaterial.needsUpdate = true

      return clonedMaterial
    }

    if (
      otherLiquidColor !== null ||
      otherLiquidOpacity !== null
    ) {
      if (
        Array.isArray(receiverLiquid.material)
      ) {
        receiverLiquid.material =
          receiverLiquid.material.map(
            updateMaterial
          )
      } else if (receiverLiquid.material) {
        receiverLiquid.material =
          updateMaterial(
            receiverLiquid.material
          )
      }

      receiverLiquid.updateMatrixWorld(true)
    }

    // =======================================
    // VISIBILITY
    // =======================================

    pourRef.current.visible = true
    modelLiquidRef.current.visible = true
    otherLiquidRef.current.visible = true

    if (verticalRef.current) {
      verticalRef.current.visible = true
    }

    // =======================================
    // RESET ANIMATION
    // =======================================

    pourProgressRef.current = 0
    verticalProgressRef.current = 0
    liquidProgressRef.current = 0

    isVerticalFinishedRef.current = false
    isFinishedRef.current = false
  }, [
    modelRef,
    otherModelRef,
    pourScaleAmount,
    otherLiquidAmount,
    otherLiquidColor,
    otherLiquidOpacity,
  ])

  // =========================================
  // FINISH TRANSFER
  // =========================================

  const finishTransfer = () => {
    if (isFinishedRef.current) {
      return
    }

    isFinishedRef.current = true

    if (modelLiquidRef.current) {
      modelLiquidRef.current.scale.y = 0
      modelLiquidRef.current.visible = false
    }

    if (verticalRef.current) {
      verticalRef.current.scale.y = 0
      verticalRef.current.visible = false
    }

    if (otherLiquidRef.current) {
      otherLiquidRef.current.scale.y =
        otherLiquidStartScaleRef.current +
        otherLiquidAmount

      otherLiquidRef.current.visible = true
    }

    if (pourRef.current) {
      pourRef.current.scale.y = 0
      pourRef.current.visible = false
    }

    modelLiquidRef.current?.updateMatrixWorld(
      true
    )

    verticalRef.current?.updateMatrixWorld(true)

    otherLiquidRef.current?.updateMatrixWorld(
      true
    )

    pourRef.current?.updateMatrixWorld(true)

    setPourFromVolumetricPipette(false)

    setIsVolumetricPipetteFilled(false)

    if (
      selectedLesson === 11 &&
      lessonStep === 14
    ) {
      setLessonStep(15)
    }

    if (
      selectedLesson === 12.2 &&
      lessonStep === 74
    ) {
      setLessonStep(75)
    }

    if (
      selectedLesson === 12.2 &&
      lessonStep === 98
    ) {
      setLessonStep(99)
    }
  }

  // =========================================
  // ANIMATION
  // =========================================

  useFrame((_, delta) => {
    if (
      !pourRef.current ||
      !modelLiquidRef.current ||
      !otherLiquidRef.current ||
      isFinishedRef.current
    ) {
      return
    }

    // =======================================
    // POUR STREAM
    // =======================================

    if (pourProgressRef.current < 1) {
      pourProgressRef.current +=
        pourScaleSpeed * delta

      const pourProgress = Math.min(
        pourProgressRef.current,
        1
      )

      pourRef.current.visible = true

      pourRef.current.scale.y =
        pourStartScaleRef.current +
        (
          pourScaleAmount -
          pourStartScaleRef.current
        ) *
          pourProgress

      pourRef.current.updateMatrixWorld(true)
    }

    // =======================================
    // STAGE 1: EMPTY VERTICAL LIQUID
    // =======================================

    if (
      verticalRef.current &&
      !isVerticalFinishedRef.current
    ) {
      verticalProgressRef.current +=
        scaleSpeed * delta

      const progress = Math.min(
        verticalProgressRef.current,
        1
      )

      verticalRef.current.scale.y =
        verticalStartScaleRef.current *
        (1 - progress)

      const totalProgress = progress * 0.5

      otherLiquidRef.current.scale.y =
        otherLiquidStartScaleRef.current +
        otherLiquidAmount * totalProgress

      verticalRef.current.updateMatrixWorld(true)

      otherLiquidRef.current.updateMatrixWorld(
        true
      )

      if (progress >= 1) {
        verticalRef.current.scale.y = 0
        verticalRef.current.visible = false

        isVerticalFinishedRef.current = true
      }

      return
    }

    if (
      !verticalRef.current &&
      !isVerticalFinishedRef.current
    ) {
      isVerticalFinishedRef.current = true
    }

    // =======================================
    // STAGE 2: EMPTY NORMAL LIQUID
    // =======================================

    liquidProgressRef.current +=
      scaleSpeed * delta

    const progress = Math.min(
      liquidProgressRef.current,
      1
    )

    modelLiquidRef.current.scale.y =
      modelLiquidStartScaleRef.current *
      (1 - progress)

    pourRef.current.visible = true

    const totalProgress =
      0.5 + progress * 0.5

    otherLiquidRef.current.scale.y =
      otherLiquidStartScaleRef.current +
      otherLiquidAmount * totalProgress

    modelLiquidRef.current.updateMatrixWorld(
      true
    )

    otherLiquidRef.current.updateMatrixWorld(
      true
    )

    pourRef.current.updateMatrixWorld(true)

    if (progress >= 1) {
      modelLiquidRef.current.scale.y = 0

      otherLiquidRef.current.scale.y =
        otherLiquidStartScaleRef.current +
        otherLiquidAmount

      finishTransfer()
    }
  })

  return null
}

export default PourVolumetricPipette