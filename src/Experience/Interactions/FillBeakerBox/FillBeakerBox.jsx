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
    setRightBeakerFillData,
  } = useContext(InteractionContext)

  const {setSelectedLesson,selectedLesson,lessonStep,setLessonStep,setShowErrorMsgNo} = useContext(MainGuidelineContext)

  const [selectedAcidData, setSelectedAcidData] = useState({
    name: "",
    color: "",
  })

  const [selectedAmount, setSelectedAmount] = useState("")

  const acids = [
    { name: "Salt (NaCl)", color: "#F5F5F5" },
    { name: "Water (H2O)", color: "#0073a0" },
    { name: "Universal indicator", color: "#4ade80" },
    { name: "Hydrochloric Acid (HCl)", color: "#f8fafc" },
    { name: "Sodium Hydroxide (NaOH)", color: "#e0f2fe" },
    { name: "Starch solution", color: "#e5e7eb" },
    { name: "Iodine solution", color: "#92400e" },    
    { name: "Copper Sulfate (CuSO4)", color: "#2563eb" },    

  ]

  const amounts = [10, 25, 50, 100]

  useEffect(()=>{
    if(lessonStep === 4){
      setLessonStep(5)
    }
  },[lessonStep])

  const handleConfirm = () => {
    if (!selectedAcidData.name || !selectedAmount || !fillBeakerHand) return

    const amount = Number(selectedAmount)

    const checkFill = (chemical, correctAmount, nextStep) => {
      const isCorrectChemical = selectedAcidData.name === chemical
      const isCorrectAmount = amount === correctAmount

      if (!isCorrectChemical || !isCorrectAmount) {
        setShowErrorMsgNo(2)
        return false
      }

      setLessonStep(nextStep)
      return true
    }

    if (selectedLesson === 2 && lessonStep === 5) {
      if (!checkFill("Hydrochloric Acid (HCl)", 50, 6)) return
    }

    if (selectedLesson === 2 && lessonStep === 8) {
      if (!checkFill("Sodium Hydroxide (NaOH)", 50, 9)) return
    }

    if (selectedLesson === 6 && lessonStep === 5) {
      if (!checkFill("Hydrochloric Acid (HCl)", 50, 6)) return
    }

    if (selectedLesson === 6 && lessonStep === 8) {
      if (!checkFill("Sodium Hydroxide (NaOH)", 50, 9)) return
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



  // useEffect(()=>{
  //   if(selectedLesson===2 && lessonStep ===4 ){
  //     console.log('lessonStep:',lessonStep)
  //     setLessonStep(5)
  //   }
  // },[selectedLesson,lessonStep])


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


  return (
    <div className="fill-dialog-overlay">
      <div className="fill-dialog">
        <h2>Fill Beaker</h2>

        <div className="fill-dialog-content">
          <div className="fill-dialog-section">
            <h3>Select Chemical</h3>

            {acids.map((acid) => (
              <button
                key={acid.name}
                className={`option-btn ${
                  selectedAcidData.name === acid.name ? "selected" : ""
                }`}
                onClick={() => setSelectedAcidData(acid)}
              >
                {acid.name}
              </button>
            ))}
          </div>

          <div className="fill-dialog-section">
            <h3>Select Amount</h3>

            {amounts.map((amount) => (
              <button
                key={amount}
                className={`option-btn ${
                  selectedAmount === amount ? "selected" : ""
                }`}
                onClick={() => setSelectedAmount(amount)}
              >
                {amount} ml
              </button>
            ))}
          </div>
        </div>

        <div className="selection-info">
          <p>
            <strong>Hand:</strong> {fillBeakerHand || "Not Selected"}
          </p>

          <p>
            <strong>Chemical:</strong>{" "}
            {selectedAcidData.name || "Not Selected"}
          </p>

          <p>
            <strong>Amount:</strong>{" "}
            {selectedAmount ? `${selectedAmount} ml` : "Not Selected"}
          </p>
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
  )
}

export default FillBeakerBox