import { useContext } from "react"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import ModelFocusMode from "./ModelFocusMode/ModelFocusMode"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const ModelFocusLesson09 = ()=>{

    const {conicalBeakerRef02,spoonRef,seperatingFunnelRef,normalBeakerRef,graduatedBeakerRef,roundBeakerRef,heatingMantleRef,
        distillationHeadRef,mainThermometerRef,condensorRef,waterOutTubeRef,waterInTubeRef,testube01Ref,mainDropperRef,testube02Ref,
        graduatedPipetteRef, boilingTube01Ref,graduatedCylinder100Ref,buretteClampRef,digitalBalanceRef,
        testube03Ref,mainPolystereneRef,mainBuiretteRef
    } = useContext(ModelContext);
    const {lessonStep} = useContext(MainGuidelineContext)

    return(
        <>
        {lessonStep==4 && <ModelFocusMode modelRef={mainPolystereneRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==9 && <ModelFocusMode modelRef={spoonRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==13 && <ModelFocusMode modelRef={digitalBalanceRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==14 && <ModelFocusMode modelRefs={[digitalBalanceRef,testube01Ref]} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==17 && <ModelFocusMode modelRef={mainBuiretteRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==19 && <ModelFocusMode modelRef={mainBuiretteRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==25 && <ModelFocusMode modelRef={normalBeakerRef} blurResolution={350} blurStrength={3}/> } 

    
        </>
    )
}

export default ModelFocusLesson09