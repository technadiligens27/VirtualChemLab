import { useContext } from "react";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext";
import EnthalpyLessonOverview from "../../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview";
import {hclTitrationReactionData} from '../../Data/HCLTitrationData/HCLTitrationData.jsx'
import SafetyScreen from "../../SafetyScreen/SafetyScreen.jsx";
import {safetyInstructionData} from '../../Data/SafetyInstruction/SafetyInstruction.jsx'
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox.jsx";

const HCLTitration = ()=>{


  const {isFillBeakerBoxOpen,hessGuidelineNumber,setHessGuidelineNumber,
    showEnthalyResultOne,setShowEnthalyResultOne} = useContext(InteractionContext)
    
  const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);
  const {digitalBalanceRef,kettleRef,chlorobutaneBottleRef,mainDropperRef} = useContext(ModelContext)    

    return(
        <>
            {lessonStep === 1 && (
              <EnthalpyLessonOverview
                reactionData={hclTitrationReactionData[0]}
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

            {lessonStep===3 && <DialogBox text={"Click Normal Beaker and select Right Hand Option"}/>}
            {lessonStep===4 && <DialogBox text={"Click Add Liquid "}/>}
            {lessonStep===5 && <DialogBox text={"HCL 25 cm3"}/>}
            {lessonStep===6 && <DialogBox text={"Now Select Volumetric Pipette and Left Hand Option"}/>}
            {lessonStep===7 && <DialogBox text={"Scroll Down to squeeze filler"}/>}
            {lessonStep===8 && <DialogBox text={"Click Volumetric Pipette and select Pipette Mode"}/>}
            {lessonStep===9 && <DialogBox text={"Scoll Upwards to release Pipette Filler and get Liquid"}/>}

        </>
    )
}

export default HCLTitration