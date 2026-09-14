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

const SwirlModel = ({
  modelRef,

  swirlSpeed = 8,
  swirlAmount = 0.15,

  stopDelay = 0.5,
  returnSpeed = 5,

  useTargetSwirls = false,
  targetSwirls = 3,

  // ==========================================
  // LIQUID SWIRL
  // ==========================================

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

  // Target reached and now returning home.
  const isReturningAfterFinishRef =
    useRef(false)

  // Ensure the lesson advances only once.
  const lessonAdvancedRef =
    useRef(false)

  const originalRotationRef =
    useRef({
      x: 0,
      y: 0,
      z: 0,
    })

  // ==========================================
  // LIQUID REFS
  // ==========================================

  const liquidObjectsRef =
    useRef([])

  const originalLiquidRotationsRef =
    useRef([])

  // Shared pivot used for:
  //
  // 1. Conical flask 02 liquid layers
  // 2. Separating-funnel liquid layers
  //
  // This keeps both layers locked together.
  const layeredLiquidGroupRef =
    useRef(null)

  // ==========================================
  // STORE ORIGINAL ROTATION
  // ==========================================

  useEffect(() => {
    if (!modelRef?.current) {
      return
    }

    const model =
      modelRef.current

    originalRotationRef.current = {
      x: model.rotation.x,
      y: model.rotation.y,
      z: model.rotation.z,
    }

    // ========================================
    // FIND LIQUID CHILDREN
    // ========================================

    liquidObjectsRef.current = []

    originalLiquidRotationsRef.current = []

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        childName.includes("liquid")
      ) {
        liquidObjectsRef.current.push(
          child
        )

        originalLiquidRotationsRef.current.push({
          x: child.rotation.x,
          y: child.rotation.y,
          z: child.rotation.z,
        })
      }
    })

    // ========================================
    // FIND A TWO-LAYER LIQUID PAIR
    // ========================================

    const liquidLayerNamePairs = [
      {
        groupName:
          "conical-flask-02-layered-liquid-group",

        upperName:
          "conical-flask-02-liquid-upper",

        bottomName:
          "conical-flask-02-liquid-bottom",
      },
      {
        groupName:
          "separating-funnel-layered-liquid-group",

        upperName:
          "separating-funnel-liquid-upper",

        bottomName:
          "separating-funnel-liquid-bottom",
      },
    ]

    let selectedLayerPair = null

    for (
      const layerNames
      of liquidLayerNamePairs
    ) {
      const upperLiquid =
        liquidObjectsRef.current.find(
          (liquid) =>
            liquid.name?.toLowerCase() ===
            layerNames.upperName
        )

      const bottomLiquid =
        liquidObjectsRef.current.find(
          (liquid) =>
            liquid.name?.toLowerCase() ===
            layerNames.bottomName
        )

      if (
        upperLiquid &&
        bottomLiquid
      ) {
        selectedLayerPair = {
          ...layerNames,
          upperLiquid,
          bottomLiquid,
        }

        break
      }
    }

    let originalLayerData = null

    // ========================================
    // CREATE SHARED LIQUID PIVOT
    // ========================================

    if (selectedLayerPair) {
      const {
        upperLiquid,
        bottomLiquid,
        groupName,
      } = selectedLayerPair

      const layeredLiquids = [
        upperLiquid,
        bottomLiquid,
      ]

      // Store each liquid's original parent and
      // local transform for cleanup.
      originalLayerData =
        layeredLiquids.map(
          (liquid) => ({
            liquid,

            parent:
              liquid.parent,

            position:
              liquid.position.clone(),

            quaternion:
              liquid.quaternion.clone(),

            scale:
              liquid.scale.clone(),
          })
        )

      model.updateWorldMatrix(
        true,
        true
      )

      // Find the centre of both liquid meshes.
      const bounds =
        new THREE.Box3()

      layeredLiquids.forEach(
        (liquid) => {
          bounds.expandByObject(
            liquid
          )
        }
      )

      const sharedCentre =
        bounds.getCenter(
          new THREE.Vector3()
        )

      // Convert world-space centre into
      // model-local space.
      model.worldToLocal(
        sharedCentre
      )

      const liquidGroup =
        new THREE.Group()

      liquidGroup.name =
        groupName

      liquidGroup.position.copy(
        sharedCentre
      )

      model.add(
        liquidGroup
      )

      // Attach preserves each mesh's world transform.
      // Both liquid layers will now rotate together.
      layeredLiquids.forEach(
        (liquid) => {
          liquidGroup.attach(
            liquid
          )
        }
      )

      layeredLiquidGroupRef.current =
        liquidGroup
    }

    // ========================================
    // RESET ANIMATION STATE
    // ========================================

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

    // ========================================
    // CLEANUP
    // ========================================

    return () => {
      const liquidGroup =
        layeredLiquidGroupRef.current

      if (
        liquidGroup &&
        originalLayerData
      ) {
        originalLayerData.forEach(
          ({
            liquid,
            parent,
            position,
            quaternion,
            scale,
          }) => {
            if (!parent) {
              return
            }

            // Restore the original parent.
            parent.add(
              liquid
            )

            // Restore the original local transform.
            liquid.position.copy(
              position
            )

            liquid.quaternion.copy(
              quaternion
            )

            liquid.scale.copy(
              scale
            )
          }
        )

        liquidGroup.removeFromParent()
      }

      layeredLiquidGroupRef.current =
        null
    }
  }, [
    modelRef,
    useTargetSwirls,
    targetSwirls,
  ])

  // ==========================================
  // WHEEL
  // ==========================================

  useEffect(() => {
    const handleWheel = () => {
      if (!modelRef?.current) {
        return
      }

      // Prevent additional swirling after
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

  // ==========================================
  // ANIMATION
  // ==========================================

  useFrame((_, delta) => {
    if (!modelRef?.current) {
      return
    }

    const model =
      modelRef.current

    // ========================================
    // SWIRLING
    // ========================================

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

      model.rotation.x =
        originalRotationRef.current.x +
        Math.sin(angle) *
          swirlAmount

      model.rotation.z =
        originalRotationRef.current.z +
        Math.cos(angle) *
          swirlAmount

      // ======================================
      // LIQUID SWIRLING
      // ======================================

      const layeredLiquidGroup =
        layeredLiquidGroupRef.current

      if (layeredLiquidGroup) {
        const liquidAngle =
          angle *
          liquidSwirlSpeed

        // Both layers rotate through one pivot.
        layeredLiquidGroup.rotation.x =
          Math.sin(
            liquidAngle
          ) *
          liquidSwirlAmount

        layeredLiquidGroup.rotation.z =
          Math.cos(
            liquidAngle
          ) *
          liquidSwirlAmount
      } else {
        // Standard handling for models that
        // do not contain a two-layer liquid.
        liquidObjectsRef.current.forEach(
          (liquid, index) => {
            const originalRotation =
              originalLiquidRotationsRef.current[
                index
              ]

            if (
              !liquid ||
              !originalRotation
            ) {
              return
            }

            const liquidAngle =
              angle *
              liquidSwirlSpeed

            liquid.rotation.x =
              originalRotation.x +
              Math.sin(
                liquidAngle
              ) *
                liquidSwirlAmount

            liquid.rotation.z =
              originalRotation.z +
              Math.cos(
                liquidAngle
              ) *
                liquidSwirlAmount
          }
        )
      }

      // ======================================
      // TARGET SWIRL MODE
      // ======================================

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

        // ====================================
        // TARGET REACHED
        // ====================================

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

      // ======================================
      // USER STOPPED SCROLLING
      // ======================================

      if (
        timeSinceLastScrollRef.current >=
        stopDelay
      ) {
        isSwirlingRef.current =
          false
      }

      return
    }

    // ========================================
    // RETURN MODEL TO ORIGINAL ROTATION
    // ========================================

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

    // ========================================
    // RETURN LIQUID TO ORIGINAL ROTATION
    // ========================================

    const layeredLiquidGroup =
      layeredLiquidGroupRef.current

    if (layeredLiquidGroup) {
      layeredLiquidGroup.rotation.x +=
        (
          0 -
          layeredLiquidGroup.rotation.x
        ) *
        returnFactor

      layeredLiquidGroup.rotation.y +=
        (
          0 -
          layeredLiquidGroup.rotation.y
        ) *
        returnFactor

      layeredLiquidGroup.rotation.z +=
        (
          0 -
          layeredLiquidGroup.rotation.z
        ) *
        returnFactor
    } else {
      liquidObjectsRef.current.forEach(
        (liquid, index) => {
          const originalRotation =
            originalLiquidRotationsRef.current[
              index
            ]

          if (
            !liquid ||
            !originalRotation
          ) {
            return
          }

          liquid.rotation.x +=
            (
              originalRotation.x -
              liquid.rotation.x
            ) *
            returnFactor

          liquid.rotation.y +=
            (
              originalRotation.y -
              liquid.rotation.y
            ) *
            returnFactor

          liquid.rotation.z +=
            (
              originalRotation.z -
              liquid.rotation.z
            ) *
            returnFactor
        }
      )
    }

    // ========================================
    // CHECK DISTANCE FROM ORIGINAL ROTATION
    // ========================================

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

    // ========================================
    // FULLY RETURNED
    // ========================================

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

      // ======================================
      // SNAP LIQUID EXACTLY BACK
      // ======================================

      if (layeredLiquidGroup) {
        layeredLiquidGroup.rotation.set(
          0,
          0,
          0
        )
      } else {
        liquidObjectsRef.current.forEach(
          (liquid, index) => {
            const originalRotation =
              originalLiquidRotationsRef.current[
                index
              ]

            if (
              !liquid ||
              !originalRotation
            ) {
              return
            }

            liquid.rotation.set(
              originalRotation.x,
              originalRotation.y,
              originalRotation.z
            )
          }
        )
      }

      // ======================================
      // TARGET WAS COMPLETED
      // ======================================

      if (
        useTargetSwirls &&
        isReturningAfterFinishRef.current
      ) {
        isReturningAfterFinishRef.current =
          false

        console.log(
          "✅ Returned to original rotation"
        )

        // ====================================
        // LESSON STEPS
        // ====================================

        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14 &&
          lessonStep === 21
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(22)
        }

        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 12.1 &&
          lessonStep === 32
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(33)
        }

        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 12.1 &&
          lessonStep === 38
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(39)
        }

        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14 &&
          lessonStep === 17
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(18)
        }

        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14 &&
          lessonStep === 15
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(16)
        }

        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14.1 &&
          lessonStep === 32
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(33)
        }

        if (
          !lessonAdvancedRef.current &&
          selectedLesson === 14.1 &&
          lessonStep === 53
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(54)
        }
      }
    }
  })

  return null
}

export default SwirlModel