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

const InsertCondensor = ({
  modelRef,

  condensorScale = 0.6,

  condensorXOffset = 3.4,
  condensorYOffset = -0.49,
  condensorZOffset = 0,

  condensorXRotation = 0,
  condensorYRotation = 0,
  condensorZRotation = Math.PI/2.2,
}) => {
  const {
    condensorRef,
  } = useContext(ModelContext)

  const {scene} = useThree()

  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)

  useEffect(()=>{
    if(selectedLesson==14.3 && lessonStep ==103){
        setLessonStep(104)
    }
  },[selectedLesson,lessonStep])

  useLayoutEffect(() => {
    const model = modelRef?.current
    const condensor = condensorRef?.current

    if (!model || !condensor) return

    let mouth = null

    model.traverse((child) => {
      if (mouth) return

      const childName =
        child.name?.toLowerCase() || ""

      // Finds a child such as "Open Mouth".
      if (childName.includes("mouth")) {
        mouth = child
      }
    })

    if (!mouth) return

    const mouthWorldPosition =
      new THREE.Vector3()

    mouth.getWorldPosition(
      mouthWorldPosition
    )

    // Place the condenser in the main scene.
    scene.attach(condensor)

    const condensorPosition =
      scene.worldToLocal(
        mouthWorldPosition.clone()
      )

    condensor.position.set(
      condensorPosition.x +
        condensorXOffset,

      condensorPosition.y +
        condensorYOffset,

      condensorPosition.z +
        condensorZOffset
    )

    condensor.scale.setScalar(
      condensorScale
    )

    condensor.rotation.set(
      condensorXRotation,
      condensorYRotation,
      condensorZRotation
    )
  }, [
    modelRef,
    condensorRef,
    scene,

    condensorScale,

    condensorXOffset,
    condensorYOffset,
    condensorZOffset,

    condensorXRotation,
    condensorYRotation,
    condensorZRotation,
  ])

  return null
}

export default InsertCondensor