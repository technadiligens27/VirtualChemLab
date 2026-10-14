import { useContext, useEffect } from "react"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox"
import SulfamicGuidelines from "../../SulfamicGuidelines/SulfamicGuidelines"
import EnthalpyLessonOverview from "../../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview"
import { flameTestData } from "../../Data/flameTestData/flameTestData"
import SafetyScreen from "../../SafetyScreen/SafetyScreen"
import { safetyInstructionData } from "../../Data/SafetyInstruction/SafetyInstruction"

const FlameTest = ()=>{

  const {
    graduatedBeakerRef,conicalBeakerRef02,conicalBeakerRef,seperatingFunnelRef,pipetteRef,gogglesRef,gloverightRef,
    graduatedBeaker50OriginalStateRef,volumetricRef,roundBeakerRef,gloveleftRef,potassiumHydrogenCarbonateRef,separatingFunnelBungRef,
    heatingMantleRef,volumetricPipetteRef,mainBuiretteRef,digitalBalanceRef,mainDropperRef,graduatedPipetteRef,testube02Ref,
    testube02OriginalStateRef,graduatedPipetteOriginalStateRef,seperatingFunnelOriginalStateRef,
  } = useContext(ModelContext)    
    
  const { selectedLesson,setLessonStep,setSafetyStep,lessonStep } = useContext(MainGuidelineContext)

  const {setSelectedRightHand,setSelectedLeftHand,selectedLeftHand,selectedRightHand,setIsClampTestube,setIsClampInCenter,setIsModelCentre,
    setIsDropperFilled,setIsBeakerNearClamp,setIsDropperPlaced
  } = useContext(InteractionContext)

    useEffect(()=>{
    if(volumetricPipetteRef.current){
         volumetricPipetteRef.current.visible = false
    }
    },[])    
 

    return(
        <>

 
       {
         lessonStep===1 && <EnthalpyLessonOverview
          reactionData={ flameTestData [0]}
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

        {lessonStep == 3 && <DialogBox text={
          <>
           Click <strong>Heating Mat</strong> and Select <strong>Place In Center</strong>
          </>
          } 
        />}

        {lessonStep == 4 && <DialogBox text={
          <>
          Click <strong>the Bunsen Burner</strong> and select <strong>Place In Heating Mat</strong>
          </>
          } 
        />}

        {lessonStep == 5 && <DialogBox text={
          <>
          Click <strong>the Bunsen Burner</strong> and select <strong>Connect Gas Tube</strong>
          </>
          } 
        />}

        {lessonStep == 6 && <DialogBox text={
          <>
          Click The <strong>Beaker</strong> and Select <strong>Right Hand</strong>
          </>
          } 
        />}

        {lessonStep == 7 && <DialogBox text={
          <>
          Click The <strong>Beaker</strong> and Select <strong>Add Liquid</strong>
          </>
          } 
        />}

        {lessonStep == 8 && <DialogBox text={
          <>
          Fill With <strong>Hydrochloric Acid (30 cm³)</strong>
          </>
          } 
        />}

        {lessonStep == 9 && <DialogBox text={
          <>
          Click The <strong>Water Bottle</strong> and Select <strong>Left Hand</strong>
          </>
          } 
        />}

        {lessonStep == 10 && <DialogBox text={
          <>
          10
          </>
          } 
        />}

        </>           

    )
}

export default FlameTest