import "./FillBeakerBox.css"
import { useContext, useState } from "react"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const FillBeakerBox = () => {
  const {
    setIsFillBeakerBoxOpen,
    setIsFillUpBeaker,
    fillBeakerHand,
    setLeftBeakerFillData,
    setRightBeakerFillData,
  } = useContext(InteractionContext)

  const [selectedAcidData, setSelectedAcidData] = useState({
    name: "",
    color: "",
  })

  const [selectedAmount, setSelectedAmount] = useState("")

  const acids = [
    { name: "Salt (NaCl)", color: "#FFFFFF" },
    { name: "Water (H2O)", color: "#87CEEB" },
    { name: "Nitric Acid (HNO₃)", color: "#FFFACD" },
    { name: "Acetic Acid (CH₃COOH)", color: "#F5F5F5" },
  ]

  const amounts = [10, 25, 50, 100]

  const handleConfirm = () => {
    if (!selectedAcidData.name || !selectedAmount || !fillBeakerHand) return

    const fillData = {
      name: selectedAcidData.name,
      color: selectedAcidData.color,
      amount: selectedAmount,
    }

    if (fillBeakerHand === "left") {
      setLeftBeakerFillData(fillData)
    } else if (fillBeakerHand === "right") {
      setRightBeakerFillData(fillData)
    }

    setIsFillBeakerBoxOpen(false)
    setIsFillUpBeaker(true)
  }

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