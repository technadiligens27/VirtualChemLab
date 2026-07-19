import { useContext } from "react"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import LessonGuide from "../../LessonGuide/LessonGuide";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";

const AcidBaseNeutralization = ()=>{

    const {isFillBeakerBoxOpen} = useContext(InteractionContext)

    const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);

const AcidBaseNeutralization = [
  {
    step1:
      "In this experiment, hydrochloric acid is mixed with sodium hydroxide. This is called a neutralization reaction. An acid and a base react together to form salt and water.",

    step2:
      "Pick up the normal beaker by clicking on it and selecting the Left Hand option.",

    step3:
      "Click on the beaker again and press the Fill Beaker button.",

    step4:
      "Select Hydrochloric Acid (HCl) and 50 ml.",

    step5:
      "Now click on the conical flask and select the Right Hand option.",

    step6:
      "Click on the conical flask again and press the Fill Beaker button.",

    step7:
      "Select Sodium Hydroxide (NaOH) and 50 ml.",

    step8:
      "Press P to enter Pouring Mode.",

    step9:
      "Scroll the mouse to pour the sodium hydroxide into the hydrochloric acid.",

    step10:
      "Observe the reaction. The acid and base neutralize each other, forming a neutral solution.",

    step11:
      "This shows that acids and bases can react together to reduce each other's effects."
  },
]

 return(
       <>
        {lessonStep===1 && 
            <LessonGuide
               title={"Lesson Overview"} 
               icon={'./AcidBase.png'}
               text={AcidBaseNeutralization[0].step1} 
               onButton1={() => setLessonStep(2)}/>
        }

        {lessonStep===2 && 
                <LessonGuide 
                title={"Lesson Overview"}  
                icon={'./AcidBase.png'}              
                text={AcidBaseNeutralization[0].step2}
                onButton1={() =>{ setLessonStep(3);setShowNormalBeakerArrow(true)}}
        />}  

        {
          lessonStep ===3 && <DialogBox text={"Pick Up Beaker"}/>
        }

        {
            lessonStep ===4 && 
            <DialogBox text={AcidBaseNeutralization[0].step3}/>
        }

        {
            lessonStep===5 && isFillBeakerBoxOpen &&
            <DialogBox text={AcidBaseNeutralization[0].step4}/>
        }

        {
            lessonStep===6  &&
            <DialogBox text={AcidBaseNeutralization[0].step5}/>
        }  

        {
            lessonStep===7  &&
            <DialogBox text={AcidBaseNeutralization[0].step6}/>
        }  

        {
            lessonStep===8  &&
            <DialogBox text={AcidBaseNeutralization[0].step7}/>
        }

        {
            lessonStep===9  &&
            <DialogBox text={AcidBaseNeutralization[0].step8}/>
        } 

        {
           lessonStep ===10 && 
           <DialogBox text={AcidBaseNeutralization[0].step9}/>
        }
        {
           lessonStep ===11 && 
           <DialogBox text={AcidBaseNeutralization[0].step10}/>
        }


       </>
    )
}

export default AcidBaseNeutralization