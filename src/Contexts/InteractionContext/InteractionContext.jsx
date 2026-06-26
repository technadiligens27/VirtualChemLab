import { createContext, useRef, useState } from 'react'

export const InteractionContext = createContext()

export const InteractionProvider = ({ children }) => {
  
  const hasSat = useRef(null);
  const gogglesOn = useRef(false);
  const glovesOn = useRef(false)

  const [selectedLeftHand,setSelectedLeftHand] = useState(false);
  const [selectedRightHand,setSelectedRightHand] = useState(false);

  const [isFillBeakerBoxOpen, setIsFillBeakerBoxOpen] = useState(false);
  const [isFillUpBeaker,setIsFillUpBeaker] = useState(false);
  const [fillBeakerHand,setFillBeakerHand] = useState(null);
  const [selectedBeakerBoxHand,setSelectedBeakerBoxHand] = useState(null)

  const [isDragging,setIsDragging] = useState(null);
  const [isPouringMode,setIsPouringMode] = useState(false);

  const [pouredFromLeft,setPouredFromLeft] = useState(false);
  const [pouredFromRight,setPouredFromRight] = useState(false);

  const [pourAmount,setPourAmount] = useState(null);
  const [rightBeakerFillData, setRightBeakerFillData] = useState({
    name: "",
    color: "",
    amount: 0,
  })

  const [leftBeakerFillData, setLeftBeakerFillData] = useState({
    name: "",
    color: "",
    amount: 0,
  })

  const [isReaction,setIsReaction] = useState(false);
  const [isStirMode,setIsStirMode] = useState(false);
  const [isStirring,setIsStirring] = useState(false);

  const [isLitmusMode,setIsLitmusMode] = useState(false);

  const [isFilterFolded,setIsFilterFolded] = useState(false)


  return (
    <InteractionContext.Provider
      value={{
        hasSat,
        gogglesOn,
        glovesOn,
        selectedLeftHand,setSelectedLeftHand,
        selectedRightHand,setSelectedRightHand,
        isFillBeakerBoxOpen,setIsFillBeakerBoxOpen,
        isFillUpBeaker,setIsFillUpBeaker,
        fillBeakerHand,setFillBeakerHand,
        isDragging,setIsDragging,
        isPouringMode,setIsPouringMode,
        pourAmount,setPourAmount,
        rightBeakerFillData, setRightBeakerFillData,
        leftBeakerFillData, setLeftBeakerFillData,
        selectedBeakerBoxHand,setSelectedBeakerBoxHand,
        pouredFromLeft,setPouredFromLeft,
        isReaction,setIsReaction,
        pouredFromRight,setPouredFromRight,
        isStirMode,setIsStirMode,
        isStirring,setIsStirring,
        isLitmusMode,setIsLitmusMode,
        isFilterFolded,setIsFilterFolded        
      }}
    >
      {children}
    </InteractionContext.Provider>
  )
}