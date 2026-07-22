import { useContext, useEffect } from "react"
import LessonGuide from "../../LessonGuide/LessonGuide"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import { step } from "three/tsl";
import LessonDetails from "../../LessonDetails/LessonDetails";

const ProteinIdentification = ()=>{

    const {lessonStep,setLessonStep,
        setShowNormalBeakerArrow,showNormalBeakerArrow,
      setShowTestube01Arrow} = useContext(MainGuidelineContext);
    const {selectedLeftHand,selectedRightHand,isFillBeakerBoxOpen} = useContext(InteractionContext)
    
    const ProteinIdentificationTest = [
      {
        step1:
          "In this experiment, the Biuret test is used to identify proteins. When Biuret reagent is added to a protein sample, the solution changes from blue to purple if protein is present.",

        step2:
          "Click the test tube and select the Left Hand option to pick it up.",

        step3:
          "Click the test tube again and select the Add Liquid option.",

        step4:
          "Select Biuret Reagent and choose 50 mL.",

        step5:
          "Click the dropper and select the Right Hand option to pick it up.",

        step6:
          "Scroll the mouse wheel down to squeeze the dropper and release the air inside it.",

        step7:
          "Click the dropper again and select the Place Dropper option.",

        step8:
          "Scroll the mouse wheel up to draw the Biuret reagent into the dropper.",

        step9:
          "Click the dropper and select the Remove Dropper option.",

        step10:
          "Click the test tube again and select the Add Liquid option.",

        step11:
          "Select Protein Sample and choose 50 mL.",

        step12:
          "Click the dropper and select the Place Dropper option.",

        step13:
          "Scroll the mouse wheel down to release the Biuret reagent into the test tube.",

        step14:
          "Observe the solution changing to purple. This color change indicates that protein is present in the sample.",
      },
    ]


const lessonDetailsData = [
  {
    id: 7,

    headerTitle: "Lesson Overview",

    lessonTitle: "Protein Identification – Biuret Test",

    description:
      "In this lesson, we use the Biuret test to identify proteins in a sample. When Biuret reagent reacts with protein, the solution changes from blue to purple, indicating that protein is present.",

    lessonImages: [
      {
        id: 1,
        imgPath: "./testube-protein.png",
        label: "Protein Sample",
        alt: "Test tube containing a protein sample",
      },
      {
        id: 2,
        imgPath: "./dropper-buirette.png",
        label: "Biuret Reagent",
        alt: "Dropper containing Biuret reagent",
      },
      {
        id: 3,
        imgPath: "./positiveBuirette.png",
        label: "Positive Result",
        alt: "Purple solution showing a positive Biuret test",
      },
    ],

    hint: {
      imgPath: "./light-bulb.png",
      alt: "Light bulb",
      text:
        "A purple colour change indicates that protein is present in the sample.",
    },

    objectives: {
      title: "Objectives",
      imgPath: "./objective.png",
      alt: "Objectives icon",
      items: [
        "Understand how Biuret test identifies proteins",
        "Observe the colour change",
        "Identify a positive protein test result",
        "Practice using a test tube and dropper",
      ],
    },

    materials: {
      title: "Materials",
      imgPath: "./ProteinTest.png",
      alt: "Protein test materials",
      items: [
        "Test tube",
        "Dropper",
        "Protein sample",
        "Biuret reagent",
      ],
    },

    procedure: {
      title: "Procedure",
      imgPath: "./procedure.png",
      alt: "Procedure icon",
      items: [
        "Add Biuret reagent to the test tube",
        "Draw the Biuret reagent into the dropper",
        "Add the protein sample to the test tube",
        "Release the Biuret reagent into the protein sample",
        "Observe the solution changing from blue to purple",
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
                text={ProteinIdentificationTest[0].step1} 
                icon={'./ProteinTest.png'}
                onButton1={() => setLessonStep(2)}/>
            }  */}

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
                icon={'./ProteinTest.png'}             
                text={ProteinIdentificationTest[0].step2}
                onButton1={() =>{ setLessonStep(3)}}
            />} 

            {
                lessonStep ===3 && <DialogBox text={"Click TestTube and select the Left Hand option to pick it up."}/>
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