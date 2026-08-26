import { useContext, useEffect, useRef } from "react"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const VolumetricPipetteMode = ({
  modelRef,
  xOffset = 0,
  yOffset = 2.5,
  modelYOffset = -0.6,
  modelScale = 0.8,
  pipetteScale = 0.5,
}) => {
  const { volumetricPipetteRef, volumetricBung } = useContext(ModelContext)
  const {selectedLesson,lessonStep,setLessonStep}= useContext(MainGuidelineContext)
  
  const originalPipettePositionRef = useRef(null)
  const originalPipetteRotationRef = useRef(null)
  const originalPipetteScaleRef = useRef(null)

  const originalModelPositionRef = useRef(null)
  const originalModelRotationRef = useRef(null)
  const originalModelScaleRef = useRef(null)

  const originalBungVisibilityRef = useRef(false)

  useEffect(() => {
    if (!volumetricBung?.current) return

    // Store whatever visibility it had BEFORE entering mode
    originalBungVisibilityRef.current =
      volumetricBung.current.visible

    // While in Volumetric Pipette Mode, bung is always hidden
    volumetricBung.current.visible = false

    return () => {
      if (!volumetricBung?.current) return

      // Restore exactly what it was before
      volumetricBung.current.visible =
        originalBungVisibilityRef.current
    }
  }, [volumetricBung])

  useEffect(()=>{
    if(selectedLesson===11 && lessonStep===8){
        setLessonStep(9)
    }
    if(selectedLesson===11 && lessonStep===13){
      setLessonStep(14)
    }
    if(selectedLesson===11 && lessonStep===36){
      setLessonStep(37)
    }
    if(selectedLesson===11 && lessonStep===41){
      setLessonStep(42)
    }  
    if(selectedLesson===12.2 && lessonStep===68){
      setLessonStep(69)
    }
    
    if(selectedLesson===12.2 && lessonStep===73){
      setLessonStep(74)
    }   
    
    if(selectedLesson===12.2 && lessonStep===92){
      setLessonStep(93)
    }

    if(selectedLesson===12.2 && lessonStep===97){
      setLessonStep(98)
    }

  },[selectedLesson,lessonStep])

  useEffect(() => {
    if (!modelRef?.current || !volumetricPipetteRef?.current) return

    const pipette = volumetricPipetteRef.current
    const model = modelRef.current

    originalPipettePositionRef.current = pipette.position.clone()
    originalPipetteRotationRef.current = pipette.rotation.clone()
    originalPipetteScaleRef.current = pipette.scale.clone()

    originalModelPositionRef.current = model.position.clone()
    originalModelRotationRef.current = model.rotation.clone()
    originalModelScaleRef.current = model.scale.clone()

    model.position.x = 0
    model.position.y += modelYOffset

    model.scale.set(
      modelScale,
      modelScale,
      modelScale
    )

    pipette.scale.set(
      pipetteScale,
      pipetteScale,
      pipetteScale
    )

    let stir = null

    model.traverse((child) => {
      if (child.name?.toLowerCase().includes("stir")) {
        stir = child
      }
    })

    if (!stir) return

    const position = new THREE.Vector3()

    stir.getWorldPosition(position)

    pipette.parent.worldToLocal(position)

    position.x += xOffset
    position.y += yOffset

    pipette.position.copy(position)

    return () => {
      if (volumetricPipetteRef.current) {
        volumetricPipetteRef.current.position.copy(
          originalPipettePositionRef.current
        )

        volumetricPipetteRef.current.rotation.copy(
          originalPipetteRotationRef.current
        )

        volumetricPipetteRef.current.scale.copy(
          originalPipetteScaleRef.current
        )
      }

      if (modelRef.current) {
        modelRef.current.position.copy(
          originalModelPositionRef.current
        )

        modelRef.current.rotation.copy(
          originalModelRotationRef.current
        )

        modelRef.current.scale.copy(
          originalModelScaleRef.current
        )
      }
    }
  }, [
    modelRef,
    volumetricPipetteRef,
    xOffset,
    yOffset,
    modelYOffset,
    modelScale,
    pipetteScale,
  ])

  return null
}

export default VolumetricPipetteMode