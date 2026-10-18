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

const FlameTest02 = ()=>{

  const {
    graduatedBeakerRef,conicalBeakerRef02,conicalBeakerRef,seperatingFunnelRef,pipetteRef,gogglesRef,gloverightRef,
    graduatedBeaker50OriginalStateRef,volumetricRef,roundBeakerRef,gloveleftRef,potassiumHydrogenCarbonateRef,separatingFunnelBungRef,
    heatingMantleRef,volumetricPipetteRef,mainBuiretteRef,digitalBalanceRef,mainDropperRef,graduatedPipetteRef,testube02Ref,
    testube02OriginalStateRef,graduatedPipetteOriginalStateRef,seperatingFunnelOriginalStateRef,condensorRef,heatingMatRef,powderContainer,
    nichromeWireRef
  } = useContext(ModelContext)    
    
  const { selectedLesson,setLessonStep,setSafetyStep,lessonStep,setSelectedLesson} = useContext(MainGuidelineContext)

  const {setSelectedRightHand,setSelectedLeftHand,selectedLeftHand,selectedRightHand,setIsClampTestube,setIsClampInCenter,setIsModelCentre,
    setIsDropperFilled,setIsBeakerNearClamp,setIsDropperPlaced,setIsDipMode,setIsModelInHeatingMat,setShowBunsenFlame
  } = useContext(InteractionContext)

    useEffect(()=>{
    if(pipetteRef.current){
      pipetteRef.current.visible = false
    }
    if(volumetricPipetteRef.current){
      volumetricPipetteRef.current.visible = false
    }
    if(heatingMatRef.current){
      heatingMatRef.current.visible = true
    }

    if(powderContainer.current){
      powderContainer.current.visible = true
    }
    },[])    

    useEffect(()=>{
        setSelectedLesson(15.2)
        setSafetyStep(4)
        setLessonStep(25)
        gogglesRef.current.visible = false 
     gloverightRef.current.visible = false 
     gloveleftRef.current.visible = false 
    },[])
 
    useEffect(()=>{
      if (selectedLeftHand?.name !== "nichrome-wire") {
            setSelectedLeftHand({
            hand: "left",
            name: "nichrome-wire",
            ref: nichromeWireRef,
            originalParent:
                nichromeWireRef.current.parent,

            originalPosition:
                nichromeWireRef.current.position.clone(),

            originalRotation:
                nichromeWireRef.current.rotation.clone(),

            originalScale:
                nichromeWireRef.current.scale.clone(),
            })
        }
    },[])

    useEffect(()=>{
        setIsModelCentre(true);
        setIsModelInHeatingMat(true);
        setShowBunsenFlame(true)
    },[])
    useEffect(()=>{
      if(selectedLesson==15.2 && [31].includes(lessonStep)){
        setIsDipMode(false)
      }
    },[lessonStep])
    return(
        <>


        {lessonStep == 26 && <DialogBox text={
          <>
         Click the <strong>Held Empty Container</strong> and Select <strong>Add Powder</strong>
          </>
          } 
        />}

        {lessonStep == 27 && <DialogBox text={
          <>
         Select <strong>Any Metal Salt</strong>
          </>
          } 
        />}

        {lessonStep == 28 && <DialogBox text={
          <>
         Click the <strong>Held Nichrome Wire</strong> and Select <strong>Dip</strong>
          </>
          } 
        />}

        {lessonStep == 29 && <DialogBox text={
          <>
         <strong>Scroll Down Continously</strong> to <strong>Dip</strong> the <strong>Nichrome Wire</strong>
          </>
          } 
        />}

        {lessonStep == 30 && <DialogBox text={
          <>
         <strong>Scroll Up Continously</strong> to <strong>Remove</strong> the <strong>Nichrome Wire </strong>
          </>
          } 
        />}

        {lessonStep == 31 && <DialogBox text={
          <>
         <strong>Scroll Down Continously</strong> to <strong>Dip</strong> the <strong>Nichrome Wire 31</strong>
          </>
          } 
        />}

        </>           

    )
}

export default FlameTest02