import { useContext } from "react";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import LessonGuide from "../../LessonGuide/LessonGuide";
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const StarchIodineTest = ()=>{

    const {isFillBeakerBoxOpen} = useContext(InteractionContext);
    const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);  


    const StarchIodineTest = [
    {
        step1:
        "In this experiment, iodine solution is mixed with starch solution. This test is used to check for the presence of starch. Iodine turns blue-black when starch is present.",

        step2:
        "Pick up the normal beaker by clicking on it and selecting the Left Hand option.",

        step3:
        "Click on the beaker again and press the Fill Beaker button.",

        step4:
        "Select Starch Solution and 50 ml.",

        step5:
        "Now click on the conical flask and select the Right Hand option.",

        step6:
        "Click on the conical flask again and press the Fill Beaker button.",

        step7:
        "Select Iodine Solution and 50 ml.",

        step8:
        "Press P to enter Pouring Mode.",

        step9:
        "Scroll the mouse to pour the iodine solution into the starch solution.",

        step10:
        "Observe the reaction. The solution changes from yellow-brown to blue-black.",

        step11:
        "This color change shows that starch is present in the solution."
    },
    ]
    return(
        <>
            {lessonStep===1 && 
                <LessonGuide
                title={"Lesson Overview"} 
                text={StarchIodineTest[0].step1} 
                onButton1={() => setLessonStep(2)}/>
            }       
       
            {lessonStep===2 && 
                <LessonGuide 
                title={"Lesson Overview"}                
                text={StarchIodineTest[0].step2}
                onButton1={() =>{ setLessonStep(3);setShowNormalBeakerArrow(true)}}
            />} 

            {
            lessonStep ===3 && <DialogBox text={"Pick Up Beaker"}/>
            }

            {
                lessonStep ===4 && 
                <DialogBox text={StarchIodineTest[0].step3}/>
            }

            {
                lessonStep===5 && isFillBeakerBoxOpen &&
                <DialogBox text={StarchIodineTest[0].step4}/>
            }

            {
                lessonStep===6  &&
                <DialogBox text={StarchIodineTest[0].step5}/>
            }  

            {
                lessonStep===7  &&
                <DialogBox text={StarchIodineTest[0].step6}/>
            }  

            {
                lessonStep===8  &&
                <DialogBox text={StarchIodineTest[0].step7}/>
            }

            {
                lessonStep===9  &&
                <DialogBox text={StarchIodineTest[0].step8}/>
            } 

            {
            lessonStep ===10 && 
            <DialogBox text={StarchIodineTest[0].step9}/>
            }
            {
            lessonStep ===11 && 
            <DialogBox text={StarchIodineTest[0].step10}/>
            }
       
       </>
    )
}

export default StarchIodineTest