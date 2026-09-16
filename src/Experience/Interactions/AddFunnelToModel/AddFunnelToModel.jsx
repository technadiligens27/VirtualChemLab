import {
  useContext,
  useEffect,
} from "react"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AddFunnelToModel = ({
  modelRef,

  // Scale of the separating funnel.
  modelScale = [0.8, 0.8, 0.8],

  // Funnel transform relative to "mouth".
  funnelPosition = [0, 0, 0],

  funnelRotation = [
    -Math.PI / 2,
    0,
    0,
  ],

  funnelScale = [0.6, 0.6, 0.6],
}) => {
  const {
    funnelRef,
  } = useContext(ModelContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  // =============================================
  // LESSON STEPS
  // =============================================

  useEffect(() => {
    if (
      selectedLesson === 14.1 &&
      lessonStep === 35
    ) {
      setLessonStep(36)
    }

    if (
      selectedLesson === 14.1 &&
      lessonStep === 47.1
    ) {
      setLessonStep(48)
    }
    if(selectedLesson==14.2 && lessonStep===65){
      setLessonStep(66)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  // =============================================
  // ATTACH FUNNEL
  // =============================================

  useEffect(() => {
    const model =
      modelRef?.current

    const funnel =
      funnelRef?.current

    if (!model || !funnel) {
      return
    }

    let mouthChild = null

    const bungObjects = []

    // ===========================================
    // FIND MOUTH AND BUNG OBJECTS
    // ===========================================

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() ||
        ""

      if (
        !mouthChild &&
        childName.includes("mouth")
      ) {
        mouthChild = child
      }

      if (
        childName.includes("bung")
      ) {
        bungObjects.push({
          object: child,

          originalVisible:
            child.visible,
        })
      }
    })

    if (!mouthChild) {
      console.warn(
        'AddFunnelToModel: No child containing "mouth" was found.'
      )

      return
    }

    // ===========================================
    // HIDE BUNG
    // ===========================================

    bungObjects.forEach(
      ({
        object,
      }) => {
        object.visible = false
        object.updateMatrixWorld(true)
      }
    )

    // ===========================================
    // SAVE ORIGINAL MODEL STATE
    // ===========================================

    const originalModelScale =
      model.scale.clone()

    // ===========================================
    // SAVE ORIGINAL FUNNEL STATE
    // ===========================================

    const originalFunnelParent =
      funnel.parent

    const originalFunnelPosition =
      funnel.position.clone()

    const originalFunnelQuaternion =
      funnel.quaternion.clone()

    const originalFunnelScale =
      funnel.scale.clone()

    const originalFunnelVisible =
      funnel.visible

    model.updateWorldMatrix(
      true,
      true
    )

    funnel.updateWorldMatrix(
      true,
      true
    )

    mouthChild.updateWorldMatrix(
      true,
      true
    )

    // ===========================================
    // SCALE SEPARATING FUNNEL
    // ===========================================

    model.scale.set(
      modelScale[0],
      modelScale[1],
      modelScale[2]
    )

    model.updateMatrixWorld(true)

    // ===========================================
    // ATTACH NORMAL FUNNEL TO MOUTH
    // ===========================================

    mouthChild.attach(funnel)

    funnel.position.set(
      funnelPosition[0],
      funnelPosition[1],
      funnelPosition[2]
    )

    funnel.rotation.set(
      funnelRotation[0],
      funnelRotation[1],
      funnelRotation[2]
    )

    funnel.scale.set(
      funnelScale[0],
      funnelScale[1],
      funnelScale[2]
    )

    funnel.visible = true
    funnel.updateMatrixWorld(true)

    // ===========================================
    // CLEANUP
    // ===========================================

    return () => {
      // Restore separating-funnel scale.
      model.scale.copy(
        originalModelScale
      )

      model.updateMatrixWorld(true)

      // Restore normal funnel parent.
      if (originalFunnelParent) {
        originalFunnelParent.add(
          funnel
        )
      } else {
        mouthChild.remove(funnel)
      }

      // Restore normal funnel transform.
      funnel.position.copy(
        originalFunnelPosition
      )

      funnel.quaternion.copy(
        originalFunnelQuaternion
      )

      funnel.scale.copy(
        originalFunnelScale
      )

      funnel.visible =
        originalFunnelVisible

      funnel.updateMatrixWorld(true)

      // Restore every bung's original state.
      bungObjects.forEach(
        ({
          object,
          originalVisible,
        }) => {
          object.visible =
            originalVisible

          object.updateMatrixWorld(true)
        }
      )
    }
  }, [
    modelRef,
    funnelRef,

    modelScale[0],
    modelScale[1],
    modelScale[2],

    funnelPosition[0],
    funnelPosition[1],
    funnelPosition[2],

    funnelRotation[0],
    funnelRotation[1],
    funnelRotation[2],

    funnelScale[0],
    funnelScale[1],
    funnelScale[2],
  ])

  return null
}

export default AddFunnelToModel