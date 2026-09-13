import { useContext, useEffect } from "react"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const AddFunnelToModel = ({
  modelRef,

  // Scale of the separating funnel.
  modelScale = [0.8, 0.8, 0.8],

  // Funnel transform relative to the "mouth" child.
  funnelPosition = [0, 0, 0],
  funnelRotation = [-Math.PI/2, 0, 0],
  funnelScale = [0.6, 0.6,0.6],
}) => {
  const { funnelRef } = useContext(ModelContext);
  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)

  useEffect(()=>{
    if(selectedLesson==14.1 && lessonStep==35){
      setLessonStep(36)
    }
  },[selectedLesson,lessonStep])

  useEffect(() => {
    const model = modelRef?.current
    const funnel = funnelRef?.current

    if (!model || !funnel) return

    let mouthChild = null

    model.traverse((child) => {
      if (mouthChild) return

      const childName = child.name?.toLowerCase() || ""

      if (childName.includes("mouth")) {
        mouthChild = child
      }
    })

    if (!mouthChild) {
      console.warn(
        'AddFunnelToModel: No child containing "mouth" was found.'
      )
      return
    }

    // Store the model's original scale.
    const originalModelScale = model.scale.clone()

    // Store the funnel's original state.
    const originalFunnelParent = funnel.parent
    const originalFunnelPosition = funnel.position.clone()
    const originalFunnelQuaternion = funnel.quaternion.clone()
    const originalFunnelScale = funnel.scale.clone()
    const originalFunnelVisible = funnel.visible

    model.updateWorldMatrix(true, true)
    funnel.updateWorldMatrix(true, true)
    mouthChild.updateWorldMatrix(true, true)

    // Set the separating funnel scale.
    model.scale.set(
      modelScale[0],
      modelScale[1],
      modelScale[2]
    )

    model.updateMatrixWorld(true)

    // Move the normal funnel under the "mouth" child.
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

    return () => {
      // Restore the separating funnel scale.
      model.scale.copy(originalModelScale)
      model.updateMatrixWorld(true)

      // Restore the normal funnel's parent.
      if (originalFunnelParent) {
        originalFunnelParent.add(funnel)
      } else {
        mouthChild.remove(funnel)
      }

      // Restore the normal funnel's complete transform.
      funnel.position.copy(originalFunnelPosition)
      funnel.quaternion.copy(originalFunnelQuaternion)
      funnel.scale.copy(originalFunnelScale)
      funnel.visible = originalFunnelVisible

      funnel.updateMatrixWorld(true)
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