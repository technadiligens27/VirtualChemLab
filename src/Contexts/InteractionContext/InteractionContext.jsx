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

  const [isDragging,setIsDragging] = useState(null);
  const [isPouringMode,setIsPouringMode] = useState(false);

  const [pourAmount,setPourAmount] = useState(null);

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
        pourAmount,setPourAmount

      }}
    >
      {children}
    </InteractionContext.Provider>
  )
}