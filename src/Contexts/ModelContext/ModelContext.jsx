import { createContext, useRef } from 'react'

export const ModelContext = createContext()

export const ModelProvider = ({ children }) => {
  const chairRef = useRef(null);
  const gogglesRef = useRef(null);

  return (
    <ModelContext.Provider
      value={{
        chairRef,
        gogglesRef
      }}
    >
      {children}
    </ModelContext.Provider>
  )
}