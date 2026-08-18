import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"
import { MainGuidelineContext } from "../../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PourFromBeaker = ({
  modelRef,
  otherModelRef,
  isPouring,
  pourAmount = 10,
  liquidAmount = 0.4,
  pourSpeed = 1,
}) => {

  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)

  const pourRef = useRef(null)
  const liquidRef = useRef(null)
  const otherLiquidRef = useRef(null)

  const sourceStartScaleRef = useRef(0)
  const otherStartScaleRef = useRef(0)

  const progressRef = useRef(0)
  const isFinishedRef = useRef(false)
  const hasSourceLiquidRef = useRef(false)

  useEffect(() => {
    if (!modelRef?.current || !otherModelRef?.current) return

    pourRef.current = null
    liquidRef.current = null
    otherLiquidRef.current = null

    modelRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (childName.includes("pour")) {
        pourRef.current = child
      }

      if (childName.includes("liquid")) {
        liquidRef.current = child
      }
    })

    otherModelRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (childName.includes("liquid")) {
        otherLiquidRef.current = child
      }
    })

    if (pourRef.current && liquidRef.current) {
      pourRef.current.material = liquidRef.current.material.clone()
      pourRef.current.scale.y = 0
      pourRef.current.visible = false
    }

    progressRef.current = 0
    isFinishedRef.current = false
    hasSourceLiquidRef.current = false
  }, [modelRef, otherModelRef])

  useEffect(() => {
    if (!pourRef.current || !liquidRef.current || !otherLiquidRef.current) return

    if (isPouring) {
      sourceStartScaleRef.current = liquidRef.current.scale.y
      otherStartScaleRef.current = otherLiquidRef.current.scale.y

      /*
        Check whether source actually
        contains liquid.
      */

      hasSourceLiquidRef.current =
        liquidRef.current.scale.y > 0

      if (!hasSourceLiquidRef.current) {
        pourRef.current.scale.y = 0
        pourRef.current.visible = false

        console.log("Cannot pour: source liquid is empty")

        return
      }

      progressRef.current = 0
      isFinishedRef.current = false

      pourRef.current.scale.y = 0
      pourRef.current.visible = true

      liquidRef.current.visible = true
      otherLiquidRef.current.visible = true
    } else {
      pourRef.current.scale.y = 0
      pourRef.current.visible = false

      progressRef.current = 0
      isFinishedRef.current = false
      hasSourceLiquidRef.current = false
    }

    pourRef.current.updateMatrixWorld(true)
  }, [isPouring])

  useFrame((_, delta) => {
    if (!isPouring) return
    if (!hasSourceLiquidRef.current) return
    if (!pourRef.current || !liquidRef.current || !otherLiquidRef.current) return
    if (isFinishedRef.current) return

    /*
      Extra safety:
      if source becomes empty,
      immediately stop transfer.
    */

    if (liquidRef.current.scale.y <= 0) {
      liquidRef.current.scale.y = 0
      liquidRef.current.visible = false

      pourRef.current.scale.y = 0
      pourRef.current.visible = false

      hasSourceLiquidRef.current = false
      isFinishedRef.current = true

      console.log("Pour stopped: source liquid empty")

      return
    }

    progressRef.current = Math.min(
      progressRef.current + pourSpeed * delta,
      1
    )

    const progress = progressRef.current

    /*
      Pour stream grows.
    */

    pourRef.current.visible = true

    pourRef.current.scale.y =
      pourAmount * progress

    /*
      Source liquid decreases.
    */

    liquidRef.current.scale.y =
      sourceStartScaleRef.current * (1 - progress)

    /*
      Receiver increases ONLY because
      source liquid exists.
    */

    otherLiquidRef.current.scale.y =
      otherStartScaleRef.current +
      liquidAmount * progress

    /*
      Everything finishes together.
    */

    if (progress >= 1) {
      liquidRef.current.scale.y = 0
      liquidRef.current.visible = false

      otherLiquidRef.current.scale.y =
        otherStartScaleRef.current + liquidAmount

      pourRef.current.scale.y = 0
      pourRef.current.visible = false

      hasSourceLiquidRef.current = false
      isFinishedRef.current = true

      console.log("Beaker pouring finished")
      if(selectedLesson==11 && lessonStep===21){
        setLessonStep(22)
      }
    }

    liquidRef.current.updateMatrixWorld(true)
    otherLiquidRef.current.updateMatrixWorld(true)
    pourRef.current.updateMatrixWorld(true)
  })

  return null
}

export default PourFromBeaker