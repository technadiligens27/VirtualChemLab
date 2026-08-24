import { useContext } from "react"

import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

import EnthalpyLessonOverview from "../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview"
import DialogBox from "../AllDialogBox/DialogBox/DialogBox"
import HessLiveDataPanel from "../HessLiveDataPanel/HessLiveDataPanel"

import { enthalpyReactionData } from "../Data/enthalpyReactionData/enthalpyReactionData"

const EnthalpyHessReaction02 = () => {
  const {
    isFillBeakerBoxOpen,
    hessGuidelineNumber,
    setHessGuidelineNumber,
  } = useContext(InteractionContext)

  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
    setShowNormalBeakerArrow,
  } = useContext(MainGuidelineContext)

  return (
    <>
      {lessonStep === 1 && (
        <EnthalpyLessonOverview
          reactionData={enthalpyReactionData[1]}
          onStartLesson={() => {
            setLessonStep(2)
          }}
        />
      )}

      {/* =====================================================
          HESS LIVE DATA PANEL
         ===================================================== */}

      {/* Nothing measured yet */}
      {lessonStep >= 2 && lessonStep < 14 && (
        <HessLiveDataPanel
          reactionNumber={2}

          selectedLesson={selectedLesson}
          lessonStep={lessonStep}
        />
      )}

      {/* Test tube + KHCO3 has now been weighed */}
      {lessonStep >= 14 && lessonStep < 19 && (
        <HessLiveDataPanel
          reactionNumber={2}

          massWithPowder={25.67}

          selectedLesson={selectedLesson}
          lessonStep={lessonStep}
        />
      )}

      {/* 30 cm³ HCl has now been prepared */}
      {lessonStep >= 19 && lessonStep < 30 && (
        <HessLiveDataPanel
          reactionNumber={2}

          volumeOfSolution={30}
          solutionDensity={1}

          massWithPowder={24.7}

          selectedLesson={selectedLesson}
          lessonStep={lessonStep}
        />
      )}

      {/* Thermometer placed - initial temperature known */}
      {lessonStep >= 30 && lessonStep < 34 && (
        <HessLiveDataPanel
          reactionNumber={2}

          volumeOfSolution={30}
          solutionDensity={1}

          startingTemperature={22}

          massWithPowder={24.7}

          selectedLesson={selectedLesson}
          lessonStep={lessonStep}
        />
      )}

      {/* Reaction has occurred - temperature has fallen */}
      {lessonStep >= 34 && lessonStep < 36 && (
        <HessLiveDataPanel
          reactionNumber={2}

          volumeOfSolution={30}
          solutionDensity={1}

          startingTemperature={22}

          // Use whichever temperature prop
          // your HessLiveDataPanel supports for Reaction 2.
          //
          // currentTemperature={...}
          // lowestTemperature={...}

          massWithPowder={24.7}

          selectedLesson={selectedLesson}
          lessonStep={lessonStep}
        />
      )}

      {/* Empty test tube has been reweighed */}
      {lessonStep >= 36 && (
        <HessLiveDataPanel
          reactionNumber={2}

          volumeOfSolution={30}
          solutionDensity={1}

          startingTemperature={22}

          // lowestTemperature={...}

          massWithPowder={24.7}

          // Replace with Reaction 2 value
          massAfterEmptying={21.7}

          selectedLesson={selectedLesson}
          lessonStep={lessonStep}
        />
      )}

      {/* =====================================================
          LESSON STEPS
         ===================================================== */}

      {lessonStep === 2 && (
        <DialogBox
          text={"Click Beaker and Select Left Hand Option"}
        />
      )}

      {lessonStep === 3 && (
        <DialogBox
          text={"Click Polysterene Cup and Select Right Hand Option"}
        />
      )}

      {lessonStep === 4 && (
        <DialogBox
          text={"Click Polysterene Cup and Select Place In Beaker"}
        />
      )}

      {lessonStep === 5 && (
        <DialogBox
          text={"Keep Beaker In Table"}
        />
      )}

      {lessonStep === 6 && (
        <DialogBox
          text={"Select Testube and select Left Hand"}
        />
      )}

      {lessonStep === 7 && (
        <DialogBox
          text={"Select Spatula and select Right Hand Option"}
        />
      )}

      {lessonStep === 8 && (
        <DialogBox
          text={
            "Click Potassium Hydrogencarbonate container And Select Potassium Hydrogencarbonate"
          }
        />
      )}

      {lessonStep === 9 && (
        <DialogBox
          text={"Click the Test tube and select Pour Into Testube"}
        />
      )}

      {lessonStep === 10 && (
        <DialogBox
          text={"Scroll Down to Pour"}
        />
      )}

      {lessonStep === 11 && (
        <DialogBox
          text={"Click the Spatula And Disable Pour Mode"}
        />
      )}

      {lessonStep === 12 && (
        <DialogBox
          text={
            "Click the Digital balance and select Place Balance."
          }
        />
      )}

      {lessonStep === 13 && (
        <DialogBox
          text={
            "Click the Test Tube and select Weigh Testube."
          }
        />
      )}

      {lessonStep === 14 && (
        <DialogBox
          text={
            "Click the spatula and select Keep Back on Table."
          }
        />
      )}

      {lessonStep === 15 && (
        <DialogBox
          text={
            "Click the test tube again and select Keep on Table."
          }
        />
      )}

      {lessonStep === 16 && (
        <DialogBox
          text={
            "Click the burette and select the Left Hand option."
          }
        />
      )}

      {lessonStep === 17 && (
        <DialogBox
          text={"Click the burette and select Add Liquid."}
        />
      )}

      {lessonStep === 18 && (
        <DialogBox
          text={
            "Add 30 cm³ of hydrochloric acid to the burette."
          }
        />
      )}

      {lessonStep === 19 && (
        <DialogBox
          text={
            "Click the normal beaker and select the Right Hand option."
          }
        />
      )}

      {lessonStep === 20 && (
        <DialogBox
          text={
            "Click the Digital balance and select Remove Balance."
          }
        />
      )}

      {lessonStep === 21 && (
        <DialogBox
          text={
            "Click the Burette and select Clamp Burette."
          }
        />
      )}

      {lessonStep === 22 && (
        <DialogBox
          text={
            "Click the Burette clamp and select Place in Centre."
          }
        />
      )}

      {lessonStep === 23 && (
        <DialogBox
          text={
            "Click the normal beaker and select Place Beaker."
          }
        />
      )}

      {lessonStep === 24 && (
        <DialogBox
          text={
            "Scroll down to pour hydrochloric acid from the burette into the polystyrene cup."
          }
        />
      )}

      {lessonStep === 25 && (
        <DialogBox
          text={
            "Click the normal beaker and select Remove Beaker."
          }
        />
      )}

      {lessonStep === 26 && (
        <DialogBox
          text={
            "Click the normal beaker and select Cover Polysterene Cup."
          }
        />
      )}

      {lessonStep === 27 && (
        <DialogBox
          text={
            "Click the burette clamp and select Remove from Centre."
          }
        />
      )}

      {lessonStep === 28 && (
        <DialogBox
          text={
            "Click the Thermometer and select the Right Hand option."
          }
        />
      )}

      {lessonStep === 29 && (
        <DialogBox
          text={
            "Click the Thermometer again and select Place Thermometer."
          }
        />
      )}

      {lessonStep === 30 && (
        <DialogBox
          text={
            "Click the test tube and select the Right Hand option."
          }
        />
      )}

      {lessonStep === 31 && (
        <DialogBox
          text={"Press P to enter Pouring Mode."}
        />
      )}

      {lessonStep === 32 && (
        <DialogBox
          text={
            "Scroll down to stir the mixture and gradually pour the potassium hydrogencarbonate from the test tube."
          }
        />
      )}

      {lessonStep === 33 && (
        <DialogBox
          text={"Press P again to exit Pouring Mode."}
        />
      )}

      {lessonStep === 34 && (
        <DialogBox
          text={
            "Place the digital balance again to reweigh the emptied test tube."
          }
        />
      )}

      {lessonStep === 35 && (
        <DialogBox
          text={
            "Click the test tube and select Weigh Test Tube."
          }
        />
      )}

      {lessonStep === 36 && (
        <DialogBox text={"36"} />
      )}
    </>
  )
}

export default EnthalpyHessReaction02