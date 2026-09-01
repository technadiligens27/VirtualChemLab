import { useContext, useEffect } from "react"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

import DialogBox from "../../AllDialogBox/DialogBox/DialogBox.jsx"
import HessGuidelines from "../../HessGuidelines/HessGuidelines.jsx"
import ResultsSheet from "../../ResultSheet/ResultSheet.jsx"
import {hclTitrationResultsData} from '../../Data/HCLTitrationData/HCLTitrationData.jsx'
import HCLTitrationLiveDataPanel from "../../HCLTitrationLiveDataPanel/HCLTitrationLiveDataPanel.jsx"
import TitreValueRecorded from "../../../Experience/Interactions/TitreValueRecorded/TitreValueRecorded.jsx"
import SulfamicAcidResult from "../../SulfamicAcidResult/SulfamicAcidResult.jsx"

const HCLTitration2 = () => {
  const {
    setIsVolumetricPipetteFilled,
    setIsBuiretteClamped,
    setSelectedRightHand,
  } = useContext(InteractionContext)

  const {
    lessonStep,
    selectedLesson,
    setSafetyStep,
  } = useContext(MainGuidelineContext)

  const {
    conicalBeakerRef,
    mainBuiretteRef,
    gogglesRef,
    gloverightRef,
    gloveleftRef,
    volumetricBung,
    volumetricRef,
  } = useContext(ModelContext)

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

    title: "Perform the Titration",

    description:
      "Place the conical flask beneath the burette and gradually add sodium hydroxide. The rough titration provides an approximate volume needed to reach the endpoint.",

    implementationSteps: [
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

    title: "Prepare for the Titration",

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

    title: "Perform  Titration",

    description:
      "Carry out the titration carefully, adding sodium hydroxide gradually as the endpoint approaches. The correct endpoint is reached when a very pale pink colour remains in the flask.",

    implementationSteps: [
      "Place the conical flask beneath the burette.",
      "Begin adding sodium hydroxide.",
      "Observe the reaction mixture carefully.",
      "Continue until a permanent pale-pink colour appears.",
      "Stop adding sodium hydroxide immediately.",
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

  // =========================================================
  // INITIALIZE HCL TITRATION PART 2 SHORTCUT STATE
  // =========================================================

  useEffect(() => {
    if (selectedLesson !== 11.1) return

    console.log("Initializing HCl Titration Part 2 shortcut...")

    // -------------------------
    // SAFETY STATE
    // -------------------------

    setSafetyStep(4)

    if (gogglesRef?.current) {
      gogglesRef.current.visible = false
    }

    if (gloverightRef?.current) {
      gloverightRef.current.visible = false
    }

    if (gloveleftRef?.current) {
      gloveleftRef.current.visible = false
    }

    // -------------------------
    // BURETTE STATE
    // -------------------------

    setIsBuiretteClamped(true)

    // -------------------------
    // VOLUMETRIC FLASK BUNG
    // -------------------------

    if (volumetricBung?.current) {
      volumetricBung.current.visible = true
    }

    // -------------------------
    // CONICAL FLASK -> RIGHT HAND
    // -------------------------

    if (conicalBeakerRef?.current) {
      const conicalFlask = conicalBeakerRef.current

      setSelectedRightHand({
        hand: "right",
        name: "main-Conical-Flask",
        ref: conicalBeakerRef,

        originalParent: conicalFlask.parent,
        originalPosition: conicalFlask.position.clone(),
        originalRotation: conicalFlask.rotation.clone(),
      })

      console.log(
        "✅ Shortcut State: Conical Flask moved to right hand"
      )
    } else {
      console.log(
        "❌ Shortcut State: Conical Flask ref not found"
      )
    }
  }, [selectedLesson])

  // =========================================================
  // INITIALIZE LIQUID LEVELS
  // =========================================================

  useEffect(() => {
    if (selectedLesson !== 11.1) return

    const interval = setInterval(() => {
      if (
        !conicalBeakerRef?.current ||
        !mainBuiretteRef?.current ||
        !volumetricRef?.current
      ) {
        console.log(
          "Waiting for HCl Titration Part 2 models..."
        )

        return
      }

      let conicalLiquidFound = false
      let buretteLiquidFound = false
      let volumetricLiquidFound = false

      // =====================================================
      // CONICAL FLASK LIQUID
      // =====================================================

      conicalBeakerRef.current.traverse(
        (child) => {
          const childName =
            child.name?.toLowerCase() || ""

          if (childName.includes("liquid")) {
            child.visible = true

            child.scale.y = 0.3

            // Set liquid opacity
            if (child.material) {
              child.material =
                child.material.clone()

              child.material.transparent =
                true

              child.material.opacity =
                0.3

              child.material.needsUpdate =
                true
            }

            child.updateMatrixWorld(true)

            conicalLiquidFound = true

          }
        }
      )

      // =====================================================
      // BURETTE LIQUID
      // =====================================================

      mainBuiretteRef.current.traverse(
        (child) => {
          const childName =
            child.name?.toLowerCase() || ""

          if (childName.includes("liquid")) {
            child.visible = true

            child.scale.y = 0.45

            child.updateMatrixWorld(true)

            buretteLiquidFound = true

            console.log(
              "✅ Burette liquid initialized"
            )
          }
        }
      )

      // =====================================================
      // VOLUMETRIC FLASK LIQUID
      // =====================================================

      volumetricRef.current.traverse(
        (child) => {
          const childName =
            child.name?.toLowerCase() || ""

          if (childName.includes("liquid")) {
            child.visible = true

            child.scale.y = 0.8

            child.updateMatrixWorld(true)

            volumetricLiquidFound = true

            console.log(
              "✅ Volumetric Flask liquid initialized"
            )
          }
        }
      )

      // =====================================================
      // EVERYTHING READY
      // =====================================================

      if (
        conicalLiquidFound &&
        buretteLiquidFound &&
        volumetricLiquidFound
      ) {
        setIsVolumetricPipetteFilled(false)

        console.log(
          "✅ HCl Titration Part 2 shortcut fully initialized"
        )

        clearInterval(interval)
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [
    selectedLesson,
    conicalBeakerRef,
    mainBuiretteRef,
    volumetricRef,
    setIsVolumetricPipetteFilled,
  ])

  // =========================================================
  // GUIDELINES
  // =========================================================
  return (
    <>
{/* 
      <HCLTitrationLiveDataPanel
        normalBeakerAmount={null}
        volumetricFlaskAmount={
          lessonStep >= 45
            ? 30
            : null
        }
        conicalFlaskAmount={
          lessonStep >= 45 && lessonStep < 54
            ? 25
            : lessonStep >= 54 && lessonStep < 57
            ? 0
            : lessonStep >= 57
            ? 30
            : null
        }
        buretteNaOHAmount={
          lessonStep >= 45 && lessonStep < 52
            ? 30
            : lessonStep >= 53 && lessonStep < 65
            ? 5.2
            : lessonStep >= 65 && lessonStep < 69
            ? 30
            : lessonStep >= 70
            ? 5.3
            : null
        }
        initialBuretteReading={
          lessonStep >= 50
            ? 0
            : null
        }
        currentBuretteReading={
          lessonStep >= 53 && lessonStep < 65
            ? 24.8
            : lessonStep >= 70
            ? 24.7
            : lessonStep === 52 || lessonStep === 69
            ? null
            : lessonStep >= 50
            ? 0
            : null
        }
        naohDelivered={
          lessonStep >= 53 && lessonStep < 65
            ? 24.8
            : lessonStep >= 70
            ? 24.7
            : null
        }
        endpointStatus={
          lessonStep >= 45 && lessonStep < 48
            ? "Not ready"
            : lessonStep >= 48 && lessonStep < 52
            ? "Ready"
            : lessonStep === 52
            ? "Approaching"
            : lessonStep >= 53 && lessonStep < 54
            ? "Reached"
            : lessonStep >= 54 && lessonStep < 61
            ? "Not ready"
            : lessonStep >= 61 && lessonStep < 69
            ? "Ready"
            : lessonStep === 69
            ? "Approaching"
            : lessonStep >= 70
            ? "Reached"
            : null
        }
        roughTitre={
          lessonStep >= 53
            ? 24.8
            : null
        }
        trialOne={
          lessonStep >= 53
            ? 24.7
            : null
        }
        
        trialTwo={ lessonStep >= 71   ? 24.75   : null }

        meanTitre={
          lessonStep >= 71
            ? 24.73
            : null
        }
        selectedLesson={selectedLesson}
        lessonStep={lessonStep}
        autoShowConditions={[
          {
            selectedLesson: 11.1,
            lessonStep: 48,
          },

          {
            selectedLesson: 11.1,
            lessonStep: 52,
          },

          {
            selectedLesson: 11.1,
            lessonStep: 53,
          },

          {
            selectedLesson: 11.1,
            lessonStep: 55,
          },

          {
            selectedLesson: 11.1,
            lessonStep: 57,
          },

          {
            selectedLesson: 11.1,
            lessonStep: 61,
          },

          {
            selectedLesson: 11.1,
            lessonStep: 65,
          },

          {
            selectedLesson: 11.1,
            lessonStep: 69,
          },

          {
            selectedLesson: 11.1,
            lessonStep: 70,
          },

          {
            selectedLesson: 11.1,
            lessonStep: 71,
          },
        ]}
        autoHideDelay={3000}
      /> */}

     {lessonStep >= 45 && lessonStep <= 49 && (
        <HessGuidelines guidelineData={guidelineData[7]} />
      )}

      {lessonStep === 45 && (<DialogBox text="Take Phenolphthalein Dropper Bottle to Left Hand"/>)}
      {lessonStep === 46 && (<DialogBox text="Position the Phenolphthalein Dropper above the Conical Flask (Press Pour Mode)"/>)}
      {lessonStep === 47 && (<DialogBox text="Squeeze the Dropper to add 2–3 drops of Phenolphthalein"/>)}
      {lessonStep === 48 && (<DialogBox text="Click Phenolphthalein Dropper and Exit Pour Mode"/>)}
      {lessonStep === 49 && (<DialogBox text="Keep Phenolphthalein Dropper back on Table"/>)}

      {lessonStep >= 50 && lessonStep <= 53 && (
        <HessGuidelines guidelineData={guidelineData[8]} />
      )}

      {lessonStep === 50 && (<DialogBox text="Place Clamp In Centre"/>)}
      {lessonStep === 51 && (<DialogBox text="Place Conical Flask Near Clamp"/>)}
      {lessonStep === 52 && (<DialogBox text="Scroll donw to Pour"/>)}
      {lessonStep === 53 && (<DialogBox text="Remove Conical Flask"/>)}

      {lessonStep === 53 && (<TitreValueRecorded
       titreValue ={24.8}
       imageSrc={'./buretteTitre03.png'}
       initialReading = {5.2}
       finalReading ={ 30.0}
       explanationText="The titre is the volume of sodium hydroxide delivered from the burette during the titration."
       />)
       
       
       }

      {lessonStep >= 54 && lessonStep <= 57 && (
        <HessGuidelines guidelineData={guidelineData[9]} />
      )}


      {lessonStep === 54 && (<DialogBox text="Click Conical Flask and click Clean Flask "/>)}
      {lessonStep === 55 && (<DialogBox text="Click Add Liquid"/>)}
      {lessonStep === 56 && (<DialogBox text="HCL 30cm3"/>)}
      {lessonStep === 57 && (<DialogBox text="Remove Burette from centre"/>)}

      {lessonStep >= 58 && lessonStep <= 62 && (
        <HessGuidelines guidelineData={guidelineData[10]} />
      )}

      {lessonStep === 58 && (<DialogBox text="Take Phenolphthalein Dropper Bottle to Left Hand"/>)}
      {lessonStep === 59 && (<DialogBox text="Press Pour Mode"/>)}
      {lessonStep === 60 && (<DialogBox text="Squeeze the Dropper to add 2–3 drops of Phenolphthalein"/>)}
      {lessonStep === 61 && (<DialogBox text="Click Phenolphthalein Dropper and Exit Pour Mode"/>)}
      {lessonStep === 62 && (<DialogBox text="Keep Phenolphthalein Dropper back on Table"/>)}
    
      {lessonStep >= 63 && lessonStep <= 67 && (
        <HessGuidelines guidelineData={guidelineData[11]} />
      )}


      {lessonStep === 63 && (<DialogBox text="Click Burette and get it to Left Hand"/>)}
      {lessonStep === 64 && (<DialogBox text="Click Add Liquid"/>)}
      {lessonStep === 65 && (<DialogBox text="NaOH 30cm3"/>)}
      {lessonStep === 66 && (<DialogBox text="Clamp"/>)}
      {lessonStep === 67 && (<DialogBox text="Place In Centre"/>)}
      {lessonStep === 68 && (<DialogBox text="Place Conical Flask in Burette"/>)}

      {lessonStep >= 68 && lessonStep <= 70 && (
        <HessGuidelines guidelineData={guidelineData[12]} />
      )}


      {lessonStep === 69 && (<DialogBox text="scroll down"/>)}

      {lessonStep === 70 && (<TitreValueRecorded
        titreValue ={24.7}
        imageSrc={'./buretteTitre04.png'}
        initialReading = {5.3}
        finalReading ={ 30.0}
        explanationText="The titre is the volume of sodium hydroxide delivered from the burette during the titration."
        />)
       
       }

      {lessonStep === 70 && (<DialogBox text="Remove Copnical Flaks"/>)}
      {lessonStep === 71 && (<DialogBox text="71"/>)}


      {lessonStep === 71 && (
        <SulfamicAcidResult
            sulfamicAcidMass={2.5}
            volumetricFlaskVolume={250}
            aliquotVolume={25}

            // roughTitre={24.8}
            trialOne={24.7}
            trialTwo={24.75}

            topLabelText="Titration Results"

            mainTitleText="Hydrochloric Acid – Sodium Hydroxide"

            subtitleText="Final experimental results"

            sulfamicAcidLabelText="Hydrochloric acid"

            concentrationLabelText="Concentration of HCl"

            molesSulfamicAcidLabelText="Moles of HCl"

            sulfamicAcidConcentrationLabelText="HCl concentration"

            imageSrc="./buretteTitre.png"
          />
      )}


    </>
  )
}

export default HCLTitration2