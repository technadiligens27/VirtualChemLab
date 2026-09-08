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

      {lessonStep>=3 && lessonStep<4 && (<SulfamicGuidelines guidelineData={molarVolumeGuidelineData[0]}/>)}

      {lessonStep===3 && (<DialogBox text={<>
          Pick Up <strong>Boiling Tube</strong> to <strong>Left Hand</strong>
        
        </>}/>
      )}
      {lessonStep===3.1 && (<DialogBox text={<>
         Click The <strong>Measuring Cylinder</strong> and Select <strong>Right Hand</strong>
        
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





      {lessonStep>=4 && lessonStep<15 && (<SulfamicGuidelines guidelineData={molarVolumeGuidelineData[1]}/>)}








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








      {lessonStep >= 15 && lessonStep < 23 && (<SulfamicGuidelines guidelineData={molarVolumeGuidelineData[2]}/>)}









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






      {lessonStep >= 23 && lessonStep < 25 && (<SulfamicGuidelines guidelineData={molarVolumeGuidelineData[3]}/>)}






      {lessonStep===23 && (<DialogBox text={
        <>
         Now Select <strong>Held Test Tube</strong> and Select <strong>Weigh Test Tube</strong> 
        </>}/>
      )}  
      
      {lessonStep===24 && (<DialogBox text={
        <>
        Click <strong>Weighed Test Tube</strong> and Select <strong>Remove Test Tube</strong>
        </>}/>
      )}







      {lessonStep >= 25 && lessonStep < 32 && (<SulfamicGuidelines guidelineData={molarVolumeGuidelineData[4]}/>)}








      {lessonStep===25 && (<DialogBox text={
        <>
        Select the <strong>Clamp</strong> and Click <strong>Disconnect Delivery Tube</strong>
        </>}/>
      )}            
      {lessonStep===26 && (<DialogBox text={
        <>
        Select held <strong>Test Tube</strong> Containing Calcium Carbonate and click <strong>Pour Mode</strong>
        </>}/>
      )}

      {lessonStep===27 && (<DialogBox text={
        <>
        <strong>Scroll Down</strong> to <strong>Pour Calcium Carbonate</strong> to Boiling Tube   
        </>}/>
      )}
      {lessonStep===28 && (<DialogBox text={
        <>
        Observe the Reaction   
        </>}/>
      )}

      {lessonStep==29 && <MolarVolumeReduced/>}

      {lessonStep===29 && (<DialogBox text={
        <>
        Click the Testube We poured From and Select <strong>Disable Pour Mode</strong>
        </>}/>
      )}

      {lessonStep===30 && (<DialogBox text={
        <>
         Now Select <strong>Held Test Tube</strong> and Select <strong>Weigh Test Tube</strong> 
        </>}/>
      )}
      {lessonStep===31 && (<DialogBox text={
        <>
        Select <strong>Weighed Testube</strong> and select <strong>Remove Testube</strong>
        </>}/>
      )}

      {lessonStep===32 && <MolarVolumeCalciumCarbonateUsed/>}



      <MolarVolumeLiveDataPanel
        trialNumber={1}
        totalTrials={7}

        ethanoicAcidVolume={
          lessonStep >= 3.6
            ? 30
            : null
        }

        // Test tube + CaCO3 mass before transfer
        massBeforeTransfer={
          lessonStep >= 24
            ? 21.77
            : null
        }

        // Test tube mass after CaCO3 has been transferred
        massAfterTransfer={
          lessonStep >= 31
            ? 21.72
            : null
        }

        // Difference between the two masses
        calciumCarbonateMass={
          lessonStep >= 31
            ? 0.05
            : null
        }

        // Gas begins being collected once reaction starts
        currentCO2Volume={
          lessonStep >= 28
            ? 12
            : null
        }

        // Final reading only after reaction finishes
        finalCO2Volume={
          lessonStep >= 29
            ? 12
            : null
        }

        reactionStatus={
          lessonStep >= 29
            ? "Complete"
            : lessonStep >= 28
              ? "Reacting"
              : null
        }

        trialResults={[
          {
            mass:
              lessonStep >= 31
                ? 0.05
                : null,

            co2Volume:
              lessonStep >= 29
                ? 12
                : null,
          },

          {
            mass: null,
            co2Volume: null,
          },

          {
            mass: null,
            co2Volume: null,
          },

          {
            mass: null,
            co2Volume: null,
          },

          {
            mass: null,
            co2Volume: null,
          },

          {
            mass: null,
            co2Volume: null,
          },

          {
            mass: null,
            co2Volume: null,
          },
        ]}

        selectedLesson={
          selectedLesson
        }

        lessonStep={
          lessonStep
        }

        autoHideDelay={
          3000
        }

        autoShowConditions={[
          // Acid volume recorded
          {
            selectedLesson:
              selectedLesson,

            lessonStep:
              3.6,
          },

          // Initial mass recorded
          {
            selectedLesson:
              selectedLesson,

            lessonStep:
              24,
          },

          // Reaction starts
          {
            selectedLesson:
              selectedLesson,

            lessonStep:
              28,
          },

          // Final CO2 reading
          {
            selectedLesson:
              selectedLesson,

            lessonStep:
              29,
          },

          // Final test-tube mass / CaCO3 mass
          {
            selectedLesson:
              selectedLesson,

            lessonStep:
              31,
          },
        ]}
      />



       </>
    )
}

export default MolarVolumeLesson