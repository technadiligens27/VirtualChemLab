import { useContext, useEffect } from "react"
import Explanations from "../../Experience/Interactions/Explanations/Explanations"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllExplanationLesson11 = ()=>{

    const {lessonStep,setIsExplanationOpen,isExplanationOpen} = useContext(MainGuidelineContext);

    useEffect(()=>{
        if([6,9,13,14,23,24,31,33,44,46,53,57,66,70].includes(lessonStep)){
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

           {lessonStep==6 && <Explanations
            text={
                <>
                <strong>Hydrochloric acid</strong> is used because it reacts with the <strong>standardised sodium hydroxide</strong>, allowing us to calculate the concentration of the acid.
                </>
            }
            top="30%"
            left="43%"
            height="270px"
            width="380px"
            />}
           {lessonStep==9 && <Explanations
            text={
                <>
                We use the <strong>volumetric pipette</strong> to measure and transfer exactly <strong>25.0 cm³ of hydrochloric acid</strong> accurately.
                </>
            }
            top="25%"
            left="22%"
            height="240px"
            width="380px"
            />}

           {lessonStep==13 && <Explanations
            text={
                <>
              A <strong>volumetric flask</strong> is used to prepare a solution to one exact, known volume accurately.
                </>
            }
            top="25%"
            left="52%"
            height="240px"
            width="380px"
            />} 


           {lessonStep==14 && <Explanations
            text={
                <>
                Now let’s transfer the <strong>hydrochloric acid</strong> from the <strong>volumetric pipette</strong> into the <strong>volumetric flask</strong>.                </>
            }
            top="25%"
            left="52%"
            height="240px"
            width="380px"
            />} 

           {lessonStep==23 && <Explanations
            text={
                <>
                The <strong>volumetric flask</strong> now contains <strong>diluted colourless hydrochloric acid</strong>
                </>
            }
            top="25%"
            left="52%"
            height="190px"
            width="380px"
            />}

           {lessonStep==24 && <Explanations
            text={
                <>                
                We will swirl the <strong>volumetric flask</strong> to mix the hydrochloric acid and distilled water evenly.                </>
            }
            top="25%"
            left="52%"
            height="240px"
            width="380px"
            />}

           {lessonStep==31 && <Explanations
            text={
                <>                
                We use the <strong>burette</strong> to add the <strong>sodium hydroxide solution</strong> accurately
                </>
            }
            top="25%"
            left="25%"
            height="190px"
            width="380px"
            />}

           {lessonStep==33 && <Explanations
            text={
                <>                
                <strong>Sodium hydroxide</strong> will be used to react with the <strong>hydrochloric acid</strong> so its concentration can be calculated.
                </>
            }
            top="25%"
            left="25%"
            height="225px"
            width="380px"
            />}

           {lessonStep==44 && <Explanations
            text={
                <>                
                The <strong>conical flask</strong> now contains <strong>25.0 cm³ of diluted hydrochloric acid</strong>.
                </>
            }
            top="25%"
            left="50%"
            height="180px"
            width="380px"
            />}


           {lessonStep==46 && <Explanations
            text={
                <>                
               <strong>Phenolphthalein</strong> will be used to show when the hydrochloric acid has been neutralised by the sodium hydroxide during the titration.
                </>
            }
            top="25%"
            left="30%"
            height="270px"
            width="380px"
            />}

           {lessonStep==52 && <Explanations
            text={
                <>                
               Open the <strong>burette tap</strong> to add sodium hydroxide while gently swirling the <strong>conical flask</strong>.
                </>
            }
            top="25%"
            left="30%"
            height="270px"
            width="380px"
            />}


           {lessonStep==53 && <Explanations
            text={
                <>                
               Your recorded <strong>titre</strong> is <strong>24.80 cm³</strong>.
                </>
            }
            top="25%"
            left="25%"
            height="150px"
            width="380px"
            />}

           {lessonStep==57 && <Explanations
            text={
                <>                
                    We use a fresh <strong>30.0 cm³ sample of diluted hydrochloric acid</strong> for the second titration
                </>
            }
            top="25%"
            left="60%"
            height="220px"
            width="380px"
            />}

           {lessonStep==66 && <Explanations
            text={
                <>                
                Now let’s begin setting up for the <strong>second titration</strong> by clamping the <strong>burette</strong> to the stand.
                </>
            }
            top="25%"
            left="25%"
            height="220px"
            width="380px"
            />}

           {lessonStep==70 && <Explanations
            text={
                <>                
                Your second recorded <strong>titre</strong> is <strong>24.70 cm³</strong>
                </>
            }
            top="25%"
            left="25%"
            height="150px"
            width="380px"
            />}

        </>
    )                
}
export default AllExplanationLesson11
