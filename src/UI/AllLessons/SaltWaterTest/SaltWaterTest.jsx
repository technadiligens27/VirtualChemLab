import { useContext } from "react"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import LessonGuide from "../../LessonGuide/LessonGuide";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";

const SaltWaterTest = ()=>{

    const {isFillBeakerBoxOpen} = useContext(InteractionContext)

    const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);

    const SaltWaterTestSteps = [
    {
        step1:
        "In this experiment, salt is added to water to observe how it dissolves and forms a saltwater solution.",

        step2:
        "Pick up the normal beaker by clicking on it and selecting the Left Hand option.",

        step3:
        "Click on the beaker again and press the Fill Beaker button.",

        step4:
        "Select Water and fill the beaker with 50 ml.",

        step5:
        "Click on the spoon and select the Right Hand option.",

        step6:
        "Click spoon again and Press Fill Spoon",

        step7:
        "Move the spoon over the beaker containing water.",

        step8:
        "Add the salt into the water.",

        step9:
        "Click on the spoon and select the Stir option.",

        step10:
        "Stir the mixture and observe the salt gradually dissolving in the water.",

        step11:
        "The salt particles spread throughout the water, forming a saltwater solution. No new substance is produced, so this is a physical change.",
    },
    ]

 return(
       <>
        {lessonStep===1 && 
            <LessonGuide
               title={"Lesson Overview"} 
               text={SaltWaterTestSteps[0].step1} 
               onButton1={() => setLessonStep(2)}/>
        }

        {lessonStep===2 && 
                <LessonGuide 
                title={"Lesson Overview"}                
                text={SaltWaterTestSteps[0].step2}
                onButton1={() =>{ setLessonStep(3);setShowNormalBeakerArrow(true)}}
        />}  

        {
          lessonStep ===3 && <DialogBox text={"Pick Up Beaker"}/>
        }

        {
            lessonStep ===4 && 
            <DialogBox text={SaltWaterTestSteps[0].step3}/>
        }

        {
            lessonStep===5 && isFillBeakerBoxOpen &&
            <DialogBox text={SaltWaterTestSteps[0].step4}/>
        }

        {
            lessonStep===6  &&
            <DialogBox text={SaltWaterTestSteps[0].step5}/>
        }  

        {
            lessonStep===7  &&
            <DialogBox text={SaltWaterTestSteps[0].step6}/>
        }  

        {
            lessonStep===8  &&
            <DialogBox text={SaltWaterTestSteps[0].step7}/>
        }

        {
            lessonStep===9  &&
            <DialogBox text={SaltWaterTestSteps[0].step8}/>
        } 

        {
           lessonStep ===10 && 
           <DialogBox text={SaltWaterTestSteps[0].step9}/>
        }
        {
           lessonStep ===11 && 
           <DialogBox text={SaltWaterTestSteps[0].step10}/>
        }


       </>
    )
}

export default SaltWaterTest