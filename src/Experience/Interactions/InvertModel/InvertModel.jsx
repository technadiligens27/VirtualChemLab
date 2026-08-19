import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const InvertModel = ({
  modelRef,
  speed = 4,
}) => {

  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)
    
  const targetRotationRef = useRef(0)
  const reachedPositionRef = useRef("normal")

  useEffect(() => {
    const handleWheel = (event) => {
      if (!modelRef?.current) return

      if (event.deltaY > 0) {
        // Scroll down → upside down
        targetRotationRef.current = Math.PI
        reachedPositionRef.current = null
      }

      if (event.deltaY < 0) {
        // Scroll up → normal
        targetRotationRef.current = 0
        reachedPositionRef.current = null
      }
    }

    window.addEventListener("wheel", handleWheel)

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [modelRef])

  useFrame((_, delta) => {
    if (!modelRef?.current) return

    const currentRotation = modelRef.current.rotation.z
    const targetRotation = targetRotationRef.current

    const difference = targetRotation - currentRotation

    modelRef.current.rotation.z +=
      difference * Math.min(speed * delta, 1)

    // Fully upside down
    if (
      targetRotation === Math.PI &&
      Math.abs(difference) < 0.01 &&
      reachedPositionRef.current !== "upsideDown"
    ) {
      modelRef.current.rotation.z = Math.PI

      reachedPositionRef.current = "upsideDown"
       
      if(selectedLesson===11 && lessonStep===24){
        setLessonStep(25)
      }
      if(selectedLesson===11 && lessonStep===26){
        setLessonStep(27)
      }

     if(selectedLesson===11 && lessonStep===28){
        setLessonStep(29)
      }
      
      console.log("🔄 Flask fully upside down")
    }

    // Fully back to normal
    if (
      targetRotation === 0 &&
      Math.abs(difference) < 0.01 &&
      reachedPositionRef.current !== "normal"
    ) {
      modelRef.current.rotation.z = 0

      reachedPositionRef.current = "normal"

      if(selectedLesson===11 && lessonStep===25){
        setLessonStep(26)
      }

      if(selectedLesson===11 && lessonStep===27){
        setLessonStep(28)
      }   
     if(selectedLesson===11 && lessonStep===29){
        setLessonStep(30)
      }      
      
    }
  })

  return null
}

export default InvertModel