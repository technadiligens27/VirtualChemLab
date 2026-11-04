import { useContext } from "react"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import ModelFocusMode from "./ModelFocusMode/ModelFocusMode"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const ModelFocusLesson08 = ()=>{

    const {conicalBeakerRef02,spoonRef,seperatingFunnelRef,normalBeakerRef,graduatedBeakerRef,roundBeakerRef,heatingMantleRef,
        distillationHeadRef,mainThermometerRef,condensorRef,waterOutTubeRef,waterInTubeRef,testube01Ref,mainDropperRef,testube02Ref,
        graduatedPipetteRef, boilingTube01Ref,graduatedCylinder100Ref,buretteClampRef,digitalBalanceRef,
        testube03Ref,mainPolystereneRef,mainBuiretteRef
    } = useContext(ModelContext);
    const {lessonStep} = useContext(MainGuidelineContext)

    return(
        <>
        {lessonStep==4 && <ModelFocusMode modelRef={normalBeakerRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==6 && <ModelFocusMode modelRef={mainPolystereneRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==11 && <ModelFocusMode modelRef={spoonRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==15 && <ModelFocusMode modelRef={digitalBalanceRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==17 && <ModelFocusMode modelRefs={[testube01Ref,digitalBalanceRef]} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==19 && <ModelFocusMode modelRef={mainBuiretteRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==21 && <ModelFocusMode modelRef={mainBuiretteRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==28 && <ModelFocusMode modelRef={normalBeakerRef} blurResolution={350} blurStrength={3}/> }  
        {lessonStep==29 && <ModelFocusMode modelRef={normalBeakerRef} blurResolution={350} blurStrength={3}/> }  
        {lessonStep==31 && <ModelFocusMode modelRef={mainThermometerRef} blurResolution={350} blurStrength={3}/> }          
        {lessonStep==35 && <ModelFocusMode modelRefs={[testube01Ref,normalBeakerRef,mainThermometerRef]} blurResolution={350} blurStrength={3}/> }          
        {lessonStep==36 && <ModelFocusMode modelRefs={[testube01Ref,normalBeakerRef,mainThermometerRef]} blurResolution={350} blurStrength={3}/> }          
        {lessonStep==40 && <ModelFocusMode modelRefs={[testube01Ref,digitalBalanceRef]} blurResolution={350} blurStrength={3}/> }          
        {lessonStep==42 && <ModelFocusMode modelRef={mainThermometerRef} blurResolution={350} blurStrength={3}/> }          
    
        </>
    )
}

export default ModelFocusLesson08