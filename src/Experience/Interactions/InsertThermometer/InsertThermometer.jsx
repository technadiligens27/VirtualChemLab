import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
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
  thermometerYOffset = 1,
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

  const originalStateRef = useRef(null)

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
    const thermometer =
      mainThermometerRef?.current

    if (!model || !thermometer) return

    // =============================================
    // STORE ORIGINAL THERMOMETER STATE
    // =============================================

    if (!originalStateRef.current) {
      originalStateRef.current = {
        parent: thermometer.parent,

        position:
          thermometer.position.clone(),

        rotation:
          thermometer.rotation.clone(),

        scale:
          thermometer.scale.clone(),
      }
    }

    // =============================================
    // FIND MOUTH
    // =============================================

    let mouth = null

    model.traverse((child) => {
      if (mouth) return

      if (
        child.name
          ?.toLowerCase()
          .includes("mouth")
      ) {
        mouth = child
      }
    })

    if (!mouth) return

    // =============================================
    // GET MOUTH WORLD POSITION
    // =============================================

    const mouthWorldPosition =
      new THREE.Vector3()

    mouth.getWorldPosition(
      mouthWorldPosition
    )

    // =============================================
    // MOVE THERMOMETER TO SCENE
    // =============================================

    scene.attach(thermometer)

    const thermometerPosition =
      scene.worldToLocal(
        mouthWorldPosition.clone()
      )

    // =============================================
    // POSITION
    // =============================================

    thermometer.position.set(
      thermometerPosition.x +
        thermometerXOffset,

      thermometerPosition.y +
        thermometerYOffset,

      thermometerPosition.z +
        thermometerZOffset
    )

    // =============================================
    // SCALE
    // =============================================

    thermometer.scale.setScalar(
      thermometerScale
    )

    // =============================================
    // ROTATION
    // =============================================

    thermometer.rotation.set(
      thermometerXRotation,
      thermometerYRotation,
      thermometerZRotation
    )

    // =============================================
    // CLEANUP
    // Restore everything when component unmounts
    // =============================================

    return () => {
      const thermometer =
        mainThermometerRef?.current

      const original =
        originalStateRef.current

      if (
        !thermometer ||
        !original
      ) {
        return
      }

      // Restore original parent
      if (original.parent) {
        original.parent.attach(
          thermometer
        )
      }

      // Restore original position
      thermometer.position.copy(
        original.position
      )

      // Restore original rotation
      thermometer.rotation.copy(
        original.rotation
      )

      // Restore original scale
      thermometer.scale.copy(
        original.scale
      )

      thermometer.updateMatrix()
      thermometer.updateMatrixWorld(true)

      originalStateRef.current = null
    }
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