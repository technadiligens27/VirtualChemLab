import { useContext } from "react";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext";
import EnthalpyLessonOverview from "../../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview";
import {hclTitrationReactionData} from '../../Data/HCLTitrationData/HCLTitrationData.jsx'
import SafetyScreen from "../../SafetyScreen/SafetyScreen.jsx";
import {safetyInstructionData} from '../../Data/SafetyInstruction/SafetyInstruction.jsx'
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox.jsx";
import HCLTitration2 from "./HCLTitration2.jsx";

const HCLTitration = ()=>{


  const {isFillBeakerBoxOpen,hessGuidelineNumber,setHessGuidelineNumber,
    showEnthalyResultOne,setShowEnthalyResultOne,setIsVolumetricPipetteFilled} = useContext(InteractionContext)
    
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
            {lessonStep===10 && <DialogBox text={"Exit Pipette Mode"}/>}
            {lessonStep===11 && <DialogBox text={"Keep Normal Beaker In Table"}/>}
            {lessonStep===12 && <DialogBox text={"Take Volumetric Flask"}/>}
            {lessonStep===13 && <DialogBox text={"Go to Pipette Mode"}/>}
            {lessonStep===14 && <DialogBox text={"Scroll Down To Release Liquid"}/>}
            {lessonStep===15 && <DialogBox text={"Exit Pipette Mode"}/>}
            {lessonStep===16 && <DialogBox text={"Keep Pipette to Left Hand"}/>}
            {lessonStep===17 && <DialogBox text={"Take Normal Beaker to Left Hand"}/>}
            {lessonStep===18 && <DialogBox text={"Click Add Liquid in Normal Beaker"}/>}
            {lessonStep===19 && <DialogBox text={"Add Water 30cm3"}/>}
            {lessonStep===20 && <DialogBox text={"Press Shift + P for Pouring Mode"}/>}
            {lessonStep===21 && <DialogBox text={"Scroll Down to Pour"}/>}
            {lessonStep===22 && <DialogBox text={"Press Shift + P to Exit Pour Mode"}/>}
            {lessonStep===23 && <DialogBox text={"Keep BEaker IN Table"}/>}
            {lessonStep===23.5 && <DialogBox text={"Place Bung"}/>}
            {lessonStep===24 && <DialogBox text={"Scroll Downward to make vlumtri upright 0/3"}/>}
            {lessonStep===25 && <DialogBox text={"Scroll Upwards 0/3"}/>}
            {lessonStep===26 && <DialogBox text={"Scroll Downwards 1/3"}/>}
            {lessonStep===27 && <DialogBox text={"Scroll Upwards 1/3"}/>}
            {lessonStep===28 && <DialogBox text={"Scroll Downwards 2/3"}/>}
            {lessonStep===29 && <DialogBox text={"Scroll Upwards 2/3"}/>}
            {lessonStep===30 && <DialogBox text={"Take Burette to Left Hand"}/>}
            {lessonStep===31 && <DialogBox text={"Click Add Liquid"}/>}
            {lessonStep===32 && <DialogBox text={"NaOH 30cm3"}/>}
            {lessonStep===33 && <DialogBox text={"Clamp Burette"}/>}
            {lessonStep===34 && <DialogBox text={"Pick Up Volumetric Pipette"}/>}
            {lessonStep===35 && <DialogBox text={"Scroll Down to squeeze pipette"}/>}
            {lessonStep===36 && <DialogBox text={"Click Pipette Mode"}/>}
            {lessonStep===37 && <DialogBox text={"Scroll Upwards to get Lqiuid"}/>}
            {lessonStep===38 && <DialogBox text={"Exit Pipette Mode"}/>}
            {lessonStep===39 && <DialogBox text={"Keep Flask in Table"}/>}
            {lessonStep===40 && <DialogBox text={"Take Conical Flask to RIght"}/>}
            {lessonStep===41 && <DialogBox text={"Enter Pipette Mode"}/>}
            {lessonStep===42 && <DialogBox text={"Scroll Down to fill"}/>}
            {lessonStep===43 && <DialogBox text={"Exit Pipette Mode"}/>}
            {lessonStep===44 && <DialogBox text={"Keep Pipette in Table"}/>}
            {lessonStep===45 && <DialogBox text={"Keep Conical Flask In Table"}/>}

            {lessonStep===46 && <HCLTitration2/>}

        </>
    )
}

export default HCLTitration