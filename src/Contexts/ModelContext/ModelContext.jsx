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
  const mainDropperRef = useRef(null);
  const mainPolystereneRef = useRef(null)
  const pottasiumCarbonateContainerRef = useRef(null)
  const digitalBalanceRef = useRef(null);
  const testube01CapRef = useRef(null);
  const mainBuiretteRef = useRef(null);
  const buretteClampRef = useRef(null);
  const mainThermometerRef = useRef(null);
  const mainPolysterene2Ref = useRef(null);
  const mainPolystereneLid = useRef(null);
  const potassiumHydrogenCarbonateRef = useRef(null);
  const kettleRef = useRef(null)

  const normalBeakerLiquidRef = useRef(null);
  const conicalBeakerLiquidRef = useRef(null);
  const thermometerLiquidRef = useRef(null)

  const saltRef = useRef(null);

  const normalPrecipitateRef = useRef(null)

  const arrowChairRef = useRef(null);
  const arrowNormalBeakerRef = useRef(null);
  const arrowConicalFlaskRef = useRef(null)
  const arrowGogglesRef = useRef(null);
  const arrowLeftGloveRef = useRef(null);
  const arrowRightGloveRef = useRef(null);
  const arrowRedLitmusRef = useRef(null);
  const arrowSpoonRef = useRef(null);
  const arrowSaltContainerRef = useRef(null);
  const arrowDropperRef = useRef(null)
  const arrowTestube01Ref = useRef(null)
  const arrowTestube02Ref = useRef(null)
  const arrowPolystereneRef = useRef(null)
  const arrowPottasiumCarbonateRef = useRef(null);
  const arrowBalanceRef = useRef(null);
  const arrowBuirette = useRef(null);
  const arrowBuretteClampRef = useRef(null);
  const arrowThermometerRef = useRef(null);
  const arrowLidPolysterene = useRef(null);
  const arrowPotassiumHydrogenCarbonateRef = useRef(null)
  const arrowKettleRef = useRef()
  const saltContainerRef = useRef(null)
  const balancePositionRef = useRef(null)
  const trayPointRef = useRef(null)

  const [dropperAnimationAction,setDropperAnimationAction] = useState(null)
 
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
        funnelRef,      
        mainDropperRef,  
        arrowChairRef,arrowNormalBeakerRef,
        arrowGogglesRef,arrowLeftGloveRef,arrowRightGloveRef,
        arrowRedLitmusRef,
        normalPrecipitateRef,
        arrowConicalFlaskRef,
        arrowSpoonRef,
        saltContainerRef,
        arrowSaltContainerRef,
        arrowDropperRef,
        arrowTestube01Ref,arrowTestube02Ref,
        dropperAnimationAction,setDropperAnimationAction,
        arrowPolystereneRef,mainPolystereneRef,
        pottasiumCarbonateContainerRef,
        arrowPottasiumCarbonateRef,
        digitalBalanceRef,arrowBalanceRef,
        balancePositionRef,trayPointRef,
        testube01CapRef,mainBuiretteRef,
        arrowBuirette,buretteClampRef,
        arrowBuretteClampRef,mainThermometerRef,
        arrowThermometerRef,
        mainPolysterene2Ref,thermometerLiquidRef,
        mainPolystereneLid,arrowLidPolysterene,
        potassiumHydrogenCarbonateRef,arrowPotassiumHydrogenCarbonateRef,
        kettleRef,arrowKettleRef
      }}
    >
      {children}
    </ModelContext.Provider>
  )
}