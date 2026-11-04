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

const InsertCondensor = ({
  modelRef,

  condensorScale = 0.6,

  condensorXOffset = 3.4,
  condensorYOffset = -0.49,
  condensorZOffset = 0,

  condensorXRotation = 0,
  condensorYRotation = 0,
  condensorZRotation = Math.PI / 2.2,
}) => {
  const {
    condensorRef,
  } = useContext(ModelContext)

  const {
    scene,
  } = useThree()

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const originalStateRef = useRef(null)

  useEffect(() => {
    if (
      selectedLesson === 14.3 &&
      lessonStep === 103
    ) {
      setLessonStep(104)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  useLayoutEffect(() => {
    const model =
      modelRef?.current

    const condensor =
      condensorRef?.current

    if (
      !model ||
      !condensor
    ) {
      return
    }

    // =============================================
    // STORE ORIGINAL CONDENSOR STATE
    // =============================================

    if (!originalStateRef.current) {
      originalStateRef.current = {
        parent:
          condensor.parent,

        position:
          condensor.position.clone(),

        rotation:
          condensor.rotation.clone(),

        scale:
          condensor.scale.clone(),
      }
    }

    // =============================================
    // FIND MOUTH
    // =============================================

    let mouth = null

    model.traverse((child) => {
      if (mouth) return

      const childName =
        child.name
          ?.toLowerCase() || ""

      if (
        childName.includes("mouth")
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
    // MOVE CONDENSOR TO MAIN SCENE
    // =============================================

    scene.attach(condensor)

    const condensorPosition =
      scene.worldToLocal(
        mouthWorldPosition.clone()
      )

    // =============================================
    // POSITION
    // =============================================

    condensor.position.set(
      condensorPosition.x +
        condensorXOffset,

      condensorPosition.y +
        condensorYOffset,

      condensorPosition.z +
        condensorZOffset
    )

    // =============================================
    // SCALE
    // =============================================

    condensor.scale.setScalar(
      condensorScale
    )

    // =============================================
    // ROTATION
    // =============================================

    condensor.rotation.set(
      condensorXRotation,
      condensorYRotation,
      condensorZRotation
    )

    // =============================================
    // CLEANUP
    // Restore original state when unmounted
    // =============================================

    return () => {
      const condensor =
        condensorRef?.current

      const original =
        originalStateRef.current

      if (
        !condensor ||
        !original
      ) {
        return
      }

      // Restore original parent
      if (original.parent) {
        original.parent.attach(
          condensor
        )
      }

      // Restore original position
      condensor.position.copy(
        original.position
      )

      // Restore original rotation
      condensor.rotation.copy(
        original.rotation
      )

      // Restore original scale
      condensor.scale.copy(
        original.scale
      )

      condensor.updateMatrix()
      condensor.updateMatrixWorld(true)

      originalStateRef.current = null
    }
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