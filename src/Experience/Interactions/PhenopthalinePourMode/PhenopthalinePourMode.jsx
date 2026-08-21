import { useContext, useEffect, useRef } from "react"
import PhenopthalineSqueezeAnimation from "../PhenopthalineSqueezeAnimation/PhenopthalineSqueezeAnimation"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PhenopthalinePourMode = ({
  modelRef,
  otherModelRef,

  xOffset = -1,
  yOffset = 1.4,
  zOffset = 0,

  rotationX = 0,
  rotationY = 0,
  rotationZ = -Math.PI / 1.5,

  modelScale = 0.8,
  otherModelScale = 0.8,

  otherModelYOffset = -0.5,
}) => {

  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)

  // ==========================================
  // MODEL REF ORIGINAL TRANSFORM
  // ==========================================

  const originalModelPositionRef = useRef(null)
  const originalModelRotationRef = useRef(null)
  const originalModelScaleRef = useRef(null)

  // ==========================================
  // OTHER MODEL REF ORIGINAL TRANSFORM
  // ==========================================

  const originalOtherPositionRef = useRef(null)
  const originalOtherRotationRef = useRef(null)
  const originalOtherScaleRef = useRef(null)

  useEffect(()=>{
    if(selectedLesson===11.1 && lessonStep===46){
      setLessonStep(47)
    }
    if(selectedLesson===11.1 && lessonStep==59){
      setLessonStep(60)
    }
  },[selectedLesson,lessonStep])

  useEffect(() => {
    if (!modelRef?.current) return
    if (!otherModelRef?.current) return

    const model = modelRef.current
    const otherModel = otherModelRef.current

    // ==========================================
    // SAVE MODEL ORIGINAL TRANSFORM
    // ==========================================

    originalModelPositionRef.current =
      model.position.clone()

    originalModelRotationRef.current =
      model.rotation.clone()

    originalModelScaleRef.current =
      model.scale.clone()

    // ==========================================
    // SAVE OTHER MODEL ORIGINAL TRANSFORM
    // ==========================================

    originalOtherPositionRef.current =
      otherModel.position.clone()

    originalOtherRotationRef.current =
      otherModel.rotation.clone()

    originalOtherScaleRef.current =
      otherModel.scale.clone()

    // ==========================================
    // APPLY SCALE
    // ==========================================

    model.scale.set(
      modelScale,
      modelScale,
      modelScale
    )

    otherModel.scale.set(
      otherModelScale,
      otherModelScale,
      otherModelScale
    )

    // ==========================================
    // MOVE OTHER MODEL
    // ==========================================

    otherModel.position.x = 0
    otherModel.position.y += otherModelYOffset

    model.updateMatrixWorld(true)
    otherModel.updateMatrixWorld(true)

    // ==========================================
    // FIND MOUTH
    // ==========================================

    let mouthObject = null

    otherModel.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (childName.includes("mouth")) {
        mouthObject = child
      }
    })

    if (!mouthObject) {
      console.log("Mouth child not found")
      return
    }

    // ==========================================
    // GET MOUTH WORLD POSITION
    // ==========================================

    const mouthWorldPosition =
      mouthObject.getWorldPosition(
        model.position.clone()
      )

    const modelParent = model.parent

    if (!modelParent) return

    modelParent.worldToLocal(
      mouthWorldPosition
    )

    // ==========================================
    // APPLY POSITION OFFSETS
    // ==========================================

    mouthWorldPosition.x += xOffset
    mouthWorldPosition.y += yOffset
    mouthWorldPosition.z += zOffset

    model.position.copy(
      mouthWorldPosition
    )

    // ==========================================
    // APPLY MODEL ROTATION
    // ==========================================

    model.rotation.set(
      rotationX,
      rotationY,
      rotationZ
    )

    model.updateMatrixWorld(true)

    console.log(
      "✅ Phenolphthalein Pour Mode ON"
    )

    // ==========================================
    // EXIT POUR MODE
    // ==========================================

    return () => {
      if (modelRef?.current) {
        const currentModel =
          modelRef.current

        if (originalModelPositionRef.current) {
          currentModel.position.copy(
            originalModelPositionRef.current
          )
        }

        if (originalModelRotationRef.current) {
          currentModel.rotation.copy(
            originalModelRotationRef.current
          )
        }

        if (originalModelScaleRef.current) {
          currentModel.scale.copy(
            originalModelScaleRef.current
          )
        }

        currentModel.updateMatrixWorld(true)
      }

      // ========================================
      // RESTORE OTHER MODEL
      // ========================================

      if (otherModelRef?.current) {
        const currentOtherModel =
          otherModelRef.current

        if (originalOtherPositionRef.current) {
          currentOtherModel.position.copy(
            originalOtherPositionRef.current
          )
        }

        if (originalOtherRotationRef.current) {
          currentOtherModel.rotation.copy(
            originalOtherRotationRef.current
          )
        }

        if (originalOtherScaleRef.current) {
          currentOtherModel.scale.copy(
            originalOtherScaleRef.current
          )
        }

        currentOtherModel.updateMatrixWorld(true)

      }
        
      console.log(
        "✅ Phenolphthalein Pour Mode OFF - both models restored"
      )
    }
  }, [
    modelRef,
    otherModelRef,

    xOffset,
    yOffset,
    zOffset,

    rotationX,
    rotationY,
    rotationZ,

    modelScale,
    otherModelScale,

    otherModelYOffset,
  ])

  return (
    <>
        <PhenopthalineSqueezeAnimation modelRef={modelRef}/>
    </>
  )
}

export default PhenopthalinePourMode