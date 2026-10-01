import { useContext, useEffect } from "react"
import Explanations from "../../Experience/Interactions/Explanations/Explanations"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllExplanationLesson13 = ()=>{

    const {lessonStep,setIsExplanationOpen,isExplanationOpen} = useContext(MainGuidelineContext);

    useEffect(()=>{
        if([3.1,3.4,8,12,15,18,23,24,25,28,31].includes(lessonStep)){
            setIsExplanationOpen(true)
        }
    },[lessonStep])

    useEffect(()=>{
        if([29].includes(lessonStep)){
            setIsExplanationOpen(false)
        }
    },[lessonStep])    

    if(!isExplanationOpen)return
    return(
        <>

           {lessonStep==3.1 && <Explanations
            text={
                <>
                We will use the <strong>boiling tube</strong> to hold the <strong>ethanoic acid</strong> and <strong>calcium carbonate</strong> while they react and produce <strong>carbon dioxide gas</strong>.
                </>
            }
            top="30%"
            left="30%"
            height="270px"
            width="380px"
            />}


           {lessonStep==3.4 && <Explanations
            text={
                <>
                We will use <strong>ethanoic acid</strong> to react with <strong>calcium carbonate</strong> and produce <strong>carbon dioxide gas</strong>.
                </>
            }
            top="30%"
            left="50%"
            height="225px"
            width="380px"
            />}

           {lessonStep==8 && <Explanations
            text={
                <>
                    Later, we will use this <strong>water</strong> to collect and measure the <strong>carbon dioxide gas</strong>.
               </>
            }
            top="30%"
            left="50%"
            height="200px"
            width="380px"
            />}            


           {lessonStep==12 && <Explanations
            text={
                <>
            We invert the <strong>measuring cylinder</strong> in the <strong>water bath</strong> so the water stays inside while the <strong>carbon dioxide gas</strong> collects at the top.               </>
            }
            top="30%"
            left="55%"
            height="260px"
            width="380px"
            />}

           {lessonStep==15 && <Explanations
            text={
                <>
            We use the <strong>delivery tube</strong> to carry the <strong>carbon dioxide gas</strong> from the boiling tube into the measuring cylinder.                </>
            }
            top="20%"
            left="57%"
            height="220px"
            width="380px"
            />}

           {lessonStep==18 && <Explanations
            text={
                <>
                We use <strong>calcium carbonate</strong> because it reacts with <strong>ethanoic acid</strong> to produce <strong>carbon dioxide gas</strong>.
                </>
            }
            top="25%"
            left="47%"
            height="230px"
            width="380px"
            />}

           {lessonStep==23 && <Explanations
            text={
                <>
                The <strong>digital balance</strong> will be used to measure the mass of <strong>calcium carbonate</strong> used in the reaction.
                    </>
            }
            top="45%"
            left="60%"
            height="230px"
            width="380px"
            />}

           {lessonStep==24 && <Explanations
            text={
                <>
                The <strong>test tube</strong> with <strong>Calcium Carbonate</strong>  weighs <strong>21.77 g</strong>.
                </>
            }
            top="45%"
            left="60%"
            height="180px"
            width="380px"
            />}


           {lessonStep==25 && <Explanations
            text={
                <>
                Let’s disconnect the <strong>delivery tube</strong> for a moment so we can pour the <strong>calcium carbonate</strong> into the <strong>boiling tube</strong>.  
              </>
            }
            top="45%"
            left="60%"
            height="220px"
            width="380px"
            />}

           {[28,29].includes(lessonStep) && <Explanations
            text={
                <>
                The <strong>calcium carbonate</strong> reacts with <strong>ethanoic acid</strong> in the boiling tube, producing <strong>carbon dioxide bubbles</strong>. The gas travels through the <strong>delivery tube</strong> and enters the inverted measuring cylinder. It pushes the <strong>water</strong> down, so the volume of carbon dioxide collected can be measured.
              </>
            }
             top="25%"
            left="60%"
            height="360px"
            width="480px"
            />}

           {lessonStep==31 && <Explanations
            text={
                <>
                The <strong>test tube</strong>  weighs <strong>21.72 g</strong>.
                </>
            }

            text02={
                <>
                The amount of <strong>calcium carbonate</strong> used is <strong>0.05 g</strong>
                </>
            }
            top="45%"
            left="60%"
            height="165px"
            width="380px"
            />}
        </>
    )                
}

export default AllExplanationLesson13

