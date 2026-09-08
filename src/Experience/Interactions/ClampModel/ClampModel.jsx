import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";

const ClampModel = ({
  modelRef,

  modelScale = 1,

  modelXOffset = 0.5,
  modelYOffset = 0,
  hand
}) => {
  const {buretteClampRef} = useContext(ModelContext);
  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)
  const {setSelectedRightHand,setSelectedLeftHand} = useContext(InteractionContext)

    useEffect(()=>{
        if(selectedLesson==13 && lessonStep==4){
            setLessonStep(5)
        }
    },[selectedLesson,lessonStep])

    useEffect(()=>{
        if(hand=="left"){
            setSelectedLeftHand(null)
        }

        if(hand=="right"){
            setSelectedRightHand(null)
        }
    },[])

  const originalTransformRef =
    useRef(null)

  useLayoutEffect(() => {
    const model =
      modelRef?.current

    const clamp =
      buretteClampRef?.current

    if (!model || !clamp) {
      return
    }

    // =============================================
    // FIND CLAMP POSITION
    // =============================================

    const clampPosition =
      clamp.getObjectByName(
        "clamp-position"
      )

    if (!clampPosition) {
      console.log(
        "❌ clamp-position not found"
      )

      return
    }

    // =============================================
    // SAVE ORIGINAL TRANSFORM
    // =============================================

    originalTransformRef.current = {
      parent:
        model.parent,

      position:
        model.position.clone(),

      rotation:
        model.rotation.clone(),

      scale:
        model.scale.clone(),
    }

    // =============================================
    // MOVE MODEL TO CLAMP
    // =============================================

    clampPosition.attach(
      model
    )

    model.position.set(
      modelXOffset,
      modelYOffset,
      0
    )

    model.rotation.set(
      0,
      0,
      0
    )

    model.scale.set(
      modelScale,
      modelScale,
      modelScale
    )

    model.updateMatrixWorld(
      true
    )

    console.log(
      "✅ Model moved to clamp-position"
    )

    // =============================================
    // CLEANUP / UNMOUNT
    // =============================================

    return () => {
      const original =
        originalTransformRef.current

      if (
        !model ||
        !original
      ) {
        return
      }

      if (
        original.parent
      ) {
        original.parent.add(
          model
        )
      }

      model.position.copy(
        original.position
      )

      model.rotation.copy(
        original.rotation
      )

      model.scale.copy(
        original.scale
      )

      model.updateMatrixWorld(
        true
      )

      console.log(
        "✅ Model returned to original position"
      )
    }
  }, [
    modelRef,
    buretteClampRef,
    modelScale,
    modelXOffset,
    modelYOffset,
  ])

  return null
}

export default ClampModel