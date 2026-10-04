import { useContext, useEffect } from "react"
import Explanations from "../../Experience/Interactions/Explanations/Explanations"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllExplanationLesson12 = ()=>{

    const {lessonStep,setIsExplanationOpen,isExplanationOpen} = useContext(MainGuidelineContext);

    useEffect(()=>{
        if([4,6,9,13,18,23,32,38,42,43,53,54,56,61,66,67,73,76,78,85,87,103,104].includes(lessonStep)){
            setIsExplanationOpen(true)
        }
    },[lessonStep])

    useEffect(()=>{
        if([].includes(lessonStep)){
            setIsExplanationOpen(false)
        }
    },[lessonStep])    

    if(!isExplanationOpen)return
    return(
        <>

           {lessonStep==4 && <Explanations
            text={
                <>
            Let’s start by weighing the <strong>test tube</strong>.    
                </>
            }
            top="30%"
            left="30%"
            height="150px"
            width="400px"
            />}
           {lessonStep==6 && <Explanations
            text={
                <>
                The recorded mass of the <strong>test tube</strong> is <strong>21.72 g</strong>.                </>
            }
            top="50%"
            left="60%"
            height="150px"
            width="420px"
            />}
 
           {lessonStep==9 && <Explanations
            text={
                <>
                 <strong>Sulfamic acid</strong> will be used by measuring how much it reacts with the <strong>sodium hydroxide</strong>, therefore we can calculate the sodium hydroxide concentration.
                </>
            }
            top="27%"
            left="40%"
            height="235px"
            width="470px"
            />}

           {lessonStep==13 && <Explanations
            text={
                <>
                The recorded mass of the <strong>test tube</strong> with <strong>Sulfamic acid</strong> is <strong>24.22 g</strong>.      
                </>
            }

            text02={
                <>
                 So <strong>Sulfumic acid</strong> that will be used is <strong>2.50 g</strong>
                </>
            }
            top="50%"
            left="60%"
            height="190px"
            width="420px"
            />}

           {lessonStep==18 && <Explanations
            text={
                <>
                    Now let’s dissolve the weighed <strong>sulfamic acid</strong> in this <strong>distilled water</strong>.
                </>
            }
            top="27%"
            left="40%"
            height="190px"
            width="370px"
            />}


           {lessonStep==23 && <Explanations
            text={
                <>
                Let’s use the <strong>spatula</strong> to stir the mixture.   
                             </>
            }
            top="27%"
            left="50%"
            height="150px"
            width="380px"
            />}

           {lessonStep==32 && <Explanations
            text={
                <>
                Now let’s <strong>swirl and rinse the beaker</strong> with <strong>distilled water</strong> so any remaining <strong>sulfamic acid solution</strong> can be transferred to the volumetric flask.
                             </>
            }
            top="27%"
            left="38%"
            height="260px"
            width="380px"
            />}

           {lessonStep==38 && <Explanations
            text={
                <>
                Now let’s <strong>swirl and rinse</strong> the <strong>beaker </strong>one more time.
                </>
            }
            top="27%"
            left="38%"
            height="185px"
            width="380px"
            />}

           {lessonStep==42 && <Explanations
            text={
                <>
                Now we have to add <strong>distilled water</strong> until the liquid level is just below the <strong>250 cm³ calibration line</strong>.                </>
            }
            top="27%"
            left="52%"
            height="230px"
            width="390px"
            />}


           {lessonStep==43 && <Explanations
            text={
                <>
                Now place the <strong>bung</strong> into the <strong>volumetric flask</strong>, then invert it three times to mix the solution evenly.
 
                               </>
            }
            top="27%"
            left="48%"
            height="225px"
            width="380px"
            />}

           {lessonStep==53 && <Explanations
            text={
                <>
                We use the <strong>burette</strong> to add the sulfamic acid solution accurately and measure the volume used in the titration.
                </>
            }
            top="27%"
            left="28%"
            height="225px"
            width="380px"
            />}

           {lessonStep==54 && <Explanations
            text={
                <>
                The <strong>funnel</strong> will be used to pour the sulfamic acid solution into the <strong>burette</strong> without spilling.                </>
            }
            top="27%"
            left="43%"
            height="225px"
            width="380px"
            />}

           {lessonStep==56 && <Explanations
            text={
                <>
                Now let’s pour the <strong>sulfamic acid solution</strong> into the <strong>burette</strong>.                </>
                }
            top="27%"
            left="52%"
            height="185px"
            width="380px"
            />}

           {lessonStep==61 && <Explanations
            text={
                <>
                Now let’s set up the <strong>titration</strong> by first clamping the <strong>burette</strong> to the stand
                </>
                }
            top="27%"
            left="25%"
            height="185px"
            width="380px"
            />}

           {lessonStep==66 && <Explanations
            text={
                <>
                <strong>NaOH reagent bottle</strong> will be used to provide the sodium hydroxide solution for the titration.                </>
                }
            top="27%"
            left="45%"
            height="225px"
            width="380px"
            />}

           {lessonStep==67 && <Explanations
            text={
                <>
                We use the <strong>volumetric pipette</strong> to measure and transfer exactly <strong>25.0 cm³ of sodium hydroxide</strong> into the conical flask </>
                }
            top="27%"
            left="25%"
            height="235px"
            width="400px"
            />}

           {lessonStep==73 && <Explanations
            text={
                <>
                <strong>Conical Flask</strong> will be used to hold the sodium hydroxide while the <strong>sulfamic acid</strong> is added during the titration
                </>
                }
            top="27%"
            left="47%"
            height="235px"
            width="400px"
            />}

           {lessonStep==76 && <Explanations
            text={
                <>
                The <strong>Conical Flask</strong> now contains <strong>25.0 cm³ of sodium hydroxide solution</strong>.                </>
                }
            top="27%"
            left="47%"
            height="185px"
            width="400px"
            />}



           {lessonStep==78 && <Explanations
            text={
                <>
                We use <strong>methyl orange</strong> because it changes colour when the <strong>sodium hydroxide</strong> has reacted with enough <strong>sulfamic acid</strong>. This tells us when to stop the titration.                </>
                }
            top="27%"
            left="30%"
            height="270px"
            width="450px"
            />}

           {lessonStep==85 && <Explanations
            text={
                <>
                Your recorded <strong>titre</strong> is <strong>24.80 cm³</strong>. It is measured by subtracting the <strong>initial burette reading</strong> from the <strong>final burette reading</strong>.
                </>
                }
            top="27%"
            left="60%"
            height="270px"
            width="370px"
            />}

           {lessonStep==87 && <Explanations
            text={
                <>
                We should clean the <strong>Conical Flask</strong> before the second titration so no liquid from the first titration affects the new result
                </>
                }
            top="27%"
            left="47%"
            height="235px"
            width="400px"
            />}

           {lessonStep==103 && <Explanations
            text={
                <>
                Let's <strong>begin</strong> the <strong>second titration</strong>
                </>
                }
            top="27%"
            left="60%"
            height="145px"
            width="370px"
            />}

           {lessonStep==104 && <Explanations
            text={
                <>
                Your recorded <strong>titre</strong> is <strong>24.75 cm³</strong>. It is measured by subtracting the <strong>initial burette reading</strong> from the <strong>final burette reading</strong>.
                </>
                }
            top="27%"
            left="60%"
            height="270px"
            width="370px"
            />}

        </>
    )                
}
export default AllExplanationLesson12
