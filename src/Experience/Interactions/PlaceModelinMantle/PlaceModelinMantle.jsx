import {
  useContext,
  useEffect,
  useLayoutEffect,
} from "react"

import {
  useThree,
} from "@react-three/fiber"

import * as THREE from "three"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PlaceModelinMantle = ({
  modelRef,

  modelScale = 1,

  modelYOffset = 0,
  modelXOffset = 0,
}) => {
  const {heatingMantleBeakerPosRef} = useContext(ModelContext);
  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)

  const {scene} = useThree()

  useEffect(()=>{
    if(selectedLesson==14.3 && lessonStep ==99){
        setLessonStep(100)
    }
  },[selectedLesson,lessonStep])

  useLayoutEffect(() => {
    const model =
      modelRef?.current

    const mantleBeakerPosition =
      heatingMantleBeakerPosRef?.current

    if (
      !model ||
      !mantleBeakerPosition
    ) {
      return
    }

    scene.updateMatrixWorld(true)
    model.updateMatrixWorld(true)
    mantleBeakerPosition.updateMatrixWorld(
      true
    )

    const targetWorldPosition =
      mantleBeakerPosition.getWorldPosition(
        new THREE.Vector3()
      )

    // Detach the model from the camera.
    scene.attach(model)

    scene.updateMatrixWorld(true)

    const targetLocalPosition =
      scene.worldToLocal(
        targetWorldPosition.clone()
      )

    model.position.set(
      targetLocalPosition.x +
        modelXOffset,

      targetLocalPosition.y +
        modelYOffset,

      targetLocalPosition.z
    )

    model.scale.setScalar(
      modelScale
    )

    model.rotation.set(
      0,
      0,
      0
    )

    model.updateMatrix()
    model.updateMatrixWorld(true)
  }, [
    modelRef,
    heatingMantleBeakerPosRef,
    scene,

    modelScale,
    modelYOffset,
    modelXOffset,
  ])

  return null
}

export default PlaceModelinMantle