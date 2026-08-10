import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import FillPipette from "../FillLiquid/FIllPipette/FIllPipette"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"


const PipetteRubberAnimation = ({
  rubberScaleSpeed = 0.1,
  rubberMinScaleX = 0.45,

}) => {
  const { pipetteRef } = useContext(ModelContext)
  const { selectedLesson, lessonStep, setLessonStep } = useContext(MainGuidelineContext)
  const {fillPippette,setFillPipette,isPipetteFilled,setPipetteDroplet} = useContext(InteractionContext)

  const rubberRef = useRef(null)
  const originalRubberScaleXRef = useRef(null)

  const [fillAmount, setFillAmount] = useState(0)

  useEffect(() => {
    if (!pipetteRef?.current) return

    pipetteRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (childName.includes("rubber")) {
        rubberRef.current = child
        originalRubberScaleXRef.current = child.scale.x
      }
    })

    if (!rubberRef.current) {
      console.log("Rubber child not found")
    }

    return () => {
      if (!rubberRef.current || originalRubberScaleXRef.current === null) return

      rubberRef.current.scale.x = originalRubberScaleXRef.current
      rubberRef.current.updateMatrixWorld(true)
    }
  }, [pipetteRef])

  const controlRubberScale = (direction) => {
    if (!rubberRef.current) return
    if (originalRubberScaleXRef.current === null) return

    const rubber = rubberRef.current
    const originalScaleX = originalRubberScaleXRef.current

    if (direction === "down") {
      const previousScaleX = rubber.scale.x

      rubber.scale.x = Math.max(
        rubber.scale.x - rubberScaleSpeed,
        rubberMinScaleX
      )

      if (previousScaleX > rubberMinScaleX && rubber.scale.x === rubberMinScaleX) {
        if(isPipetteFilled){
          setPipetteDroplet(true)
        }
        if (selectedLesson === 10 && lessonStep === 43) {
          setLessonStep(44)
        }
      }
    }

    if (direction === "up") {
      const previousScaleX = rubber.scale.x

      rubber.scale.x = Math.min(
        rubber.scale.x + rubberScaleSpeed,
        originalScaleX
      )

      if(!isPipetteFilled){
        setFillPipette(true)

      }
      if (previousScaleX < originalScaleX && rubber.scale.x === originalScaleX) {
        console.log("Rubber fully released")

        if (selectedLesson === 10 && lessonStep === 45) {
          setLessonStep(46)
        }

        if (selectedLesson === 10 && lessonStep === 55) {
          setLessonStep(56)
        }
      }
    }

    rubber.updateMatrixWorld(true)
  }

  useEffect(() => {
    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        controlRubberScale("down")
      }

      if (event.deltaY < 0) {
        controlRubberScale("up")
      }
    }

    window.addEventListener("wheel", handleWheel)

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [
    rubberScaleSpeed,
    rubberMinScaleX,
    selectedLesson,
    lessonStep,
    setLessonStep,
    isPipetteFilled
  ])

  return (
    <>
   
    </>


  )
}

export default PipetteRubberAnimation