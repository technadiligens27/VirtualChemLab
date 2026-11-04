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
import SulfamicGuidelines from "../../SulfamicGuidelines/SulfamicGuidelines"
import {chlorinationGuidelineData} from "../../Data/chlorinationLessonData/chlorinationLessonData.jsx"
import ChlorinationLiveDataPanel from "./ChlorinationLiveDataPanel/ChlorinationLiveDataPanel.jsx"

const ChlorinationLesson04 = () => {
  const { selectedLesson,setLessonStep,setSafetyStep,lessonStep } = useContext(MainGuidelineContext)

  const {setSelectedRightHand,setSelectedLeftHand,selectedLeftHand,selectedRightHand,setIsClampTestube,setIsClampInCenter,
   setIsModelCentre,setIsPotassiumTransferred,setIsPotassiumHydrogenCarbonateInSpoon,setIsPottasiumCarobnateInTestube01} = useContext(InteractionContext)

  const {
    graduatedBeakerRef,conicalBeakerRef02,conicalBeakerRef,seperatingFunnelRef,pipetteRef,gogglesRef,
    gloverightRef,graduatedBeaker50OriginalStateRef,volumetricRef,roundBeakerRef,
    gloveleftRef,potassiumHydrogenCarbonateRef,separatingFunnelBungRef,heatingMantleRef,volumetricPipetteRef,mainBuiretteRef,
    digitalBalanceRef,mainDropperRef,graduatedPipetteRef,conicalFlask02OriginalStateRef,seperatingFunnelOriginalStateRef
  } = useContext(ModelContext)

  useEffect(()=>{
    if(selectedLesson!==14.3)return
    setLessonStep(85)
    setSafetyStep(4)

    setIsClampInCenter(true)
    setIsClampTestube(true)
    setIsModelCentre(true)
    setIsPotassiumTransferred(false)
    setSelectedLeftHand(null)
    setSelectedRightHand(null)
    setIsPotassiumHydrogenCarbonateInSpoon(false)
    setIsPottasiumCarobnateInTestube01(false)

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
  },[])

  useEffect(()=>{
    if(selectedLesson==14.3 && lessonStep==85){
        setSelectedLeftHand(null)
        setSelectedRightHand(null)
    }
    
  },[selectedLesson,lessonStep])

  useEffect(() => {
  if (
    lessonStep === 111 && conicalBeakerRef02?.current && conicalFlask02OriginalStateRef?.current) {
    setSelectedLeftHand({
      hand: "left",
      name: conicalBeakerRef02.current.name,
      ref: conicalBeakerRef02,
      originalParent: conicalFlask02OriginalStateRef.current.parent,
      originalPosition: conicalFlask02OriginalStateRef.current.position.clone(),
      originalRotation: conicalFlask02OriginalStateRef.current.rotation.clone(),
    })
  }
}, [lessonStep])


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


useEffect(() => {
  if (
    selectedLesson !== 14.3 || lessonStep !== 98 || !seperatingFunnelRef?.current || !seperatingFunnelOriginalStateRef?.current) {
    return
  }

  const funnel = seperatingFunnelRef.current
  const original = seperatingFunnelOriginalStateRef.current

  // Restore original parent
  if (original.parent) {
    original.parent.add(funnel )
  }

  // Restore original table position
  funnel.position.copy(
    original.position
  )

  // Restore original rotation
  funnel.quaternion.copy(
    original.quaternion
  )

  // Restore original scale
  funnel.scale.copy(
    original.scale
  )

  funnel.updateMatrixWorld(
    true
  )
}, [
  selectedLesson,
  lessonStep,
  seperatingFunnelRef,
  seperatingFunnelOriginalStateRef,
])
useEffect(() => {
  if (selectedLesson !== 14.3 ||lessonStep !== 98 ||!conicalBeakerRef02?.current ||!conicalFlask02OriginalStateRef?.current) {
    return
  }

  const conical = conicalBeakerRef02.current
  const original = conicalFlask02OriginalStateRef.current

  // Restore original parent
  if (original.parent) {
     original.parent.add( conical)
  }

  // Restore original table position
  conical.position.copy(original.position)

  // Restore original rotation
  conical.quaternion.copy(original.quaternion)

  // Restore original scale
  conical.scale.copy(original.scale)

  conical.updateMatrixWorld(true)
}, [
  selectedLesson,
  lessonStep,
  conicalBeakerRef02,
  conicalFlask02OriginalStateRef,
])

  return (
        <>

        {lessonStep >=85 && lessonStep <94 && (<SulfamicGuidelines  guidelineData={chlorinationGuidelineData[16]}/>)}


        {lessonStep ==85 && <DialogBox text={
          <>
             Pick Up <strong>Spatula</strong> to <strong>Right Hand</strong>
          </>
          } 
        />}  

        {lessonStep ==86 && <DialogBox text={
          <>
             Click the <strong>Conical Flask</strong> and select <strong>Left Hand</strong>
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
        Select <strong>Held Conical Flask</strong> and click <strong>Place Bung</strong> 

          </>
          } 
        />}         
        {lessonStep ==92 && <DialogBox text={
          <>
        <strong>Scroll Down Continously</strong> to <strong>Swirl</strong>

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


        {lessonStep >=94 && lessonStep <98 && (<SulfamicGuidelines  guidelineData={chlorinationGuidelineData[17]}/>)}



        {lessonStep ==95 && <DialogBox text={
          <>
            Press <strong>P</strong> to Enter <strong>Pour Mode</strong>

          </>
          } 
        />}        
        {lessonStep ==96 && <DialogBox text={
          <>
            <strong>Scroll Down</strong> to  <strong>Pour</strong>

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


        {lessonStep >=98 && lessonStep <106.3 && (<SulfamicGuidelines  guidelineData={chlorinationGuidelineData[18]}/>)}



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
           Now Click the <strong>Clamp</strong> and Select <strong>Place In Center</strong>, so we can center the setup
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


        {lessonStep >=106.3 && lessonStep <110 && (<SulfamicGuidelines  guidelineData={chlorinationGuidelineData[19]}/>)}


        {lessonStep ==107 && <DialogBox text={
          <>
           Press <strong>P</strong> to turn the <strong>Water Tap On</strong>
          </>
          } 
        />}         
        {lessonStep ==108 && <DialogBox text={
          <>
            Click the <strong>Heating Mantle</strong> and Select <strong>Turn On</strong>

          </>
          } 
        />} 




        {lessonStep ==109 && <DialogBox text={
          <>
           Observe The Reaction 

          </>
          } 
        />}


        {lessonStep >=110 && lessonStep <114 && (<SulfamicGuidelines  guidelineData={chlorinationGuidelineData[21]}/>)}


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


        {lessonStep >=114 && lessonStep <126 && (<SulfamicGuidelines  guidelineData={chlorinationGuidelineData[22]}/>)}



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


        {lessonStep >=126 && lessonStep <134 && (<SulfamicGuidelines  guidelineData={chlorinationGuidelineData[23]}/>)}



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

    {[14,14.1,14.2,14.3,14.4].includes(selectedLesson) && (
      <ChlorinationLiveDataPanel
        alcoholAmount={ lessonStep >= 5 ? 10 : null }

        hydrochloricAcidAmount={lessonStep >= 11 ? 35 : null}

        mixingTime={lessonStep >= 23 ? 1200 : lessonStep >= 15 ? "In progress" : null}

        reactionStatus={lessonStep >= 23 ? "Complete" : lessonStep >= 15 ? "Reacting" : lessonStep >= 13 ? "Mixture prepared" : null}

        layerStatus={lessonStep >= 41 ? "Separated" : lessonStep >= 23 ? "Two layers formed" : null}

        calciumChlorideMass={lessonStep >= 30 ? 6 : null}

        sodiumHydrogencarbonateAmount={lessonStep >= 67 ? 40 : lessonStep >= 49 ? 20 : null}

        secondWashStatus={lessonStep >= 81 ? "Complete" : lessonStep >= 67 ? "In progress" : lessonStep >= 62 ? "Preparing" : null}

        funnelPressure={
          [53,53.1,56,56.1,72,73,76,77].includes(lessonStep) ? "Pressure building" : [54,57,74,78].includes(lessonStep)
              ? "Released" : lessonStep > 78 ? "Released" : null}

      aqueousLayerStatus={lessonStep >= 81 ? "Removed" : lessonStep >= 67 ? "Present" : lessonStep >= 61 ? "Removed" : lessonStep >= 49 ? "Present" : lessonStep >= 43 ? "Removed" : lessonStep >= 41 ? "Present" : null}

      organicLiquidStatus={lessonStep >= 93 ? "Clear and dry" : lessonStep >= 89 ? "Drying" : lessonStep >= 84 ? "Collected" : null}

      currentTemperature={selectedLesson === 14.3 && lessonStep >= 109 ? 51 : selectedLesson === 14.4 ? 51 : null}

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

export default ChlorinationLesson04