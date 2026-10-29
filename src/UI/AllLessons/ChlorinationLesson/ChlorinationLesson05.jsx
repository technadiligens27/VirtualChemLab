import { useContext, useEffect } from "react"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox"
import SulfamicGuidelines from "../../SulfamicGuidelines/SulfamicGuidelines"
import {chlorinationGuidelineData} from "../../Data/chlorinationLessonData/chlorinationLessonData.jsx"
import ChlorinationLiveDataPanel from "./ChlorinationLiveDataPanel/ChlorinationLiveDataPanel.jsx"
import { useResetLesson } from "../../ResetLessonButton/ResetLessonButton.jsx"
import ChlorinationSummary from "../../Summary/ChlorinationSummary/ChlorinationSummary.jsx"
import QuestionCard from "../../QuestionCard/QuestionCard.jsx"

const ChlorinationLesson05 = ()=>{

  const {
    graduatedBeakerRef,conicalBeakerRef02,conicalBeakerRef,seperatingFunnelRef,pipetteRef,gogglesRef,gloverightRef,
    graduatedBeaker50OriginalStateRef,volumetricRef,roundBeakerRef,gloveleftRef,potassiumHydrogenCarbonateRef,separatingFunnelBungRef,
    heatingMantleRef,volumetricPipetteRef,mainBuiretteRef,digitalBalanceRef,mainDropperRef,graduatedPipetteRef,testube02Ref,
    testube02OriginalStateRef,graduatedPipetteOriginalStateRef,seperatingFunnelOriginalStateRef
  } = useContext(ModelContext)    
    
  const { selectedLesson,setLessonStep,setSafetyStep,lessonStep,showSummary,setShowSummary,} = useContext(MainGuidelineContext)

  const {setSelectedRightHand,setSelectedLeftHand,selectedLeftHand,selectedRightHand,setIsClampTestube,setIsClampInCenter,setIsModelCentre,
    setIsDropperFilled,setIsBeakerNearClamp,setIsDropperPlaced,showQuestionCardNo,setShowQuestionCardNo
  } = useContext(InteractionContext)


  const resetLesson = useResetLesson()


  useEffect(()=>{
    if(selectedLesson!==14.4)return
    setLessonStep(134)
    setSafetyStep(4)

    setIsClampInCenter(true)
    setIsClampTestube(true)
    setIsModelCentre(true)
    setIsBeakerNearClamp(false)
    setSelectedLeftHand(null)
    setSelectedRightHand(null);
    setIsDropperPlaced(false)

    if(conicalBeakerRef.current){
        conicalBeakerRef.current.visible = false
    }

    if(conicalBeakerRef02.current){
        conicalBeakerRef02.current.visible = true
    }

    if(seperatingFunnelRef.current){
        seperatingFunnelRef.current.visible = false
        separatingFunnelBungRef.current.visible = false
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

     if(roundBeakerRef.current){
      roundBeakerRef.current.visible = false
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
                child.material.opacity = 0.35
                child.material.transparent = true
                child.scale.y = 39                
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
    if (selectedLesson !== 14.3 ||lessonStep !== 98 || !seperatingFunnelRef?.current || !seperatingFunnelOriginalStateRef?.current) {
      return
    }

    const separatingFunnel = seperatingFunnelRef.current
    const original = seperatingFunnelOriginalStateRef.current

    // Restore original parent.
    if (original.parent) {
       original.parent.add(separatingFunnel)
    }

    // Restore original table transform.
    separatingFunnel.position.copy( original.position)
    separatingFunnel.quaternion.copy( original.quaternion)
    separatingFunnel.scale.copy(original.scale)
    separatingFunnel.updateMatrixWorld(true)
  }, [selectedLesson,lessonStep,seperatingFunnelRef,seperatingFunnelOriginalStateRef])

//   useEffect(() => {
//   if (
//     selectedLesson === 14.4 &&
//     lessonStep === 144
//   ) {
//     const timer = setTimeout(() => {
//       setLessonStep(145)
//     }, 3000)

//     return () => {
//       clearTimeout(timer)
//     }
//   }
// }, [
//   selectedLesson,
//   lessonStep,
//   setLessonStep,
// ])


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


        {lessonStep >=140 && lessonStep <147 && (<SulfamicGuidelines  guidelineData={chlorinationGuidelineData[24]}/>)}


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

        {lessonStep >=147 && lessonStep <154 && (<SulfamicGuidelines  guidelineData={chlorinationGuidelineData[25]}/>)}



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


        {lessonStep >=154 && lessonStep <158 && (<SulfamicGuidelines  guidelineData={chlorinationGuidelineData[26]}/>)}




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
           Lesson Finished!!
          </>
          } 
          button1Text  = "Summary"
          button2Text="End Lesson"

          onbtnClick={()=>setShowSummary(true)}
          onbtn2Click={resetLesson}


        />} 

        {showSummary && <ChlorinationSummary 
        onQuestions={()=>{setShowQuestionCardNo(14.1);setShowSummary(false)}}
        onEndLesson={resetLesson}
          
          />}

   {
  showQuestionCardNo === 14.1 && (
    <QuestionCard
      questionSetTitle="Question Set — Chlorination of 2-methylpropan-2-ol"

      questionNumber={1}

      question="What is the purpose of adding anhydrous calcium chloride to the reaction mixture?"

      answers={[
        {
          id: "A",
          text: "To move unreacted alcohol into the aqueous layer",
        },
        {
          id: "B",
          text: "To produce carbon dioxide gas",
        },
        {
          id: "C",
          text: "To increase the boiling point of the product",
        },
        {
          id: "D",
          text: "To turn the product blue",
        },
      ]}

      correctAnswer="A"

      hintText="Think about why unreacted 2-methylpropan-2-ol should be removed from the organic product."

      correctMessage="Correct! Calcium chloride helps remove unreacted alcohol by moving it into the aqueous layer."

      incorrectMessage="Incorrect. Anhydrous calcium chloride helps remove unreacted alcohol from the crude organic product."

      submitButtonText="Submit Answer"

      continueButtonText="Continue"

      onContinue={() => {
        setShowQuestionCardNo(14.2)
      }}

      onExit={() => {
        setShowQuestionCardNo(null)
      }}
    />
  )
}

{
  showQuestionCardNo === 14.2 && (
    <QuestionCard
      questionSetTitle="Question Set — Chlorination of 2-methylpropan-2-ol"

      questionNumber={2}

      question="Which layer in the separating funnel contains the crude 2-chloro-2-methylpropane product?"

      answers={[
        {
          id: "A",
          text: "The upper organic layer",
        },
        {
          id: "B",
          text: "The lower aqueous layer",
        },
        {
          id: "C",
          text: "Both layers contain pure product",
        },
        {
          id: "D",
          text: "The solid layer at the bottom",
        },
      ]}

      correctAnswer="A"

      hintText="Think about the density of the organic product compared with the aqueous layer."

      correctMessage="Correct! The crude 2-chloro-2-methylpropane is the upper organic layer."

      incorrectMessage="Incorrect. The organic product is less dense than the aqueous layer, so it forms the upper layer."

      submitButtonText="Submit Answer"

      continueButtonText="Continue"

      onContinue={() => {
        setShowQuestionCardNo(14.3)
      }}

      onExit={() => {
        setShowQuestionCardNo(null)
      }}
    />
  )
}

{
  showQuestionCardNo === 14.3 && (
    <QuestionCard
      questionSetTitle="Question Set — Chlorination of 2-methylpropan-2-ol"

      questionNumber={3}

      question="Why is sodium hydrogencarbonate solution used to wash the organic layer?"

      answers={[
        {
          id: "A",
          text: "To remove remaining hydrochloric acid",
        },
        {
          id: "B",
          text: "To dry the organic product completely",
        },
        {
          id: "C",
          text: "To increase the mass of the product",
        },
        {
          id: "D",
          text: "To turn the product into an alkene",
        },
      ]}

      correctAnswer="A"

      hintText="Think about which acidic reactant may still be mixed with the crude product."

      correctMessage="Correct! Sodium hydrogencarbonate neutralises and removes remaining hydrochloric acid."

      incorrectMessage="Incorrect. Sodium hydrogencarbonate is used to wash away remaining hydrochloric acid."

      submitButtonText="Submit Answer"

      continueButtonText="Continue"

      onContinue={() => {
        setShowQuestionCardNo(14.4)
      }}

      onExit={() => {
        setShowQuestionCardNo(null)
      }}
    />
  )
}

{
  showQuestionCardNo === 14.4 && (
    <QuestionCard
      questionSetTitle="Question Set — Chlorination of 2-methylpropan-2-ol"

      questionNumber={4}

      question="Why must the separating funnel be vented frequently during the sodium hydrogencarbonate wash?"

      answers={[
        {
          id: "A",
          text: "Carbon dioxide gas is produced and pressure builds up",
        },
        {
          id: "B",
          text: "The organic liquid needs oxygen",
        },
        {
          id: "C",
          text: "The product evaporates immediately",
        },
        {
          id: "D",
          text: "The funnel must be cooled down",
        },
      ]}

      correctAnswer="A"

      hintText="Think about the gas formed when an acid reacts with a hydrogencarbonate."

      correctMessage="Correct! Carbon dioxide is produced during the wash, so pressure must be released safely."

      incorrectMessage="Incorrect. The sodium hydrogencarbonate wash produces carbon dioxide gas, causing pressure to build up."

      submitButtonText="Submit Answer"

      continueButtonText="Continue"

      onContinue={() => {
        setShowQuestionCardNo(14.5)
      }}

      onExit={() => {
        setShowQuestionCardNo(null)
      }}
    />
  )
}

{
  showQuestionCardNo === 14.5 && (
    <QuestionCard
      questionSetTitle="Question Set — Chlorination of 2-methylpropan-2-ol"

      questionNumber={5}

      question="Why is only the fraction distilling between 50°C and 52°C collected?"

      answers={[
        {
          id: "A",
          text: "This is the boiling range of relatively pure 2-chloro-2-methylpropane",
        },
        {
          id: "B",
          text: "This temperature freezes the product",
        },
        {
          id: "C",
          text: "This temperature produces silver chloride",
        },
        {
          id: "D",
          text: "This temperature removes all water instantly",
        },
      ]}

      correctAnswer="A"

      hintText="Think about how boiling temperature helps identify and purify a liquid."

      correctMessage="Correct! A boiling range of 50–52°C indicates relatively pure 2-chloro-2-methylpropane."

      incorrectMessage="Incorrect. The 50–52°C fraction is collected because it is the boiling range of relatively pure 2-chloro-2-methylpropane."

      submitButtonText="Submit Answer"

      continueButtonText="Finish"

      onContinue={() => {
        setShowQuestionCardNo(null)
      }}

      onExit={() => {
        setShowQuestionCardNo(null)
      }}
    />
  )
}


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

export default ChlorinationLesson05