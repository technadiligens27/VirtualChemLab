import { createContext, useRef, useState } from 'react'

export const ModelContext = createContext()

export const ModelProvider = ({ children }) => {
  const chairRef = useRef(null);
  const gogglesRef = useRef(null);
  const [isSitting, setIsSitting] = useState(false)

  return (
    <ModelContext.Provider
      value={{ 
        chairRef,
        gogglesRef,
        isSitting, setIsSitting
      }}
    >
      {children}
    </ModelContext.Provider>
  )
}