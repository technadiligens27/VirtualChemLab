import { useContext, useEffect } from "react"
import Explanations from "../../Experience/Interactions/Explanations/Explanations"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllExplanationLesson12 = ()=>{

    const {lessonStep,setIsExplanationOpen,isExplanationOpen} = useContext(MainGuidelineContext);

    useEffect(()=>{
        if([4,6,9,13,18,23,32].includes(lessonStep)){
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



        </>
    )                
}

export default AllExplanationLesson12
