import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useThree } from "@react-three/fiber"
import * as THREE from "three"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PipetteMode = ({
  modelRef,
  pipetteModeRef,

  modelRefScale = 1,
  pipetteModeRefScale = 1,

  xOffset = 0,
  yOffset = 3,
  zOffset = 0,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const { camera } = useThree()

  const originalPipetteTransformRef =
    useRef(null)

  const originalModelTransformRef =
    useRef(null)


  // =========================================
  // LESSON STEP CONTROL
  // =========================================

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 44
    ) {
      setLessonStep(45)
    }

    if (
      selectedLesson === 10 &&
      lessonStep === 49
    ) {
      setLessonStep(50)
    }

    if (
      selectedLesson === 10 &&
      lessonStep === 54
    ) {
      setLessonStep(55)
    }

    if (
      selectedLesson === 10 &&
      lessonStep === 59
    ) {
      setLessonStep(60)
    }

    if (
      selectedLesson === 10 &&
      lessonStep === 64
    ) {
      setLessonStep(65)
    }

    if (
      selectedLesson === 10 &&
      lessonStep === 69
    ) {
      setLessonStep(70)
    }

    if (
      selectedLesson === 14.4 &&
      lessonStep === 136
    ) {
      setLessonStep(137)
    }

  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])


  // =========================================
  // PIPETTE MODE
  // =========================================

  useEffect(() => {
    if (
      !modelRef?.current ||
      !pipetteModeRef?.current
    ) {
      return
    }

    const pipette =
      pipetteModeRef.current

    const model =
      modelRef.current

    let bottomPoint = null


    // =========================================
    // SAVE ORIGINAL MODEL TRANSFORM
    // =========================================

    if (
      !originalModelTransformRef.current
    ) {
      originalModelTransformRef.current = {
        position:
          model.position.clone(),

        rotation:
          model.rotation.clone(),

        scale:
          model.scale.clone(),
      }
    }


    // =========================================
    // POSITION MODEL
    // =========================================

    model.position.x = 0
    model.position.y = -1.5


    // =========================================
    // APPLY MODEL SCALE
    // =========================================

    model.scale.set(
      modelRefScale,
      modelRefScale,
      modelRefScale
    )


    // =========================================
    // TEST TUBE SPECIAL SETTINGS
    // =========================================

    if (
      model.name ===
      "main-testube-01"
    ) {
      model.rotation.y +=
        Math.PI / 7
    }

    model.updateMatrixWorld(true)


    // =========================================
    // FIND BOTTOM POINT
    // =========================================

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() ||
        ""

      if (
        childName.includes(
          "bottom"
        )
      ) {
        bottomPoint = child
      }
    })

    if (!bottomPoint) {
      console.log(
        "Bottom point not found"
      )

      return
    }


    // =========================================
    // SAVE ORIGINAL PIPETTE TRANSFORM
    // =========================================

    if (
      !originalPipetteTransformRef.current
    ) {
      originalPipetteTransformRef.current =
        {
          parent:
            pipette.parent,

          position:
            pipette.position.clone(),

          rotation:
            pipette.rotation.clone(),

          scale:
            pipette.scale.clone(),
        }
    }


    // =========================================
    // GET BOTTOM WORLD POSITION
    // =========================================

    const bottomWorldPosition =
      new THREE.Vector3()

    bottomPoint.getWorldPosition(
      bottomWorldPosition
    )


    // =========================================
    // CONVERT TO CAMERA LOCAL POSITION
    // =========================================

    const pipetteLocalPosition =
      camera.worldToLocal(
        bottomWorldPosition.clone()
      )

    pipetteLocalPosition.x +=
      xOffset

    pipetteLocalPosition.y +=
      yOffset

    pipetteLocalPosition.z +=
      zOffset


    // =========================================
    // ATTACH PIPETTE TO CAMERA
    // =========================================

    camera.add(pipette)


    // =========================================
    // APPLY PIPETTE SCALE
    // =========================================

    pipette.scale.set(
      pipetteModeRefScale,
      pipetteModeRefScale,
      pipetteModeRefScale
    )


    // =========================================
    // SET PIPETTE POSITION
    // =========================================

    pipette.position.copy(
      pipetteLocalPosition
    )

    pipette.updateMatrixWorld(
      true
    )


    // =========================================
    // CLEANUP
    // =========================================

    return () => {
      const originalPipette =
        originalPipetteTransformRef.current

      const originalModel =
        originalModelTransformRef.current


      // =========================================
      // RESTORE PIPETTE
      // =========================================

      if (
        originalPipette &&
        pipetteModeRef?.current
      ) {
        const pipette =
          pipetteModeRef.current

        originalPipette.parent.add(
          pipette
        )

        pipette.position.copy(
          originalPipette.position
        )

        pipette.rotation.copy(
          originalPipette.rotation
        )

        pipette.scale.copy(
          originalPipette.scale
        )

        pipette.updateMatrixWorld(
          true
        )
      }


      // =========================================
      // RESTORE MODEL
      // =========================================

      if (
        originalModel &&
        modelRef?.current
      ) {
        const model =
          modelRef.current

        model.position.copy(
          originalModel.position
        )

        model.rotation.copy(
          originalModel.rotation
        )

        model.scale.copy(
          originalModel.scale
        )

        model.updateMatrixWorld(
          true
        )
      }


      // =========================================
      // RESET SAVED VALUES
      // =========================================

      originalPipetteTransformRef.current =
        null

      originalModelTransformRef.current =
        null
    }
  }, [
    modelRef,
    pipetteModeRef,

    modelRefScale,
    pipetteModeRefScale,

    camera,

    xOffset,
    yOffset,
    zOffset,
  ])


  return null
}

export default PipetteMode