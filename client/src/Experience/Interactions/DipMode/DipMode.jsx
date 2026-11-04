import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
  useThree,
} from "@react-three/fiber"

import * as THREE from "three"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const DipMode = ({
  DipmodelRef,
  recieveModelRef,

  xOffset = 0,
  yOffset = 0,

  recieveModelYOffset = 0,

  dipDistance = 2,

  dipModelScale = 1,
  recieveModelScale = 1,

  scrollSpeed = 0.1,
  animationSpeed = 8,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const {
    gl,
  } = useThree()

  // =========================================
  // KEEP CURRENT LESSON / STEP UPDATED
  // =========================================

  const latestLessonRef =
    useRef(selectedLesson)

  const latestLessonStepRef =
    useRef(lessonStep)

  latestLessonRef.current =
    selectedLesson

  latestLessonStepRef.current =
    lessonStep

  // =========================================
  // SCROLL CONDITIONS
  // =========================================

  const SCROLL_DOWN_CONDITION =
    [15, 15.2].includes(
      selectedLesson
    ) &&
    [16, 22, 29].includes(
      lessonStep
    )

  const SCROLL_UP_CONDITION =
    [15, 15.2].includes(
      selectedLesson
    ) &&
    [17, 23, 30].includes(
      lessonStep
    )

  // =========================================
  // REFS
  // =========================================

  const originalDipRef =
    useRef(null)

  const originalReceiveRef =
    useRef(null)

  const mouthRef =
    useRef(null)

  // 0 = fully raised, 1 = fully dipped
  const dipProgressRef =
    useRef(0)

  const hasFullyDippedRef =
    useRef(false)

  const hasFullyLiftedRef =
    useRef(false)

  const mouthWorldPosition =
    useRef(new THREE.Vector3())

  const targetLocalPosition =
    useRef(new THREE.Vector3())

  const downWorldDirection =
    useRef(new THREE.Vector3(0, -1, 0))

  const downLocalDirection =
    useRef(new THREE.Vector3())

  const parentQuaternionRef =
    useRef(new THREE.Quaternion())

  const parentScaleRef =
    useRef(new THREE.Vector3())

  // =========================================
  // AUTOMATIC LESSON STEPS
  // =========================================

  useEffect(() => {
    if (
      selectedLesson === 15 &&
      lessonStep === 15
    ) {
      setLessonStep(16)
    }

    if (
      selectedLesson === 15 &&
      lessonStep === 21
    ) {
      setLessonStep(22)
    }

    if (
      selectedLesson === 15.2 &&
      lessonStep === 28
    ) {
      setLessonStep(29)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  // =========================================
  // SAVE ORIGINAL TRANSFORMS + FIND MOUTH
  // =========================================

  useEffect(() => {
    const dipModel =
      DipmodelRef?.current

    const receiveModel =
      recieveModelRef?.current

    if (!dipModel || !receiveModel) {
      return
    }

    const saveTransform = (
      model
    ) => ({
      parent: model.parent,

      position:
        model.position.clone(),

      quaternion:
        model.quaternion.clone(),

      scale:
        model.scale.clone(),
    })

    originalDipRef.current =
      saveTransform(dipModel)

    originalReceiveRef.current =
      saveTransform(receiveModel)

    let mouth = null

    receiveModel.traverse((child) => {
      if (
        !mouth &&
        child.name
          ?.toLowerCase()
          .includes("mouth")
      ) {
        mouth = child
      }
    })

    mouthRef.current = mouth

    if (!mouth) {
      console.warn(
        "DipMode: No child containing 'mouth' found."
      )
    }

    // =======================================
    // APPLY MODEL SCALES
    // =======================================

    dipModel.scale
      .copy(originalDipRef.current.scale)
      .multiplyScalar(dipModelScale)

    receiveModel.scale
      .copy(originalReceiveRef.current.scale)
      .multiplyScalar(recieveModelScale)

    dipProgressRef.current = 0

    hasFullyDippedRef.current = false
    hasFullyLiftedRef.current = false

    // =======================================
    // POSITION RECEIVING MODEL
    // =======================================

    receiveModel.position.x = 0

    receiveModel.position.y =
      originalReceiveRef.current.position.y +
      recieveModelYOffset

    receiveModel.updateMatrixWorld(true)

    // =======================================
    // CLEANUP
    // =======================================

    return () => {
      // Add more conditions here if needed.
      // const shouldSkipRestore =
      //   latestLessonRef.current === 15.2 &&
      //   latestLessonStepRef.current === 31

      // // Do not restore either model at this step.
      // if (shouldSkipRestore) {
      //   return
      // }

      const restore = (
        model,
        original
      ) => {
        if (!model || !original) {
          return
        }

        if (original.parent) {
          if (
            model.parent !== original.parent
          ) {
            original.parent.add(model)
          }
        } else {
          model.removeFromParent()
        }

        model.position.copy(
          original.position
        )

        model.quaternion.copy(
          original.quaternion
        )

        model.scale.copy(
          original.scale
        )

        model.updateMatrixWorld(true)
      }

      restore(
        dipModel,
        originalDipRef.current
      )

      restore(
        receiveModel,
        originalReceiveRef.current
      )

      mouthRef.current = null

      originalDipRef.current = null
      originalReceiveRef.current = null

      dipProgressRef.current = 0

      hasFullyDippedRef.current = false
      hasFullyLiftedRef.current = false
    }
  }, [
    DipmodelRef,
    recieveModelRef,
    dipModelScale,
    recieveModelScale,
    recieveModelYOffset,
  ])

  // =========================================
  // UPDATE RECEIVING MODEL Y OFFSET
  // =========================================

  useEffect(() => {
    const receiveModel =
      recieveModelRef?.current

    const original =
      originalReceiveRef.current

    if (!receiveModel || !original) {
      return
    }

    receiveModel.position.x = 0

    receiveModel.position.y =
      original.position.y +
      recieveModelYOffset

    receiveModel.updateMatrixWorld(true)
  }, [
    recieveModelRef,
    recieveModelYOffset,
  ])

  // =========================================
  // SCROLL HANDLER
  // =========================================

  useEffect(() => {
    const canvas = gl.domElement

    const handleWheel = (event) => {
      const delta = event.deltaY

      const modelReady =
        DipmodelRef?.current &&
        recieveModelRef?.current &&
        mouthRef.current

      if (!modelReady || delta === 0) {
        return
      }

      const wheelPixels =
        delta *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? canvas.clientHeight
            : 1)

      // =====================================
      // SCROLL DOWN — DIP MODEL
      // =====================================

      if (
        delta > 0 &&
        SCROLL_DOWN_CONDITION
      ) {
        event.preventDefault()

        dipProgressRef.current =
          THREE.MathUtils.clamp(
            dipProgressRef.current +
              (Math.abs(wheelPixels) / 100) *
                scrollSpeed,
            0,
            1
          )

        if (
          dipProgressRef.current >= 1 &&
          !hasFullyDippedRef.current
        ) {
          hasFullyDippedRef.current = true

          if (
            selectedLesson === 15 &&
            lessonStep === 16
          ) {
            setLessonStep(17)
          }

          if (
            selectedLesson === 15 &&
            lessonStep === 22
          ) {
            setLessonStep(23)
          }

          if (
            selectedLesson === 15.2 &&
            lessonStep === 29
          ) {
            setLessonStep(30)
          }
        }
      }

      // =====================================
      // SCROLL UP — LIFT MODEL
      // =====================================

      if (
        delta < 0 &&
        SCROLL_UP_CONDITION
      ) {
        event.preventDefault()

        dipProgressRef.current =
          THREE.MathUtils.clamp(
            dipProgressRef.current -
              (Math.abs(wheelPixels) / 100) *
                scrollSpeed,
            0,
            1
          )

        if (
          dipProgressRef.current <= 0 &&
          !hasFullyLiftedRef.current
        ) {
          hasFullyLiftedRef.current = true

          if (
            selectedLesson === 15 &&
            lessonStep === 17
          ) {
            setLessonStep(18)
          }

          if (
            selectedLesson === 15 &&
            lessonStep === 23
          ) {
            setLessonStep(24)
          }

          if (
            selectedLesson === 15.2 &&
            lessonStep === 30
          ) {
            setLessonStep(31)
          }
        }
      }
    }

    canvas.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    )

    return () => {
      canvas.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [
    gl,
    DipmodelRef,
    recieveModelRef,
    SCROLL_DOWN_CONDITION,
    SCROLL_UP_CONDITION,
    scrollSpeed,
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  // =========================================
  // ANIMATE DIPPING MODEL
  // =========================================

  useFrame((state, delta) => {
    const dipModel =
      DipmodelRef?.current

    const receiveModel =
      recieveModelRef?.current

    const mouth = mouthRef.current

    if (
      !dipModel ||
      !receiveModel ||
      !mouth ||
      !dipModel.parent
    ) {
      return
    }

    receiveModel.updateWorldMatrix(
      true,
      true
    )

    dipModel.parent.updateWorldMatrix(
      true,
      false
    )

    mouth.getWorldPosition(
      mouthWorldPosition.current
    )

    targetLocalPosition.current.copy(
      mouthWorldPosition.current
    )

    dipModel.parent.worldToLocal(
      targetLocalPosition.current
    )

    targetLocalPosition.current.x +=
      xOffset

    targetLocalPosition.current.y +=
      yOffset

    dipModel.parent.getWorldQuaternion(
      parentQuaternionRef.current
    )

    downLocalDirection.current
      .copy(downWorldDirection.current)
      .applyQuaternion(
        parentQuaternionRef.current
          .clone()
          .invert()
      )

    dipModel.parent.getWorldScale(
      parentScaleRef.current
    )

    downLocalDirection.current.x /=
      parentScaleRef.current.x || 1

    downLocalDirection.current.y /=
      parentScaleRef.current.y || 1

    downLocalDirection.current.z /=
      parentScaleRef.current.z || 1

    targetLocalPosition.current.addScaledVector(
      downLocalDirection.current,
      Math.max(0, dipDistance) *
        dipProgressRef.current
    )

    const smoothing =
      1 - Math.exp(
        -animationSpeed * delta
      )

    dipModel.position.lerp(
      targetLocalPosition.current,
      smoothing
    )
  })

  return null
}

export default DipMode