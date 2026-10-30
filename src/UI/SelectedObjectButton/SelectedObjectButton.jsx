import { useContext } from "react"
import "./SelectedObjectButton.css"
import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext"

const SelectedObjectButton = ({
  name = "Selected Object",

  onClick,
}) => {


 const {selectedObjectName,setSelectedObjectName} = useContext(InteractionContext);

 const showName = (
  selectedObjectName
) => {
  const modelNames = {
    "nichrome-wire":
    "Nichrome Wire"
    ,
    "main-chair":
      "Chair",

    Goggles:
      "Safety Goggles",

    "main-glove-left":
      "Left Glove",

    "main-glove-right":
      "Right Glove",

    "main-normal-beaker":
      "Glass Beaker",

    "main-Conical-Flask":
      "Conical Flask",

    "main-Conical-Flask-02":
      "Conical Flask",

    "main-Round-bottom-flask":
      "Round-bottom Flask",

    "main-graduated-cylinder":
      "50 cm³ Measuring Cylinder",

    "main-graduated-cylinder-100":
      "100 cm³ Measuring Cylinder",

    "main-spoon":
      "Spatula",

    "main-salt":
      "Salt",

    "main-red-litmus":
      "Red Litmus Paper",

    "main-blue-litmus":
      "Blue Litmus Paper",

    "main-testube-01":
      "Test Tube",

    "main-testube-02":
      "Test Tube",

    "main-testube-03":
      "Test Tube",

    "main-testube-04":
      "Test Tube",

    "main-testube-05":
      "Test Tube",

    "main-testube-06":
      "Test Tube",

    "testube-cap":
      "Test Tube Cap",

    "testube-cap-03":
      "Test Tube Cap",

    "main-filter-paper":
      "Filter Paper",

    "main-folded-paper":
      "Folded Filter Paper",

    "main-funnel":
      "Funnel",

    "main-dropper":
      "Dropper",

    mainPolystyrene:
      "Polystyrene Cup",

    mainPolysterene2:
      "Polystyrene Cup",

    "polysterene-cup-lid":
      "Polystyrene Cup Lid",

    "pottasium-carbonate-container":
      "Potassium Carbonate Container",

    "potassium-hydrogencarbonate":
      "Potassium Hydrogencarbonate",

    mainMassBalance:
      "Mass Balance",

    "main-buirette":
      "Burette",

    mainBuretteClamp:
      "Burette Clamp",

    mainThermometer:
      "Thermometer",

    kettle:
      "Kettle",

    pipette:
      "Pipette",

    "volumetric-pipette":
      "Volumetric Pipette",

    "graduated-pipette":
      "Graduated Pipette",

    "volumetric-flask":
      "Volumetric Flask",

    "volumetric-bung":
      "Volumetric Flask Bung",

    "phenopthaline-dropper-bottle":
      "Indicator Dropper",

    "sulfamic-bottle":
      "Sulfamic Acid Bottle",

    "methyl-dropper-bottle":
      "Indicator Dropper",

    "NaOH-bottle":
      "Sodium Hydroxide Bottle",

    "water-bottle":
      "Distilled Water Bottle",

    "boiliing-tube-01":
      "Boiling Tube",

    "delivery-tube-bung":
      "Delivery Tube and Bung",

    "conical-bung":
      "Conical Flask Bung",

    "separating-funnel":
      "Separating Funnel",

    "separating-funnel-bung":
      "Separating Funnel Bung",

    "heating-mantle":
      "Heating Mantle",

    "heating-mat":
      "Heatproof Mat",

    "clamp-handle":
      "Clamp Handle",

    "distillation-head":
      "Distillation Head",

    condensor:
      "Condenser",

    "water-in-tube":
      "Water Inlet Tube",

    "water-out-tube":
      "Water Outlet Tube",

    "bunsen-burner":
      "Bunsen Burner",

    "gas-tube":
      "Gas Tube",

    "bunsen-air-hole":
      "Bunsen Air Hole",

    "nichrome-wire":
      "Nichrome Wire Loop",

    "nichrome-wire-powder":
      "Nichrome Wire with Metal Salt",

    "metal-salt":
      "Metal Salt",

    "metal-salt-container":
      "Metal Salt Container",

    "iodobutane-bottle":
      "Iodobutane Bottle",

    "bromobutane-bottle":
      "Bromobutane Bottle",

    "chlorobutane-bottle":
      "Chlorobutane Bottle",
  }

  return (
    modelNames[selectedObjectName] ||
    "Select an object"
  )
}

  if (!selectedObjectName) {
  return null
}

return (
  <button
    type="button"
    className="selected-object-button"
    onClick={onClick}
  >
    {showName(selectedObjectName)}
  </button>
)
}

export default SelectedObjectButton