import { useContext, useEffect } from "react"
import Explanations from "../../Experience/Interactions/Explanations/Explanations"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllExplanationLesson11 = ()=>{

    const {lessonStep,setIsExplanationOpen,isExplanationOpen} = useContext(MainGuidelineContext);

    useEffect(()=>{
        if([6,9,13,14].includes(lessonStep)){
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
            left="45%"
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

        </>
    )                
}
export default AllExplanationLesson11
