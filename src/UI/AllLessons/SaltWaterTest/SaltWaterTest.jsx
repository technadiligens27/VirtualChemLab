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
      "Click the normal beaker and select the Left Hand option to pick it up.",

    step3:
      "Click the beaker again and select the Add Liquid option.",

    step4:
      "Select Water and fill the beaker with 50 mL.",

    step5:
      "Click the spoon and select the Right Hand option to pick it up.",

    step6:
      "Click the salt container and select the Take Salt option.",

    step7:
      "Click the spoon again and select Stir Mode.",

    step8:
      "Scroll the mouse wheel to stir the salt into the water.",

    step9:
      "Observe the salt dissolving as its particles spread throughout the water, forming a saltwater solution. No new substance is produced, so this is a physical change.",
  },
]

 return(
       <>
        {lessonStep===1 && 
            <LessonGuide
               title={"Lesson Overview"} 
               subTitle={'Salt Dissolving In Water'}
               text={SaltWaterTestSteps[0].step1} 
               icon={'./saltLesson.png'}
               onButton1={() => setLessonStep(2)}/>
        }

        {lessonStep===2 && 
                <LessonGuide 
                title={"Lets Start"}      
                subTitle={'Pick Up Normal Beaker'}    
                icon={'./saltLesson.png'}      
                text={SaltWaterTestSteps[0].step2}
                onButton1={() =>{ setLessonStep(3);setShowNormalBeakerArrow(true)}}
        />}  

        {
          lessonStep ===3 && <DialogBox text={"Pick Up Normal Beaker by Clicking on it Selecting the left hand option"}/>
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
        


       </>
    )
}

export default SaltWaterTest