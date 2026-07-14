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

const Interaction = () => {
  const {
    isFillUpBeaker,
    selectedRightHand,
    selectedLeftHand,
    fillBeakerHand,setIsDragging,isStirMode,isAddSalt,setIsAddSalt
  } = useContext(InteractionContext);

  const {lessonStep,isTutorialMode,safetyStep,setSafetyStep} = useContext(MainGuidelineContext)

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
      {/* {selectedLeftHand &&selectedRightHand && (<PouringMode hand={"right"}/>)} */}
      {/* {selectedLeftHand &&selectedRightHand && (<PouringMode hand={'left'}/>)} */}


    </>
  );
};

export default Interaction;