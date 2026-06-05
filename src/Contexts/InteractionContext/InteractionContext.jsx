import { createContext, useRef } from 'react'

export const InteractionContext = createContext()

export const InteractionProvider = ({ children }) => {
  const hasSat = useRef(null);
  const gogglesOn = useRef(false)

  return (
    <InteractionContext.Provider
      value={{
        hasSat,
        gogglesOn
      }}
    >
      {children}
    </InteractionContext.Provider>
  )
}