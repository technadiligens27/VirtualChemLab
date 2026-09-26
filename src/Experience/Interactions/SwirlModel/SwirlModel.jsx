import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import * as THREE from "three"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import ChlorinationSeparatingFunnelColorChange from "../ChlorinationSeparatingFunnelColorChange/ChlorinationSeparatingFunnelColorChange"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"


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

  const {
    seperatingFunnelRef,
  } = useContext(
    ModelContext
  )


  // =========================================
  // REACT SWIRL STATE
  // =========================================

  const [
    isSwirling,
    setIsSwirling,
  ] = useState(false)


  // =========================================
  // ANIMATION REFS
  // =========================================

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


  // =========================================
  // INITIALIZE
  // =========================================

  useEffect(() => {
    const model =
      modelRef?.current

    if (!model) return


    originalRotationRef.current = {
      x: model.rotation.x,
      y: model.rotation.y,
      z: model.rotation.z,
    }


    // =========================================
    // STORE ORIGINAL CHILDREN
    // =========================================

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


    // =========================================
    // FIND SHARED CENTRE
    // =========================================

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


    model.worldToLocal(
      sharedCentre
    )


    // =========================================
    // CREATE SHARED CHILD GROUP
    // =========================================

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


    // =========================================
    // ATTACH ALL CHILDREN
    // =========================================

    originalChildren.forEach(
      (child) => {
        allChildrenGroup.attach(
          child
        )
      }
    )


    allChildrenGroupRef.current =
      allChildrenGroup


    // =========================================
    // RESET ANIMATION STATE
    // =========================================

    swirlTimeRef.current =
      0

    completedSwirlsRef.current =
      0

    hasFinishedRef.current =
      false

    isReturningAfterFinishRef.current =
      false

    lessonAdvancedRef.current =
      false

    isSwirlingRef.current =
      false

    setIsSwirling(false)

    timeSinceLastScrollRef.current =
      0


    // =========================================
    // CLEANUP
    // =========================================

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
            // Restore child directly
            // under original model.
            model.add(
              child
            )

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

      isSwirlingRef.current =
        false

      setIsSwirling(false)
    }
  }, [
    modelRef,
    useTargetSwirls,
    targetSwirls,
  ])


  // =========================================
  // MOUSE WHEEL
  // =========================================

  useEffect(() => {
    const handleWheel = () => {
      if (
        !modelRef?.current
      ) {
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


      // =========================================
      // START SWIRLING
      // =========================================

      isSwirlingRef.current =
        true

      setIsSwirling(true)


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


  // =========================================
  // ANIMATION
  // =========================================

  useFrame((_, delta) => {
    const model =
      modelRef?.current


    if (!model) return


    const allChildrenGroup =
      allChildrenGroupRef.current


    // =========================================
    // SWIRLING
    // =========================================

    if (
      isSwirlingRef.current &&
      !hasFinishedRef.current
    ) {
      swirlTimeRef.current +=
        delta *
        swirlSpeed


      timeSinceLastScrollRef.current +=
        delta


      const angle =
        swirlTimeRef.current


      // =========================================
      // SWIRL MAIN MODEL
      // =========================================

      model.rotation.x =
        originalRotationRef.current.x +
        Math.sin(angle) *
          swirlAmount


      model.rotation.z =
        originalRotationRef.current.z +
        Math.cos(angle) *
          swirlAmount


      // =========================================
      // SWIRL CHILD GROUP
      // =========================================

      if (allChildrenGroup) {
        const childAngle =
          angle *
          liquidSwirlSpeed


        allChildrenGroup.rotation.x =
          Math.sin(
            childAngle
          ) *
          liquidSwirlAmount


        allChildrenGroup.rotation.z =
          Math.cos(
            childAngle
          ) *
          liquidSwirlAmount
      }


      // =========================================
      // TARGET SWIRL MODE
      // =========================================

      if (useTargetSwirls) {
        const completedSwirls =
          Math.floor(
            swirlTimeRef.current /
              (
                Math.PI *
                2
              )
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

          setIsSwirling(false)


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


      // =========================================
      // STOP WHEN USER STOPS SCROLLING
      // =========================================

      if (
        timeSinceLastScrollRef.current >=
        stopDelay
      ) {
        isSwirlingRef.current =
          false

        setIsSwirling(false)
      }


      return
    }


    // =========================================
    // RETURN MODEL
    // =========================================

    const returnFactor =
      Math.min(
        returnSpeed *
          delta,
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


    // =========================================
    // RETURN CHILDREN
    // =========================================

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


    // =========================================
    // DIFFERENCE FROM ORIGINAL ROTATION
    // =========================================

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


    // =========================================
    // FULLY RETURNED
    // =========================================

    if (
      xDifference <
        0.001 &&
      yDifference <
        0.001 &&
      zDifference <
        0.001
    ) {
      model.rotation.set(
        originalRotationRef.current.x,
        originalRotationRef.current.y,
        originalRotationRef.current.z
      )


      if (allChildrenGroup) {
        allChildrenGroup.rotation.set(
          0,
          0,
          0
        )
      }


      // =========================================
      // TARGET SWIRLS FINISHED
      // =========================================

      if (
        useTargetSwirls &&
        isReturningAfterFinishRef.current
      ) {
        isReturningAfterFinishRef.current =
          false


        console.log(
          "✅ Returned to original rotation"
        )


        // =========================================
        // LESSON 14 — STEP 21
        // =========================================

        if (
          !lessonAdvancedRef.current &&
          selectedLesson ===
            14 &&
          lessonStep ===
            21
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(
            22
          )
        }


        // =========================================
        // LESSON 12.1 — STEP 32
        // =========================================

        if (
          !lessonAdvancedRef.current &&
          selectedLesson ===
            12.1 &&
          lessonStep ===
            32
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(
            33
          )
        }


        // =========================================
        // LESSON 12.1 — STEP 38
        // =========================================

        if (
          !lessonAdvancedRef.current &&
          selectedLesson ===
            12.1 &&
          lessonStep ===
            38
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(
            39
          )
        }


        // =========================================
        // LESSON 14 — STEP 17
        // =========================================

        if (
          !lessonAdvancedRef.current &&
          selectedLesson ===
            14 &&
          lessonStep ===
            17
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(
            18
          )
        }


        // =========================================
        // LESSON 14 — STEP 15
        // =========================================

        if (
          !lessonAdvancedRef.current &&
          selectedLesson ===
            14 &&
          lessonStep ===
            15
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(
            16
          )
        }


        // =========================================
        // LESSON 14.1 — STEP 32
        // =========================================

        if (
          !lessonAdvancedRef.current &&
          selectedLesson ===
            14.1 &&
          lessonStep ===
            32
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(
            33
          )
        }


        // =========================================
        // LESSON 14.1 — STEP 53
        // =========================================

        if (
          !lessonAdvancedRef.current &&
          selectedLesson ===
            14.1 &&
          lessonStep ===
            53
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(
            53.1
          )
        }


        // =========================================
        // LESSON 14.1 — STEP 56
        // =========================================

        if (
          !lessonAdvancedRef.current &&
          selectedLesson ===
            14.1 &&
          lessonStep ===
            56
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(
            56.1
          )
        }


        // =========================================
        // LESSON 14.2 — STEP 72
        // =========================================

        if (
          !lessonAdvancedRef.current &&
          selectedLesson ===
            14.2 &&
          lessonStep ===
            72
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(
            73
          )
        }


        // =========================================
        // LESSON 14.2 — STEP 76
        // =========================================

        if (
          !lessonAdvancedRef.current &&
          selectedLesson ===
            14.2 &&
          lessonStep ===
            76
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(
            77
          )
        }


        // =========================================
        // LESSON 14.3 — STEP 92
        // =========================================

        if (
          !lessonAdvancedRef.current &&
          selectedLesson ===
            14.3 &&
          lessonStep ===
            92
        ) {
          lessonAdvancedRef.current =
            true

          setLessonStep(
            93
          )
        }
      }
    }
  })


  // =========================================
  // RENDER
  // =========================================

  return (
    <>

      {/* ======================================
          LESSON 14.1
          COLOR CHANGE ONLY WHILE SWIRLING
      ====================================== */}

      {isSwirling &&
        selectedLesson ===
          14.1 &&
        [53,56].includes(lessonStep) && (
          <ChlorinationSeparatingFunnelColorChange
            modelRef={
              seperatingFunnelRef
            }

            upperLiquidColor="#DDE6A6"

            bottomLiquidColor="#DDE6A6"

            colorChangeDelay={
              0.5
            }

            colorChangeDuration={
              0.5
            }
          />
        )}


      {/* ======================================
          LESSON 14.2
          COLOR CHANGE ONLY WHILE SWIRLING
      ====================================== */}

      {isSwirling &&
        selectedLesson ===
          14.2 &&
        [72, 76].includes(
          lessonStep
        ) && (
          <ChlorinationSeparatingFunnelColorChange
            modelRef={
              seperatingFunnelRef
            }

            upperLiquidColor="#DDE6A6"

            bottomLiquidColor="#DDE6A6"

            colorChangeDelay={
              0.5
            }

            colorChangeDuration={
              0.5
            }
          />
        )}

    </>
  )
}

export default SwirlModel