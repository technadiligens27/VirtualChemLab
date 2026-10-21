import { useContext } from "react"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import ModelFocusMode from "./ModelFocusMode/ModelFocusMode"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const ModelFocusLesson15 = ()=>{

    const {conicalBeakerRef02,spoonRef,seperatingFunnelRef,normalBeakerRef,graduatedBeakerRef,roundBeakerRef,heatingMantleRef,
        distillationHeadRef,mainThermometerRef,condensorRef,waterOutTubeRef,waterInTubeRef,testube01Ref,mainDropperRef,testube02Ref,
        graduatedPipetteRef, boilingTube01Ref,graduatedCylinder100Ref,buretteClampRef,digitalBalanceRef,
        testube03Ref,mainPolystereneRef,mainBuiretteRef,waterBottleRef,nichromeWireRef,bunsenBurnerRef,powderContainer
    } = useContext(ModelContext);
    const {lessonStep} = useContext(MainGuidelineContext)

    return(
        <>
        {lessonStep==7 && <ModelFocusMode modelRef={normalBeakerRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==10 && <ModelFocusMode modelRef={waterBottleRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==13 && <ModelFocusMode modelRef={normalBeakerRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==15 && <ModelFocusMode modelRef={nichromeWireRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==17 && <ModelFocusMode modelRefs={[nichromeWireRef,normalBeakerRef]} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==20 && <ModelFocusMode modelRefs={[bunsenBurnerRef,nichromeWireRef]} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==28 && <ModelFocusMode modelRef={powderContainer} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==33 && <ModelFocusMode modelRefs={[nichromeWireRef,bunsenBurnerRef]} blurResolution={350} blurStrength={3}/> } 

        </>
    )
}

export default ModelFocusLesson15