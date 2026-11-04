import { createContext, useRef, useState } from "react"

export const ReactionContext = createContext()

export const ReactionProvider = ({ children }) => {
  const [isSaltWaterReaction, setIsSaltWaterReaction] =
    useState(false)

  const [isHclUniversal, setIsHclUniversal] =
    useState(false)

  const [isNaohUniversal, setIsNaohUniversal] =
    useState(false)

  const [isStarchIodine, setIsStarchIodine] =
    useState(false)

  const [
    isCopperSulfateNaoh,
    setIsCopperSulfateNaoh,
  ] = useState(false)

  const [isAcidBase, setIsAcidBase] =
    useState(false);

  const [isBiuretReaction,setIsBiuretReaction] = useState(false)  

  const stirrLiquidRef = useRef(null)
  const isReactionRef = useRef(false)

  const resetReactions = () => {
    setIsSaltWaterReaction(false)
    setIsHclUniversal(false)
    setIsNaohUniversal(false)
    setIsStarchIodine(false)
    setIsCopperSulfateNaoh(false)
    setIsAcidBase(false);
    setIsBiuretReaction(false)

    stirrLiquidRef.current = null
    isReactionRef.current = false
  }

  return (
    <ReactionContext.Provider
      value={{
        isSaltWaterReaction,
        setIsSaltWaterReaction,

        isHclUniversal,
        setIsHclUniversal,

        isNaohUniversal,
        setIsNaohUniversal,

        isStarchIodine,
        setIsStarchIodine,

        isCopperSulfateNaoh,
        setIsCopperSulfateNaoh,

        isAcidBase,
        setIsAcidBase,

        isBiuretReaction,
        setIsBiuretReaction,

        stirrLiquidRef,
        isReactionRef,

        resetReactions,
      }}
    >
      {children}
    </ReactionContext.Provider>
  )
}