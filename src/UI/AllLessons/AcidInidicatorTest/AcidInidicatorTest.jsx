import { useContext, useEffect } from "react"
import LessonGuide from "../../LessonGuide/LessonGuide"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";

const AcidInidicatorTest = ()=>{

    const {lessonStep,setLessonStep,
        setShowNormalBeakerArrow,showNormalBeakerArrow} = useContext(MainGuidelineContext);
    const {selectedLeftHand,selectedRightHand} = useContext(InteractionContext)
    
    const AcidIndicatorTest = [
        {
            step1:
            "In this experiment, hydrochloric acid is mixed with universal indicator. The indicator changes the solution to a red or orange-red color, showing that the solution is acidic. This helps to understand how indicators are used to identify acids in the lab.",

            step2:
            "Pick up the normal beaker by clicking on it and selecting the Left Hand option.",
        },
    ]

    useEffect(()=>{
        if (lessonStep !== 3 || selectedLeftHand.name ==='main-normal-beaker' || selectedRightHand.name==='main-normal-beaker') {
            setShowNormalBeakerArrow(false)
            return
        }    
    },[showNormalBeakerArrow,lessonStep,selectedLeftHand,selectedRightHand])
    


    return(
        <>
           {lessonStep===1 && 
                <LessonGuide
                 title={"Lesson Overview"} 
                text={AcidIndicatorTest[0].step1} 
                onButton1={() => setLessonStep(2)}/>
            } 


           {lessonStep===2 && 
                <LessonGuide 
                title={"Lesson Overview"}                
                text={AcidIndicatorTest[0].step2}
                onButton1={() =>{ setLessonStep(3);setShowNormalBeakerArrow(true)}}
            />} 

        </>
    )
}

export default AcidInidicatorTest