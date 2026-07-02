import { useContext, useEffect } from "react"
import MainGuidelines from "./MainGuidelines/MainGuidelines"
import { MainGuidelineContext } from "../Contexts/MainGuidelineContext/MainGuidelineContext"
import LessonMenu from "./LessonMenu/LessonMenu"
import { InteractionContext } from "../Contexts/InteractionContext/InteractionContext"
import LessonGuide from "./LessonGuide/LessonGuide"
import AcidInidicatorTest from "./AllLessons/AcidInidicatorTest/AcidInidicatorTest"
import AllArrows from "./AllArrows/AllArrows"
import AllErrors from "./AllErrors/AllErrors"
import DialogBox from "./AllDialogBox/DialogBox/DialogBox"

const mainContent = [
  {
    title: "Welcome to the Chem Lab",
    content: `This lab lets you explore chemistry in a safe and interactive way.
You can use lab equipment, mix chemicals, test reactions, and learn how different experiments work step by step.`,
    button1: "Start Demo",
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
    selectedLesson,setSelectedLesson,showArrrowChair
  } = useContext(MainGuidelineContext)

  const {isSitting} = useContext(InteractionContext)

  useEffect(()=>{
    console.log("showLessonMenu:",showLessonMenu)
  },[showLessonMenu])



  const startLab = () => {
    setIsMainGuideline(false);
    setSelectedMainGuideline(5)

    const canvas = document.querySelector("canvas")
    canvas?.requestPointerLock?.()
  }

  if(!MainGuidelineContext) return null

  useEffect(() => {
  if (isSitting) {
    setShowArrowChair(false)
  }
}, [isSitting, setShowArrowChair])

  return (
    <>
      {selectedMainGuideline === 1 && <MainGuidelines 
      mainContent={mainContent[0]} 
      onButton1Click={() => setSelectedMainGuideline(2)}
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
      

      {isLessonStart && selectedLesson===2 && <AcidInidicatorTest/> }

      <AllErrors/>
    </>
  )
}

export default UI