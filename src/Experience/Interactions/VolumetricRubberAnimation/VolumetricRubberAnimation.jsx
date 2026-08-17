import {
    useContext,
  useEffect,
  useRef,
} from "react"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const VolumetricRubberAnimation = ({
  modelRef,
  fillerScaleSpeed = 0.1,
  fillerMinScaleX = 0.45,
}) => {
  const fillerRef = useRef(null)
  const originalFillerScaleXRef = useRef(null)

  const {selectedLesson,lessonStep,setLessonStep}= useContext(MainGuidelineContext)

  useEffect(() => {
    if (!modelRef?.current) return

    modelRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (childName.includes("filler")) {
        fillerRef.current = child
        originalFillerScaleXRef.current = child.scale.x

        console.log("Filler found:", child)
      }
    })

    if (!fillerRef.current) {
      console.log("Filler child not found")
    }

    return () => {
      if (!fillerRef.current || originalFillerScaleXRef.current === null) return

      fillerRef.current.scale.x = originalFillerScaleXRef.current
      fillerRef.current.updateMatrixWorld(true)
    }
  }, [modelRef])

  const controlFillerScale = (direction) => {
    if (!fillerRef.current) return
    if (originalFillerScaleXRef.current === null) return

    const filler = fillerRef.current
    const originalScaleX = originalFillerScaleXRef.current

    if (direction === "down") {
      const previousScaleX = filler.scale.x

      filler.scale.x = Math.max(
        filler.scale.x - fillerScaleSpeed,
        fillerMinScaleX
      )

      if (previousScaleX > fillerMinScaleX && filler.scale.x === fillerMinScaleX) {
        console.log("Filler fully pressed down")
        if(selectedLesson===11 && lessonStep===7){
            setLessonStep(8)
        }
      }
    }

    if (direction === "up") {
      const previousScaleX = filler.scale.x

      filler.scale.x = Math.min(
        filler.scale.x + fillerScaleSpeed,
        originalScaleX
      )

      if (previousScaleX < originalScaleX && filler.scale.x === originalScaleX) {
        console.log("Filler fully released")
      }
    }

    filler.updateMatrixWorld(true)
  }

  useEffect(() => {
    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        controlFillerScale("down")
      }

      if (event.deltaY < 0) {
        controlFillerScale("up")
      }
    }

    window.addEventListener("wheel", handleWheel)

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [
    fillerScaleSpeed,
    fillerMinScaleX,
  ])

  return null
}

export default VolumetricRubberAnimation