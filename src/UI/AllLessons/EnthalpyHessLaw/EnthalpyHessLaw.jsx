import { useContext } from "react";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox";
import LessonGuide from "../../LessonGuide/LessonGuide";
import LessonDetails from "../../LessonDetails/LessonDetails";
import HessGuidelines from "../../HessGuidelines/HessGuidelines";
import HessLessonIntroduction from "../../HessLessonIntroduction/HessLessonIntroduction";
import HessReactionOneResults from "../../HessReactionOneResults/HessReactionOneResults";
import HessStartingTemperature from "../../HessStartingTemperature/HessStartingTemperature";
import EnthalpyLessonOverview from "../../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview";
import HessLiveDataPanel from "../../HessLiveDataPanel/HessLiveDataPanel";


const EnthalpyHessLaw = () =>{

  const {isFillBeakerBoxOpen,hessGuidelineNumber,setHessGuidelineNumber,
    showEnthalyResultOne,setShowEnthalyResultOne} = useContext(InteractionContext)
    
  const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);

  const Enthalpy = [
  {
    step1:
      "In this experiment, potassium carbonate reacts with hydrochloric acid inside a polystyrene cup. The temperature change is measured and later used in Hess’s Law calculations.",

    step2:
      "Click the normal beaker and select the Left Hand option to pick it up.",

    step3:
      "Click the polystyrene cup and select the Right Hand option to pick it up.",

    step4:
      "Click the polystyrene cup and select Place in Beaker.",

    step5:
      "Click the normal beaker and select Keep Back on Table.",

    step6:
      "Click the test tube and select the Left Hand option.",

    step7:
      "Click the spatula and select the Right Hand option.",

    step8:
      "Click the potassium carbonate container and select Take Potassium Carbonate.",

    step9:
      "Click the spatula and select Pour into Test Tube.",

    step10:
      "Scroll down to rotate the spatula and transfer the potassium carbonate into the test tube.",

    step11:
      "Click the spatula and disable Pour Mode.",

    step12:
      "Click the digital balance and select Place Balance.",

    step13:
      "Click the spatula and select Keep Back on Table.",

    step14:
      "Click the test tube and select Weigh Test Tube.",

    step15:
      "Click the test tube again and select Keep on Table.",

    step16:
      "Click the burette and select the Left Hand option.",

    step17:
      "Click the burette and select Add Liquid.",

    step18:
      "Add 30 cm³ of hydrochloric acid to the burette.",

    step19:
      "Click the normal beaker and select the Right Hand option.",

    step20:
      "Click the digital balance and select Remove Balance.",

    step21:
      "Click the burette and select Clamp Burette.",

    step22:
      "Click the burette clamp and select the required clamp option.",

    step23:
      "Click the burette clamp and select Place in Centre.",

    step24:
      "Click the normal beaker and select Place Beaker.",

    step25:
      "Scroll down to pour hydrochloric acid from the burette into the polystyrene cup.",

    step26:
      "Click the normal beaker and select Remove Beaker.",

    step27:
      "Click the burette clamp and select Remove from Centre.",

    step28:
      "Click the thermometer and select the Right Hand option.",

    step29:
      "Click the thermometer again and select Place Thermometer.",

    step30:
      "Click the test tube and select the Right Hand option.",

    step31:
      "Click the normal beaker and select Stir.",

    step32:
      "Press P to enter Pouring Mode.",

    step33:
      "Scroll down to stir the mixture and gradually pour the potassium carbonate from the test tube.",

    step34:
      "Press P again to exit Pouring Mode.",

    step35:
      "Click the normal beaker and select Unstir to remove the stirring tool.",

    step36:
      "Place the digital balance again to reweigh the emptied test tube.",

    step37:
      "Click the test tube and select Weigh Test Tube.",

    step38:
      "Click the normal beaker and select Remove Thermometer.",

    step39:
      "Click the thermometer and select Reset Thermometer.",

    step40:
      "Click the normal beaker and select Dispose Cup.",

    step41:
      "Click the thermometer and select Keep Back on Table.",

    step42:
      "Reaction 1 is complete. Review the recorded results before continuing.",
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

//-----------------------

  const guidelineData = [
    {
      id: 1,

      title: "Prepare the Polystyrene Cup",

      description:
        "Place the polystyrene cup inside the normal beaker. The beaker supports the lightweight cup and helps keep it stable while the temperature change is measured.",

      implementationSteps: [
        "Pick up the normal beaker.",
        "Pick up the polystyrene cup with the other hand.",
        "Place the polystyrene cup inside the normal beaker.",
        "Make sure the cup is positioned upright in the centre.",
        "Keep the top of the polystyrene cup open for adding the reactants.",
      ],

      image: "./polystyreneCupInBeaker.png",

      onButtonContinue: () => {
        setHessGuidelineNumber(false)
        setLessonStep(3)
        setShowNormalBeakerArrow(true)
      },
    },

    {
      id: 2,

      title: "Prepare the Potassium Carbonate",

      description:
        "Transfer potassium carbonate into a test tube so that its mass can be measured before it is added to the hydrochloric acid. The potassium carbonate will react with the acid and produce the temperature change required for the enthalpy calculation.",

      implementationSteps: [
        "Pick up an empty test tube.",
        "Pick up the spatula with the other hand.",
        "Use the spatula to collect potassium carbonate.",
        "Carefully transfer the potassium carbonate from the spatula into the test tube.",
      ],

      image: "./TestubePottasiumAdd.png",

      onButtonContinue: () => {
        setHessGuidelineNumber(false)
      },
    },

    {
      id: 3,

      title: "Measure the Temperature",

      description:
        "Place the thermometer in the hydrochloric acid and wait for the reading to become stable.",

      implementationSteps: [
        "Keep the thermometer inside the cup.",
        "Make sure the thermometer bulb is fully immersed in the liquid.",
        "Do not allow the thermometer to touch the bottom or sides of the cup.",
        "Wait until the temperature reading becomes stable.",
        "Record the initial temperature of the hydrochloric acid.",
      ],

      image: "./beakerWithThermometer.png",

      onButtonContinue: () => {
        setHessGuidelineNumber(false)
      },
    },

    {
      id: 4,

      title: "Weigh Test Tube and Potassium Carbonate",

      description:
        "Measure and record the combined mass of the test tube and potassium carbonate. This measurement will later be used to determine the exact mass of potassium carbonate added to the hydrochloric acid.",

      implementationSteps: [
        "Place the digital balance in the centre of the workspace.",
        "Close the test tube securely with its cap.",
        "Place the test tube on the centre of the balance.",
        "Wait until the balance reading becomes stable.",
        "Record the combined mass of the test tube and potassium carbonate.",
      ],

      image: "./weighTestube.png",

      onButtonContinue: () => {
        setHessGuidelineNumber(false)
      },
    },

    {
  id: 5,

  title: "Add HCL Acid to the Polystyrene Cup",

  description:
    "Fill the burette with hydrochloric acid, secure it vertically in the clamp, and position the normal beaker containing the polystyrene cup beneath the burette. The hydrochloric acid can then be delivered accurately into the polystyrene cup.",

  implementationSteps: [
    "Add hydrochloric acid to the burette.",
    "Secure the burette vertically in the burette clamp.",
    "Place the normal beaker beneath the burette tip.",
    "Open the burette tap gradually.",
    "Close the burette tap when the required volume has been delivered.",
  ],

  image: "./BuretteHCLPour.png",

  onButtonContinue: () => {
    setHessGuidelineNumber(false)
  },
},
{
  id: 6,

  title: "Add Potassium Carbonate and Measure the Temperature Change",

  description:
    "Add the potassium carbonate to the hydrochloric acid while stirring continuously. Observe the thermometer and record the highest stable temperature reached during the reaction.",

  implementationSteps: [
    "Position the test tube above the polystyrene cup.",
    "Add the potassium carbonate gradually to the hydrochloric acid.",
    "Stir the mixture continuously while adding the potassium carbonate.",
    "Wait until the temperature reaches its highest value ",
  ],

  image: "./addPotassiumCarbonateAndStir.png",

  onButtonContinue: () => {
    setHessGuidelineNumber(false)
  },
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



        {/* {
          lessonStep===1 &&
          <LessonDetails
            lessonData={lessonDetailsData[0]}
            onContinue={() => setLessonStep(2)}
          />
        } */}
{/* 
        {
          lessonStep===1 && <HessLessonIntroduction
            onStartLesson={() => {
              setLessonStep(2)
  }}
/>
        } */}




        {
         lessonStep===1 && <EnthalpyLessonOverview onStartLesson={() => {
              setLessonStep(2)
  }}/>
        }

        {(lessonStep >=1 && lessonStep <17) &&   <HessLiveDataPanel
                  reactionNumber={1}

                  // volumeOfSolution={30}
                  // solutionDensity={1}

                  // startingTemperature={22}
                  // currentTemperature={31.2}
                  // highestTemperature={31.5}

                  // massWithPowder={24.7}
                  // massAfterEmptying={21.72}
        />}

        {lessonStep >=17 && lessonStep<21 &&  <HessLiveDataPanel
                  reactionNumber={1}

                  // volumeOfSolution={30}
                  // solutionDensity={1}

                  // startingTemperature={22}
                  // currentTemperature={31.2}
                  // highestTemperature={31.5}

                  massWithPowder={24.7}
                  // massAfterEmptying={21.72}
        />}

        {lessonStep >=21 && lessonStep<32 &&  <HessLiveDataPanel
                  reactionNumber={1}
                  volumeOfSolution={30}
                  solutionDensity={1}

                  // startingTemperature={22}
                  // currentTemperature={31.2}
                  // highestTemperature={31.5}

                  massWithPowder={24.7}
                  // massAfterEmptying={21.72}
        />}

        {lessonStep >=32 &&  <HessLiveDataPanel
                  reactionNumber={1}
                  volumeOfSolution={30}
                  solutionDensity={1}

                  startingTemperature={22}
                  // currentTemperature={31.2}
                  // highestTemperature={31.5}

                  massWithPowder={24.7}
                  // massAfterEmptying={21.72}
        />}

        {lessonStep >=40 &&  <HessLiveDataPanel
                  reactionNumber={1}
                  volumeOfSolution={30}
                  solutionDensity={1}

                  startingTemperature={22}
                  // currentTemperature={31.2}
                  highestTemperature={42.5}

                  massWithPowder={24.7}
                  massAfterEmptying={21.70}
        />}                        


        {(lessonStep >= 2 && lessonStep <= 7 ) && ( <HessGuidelines guidelineData={guidelineData[0]}/>)}
        
        {
          (lessonStep>=8 && lessonStep<=13)  && <HessGuidelines guidelineData={guidelineData[1]}/>
        }

        {
          (lessonStep>=14 && lessonStep<=17)  && <HessGuidelines guidelineData={guidelineData[3]}/>
        }

        {
          (lessonStep>=18 && lessonStep<=30)  && <HessGuidelines guidelineData={guidelineData[4]}/>
        }

        {
          (lessonStep>=31 &&  lessonStep<=31)  && <HessStartingTemperature />
        }

        {
          (lessonStep>=32 && lessonStep<=38)  && <HessGuidelines guidelineData={guidelineData[5]}/>
        }

        {
          showEnthalyResultOne && <HessReactionOneResults/>
        }

         

        {/* {lessonStep===2 && 
                <LessonGuide 
                title={"Lesson Overview"}    
                 icon={'./CopperSulphateTest.png'}            
                text={Enthalpy[0].step2}
                onButton1={() =>{ setLessonStep(3);setShowNormalBeakerArrow(true)}}
        />}   */}

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
            <DialogBox text={Enthalpy[0].step4}/>
        }  

        {
            lessonStep===7  &&
            <DialogBox text={Enthalpy[0].step5}/>
        }  

        {
            lessonStep===8  &&
            <DialogBox text={Enthalpy[0].step6}/>
        }

        {
            lessonStep===9  &&
            <DialogBox text={Enthalpy[0].step7}/>
        } 

        {
           lessonStep ===10 && 
           <DialogBox text={Enthalpy[0].step8}/>
        }
        {
           lessonStep ===11 && 
           <DialogBox text={Enthalpy[0].step9}/>
        }  

        {
           lessonStep ===12 && 
           <DialogBox text={Enthalpy[0].step10}/>
        }    

        {
           lessonStep ===13 && 
           <DialogBox text={Enthalpy[0].step11}/>
        }

        {
           lessonStep ===14 && 
           <DialogBox text={Enthalpy[0].step12}/>
        }

        {
          lessonStep ===15 && 
           <DialogBox text={Enthalpy[0].step13}/>
        }

        {
          lessonStep ===16 && 
           <DialogBox text={Enthalpy[0].step14}/>
        }  

        
        {lessonStep ===17 && 
           <DialogBox text={Enthalpy[0].step15}/>
        }  

        {lessonStep ===18 && 
           <DialogBox text={Enthalpy[0].step16}/>
        } 

       {lessonStep ===19 && 
           <DialogBox text={Enthalpy[0].step17}/>
       }

       {lessonStep ===20 && 
           <DialogBox text={Enthalpy[0].step18}/>
       }

       {lessonStep ===21 && 
           <DialogBox text={Enthalpy[0].step19}/>
       }

       {lessonStep ===22 && 
           <DialogBox text={Enthalpy[0].step20}/>
       }

       {lessonStep ===23 && 
           <DialogBox text={Enthalpy[0].step21}/>
       }

       {lessonStep ===24 && 
           <DialogBox text={Enthalpy[0].step22}/>
       }

       {lessonStep ===25 && 
           <DialogBox text={Enthalpy[0].step23}/>
       }  

       {lessonStep ===26 && 
           <DialogBox text={Enthalpy[0].step24}/>
       }

       {lessonStep ===27 && 
           <DialogBox text={Enthalpy[0].step25}/>
       }  


       {lessonStep ===28 && 
           <DialogBox text={Enthalpy[0].step26}/>
       } 

       {lessonStep ===29 && 
           <DialogBox text={Enthalpy[0].step27}/>
       }

       {lessonStep ===30 && 
           <DialogBox text={Enthalpy[0].step28}/>
       }

       {lessonStep ===31 && 
           <DialogBox text={Enthalpy[0].step29}/>
       }

       {lessonStep ===32 && 
           <DialogBox text={Enthalpy[0].step30}/>
       }

       {lessonStep ===33 && 
           <DialogBox text={Enthalpy[0].step31}/>
       }

       {lessonStep ===34 && 
           <DialogBox text={Enthalpy[0].step32}/>
       } 

      {lessonStep ===35 && 
           <DialogBox text={Enthalpy[0].step33}/>
       }      
          
      {lessonStep ===36 && 
           <DialogBox text={Enthalpy[0].step34}/>
       }

      {lessonStep ===37 && 
           <DialogBox text={Enthalpy[0].step35}/>
      } 

      {lessonStep ===38 && 
           <DialogBox text={Enthalpy[0].step36}/>
      }

      {lessonStep ===39 && 
           <DialogBox text={Enthalpy[0].step37}/>
      } 

      {lessonStep ===40 && 
           <DialogBox text={Enthalpy[0].step38} 
          />
      }

      {lessonStep ===41 && 
           <DialogBox text={Enthalpy[0].step39} />
      }

      {lessonStep ===42 && 
           <DialogBox text={Enthalpy[0].step40}/>
      }

      {lessonStep ===43 && 
           <DialogBox text={Enthalpy[0].step41}/>
      }

      {lessonStep ===44 && 
           <DialogBox text={Enthalpy[0].step42} onbtnClick={() => {
            setShowEnthalyResultOne(true)
            }}/>
      }      

        </>
    )
}

export default EnthalpyHessLaw