import {
  useContext,
  useEffect,
  useState,
} from "react"

import "./PowderBox.css"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext"

const metalSalts = [
  {
    id: "lithium-chloride",
    name: "Lithium Chloride",
    formula: "LiCl",
    powderColor: "#F4F4F4",
  },
  {
    id: "sodium-chloride",
    name: "Sodium Chloride",
    formula: "NaCl",
    powderColor: "#F8F8F8",
  },
  {
    id: "potassium-chloride",
    name: "Potassium Chloride",
    formula: "KCl",
    powderColor: "#F6F6F6",
  },
  {
    id: "calcium-chloride",
    name: "Calcium Chloride",
    formula: "CaCl₂",
    powderColor: "#F7F7F7",
  },
  {
    id: "barium-chloride",
    name: "Barium Chloride",
    formula: "BaCl₂",
    powderColor: "#F5F5F5",
  },
  {
    id: "copper-chloride",
    name: "Copper(II) Chloride",
    formula: "CuCl₂",
    powderColor: "#79A894",
  },
]

const PowderBox = ({
  onConfirm,
  onClose,
  title = "Select Metal Salt",
}) => {
  const [selectedSalt,setSelectedSalt] = useState(null)
  const {selectedPowder,setSelectedPowder,setShowPowderInContainer,setShowPowderBox} = useContext(InteractionContext)   
  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)


  const handleConfirm = () => {
    if (!selectedSalt) {
      return
    }

    setSelectedPowder(selectedSalt)
    setShowPowderInContainer(true)
    setShowPowderBox(false)

    if(selectedLesson==15.2 && lessonStep==27){
      setLessonStep(28)
    }
  }


  useEffect(()=>{
    if(selectedLesson==15.2 && lessonStep==26){
      setLessonStep(27)
    }
  },[])

  return (
    <div className="powder-box-overlay">
      <div className="powder-box">
        <div className="powder-box-content">
          <div className="powder-box-title-container">
            <h3>{title}</h3>

            <button
              type="button"
              className="powder-box-close-button"
              onClick={onClose}
              aria-label="Close metal salt selection"
            >
              ×
            </button>
          </div>

          <p className="powder-box-description">
            Choose the metal salt to test using
            the flame test.
          </p>

          <div className="powder-box-options">
            {metalSalts.map((salt) => (
              <button
                key={salt.id}
                type="button"
                className={`powder-option-btn ${
                  selectedSalt?.id === salt.id
                    ? "selected"
                    : ""
                }`}
                onClick={() => {
                  setSelectedSalt(salt)
                }}
              >
                <span
                  className="powder-option-sample"
                  style={{
                    backgroundColor:
                      salt.powderColor,
                  }}
                />

                <span className="powder-option-text">
                  <strong>{salt.name}</strong>

                  <small>{salt.formula}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="powder-box-selection">
            {selectedSalt ? (
              <>
                Selected salt:{" "}
                <strong>
                  {selectedSalt.name}
                </strong>
              </>
            ) : (
              "Select a metal salt to continue."
            )}
          </div>

          <button
            type="button"
            className="powder-confirm-btn"
            disabled={!selectedSalt}
            onClick={handleConfirm}
          >
            Confirm Salt
          </button>
        </div>
      </div>
    </div>
  )
}

export default PowderBox