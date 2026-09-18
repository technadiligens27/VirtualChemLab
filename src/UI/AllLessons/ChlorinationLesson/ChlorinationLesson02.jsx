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
import {chlorinationGuidelineData} from "../../Data/chlorinationLessonData/chlorinationLessonData.jsx"
import SulfamicAcidResult from "../../SulfamicAcidResult/SulfamicAcidResult.jsx";
import ChlorinationLesson03 from "./ChlorinationLesson03.jsx";


const ChlorinationLesson02 = ()=>{

    const {isFillBeakerBoxOpen,setShowQuestionCardNo,showQuestionCardNo} = useContext(InteractionContext)
    const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow,setSafetyStep} = useContext(MainGuidelineContext);
    const {graduatedBeakerRef,conicalBeakerRef02,conicalBeakerRef,gogglesRef,seperatingFunnelRef,pipetteRef,potassiumHydrogenCarbonateRef,
        gloverightRef,gloveleftRef,heatingMantleRef} = useContext(ModelContext)

    const resetLesson = useResetLesson()
    
    const {setSelectedRightHand,setSelectedLeftHand,selectedLeftHand,selectedRightHand,safetyStep,
    } = useContext(InteractionContext)


    useEffect(()=>{
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

     if(heatingMantleRef.current){
      heatingMantleRef.current.visible = true
     }
     gogglesRef.current.visible = false 
     gloverightRef.current.visible = false 
     gloveleftRef.current.visible = false 

    },[conicalBeakerRef,conicalBeakerRef02,seperatingFunnelRef,pipetteRef,heatingMantleRef])    

        useEffect(() => {
        setSafetyStep(4)
        setLessonStep(26)
        if (
            selectedLesson !== 14.1 ||
            !conicalBeakerRef02?.current
        ) {
            return
        }

        const conicalBeaker02 =
            conicalBeakerRef02.current

        conicalBeaker02.visible = true

        if (conicalBeakerRef?.current) {
            conicalBeakerRef.current.visible = false
        }

        // Initialize every liquid child.
        conicalBeaker02.traverse((child) => {
            if (!child.isMesh) return

            const name =
                child.name?.toLowerCase() || ""

            const isUpperLiquid =
                name.includes("liquid") &&
                name.includes("upper")

            const isBottomLiquid =
                name.includes("liquid") &&
                name.includes("bottom")

            if (!isUpperLiquid && !isBottomLiquid) {
                return
            }

            child.visible = true
            child.scale.y = 1

            const updateMaterial = (material) => {
                if (!material) return material

                const clonedMaterial =
                material.clone()

                clonedMaterial.color.set(
                isUpperLiquid
                    ? "#F4D35E"
                    : "#DCEFF7"
                )

                clonedMaterial.transparent = true
                clonedMaterial.opacity = 0.35
                clonedMaterial.depthWrite = false
                clonedMaterial.needsUpdate = true

                return clonedMaterial
            }

            if (Array.isArray(child.material)) {
                child.material =
                child.material.map(updateMaterial)
            } else {
                child.material =
                updateMaterial(child.material)
            }
            })

        conicalBeaker02.updateMatrixWorld(true)

        if (
            selectedLeftHand?.name !==
            "main-Conical-Flask-02"
        ) {
            setSelectedLeftHand({
            hand: "left",

            name: "main-Conical-Flask-02",

            ref: conicalBeakerRef02,

            originalParent:
                conicalBeaker02.parent,

            originalPosition:
                conicalBeaker02.position.clone(),

            originalRotation:
                conicalBeaker02.rotation.clone(),

            originalScale:
                conicalBeaker02.scale.clone(),
            })
        }

        setSelectedRightHand(null)
        }, [
        selectedLesson,
        selectedLeftHand?.name,
        conicalBeakerRef02,
        conicalBeakerRef,
        setSafetyStep,
        setSelectedLeftHand,
        setSelectedRightHand,
        ])


        useEffect(()=>{
            if(potassiumHydrogenCarbonateRef.current){
                if(selectedLesson==14.1 && lessonStep==36){
                    potassiumHydrogenCarbonateRef.current.visible=false
                }
            }
        },[potassiumHydrogenCarbonateRef,selectedLesson,lessonStep])


 return(
       <>
       {lessonStep >=26 && lessonStep <33 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[6]}/>)}


      {lessonStep===26 && (<DialogBox text={<>
        Pick Up the <strong>Spatula</strong> to <strong>Right Hand</strong>
        </>}/>
      )}
      {lessonStep===27 && (<DialogBox text={<>
        Select the <strong>Calcium Chloride</strong> container and Click <strong>Take Calcium Chloride </strong>
        </>}/>
      )} 

      {lessonStep===28 && (<DialogBox text={<>
        Now Click <strong>Held Saptula</strong> and select <strong>Pour into Test Tube</strong> to pour
        </>}/>
      )}

      {lessonStep===29 && (<DialogBox text={<>
        <strong>Scroll Down</strong> to Pour <strong>Calcium Chloride</strong>
        </>}/>
      )} 

      {lessonStep===30 && (<DialogBox text={<>
         Click the <strong>Saptula</strong> and select <strong>Disable Pour Mode</strong>
        </>}
        />
      )}

      {lessonStep===31 && (<DialogBox text={<>
        Now Click <strong>Held Conical Flask</strong> and select <strong>Add New Bung</strong> 

        </>}
        />
      )} 
      {lessonStep===32 && (<DialogBox text={<>
        Now By <strong>Scrolling Down</strong> Gently <strong>Swirl</strong> the Conical Flask

        </>}
        />
      )}

      {lessonStep===33 && (<DialogBox text={<>
            Keep the <strong>Spatula</strong> Back in Table
        </>}
        />
      )}      


       {lessonStep >=33 && lessonStep <38 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[7]}/>)}


        {lessonStep===34 && (<DialogBox text={<>
        Pick Up the <strong>Separating Funnel</strong> to <strong>Right Hand</strong>
        </>}
        />
      )} 

    {lessonStep===35 && (<DialogBox text={<>
      Now Click <strong>Separating Funnel</strong> and select <strong>Add Funnel</strong> 

        </>}
        />
      )} 
    {lessonStep===36 && (<DialogBox text={<>
      Now Click <strong>Separating Funnel</strong> and select <strong>Clamp</strong> 

        </>}
        />
      )} 
    {lessonStep===37 && (<DialogBox text={<>
      Select <strong>Conical Flask</strong> and Choose <strong>Pour Mode</strong> 

    </>}
        />
      )}


    {lessonStep===38 && (<DialogBox text={<>
      <strong>Scroll Down</strong> to Pour the Mixture into the Separating Funnel

    </>}
        />
      )} 

    {lessonStep===39 && (<DialogBox text={<>
      Now Select <strong>Conical Flask</strong> and Choose <strong>Exit Pour Mode</strong> 


    </>}
        />
      )} 


    {lessonStep >=39 && lessonStep <43 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[8]}/>)}


    {lessonStep===40 && (<DialogBox text={<>
      Click the <strong>Separating Funnel</strong> and select <strong>Add Bung</strong> 


    </>}
        />
      )} 

    {lessonStep===41 && (<DialogBox text={<>
      Wait for the <strong>Layers</strong> to <strong>Separate</strong>

    </>}
        />
      )}      

    {lessonStep >=42 && lessonStep <47 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[9]}/>)}


    {lessonStep===42 && (<DialogBox text={<>
      Place the <strong>Beaker</strong> Near the <strong>Clamp</strong> to act as a <strong>Waste Beaker</strong>

    </>}
        />
      )}


    {lessonStep===43 && (<DialogBox text={<>
      <strong>Scroll Down</strong> to Pour From the <strong>Separating Funnel</strong> to the <strong>Waste Beaker</strong>

    </>}
        />
      )}


    {lessonStep >=44 && lessonStep <50 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[10]}/>)}



    {lessonStep===44 && (<DialogBox text={<>
        Pick Up the <strong>Measuring Cylinder</strong> to <strong>Right Hand</strong>
    </>}
        />
      )}

    {lessonStep===45 && (<DialogBox text={<>
        Select<strong> Held Measuring Cylinder</strong> and Click <strong>Add Liquid</strong>
    </>}
        />
      )}


    {lessonStep===46 && (<DialogBox text={<>
        Fill with <strong>Sodium Hydrogencarbonate (20 cm³)</strong>
    </>}
        />
      )}

    {lessonStep===47 && (<DialogBox text={<>
        Click the <strong>Separating Funnel</strong> and select <strong>Remove Bung</strong>
    </>}
        />
      )}
    {lessonStep===47.1 && (<DialogBox text={<>
        Click the <strong>Separating Funnel</strong> and select <strong>Add Funnel</strong>
    </>}
        />
      )}

    {lessonStep===48 && (<DialogBox text={<>
       Now Select<strong> Held Measuring Cylinder</strong> and Click <strong>Pour Mode</strong>

    </>}
        />
      )}
    {lessonStep===49 && (<DialogBox text={<>
      <strong>Scroll Down</strong> to Pour <strong>Sodium Hydrogencarbonate</strong> to the <strong>Separating Funnel</strong>
    </>}
        />
      )}

    {lessonStep===50 && (<DialogBox text={<>
      Keep <strong>Measuring Cylinder</strong> back in the Table
    </>}
        />
      )}

    {lessonStep >=50 && lessonStep <57 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[11]}/>)}


    {lessonStep===51 && (<DialogBox text={<>
      Now Click the <strong>Clamp</strong> and select <strong>Unclamp</strong>
    </>}
        />
      )}

    {lessonStep===52 && (<DialogBox text={<>
     Click the Held <strong>Separating Funnel</strong>  and select <strong>Remove Funnel and Add Bung</strong> 
    </>}
        />
      )}
    {lessonStep===53 && (<DialogBox text={<>
     <strong>Scroll Down</strong> to <strong>Swirl</strong> the <strong>Separating Funnel</strong>
    </>}
        />
      )}
    {lessonStep===53.1 && (<DialogBox text={<>
     <strong>Observe CO2 Rising</strong>
    </>}
        />
      )}
    {lessonStep===54 && (<DialogBox text={<>
          Click the <strong>Separating Funnel</strong>  and select <strong>Remove  Bung</strong> 

    </>}
        />
      )}
    {lessonStep===55 && (<DialogBox text={<>
      <strong>Add The Bung</strong> again

    </>}
        />
      )}

    {lessonStep===56 && (<DialogBox text={<>
     <strong>Scroll Down</strong> to <strong>Swirl</strong> the <strong>Separating Funnel</strong>
    </>}
        />
      )}

    {lessonStep===56.1 && (<DialogBox text={<>
     <strong>Observe CO2 Rising</strong>
    </>}
        />
      )}

    {lessonStep===57 && (<DialogBox text={<>
     Release The <strong>Bung</strong>
    </>
    }
    />
      )}


    {lessonStep >=57 && lessonStep <60 && (<SulfamicGuidelines guidelineData={chlorinationGuidelineData[12]}/>)}



    {lessonStep===58 && (<DialogBox text={<>
     <strong>Add The Bung</strong> again
    </>
    }
    />
      )} 

    {lessonStep===59 && (<DialogBox text={<>
      Click <strong>Separating Funnel</strong> and Select <strong>Clamp</strong>
    </>
    }
    />
      )}

    {lessonStep===60 && (<DialogBox text={<>
      Place the <strong>Beaker</strong> Near the <strong>Clamp</strong> as a <strong>Waste Beaker</strong>
    </>
    }
    />
      )} 

    {lessonStep===61 && (<DialogBox text={<>
      <strong>Scroll Down</strong> to Pour From the <strong>Separating Funnel</strong> to the <strong>Waste Beaker</strong>
    </>
    }
    />
      )} 

    {lessonStep===62 && (<DialogBox text={<>
        Pick Up the <strong>Measuring Cylinder</strong> to <strong>Right Hand</strong>
    </>
    }
    />
      )}
    {lessonStep===63 && (<DialogBox text={<>
        Select<strong> Held Measuring Cylinder</strong> and Click <strong>Add Liquid</strong>
    </>
    }
    />
      )}

    {lessonStep===64 && (<DialogBox text={<>
      Fill with <strong>Sodium Hydrogencarbonate (20 cm³)</strong>

    </>
    }
    />
      )}

     {
      lessonStep >64 && <ChlorinationLesson03/>
     } 


       </>
    )
}

export default ChlorinationLesson02