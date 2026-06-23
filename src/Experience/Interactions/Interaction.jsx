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

const Interaction = () => {
  const {
    isFillUpBeaker,
    selectedRightHand,
    selectedLeftHand,
    fillBeakerHand,setIsDragging,isStirMode,
  } = useContext(InteractionContext);

  return (
    <>
      <GogglesPut/>
      <ChairSlide/>
      <GlovesPut/>
      <ClickObject/>


      {/* {selectedLeftHand &&selectedRightHand && (<PouringMode hand={"right"}/>)} */}
      {/* {selectedLeftHand &&selectedRightHand && (<PouringMode hand={'left'}/>)} */}


    </>
  );
};

export default Interaction;