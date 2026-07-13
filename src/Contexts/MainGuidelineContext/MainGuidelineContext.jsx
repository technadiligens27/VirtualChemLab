import { createContext, useRef, useState } from 'react'

export const MainGuidelineContext = createContext()

export const MainGuidelineProvider = ({ children }) => {

  const [isMainGuideline,setIsMainGuideline] = useState(true)
  const [selectedMainGuideline,setSelectedMainGuideline] = useState(1);

  const [showArrrowChair,setShowArrowChair] = useState(true);
  const [showNormalBeakerArrow,setShowNormalBeakerArrow] = useState(false);
  const [showGogglesArrow,setshowGogglesArrow] = useState(false);
  const [showLeftGloveArrow,setShowLeftGloveArrow] = useState(false);
  const [showRightGloveArrow,setShowRightGloveArrow] = useState(false);
  const [showConicalArrow,setShowArrowConicalArrow] = useState(false)
  const [showSpoonArrow,setShowSpoonArrow] = useState(false)

  const [showLessonMenu, setShowLessonMenu] = useState(false)
  const [selectedLesson,setSelectedLesson] = useState(null);

  const [lessonStep,setLessonStep] = useState(null);
  const [isLessonStart,setIsLessonStart] = useState(false);

  const [showErrorMsgNo,setShowErrorMsgNo] = useState(0)

  const [safetyStep,setSafetyStep] = useState(0);

  const [showRedLitmusArrow,setShowRedLitmusArrow] = useState(false);
  const [isTutorialMode,setIsTutorialMode] = useState(null)

  return (
    <MainGuidelineContext.Provider
      value={{ 
        isMainGuideline,setIsMainGuideline,
        selectedMainGuideline,setSelectedMainGuideline,
        
        showArrrowChair,setShowArrowChair,
        showLessonMenu,setShowLessonMenu,
        selectedLesson,setSelectedLesson,
        lessonStep,setLessonStep,
        isLessonStart,setIsLessonStart,
        showNormalBeakerArrow,setShowNormalBeakerArrow,
        showErrorMsgNo,setShowErrorMsgNo,
        showGogglesArrow,setshowGogglesArrow,
        showLeftGloveArrow,setShowLeftGloveArrow,
        showRightGloveArrow,setShowRightGloveArrow,
        showRedLitmusArrow,setShowRedLitmusArrow,
        safetyStep,setSafetyStep,
        isTutorialMode,setIsTutorialMode,
        showConicalArrow,setShowArrowConicalArrow,
        showSpoonArrow,setShowSpoonArrow
      }}
    >
      {children}
    </MainGuidelineContext.Provider>
  )
}