import {
    useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"

import * as THREE from "three"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PourModeDeliveryTube = ({
  modelRef,
  otherModelRef,

  modelXOffset = 0.5,
  modelYOffset = 0,

  modelScale = 0.6,
}) => {

  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)  

  useEffect(()=>{
    if(selectedLesson===13 && lessonStep===26){
        setLessonStep(27)
    }
  },[selectedLesson,lessonStep])

  const originalPositionRef =
    useRef(null)

  const originalScaleRef =
    useRef(null)

  useLayoutEffect(() => {
    const model =
      modelRef?.current

    const otherModel =
      otherModelRef?.current

    if (
      !model ||
      !otherModel
    ) {
      return
    }


    // =============================================
    // SAVE ORIGINAL POSITION + SCALE
    // =============================================

    originalPositionRef.current =
      model.position.clone()

    originalScaleRef.current =
      model.scale.clone()


    // =============================================
    // FIND CHILD WHOSE NAME INCLUDES "mouth"
    // =============================================

    let mouthChild = null

    otherModel.traverse((child) => {
      if (mouthChild) return

      const childName =
        child.name?.toLowerCase() || ""

      if (
        childName.includes("mouth")
      ) {
        mouthChild = child
      }
    })


    if (!mouthChild) {
      console.warn(
        'PourModeDeliveryTube: No child containing "mouth" found.'
      )

      return
    }


    // =============================================
    // GET MOUTH WORLD POSITION
    // =============================================

    const mouthWorldPosition =
      new THREE.Vector3()

    mouthChild.getWorldPosition(
      mouthWorldPosition
    )


    // =============================================
    // CONVERT WORLD POSITION TO MODEL PARENT SPACE
    //
    // MODEL IS CURRENTLY ATTACHED TO CAMERA
    // =============================================

    const modelParent =
      model.parent

    if (modelParent) {
      modelParent.worldToLocal(
        mouthWorldPosition
      )
    }


    // =============================================
    // APPLY POSITION OFFSETS
    // =============================================

    mouthWorldPosition.x +=
      modelXOffset

    mouthWorldPosition.y +=
      modelYOffset


    // =============================================
    // MOVE MODEL
    // =============================================

    model.position.copy(
      mouthWorldPosition
    )


    // =============================================
    // SCALE MODEL
    // =============================================

    model.scale.set(
      modelScale,
      modelScale,
      modelScale
    )

    model.updateMatrixWorld(true)


    // =============================================
    // UNMOUNT → RESTORE ORIGINAL VALUES
    // =============================================

    return () => {
      const currentModel =
        modelRef?.current

      if (!currentModel) {
        return
      }


      // Restore position
      if (
        originalPositionRef.current
      ) {
        currentModel.position.copy(
          originalPositionRef.current
        )
      }


      // Restore scale
      if (
        originalScaleRef.current
      ) {
        currentModel.scale.copy(
          originalScaleRef.current
        )
      }


      currentModel.updateMatrixWorld(true)
    }
  }, [
    modelRef,
    otherModelRef,
    modelXOffset,
    modelYOffset,
    modelScale,
  ])


  return null
}

export default PourModeDeliveryTube