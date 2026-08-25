import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import PouringModeInFunnelMode from "../PouringModeInFunnelMode/PouringModeInFunnelMode"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

const FunnelMode = ({
  modelRef,
  funnelRef,

  funnelScale = 1,
  modelScale = 1,

  funnelYOffset = 0,
  modelYOffset = 0,
  modelXOffset = 0,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const {
    volumetricRef,
    mainBuiretteRef,
  } = useContext(
    ModelContext
  )

  const {
    isPouringModeFunnelMode,
    setIsPouringModeFunnelMode,
  } = useContext(
    InteractionContext
  )

  // =====================================================
  // ORIGINAL MODEL TRANSFORMS
  // =====================================================

  const originalModelPositionRef =
    useRef(null)

  const originalModelRotationRef =
    useRef(null)

  const originalModelScaleRef =
    useRef(null)

  // =====================================================
  // ORIGINAL FUNNEL TRANSFORMS
  // =====================================================

  const originalFunnelParentRef =
    useRef(null)

  const originalFunnelPositionRef =
    useRef(null)

  const originalFunnelRotationRef =
    useRef(null)

  const originalFunnelScaleRef =
    useRef(null)

  const originalFunnelVisibleRef =
    useRef(null)

  // =====================================================
  // LESSON STEP
  // =====================================================

  useEffect(() => {
    if (
      selectedLesson === 12.2 &&
      lessonStep === 54
    ) {
      setLessonStep(55)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  // =====================================================
  // P
  // ENTER / EXIT INNER POURING MODE
  // =====================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code !== "KeyP") return

      setIsPouringModeFunnelMode(
        (prev) => {
          const next = !prev

          if (next) {
            console.log(
              "ENTERING PouringModeInFunnelMode"
            )
          } else {
            console.log(
              "EXITING PouringModeInFunnelMode"
            )

            if (
              selectedLesson === 12.2 &&
              lessonStep === 58
            ) {
              setLessonStep(59)
            }
          }

          return next
        }
      )
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    )

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      )
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
    setIsPouringModeFunnelMode,
  ])

  // =====================================================
  // RESET INNER POURING MODE WHEN
  // WHOLE FUNNEL MODE UNMOUNTS
  // =====================================================

  useEffect(() => {
    return () => {
      setIsPouringModeFunnelMode(
        false
      )
    }
  }, [
    setIsPouringModeFunnelMode,
  ])

  // =====================================================
  // SAVE ORIGINALS
  // ATTACH FUNNEL TO MOUTH
  // =====================================================

  useEffect(() => {
    if (!modelRef?.current) return
    if (!funnelRef?.current) return

    const model =
      modelRef.current

    const funnel =
      funnelRef.current

    // ===================================================
    // SAVE MODEL BEFORE CHANGING ANYTHING
    // ===================================================

    originalModelPositionRef.current =
      model.position.clone()

    originalModelRotationRef.current =
      model.rotation.clone()

    originalModelScaleRef.current =
      model.scale.clone()

    // ===================================================
    // SAVE FUNNEL BEFORE ATTACHING
    // ===================================================

    originalFunnelParentRef.current =
      funnel.parent

    originalFunnelPositionRef.current =
      funnel.position.clone()

    originalFunnelRotationRef.current =
      funnel.rotation.clone()

    originalFunnelScaleRef.current =
      funnel.scale.clone()

    originalFunnelVisibleRef.current =
      funnel.visible

    // ===================================================
    // FIND MOUTH
    // ===================================================

    let mouthObject = null

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        childName.includes("mouth")
      ) {
        mouthObject = child
      }
    })

    if (!mouthObject) {
      console.log(
        "Mouth child not found"
      )

      return
    }

    // ===================================================
    // MODIFY MODEL
    // ===================================================

    model.scale.setScalar(
      modelScale
    )

    model.position.x +=
      modelXOffset

    model.position.y +=
      modelYOffset

    model.updateMatrixWorld(true)

    // ===================================================
    // ATTACH FUNNEL
    // ===================================================

    mouthObject.add(
      funnel
    )

    funnel.position.set(
      0,
      funnelYOffset,
      0
    )

    funnel.rotation.set(
      0,
      0,
      0
    )

    funnel.scale.setScalar(
      funnelScale
    )

    funnel.visible = true

    funnel.updateMatrixWorld(true)

    console.log(
      "Funnel attached to mouth"
    )

    // ===================================================
    // RESTORE WHEN FUNNELMODE UNMOUNTS
    // ===================================================

    return () => {
      // -----------------------------------------------
      // RESTORE MODEL
      // -----------------------------------------------

      if (modelRef?.current) {
        const model =
          modelRef.current

        if (
          originalModelPositionRef.current
        ) {
          model.position.copy(
            originalModelPositionRef.current
          )
        }

        if (
          originalModelRotationRef.current
        ) {
          model.rotation.copy(
            originalModelRotationRef.current
          )
        }

        if (
          originalModelScaleRef.current
        ) {
          model.scale.copy(
            originalModelScaleRef.current
          )
        }

        model.updateMatrixWorld(true)
      }

      // -----------------------------------------------
      // RESTORE FUNNEL
      // -----------------------------------------------

      if (funnelRef?.current) {
        const funnel =
          funnelRef.current

        // Restore parent FIRST
        if (
          originalFunnelParentRef.current
        ) {
          originalFunnelParentRef.current.add(
            funnel
          )
        }

        // Then restore local transform
        if (
          originalFunnelPositionRef.current
        ) {
          funnel.position.copy(
            originalFunnelPositionRef.current
          )
        }

        if (
          originalFunnelRotationRef.current
        ) {
          funnel.rotation.copy(
            originalFunnelRotationRef.current
          )
        }

        if (
          originalFunnelScaleRef.current
        ) {
          funnel.scale.copy(
            originalFunnelScaleRef.current
          )
        }

        if (
          originalFunnelVisibleRef.current !==
          null
        ) {
          funnel.visible =
            originalFunnelVisibleRef.current
        }

        funnel.updateMatrixWorld(true)

        console.log(
          "Funnel restored to original pose"
        )
      }
    }
  }, [
    modelRef,
    funnelRef,
    funnelScale,
    modelScale,
    funnelYOffset,
    modelYOffset,
    modelXOffset,
  ])

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      {isPouringModeFunnelMode && (
        <PouringModeInFunnelMode
          modelRef={
            mainBuiretteRef
          }
          pouringModelRef={
            volumetricRef
          }
          modelScale={0.6}
          pouringModelScale={0.6}
          pouringModelXOffset={1.2}
          pouringModelYOffset={1}
        />
      )}
    </>
  )
}

export default FunnelMode