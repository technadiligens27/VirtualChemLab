import { useContext } from "react";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext";
import EnthalpyLessonOverview from "../../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview";
import SafetyScreen from "../../SafetyScreen/SafetyScreen.jsx";
import {safetyInstructionData} from '../../Data/SafetyInstruction/SafetyInstruction.jsx'
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox.jsx";
import {sulfamicAcidNaOHTitrationReactionData} from '../../Data/SulfamicNaOHTitrationData/SulfamicNaOHTitrationData.jsx'
import SulfamicAcidNaOHTitration02 from "./SulfamicAcidNaOHTitration02.jsx";


const SulfamicAcidNaOHTitration = ()=>{


  const {isFillBeakerBoxOpen,hessGuidelineNumber,setHessGuidelineNumber,
    showEnthalyResultOne,setShowEnthalyResultOne,setIsVolumetricPipetteFilled} = useContext(InteractionContext)
    
  const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);
  const {digitalBalanceRef,kettleRef,chlorobutaneBottleRef,mainDropperRef} = useContext(ModelContext)  
    

    return(
        <>
            {lessonStep === 1 && (
              <EnthalpyLessonOverview
                reactionData={sulfamicAcidNaOHTitrationReactionData[0]}
                onStartLesson={() => setLessonStep(2)}
              />
            )}    

            {lessonStep === 2 && (
              <SafetyScreen
                safetyData={safetyInstructionData}
                onContinue={() => setLessonStep((previous) => previous + 1)}
                onBack={() => setLessonStep((previous) => previous - 1)}
              />
            )}
      
            {lessonStep===3 && (<DialogBox text={"Take TestTube to LEft Hande"}/>)}  
            {lessonStep===4 && (<DialogBox text={"Place Balance In Centre"}/>)}    
            {lessonStep===5 && (<DialogBox text={"Weigh Testube"}/>)}    
            {lessonStep===6 && (<DialogBox text={"Remove Testube"}/>)}    
            {lessonStep===7 && (<DialogBox text={"Take Spatula to Right Hand"}/>)}    
            {lessonStep===8 && (<DialogBox text={"Add sulfamic acid"}/>)}    
            {lessonStep===9 && (<DialogBox text={"Click Spoon and Select Pour into Tetsube"}/>)}    
            {lessonStep===10 && (<DialogBox text={"Scroll Down to Pour Salfamic Acid to Testube"}/>)}    
            {lessonStep===11 && (<DialogBox text={"Click Spoon and Select Disable Pour Mode"}/>)}    
            {lessonStep===12 && (<DialogBox text={"Weight Testube"}/>)}    
            {lessonStep===13 && (<DialogBox text={"Keep Spatula Back In table"}/>)}    
            {lessonStep===14 && (<DialogBox text={"Remove Tetsube from Digital Balance"}/>)}    
            {lessonStep===15 && (<DialogBox text={"Take Normal Beaker to Left Hand"}/>)}    
            {lessonStep===16 && (<DialogBox text={"Click Beaker and Select Add Liquid"}/>)}    
            {lessonStep===17 && (<DialogBox text={"Water - 100cm3"}/>)}    
            {lessonStep===18 && (<DialogBox text={"Press P for Pouring Mode"}/>)}    
            {lessonStep===19 && (<DialogBox text={"Scroll Down to Pour Salfamic Acid to Beaker"}/>)}    
            {lessonStep===20 && (<DialogBox text={"Press P to exit Pour Mode"}/>)}    
            {lessonStep===21 && (<DialogBox text={"Keep Testube Back In Table"}/>)}    

            
            {lessonStep===22 && (<SulfamicAcidNaOHTitration02/>)}    


        </>
    )
}

export default SulfamicAcidNaOHTitration