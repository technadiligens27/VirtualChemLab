import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useThree } from "@react-three/fiber"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PipetteMode = ({
  modelRef,
  xOffset = 0,
  yOffset = 3,
  zOffset = 0,
}) => {
  const { pipetteRef } = useContext(ModelContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const { camera } = useThree()

  const originalPipetteTransformRef = useRef(null)
  const originalModelPositionRef = useRef(null)

  useEffect(() => {
    if (selectedLesson === 10 && lessonStep === 44) {
      setLessonStep(45)
    }

    if(selectedLesson===10 && lessonStep ===49){
      setLessonStep(50)
    }

    if(selectedLesson===10 && lessonStep ===54){
      setLessonStep(55)
    }

    if(selectedLesson===10 && lessonStep ===59){
      setLessonStep(60)
    }

    if(selectedLesson===10 && lessonStep ===64){
      setLessonStep(65)
    }
  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])

  useEffect(() => {
    if (!modelRef?.current || !pipetteRef?.current) return

    const pipette = pipetteRef.current
    const model = modelRef.current

    let bottomPoint = null

    if (!originalModelPositionRef.current) {
      originalModelPositionRef.current = model.position.clone()
    }

    model.position.x = 0
    model.position.y = -1.5

    if(model.name==='main-testube-01'){
          model.scale.set(1.25,1.25,1.25)
          model.rotation.y += Math.PI/7
    }



    model.updateMatrixWorld(true)

    model.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (childName.includes("bottom")) {
        bottomPoint = child
      }
    })

    if (!bottomPoint) {
      console.log("Bottom point not found")
      return
    }

    if (!originalPipetteTransformRef.current) {
      originalPipetteTransformRef.current = {
        parent: pipette.parent,
        position: pipette.position.clone(),
        rotation: pipette.rotation.clone(),
        scale: pipette.scale.clone(),
      }
    }

    const bottomWorldPosition = new THREE.Vector3()

    bottomPoint.getWorldPosition(
      bottomWorldPosition
    )

    const pipetteLocalPosition = camera.worldToLocal(
      bottomWorldPosition.clone()
    )

    pipetteLocalPosition.x += xOffset
    pipetteLocalPosition.y += yOffset
    pipetteLocalPosition.z += zOffset

    camera.add(pipette)

    if (model.name === "main-testube-01") {
      pipette.scale.y = 1.3
    }

    pipette.position.copy(
      pipetteLocalPosition
    )

    pipette.updateMatrixWorld(true)

    return () => {
      const originalPipette = originalPipetteTransformRef.current
      const originalModelPosition = originalModelPositionRef.current

      if (originalPipette && pipetteRef?.current) {
        const pipette = pipetteRef.current

        originalPipette.parent.add(pipette)

        pipette.position.copy(
          originalPipette.position
        )

        pipette.rotation.copy(
          originalPipette.rotation
        )

        pipette.scale.copy(
          originalPipette.scale
        )

        pipette.updateMatrixWorld(true)
      }

      if (originalModelPosition && modelRef?.current) {
        modelRef.current.position.copy(
          originalModelPosition
        )

        modelRef.current.updateMatrixWorld(true)
      }

      originalPipetteTransformRef.current = null
      originalModelPositionRef.current = null
    }
  }, [
    modelRef,
    pipetteRef,
    camera,
    xOffset,
    yOffset,
    zOffset,
  ])

  return null
}

export default PipetteMode