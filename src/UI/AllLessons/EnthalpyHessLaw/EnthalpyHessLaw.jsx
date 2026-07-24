import { useContext } from "react";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import LessonGuide from "../../LessonGuide/LessonGuide";
import LessonDetails from "../../LessonDetails/LessonDetails";


const EnthalpyHessLaw = () =>{

  const {isFillBeakerBoxOpen} = useContext(InteractionContext)
    
  const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);

  const Enthalpy = [
    {
      step1:
        "In this experiment, copper sulfate solution is mixed with sodium hydroxide solution. The reaction produces a light blue copper hydroxide precipitate.",

      step2:
        "Click the normal beaker and select the Left Hand option to pick it up.",

      step3:
        "Click the Polysterene Cup and select the Right Hand option.",

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

  const lessonDetailsData = [
  {
    id: 5,

    headerTitle: "Lesson Overview",

    lessonTitle: "Enthalpy Change Using Hess’s Law",

    description:
      "In this lesson, You will conduct two reactions and measure their temperature changes. The first reaction should produce a temperature rise, while the second should produce a temperature fall.",

    lessonImages: [
      {
        id: 1,
        imgPath: "./BeakerCopperSulphate.png",
        label: "Copper Sulfate",
        alt: "Beaker containing blue copper sulfate solution",
      },
      {
        id: 2,
        imgPath: "./ConicalSodiumGydroxide.png",
        label: "Sodium Hydroxide",
        alt: "Conical flask containing sodium hydroxide solution",
      },
      {
        id: 3,
        imgPath: "./LightBluePrexipitate.png",
        label: "Light Blue Precipitate",
        alt: "Light blue copper hydroxide precipitate inside a beaker",
      },
    ],

    hint: {
      imgPath: "./light-bulb.png",
      alt: "Light bulb",
      text:
        "The light blue solid forms because copper hydroxide is insoluble in water.",
    },

    objectives: {
      title: "Objectives",
      imgPath: "./objective.png",
      alt: "Objectives icon",
      items: [
        "Understand how a precipitate forms",
        "Observe the reaction between two solutions",
        "Identify the light blue copper hydroxide precipitate"
      ],
    },

    materials: {
      title: "Materials",
      imgPath: "./CopperSulfateLesson.png",
      alt: "Copper sulfate precipitation materials",
      items: [
        "Normal beaker",
        "Conical flask",
        "Copper sulfate solution (CuSO₄)",
        "Sodium hydroxide solution (NaOH)",
      ],
    },

    procedure: {
      title: "Procedure",
      imgPath: "./procedure.png",
      alt: "Procedure icon",
      items: [
        "Add 50 mL of copper sulfate to beaker",
        "Add 50 mL of sodium hydroxide to the conical flask",
        "Pour the sodium hydroxide into the copper sulfate",
        "Observe the light blue precipitate forming",
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
               icon={'./CopperSulphateTest.png'}
               text={CopperSulfatePrecipitate[0].step1} 
               onButton1={() => setLessonStep(2)}/>
        } */}

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
                 icon={'./CopperSulphateTest.png'}            
                text={Enthalpy[0].step2}
                onButton1={() =>{ setLessonStep(3);setShowNormalBeakerArrow(true)}}
        />}  

        {
          lessonStep ===3 && <DialogBox text={"Click the normal beaker and select the Left Hand option to pick it up."}/>
        }

        {
            lessonStep ===4 && 
            <DialogBox text={Enthalpy[0].step3}/>
        }

        {
            lessonStep===5 && isFillBeakerBoxOpen &&
            <DialogBox text={Enthalpy[0].step4}/>
        }

        {
            lessonStep===6  &&
            <DialogBox text={Enthalpy[0].step5}/>
        }  

        {
            lessonStep===7  &&
            <DialogBox text={Enthalpy[0].step6}/>
        }  

        {
            lessonStep===8  &&
            <DialogBox text={Enthalpy[0].step7}/>
        }

        {
            lessonStep===9  &&
            <DialogBox text={Enthalpy[0].step8}/>
        } 

        {
           lessonStep ===10 && 
           <DialogBox text={Enthalpy[0].step9}/>
        }
        {
           lessonStep ===11 && 
           <DialogBox text={Enthalpy[0].step10}/>
        }  
        </>
    )
}

export default EnthalpyHessLaw