import { useContext, useEffect } from "react"
import Explanations from "../../Experience/Interactions/Explanations/Explanations"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllExplanationLesson14 = ()=>{

    const {lessonStep,setIsExplanationOpen,isExplanationOpen} = useContext(MainGuidelineContext);

    useEffect(()=>{
        if([6,12,14,20,28,31,35,37,43,47,,52,53.1,65,71,73,80,83,88,95,98,102,103,104,105,106,106.3,108.111,116,123,130,
          134,136,143,150,156
        ].includes(lessonStep)){
            setIsExplanationOpen(true)
        }
    },[lessonStep])

    useEffect(()=>{
        if([74].includes(lessonStep)){
            setIsExplanationOpen(false)
        }
    },[lessonStep])    

    if(!isExplanationOpen)return
    return(
        <>

           {lessonStep==6 && <Explanations
            text={
                <>
                <strong>2-methylpropan-2-ol</strong> is the reactant needed to make the desired <strong>2-chloro-2-methylpropane</strong> product.
                </>
            }
            top="30%"
            left="50%"
            height="270px"
            />}


            {lessonStep==12 && <Explanations
            text={
                <>
                We use <strong>hydrochloric acid</strong> with <strong>2-methylpropan-2-ol</strong> to make <strong>2-chloro-2-methylpropane</strong>.
                </>
            }
            top="30%"
            left="50%"
            height="270px"
            />}

       
           {lessonStep==14 && <Explanations
            text={
                <>
                The <strong>Conical Flask</strong> now contains a mixture of
                <strong> 10 cm³</strong> of <strong>2-methylpropan-2-ol</strong> and <strong>35 cm³</strong> of <strong>concentrated
                hydrochloric acid.</strong>
                </>
            }
            top="20%"
            left="50%"
            height="270px"
            width="380px"
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
            height="320px"
            width="400px"
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
            left="30%"
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
            height="310px"
            width="470px"

            />}

           {lessonStep==37 && <Explanations
            text={
                <>
            Now let’s pour the mixture into the <strong>separating funnel</strong> so we can separate the <strong>organic</strong> and <strong>aqueous</strong> layers.                </>
            }
            top="40%"
            left="30%"
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

           {[52,71].includes(lessonStep) && <Explanations
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
           {lessonStep==65 && <Explanations
            text={
              <>
                Now we will <strong>wash the organic product again</strong> to remove any remaining acid and make it purer.
              </>
            }
            top="40%"
            left="50%"
            height="225px"
            width="380px"
            />}   

           {lessonStep==73 && <Explanations
            text={
              <>
                Observe the <strong>CO₂ bubbles</strong> rising with less intensity than during the first wash.The bubbles are less intense because most of the <strong>hydrochloric acid
                    </strong> was removed during the first wash, so less <strong>carbon dioxide</strong> is produced.
              </>
            }
            top="40%"
            left="40%"
            height="325px"
            width="450px"

            />}     

           {lessonStep==80 && <Explanations
            text={
              <>
               Now Let's Discard the <strong>lower aqueous layer</strong> so only the purified <strong>organic product</strong> remains.
              </>
            }
            top="40%"
            left="40%"
            height="325px"
            width="450px"

            />} 

           {lessonStep==83 && <Explanations
            text={
              <>
               Now transfer the <strong>organic product</strong> into a small conical flask so it can be <strong>dried</strong>.
              </>
            }
            top="40%"
            left="40%"
            height="325px"
            width="450px"

            />} 

           {lessonStep==88 && <Explanations
            text={
              <>
               <strong>Anhydrous sodium sulfate</strong> removes any remaining <strong>water</strong> from the organic product, making it dry and clear.
              </>
            }
            top="40%"
            left="42%"
            height="230px"
            width="400px"

            />}

           {lessonStep==91 && <Explanations
            text={
              <>
            Let’s add the <strong>bung</strong> to prevent spills while swirling. Swirling helps the <strong>sodium sulfate</strong> absorb water from the organic liquid.              </>
            }
            top="40%"
            left="42%"
            height="230px"
            width="400px"

            />} 


           {lessonStep==95 && <Explanations
            text={
              <>
                The <strong>round-bottomed flask</strong> is used because it can be heated safely for <strong>distillation</strong>.
             </>
            }
            top="40%"
            left="42%"
            height="230px"
            width="400px"

            />}  

           {lessonStep==98 && <Explanations
            text={
              <>
               A <strong>heating mantle</strong> is an electric device that heats a <strong>round-bottomed flask</strong> evenly.

            </>
            }
            text02={
              <>
          In this experiment, it is used to heat the organic liquid for <strong>distillation</strong>.
            </>
            }
            top="40%"
            left="42%"
            height="230px"
            width="400px"

            />}     

           {lessonStep==102 && <Explanations
            text={
              <>
              A <strong>distillation head</strong> connects the flask to the condenser and directs the vapour into it during <strong>distillation</strong>.
              </>
            }
            top="40%"
            left="22%"
            height="230px"
            width="400px"

            />}             


           {lessonStep == 103 && (
              <Explanations
                text={
                  <>
                    The <strong>thermometer</strong> measures the temperature of the vapour during <strong>distillation</strong>, helping identify when the desired product is boiling and passing into the condenser.
                  </>
                }
                top="20%"
                left="22%"
                height="310px"
                width="400px"
              />
            )} 

            {lessonStep == 104 && (
              <Explanations
                text={
                  <>
                    The <strong>condenser</strong> cools the hot vapour during <strong>distillation</strong>, causing it to condense back into a liquid so it can be collected.
                  </>
                }
                top="40%"
                left="22%"
                height="265px"
                width="360px"
              />
            )}

            {lessonStep == 105 && (
              <Explanations
                text={
                  <>
                    The <strong>water-out tube</strong> carries warm water away from the <strong>condenser</strong>, allowing cooler water to keep circulating through it during <strong>distillation</strong>.
                  </>
                }
                top="40%"
                left="35%"
                height="270px"
                width="380px"
              />
            )}

          {lessonStep == 106 && (
            <Explanations
              text={
                <>
                  The <strong>water-in tube</strong> brings cool water into the <strong>condenser</strong>, helping remove heat from the vapour so it can condense back into a liquid.
                </>
              }
              top="40%"
              left="35%"
              height="265px"
              width="360px"
            />
          )}
          {lessonStep == 106.3 && (
              <Explanations
                text={
                  <>
                    Now we will place the <strong>conical flask</strong> at the end of the <strong>condenser</strong> so it can collect the liquid that comes out after the vapour cools down.
                  </>
                }
                top="40%"
                left="22%"
                height="250px"
                width="360px"
              />
            )}

            {lessonStep === 108 && (
              <Explanations
                text={
                  <>
                    Let’s turn on the <strong>heating mantle</strong> so the organic liquid can heat up and begin <strong>distillation</strong>.
                  </>
                }
                top="55%"
                left="8%"
                height="230px"
                width="360px"
              />
            )}

            {lessonStep === 111 && (
                <Explanations
                  text={
                    <>
                      Let’s pour a small amount of the <strong>distilled product</strong> into a <strong>test tube</strong> for testing.
                    </>
                  }
                  top="40%"
                  left="22%"
                  height="250px"
                  width="360px"
                />
              )}          


              {lessonStep === 116 && (
                <Explanations
                  text={
                    <>
                      A <strong>dropper</strong> is used to transfer a small, controlled amount of the distilled product into the <strong>test tube</strong>.
                    </>
                  }
                  top="40%"
                  left="22%"
                  height="250px"
                  width="360px"
                />
              )}

              {lessonStep === 123 && (
                <Explanations
                  text={
                    <>
                      A <strong>second test tube</strong> is used to test a small sample of the product without contaminating the main collected product.
                    </>
                  }
                  top="40%"
                  left="22%"
                  height="250px"
                  width="360px"
                />
              )}              
              {lessonStep === 130 && (
                <Explanations
                  text={
                    <>
                      <strong>Ethanol</strong> helps the organic product and the aqueous sodium hydroxide mix together so the reaction can happen.
                    </>
                  }
                  top="40%"
                  left="52%"
                  height="260px"
                  width="360px"
                />
              )}

              {lessonStep === 134 && (
                <Explanations
                  text={
                    <>
                      A <strong>graduated cylinder</strong> is used to accurately measure <strong>1 cm³ of aqueous sodium hydroxide</strong>.
                    </>
                  }
                  top="40%"
                  left="52%"
                  height="225px"
                  width="360px"
                />
              )} 

              {lessonStep === 136 && (
                <Explanations
                  text={
                    <>
                      <strong>Aqueous sodium hydroxide</strong> is used to break down the organic product and release <strong>chloride ions</strong> for testing.
                    </>
                  }
                  top="40%"
                  left="52%"
                  height="225px"
                  width="360px"
                />
              )} 

              {lessonStep === 143 && (
                <Explanations
                  text={
                    <>
                    <strong>Warm water</strong> will be used to gently heat the mixture so the reaction can release <strong>chloride ions</strong>.
                    </>
                  }
                  top="40%"
                  left="52%"
                  height="225px"
                  width="340px"
                />
              )}

              {lessonStep === 150 && (
                <Explanations
                  text={
                    <>
                    <strong>Nitric acid</strong> neutralises the sodium hydroxide so it does not affect the next test with <strong>silver nitrate</strong>.
                    </>
                  }
                  top="40%"
                  left="52%"
                  height="225px"
                  width="340px"
                />
              )} 

              {lessonStep === 156 && (
                <Explanations
                  text={
                    <>
                  <strong>Silver nitrate</strong> is used to test for <strong>chloride ions</strong>. A white <strong>silver chloride</strong> precipitate confirms chlorine is present.                    </>
                  }
                  top="40%"
                  left="52%"
                  height="270px"
                  width="340px"
                />
              )} 
        </>
    )                
}

export default AllExplanationLesson14
