import { useContext } from "react";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import LessonGuide from "../../LessonGuide/LessonGuide";
import LessonDetails from "../../LessonDetails/LessonDetails";

const AlkaliIndicatorTest = ()=>{

    const {isFillBeakerBoxOpen} = useContext(InteractionContext);
    const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);    
    
    const AlkaliIndicatorTest = [
    {
        step1:
        "In this experiment, you will test an alkali using red litmus paper. Alkalis turn red litmus paper blue, helping us identify basic solutions.",

        step2:
        "Click the normal beaker and select the Left Hand option to pick it up.",

        step3:
        "Click on the beaker again and press the Add Liquid button.",

        step4:
        "Select Sodium Hydroxide (NaOH) and 50 ml.",

        step5:
        "Now pick up the red litmus paper by clicking on it and selecting the Right Hand option.",

        step6:
        "Click the litmus paper and click Test liquid",

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
const lessonDetailsData = [
  {
    id: 3,

    headerTitle: "Lesson Overview",

    lessonTitle: "Alkali Indicator Test",

    description:
      "In this lesson, red litmus paper is used to test sodium hydroxide solution. Alkalis turn red litmus paper blue, helping us identify that the solution is basic.",

    lessonImages: [
      {
        id: 1,
        imgPath: "./BeakerHcl.png",
        label: "Sodium Hydroxide",
        alt: "Beaker containing sodium hydroxide solution",
      },
      {
        id: 2,
        imgPath: "./redLitmus.png",
        label: "Red Litmus Paper",
        alt: "Red litmus paper before testing",
      },
      {
        id: 3,
        imgPath: "./blurLitmus.png",
        label: "Alkaline Result",
        alt: "Litmus paper turned blue after testing an alkali",
      },
    ],

    hint: {
      imgPath: "./light-bulb.png",
      alt: "Light bulb",
      text:
        "Red litmus paper turns blue when it comes into contact with an alkaline solution.",
    },

    objectives: {
      title: "Objectives",
      imgPath: "./objective.png",
      alt: "Objectives icon",
      items: [
        "Understand how litmus paper identifies alkalis",
        "Observe red litmus paper changing to blue",
        "Identify sodium hydroxide as an alkaline solution",
        "Practice testing a liquid safely",
      ],
    },

    materials: {
      title: "Materials",
      imgPath: "./AlkaliLesson.png",
      alt: "Alkali indicator test materials",
      items: [
        "Normal beaker",
        "Red litmus paper",
        "Sodium hydroxide solution (NaOH)",
      ],
    },

    procedure: {
      title: "Procedure",
      imgPath: "./procedure.png",
      alt: "Procedure icon",
      items: [
        "Add 50 mL of sodium hydroxide to the normal beaker",
        "Pick up the red litmus paper",
        "Lower the litmus paper into the sodium hydroxide solution",
        "Observe the paper changing from red to blue",
      ],
    },

    continueButtonText: "Continue",
  },
]
    return(
       <>
            {/* {lessonStep===1 && 
                <LessonGuide
                title={"Lesson Overview"} 
                icon={'./AlkaliTest.png'}
                text={AlkaliIndicatorTest[0].step1} 
                onButton1={() => setLessonStep(2)}/>
            }        */}

            {
                lessonStep===1 &&
                <LessonDetails
                    lessonData={lessonDetailsData[0]}
                    onContinue={() => setLessonStep(2)}
                
                />
            }
       
            {lessonStep===2 && 
                <LessonGuide 
                title={"Lesson Overview"}  
                icon={'./AlkaliTest.png'}              
                text={AlkaliIndicatorTest[0].step2}
                onButton1={() =>{ setLessonStep(3);setShowNormalBeakerArrow(true)}}
        />} 

            {
            lessonStep ===3 && <DialogBox text={"Click the normal beaker and select the Left Hand option to pick it up."}/>
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