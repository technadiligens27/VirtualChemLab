import { useContext, useEffect } from "react"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import LessonGuide from "../../LessonGuide/LessonGuide";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import LessonDetails from "../../LessonDetails/LessonDetails";
import EnthalpyLessonOverview from "../../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview";
import { molarVolumeReactionData,molarVolumeGuidelineData} from "../../Data/molarVolumeReactionData/molarVolumeReactionData";
import SafetyScreen from "../../SafetyScreen/SafetyScreen";
import { safetyInstructionData } from "../../Data/SafetyInstruction/SafetyInstruction";
import HessGuidelines from "../../HessGuidelines/HessGuidelines";
import SulfamicGuidelines from "../../SulfamicGuidelines/SulfamicGuidelines";
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext";
import MolarVolumeLiveDataPanel from "../../../Experience/Interactions/MolarVolumeLiveDataPanel/MolarVolumeLiveDataPanel";
import MolarVolumeReduced from "../../../Experience/Interactions/MolarVolumeReduced/MolarVolumeReduced";
import MolarVolumeCalciumCarbonateUsed from "../../../Experience/Interactions/MolarVolumeCalciumCarbonateUsed/MolarVolumeCalciumCarbonateUsed";
import MolarVolumeResults from "../../MolarVolumeResults/MolarVolumeResults";
import QuestionCard from "../../QuestionCard/QuestionCard";
import {useResetLesson} from "../../ResetLessonButton/ResetLessonButton.jsx"


const MolarVolumeLesson = ()=>{

    const {isFillBeakerBoxOpen,setShowQuestionCardNo,showQuestionCardNo} = useContext(InteractionContext)
    const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);
    const {graduatedBeakerRef} = useContext(ModelContext)

    const resetLesson = useResetLesson()

 return(
       <>
       {
         lessonStep===1 && <EnthalpyLessonOverview
          reactionData={molarVolumeReactionData[0]}
          onStartLesson={() => {
            setLessonStep(2)
          }}
        />
        }

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

      {lessonStep>=3 && lessonStep<4 && (<SulfamicGuidelines guidelineData={molarVolumeGuidelineData[0]}/>)}

      {lessonStep===3 && (<DialogBox text={<>
          Pick Up <strong>Boiling Tube</strong> to <strong>Left Hand</strong>
        
        </>}/>
      )}
      {lessonStep===3.1 && (<DialogBox text={<>
         Click The <strong>Measuring Cylinder</strong> and Select <strong>Right Hand</strong>
        
        </>}/>
      )}

      {lessonStep===3.2 && (<DialogBox text={<>
         Click The <strong>Held Measuring Cylinder</strong> and Select <strong>Add Liquid</strong>
        
        </>}/>
      )}

      {lessonStep===3.3 && (<DialogBox text={<>
         
        </>}/>
      )}   

      {lessonStep===3.4 && (<DialogBox text={<>
         Press <strong>P to enter Pouring Mode </strong>
        </>}/>
      )}      
      {lessonStep===3.5 && (<DialogBox text={<>
        <strong>Scroll Down</strong> to Pour from Measuring Cylinder
        </>}/>
      )}    
      {lessonStep===3.6 && (<DialogBox text={<>
         Press <strong> P to exit Pouring Mode </strong>
        </>}/>
      )}

      {lessonStep===3.7 && (<DialogBox text={<>
          Keep <strong>Measuring Cylinder</strong> Back In Table
        </>}/>
      )}  





      {lessonStep>=4 && lessonStep<15 && (<SulfamicGuidelines guidelineData={molarVolumeGuidelineData[1]}/>)}








      {lessonStep===4 && (<DialogBox text={<>
          Click Held <strong>Boiling Tube</strong> and select <strong>Clamp</strong>
        
        </>}/>)}      
        
      {lessonStep===5 && (<DialogBox text={<>
          Pick Up <strong>Beaker</strong> to <strong>Right Hand</strong>
        
        </>}/>
      )}

      {lessonStep===6 && (<DialogBox text={<>
         Click The <strong>Held Beaker</strong> and Select <strong>Add Liquid</strong>
        
        </>}/>
      )}

      {lessonStep===7 && (<DialogBox text={<>
         Fill With <strong>Water (100 cm³)</strong> 
        
        </>}/>
      )}

      {lessonStep===8 && (<DialogBox text={<>
         Pick Up <strong>Measuring Cylinder</strong> to <strong>Left Hand</strong>         
        </>}/>
      )}

      {lessonStep===9 && (<DialogBox text={<>
         Click The <strong>Measuring Cylinder</strong> and Select <strong>Add Liquid</strong>        
        </>}/>
      )}


      {lessonStep===10 && (<DialogBox text={<>
         Fill With <strong>Water (100 cm³)</strong> 
        </>}/>
      )}    

      {lessonStep===11 && (<DialogBox text={<>
         Click The <strong>Measuring Cylinder</strong> and Select <strong>Invert Into Water Bath</strong>        
        </>}/>
      )}                     
      {lessonStep===12 && (<DialogBox text={<>
         Click The <strong>Beaker </strong> and Select <strong>Place In Center</strong>        
        </>}/>
      )}  

      {lessonStep===13 && (<DialogBox text={<>
        Click The <strong>Clamp </strong> and Select <strong>Place In Center</strong>     
        </>}/>
      )}

      {lessonStep===14 && (<DialogBox text={<>
        Now Click <strong>Clamp</strong> and Select <strong>Connect Delivery Tube</strong>    
        </>}/>
      )}  








      {lessonStep >= 15 && lessonStep < 23 && (<SulfamicGuidelines guidelineData={molarVolumeGuidelineData[2]}/>)}









      {lessonStep===15 && (<DialogBox text={<>
          Pick Up <strong>Test Tube</strong> to <strong>Left Hand</strong>
        </>}/>
      )} 



      {lessonStep===16 && (<DialogBox text={<>
         Now Pick Up <strong>Spatula</strong> to <strong>Right Hand</strong>
        </>}/>
      )} 

      {lessonStep===17 && (<DialogBox text={<>
         Select <strong>Calcium Carbonate </strong>Container and take <strong>Calcium Carbonate</strong>
        </>}/>
      )}

      {lessonStep===18 && (<DialogBox text={<>
         Now Click Held <strong>Spatula</strong> and select <strong>Pour Into Testube</strong>
        </>}/>
      )}

      {lessonStep===19 && (<DialogBox text={
        <>
        <strong>Scroll Down</strong> to Pour <strong>Calcium Carbonate</strong> to Test Tube
        </>}/>
      )}

      {lessonStep===20 && (<DialogBox text={
        <>
         Now Click Held <strong>Spatula</strong> and select <strong>Disable Pour Mode</strong>
        </>}/>
      )}   

      {lessonStep===21 && (<DialogBox text={
        <>
         Keep Spatula <strong>Back on the table</strong>
        </>}/>
      )}

      {lessonStep===22 && (<DialogBox text={
        <>
        Select <strong>Digital Balance</strong>  and Select <strong>Place Balance</strong> to get the Balance to the Center
        </>}/>
      )}






      {lessonStep >= 23 && lessonStep < 25 && (<SulfamicGuidelines guidelineData={molarVolumeGuidelineData[3]}/>)}






      {lessonStep===23 && (<DialogBox text={
        <>
         Now Select <strong>Held Test Tube</strong> and Select <strong>Weigh Test Tube</strong> 
        </>}/>
      )}  
      
      {lessonStep===24 && (<DialogBox text={
        <>
        Click <strong>Weighed Test Tube</strong> and Select <strong>Remove Test Tube</strong>
        </>}/>
      )}







      {lessonStep >= 25 && lessonStep < 32 && (<SulfamicGuidelines guidelineData={molarVolumeGuidelineData[4]}/>)}








      {lessonStep===25 && (<DialogBox text={
        <>
        Select the <strong>Clamp</strong> and Click <strong>Disconnect Delivery Tube</strong>
        </>}/>
      )}            
      {lessonStep===26 && (<DialogBox text={
        <>
        Select held <strong>Test Tube</strong> Containing Calcium Carbonate and click <strong>Pour Mode</strong>
        </>}/>
      )}

      {lessonStep===27 && (<DialogBox text={
        <>
        <strong>Scroll Down</strong> to <strong>Pour Calcium Carbonate</strong> to Boiling Tube   
        </>}/>
      )}
      {lessonStep===28 && (<DialogBox text={
        <>
        Observe the Reaction   
        </>}/>
      )}

      {lessonStep==29 && <MolarVolumeReduced/>}

      {lessonStep===29 && (<DialogBox text={
        <>
        Click the Testube We poured From and Select <strong>Disable Pour Mode</strong>
        </>}/>
      )}

      {lessonStep===30 && (<DialogBox text={
        <>
         Now Select <strong>Held Test Tube</strong> and Select <strong>Weigh Test Tube</strong> 
        </>}/>
      )}
      {lessonStep===31 && (<DialogBox text={
        <>
        Select <strong>Weighed Testube</strong> and select <strong>Remove Testube</strong>
        </>}/>
      )}

      {lessonStep===32 && <MolarVolumeCalciumCarbonateUsed onButtonContinue={()=>setLessonStep(33)}/>}


      {lessonStep===33 && <MolarVolumeResults/>}

      {lessonStep==33 && <DialogBox
      text={"Core Practical One Finished!"}
          button1Text = "Questions"
          button2Text="End Lesson"
          onbtnClick=
          {() => {
             setShowQuestionCardNo(13.1)
          }}

          onbtn2Click={resetLesson}
      />}

      {
      showQuestionCardNo ==13.1 && (<QuestionCard
      questionSetTitle="Question Set — Molar Volume of a Gas"

      questionNumber={1}

      question="Why is the carbon dioxide collected in an inverted measuring cylinder?"

      answers={[
        {
          id: "A",
          text: "To measure the volume of gas produced",
        },
        {
          id: "B",
          text: "To increase the reaction temperature",
        },
        {
          id: "C",
          text: "To dissolve the calcium carbonate",
        },
        {
          id: "D",
          text: "To measure the mass of the gas",
        },
      ]}

      correctAnswer="A"

      hintText="Think about how the collected carbon dioxide can be measured."

      correctMessage="Correct! The inverted measuring cylinder allows the volume of carbon dioxide produced to be measured."

      incorrectMessage="Incorrect. The carbon dioxide is collected in an inverted measuring cylinder so its volume can be measured."

      submitButtonText="Submit Answer"

      continueButtonText="Continue"

      onContinue={() => {
        setShowQuestionCardNo(13.2)
      }}
    />
    )      
      }

      {
        showQuestionCardNo ===13.2 && (<QuestionCard
  questionSetTitle="Question Set — Molar Volume of a Gas"

  questionNumber={2}

  question="Why is the bung replaced quickly after adding the calcium carbonate?"

  answers={[
    {
      id: "A",
      text: "To prevent carbon dioxide from escaping",
    },
    {
      id: "B",
      text: "To stop the reaction",
    },
    {
      id: "C",
      text: "To cool the boiling tube",
    },
    {
      id: "D",
      text: "To increase the mass of calcium carbonate",
    },
  ]}

  correctAnswer="A"

  hintText="Think about what could happen to the gas before the apparatus is sealed."

  correctMessage="Correct! Replacing the bung quickly prevents carbon dioxide from escaping."

  incorrectMessage="Incorrect. The bung is replaced quickly to prevent carbon dioxide from escaping before it can be collected."

  submitButtonText="Submit Answer"

  continueButtonText="Continue"

  onContinue={() => {
    setShowQuestionCardNo(13.3)
  }}
/>)
      }


{
  showQuestionCardNo === 13.3 && (
    <QuestionCard
      questionSetTitle="Question Set — Molar Volume of a Gas"

      questionNumber={3}

      question="Why is the test tube containing calcium carbonate weighed before and after the reaction?"

      answers={[
        {
          id: "A",
          text: "To determine the mass of calcium carbonate used by difference",
        },
        {
          id: "B",
          text: "To measure the volume of ethanoic acid",
        },
        {
          id: "C",
          text: "To find the concentration of ethanoic acid",
        },
        {
          id: "D",
          text: "To measure the volume of carbon dioxide",
        },
      ]}

      correctAnswer="A"

      hintText="Think about the difference between the test-tube masses before and after transferring the calcium carbonate."

      correctMessage="Correct! The difference between the two masses gives the mass of calcium carbonate used."

      incorrectMessage="Incorrect. The test tube is weighed before and after the transfer to determine the mass of calcium carbonate used by difference."

      submitButtonText="Submit Answer"

      continueButtonText="Continue"

      onContinue={() => {
        setShowQuestionCardNo(13.4)
      }}
    />
  )
}


{
  showQuestionCardNo === 13.4 && (
    <QuestionCard
      questionSetTitle="Question Set — Molar Volume of a Gas"

      questionNumber={4}

      question="What happens to the volume of carbon dioxide collected as more calcium carbonate is used?"

      answers={[
        {
          id: "A",
          text: "It generally increases",
        },
        {
          id: "B",
          text: "It always decreases",
        },
        {
          id: "C",
          text: "It remains zero",
        },
        {
          id: "D",
          text: "It becomes negative",
        },
      ]}

      correctAnswer="A"

      hintText="Think about how using more calcium carbonate affects the amount of carbon dioxide produced."

      correctMessage="Correct! Using more calcium carbonate generally produces a greater volume of carbon dioxide."

      incorrectMessage="Incorrect. As more calcium carbonate is used, the volume of carbon dioxide collected generally increases."

      submitButtonText="Submit Answer"

      continueButtonText="Continue"

      onContinue={() => {
        setShowQuestionCardNo(13.5)
      }}
    />
  )
}
{
  showQuestionCardNo === 13.5 && (
    <QuestionCard
      questionSetTitle="Question Set — Molar Volume of a Gas"

      questionNumber={5}

      question="What is the mole ratio of calcium carbonate to carbon dioxide in this reaction?"

      answers={[
        {
          id: "A",
          text: "1 : 1",
        },
        {
          id: "B",
          text: "1 : 2",
        },
        {
          id: "C",
          text: "2 : 1",
        },
        {
          id: "D",
          text: "2 : 3",
        },
      ]}

      correctAnswer="A"

      hintText="Look at the coefficients of calcium carbonate and carbon dioxide in the balanced equation."

      correctMessage="Correct! One mole of calcium carbonate produces one mole of carbon dioxide, giving a 1 : 1 ratio."

      incorrectMessage="Incorrect. The balanced equation shows that calcium carbonate and carbon dioxide have a 1 : 1 mole ratio."

      submitButtonText="Submit Answer"

      continueButtonText="Continue"

      onContinue={() => {
        setShowQuestionCardNo(null)
      }}
    />
  )
}
      <MolarVolumeLiveDataPanel
        trialNumber={1}
        totalTrials={7}

        ethanoicAcidVolume={
          lessonStep >= 3.6
            ? 30
            : null
        }

        // Test tube + CaCO3 mass before transfer
        massBeforeTransfer={
          lessonStep >= 24
            ? 21.77
            : null
        }

        // Test tube mass after CaCO3 has been transferred
        massAfterTransfer={
          lessonStep >= 31
            ? 21.72
            : null
        }

        // Difference between the two masses
        calciumCarbonateMass={
          lessonStep >= 31
            ? 0.05
            : null
        }

        // Gas begins being collected once reaction starts
        currentCO2Volume={
          lessonStep >= 28
            ? 12
            : null
        }

        // Final reading only after reaction finishes
        finalCO2Volume={
          lessonStep >= 29
            ? 12
            : null
        }

        reactionStatus={
          lessonStep >= 29
            ? "Complete"
            : lessonStep >= 28
              ? "Reacting"
              : null
        }

        trialResults={[
          {
            mass:
              lessonStep >= 31
                ? 0.05
                : null,

            co2Volume:
              lessonStep >= 29
                ? 12
                : null,
          },

          {
            mass: null,
            co2Volume: null,
          },

          {
            mass: null,
            co2Volume: null,
          },

          {
            mass: null,
            co2Volume: null,
          },

          {
            mass: null,
            co2Volume: null,
          },

          {
            mass: null,
            co2Volume: null,
          },

          {
            mass: null,
            co2Volume: null,
          },
        ]}

        selectedLesson={
          selectedLesson
        }

        lessonStep={
          lessonStep
        }

        autoHideDelay={
          3000
        }

        autoShowConditions={[
          // Acid volume recorded
          {
            selectedLesson:
              selectedLesson,

            lessonStep:
              3.6,
          },

          // Initial mass recorded
          {
            selectedLesson:
              selectedLesson,

            lessonStep:
              24,
          },

          // Reaction starts
          {
            selectedLesson:
              selectedLesson,

            lessonStep:
              28,
          },

          // Final CO2 reading
          {
            selectedLesson:
              selectedLesson,

            lessonStep:
              29,
          },

          // Final test-tube mass / CaCO3 mass
          {
            selectedLesson:
              selectedLesson,

            lessonStep:
              31,
          },
        ]}
      />



       </>
    )
}

export default MolarVolumeLesson