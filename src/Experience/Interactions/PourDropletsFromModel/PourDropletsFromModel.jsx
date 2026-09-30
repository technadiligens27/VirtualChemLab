import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"


const PourDropletsFromModel = ({
  modelRef,

  // =========================================
  // OTHER MODEL
  // =========================================

  otherModelRef,

  // Should other model liquid change?
  otherModelIncrease= false,

  // Final Y scale of other model liquid
  otherModelRefEndAmount = 1,

  // Other model liquid colour
  otherModelLiquidColour = "#ffffff",

  // Other model liquid opacity
  otherModelLiquidOpacity = 1,


  // =========================================
  // DROPLET SETTINGS
  // =========================================

  fallDistance = 0.8,
  fallTime = 0.7,
  gap = 0.3,

  fallAxis = "x",

  // Seconds before first drop starts
  startDelay = 3,

  loopTimes = 10,


  // =========================================
  // SOURCE MODEL LIQUID
  // =========================================

  // Reduce source model liquid
  reduceModelLiquid = false,

  // Final Y scale of source liquid
  reduceModelLiquidAmount = 0,
}) => {

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )


  const {
    setIsChlorideIonReaction,
  } = useContext(
    InteractionContext
  )


  // =========================================
  // REFS
  // =========================================

  const dropletsRef =
    useRef([])

  const elapsedTimeRef =
    useRef(0)

  const hasAdvancedRef =
    useRef(false)


  // =========================================
  // SOURCE LIQUID
  // =========================================

  const liquidRef =
    useRef(null)

  const originalLiquidScaleYRef =
    useRef(null)


  // =========================================
  // OTHER MODEL LIQUID
  // =========================================

  const otherLiquidRef =
    useRef(null)

  const originalOtherLiquidScaleYRef =
    useRef(null)


  // =========================================
  // INITIALIZE
  // =========================================

  useEffect(() => {

    const model =
      modelRef?.current

    if (!model) return


    const droplets = []


    // Reset source
    liquidRef.current =
      null

    originalLiquidScaleYRef.current =
      null


    // Reset other model
    otherLiquidRef.current =
      null

    originalOtherLiquidScaleYRef.current =
      null


    // =========================================
    // TRAVERSE SOURCE MODEL
    // =========================================

    model.traverse((child) => {

      const name =
        child.name
          ?.toLowerCase() ||
        ""


      // =========================================
      // FIND DROPLETS
      // =========================================

      if (
        name.includes(
          "droplet"
        )
      ) {

        child.traverse(
          (mesh) => {

            if (
              !mesh.isMesh
            ) {
              return
            }


            // =========================================
            // CLONE DROPLET MATERIAL
            // =========================================

            if (
              Array.isArray(
                mesh.material
              )
            ) {

              mesh.material =
                mesh.material.map(
                  (material) => {

                    const cloned =
                      material.clone()

                    cloned.transparent =
                      true

                    return cloned
                  }
                )

            } else if (
              mesh.material
            ) {

              mesh.material =
                mesh.material.clone()

              mesh.material.transparent =
                true
            }
          }
        )


        droplets.push({
          object:
            child,

          startPosition:
            child.position.clone(),
        })


        child.visible =
          true
      }


      // =========================================
      // FIND SOURCE LIQUID
      // =========================================

      if (
        child.isMesh &&
        name.includes(
          "liquid"
        )
      ) {

        liquidRef.current =
          child

        originalLiquidScaleYRef.current =
          child.scale.y
      }
    })


    // =========================================
    // TRAVERSE OTHER MODEL
    // =========================================

    const otherModel =
      otherModelRef?.current


    if (otherModel) {

      otherModel.traverse(
        (child) => {

          const name =
            child.name
              ?.toLowerCase() ||
            ""


          if (
            child.isMesh &&
            name.includes(
              "liquid"
            )
          ) {

            otherLiquidRef.current =
              child

            originalOtherLiquidScaleYRef.current =
              child.scale.y


            // =========================================
            // CLONE + CHANGE OTHER LIQUID MATERIAL
            // =========================================

            if (
              Array.isArray(
                child.material
              )
            ) {

              child.material =
                child.material.map(
                  (material) => {

                    const cloned =
                      material.clone()


                    if (
                      cloned.color
                    ) {
                      cloned.color.set(
                        otherModelLiquidColour
                      )
                    }


                    cloned.transparent =
                      true

                    cloned.opacity =
                      otherModelLiquidOpacity

                    cloned.needsUpdate =
                      true


                    return cloned
                  }
                )

            } else if (
              child.material
            ) {

              child.material =
                child.material.clone()


              if (
                child.material.color
              ) {
                child.material.color.set(
                  otherModelLiquidColour
                )
              }


              child.material.transparent =
                true

              child.material.opacity =
                otherModelLiquidOpacity

              child.material.needsUpdate =
                true
            }
          }
        }
      )
    }


    // =========================================
    // STORE DROPLETS
    // =========================================

    dropletsRef.current =
      droplets

    elapsedTimeRef.current =
      0

    hasAdvancedRef.current =
      false


    // =========================================
    // CLEANUP
    // =========================================

    return () => {

      // =========================================
      // RESTORE DROPLETS
      // =========================================

      droplets.forEach(
        (droplet) => {

          droplet.object.position.copy(
            droplet.startPosition
          )
        }
      )


      // =========================================
      // RESTORE SOURCE LIQUID SCALE
      // =========================================

      // if (
      //   liquidRef.current &&
      //   originalLiquidScaleYRef.current !==
      //     null
      // ) {

      //   liquidRef.current.scale.y =
      //     originalLiquidScaleYRef.current

      //   liquidRef.current.updateMatrixWorld(
      //     true
      //   )
      // }


      // =========================================
      // RESTORE OTHER MODEL LIQUID SCALE
      // =========================================

      // if (
      //   otherLiquidRef.current &&
      //   originalOtherLiquidScaleYRef.current !==
      //     null
      // ) {

      //   otherLiquidRef.current.scale.y =
      //     originalOtherLiquidScaleYRef.current

      //   otherLiquidRef.current.updateMatrixWorld(
      //     true
      //   )
      // }


      liquidRef.current =
        null

      originalLiquidScaleYRef.current =
        null


      otherLiquidRef.current =
        null

      originalOtherLiquidScaleYRef.current =
        null
    }

  }, [
    modelRef,
    otherModelRef,
    otherModelLiquidColour,
    otherModelLiquidOpacity,
  ])


  // =========================================
  // ANIMATION
  // =========================================

  useFrame((_, delta) => {

    const droplets =
      dropletsRef.current


    if (
      !droplets.length
    ) {
      return
    }


    elapsedTimeRef.current +=
      delta


    // =========================================
    // START DELAY
    // =========================================

    if (
      elapsedTimeRef.current <
      startDelay
    ) {
      return
    }


    const animationTime =
      elapsedTimeRef.current -
      startDelay


    const safeFallTime =
      Math.max(
        fallTime,
        0.001
      )


    const safeGap =
      Math.max(
        gap,
        0
      )


    const fullCycleTime =
      safeFallTime +
      safeGap


    const hasLoopLimit =
      Number.isFinite(
        loopTimes
      )


    const totalLoops =
      hasLoopLimit
        ? Math.max(
            1,
            Math.floor(
              loopTimes
            )
          )
        : Infinity


    const totalLoopTime =
      hasLoopLimit
        ? totalLoops *
          fullCycleTime
        : Infinity


    const hasFinished =
      animationTime >=
      totalLoopTime


    // =========================================
    // CURRENT DROPLET CYCLE
    // =========================================

    const cycleTime =
      hasFinished
        ? safeFallTime
        : animationTime %
          fullCycleTime


    const isFalling =
      cycleTime <
      safeFallTime


    const fallProgress =
      isFalling
        ? cycleTime /
          safeFallTime
        : 1


    // =========================================
    // OVERALL ANIMATION PROGRESS
    // =========================================

    let overallProgress =
      0


    if (hasLoopLimit) {

      overallProgress =
        Math.min(
          animationTime /
            totalLoopTime,
          1
        )
    }


    // =========================================
    // FALL AXIS
    // =========================================

    const axis =
      [
        "x",
        "y",
        "z",
      ].includes(
        fallAxis.toLowerCase()
      )
        ? fallAxis.toLowerCase()
        : "y"


    // =========================================
    // MOVE DROPLETS
    // =========================================

    droplets.forEach(
      ({
        object,
        startPosition,
      }) => {

        object.position.copy(
          startPosition
        )


        object.position[
          axis
        ] -=
          fallDistance *
          fallProgress


        object.visible =
          true


        // =========================================
        // FADE DROPLETS
        // =========================================

        object.traverse(
          (child) => {

            if (
              !child.isMesh
            ) {
              return
            }


            const material =
              child.material


            if (!material) {
              return
            }


            const materials =
              Array.isArray(
                material
              )
                ? material
                : [material]


            materials.forEach(
              (mat) => {

                mat.transparent =
                  true


                mat.opacity =
                  isFalling
                    ? 1 -
                      fallProgress
                    : 0


                mat.needsUpdate =
                  true
              }
            )
          }
        )


        object.updateMatrixWorld(
          true
        )
      }
    )


    // =========================================
    // REDUCE SOURCE LIQUID
    // =========================================

    if (
      reduceModelLiquid &&
      liquidRef.current &&
      originalLiquidScaleYRef.current !==
        null
    ) {

      const originalScaleY =
        originalLiquidScaleYRef.current


      const targetScaleY =
        reduceModelLiquidAmount


      const newScaleY =
        originalScaleY +
        (
          targetScaleY -
          originalScaleY
        ) *
          overallProgress


      liquidRef.current.scale.y =
        newScaleY


      liquidRef.current.updateMatrixWorld(
        true
      )
    }


    // =========================================
    // CHANGE OTHER MODEL LIQUID
    // =========================================

    if (
      otherModelIncrease &&
      otherLiquidRef.current &&
      originalOtherLiquidScaleYRef.current !==
        null
    ) {

      const originalScaleY =
        originalOtherLiquidScaleYRef.current


      const targetScaleY =
        otherModelRefEndAmount


      const newScaleY =
        originalScaleY +
        (
          targetScaleY -
          originalScaleY
        ) *
          overallProgress


      otherLiquidRef.current.scale.y =
        newScaleY


      // Make sure other liquid is visible
      otherLiquidRef.current.visible =
        true


      otherLiquidRef.current.updateMatrixWorld(
        true
      )
    }


    // =========================================
    // LESSON STEP
    // =========================================

    if (
      hasFinished &&
      !hasAdvancedRef.current &&
      selectedLesson ===
        14.3 &&
      lessonStep ===
        109
    ) {

      hasAdvancedRef.current =
        true

      setLessonStep(
        110
      )
    }


    if (
      hasFinished &&
      !hasAdvancedRef.current &&
      selectedLesson ===
        14.4 &&
      lessonStep ===
        137
    ) {

      hasAdvancedRef.current =
        true

      setLessonStep(
        138
      )
    }


    if (
      hasFinished &&
      !hasAdvancedRef.current &&
      selectedLesson ===
        14.4 &&
      lessonStep ===
        151
    ) {

      hasAdvancedRef.current =
        true

      setLessonStep(
        152
      )
    }


    if (
      hasFinished &&
      !hasAdvancedRef.current &&
      selectedLesson ===
        14.4 &&
      lessonStep ===
        157
    ) {

      hasAdvancedRef.current =
        true

      setLessonStep(
        158
      )

      setIsChlorideIonReaction(
        true
      )
    }
  })


  return null
}


export default PourDropletsFromModel