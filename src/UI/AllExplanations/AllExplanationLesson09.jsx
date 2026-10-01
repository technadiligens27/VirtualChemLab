import { useContext, useEffect } from "react"
import Explanations from "../../Experience/Interactions/Explanations/Explanations"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllExplanationLesson09 = ()=>{

    const {lessonStep,setIsExplanationOpen,isExplanationOpen} = useContext(MainGuidelineContext);

    useEffect(()=>{
        if([4,9,13,14,17,19,25].includes(lessonStep)){
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
               We use the <strong>polystyrene cup</strong> to reduce heat gain from the surroundings, so the <strong>temperature decrease</strong> in this endothermic reaction is measured more accurately.
                </>
            }
            top="30%"
            left="45%"
            height="310px"
            width="400px"
            />}

           {lessonStep==9 && <Explanations
            text={
                <>
           <strong>Potassium hydrogencarbonate</strong> will be used to react with <strong>hydrochloric acid</strong> and measure its <strong>temperature change</strong>. 
                          </>
            }
            top="30%"
            left="45%"
            height="230px"
            width="400px"
            />} 

           {lessonStep==13 && <Explanations
            text={
                <>
             Weigh the <strong>test tube</strong> with the <strong>Potassium hydrogencarbonate</strong> 
                </>
            }
            top="60%"
            left="65%"
            height="190px"
            width="380px"
            />}

           {lessonStep==14 && <Explanations
            text={
                <>
                The <strong>test tube</strong> and <strong>potassium hydrogencarbonate</strong> together weigh <strong>25.67 g</strong> 
                </>
            }
            top="60%"
            left="65%"
            height="220px"
            width="400px"
            />}

           {lessonStep==17 && <Explanations
            text={
                <>
               We will use the <strong>burette</strong> to add <strong>30 cm3 of hydrochloric acid</strong> accurately into the polystyrene cup
                </>
            }
            top="30%"
            left="27%"
            height="225px"
            width="380px"
            />}

           {lessonStep==19 && <Explanations
            text={
                <>
            <strong>Hydrochloric acid</strong> will be used to react with <strong>potassium hydrogencarbonate</strong> and produce a <strong>temperature change</strong>
                </>
            }
            top="30%"
            left="27%"
            height="225px"
            width="380px"
            />}

          {lessonStep==25 && <Explanations
            text={
                <>
                The <strong>polystyrene cup</strong> now contains <strong>30 cm³ of hydrochloric acid</strong>.
                </>
            }

            top="58%"
            left="60%"
            height="205px"
            width="420px"
            />}            

        </>
    )                
}

export default AllExplanationLesson09
