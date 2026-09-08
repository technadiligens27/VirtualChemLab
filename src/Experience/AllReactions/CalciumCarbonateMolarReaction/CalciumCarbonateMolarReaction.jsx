import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import DeliveryTubeGasRise from "../../Interactions/DeliveryTubeGasRise/DeliveryTubeGasRise"
import MolarReactionCylinder from "./MolarReactionCylinder/MolarReactionCylinder"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

const CalciumCarbonateMolarReaction = ({
  modelRef,

  calciumCarbonatePowderFullOpacity = 1, // powder max opacity
  calciumCarbonatePowderFadeStartDelay = 0.5, // delay before fading
  calciumCarbonatePowderFadeDuration = 4, // powder fade duration

  calciumCarbonateGasBubbleRiseDistance = 1.5, // bubble rise height
  calciumCarbonateGasBubbleRiseSpeed = 0.4, // bubble rise speed

  calciumCarbonateGasBubbleXOffsetRange = 0.10, // random X movement
  calciumCarbonateGasBubbleYOffsetRange = 0.08, // random Y variation
  calciumCarbonateGasBubbleRandomMovement = 0.10, // random Z movement

  calciumCarbonateGasBubbleStartDelay = 0.08, // initial bubble delay
  calciumCarbonateGasBubbleSlowdown = 0.18, // slows bubbling over time
  calciumCarbonateGasBubbleFullOpacity = 1, // bubble max opacity
}) => {
  const {
    setSelectedLesson,selectedLesson,lessonStep,setLessonStep
  } = useContext(
    MainGuidelineContext
  )

  const {graduatedBeakerRef,graduatedCylinder100Ref} = useContext(ModelContext)

  const powderMeshesRef =
    useRef([])

  const gasBubbleMeshesRef =
    useRef([])

  const animationFrameRef =
    useRef(null)

  useEffect(() => {
    const model =
      modelRef?.current

    if (!model) return

    powderMeshesRef.current =
      []

    gasBubbleMeshesRef.current =
      []

    // ==========================================
    // FIND POWDER + GAS BUBBLES
    // ==========================================

    model.traverse(
      (child) => {
        if (!child.isMesh) return

        const childName =
          child.name?.toLowerCase() ||
          ""

        // ========================================
        // POWDER
        // ========================================

        if (
          childName.includes(
            "powder"
          )
        ) {
          if (
            Array.isArray(
              child.material
            )
          ) {
            child.material =
              child.material.map(
                (material) => {
                  const clonedMaterial =
                    material.clone()

                  clonedMaterial.transparent =
                    true

                  clonedMaterial.opacity =
                    calciumCarbonatePowderFullOpacity

                  clonedMaterial.needsUpdate =
                    true

                  return clonedMaterial
                }
              )
          } else if (
            child.material
          ) {
            child.material =
              child.material.clone()

            child.material.transparent =
              true

            child.material.opacity =
              calciumCarbonatePowderFullOpacity

            child.material.needsUpdate =
              true
          }

          child.visible =
            true

          powderMeshesRef.current.push(
            child
          )
        }

        // ========================================
        // GAS BUBBLES
        // ========================================

        if (
          childName.includes(
            "gas-bubble"
          ) ||
          childName.includes(
            "gas bubble"
          ) ||
          childName.includes(
            "gasbubble"
          )
        ) {
          if (
            Array.isArray(
              child.material
            )
          ) {
            child.material =
              child.material.map(
                (material) => {
                  const clonedMaterial =
                    material.clone()

                  clonedMaterial.transparent =
                    true

                  clonedMaterial.opacity =
                    calciumCarbonateGasBubbleFullOpacity

                  clonedMaterial.needsUpdate =
                    true

                  return clonedMaterial
                }
              )
          } else if (
            child.material
          ) {
            child.material =
              child.material.clone()

            child.material.transparent =
              true

            child.material.opacity =
              calciumCarbonateGasBubbleFullOpacity

            child.material.needsUpdate =
              true
          }

          const bubbleIndex =
            gasBubbleMeshesRef.current.length

          const bubbleDelay =
            bubbleIndex *
            (
              calciumCarbonateGasBubbleStartDelay +
              bubbleIndex *
                calciumCarbonateGasBubbleSlowdown *
                0.01
            )

          gasBubbleMeshesRef.current.push({
            object:
              child,

            originalPosition:
              child.position.clone(),

            randomX:
              (
                Math.random() *
                  2 -
                1
              ) *
              calciumCarbonateGasBubbleXOffsetRange,

            randomY:
              (
                Math.random() *
                  2 -
                1
              ) *
              calciumCarbonateGasBubbleYOffsetRange,

            randomZ:
              (
                Math.random() *
                  2 -
                1
              ) *
              calciumCarbonateGasBubbleRandomMovement,

            delay:
              bubbleDelay,

            finished:
              false,
          })

          child.visible =
            false
        }
      }
    )

    // ==========================================
    // ANIMATION
    // ==========================================

    const startTime =
      performance.now()

    let previousTime =
      startTime

    const animate =
      (currentTime) => {
        const elapsedSeconds =
          (
            currentTime -
            startTime
          ) / 1000

        const delta =
          Math.min(
            (
              currentTime -
              previousTime
            ) / 1000,
            0.05
          )

        previousTime =
          currentTime

        let finishedBubbleCount =
          0

        // ========================================
        // MOVE GAS BUBBLES
        // ========================================

        gasBubbleMeshesRef.current.forEach(
          (bubbleData) => {
            if (
              bubbleData.finished
            ) {
              finishedBubbleCount +=
                1

              return
            }

            if (
              elapsedSeconds <
              bubbleData.delay
            ) {
              return
            }

            const bubble =
              bubbleData.object

            bubble.visible =
              true

            bubble.position.y +=
              (
                calciumCarbonateGasBubbleRiseSpeed +
                bubbleData.randomY
              ) *
              delta

            bubble.position.x +=
              bubbleData.randomX *
              delta

            bubble.position.z +=
              bubbleData.randomZ *
              delta

            const distanceRisen =
              bubble.position.y -
              bubbleData.originalPosition.y

            if (
              distanceRisen >=
              calciumCarbonateGasBubbleRiseDistance
            ) {
              bubble.visible =
                false

              bubbleData.finished =
                true

              finishedBubbleCount +=
                1
            }
          }
        )

        // ========================================
        // REACTION PROGRESS
        // ========================================

        const totalBubbles =
          gasBubbleMeshesRef.current.length

        const reactionProgress =
          totalBubbles > 0
            ? finishedBubbleCount /
              totalBubbles
            : 0

        // ========================================
        // FADE POWDER
        // ========================================

        if (
          elapsedSeconds >=
          calciumCarbonatePowderFadeStartDelay
        ) {
          const timeFadeProgress =
            Math.min(
              (
                elapsedSeconds -
                calciumCarbonatePowderFadeStartDelay
              ) /
                calciumCarbonatePowderFadeDuration,
              1
            )

          const fadeProgress =
            Math.max(
              timeFadeProgress,
              reactionProgress
            )

          const currentOpacity =
            calciumCarbonatePowderFullOpacity *
            (
              1 -
              fadeProgress
            )

          powderMeshesRef.current.forEach(
            (powder) => {
              if (
                Array.isArray(
                  powder.material
                )
              ) {
                powder.material.forEach(
                  (material) => {
                    material.opacity =
                      currentOpacity

                    material.needsUpdate =
                      true
                  }
                )
              } else if (
                powder.material
              ) {
                powder.material.opacity =
                  currentOpacity

                powder.material.needsUpdate =
                  true
              }
            }
          )
        }

        // ========================================
        // CHECK REACTION FINISHED
        // ========================================

        const allBubblesFinished =
          totalBubbles > 0 &&
          finishedBubbleCount ===
            totalBubbles

        if (
          allBubblesFinished
        ) {
          // HIDE POWDER COMPLETELY

          powderMeshesRef.current.forEach(
            (powder) => {
              if (
                Array.isArray(
                  powder.material
                )
              ) {
                powder.material.forEach(
                  (material) => {
                    material.opacity =
                      0

                    material.needsUpdate =
                      true
                  }
                )
              } else if (
                powder.material
              ) {
                powder.material.opacity =
                  0

                powder.material.needsUpdate =
                  true
              }

              powder.visible =
                false
            }
          )

          // ======================================
          // REACTION COMPLETED
          // ======================================

          if(selectedLesson===13 && lessonStep===27){
            setLessonStep(28)
          }

          return
        }

        animationFrameRef.current =
          requestAnimationFrame(
            animate
          )
      }

    animationFrameRef.current =
      requestAnimationFrame(
        animate
      )

    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {
      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        )
      }

      gasBubbleMeshesRef.current.forEach(
        (bubbleData) => {
          bubbleData.object.position.copy(
            bubbleData.originalPosition
          )

          bubbleData.object.visible =
            false
        }
      )
    }
  }, [
    modelRef,

    calciumCarbonatePowderFullOpacity,
    calciumCarbonatePowderFadeStartDelay,
    calciumCarbonatePowderFadeDuration,

    calciumCarbonateGasBubbleRiseDistance,
    calciumCarbonateGasBubbleRiseSpeed,

    calciumCarbonateGasBubbleXOffsetRange,
    calciumCarbonateGasBubbleYOffsetRange,
    calciumCarbonateGasBubbleRandomMovement,

    calciumCarbonateGasBubbleStartDelay,
    calciumCarbonateGasBubbleSlowdown,
    calciumCarbonateGasBubbleFullOpacity,

    setSelectedLesson,
  ])

  return (
    <>
      <DeliveryTubeGasRise/>    
      <MolarReactionCylinder modelRef={graduatedCylinder100Ref}/>
    </>
  )
}

export default CalciumCarbonateMolarReaction