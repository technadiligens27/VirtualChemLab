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

const Interaction = () => {
  const {
    isFillUpBeaker,selectedRightHand,selectedLeftHand,fillBeakerHand,setIsDragging,isStirMode,isAddSalt,
    setIsAddSalt,isPottasiumCarobnateInSpoon,isBalancePlaced,isWeighTestube,isBuiretteClamped,
    setIsBuiretteClamped,isClampInCenter,isBeakerNearClamp,isPlaceThermometer,isPlacePolysterene,
     mainThermometerRef,setIsPolystereneStirMode,isPolystereneStirMode,showBubbles
  } = useContext(InteractionContext);

  const {testube01Ref,digitalBalanceRef,normalBeakerRef,mainPolystereneRef} = useContext(ModelContext)

  const {lessonStep,isTutorialMode,safetyStep,setLessonStep,selectedLesson} = useContext(MainGuidelineContext)

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
    console.log('isPlacePolysterene:',isPlacePolysterene);
    console.log('isPolystereneStirMode:',isPolystereneStirMode)
    console.log('selectedLeftHand:',selectedLeftHand);
    console.log('selectedLeftHand:',selectedRightHand);

  },[isPlacePolysterene,isPolystereneStirMode,selectedLeftHand,selectedRightHand])

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
      {isBalancePlaced && <PlaceDigitalBalance/>}
      {isWeighTestube && selectedLesson===8 &&<WeighTestube testubeRef={testube01Ref}/>}
      {/* {selectedLeftHand &&selectedRightHand && (<PouringMode hand={"right"}/>)} */}
      {/* {selectedLeftHand &&selectedRightHand && (<PouringMode hand={'left'}/>)} */}
      {selectedLesson===8  &&  <BalanceReading 
        balanceRef={digitalBalanceRef}
        isWeighTestube={isWeighTestube}
        finalMass={24.7}
        />
      }
      {isBuiretteClamped &&  <ClampBurette/>}  
      {isClampInCenter && <PlaceClampInCenter/>}
      {isBeakerNearClamp && <PlaceBeakerNearClamp  xOffset={0.6} heightOffset ={-4} scaleOffset={0.45} beakerRef={normalBeakerRef}/>}
      {isBuiretteClamped && <PourFromBurette /> }

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

    </>
  );
};

export default Interaction;