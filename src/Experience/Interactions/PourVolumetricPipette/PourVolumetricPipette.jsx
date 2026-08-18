import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PourVolumetricPipette = ({
  modelRef,
  otherModelRef,

  amount = 1,
  otherLiquidAmount = 0.6,

  scaleSpeed = 1,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const pourRef = useRef(null)
  const modelLiquidRef = useRef(null)
  const otherLiquidRef = useRef(null)

  const pourStartScaleRef = useRef(0)
  const modelLiquidStartScaleRef = useRef(0)
  const otherLiquidStartScaleRef = useRef(0)

  const progressRef = useRef(0)
  const isFinishedRef = useRef(false)

  useEffect(() => {
    if (!modelRef?.current || !otherModelRef?.current) return

    pourRef.current = null
    modelLiquidRef.current = null
    otherLiquidRef.current = null

    modelRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (childName.includes("pour")) {
        pourRef.current = child
      }

      if (childName.includes("liquid")) {
        modelLiquidRef.current = child
      }
    })

    otherModelRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (childName.includes("liquid")) {
        otherLiquidRef.current = child
      }
    })

    if (!pourRef.current) {
      console.log("Pour child not found")
      return
    }

    if (!modelLiquidRef.current) {
      console.log("Volumetric pipette liquid not found")
      return
    }

    if (!otherLiquidRef.current) {
      console.log("Other model liquid not found")
      return
    }

    pourStartScaleRef.current = pourRef.current.scale.y
    modelLiquidStartScaleRef.current = modelLiquidRef.current.scale.y
    otherLiquidStartScaleRef.current = otherLiquidRef.current.scale.y

    pourRef.current.visible = true
    modelLiquidRef.current.visible = true
    otherLiquidRef.current.visible = true

    progressRef.current = 0
    isFinishedRef.current = false

    console.log("Pour animation started")
    console.log("Pipette liquid start:", modelLiquidStartScaleRef.current)
    console.log("Pipette liquid target: 0")
    console.log("Other liquid start:", otherLiquidStartScaleRef.current)
    console.log("Other liquid target:", otherLiquidAmount)
  }, [
    modelRef,
    otherModelRef,
    amount,
    otherLiquidAmount,
  ])

  useFrame((_, delta) => {
    if (!pourRef.current || !modelLiquidRef.current || !otherLiquidRef.current) return
    if (isFinishedRef.current) return

    progressRef.current += scaleSpeed * delta

    const progress = Math.min(
      progressRef.current,
      1
    )

    /*
      Pour stream grows.
    */

    pourRef.current.scale.y =
      pourStartScaleRef.current +
      (amount - pourStartScaleRef.current) * progress

    /*
      Volumetric pipette liquid
      decreases all the way to zero.
    */

    modelLiquidRef.current.scale.y =
      modelLiquidStartScaleRef.current *
      (1 - progress)

    /*
      Receiving liquid increases
      to otherLiquidAmount.
    */

    otherLiquidRef.current.scale.y =
      otherLiquidStartScaleRef.current +
      (otherLiquidAmount - otherLiquidStartScaleRef.current) * progress

    pourRef.current.updateMatrixWorld(true)
    modelLiquidRef.current.updateMatrixWorld(true)
    otherLiquidRef.current.updateMatrixWorld(true)

    /*
      All finish on the same frame.
    */

    if (progress >= 1) {
      modelLiquidRef.current.scale.y = 0
      modelLiquidRef.current.visible = false

      otherLiquidRef.current.scale.y =
        otherLiquidAmount

      pourRef.current.scale.y = 0
      pourRef.current.visible = false

      pourRef.current.updateMatrixWorld(true)
      modelLiquidRef.current.updateMatrixWorld(true)
      otherLiquidRef.current.updateMatrixWorld(true)

      isFinishedRef.current = true

      console.log("Volumetric pipette pouring finished")
      console.log("Pipette liquid final:", modelLiquidRef.current.scale.y)
      console.log("Other liquid final:", otherLiquidRef.current.scale.y)

      if (selectedLesson === 11 && lessonStep === 14) {
        setLessonStep(15)
      }
    }
  })

  return null
}

export default PourVolumetricPipette