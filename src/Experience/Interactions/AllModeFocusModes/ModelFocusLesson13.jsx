import { useContext } from "react"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import ModelFocusMode from "./ModelFocusMode/ModelFocusMode"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const ModelFocusLesson13 = ()=>{

    const {conicalBeakerRef02,spoonRef,seperatingFunnelRef,normalBeakerRef,graduatedBeakerRef,roundBeakerRef,heatingMantleRef,
        distillationHeadRef,mainThermometerRef,condensorRef,waterOutTubeRef,waterInTubeRef,testube01Ref,mainDropperRef,testube02Ref,
        graduatedPipetteRef, boilingTube01Ref,graduatedCylinder100Ref,buretteClampRef,digitalBalanceRef,
        testube03Ref
    } = useContext(ModelContext);
    const {lessonStep} = useContext(MainGuidelineContext)

    return(
        <>
        {lessonStep==3.1 && <ModelFocusMode modelRef={boilingTube01Ref} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==3.4 && <ModelFocusMode modelRef={graduatedBeakerRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==8 && <ModelFocusMode modelRef={normalBeakerRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==12 && <ModelFocusMode modelRefs={[normalBeakerRef,graduatedCylinder100Ref]} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==15 && <ModelFocusMode modelRefs={[boilingTube01Ref,buretteClampRef,normalBeakerRef,graduatedCylinder100Ref]} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==18 && <ModelFocusMode modelRef={spoonRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==23 && <ModelFocusMode modelRef={digitalBalanceRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==24 && <ModelFocusMode modelRefs={[digitalBalanceRef,boilingTube01Ref]} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==25 && <ModelFocusMode modelRefs={[boilingTube01Ref]} blurResolution={350} blurStrength={3}/> } 
        {[28,29].includes(lessonStep) && <ModelFocusMode modelRef={[buretteClampRef,boilingTube01Ref,normalBeakerRef,graduatedCylinder100Ref]} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==31 && <ModelFocusMode modelRef={testube03Ref} blurResolution={350} blurStrength={3}/> } 

        </>
    )
}

export default ModelFocusLesson13