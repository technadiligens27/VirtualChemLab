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

    useEffect(()=>{
      if(graduatedBeakerRef.current){
        graduatedBeakerRef.current.visible = false
      }
    },[graduatedBeakerRef])

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
        13       
        </>}/>
      )}  

       </>
    )
}

export default MolarVolumeLesson