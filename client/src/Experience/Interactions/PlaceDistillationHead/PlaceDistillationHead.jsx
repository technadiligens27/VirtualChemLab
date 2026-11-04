import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PlaceDistillationHead = ({
  modelRef,

  distillationHeadScale = 1,

  distillationHeadXOffset = -0.35,
  distillationHeadYOffset = -0.5,
  distillationHeadZOffset = 0,
}) => {
  const {
    distillationHeadRef,
  } = useContext(ModelContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const originalStateRef = useRef(null)

  useEffect(() => {
    if (
      selectedLesson === 14.3 &&
      lessonStep === 101
    ) {
      setLessonStep(102)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  useEffect(() => {
    const model =
      modelRef?.current

    const distillationHead =
      distillationHeadRef?.current

    if (
      !model ||
      !distillationHead
    ) {
      return
    }

    // =============================================
    // STORE ORIGINAL STATE
    // =============================================

    if (!originalStateRef.current) {
      originalStateRef.current = {
        parent:
          distillationHead.parent,

        position:
          distillationHead.position.clone(),

        quaternion:
          distillationHead.quaternion.clone(),

        scale:
          distillationHead.scale.clone(),

        visible:
          distillationHead.visible,
      }
    }

    // =============================================
    // FIND MOUTH
    // =============================================

    let mouthChild = null

    model.traverse((child) => {
      if (mouthChild) return

      const childName =
        child.name
          ?.toLowerCase() || ""

      if (
        childName.includes("mouth")
      ) {
        mouthChild = child
      }
    })

    if (!mouthChild) return

    // =============================================
    // UPDATE MATRICES
    // =============================================

    model.updateWorldMatrix(
      true,
      true
    )

    mouthChild.updateWorldMatrix(
      true,
      true
    )

    // =============================================
    // ATTACH TO MOUTH
    // =============================================

    mouthChild.attach(
      distillationHead
    )

    // =============================================
    // POSITION
    // =============================================

    distillationHead.position.set(
      distillationHeadXOffset,
      distillationHeadYOffset,
      distillationHeadZOffset
    )

    // =============================================
    // SCALE
    // =============================================

    distillationHead.scale.setScalar(
      distillationHeadScale
    )

    // =============================================
    // VISIBILITY
    // =============================================

    distillationHead.visible = true

    distillationHead.updateMatrix()
    distillationHead.updateMatrixWorld(
      true
    )

    // =============================================
    // CLEANUP
    // =============================================

    return () => {
      const head =
        distillationHeadRef?.current

      const original =
        originalStateRef.current

      if (
        !head ||
        !original
      ) {
        return
      }

      // Restore original parent
      if (original.parent) {
        original.parent.attach(
          head
        )
      } else if (head.parent) {
        head.parent.remove(
          head
        )
      }

      // Restore original position
      head.position.copy(
        original.position
      )

      // Restore original rotation
      head.quaternion.copy(
        original.quaternion
      )

      // Restore original scale
      head.scale.copy(
        original.scale
      )

      // Restore original visibility
      head.visible =
        original.visible

      head.updateMatrix()
      head.updateMatrixWorld(true)

      originalStateRef.current = null
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