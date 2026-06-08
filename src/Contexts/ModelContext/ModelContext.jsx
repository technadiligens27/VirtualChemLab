import { createContext, useRef, useState } from 'react'

export const ModelContext = createContext()

export const ModelProvider = ({ children }) => {
  const chairRef = useRef(null);
  const gogglesRef = useRef(null);
  const gloveleftRef = useRef(null);
  const gloverightRef = useRef(null);
  const normalBeakerRef = useRef(null);
  const conicalBeakerRef = useRef(null);
  const roundBeakerRef = useRef(null);
  const graduatedBeakerRef = useRef(null)

  const [isSitting, setIsSitting] = useState(false);

  return (
    <ModelContext.Provider
      value={{ 
        chairRef,
        gogglesRef,
        gloverightRef,gloveleftRef,
        normalBeakerRef,conicalBeakerRef,roundBeakerRef,graduatedBeakerRef,
        isSitting, setIsSitting
      }}
    >
      {children}
    </ModelContext.Provider>
  )
}