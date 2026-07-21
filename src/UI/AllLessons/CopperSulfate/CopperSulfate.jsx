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
        "In this experiment, copper sulfate solution is mixed with sodium hydroxide solution. The reaction produces a light blue copper hydroxide precipitate.",

      step2:
        "Click the normal beaker and select the Left Hand option to pick it up.",

      step3:
        "Click the beaker again and select the Add Liquid option.",

      step4:
        "Select Copper Sulfate (CuSO₄) and choose 50 mL.",

      step5:
        "Click the conical flask and select the Right Hand option to pick it up.",

      step6:
        "Click the conical flask again and select the Add Liquid option.",

      step7:
        "Select Sodium Hydroxide (NaOH) and choose 50 mL.",

      step8:
        "Press P to enter pouring mode.",

      step9:
        "Scroll the mouse wheel to pour the sodium hydroxide into the copper sulfate solution.",

      step10:
        "Observe the reaction as a light blue precipitate forms inside the beaker.",

      step11:
        "The light blue precipitate confirms that copper sulfate has reacted with sodium hydroxide to form insoluble copper hydroxide.",
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
          lessonStep ===3 && <DialogBox text={"Click the normal beaker and select the Left Hand option to pick it up."}/>
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