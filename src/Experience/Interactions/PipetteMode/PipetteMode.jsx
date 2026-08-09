import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useThree } from "@react-three/fiber"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PipetteMode = ({modelRef,xOffset = 0,yOffset = 3,zOffset = 0}) => {
  const { pipetteRef } = useContext(ModelContext)
  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)

  const { camera } = useThree()

  const originalTransformRef = useRef(null);

  useEffect(()=>{
    if(selectedLesson===10 && lessonStep===44){
      setLessonStep(45)
    }
  },[lessonStep,selectedLesson])

  useEffect(() => {
    if (!modelRef?.current || !pipetteRef?.current) return

    const pipette = pipetteRef.current

    let bottomPoint = null

    modelRef.current.position.x = 0
    modelRef.current.position.y = -1.5

    modelRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (childName.includes("bottom")) {
        bottomPoint = child
      }
    })

    if (!bottomPoint) {
      console.log("Bottom point not found")
      return
    }

    if (!originalTransformRef.current) {
      originalTransformRef.current = {
        parent: pipette.parent,
        position: pipette.position.clone(),
      }
    }

    const bottomWorldPosition = new THREE.Vector3()

    bottomPoint.getWorldPosition(
      bottomWorldPosition
    )

    const pipetteLocalPosition =
      camera.worldToLocal(
        bottomWorldPosition.clone()
      )

    pipetteLocalPosition.x += xOffset
    pipetteLocalPosition.y += yOffset
    pipetteLocalPosition.z += zOffset

    camera.add(pipette)

    pipette.position.copy(
      pipetteLocalPosition
    )

    pipette.updateMatrixWorld(true)

    return () => {
      const original =
        originalTransformRef.current

      if (!original || !pipetteRef?.current) return

      const pipette = pipetteRef.current

      original.parent.add(pipette)

      pipette.position.copy(
        original.position
      )

      pipette.updateMatrixWorld(true)

      originalTransformRef.current = null
    }
  }, [modelRef,pipetteRef,camera,xOffset,yOffset,zOffset])

  return null
}

export default PipetteMode