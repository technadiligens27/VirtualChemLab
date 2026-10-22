import { useContext, useEffect } from "react"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox"
import SulfamicGuidelines from "../../SulfamicGuidelines/SulfamicGuidelines"
import EnthalpyLessonOverview from "../../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview"
import { flameTestData,flameTestGuidelineData } from "../../Data/flameTestData/flameTestData"
import SafetyScreen from "../../SafetyScreen/SafetyScreen"
import { safetyInstructionData } from "../../Data/SafetyInstruction/SafetyInstruction"
import FlameTestSummary from "../../Summary/FlameTestSummary/FlameTestSummary"
import { useResetLesson } from "../../ResetLessonButton/ResetLessonButton"
import QuestionCard from "../../QuestionCard/QuestionCard"

const FlameTest02 = ()=>{

  const {
    graduatedBeakerRef,conicalBeakerRef02,conicalBeakerRef,seperatingFunnelRef,pipetteRef,gogglesRef,gloverightRef,
    graduatedBeaker50OriginalStateRef,volumetricRef,roundBeakerRef,gloveleftRef,potassiumHydrogenCarbonateRef,separatingFunnelBungRef,
    heatingMantleRef,volumetricPipetteRef,mainBuiretteRef,digitalBalanceRef,mainDropperRef,graduatedPipetteRef,testube02Ref,
    testube02OriginalStateRef,graduatedPipetteOriginalStateRef,seperatingFunnelOriginalStateRef,condensorRef,heatingMatRef,powderContainer,
    nichromeWireRef,nichromeWirePowderRef,metalSaltRef,airHoleRef,bunsenBurnerRef
  } = useContext(ModelContext)    
    
  const {selectedLesson,setLessonStep,setSafetyStep,lessonStep,setSelectedLesson} = useContext(MainGuidelineContext)

  const {setSelectedRightHand,setSelectedLeftHand,selectedLeftHand,selectedRightHand,setIsClampTestube,setIsClampInCenter,setIsModelCentre,
    setIsDropperFilled,setIsBeakerNearClamp,setIsDropperPlaced,setIsDipMode,setIsModelInHeatingMat,setShowBunsenFlame,setShowPowderInContainer,
    setShowQuestionCardNo,showQuestionCardNo
  } = useContext(InteractionContext)

  const resetLesson = useResetLesson()

    useEffect(()=>{
    if(pipetteRef.current){
      pipetteRef.current.visible = false
    }
    if(volumetricPipetteRef.current){
      volumetricPipetteRef.current.visible = false
    }
    if(heatingMatRef.current){
      heatingMatRef.current.visible = true
    }

    if(powderContainer.current){
      powderContainer.current.visible = true
    }
    },[])    

    useEffect(()=>{
      if(selectedLesson==15.2 && lessonStep==29){
        bunsenBurnerRef.current.visible = false
      }
      if(selectedLesson==15.2 && lessonStep==31){
        bunsenBurnerRef.current.visible = true
      }

    },[lessonStep])

    useEffect(()=>{
        setSelectedLesson(15.2)
        setSafetyStep(4)
        setLessonStep(26)
        // setShowBunsenFlame(false)

        gogglesRef.current.visible = false 
        gloverightRef.current.visible = false 
        gloveleftRef.current.visible = false 
    },[])

    useEffect(()=>{
      if(selectedLesson==15.2 && lessonStep==30){
        nichromeWirePowderRef.current.visible = true
      }
    },[lessonStep])

    const handleRestart = ()=>{
      setLessonStep(26);
      nichromeWirePowderRef.current.visible = false;
      setShowPowderInContainer(false)
    }

    useEffect(()=>{
      if(airHoleRef.current){
        airHoleRef.current.visible = true
      }
    },[])

    useEffect(()=>{
      if (selectedLeftHand?.name !== "nichrome-wire") {
            setSelectedLeftHand({
            hand: "left",
            name: "nichrome-wire",
            ref: nichromeWireRef,
            originalParent:
                nichromeWireRef.current.parent,

            originalPosition:
                nichromeWireRef.current.position.clone(),

            originalRotation:
                nichromeWireRef.current.rotation.clone(),

            originalScale:
                nichromeWireRef.current.scale.clone(),
            })
        }
    },[])

    useEffect(()=>{
        setIsModelCentre(true);
        setIsModelInHeatingMat(true);
    },[])
    useEffect(()=>{
      if(selectedLesson==15.2 && [31].includes(lessonStep)){
        setIsDipMode(false)
      }
    },[lessonStep])
    return(
        <>

      {lessonStep >=26 &&  lessonStep <=28 && <SulfamicGuidelines guidelineData={flameTestGuidelineData[7]}/>}

        {lessonStep == 26 && <DialogBox text={
          <>
         Click the <strong>Held Empty Container</strong> and Select <strong>Add Powder</strong>
          </>
          } 
        />}

        {lessonStep == 27 && <DialogBox text={
          <>
         Select <strong>Any Metal Salt</strong>
          </>
          } 
        />}

        {lessonStep == 28 && <DialogBox text={
          <>
         Click the <strong>Held Nichrome Wire</strong> and Select <strong>Dip</strong>
          </>
          } 
        />}

        {lessonStep == 29 && <DialogBox text={
          <>
         <strong>Scroll Down Continously</strong> to <strong>Dip</strong> the <strong>Nichrome Wire</strong>
          </>
          } 
        />}

        {lessonStep == 30 && <DialogBox text={
          <>
         <strong>Scroll Up Continously</strong> to <strong>Remove</strong> the <strong>Nichrome Wire </strong>
          </>
          } 
        />}

        {lessonStep == 31 && <DialogBox text={
          <>
         Click the <strong>Bunsen burner</strong> and <strong>light it</strong>
          </>
          } 
        />}

        {lessonStep == 32 && <DialogBox text={
          <>
         <strong>Scroll Down Continously</strong> to <strong>Heat</strong> the Nichrome Wire 
          </>
          } 
        />}

        {lessonStep >= 33 && <DialogBox text={
          <>
         <strong>Observe the Flame Colour Change</strong> 
          </>
          } 
          button1Text="Try Difference Metal Salt"
          onbtnClick={handleRestart}

          // button2Text="Questions"

        />}

        {
          lessonStep === 34 &&         <FlameTestSummary
          onQuestions= {() => {setShowQuestionCardNo(15.1)}}
          onEndLesson={resetLesson}/>
        }

        {
          showQuestionCardNo == 15.1 && (
            <QuestionCard
              questionSetTitle="Question Set — Flame Test"

              questionNumber={1}

              question="What is the main purpose of a flame test?"

              answers={[
                {
                  id: "A",
                  text: "To measure the temperature of a flame",
                },
                {
                  id: "B",
                  text: "To identify metal ions by their flame colours",
                },
                {
                  id: "C",
                  text: "To measure the mass of a metal salt",
                },
                {
                  id: "D",
                  text: "To identify acids and alkalis",
                },
              ]}

              correctAnswer="B"

              hintText="Think about why different metal salts produce different flame colours."

              correctMessage="Correct! Flame tests are used to identify metal ions from their characteristic flame colours."

              incorrectMessage="Incorrect. A flame test identifies metal ions by the characteristic colour they produce in a flame."

              submitButtonText="Submit Answer"

              continueButtonText="Continue"
              onExit={() => {
                setLessonStep(34)
                setShowQuestionCardNo(null)
              }}
              onContinue={() => {
                setShowQuestionCardNo(15.2)
              }}
            />
          )
        }


        {
          showQuestionCardNo == 15.2 && (
            <QuestionCard
              questionSetTitle="Question Set — Flame Test"

              questionNumber={2}

              question="Why is nichrome wire used in flame tests?"

              answers={[
                {
                  id: "A",
                  text: "It changes colour when heated",
                },
                {
                  id: "B",
                  text: "It dissolves metal salts",
                },
                {
                  id: "C",
                  text: "It withstands high temperatures without strongly affecting the flame colour",
                },
                {
                  id: "D",
                  text: "It produces a yellow flame",
                },
              ]}

              correctAnswer="C"

              hintText="Think about what happens to the wire when it is placed in a hot Bunsen flame."

              correctMessage="Correct! Nichrome wire can withstand high temperatures and does not strongly affect the flame colour."

              incorrectMessage="Incorrect. Nichrome wire is used because it withstands high temperatures without strongly affecting the flame colour."

              submitButtonText="Submit Answer"

              continueButtonText="Continue"
              onExit={() => {
                setLessonStep(34)
                setShowQuestionCardNo(null)
              }}
              onContinue={() => {
                setShowQuestionCardNo(15.3)
              }}
            />
          )
        }

        {
          showQuestionCardNo == 15.3 && (
            <QuestionCard
              questionSetTitle="Question Set — Flame Test"

              questionNumber={3}

              question="Why is the nichrome wire dipped into hydrochloric acid?"

              answers={[
                {
                  id: "A",
                  text: "To cool the wire",
                },
                {
                  id: "B",
                  text: "To remove impurities from the wire",
                },
                {
                  id: "C",
                  text: "To increase the flame temperature",
                },
                {
                  id: "D",
                  text: "To make the wire stronger",
                },
              ]}

              correctAnswer="B"

              hintText="The wire must be clean so that previous chemicals do not affect the flame colour."

              correctMessage="Correct! Hydrochloric acid removes impurities from the nichrome wire."

              incorrectMessage="Incorrect. The nichrome wire is dipped in hydrochloric acid to remove impurities before testing a metal salt."

              submitButtonText="Submit Answer"

              continueButtonText="Continue"

              onContinue={() => {
                setShowQuestionCardNo(15.4)
              }}

                            onExit={() => {
                setLessonStep(34)
                setShowQuestionCardNo(null)
              }}
            />
          )
        }


        {
          showQuestionCardNo == 15.4 && (
            <QuestionCard
              questionSetTitle="Question Set — Flame Test"

              questionNumber={4}

              question="Why is the nichrome wire heated before collecting the metal salt?"

              answers={[
                {
                  id: "A",
                  text: "To melt the wire",
                },
                {
                  id: "B",
                  text: "To make the flame larger",
                },
                {
                  id: "C",
                  text: "To remove remaining impurities and check that the wire is clean",
                },
                {
                  id: "D",
                  text: "To change the metal salt's colour",
                },
              ]}

              correctAnswer="C"

              hintText="The wire should produce no unwanted flame colour before it is used with a metal salt."

              correctMessage="Correct! Heating removes any remaining impurities and confirms that the nichrome wire is clean."

              incorrectMessage="Incorrect. The nichrome wire is heated first to remove remaining impurities and check that it produces no unwanted flame colour."

              submitButtonText="Submit Answer"

              continueButtonText="Continue"
              onExit={() => {
                setLessonStep(34)
                setShowQuestionCardNo(null)
              }}
              onContinue={() => {
                setShowQuestionCardNo(15.5)
              }}
            />
          )
        }

        {
          showQuestionCardNo == 15.5 && (
            <QuestionCard
              questionSetTitle="Question Set — Flame Test"

              questionNumber={5}

              question="Why is the Bunsen burner's air hole opened during a flame test?"

              answers={[
                {
                  id: "A",
                  text: "To produce a yellow safety flame",
                },
                {
                  id: "B",
                  text: "To produce a hotter, non-luminous blue flame",
                },
                {
                  id: "C",
                  text: "To reduce the oxygen supply",
                },
                {
                  id: "D",
                  text: "To stop the gas flow",
                },
              ]}

              correctAnswer="B"

              hintText="Opening the air hole allows more oxygen to mix with the gas."

              correctMessage="Correct! Opening the air hole produces a hotter, non-luminous blue flame for the flame test."

              incorrectMessage="Incorrect. The air hole is opened to allow more oxygen in and produce a hotter blue flame."

              submitButtonText="Submit Answer"

              continueButtonText="Finish"

              onExit={() => {
                setLessonStep(34)
                setShowQuestionCardNo(null)
              }}

              onContinue={() => {
                setLessonStep(34)
                
              }}
            />
          )
        }

        </>           

    )
}

export default FlameTest02