import { createContext, useContext, useRef, useState } from 'react'

export const InteractionContext = createContext()

export const InteractionProvider = ({ children }) => {
  
  const hasSat = useRef(null);
  const gogglesOn = useRef(false);
  const glovesOn = useRef(false)

  const [isSitting,setIsSitting] = useState(false)

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

  const [isFilterFolded,setIsFilterFolded] = useState(false);
  const [isFilterInFunnel,setIsFilterInFunnel] = useState(false);
  const [isFunnelMode,setIsFunnelMode] = useState(false);

  const [clickedModel,setClickedModel] = useState(null);
  const [isObjectInfo,setIsObjectInfo] = useState(false);

  const selectedModelLeft = useRef(null);
  const selectedModelRight = useRef(null);

  const liquidLeftModel = useRef(null);
  const liquidRightModel = useRef(null);

  const [isPouring, setIsPouring] = useState(false);

  const [chairStep,setChairStep] = useState(0);
  const [pouringModeHand,setPouringModeHand] = useState(null);

  const [spoonHasSalt, setSpoonHasSalt] = useState(false);
  const [isAddSalt,setIsAddSalt] = useState(false);

  const [isDropperPlaced,setIsDropperPlaced] = useState(false)

  const resetInteractions = () => {
  // Empty both hands
  setSelectedLeftHand(false)
  setSelectedRightHand(false)

  selectedModelLeft.current = null
  selectedModelRight.current = null

  // Close the fill-beaker UI
  setIsFillBeakerBoxOpen(false)
  setIsFillUpBeaker(false)
  setFillBeakerHand(null)
  setSelectedBeakerBoxHand(null)

  // Reset dragging and object information
  setIsDragging(null)
  setClickedModel(null)
  setIsObjectInfo(false)

  // Reset pouring
  setIsPouringMode(false)
  setIsPouring(false)
  setPouringModeHand(undefined)

  setPouredFromLeft(false)
  setPouredFromRight(false)
  setPourAmount(null)

  // Reset the liquids
  setRightBeakerFillData({
    name: "",
    color: "",
    amount: 0,
  })

  setLeftBeakerFillData({
    name: "",
    color: "",
    amount: 0,
  })

  liquidLeftModel.current = null
  liquidRightModel.current = null

  // Reset reaction and stirring
  setIsReaction(false)
  setIsStirMode(false)
  setIsStirring(false)

  // Reset litmus mode
  setIsLitmusMode(false)

  // Reset filter and funnel
  setIsFilterFolded(false)
  setIsFilterInFunnel(false)
  setIsFunnelMode(false)

  // Reset salt and spoon
  setSpoonHasSalt(false)
  setIsAddSalt(false);
  setIsSitting(true);
  setChairStep(0)
}

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
        isFilterFolded,setIsFilterFolded,
        isFilterInFunnel,setIsFilterInFunnel,
        isFunnelMode,setIsFunnelMode,
        isSitting,setIsSitting,
        clickedModel,setClickedModel,
        isObjectInfo,setIsObjectInfo,
        selectedModelLeft,selectedModelRight,
        liquidLeftModel,liquidRightModel,
        isPouring, setIsPouring,
        chairStep,setChairStep,
        pouringModeHand,setPouringModeHand,
        spoonHasSalt, setSpoonHasSalt,
        isAddSalt,setIsAddSalt,resetInteractions,
        isDropperPlaced,setIsDropperPlaced
      }}
    >
      {children}
    </InteractionContext.Provider>
  )
}