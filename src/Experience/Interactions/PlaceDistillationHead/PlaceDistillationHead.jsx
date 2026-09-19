import {
  useContext,
  useEffect,
} from "react"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PlaceDistillationHead = ({
  modelRef,

  // Distillation-head scale.
  distillationHeadScale = 1,

  // Position relative to the "mouth" child.
  distillationHeadXOffset = -0.35,
  distillationHeadYOffset = -0.5,
  distillationHeadZOffset = 0,
}) => {
  const {
    distillationHeadRef,
  } = useContext(ModelContext)

  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext);

  useEffect(()=>{
    if(selectedLesson==14.3 && lessonStep==101){
        setLessonStep(102)
    }
  },[selectedLesson,lessonStep])

  useEffect(() => {
    const model = modelRef?.current

    const distillationHead =
      distillationHeadRef?.current

    if (!model || !distillationHead) {
      console.warn(
        "PlaceDistillationHead: model or distillation head was not found."
      )

      return
    }

    let mouthChild = null

    model.traverse((child) => {
      if (mouthChild) {
        return
      }

      const childName =
        child.name?.toLowerCase() || ""

      if (childName.includes("mouth")) {
        mouthChild = child
      }
    })

    if (!mouthChild) {
      console.warn(
        'PlaceDistillationHead: no child containing "mouth" was found.'
      )

      return
    }

    // Save original state so it can be restored
    // when this component unmounts.
    const originalParent =
      distillationHead.parent

    const originalPosition =
      distillationHead.position.clone()

    const originalQuaternion =
      distillationHead.quaternion.clone()

    const originalScale =
      distillationHead.scale.clone()

    const originalVisible =
      distillationHead.visible

    model.updateWorldMatrix(true, true)
    mouthChild.updateWorldMatrix(
      true,
      true
    )

    /*
     * Attach keeps the current world transform
     * temporarily, then local values below place
     * the head exactly relative to the mouth.
     */
    mouthChild.attach(
      distillationHead
    )

    distillationHead.position.set(
      distillationHeadXOffset,
      distillationHeadYOffset,
      distillationHeadZOffset
    )

    distillationHead.scale.set(
      distillationHeadScale,
      distillationHeadScale,
      distillationHeadScale
    )

    distillationHead.visible = true

    distillationHead.updateMatrixWorld(
      true
    )

    return () => {
      if (originalParent) {
        originalParent.add(
          distillationHead
        )
      } else {
        mouthChild.remove(
          distillationHead
        )
      }

      distillationHead.position.copy(
        originalPosition
      )

      distillationHead.quaternion.copy(
        originalQuaternion
      )

      distillationHead.scale.copy(
        originalScale
      )

      distillationHead.visible =
        originalVisible

      distillationHead.updateMatrixWorld(
        true
      )
    }
  }, [
    modelRef,
    distillationHeadRef,
    distillationHeadScale,
    distillationHeadXOffset,
    distillationHeadYOffset,
    distillationHeadZOffset,
  ])

  return null
}

export default PlaceDistillationHead