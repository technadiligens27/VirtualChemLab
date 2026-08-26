import { useContext } from "react"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

import EnthalpyLessonOverview from "../../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview"
import SafetyScreen from "../../SafetyScreen/SafetyScreen.jsx"
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox.jsx"
import SulfamicGuidelines from "../../SulfamicGuidelines/SulfamicGuidelines.jsx"

import {
  sulfamicAcidNaOHTitrationReactionData,
  guidelineData,
} from "../../Data/SulfamicNaOHTitrationData/SulfamicNaOHTitrationData.jsx"

import SulfamicAcidNaOHTitration02 from "./SulfamicAcidNaOHTitration02.jsx"

import { safetyInstructionData } from "../../Data/SafetyInstruction/SafetyInstruction.jsx"
import SulfamicTitrationLiveDataPanel from "./SulfamicTitrationLiveDataPanel/SulfamicTitrationLiveDataPanel.jsx"

const SulfamicAcidNaOHTitration = () => {
  const {
    isFillBeakerBoxOpen,
    hessGuidelineNumber,
    setHessGuidelineNumber,
    showEnthalyResultOne,
    setShowEnthalyResultOne,
    setIsVolumetricPipetteFilled,
  } = useContext(InteractionContext)

  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
    setShowNormalBeakerArrow,
  } = useContext(
    MainGuidelineContext
  )

  const {
    digitalBalanceRef,
    kettleRef,
    chlorobutaneBottleRef,
    mainDropperRef,
  } = useContext(ModelContext)

  return (
    <>
      {/* =====================================================
          LESSON OVERVIEW
      ===================================================== */}

      {lessonStep === 1 && (
        <EnthalpyLessonOverview
          reactionData={
            sulfamicAcidNaOHTitrationReactionData[0]
          }
          onStartLesson={() =>
            setLessonStep(2)
          }
        />
      )}

      {/* =====================================================
          SAFETY
      ===================================================== */}

      {lessonStep === 2 && (
        <SafetyScreen
          safetyData={
            safetyInstructionData
          }
          onContinue={() =>
            setLessonStep(
              (previous) =>
                previous + 1
            )
          }
          onBack={() =>
            setLessonStep(
              (previous) =>
                previous - 1
            )
          }
        />
      )}

      {/* =====================================================
          GUIDELINE 1
          STEPS 3 - 6
          WEIGH EMPTY TEST TUBE
      ===================================================== */}

      {lessonStep === 3 && (
        <SulfamicGuidelines
          guidelineData={
            guidelineData[0]
          }
        />
      )}

      {lessonStep === 3 && (
        <DialogBox
          text={
            "Take TestTube to Left Hand"
          }
        />
      )}

      {lessonStep === 4 && (
        <DialogBox
          text={
            "Place Balance In Centre"
          }
        />
      )}

      {lessonStep === 5 && (
        <DialogBox
          text={"Weigh Testube"}
        />
      )}

      {lessonStep === 6 && (
        <DialogBox
          text={"Remove Testube"}
        />
      )}

      {/* =====================================================
          GUIDELINE 2
          STEPS 7 - 14
          ADD + WEIGH SULFAMIC ACID
      ===================================================== */}

      {lessonStep === 7 && (
        <SulfamicGuidelines
          guidelineData={
            guidelineData[1]
          }
        />
      )}

      {lessonStep === 7 && (
        <DialogBox
          text={
            "Take Spatula to Right Hand"
          }
        />
      )}

      {lessonStep === 8 && (
        <DialogBox
          text={
            "Add sulfamic acid"
          }
        />
      )}

      {lessonStep === 9 && (
        <DialogBox
          text={
            "Click Spoon and Select Pour into Testube"
          }
        />
      )}

      {lessonStep === 10 && (
        <DialogBox
          text={
            "Scroll Down to Pour Sulfamic Acid to Testube"
          }
        />
      )}

      {lessonStep === 11 && (
        <DialogBox
          text={
            "Click Spoon and Select Disable Pour Mode"
          }
        />
      )}

      {lessonStep === 12 && (
        <DialogBox
          text={"Weigh Testube"}
        />
      )}

      {lessonStep === 13 && (
        <DialogBox
          text={
            "Keep Spatula Back In Table"
          }
        />
      )}

      {lessonStep === 14 && (
        <DialogBox
          text={
            "Remove Testube from Digital Balance"
          }
        />
      )}

      {/* =====================================================
          GUIDELINE 3
          STEPS 15 - 21
          DISSOLVE SULFAMIC ACID
      ===================================================== */}

      {lessonStep === 15 && (
        <SulfamicGuidelines
          guidelineData={
            guidelineData[2]
          }
        />
      )}

      {lessonStep === 15 && (
        <DialogBox
          text={
            "Take Normal Beaker to Left Hand"
          }
        />
      )}

      {lessonStep === 16 && (
        <DialogBox
          text={
            "Click Beaker and Select Add Liquid"
          }
        />
      )}

      {lessonStep === 17 && (
        <DialogBox
          text={"Water - 100cm3"}
        />
      )}

      {lessonStep === 18 && (
        <DialogBox
          text={
            "Press P for Pouring Mode"
          }
        />
      )}

      {lessonStep === 19 && (
        <DialogBox
          text={
            "Scroll Down to Pour Sulfamic Acid to Beaker"
          }
        />
      )}

      {lessonStep === 20 && (
        <DialogBox
          text={
            "Press P to Exit Pour Mode"
          }
        />
      )}

      {lessonStep === 21 && (
        <DialogBox
          text={
            "Keep Testube Back In Table"
          }
        />
      )}

      {/* =====================================================
          PART 2
      ===================================================== */}

      {lessonStep === 22 && (
        <SulfamicAcidNaOHTitration02 />
      )}


      {[12, 12.1, 12.2].includes(selectedLesson) && (
  <SulfamicTitrationLiveDataPanel
    emptyTestTubeMass={lessonStep >=6 ? 21.72 : null}
    testTubeWithSulfamicMass={lessonStep >= 13 ? 24.22 : null}
    sulfamicAcidMass={lessonStep >= 13 ? 2.50 : null}
    beakerWaterAmount={lessonStep >= 17 && lessonStep < 42 ? 100 : null}
    volumetricFlaskAmount={lessonStep >= 42 ? 250 : null}
    buretteSulfamicAmount={selectedLesson === 12.2 ? 50 : null}
    conicalFlaskNaOHAmount={selectedLesson === 12.2 && lessonStep >= 74 ? 25 : null}
    indicatorStatus={selectedLesson === 12.2 && lessonStep >= 79 ? "Added" : null}
    initialBuretteReading={selectedLesson === 12.2 && lessonStep >= 82 ? 0 : null}
    currentBuretteReading={selectedLesson === 12.2 && lessonStep === 84 ? 24.80 : selectedLesson === 12.2 && lessonStep === 103 ? 24.70 : null}
    sulfamicAcidDelivered={selectedLesson === 12.2 && lessonStep === 84 ? 24.80 : selectedLesson === 12.2 && lessonStep === 103 ? 24.70 : null}
    endpointStatus={selectedLesson === 12.2 && [84, 103].includes(lessonStep) ? "Endpoint reached" : "Waiting"}
    roughTitre={selectedLesson === 12.2 && lessonStep >= 85 ? 24.80 : null}
    trialOne={selectedLesson === 12.2 && lessonStep >= 104 ? 24.70 : null}
    trialTwo={null}
    meanTitre={null}
    sulfamicAcidConcentration={null}
    naohConcentration={null}
    selectedLesson={selectedLesson}
    lessonStep={lessonStep}
    autoShowConditions={[
      { selectedLesson: 12, lessonStep: 6 },
      { selectedLesson: 12, lessonStep: 12 },
      { selectedLesson: 12.1, lessonStep: 42 },
      { selectedLesson: 12.2, lessonStep: 57 },
      { selectedLesson: 12.2, lessonStep: 74 },
      { selectedLesson: 12.2, lessonStep: 84 },
      { selectedLesson: 12.2, lessonStep: 103 },
    ]}
    autoHideConditions={[
      { selectedLesson: 12, lessonStep: 3 },
      { selectedLesson: 12.1, lessonStep: 22 },
      { selectedLesson: 12.2, lessonStep: 50 },
    ]}
  />
)}
    </>
  )
}

export default SulfamicAcidNaOHTitration