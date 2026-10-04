import { useContext } from "react"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import ModelFocusMode from "./ModelFocusMode/ModelFocusMode"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const ModelFocusLesson12 = ()=>{

    const {conicalBeakerRef02,spoonRef,seperatingFunnelRef,normalBeakerRef,graduatedBeakerRef,roundBeakerRef,heatingMantleRef,
        distillationHeadRef,mainThermometerRef,condensorRef,waterOutTubeRef,waterInTubeRef,testube01Ref,mainDropperRef,testube02Ref,
        graduatedPipetteRef, boilingTube01Ref,graduatedCylinder100Ref,buretteClampRef,digitalBalanceRef,
        testube03Ref,mainPolystereneRef,mainBuiretteRef,volumetricPipetteRef,volumetricRef,conicalBeakerRef,
        methylBottleRef
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



        </>
    )
}

export default ModelFocusLesson12