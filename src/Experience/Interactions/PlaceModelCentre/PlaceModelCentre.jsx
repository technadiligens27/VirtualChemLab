import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"

import * as THREE from "three"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

const SCALE_EPSILON = 0.001

const PlaceModelCentre = ({
  modelRef,

  modelXOffset = 2,
  modelYOffset = 2.5,
  modelZOffset = 2,

  modelXScale = 1.3,
  modelYScale = 1,
  modelZScale = 1.3,
  hand
}) => {
  const {
    balancePositionRef,
  } = useContext(ModelContext)

  const {
    setSelectedRightHand,
    setSelectedLeftHand,
  } = useContext(InteractionContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const originalTransformRef =
    useRef(null)

  const liquidStatesRef =
    useRef([])

  const animationFrameRef =
    useRef(null)

  // =============================================
  // CHECK WHETHER LIQUID HAS A NON-ZERO SCALE
  // =============================================

  const hasVisibleScale = useCallback(
    (object) => {
      if (!object) {
        return false
      }

      return (
        Math.abs(object.scale.x) >
          SCALE_EPSILON &&
        Math.abs(object.scale.y) >
          SCALE_EPSILON &&
        Math.abs(object.scale.z) >
          SCALE_EPSILON
      )
    },
    []
  )

  // =============================================
  // APPLY SAVED LIQUID VISIBILITY
  // =============================================

  const applyLiquidVisibility =
    useCallback(() => {
      liquidStatesRef.current.forEach(
        ({
          object,
          shouldRemainVisible,
        }) => {
          if (!object) {
            return
          }

          const liquidHasScale =
            hasVisibleScale(object)

          /*
           * The liquid is visible only if:
           *
           * 1. It was originally visible.
           * 2. Its original scale was above zero.
           * 3. Its current scale is still above zero.
           */
          object.visible =
            shouldRemainVisible &&
            liquidHasScale

          object.updateMatrixWorld(true)
        }
      )
    }, [hasVisibleScale])

  // =============================================
  // LESSON STEPS — LESSON 14.1
  // =============================================

  useEffect(() => {
    if (
      selectedLesson === 14.1 &&
      lessonStep === 42
    ) {
      setLessonStep(43)
    }

    if (
      selectedLesson === 14.1 &&
      lessonStep === 60
    ) {
      setLessonStep(61)
    }

    if (
      selectedLesson === 14.2 &&
      lessonStep === 83
    ) {
      setLessonStep(84)
      setSelectedLeftHand(null)
    }

  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  // =============================================
  // LESSON STEPS — LESSON 13
  // =============================================

  useEffect(() => {
    if (
      selectedLesson === 13 &&
      lessonStep === 12
    ) {
      setLessonStep(13)

      setSelectedRightHand(null)
      setSelectedLeftHand(null)

      /*
       * Hand-component cleanup may run after
       * removing the object from the hand.
       * Reapply liquid visibility afterward.
       */
      animationFrameRef.current =
        requestAnimationFrame(() => {
          applyLiquidVisibility()

          animationFrameRef.current =
            requestAnimationFrame(() => {
              applyLiquidVisibility()

              animationFrameRef.current =
                null
            })
        })
    }

    return () => {
      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        )

        animationFrameRef.current =
          null
      }
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
    setSelectedRightHand,
    setSelectedLeftHand,
    applyLiquidVisibility,
  ])

  // =============================================
  // PLACE MODEL AT CENTRE POSITION
  // =============================================

  useLayoutEffect(() => {
    const model =
      modelRef?.current

    const balancePosition =
      balancePositionRef?.current

    if (
      !model ||
      !balancePosition
    ) {
      return
    }

    // ===========================================
    // SAVE ORIGINAL MODEL TRANSFORM
    // ===========================================

    originalTransformRef.current = {
      parent: model.parent,

      position:
        model.position.clone(),

      quaternion:
        model.quaternion.clone(),

      scale:
        model.scale.clone(),
    }

    // ===========================================
    // SAVE LIQUID STATES
    // ===========================================

    const liquidStates = []

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() ||
        ""

      if (
        !childName.includes("liquid")
      ) {
        return
      }

      const liquidHasScale =
        hasVisibleScale(child)

      liquidStates.push({
        object: child,

        originalVisible:
          child.visible,

        originalScale:
          child.scale.clone(),

        /*
         * A hidden or zero-scale liquid must
         * remain hidden when the model moves.
         */
        shouldRemainVisible:
          child.visible &&
          liquidHasScale,
      })

      if (!liquidHasScale) {
        child.visible = false
      }
    })

    liquidStatesRef.current =
      liquidStates

    // ===========================================
    // GET TARGET WORLD POSITION
    // ===========================================

    const targetWorldPosition =
      balancePosition.getWorldPosition(
        new THREE.Vector3()
      )

    // ===========================================
    // GET TARGET PARENT
    // ===========================================

    const targetParent =
      balancePosition.parent

    // ===========================================
    // MOVE MODEL TO TARGET PARENT
    // ===========================================

    if (targetParent) {
      targetParent.attach(model)
    }

    /*
     * Reparenting can expose children that
     * were previously hidden by a parent.
     */
    applyLiquidVisibility()

    // ===========================================
    // CONVERT TARGET POSITION TO LOCAL POSITION
    // ===========================================

    let targetLocalPosition =
      targetWorldPosition.clone()

    if (targetParent) {
      targetLocalPosition =
        targetParent.worldToLocal(
          targetWorldPosition.clone()
        )
    }

    // ===========================================
    // POSITION MODEL
    // ===========================================

    model.position.set(
      targetLocalPosition.x +
        modelXOffset,

      targetLocalPosition.y +
        modelYOffset,

      targetLocalPosition.z +
        modelZOffset
    )

    // ===========================================
    // SCALE MODEL
    // ===========================================

    model.scale.set(
      modelXScale,
      modelYScale,
      modelZScale
    )

    model.updateMatrixWorld(true)

    /*
     * Apply twice so delayed cleanup from a
     * hand component cannot expose the liquid.
     */
    animationFrameRef.current =
      requestAnimationFrame(() => {
        applyLiquidVisibility()

        animationFrameRef.current =
          requestAnimationFrame(() => {
            applyLiquidVisibility()

            animationFrameRef.current =
              null
          })
      })

    console.log(
      "✅ Model placed at centre position"
    )

    // ===========================================
    // CLEANUP / UNMOUNT
    // ===========================================

    return () => {
      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        )

        animationFrameRef.current =
          null
      }

      const original =
        originalTransformRef.current

      if (
        !model ||
        !original
      ) {
        return
      }

      // =========================================
      // RETURN MODEL TO ORIGINAL PARENT
      // =========================================

      if (original.parent) {
        original.parent.add(model)
      }

      // =========================================
      // RESTORE ORIGINAL TRANSFORM
      // =========================================

      model.position.copy(
        original.position
      )

      model.quaternion.copy(
        original.quaternion
      )

      model.scale.copy(
        original.scale
      )

      // =========================================
      // RESTORE LIQUID VISIBILITY SAFELY
      // =========================================

      liquidStatesRef.current.forEach(
        ({
          object,
          originalVisible,
        }) => {
          if (!object) {
            return
          }

          /*
           * Never make a zero-scale liquid
           * visible during cleanup.
           */
          object.visible =
            originalVisible &&
            hasVisibleScale(object)

          object.updateMatrixWorld(true)
        }
      )

      model.updateMatrixWorld(true)

      liquidStatesRef.current = []
      originalTransformRef.current =
        null

      console.log(
        "✅ Model returned to original position"
      )
    }
  }, [
    modelRef,
    balancePositionRef,

    modelXOffset,
    modelYOffset,
    modelZOffset,

    modelXScale,
    modelYScale,
    modelZScale,

    hasVisibleScale,
    applyLiquidVisibility,
  ])

  return null
}

export default PlaceModelCentre