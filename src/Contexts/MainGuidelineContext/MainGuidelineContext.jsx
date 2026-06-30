import { createContext, useRef, useState } from 'react'

export const MainGuidelineContext = createContext()

export const MainGuidelineProvider = ({ children }) => {

  const [isMainGuideline,setIsMainGuideline] = useState(true)
  const [selectedMainGuideline,setSelectedMainGuideline] = useState(1);

  const [showArrrowChair,setShowArrowChair] = useState(true);

  const [setShowLessonMenu,showLessonMenu] = useState(false);

  return (
    <MainGuidelineContext.Provider
      value={{ 
        isMainGuideline,setIsMainGuideline,
        selectedMainGuideline,setSelectedMainGuideline,
        
        showArrrowChair,setShowArrowChair,
        showLessonMenu,setShowLessonMenu
      }}
    >
      {children}
    </MainGuidelineContext.Provider>
  )
}