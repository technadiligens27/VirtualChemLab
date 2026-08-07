import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { ModelContext } from "../../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import LiquidLabels from "../../../../UI/LiquidLabels/LiquidLabels"

const FillLiquidBeaker = ({ amount, color }) => {
  const { normalBeakerRef } = useContext(ModelContext)

  const {
    setBeakerFillFinished,
    setIsPouring,
  } = useContext(InteractionContext)

  const {
    setLessonStep,
    selectedLesson,
    lessonStep,
  } = useContext(MainGuidelineContext)

  const liquidRef = useRef(null)
  const isFinishedRef = useRef(false)

  useEffect(() => {
    if (!normalBeakerRef.current || liquidRef.current) {
      return
    }

    normalBeakerRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (child.isMesh && childName.includes("liquid")) {
        liquidRef.current = child

        if (child.material) {
          child.material = child.material.clone()
        }

        if (color) {
          child.material.color.set(color)
        }
      }
    })
  }, [normalBeakerRef, color])

  useFrame((_, delta) => {
    if (!normalBeakerRef.current || !liquidRef.current) {
      return
    }

    liquidRef.current.visible = true

    if (liquidRef.current.scale.y < amount) {
      liquidRef.current.scale.y = Math.min(
        liquidRef.current.scale.y + delta * 25,
        amount
      )
    }

    if (liquidRef.current.scale.y >= amount && !isFinishedRef.current) {
      isFinishedRef.current = true

      setBeakerFillFinished(true)
      setIsPouring(false)

      if (selectedLesson === 10 && lessonStep === 6) {
        setLessonStep(7)
      }
    }
  })

  return (
    <>
      <LiquidLabels modelRef={normalBeakerRef} hand={"left"} />
    </>
  )
}

export default FillLiquidBeaker