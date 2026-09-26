import { useContext, useEffect } from "react"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox"

const ChlorinationLesson05 = ()=>{

  const {
    graduatedBeakerRef,conicalBeakerRef02,conicalBeakerRef,seperatingFunnelRef,pipetteRef,gogglesRef,gloverightRef,
    graduatedBeaker50OriginalStateRef,volumetricRef,roundBeakerRef,gloveleftRef,potassiumHydrogenCarbonateRef,separatingFunnelBungRef,
    heatingMantleRef,volumetricPipetteRef,mainBuiretteRef,digitalBalanceRef,mainDropperRef,graduatedPipetteRef,testube02Ref,
    testube02OriginalStateRef,graduatedPipetteOriginalStateRef
  } = useContext(ModelContext)    
    
  const { selectedLesson,setLessonStep,setSafetyStep,lessonStep } = useContext(MainGuidelineContext)

  const {setSelectedRightHand,setSelectedLeftHand,selectedLeftHand,selectedRightHand,setIsClampTestube,setIsClampInCenter,setIsModelCentre,
    setIsDropperFilled
  } = useContext(InteractionContext)

  useEffect(()=>{
    if(selectedLesson!==14.4)return
    setLessonStep(134)
    setSafetyStep(4)

    setIsClampInCenter(true)
    setIsClampTestube(true)
    setIsModelCentre(true)

    setSelectedLeftHand(null)
    setSelectedRightHand(null)

    if(conicalBeakerRef.current){
        conicalBeakerRef.current.visible = false
    }

    if(conicalBeakerRef02.current){
        conicalBeakerRef02.current.visible = true
    }

    if(seperatingFunnelRef.current){
        seperatingFunnelRef.current.visible = true
        separatingFunnelBungRef.current.visible = true
    }

    if (gogglesRef?.current) {
        gogglesRef.current.visible = false
    }

    if (gloverightRef?.current) {
        gloverightRef.current.visible =false
    }

    if (gloveleftRef?.current) {
        gloveleftRef.current.visible = false
    }

    if(volumetricRef.current){
      volumetricRef.current.visible = false;
     }

     if(roundBeakerRef.current){
      roundBeakerRef.current.visible = true
     }

     if(heatingMantleRef.current){
      heatingMantleRef.current.visible = true
     }

     if(volumetricPipetteRef.current){
      volumetricPipetteRef.current.visible = false
     }

     if(mainBuiretteRef.current){
      mainBuiretteRef.current.visible = false
     }

     if(digitalBalanceRef.current){
      digitalBalanceRef.current.visible = false
     }

     if(mainDropperRef.current){
      mainDropperRef.current.visible = true
     }

     if(pipetteRef.current){
      pipetteRef.current.visible = false
     }

     if(graduatedPipetteRef.current){
      graduatedPipetteRef.current.visible = true
     }
  },[selectedLesson])  

  useEffect(()=>{
    if(selectedLesson==14.4 && lessonStep==151){
      setIsDropperFilled(true)
    }
  },[selectedLesson,lessonStep])

  useEffect(()=>{
    if(testube02Ref.current){
        testube02Ref.current.traverse((child)=>{
            if(child.isMesh && child.name.includes("liquid")){
                child.visible = true
                child.scale.y = 53
            }
        })
    }
  },[testube02Ref])

  useEffect(()=>{
    if(testube02Ref.current && testube02OriginalStateRef.current){
     setSelectedLeftHand({
        hand:"left",
        name: "main-testube-02",
        ref: testube02Ref,
        originalParent: testube02OriginalStateRef.current.parent,
        originalPosition: testube02OriginalStateRef.current.position.clone(),
        originalRotation: testube02OriginalStateRef.current.rotation.clone(),
     })
    }
  },[testube02OriginalStateRef,testube02Ref])

  useEffect(()=>{
    if(graduatedPipetteRef.current && graduatedPipetteOriginalStateRef.current){
     setSelectedRightHand({
        hand:"right",
        name: "graduated-pipette",
        ref: graduatedPipetteRef,
        originalParent: graduatedPipetteOriginalStateRef.current.parent,
        originalPosition: graduatedPipetteOriginalStateRef.current.position.clone(),
        originalRotation: graduatedPipetteOriginalStateRef.current.rotation.clone(),
     })
    }
  },[testube02OriginalStateRef,graduatedPipetteRef])

  useEffect(() => {
  if (
    selectedLesson === 14.4 &&
    lessonStep === 144
  ) {
    const timer = setTimeout(() => {
      setLessonStep(145)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }
}, [
  selectedLesson,
  lessonStep,
  setLessonStep,
])


    return(
        <>
          {lessonStep ==134 && <DialogBox text={
          <>
           Click <strong>Held Pipette</strong> and Select <strong>Add Liquid</strong>
          </>
          } 
        />}
          {lessonStep ==135 && <DialogBox text={
          <>
           <strong>Fill</strong> With <strong>Aqueous Sodium Hydroxide  (1 cm³)</strong>
          </>
          } 
        />}  
          {lessonStep ==136 && <DialogBox text={
          <>
           Click The <strong>Pipette</strong> And Select <strong>Pipette Mode</strong>
          </>
          } 
        />}

          {lessonStep ==137 && <DialogBox text={
          <>
           <strong>Scroll Down</strong> To <strong>Pour From Pipette</strong>
          </>
          } 
        />}        

          {lessonStep ==138 && <DialogBox text={
          <>
           <strong>Scroll Up</strong> To <strong>Release The Pipette</strong>
          </>
          } 
        />}

          {lessonStep ==139 && <DialogBox text={
          <>
           Click The <strong>Pipette</strong> And Select <strong>Exit Pipette Mode</strong>
          </>
          } 
        />}          

          {lessonStep ==140 && <DialogBox text={
          <>
           Keep <strong>Graduated Pipette</strong> Back On The <strong>Table</strong>
          </>
          } 
        />}  

          {lessonStep ==141 && <DialogBox text={
          <>
           Pick Up The <strong>Beaker</strong>
          </>
          } 
        />}
          {lessonStep ==142 && <DialogBox text={
          <>
           Now Click The <strong>Held Beaker</strong> And Select <strong>Add Warm Water</strong>
          </>
          } 
        />}

          {lessonStep ==143 && <DialogBox text={
          <>
           Click The <strong>Test Tube </strong>And Select <strong>Place In Water Bath</strong>
          </>
          } 
        />}
          {lessonStep ==144 && <DialogBox text={
          <>
           Keep The <strong>Test Tube</strong> In The <strong>Water Bath</strong> For A While
          </>
          } 
        />}

          {lessonStep ==145 && <DialogBox text={
          <>
           Now Click The <strong>Beaker</strong> And <strong>Remove The Test Tube</strong>
          </>
          } 
        />}
          {lessonStep ==146 && <DialogBox text={
          <>
           Keep <strong>Water Bath Back</strong> On The <strong>Table</strong>
          </>
          } 
        />}
          {lessonStep ==147 && <DialogBox text={
          <>
           Pick Up The <strong>Dropper</strong>
          </>
          } 
        />}

          {lessonStep ==148 && <DialogBox text={
          <>
           Click The <strong>Dropper</strong> And Select <strong>Add Liquid</strong>
          </>
          } 
        />}

          {lessonStep ==149 && <DialogBox text={
          <>
           <strong>Fill</strong> With <strong>Nitric Acid (2 cm³)</strong>
          </>
          } 
        />}

          {lessonStep ==150 && <DialogBox text={
          <>
           Click The <strong>Dropper</strong> And Select <strong>Place Dropper</strong>
          </>
          } 
        />}

          {lessonStep ==151 && <DialogBox text={
          <>
           <strong>Scroll Down</strong> To <strong>Pour</strong>
          </>
          } 
        />}
          {lessonStep ==152 && <DialogBox text={
          <>
           <strong>Scroll Up</strong> To Release The <strong>Dropper</strong>
          </>
          } 
        />}

          {lessonStep ==153 && <DialogBox text={
          <>
           Click The <strong>Dropper</strong> And Select <strong>Remove Dropper</strong>
          </>
          } 
        />}

          {lessonStep ==154 && <DialogBox text={
          <>
           Click The <strong>Dropper</strong> And Select <strong>Add Liquid</strong>
          </>
          } 
        />}
          {lessonStep ==155 && <DialogBox text={
          <>
           <strong>Fill</strong> With <strong>Silver Nitrate (2 cm³)</strong>
          </>
          } 
        />}
          {lessonStep ==156 && <DialogBox text={
          <>
           Click The <strong>Dropper</strong> And Select <strong>Place Dropper</strong>
          </>
          } 
        />}

          {lessonStep ==157 && <DialogBox text={
          <>
           <strong>Scroll Down</strong> To <strong>Pour</strong>
          </>
          } 
        />} 

          {lessonStep ==158 && <DialogBox text={
          <>
           158
          </>
          } 
        />} 

        </>           

    )
}

export default ChlorinationLesson05