import {
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

const PlaceModelCentre = ({
  modelRef,

  modelXOffset = 2,
  modelYOffset = 2.5,
  modelZOffset = 2,

  modelXScale = 1.3,
  modelYScale = 1,
  modelZScale = 1.3,
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
  // CHECK EFFECTIVE VISIBILITY
  // =============================================

  const getEffectiveVisibility = (
    object
  ) => {
    let currentObject = object

    while (currentObject) {
      if (
        currentObject.visible === false
      ) {
        return false
      }

      currentObject =
        currentObject.parent
    }

    return true
  }

  // =============================================
  // RESTORE SAVED LIQUID VISIBILITY
  // =============================================

  const applyLiquidVisibility = () => {
    liquidStatesRef.current.forEach(
      ({
        object,
        wasEffectivelyVisible,
      }) => {
        if (!object) {
          return
        }

        /*
         * If the liquid was hidden through one
         * of its previous parents, keep the
         * liquid hidden after reparenting.
         */
        object.visible =
          wasEffectivelyVisible

        object.updateMatrixWorld(true)
      }
    )
  }

  // =============================================
  // LESSON STEP 14.1
  // =============================================

  useEffect(() => {
    if (
      selectedLesson === 14.1 &&
      lessonStep === 42
    ) {
      setLessonStep(43)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  // =============================================
  // LESSON STEP 13
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
       * The hand components may run cleanup
       * after their state becomes null and
       * restore the liquid visibility.
       *
       * Apply the saved visibility again on
       * the next frame.
       */
      animationFrameRef.current =
        requestAnimationFrame(() => {
          applyLiquidVisibility()
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
  ])

  // =============================================
  // PLACE MODEL AT BALANCE POSITION
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

    // =============================================
    // SAVE ORIGINAL MODEL TRANSFORM
    // =============================================

    originalTransformRef.current = {
      parent: model.parent,

      position:
        model.position.clone(),

      quaternion:
        model.quaternion.clone(),

      scale:
        model.scale.clone(),
    }

    // =============================================
    // SAVE LIQUID VISIBILITY
    // =============================================

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

      liquidStates.push({
        object: child,

        // Save the child's actual value.
        originalVisible:
          child.visible,

        /*
         * Save whether it was really visible
         * before changing its parent.
         */
        wasEffectivelyVisible:
          getEffectiveVisibility(child),
      })
    })

    liquidStatesRef.current =
      liquidStates

    // =============================================
    // GET TARGET WORLD POSITION
    // =============================================

    const targetWorldPosition =
      balancePosition.getWorldPosition(
        new THREE.Vector3()
      )

    // =============================================
    // GET TARGET PARENT
    // =============================================

    const targetParent =
      balancePosition.parent

    // =============================================
    // MOVE MODEL TO TARGET PARENT
    // =============================================

    if (targetParent) {
      targetParent.attach(model)
    }

    /*
     * Reparenting can expose liquids that were
     * hidden by an invisible previous parent.
     */
    applyLiquidVisibility()

    // =============================================
    // CONVERT TARGET POSITION TO LOCAL POSITION
    // =============================================

    let targetLocalPosition =
      targetWorldPosition.clone()

    if (targetParent) {
      targetLocalPosition =
        targetParent.worldToLocal(
          targetWorldPosition.clone()
        )
    }

    // =============================================
    // POSITION MODEL
    // =============================================

    model.position.set(
      targetLocalPosition.x +
        modelXOffset,

      targetLocalPosition.y +
        modelYOffset,

      targetLocalPosition.z +
        modelZOffset
    )

    // =============================================
    // SCALE MODEL
    // =============================================

    model.scale.set(
      modelXScale,
      modelYScale,
      modelZScale
    )

    model.updateMatrixWorld(true)

    /*
     * Apply it once more on the next frame in
     * case another component's cleanup restores
     * the liquid visibility.
     */
    animationFrameRef.current =
      requestAnimationFrame(() => {
        applyLiquidVisibility()
      })

    console.log(
      "✅ Model placed at balance position"
    )

    // =============================================
    // CLEANUP / UNMOUNT
    // =============================================

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

      // ===========================================
      // RETURN MODEL TO ORIGINAL PARENT
      // ===========================================

      if (original.parent) {
        original.parent.add(model)
      }

      // ===========================================
      // RESTORE ORIGINAL TRANSFORM
      // ===========================================

      model.position.copy(
        original.position
      )

      model.quaternion.copy(
        original.quaternion
      )

      model.scale.copy(
        original.scale
      )

      // ===========================================
      // RESTORE ORIGINAL LIQUID VISIBILITY
      // ===========================================

      liquidStatesRef.current.forEach(
        ({
          object,
          originalVisible,
        }) => {
          if (object) {
            object.visible =
              originalVisible
          }
        }
      )

      model.updateMatrixWorld(true)

      liquidStatesRef.current = []

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
  ])

  return null
}

export default PlaceModelCentre