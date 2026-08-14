import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { InteractionContext } from "../../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import AddMoreLiquid from "../../AddMoreLiquid/AddMoreLiquid"
import IodobutaneHydolysisReaction from "../../../AllReactions/IodobutaneHydolysisReaction/IodobutaneHydolysisReaction"

const FillLiquidBeaker = ({
  modelRef,
  amount,
  color,
  isPouring,
  pourModelRef,
}) => {
  const {
    setBeakerFillFinished,
    setIsPouring,
    isAddMoreLiquid,
    setIsAddMoreLiquid,showIodobutanePrecipitate,
    setShowIodobutanePrecipitate
  } = useContext(InteractionContext)

  const {
    setLessonStep,
    selectedLesson,
    lessonStep,
  } = useContext(MainGuidelineContext)

  const liquidRef = useRef(null)
  const isFinishedRef = useRef(false)

  useEffect(() => {
    if (!modelRef?.current) return

    modelRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (child.isMesh && childName.includes("liquid")) {
        liquidRef.current = child

        if (child.material) child.material = child.material.clone()

        if (color) {
          child.material.color.set(color)
          child.material.needsUpdate = true
        }
      }
    })

    if (!liquidRef.current) console.log("❌ No liquid child found")
  }, [modelRef, color])

  useEffect(() => {
    if (!isPouring || !liquidRef.current || !pourModelRef?.current) return

    let pourLiquidHasLiquid = false

    pourModelRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (child.isMesh && childName.includes("liquid") && child.scale.y > 0) {
        pourLiquidHasLiquid = true
      }
    })

    if (liquidRef.current.scale.y > 0 && pourLiquidHasLiquid) {
      setIsAddMoreLiquid(true)
    }
  }, [isPouring, pourModelRef, setIsAddMoreLiquid])

  useFrame((_, delta) => {
    if (!modelRef?.current || !liquidRef.current) return
    if (!isPouring) return

    // AddMoreLiquid handles the animation instead
    if (isAddMoreLiquid) return

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
      {isAddMoreLiquid && isPouring && (
        <AddMoreLiquid
          pourModelRef={pourModelRef}
          liquidRef={liquidRef}
          amount={10}
          speed={10}
        />
      )}

          {showIodobutanePrecipitate && <IodobutaneHydolysisReaction modelRef={modelRef} liquidRef={liquidRef}/>}

    </>
  )
}

export default FillLiquidBeaker