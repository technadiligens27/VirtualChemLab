import { useContext } from "react"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import ModelFocusMode from "./ModelFocusMode/ModelFocusMode"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const ModelFocusLesson12 = ()=>{

    const {conicalBeakerRef02,spoonRef,seperatingFunnelRef,normalBeakerRef,graduatedBeakerRef,roundBeakerRef,heatingMantleRef,
        distillationHeadRef,mainThermometerRef,condensorRef,waterOutTubeRef,waterInTubeRef,testube01Ref,mainDropperRef,testube02Ref,
        graduatedPipetteRef, boilingTube01Ref,graduatedCylinder100Ref,buretteClampRef,digitalBalanceRef,
        testube03Ref,mainPolystereneRef,mainBuiretteRef,volumetricPipetteRef,volumetricRef,conicalBeakerRef,
        methylBottleRef,funnelRef,naohBottleRef
    } = useContext(ModelContext);
    const {lessonStep} = useContext(MainGuidelineContext)

    return(
        <>
        {lessonStep==4 && <ModelFocusMode modelRef={testube01Ref} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==6 && <ModelFocusMode modelRefs={[testube01Ref,digitalBalanceRef]} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==9 && <ModelFocusMode modelRef={spoonRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==13 && <ModelFocusMode modelRefs={[testube01Ref,digitalBalanceRef]} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==18 && <ModelFocusMode modelRef={normalBeakerRef} blurResolution={350} blurStrength={3}/> }
        {lessonStep==23 && <ModelFocusMode modelRef={spoonRef} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==32 && <ModelFocusMode modelRef={normalBeakerRef} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==38 && <ModelFocusMode modelRef={normalBeakerRef} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==42 && <ModelFocusMode modelRef={volumetricRef} blurResolution={350} blurStrength={3}/> }     
        {lessonStep==43 && <ModelFocusMode modelRef={volumetricRef} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==53 && <ModelFocusMode modelRef={mainBuiretteRef} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==54 && <ModelFocusMode modelRef={funnelRef } blurResolution={350} blurStrength={3}/> }         
        {lessonStep==56 && <ModelFocusMode modelRef={volumetricRef} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==61 && <ModelFocusMode modelRef={mainBuiretteRef} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==66 && <ModelFocusMode modelRef={naohBottleRef} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==67 && <ModelFocusMode modelRef={volumetricPipetteRef} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==73 && <ModelFocusMode modelRef={conicalBeakerRef} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==76 && <ModelFocusMode modelRef={conicalBeakerRef} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==78 && <ModelFocusMode modelRef={methylBottleRef} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==85 && <ModelFocusMode modelRefs={[conicalBeakerRef,buretteClampRef,mainBuiretteRef]} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==87 && <ModelFocusMode modelRef={conicalBeakerRef} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==103 && <ModelFocusMode modelRefs={[conicalBeakerRef,mainBuiretteRef,buretteClampRef]} blurResolution={350} blurStrength={3}/> }         
        {lessonStep==104 && <ModelFocusMode modelRefs={[conicalBeakerRef,mainBuiretteRef,buretteClampRef]} blurResolution={350} blurStrength={3}/> }         


        </>
    )
}
export default ModelFocusLesson12