import { useContext, useEffect } from "react"
import Explanations from "../../Experience/Interactions/Explanations/Explanations"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllExplanationLesson08 = ()=>{

    const {lessonStep,setIsExplanationOpen,isExplanationOpen} = useContext(MainGuidelineContext);

    useEffect(()=>{
        if([6,11,15,17,19,21,29,31,35,36,40,41].includes(lessonStep)){
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
                    We will use the <strong>polystyrene cup</strong> to reduce heat loss during the experiment, so we can measure the <strong>temperature change</strong> more accurately.
                </>
            }
            top="30%"
            left="45%"
            height="270px"
            width="380px"
            />}

           {lessonStep==11 && <Explanations
            text={
                <>
             <strong>Potassium Carbonate</strong> will be used to react with <strong>hydrochloric acid</strong> and measure the <strong>temperature change</strong>. 
                </>
            }
            top="30%"
            left="45%"
            height="225px"
            width="380px"
            />}

           {lessonStep==15 && <Explanations
            text={
                <>
             Weigh the <strong>test tube</strong> with the <strong>potassium carbonate</strong> 
                </>
            }
            top="60%"
            left="65%"
            height="190px"
            width="380px"
            />}

           {lessonStep==17 && <Explanations
            text={
                <>
                The <strong>test tube</strong> and <strong>potassium carbonate</strong> together weigh <strong>24.70 g</strong> 
                </>
            }
            top="60%"
            left="65%"
            height="190px"
            width="380px"
            />}

           {lessonStep==19 && <Explanations
            text={
                <>
               We will use the <strong>burette</strong> to add a 30 cm3 of <strong>hydrochloric acid</strong> accurately into the polystyrene cup
                </>
            }
            top="30%"
            left="27%"
            height="225px"
            width="380px"
            />}

           {lessonStep==21 && <Explanations
            text={
                <>
            <strong>Hydrochloric acid</strong> will be used to react with <strong>potassium carbonate</strong> and produce a <strong>temperature change</strong>
                </>
            }
            top="30%"
            left="27%"
            height="225px"
            width="380px"
            />}
   
          {lessonStep==28 && <Explanations
            text={
                <>
                The <strong>polystyrene cup</strong> now contains <strong>30 cm³ of hydrochloric acid</strong>.
                </>
            }

            top="38%"
            left="58%"
            height="265px"
            width="420px"
            />} 


           {lessonStep==29 && <Explanations
            text={
                <>
                Covering the <strong>Polystyrene cup</strong> will reduce heat loss and make the <strong>temperature change</strong> more accurate
                </>
            }
            top="30%"
            left="37%"
            height="225px"
            width="380px"
            />}   
           {lessonStep==31 && <Explanations
            text={
                <>
                <strong>Thermometer</strong> will be used in the <strong>Polystyrene cup</strong> to measure the starting temperature of the <strong>Hydrochloric acid</strong>
                </>
            }

            text02={
                <>
                The current room temperature, as indicated by the <strong>thermometer</strong>, is <strong>22°C</strong>.
                </>
            }
            top="28%"
            left="48%"
            height="235px"
            width="420px"
            />}  

           {lessonStep==35 && <Explanations
            text={
                <>
            Let’s gradually pour the <strong>potassium carbonate</strong> in the test tube into the <strong>hydrochloric acid</strong> while continuously stirring the mixture.                </>
            }
            top="8%"
            left="8%"
            height="255px"
            width="420px"
            />} 
           {lessonStep==36 && <Explanations
            text={
                <>
                Small <strong>carbon dioxide bubbles</strong> form, a quiet fizzing sound plays, and the <strong>thermometer reading</strong> gradually rises.    
                </>
            }
            top="28%"
            left="48%"
            height="235px"
            width="420px"
            />} 
          {lessonStep==40 && <Explanations
            text={
                <>
                After pouring the <strong>potassium carbonate</strong>, the <strong>test tube</strong> now weighs <strong>21.70 g</strong>. 
                This means the amount of <strong>potassium carbonate</strong> used is <strong>2.90 g</strong>.
                </>
            }

            top="38%"
            left="58%"
            height="265px"
            width="420px"
            />} 
          {lessonStep==41 && <Explanations
            text={
                <>
                The temperature has risen to <strong>42°C</strong>, which is an increase of <strong>20°C</strong>.
                </>
            }

            top="38%"
            left="48%"
            height="200px"
            width="420px"
            />} 
        </>
    )                
}

export default AllExplanationLesson08
