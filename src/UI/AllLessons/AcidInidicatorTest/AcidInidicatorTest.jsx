import { useContext, useEffect } from "react"
import LessonGuide from "../../LessonGuide/LessonGuide"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import { step } from "three/tsl";

const AcidInidicatorTest = ()=>{

    const {lessonStep,setLessonStep,
        setShowNormalBeakerArrow,showNormalBeakerArrow} = useContext(MainGuidelineContext);
    const {selectedLeftHand,selectedRightHand,isFillBeakerBoxOpen} = useContext(InteractionContext)
    
    const AcidIndicatorTest = [
    {
        step1:
        "In this experiment, hydrochloric acid is mixed with universal indicator. The indicator changes the solution to a red or orange-red color, showing that the solution is acidic.",

        step2:
        "Pick up the normal beaker by clicking on it and selecting the Left Hand option.",

        step3:
        "Click on the beaker again and press the Fill Beaker button.",

        step4:
        "Select HCL and 50ml",
        
        step5 : "Now click on Conical Flask and get it to right hand",

        step6 : "Now clikc conocal flas and press fill beaker",

        step7 : "Select universal inciatoru solution 50 ml",

        step8 : "Press P to got puring mode",
        
        step9 : "Scroll mouse to pout and see the reaction happen",

        step10:"You can see the liquid turning to red"

    },
    ]

    useEffect(()=>{
        if (lessonStep !== 3 || selectedLeftHand?.name ==='main-normal-beaker' || selectedRightHand?.name==='main-normal-beaker') {
            setShowNormalBeakerArrow(false)
            return
        }    
    },[showNormalBeakerArrow,lessonStep,selectedLeftHand,selectedRightHand])
    

    return(
        <>
           {lessonStep===1 && 
                <LessonGuide
                 title={"Lesson Overview"} 
                 subTitle={"Acid Indicator Test"}
                text={AcidIndicatorTest[0].step1} 
                icon={'./acidIndicator.png'}
                onButton1={() => setLessonStep(2)}/>
            } 


           {lessonStep===2 && 
                <LessonGuide 
                title={"Lesson Overview"}
                icon={'./acidIndicator.png'}
                subTitle={"Acid Indicator Test"}               
                text={AcidIndicatorTest[0].step2}
                onButton1={() =>{ setLessonStep(3);setShowNormalBeakerArrow(true)}}
            />} 

            {
                lessonStep ===3 && <DialogBox text={"Click Beaker And Select Left Hand"}/>
            }     

            {
                lessonStep ===4 && 
                <DialogBox text={AcidIndicatorTest[0].step3}/>
            }

            {
                lessonStep===5 && isFillBeakerBoxOpen &&
                <DialogBox text={AcidIndicatorTest[0].step4}/>
            }

            {
                lessonStep===6  &&
                <DialogBox text={AcidIndicatorTest[0].step5}/>
            }   

            {
                lessonStep===7  &&
                <DialogBox text={AcidIndicatorTest[0].step6}/>
            }   
            {
                lessonStep===8  &&
                <DialogBox text={AcidIndicatorTest[0].step7}/>
            }

            {
                lessonStep===9  &&
                <DialogBox text={AcidIndicatorTest[0].step8}/>
            } 

            {
                lessonStep ===10 && 
                <DialogBox text={AcidIndicatorTest[0].step9}/>
            } 

            {
                lessonStep ===11 && 
                <DialogBox text={AcidIndicatorTest[0].step10}/>
            }     
        </>
    )
}

export default AcidInidicatorTest