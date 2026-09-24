import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox"
import ChlorinationLesson05 from "./ChlorinationLesson05"

const ChlorinationLesson04 = () => {
  const { selectedLesson,setLessonStep,setSafetyStep,lessonStep } = useContext(MainGuidelineContext)

  const {setSelectedRightHand,setSelectedLeftHand,selectedLeftHand,selectedRightHand,setIsClampTestube,setIsClampInCenter,
    setIsModelCentre} = useContext(InteractionContext)

  const {
    graduatedBeakerRef,
    conicalBeakerRef02,
    conicalBeakerRef,

    seperatingFunnelRef,
    pipetteRef,

    gogglesRef,
    gloverightRef,graduatedBeaker50OriginalStateRef,volumetricRef,roundBeakerRef,
    gloveleftRef,potassiumHydrogenCarbonateRef,separatingFunnelBungRef,heatingMantleRef,volumetricPipetteRef,mainBuiretteRef,
    digitalBalanceRef,mainDropperRef,graduatedPipetteRef
  } = useContext(ModelContext)

  useEffect(()=>{
    if(selectedLesson!==14.3)return
    setLessonStep(85)
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
    if(selectedLesson==14.3 && lessonStep==85){
        setSelectedLeftHand(null)
        setSelectedRightHand(null)
    }
    
  },[selectedLesson,lessonStep])



useEffect(() => {
  const model = conicalBeakerRef02?.current

  if (!model) return

model.traverse((child) => {
  const childName =
    child.name?.toLowerCase() || ""

  if (
    !child.isMesh ||
    !childName.includes("liquid")
  ) {
    return
  }

  child.visible = true
  child.scale.y = 1

  const materials = Array.isArray(child.material)
    ? child.material
    : [child.material]

  materials.forEach((material) => {
    if (!material) return

    // Clone it so both meshes can be updated safely.
    const clonedMaterial = material.clone()

    clonedMaterial.color.set("#F4D35E")
    clonedMaterial.transparent = true
    clonedMaterial.opacity = 0.35
    clonedMaterial.depthWrite = false
    clonedMaterial.needsUpdate = true

    if (Array.isArray(child.material)) {
      const materialIndex =
        child.material.indexOf(material)

      child.material[materialIndex] =
        clonedMaterial
    } else {
      child.material = clonedMaterial
    }
  })
})
}, [conicalBeakerRef02])

  useEffect(()=>{
    if(potassiumHydrogenCarbonateRef.current){
      if(selectedLesson==14.3 && lessonStep>=64){
         potassiumHydrogenCarbonateRef.current.visible=false
       }
      }
   },[potassiumHydrogenCarbonateRef,selectedLesson,lessonStep])

   useEffect(()=>{
    if(selectedLesson==14.3 && [108,114].includes(lessonStep)){
      setSelectedRightHand(null)
    }
   },[selectedLesson,lessonStep])


  return (
        <>

        {lessonStep ==85 && <DialogBox text={
          <>
             Pick Up <strong>Spatula</strong> to <strong>Right Hand</strong>
          </>
          } 
        />}  

        {lessonStep ==86 && <DialogBox text={
          <>
             Click the <strong>Conical Flask</strong> to <strong>Left Hand</strong>
          </>
          } 
        />}  
        {lessonStep ==87 && <DialogBox text={
          <>
          Click the <strong>Anhydrous Sodium Sulfate Container</strong> and select <strong>Take Anhydrous Sodium Sulfate.</strong> 
          </>
          } 
        />}  
        {lessonStep ==88 && <DialogBox text={
          <>
          Click the <strong>Held Spatula</strong> and select <strong>Pour Into Test Tube</strong> 
          </>
          } 
        />} 

        {lessonStep ==89 && <DialogBox text={
          <>
          <strong>Scroll Down</strong> to <strong>Pour</strong>
          </>
          } 
        />}          
        {lessonStep ==90 && <DialogBox text={
          <>
          Click the <strong>Held Spatula</strong> and select <strong>Disable Pour Mode</strong> 

          </>
          } 
        />}

        {lessonStep ==91 && <DialogBox text={
          <>
        Select <strong>Conical Flask</strong> and <strong>Add Bung</strong> 

          </>
          } 
        />}         
        {lessonStep ==92 && <DialogBox text={
          <>
        <strong>Scroll Down</strong> to <strong>Swirl</strong>

          </>
          } 
        />}

        {lessonStep ==93 && <DialogBox text={
          <>
          Keep <strong>Spatula</strong> back in <strong>Table</strong>

          </>
          } 
        />}         
        {lessonStep ==94 && <DialogBox text={
          <>
             Pick Up <strong>Round Bottomed Flask </strong> to <strong>Right Hand</strong>

          </>
          } 
        />}

        {lessonStep ==95 && <DialogBox text={
          <>
            Press <strong>P</strong> to Enter <strong>Pour Mode</strong>

          </>
          } 
        />}        
        {lessonStep ==96 && <DialogBox text={
          <>
            Press <strong>P</strong> to Enter <strong>Pour Mode</strong>

          </>
          } 
        />}

        {lessonStep ==97 && <DialogBox text={
          <>
            Keep the <strong>Conical Flask</strong> back on the <strong>Table</strong>

          </>
          } 
        />}  

        {lessonStep ==98 && <DialogBox text={
          <>
            Click the <strong>Heating Mantle</strong> and Select <strong>Place Near Clamp</strong>

          </>
          } 
        />}
        {lessonStep ==99 && <DialogBox text={
          <>
           Now Click <strong>Held Round Bottom Flask</strong> and select <strong>Place In Mantle</strong>

          </>
          } 
        />} 
        {lessonStep ==100 && <DialogBox text={
          <>
           <strong>Scroll Down </strong>to <strong>Adjust Clamp Handle</strong> to fit the Beaker

          </>
          } 
        />}

        {lessonStep ==101 && <DialogBox text={
          <>
           Click the <strong>Round Bottom Beaker</strong> and Select <strong> Add Distillation Head</strong>

          </>
          } 
        />}         

        {lessonStep ==102 && <DialogBox text={
          <>
           Click the <strong>Thermometer</strong> and Select <strong>Insert Thermometer</strong>
          </>
          } 
        />}

        {lessonStep ==103 && <DialogBox text={
          <>
           Click the <strong>Condensor</strong> and Select <strong>Insert Condensor</strong>
          </>
          } 
        />}         
        {lessonStep ==104 && <DialogBox text={
          <>
           Click the <strong>Condensor</strong> and Select <strong>Connect Water Out Tube</strong>
          </>
          } 
        />}
        {lessonStep ==105 && <DialogBox text={
          <>
           Click the <strong>Condensor</strong> and Select <strong>Connect Water In Tube</strong>
          </>
          } 
        />}         
        {lessonStep ==106 && <DialogBox text={
          <>
           Now Click the <strong>Clamp</strong> and Select <strong>Place Setup In Center</strong>, so we can get a better view
          </>
          } 
        />}
        {lessonStep ==106.1 && <DialogBox text={
          <>
           Pick Up the <strong>Conical Flask</strong> to <strong>Clean Beaker</strong>
          </>
          } 
        />}
        {lessonStep ==106.2 && <DialogBox text={
          <>
           Click the <strong>Held Conical Flask</strong> and Select <strong>Clean And Dry </strong>
          </>
          } 
        />}

        {lessonStep ==106.3 && <DialogBox text={
          <>
          Now Click the <strong>Conical Flask</strong> and Select <strong>Place Near Condensor</strong>
          </>
          } 
        />}
        {lessonStep ==107 && <DialogBox text={
          <>
           Press <strong>P</strong> to turn the <strong>Water Tap On</strong>
          </>
          } 
        />}         
        {lessonStep ==108 && <DialogBox text={
          <>
            Click the <strong>Mantle</strong> and Select <strong>Turn On</strong>

          </>
          } 
        />} 

        {lessonStep ==109 && <DialogBox text={
          <>
           Observe The Reaction 

          </>
          } 
        />}

        {lessonStep ==110 && <DialogBox text={
          <>
            Now Pick Up a <strong>Test Tube </strong>So We Can <strong>Pour the Mixture</strong> into it 
          </>
          } 
        />}   

        {lessonStep ==111 && <DialogBox text={
          <>
            Press <strong>P</strong> to <strong>Enter Pour Mode</strong>
          </>
          } 
        />}           

        {lessonStep ==112 && <DialogBox text={
          <>
           <strong>Scroll Down</strong> To <strong>Pour</strong>
          </>
          } 
        />}

        {lessonStep ==113 && <DialogBox text={
          <>
           Keep <strong>Conical Flask</strong> Back On <strong>Table</strong>
          </>
          } 
        />}          

        {lessonStep ==114 && <DialogBox text={
          <>
           Click The <strong>Clamp</strong> And Select <strong>Disable Apparatus</strong>
          </>
          } 
        />} 

        {lessonStep ==115 && <DialogBox text={
          <>
           Pick Up The<strong> Dropper</strong>To<strong> Right Hand</strong>
          </>
          } 
        />}

        {lessonStep ==116 && <DialogBox text={
          <>
           <strong>Scroll Down</strong> To <strong>Squeeze</strong> The <strong>Dropper</strong>
          </>
          } 
        />}         
        {lessonStep ==117 && <DialogBox text={
          <>
           Click <strong>Held Dropper</strong> and Select <strong>Place Dropper</strong>
          </>
          } 
        />}

          {lessonStep ==118 && <DialogBox text={
          <>
           <strong>Scroll Up</strong> To <strong>Release</strong> The <strong>Dropper</strong>
          </>
          } 
        />}

          {lessonStep ==119 && <DialogBox text={
          <>
           Click The <strong>Dropper</strong> and Select <strong>Remove Dropper</strong>

          </>
          } 
        />}  
          {lessonStep ==120 && <DialogBox text={
          <>
           Keep <strong>Test Tube</strong> Back On <strong>Table</strong>
          </>
          } 
        />}
          {lessonStep ==121 && <DialogBox text={
          <>
           Pick Up Another <strong>Test Tube</strong>
          </>
          } 
        />}

          {/* {lessonStep ==122 && <DialogBox text={
          <>
           Pick Up Another <strong>Test Tube</strong>
          </>
          } 
        />} */}

          {lessonStep ==123 && <DialogBox text={
          <>
           Click <strong>Dropper</strong> And Select <strong>Place Dropper</strong>
          </>
          } 
        />}

          {lessonStep ==124 && <DialogBox text={
          <>
           <strong>Scroll Down</strong> To <strong>Squeeze</strong> The <strong>Dropper</strong>
          </>
          } 
        />}
          {lessonStep ==125 && <DialogBox text={
          <>
           Click <strong>Dropper</strong> And Select <strong>Remove Dropper</strong>
          </>
          } 
        />}

          {lessonStep ==126 && <DialogBox text={
          <>
           Keep <strong>Dropper</strong> Back On <strong>Table</strong>
          </>
          } 
        />} 

          {lessonStep ==127 && <DialogBox text={
          <>
           Pick Up The <strong>Measuring Cylinder</strong>
          </>
          } 
        />}

          {lessonStep ==128 && <DialogBox text={
          <>
           Click The <strong>Held Measuring Cylinder</strong> And Select <strong>Add Liquid</strong>
          </>
          } 
        />}          

          {lessonStep ==129 && <DialogBox text={
          <>
           <strong>Fill</strong> With <strong>Ethanol (5cm3)</strong>
          </>
          } 
        />}

          {lessonStep ==130 && <DialogBox text={
          <>
           Press <strong>P</strong> To <strong>Enter Pour Mode</strong>
          </>
          } 
        />}
          {lessonStep ==131 && <DialogBox text={
          <>
           <strong>Scroll Down</strong> To <strong>Pour</strong>
          </>
          } 
        />}
          {lessonStep ==132 && <DialogBox text={
          <>
           Keep <strong>Measuring Cylinder</strong> Back On <strong>Table</strong>
          </>
          } 
        />}

          {lessonStep ==133 && <DialogBox text={
          <>
           Pick Up The <strong>Graduated Pippete</strong>
          </>
          } 
        />}

        {lessonStep > 133 && (
          <ChlorinationLesson05/>
        )}      

        </>
  )
}

export default ChlorinationLesson04