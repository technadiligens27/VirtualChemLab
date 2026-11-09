import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext.jsx";
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext.jsx";
import EnthalpyLessonOverview from "../../EnthalpyLessonOverview.jsx/EnthalpyLessonOverview.jsx";
import {hydrolysisReactionData,guidelineData} from '../../Data/HydrolysisofHalogenoalkanes/HydrolysisofHalogenoalkanes.jsx'
import { useContext, useEffect } from "react";
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox.jsx";
import {safetyInstructionData} from '../../Data/SafetyInstruction/SafetyInstruction.jsx'
import SafetyScreen from "../../SafetyScreen/SafetyScreen.jsx";
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext.jsx";
import HessGuidelines from "../../HessGuidelines/HessGuidelines.jsx";
import SulfamicGuidelines from "../../SulfamicGuidelines/SulfamicGuidelines.jsx";

const HydrolysisLesson = ()=>{

  const {isFillBeakerBoxOpen,hessGuidelineNumber,setHessGuidelineNumber,
    showEnthalyResultOne,setShowEnthalyResultOne} = useContext(InteractionContext)
    
  const {lessonStep,selectedLesson,setLessonStep,setShowNormalBeakerArrow} = useContext(MainGuidelineContext);
  const {digitalBalanceRef,kettleRef,chlorobutaneBottleRef,mainDropperRef,
        labelIodobutaneRef,labelBromobutaneRef,labelChlorobutaneRef} = useContext(ModelContext)

        
useEffect(() => {
  const makeModelAndChildrenVisible = (modelRef) => {
    if (!modelRef?.current) {
      return
    }

    modelRef.current.traverse((child) => {
        child.visible = true
      }
    )
  }

  if (digitalBalanceRef.current) {
    digitalBalanceRef.current.visible = false
  }

  if (kettleRef.current) {
    kettleRef.current.visible = true
  }

  if (mainDropperRef.current) {
    mainDropperRef.current.visible = false
  }

  makeModelAndChildrenVisible(labelIodobutaneRef)
  makeModelAndChildrenVisible(labelBromobutaneRef)
  makeModelAndChildrenVisible(labelChlorobutaneRef)
}, [
  digitalBalanceRef,
  kettleRef,
  mainDropperRef,
  labelIodobutaneRef,
  labelBromobutaneRef,
  chlorobutaneBottleRef,
])

    return(
        <>
         {lessonStep===1 && <EnthalpyLessonOverview reactionData={hydrolysisReactionData[0]} onStartLesson={() => {
            setLessonStep(2)
          }}/>}

        {lessonStep === 2 && (
        <SafetyScreen safetyData={safetyInstructionData} onContinue={() => {setLessonStep((previous) => previous + 1 )}}
            onBack={() => {setLessonStep((previous) => previous - 1)}}
        />)}

        {lessonStep >=3 && lessonStep <10 && <SulfamicGuidelines guidelineData={guidelineData[0]}/>}

        {lessonStep===3 && (<DialogBox text={<>
          Click the <strong>Glass beaker</strong> and select <strong>left hand</strong>.          
          </>}/>
        )}
 
        {lessonStep === 4 && (
          <DialogBox 
            text={ 
              <>
                Click the <strong>Kettle</strong> and select
                <strong> Right hand</strong>.
              </>
            }
          />
        )} 
        
        {lessonStep === 5 && (
          <DialogBox
            text={
              <>
                Press <strong>P</strong> to enter{" "}
                <strong>Pouring Mode</strong>.
              </>
            }
          />
        )}

        {lessonStep === 6 && (
          <DialogBox
            text={
              <>
                Scroll <strong>down</strong> to pour
                water from the <strong>kettle</strong>.
              </>
            }
          />
        )}

        {lessonStep === 7 && (
          <DialogBox
            text={
              <>
                Press <strong>P</strong> to exit{" "}
                <strong>Pouring Mode</strong>.
              </>
            }
          />
        )}


      {lessonStep === 8 && (
        <DialogBox
          text={
            <>
              Click the held <strong>Beaker</strong> and
              select <strong>Keep Back on Table</strong>.
            </>
          }
        />
      )}       


      {lessonStep === 9 && (
        <DialogBox
          text={
            <>
              Click the held <strong>Kettle</strong> and
              select <strong>Keep Back on Table</strong>.
            </>
          }
        />
      )}

        {lessonStep >=10 && lessonStep <19 && <SulfamicGuidelines guidelineData={guidelineData[1]}/>}

        {lessonStep === 10 && <DialogBox text={'Select Testube and click Left Hand Option'}/>}
        {lessonStep === 11 && <DialogBox text={'Click the held Testube and select Label (Iodobutane)'}/>}
        {lessonStep === 12 && <DialogBox text={'Click the Second Testube in The Rack and select Right hand Option'}/>}
        {lessonStep === 13 && <DialogBox text={'Click the held Testube and select Label (Iodobutane)'}/>}
        {lessonStep === 14 && <DialogBox text={'Keep Left Hand Testube on the rack'}/>}
        {lessonStep === 15 && <DialogBox text={'Now select The Last Testube and select Left Hand Option'}/>}
        {lessonStep === 16 && <DialogBox text={'Now click Tetsube and select label'}/>}
        {lessonStep === 17 && <DialogBox text={'Now keep the right hand testube back in table'}/>}
        {lessonStep === 18 && <DialogBox text={'Now keep the Left hand testube back in table'}/>}

        {lessonStep >=19 && lessonStep <41 && <SulfamicGuidelines guidelineData={guidelineData[2]}/>}

        {lessonStep === 19 && (
          <DialogBox
            text={
              <>
                Click the <strong>Measuring Cylinder</strong> and
                select the <strong>Right Hand</strong> option.
              </>
            }
          />
        )}

        {lessonStep === 20 && (
          <DialogBox
            text={
              <>
                Click the held <strong>Measuring Cylinder</strong>{" "}
                and select <strong>Add Liquid</strong>.
              </>
            }
          />
        )}

        {lessonStep === 20.5 && (
          <DialogBox
            text={
              <>
                Add <strong>5 cm³ of ethanol</strong>.
              </>
            }
          />
        )}


        {lessonStep === 21 && (
          <DialogBox
            text={
              <>
                Click the labelled <strong>Iodobutane test tube</strong>{" "}
                and select the <strong>Left Hand</strong> option.
              </>
            }
          />
        )}

        {lessonStep === 22 && (
          <DialogBox
            text={
              <>
                Press <strong>P</strong> to enter{" "}
                <strong>Pouring Mode</strong>.
              </>
            }
          />
        )}

        {lessonStep === 23 && (
          <DialogBox
            text={
              <>
                <strong>Scroll Down</strong> to pour the{" "}
                <strong>Ethanol</strong> into the <strong>Testube</strong>.
              </>
            }
          />
        )}
        {lessonStep === 24 && <DialogBox text={'Press P to exit Pour Mode'}/>}

      {lessonStep === 25 && (
        <DialogBox
          text={
            <>
              Click the held <strong>Test Tube</strong> and
              select <strong>Keep Back on Table</strong>.
            </>
          }
        />
      )}      

      {lessonStep === 26 && (
          <DialogBox
            text={
              <>
                Click the labelled <strong>Bromobutane Test Tube</strong>{" "}
                and select the <strong>Left Hand</strong>
              </>
            }
          />
        )}
        
        
        {lessonStep === 27 && (
          <DialogBox
            text={
              <>
                Click the held <strong>Measuring Cylinder</strong>{" "}
                and select <strong>Add Ethanol 5cm³</strong>.
              </>
            }
          />
        )} 
        
        {lessonStep === 28 && (
          <DialogBox
            text={
              <>
                Add <strong>5 cm³ of ethanol</strong>.
              </>
            }
          />
        )}
        
        {lessonStep === 29 && (
          <DialogBox
            text={
              <>
                Press <strong>P</strong> to enter{" "}
                <strong>Pouring Mode</strong>.
              </>
            }
          />
        )}
        
        
        {lessonStep === 30 && (
          <DialogBox
            text={
              <>
               <strong> Scroll Down</strong> to pour.
              </>
            }
          />
        )}

        {lessonStep === 32 && (
          <DialogBox
            text={
              <>
                Click the held <strong>Test Tube</strong> and
                select <strong>Keep Back on Table</strong>.
              </>
            }
          />
        )}
      {lessonStep === 33 && (
          <DialogBox
            text={
              <>
                Click the labelled <strong>Chlorobutane Test Tube</strong>{" "}
                and select the <strong>Left Hand</strong>
              </>
            }
          />
        )}
        {lessonStep === 34 && (
          <DialogBox
            text={
              <>
                Click the held <strong>Measuring Cylinder</strong>{" "}
                and select <strong>Add Ethanol 5cm³</strong>.
              </>
            }
          />
        )} 
        
        {lessonStep === 35 && (
          <DialogBox
            text={
              <>
                Press <strong>P</strong> to enter{" "}
                <strong>Pouring Mode</strong>.
              </>
            }
          />
        )}
        
        
        {lessonStep === 36 && (
          <DialogBox
            text={
              <>
               <strong> Scroll Down</strong> to pour.
              </>
            }
          />
        )}


        {lessonStep === 39 && (
          <DialogBox
            text={
              <>
                Click the held <strong>Measuring Cylinder</strong>{" "}
                and select <strong>Keep Back on Table</strong>.
              </>
            }
          />
        )}


        {lessonStep === 40 && (
          <DialogBox
            text={
              <>
                Click the <strong>Held Test Tube</strong> and
                select <strong>Keep Back on Table</strong>.
              </>
            }
          />
        )}

        {lessonStep >=41 && lessonStep <74 && <SulfamicGuidelines guidelineData={guidelineData[3]}/>}

        {lessonStep === 41 && (
          <DialogBox
            text={
              <>
                Click the <strong>Iodobutane bottle</strong> and
                select the <strong>Left Hand</strong> option.
              </>
            }
          />
        )}

        {lessonStep === 42 && (
          <DialogBox
            text={
              <>
                Click the <strong>pipette</strong> and select
                the <strong>Right Hand</strong> option.
              </>
            }
          />
        )}

        {lessonStep === 43 && (
          <DialogBox
            text={
              <>
                <strong>Scroll Down</strong> to squeeze the{" "}
                <strong>Pipette</strong>.
              </>
            }
          />
        )}
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

        {lessonStep >=74 && lessonStep <82 && <SulfamicGuidelines guidelineData={guidelineData[4]}/>}


        {lessonStep === 74 && <DialogBox text={'Take Testube to left Hand'}/>}
        {lessonStep === 75 && <DialogBox text={'Select Testube again and Place Bung'}/>}
        {lessonStep === 76 && <DialogBox text={'Take Testube to Right Hand'}/>}
        {lessonStep === 77 && <DialogBox text={'Click tetsube again and select Place Bung'}/>}
        {lessonStep === 78 && <DialogBox text={'Keep Testube Left Back On Table'}/>}
        {lessonStep === 79 && <DialogBox text={'Now Take the Chlorobutane  Testube to Left Hand'}/>}
        {lessonStep === 80 && <DialogBox text={'Select testube and clikc Place Bung'}/>}
        {lessonStep === 81 && <DialogBox text={'Keep Chlorobutane Testube in Table'}/>}

        {lessonStep >=82 && lessonStep<89 && <SulfamicGuidelines guidelineData={guidelineData[5]}/>}


        {lessonStep === 82 && <DialogBox text={'Click Normal BEaker and select LEft Hand Option'}/>}
        {lessonStep === 83 && <DialogBox text={'Select The HEld Testube and select Place In BEaker1'}/>}
        {lessonStep === 84 && <DialogBox text={'Now take Iodobutane Testube to Hand'}/>}
        {lessonStep === 85 && <DialogBox text={'Select The HEld Testube and select Place In BEaker1'}/>}
        {lessonStep === 86 && <DialogBox text={'Now Take the Chlorobutane Testube to right Hand'}/>}
        {lessonStep === 87 && <DialogBox text={'Select The HEld Testube and select Place In BEaker'}/>}
        {lessonStep === 88 && <DialogBox text={'Keep Beaker In Table'}/>}

        {lessonStep >=89 && lessonStep<100 && <SulfamicGuidelines guidelineData={guidelineData[6]}/>}

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

        {lessonStep >=100 && lessonStep<110 && <SulfamicGuidelines guidelineData={guidelineData[7]}/>}


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

export default HydrolysisLesson