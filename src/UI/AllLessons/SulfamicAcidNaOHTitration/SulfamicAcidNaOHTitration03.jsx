import { useContext, useEffect, } from "react"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox.jsx"
import SulfamicGuidelines from "../../SulfamicGuidelines/SulfamicGuidelines.jsx";
import {guidelineData} from "../../Data/SulfamicNaOHTitrationData/SulfamicNaOHTitrationData.jsx"
import SulfamicTitrationLiveDataPanel from "./SulfamicTitrationLiveDataPanel/SulfamicTitrationLiveDataPanel.jsx"


const SulfamicAcidNaOHTitration03 = () => {

  const {
    setSelectedRightHand,
    setSelectedLeftHand,
    selectedLeftHand,
    selectedRightHand
  } = useContext(InteractionContext)

  const {
    lessonStep,
    selectedLesson,
    setSafetyStep,
    setLessonStep
  } = useContext(MainGuidelineContext)

  const {
    gogglesRef,
    gloverightRef,
    gloveleftRef,
    normalBeakerRef,
    volumetricRef,
    volumetricBung
  } = useContext(ModelContext)

  // =========================================================
  // INITIALIZE PART 2
  // =========================================================

  useEffect(() => {

    if (selectedLesson !== 12.2) return

    if (
      !normalBeakerRef?.current ||
      !volumetricRef?.current ||
      !volumetricBung?.current
    ) return

    // =======================================================
    // SAFETY STATE
    // =======================================================

    setSafetyStep(4)

    setLessonStep(50)

    if (gogglesRef?.current) {
      gogglesRef.current.visible = false
    }

    if (gloverightRef?.current) {
      gloverightRef.current.visible = false
    }

    if (gloveleftRef?.current) {
      gloveleftRef.current.visible = false
    }

    if(volumetricBung?.current){
      volumetricBung.current.visible = true
    }

    // =======================================================
    // NORMAL BEAKER -> LEFT HAND
    // =======================================================
    if (
      selectedLeftHand?.name !== "main-normal-beaker"
    ) {
      setSelectedLeftHand({
        hand: "left",

        name: "main-normal-beaker",

        ref: normalBeakerRef,

        originalParent:
          normalBeakerRef.current.parent,

        originalPosition:
          normalBeakerRef.current.position.clone(),

        originalRotation:
          normalBeakerRef.current.rotation.clone(),
      })
    }
    // =======================================================
    // RIGHT HAND EMPTY
    // =======================================================

    if (
      selectedRightHand?.name !== "volumetric-flask"
    ) {

      setSelectedRightHand({
        hand: "right",

        name: "volumetric-flask",

        ref: volumetricRef,

        originalParent:
          volumetricRef.current.parent,

        originalPosition:
          volumetricRef.current.position.clone(),

        originalRotation:
          volumetricRef.current.rotation.clone(),
      })
    }

    console.log(
      "Sulfamic Acid Na.currentOH Titration Part 3 initialized"
    )

  }, [
    selectedLesson,
    setSafetyStep,
    setSelectedLeftHand,
    setSelectedRightHand,
    gloveleftRef,
    gloverightRef,
    gogglesRef,
    volumetricBung,
    normalBeakerRef,
    volumetricRef
  ])


  useEffect(() => {

    if (selectedLesson !== 12.2) return

    if (!volumetricRef?.current) return

    volumetricRef.current.traverse((child) => {

      const childName =
        child.name?.toLowerCase() || ""

      if (
        child.isMesh &&
        childName.includes("liquid")
      ) {

        child.visible = true

        child.scale.y = 1

        if (child.material) {

          child.material =
            child.material.clone()

          child.material.transparent = true

          child.material.opacity = 0.6
        }
      }
    })

  }, [
    selectedLesson,
    volumetricRef,
  ])


  // =========================================================
  // GUIDELINES
  // =========================================================

  return (
    <>

      {lessonStep==50 && (
        <DialogBox
          text={"Keep Back Beaker In Table"}
        />
      )}

      {lessonStep==51 && (
        <DialogBox
          text={"Keep Volumetric Flask In Table"}
        />
      )}

      {
        lessonStep === 52 &&
        (
          <SulfamicGuidelines
            guidelineData={
              guidelineData[8]
            }
          />
        )
      }

      {lessonStep==52 && (
        <DialogBox
          text={"Pick Up Burette To Left Hand"}
        />
      )}

      {lessonStep==53 && (
        <DialogBox
          text={"Take funnel to Right Hand"}
        />
      )}

      {lessonStep==54 && (
        <DialogBox
          text={"Click Funnel and select Funnel Mode"}
        />
      )}

      {lessonStep==55 && (
        <DialogBox
          text={"Click Volumetric Flask and Select Right Hand"}
        />
      )}

      {lessonStep==56 && (
        <DialogBox
          text={"Press P for Pouring Mode"}
        />
      )}

      {lessonStep==57 && (
        <DialogBox
          text={"Scroll Down to Pour"}
        />
      )}

      {lessonStep==58 && (
        <DialogBox
          text={"Press P to Exit Pouring Mode"}
        />
      )}

      {lessonStep==59 && (
        <DialogBox
          text={"Keep Vokumetric Flask In table"}
        />
      )}

      {lessonStep==60 && (
        <DialogBox
          text={"Click Buirette and Select Exit Funnel Mode"}
        />
      )}



      {lessonStep==61 && (
        <DialogBox
          text={"Clamp Burette"}
        />
      )}


      




      {lessonStep==62 && (
        <DialogBox
          text={"Keep Funnel In Table"}
        />
      )}

      {
        lessonStep === 62 &&
        (
          <SulfamicGuidelines
            guidelineData={
              guidelineData[9]
            }
          />
        )
      }

      {lessonStep==63 && (
        <DialogBox
          text={"Take NaOH Reagent Bottle into Right Hand"}
        />
      )}

      {/* 
      {lessonStep==64 && (
        <DialogBox
          text={"Click Normale Beaker and select Add Liquid"}
        />
      )}

      {lessonStep==65 && (
        <DialogBox
          text={"NaOH -25cm3"}
        />
      )}
      */}

      {lessonStep==66 && (
        <DialogBox
          text={"Take Volumetric Pipette to Left Hand"}
        />
      )}

      {lessonStep==67 && (
        <DialogBox
          text={"Scroll Down to relase air"}
        />
      )}

      {lessonStep==68 && (
        <DialogBox
          text={"Click Volumetric Pipette and select Pipette Mode"}
        />
      )}

      {lessonStep==69 && (
        <DialogBox
          text={"Scroll Up to to get the lqiuid"}
        />
      )}

      {lessonStep==70 && (
        <DialogBox
          text={"Exit Pipette Mode"}
        />
      )}

      {lessonStep==71 && (
        <DialogBox
          text={"Keep NaOH Reagent Bottle Back in Table"}
        />
      )}

      {
        lessonStep === 72 &&
        (
          <SulfamicGuidelines
            guidelineData={
              guidelineData[10]
            }
          />
        )
      }

      {lessonStep==72 && (
        <DialogBox
          text={"Take Conical Flask To Right Hand"}
        />
      )}

      {lessonStep==73 && (
        <DialogBox
          text={"Go TO Pippete Mode"}
        />
      )}

      {lessonStep==74 && (
        <DialogBox
          text={"Scroll Donw to Pour"}
        />
      )}

      {lessonStep==75 && (
        <DialogBox
          text={"Exit Pipeete Mode"}
        />
      )}

      {lessonStep==76 && (
        <DialogBox
          text={"Keep Volumetric Pipette Back On Table"}
        />
      )}

      {
        lessonStep === 77 &&
        (
          <SulfamicGuidelines
            guidelineData={
              guidelineData[11]
            }
          />
        )
      }

      {lessonStep==77 && (
        <DialogBox
          text={"Take Methyl Orange Bottle to Left Hand"}
        />
      )}

      {lessonStep==78 && (
        <DialogBox
          text={"Click Dropper and select Pour into Testube"}
        />
      )}

      {lessonStep==79 && (
        <DialogBox
          text={"Squeeze Bottle to Pour Liquid "}
        />
      )}

      {lessonStep==80 && (
        <DialogBox
          text={"Exit Pour Mode"}
        />
      )}

      {lessonStep==81 && (
        <DialogBox
          text={"Keep Methyl Orange Bottle Back In Table "}
        />
      )}


      {
        lessonStep === 82 &&
        (
          <SulfamicGuidelines
            guidelineData={
              guidelineData[12]
            }
          />
        )
      }



      {lessonStep==82 && (
        <DialogBox
          text={"Place Clamp in Centre"}
        />
      )}

      {lessonStep==83 && (
        <DialogBox
          text={"Click Conical Flask and Select Place Near Beaker"}
        />
      )}

      {lessonStep==84 && (
        <DialogBox
          text={"Scroll Down To Pour"}
        />
      )}

      {lessonStep==85 && (
        <DialogBox
          text={"Remove Conical Flask from Buirette"}
        />
      )}

      {
        lessonStep === 86 &&
        (
          <SulfamicGuidelines
            guidelineData={
              guidelineData[13]
            }
          />
        )
      }

      {lessonStep==86 && (
        <DialogBox
          text={"Remove Clamp From Centre"}
        />
      )}

      {lessonStep==87 && (
        <DialogBox
          text={"Clean Conical Flask"}
        />
      )}

      {lessonStep==88 && (
        <DialogBox
          text={"Keep Conical Back in Table"}
        />
      )}

      {lessonStep==89 && (
        <DialogBox
          text={"Take NaOH Reagent Bottle to Right Hand"}
        />
      )}

      {lessonStep==90 && (
        <DialogBox
          text={"Take Volumetric Pipette to Left Hand"}
        />
      )}

      {lessonStep==91 && (
        <DialogBox
          text={"Scroll Down"}
        />
      )}

      {lessonStep==92 && (
        <DialogBox
          text={"Go To Pipette Mode"}
        />
      )}

      {lessonStep==93 && (
        <DialogBox
          text={"Scroll Up to to get the lqiuid"}
        />
      )}

      {lessonStep==94 && (
        <DialogBox
          text={"Exit Pipette Mode"}
        />
      )}

      {lessonStep==95 && (
        <DialogBox
          text={"Keep NaOH Reagent In Table"}
        />
      )}


      {
        lessonStep === 100 &&
        (
          <SulfamicGuidelines
            guidelineData={
              guidelineData[14]
            }
          />
        )
      }


      {lessonStep==96 && (
        <DialogBox
          text={"Take Conical Flask Into Right Hand"}
        />
      )}

      {lessonStep==97 && (
        <DialogBox
          text={"Go To Pipette Mode"}
        />
      )}

      {lessonStep==98 && (
        <DialogBox
          text={"Scroll Down to Pour"}
        />
      )}

      {lessonStep==99 && (
        <DialogBox
          text={"Exit Pippete Mode"}
        />
      )}

      {
        lessonStep === 100 &&
        (
          <SulfamicGuidelines
            guidelineData={
              guidelineData[16]
            }
          />
        )
      }

      {lessonStep==100 && (
        <DialogBox
          text={"Keep Volumetric Pippete Back In Table"}
        />
      )}

      {lessonStep==101 && (
        <DialogBox
          text={"Place Clamp In Center"}
        />
      )}

      {lessonStep==102 && (
        <DialogBox
          text={"Place Beaker Near Burrtte"}
        />
      )}

      {lessonStep==103 && (
        <DialogBox
          text={"Scroll Down to Pour"}
        />
      )}

      {lessonStep==104 && (
        <DialogBox
          text={"Lesson Flow"}
        />
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

export default SulfamicAcidNaOHTitration03