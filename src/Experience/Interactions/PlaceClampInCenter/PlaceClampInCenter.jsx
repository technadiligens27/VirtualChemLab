import {
  useContext,
  useEffect,
  useRef,
} from "react"

import * as THREE from "three"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PlaceClampInCenter = ({
  clampXOffset = -2.5,
  clampYOffset = 7,
  clampZOffset = 2,

  clampXScale = 1,
  clampYScale = 1,
  clampZScale = 1,
}) => {
  const {
    buretteClampRef,
    balancePositionRef,
  } = useContext(ModelContext)

  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const originalTransformRef =
    useRef(null)

  // =============================================
  // EXISTING LESSON STEP LOGIC
  // =============================================

  useEffect(()=>{
    if(selectedLesson===13 && lessonStep==12){
      setLessonStep(13)
    }
  })

  useEffect(() => {
    if (
      selectedLesson === 8 &&
      lessonStep === 25
    ) {
      setLessonStep(26)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])


  useEffect(() => {
    if (
      selectedLesson === 9 &&
      lessonStep === 22
    ) {
      setLessonStep(23)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 11.1 &&
      lessonStep === 50
    ) {
      setLessonStep(51)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 11.1 &&
      lessonStep === 67
    ) {
      setLessonStep(68)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12.2 &&
      lessonStep === 82
    ) {
      setLessonStep(83)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12.2 &&
      lessonStep === 101
    ) {
      setLessonStep(102)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  // =============================================
  // PLACE CLAMP IN CENTRE
  // =============================================

  useEffect(() => {
    const clamp =
      buretteClampRef?.current

    const centerPosition =
      balancePositionRef?.current

    if (
      !clamp ||
      !centerPosition
    ) {
      console.log(
        "Clamp or centre position was not found"
      )

      return
    }

    // ===========================================
    // SAVE ORIGINAL TRANSFORM
    // ===========================================

    if (
      !originalTransformRef.current
    ) {
      originalTransformRef.current = {
        parent:
          clamp.parent,

        position:
          clamp.position.clone(),

        rotation:
          clamp.rotation.clone(),

        scale:
          clamp.scale.clone(),
      }
    }

    // ===========================================
    // GET CENTRE POSITION
    // ===========================================

    const worldPosition =
      new THREE.Vector3()

    centerPosition.getWorldPosition(
      worldPosition
    )

    if (
      clamp.parent
    ) {
      clamp.parent.worldToLocal(
        worldPosition
      )
    }

    // ===========================================
    // POSITION CLAMP
    // ===========================================

    clamp.position.copy(
      worldPosition
    )

    clamp.position.x +=
      clampXOffset

    clamp.position.y +=
      clampYOffset

    clamp.position.z +=
      clampZOffset

    // ===========================================
    // SCALE CLAMP X / Y / Z
    // ===========================================

    clamp.scale.set(
      clampXScale,
      clampYScale,
      clampZScale
    )

    clamp.updateMatrixWorld(
      true
    )

    console.log(
      "Clamp moved to centre"
    )

    // ===========================================
    // CLEANUP / UNMOUNT
    // ===========================================

    return () => {
      const original =
        originalTransformRef.current

      if (
        !original ||
        !clamp
      ) {
        return
      }

      if (
        original.parent
      ) {
        original.parent.add(
          clamp
        )
      }

      clamp.position.copy(
        original.position
      )

      clamp.rotation.copy(
        original.rotation
      )

      clamp.scale.copy(
        original.scale
      )

      clamp.updateMatrixWorld(
        true
      )

      console.log(
        "Clamp returned to original position"
      )
    }
  }, [
    buretteClampRef,
    balancePositionRef,

    clampXOffset,
    clampYOffset,
    clampZOffset,

    clampXScale,
    clampYScale,
    clampZScale,
  ])

  return null
}

export default PlaceClampInCenter