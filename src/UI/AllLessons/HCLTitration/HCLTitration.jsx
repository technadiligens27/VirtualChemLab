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
      "Add 2–3 drops of phenolphthalein.",
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

          <HCLTitrationLiveDataPanel
            normalBeakerAmount={lessonStep >= 10 ? 0 : lessonStep >= 6 ? 25 : null}

            volumetricFlaskAmount={ lessonStep >=38 ? 225 : lessonStep >= 22 ? 250 : lessonStep >= 15 ? 25 :  null}

            conicalFlaskAmount={ lessonStep >= 55 ? 0 : lessonStep >= 43 ? 25 : null}

            buretteNaOHAmount={
              lessonStep >= 32
                ? 30
                : null
            }

            initialBuretteReading={
              lessonStep >= 52
                ? 0
                : null
            }

            currentBuretteReading={
              lessonStep >= 52
                ? 24.7
                : null
            }

            naohDelivered={
              lessonStep >= 52
                ? 24.7
                : null
            }

            endpointStatus={
              lessonStep >= 53
                ? "Reached"
                : null
            }

            trialOne={
              lessonStep >= 70
                ? 24.7
                : null
            }

            trialTwo={
              lessonStep >= 71
                ? 24.6
                : null
            }

            meanTitre={
              lessonStep >= 71
                ? 24.65
                : null
            }

            selectedLesson={
              selectedLesson
            }

            lessonStep={
              lessonStep
            }

            autoShowConditions={[
              {
                selectedLesson: 11,
                lessonStep: 6,
              },
              {
                selectedLesson: 11,
                lessonStep: 15,
              },
              {
                selectedLesson: 11,
                lessonStep: 22,
              },  
              {
                selectedLesson: 11,
                lessonStep: 38,
              },  
              {
                selectedLesson: 11,
                lessonStep: 43,
              },                                        
  
            ]}

            showDuration={
              3000
            }
          />


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

            {lessonStep === 4 && <DialogBox text={
              <>
              Click held Beaker and select <strong>Add Liquid</strong> 
              </>
              }/>}

             {lessonStep === 5 && (
              <DialogBox
                text={
                  <>
                    Add <strong>25 cm³</strong> of <strong>Hydrochloric Acid</strong> to the beaker.
                  </>
                }
              />
            )}



            {lessonStep >=6 && lessonStep <17 && <HessGuidelines guidelineData={guidelineData[1]}/>}


            {lessonStep === 6 && <DialogBox text={<>
              Select the <strong>Volumetric Pipette</strong> and place it in your <strong>Left hand</strong>
             </>}
             />}
            {lessonStep === 7 && (
              <DialogBox
                text={
                  <>
                    <strong>Scroll down</strong> to squeeze the <strong>pipette filler</strong>.
                  </>
                }
              />
            )}          
            
            
          {lessonStep === 8 && (
            <DialogBox
              text={
                <>
                  Select the <strong>Volumetric Pipette</strong> and enter <strong>Pipette Mode</strong>.
                </>
              }
            />
          )}

          {lessonStep === 9 && (
            <DialogBox
              text={
                <>
                  <strong>Scroll up</strong> to release the <strong>pipette filler</strong> and draw <strong>hydrochloric acid</strong> into the pipette.
                </>
              }
            />
          )}

          {lessonStep === 10 && (
            <DialogBox
              text={
                <>
                 Click the <strong>Volumetric Pipette</strong> And Select Exit <strong>Pipette Mode</strong>.
                </>
              }
            />
          )}

          {lessonStep === 11 && (
            <DialogBox
              text={
                <>
                  Place the <strong>normal beaker</strong> back on the <strong>table</strong>.
                </>
              }
            />
          )}

            {lessonStep >= 12 && lessonStep <= 16 && (
              <HessGuidelines guidelineData={guidelineData[2]} />
            )}

          {lessonStep === 12 && (
            <DialogBox
              text={
                <>
                  Pick up the <strong>Volumetric Flask</strong>.
                </>
              }
            />
          )}

          {lessonStep === 13 && (
            <DialogBox
              text={
                <>
                 Select held Volumetric Pipette and Enter <strong>Pipette Mode</strong>.
                </>
              }
            />
          )}

          {lessonStep === 14 && (
            <DialogBox
              text={
                <>
                  <strong>Scroll down</strong> to release the <strong>hydrochloric acid</strong> into the <strong>volumetric flask</strong>.
                </>
              }
            />
          )}

          {lessonStep === 15 && (
            <DialogBox
              text={
                <>
                  Select Volumetric Pipette and select <strong>Exit Pipette Mode</strong>.
                </>
              }
            />
          )}

          {lessonStep === 16 && (
            <DialogBox
              text={
                <>
                 Click <strong>Volumetric Pipette</strong> and select <strong> Keep Back On Table</strong>.
                </>
              }
            />
          )}

            {lessonStep >= 17 && lessonStep <= 23 && (
              <HessGuidelines guidelineData={guidelineData[3]} />
            )}

            {lessonStep === 17 && (
              <DialogBox
                text={
                  <>
                    Pick up the <strong>Distilled Water Bottle</strong> with your <strong>Left hand</strong>.
                  </>
                }
              />
            )}

            {lessonStep === 18 && (
              <DialogBox
                text={
                  <>
                    Click <strong>Add Liquid</strong> for the <strong>normal beaker</strong>.
                  </>
                }
              />
            )}

            {lessonStep === 19 && (
              <DialogBox
                text={
                  <>
                    Add <strong>30 cm³</strong> of <strong>distilled water</strong> to the beaker.
                  </>
                }
              />
            )}

            {lessonStep === 20 && (
              <DialogBox
                text={
                  <>
                    Press <strong>Shift + P</strong> to enter <strong>Pour Mode</strong>.
                  </>
                }
              />
            )}

            {lessonStep === 21 && (
              <DialogBox
                text={
                  <>
                    <strong>Scroll down</strong> to pour the <strong>distilled water</strong> into the <strong>volumetric flask</strong>.
                  </>
                }
              />
            )}

            {lessonStep === 22 && (
              <DialogBox
                text={
                  <>
                    Press <strong>Shift + P</strong> to exit <strong>Pour Mode</strong>.
                  </>
                }
              />
            )}

            {lessonStep === 23 && (
              <DialogBox
                text={
                  <>
                    Place the <strong>Distilled Water Bottle</strong> back on the <strong>table</strong>.
                  </>
                }
              />
            )}

            {lessonStep >= 23.5 && lessonStep <= 29 && (
              <HessGuidelines guidelineData={guidelineData[4]} />
            )}

            {lessonStep === 23.5 && (
              <DialogBox
                text={
                  <>
                    Fit the <strong>bung</strong> securely into the <strong>volumetric flask</strong>.
                  </>
                }
              />
            )}

            {lessonStep === 24 && (
              <DialogBox
                text={
                  <>
                    <strong>Scroll down</strong> to invert the <strong>volumetric flask</strong>. <strong>Inversion 1 of 3</strong>.
                  </>
                }
              />
            )}

            {lessonStep === 25 && (
              <DialogBox
                text={
                  <>
                    <strong>Scroll up</strong> to return the <strong>volumetric flask</strong> upright. <strong>Inversion 1 of 3 complete</strong>.
                  </>
                }
              />
            )}

            {lessonStep === 26 && (
              <DialogBox
                text={
                  <>
                    <strong>Scroll down</strong> to invert the <strong>volumetric flask</strong> again. <strong>Inversion 2 of 3</strong>.
                  </>
                }
              />
            )}

            {lessonStep === 27 && (
              <DialogBox
                text={
                  <>
                    <strong>Scroll up</strong> to return the <strong>volumetric flask</strong> upright. <strong>Inversion 2 of 3 complete</strong>.
                  </>
                }
              />
            )}

            {lessonStep === 28 && (
              <DialogBox
                text={
                  <>
                    <strong>Scroll down</strong> to invert the <strong>volumetric flask</strong> one final time. <strong>Inversion 3 of 3</strong>.
                  </>
                }
              />
            )}

            {lessonStep === 29 && (
              <DialogBox
                text={
                  <>
                    <strong>Scroll up</strong> to return the <strong>volumetric flask</strong> upright. <strong>Mixing is complete</strong>.
                  </>
                }
              />
            )}

            {lessonStep >= 30 && lessonStep <= 33 && (
              <HessGuidelines guidelineData={guidelineData[5]} />
            )}

            {lessonStep === 30 && (
              <DialogBox
                text={
                  <>
                    Pick up the <strong>burette</strong> with your <strong>Left hand</strong>.
                  </>
                }
              />
            )}

            {lessonStep === 31 && (
              <DialogBox
                text={
                  <>
                    Click Held <strong>Burette</strong> and Select <strong>Add Liquid</strong>.
                  </>
                }
              />
            )}

            {lessonStep === 32 && (
              <DialogBox
                text={
                  <>
                    Add <strong>30 cm³</strong> of <strong>sodium hydroxide solution</strong> to the <strong>burette</strong>.
                  </>
                }
              />
            )}

            {lessonStep === 33 && (
              <DialogBox
                text={
                  <>
                    <strong>Clamp</strong> the <strong>burette</strong> securely in an <strong>upright position</strong>.
                  </>
                }
              />
            )}

            {lessonStep >= 34 && lessonStep <= 44 && (
              <HessGuidelines guidelineData={guidelineData[6]} />
            )}


          {lessonStep === 34 && (
            <DialogBox
              text={
                <>
                  Pick up the <strong>Volumetric Pipette</strong>.
                </>
              }
            />
          )}

          {lessonStep === 35 && (
            <DialogBox
              text={
                <>
                  <strong>Scroll down</strong> to squeeze the <strong>pipette filler</strong>.
                </>
              }
            />
          )}

          {lessonStep === 36 && (
            <DialogBox
              text={
                <>
                 Click <strong>Volumetric Pipette</strong> and Select Enter <strong>Pipette Mode</strong>.
                </>
              }
            />
          )}

          {lessonStep === 37 && (
            <DialogBox
              text={
                <>
                  <strong>Scroll up</strong> to draw the <strong>diluted hydrochloric acid</strong> into the <strong>pipette</strong>.
                </>
              }
            />
          )}

          {lessonStep === 38 && (
            <DialogBox
              text={
                <>
                  Click <strong>Volumetric Pipette</strong> and Select <strong>Exit Pipette Mode</strong>.
                </>
              }
            />
          )}

          {lessonStep === 39 && (
            <DialogBox
              text={
                <>
                  Place the <strong>volumetric flask</strong> back on the <strong>table</strong>.
                </>
              }
            />
          )}

          {lessonStep === 40 && (
            <DialogBox
              text={
                <>
                  Pick up the <strong>conical flask</strong> with your <strong>Right hand</strong>.
                </>
              }
            />
          )}

          {lessonStep === 41 && (
            <DialogBox
              text={
                <>
                 Click <strong>Volumetric Pipette</strong> And Select Enter <strong>Pipette Mode</strong>.
                </>
              }
            />
          )}

          {lessonStep === 42 && (
            <DialogBox
              text={
                <>
                  <strong>Scroll down</strong> to release the <strong>diluted hydrochloric acid</strong> into the <strong>conical flask</strong>.
                </>
              }
            />
          )}

          {lessonStep === 43 && (
            <DialogBox
              text={
                <>
                 Click <strong>Volumetric Pipette</strong> And Select <strong>Exit Pipette Mode</strong>.
                </>
              }
            />
          )}

          {lessonStep === 44 && (
            <DialogBox
              text={
                <>
                  Place the <strong>Volumetric Pipette</strong> back on the <strong>table</strong>.
                </>
              }
            />
          )}

            
            {lessonStep===45 && <HCLTitration2/>}


        </>
    )
}

export default HCLTitration