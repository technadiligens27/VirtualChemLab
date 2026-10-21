import { useContext, useEffect } from "react"
import Explanations from "../../Experience/Interactions/Explanations/Explanations"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllExplanationLesson15 = ()=>{

    const {lessonStep,setIsExplanationOpen,isExplanationOpen} = useContext(MainGuidelineContext);

    useEffect(()=>{
        if([7,10,13,15,17,20,28,33].includes(lessonStep)){
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

           {lessonStep==7 && <Explanations
            text={
                <>
                    We will use the <strong>beaker</strong> to hold the <strong>Hydrochloric Acid</strong>
                </>
            }
            top="30%"
            left="46%"
            height="190px"
            width="330px"
            />}

           {lessonStep==7 && <Explanations
            text={
                <>
                    We will use the <strong>beaker</strong> to hold the <strong>Hydrochloric Acid</strong>
                </>
            }
            top="30%"
            left="46%"
            height="190px"
            width="330px"
            />}

           {lessonStep==10 && <Explanations
            text={
                <>
                    We will now <strong>pour water to beaker </strong> to <strong>dilute the Hydrochloric Acid</strong>
                </>
            }
            top="30%"
            left="30%"
            height="190px"
            width="330px"
            />}


           {lessonStep==13 && <Explanations
            text={
                <>
                We will now <strong>gently swirl the beaker</strong> to mix the water and <strong>hydrochloric acid</strong>, forming a <strong>dilute solution</strong>.                </>
            }
            top="30%"
            left="45%"
            height="220px"
            width="360px"
            />}


           {lessonStep==15 && <Explanations
            text={
                <>
                We use <strong>nichrome wire</strong> because it withstands <strong>high temperatures</strong> without affecting the <strong>flame colour</strong>.
                </>
                }
            top="30%"
            left="25%"
            height="270px"
            width="420px"
            />}

           {lessonStep==17 && <Explanations
            text={
                <>
            We dip the <strong>nichrome wire</strong> into <strong>hydrochloric acid</strong> to remove impurities and ensure an <strong>accurate flame colour</strong>. 
                </>
                }
            top="30%"
            left="15%"
            height="220px"
            width="420px"
            />}


           {lessonStep==20 && <Explanations
            text={
                <>
            We heat the <strong>nichrome wire</strong> to remove any remaining <strong>impurities</strong> before testing the metal salt.
                </>
                }
            top="55%"
            left="15%"
            height="220px"
            width="420px"
            />}

           {lessonStep==28 && <Explanations
            text={
                <>
                We will use different <strong>metal salts</strong> to observe their <strong>characteristic flame colours</strong> and identify the metal ions present.
                </>
                }
            top="40%"
            left="40%"
            height="220px"
            width="420px"
            />}


           {lessonStep==33 && <Explanations
            text={
                <>
                <strong>Observe the flame color change</strong>
                </>
                }
            top="40%"
            left="55%"
            height="140px"
            width="330px"
            />}

        </>
    )                
}

export default AllExplanationLesson15
