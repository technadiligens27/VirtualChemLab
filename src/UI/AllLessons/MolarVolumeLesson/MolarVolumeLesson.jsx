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

const MolarVolumeLesson = ()=>{

    const {isFillBeakerBoxOpen} = useContext(InteractionContext)
    const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);
    const {graduatedBeakerRef} = useContext(ModelContext)


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

      {lessonStep===3 && (<SulfamicGuidelines guidelineData={molarVolumeGuidelineData[0]}/>)}

      {lessonStep===3 && (<DialogBox text={<>
          Pick Up <strong>Boiling Tube</strong> to <strong>Left Hand</strong>
        
        </>}/>
      )}
      {lessonStep===3.1 && (<DialogBox text={<>
         Click The <strong>Held Boiling Tube</strong> and Select <strong>Add Liquid</strong>
        
        </>}/>
      )}

      {lessonStep===3.2 && (<DialogBox text={<>
         Click The <strong>Held Measuring Cylinder</strong> and Select <strong>Add Liquid</strong>
        
        </>}/>
      )}

      {lessonStep===3.3 && (<DialogBox text={<>
         Fill With <strong>Ethanoic (30 cm³)</strong> 
        </>}/>
      )}   

      {lessonStep===3.4 && (<DialogBox text={<>
         Press <strong>P to enter Pouring Mode </strong>
        </>}/>
      )}      
      {lessonStep===3.5 && (<DialogBox text={<>
        <strong>Scroll Down</strong> to Pour from Measuring Cylinder
        </>}/>
      )}    
      {lessonStep===3.6 && (<DialogBox text={<>
         Press <strong> P to exit Pouring Mode </strong>
        </>}/>
      )}

      {lessonStep===3.7 && (<DialogBox text={<>
          Keep <strong>Measuring Cylinder</strong> Back In Table
        </>}/>
      )}  


      {lessonStep===4 && (<DialogBox text={<>
          Click Held <strong>Boiling Tube</strong> and select <strong>Clamp</strong>
        
        </>}/>)}      
        
      {lessonStep===5 && (<DialogBox text={<>
          Pick Up <strong>Beaker</strong> to <strong>Right Hand</strong>
        
        </>}/>
      )}

      {lessonStep===6 && (<DialogBox text={<>
         Click The <strong>Held Beaker</strong> and Select <strong>Add Liquid</strong>
        
        </>}/>
      )}

      {lessonStep===7 && (<DialogBox text={<>
         Fill With <strong>Water (100 cm³)</strong> 
        
        </>}/>
      )}

      {lessonStep===8 && (<DialogBox text={<>
         Pick Up <strong>Measuring Cylinder</strong> to <strong>Left Hand</strong>         
        </>}/>
      )}

      {lessonStep===9 && (<DialogBox text={<>
         Click The <strong>Measuring Cylinder</strong> and Select <strong>Add Liquid</strong>        
        </>}/>
      )}


      {lessonStep===10 && (<DialogBox text={<>
         Fill With <strong>Water (100 cm³)</strong> 
        </>}/>
      )}    

      {lessonStep===11 && (<DialogBox text={<>
         Click The <strong>Measuring Cylinder</strong> and Select <strong>Invert Into Water Bath</strong>        
        </>}/>
      )}                     
      {lessonStep===12 && (<DialogBox text={<>
         Click The <strong>Beaker </strong> and Select <strong>Place In Center</strong>        
        </>}/>
      )}  

      {lessonStep===13 && (<DialogBox text={<>
        Click The <strong>Clamp </strong> and Select <strong>Place In Center</strong>     
        </>}/>
      )}

      {lessonStep===14 && (<DialogBox text={<>
        Now Click <strong>Clamp</strong> and Select <strong>Connect Delivery Tube</strong>    
        </>}/>
      )}  

      {lessonStep===15 && (<DialogBox text={<>
          Pick Up <strong>Test Tube</strong> to <strong>Left Hand</strong>
        </>}/>
      )} 

      {lessonStep===16 && (<DialogBox text={<>
         Now Pick Up <strong>Spatula</strong> to <strong>Right Hand</strong>
        </>}/>
      )} 

      {lessonStep===17 && (<DialogBox text={<>
         Select <strong>Calcium Carbonate </strong>Container and take<strong>Calcium Carbonate</strong>
        </>}/>
      )}

      {lessonStep===18 && (<DialogBox text={<>
         Now Click Held <strong>Spatula</strong> and select <strong>Pour Into Testube</strong>
        </>}/>
      )}

      {lessonStep===19 && (<DialogBox text={
        <>
        <strong>Scroll Down</strong> to Pour <strong>Calcium Carbonate</strong> to Test Tube
        </>}/>
      )}

      {lessonStep===20 && (<DialogBox text={
        <>
         Now Click Held <strong>Spatula</strong> and select <strong>Disable Pour Mode</strong>
        </>}/>
      )}   

      {lessonStep===21 && (<DialogBox text={
        <>
         Keep Spatula <strong>Back on the table</strong>
        </>}/>
      )}

      {lessonStep===22 && (<DialogBox text={
        <>
        Select <strong>Digital Balance</strong>  and Select <strong>Place Balance</strong> to get the Balance to the Center
        </>}/>
      )}

      {lessonStep===23 && (<DialogBox text={
        <>
         Now Select <strong>Held Test Tube</strong> and Select <strong>Weigh Test Tube</strong> 
        </>}/>
      )}  
      
      {lessonStep===24 && (<DialogBox text={
        <>
        24
        </>}/>
      )}

      {lessonStep===25 && (<DialogBox text={
        <>
        25
        </>}/>
      )}                        
       </>
    )
}

export default MolarVolumeLesson