import {
  useContext,
  useEffect,
} from "react"

import {
  InteractionContext,
} from "../../Contexts/InteractionContext/InteractionContext"

import {
  MainGuidelineContext,
} from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

import EnthalpyLessonOverview from "../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview"
import DialogBox from "../AllDialogBox/DialogBox/DialogBox"
import HessLiveDataPanel from "../HessLiveDataPanel/HessLiveDataPanel"
import HessGuidelines from "../HessGuidelines/HessGuidelines"
import HessStartingTemperature from "../HessStartingTemperature/HessStartingTemperature"

import {
  enthalpyReactionData,
} from "../Data/enthalpyReactionData/enthalpyReactionData"

import QuestionCard from "../QuestionCard/QuestionCard"

import {
  useResetLesson,
} from "../../UI/ResetLessonButton/ResetLessonButton.jsx"

import {
  ModelContext,
} from "../../Contexts/ModelContext/ModelContext.jsx"
import HessReactionOneResults from "../HessReactionOneResults/HessReactionOneResults.jsx"


const EnthalpyHessReaction02 = () => {
  const {
    isFillBeakerBoxOpen,

    hessGuidelineNumber,
    setHessGuidelineNumber,

    showEnthalyResultTwo,
    setShowEnthalyResultTwo,

    setIsPotassiumTransferred,

    selectedRightHand,
    selectedLeftHand,

    setSelectedRightHand,
    setSelectedLeftHand,

    setIsWeighTestube,

    setIsPotassiumHydrogenCarbonateInSpoon,

    setIsBuiretteClamped,

    setIsPottasiumCarobnateInTestube01,

    setIsPottasiumCarobnateInSpoon,

    setIsBalancePlaced,

    setIsClampInCenter,

    setShowQuestionCardNo,
    showQuestionCardNo,
  } = useContext(
    InteractionContext
  )


  const {
    buretteOriginalStateRef,
    mainBuiretteRef,
  } = useContext(
    ModelContext
  )


  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
    setShowNormalBeakerArrow,
  } = useContext(
    MainGuidelineContext
  )


  // =====================================================
  // CLEAR OLD REACTION STATES
  // =====================================================

  useEffect(() => {
    setSelectedRightHand(null)

    setSelectedLeftHand(null)

    setIsPotassiumHydrogenCarbonateInSpoon(
      false
    )

    setIsWeighTestube(
      false
    )

    setIsPotassiumTransferred(
      false
    )

    setIsPottasiumCarobnateInTestube01(
      false
    )

    setIsPottasiumCarobnateInSpoon(
      false
    )

    setIsBalancePlaced(
      false
    )

    setIsBuiretteClamped(
      false
    )

    setIsClampInCenter(
      false
    )
  }, [])


  // =====================================================
  // RESTORE BURETTE AFTER HANDS ARE CLEARED
  // =====================================================

  useEffect(() => {
    if (
      selectedLeftHand ||
      selectedRightHand
    ) {
      return
    }

    const burette =
      mainBuiretteRef.current

    const original =
      buretteOriginalStateRef.current

    if (
      !burette ||
      !original
    ) {
      return
    }

    const frameId =
      requestAnimationFrame(
        () => {
          // ==========================================
          // RESTORE ORIGINAL PARENT
          // ==========================================

          if (
            original.parent &&
            burette.parent !==
              original.parent
          ) {
            original.parent.add(
              burette
            )
          }


          // ==========================================
          // RESTORE ORIGINAL POSITION
          // ==========================================

          burette.position.copy(
            original.position
          )


          // ==========================================
          // RESTORE ORIGINAL ROTATION
          // ==========================================

          burette.quaternion.copy(
            original.quaternion
          )


          // ==========================================
          // RESTORE ORIGINAL SCALE
          // ==========================================

          burette.scale.copy(
            original.scale
          )


          burette.updateMatrix()

          burette.updateMatrixWorld(
            true
          )


          console.log(
            "Burette restored to original position:",
            burette.position
          )
        }
      )


    return () => {
      cancelAnimationFrame(
        frameId
      )
    }
  }, [
    selectedLeftHand,
    selectedRightHand,
  ])


  // =====================================================
  // GUIDELINE DATA
  // =====================================================

  const resetLesson =
    useResetLesson()


  const guidelineData = [
    {
      id: 1,

      title:
        "Prepare the Polystyrene Cup",

      description:
        "Place the polystyrene cup inside the normal beaker. The beaker supports the lightweight cup and helps keep it stable while the temperature change is measured.",

      implementationSteps: [
        "Pick up the normal beaker.",
        "Pick up the polystyrene cup with the other hand.",
        "Place the polystyrene cup inside the normal beaker.",
        "Make sure the cup is positioned upright in the centre.",
        "Keep the top of the polystyrene cup open for adding the reactants.",
      ],

      image:
        "./polystyreneCupInBeaker.png",

      onButtonContinue: () => {
        setHessGuidelineNumber(
          false
        )
      },
    },

    {
      id: 2,

      title:
        "Prepare the Potassium Hydrogencarbonate",

      description:
        "Transfer potassium hydrogencarbonate into a test tube so that its mass can be measured before it is added to the hydrochloric acid. The potassium hydrogencarbonate will react with the acid and produce the temperature change required for the Hess’s Law calculation.",

      implementationSteps: [
        "Pick up an empty test tube.",
        "Pick up the spatula with the other hand.",
        "Use the spatula to collect potassium hydrogencarbonate.",
        "Carefully transfer the potassium hydrogencarbonate from the spatula into the test tube.",
      ],

      image:
        "./TestubePottasiumAdd.png",

      onButtonContinue: () => {
        setHessGuidelineNumber(
          false
        )
      },
    },

    {
      id: 3,

      title:
        "Weigh Test Tube and Potassium Hydrogencarbonate",

      description:
        "Measure and record the combined mass of the test tube and potassium hydrogencarbonate. This measurement will later be used to determine the exact mass of potassium hydrogencarbonate added to the hydrochloric acid.",

      implementationSteps: [
        "Place the digital balance in the centre of the workspace.",
        "Place the test tube on the centre of the balance.",
        "Wait until the balance reading becomes stable.",
        "Record the combined mass of the test tube and potassium hydrogencarbonate.",
        "Return the test tube to the table after recording the mass.",
      ],

      image:
        "./weighTestube.png",

      onButtonContinue: () => {
        setHessGuidelineNumber(
          false
        )
      },
    },

    {
      id: 4,

      title:
        "Add HCl Acid to the Polystyrene Cup",

      description:
        "Fill the burette with hydrochloric acid, secure it vertically in the clamp, and position the normal beaker containing the polystyrene cup beneath the burette. Deliver 30 cm³ of hydrochloric acid into the polystyrene cup.",

      implementationSteps: [
        "Add 30 cm³ hydrochloric acid to the burette and clamp it.",
        "Position the normal beaker containing the polystyrene cup beneath the burette.",
        "Open the burette tap gradually.",
        "Close the burette tap when the HCl acid has been delivered into the cup.",
      ],

      image:
        "./BuretteHCLPour.png",

      onButtonContinue: () => {
        setHessGuidelineNumber(
          false
        )
      },
    },

    {
      id: 5,

      title:
        "Measure the Starting Temperature",

      description:
        "Place the thermometer in the hydrochloric acid and allow the reading to become stable before adding the potassium hydrogencarbonate. This gives the initial temperature for the reaction.",

      implementationSteps: [
        "Place the thermometer through the opening in the cover.",
        "Make sure the thermometer bulb is immersed in the hydrochloric acid.",
        "Do not allow the thermometer to touch the bottom or sides of the cup.",
        "Wait until the temperature reading becomes stable.",
        "Record the starting temperature of the hydrochloric acid.",
      ],

      image:
        "./beakerWithThermometer.png",

      onButtonContinue: () => {
        setHessGuidelineNumber(
          false
        )
      },
    },

    {
      id: 6,

      title:
        "Add Potassium Hydrogencarbonate and Measure the Temperature Change",

      description:
        "Add the potassium hydrogencarbonate to the hydrochloric acid while stirring continuously. Observe the thermometer as the temperature falls and record the lowest stable temperature reached during the reaction.",

      implementationSteps: [
        "Add the potassium hydrogencarbonate gradually to the HCL acid.",
        "Stir the mixture continuously while adding the potassium hydrogencarbonate.",
        "Observe the thermometer as the temperature decreases.",
        "Wait until the temperature reaches its lowest stable value.",
        "Record the lowest temperature reached.",
      ],

      image:
        "./addPotassiumHydrogencarbonateAndStir.png",

      onButtonContinue: () => {
        setHessGuidelineNumber(
          false
        )
      },
    },

    {
      id: 7,

      title:
        "Reweigh the Empty Test Tube",

      description:
        "Reweigh the test tube after transferring the potassium hydrogencarbonate. The difference between the initial and final test tube masses gives the actual mass of potassium hydrogencarbonate used in the reaction.",

      implementationSteps: [
        "Place the digital balance back in the centre of the workspace.",
        "Place the emptied test tube on the balance.",
        "Wait until the balance reading becomes stable.",
        "Record the mass of the test tube after emptying.",
        "Use the two mass readings to determine the mass of potassium hydrogencarbonate transferred.",
      ],

      image:
        "./weighEmptyTestube.png",

      onButtonContinue: () => {
        setHessGuidelineNumber(
          false
        )
      },
    },
  ]


  // =====================================================
  // START REACTION 2
  // =====================================================

  useEffect(() => {
    setLessonStep(
      1
    )
  }, [])


  return (
    <>

      {/* =====================================================
          LESSON OVERVIEW
      ===================================================== */}

      {lessonStep === 1 && (
        <EnthalpyLessonOverview
          reactionData={
            enthalpyReactionData[1]
          }
          onStartLesson={() => {
            setLessonStep(
              2
            )
          }}
        />
      )}


      {/* =====================================================
          HESS LIVE DATA PANEL
      ===================================================== */}

      <HessLiveDataPanel
        reactionNumber={2}

        volumeOfSolution={
          lessonStep >= 25
            ? 30
            : null
        }

        solutionDensity={
          lessonStep >= 25
            ? 1
            : null
        }

        startingTemperature={
          lessonStep >= 30
            ? 22.0
            : null
        }

        currentTemperature={
          lessonStep >= 33
            ? 18.5
            : lessonStep >= 30
              ? 22.0
              : null
        }

        highestTemperature={
          lessonStep >= 33
            ? 18.5
            : null
        }

        massWithPowder={
          lessonStep >= 14
            ? 24.7
            : null
        }

        massAfterEmptying={
          lessonStep >= 35.5
            ? 21.72
            : null
        }

        selectedLesson={
          selectedLesson
        }

        lessonStep={
          lessonStep
        }

        autoDelay={3000}

        autoShowConditions={[
          {
            selectedLesson:
              selectedLesson,

            lessonStep: 14,
          },

          {
            selectedLesson:
              selectedLesson,

            lessonStep: 25,
          },

          {
            selectedLesson:
              selectedLesson,

            lessonStep: 30,
          },

          {
            selectedLesson:
              selectedLesson,

            lessonStep: 33,
          },

          {
            selectedLesson:
              selectedLesson,

            lessonStep: 35.5,
          },
        ]}
      />


      {/* =====================================================
          HESS GUIDELINES
      ===================================================== */}

      {lessonStep >= 2 &&
        lessonStep <= 5 && (
          <HessGuidelines
            guidelineData={
              guidelineData[0]
            }
          />
        )}


      {lessonStep >= 6 &&
        lessonStep <= 11 && (
          <HessGuidelines
            guidelineData={
              guidelineData[1]
            }
          />
        )}


      {lessonStep >= 12 &&
        lessonStep <= 15 && (
          <HessGuidelines
            guidelineData={
              guidelineData[2]
            }
          />
        )}


      {lessonStep >= 16 &&
        lessonStep <= 25 && (
          <HessGuidelines
            guidelineData={
              guidelineData[3]
            }
          />
        )}


      {lessonStep >= 26 &&
        lessonStep <= 29 && (
          <HessGuidelines
            guidelineData={
              guidelineData[4]
            }
          />
        )}


      {lessonStep >= 30 &&
        lessonStep <= 33 && (
          <HessGuidelines
            guidelineData={
              guidelineData[5]
            }
          />
        )}


      {lessonStep >= 34 &&
        lessonStep <= 36 && (
          <HessGuidelines
            guidelineData={
              guidelineData[6]
            }
          />
        )}


      {/* =====================================================
          LESSON STEPS
      ===================================================== */}

      {lessonStep === 2 && (
        <DialogBox
          text={
            "Click Beaker and Select Left Hand Option"
          }
        />
      )}


      {lessonStep === 3 && (
        <DialogBox
          text={
            "Click Polysterene Cup and Select Right Hand Option"
          }
        />
      )}


      {lessonStep === 4 && (
        <DialogBox
          text={
            "Click Polysterene Cup and Select Place In Beaker"
          }
        />
      )}


      {lessonStep === 5 && (
        <DialogBox
          text={
            "Keep Beaker In Table"
          }
        />
      )}


      {lessonStep === 6 && (
        <DialogBox
          text={
            "Select Testube and select Left Hand"
          }
        />
      )}


      {lessonStep === 7 && (
        <DialogBox
          text={
            "Select Spatula and select Right Hand Option"
          }
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
          text={
            "Click the Test tube and select Pour Into Testube"
          }
        />
      )}


      {lessonStep === 10 && (
        <DialogBox
          text={
            "Scroll Down to Pour"
          }
        />
      )}


      {lessonStep === 11 && (
        <DialogBox
          text={
            "Click the Spatula And Disable Pour Mode"
          }
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
          text={
            "Click the burette and select Add Liquid."
          }
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
        <>
          <HessStartingTemperature />

          <DialogBox
            text={
              "Click the Thermometer again and select Place Thermometer."
            }
          />
        </>
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
          text={
            "Press P to enter Pouring Mode."
          }
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
          text={
            "Press P again to exit Pouring Mode."
          }
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


      {lessonStep === 35.5 && (
        <DialogBox
          text={
            "Click the normal beaker and select Remove Thermometer."
          }
        />
      )}


      {lessonStep === 36 && (
        <DialogBox
          text={
            "Reaction 2 is complete. Review the recorded temperature and mass values."
          }

          button2Text="End Lesson"

          onbtnClick={() => {
            setShowEnthalyResultTwo(
              true
            )
          }}

          onbtn2Click={() => {
            resetLesson()
          }}

          
        />
      )}
        {
          showEnthalyResultTwo && <HessReactionOneResults  onQuestions={() => {
           setShowQuestionCardNo(9.1);setShowEnthalyResultTwo(false)
          }}/>
        }

      {/* =====================================================
          QUESTIONS
      ===================================================== */}

      {showQuestionCardNo === 9.1 && (
        <QuestionCard
          questionSetTitle="Question Set 1 — After Reaction 1: Potassium carbonate"

          questionNumber={1}

          question="What happened to the temperature when potassium carbonate was added to hydrochloric acid?"

          answers={[
            {
              id: "A",
              text: "Increased",
            },
            {
              id: "B",
              text: "Decreased",
            },
            {
              id: "C",
              text: "Stayed constant",
            },
            {
              id: "D",
              text: "Increased then immediately became 0°C",
            },
          ]}

          correctAnswer="A"

          hintText="Choose the most appropriate answer."

          correctMessage="Correct! The temperature increased."

          incorrectMessage="Incorrect. The temperature increased during Reaction 1."

          submitButtonText="Submit Answer"

          continueButtonText="Continue"

          onContinue={() => {
            setShowQuestionCardNo(
              9.2
            )
          }}
        />
      )}


      {showQuestionCardNo === 9.2 && (
        <QuestionCard
          questionSetTitle="Question Set 2 — After Reaction 2: Potassium hydrogencarbonate"

          questionNumber={5}

          question="The temperature decreases during Reaction 2. What does this mean?"

          answers={[
            {
              id: "A",
              text: "Heat is released",
            },
            {
              id: "B",
              text: "Heat is absorbed",
            },
            {
              id: "C",
              text: "No energy is transferred",
            },
            {
              id: "D",
              text: "The thermometer is incorrect",
            },
          ]}

          correctAnswer="B"

          hintText="Think about what a decrease in temperature means."

          correctMessage="Correct! Heat is absorbed during Reaction 2."

          incorrectMessage="Incorrect. A decrease in temperature means heat is absorbed from the surroundings."

          submitButtonText="Submit Answer"

          continueButtonText="Continue"

          onContinue={() => {
            setShowQuestionCardNo(
              9.3
            )
          }}
        />
      )}


      {showQuestionCardNo === 9.3 && (
        <QuestionCard
          questionSetTitle="Question Set 2 — After Reaction 2: Potassium hydrogencarbonate"

          questionNumber={6}

          question="What volume of hydrochloric acid is used for each reaction?"

          answers={[
            {
              id: "A",
              text: "10 cm³",
            },
            {
              id: "B",
              text: "20 cm³",
            },
            {
              id: "C",
              text: "25 cm³",
            },
            {
              id: "D",
              text: "30 cm³",
            },
          ]}

          correctAnswer="D"

          hintText="Recall the volume of hydrochloric acid measured into the polystyrene cup."

          correctMessage="Correct! 30 cm³ of hydrochloric acid is used for each reaction."

          incorrectMessage="Incorrect. The correct volume is 30 cm³."

          submitButtonText="Submit Answer"

          continueButtonText="Continue"

          onContinue={() => {
            setShowQuestionCardNo(
              null
            )
          }}
        />
      )}

    </>
  )
}

export default EnthalpyHessReaction02