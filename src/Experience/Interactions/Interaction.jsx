import { useContext, useEffect } from "react";
import ChairSlide from "./ChairSlide/ChairSlide";
import GlovesPut from "./GlovesPut/GlovesPut";
import GogglesPut from "./GogglesPut/GogglesPut";
import ClickObject from "./ClickBeaker/ClickBeaker";
import FillUpBeaker from "./FillUpBeaker/FillUpBeaker";

import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext";
import { TransformControls } from "@react-three/drei";
import PouringMode from "./PouringMode/PouringMode";
import StirMode from "./StirMode/StirMode";
import FilterFunnelController from "./FilterFunnelController/FilterFunnelController";
import AllArrows from "../../UI/AllArrows/AllArrows";
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext";
import AddSaltToSpoon from "./AddSaltToSpoon/AddSaltToSpoon";
import AddPottasiumCarobnateToSpoon from "./AddPottasiumCarobnateToSpoon/AddPottasiumCarobnateToSpoon";
import PlaceDigitalBalance from "./PlaceDigitalBalance/PlaceDigitalBalance";
import WeighTestube from "./WeighTestube/WeighTestube";
import { ModelContext } from "../../Contexts/ModelContext/ModelContext";
import BalanceReading from "./BalanceReading/BalanceReading";
import ClampBurette from "./ClampBurette/ClampBurette";
import PlaceClampInCenter from "./PlaceClampInCenter/PlaceClampInCenter";
import PlaceBeakerNearClamp from "./PlaceBeakerNearClamp/PlaceBeakerNearClamp";
import PourFromBurette from "./PourFromBurrette/PourFromBurrette";
import PlaceThermometer from "./PlaceThermometer/PlaceThermometer";
import StirModePolysterene from "./StirModePolysterene/StirModePolysterene";
import FillThermometer from "./FillThermometer/FillThermometer";
import ReleaseGasBubbles from "../ReleaseGasBubbles/ReleaseGasBubbles";
import CoverPolysterene from "../../UI/CoverPolysterene/CoverPolysterene";
import StirUsingThermometer from "../StirUsingThermometer/StirUsingThermometer";
import PipetteMode from "./PipetteMode/PipetteMode";
import FillPipette from "./FillLiquid/FIllPipette/FIllPipette";
import PipetteDroplets from "./PipetteDroplets/PipetteDroplets";
import PlaceTestubeInBeaker from "./PlaceTestubeInBeaker/PlaceTestubeInBeaker";
import VolumetricPipetteMode from "./VolumetricPipetteMode/VolumetricPipetteMode";
import PhenopthalinePourMode from "./PhenopthalinePourMode/PhenopthalinePourMode";
import FillConicalBeaker from "./FillConicalBeaker/FillConicalBeaker";
import HCLTitrationReaction from "../AllReactions/HCLTitrationReaction/HCLTitrationReaction";
import CleanBeaker from "./CleanBeaker/CleanBeaker";
import ShowBeakerPrecipitate from "./ShowBeakerPrecipitate/ShowBeakerPrecipitate";
import SwirlModel from "./SwirlModel/SwirlModel";
import AddMoreLiquid from "./AddMoreLiquid/AddMoreLiquid";
import ScaleLiquid from "./ScaleLiquid/ScaleLiquid";
import FunnelMode from "./FunnelMode/FunnelMode";
import ClampModel from "./ClampModel/ClampModel";
import InvertCylinderModel from "./InvertCylinderModel/InvertCylinderModel";
import PlaceModelCentre from "./PlaceModelCentre/PlaceModelCentre";
import ConnectDeliveryTube from "./ConnectDeliveryTube/ConnectDeliveryTube";
import PourModeDeliveryTube from "./PourModeDeliveryTube/PourModeDeliveryTube";
import CalciumCarbonateMolarReaction from "../AllReactions/CalciumCarbonateMolarReaction/CalciumCarbonateMolarReaction";
import DeliveryTubeGasRise from "./DeliveryTubeGasRise/DeliveryTubeGasRise";
import ConicalGasCloud from "./ConicalGasCoud/ConicalGasCoud";
import ChlorinationLiquidColorChange from "./ChlorinationLiquidColorChange/ChlorinationLiquidColorChange";
import AddFunnelToModel from "./AddFunnelToModel/AddFunnelToModel";
import ChlorinationSeparatingFunnelColorChange from "./ChlorinationSeparatingFunnelColorChange/ChlorinationSeparatingFunnelColorChange";
import PourFromModel from "./Pouring/PourFromModel/PourFromModel";
import ShowPowderBottomOfModel from "./ShowPowderBottomOfModel/ShowPowderBottomOfModel";
import ControlLiquidOpacityofModel from "./ControlLiquidOpacityofModel/ControlLiquidOpacityofModel";
import PouringMode02 from "./PouringMode02/PouringMode02";
import KeepBackOnTable from "./KeepBackOnTable/KeepBackOnTable";
import PlaceModelinMantle from "./PlaceModelinMantle/PlaceModelinMantle";
import AdjustClampHandle from "./AdjustClampHandle/AdjustClampHandle";
import PlaceDistillationHead from "./PlaceDistillationHead/PlaceDistillationHead";
import InsertThermometer from "./InsertThermometer/InsertThermometer";
import InsertCondensor from "./InsertCondensor/InsertCondensor";
import FillCondensor from "./FillCondensor/FillCondensor";
import HeatingMantleSurfaceColourChange from "./HeatingMantleSurfaceColourChange/HeatingMantleSurfaceColourChange";
import DistillationGasAnimation from "./DistillationGasAnimation/DistillationGasAnimation";
import PourDropletsFromModel from "./PourDropletsFromModel/PourDropletsFromModel";
import FillConicalBeaker02 from "./FillConicalBeaker02Ref/FillConicalBeaker02Ref";
import DropperPlaced from "./DropperPlaced/DropperPlaced";
import PlaceModelInBeaker from "./PlaceModelInBeaker/PlaceModelInBeaker";
import ChlorideIonReaction from "../AllReactions/ChlorideIonReaction/ChlorideIonReaction";

const Interaction = () => {
  const {
    isFillUpBeaker,selectedRightHand,selectedLeftHand,fillBeakerHand,setIsDragging,isStirMode,isAddSalt,
    setIsAddSalt,isPottasiumCarobnateInSpoon,isBalancePlaced,isWeighTestube,isBuiretteClamped,
    setIsBuiretteClamped,isClampInCenter,isBeakerNearClamp,isPlaceThermometer,isPlacePolysterene,
     mainThermometerRef,setIsPolystereneStirMode,isPolystereneStirMode,showBubbles,isPolystereneCovered,setIsPolystereneCovered,
     isPotassiumHydrogenCarbonateInSpoon,isPipetteMode,fillPippette,pipetteDroplet,setFillPipette,TestubeInBeaker,setTestubeInBeaker,
     testubesInBeaker,isVolumetricPipetteMode,setIsVolumetricPipetteMode,setPourFromVolumetricPipette,isPhenopthalinePourMode
    ,showHCLTitrationReaction,isCleanBeaker,setIsCleanBeaker,isSulfamicInSpoon,isFillToMark,isFunnelMode,isClampTestube,
    isInvertCylinder,isModelCentre,setIsModelCentre,isDeliveryTubeConnected,setIsDeliveryTubeConnected,
    isPourModeDeliveryTube,setIsPourModeDeliveryTube,isMolarVolumeReaction,isAddFunnelToMode,isPotassiumTransferred,isPlaceInMantle,
    isAddDistillationHead,isInsertThermometer,isInsertCondensor,isFillCondensor,setIsFillCondensor,isMantleTurnedOn,isDropperPlaced,
    isAddWarmWater,isPlaceModelInBeaker,isChlorideIonReaction
  } = useContext(InteractionContext);

  const {testube01Ref,testube02Ref,digitalBalanceRef,normalBeakerRef,mainPolystereneRef,iodobutaneBottleRef,
          bromobutaneBottleRef,testube03Ref,chlorobutaneBottleRef,testube04Ref,testube05Ref,testube06Ref,volumetricRef,
        conicalBeakerRef,phenopthalineBottleRef,mainBuiretteRef,funnelRef,methylBottleRef,
        naohBottleRef,boilingTube01Ref,conicalBeakerRef02,seperatingFunnelRef,graduatedBeakerRef,roundBeakerRef,
        tableConicalPos,heatingMantleRef,condensorRef,pipetteRef,graduatedPipetteRef
      } = useContext(ModelContext)

  const {lessonStep,isTutorialMode,safetyStep,setLessonStep,selectedLesson} = useContext(MainGuidelineContext)

  // useEffect(()=>{
  //   console.log("fillPippette:",fillPippette)
  // },[fillPippette])


  const clickBeakerOption=()=>{
    if(isTutorialMode){
      if(!(safetyStep ===1 || safetyStep ===2 || safetyStep ===3)){
      return <ClickObject/>
    }
    }else{
      return <ClickObject/>
    }
    
  }

  useEffect(()=>{
    console.log('selectedLeftHand:',selectedLeftHand);
    console.log('selectedRightHand:',selectedRightHand);

  },[isPlacePolysterene,isPolystereneStirMode,selectedLeftHand,selectedRightHand])

useEffect(() => {
  const handleKeyDown = (event) => {
    if ( event.key.toLowerCase() === "p" && (
      (selectedLesson === 14.3 && [107].includes(lessonStep))
      )
   ) {
      setIsFillCondensor(true)
    }
  }
  window.addEventListener("keydown",handleKeyDown)
  return () => {
    window.removeEventListener("keydown",handleKeyDown)
  }
}, [selectedLesson,lessonStep])


  return (
    <>
      <GogglesPut/>
      <ChairSlide/>
      <GlovesPut/>
      {clickBeakerOption()}
      <FilterFunnelController/>
      <AllArrows/>
      {isAddSalt && <AddSaltToSpoon/>}      
      {isPottasiumCarobnateInSpoon && <AddPottasiumCarobnateToSpoon/>}
      {isPotassiumHydrogenCarbonateInSpoon && <AddPottasiumCarobnateToSpoon/>}
      {isSulfamicInSpoon && <AddPottasiumCarobnateToSpoon/>}

      {isBalancePlaced && <PlaceDigitalBalance/>}
      {isWeighTestube && ([8,9,12].includes(selectedLesson)) &&<WeighTestube testubeRef={testube01Ref}/>}
      {isWeighTestube && ([13].includes(selectedLesson)) &&<WeighTestube testubeRef={testube03Ref}/>}

      {/* {selectedLeftHand &&selectedRightHand && (<PouringMode hand={"right"}/>)} */}
      {/* {selectedLeftHand &&selectedRightHand && (<PouringMode hand={'left'}/>)} */}
      {selectedLesson===8  &&  <BalanceReading  balanceRef={digitalBalanceRef} isWeighTestube={isWeighTestube} finalMass={24.7}/>}

      {selectedLesson===9 &&  <BalanceReading   balanceRef={digitalBalanceRef}  isWeighTestube={isWeighTestube} finalMass={25.67}/>}

      {selectedLesson===12 && lessonStep===6 && <BalanceReading   balanceRef={digitalBalanceRef}  isWeighTestube={isWeighTestube} finalMass={21.72}/>}
      {selectedLesson===12 && (lessonStep===13 || lessonStep===14)  && <BalanceReading   balanceRef={digitalBalanceRef}  isWeighTestube={isWeighTestube} finalMass={24.22}/>}

      {selectedLesson===13 && lessonStep==24 && <BalanceReading   balanceRef={digitalBalanceRef}  isWeighTestube={isWeighTestube} finalMass={21.77}/>}
      {selectedLesson===13 && lessonStep==31 &&  <BalanceReading   balanceRef={digitalBalanceRef}  isWeighTestube={isWeighTestube} finalMass={21.72}/>}

      {isBuiretteClamped &&  <ClampBurette/>}
      
      {selectedLesson ==14.1 && isClampInCenter && <PlaceClampInCenter clampYOffset={6} 
        clampXScale = {0.8}
        clampYScale = {0.8}
        clampZScale = {0.8}/>}
      {selectedLesson ==14.2 && isClampInCenter && <PlaceClampInCenter 
      
        clampYOffset={6.5} 
        clampXScale = {0.8}
        clampYScale = {0.8}
        clampZScale = {0.8}
        clampScale={0.8}  />}

      {selectedLesson ==14.3  && lessonStep < 106.1   && isClampInCenter && <PlaceClampInCenter 
      
        clampYOffset={6.5} 
        clampXScale = {0.8}
        clampYScale = {0.8}
        clampZScale = {0.8}
        clampScale={0.8}  />} 

      {selectedLesson ==14.3  && lessonStep >= 106.1  && isClampInCenter && <PlaceClampInCenter 
      
        clampYOffset={6.5} 
        clampXOffset={-7}
        clampZOffset={4}
        clampXScale = {0.8}
        clampYScale = {0.8}
        clampZScale = {0.8}
        clampScale={0.8}  />} 


      {/* {selectedLesson ==14.3 && lessonStep>=100 && isClampInCenter && <PlaceClampInCenter 
      
        clampYOffset={6.5} 
        clampZOffset={3.5}
        clampXScale = {0.9}
        clampYScale = {0.8}
        clampZScale = {0.8}
        clampScale={0.8}  />}            */}

      {selectedLesson !==13 && selectedLesson !==14.1 && selectedLesson !==14.2 && isClampInCenter && <PlaceClampInCenter/>}
      {selectedLesson ===13 && isClampInCenter && <PlaceClampInCenter clampXOffset = {-5}/>}

      {selectedRightHand?.name==='main-normal-beaker' &&isBeakerNearClamp && <PlaceBeakerNearClamp  xOffset={0.6} heightOffset ={-4} scaleOffset={0.45} beakerRef={normalBeakerRef}/>}
      {selectedRightHand?.name==='main-Conical-Flask' && isBeakerNearClamp && <PlaceBeakerNearClamp  xOffset={0.3} heightOffset ={-4} scaleOffset={0.45} beakerRef={conicalBeakerRef}/>}


      {(selectedLeftHand?.name==='main-normal-beaker' || selectedRightHand?.name==='main-normal-beaker') && isPlacePolysterene
         && isPlaceThermometer && <PlaceThermometer beakerParentRef={normalBeakerRef} beakerRef={mainPolystereneRef}/>}

      {(selectedLeftHand?.name==='main-normal-beaker' || selectedRightHand?.name==='main-normal-beaker') 
         && isPlaceThermometer && <PlaceThermometer  beakerRef={normalBeakerRef}/>}   

      {isPolystereneStirMode && (selectedLeftHand?.name === 'main-normal-beaker' ||  selectedRightHand?.name === 'main-normal-beaker')
       && isPlacePolysterene && <StirModePolysterene heightOffset={2}/>}   

       {selectedLesson ===8 && lessonStep===36 && <FillThermometer amount={0.6}/>} 
       {/* {isPlaceThermometer && <FillThermometer amount={0.6}/> } */}

        {/* {(selectedLeftHand?.name==='main-normal-beaker' || selectedRightHand?.name==='main-normal-beaker') 
         && isPlacePolysterene && <ReleaseGasBubbles modelRef={mainPolystereneRef} />}   */}

       {showBubbles && <ReleaseGasBubbles modelRef={mainPolystereneRef}/>}  
       {isPolystereneCovered && <CoverPolysterene/>}

       {isPolystereneStirMode && (selectedLeftHand?.name === 'main-normal-beaker' ||  selectedRightHand?.name === 'main-normal-beaker')
       && isPlacePolysterene && <StirUsingThermometer/>}

       {(selectedLeftHand?.name === "iodobutane-bottle" && selectedRightHand?.name === "pipette") && isPipetteMode &&<PipetteMode pipetteModeRef={pipetteRef} modelRef={iodobutaneBottleRef}/>}
      
       {(selectedLeftHand?.name === "main-testube-01" && selectedRightHand?.name === "pipette") &&
        isPipetteMode &&<PipetteMode pipetteModeRef={pipetteRef} modelRef={testube01Ref} yOffset={4} xOffset={-0.2}/>}

        {(selectedLeftHand?.name === "main-testube-02" && selectedRightHand?.name === "pipette") &&
        isPipetteMode &&<PipetteMode pipetteModeRef={pipetteRef} modelRef={testube02Ref} yOffset={4} xOffset={-0.2}/>}

         {(selectedLeftHand?.name === "main-testube-03" && selectedRightHand?.name === "pipette") &&
        isPipetteMode &&<PipetteMode pipetteModeRef={pipetteRef} modelRef={testube03Ref} yOffset={4} xOffset={-0.2}/>}

       {(selectedLeftHand?.name === "bromobutane-bottle" && selectedRightHand?.name === "pipette") && isPipetteMode &&<PipetteMode pipetteModeRef={pipetteRef} modelRef={bromobutaneBottleRef}/>}
        {(selectedLeftHand?.name === "chlorobutane-bottle" && selectedRightHand?.name === "pipette") && isPipetteMode &&<PipetteMode pipetteModeRef={pipetteRef} modelRef={chlorobutaneBottleRef}/>}
          

       {fillPippette && isPipetteMode && (<FillPipette/>)} 

      {pipetteDroplet && <PipetteDroplets/>}

      {testubesInBeaker.tube1 && <PlaceTestubeInBeaker testubeRef={testube01Ref} hand="right" xPos={-1}            scale={0.8} />}
      {testubesInBeaker.tube2 && <PlaceTestubeInBeaker testubeRef={testube02Ref} hand="right" xPos={0}             scale={0.8} />}
      {testubesInBeaker.tube3 && <PlaceTestubeInBeaker testubeRef={testube03Ref} hand="right" xPos={1}             scale={0.8} />}
      {testubesInBeaker.tube4 && <PlaceTestubeInBeaker testubeRef={testube04Ref} hand="right" xPos={-2}  zPos={-1.5} scale={0.8} />}
      {testubesInBeaker.tube5 && <PlaceTestubeInBeaker testubeRef={testube05Ref} hand="right" xPos={0}  zPos={-1.5} scale={0.8} />}
      {testubesInBeaker.tube6 && <PlaceTestubeInBeaker testubeRef={testube06Ref} hand="right" xPos={-1}   zPos={-1.5}scale={0.8} />}

      {isVolumetricPipetteMode && selectedLeftHand?.name === 'volumetric-pipette' && selectedRightHand?.name === 'main-normal-beaker' &&
        <VolumetricPipetteMode modelRef={normalBeakerRef} modelScale ={ 0.5} pipetteScale = {0.4}  modelYOffset={-1.5}/>
      }
      {isVolumetricPipetteMode && selectedLeftHand?.name === 'volumetric-pipette' && selectedRightHand?.name === 'volumetric-flask' &&
        <VolumetricPipetteMode  yOffset={3.5} modelRef={volumetricRef} modelScale ={ 0.6} pipetteScale = {0.3} decreaseAmount={0.2}  modelYOffset={-1.3}/>
      }
      {isVolumetricPipetteMode && selectedLeftHand?.name === 'volumetric-pipette' && selectedRightHand?.name === 'main-Conical-Flask' &&
        <VolumetricPipetteMode  yOffset={3} modelRef={conicalBeakerRef} modelScale ={ 0.5} pipetteScale = {0.4}  modelYOffset={-1.5}/>
      }

      {isVolumetricPipetteMode && selectedLeftHand?.name === 'volumetric-pipette' && selectedRightHand?.name === 'NaOH-bottle' &&
        <VolumetricPipetteMode  yOffset={3} modelRef={naohBottleRef} modelScale ={ 0.5} pipetteScale = {0.4}  modelYOffset={-2}/>
      }

      {
       selectedLeftHand?.name==="phenopthaline-dropper-bottle" && isPhenopthalinePourMode && <PhenopthalinePourMode modelRef={phenopthalineBottleRef} otherModelRef={conicalBeakerRef}/>
      }

      {
       selectedLeftHand?.name==="methyl-dropper-bottle" && isPhenopthalinePourMode && <PhenopthalinePourMode modelRef={methylBottleRef} otherModelRef={conicalBeakerRef}/>
      }

      {/* {showHCLTitrationReaction && <HCLTitrationReaction modelRef={conicalBeakerRef}/>} */}
      {isCleanBeaker && selectedRightHand?.name==="main-Conical-Flask" && <CleanBeaker
        modelRef={conicalBeakerRef}
        onDone={() => setIsCleanBeaker(false)}
      />}

      {selectedLesson === 12 &&
        lessonStep === 20 && (
          <ShowBeakerPrecipitate
            modelRef={
              normalBeakerRef
            }
            fullOpacity={1}
            duration={4}
          />
        )}


      {selectedLesson ===12.1 && (lessonStep ===32 || lessonStep===38) && <SwirlModel modelRef={normalBeakerRef} useTargetSwirls={true}/> }

      {selectedLesson ===14 && lessonStep ===15 && <SwirlModel modelRef={conicalBeakerRef02} useTargetSwirls={true} targetSwirls={3}/> }
      {selectedLesson ===14 && lessonStep ===17 && <SwirlModel modelRef={conicalBeakerRef02} useTargetSwirls={true} targetSwirls={3}/> }
      {selectedLesson ===14 && lessonStep ===21 && <SwirlModel modelRef={conicalBeakerRef02} useTargetSwirls={true} targetSwirls={3}/> }
      {selectedLesson ===14.1 && lessonStep == 32 && <SwirlModel modelRef={conicalBeakerRef02} useTargetSwirls={true} targetSwirls={3}/> }
      {selectedLesson ===14.1 && [53,56].includes(lessonStep) && <SwirlModel modelRef={seperatingFunnelRef} useTargetSwirls={true} targetSwirls={3}/> }
      {selectedLesson ===14.2 && [72,76].includes(lessonStep) && <SwirlModel modelRef={seperatingFunnelRef} useTargetSwirls={true} targetSwirls={5}/> }
      {selectedLesson ===14.3 && [92].includes(lessonStep) && <SwirlModel modelRef={conicalBeakerRef02} useTargetSwirls={true} targetSwirls={5}/> }

      
      {selectedLesson===12.1 && lessonStep===43 && <ScaleLiquid modelRef={volumetricRef} finalLiquidAmount={1}/>}

      {selectedLeftHand?.name==="main-buirette"&& isFunnelMode && <FunnelMode 
        modelRef={mainBuiretteRef} 
        funnelRef={funnelRef} 
        modelScale ={0.6}
        modelYOffset={-1}
        funnelYOffset={0.5}
        hand={'left'}
        />
      }    
 
      {selectedLesson==13 && isClampTestube && <ClampModel modelRef={boilingTube01Ref} modelScale={0.8} hand={"left"}/>}
      {selectedLesson==14.1 && isClampTestube && <ClampModel modelRef={seperatingFunnelRef} clampYOffset={-1} clampScale={0.8}  modelScale={0.85} hand={"right"}/>}
      {[14.2,14.3].includes(selectedLesson) && isClampTestube && <ClampModel modelRef={seperatingFunnelRef} clampYOffset={-1} clampScale={0.8}  modelScale={0.85} />}
      {/* {selectedLesson==14.3 && isClampTestube && <ClampModel modelRef={seperatingFunnelRef} clampYOffset={-1} clampScale={0.8}  modelScale={0.85} />} */}

      { isInvertCylinder && (<InvertCylinderModel/>)} 
      
      {selectedLesson==13 && isModelCentre && (<PlaceModelCentre modelRef={normalBeakerRef}/>)}
      {selectedLesson==14.1 && isModelCentre && (<PlaceModelCentre  modelYScale={0.8} modelXScale={0.9} modelXOffset={-0.2} modelRef={normalBeakerRef}/>)}
      {selectedLesson==14.2 && lessonStep<83 && isModelCentre && (<PlaceModelCentre  modelYScale={0.8} modelXScale={0.9} modelXOffset={0.6} modelRef={normalBeakerRef}/>)}
      {[14.2,14.3].includes(selectedLesson) && lessonStep>=83 && lessonStep<98 && isModelCentre && (<PlaceModelCentre  modelYScale={0.8} modelXScale={0.9} modelXOffset={-0.3} modelZOffset={0} modelRef={conicalBeakerRef02}/>)}
      {/* {selectedLesson==14.3 && lessonStep>=85 && lessonStep<98 &&  isModelCentre && (<PlaceModelCentre  modelYScale={0.8} modelXScale={0.9} modelXOffset={-0.3} modelZOffset={0} modelRef={conicalBeakerRef02}/>)} */}
      {selectedLesson==14.3 && lessonStep>=98 && lessonStep<106.1 &&isModelCentre && (<PlaceModelCentre modelZScale={0.8}  modelYScale={0.9} modelXScale={0.8} modelXOffset={-0.1} modelZOffset={2.5}  modelRef={heatingMantleRef}/>)}
      {selectedLesson==14.3 && lessonStep>=106.1 && isModelCentre && (<PlaceModelCentre modelZScale={0.8}  modelYScale={0.9} modelXScale={0.8} modelXOffset={-5} modelZOffset={2.5}  modelRef={heatingMantleRef}/>)}
      {selectedLesson==14.3 && lessonStep>=107 && lessonStep<110 &&isModelCentre && (<PlaceModelCentre modelZScale={1}  modelYScale={1} modelXScale={1} modelXOffset={6} modelZOffset={2.5}  modelRef={conicalBeakerRef02}/>)}

      {isDeliveryTubeConnected && (<ConnectDeliveryTube  modelRef= {boilingTube01Ref}/>)}

      {selectedLesson==13 && isPourModeDeliveryTube && (<PourModeDeliveryTube modelRef={testube03Ref} otherModelRef={boilingTube01Ref}/>)}
      {selectedLesson==14.1 && [37,38,39].includes(lessonStep) && isPourModeDeliveryTube && (<PourModeDeliveryTube 
      modelScale={0.35} 
      modelRef={conicalBeakerRef02} 
      otherModelRef={seperatingFunnelRef}
      modelXOffset={0.8}
      modelYOffset={0.35}
      />
    
    )
      
      }
      {[14.1,14.2].includes(selectedLesson) && [48,49,66,67,68].includes(lessonStep) && isPourModeDeliveryTube && (<PourModeDeliveryTube 
      modelRef={graduatedBeakerRef} 
      otherModelRef={seperatingFunnelRef}
      modelYOffset={-0.5}
      modelXOffset={1}
      />)}

      {/* {selectedLeftHand?.name==="boiliing-tube-01" && (<CalciumCarbonateMolarReaction modelRef={boilingTube01Ref}/>)} */}

      {selectedLesson===13 && lessonStep==28 && (<CalciumCarbonateMolarReaction modelRef={boilingTube01Ref}/>)}
      {/* {selectedLesson===13 && lessonStep==29 && (<DeliveryTubeGasRise/>)} */}

      {selectedLesson===14 && [19,23].includes(lessonStep) && <ConicalGasCloud/>}
      {selectedLesson==14 && lessonStep >=24 && (<ChlorinationLiquidColorChange modelRef={conicalBeakerRef02}/>)}

      {selectedLesson==14.1 && isAddFunnelToMode && (<AddFunnelToModel modelRef={seperatingFunnelRef}/>)  }
      {selectedLesson==14.2 && isAddFunnelToMode && (<AddFunnelToModel modelRef={seperatingFunnelRef}/>)  }

      {selectedLesson==14.1 && lessonStep ==41 && (<ChlorinationSeparatingFunnelColorChange 
      modelRef={seperatingFunnelRef}/>)}

      {selectedLesson==14.1 && lessonStep ==49 && (<ChlorinationSeparatingFunnelColorChange 
      modelRef={seperatingFunnelRef}
      upperLiquidColor = {"#F4D35E"}
      bottomLiquidColor = {"#DCEFF7"}
      
      />)}

      {/* {selectedLesson==14.1 && lessonStep ==53 && (<ChlorinationSeparatingFunnelColorChange 
      modelRef={seperatingFunnelRef}
      upperLiquidColor = {"#DDE6A6"}
      bottomLiquidColor = {"#DDE6A6"}      
      />)} */}

      {/* {selectedLesson==14.1 && lessonStep >=53 && lessonStep<58 && (<ChlorinationSeparatingFunnelColorChange 
      modelRef={seperatingFunnelRef}
      upperLiquidColor = {"#F2C230"}
      bottomLiquidColor = {"#8FD3F4"}
      
      />)}       */}

        {selectedLesson === 14.1 &&
          lessonStep > 53 &&
          lessonStep !== 56 && (
            <ChlorinationSeparatingFunnelColorChange
              modelRef={seperatingFunnelRef}
              upperLiquidColor="#F2C230"
              bottomLiquidColor="#8FD3F4"
              colorChangeDelay={0}
              colorChangeDuration={0.5}
            />
        )}
        

      {selectedLesson === 14.2 &&
        lessonStep >= 73 &&
        lessonStep < 82 &&
        lessonStep !== 76 && (
          <ChlorinationSeparatingFunnelColorChange
            modelRef={seperatingFunnelRef}
            upperLiquidColor="#F4D35E"
            bottomLiquidColor="#DCEFF7"
            liquidOpacity={0.35}
            colorChangeDelay={0}
            colorChangeDuration={0.5}
          />
      )}
      {
        selectedLesson==14.3 && isPotassiumTransferred && lessonStep<106.3 && <ShowPowderBottomOfModel modelRef={conicalBeakerRef02}/>
      }   
      {
        selectedLesson==14.3 && lessonStep==93 && <ControlLiquidOpacityofModel modelRef={conicalBeakerRef02} endOpacity = {0.2} endColor="#F4D35E"/>
      }
      {
        selectedLesson==14.3 && lessonStep==96 && <PouringMode02 
        pourModelRef={conicalBeakerRef02}
         receiveModelRef={roundBeakerRef}
         pourModelXOffset = {-1.7}
         pourModelYOffset = {-0.5}
         pourModelScale={0.7}
         receiveModelScale={0.9}
         hand={"right"}
         pourModelYRotation = {Math.PI}

         
         />
      }

      {
        selectedLesson==14.3 && lessonStep<106.1 && isPlaceInMantle && (
          <PlaceModelinMantle modelRef={roundBeakerRef}/>
        )
      }
      {
        selectedLesson==14.3 && lessonStep>=106.1 && isPlaceInMantle && (
          <PlaceModelinMantle modelRef={roundBeakerRef} modelXOffset={0}/>
        )
      }
      {
        selectedLesson ==14.3 && lessonStep==100 && (
          <AdjustClampHandle yOffset={-2}/>
        )
      }
      {
        isAddDistillationHead && lessonStep<115 && (
          <PlaceDistillationHead modelRef={roundBeakerRef}/>
        )
      }
      {
       selectedLesson==14.3 && lessonStep<106.1 && isInsertThermometer && <InsertThermometer modelRef={roundBeakerRef}/>
      }
      {
       selectedLesson==14.3 && lessonStep>=106.1 && lessonStep<115 &&  isInsertThermometer && <InsertThermometer modelRef={roundBeakerRef}/>
      }


      {
        isInsertCondensor && lessonStep<106.1 && lessonStep<115 && <InsertCondensor modelRef={roundBeakerRef}/>
      }

      {
        isInsertCondensor && lessonStep>=106.1 && lessonStep<115 && <InsertCondensor modelRef={roundBeakerRef} condensorXOffset={3.3} />
      }
      {
        isFillCondensor && <FillCondensor amount={1}/>
      }
      {
        isCleanBeaker && selectedLesson==14.3 && <CleanBeaker modelRef={conicalBeakerRef02}  onDone={() => setIsCleanBeaker(false)}/>
      }
      {
        isMantleTurnedOn && selectedLesson==14.3 && <HeatingMantleSurfaceColourChange/>
      }
      {
        selectedLesson==14.3 && lessonStep==109 && <FillThermometer amount={0.75} startDelay={0.5} fillSpeed={1} startingAmount={0.5}/>
      }
      {
        selectedLesson==14.3 && lessonStep==109 && <DistillationGasAnimation startDelay = {3000}/>
      }
      {
        selectedLesson==14.3 && lessonStep==109 && <PourDropletsFromModel startDelay = {6} modelRef={condensorRef} loopTimes={5}/>
      }      
      {selectedLesson==14.3 && lessonStep>=109 && lessonStep<112 && (
        <FillConicalBeaker02 modelRef={conicalBeakerRef02}  amount={0.4}  colorUpper="#ffffff" colorBottom="#ffffff"/>
      )}      
      {
        selectedLesson==14.3 && lessonStep==112 && <PouringMode02 
        pourModelRef={conicalBeakerRef02}
         receiveModelRef={testube01Ref}
         pourModelXOffset = {-1.2}
         pourModelYOffset = {-0.5}
         pourModelScale={0.8}
         receiveModelScale={0.7}
         hand={"right"}
         pourModelYRotation = {Math.PI}
         receiveModelXOffset ={-2}         
         />
      }

      {
        selectedLesson==14.3 && lessonStep==131 && <PouringMode02 
        pourModelRef={graduatedBeakerRef}
         receiveModelRef={testube02Ref}
         pourModelXOffset = {-1.2}
         pourModelYOffset = {-0.5}
         pourModelScale={0.8}
         receiveModelScale={0.7}
         hand={"right"}
         pourModelYRotation = {Math.PI}
         receiveModelXOffset ={-2}         
         />
      }      

      {
       selectedLesson==14.3 && lessonStep<121  && isDropperPlaced && <DropperPlaced 
        beakerRef={testube01Ref} 
        dropperScale={0.9} 
        dropperYOffset={2.1} 
        beakerScale = {1}
      
      />
      }

      {
       selectedLesson==14.3 && [123,124,125,126].includes(lessonStep)  && isDropperPlaced && <DropperPlaced 
        beakerRef={testube02Ref} 
        dropperScale={0.9} 
        dropperYOffset={2.1} 
        beakerScale = {1}
      
      />
      }

      {
        selectedLeftHand?.name == "main-testube-02" && selectedRightHand?.name == "graduated-pipette" && isPipetteMode && (
          <PipetteMode modelRef={testube02Ref} pipetteModeRef={graduatedPipetteRef} pipetteModeRefScale={0.6} modelRefScale={1} yOffset={3.5}  />
        )
      }

      {
        selectedLesson == 14.4 && isAddWarmWater && (
          <FillConicalBeaker modelRef={normalBeakerRef} amount={0.5} color={"#0073a0"} opacity={0.35}/>
        )
      }
      {isPlaceModelInBeaker && <PlaceModelInBeaker modelRef={testube02Ref} yOffset={0.7}/>}
      
      {selectedLeftHand?.name==="main-testube-02" && isChlorideIonReaction && <ChlorideIonReaction modelRef={testube02Ref}/>}

    </>
  );
};

export default Interaction;