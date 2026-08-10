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
  const {digitalBalanceRef,kettleRef,chlorobutaneBottleRef} = useContext(ModelContext)

  useEffect(()=>{
    if(digitalBalanceRef.current){
        digitalBalanceRef.current.visible = false
    }
    if(kettleRef.current){
        kettleRef.current.visible = true
    }

    // if(chlorobutaneBottleRef.current){
    //   chlorobutaneBottleRef.current.visible = true
    // }
  },[digitalBalanceRef,chlorobutaneBottleRef,kettleRef])

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
        {lessonStep === 19 && <DialogBox text={'Click Measuring Cylinder and select Right Hand Option'}/>}
        {lessonStep === 20 && <DialogBox text={'Click Measuring Cylinder and select Add Liquid'}/>}
        {lessonStep === 20.5 && <DialogBox text={'Take 5cm3 of Ethanol'}/>}
        {lessonStep === 21 && <DialogBox text={'Take the Iodinebutan Testube to Left Hand Option'}/>}
        {lessonStep === 22 && <DialogBox text={'Press P to enter Pour Mode'}/>}
        {lessonStep === 23 && <DialogBox text={'Scroll down to Pour'}/>}
        {lessonStep === 24 && <DialogBox text={'Press P to exit Pour Mode'}/>}
        {lessonStep === 25 && <DialogBox text={'Keep Testube back on Table'}/>}
        {lessonStep === 26 && <DialogBox text={'Now take the With the bromobutane label'}/>}
        {lessonStep === 27 && <DialogBox text={'Click Measuring Cylinder and select Add Liquid'}/>}
        {lessonStep === 28 && <DialogBox text={'Take 5cm3 of Ethanol again'}/>}
        {lessonStep === 29 && <DialogBox text={'Press P to enter Pour Mode'}/>}
        {lessonStep === 30 && <DialogBox text={'Scroll down to Pour'}/>}
        {lessonStep === 31 && <DialogBox text={'Press P to exit Pour Mode'}/>}
        {lessonStep === 32 && <DialogBox text={'Keep Testube Back on Table'}/>}
        {lessonStep === 33 && <DialogBox text={'Take the last Testube labelled (chlorobutane)'}/>}
        {lessonStep === 34 && <DialogBox text={'Click Measuring Cylinder and select Add Liquid'}/>}
        {lessonStep === 35 && <DialogBox text={'Take 5cm3 of Ethanol again'}/>}
        {lessonStep === 36 && <DialogBox text={'Press P to enter Pour Mode'}/>}
        {lessonStep === 37 && <DialogBox text={'Scroll down to Pour'}/>}
        {lessonStep === 38 && <DialogBox text={'Press P to exit Pour Mode'}/>}
        {lessonStep === 39 && <DialogBox text={'Keep Measuring Cylinder Back on Table'}/>}
        {lessonStep === 40 && <DialogBox text={'Keep Testube On Table'}/>}
        {lessonStep === 41 && <DialogBox text={'Select Iodobutane Bottle to Left hand'}/>}
        {lessonStep === 42 && <DialogBox text={'Select Pipette To Right Hand'}/>}
        {lessonStep === 43 && <DialogBox text={'Scroll Down to Squeeze Pipette'}/>}
        {lessonStep === 44 && <DialogBox text={'Click Pipette Again And select Take Liquid'}/>}
        {lessonStep === 45 && <DialogBox text={'Scroll Upwards to take Liquid'}/>}
        {lessonStep === 46 && <DialogBox text={'CLick Pipette and select Exit Pipette Mode'}/>}
        {lessonStep === 47 && <DialogBox text={'Kepp Iodobutane bottle back in Table'}/>}
        {lessonStep === 48 && <DialogBox text={'Now Take Testube containing Iodobutane'}/>}
        {lessonStep === 49 && <DialogBox text={'Now click Pipette and select Pipette Mode'}/>}
        {lessonStep === 50 && <DialogBox text={'Now scroll Down to pour a dropelt to the testube'}/>}
        {lessonStep === 51 && <DialogBox text={'Now exit Pippete Mode'}/>}
        {lessonStep === 52 && <DialogBox text={'Keep Back The Testube on The Table'}/>}
        {lessonStep === 53 && <DialogBox text={'Now Take Bromobutane Bottle into Left Hand'}/>}
        {lessonStep === 54 && <DialogBox text={'Now Select Pipette and click Pipette Mode'}/>}
        {lessonStep === 55 && <DialogBox text={'Scroll Upwards to take Liquid'}/>}
        {lessonStep === 56 && <DialogBox text={'Now exit Pippete Mode'}/>}
        {lessonStep === 57 && <DialogBox text={'Keep borobutane Bottle Back on Table'}/>}
        {lessonStep === 58 && <DialogBox text={'Take Testube Containe Label Borobutane'}/>}
        {lessonStep === 59 && <DialogBox text={'Click Pipette and select Pipette Mode'}/>}
        {lessonStep === 60 && <DialogBox text={'Scroll Down to Pour'}/>}
        {lessonStep === 61 && <DialogBox text={'Exit Pipette Mode'}/>}
        {lessonStep === 62 && <DialogBox text={'Keep Bromobutane Tetsube back in Table'}/>}
        {lessonStep === 63 && <DialogBox text={'Take Chlorobutane Bottle to Left Hand'}/>}
        {lessonStep === 64 && <DialogBox text={'Click Pippete and Click Pipette Mode'}/>}
        {lessonStep === 65 && <DialogBox text={'65'}/>}

        </>
    )
}

export default HydrolysisReaction