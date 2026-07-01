import { createContext, useRef, useState } from 'react'

export const MainGuidelineContext = createContext()

export const MainGuidelineProvider = ({ children }) => {

  const [isMainGuideline,setIsMainGuideline] = useState(true)
  const [selectedMainGuideline,setSelectedMainGuideline] = useState(1);

  const [showArrrowChair,setShowArrowChair] = useState(true);
  const [showNormalBeakerArrow,setShowNormalBeakerArrow] = useState(false)

  const [showLessonMenu, setShowLessonMenu] = useState(false)
  const [selectedLesson,setSelectedLesson] = useState(null);

  const [lessonStep,setLessonStep] = useState(null);
  const [isLessonStart,setIsLessonStart] = useState(false)

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
        showNormalBeakerArrow,setShowNormalBeakerArrow
      }}
    >
      {children}
    </MainGuidelineContext.Provider>
  )
}