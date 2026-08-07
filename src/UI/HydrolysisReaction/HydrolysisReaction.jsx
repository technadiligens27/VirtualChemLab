import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext";
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext";
import EnthalpyLessonOverview from "../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview";
import {hydrolysisReactionData} from '../Data/HydrolysisofHalogenoalkanes/HydrolysisofHalogenoalkanes.jsx'
import { useContext, useEffect } from "react";
import DialogBox from "../AllDialogBox/DialogBox/DialogBox";
import {safetyInstructionData} from '../Data/SafetyInstruction/SafetyInstruction.jsx'
import SafetyScreen from "../SafetyScreen/SafetyScreen.jsx";
import { ModelContext } from "../../Contexts/ModelContext/ModelContext.jsx";

const HydrolysisReaction = ()=>{

  const {isFillBeakerBoxOpen,hessGuidelineNumber,setHessGuidelineNumber,
    showEnthalyResultOne,setShowEnthalyResultOne} = useContext(InteractionContext)
    
  const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);
  const {digitalBalanceRef,kettleRef} = useContext(ModelContext)

  useEffect(()=>{
    if(digitalBalanceRef.current){
        digitalBalanceRef.current.visible = false
    }
    if(kettleRef.current){
        kettleRef.current.visible = true
    }
  },[digitalBalanceRef])

    return(
        <>
         {lessonStep===1 && <EnthalpyLessonOverview reactionData={hydrolysisReactionData[0]} onStartLesson={() => {
            setLessonStep(2)
          }}/>}

        {lessonStep === 2 && (
        <SafetyScreen safetyData={safetyInstructionData} onContinue={() => {setLessonStep((previous) => previous + 1 )}}
            onBack={() => {setLessonStep((previous) => previous - 1)}}
        />)}

        {lessonStep === 3 && <DialogBox text={'Pick Beaker to the left hand'}/>}
        {lessonStep === 4 && <DialogBox text={'Pick Kettle to the right hand'}/>}
        {lessonStep === 5 && <DialogBox text={'Press P to got Pouring Mode'}/>}
        {lessonStep === 6 && <DialogBox text={'Scroll Down Mouse To Pour From Kettle'}/>}
        {lessonStep === 7 && <DialogBox text={'Press P to exit Pouring Mode'}/>}
        {lessonStep === 8 && <DialogBox text={'Keep Beaker In Table'}/>}
        {lessonStep === 9 && <DialogBox text={'Keep Kettle back In Table'}/>}
        {lessonStep === 10 && <DialogBox text={'Select Testube and click Left Hand Option'}/>}
        {lessonStep === 11 && <DialogBox text={'Click the held Testube and select Label (Iodobutane)'}/>}
        {lessonStep === 12 && <DialogBox text={'Click the Second Testube in The Rack and select Right hand Option'}/>}
        {lessonStep === 13 && <DialogBox text={'Click the held Testube and select Label (Iodobutane)'}/>}
        {lessonStep === 14 && <DialogBox text={'Keep Left Hand Testube on the rack'}/>}
        {lessonStep === 15 && <DialogBox text={'Now select The Last Testube and select Left Hand Option'}/>}
        {lessonStep === 16 && <DialogBox text={'Now click Tetsube and select label'}/>}
        {lessonStep === 17 && <DialogBox text={'Now keep the right hand testube back in table'}/>}
        {lessonStep === 18 && <DialogBox text={'Now keep the Left hand testube back in table'}/>}

        </>
    )
}

export default HydrolysisReaction