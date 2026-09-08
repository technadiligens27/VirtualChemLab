import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import {
  useFrame,
  useThree,
} from "@react-three/fiber"

import * as THREE from "three"

import PourPowderFromTestube from "../PourPowderFromTestube/PourPowderFromTestube"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PourModeDeliveryTube = ({
  modelRef,
  otherModelRef,

  modelXOffset = 0.5,
  modelYOffset = 0,
  modelZOffset = 0,

  modelScale = 0.6,

  // Smaller value =
  // more scrolling required
  rotationSpeed = 0.05,

  maxRotation = Math.PI / 5,
}) => {
  const {
    camera,
  } = useThree()

  const {
    testube03Ref,
  } = useContext(
    ModelContext
  )

  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)

  useEffect(()=>{
    if(selectedLesson===13 && lessonStep===26){
      setLessonStep(27)
    }
  },[selectedLesson,lessonStep])

  // =====================================================
  // ROTATION
  // =====================================================

  const rotationZRef =
    useRef(0)

  const baseRotationRef =
    useRef(
      new THREE.Euler()
    )

  // =====================================================
  // ORIGINAL TRANSFORMS
  // =====================================================

  const originalPositionRef =
    useRef(null)

  const originalRotationRef =
    useRef(null)

  const originalScaleRef =
    useRef(null)

  // =====================================================
  // POURING STATE
  // =====================================================

  const [
    isPouring,
    setIsPouring,
  ] = useState(false)

  // =====================================================
  // POSITION MODEL AT OTHER MODEL "MOUTH"
  // =====================================================

  useEffect(() => {
    const model =
      modelRef?.current

    const otherModel =
      otherModelRef?.current

    if (
      !model ||
      !otherModel
    ) {
      return
    }

    // =====================================================
    // SAVE ORIGINAL TRANSFORMS
    // =====================================================

    originalPositionRef.current =
      model.position.clone()

    originalRotationRef.current =
      model.rotation.clone()

    originalScaleRef.current =
      model.scale.clone()

    // =====================================================
    // SAVE STARTING ROTATION
    // =====================================================

    baseRotationRef.current.copy(
      model.rotation
    )

    rotationZRef.current = 0

    setIsPouring(false)

    // =====================================================
    // UPDATE WORLD MATRICES FIRST
    // =====================================================

    otherModel.updateMatrixWorld(
      true
    )

    camera.updateMatrixWorld(
      true
    )

    // =====================================================
    // FIND MOUTH
    // =====================================================

    let mouthObject =
      null

    otherModel.traverse(
      (child) => {
        if (
          mouthObject
        ) {
          return
        }

        const childName =
          child.name
            ?.toLowerCase() ||
          ""

        if (
          childName.includes(
            "mouth"
          )
        ) {
          mouthObject =
            child
        }
      }
    )

    // =====================================================
    // MOUTH NOT FOUND
    // =====================================================

    if (
      !mouthObject
    ) {
      console.warn(
        "PourModeDeliveryTube: Mouth child not found."
      )

      return
    }

    // =====================================================
    // GET MOUTH WORLD POSITION
    // =====================================================

    const mouthWorldPosition =
      new THREE.Vector3()

    mouthObject.getWorldPosition(
      mouthWorldPosition
    )

    // =====================================================
    // MODEL IS ATTACHED TO CAMERA
    //
    // CONVERT MOUTH WORLD POSITION
    // INTO CAMERA LOCAL POSITION
    // =====================================================

    const localPosition =
      camera.worldToLocal(
        mouthWorldPosition.clone()
      )

    // =====================================================
    // APPLY POSITION OFFSETS
    // =====================================================

    localPosition.x +=
      modelXOffset

    localPosition.y +=
      modelYOffset

    localPosition.z +=
      modelZOffset

    // =====================================================
    // APPLY POSITION
    // =====================================================

    model.position.copy(
      localPosition
    )

    // =====================================================
    // APPLY SCALE
    // =====================================================

    model.scale.setScalar(
      modelScale
    )

    model.updateMatrixWorld(
      true
    )

    // =====================================================
    // CLEANUP
    // RESTORE ORIGINAL TRANSFORMS
    // =====================================================

    return () => {
      const currentModel =
        modelRef?.current

      if (
        !currentModel
      ) {
        return
      }

      // ===================================================
      // POSITION
      // ===================================================

      if (
        originalPositionRef.current
      ) {
        currentModel.position.copy(
          originalPositionRef.current
        )
      }

      // ===================================================
      // ROTATION
      // ===================================================

      if (
        originalRotationRef.current
      ) {
        currentModel.rotation.copy(
          originalRotationRef.current
        )
      }

      // ===================================================
      // SCALE
      // ===================================================

      if (
        originalScaleRef.current
      ) {
        currentModel.scale.copy(
          originalScaleRef.current
        )
      }

      currentModel.updateMatrixWorld(
        true
      )

      // ===================================================
      // RESET POUR STATE
      // ===================================================

      rotationZRef.current =
        0

      setIsPouring(
        false
      )
    }
  }, [
    modelRef,
    otherModelRef,

    camera,

    modelXOffset,
    modelYOffset,
    modelZOffset,

    modelScale,
  ])

  // =====================================================
  // MOUSE WHEEL
  // =====================================================

  useEffect(() => {
    const handleWheel =
      (event) => {
        const model =
          modelRef?.current

        if (
          !model
        ) {
          return
        }

        event.preventDefault()

        // =================================================
        // SCROLL DOWN
        //
        // ROTATE TOWARD POURING ANGLE
        // =================================================

        if (
          event.deltaY > 0
        ) {
          rotationZRef.current =
            Math.min(
              rotationZRef.current +
                rotationSpeed,

              maxRotation
            )
        }

        // =================================================
        // SCROLL UP
        //
        // ROTATE BACK TO STARTING ANGLE
        // =================================================

        if (
          event.deltaY < 0
        ) {
          rotationZRef.current =
            Math.max(
              rotationZRef.current -
                rotationSpeed,

              0
            )
        }
      }

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [
    modelRef,
    rotationSpeed,
    maxRotation,
  ])

  // =====================================================
  // APPLY ROTATION
  // =====================================================

  useFrame(() => {
    const model =
      modelRef?.current

    if (
      !model
    ) {
      return
    }

    // =====================================================
    // ROTATE MODEL
    // =====================================================

    model.rotation.set(
      baseRotationRef.current.x,

      baseRotationRef.current.y,

      baseRotationRef.current.z +
        rotationZRef.current
    )

    // =====================================================
    // CHECK WHETHER FULL POUR ANGLE HAS BEEN REACHED
    // =====================================================

    const pouringNow =
      rotationZRef.current >=
      maxRotation - 0.001

    // =====================================================
    // ONLY UPDATE WHEN VALUE CHANGES
    // =====================================================

    if (
      pouringNow !==
      isPouring
    ) {
      setIsPouring(
        pouringNow
      )

      console.log(
        "Delivery tube pouring:",
        pouringNow
      )
    }
  })

  // =====================================================
  // POUR POWDER
  // =====================================================
      console.log("LessonStep:",lessonStep)

  return (
    <>
      <PourPowderFromTestube
        isPouring={
          isPouring
        }
        model={
          testube03Ref?.current
        }
      />
    </>
  )
}

export default PourModeDeliveryTube