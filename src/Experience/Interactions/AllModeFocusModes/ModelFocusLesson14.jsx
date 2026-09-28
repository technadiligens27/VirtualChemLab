import { useContext } from "react"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import ModelFocusMode from "./ModelFocusMode/ModelFocusMode"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const ModelFocusLesson14 = ()=>{

    const {conicalBeakerRef02,spoonRef,seperatingFunnelRef,normalBeakerRef,graduatedBeakerRef,roundBeakerRef} = useContext(ModelContext);
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
        {lessonStep==97 && <ModelFocusMode modelRef={roundBeakerRef} blurResolution={360} blurStrength={3}/> } 

        </>
    )
}

export default ModelFocusLesson14