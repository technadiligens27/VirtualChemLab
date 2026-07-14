import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AddSaltToSpoon = () => {
  const { spoonRef } = useContext(ModelContext)
  const {lessonStep,selectedLesson,setLessonStep} = useContext(MainGuidelineContext)

  const opacity = useRef(0)
  const saltMeshes = useRef([])

  useEffect(()=>{
    if(selectedLesson==1 && lessonStep==7){
        setLessonStep(8)
    }
  },[lessonStep,selectedLesson])

  useEffect(() => {
    const spoon = spoonRef.current

    if (!spoon) return

    spoon.traverse((child) => {
      if (
        child.isMesh &&
        child.name.toLowerCase().includes("salt")
      ) {
        child.visible = true

        // Prevent changing another mesh using the same material
        child.material = child.material.clone()

        child.material.transparent = true
        child.material.opacity = 0
        child.material.depthWrite = false

        saltMeshes.current.push(child)
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

    saltMeshes.current.forEach((salt) => {
      salt.material.opacity = opacity.current
    })
  })

  return null
}

export default AddSaltToSpoon