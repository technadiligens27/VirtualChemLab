import { useContext } from "react"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import LessonGuide from "../../LessonGuide/LessonGuide";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import LessonDetails from "../../LessonDetails/LessonDetails";

const AcidBaseNeutralization = ()=>{

    const {isFillBeakerBoxOpen} = useContext(InteractionContext)

    const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);

    const AcidBaseNeutralization = [
      {
        step1:
          "In this experiment, hydrochloric acid is mixed with sodium hydroxide. This is known as a neutralization reaction, where an acid and a base react to form salt and water.",

        step2:
          "Click the normal beaker and select the Left Hand option to pick it up.",

        step3:
          "Click the beaker again and select the Add Liquid option.",

        step4:
          "Select Hydrochloric Acid (HCl) and choose 50 mL.",

        step5:
          "Click the conical flask and select the Right Hand option to pick it up.",

        step6:
          "Click the conical flask again and select the Add Liquid option.",

        step7:
          "Select Sodium Hydroxide (NaOH) and choose 50 mL.",

        step8:
          "Press P to enter pouring mode.",

        step9:
          "Scroll the mouse wheel to pour the sodium hydroxide into the hydrochloric acid.",

        step10:
          "Observe the reaction as the acid and base neutralize each other, forming salt and water.",

        step11:
          "This reaction demonstrates how an acid and a base can react to produce a neutral solution.",
      },
    ]

const lessonDetailsData = [
  {
    id: 6,

    headerTitle: "Lesson Overview",

    lessonTitle: "Acid–Base Neutralization",

    description:
      "In this lesson, hydrochloric acid is mixed with sodium hydroxide. The acid and base neutralize each other and form salt and water, producing a neutral solution.",

    lessonImages: [
      {
        id: 1,
        imgPath: "./BeakerHcl.png",
        label: "HCL Acid",
        alt: "Beaker containing hydrochloric acid",
      },
      {
        id: 2,
        imgPath: "./ConicalSodiumGydroxide.png",
        label: "NaOH",
        alt: "Conical flask containing sodium hydroxide solution",
      },
      {
        id: 3,
        imgPath: "./BeakerNeutral.png",
        label: "Neutral",
        alt: "Beaker containing the neutral salt and water solution",
      },
    ],

    hint: {
      imgPath: "./light-bulb.png",
      alt: "Light bulb",
      text:
        "During neutralization, an acid and a base react to form salt and water.",
    },

    objectives: {
      title: "Objectives",
      imgPath: "./objective.png",
      alt: "Objectives icon",
      items: [
        "Understand the process of neutralization",
        "Observe the reaction between an acid and a base",
        "Identify salt and water as the products"
      ],
    },

    materials: {
      title: "Materials",
      imgPath: "./AcidBaseLesson.png",
      alt: "Acid-base neutralization materials",
      items: [
        "Normal beaker",
        "Conical flask",
        "Hydrochloric acid (HCl)",
        "Sodium hydroxide solution (NaOH)",
      ],
    },

    procedure: {
      title: "Procedure",
      imgPath: "./procedure.png",
      alt: "Procedure icon",
      items: [
        "Add 50 mL of hydrochloric acid to beaker",
        "Add 50 mL of sodium hydroxide to the conical flask",
        "Pour the sodium hydroxide into the HCL acid",
        "Observe the acid and base forming salt and water",
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
               icon={'./AcidBase.png'}
               text={AcidBaseNeutralization[0].step1} 
               onButton1={() => setLessonStep(2)}/>
        } */}

        {
          lessonStep===1 && <LessonDetails
            lessonData={lessonDetailsData[0]}
            onContinue={() => setLessonStep(2)}
          
          />
        }

        {lessonStep===2 && 
                <LessonGuide 
                title={"Lesson Overview"}  
                icon={'./AcidBase.png'}              
                text={AcidBaseNeutralization[0].step2}
                onButton1={() =>{ setLessonStep(3);setShowNormalBeakerArrow(true)}}
        />}  

        {
          lessonStep ===3 && <DialogBox text={"Click the normal beaker and select the Left Hand option to pick it up."}/>
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