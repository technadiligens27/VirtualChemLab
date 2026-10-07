import { useContext, useEffect } from "react"

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
    mainDropperRef,waterBottleRef,naohBottleRef
  } = useContext(ModelContext)

  useEffect(()=>{
    if(waterBottleRef.current){
      waterBottleRef.current.visible=false
    }

    if(naohBottleRef.current){
      naohBottleRef.current.visible = true
    }
    
  },[waterBottleRef,naohBottleRef])

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

      {lessonStep >= 3 && lessonStep <7 && (
        <SulfamicGuidelines
          guidelineData={
            guidelineData[0]
          }
        />
      )}

      {lessonStep === 3 && (
        <DialogBox
          text={
           <>
            Click the <strong>Test Tube</strong>, then select{" "}
            <strong>Left Hand</strong> to pick it up.
          </>
          }
        />
      )}

      {lessonStep === 4 && (
        <DialogBox
          text={
            <>
              Click the <strong>Digital Balance</strong> and select{" "}
              <strong>Place Balance</strong> to bring it to the centre.
            </>
          }
        />
      )}

    {lessonStep === 5 && (
      <DialogBox
        text={
          <>
            Select the held <strong>test tube</strong>, then choose{" "}
            <strong>Weigh Test Tube</strong>.
          </>
        }
      />
    )}

    {lessonStep === 6 && (
      <DialogBox
        text={
          <>
            Click the weighed <strong>test tube</strong> and select{" "}
            <strong>Remove Test Tube</strong>.
          </>
        }
      />
    )}

      {/* =====================================================
          GUIDELINE 2
          STEPS 7 - 14
          ADD + WEIGH SULFAMIC ACID
      ===================================================== */}

      {lessonStep >= 7 && lessonStep <15 && (
        <SulfamicGuidelines
          guidelineData={
            guidelineData[1]
          }
        />
      )}

      {lessonStep === 7 && (
        <DialogBox
          text={
            <>
              Click the <strong>Spatula</strong>, then select{" "}
              <strong>Right Hand</strong> to pick it up
            </>
          }
        />
      )}

      {lessonStep === 8 && (
        <DialogBox
          text={
            <>
              Click the <strong>sulfamic acid bottle</strong>, then select{" "}
              <strong>Take Sulfamic Acid</strong>.
            </>
          }
        />
      )}

      {lessonStep === 9 && (
        <DialogBox
          text={
            <>
              Click the <strong>Held spoon</strong>, then select{" "}
              <strong>Pour into Test Tube</strong>.
            </>
          }
        />
      )}

      {lessonStep === 10 && (
        <DialogBox
        text={
          <>
            <strong>Scroll Down</strong> to pour the{" "}
            <strong>sulfamic acid</strong> into the{" "}
            <strong>test tube</strong>.
          </>
        }
        />
      )}

      {lessonStep === 11 && (
        <DialogBox
          text={
            <>
              Click the spatula, then select{" "}
              <strong>Disable Pour Mode</strong>.
            </>
          }
        />
      )}

    {lessonStep === 12 && (
      <DialogBox
        text={
          <>
            Select the  <strong>held test tube</strong>, then choose{" "}
            <strong>Weigh Test Tube</strong>.
          </>
        }
      />
    )}

      {lessonStep === 13 && (
        <DialogBox
          text={
            <>
              Click the <strong>Held Spatula </strong>, then select{" "}
              <strong>Keep Back on Table</strong>.
            </>
          }
        />
      )}

      {lessonStep === 14 && (
        <DialogBox
          text={
            <>
              Click the <strong>weighed test tube</strong>, then select{" "}
              <strong>Remove Test Tube</strong>
            </>
          }
        />
      )}

      {/* =====================================================
          GUIDELINE 3
          STEPS 15 - 21
          DISSOLVE SULFAMIC ACID
      ===================================================== */}

      {lessonStep >= 15 && lessonStep<22 && (
        <SulfamicGuidelines
          guidelineData={
            guidelineData[2]
          }
        />
      )}

      {lessonStep === 15 && (
        <DialogBox
          text={
        <>
          Now <strong>Pick up</strong> the <strong>Beaker</strong> on to your{" "}
          <strong>left hand</strong>.
        </>
          }
        />
      )}
      {lessonStep === 16 && (
        <DialogBox
          text={
           <>
            Click held Beaker and Select <strong>Add Liquid</strong> 

           </> 
          }
        />
      )}

      {lessonStep === 17 && (
        <DialogBox
          text={
            <>
              Fill the beaker with{" "}
              <strong>100 cm³ of water (H₂O)</strong>
            </>
          }
        />
      )}

      {lessonStep === 18 && (
        <DialogBox
          text={
            <>
              Press <strong>P</strong> to enter{" "}
              <strong>Pouring Mode</strong>
            </>
          }
        />
      )}

      {lessonStep === 19 && (
        <DialogBox
          text={
            <>
              <strong>Scroll down</strong> to pour the sulfamic acid into the beaker
            </>
          }
        />
      )}

      {lessonStep === 20 && (
          <DialogBox
            text={
              <>
                Press <strong>P</strong> to exit{" "}
                <strong>Pouring Mode</strong>
              </>
            }
          />
        )}

      {lessonStep === 21 && (
        <DialogBox
          text={
            <>
              Keep the held <strong>test tube</strong> back on the table.
            </>
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
          beakerWaterAmount={lessonStep >= 18 && lessonStep < 42 ? 100 : null}
          volumetricFlaskAmount={lessonStep >= 44 ? 250 : lessonStep >= 41 ? 190 : lessonStep >= 35 ? 160 : lessonStep >= 32 ? 130 : lessonStep >= 20 ? 100 : null}
          buretteSulfamicAmount={(lessonStep >= 50) ? 50 : null}
          conicalFlaskNaOHAmount={selectedLesson === 12.2 && lessonStep >= 74 ? 25 : null}
          indicatorStatus={selectedLesson === 12.2 && lessonStep >= 79 ? "Added" : null}
          initialBuretteReading={selectedLesson === 12.2 && lessonStep >= 82 ? 0 : null}
          currentBuretteReading={selectedLesson === 12.2 && lessonStep === 84 ? 24.80 : selectedLesson === 12.2 && lessonStep === 103 ? 24.70 : null}
          sulfamicAcidDelivered={selectedLesson === 12.2 && lessonStep === 84 ? 24.80 : selectedLesson === 12.2 && lessonStep === 103 ? 24.70 : null}
          endpointStatus={selectedLesson === 12.2 && [84, 103].includes(lessonStep) ? "Endpoint reached" : "Waiting"}
          roughTitre={selectedLesson === 12.2 && lessonStep >= 85 ? 24.75 : null}
          trialOne={selectedLesson === 12.2 && lessonStep >= 84 ? 24.70 : null}
          trialTwo={selectedLesson === 12.2 && lessonStep >= 104 ? 24.80 : null}
          meanTitre={selectedLesson === 12.2 && lessonStep >= 104 ? 24.75 : null}
          sulfamicAcidConcentration={null}
          naohConcentration={null}
          selectedLesson={selectedLesson}
          lessonStep={lessonStep}
          autoShowConditions={[
            { selectedLesson: 12, lessonStep: 6 },
            { selectedLesson: 12, lessonStep: 13 },
            { selectedLesson: 12.1, lessonStep: 42 },
            { selectedLesson: 12.2, lessonStep: 58 },
            { selectedLesson: 12.2, lessonStep: 76 },
            { selectedLesson: 12.2, lessonStep: 85 },
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