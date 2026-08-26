import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const InvertModel = ({
  modelRef,
  speed = 4,
  verticalScaleSpeed = 4,
  liquidScaleSpeed = 4,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,setSelectedLesson
  } = useContext(MainGuidelineContext)

  const targetRotationRef = useRef(0)

  const reachedPositionRef =
    useRef("normal")

  // ==========================================
  // VERTICAL CHILD
  // ==========================================

  const verticalRef = useRef(null)

  const verticalTargetScaleRef =
    useRef(0)

  // ==========================================
  // LIQUID CHILD
  // ==========================================

  const liquidRef = useRef(null)

  const liquidOriginalScaleRef =
    useRef(1)

  const liquidTargetScaleRef =
    useRef(1)

  // ==========================================
  // FIND CHILDREN
  // ==========================================

  useEffect(() => {
    if (!modelRef?.current) return

    verticalRef.current = null
    liquidRef.current = null

    modelRef.current.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      // ======================================
      // FIND VERTICAL
      // ======================================

      if (
        childName.includes("vertical")
      ) {
        verticalRef.current = child

        // Start hidden and scaled down
        verticalRef.current.scale.y = 0
        verticalRef.current.visible = false

        verticalTargetScaleRef.current = 0

        console.log(
          "✅ Vertical child found:",
          child.name
        )
      }

      // ======================================
      // FIND LIQUID
      // ======================================

      if (
        childName.includes("liquid")
      ) {
        liquidRef.current = child

        liquidOriginalScaleRef.current =
          child.scale.y

        liquidTargetScaleRef.current =
          child.scale.y

        console.log(
          "✅ Liquid child found:",
          child.name
        )

        console.log(
          "Liquid original scale:",
          child.scale.y
        )
      }
    })

    if (!verticalRef.current) {
      console.log(
        "ℹ️ No vertical child found"
      )
    }

    if (!liquidRef.current) {
      console.log(
        "ℹ️ No liquid child found"
      )
    }
  }, [modelRef])

  // ==========================================
  // SCROLL
  // ==========================================

  useEffect(() => {
    const handleWheel = (event) => {
      if (!modelRef?.current) return

      // ======================================
      // SCROLL DOWN
      // TURN UPSIDE DOWN
      // ======================================

      if (event.deltaY > 0) {
        targetRotationRef.current =
          Math.PI

        reachedPositionRef.current =
          null

        // Show vertical FIRST
        if (verticalRef.current) {
          verticalRef.current.visible =
            true

          verticalTargetScaleRef.current =
            1
        }

        // Liquid grows to full scale
        liquidTargetScaleRef.current =
          1
      }

      // ======================================
      // SCROLL UP
      // RETURN TO NORMAL
      // ======================================

      if (event.deltaY < 0) {
        targetRotationRef.current =
          0

        reachedPositionRef.current =
          null

        // Hide vertical FIRST
        if (verticalRef.current) {
          verticalRef.current.visible =
            false

          verticalTargetScaleRef.current =
            0
        }

        // Liquid returns to original scale
        liquidTargetScaleRef.current =
          liquidOriginalScaleRef.current
      }
    }

    window.addEventListener(
      "wheel",
      handleWheel
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [modelRef])

  // ==========================================
  // ANIMATION
  // ==========================================

  useFrame((_, delta) => {
    if (!modelRef?.current) return

    // ========================================
    // MODEL ROTATION
    // ========================================

    const currentRotation =
      modelRef.current.rotation.z

    const targetRotation =
      targetRotationRef.current

    const difference =
      targetRotation -
      currentRotation

    modelRef.current.rotation.z +=
      difference *
      Math.min(
        speed * delta,
        1
      )

    // ========================================
    // VERTICAL SCALE
    // ========================================

    if (verticalRef.current) {
      const currentScale =
        verticalRef.current.scale.y

      const targetScale =
        verticalTargetScaleRef.current

      const scaleDifference =
        targetScale -
        currentScale

      verticalRef.current.scale.y +=
        scaleDifference *
        Math.min(
          verticalScaleSpeed * delta,
          1
        )

      if (
        Math.abs(scaleDifference) <
        0.001
      ) {
        verticalRef.current.scale.y =
          targetScale
      }

      verticalRef.current.updateMatrixWorld(
        true
      )
    }

    // ========================================
    // LIQUID SCALE
    // ========================================

    if (liquidRef.current) {
      const currentScale =
        liquidRef.current.scale.y

      const targetScale =
        liquidTargetScaleRef.current

      const scaleDifference =
        targetScale -
        currentScale

      liquidRef.current.scale.y +=
        scaleDifference *
        Math.min(
          liquidScaleSpeed * delta,
          1
        )

      if (
        Math.abs(scaleDifference) <
        0.001
      ) {
        liquidRef.current.scale.y =
          targetScale
      }

      liquidRef.current.updateMatrixWorld(
        true
      )
    }

    // ========================================
    // FULLY UPSIDE DOWN
    // ========================================

    if (
      targetRotation === Math.PI &&
      Math.abs(difference) < 0.01 &&
      reachedPositionRef.current !==
        "upsideDown"
    ) {
      modelRef.current.rotation.z =
        Math.PI

      reachedPositionRef.current =
        "upsideDown"

      if (verticalRef.current) {
        verticalRef.current.visible =
          true

        verticalRef.current.scale.y = 1
      }

      if (liquidRef.current) {
        liquidRef.current.scale.y = 1
      }

      if (
        selectedLesson === 11 &&
        lessonStep === 24
      ) {
        setLessonStep(25)
      }

      if (
        selectedLesson === 11 &&
        lessonStep === 26
      ) {
        setLessonStep(27)
      }

      if (
        selectedLesson === 11 &&
        lessonStep === 28
      ) {
        setLessonStep(29)
      }

      if(selectedLesson===12.1 && lessonStep===44){
        setLessonStep(45)
      }

      if(selectedLesson===12.1 && lessonStep===46){
        setLessonStep(47)
      }

      if(selectedLesson===12.1 && lessonStep===48){
        setLessonStep(49)
      }

      console.log(
        "🔄 Flask fully upside down"
      )
    }

    // ========================================
    // FULLY BACK TO NORMAL
    // ========================================

    if (
      targetRotation === 0 &&
      Math.abs(difference) < 0.01 &&
      reachedPositionRef.current !==
        "normal"
    ) {
      modelRef.current.rotation.z =
        0

      reachedPositionRef.current =
        "normal"

      if (verticalRef.current) {
        verticalRef.current.scale.y = 0
        verticalRef.current.visible =
          false
      }

      if (liquidRef.current) {
        liquidRef.current.scale.y =
          liquidOriginalScaleRef.current
      }

      if (
        selectedLesson === 11 &&
        lessonStep === 25
      ) {
        setLessonStep(26)
      }

      if (
        selectedLesson === 11 &&
        lessonStep === 27
      ) {
        setLessonStep(28)
      }

      if (
        selectedLesson === 11 &&
        lessonStep === 29
      ) {
        setLessonStep(30)
      }

      if(selectedLesson===12.1 && lessonStep===45){
        setLessonStep(46)
      }

      if(selectedLesson===12.1 && lessonStep===47){
        setLessonStep(48)
      }

      if(selectedLesson===12.1 && lessonStep===49){
        setLessonStep(49.5)
        setSelectedLesson(12.2)
      }

      console.log(
        "✅ Flask returned to normal"
      )
    }
  })

  return null
}

export default InvertModel