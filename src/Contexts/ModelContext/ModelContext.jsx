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
  const graduatedBeakerRef = useRef(null);
  const spoonRef = useRef(null);
  const redLitmusRef = useRef(null);
  const blueLitmusRef = useRef(null);
  const testube01Ref = useRef(null);
  const testube02Ref = useRef(null);
  const testube03Ref = useRef(null);
  const filterPaperRef = useRef(null);
  const filterFoldedPaperRef = useRef(null);
  const funnelRef = useRef(null)

  const normalBeakerLiquidRef = useRef(null);
  const conicalBeakerLiquidRef = useRef(null);
  const saltRef = useRef(null);

  const arrowChairRef = useRef(null);

  

  return (
    <ModelContext.Provider
      value={{ 
        chairRef,
        gogglesRef,
        gloverightRef,gloveleftRef,
        normalBeakerRef,conicalBeakerRef,roundBeakerRef,graduatedBeakerRef,
        normalBeakerLiquidRef,conicalBeakerLiquidRef,
        spoonRef,saltRef,
        redLitmusRef,blueLitmusRef,
        testube01Ref,testube02Ref,testube03Ref,
        filterPaperRef,filterFoldedPaperRef,
        funnelRef,arrowChairRef
      }}
    >
      {children}
    </ModelContext.Provider>
  )
}