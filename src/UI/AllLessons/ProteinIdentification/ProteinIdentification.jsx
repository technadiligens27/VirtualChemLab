import { useContext, useEffect } from "react"
import LessonGuide from "../../LessonGuide/LessonGuide"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import { step } from "three/tsl";

const ProteinIdentification = ()=>{

    const {lessonStep,setLessonStep,
        setShowNormalBeakerArrow,showNormalBeakerArrow,
      setShowTestube01Arrow} = useContext(MainGuidelineContext);
    const {selectedLeftHand,selectedRightHand,isFillBeakerBoxOpen} = useContext(InteractionContext)
    
const ProteinIdentificationTest = [
  {
    step1:
      "In this experiment, the Biuret Test is used to identify protein. A protein sample is mixed with Biuret reagent. If protein is present, the solution changes from blue to purple.",

    step2:
      "Pick up the Test Tube by clicking on it and selecting the Left Hand option.",

    step3:
      "Click on the Test Tube again and press the Fill Beaker button.",

    step4:
      "Select Biuret reagent and 50 ml.",

    step5:
      "Now click on the Dropper and select the Right Hand option.",   

    step6:
      "Now scroll down mouse to squess the dropper to realase air",
    step7:
      "Click on the Dropper again and select place dropper",
    step8:
      "Now scroll Up mouse to get Buriett reagent to dropper",

    step9:
      "Now Click Dropper and press remive dropper",

    step10:
      "Now click testube and click fill beaker",

    step11:
      "Fill Beaker with Protein Sample 50ml",  

    step12:
      "Click Dropper and clikc Place Dropper",   
      
    step13:
      "Scroll donw to relase burette regent in Dropper to testube",      

    step14:
      "You can see the color chnage whihc indicates Protien ",   
  },
]

    // useEffect(()=>{
    //     if (lessonStep !== 3 || selectedLeftHand?.name ==='main-normal-beaker' || selectedRightHand?.name==='main-normal-beaker') {
    //         setShowNormalBeakerArrow(false)
    //         return
    //     }    
    // },[showNormalBeakerArrow,lessonStep,selectedLeftHand,selectedRightHand])
    

    return(
        <>
           {lessonStep===1 && 
                <LessonGuide
                 title={"Lesson Overview"} 
                text={ProteinIdentificationTest[0].step1} 
                onButton1={() => setLessonStep(2)}/>
            } 


           {lessonStep===2 && 
                <LessonGuide 
                title={"Lesson Overview"}                
                text={ProteinIdentificationTest[0].step2}
                onButton1={() =>{ setLessonStep(3)}}
            />} 

            {
                lessonStep ===3 && <DialogBox text={"Pick Up TestTube"}/>
            }     

            {
                lessonStep ===4 && 
                <DialogBox text={ProteinIdentificationTest[0].step3}/>
            }

            {
                lessonStep===5 && isFillBeakerBoxOpen &&
                <DialogBox text={ProteinIdentificationTest[0].step4}/>
            }

            {
                lessonStep===6  &&
                <DialogBox text={ProteinIdentificationTest[0].step5}/>
            }   

            {
                lessonStep===7  &&
                <DialogBox text={ProteinIdentificationTest[0].step6}/>
            }   
            {
                lessonStep===8  &&
                <DialogBox text={ProteinIdentificationTest[0].step7}/>
            }

            {
                lessonStep===9  &&
                <DialogBox text={ProteinIdentificationTest[0].step8}/>
            } 

            {
                lessonStep ===10 && 
                <DialogBox text={ProteinIdentificationTest[0].step9}/>
            } 

            {
                lessonStep ===11 && 
                <DialogBox text={ProteinIdentificationTest[0].step10}/>
            }   

            {
                lessonStep ===12 && 
                <DialogBox text={ProteinIdentificationTest[0].step11}/>
            }

            {
                lessonStep ===13 && 
                <DialogBox text={ProteinIdentificationTest[0].step12}/>
            }

            {
                lessonStep ===14 && 
                <DialogBox text={ProteinIdentificationTest[0].step13}/>
            }

            {
                lessonStep ===15 && 
                <DialogBox text={ProteinIdentificationTest[0].step14}/>
            }


        </>
    )
}

export default ProteinIdentification