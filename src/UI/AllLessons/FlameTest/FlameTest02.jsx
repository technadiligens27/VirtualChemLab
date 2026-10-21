import { useContext, useEffect } from "react"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox"
import SulfamicGuidelines from "../../SulfamicGuidelines/SulfamicGuidelines"
import EnthalpyLessonOverview from "../../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview"
import { flameTestData,flameTestGuidelineData } from "../../Data/flameTestData/flameTestData"
import SafetyScreen from "../../SafetyScreen/SafetyScreen"
import { safetyInstructionData } from "../../Data/SafetyInstruction/SafetyInstruction"
import FlameTestSummary from "../../Summary/FlameTestSummary/FlameTestSummary"

const FlameTest02 = ()=>{

  const {
    graduatedBeakerRef,conicalBeakerRef02,conicalBeakerRef,seperatingFunnelRef,pipetteRef,gogglesRef,gloverightRef,
    graduatedBeaker50OriginalStateRef,volumetricRef,roundBeakerRef,gloveleftRef,potassiumHydrogenCarbonateRef,separatingFunnelBungRef,
    heatingMantleRef,volumetricPipetteRef,mainBuiretteRef,digitalBalanceRef,mainDropperRef,graduatedPipetteRef,testube02Ref,
    testube02OriginalStateRef,graduatedPipetteOriginalStateRef,seperatingFunnelOriginalStateRef,condensorRef,heatingMatRef,powderContainer,
    nichromeWireRef,nichromeWirePowderRef,metalSaltRef,airHoleRef,bunsenBurnerRef
  } = useContext(ModelContext)    
    
  const {selectedLesson,setLessonStep,setSafetyStep,lessonStep,setSelectedLesson} = useContext(MainGuidelineContext)

  const {setSelectedRightHand,setSelectedLeftHand,selectedLeftHand,selectedRightHand,setIsClampTestube,setIsClampInCenter,setIsModelCentre,
    setIsDropperFilled,setIsBeakerNearClamp,setIsDropperPlaced,setIsDipMode,setIsModelInHeatingMat,setShowBunsenFlame,setShowPowderInContainer
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
      if(selectedLesson==15.2 && lessonStep==29){
        bunsenBurnerRef.current.visible = false
      }
      if(selectedLesson==15.2 && lessonStep==31){
        bunsenBurnerRef.current.visible = true
      }

    },[lessonStep])

    useEffect(()=>{
        setSelectedLesson(15.2)
        setSafetyStep(4)
        setLessonStep(26)
        // setShowBunsenFlame(false)

        gogglesRef.current.visible = false 
        gloverightRef.current.visible = false 
        gloveleftRef.current.visible = false 
    },[])

    useEffect(()=>{
      if(selectedLesson==15.2 && lessonStep==30){
        nichromeWirePowderRef.current.visible = true
      }
    },[lessonStep])

    const handleRestart = ()=>{
      setLessonStep(26);
      nichromeWirePowderRef.current.visible = false;
      setShowPowderInContainer(false)
    }

    useEffect(()=>{
      if(airHoleRef.current){
        airHoleRef.current.visible = true
      }
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
    },[])
    useEffect(()=>{
      if(selectedLesson==15.2 && [31].includes(lessonStep)){
        setIsDipMode(false)
      }
    },[lessonStep])
    return(
        <>

      {lessonStep >=26 &&  lessonStep <=28 && <SulfamicGuidelines guidelineData={flameTestGuidelineData[7]}/>}

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
         Click the <strong>Bunsen burner</strong> and <strong>light it</strong>
          </>
          } 
        />}

        {lessonStep == 32 && <DialogBox text={
          <>
         <strong>Scroll Down Continously</strong> to <strong>Heat</strong> the Nichrome Wire 
          </>
          } 
        />}

        {lessonStep == 33 && <DialogBox text={
          <>
         <strong>Observe the Flame Colour Change</strong> 
          </>
          } 
          button1Text="Try Difference Metal Salt"
          onbtnClick={handleRestart}

          // button2Text="Questions"

        />}

        {
          lessonStep === 34 && <FlameTestSummary/>
        }

        </>           

    )
}

export default FlameTest02