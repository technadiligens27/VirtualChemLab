import { useContext, useEffect } from "react"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const ClampBurette = () => {
  const {buretteClampRef,mainBuiretteRef} = useContext(ModelContext);
  const {lessonStep,selectedLesson,setLessonStep} = useContext(MainGuidelineContext)

  useEffect(()=>{
    if(selectedLesson ===8 && lessonStep ===24){
        setLessonStep(25)
    }
  },[selectedLesson,lessonStep])

  useEffect(() => {
    const clamp = buretteClampRef?.current
    const burette = mainBuiretteRef?.current

    if (!clamp || !burette) {
      console.log("Clamp or burette was not found")
      return
    }

    let clampPosition = null

    clamp.traverse((child) => {
      if (
        !clampPosition &&
        child.name
          ?.toLowerCase()
          .includes("clamp-position")
      ) {
        clampPosition = child
      }
    })

    if (!clampPosition) {
      console.log("Clamp Position was not found")
      return
    }

    const worldPosition = new THREE.Vector3()
    const worldQuaternion = new THREE.Quaternion()

    clampPosition.getWorldPosition(worldPosition)
    clampPosition.getWorldQuaternion(worldQuaternion)

    const buretteParent = burette.parent

    if (buretteParent) {
      buretteParent.worldToLocal(worldPosition)

      const parentWorldQuaternion =
        new THREE.Quaternion()

      buretteParent.getWorldQuaternion(
        parentWorldQuaternion
      )

      parentWorldQuaternion.invert()

      worldQuaternion.premultiply(
        parentWorldQuaternion
      )
    }

    burette.position.copy(worldPosition)
    burette.quaternion.copy(worldQuaternion)
    burette.scale.set(0.6, 0.6, 0.6)
    burette.position.y +=1

    burette.updateMatrixWorld(true)

    console.log("Burette moved to clamp position")
  }, [buretteClampRef, mainBuiretteRef])

  return null
}

export default ClampBurette