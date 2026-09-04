import "./FillBeakerBox.css"
import { useContext, useEffect, useState } from "react"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const FillBeakerBox = () => {
  const {
    setIsFillBeakerBoxOpen,
    setIsFillUpBeaker,
    fillBeakerHand,
    setLeftBeakerFillData,
    setRightBeakerFillData,fillBeakerModel
  } = useContext(InteractionContext)

  const {setSelectedLesson,selectedLesson,isMainGuideline,
    lessonStep,setLessonStep,setShowErrorMsgNo} = useContext(MainGuidelineContext)

  const [selectedAcidData, setSelectedAcidData] = useState({
    name: "",
    color: "",
  })

  const [selectedAmount, setSelectedAmount] = useState("")

// const acids = [
//   // { name: "Salt (NaCl)", color: "#F5F5F5",imgPath:'./water.png' },
//   { name: "Water (H2O)", color: "#0073a0",imgPath:'./water.png' },
//   { name: "Universal indicator", color: "#4ade80",imgPath:'./IndicatorSolution.png' },
//   { name: "Hydrochloric Acid (HCl)", color: "#f8fafc",imgPath:'./Hcl.png' },
//   { name: "Sodium Hydroxide (NaOH)", color: "#e0f2fe",imgPath:'./Protein.png' },
//   { name: "Starch solution", color: "#e5e7eb",imgPath:'./starch.png' },
//   { name: "Iodine solution", color: "#92400e",imgPath:'./Iodine.png' },
//   { name: "Copper Sulfate (CuSO4)", color: "#2563eb",imgPath:'./CuSo4.png' }, 
//   { name: "Protein Sample", color: "#F5F1D8",imgPath:'./Protein.png' },
//   { name: "Biuret Reagent", color: "#2F80ED",imgPath:'./Buirette.png' },
// ]

  const getAcids = ()=>{
    if(selectedLesson ===10){
      return [
        { name: "Water (H2O)", color: "#0073a0", imgPath: "./water.png" },
        { name: "Ethanol (C2H5OH)", color: "#f3f4f6", imgPath: "./Ethanol.png" },
        { name: "Hydrochloric Acid (HCl)", color: "#f8fafc", imgPath: "./Hcl.png" },
        { name: "Sodium Hydroxide (NaOH)", color: "#e0f2fe", imgPath: "./Protein.png" },
        { name: "Starch solution", color: "#e5e7eb", imgPath: "./starch.png" },
        { name: "Iodine solution", color: "#92400e", imgPath: "./Iodine.png" },
        { name: "Copper Sulfate (CuSO4)", color: "#2563eb", imgPath: "./CuSo4.png" },
        // { name: "Protein Sample", color: "#F5F1D8", imgPath: "./Protein.png" },
        { name: "Silver Nitrate (AgNO3)", color: "#f8fafc", imgPath: "./SilverNitrate.png" },
      ]
    }else{
      return [
        { name: "Water (H2O)", color: "#0073a0",imgPath:'./water.png' },
        { name: "Universal indicator", color: "#4ade80",imgPath:'./IndicatorSolution.png' },
        { name: "Hydrochloric Acid (HCl)", color: "#f8fafc",imgPath:'./Hcl.png' },
        { name: "Sodium Hydroxide (NaOH)", color: "#e0f2fe",imgPath:'./Protein.png' },
        { name: "Starch solution", color: "#e5e7eb",imgPath:'./starch.png' },
        { name: "Ethanol (C2H5OH)", color: "#f3f4f6", imgPath: "./Ethanol.png" },
        { name: "Copper Sulfate (CuSO4)", color: "#2563eb",imgPath:'./CuSo4.png' }, 
        { name: "Protein Sample", color: "#F5F1D8",imgPath:'./Protein.png' },
        { name: "Biuret Reagent", color: "#2F80ED",imgPath:'./Buirette.png' },
      ]
    }
  }

  const acids = getAcids()

  const getAmounts = () => {

    if(selectedLesson ===11 || selectedLesson===12 || selectedLesson===13){
      if (fillBeakerModel === "main-normal-beaker") {
        return [10, 25, 50, 100, 250]
      }   
    }
    if (fillBeakerModel === "main-graduated-cylinder-100") {
      return [10,30,50,80,100]
    } 
    if (fillBeakerModel === "main-graduated-cylinder" || "main-testube-04" || "main-testube-05") {
      return [5, 10, 20,  25, 30, 50]
    }
    



    return [50, 100, 200, 250]
  }

  const amounts = getAmounts()
  

  useEffect(()=>{
    if(lessonStep === 4){
      setLessonStep(5)
    }
  },[lessonStep])



  const handleConfirm = () => {
    if (!selectedAcidData.name || !selectedAmount || !fillBeakerHand) return

    const amount = Number(selectedAmount)

    const checkFill = (chemical, correctAmount) => {
      const isCorrectChemical = selectedAcidData.name === chemical
      const isCorrectAmount = amount === correctAmount

      if (!isCorrectChemical || !isCorrectAmount) {
        setShowErrorMsgNo(2)
        return false
      }

      return true
    }

    if(selectedLesson===13){
      if(lessonStep===7){
        if(!checkFill("Water (H2O)",100)) return
      }

      if(lessonStep===11){
        if(!checkFill("Water (H2O)",100)) return
      }      
    }

    if(selectedLesson===10){
      if(lessonStep===20.5 || lessonStep===28 || lessonStep===35){
        if(!checkFill("Ethanol (C2H5OH)",5)) return
      }

      if(lessonStep===91 || lessonStep===98 || lessonStep===94){
        if(!checkFill('Silver Nitrate (AgNO3)',5)) return
      }

      
    }

    const fillData = {
      name: selectedAcidData.name,
      color: selectedAcidData.color,
      amount,
    }

    if (fillBeakerHand === "left") {
      setLeftBeakerFillData(fillData)
    } else if (fillBeakerHand === "right") {
      setRightBeakerFillData(fillData)
    }

    setIsFillBeakerBoxOpen(false)
    setIsFillUpBeaker(true)
  }


  useEffect(()=>{
    if(lessonStep===6 && selectedLesson ===13){
      setLessonStep(7)
    }
  },[lessonStep,selectedLesson]) 

   useEffect(()=>{
    if(selectedLesson ===13 && lessonStep ===9){
      setLessonStep(10)
    }
  },[selectedLesson,lessonStep])
 

  useEffect(()=>{
    if(selectedLesson ===9 && lessonStep ===17){
      setLessonStep(18)
    }
  },[selectedLesson,lessonStep])

  useEffect(()=>{
    if(selectedLesson ===8 && lessonStep ===19){
      setLessonStep(20)
    }
  },[selectedLesson,lessonStep])


   useEffect(()=>{
    if(selectedLesson==2 && lessonStep ===7 ){
      setLessonStep(8)
    }
  },[selectedLesson,lessonStep])


  useEffect(()=>{
    if(selectedLesson==6 && lessonStep ===7 ){
      setLessonStep(8)
    }
  },[selectedLesson,lessonStep])
  
  useEffect(()=>{
    if(selectedLesson==4 && lessonStep ===7 ){
      setLessonStep(8)
    }
  },[selectedLesson,lessonStep])  

  useEffect(()=>{
    if(selectedLesson==5 && lessonStep ===7 ){
      setLessonStep(8)
    }
  },[selectedLesson,lessonStep])  

  useEffect(()=>{
    if(selectedLesson==7 && lessonStep ===7 ){
      setLessonStep(8)
    }
  },[selectedLesson,lessonStep])

  useEffect(()=>{
    if(lessonStep===11 && selectedLesson ===7){
      setLessonStep(12)
    }
  },[lessonStep,selectedLesson])


  useEffect(()=>{
    if(lessonStep===20 && selectedLesson ===10){
      setLessonStep(20.5)
    }
  },[lessonStep,selectedLesson])  

  useEffect(()=>{
    if(lessonStep===27 && selectedLesson ===10){
      setLessonStep(28)
    }
  },[lessonStep,selectedLesson])

  useEffect(()=>{
    if(lessonStep===34 && selectedLesson ===10){
      setLessonStep(35)
    }
  },[lessonStep,selectedLesson]) 
  

  useEffect(()=>{
    if(lessonStep===90 && selectedLesson ===10){
      setLessonStep(91)
    }
  },[lessonStep,selectedLesson])   

  useEffect(()=>{
    if(lessonStep===93 && selectedLesson ===10){
      setLessonStep(94)
    }
  },[lessonStep,selectedLesson])   


  useEffect(()=>{
    if(lessonStep===97 && selectedLesson ===10){
      setLessonStep(98)
    }
  },[lessonStep,selectedLesson])  
  
  
  useEffect(()=>{
    if(lessonStep===3 && selectedLesson ===11){
      setLessonStep(4)
    }
  },[lessonStep,selectedLesson])  
  
  
  // useEffect(()=>{
  //   if(lessonStep===18 && selectedLesson ===11){
  //     setLessonStep(19)
  //   }
  // },[lessonStep,selectedLesson])   

  
  useEffect(()=>{
    if(lessonStep===31 && selectedLesson ===11){
      setLessonStep(32)
    }
  },[lessonStep,selectedLesson])   

  useEffect(()=>{
    if(lessonStep===55 && selectedLesson ===11.1){
      setLessonStep(56)
    }
  },[lessonStep,selectedLesson]) 
  
  useEffect(()=>{
    if(lessonStep===64 && selectedLesson ===11.1){
      setLessonStep(65)
    }
  },[lessonStep,selectedLesson])  

  useEffect(()=>{
    if(lessonStep===16 && selectedLesson ===12){
      setLessonStep(17)
    }
  },[lessonStep,selectedLesson]) 

  useEffect(()=>{
    if(lessonStep===30 && selectedLesson ===12.1){
      setLessonStep(31)
    }
  },[lessonStep,selectedLesson])
  
  useEffect(()=>{
    if(lessonStep===36 && selectedLesson ===12.1){
      setLessonStep(37)
    }
  },[lessonStep,selectedLesson])    

  useEffect(()=>{
    if(lessonStep===64 && selectedLesson ===12.2){
      setLessonStep(65)
    }
  },[lessonStep,selectedLesson]) 
  return (
    <div className="fill-dialog-overlay">
      <div className="fill-dialog">
        {/* <h2>Fill Beaker</h2> */}
        
        <div className="fill-dialog-content">
          <div className="fill-title-container">
            <h3>Select Chemical</h3>
            <div className="fill-divider"></div>
          </div>

          <div className="fill-dialog-section">

            {acids.map((acid) => (
              <button
                key={acid.name}
                className={`option-btn ${
                  selectedAcidData.name === acid.name ? "selected" : ""
                }`}
                onClick={() => setSelectedAcidData(acid)}
              >
                <img src={acid.imgPath}/>
                {acid.name}
              </button>
            ))}
          </div>

          <div className="fill-amount-container">
            <div className="fill-amount-title-container">
              <h3>Select Amount</h3>
            </div>
            <div className="amount-btn-container">
               {amounts.map((amount) => (
              <button
                key={amount}
                className={`option-btn amount-btn ${
                  selectedAmount === amount ? "selected" : ""
                }`}
                onClick={() => setSelectedAmount(amount)}
              >
                {amount} cm³
              </button>
            ))}    
            </div>
          </div>
           <button
            className="confirm-btn"
            disabled={!selectedAcidData.name || !selectedAmount || !fillBeakerHand}
            onClick={handleConfirm}
          >
          Confirm
        </button>
        </div>
      </div>
    </div>
  )
}

export default FillBeakerBox