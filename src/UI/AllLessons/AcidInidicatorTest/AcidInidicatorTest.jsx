import { useContext, useEffect } from "react"
import LessonGuide from "../../LessonGuide/LessonGuide"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import { step } from "three/tsl";
import LessonDetails from "../../LessonDetails/LessonDetails";

const AcidInidicatorTest = ()=>{

    const {lessonStep,setLessonStep,
        setShowNormalBeakerArrow,showNormalBeakerArrow} = useContext(MainGuidelineContext);
    const {selectedLeftHand,selectedRightHand,isFillBeakerBoxOpen} = useContext(InteractionContext)
    
    const AcidIndicatorTest = [
    {
        step1:
        "In this experiment, hydrochloric acid is mixed with a universal indicator. The indicator changes the solution to red or orange-red, showing that the solution is acidic.",

        step2:
        "Click the normal beaker and select the Left Hand option to pick it up.",

        step3:
        "Click the beaker again and select the Add Liquid option.",

        step4:
        "Select Hydrochloric Acid (HCl) and choose 50 mL.",

        step5:
        "Click the conical flask and select the Right Hand option to pick it up.",

        step6:
        "Click the conical flask again and select the Fill Beaker option.",

        step7:
        "Select the universal indicator solution and choose 50 mL.",

        step8:
        "Press P to enter pouring mode.",

        step9:
        "Scroll the mouse wheel to pour the solution and observe the reaction.",

        step10:
        "Observe the liquid turning red, indicating that the solution is acidic.",
    },
    ]

    const lessonDetailsData = [
  {
    id: 2,

    headerTitle: "Lesson Overview",

    lessonTitle: "Acid Indicator Test",

    description:
      "In this lesson, hydrochloric acid is mixed with a universal indicator to determine whether the solution is acidic. The indicator changes the solution to red or orange-red, confirming the presence of an acid.",

    lessonImages: [
      {
        id: 1,
        imgPath: "./BeakerHcl.png",
        label: "HCL Acid",
        alt: "Beaker containing hydrochloric acid",
      },
      {
        id: 2,
        imgPath: "./conicalUniversalSolution.png",
        label: "Universal",
        alt: "Conical flask containing universal indicator solution",
      },
      {
        id: 3,
        imgPath: "./BeakerRed.png",
        label: "Acidic Result",
        alt: "Red solution showing an acidic result",
      },
    ],

    hint: {
      imgPath: "./light-bulb.png",
      alt: "Light bulb",
      text:
        "A red or orange-red colour indicates that the solution is acidic.",
    },

    objectives: {
      title: "Objectives",
      imgPath: "./objective.png",
      alt: "Objectives icon",
      items: [
        "Understand how a universal indicator identifies acids",
        "Observe the colour change",
        "Identify a red or orange-red acidic result"
      ],
    },

    materials: {
      title: "Materials",
      imgPath: "./AcidIndicatorTest.png",
      alt: "Acid indicator test materials",
      items: [
        "Normal beaker",
        "Conical flask",
        "Hydrochloric acid (HCl)",
        "Universal indicator solution",
      ],
    },

    procedure: {
      title: "Procedure",
      imgPath: "./procedure.png",
      alt: "Procedure icon",
      items: [
        "Add 50 mL of hydrochloric acid to the normal beaker",
        "Add 50 mL of universal indicator to the conical flask",
        "Pour the universal indicator into the HCL acid",
        "Observe the solution turning red or orange-red",
      ],
    },

    continueButtonText: "Continue",
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
           {/* {lessonStep===1 && 
                <LessonGuide
                 title={"Lesson Overview"} 
                 subTitle={"Acid Indicator Test"}
                text={AcidIndicatorTest[0].step1} 
                icon={'./acidIndicator.png'}
                onButton1={() => setLessonStep(2)}/>
            }  */}

            {lessonStep===1 &&
            <LessonDetails
                lessonData={lessonDetailsData[0]}
                onContinue={() => setLessonStep(2)}
            />}

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