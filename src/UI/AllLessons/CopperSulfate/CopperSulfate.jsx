import { useContext } from "react";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import LessonGuide from "../../LessonGuide/LessonGuide";

const CopperSulfate = () =>{

  const {isFillBeakerBoxOpen} = useContext(InteractionContext)
    
  const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);

    const CopperSulfatePrecipitate = [
  {
    step1:
      "In this experiment, copper sulfate solution is mixed with sodium hydroxide solution. This reaction forms a blue copper hydroxide precipitate.",

    step2:
      "Pick up the normal beaker by clicking on it and selecting the Left Hand option.",

    step3:
      "Click on the beaker again and press the Fill Beaker button.",

    step4:
      "Select Copper Sulfate (CuSO4) and 50 ml.",

    step5:
      "Now click on the conical flask and select the Right Hand option.",

    step6:
      "Click on the conical flask again and press the Fill Beaker button.",

    step7:
      "Select Sodium Hydroxide (NaOH) and 50 ml.",

    step8:
      "Press P to enter Pouring Mode.",

    step9:
      "Scroll the mouse to pour the sodium hydroxide into the copper sulfate solution.",

    step10:
      "Observe the reaction. A light blue precipitate forms inside the beaker.",

    step11:
      "This shows that copper sulfate reacts with sodium hydroxide to form insoluble copper hydroxide."
  },
]

    return(
        <>

        {lessonStep===1 && 
            <LessonGuide
               title={"Lesson Overview"} 
               icon={'./CopperSulphateTest.png'}
               text={CopperSulfatePrecipitate[0].step1} 
               onButton1={() => setLessonStep(2)}/>
        }

        {lessonStep===2 && 
                <LessonGuide 
                title={"Lesson Overview"}    
                 icon={'./CopperSulphateTest.png'}            
                text={CopperSulfatePrecipitate[0].step2}
                onButton1={() =>{ setLessonStep(3);setShowNormalBeakerArrow(true)}}
        />}  

        {
          lessonStep ===3 && <DialogBox text={"Pick Up Beaker"}/>
        }

        {
            lessonStep ===4 && 
            <DialogBox text={CopperSulfatePrecipitate[0].step3}/>
        }

        {
            lessonStep===5 && isFillBeakerBoxOpen &&
            <DialogBox text={CopperSulfatePrecipitate[0].step4}/>
        }

        {
            lessonStep===6  &&
            <DialogBox text={CopperSulfatePrecipitate[0].step5}/>
        }  

        {
            lessonStep===7  &&
            <DialogBox text={CopperSulfatePrecipitate[0].step6}/>
        }  

        {
            lessonStep===8  &&
            <DialogBox text={CopperSulfatePrecipitate[0].step7}/>
        }

        {
            lessonStep===9  &&
            <DialogBox text={CopperSulfatePrecipitate[0].step8}/>
        } 

        {
           lessonStep ===10 && 
           <DialogBox text={CopperSulfatePrecipitate[0].step9}/>
        }
        {
           lessonStep ===11 && 
           <DialogBox text={CopperSulfatePrecipitate[0].step10}/>
        }  
        </>
    )
}

export default CopperSulfate