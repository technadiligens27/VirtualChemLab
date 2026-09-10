import { useContext, useEffect } from "react"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import LessonGuide from "../../LessonGuide/LessonGuide";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import LessonDetails from "../../LessonDetails/LessonDetails";
import EnthalpyLessonOverview from "../../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview";
import { molarVolumeReactionData,molarVolumeGuidelineData} from "../../Data/molarVolumeReactionData/molarVolumeReactionData";
import SafetyScreen from "../../SafetyScreen/SafetyScreen";
import { safetyInstructionData } from "../../Data/SafetyInstruction/SafetyInstruction";
import HessGuidelines from "../../HessGuidelines/HessGuidelines";
import SulfamicGuidelines from "../../SulfamicGuidelines/SulfamicGuidelines";
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext";
import MolarVolumeLiveDataPanel from "../../../Experience/Interactions/MolarVolumeLiveDataPanel/MolarVolumeLiveDataPanel";
import MolarVolumeReduced from "../../../Experience/Interactions/MolarVolumeReduced/MolarVolumeReduced";
import MolarVolumeCalciumCarbonateUsed from "../../../Experience/Interactions/MolarVolumeCalciumCarbonateUsed/MolarVolumeCalciumCarbonateUsed";
import MolarVolumeResults from "../../MolarVolumeResults/MolarVolumeResults";
import QuestionCard from "../../QuestionCard/QuestionCard";
import {useResetLesson} from "../../ResetLessonButton/ResetLessonButton.jsx";
import {chlorinationGuidelineData} from "../../Data/chlorinationLessonData/chlorinationLessonData.jsx"
import SulfamicAcidResult from "../../SulfamicAcidResult/SulfamicAcidResult.jsx";


const ChlorinationLesson = ()=>{

    const {isFillBeakerBoxOpen,setShowQuestionCardNo,showQuestionCardNo} = useContext(InteractionContext)
    const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);
    const {graduatedBeakerRef} = useContext(ModelContext)

    const resetLesson = useResetLesson()

 return(
       <>
       {
         lessonStep===1 && <EnthalpyLessonOverview
          reactionData={molarVolumeReactionData[0]}
          onStartLesson={() => {
            setLessonStep(2)
          }}
        />
        }

        {lessonStep === 2 && (
        <SafetyScreen
          safetyData={
            safetyInstructionData
          }
          onContinue={() =>
            setLessonStep(
              (previous) =>
                previous + 1
            )
          }
          onBack={() =>
            setLessonStep(
              (previous) =>
                previous - 1
            )
          }
        />
      )}




      {lessonStep>=3 && lessonStep<10 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[0]}/>)}





      {lessonStep ==3 && (<DialogBox 
        text={
            <>
             Pick Up the <strong>Measuring Cylinder</strong> to <strong>Right Hand</strong>
            </>
        }      
      />)}

      {lessonStep ==4 && (<DialogBox 
        text={
            <>
             Click The <strong>Held Measuring Cylinder</strong> and Select <strong>Add Liquid</strong>
            </>
        }     
      />)}

      {lessonStep ==5 && (<DialogBox 
        text={
            <>
              Fill With <strong>2-methylpropan-2-ol (10 cm³)</strong> 
            </>
        }     
      />)}

      {lessonStep ==6 && (<DialogBox 
        text={
            <>
             Pick Up the <strong>Conical Flask</strong> to <strong>Left Hand</strong>

            </>
        }     
      />)} 

      {lessonStep ==7 && (<DialogBox 
        text={
            <>
             Press <strong>P to enter Pouring Mode </strong>
            </>
        }     
      />)}    

      {lessonStep===8 && (<DialogBox text={<>
        <strong>Scroll Down</strong> to Pour from <strong>Measuring Cylinder</strong>
        </>}/>
      )}     

      {lessonStep===9 && (<DialogBox text={<>
         Press <strong> P to exit Pouring Mode </strong>
        </>}/>
      )}


      {lessonStep>=10 && lessonStep<16 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[1]}/>)}


      {lessonStep===10 && (<DialogBox text={
        <>
         Click The <strong>Held Measuring Cylinder</strong> and Select <strong>Add Liquid</strong>
        </>}/>
      )}  


      {lessonStep===11 && (<DialogBox text={<>
        Fill With <strong>hydrochloric acid (35 cm³)</strong>     
      </>}/>
      )} 

      {lessonStep===12 && (<DialogBox text={<>
             Press <strong>P to enter Pouring Mode </strong>
      </>}/>
      )}   

      {lessonStep===13 && (<DialogBox text={<>
        <strong>Scroll Down</strong> to Pour from <strong>Measuring Cylinder</strong>
        </>}/>
      )}

      {lessonStep===14 && (<DialogBox text={<>
         Press <strong> P to exit Pouring Mode </strong>
        </>}/>
      )}   

      {lessonStep >=15 && lessonStep <20 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[2]}/>)}


      {lessonStep===15 && (<DialogBox text={<>
         Now <strong>Scroll Down</strong> to gently <strong>Swirl</strong> the <strong>Conical Flask</strong>
        </>}/>
      )}                




      {lessonStep >=16 && lessonStep <24 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[3]}/>)}





      {lessonStep===16 && (<DialogBox text={<>
         Now Select <strong>Held Conical Flask</strong> and Select <strong>Place Bung</strong>

      </>}/>
          )}


      {lessonStep===17 && (<DialogBox text={<>
         Now <strong>Scroll Down</strong> to gently <strong>Swirl</strong> the <strong>Conical Flask</strong> again
        </>}/>
      )}


      {lessonStep >=17 && lessonStep <24 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[4]}/>)}



      {lessonStep===18 && (<DialogBox text={<>
         Now Select <strong>Conical Flask</strong> and Select <strong>Remove Bung</strong>
        </>}/>
      )}  
      {lessonStep===19 && (<DialogBox text={<>
         Pressure Will be Released From <strong>Conical Flask</strong> 
        </>}/>
      )} 

      {lessonStep===20 && (<DialogBox text={<>
        Place <strong>Bung</strong> to <strong>Conical Flask</strong> again
    </>}/>
      )} 
      {lessonStep===21 && (<DialogBox text={<>
       21
      </>}/>
      )} 
      {lessonStep >=21 && lessonStep <24 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[5]}/>)}



       </>
    )
}

export default ChlorinationLesson