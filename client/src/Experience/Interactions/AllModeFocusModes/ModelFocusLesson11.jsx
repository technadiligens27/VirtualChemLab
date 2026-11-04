import { useContext } from "react"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import ModelFocusMode from "./ModelFocusMode/ModelFocusMode"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const ModelFocusLesson11 = ()=>{

    const {conicalBeakerRef02,spoonRef,seperatingFunnelRef,normalBeakerRef,graduatedBeakerRef,roundBeakerRef,heatingMantleRef,
        distillationHeadRef,mainThermometerRef,condensorRef,waterOutTubeRef,waterInTubeRef,testube01Ref,mainDropperRef,testube02Ref,
        graduatedPipetteRef, boilingTube01Ref,graduatedCylinder100Ref,buretteClampRef,digitalBalanceRef,
        testube03Ref,mainPolystereneRef,mainBuiretteRef,volumetricPipetteRef,volumetricRef,conicalBeakerRef,
        methylBottleRef
    } = useContext(ModelContext);
    const {lessonStep} = useContext(MainGuidelineContext)

    return(
        <>
        {lessonStep==6 && <ModelFocusMode modelRef={normalBeakerRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==9 && <ModelFocusMode modelRefs={[volumetricPipetteRef,normalBeakerRef]} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==13 && <ModelFocusMode modelRef={volumetricRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==14 && <ModelFocusMode modelRefs={[volumetricRef,volumetricPipetteRef]} blurResolution={350} blurStrength={3}/> }   
        {lessonStep==23 && <ModelFocusMode modelRef={volumetricRef} blurResolution={350} blurStrength={3}/> }        
        {lessonStep==24 && <ModelFocusMode modelRef={volumetricRef} blurResolution={350} blurStrength={3}/> }        
        {lessonStep==31 && <ModelFocusMode modelRef={mainBuiretteRef} blurResolution={350} blurStrength={3}/> }          
        {lessonStep==33 && <ModelFocusMode modelRef={mainBuiretteRef} blurResolution={350} blurStrength={3}/> }          
        {lessonStep==44 && <ModelFocusMode modelRef={conicalBeakerRef} blurResolution={350} blurStrength={3}/> }          
        {lessonStep==46 && <ModelFocusMode modelRef={methylBottleRef} blurResolution={350} blurStrength={3}/> }          
        {lessonStep==52 && <ModelFocusMode modelRefs={[conicalBeakerRef,mainBuiretteRef]} blurResolution={350} blurStrength={3}/> }          
        {lessonStep==53 && <ModelFocusMode modelRef={mainBuiretteRef} blurResolution={350} blurStrength={3}/> }               
        {lessonStep==57 && <ModelFocusMode modelRef={conicalBeakerRef} blurResolution={350} blurStrength={3}/> }               
        {lessonStep==66 && <ModelFocusMode modelRef={mainBuiretteRef} blurResolution={350} blurStrength={3}/> }               
        {lessonStep==70 && <ModelFocusMode modelRef={mainBuiretteRef} blurResolution={350} blurStrength={3}/> }               
        
        </>
    )
}

export default ModelFocusLesson11