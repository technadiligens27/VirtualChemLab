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

const mainContent = [
  {
    title: "Welcome to the Chem Lab",
    content: `This lab lets you explore chemistry in a safe and interactive way.
You can use lab equipment, mix chemicals, test reactions, and learn how different experiments work step by step.`,
    button1: "Start Demo",
    button2: "Free Roam",
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
    setShowSaltContainerArrow
  } = useContext(MainGuidelineContext)

  const {
    isSitting,
    clickedModel,
    isObjectInfo,
    chairStep,
  } = useContext(InteractionContext)

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
      setshowGogglesArrow(true)
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

  useEffect(()=>{
    setShowArrowConicalArrow(
      lessonStep===6 && selectedLesson !==1
    )
  },[lessonStep,showConicalArrow])

  useEffect(()=>{
    setShowSpoonArrow(selectedLesson==1 && lessonStep===6)
  },[lessonStep,showSpoonArrow])

  useEffect(()=>{
    setShowSaltContainerArrow(selectedLesson===1 && lessonStep===7)
  },[lessonStep,selectedLesson])

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
      </>
    )
  }

  /*
    Tutorial mode
  */
  return (
    <>
      {selectedMainGuideline === 2 && (
        <MainGuidelines
          mainContent={mainContent[1]}
          onButton1Click={() =>
            setSelectedMainGuideline(3)
          }
        />
      )}

      {selectedMainGuideline === 3 && (
        <MainGuidelines
          mainContent={mainContent[2]}
          onButton1Click={() =>
            setSelectedMainGuideline(4)
          }
        />
      )}

      {selectedMainGuideline === 4 && (
        <MainGuidelines
          mainContent={mainContent[3]}
          onButton1Click={() => {
            startLab()
            setShowArrowChair(true)
          }}
        />
      )}

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

      {selectedMainGuideline === 5 &&
        isSitting &&
        safetyStep === 0 && (
          <LessonMenu />
        )}

      {safetyStep === 1 && (
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

      <AllErrors />

      {clickedModel && (
        <InfoDialogBox clickedModel={clickedModel} />
      )}

      {isObjectInfo && (
        <InfoBox clickedModel={clickedModel} />
      )}
    </>
  )
}

export default UI