import {
  useContext,
} from "react"

import {
  ModelContext,
} from "../../Contexts/ModelContext/ModelContext"

import {
  InteractionContext,
} from "../../Contexts/InteractionContext/InteractionContext"

import {
  MainGuidelineContext,
} from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  ReactionContext,
} from "../../Contexts/ReactionContext/ReactionContext"

import {
  resetModel,
} from "../../Experience/resetModels/resetModels.jsx"

import "./ResetLessonButton.css"

// =====================================================
// RESET LESSON HOOK
// =====================================================

export const useResetLesson = () => {
 const {
  chairRef,

  gogglesRef,
  gloveleftRef,
  gloverightRef,

  normalBeakerRef,
  conicalBeakerRef,
  conicalBeakerRef02,
  roundBeakerRef,
  graduatedBeakerRef,

  spoonRef,
  saltRef,
  saltContainerRef,

  redLitmusRef,
  blueLitmusRef,

  testube01Ref,
  testube02Ref,
  testube03Ref,
  testube04Ref,
  testube05Ref,
  testube06Ref,

  testube01CapRef,
  testube03CapRef,

  filterPaperRef,
  filterFoldedPaperRef,
  funnelRef,

  mainDropperRef,
  dropperAnimationAction,

  mainPolystereneRef,
  mainPolysterene2Ref,
  mainPolystereneLid,

  pottasiumCarbonateContainerRef,
  potassiumHydrogenCarbonateRef,

  digitalBalanceRef,

  mainBuiretteRef,
  buretteClampRef,
  mainThermometerRef,

  kettleRef,
  pipetteRef,

  iodobutaneBottleRef,
  bromobutaneBottleRef,
  chlorobutaneBottleRef,

  volumetricRef,
  volumetricPipetteRef,
  volumetricBung,
  graduatedPipetteRef,

  phenopthalineBottleRef,
  sulfamicBottleRef,
  methylBottleRef,
  naohBottleRef,
  waterBottleRef,

  boilingTube01Ref,
  graduatedCylinder100Ref,
  deliveryTubeBungRef,
  conicalBungRef,

  seperatingFunnelRef,
  separatingFunnelBungRef,

  heatingMantleRef,
  clampHandleRef,
  distillationHeadRef,
  condensorRef,
  heatingMatRef,

  waterInTubeRef,
  waterOutTubeRef,

  bunsenBurnerRef,
  gasTubeRef,
  airHoleRef,

  nichromeWireRef,
  nichromeWirePowderRef,

  powderContainer,
  metalSaltRef,

  normalBeakerLiquidRef,
  conicalBeakerLiquidRef,
  thermometerLiquidRef,
  BuretteLiquidRef,
  naohLiquidRef,

  normalPrecipitateRef,
} = useContext(ModelContext)

  const {
    resetInteractions,
  } = useContext(
    InteractionContext
  )

  const {
    resetLessonGuidelines,
  } = useContext(
    MainGuidelineContext
  )

  const {
    resetReactions,
  } = useContext(
    ReactionContext
  )

  // =====================================================
  // RESET DROPPER ANIMATION
  // =====================================================

  const resetDropperAnimation = () => {
    if (!dropperAnimationAction) {
      return
    }

    // Remove final-frame clamp
    dropperAnimationAction.stop()

    // Return animation to beginning
    dropperAnimationAction.reset()

    dropperAnimationAction.time = 0

    // Prepare animation for
    // scroll-controlled usage again
    dropperAnimationAction.enabled =
      true

    dropperAnimationAction.clampWhenFinished =
      true

    dropperAnimationAction.paused =
      true

    dropperAnimationAction.setEffectiveWeight(
      1
    )

    dropperAnimationAction.setEffectiveTimeScale(
      1
    )

    // Action needs to be active
    // for frame 0 to apply
    dropperAnimationAction.play()

    const mixer =
      dropperAnimationAction.getMixer()

    mixer.update(0)
  }

  // =====================================================
  // RESET LESSON
  // =====================================================

  const resetLesson = () => {
   const labModels = [
  chairRef,

  gogglesRef,
  gloveleftRef,
  gloverightRef,

  normalBeakerRef,
  conicalBeakerRef,
  conicalBeakerRef02,
  roundBeakerRef,
  graduatedBeakerRef,

  spoonRef,
  saltRef,
  saltContainerRef,

  redLitmusRef,
  blueLitmusRef,

  testube01Ref,
  testube02Ref,
  testube03Ref,
  testube04Ref,
  testube05Ref,
  testube06Ref,

  testube01CapRef,
  testube03CapRef,

  filterPaperRef,
  filterFoldedPaperRef,
  funnelRef,

  mainDropperRef,

  mainPolystereneRef,
  mainPolysterene2Ref,
  mainPolystereneLid,

  pottasiumCarbonateContainerRef,
  potassiumHydrogenCarbonateRef,

  digitalBalanceRef,

  mainBuiretteRef,
  buretteClampRef,
  mainThermometerRef,

  kettleRef,
  pipetteRef,
  volumetricRef,
  volumetricPipetteRef,
  volumetricBung,
  graduatedPipetteRef,

  iodobutaneBottleRef,
  bromobutaneBottleRef,
  chlorobutaneBottleRef,

  phenopthalineBottleRef,
  sulfamicBottleRef,
  methylBottleRef,
  naohBottleRef,
  waterBottleRef,

  boilingTube01Ref,
  graduatedCylinder100Ref,
  deliveryTubeBungRef,
  conicalBungRef,

  seperatingFunnelRef,
  separatingFunnelBungRef,

  heatingMantleRef,
  clampHandleRef,
  distillationHeadRef,
  condensorRef,
  heatingMatRef,
  bunsenBurnerRef,
  gasTubeRef,

  waterInTubeRef,
  waterOutTubeRef,

  nichromeWireRef,
  nichromeWirePowderRef,

  powderContainer,
  metalSaltRef,
  airHoleRef,

  normalBeakerLiquidRef,
  conicalBeakerLiquidRef,
  thermometerLiquidRef,
  BuretteLiquidRef,
  naohLiquidRef,

  normalPrecipitateRef,
]

    // Reset interaction states
    // such as Litmus Mode,
    // Pour Mode, etc.
    resetInteractions()

    // Reset reaction states
    resetReactions()

    // Reset lesson / guideline states
    resetLessonGuidelines()

    // Reset dropper animation
    resetDropperAnimation()

    // Wait until React state
    // resets have been applied
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Reset every 3D model
        labModels.forEach(
          (modelRef) => {
            if (
              modelRef?.current
            ) {
              resetModel(
                modelRef.current
              )
            }
          }
        )

        // Force dropper animation
        // back to frame 0
        if (
          dropperAnimationAction
        ) {
          dropperAnimationAction.time =
            0

          dropperAnimationAction
            .getMixer()
            .update(0)
        }
      })
    })
  }

  return resetLesson
}

// =====================================================
// RESET LESSON BUTTON
// =====================================================

const ResetLessonButton = () => {
  const resetLesson = useResetLesson()
  return (
    <button
      className="reset-btn"
      onClick={resetLesson}
    >
      Choose Another Lesson
    </button>
  )
}

export default ResetLessonButton