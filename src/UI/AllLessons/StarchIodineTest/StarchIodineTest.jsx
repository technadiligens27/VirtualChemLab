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
        "In this experiment, iodine solution is mixed with starch solution to test for the presence of starch. If starch is present, the iodine changes the solution to a blue-black color.",

        step2:
        "Click the normal beaker and select the Left Hand option to pick it up.",

        step3:
        "Click the beaker again and select the Fill Beaker option.",

        step4:
        "Select Starch Solution and choose 50 mL.",

        step5:
        "Click the conical flask and select the Right Hand option to pick it up.",

        step6:
        "Click the conical flask again and select the Fill Beaker option.",

        step7:
        "Select Iodine Solution and choose 50 mL.",

        step8:
        "Press P to enter pouring mode.",

        step9:
        "Scroll the mouse wheel to pour the iodine solution into the starch solution.",

        step10:
        "Observe the solution changing from yellow-brown to blue-black.",

        step11:
        "The blue-black color confirms that starch is present in the solution.",
    },
    ]
    return(
        <>
            {lessonStep===1 && 
                <LessonGuide
                title={"Lesson Overview"} 
                icon={'./StarchIodine.png'}
                text={StarchIodineTest[0].step1} 
                subTitle={"Starch Iodine Test"}
                onButton1={() => setLessonStep(2)}/>
            }       
       
            {lessonStep===2 && 
                <LessonGuide 
                title={"Lesson Overview"}  
                icon={'./StarchIodine.png'}              
                text={StarchIodineTest[0].step2}
                onButton1={() =>{ setLessonStep(3);setShowNormalBeakerArrow(true)}}
            />} 

            {
            lessonStep ===3 && <DialogBox text={"Click the normal beaker and select the Left Hand option to pick it up."}/>
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