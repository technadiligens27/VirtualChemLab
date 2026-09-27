import { useContext, useEffect } from "react"
import Explanations from "../../Experience/Interactions/Explanations/Explanations"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllExplanationLesson14 = ()=>{

    const {lessonStep,setIsExplanationOpen,isExplanationOpen} = useContext(MainGuidelineContext);

    useEffect(()=>{
        if([14,20,28,31,35,37,43,47,53.1,71].includes(lessonStep)){
            setIsExplanationOpen(true)
        }
    },[lessonStep])

    if(!isExplanationOpen)return

    return(
        <>
       
           {lessonStep==14 && <Explanations
            text={
                <>
                The <strong>Conical Flask</strong> now contains a mixture of
                <strong> 10 cm³</strong> of <strong>2-methylpropan-2-ol</strong> and <strong>35 cm³</strong> of <strong>concentrated
                hydrochloric acid.</strong>
                </>
            }
            top="30%"
            left="50%"
            height="230px"
            />}

           {lessonStep==20 && <Explanations
            text={
                <>
                The <strong>Bung</strong> is removed to safely release the
                <strong> Built-Up Pressure</strong> inside the <strong>Conical Flask</strong>,
                preventing the pressure from becoming too high as the <strong>Reaction Continues.</strong>
                </>
            }
            top="30%"
            left="30%"
            height="260px"
            />}

           {lessonStep==28 && <Explanations
            text={
                <>
                <strong>Anhydrous calcium chloride</strong> removes unreacted alcohol into the <strong>lower aqueous layer</strong>, 
                purifying the <strong>organic product</strong>.
                </>
            }
            top="40%"
            left="40%"
            height="270px"
            width="380px"
            />}

           {lessonStep==31 && <Explanations
            text={
                <>
                Now we will <strong>Replace The Bung</strong> so the <strong>Conical Flask</strong> can be safely swirled without spilling its contents.
                </>
            }
            top="40%"
            left="40%"
            height="230px"
            />}
           {lessonStep==35 && <Explanations
            text={
                <>
                A <strong>separating funnel</strong> is used to separate the two immiscible liquid layers.
                The <strong>lower aqueous layer</strong> can be drained away through the tap, while the <strong>upper organic product layer</strong> remains inside for purification.                </>
            }
            top="40%"
            left="40%"
            height="320px"
            width="470px"

            />}

           {lessonStep==37 && <Explanations
            text={
                <>
            Now let’s pour the mixture into the <strong>separating funnel</strong> so we can separate the <strong>organic</strong> and <strong>aqueous</strong> layers.                </>
            }
            top="40%"
            left="40%"
            height="230px"
            width="380px"
            />}

           {lessonStep==43 && <Explanations
            text={
                <>
            We will use a Beaker to act as the <strong>Waste Beaker</strong> to collect the unwanted <strong>aqueous layer</strong>, keeping it separate from the desired <strong>organic product</strong>.                </>
            }
            top="40%"
            left="20%"
            height="275px"
            width="380px"

            />} 


           {lessonStep==47 && <Explanations
            text={
              <>
              <strong>Sodium hydrogencarbonate solution</strong> neutralises any remaining <strong>hydrochloric acid</strong> in the organic product. This washes away acidic impurities and produces <strong>carbon dioxide gas</strong>.                </>
            }
            top="40%"
            left="50%"
            height="315px"
            width="380px"

            />}  

           {[71,52].includes(lessonStep) && <Explanations
            text={
              <>
            Now let’s replace the <strong>bung</strong> and swirl the <strong>separating funnel</strong> so the sodium hydrogencarbonate can neutralise any remaining acid.
              </>
            }
            top="40%"
            left="50%"
            height="280px"
            width="380px"

            />}     

           {lessonStep==53.1 && <Explanations
            text={
              <>
<               strong>Carbon dioxide gas</strong> forms because the <strong>sodium hydrogencarbonate</strong> reacts with remaining <strong>hydrochloric acid</strong> in the separating funnel.
              </>
            }
            top="40%"
            left="50%"
            height="280px"
            width="380px"

            />}             


        </>
    )                
}

export default AllExplanationLesson14
