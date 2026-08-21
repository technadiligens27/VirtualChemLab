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

const Interaction = () => {
  const {
    isFillUpBeaker,selectedRightHand,selectedLeftHand,fillBeakerHand,setIsDragging,isStirMode,isAddSalt,
    setIsAddSalt,isPottasiumCarobnateInSpoon,isBalancePlaced,isWeighTestube,isBuiretteClamped,
    setIsBuiretteClamped,isClampInCenter,isBeakerNearClamp,isPlaceThermometer,isPlacePolysterene,
     mainThermometerRef,setIsPolystereneStirMode,isPolystereneStirMode,showBubbles,isPolystereneCovered,setIsPolystereneCovered,
     isPotassiumHydrogenCarbonateInSpoon,isPipetteMode,fillPippette,pipetteDroplet,setFillPipette,TestubeInBeaker,setTestubeInBeaker,
     testubesInBeaker,isVolumetricPipetteMode,setIsVolumetricPipetteMode,setPourFromVolumetricPipette,isPhenopthalinePourMode
,showHCLTitrationReaction,isCleanBeaker,setIsCleanBeaker
  } = useContext(InteractionContext);

  const {testube01Ref,testube02Ref,digitalBalanceRef,normalBeakerRef,mainPolystereneRef,iodobutaneBottleRef,
          bromobutaneBottleRef,testube03Ref,chlorobutaneBottleRef,testube04Ref,testube05Ref,testube06Ref,volumetricRef,
        conicalBeakerRef,phenopthalineBottleRef} = useContext(ModelContext)

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
      {isPotassiumHydrogenCarbonateInSpoon && <AddPottasiumCarobnateToSpoon/>}

      {isBalancePlaced && <PlaceDigitalBalance/>}
      {isWeighTestube && (selectedLesson===8 || selectedLesson===9) &&<WeighTestube testubeRef={testube01Ref}/>}
      {/* {selectedLeftHand &&selectedRightHand && (<PouringMode hand={"right"}/>)} */}
      {/* {selectedLeftHand &&selectedRightHand && (<PouringMode hand={'left'}/>)} */}
      {selectedLesson===8  &&  <BalanceReading  balanceRef={digitalBalanceRef} isWeighTestube={isWeighTestube} finalMass={24.7}/>}

      {selectedLesson===9 &&  <BalanceReading   balanceRef={digitalBalanceRef}  isWeighTestube={isWeighTestube} finalMass={25.67}/>}
      
      {isBuiretteClamped &&  <ClampBurette/>}  
      {isClampInCenter && <PlaceClampInCenter/>}
      {selectedRightHand?.name==='main-normal-beaker' &&isBeakerNearClamp && <PlaceBeakerNearClamp  xOffset={0.6} heightOffset ={-4} scaleOffset={0.45} beakerRef={normalBeakerRef}/>}
      {selectedRightHand?.name==='main-Conical-Flask' && isBeakerNearClamp && <PlaceBeakerNearClamp  xOffset={0.6} heightOffset ={-4} scaleOffset={0.45} beakerRef={conicalBeakerRef}/>}


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

       {(selectedLeftHand?.name === "iodobutane-bottle" && selectedRightHand?.name === "pipette") && isPipetteMode &&<PipetteMode modelRef={iodobutaneBottleRef}/>}
      
       {(selectedLeftHand?.name === "main-testube-01" && selectedRightHand?.name === "pipette") &&
        isPipetteMode &&<PipetteMode modelRef={testube01Ref} yOffset={4} xOffset={-0.2}/>}

        {(selectedLeftHand?.name === "main-testube-02" && selectedRightHand?.name === "pipette") &&
        isPipetteMode &&<PipetteMode modelRef={testube02Ref} yOffset={4} xOffset={-0.2}/>}

         {(selectedLeftHand?.name === "main-testube-03" && selectedRightHand?.name === "pipette") &&
        isPipetteMode &&<PipetteMode modelRef={testube03Ref} yOffset={4} xOffset={-0.2}/>}

       {(selectedLeftHand?.name === "bromobutane-bottle" && selectedRightHand?.name === "pipette") && isPipetteMode &&<PipetteMode modelRef={bromobutaneBottleRef}/>}
        {(selectedLeftHand?.name === "chlorobutane-bottle" && selectedRightHand?.name === "pipette") && isPipetteMode &&<PipetteMode modelRef={chlorobutaneBottleRef}/>}


       {fillPippette && isPipetteMode && (<FillPipette/>)} 

      {pipetteDroplet && <PipetteDroplets/>}

      {testubesInBeaker.tube1 && <PlaceTestubeInBeaker testubeRef={testube01Ref} hand="right" xPos={-1}            scale={0.8} />}
      {testubesInBeaker.tube2 && <PlaceTestubeInBeaker testubeRef={testube02Ref} hand="right" xPos={0}             scale={0.8} />}
      {testubesInBeaker.tube3 && <PlaceTestubeInBeaker testubeRef={testube03Ref} hand="right" xPos={1}             scale={0.8} />}
      {testubesInBeaker.tube4 && <PlaceTestubeInBeaker testubeRef={testube04Ref} hand="right" xPos={-2}  zPos={-1.5} scale={0.8} />}
      {testubesInBeaker.tube5 && <PlaceTestubeInBeaker testubeRef={testube05Ref} hand="right" xPos={0}  zPos={-1.5} scale={0.8} />}
      {testubesInBeaker.tube6 && <PlaceTestubeInBeaker testubeRef={testube06Ref} hand="right" xPos={-1}   zPos={-1.5}scale={0.8} />}

      {isVolumetricPipetteMode && selectedLeftHand?.name === 'volumetric-pipette' && selectedRightHand?.name === 'main-normal-beaker' &&
        <VolumetricPipetteMode modelRef={normalBeakerRef}/>
      }
      {isVolumetricPipetteMode && selectedLeftHand?.name === 'volumetric-pipette' && selectedRightHand?.name === 'volumetric-flask' &&
        <VolumetricPipetteMode  yOffset={4} modelRef={volumetricRef} modelScale ={ 0.7} pipetteScale = {0.4}  modelYOffset={-1.5}/>
      }
      {isVolumetricPipetteMode && selectedLeftHand?.name === 'volumetric-pipette' && selectedRightHand?.name === 'main-Conical-Flask' &&
        <VolumetricPipetteMode  yOffset={4} modelRef={conicalBeakerRef} modelScale ={ 0.7} pipetteScale = {0.4}  modelYOffset={-1.5}/>
      }

      {
        isPhenopthalinePourMode && <PhenopthalinePourMode modelRef={phenopthalineBottleRef} otherModelRef={conicalBeakerRef}/>
      }

      {/* {showHCLTitrationReaction && <HCLTitrationReaction modelRef={conicalBeakerRef}/>} */}
      {isCleanBeaker && selectedRightHand?.name==="main-Conical-Flask" && <CleanBeaker
        modelRef={conicalBeakerRef}
        onDone={() => setIsCleanBeaker(false)}
      />}

    </>
  );
};

export default Interaction;