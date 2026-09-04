import { useContext, useEffect, } from "react"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox.jsx"
import SulfamicGuidelines from "../../SulfamicGuidelines/SulfamicGuidelines.jsx";
import {guidelineData} from "../../Data/SulfamicNaOHTitrationData/SulfamicNaOHTitrationData.jsx"
import SulfamicTitrationLiveDataPanel from "./SulfamicTitrationLiveDataPanel/SulfamicTitrationLiveDataPanel.jsx"
import TitreValueRecorded from "../../../Experience/Interactions/TitreValueRecorded/TitreValueRecorded.jsx"
import SulfamicAcidResult from "../../SulfamicAcidResult/SulfamicAcidResult.jsx";
import useResetLesson from "../../ResetLessonButton/ResetLessonButton.jsx"
import QuestionCard from "../../QuestionCard/QuestionCard.jsx"


const SulfamicAcidNaOHTitration03 = () => {

  const resetLesson = useResetLesson();

  const {
    setSelectedRightHand,
    setSelectedLeftHand,
    selectedLeftHand,
    selectedRightHand,setShowQuestionCardNo,showQuestionCardNo
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
    volumetricBung,
    digitalBalanceRef
  } = useContext(ModelContext)


  useEffect(()=>{
    digitalBalanceRef.current.visible=false
  },[digitalBalanceRef])

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

      {lessonStep === 50 && (
        <DialogBox
          text={
            <>
              Click the beaker, then select{" "}
              <strong>Keep Back on Table</strong>.
            </>
          }
        />
      )}

      {lessonStep === 51 && (
        <DialogBox
          text={
            <>
              Click the volumetric flask, then select{" "}
              <strong>Keep Back on Table</strong>.
            </>
          }
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

     {lessonStep === 52 && (
  <DialogBox
    text={
      <>
        Click the burette, then select{" "}
        <strong>Left Hand</strong>.
      </>
    }
  />
      )}

      {lessonStep === 53 && (
        <DialogBox
          text={
            <>
              Click the funnel, then select{" "}
              <strong>Right Hand</strong>.
            </>
          }
        />
      )}

      {lessonStep === 54 && (
        <DialogBox
          text={
            <>
              Click the funnel, then select{" "}
              <strong>Funnel Mode</strong>.
            </>
          }
        />
      )}

      {lessonStep === 55 && (
        <DialogBox
          text={
            <>
              Click the volumetric flask, then select{" "}
              <strong>Right Hand</strong>.
            </>
          }
        />
      )}

      {lessonStep === 56 && (
        <DialogBox
          text={
            <>
              Press <strong>P</strong> to enter{" "}
              <strong>Pouring Mode</strong>.
            </>
          }
        />
      )}

      {lessonStep === 57 && (
        <DialogBox
          text={
            <>
              <strong>Scroll down</strong> to pour the sulfamic acid solution into the burette.
            </>
          }
        />
      )}

      {lessonStep === 58 && (
        <DialogBox
          text={
            <>
              Press <strong>P</strong> to exit{" "}
              <strong>Pouring Mode</strong>.
            </>
          }
        />
      )}

      {lessonStep === 59 && (
        <DialogBox
          text={
            <>
              Click the volumetric flask, then select{" "}
              <strong>Keep Back on Table</strong>.
            </>
          }
        />
      )}

      {lessonStep === 60 && (
        <DialogBox
          text={
            <>
              Click the burette, then select{" "}
              <strong>Exit Funnel Mode</strong>.
            </>
          }
        />
      )}

      {lessonStep === 61 && (
        <DialogBox
          text={
            <>
              Click the burette, then select{" "}
              <strong>Clamp Burette</strong>.
            </>
          }
        />
      )}


      




        {lessonStep === 62 && (
          <DialogBox
            text={
              <>
                Click the funnel, then select{" "}
                <strong>Keep Back on Table</strong>.
              </>
            }
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

      {lessonStep === 63 && (
        <DialogBox
          text={
            <>
              Click the NaOH reagent bottle, then select{" "}
              <strong>Right Hand</strong>.
            </>
          }
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

    {lessonStep === 66 && (
      <DialogBox
        text={
          <>
            Click the volumetric pipette, then select{" "}
            <strong>Left Hand</strong>.
          </>
        }
      />
    )}

    {lessonStep === 67 && (
      <DialogBox
        text={
          <>
            <strong>Scroll down</strong> to release the air from the pipette filler.
          </>
        }
      />
    )}

    {lessonStep === 68 && (
      <DialogBox
        text={
          <>
            Click the volumetric pipette, then select{" "}
            <strong>Pipette Mode</strong>.
          </>
        }
      />
    )}

    {lessonStep === 69 && (
      <DialogBox
        text={
          <>
            <strong>Scroll up</strong> to draw the NaOH solution into the pipette.
          </>
        }
      />
    )}

    {lessonStep === 70 && (
      <DialogBox
        text={
          <>
            Click the volumetric pipette, then select{" "}
            <strong>Exit Pipette Mode</strong>.
          </>
        }
      />
    )}

    {lessonStep === 71 && (
      <DialogBox
        text={
          <>
            Click the NaOH reagent bottle, then select{" "}
            <strong>Keep Back on Table</strong>.
          </>
        }
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

      {lessonStep === 72 && (
        <DialogBox
          text={
            <>
              Click the conical flask, then select{" "}
              <strong>Right Hand</strong>.
            </>
          }
        />
      )}

      {lessonStep === 73 && (
        <DialogBox
          text={
            <>
              Click the volumetric pipette, then select{" "}
              <strong>Pipette Mode</strong>.
            </>
          }
        />
)}

{lessonStep === 74 && (
  <DialogBox
    text={
      <>
        <strong>Scroll down</strong> to release the NaOH solution into the conical flask.
      </>
    }
  />
)}

{lessonStep === 75 && (
  <DialogBox
    text={
      <>
        Click the volumetric pipette, then select{" "}
        <strong>Exit Pipette Mode</strong>.
      </>
    }
  />
)}

{lessonStep === 76 && (
  <DialogBox
    text={
      <>
        Click the volumetric pipette, then select{" "}
        <strong>Keep Back on Table</strong>.
      </>
    }
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

      {lessonStep === 77 && (
        <DialogBox
          text={
            <>
              Click the methyl orange bottle, then select{" "}
              <strong>Left Hand</strong>.
            </>
          }
        />
      )}

      {lessonStep === 78 && (
        <DialogBox
          text={
            <>
              Click the dropper, then select{" "}
              <strong>Pour into Test Tube</strong>.
            </>
          }
        />
      )}

      {lessonStep === 79 && (
        <DialogBox
          text={
            <>
              <strong>Squeeze the bottle</strong> to add methyl orange.
            </>
          }
        />
      )}

      {lessonStep === 80 && (
        <DialogBox
          text={
            <>
              Click the dropper, then select{" "}
              <strong>Exit Pour Mode</strong>.
            </>
          }
        />
      )}

      {lessonStep === 81 && (
        <DialogBox
          text={
            <>
              Click the methyl orange bottle, then select{" "}
              <strong>Keep Back on Table</strong>.
            </>
          }
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



      {lessonStep === 82 && (
        <DialogBox
          text={
            <>
              Click the burette clamp, then select{" "}
              <strong>Place Clamp in Centre</strong>.
            </>
          }
        />
      )}

      {lessonStep === 83 && (
        <DialogBox
          text={
            <>
              Click the conical flask, then select{" "}
              <strong>Place Near Burette</strong>.
            </>
          }
        />
      )}

      {lessonStep === 84 && (
        <DialogBox
          text={
            <>
              <strong>Scroll down</strong> to add the sulfamic acid solution.
            </>
          }
        />
      )}

      {lessonStep===85 && (<TitreValueRecorded imageSrc={'./buretteTitre01.png'}/>)}

      {lessonStep === 85 && (
        <DialogBox
          text={
            <>
              Click the conical flask, then select{" "}
              <strong>Remove from Burette</strong>.
            </>
          }
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

    {lessonStep === 86 && (
      <DialogBox
        text={
          <>
            Click the burette clamp, then select{" "}
            <strong>Remove Clamp from Centre</strong>.
          </>
        }
      />
    )}

    {lessonStep === 87 && (
      <DialogBox
        text={
          <>
            Click the conical flask, then select{" "}
            <strong>Clean Conical Flask</strong>.
          </>
        }
      />
    )}

    {lessonStep === 88 && (
      <DialogBox
        text={
          <>
            Click the conical flask, then select{" "}
            <strong>Keep Back on Table</strong>.
          </>
        }
      />
    )}

    {lessonStep === 89 && (
      <DialogBox
        text={
          <>
            Click the NaOH reagent bottle, then select{" "}
            <strong>Right Hand</strong>.
          </>
        }
      />
    )}

    {lessonStep === 90 && (
      <DialogBox
        text={
          <>
            Click the volumetric pipette, then select{" "}
            <strong>Left Hand</strong>.
          </>
        }
      />
    )}

    {lessonStep === 91 && (
      <DialogBox
        text={
          <>
            <strong>Scroll down</strong> to release the air from the pipette filler.
          </>
        }
      />
    )}

    {lessonStep === 92 && (
      <DialogBox
        text={
          <>
            Click the volumetric pipette, then select{" "}
            <strong>Pipette Mode</strong>.
          </>
        }
      />
    )}

    {lessonStep === 93 && (
      <DialogBox
        text={
          <>
            <strong>Scroll up</strong> to draw the NaOH solution into the pipette.
          </>
        }
      />
    )}

    {lessonStep === 94 && (
      <DialogBox
        text={
          <>
            Click the volumetric pipette, then select{" "}
            <strong>Exit Pipette Mode</strong>.
          </>
        }
      />
    )}

    {lessonStep === 95 && (
      <DialogBox
        text={
          <>
            Click the NaOH reagent bottle, then select{" "}
            <strong>Keep Back on Table</strong>.
          </>
        }
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


      {lessonStep === 96 && (
        <DialogBox
          text={
            <>
              Click the conical flask, then select{" "}
              <strong>Right Hand</strong>.
            </>
          }
        />
      )}

      {lessonStep === 97 && (
        <DialogBox
          text={
            <>
              Click the volumetric pipette, then select{" "}
              <strong>Pipette Mode</strong>.
            </>
          }
        />
      )}

      {lessonStep === 98 && (
        <DialogBox
          text={
            <>
              <strong>Scroll down</strong> to release the NaOH solution into the conical flask.
            </>
          }
        />
      )}


      {lessonStep===99 && (<TitreValueRecorded titreValue ={24.7} imageSrc={'./buretteTitre02.png'}/>)}

      {lessonStep === 99 && (
        <DialogBox
          text={
            <>
              Click the volumetric pipette, then select{" "}
              <strong>Exit Pipette Mode</strong>.
            </>
          }
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

      {lessonStep === 100 && (
        <DialogBox
          text={
            <>
              Click the volumetric pipette, then select{" "}
              <strong>Keep Back on Table</strong>.
            </>
          }
        />
      )}

      {lessonStep === 101 && (
        <DialogBox
          text={
            <>
              Click the burette clamp, then select{" "}
              <strong>Place Clamp in Centre</strong>.
            </>
          }
        />
      )}

      {lessonStep === 102 && (
        <DialogBox
          text={
            <>
              Click the conical flask, then select{" "}
              <strong>Place Near Burette</strong>.
            </>
          }
        />
      )}

      {lessonStep === 103 && (
        <DialogBox
          text={
            <>
              <strong>Scroll down</strong> to add the sulfamic acid solution.
            </>
          }
        />
      )}


      {lessonStep === 104 && (
        <SulfamicAcidResult/>
      )}

      {lessonStep === 104 && (
        <DialogBox
          text={
            <>
              Titration complete — <strong>lesson finished!</strong>
            </>
          }
           button1Text="Questions"

                  button2Text="End Lesson"

                  onbtnClick={() => {
                    setShowQuestionCardNo(12.1)
                  }}

                  onbtn2Click={() => {
                    resetLesson()
                  }}
        />
      )}

      {showQuestionCardNo === 12.1 && (
  <QuestionCard
    questionSetTitle="Question Set — Sulfamic Acid Standard Solution"

    questionNumber={1}

    question="Why is the empty test tube weighed before adding sulfamic acid?"

    answers={[
      {
        id: "A",
        text: "To determine the mass of sulfamic acid by difference",
      },
      {
        id: "B",
        text: "To measure the volume of sulfamic acid",
      },
      {
        id: "C",
        text: "To find the concentration of sodium hydroxide",
      },
      {
        id: "D",
        text: "To calibrate the balance",
      },
    ]}

    correctAnswer="A"

    hintText="Think about why the test tube is weighed both before and after the sulfamic acid is added."

    correctMessage="Correct! The empty test tube mass allows the mass of sulfamic acid to be determined by difference."

    incorrectMessage="Incorrect. The empty test tube is weighed so the mass of sulfamic acid can be determined by difference."

    submitButtonText="Submit Answer"

    continueButtonText="Continue"

    onContinue={() => {
      setShowQuestionCardNo(12.2)
    }}
  />
)}
{showQuestionCardNo === 12.2 && (
  <QuestionCard
    questionSetTitle="Question Set — Sulfamic Acid Standard Solution"

    questionNumber={2}

    question="Approximately how much sulfamic acid should be added to the test tube?"

    answers={[
      {
        id: "A",
        text: "0.5 g",
      },
      {
        id: "B",
        text: "1.0 g",
      },
      {
        id: "C",
        text: "2.5 g",
      },
      {
        id: "D",
        text: "5.0 g",
      },
    ]}

    correctAnswer="C"

    hintText="Think about the target mass of sulfamic acid used to prepare the standard solution."

    correctMessage="Correct! Approximately 2.5 g of sulfamic acid should be added to the test tube."

    incorrectMessage="Incorrect. Approximately 2.5 g of sulfamic acid should be added to the test tube."

    submitButtonText="Submit Answer"

    continueButtonText="Continue"

    onContinue={() => {
      setShowQuestionCardNo(12.3)
    }}
  />
)}

{showQuestionCardNo === 12.3 && (
  <QuestionCard
    questionSetTitle="Question Set — Sulfamic Acid Standard Solution"

    questionNumber={3}

    question="Why are the washings from the beaker transferred into the volumetric flask?"

    answers={[
      {
        id: "A",
        text: "To cool the solution",
      },
      {
        id: "B",
        text: "To ensure all the sulfamic acid is transferred",
      },
      {
        id: "C",
        text: "To change the indicator colour",
      },
      {
        id: "D",
        text: "To increase the reaction rate",
      },
    ]}

    correctAnswer="B"

    hintText="Think about why the beaker is rinsed after transferring the sulfamic acid solution."

    correctMessage="Correct! The washings are transferred to ensure all the sulfamic acid is transferred into the volumetric flask."

    incorrectMessage="Incorrect. The washings are transferred so that all the sulfamic acid is transferred into the volumetric flask."

    submitButtonText="Submit Answer"

    continueButtonText="Continue"

    onContinue={() => {
      setShowQuestionCardNo(12.4)
    }}
  />
)}
      {[12, 12.1, 12.2].includes(selectedLesson) && (
        <SulfamicTitrationLiveDataPanel
          emptyTestTubeMass={lessonStep >=6 ? 21.72 : null}
          testTubeWithSulfamicMass={lessonStep >= 13 ? 24.22 : null}
          sulfamicAcidMass={lessonStep >= 13 ? 2.50 : null}
          beakerWaterAmount={lessonStep >= 18 && lessonStep < 42 ? 100 : null}
          volumetricFlaskAmount={lessonStep >= 44 ? 250 : lessonStep >= 41 ? 190 : lessonStep >= 35 ? 160 : lessonStep >= 28 ? 130 : lessonStep >= 20 ? 100 : null}
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

export default SulfamicAcidNaOHTitration03