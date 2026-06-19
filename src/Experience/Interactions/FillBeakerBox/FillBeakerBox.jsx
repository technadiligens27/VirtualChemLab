import { Html } from "@react-three/drei";
import "./FillBeakerBox.css";
import { useContext, useState } from "react";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";

const FillBeakerBox = () => {

  const {setIsFillBeakerBoxOpen,isFillUpBeaker,setIsFillUpBeaker,setPourAmount} = useContext(InteractionContext);

  const [selectedAcid, setSelectedAcid] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");

  const acids = [
    "Hydrochloric Acid (HCl)",
    "Sulfuric Acid (H₂SO₄)",
    "Nitric Acid (HNO₃)",
    "Acetic Acid (CH₃COOH)",
  ];

  const amounts = [10, 25 , 50 , 100];

  const handleConfirm = () => {
    if (!selectedAcid || !selectedAmount) return;

    onConfirm?.({
      acid: selectedAcid,
      amount: selectedAmount,
    });

    onClose?.();
  };

  return (
    <div className="fill-dialog-overlay">
      <div className="fill-dialog">
        <h2>Fill Beaker</h2>

        <div className="fill-dialog-content">
          <div className="fill-dialog-section">
            <h3>Select Acid</h3>

            {acids.map((acid) => (
              <button
                key={acid}
                className={`option-btn ${
                  selectedAcid === acid ? "selected" : ""
                }`}
                onClick={() => setSelectedAcid(acid)}
              >
                {acid}
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
                onClick={() => {setSelectedAmount(amount);setPourAmount(amount);}}   
              >
                {`${amount} ml`}
              </button>
            ))}
          </div>
        </div>

        <div className="selection-info">
          <p>
            <strong>Acid:</strong>{" "}
            {selectedAcid || "Not Selected"}
          </p>

          <p>
            <strong>Amount:</strong>{" "}
            {selectedAmount || "Not Selected"}
          </p>
        </div>

        <button
            className="confirm-btn"
            disabled={!selectedAcid || !selectedAmount}
            onClick={() => {
                setIsFillBeakerBoxOpen(false)
                setIsFillUpBeaker(true)
            }}
            >
            Confirm
        
        </button>
      </div>
    </div>

  );
};

export default FillBeakerBox;