import { useContext } from "react";
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

const Interaction = () => {
  const {
    isFillUpBeaker,selectedRightHand,selectedLeftHand,fillBeakerHand,setIsDragging,isStirMode,isAddSalt,
    setIsAddSalt,isPottasiumCarobnateInSpoon,isBalancePlaced,isWeighTestube,isBuiretteClamped,
    setIsBuiretteClamped,isClampInCenter,
  } = useContext(InteractionContext);

  const {testube01Ref,digitalBalanceRef} = useContext(ModelContext)

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

    </>
  );
};

export default Interaction;