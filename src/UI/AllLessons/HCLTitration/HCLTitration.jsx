import { useContext } from "react";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext";
import EnthalpyLessonOverview from "../../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview";
import {hclTitrationReactionData} from '../../Data/HCLTitrationData/HCLTitrationData.jsx'
import SafetyScreen from "../../SafetyScreen/SafetyScreen.jsx";
import {safetyInstructionData} from '../../Data/SafetyInstruction/SafetyInstruction.jsx'
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox.jsx";
import HCLTitration2 from "./HCLTitration2.jsx";
import HessGuidelines from "../../HessGuidelines/HessGuidelines.jsx";
import HCLTitrationLiveDataPanel from "../../HCLTitrationLiveDataPanel/HCLTitrationLiveDataPanel.jsx";

const HCLTitration = ()=>{


  const {isFillBeakerBoxOpen,hessGuidelineNumber,setHessGuidelineNumber,
    showEnthalyResultOne,setShowEnthalyResultOne,setIsVolumetricPipetteFilled} = useContext(InteractionContext)
    
  const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);
  const {digitalBalanceRef,kettleRef,chlorobutaneBottleRef,mainDropperRef} = useContext(ModelContext)  
    
const guidelineData = [
  {
    id: 1,

    title: "Prepare the Hydrochloric Acid",

    description:
      "Transfer hydrochloric acid into a clean beaker so that an accurate 25.0 cm³ portion can be measured using a volumetric pipette.",

    implementationSteps: [
      "Pick up the normal beaker.",
      "Select Add Liquid.",
      "Add 25 cm³ of hydrochloric acid to the beaker.",
      "Pick up the volumetric pipette with the other hand.",
      "Prepare to measure the hydrochloric acid accurately.",
    ],

    image: "./BeakerHcl.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 2,

    title: "Measure the Hydrochloric Acid",

    description:
      "Use the volumetric pipette and safety filler to accurately measure the hydrochloric acid before transferring it into the volumetric flask.",

    implementationSteps: [
      "Position the volumetric pipette in the hydrochloric acid.",
      "Squeeze the pipette filler.",
      "Enter Pipette Mode.",
      "Release the filler slowly to draw hydrochloric acid into the pipette.",
      "Fill the pipette to the required calibration level.",
      "Exit Pipette Mode.",
    ],

    image: "./measureHCLWithPipette.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 3,

    title: "Transfer the Acid to the Volumetric Flask",

    description:
      "Transfer the measured hydrochloric acid from the volumetric pipette into the volumetric flask so that the acid can be diluted accurately.",

    implementationSteps: [
      "Place the beaker back on the table.",
      "Pick up the volumetric flask.",
      "Position the filled volumetric pipette above the flask.",
      "Enter Pipette Mode.",
      "Release the hydrochloric acid into the volumetric flask.",
      "Exit Pipette Mode when the pipette is empty.",
    ],

    image: "./transferHCLToVolumetricFlask.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 4,

    title: "Dilute the Hydrochloric Acid",

    description:
      "Add distilled water to the hydrochloric acid in the volumetric flask. Dilution produces the solution that will later be used for the titration.",

    implementationSteps: [
      "Pick up the normal beaker.",
      "Add approximately 30 cm³ of distilled water.",
      "Enter Pour Mode.",
      "Pour the water into the volumetric flask.",
      "Exit Pour Mode.",
      "Place the beaker back on the table.",
    ],

    image: "./diluteHCL.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 5,

    title: "Mix the Diluted Hydrochloric Acid",

    description:
      "Seal the volumetric flask and mix the contents thoroughly so that the hydrochloric acid is evenly distributed throughout the solution.",

    implementationSteps: [
      "Fit the bung securely into the volumetric flask.",
      "Hold the volumetric flask upright.",
      "Invert the flask.",
      "Return it upright.",
      "Repeat the inversion several times.",
      "Make sure the solution is thoroughly mixed.",
    ],

    image: "./mixVolumetricFlask.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 6,

    title: "Prepare the Burette",

    description:
      "Prepare the burette with standardised sodium hydroxide solution. The sodium hydroxide will be added gradually to the hydrochloric acid during the titration.",

    implementationSteps: [
      "Pick up the burette.",
      "Select Add Liquid.",
      "Add sodium hydroxide solution to the burette.",
      "Clamp the burette securely.",
      "Make sure the burette is positioned vertically.",
    ],

    image: "./prepareBuretteNaOH.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 7,

    title: "Prepare the Conical Flask",

    description:
      "Use the volumetric pipette to transfer an accurate portion of the diluted hydrochloric acid into the conical flask.",

    implementationSteps: [
      "Pick up the volumetric pipette.",
      "Position it in the diluted hydrochloric acid.",
      "Squeeze the pipette filler.",
      "Enter Pipette Mode.",
      "Draw the diluted acid into the pipette.",
      "Transfer the measured acid into the conical flask.",
      "Return the pipette to the table.",
    ],

    image: "./prepareConicalFlaskHCL.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 8,

    title: "Add Phenolphthalein Indicator",

    description:
      "Add a small amount of phenolphthalein indicator to the hydrochloric acid. The indicator allows the endpoint of the titration to be identified by a permanent pale-pink colour.",

    implementationSteps: [
      "Pick up the phenolphthalein dropper bottle.",
      "Position the dropper above the conical flask.",
      "Enter Pour Mode.",
      "Add 2–3 drops of phenolphthalein.",
      "Exit Pour Mode.",
      "Return the phenolphthalein bottle to the table.",
    ],

    image: "./addPhenolphthalein.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 9,

    title: "Perform the Rough Titration",

    description:
      "Place the conical flask beneath the burette and gradually add sodium hydroxide. The rough titration provides an approximate volume needed to reach the endpoint.",

    implementationSteps: [
      "Place the burette clamp in the centre.",
      "Position the conical flask beneath the burette.",
      "Open the burette and begin adding sodium hydroxide.",
      "Observe the colour of the solution while titrating.",
      "Continue until a pale-pink endpoint is reached.",
      "Remove the conical flask from beneath the burette.",
    ],

    image: "./roughTitration.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 10,

    title: "Prepare for the Accurate Titration",

    description:
      "After completing the rough titration, clean the conical flask and prepare a fresh portion of hydrochloric acid for a more accurate titration.",

    implementationSteps: [
      "Select the conical flask.",
      "Clean the flask to remove the previous reaction mixture.",
      "Select Add Liquid.",
      "Add a fresh portion of hydrochloric acid.",
      "Prepare the flask for another titration.",
    ],

    image: "./cleanConicalFlask.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 11,

    title: "Add Indicator for the Accurate Titration",

    description:
      "Add fresh phenolphthalein to the new hydrochloric acid sample before carrying out the accurate titration.",

    implementationSteps: [
      "Pick up the phenolphthalein dropper bottle.",
      "Position it above the conical flask.",
      "Enter Pour Mode.",
      "Add 2–3 drops of phenolphthalein.",
      "Exit Pour Mode.",
      "Return the dropper bottle to the table.",
    ],

    image: "./addPhenolphthaleinTrial.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 12,

    title: "Prepare the Burette Again",

    description:
      "Prepare the burette with sufficient sodium hydroxide solution before beginning the accurate titration.",

    implementationSteps: [
      "Remove the burette from the centre if necessary.",
      "Pick up the burette.",
      "Select Add Liquid.",
      "Add sodium hydroxide solution.",
      "Clamp the burette securely.",
      "Place the burette and clamp back in the centre.",
    ],

    image: "./refillBurette.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 13,

    title: "Perform the Accurate Titration",

    description:
      "Carry out the titration carefully, adding sodium hydroxide gradually as the endpoint approaches. The correct endpoint is reached when a very pale pink colour remains in the flask.",

    implementationSteps: [
      "Place the conical flask beneath the burette.",
      "Begin adding sodium hydroxide.",
      "Observe the reaction mixture carefully.",
      "Reduce the addition rate as the endpoint approaches.",
      "Continue until a permanent pale-pink colour appears.",
      "Stop adding sodium hydroxide immediately.",
      "Remove the conical flask.",
    ],

    image: "./accurateTitration.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 14,

    title: "Record the Titration Result",

    description:
      "Use the burette readings to determine the volume of sodium hydroxide required to neutralise the hydrochloric acid.",

    implementationSteps: [
      "Record the initial burette reading.",
      "Record the final burette reading.",
      "Calculate the titre from the difference between the readings.",
      "Record the result.",
      "Repeat the titration if another concordant result is required.",
    ],

    image: "./titrationResults.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },
]
    return(
        <>
{/* 
        <HCLTitrationLiveDataPanel

            normalBeakerAmount={
              lessonStep >= 6 && lessonStep < 10
                ? 25
                : lessonStep >= 10 && lessonStep < 19
                ? 0
                : lessonStep >= 20 && lessonStep < 22
                ? 250
                : lessonStep >= 22
                ? 0
                : null
            }

            volumetricFlaskAmount={
              lessonStep >= 15 && lessonStep < 22
                ? 25
                : lessonStep >= 22 && lessonStep < 38
                ? 250
                : lessonStep >= 38
                ? 30
                : null
            }


            conicalFlaskAmount={
              lessonStep >= 43
                ? 25
                : null
            }


            buretteNaOHAmount={
              lessonStep >= 33
                ? 30
                : null
            }


            initialBuretteReading={null}

            currentBuretteReading={null}

            naohDelivered={null}

            endpointStatus={null}

            roughTitre={null}

            trialOne={null}

            trialTwo={null}

            meanTitre={null}

            selectedLesson={
              selectedLesson
            }

            lessonStep={
              lessonStep
            }

            autoShowConditions={[
              // 25 cm³ HCl added to normal beaker
              {
                selectedLesson: 11,
                lessonStep: 6,
              },

              // Pipette takes the HCl
              {
                selectedLesson: 11,
                lessonStep: 10,
              },

              // HCl transferred into volumetric flask
              {
                selectedLesson: 11,
                lessonStep: 15,
              },

              // 30 cm³ water added to normal beaker
              {
                selectedLesson: 11,
                lessonStep: 20,
              },

              // Water transferred into volumetric flask
              {
                selectedLesson: 11,
                lessonStep: 22,
              },

              // Burette filled with 30 cm³ NaOH
              {
                selectedLesson: 11,
                lessonStep: 33,
              },

              // 25 cm³ taken from volumetric flask
              {
                selectedLesson: 11,
                lessonStep: 38,
              },

              // 25 cm³ transferred into conical flask
              {
                selectedLesson: 11,
                lessonStep: 43,
              },
            ]}

            autoHideDelay={3000}
          /> */}


            {lessonStep === 1 && (
              <EnthalpyLessonOverview
                reactionData={hclTitrationReactionData[0]}
                onStartLesson={() => setLessonStep(2)}
              />
            )}

            {lessonStep === 2 && (
              <SafetyScreen
                safetyData={safetyInstructionData}
                onContinue={() => setLessonStep((previous) => previous + 1)}
                onBack={() => setLessonStep((previous) => previous - 1)}
              />
            )}

            {lessonStep >2 && lessonStep <6 && <HessGuidelines guidelineData={guidelineData[0]}/>}

            {lessonStep === 3 && <DialogBox text={"Select the normal beaker and place it in your right hand."}/>}
            {lessonStep === 4 && <DialogBox text={"Click Add Liquid."}/>}
            {lessonStep === 5 && <DialogBox text={"Add 25 cm³ of hydrochloric acid to the beaker."}/>}

            {lessonStep >=6 && lessonStep <17 && <HessGuidelines guidelineData={guidelineData[1]}/>}


            {lessonStep === 6 && <DialogBox text={"Select the volumetric pipette and place it in your left hand."}/>}
            {lessonStep === 7 && <DialogBox text={"Scroll down to squeeze the pipette filler."}/>}
            {lessonStep === 8 && <DialogBox text={"Select the volumetric pipette and enter Pipette Mode."}/>}
            {lessonStep === 9 && <DialogBox text={"Scroll up to release the pipette filler and draw hydrochloric acid into the pipette."}/>}
            {lessonStep === 10 && <DialogBox text={"Exit Pipette Mode."}/>}
            {lessonStep === 11 && <DialogBox text={"Place the normal beaker back on the table."}/>}

            {lessonStep >= 12 && lessonStep <= 16 && (
              <HessGuidelines guidelineData={guidelineData[2]} />
            )}

            {lessonStep === 12 && <DialogBox text={"Pick up the volumetric flask."}/>}
            {lessonStep === 13 && <DialogBox text={"Enter Pipette Mode."}/>}
            {lessonStep === 14 && <DialogBox text={"Scroll down to release the hydrochloric acid into the volumetric flask."}/>}
            {lessonStep === 15 && <DialogBox text={"Exit Pipette Mode."}/>}
            {lessonStep === 16 && <DialogBox text={"Return the volumetric pipette to your left hand."}/>}

            {lessonStep >= 17 && lessonStep <= 23 && (
              <HessGuidelines guidelineData={guidelineData[3]} />
            )}


            {lessonStep === 17 && <DialogBox text={"Pick up the normal beaker with your left hand."}/>}
            {lessonStep === 18 && <DialogBox text={"Click Add Liquid for the normal beaker."}/>}
            {lessonStep === 19 && <DialogBox text={"Add 30 cm³ of distilled water to the beaker."}/>}
            {lessonStep === 20 && <DialogBox text={"Press Shift + P to enter Pour Mode."}/>}
            {lessonStep === 21 && <DialogBox text={"Scroll down to pour the distilled water into the volumetric flask."}/>}
            {lessonStep === 22 && <DialogBox text={"Press Shift + P to exit Pour Mode."}/>}
            {lessonStep === 23 && <DialogBox text={"Place the normal beaker back on the table."}/>}

            {lessonStep >= 23.5 && lessonStep <= 29 && (
              <HessGuidelines guidelineData={guidelineData[4]} />
            )}

            {lessonStep === 23.5 && <DialogBox text={"Fit the bung securely into the volumetric flask."}/>}
            {lessonStep === 24 && <DialogBox text={"Scroll down to invert the volumetric flask. Inversion 1 of 3."}/>}
            {lessonStep === 25 && <DialogBox text={"Scroll up to return the volumetric flask upright. Inversion 1 of 3 complete."}/>}
            {lessonStep === 26 && <DialogBox text={"Scroll down to invert the volumetric flask again. Inversion 2 of 3."}/>}
            {lessonStep === 27 && <DialogBox text={"Scroll up to return the volumetric flask upright. Inversion 2 of 3 complete."}/>}
            {lessonStep === 28 && <DialogBox text={"Scroll down to invert the volumetric flask one final time. Inversion 3 of 3."}/>}
            {lessonStep === 29 && <DialogBox text={"Scroll up to return the volumetric flask upright. Mixing is complete."}/>}

            {lessonStep >= 30 && lessonStep <= 33 && (
              <HessGuidelines guidelineData={guidelineData[5]} />
            )}

            {lessonStep === 30 && <DialogBox text={"Pick up the burette with your left hand."}/>}
            {lessonStep === 31 && <DialogBox text={"Click Add Liquid."}/>}
            {lessonStep === 32 && <DialogBox text={"Add 30 cm³ of sodium hydroxide solution to the burette."}/>}
            {lessonStep === 33 && <DialogBox text={"Clamp the burette securely in an upright position."}/>}

            {lessonStep >= 34 && lessonStep <= 44 && (
              <HessGuidelines guidelineData={guidelineData[6]} />
            )}

            {lessonStep === 34 && <DialogBox text={"Pick up the volumetric pipette."}/>}
            {lessonStep === 35 && <DialogBox text={"Scroll down to squeeze the pipette filler."}/>}
            {lessonStep === 36 && <DialogBox text={"Enter Pipette Mode."}/>}
            {lessonStep === 37 && <DialogBox text={"Scroll up to draw the diluted hydrochloric acid into the pipette."}/>}
            {lessonStep === 38 && <DialogBox text={"Exit Pipette Mode."}/>}
            {lessonStep === 39 && <DialogBox text={"Place the volumetric flask back on the table."}/>}
            {lessonStep === 40 && <DialogBox text={"Pick up the conical flask with your right hand."}/>}
            {lessonStep === 41 && <DialogBox text={"Enter Pipette Mode."}/>}
            {lessonStep === 42 && <DialogBox text={"Scroll down to release the diluted hydrochloric acid into the conical flask."}/>}
            {lessonStep === 43 && <DialogBox text={"Exit Pipette Mode."}/>}
            {lessonStep === 44 && <DialogBox text={"Place the volumetric pipette back on the table."}/>}

            
            {lessonStep===45 && <HCLTitration2/>}


        </>
    )
}

export default HCLTitration