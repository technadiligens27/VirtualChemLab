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

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const InsertThermometer = ({
  modelRef,

  thermometerScale = 0.7,

  thermometerXOffset = -0.2,
  thermometerYOffset = 0,
  thermometerZOffset = 0,

  thermometerXRotation = 0,
  thermometerYRotation = 0,
  thermometerZRotation = 0,
}) => {
  const {
    mainThermometerRef,
  } = useContext(ModelContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const {
    scene,
  } = useThree()

  useEffect(() => {
    if (
      selectedLesson === 14.3 &&
      lessonStep === 102
    ) {
      setLessonStep(103)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  useLayoutEffect(() => {
    const model = modelRef?.current
    const thermometer = mainThermometerRef?.current

    if (!model || !thermometer) return

    let mouth = null

    model.traverse((child) => {
      if (mouth) return

      if (
        child.name?.toLowerCase()
          .includes("mouth")
      ) {
        mouth = child
      }
    })

    if (!mouth) return

    const mouthWorldPosition =
      new THREE.Vector3()

    mouth.getWorldPosition(
      mouthWorldPosition
    )

    scene.attach(thermometer)

    const thermometerPosition =
      scene.worldToLocal(
        mouthWorldPosition.clone()
      )

    thermometer.position.set(
      thermometerPosition.x +
        thermometerXOffset,

      thermometerPosition.y +
        thermometerYOffset,

      thermometerPosition.z +
        thermometerZOffset
    )

    thermometer.scale.setScalar(
      thermometerScale
    )

    thermometer.rotation.set(
      thermometerXRotation,
      thermometerYRotation,
      thermometerZRotation
    )
  }, [
    modelRef,
    mainThermometerRef,
    scene,

    thermometerScale,

    thermometerXOffset,
    thermometerYOffset,
    thermometerZOffset,

    thermometerXRotation,
    thermometerYRotation,
    thermometerZRotation,
  ])

  return null
}

export default InsertThermometer