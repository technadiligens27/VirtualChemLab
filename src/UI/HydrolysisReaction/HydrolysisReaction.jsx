import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext";
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext";
import EnthalpyLessonOverview from "../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview";
import {hydrolysisReactionData} from '../Data/HydrolysisofHalogenoalkanes/HydrolysisofHalogenoalkanes.jsx'
import { useContext, useEffect } from "react";
import DialogBox from "../AllDialogBox/DialogBox/DialogBox";
import {safetyInstructionData} from '../Data/SafetyInstruction/SafetyInstruction.jsx'
import SafetyScreen from "../SafetyScreen/SafetyScreen.jsx";
import { ModelContext } from "../../Contexts/ModelContext/ModelContext.jsx";
import HessGuidelines from "../HessGuidelines/HessGuidelines.jsx";

const HydrolysisReaction = ()=>{

  const {isFillBeakerBoxOpen,hessGuidelineNumber,setHessGuidelineNumber,
    showEnthalyResultOne,setShowEnthalyResultOne} = useContext(InteractionContext)
    
  const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);
  const {digitalBalanceRef,kettleRef,chlorobutaneBottleRef,mainDropperRef} = useContext(ModelContext)

  useEffect(()=>{
    if(digitalBalanceRef.current){
        digitalBalanceRef.current.visible = false
    }
    if(kettleRef.current){
        kettleRef.current.visible = true
    }

    if(mainDropperRef.current){
      mainDropperRef.current.visible = false
    }

    // if(chlorobutaneBottleRef.current){
    //   chlorobutaneBottleRef.current.visible = true
    // }
  },[digitalBalanceRef,chlorobutaneBottleRef,kettleRef,mainDropperRef])


const guidelineData = [
  {
    id: 1,

    title: "Prepare the Water Bath",

    description:
      "Prepare a warm water bath at approximately 50°C. The water bath keeps the reaction mixtures at a consistent temperature so that the rates of hydrolysis of the different halogenoalkanes can be compared fairly.",

    implementationSteps: [
      "Pick up the normal beaker.",
      "Pick up the warm-water container or kettle with the other hand.",
      "Pour warm water into the beaker.",
      "Fill the beaker to approximately three-quarters full.",
      "Keep the prepared water bath on the table.",
    ],

    image: "./prepareWaterBath.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
      setLessonStep(3)
      setShowNormalBeakerArrow(true)
    },
  },

  {
    id: 2,

    title: "Label the Halogenoalkane Test Tubes",

    description:
      "Prepare three test tubes and label them according to the halogenoalkane that will be placed in each tube. Correct labelling is important so that the reaction times can later be matched to the correct halogenoalkane.",

    implementationSteps: [
      "Select the first test tube and label it Iodobutane.",
      "Select the second test tube and label it Bromobutane.",
      "Select the third test tube and label it Chlorobutane.",
      "Place the labelled test tubes back in the rack.",
      "Make sure each test tube can be clearly identified.",
    ],

    image: "./labelHalogenoalkaneTestTubes.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 3,

    title: "Add Ethanol to the Test Tubes",

    description:
      "Measure 5 cm³ of ethanol and transfer it into each labelled test tube. Ethanol allows the halogenoalkanes to mix sufficiently with the aqueous silver nitrate used later in the experiment.",

    implementationSteps: [
      "Pick up the measuring cylinder and Measure 5 cm³ of ethanol.",
      "Pour the ethanol into the Iodobutane test tube.",
      "Measure 5 cm³ of ethanol and add it to the Bromobutane test tube.",
      "Measure 5 cm³ of ethanol and add it to the Chlorobutane test tube.",
      "Return the measuring cylinder to the table.",
    ],

    image: "./addEthanolToTestTubes.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 4,

    title: "Add the Halogenoalkanes",

    description:
      "Use a dropping pipette to add the appropriate halogenoalkane to each labelled test tube. The same amount should be used for each sample so that the comparison between reaction rates is fair.",

    implementationSteps: [
      "Use the pipette to take up Iodobutane.",
      "Add four drops of Iodobutane to the Iodobutane test tube.",
      "Add four drops of Bromobutane to the Bromobutane test tube.",
      "Add four drops of Chlorobutane to the Chlorobutane test tube.",
      "Return the pipette and chemical bottles to the table.",
    ],

    image: "./addHalogenoalkanes.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 5,

    title: "Seal the Test Tubes",

    description:
      "Fit a bung securely into each test tube after the ethanol and halogenoalkane have been added. This keeps the mixtures contained while they are warmed in the water bath.",

    implementationSteps: [
      "Pick up the Iodobutane test tube.",
      "Fit a bung securely into the test tube.",
      "Repeat for the Bromobutane test tube.",
      "Repeat for the Chlorobutane test tube.",
      "Check that all three test tubes are properly sealed.",
    ],

    image: "./bungTestTubes.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 6,

    title: "Warm the Halogenoalkane Mixtures",

    description:
      "Place the three sealed test tubes into the warm water bath. Warming the mixtures to approximately the same temperature ensures that temperature does not affect the comparison between the different halogenoalkanes.",

    implementationSteps: [
      "Pick up the beaker containing the warm water bath.",
      "Place the Iodobutane test tube into the water bath.",
      "Place the Bromobutane test tube into the water bath.",
      "Place the Chlorobutane test tube into the water bath.",
      "Make sure all three test tubes are standing securely in the water bath.",
      "Allow the mixtures to warm.",
    ],

    image: "./testTubesInWaterBath.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 7,

    title: "Prepare the Silver Nitrate",

    description:
      "Prepare three separate portions of silver nitrate solution. Each halogenoalkane mixture must receive the same volume of silver nitrate so that their hydrolysis rates can be compared accurately.",

    implementationSteps: [
      "Select an empty test tube.",
      "Add 5 cm³ of silver nitrate solution.",
      "Prepare a second test tube containing 5 cm³ of silver nitrate.",
      "Prepare a third test tube containing 5 cm³ of silver nitrate.",
      "Keep the three silver nitrate portions ready for the reactions.",
    ],

    image: "./prepareSilverNitrate.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 8,

    title: "Start the Hydrolysis Reactions",

    description:
      "Add the silver nitrate solution to each warmed halogenoalkane mixture and begin timing immediately. Hydrolysis releases halide ions, which react with silver ions to form a cloudy silver halide precipitate.",

    implementationSteps: [
      "Remove a warmed halogenoalkane test tube from the water bath.",
      "Add 5 cm³ of silver nitrate solution.",
      "Start the timer immediately.",
      "Mix the contents of the test tube.",
      "Watch for the first appearance of cloudiness or precipitate.",
      "Record the time taken.",
      "Repeat the same procedure for the remaining halogenoalkanes.",
    ],

    image: "./startHydrolysisReaction.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: "9",

    title: "Measure the Iodobutane Reaction",

    description:
      "Observe the Iodobutane reaction and measure the time taken for cloudiness or precipitate to appear.",

    implementationSteps: [
      "Start timing the Iodobutane reaction.",
      "Observe the mixture carefully.",
      "Watch for cloudiness or precipitate.",
      "Record the reaction time.",
    ],

    image: "./compareHydrolysisResults.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 10,

    title: "Measure the Bromobutane Reaction",

    description:
      "Observe the Bromobutane reaction and measure the time taken for cloudiness or precipitate to appear.",

    implementationSteps: [
      "Start timing the Bromobutane reaction.",
      "Observe the mixture carefully.",
      "Watch for cloudiness or precipitate.",
      "Record the reaction time.",
    ],

    image: "./compareHydrolysisResults.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },

  {
    id: 11,

    title: "Measure the Chlorobutane Reaction",

    description:
      "Observe the Chlorobutane reaction and measure the time taken for cloudiness or precipitate to appear.",

    implementationSteps: [
      "Start timing the Chlorobutane reaction.",
      "Observe the mixture carefully.",
      "Watch for cloudiness or precipitate.",
      "Record the reaction time.",
    ],

    image: "./compareHydrolysisResults.png",

    onButtonContinue: () => {
      setHessGuidelineNumber(false)
    },
  },
]

    return(
        <>
         {lessonStep===1 && <EnthalpyLessonOverview reactionData={hydrolysisReactionData[0]} onStartLesson={() => {
            setLessonStep(2)
          }}/>}

        {lessonStep === 2 && (
        <SafetyScreen safetyData={safetyInstructionData} onContinue={() => {setLessonStep((previous) => previous + 1 )}}
            onBack={() => {setLessonStep((previous) => previous - 1)}}
        />)}

        {lessonStep >=3 && lessonStep <10 && <HessGuidelines guidelineData={guidelineData[0]}/>}

        {lessonStep === 3 && <DialogBox text={'Pick Beaker to the left hand'}/>}
        {lessonStep === 4 && <DialogBox text={'Pick Kettle to the right hand'}/>}
        {lessonStep === 5 && <DialogBox text={'Press P to got Pouring Mode'}/>}
        {lessonStep === 6 && <DialogBox text={'Scroll Down Mouse To Pour From Kettle'}/>}
        {lessonStep === 7 && <DialogBox text={'Press P to exit Pouring Mode'}/>}
        {lessonStep === 8 && <DialogBox text={'Keep Beaker In Table'}/>}
        {lessonStep === 9 && <DialogBox text={'Keep Kettle back In Table'}/>}

        {lessonStep >=10 && lessonStep <19 && <HessGuidelines guidelineData={guidelineData[1]}/>}

        {lessonStep === 10 && <DialogBox text={'Select Testube and click Left Hand Option'}/>}
        {lessonStep === 11 && <DialogBox text={'Click the held Testube and select Label (Iodobutane)'}/>}
        {lessonStep === 12 && <DialogBox text={'Click the Second Testube in The Rack and select Right hand Option'}/>}
        {lessonStep === 13 && <DialogBox text={'Click the held Testube and select Label (Iodobutane)'}/>}
        {lessonStep === 14 && <DialogBox text={'Keep Left Hand Testube on the rack'}/>}
        {lessonStep === 15 && <DialogBox text={'Now select The Last Testube and select Left Hand Option'}/>}
        {lessonStep === 16 && <DialogBox text={'Now click Tetsube and select label'}/>}
        {lessonStep === 17 && <DialogBox text={'Now keep the right hand testube back in table'}/>}
        {lessonStep === 18 && <DialogBox text={'Now keep the Left hand testube back in table'}/>}

        {lessonStep >=19 && lessonStep <41 && <HessGuidelines guidelineData={guidelineData[2]}/>}

        {lessonStep === 19 && <DialogBox text={'Click Measuring Cylinder and select Right Hand Option'}/>}
        {lessonStep === 20 && <DialogBox text={'Click Measuring Cylinder and select Add Liquid'}/>}
        {lessonStep === 20.5 && <DialogBox text={'Take 5cm3 of Ethanol'}/>}
        {lessonStep === 21 && <DialogBox text={'Take the Iodinebutan Testube to Left Hand Option'}/>}
        {lessonStep === 22 && <DialogBox text={'Press P to enter Pour Mode'}/>}
        {lessonStep === 23 && <DialogBox text={'Scroll down to Pour'}/>}
        {lessonStep === 24 && <DialogBox text={'Press P to exit Pour Mode'}/>}
        {lessonStep === 25 && <DialogBox text={'Keep Testube back on Table'}/>}
        {lessonStep === 26 && <DialogBox text={'Now take the With the bromobutane label'}/>}
        {lessonStep === 27 && <DialogBox text={'Click Measuring Cylinder and select Add Liquid'}/>}
        {lessonStep === 28 && <DialogBox text={'Take 5cm3 of Ethanol again'}/>}
        {lessonStep === 29 && <DialogBox text={'Press P to enter Pour Mode'}/>}
        {lessonStep === 30 && <DialogBox text={'Scroll down to Pour'}/>}
        {lessonStep === 31 && <DialogBox text={'Press P to exit Pour Mode'}/>}
        {lessonStep === 32 && <DialogBox text={'Keep Testube Back on Table'}/>}
        {lessonStep === 33 && <DialogBox text={'Take the last Testube labelled (chlorobutane)'}/>}
        {lessonStep === 34 && <DialogBox text={'Click Measuring Cylinder and select Add Liquid'}/>}
        {lessonStep === 35 && <DialogBox text={'Take 5cm3 of Ethanol again'}/>}
        {lessonStep === 36 && <DialogBox text={'Press P to enter Pour Mode'}/>}
        {lessonStep === 37 && <DialogBox text={'Scroll down to Pour'}/>}
        {lessonStep === 38 && <DialogBox text={'Press P to exit Pour Mode'}/>}
        {lessonStep === 39 && <DialogBox text={'Keep Measuring Cylinder Back on Table'}/>}
        {lessonStep === 40 && <DialogBox text={'Keep Testube On Table'}/>}

        {lessonStep >=41 && lessonStep <74 && <HessGuidelines guidelineData={guidelineData[3]}/>}

        {lessonStep === 41 && <DialogBox text={'Select Iodobutane Bottle to Left hand'}/>}
        {lessonStep === 42 && <DialogBox text={'Select Pipette To Right Hand'}/>}
        {lessonStep === 43 && <DialogBox text={'Scroll Down to Squeeze Pipette'}/>}
        {lessonStep === 44 && <DialogBox text={'Click Pipette Again And select Take Liquid'}/>}
        {lessonStep === 45 && <DialogBox text={'Scroll Upwards to take Liquid'}/>}
        {lessonStep === 46 && <DialogBox text={'CLick Pipette and select Exit Pipette Mode'}/>}
        {lessonStep === 47 && <DialogBox text={'Kepp Iodobutane bottle back in Table'}/>}
        {lessonStep === 48 && <DialogBox text={'Now Take Testube containing Iodobutane'}/>}
        {lessonStep === 49 && <DialogBox text={'Now click Pipette and select Pipette Mode'}/>}
        {lessonStep === 50 && <DialogBox text={'Now scroll Down to pour a dropelt to the testube'}/>}
        {lessonStep === 51 && <DialogBox text={'Now exit Pippete Mode'}/>}
        {lessonStep === 52 && <DialogBox text={'Keep Back The Testube on The Table'}/>}
        {lessonStep === 53 && <DialogBox text={'Now Take Bromobutane Bottle into Left Hand'}/>}
        {lessonStep === 54 && <DialogBox text={'Now Select Pipette and click Pipette Mode'}/>}
        {lessonStep === 55 && <DialogBox text={'Scroll Upwards to take Liquid'}/>}
        {lessonStep === 56 && <DialogBox text={'Now exit Pippete Mode'}/>}
        {lessonStep === 57 && <DialogBox text={'Keep borobutane Bottle Back on Table'}/>}
        {lessonStep === 58 && <DialogBox text={'Take Testube Containe Label Borobutane'}/>}
        {lessonStep === 59 && <DialogBox text={'Click Pipette and select Pipette Mode'}/>}
        {lessonStep === 60 && <DialogBox text={'Scroll Down to Pour'}/>}
        {lessonStep === 61 && <DialogBox text={'Exit Pipette Mode'}/>}
        {lessonStep === 62 && <DialogBox text={'Keep Bromobutane Tetsube back in Table'}/>}
        {lessonStep === 63 && <DialogBox text={'Take Chlorobutane Bottle to Left Hand'}/>}
        {lessonStep === 64 && <DialogBox text={'Click Pippete and Click Pipette Mode'}/>}
        {lessonStep === 65 && <DialogBox text={'Scroll Upwards to take Liquid'}/>}
        {lessonStep === 66 && <DialogBox text={'Exit Pipette Mode'}/>}
        {lessonStep === 67 && <DialogBox text={'Keep Chlorobutane bottle in Table'}/>}
        {lessonStep === 68 && <DialogBox text={'Take Chlorobutane Testube in Left Hand Option'}/>}
        {lessonStep === 69 && <DialogBox text={'Go To Pippete Mode'}/>}
        {lessonStep === 70 && <DialogBox text={'Scroll Down to Pour issue'}/>}
        {lessonStep === 71 && <DialogBox text={'Exit Pipette Mode'}/>}
        {lessonStep === 72 && <DialogBox text={'Keep Testube Back In Table'}/>}
        {lessonStep === 73 && <DialogBox text={'Keep Pipette In Table'}/>}

        {lessonStep >=74 && lessonStep <82 && <HessGuidelines guidelineData={guidelineData[4]}/>}


        {lessonStep === 74 && <DialogBox text={'Take Testube to left Hand'}/>}
        {lessonStep === 75 && <DialogBox text={'Select Testube again and Place Bung'}/>}
        {lessonStep === 76 && <DialogBox text={'Take Testube to Right Hand'}/>}
        {lessonStep === 77 && <DialogBox text={'Click tetsube again and select Place Bung'}/>}
        {lessonStep === 78 && <DialogBox text={'Keep Testube Left Back On Table'}/>}
        {lessonStep === 79 && <DialogBox text={'Now Take the Chlorobutane  Testube to Left Hand'}/>}
        {lessonStep === 80 && <DialogBox text={'Select testube and clikc Place Bung'}/>}
        {lessonStep === 81 && <DialogBox text={'Keep Chlorobutane Testube in Table'}/>}

        {lessonStep >=82 && lessonStep<89 && <HessGuidelines guidelineData={guidelineData[5]}/>}


        {lessonStep === 82 && <DialogBox text={'Click Normal BEaker and select LEft Hand Option'}/>}
        {lessonStep === 83 && <DialogBox text={'Select The HEld Testube and select Place In BEaker1'}/>}
        {lessonStep === 84 && <DialogBox text={'Now take Iodobutane Testube to Hand'}/>}
        {lessonStep === 85 && <DialogBox text={'Select The HEld Testube and select Place In BEaker1'}/>}
        {lessonStep === 86 && <DialogBox text={'Now Take the Chlorobutane Testube to right Hand'}/>}
        {lessonStep === 87 && <DialogBox text={'Select The HEld Testube and select Place In BEaker'}/>}
        {lessonStep === 88 && <DialogBox text={'Keep Beaker In Table'}/>}

        {lessonStep >=89 && lessonStep<100 && <HessGuidelines guidelineData={guidelineData[6]}/>}

        {lessonStep === 89 && <DialogBox text={'Now Take Testube To left hand'}/>}
        {lessonStep === 90 && <DialogBox text={'Click Add Lqiuid '}/>}
        {lessonStep === 91 && <DialogBox text={'Silver Nitrate Add 5cm3 '}/>}
        {lessonStep === 92 && <DialogBox text={'Now Take Second TEstube to RIght Hand'}/>}
        {lessonStep === 93 && <DialogBox text={'Click Add Lqiuid '}/>}
        {lessonStep === 94 && <DialogBox text={'Silver Nitrate Add 5cm3 '}/>}
        {lessonStep === 95 && <DialogBox text={'Keep RIght HAnd Testube Back '}/>}
        {lessonStep === 96 && <DialogBox text={'Clck Third Testube and Get it to Right Hand'}/>}
        {lessonStep === 97 && <DialogBox text={'Click Add Lqiuid'}/>}
        {lessonStep === 98 && <DialogBox text={'Silver Nitrate Add 5cm3'}/>}
        {lessonStep === 99 && <DialogBox text={'Keep LEft Hand TEstube IN Table'}/>}

        {lessonStep >=100 && lessonStep<110 && <HessGuidelines guidelineData={guidelineData[7]}/>}


        {lessonStep === 100 && <DialogBox text={'Now Take BEaker to LEft Hand AGin1'}/>}
        {lessonStep === 101 && <DialogBox text={'Select The HEld Testube and select Place In BEaker'}/>}
        {lessonStep === 102 && <DialogBox text={'Select Next testube 01'}/>}
        {lessonStep === 103 && <DialogBox text={'Place In Beaker'}/>}
        {lessonStep === 104 && <DialogBox text={'Now Take Last remaining testube'}/>}
        {lessonStep === 105 && <DialogBox text={'Place In Beaker'}/>}
        {lessonStep === 106 && <DialogBox text={'Keep BEaker Back In Table'}/>}
        {lessonStep === 107 && <DialogBox text={'Now Click The Bekaer And TAake Iodubutane and SilverNotrate TEstube (Remove Tubes from Water Bath) '}/>}
        {lessonStep === 108 && <DialogBox text={'Now Click Tetsube with Iodobutane adn remvoe bung'}/>}
        {lessonStep === 109 && <DialogBox text={'Click P for Pouring Mode'}/>}
        {lessonStep === 110 && <DialogBox text={'Scroll Down To Pour'}/>}
        {lessonStep === 111 && <DialogBox text={'you can see cliudinnes with precipaitate occuring and Keep Observing'}/>}
        {lessonStep === 112 && <DialogBox text={'Press P to exit Pouring Mode'}/>}
        {lessonStep === 113 && <DialogBox text={'Keep Left Testtube back In Table'}/>}
        {lessonStep === 114 && <DialogBox text={'Keep Right Testtube back In Table'}/>}
        {lessonStep === 115 && <DialogBox text={'Now Click The Beaker And TAake Bromobutane and SilverNitrate Testube (Remove Tubes from Water Bath)'}/>}
        {lessonStep === 116 && <DialogBox text={'Select Held Testtube and Remove Bung'}/>}
        {lessonStep === 117 && <DialogBox text={'Press P for Pouring Mode'}/>}
        {lessonStep === 118 && <DialogBox text={'Scroll Down To Pour'}/>}
        {lessonStep === 119 && <DialogBox text={'you can see cliudinnes with precipaitate occuring and Keep Observing'}/>}
        {lessonStep === 120 && <DialogBox text={'Press P to exit Pouring Mode'}/>}
        {lessonStep === 121 && <DialogBox text={'Keep Left Testtube back In Table'}/>}
        {lessonStep === 122 && <DialogBox text={'Keep Right Testtube back In Table'}/>}
        {lessonStep === 123 && <DialogBox text={'123'}/>}



        {/* {lessonStep >=114 && <HessGuidelines guidelineData={guidelineData[8]}/>} */}



        </>
    )
}

export default HydrolysisReaction