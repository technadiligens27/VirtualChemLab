import { useFrame } from "@react-three/fiber"
import { useContext } from "react"
import * as THREE from "three"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const LitmusReaction = ({ litmusRef, type }) => {

  const {lessonStep,setLessonStep} = useContext(MainGuidelineContext)

  let progress = 0

  useFrame((state, delta) => {
    if (!litmusRef?.current || !type) return

    const material = litmusRef.current.material
    if (!material) return

    const targetColor = new THREE.Color(
      type === "acid" ? "#000000" : "#0000ff"
    )

    progress += delta / 2 

    material.color.lerp(targetColor, progress)
    material.needsUpdate = true

    if (progress >= 1) {
      if(lessonStep ==8){
        setLessonStep(9);
      }
      progress = 1
    }
  })

  return null
}

export default LitmusReaction