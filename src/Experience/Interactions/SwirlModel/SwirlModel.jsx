import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import * as THREE from "three"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import ChlorinationSeparatingFunnelColorChange from "../ChlorinationSeparatingFunnelColorChange/ChlorinationSeparatingFunnelColorChange"

const SwirlModel = ({
  modelRef,

  swirlSpeed = 8,
  swirlAmount = 0.15,

  stopDelay = 0.5,
  returnSpeed = 5,

  useTargetSwirls = false,
  targetSwirls = 3,

  // Extra movement applied to all children.
  liquidSwirlAmount = 0.03,
  liquidSwirlSpeed = 1.4,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const isSwirlingRef =
    useRef(false)

  const swirlTimeRef =
    useRef(0)

  const timeSinceLastScrollRef =
    useRef(0)

  const completedSwirlsRef =
    useRef(0)

  const hasFinishedRef =
    useRef(false)

  const isReturningAfterFinishRef =
    useRef(false)

  const lessonAdvancedRef =
    useRef(false)

  const originalRotationRef =
    useRef({
      x: 0,
      y: 0,
      z: 0,
    })

  // Shared group containing every direct
  // child of the model.
  const allChildrenGroupRef =
    useRef(null)

  useEffect(() => {
    const model =
      modelRef?.current

    if (!model) return

    originalRotationRef.current = {
      x: model.rotation.x,
      y: model.rotation.y,
      z: model.rotation.z,
    }

    // Store every direct child.
    // Nested children remain attached to
    // their direct parents.
    const originalChildren = [
      ...model.children,
    ]

    const originalChildrenData =
      originalChildren.map(
        (child) => ({
          child,

          position:
            child.position.clone(),

          quaternion:
            child.quaternion.clone(),

          scale:
            child.scale.clone(),
        })
      )

    model.updateWorldMatrix(
      true,
      true
    )

    // Find the centre of all children.
    const bounds =
      new THREE.Box3()

    originalChildren.forEach(
      (child) => {
        bounds.expandByObject(
          child
        )
      }
    )

    const sharedCentre =
      bounds.isEmpty()
        ? new THREE.Vector3()
        : bounds.getCenter(
            new THREE.Vector3()
          )

    // Convert the world-space centre
    // into the model's local space.
    model.worldToLocal(
      sharedCentre
    )

    const allChildrenGroup =
      new THREE.Group()

    allChildrenGroup.name =
      "all-children-swirl-group"

    allChildrenGroup.position.copy(
      sharedCentre
    )

    model.add(
      allChildrenGroup
    )

    // Attach every direct child to the
    // same pivot while preserving its
    // world transform.
    originalChildren.forEach(
      (child) => {
        allChildrenGroup.attach(
          child
        )
      }
    )

    allChildrenGroupRef.current =
      allChildrenGroup

    // Reset animation state.
    swirlTimeRef.current = 0

    completedSwirlsRef.current = 0

    hasFinishedRef.current = false

    isReturningAfterFinishRef.current =
      false

    lessonAdvancedRef.current =
      false

    isSwirlingRef.current =
      false

    timeSinceLastScrollRef.current =
      0

    return () => {
      const currentGroup =
        allChildrenGroupRef.current

      if (currentGroup) {
        originalChildrenData.forEach(
          ({
            child,
            position,
            quaternion,
            scale,
          }) => {
            // Restore the child directly
            // under the original model.
            model.add(child)

            child.position.copy(
              position
            )

            child.quaternion.copy(
              quaternion
            )

            child.scale.copy(
              scale
            )
          }
        )

        currentGroup.removeFromParent()
      }

      allChildrenGroupRef.current =
        null
    }
  }, [
    modelRef,
    useTargetSwirls,
    targetSwirls,
  ])

  useEffect(() => {
    const handleWheel = () => {
      if (!modelRef?.current) {
        return
      }

      // Do not start swirling again after
      // the target has been completed.
      if (
        useTargetSwirls &&
        hasFinishedRef.current
      ) {
        return
      }

      isSwirlingRef.current =
        true

      timeSinceLastScrollRef.current =
        0
    }

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: true,
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
    useTargetSwirls,
  ])

  useFrame((_, delta) => {
    const model =
      modelRef?.current

    if (!model) return

    const allChildrenGroup =
      allChildrenGroupRef.current

    // =====================================
    // SWIRLING
    // =====================================

    if (
      isSwirlingRef.current &&
      !hasFinishedRef.current
    ) {
      swirlTimeRef.current +=
        delta * swirlSpeed

      timeSinceLastScrollRef.current +=
        delta

      const angle =
        swirlTimeRef.current

      // Swirl the main model.
      // All children follow this rotation.
      model.rotation.x =
        originalRotationRef.current.x +
        Math.sin(angle) *
          swirlAmount

      model.rotation.z =
        originalRotationRef.current.z +
        Math.cos(angle) *
          swirlAmount

      // Apply the additional swirl to the
      // shared group. All children move
      // together, including both liquids,
      // powder and glass meshes.
      if (allChildrenGroup) {
        const childAngle =
          angle *
          liquidSwirlSpeed

        allChildrenGroup.rotation.x =
          Math.sin(childAngle) *
          liquidSwirlAmount

        allChildrenGroup.rotation.z =
          Math.cos(childAngle) *
          liquidSwirlAmount
      }

      // ===================================
      // TARGET SWIRL MODE
      // ===================================

      if (useTargetSwirls) {
        const completedSwirls =
          Math.floor(
            swirlTimeRef.current /
              (Math.PI * 2)
          )

        if (
          completedSwirls >
          completedSwirlsRef.current
        ) {
          completedSwirlsRef.current =
            completedSwirls

          console.log(
            "Swirl completed:",
            completedSwirlsRef.current
          )
        }

        if (
          completedSwirlsRef.current >=
          targetSwirls
        ) {
          hasFinishedRef.current =
            true

          isSwirlingRef.current =
            false

          isReturningAfterFinishRef.current =
            true

          console.log(
            `✅ ${targetSwirls} swirls completed`
          )

          console.log(
            "Returning to original rotation..."
          )

          return
        }
      }

      // Stop when the user stops scrolling.
      if (
        timeSinceLastScrollRef.current >=
        stopDelay
      ) {
        isSwirlingRef.current =
          false
      }

      return
    }

    // =====================================
    // RETURN MODEL
    // =====================================

    const returnFactor =
      Math.min(
        returnSpeed * delta,
        1
      )

    model.rotation.x +=
      (
        originalRotationRef.current.x -
        model.rotation.x
      ) *
      returnFactor

    model.rotation.y +=
      (
        originalRotationRef.current.y -
        model.rotation.y
      ) *
      returnFactor

    model.rotation.z +=
      (
        originalRotationRef.current.z -
        model.rotation.z
      ) *
      returnFactor

    // =====================================
    // RETURN ALL CHILDREN
    // =====================================

    if (allChildrenGroup) {
      allChildrenGroup.rotation.x +=
        (
          0 -
          allChildrenGroup.rotation.x
        ) *
        returnFactor

      allChildrenGroup.rotation.y +=
        (
          0 -
          allChildrenGroup.rotation.y
        ) *
        returnFactor

      allChildrenGroup.rotation.z +=
        (
          0 -
          allChildrenGroup.rotation.z
        ) *
        returnFactor
    }

    const xDifference =
      Math.abs(
        model.rotation.x -
          originalRotationRef.current.x
      )

    const yDifference =
      Math.abs(
        model.rotation.y -
          originalRotationRef.current.y
      )

    const zDifference =
      Math.abs(
        model.rotation.z -
          originalRotationRef.current.z
      )

    // =====================================
    // FULLY RETURNED
    // =====================================

    if (
      xDifference < 0.001 &&
      yDifference < 0.001 &&
      zDifference < 0.001
    ) {
      model.rotation.set(
        originalRotationRef.current.x,
        originalRotationRef.current.y,
        originalRotationRef.current.z
      )

      // Return all children exactly to
      // their original shared rotation.
      if (allChildrenGroup) {
        allChildrenGroup.rotation.set(
          0,
          0,
          0
        )
      }

      if (
        useTargetSwirls &&
        isReturningAfterFinishRef.current
      ) {
        isReturningAfterFinishRef.current =
          false

        console.log(
          "✅ Returned to original rotation"
        )

        // Lesson 14 — Step 21.
        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14 &&
          lessonStep === 21
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(22)
        }

        // Lesson 12.1 — Step 32.
        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 12.1 &&
          lessonStep === 32
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(33)
        }

        // Lesson 12.1 — Step 38.
        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 12.1 &&
          lessonStep === 38
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(39)
        }

        // Lesson 14 — Step 17.
        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14 &&
          lessonStep === 17
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(18)
        }

        // Lesson 14 — Step 15.
        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14 &&
          lessonStep === 15
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(16)
        }

        // Lesson 14.1 — Step 32.
        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14.1 &&
          lessonStep === 32
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(33)
        }

        // Lesson 14.1 — Step 53.
        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14.1 &&
          lessonStep === 53
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(53.1)
        }

        // Lesson 14.1 — Step 56.
        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14.1 &&
          lessonStep === 56
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(56.1)
        }

        // Lesson 14.2 — Step 72.
        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14.2 &&
          lessonStep === 72
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(73)
        }

        // Lesson 14.2 — Step 76.
        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14.2 &&
          lessonStep === 76
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(77)
        }

        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14.3 &&
          lessonStep === 92
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(93)
        }

      }
    }
  })

  return (
    <>
      {selectedLesson === 14.2 &&
        [72, 76].includes(lessonStep) && (
          <ChlorinationSeparatingFunnelColorChange
            upperLiquidColor="#DDE6A6"
            bottomLiquidColor="#DDE6A6"
            colorChangeDelay={0}
            colorChangeDuration={0.5}
          />
        )}
    </>
  )
}

export default SwirlModel