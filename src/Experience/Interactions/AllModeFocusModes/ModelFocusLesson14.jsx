import { useContext } from "react"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import ModelFocusMode from "./ModelFocusMode/ModelFocusMode"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const ModelFocusLesson14 = ()=>{

    const {conicalBeakerRef02,spoonRef,seperatingFunnelRef,normalBeakerRef,graduatedBeakerRef,roundBeakerRef,heatingMantleRef,
        distillationHeadRef,mainThermometerRef,condensorRef,waterOutTubeRef,waterInTubeRef,testube01Ref,mainDropperRef,testube02Ref,
        graduatedPipetteRef
    } = useContext(ModelContext);
    const {lessonStep} = useContext(MainGuidelineContext)

    return(
        <>
        {lessonStep==6 && <ModelFocusMode modelRef={graduatedBeakerRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==12 && <ModelFocusMode modelRef={graduatedBeakerRef} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==14 && <ModelFocusMode modelRef={conicalBeakerRef02} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==20 && <ModelFocusMode modelRef={conicalBeakerRef02} blurResolution={350} blurStrength={3}/> } 
        {lessonStep==28 && <ModelFocusMode modelRef={spoonRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==31 && <ModelFocusMode modelRef={conicalBeakerRef02} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==35 && <ModelFocusMode modelRef={seperatingFunnelRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==37 && <ModelFocusMode modelRef={conicalBeakerRef02} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==43 && <ModelFocusMode modelRef={normalBeakerRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==47 && <ModelFocusMode modelRef={graduatedBeakerRef} blurResolution={360} blurStrength={3}/> } 
        {[71,52].includes(lessonStep) && <ModelFocusMode modelRef={seperatingFunnelRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==53.1 && <ModelFocusMode modelRef={seperatingFunnelRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==65 && <ModelFocusMode modelRef={graduatedBeakerRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==73 && <ModelFocusMode modelRef={seperatingFunnelRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==80 && <ModelFocusMode modelRef={seperatingFunnelRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==83 && <ModelFocusMode modelRef={conicalBeakerRef02} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==88 && <ModelFocusMode modelRef={spoonRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==95 && <ModelFocusMode modelRef={roundBeakerRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==98 && <ModelFocusMode modelRef={heatingMantleRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==102 && <ModelFocusMode modelRefs={[heatingMantleRef,roundBeakerRef,distillationHeadRef]} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==103 && <ModelFocusMode modelRefs={[distillationHeadRef,roundBeakerRef,mainThermometerRef]} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==104 && <ModelFocusMode modelRefs={[distillationHeadRef,roundBeakerRef,mainThermometerRef,condensorRef]} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==105 && <ModelFocusMode modelRefs={[condensorRef,waterOutTubeRef]} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==106 && <ModelFocusMode modelRefs={[condensorRef,waterOutTubeRef,waterInTubeRef]} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==106.3 && <ModelFocusMode modelRef={conicalBeakerRef02} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==108 && <ModelFocusMode modelRef={heatingMantleRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==111 && <ModelFocusMode modelRefs={[conicalBeakerRef02,testube01Ref]} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==116 && <ModelFocusMode modelRef={mainDropperRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==123 && <ModelFocusMode modelRef={testube02Ref} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==130 && <ModelFocusMode modelRef={graduatedBeakerRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==134 && <ModelFocusMode modelRef={graduatedPipetteRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==136 && <ModelFocusMode modelRef={graduatedPipetteRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==143 && <ModelFocusMode modelRef={normalBeakerRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==150 && <ModelFocusMode modelRef={mainDropperRef} blurResolution={360} blurStrength={3}/> } 
        {lessonStep==156 && <ModelFocusMode modelRef={mainDropperRef} blurResolution={360} blurStrength={3}/> } 

        </>
    )
}

export default ModelFocusLesson14