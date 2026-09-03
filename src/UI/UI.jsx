import { useContext, useEffect } from "react"
import MainGuidelines from "./MainGuidelines/MainGuidelines"
import { MainGuidelineContext } from "../Contexts/MainGuidelineContext/MainGuidelineContext"
import LessonMenu from "./LessonMenu/LessonMenu"
import { InteractionContext } from "../Contexts/InteractionContext/InteractionContext"
import AcidInidicatorTest from "./AllLessons/AcidInidicatorTest/AcidInidicatorTest"
import AllErrors from "./AllErrors/AllErrors"
import DialogBox from "./AllDialogBox/DialogBox/DialogBox"
import AlkaliIndicatorTest from "./AllLessons/AlkaliIndicatorTest/AlkaliIndicatorTest"
import AcidBaseNeutralization from "./AllLessons/AcidBaseNeutralization/AcidBaseNeutralization"
import StarchIodineTest from "./AllLessons/StarchIodineTest/StarchIodineTest"
import CopperSulfate from "./AllLessons/CopperSulfate/CopperSulfate"
import InfoDialogBox from "./InfoDialogBox/InfoDialogBox"
import InfoBox from "./InfoBox/InfoBox"
import SaltWaterTest from "./AllLessons/SaltWaterTest/SaltWaterTest"
import ResetLessonButton from "./ResetLessonButton/ResetLessonButton"
import MovementGuideline from "./MainGuidelines/MovementGuideline/MovementGuideline"
import MouseGuide from "./MouseGuide/MouseGuide"
import ProteinIdentification from "./AllLessons/ProteinIdentification/ProteinIdentification"
import SideGuide from "./SideGuide/SideGuide"
import LessonDetails from "./LessonDetails/LessonDetails"
import LessonSummary from "./LessonSummary/LessonSummary"
import EnthalpyHessLaw from "./AllLessons/EnthalpyHessLaw/EnthalpyHessLaw"
import HessGuidelines from "./HessGuidelines/HessGuidelines"
import EnthalpyHessReaction02 from "./EnthalpyHessReaction02/EnthalpyHessReaction02"
import HydrolysisReaction from "./HydrolysisReaction/HydrolysisReaction"
import ReactionTimer from "./ReactionTimer/ReactionTimer"
import HCLTitration from "./AllLessons/HCLTitration/HCLTitration"
import HCLTitration2 from "./AllLessons/HCLTitration/HCLTitration2"
import HCLTitrationLiveDataPanel from "./HCLTitrationLiveDataPanel/HCLTitrationLiveDataPanel"
import SulfamicAcidNaOHTitration from "./AllLessons/SulfamicAcidNaOHTitration/SulfamicAcidNaOHTitration"
import SulfamicAcidNaOHTitration02 from "./AllLessons/SulfamicAcidNaOHTitration/SulfamicAcidNaOHTitration02"
import SulfamicAcidNaOHTitration03 from "./AllLessons/SulfamicAcidNaOHTitration/SulfamicAcidNaOHTitration03"
import TitreValueRecorded from "../Experience/Interactions/TitreValueRecorded/TitreValueRecorded"
import QuestionCard from "./QuestionCard/QuestionCard"

const mainContent = [
  {
    title: "WELCOME TO THE CHEMISTRY LAB",
    content: (
      <>
        This lab lets you explore chemistry in a{" "}
        <strong>safe and interactive way</strong>.
        <br />
        You can use lab equipment, <strong>mix chemicals</strong>, test
        reactions, and learn how different experiments work{" "}
        <strong>step by step</strong>.
      </>
    ),
    button1: "Start Demo",
    button2:"Free Roam",
    info:
      "Select Start Demo to continue with the tutorial",
    mainImg: "./chem-icon.png",
    infoImg: "./info.png",
    layout: "column",
  },

  {
    title: "Follow the Guide",
    content: (
      <>
        During the tutorial, <strong>Arrows</strong> will show you where to go
        and what to click.
        <br />
        Follow the arrows, interact with the{" "}
        <strong>Objects</strong>, and complete each step.
      </>
    ),
    button1: "Continue",
    layout: "column",
    mainImg: "./benderArrow.png",
  },

  {
    title: "Movement Controls",
    content: (
      <>
        Use <strong>W, A, S, and D</strong> to move around the lab.
        <br />
        Move close to the highlighted objects and follow the arrows to continue
        the tutorial.
      </>
    ),
    button1: "Continue",
    layout: "row",
    infoImg: "./Arrow.png",
  },

  {
    title: "Tutorial Mode",
    content: (
      <>
        Learn how to use the lab <strong>Step By Step</strong>.
        <br />
        You will be guided through wearing safety gear, selecting equipment,
        mixing chemicals, and completing experiments safely.
      </>
    ),
    button1: "Start",
  },
]

const UI = () => {
  const {
    selectedMainGuideline,
    setSelectedMainGuideline,
    setIsMainGuideline,
    showArrrowChair,
    isLessonStart,
    lessonStep,
    selectedLesson,
    safetyStep,
    setShowArrowChair,
    setshowGogglesArrow,
    setShowLeftGloveArrow,
    setShowRightGloveArrow,
    setShowRedLitmusArrow,
    isTutorialMode,showSpoonArrow,setShowSpoonArrow,
    setIsTutorialMode,showConicalArrow,setShowArrowConicalArrow,
    setShowSaltContainerArrow,labResetKey,setShowTestube01Arrow,
    showTestube01Arrow,showDropperArrow,setShowDropperArrow,showLessonMenu,
    ShowNormalBeakerArrow,setShowNormalBeakerArrow,
    showPolystereneArrow,setShowPolystereneArrow,showPottasiumCarbonateArrow,setShowPottasiumCarbonateArrow,
    showBalanceArrow,setShowBalanceArrow,showBuretteArrow,setShowBuretteArrow,setShowThermometerArrow,
    showVolumetricArrow,setShowVolumetricArrow,setShowVolumetricFlaskArrow,setShowFunnelArrow,
    setShowNaOHBBottleArrowRef,showSulfamicArrow,setShowSulfamicArrow,showMethyArrow,setShowMethylArrow,
    showBuretteClampArrow,setShowBuretteClampArrow,setShowPotassiumHydrogenCarbonateArrow
    
  } = useContext(MainGuidelineContext)

  const {
    isSitting,
    clickedModel,
    isObjectInfo,
    chairStep,setHessGuidelineNumber,hessGuidelineNumber,isReactionTimerRunning,
    setIsReactionTimerRunning,isPouring, showQuestionCardNo,setShowQuestionCardNo
  } = useContext(InteractionContext)


  useEffect(()=>{
    console.log("isReactionTimerRunning:",isReactionTimerRunning)
    console.log("isPouring:",isPouring)
  },[isReactionTimerRunning])


  // ------------------------ Lesson 08 -------------

  useEffect(() => {
    setShowNormalBeakerArrow(
      (selectedLesson===8 && [3,21].includes(lessonStep)) ||
      (selectedLesson===11 && [3].includes(lessonStep)) ||
      ([12,12.1].includes(selectedLesson) && [15].includes(lessonStep)) ||
      (selectedLesson===9 && [2,19].includes(lessonStep))  
    )
  }, [selectedLesson, lessonStep])

  useEffect(()=>{
    setShowVolumetricFlaskArrow(
      ([12.1,12.2].includes(selectedLesson) && [26,55].includes(lessonStep))
    )
  },[selectedLesson,lessonStep])


  useEffect(()=>{
    setShowBuretteArrow(
      (lessonStep===18 && selectedLesson===8) ||
      (lessonStep===52 && selectedLesson===12.2) ||
      (lessonStep ===16 && selectedLesson ===9)
    )
  },[selectedLesson, lessonStep])


  useEffect(()=>{
    setShowBuretteClampArrow(
      (lessonStep==82 && selectedLesson==12.2) ||
      (lessonStep ===22 && selectedLesson ===9)
    )
  },[selectedLesson, lessonStep])

  useEffect(()=>{
      setShowPolystereneArrow(
        (selectedLesson===8 && lessonStep===4) ||
        (selectedLesson ==9 && lessonStep ===3) 
      )
  },[selectedLesson,lessonStep,showPolystereneArrow])

  useEffect(()=>{
    setShowPottasiumCarbonateArrow(selectedLesson===8 && lessonStep === 10)
  },[selectedLesson,lessonStep])

  useEffect(()=>{
    setShowBalanceArrow(
      ([14,22].includes(lessonStep) && selectedLesson === 8) ||
      ([4,6,14].includes(lessonStep) && selectedLesson ===12) ||
      (selectedLesson===9 && [12,20].includes(lessonStep))

    )
  },[selectedLesson,lessonStep])

  useEffect(()=>{
    setShowVolumetricArrow((([11,12.2].includes(selectedLesson)) && ([6,66].includes(lessonStep))))
  },[selectedLesson,lessonStep])

  useEffect(()=>{
    setShowFunnelArrow(
      (selectedLesson==12.2 && lessonStep==53)
    )
  },[selectedLesson,lessonStep])

  useEffect(()=>{
    setShowNaOHBBottleArrowRef(
      ([12.2].includes(selectedLesson) && [63].includes(lessonStep))
    )
  },[selectedLesson,lessonStep])

  useEffect(()=>{
    setShowSulfamicArrow(
      (selectedLesson==12 && lessonStep==8)
    )
  },[selectedLesson,lessonStep])

  //-------------------------------------------------



  const startLab = () => {
    setIsMainGuideline(false)
    setSelectedMainGuideline(5)

    const canvas = document.querySelector("canvas")
    canvas?.requestPointerLock?.()
  }

  const startTutorial = () => {
    setIsMainGuideline(true)
    setSelectedMainGuideline(2)
    setIsTutorialMode(true)
  }

  const startFreeRoam = () => {
    setIsMainGuideline(false)
    setSelectedMainGuideline(0)
    setIsTutorialMode(false)

    const canvas = document.querySelector("canvas")
    canvas?.requestPointerLock?.()
  }

  useEffect(() => {
    if (isSitting) {
      setShowArrowChair(false)
    }
  }, [
    isSitting,
    setShowArrowChair,
    setshowGogglesArrow,
  ])

  useEffect(() => {
    setShowLeftGloveArrow(safetyStep === 2)
  }, [safetyStep, setShowLeftGloveArrow])

  useEffect(() => {
    setShowRightGloveArrow(safetyStep === 3)
  }, [safetyStep, setShowRightGloveArrow])

  useEffect(() => {
    setShowRedLitmusArrow(
      selectedLesson === 3 && lessonStep === 6
    )
  }, [selectedLesson,lessonStep,setShowRedLitmusArrow])

  // useEffect(()=>{
  //   setShowArrowConicalArrow(
  //     lessonStep===6 && selectedLesson !==1 && selectedLesson!==7 && selectedLesson !==3 && selectedLesson !==8
  //   )
  // },[lessonStep,showConicalArrow])

  useEffect(()=>{
    setShowArrowConicalArrow(
      (selectedLesson===12.2 && lessonStep==72)
    )
  },[selectedLesson,lessonStep])

  useEffect(()=>{
    setShowMethylArrow(selectedLesson===12.2 && lessonStep==77)
  },[selectedLesson,lessonStep])

  useEffect(()=>{
    setShowSpoonArrow(
      (selectedLesson==1 && lessonStep===6) ||
      (selectedLesson===8 && lessonStep ===9) ||
      ([12,12.1].includes(selectedLesson) && [22,7].includes(lessonStep)) ||
      (selectedLesson === 9 && lessonStep ===7)
    )
  },[lessonStep,showSpoonArrow])

  useEffect(()=>{
    setShowSaltContainerArrow(selectedLesson===1 && lessonStep===7)
  },[lessonStep,selectedLesson])

useEffect(() => {
  setShowTestube01Arrow(
    (selectedLesson === 8 && lessonStep === 8) ||
    (selectedLesson === 7 && lessonStep === 3) ||
    (selectedLesson === 8 && lessonStep === 32) ||
    (selectedLesson ===12 && lessonStep===3) ||
    (selectedLesson ===9 && lessonStep===6) ||
    (selectedLesson === 9 && lessonStep === 30)
  )
}, [selectedLesson, lessonStep, hessGuidelineNumber])

useEffect(()=>{
  setShowThermometerArrow(
    (selectedLesson === 8 && lessonStep === 30) ||
    (selectedLesson === 9 && lessonStep === 28)
  )
},[selectedLesson, lessonStep])

  useEffect(() => {
    setShowDropperArrow(selectedLesson===7 && lessonStep===6)
  }, [selectedLesson,lessonStep,showDropperArrow]);

  useEffect(()=>{
    setshowGogglesArrow(safetyStep===1)
  },[safetyStep])

  useEffect(()=>{
    setShowPotassiumHydrogenCarbonateArrow(
      (selectedLesson===9 && lessonStep ===8)
    )
  },[selectedLesson,lessonStep])


useEffect(() => {
  const shouldShowHessGuideline =
    selectedLesson === 8 && ( lessonStep === 8 || lessonStep === 14 || lessonStep === 18 || lessonStep ===28 || lessonStep ===32 || lessonStep===39)

  setHessGuidelineNumber(
    shouldShowHessGuideline
  )
}, [selectedLesson, lessonStep])
  /*
    null means the user has not selected
    Tutorial Mode or Free Roam yet.
  */

  if (isTutorialMode === null) {
    return (
      <>
        {selectedMainGuideline === 1 && (
          <MainGuidelines
            mainContent={mainContent[0]}
            onButton1Click={startTutorial}
            onButton2Click={startFreeRoam}
            
          />
        )}
      </>
    )
  }

  /*
    Free-roam mode
  */
  if (isTutorialMode === false) {
    return (
      <>
        {chairStep === 1 && (
          <DialogBox text="Press G to Slide Chair" />
        )}

        {chairStep === 2 && (
          <DialogBox text="Press E to Sit" />
        )}

        {clickedModel && (
          <InfoDialogBox clickedModel={clickedModel} />
        )}

        {isObjectInfo && (
          <InfoBox clickedModel={clickedModel} />
        )}

        <AllErrors />

        {isReactionTimerRunning && <ReactionTimer isRunning={isReactionTimerRunning}/>}
      </>
    )
  }

  /*
    Tutorial mode
  */
  return (
    <>

    
    {/* <LessonDetails/> */}
    {/* <LessonSummary summaryData={saltDissolvingSummary}/> */}
    {!isSitting && selectedMainGuideline===5 && <SideGuide/>}

    {isLessonStart && safetyStep===4 && <ResetLessonButton/>}
    
      {selectedMainGuideline === 2 && (
        <MainGuidelines
          mainContent={mainContent[1]}
          onButton1Click={() =>
            setSelectedMainGuideline(3)
          }
        />
      )}

      {selectedMainGuideline === 3 && (
        <MovementGuideline
          mainContent={mainContent[2]}
          onButton1Click={() =>
            setSelectedMainGuideline(4)
          }
        />
      )}

      {/* {selectedMainGuideline === 4 && (
        <MainGuidelines
          mainContent={mainContent[3]}
          onButton1Click={() => {
            startLab()
            setShowArrowChair(true)
          }}
        />
      )} */}

      {selectedMainGuideline === 4 &&<MouseGuide onButton1Click={()=>{
        startLab()
        setShowArrowChair(true)
      }}/>}

      {selectedMainGuideline === 5 &&
        chairStep === 0 &&
        showArrrowChair &&
        !isSitting && (
          <DialogBox text="Walk over to the chair indicated by the arrow" />
        )}

      {selectedMainGuideline === 5 &&
        chairStep === 1 && (
          <DialogBox text="Press G to Slide Chair" />
        )}

      {chairStep === 2 && (
        <DialogBox text="Press E to Sit" />
      )}

      {(
        (labResetKey > 0 &&
          safetyStep === 4 &&
          isSitting &&
          selectedMainGuideline === 5) ||
        (selectedMainGuideline === 5 &&
          isSitting  &&
          safetyStep === 1)
      ) && (
        <LessonMenu />
      )}

      {safetyStep === 1 && !showLessonMenu && (
        <DialogBox text="Click the goggles to put them on" />
      )}

      {safetyStep === 2 && (
        <DialogBox text="Click the left glove to put it on" />
      )}

      {safetyStep === 3 && (
        <DialogBox text="Click the right glove to put it on" />
      )}

      {safetyStep === 4 &&
        isLessonStart &&
        selectedLesson === 2 && (
          <AcidInidicatorTest />
        )}

      {safetyStep === 4 &&
        isLessonStart &&
        selectedLesson === 1 && (
          <SaltWaterTest/>
        )}

      {safetyStep === 4 &&
        isLessonStart &&
        selectedLesson === 3 && (
          <AlkaliIndicatorTest />
        )}

      {safetyStep === 4 &&
        isLessonStart &&
        selectedLesson === 4 && (
          <StarchIodineTest />
        )}

      {safetyStep === 4 &&
        isLessonStart &&
        selectedLesson === 5 && (
          <CopperSulfate />
        )}

      {safetyStep === 4 &&
        isLessonStart &&
        selectedLesson === 6 && (
          <AcidBaseNeutralization />
        )}

      {safetyStep === 4 &&
        isLessonStart &&
        selectedLesson === 7 && (
          <ProteinIdentification />
        )}  


     {safetyStep === 4 &&
        isLessonStart &&
        selectedLesson === 8 && (
          <EnthalpyHessLaw />
        )}

     {safetyStep === 4 &&
        isLessonStart &&
        selectedLesson === 9 && (
          <EnthalpyHessReaction02 />
        )}

     {safetyStep === 4 &&
        isLessonStart &&
        selectedLesson === 10 && (
          <HydrolysisReaction />
        )}          

     {safetyStep === 4 &&
        isLessonStart &&
        selectedLesson === 11 && (
          <HCLTitration/>
        )}     

     {selectedLesson ==10 && isReactionTimerRunning && <ReactionTimer isRunning={isReactionTimerRunning}/>}

      <AllErrors />

      {/* {clickedModel && (
        <InfoDialogBox clickedModel={clickedModel} />
      )} */}

      {isObjectInfo && (<InfoBox clickedModel={clickedModel} />)}

      {
        selectedLesson===11.1 && (
          <HCLTitration2/>
        )
      }

      {safetyStep === 4 &&
        isLessonStart &&
        selectedLesson === 12 && (
          <SulfamicAcidNaOHTitration/>
        )}

       {
        selectedLesson===12.1 && (
          <SulfamicAcidNaOHTitration02/>
        )
       } 

       {
        selectedLesson===12.2 && (
          <SulfamicAcidNaOHTitration03/>
        )
       }


       {/* <TitreValueRecorded/> */}

    </>
  )
}

export default UI