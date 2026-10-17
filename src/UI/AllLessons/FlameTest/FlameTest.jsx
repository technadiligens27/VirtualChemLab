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
    testube02OriginalStateRef,graduatedPipetteOriginalStateRef,seperatingFunnelOriginalStateRef,condensorRef,
  } = useContext(ModelContext)    
    
  const { selectedLesson,setLessonStep,setSafetyStep,lessonStep } = useContext(MainGuidelineContext)

  const {setSelectedRightHand,setSelectedLeftHand,selectedLeftHand,selectedRightHand,setIsClampTestube,setIsClampInCenter,setIsModelCentre,
    setIsDropperFilled,setIsBeakerNearClamp,setIsDropperPlaced,setIsDipMode
  } = useContext(InteractionContext)

    useEffect(()=>{
    if(pipetteRef.current){
      pipetteRef.current.visible = false
    }
    if(volumetricPipetteRef.current){
      volumetricPipetteRef.current.visible = false
    }
    },[])    
 
    useEffect(()=>{
      if(selectedLesson==15 && [18,24].includes(lessonStep)){
        setIsDipMode(false)
      }
    },[lessonStep])


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
          Press <strong>P</strong> to <strong>Enter Pour Mode</strong>
          </>
          } 
        />}

        {lessonStep == 11 && <DialogBox text={
          <>
          <strong>Scroll Down</strong> to <strong>Pour </strong>
          </>
          } 
        />}

        {lessonStep == 12 && <DialogBox text={
          <>
          Keep <strong>Water Bottle</strong> back on the<strong> Table </strong>
          </>
          } 
        />}

        {lessonStep == 13 && <DialogBox text={
          <>
          <strong>Scroll Down continously</strong> to <strong>Swirl </strong> the beaker
          </>
          } 
        />}

        {lessonStep == 14 && <DialogBox text={
          <>
          <strong>Pick Up </strong> the <strong>Nichrome Wire </strong> to <strong>Left Hand</strong>
          </>
          } 
        />}

        {lessonStep == 15 && <DialogBox text={
          <>
         Click the <strong> Held Wire</strong> and Select <strong>Dip </strong>
          </>
          } 
        />}

        {lessonStep == 16 && <DialogBox text={
          <>
         <strong>Scroll Down Continously</strong> to <strong>Dip</strong> the <strong>Nichrome Wire</strong>
          </>
          } 
        />}

        {lessonStep == 17 && <DialogBox text={
          <>
         <strong>Scroll Upwards Continously</strong> to <strong>remove</strong> the <strong>Nichrome Wire</strong>
          </>
          } 
        />}

        {lessonStep == 18 && <DialogBox text={
          <>
         Click the <strong>Bunsen burner</strong> and <strong>light it</strong>
          </>
          } 
        />}

        {lessonStep == 19 && <DialogBox text={
          <>
         <strong>Scroll Down Continously</strong> to <strong>Heat</strong> the Nichrome Wire 
          </>
          } 
        />}

        {lessonStep == 20 && <DialogBox text={
          <>
         <strong>Scroll Up Continously</strong> to <strong>Remove</strong> the <strong>Nichrome Wire</strong> 
          </>
          } 
        />}
        {lessonStep == 21 && <DialogBox text={
          <>
         Click the <strong> Held Wire</strong> and Select <strong>Dip </strong>
          </>
          } 
        />}

        {lessonStep == 22 && <DialogBox text={
          <>
         <strong>Scroll Down Continously</strong> to <strong>Dip</strong> the <strong>Nichrome Wire</strong>
          </>
          } 
        />}

        {lessonStep == 23 && <DialogBox text={
          <>
         <strong>Scroll Up Continously</strong> to <strong>Remove</strong> the <strong>Nichrome Wire</strong> 
          </>
          } 
        />}

        {lessonStep == 24 && <DialogBox text={
          <>
         Click the <strong>Held Beaker</strong> and <strong>Keep Back On Table</strong>
          </>
          } 
        />}

        {lessonStep == 25 && <DialogBox text={
          <>
         Click the <strong>lithium chloride sample</strong> and <strong>Pick Up</strong>
          </>
          } 
        />}


        </>           

    )
}

export default FlameTest