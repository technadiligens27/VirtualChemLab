import { use, useContext, useEffect } from "react"
import MainGuidelines from "./MainGuidelines/MainGuidelines"
import { MainGuidelineContext } from "../Contexts/MainGuidelineContext/MainGuidelineContext"
import LessonMenu from "./LessonMenu/LessonMenu"
import { InteractionContext } from "../Contexts/InteractionContext/InteractionContext"
import LessonGuide from "./LessonGuide/LessonGuide"
import AcidInidicatorTest from "./AllLessons/AcidInidicatorTest/AcidInidicatorTest"
import AllArrows from "./AllArrows/AllArrows"
import AllErrors from "./AllErrors/AllErrors"
import DialogBox from "./AllDialogBox/DialogBox/DialogBox"
import AlkaliIndicatorTest from "./AllLessons/AlkaliIndicatorTest/AlkaliIndicatorTest"
import AcidBaseNeutralization from "./AllLessons/AcidBaseNeutralization/AcidBaseNeutralization"
import StarchIodineTest from "./AllLessons/StarchIodineTest/StarchIodineTest"

const mainContent = [
  {
    title: "Welcome to the Chem Lab",
    content: `This lab lets you explore chemistry in a safe and interactive way.
You can use lab equipment, mix chemicals, test reactions, and learn how different experiments work step by step.`,
    button1: "Start Demo",
    button2 :"Free Roam"
  },

  {
    title: "Follow the Guide",
    content: `During the tutorial, arrows will show you where to go and what to click.
Follow the arrows, interact with the highlighted objects, and complete each step to learn how the lab works.`,
    button1: "Continue",
  },
  {
    title: "Movement Controls",
    content: `Use W, A, S, and D to move around the lab.
Move close to the highlighted objects and follow the arrows to continue the tutorial.`,
    button1: "Continue",
  },

  {
    title: "Tutorial Mode",
    content: `Learn how to use the lab step by step.
You will be guided through basic actions like wearing safety gear, selecting equipment, mixing chemicals, and completing experiments safely.`,
    button1: "Start",
  },
]

const UI = () => {

  const {selectedMainGuideline,setSelectedMainGuideline,
    isMainGuideline,setIsMainGuideline,setShowArrowChair,showArrowChair,
    setShowLessonMenu,showLessonMenu,isLessonStart,setIsLessonStart,lessonStep,setLessonStep,
    selectedLesson,setSelectedLesson,showArrrowChair,safetyStep,setSafetyStep,setshowGogglesArrow,
    setShowLeftGloveArrow,setShowRightGloveArrow,showRedLitmusArrow,setShowRedLitmusArrow
  } = useContext(MainGuidelineContext)

  const {isSitting} = useContext(InteractionContext)

  const startLab = () => {
    setIsMainGuideline(false);
    setSelectedMainGuideline(5)

    const canvas = document.querySelector("canvas")
    canvas?.requestPointerLock?.()
  }

  if(!MainGuidelineContext) return null

  useEffect(() => {
  if (isSitting) {
    setShowArrowChair(false);
    setshowGogglesArrow(true)
  }
}, [isSitting, setShowArrowChair,setshowGogglesArrow])

  useEffect(()=>{
    if(safetyStep===2){
        setShowLeftGloveArrow(true);
    }
  },[safetyStep])
  
  useEffect(()=>{
    if(safetyStep===3){
        setShowRightGloveArrow(true);
    }
  },[safetyStep])

  useEffect(() => {
  if (selectedLesson === 3 && lessonStep === 6) {
    setShowRedLitmusArrow(true)
  } else {
    setShowRedLitmusArrow(false)
  }
}, [selectedLesson, lessonStep, setShowRedLitmusArrow])

  return (
    <>
      {selectedMainGuideline === 1 && <MainGuidelines 
      mainContent={mainContent[0]} 
      onButton1Click={() => setSelectedMainGuideline(2)}
      onButton2Click={()=>{setIsMainGuideline(false);setSelectedMainGuideline(0);console.log('Free roam')}}
      />}

      {selectedMainGuideline === 2 && <MainGuidelines 
      mainContent={mainContent[1]} 
      onButton1Click={() => setSelectedMainGuideline(3)}
      />}


      {selectedMainGuideline === 3 && <MainGuidelines 
      mainContent={mainContent[2]} 
      onButton1Click={() => setSelectedMainGuideline(4)}
      />}


      {selectedMainGuideline === 4 && <MainGuidelines 
      mainContent={mainContent[3]} 
      onButton1Click={()=>{startLab();setShowArrowChair(true);}}/>} 

      {selectedMainGuideline === 5 
        && showArrrowChair 
        && <DialogBox text={"Walk over to the chair indicated by the arrow"}/>}

      {selectedMainGuideline === 5  && isSitting &&
        <LessonMenu/>      
      }

      {safetyStep === 1 && (<DialogBox text={"Click the googles to put them on"}/>) }
      
      {safetyStep === 2 && (<DialogBox text={"Click the Left glove to put them on"}/>) }

      {safetyStep === 3 && (<DialogBox text={"Click the Right glove to put them on"}/>) }

      {safetyStep === 4 && isLessonStart && selectedLesson === 2 && <AcidInidicatorTest/> }

      {safetyStep === 4 && isLessonStart && selectedLesson === 6 && <AcidBaseNeutralization/> }

      {safetyStep === 4 && isLessonStart && selectedLesson === 3 && <AlkaliIndicatorTest/> }

      {safetyStep === 4 && isLessonStart && selectedLesson === 4 && <StarchIodineTest/> }


      <AllErrors/>
    </>
  )
}

export default UI