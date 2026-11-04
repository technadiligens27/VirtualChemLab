import {
    useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"
import { MainGuidelineContext } from "../../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PourFromWaterBottle = ({
  isPouring,

  modelRef,
  otherModelRef,

  // Final scale.y value of the receiving liquid
  otherLiquidAmount = 0.5,

  otherLiquidColor = "#EAFBFF",
  otherLiquidColorOpacity = 0.35,

  otherLiquidSpeed = 0.5,

  pourSpeed = 5,
}) => {

  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)  


  const pourRef = useRef(null)
  const otherLiquidRef = useRef(null)
  const hasFinishedRef = useRef(false)

  useEffect(() => {
    if (!modelRef?.current ||!otherModelRef?.current) {
      return
    }

    pourRef.current = null
    otherLiquidRef.current = null
    hasFinishedRef.current = false

    // ==========================================
    // FIND POUR CHILD IN WATER BOTTLE
    // ==========================================

    modelRef.current.traverse(
      (child) => {
        const name =
          child.name
            ?.toLowerCase() ||
          ""

        if (
          name.includes("pour")
        ) {
          pourRef.current =
            child

          child.visible =
            false

          child.scale.y =
            0
        }
      }
    )

    // ==========================================
    // FIND LIQUID CHILD IN RECEIVING MODEL
    // ==========================================

    otherModelRef.current.traverse(
      (child) => {
        const name =
          child.name
            ?.toLowerCase() ||
          ""

        if (
          name.includes("liquid")
        ) {
          otherLiquidRef.current =
            child

          child.visible =
            true

          if (
            child.material
          ) {
            child.material =
              child.material.clone()

            child.material.color.set(
              otherLiquidColor
            )

            child.material.transparent =
              true

            child.material.opacity =
              otherLiquidColorOpacity

            child.material.depthWrite =
              false

            child.material.needsUpdate =
              true
          }
        }
      }
    )
  }, [
    modelRef,
    otherModelRef,
    otherLiquidColor,
    otherLiquidColorOpacity,
  ])

  useFrame(
    (
      _,
      delta
    ) => {
      // ==========================================
      // NOT POURING
      // ==========================================

      if (!isPouring) {
        if (
          pourRef.current
        ) {
          pourRef.current.visible =
            false

          pourRef.current.scale.y =
            0
        }

        return
      }

      // ==========================================
      // POUR STREAM
      // ==========================================

      if (
        pourRef.current
      ) {
        const pour =
          pourRef.current

        pour.visible =
          true

        pour.scale.y =
          Math.min(
            1,
            pour.scale.y +
              pourSpeed *
                delta
          )
      }

      // ==========================================
      // RECEIVING LIQUID RISE
      // ==========================================

      if (
        otherLiquidRef.current
      ) {
        const liquid =
          otherLiquidRef.current

        liquid.visible =
          true

        liquid.scale.y =
          Math.min(
            otherLiquidAmount,
            liquid.scale.y +
              otherLiquidSpeed *
                delta
          )

        // ========================================
        // POURING FINISHED
        // ========================================

        if (
          liquid.scale.y >=
            otherLiquidAmount &&
          !hasFinishedRef.current
        ) {
          hasFinishedRef.current =
            true

          if(selectedLesson===11 && lessonStep ===21){
            setLessonStep(22)
          } 

          console.log(
            "Water bottle pouring finished"
          )

          console.log(
            "Final liquid amount:",
            liquid.scale.y
          )
        }
      }
    }
  )

  return null
}

export default PourFromWaterBottle