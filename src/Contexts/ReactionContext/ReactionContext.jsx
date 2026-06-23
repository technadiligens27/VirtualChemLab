import { createContext, useRef, useState } from 'react'

export const ReactionContext = createContext()

export const ReactionProvider = ({ children }) => {
  
   const [isSaltWaterReaction,setIsSaltWaterReaction] = useState(false);
   
   const stirrLiquidRef = useRef(null)

  return (
    <ReactionContext.Provider
      value={{
        isSaltWaterReaction,setIsSaltWaterReaction,
        stirrLiquidRef
      }}
    >
      {children}
    </ReactionContext.Provider>
  )
}