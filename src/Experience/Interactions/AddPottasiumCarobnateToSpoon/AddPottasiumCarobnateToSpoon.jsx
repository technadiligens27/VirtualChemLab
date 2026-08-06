import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AddPottasiumCarobnateToSpoon = () => {
  const { spoonRef } = useContext(ModelContext)
  const {lessonStep,selectedLesson,setLessonStep} = useContext(MainGuidelineContext)

  const opacity = useRef(0)
  const pottasiumCarobnateMeshes = useRef([])

  useEffect(()=>{
    if(selectedLesson==8 && lessonStep==10){
        setLessonStep(11)
    }
  },[lessonStep,selectedLesson])

  useEffect(()=>{
    if(selectedLesson==9 && lessonStep==8){
        setLessonStep(9)
    }
  },[lessonStep,selectedLesson])


  useEffect(() => {
    const spoon = spoonRef.current

    if (!spoon) return

    spoon.traverse((child) => {
      if (
        child.isMesh &&
        child.name.toLowerCase().includes("pottasium-carbonate")
      ) {
        child.visible = true

        // Prevent changing another mesh using the same material
        child.material = child.material.clone()

        child.material.transparent = true
        child.material.opacity = 0
        child.material.depthWrite = false

        pottasiumCarobnateMeshes.current.push(child)
      }
    })
  }, [spoonRef])

  useFrame((state, delta) => {
    if (opacity.current >= 0.99) {
      opacity.current = 1
      return
    }

    // Smoothly move opacity towards 1
    opacity.current = THREE.MathUtils.lerp(
      opacity.current,
      1,
      4 * delta
    )

    pottasiumCarobnateMeshes.current.forEach((pottasiumCarobnate) => {
      pottasiumCarobnate.material.opacity = opacity.current
    })
  })

  return null
}

export default AddPottasiumCarobnateToSpoon