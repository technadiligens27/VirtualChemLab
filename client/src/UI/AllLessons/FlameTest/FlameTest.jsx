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
import FlameTest02 from "./FlameTest02"
import ApparatusOverview from "../../ApparatusOverview/ApparatusOverview"

const FlameTest = ()=>{

  const {
    graduatedBeakerRef,conicalBeakerRef02,conicalBeakerRef,seperatingFunnelRef,pipetteRef,gogglesRef,gloverightRef,
    graduatedBeaker50OriginalStateRef,volumetricRef,roundBeakerRef,gloveleftRef,potassiumHydrogenCarbonateRef,separatingFunnelBungRef,
    heatingMantleRef,volumetricPipetteRef,mainBuiretteRef,digitalBalanceRef,mainDropperRef,graduatedPipetteRef,testube02Ref,
    testube02OriginalStateRef,graduatedPipetteOriginalStateRef,seperatingFunnelOriginalStateRef,condensorRef,heatingMatRef,powderContainer,
     airHoleRef
  } = useContext(ModelContext)    
    
  const { selectedLesson,setLessonStep,setSafetyStep,lessonStep,showApparatus,setShowApparatus } = useContext(MainGuidelineContext)

  const {setSelectedRightHand,setSelectedLeftHand,selectedLeftHand,selectedRightHand,setIsClampTestube,setIsClampInCenter,setIsModelCentre,
    setIsDropperFilled,setIsBeakerNearClamp,setIsDropperPlaced,setIsDipMode,setShowBunsenFlame
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
      if(selectedLesson==15 && [18,24].includes(lessonStep)){
        setIsDipMode(false)
      }
    },[lessonStep])


    // useEffect(()=>{
    //   if(selectedLesson==15  && lessonStep==21){
    //   setShowBunsenFlame(false)

    //   }
    // },[lessonStep])

     useEffect(()=>{
      if(selectedLesson==15 && lessonStep==19){
        airHoleRef.current.visible = true
      }
    },[lessonStep])
 
    return(
        <>

 
       {
         lessonStep===1 && !showApparatus && <EnthalpyLessonOverview
          reactionData={ flameTestData [0]}
          onStartLesson={() => {
            setShowApparatus(true)
          }}
        />
        }

{
  showApparatus && (
    <ApparatusOverview
      title="Apparatus Overview"
      onContinue={() => {
        setShowApparatus(false)
        setLessonStep(3)
      }}
      apparatusItems={[


        {
          id: "bunsen-burner",

          name: "Bunsen Burner",

          modelName:
            "bunsen-burner",

          imagePath:
            "./lightBunsenBurner.png",

          description:
            "Used to produce a blue flame for heating the metal salts.",
        },

        {
          id: "nichrome-wire",

          name: "Nichrome Wire Loop",

          modelName:
            "nichrome-wire",

          imagePath:
            "./nichrome-wire.png",

          description:
            "Used to hold the metal salt sample in the flame.",
        },

          {
            id: "heating-mat",

            name: "Heatproof Mat",

            modelName:
              "heating-mat",

            imagePath:
              "./heating-mat.png",

            description:
              "Used to provide a heat-resistant surface beneath the Bunsen burner.",
          },
        {
          id: "metal-salt-container",

          name: "Metal Salt Container",

          modelName:
            "metal-salt-container",

          imagePath:
            "./metal-salt-container.png",

          description:
            "Contains the metal salt powders used for flame tests.",
        },
        {
          id: "metal-salt-container",

          name: "Glass Beaker",

          modelName:
            "metal-salt-container",

          imagePath:
            "./main-normal-beaker.png",

          description:
            "Contains the metal salt powders used for flame tests.",
        },
      ]}
      onSelectApparatus={(apparatus) => {
        console.log(
          "Selected apparatus:",
          apparatus.modelName
        )
      }}
    />
  )
}



        {/* {lessonStep === 2 && (
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
      )} */}

      {lessonStep >=3 && lessonStep <5 && <SulfamicGuidelines guidelineData={flameTestGuidelineData[0]}/>}

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

      {lessonStep ==5 && <SulfamicGuidelines guidelineData={flameTestGuidelineData[1]}/>}
        

        {lessonStep == 5 && <DialogBox text={
          <>
          Click <strong>the Bunsen Burner</strong> and select <strong>Connect Gas Tube</strong>
          </>
          } 
        />}

      {lessonStep >=6 &&  lessonStep <14 && <SulfamicGuidelines guidelineData={flameTestGuidelineData[2]}/>}


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


      {lessonStep >=14 &&  lessonStep <18 && <SulfamicGuidelines guidelineData={flameTestGuidelineData[3]}/>}


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

      {lessonStep >=18 &&  lessonStep <= 18.1 && <SulfamicGuidelines guidelineData={flameTestGuidelineData[4]}/>}



        {lessonStep == 18 && <DialogBox text={
          <>
         Click the <strong>Bunsen burner</strong> and <strong>light it</strong>
          </>
          } 
        />}

      {/* {lessonStep ==18.1 && <SulfamicGuidelines guidelineData={flameTestGuidelineData[5]}/>} */}


        {lessonStep == 18.1 && <DialogBox text={
          <>
         Click the <strong>Bunsen burner</strong> and select <strong>Open Air Hole</strong>
          </>
          } 
        />}

      {lessonStep >18.1 &&  lessonStep <=25 && <SulfamicGuidelines guidelineData={flameTestGuidelineData[6]}/>}

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
        {/* {lessonStep == 21 && <DialogBox text={
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
        />} */}

              {/* {lessonStep >=21 &&  lessonStep <=25 && <SulfamicGuidelines guidelineData={flameTestGuidelineData[6]}/>} */}



        {lessonStep == 24 && <DialogBox text={
          <>
         Click the <strong>Held Beaker</strong> and <strong>Keep Back On Table</strong>
          </>
          } 
        />}

        {lessonStep == 25 && <DialogBox text={
          <>
         Click the <strong>Empty Container</strong> and <strong>Pick Up</strong>
          </>
          } 
        />}

        {lessonStep >=26 && <FlameTest02/>}
        </>           

    )
}

export default FlameTest