import { createContext, useRef, useState } from 'react'

export const ReactionContext = createContext()

export const ReactionProvider = ({ children }) => {
  
   const [isSaltWaterReaction,setIsSaltWaterReaction] = useState(false);
   const [isHclUniversal, setIsHclUniversal] = useState(false);
   const [isNaohUniversal,setIsNaohUniversal] = useState(false);
   const [isStarchIodine,setIsStarchIodine] = useState(false);
   const [isCopperSulfateNaoh,setIsCopperSulfateNaoh] = useState(false);
   
   const stirrLiquidRef = useRef(null)

  return (
    <ReactionContext.Provider
      value={{
        isSaltWaterReaction,setIsSaltWaterReaction,
        stirrLiquidRef,
        isHclUniversal, setIsHclUniversal,
        isNaohUniversal,setIsNaohUniversal,
        isStarchIodine,setIsStarchIodine,
        isCopperSulfateNaoh,setIsCopperSulfateNaoh
      }}
    >
      {children}
    </ReactionContext.Provider>
  )
}