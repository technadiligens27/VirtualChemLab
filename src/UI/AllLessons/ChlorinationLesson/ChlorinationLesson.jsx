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
import {chlorinationGuidelineData,chlorinationReactionData } from "../../Data/chlorinationLessonData/chlorinationLessonData.jsx"
import SulfamicAcidResult from "../../SulfamicAcidResult/SulfamicAcidResult.jsx";
import ChlorinationLesson02 from "./ChlorinationLesson02.jsx";
import ChlorinationLiveDataPanel from "./ChlorinationLiveDataPanel/ChlorinationLiveDataPanel.jsx";


const ChlorinationLesson = ()=>{

    const {isFillBeakerBoxOpen,setShowQuestionCardNo,showQuestionCardNo} = useContext(InteractionContext)
    const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);
    const {graduatedBeakerRef,conicalBeakerRef02,conicalBeakerRef,seperatingFunnelRef,volumetricRef,heatingMantleRef,
      pipetteRef,roundBeakerRef,volumetricPipetteRef,mainBuiretteRef,digitalBalanceRef
    } = useContext(ModelContext)

    const resetLesson = useResetLesson()

    useEffect(()=>{

      if(digitalBalanceRef.current){
         digitalBalanceRef.current.visible = false
      }  
      
      if(mainBuiretteRef.current){
         mainBuiretteRef.current.visible = false
      }
     
    if(volumetricPipetteRef.current){
      volumetricPipetteRef.current.visible = false
    }  

      if(conicalBeakerRef02.current){
        conicalBeakerRef02.current.visible=true
      }

     if(conicalBeakerRef.current){
        conicalBeakerRef.current.visible=false
      }     
      
     if(seperatingFunnelRef.current){
      seperatingFunnelRef.current.visible = true
     }
     
     if(pipetteRef.current){
      pipetteRef.current.visible = false
     }

     if(volumetricRef.current){
      volumetricRef.current.visible =false
     }

     if(roundBeakerRef.current){
      roundBeakerRef.current.visible = true
     }

     if(heatingMantleRef.current){
      heatingMantleRef.current.visible = true
     }
    },[conicalBeakerRef,conicalBeakerRef02,seperatingFunnelRef,pipetteRef,roundBeakerRef,volumetricRef,
      heatingMantleRef,
      digitalBalanceRef,
      mainBuiretteRef,
      volumetricPipetteRef
    ])

 return(
       <>

       {
         lessonStep===1 && <EnthalpyLessonOverview
          reactionData={chlorinationReactionData [0]}
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


      {
         <ChlorinationLiveDataPanel/>
      }


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
        Fill With <strong>Hydrochloric Acid (35 cm³)</strong>     
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

      {lessonStep >=15 && lessonStep <21 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[2]}/>)}


      {lessonStep===15 && (<DialogBox text={<>
         Now <strong>Scroll Down Continuously</strong> to gently <strong>Swirl</strong> the <strong>Conical Flask</strong>
        </>}/>
      )}                




      {/* {lessonStep >=16 && lessonStep <24 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[3]}/>)} */}





      {lessonStep===16 && (<DialogBox text={<>
         Now Select <strong>Held Conical Flask</strong> and Select <strong>Place Bung</strong>

      </>}/>
          )}


      {lessonStep===17 && (<DialogBox text={<>
         Now <strong>Scroll Down Continuously</strong> to gently <strong>Swirl</strong> the <strong>Conical Flask</strong> again
        </>}/>
      )}


      {/* {lessonStep >=17 && lessonStep <24 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[4]}/>)} */}



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


      {lessonStep >=21 && lessonStep <=24 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[5]}/>)}



      {lessonStep===21 && (<DialogBox text={<>
         Now <strong>Scroll Down Continuously</strong> to gently <strong>Swirl</strong> the <strong>Conical Flask</strong> again
      </>}/>
      )}

      {lessonStep===22 && (<DialogBox text={<>
         <strong>Remove Bung</strong> from <strong>Conical Flask</strong>
      </>}/>
      )}
      {lessonStep===23 && (<DialogBox text={<>
         Pressure Will be Released From <strong>Conical Flask</strong> 
        </>}/>
      )} 





      {lessonStep===24 && (<DialogBox text={<>
         Now Lets Keep the <strong>Measuring Cylinder</strong> Back in the Table
        </>}/>
      )} 
     {[
  14,
  14.1,
  14.2,
  14.3,
  14.4,
].includes(selectedLesson) && (
  <ChlorinationLiveDataPanel
    // =======================================================
    // REACTION MIXTURE
    // =======================================================

    alcoholAmount={
      lessonStep >= 5
        ? 10
        : null
    }

    hydrochloricAcidAmount={
      lessonStep >= 11
        ? 35
        : null
    }

    mixingTime={
      lessonStep >= 23
        ? 1200
        : lessonStep >= 15
          ? "In progress"
          : null
    }

    reactionStatus={
      lessonStep >= 23
        ? "Complete"
        : lessonStep >= 15
          ? "Reacting"
          : lessonStep >= 13
            ? "Mixture prepared"
            : null
    }

    // =======================================================
    // SEPARATION AND PURIFICATION
    // =======================================================

    layerStatus={
      lessonStep >= 41
        ? "Separated"
        : lessonStep >= 23
          ? "Two layers formed"
          : null
    }

    calciumChlorideMass={
      lessonStep >= 30
        ? 6
        : null
    }

    sodiumHydrogencarbonateAmount={
      lessonStep >= 67
        ? 40
        : lessonStep >= 49
          ? 20
          : null
    }

    secondWashStatus={
      lessonStep >= 81
        ? "Complete"
        : lessonStep >= 67
          ? "In progress"
          : lessonStep >= 62
            ? "Preparing"
            : null
    }

    funnelPressure={
      [
        53,
        53.1,
        56,
        56.1,
        72,
        73,
        76,
        77,
      ].includes(lessonStep)
        ? "Pressure building"
        : [
            54,
            57,
            74,
            78,
          ].includes(lessonStep)
          ? "Released"
          : lessonStep > 78
            ? "Released"
            : null
    }

    aqueousLayerStatus={
      lessonStep >= 81
        ? "Removed"
        : lessonStep >= 67
          ? "Present"
          : lessonStep >= 61
            ? "Removed"
            : lessonStep >= 49
              ? "Present"
              : lessonStep >= 43
                ? "Removed"
                : lessonStep >= 41
                  ? "Present"
                  : null
    }

    organicLiquidStatus={
      lessonStep >= 93
        ? "Clear and dry"
        : lessonStep >= 89
          ? "Drying"
          : lessonStep >= 84
            ? "Collected"
            : null
    }

    // =======================================================
    // DISTILLATION
    // =======================================================

    currentTemperature={
      selectedLesson === 14.3 &&
      lessonStep >= 109
        ? 51
        : selectedLesson === 14.4
          ? 51
          : null
    }

    collectionRange="50–52°C"

    fractionStatus={
      selectedLesson === 14.3 &&
      lessonStep >= 110
        ? "Correct fraction collected"
        : selectedLesson === 14.3 &&
            lessonStep >= 109
          ? "Collecting product"
          : selectedLesson === 14.3 &&
              lessonStep >= 108
            ? "Heating"
            : selectedLesson === 14.4
              ? "Correct fraction collected"
              : null
    }

    productCollectionStatus={
      selectedLesson === 14.3 &&
      lessonStep >= 110
        ? "Complete"
        : selectedLesson === 14.3 &&
            lessonStep >= 109
          ? "In progress"
          : selectedLesson === 14.4
            ? "Complete"
            : null
    }

    // =======================================================
    // PRODUCT ANALYSIS
    // =======================================================

    ethanolAmount={
      lessonStep >= 129
        ? 5
        : null
    }

    sodiumHydroxideAmount={
      lessonStep >= 135
        ? 1
        : null
    }

    nitricAcidAmount={
      lessonStep >= 149
        ? 2
        : null
    }

    silverNitrateStatus={
      lessonStep >= 157
        ? "2.0 cm³ added"
        : lessonStep >= 155
          ? "2.0 cm³ prepared"
          : null
    }

    observation={
      lessonStep >= 158
        ? "White precipitate"
        : lessonStep >= 157
          ? "Reaction occurring"
          : null
    }

    testConclusion={
      lessonStep >= 158
        ? "Chloride ions confirmed"
        : null
    }

    // =======================================================
    // LESSON CONTROL
    // =======================================================

    selectedLesson={
      selectedLesson
    }

    lessonStep={
      lessonStep
    }

    autoShowConditions={[
      // Initial reactants
      {
        selectedLesson: 14,
        lessonStep: 6,
      },
      {
        selectedLesson: 14,
        lessonStep: 12,
      },

      // Reaction complete and layers formed
      {
        selectedLesson: 14,
        lessonStep: 23,
      },

      // Calcium chloride added
      {
        selectedLesson: 14.1,
        lessonStep: 30,
      },

      // Layers separated
      {
        selectedLesson: 14.1,
        lessonStep: 41,
      },

      // First NaHCO₃ wash
      {
        selectedLesson: 14.1,
        lessonStep: 50,
      },

      // First wash pressure released
      {
        selectedLesson: 14.1,
        lessonStep: 57,
      },

      // Second wash added
      {
        selectedLesson: 14.2,
        lessonStep: 67,
      },

      // Second wash pressure released
      {
        selectedLesson: 14.2,
        lessonStep: 78,
      },

      // Aqueous layer removed
      {
        selectedLesson: 14.2,
        lessonStep: 81,
      },

      // Organic layer collected
      {
        selectedLesson: 14.2,
        lessonStep: 84,
      },

      // Organic product dried
      {
        selectedLesson: 14.3,
        lessonStep: 93,
      },

      // Distillation started
      {
        selectedLesson: 14.3,
        lessonStep: 109,
      },

      // Ethanol added
      {
        selectedLesson: 14.3,
        lessonStep: 131,
      },

      // Sodium hydroxide added
      {
        selectedLesson: 14.4,
        lessonStep: 137,
      },

      // Nitric acid added
      {
        selectedLesson: 14.4,
        lessonStep: 151,
      },

      // Silver nitrate added
      {
        selectedLesson: 14.4,
        lessonStep: 157,
      },

      // Final observation
      {
        selectedLesson: 14.4,
        lessonStep: 158,
      },
    ]}

    autoHideDelay={3000}
  />
)}
       </>
    )



    

}

export default ChlorinationLesson