import { useContext } from "react";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import LessonGuide from "../../LessonGuide/LessonGuide";

const AlkaliIndicatorTest = ()=>{

    const {isFillBeakerBoxOpen} = useContext(InteractionContext);
    const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);    
    
    const AlkaliIndicatorTest = [
    {
        step1:
        "In this experiment, you will test an alkali using red litmus paper. Alkalis turn red litmus paper blue, helping us identify basic solutions.",

        step2:
        "Pick up the normal beaker by clicking on it and selecting the Left Hand option.",

        step3:
        "Click on the beaker again and press the Fill Beaker button.",

        step4:
        "Select Sodium Hydroxide (NaOH) and 50 ml.",

        step5:
        "Now pick up the red litmus paper by clicking on it and selecting the Right Hand option.",

        step6:
        "Click the litmus paper and click test liquid",

        step7:
        "Move the litmus paper into the sodium hydroxide solution by scrolling the mouse until it touches the liquid.",

        step8:
        "Observe the red litmus paper changing from red to blue.",

        step9:
        "This color change shows that sodium hydroxide is an alkali.",

        step10:
        "Red litmus paper turns blue in alkaline solutions, confirming the presence of a base."
    },
    ]

    return(
       <>
            {lessonStep===1 && 
                <LessonGuide
                title={"Lesson Overview"} 
                text={AlkaliIndicatorTest[0].step1} 
                onButton1={() => setLessonStep(2)}/>
            }       
       
            {lessonStep===2 && 
                <LessonGuide 
                title={"Lesson Overview"}                
                text={AlkaliIndicatorTest[0].step2}
                onButton1={() =>{ setLessonStep(3);setShowNormalBeakerArrow(true)}}
        />} 

            {
            lessonStep ===3 && <DialogBox text={"Pick Up Beaker"}/>
            }

            {
                lessonStep ===4 && 
                <DialogBox text={AlkaliIndicatorTest[0].step3}/>
            }

            {
                lessonStep===5 && isFillBeakerBoxOpen &&
                <DialogBox text={AlkaliIndicatorTest[0].step4}/>
            }

            {
                lessonStep===6  &&
                <DialogBox text={AlkaliIndicatorTest[0].step5}/>
            }  

            {
                lessonStep===7  &&
                <DialogBox text={AlkaliIndicatorTest[0].step6}/>
            }  

            {
                lessonStep===8  &&
                <DialogBox text={AlkaliIndicatorTest[0].step7}/>
            }

            {
                lessonStep===9  &&
                <DialogBox text={AlkaliIndicatorTest[0].step8}/>
            } 

            {
            lessonStep ===10 && 
            <DialogBox text={AlkaliIndicatorTest[0].step9}/>
            }
            {
            lessonStep ===11 && 
            <DialogBox text={AlkaliIndicatorTest[0].step10}/>
            }
       
       </>
    )
}

export default AlkaliIndicatorTest