import { createContext, useContext, useRef, useState } from 'react'

export const InteractionContext = createContext()

export const InteractionProvider = ({ children }) => {
  
  const hasSat = useRef(null);
  const gogglesOn = useRef(false);
  const glovesOn = useRef(false)

  const [isSitting,setIsSitting] = useState(false)

  const [selectedLeftHand,setSelectedLeftHand] = useState(false);
  const [selectedRightHand,setSelectedRightHand] = useState(false);

  const [isFillBeakerBoxOpen, setIsFillBeakerBoxOpen] = useState(false);
  const [isFillUpBeaker,setIsFillUpBeaker] = useState(false);
  const [fillBeakerHand,setFillBeakerHand] = useState(null);
  const [selectedBeakerBoxHand,setSelectedBeakerBoxHand] = useState(null)

  const [isDragging,setIsDragging] = useState(null);
  const [isPouringMode,setIsPouringMode] = useState(false);

  const [pouredFromLeft,setPouredFromLeft] = useState(false);
  const [pouredFromRight,setPouredFromRight] = useState(false);

  const [pourAmount,setPourAmount] = useState(null);
  const [rightBeakerFillData, setRightBeakerFillData] = useState({
    name: "",
    color: "",
    amount: 0,
  })

  const [leftBeakerFillData, setLeftBeakerFillData] = useState({
    name: "",
    color: "",
    amount: 0,
  })

  const [isReaction,setIsReaction] = useState(false);
  const [isStirMode,setIsStirMode] = useState(false);
  const [isStirring,setIsStirring] = useState(false);

  const [isLitmusMode,setIsLitmusMode] = useState(false);

  const [isFilterFolded,setIsFilterFolded] = useState(false);
  const [isFilterInFunnel,setIsFilterInFunnel] = useState(false);
  const [isFunnelMode,setIsFunnelMode] = useState(false);

  const [clickedModel,setClickedModel] = useState(null);
  const [isObjectInfo,setIsObjectInfo] = useState(false);

  const selectedModelLeft = useRef(null);
  const selectedModelRight = useRef(null);

  const liquidLeftModel = useRef(null);
  const liquidRightModel = useRef(null);

  const [isPouring, setIsPouring] = useState(false);

  const [chairStep,setChairStep] = useState(0);
  const [pouringModeHand,setPouringModeHand] = useState(null);

  const [spoonHasSalt, setSpoonHasSalt] = useState(false);
  const [isAddSalt,setIsAddSalt] = useState(false);

  const [isDropperPlaced,setIsDropperPlaced] = useState(false);
  const [isDropperFilled,setIsDropperFilled] = useState(false);

  const [isPlacePolysterene,setIsPlacePolysterene] = useState(false);

  const [isPottasiumCarobnateInSpoon,setIsPottasiumCarobnateInSpoon] = useState(false);
  
  const [isPourIntoTestube,setIsPourIntoTestube] = useState(false)

  const [isPotassiumTransferred,setIsPotassiumTransferred] = useState(false);

  const [isBalancePlaced,setIsBalancePlaced] = useState(false)
  const [isWeighTestube,setIsWeighTestube] = useState(false)

  const [isBuirettePourMode,setIsBuirettePourMode] = useState(false);
  const [isBuiretteClamped,setIsBuiretteClamped] = useState(false);

  const [isClampInCenter,setIsClampInCenter] = useState(false);
  const [isBeakerNearClamp,setIsBeakerNearClamp] = useState(false);

  const [isPlaceThermometer,setIsPlaceThermometer] = useState(false);
  const [isPolystereneStirMode,setIsPolystereneStirMode] = useState(false);

  const [isPottasiumCarobnateInTestube01,setIsPottasiumCarobnateInTestube01] =useState(false);

  const [isThermometerRisen,setIsThermometerRisen] = useState(false);

  const [isHessGuideline,setIsHessGuideline] = useState(false);
  const [hessGuidelineNumber,setHessGuidelineNumber] = useState(false);

  const [showEnthalyResultOne,setShowEnthalyResultOne] = useState(false);
  const [showBubbles,setShowBubbles] = useState(false);

  const [showPolystereneLidArrow,setShowPolystereneLidArrow] = useState(false);

  const [isPolystereneCovered,setIsPolystereneCovered] = useState(false);

  const [isPotassiumHydrogenCarbonateInSpoon,setIsPotassiumHydrogenCarbonateInSpoon] = useState(false);

  const [fillBeakerLiquid,setFillBeakerLiquid] = useState(false);
  const [fillTestubeLiquid,setFillTestubeLiquid] = useState(false)

  const [beakerFillFinished,setBeakerFillFinished] = useState(false);

  const [fillBeakerModel,setFillBeakerModel] = useState(false);

  const [isPipetteMode,setIsPipetteMode] = useState(false);

  const [fillPippette,setFillPipette] = useState(false);
  const [pipetteDroplet,setPipetteDroplet] = useState(false);
  const [isPipetteFilled,setIsPipetteFilled] = useState(false);

  const [testubesInBeaker, setTestubesInBeaker] = useState({
      tube1: false,
      tube2: false,
      tube3: false,
    })

  const [isAddMoreLiquid,setIsAddMoreLiquid] = useState(false);
  const [isReactionTimerRunning,setIsReactionTimerRunning] = useState(false)

  const [showIodobutanePrecipitate,setShowIodobutanePrecipitate] = useState(false);
  const [showBromobutanePrecipitate,setShowBromobutanePrecipitate] = useState(false);
  const [showChlorobutanePrecipitate,setShowChlorobutanePrecipitate]  = useState(false);

  const [shouldResetRotation, setShouldResetRotation] = useState(false);

  const [isVolumetricPipetteMode,setIsVolumetricPipetteMode] = useState(false)
  const [isVolumetricPipetteFilled,setIsVolumetricPipetteFilled] = useState(false);
  const [fillVolumetricPipette,setFillVolumetricPipette] = useState(false);
  const [pourFromVolumetricPipette,setPourFromVolumetricPipette] = useState(false);

  const [isPhenopthalinePourMode,setIsPhenopthalinePourMode] = useState(false);
  const [pourDroplets,setPourDroplets] = useState(false)

  const [showHCLTitrationReaction,setShowHCLTitrationReaction] = useState(false)

  const [isCleanBeaker,setIsCleanBeaker] = useState(false)

  const [isSulfamicInSpoon,setIsSulfamicInSpoon] = useState(false);
  const [isFillToMark,setIsFillToMark] = useState(null);

  const [isPouringModeFunnelMode,setIsPouringModeFunnelMode] = useState(false);

  const [showSulfamicAcidNaOHTitration,setShowSulfamicAcidNaOHTitration] = useState(false);

  const [showEnthalyResultTwo,setShowEnthalyResultTwo] = useState(false)
  const [showQuestionCardNo,setShowQuestionCardNo] = useState(null)

  const [isClampTestube,setIsClampTestube] = useState(false);

  const [isInvertCylinder,setIsInvertCylinder] = useState(false);
  const [isModelCentre,setIsModelCentre] = useState(false)

  const [isDeliveryTubeConnected,setIsDeliveryTubeConnected] = useState(false);
  const [isPourModeDeliveryTube,setIsPourModeDeliveryTube] = useState(false);

  const [isMolarVolumeReaction,setIsMolarVolumeReaction] = useState(false);

  const [deliveryAnimationActions, setDeliveryAnimationActions] = useState({
    deliveryGas01: null,
    deliveryGas02: null,
    deliveryGas03:null
  })
  
  const [concialGasAnimationActions, setConcialGasAnimationAction] = useState({
    conicalGas01: null,
    conicalGas02: null,
    conicalGas03:null
  })
  const [distillationGasAnimationActions, setDistillationGasAnimationActions] = useState({
    distillationGas01: null,
    distillationGas02: null,
    distillationGas03:null
  })
  const [isAddFunnelToMode,setIsAddFunnelToMode] = useState(false);
  const [isPlaceInMantle,setIsPlaceInMantle] = useState(false);

  const [isAddDistillationHead,setIsAddDistillationHead] = useState(false);
  const [isInsertThermometer,setIsInsertThermometer] = useState(false);
  const [isInsertCondensor,setIsInsertCondensor] = useState(false);

  const [isFillCondensor,setIsFillCondensor] = useState(false);
  const [isMantleTurnedOn,setIsMantleTurnedOn] = useState(false);
  const [isAddWarmWater,setIsAddWarmWater] = useState(false)
  const [isPlaceModelInBeaker,setIsPlaceModelInBeaker] = useState(false)

  const [isChlorideIonReaction,setIsChlorideIonReaction] = useState(false);

  const [isModelInHeatingMat,setIsModelInHeatingMat] = useState(false);
  const [isDipMode,setIsDipMode] = useState(false);
  const [showBunsenFlame,setShowBunsenFlame] = useState(false);

  const [showPowderBox,setShowPowderBox] = useState(false);
  const [selectedPowder,setSelectedPowder] = useState(null);

  const [showPowderInContainer,setShowPowderInContainer] = useState(false);
  const [isAirHoleOpen,setIsAirHoleOpen] = useState(false);

const [molarVolumeResultsState,setMolarVolumeResultsState] = useState({
  resultSetIndex: 0,
  visibleResultCount: 1,
  isAutoSimulating: false,
})  

const resetInteractions = () => {
  // =======================================================
  // REFS
  // =======================================================

  hasSat.current = true

  gogglesOn.current = false
  glovesOn.current = false

  selectedModelLeft.current = null
  selectedModelRight.current = null

  liquidLeftModel.current = null
  liquidRightModel.current = null

  // =======================================================
  // PLAYER / HANDS
  // =======================================================

  setIsSitting(true)

  setSelectedLeftHand(false)
  setSelectedRightHand(false)

setChairStep(0)
  // =======================================================
  // FILL BEAKER UI
  // =======================================================

  setIsFillBeakerBoxOpen(false)
  setIsFillUpBeaker(false)
  setFillBeakerHand(null)
  setSelectedBeakerBoxHand(null)

  setFillBeakerLiquid(false)
  setFillTestubeLiquid(false)
  setBeakerFillFinished(false)
  setFillBeakerModel(false)

  // =======================================================
  // OBJECT INTERACTION
  // =======================================================

  setIsDragging(null)
  setClickedModel(null)
  setIsObjectInfo(false)

  // =======================================================
  // POURING
  // =======================================================

  setIsPouringMode(false)
  setIsPouring(false)
  setPouringModeHand(null)

  setPouredFromLeft(false)
  setPouredFromRight(false)

  setPourAmount(null)

  setRightBeakerFillData({
    name: "",
    color: "",
    amount: 0,
  })

  setLeftBeakerFillData({
    name: "",
    color: "",
    amount: 0,
  })

  // =======================================================
  // GENERAL REACTION / STIRRING
  // =======================================================

  setIsReaction(false)
  setIsStirMode(false)
  setIsStirring(false)
  setIsLitmusMode(false)

  setShowBubbles(false)
  setIsReactionTimerRunning(false)

  // =======================================================
  // FILTER / FUNNEL
  // =======================================================

  setIsFilterFolded(false)
  setIsFilterInFunnel(false)
  setIsFunnelMode(false)

  setIsPouringModeFunnelMode(false)
  setIsAddFunnelToMode(false)

  // =======================================================
  // SPOON / SOLIDS
  // =======================================================

  setSpoonHasSalt(false)
  setIsAddSalt(false)

  setIsPottasiumCarobnateInSpoon(false)
  setIsPottasiumCarobnateInTestube01(false)

  setIsPotassiumTransferred(false)

  setIsPotassiumHydrogenCarbonateInSpoon(false)

  setIsSulfamicInSpoon(false)

  // =======================================================
  // DROPPER
  // =======================================================

  setIsDropperPlaced(false)
  setIsDropperFilled(false)
  setPipetteDroplet(false)
  setPourDroplets(false)

  // =======================================================
  // POLYSTYRENE / THERMOMETER
  // =======================================================

  setIsPlacePolysterene(false)
  setShowPolystereneLidArrow(false)
  setIsPolystereneCovered(false)

  setIsPlaceThermometer(false)
  setIsPolystereneStirMode(false)
  setIsThermometerRisen(false)

  // =======================================================
  // BALANCE / BURETTE / CLAMP
  // =======================================================

  setIsBalancePlaced(false)
  setIsWeighTestube(false)

  setIsBuirettePourMode(false)
  setIsBuiretteClamped(false)

  setIsClampInCenter(false)
  setIsClampTestube(false)

  setIsBeakerNearClamp(false)

  // =======================================================
  // HESS LAW
  // =======================================================

  setIsHessGuideline(false)
  setHessGuidelineNumber(false)

  setShowEnthalyResultOne(false)
  setShowEnthalyResultTwo(false)

  // =======================================================
  // PIPETTE
  // =======================================================

  setIsPipetteMode(false)
  setFillPipette(false)
  setIsPipetteFilled(false)

  setIsVolumetricPipetteMode(false)
  setIsVolumetricPipetteFilled(false)
  setFillVolumetricPipette(false)
  setPourFromVolumetricPipette(false)

  // =======================================================
  // HYDROLYSIS LESSON
  // =======================================================

  setTestubesInBeaker({
    tube1: false,
    tube2: false,
    tube3: false,
  })

  setIsAddMoreLiquid(false)

  setShowIodobutanePrecipitate(false)
  setShowBromobutanePrecipitate(false)
  setShowChlorobutanePrecipitate(false)

  setShouldResetRotation(false)

  // =======================================================
  // TITRATION / SULFAMIC ACID
  // =======================================================

  setIsPhenopthalinePourMode(false)
  setShowHCLTitrationReaction(false)

  setIsCleanBeaker(false)
  setIsFillToMark(null)

  setShowSulfamicAcidNaOHTitration(false)

  // =======================================================
  // QUESTIONS
  // =======================================================

  setShowQuestionCardNo(null)

  // =======================================================
  // MOLAR VOLUME
  // =======================================================

  setIsInvertCylinder(false)
  setIsModelCentre(false)

  setIsDeliveryTubeConnected(false)
  setIsPourModeDeliveryTube(false)

  setIsMolarVolumeReaction(false)

  setDeliveryAnimationActions({
    deliveryGas01: null,
    deliveryGas02: null,
    deliveryGas03: null,
  })

  setConcialGasAnimationAction({
    conicalGas01: null,
    conicalGas02: null,
    conicalGas03: null,
  })

  // =======================================================
  // DISTILLATION
  // =======================================================

  setDistillationGasAnimationActions({
    distillationGas01: null,
    distillationGas02: null,
    distillationGas03: null,
  })

  setIsPlaceInMantle(false)

  setIsAddDistillationHead(false)
  setIsInsertThermometer(false)
  setIsInsertCondensor(false)

  setIsFillCondensor(false)
  setIsMantleTurnedOn(false)

  setIsAddWarmWater(false)
  setIsPlaceModelInBeaker(false)

  // =======================================================
  // CHLORIDE ION TEST
  // =======================================================

  setIsChlorideIonReaction(false)

  // =======================================================
  // FLAME TEST
  // =======================================================

  setIsModelInHeatingMat(false)
  setIsDipMode(false)

  setShowBunsenFlame(false)

  setShowPowderBox(false)
  setSelectedPowder(null)
  setShowPowderInContainer(false)
  setIsAirHoleOpen(false);
  setMolarVolumeResultsState({
  resultSetIndex: 0,
  visibleResultCount: 1,
  isAutoSimulating: false,
})

  
}
  return (
    <InteractionContext.Provider
      value={{
        hasSat,
        gogglesOn,
        glovesOn,
        selectedLeftHand,setSelectedLeftHand,
        selectedRightHand,setSelectedRightHand,
        isFillBeakerBoxOpen,setIsFillBeakerBoxOpen,
        isFillUpBeaker,setIsFillUpBeaker,
        fillBeakerHand,setFillBeakerHand,
        isDragging,setIsDragging,
        isPouringMode,setIsPouringMode,
        pourAmount,setPourAmount,
        rightBeakerFillData, setRightBeakerFillData,
        leftBeakerFillData, setLeftBeakerFillData,
        selectedBeakerBoxHand,setSelectedBeakerBoxHand,
        pouredFromLeft,setPouredFromLeft,
        isReaction,setIsReaction, 
        pouredFromRight,setPouredFromRight,
        isStirMode,setIsStirMode,
        isStirring,setIsStirring,
        isLitmusMode,setIsLitmusMode,
        isFilterFolded,setIsFilterFolded,
        isFilterInFunnel,setIsFilterInFunnel,
        isFunnelMode,setIsFunnelMode,
        isSitting,setIsSitting,
        clickedModel,setClickedModel,
        isObjectInfo,setIsObjectInfo,
        selectedModelLeft,selectedModelRight,
        liquidLeftModel,liquidRightModel,
        isPouring, setIsPouring,
        chairStep,setChairStep,
        pouringModeHand,setPouringModeHand,
        spoonHasSalt, setSpoonHasSalt,
        isAddSalt,setIsAddSalt,resetInteractions,
        isDropperPlaced,setIsDropperPlaced,
        isDropperFilled,setIsDropperFilled,
        isPlacePolysterene,setIsPlacePolysterene,
        isPottasiumCarobnateInSpoon,setIsPottasiumCarobnateInSpoon,
        isPourIntoTestube,setIsPourIntoTestube,
        isPotassiumTransferred,setIsPotassiumTransferred,
        isBalancePlaced,setIsBalancePlaced,
        isWeighTestube,setIsWeighTestube,
        isBuirettePourMode,setIsBuirettePourMode,
        isBuiretteClamped,setIsBuiretteClamped,
        isClampInCenter,setIsClampInCenter,
        isBeakerNearClamp,setIsBeakerNearClamp,
        setIsPlaceThermometer,isPlaceThermometer,
        isPolystereneStirMode,setIsPolystereneStirMode,
        isPottasiumCarobnateInTestube01,setIsPottasiumCarobnateInTestube01,
        isThermometerRisen,setIsThermometerRisen,
        isHessGuideline,setIsHessGuideline,
        hessGuidelineNumber,setHessGuidelineNumber,
        showEnthalyResultOne,setShowEnthalyResultOne,
        showBubbles,setShowBubbles,
        showPolystereneLidArrow,setShowPolystereneLidArrow,
        isPolystereneCovered,setIsPolystereneCovered,
        setIsPotassiumHydrogenCarbonateInSpoon,isPotassiumHydrogenCarbonateInSpoon,
        fillBeakerLiquid,setFillBeakerLiquid,beakerFillFinished,setBeakerFillFinished,
        fillBeakerModel,setFillBeakerModel,fillTestubeLiquid,setFillTestubeLiquid,
        isPipetteMode,setIsPipetteMode,
        fillPippette,setFillPipette,
        pipetteDroplet,setPipetteDroplet,
        isPipetteFilled,setIsPipetteFilled,
        testubesInBeaker,setTestubesInBeaker,
        isAddMoreLiquid,setIsAddMoreLiquid,
        isReactionTimerRunning,setIsReactionTimerRunning,
        showIodobutanePrecipitate,setShowIodobutanePrecipitate,
        shouldResetRotation, setShouldResetRotation,
        isVolumetricPipetteMode,setIsVolumetricPipetteMode,
        isVolumetricPipetteFilled,setIsVolumetricPipetteFilled,
        fillVolumetricPipette,setFillVolumetricPipette,
        pourFromVolumetricPipette,setPourFromVolumetricPipette,
        showBromobutanePrecipitate,setShowBromobutanePrecipitate,
        showChlorobutanePrecipitate,setShowChlorobutanePrecipitate,
        isPhenopthalinePourMode,setIsPhenopthalinePourMode,
        pourDroplets,setPourDroplets,
        showHCLTitrationReaction,setShowHCLTitrationReaction,
        isCleanBeaker,setIsCleanBeaker,
        isSulfamicInSpoon,setIsSulfamicInSpoon,
        isFillToMark,setIsFillToMark,
        isPouringModeFunnelMode,setIsPouringModeFunnelMode,
        showSulfamicAcidNaOHTitration,setShowSulfamicAcidNaOHTitration,
        showEnthalyResultTwo,setShowEnthalyResultTwo,
        showQuestionCardNo,setShowQuestionCardNo,
        isClampTestube,setIsClampTestube,
        isInvertCylinder,setIsInvertCylinder,
        isModelCentre,setIsModelCentre,
        isDeliveryTubeConnected,setIsDeliveryTubeConnected,
        isPourModeDeliveryTube,setIsPourModeDeliveryTube,
        isMolarVolumeReaction,setIsMolarVolumeReaction,
        deliveryAnimationActions,setDeliveryAnimationActions,
        concialGasAnimationActions, setConcialGasAnimationAction,
        isAddFunnelToMode,setIsAddFunnelToMode,
        isPlaceInMantle,setIsPlaceInMantle,
        isAddDistillationHead,setIsAddDistillationHead,
        isInsertThermometer,setIsInsertThermometer,
        isInsertCondensor,setIsInsertCondensor,isFillCondensor,setIsFillCondensor,
        isMantleTurnedOn,setIsMantleTurnedOn,distillationGasAnimationActions,setDistillationGasAnimationActions,
        isAddWarmWater,setIsAddWarmWater,isPlaceModelInBeaker,setIsPlaceModelInBeaker,
        isChlorideIonReaction,setIsChlorideIonReaction,
        isModelInHeatingMat,setIsModelInHeatingMat,
        setIsDipMode,isDipMode,showBunsenFlame,setShowBunsenFlame,
        showPowderBox,setShowPowderBox,selectedPowder,setSelectedPowder,showPowderInContainer,setShowPowderInContainer,
        isAirHoleOpen,setIsAirHoleOpen,molarVolumeResultsState,setMolarVolumeResultsState
      }}
    >
      {children}
    </InteractionContext.Provider>
  )
}