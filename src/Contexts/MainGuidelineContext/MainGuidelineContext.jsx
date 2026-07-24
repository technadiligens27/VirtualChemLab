import { createContext, useState ,useRef} from "react"

export const MainGuidelineContext = createContext()

export const MainGuidelineProvider = ({ children }) => {
  const [isMainGuideline, setIsMainGuideline] = useState(true)
  const [selectedMainGuideline, setSelectedMainGuideline] = useState(1)

  const [showArrrowChair, setShowArrowChair] = useState(true)
  const [showNormalBeakerArrow, setShowNormalBeakerArrow] = useState(false)
  const [showGogglesArrow, setshowGogglesArrow] = useState(false)
  const [showLeftGloveArrow, setShowLeftGloveArrow] = useState(false)
  const [showRightGloveArrow, setShowRightGloveArrow] = useState(false)
  const [showConicalArrow, setShowArrowConicalArrow] = useState(false)
  const [showSpoonArrow, setShowSpoonArrow] = useState(false);
  const [showPolystereneArrow,setShowPolystereneArrow] = useState(false)

  const [showLessonMenu, setShowLessonMenu] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState(null)

  const [lessonStep, setLessonStep] = useState(null)
  const [isLessonStart, setIsLessonStart] = useState(false)

  const [showErrorMsgNo, setShowErrorMsgNo] = useState(0)
  const [safetyStep, setSafetyStep] = useState(0)

  const [showRedLitmusArrow, setShowRedLitmusArrow] = useState(false)
  const [isTutorialMode, setIsTutorialMode] = useState(null)

  const [showSaltContainerArrow, setShowSaltContainerArrow] = useState(false);
  const [showTestube01Arrow,setShowTestube01Arrow] = useState(false)

  const [showDropperArrow,setShowDropperArrow] = useState(false)

  const [labResetKey, setLabResetKey] = useState(0)
  const labResetVersionRef = useRef(0)

  const resetLessonGuidelines = () => {
    labResetVersionRef.current += 1
    setLabResetKey(labResetVersionRef.current)
    // Stop the current lesson
    setSelectedLesson(null)
    setLessonStep(null)
    setIsLessonStart(false)

    // Remove error messages
    setShowErrorMsgNo(0)

    // Reset lesson safety step
    setSafetyStep(4)

    // Hide all arrows
    setShowArrowChair(false)
    setShowNormalBeakerArrow(false)
    setshowGogglesArrow(false)
    setShowLeftGloveArrow(false)
    setShowRightGloveArrow(false)
    setShowArrowConicalArrow(false)
    setShowSpoonArrow(false)
    setShowRedLitmusArrow(false)
    setShowSaltContainerArrow(false)

    // Open the lesson menu
    setIsMainGuideline(true)
    setSelectedMainGuideline(5)
    setShowLessonMenu(true)
    setIsTutorialMode(true);
    setShowTestube01Arrow(false);
    setShowDropperArrow(false)
    // Restart interaction components
    
  }

  return (
    <MainGuidelineContext.Provider
      value={{
        isMainGuideline,
        setIsMainGuideline,

        selectedMainGuideline,
        setSelectedMainGuideline,

        showArrrowChair,
        setShowArrowChair,

        showLessonMenu,
        setShowLessonMenu,

        selectedLesson,
        setSelectedLesson,

        lessonStep,
        setLessonStep,

        isLessonStart,
        setIsLessonStart,

        showNormalBeakerArrow,
        setShowNormalBeakerArrow,

        showErrorMsgNo,
        setShowErrorMsgNo,

        showGogglesArrow,
        setshowGogglesArrow,

        showLeftGloveArrow,
        setShowLeftGloveArrow,

        showRightGloveArrow,
        setShowRightGloveArrow,

        showRedLitmusArrow,
        setShowRedLitmusArrow,

        safetyStep,
        setSafetyStep,

        isTutorialMode,
        setIsTutorialMode,

        showConicalArrow,
        setShowArrowConicalArrow,

        showSpoonArrow,
        setShowSpoonArrow,

        showSaltContainerArrow,
        setShowSaltContainerArrow,

        labResetKey,
        setLabResetKey,

        resetLessonGuidelines,
        labResetVersionRef,

        showTestube01Arrow,
        setShowTestube01Arrow,

        showDropperArrow,
        setShowDropperArrow,

        showPolystereneArrow,
        setShowPolystereneArrow
      }}
    >
      {children}
    </MainGuidelineContext.Provider>
  )
}