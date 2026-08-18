import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const FillVolumetricPipette = ({
  modelRef,
  otherModelRef,

  amount = 0.6,
  decreaseAmount = 0,

  fillSpeed = 1,
}) => {
  const liquidRef = useRef(null)
  const otherLiquidRef = useRef(null)

  const startScaleRef = useRef(0)
  const otherStartScaleRef = useRef(0)

  const progressRef = useRef(0)
  const isFinishedRef = useRef(false)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const {setIsVolumetricPipetteFilled,isVolumetricPipetteFilled} = useContext(InteractionContext)

  useEffect(() => {
    if (selectedLesson === 11 && lessonStep === 9) {
      setLessonStep(10)
    }
  }, [selectedLesson, lessonStep, setLessonStep])

  useEffect(() => {
    if (!modelRef?.current || !otherModelRef?.current) return

    liquidRef.current = null
    otherLiquidRef.current = null

    modelRef.current.traverse((child) => {
      if (child.name?.toLowerCase().includes("liquid")) {
        liquidRef.current = child
      }
    })

    otherModelRef.current.traverse((child) => {
      if (child.name?.toLowerCase().includes("liquid")) {
        otherLiquidRef.current = child
      }
    })

    if (!liquidRef.current) {
      console.log("Volumetric pipette liquid not found")
      return
    }

    if (!otherLiquidRef.current) {
      console.log("Other model liquid not found")
      return
    }

    liquidRef.current.visible = true
    otherLiquidRef.current.visible = true

    startScaleRef.current = liquidRef.current.scale.y
    otherStartScaleRef.current = otherLiquidRef.current.scale.y

    progressRef.current = 0
    isFinishedRef.current = false
  }, [modelRef, otherModelRef, amount, decreaseAmount])

  useFrame((state, delta) => {
    if (!liquidRef.current || !otherLiquidRef.current) return
    if (isFinishedRef.current) return

    progressRef.current += fillSpeed * delta

    const progress = Math.min(progressRef.current, 1)

    liquidRef.current.scale.y =
      startScaleRef.current +
      (amount - startScaleRef.current) * progress

    otherLiquidRef.current.scale.y =
      otherStartScaleRef.current +
      (decreaseAmount - otherStartScaleRef.current) * progress

    liquidRef.current.updateMatrixWorld(true)
    otherLiquidRef.current.updateMatrixWorld(true)

    if (progress >= 1) {
      liquidRef.current.scale.y = amount
      otherLiquidRef.current.scale.y = decreaseAmount

      isFinishedRef.current = true

      console.log("Liquid transfer finished")
      console.log("Pipette liquid:", amount)
      console.log("Other liquid:", decreaseAmount)
      setIsVolumetricPipetteFilled(true)
    }
  })

  return null
}

export default FillVolumetricPipette