import { createContext, useRef, useState } from 'react'

export const InteractionContext = createContext()

export const InteractionProvider = ({ children }) => {
  const hasSat = useRef(null);
  const gogglesOn = useRef(false);
  const glovesOn = useRef(false)

  const [selectedLeftHand,setSelectedLeftHand] = useState(false)
  const [selectedRightHand,setSelectedRightHand] = useState(false)


  return (
    <InteractionContext.Provider
      value={{
        hasSat,
        gogglesOn,
        glovesOn,
        selectedLeftHand,setSelectedLeftHand,
        selectedRightHand,setSelectedRightHand
      }}
    >
      {children}
    </InteractionContext.Provider>
  )
}