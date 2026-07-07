import { useContext } from 'react'
import './InfoBox.css'
import { InteractionContext } from '../../Contexts/InteractionContext/InteractionContext'

const labObjectExplanations = [
  {
    name: "main-normal-beaker",
    title: "Normal Beaker",
    explanation:
      "A beaker is a common laboratory container used to hold, mix, heat, and pour liquids. It usually has a wide opening and a small pouring lip, making it useful for simple liquid handling.",
  },
  {
    name: "main-Conical-Flask",
    title: "Conical Flask",
    explanation:
      "A conical flask is used to mix and swirl liquids safely without spilling. Its wide bottom keeps it stable, while its narrow neck helps reduce splashing during experiments.",
  },
  {
    name: "main-funnel",
    title: "Funnel",
    explanation:
      "A funnel is used to pour liquids or powders into containers with small openings. It is also used with filter paper to separate solids from liquids during filtration.",
  },
  {
    name: "main-graduated-cylinder",
    title: "Graduated Cylinder",
    explanation:
      "A graduated cylinder is used to measure the volume of liquids more accurately than a beaker. It has measurement marks on the side, making it useful when an exact amount of liquid is needed.",
  },
  {
    name: "main-Round-bottom-flask",
    title: "Round Bottom Flask",
    explanation:
      "A round bottom flask is used to heat or mix liquids evenly. Its round shape helps spread heat smoothly, but it usually needs a stand or clamp because it cannot stand upright on its own.",
  },
  {
    name: "main-filter-paper",
    title: "Filter Paper",
    explanation:
      "Filter paper is used with a funnel to separate solid particles from a liquid. The liquid passes through the paper, while the solid particles stay trapped on the paper.",
  },
  {
    name: "main-folded-paper",
    title: "Folded Filter Paper",
    explanation:
      "Folded filter paper is placed inside a funnel during filtration. It helps separate solid particles from a liquid while allowing the liquid to pass through.",
  },
  {
    name: "main-red-litmus",
    title: "Red Litmus Paper",
    explanation:
      "Red litmus paper is used to test whether a substance is alkaline. If it touches an alkaline solution, it turns blue.",
  },
  {
    name: "main-blue-litmus",
    title: "Blue Litmus Paper",
    explanation:
      "Blue litmus paper is used to test whether a substance is acidic. If it touches an acidic solution, it turns red.",
  },
  {
    name: "Goggles",
    title: "Safety Goggles",
    explanation:
      "Safety goggles protect the eyes from chemical splashes, fumes, and small particles during laboratory experiments.",
  },
  {
    name: "main-glove-left",
    title: "Safety Glove",
    explanation:
      "Safety gloves protect the hands from chemicals, heat, and spills during laboratory work.",
  },
  {
    name: "main-glove-right",
    title: "Safety Glove",
    explanation:
      "Safety gloves protect the hands from chemicals, heat, and spills during laboratory work.",
  },
  {
    name: "main-spoon",
    title: "Lab Spoon",
    explanation:
      "A lab spoon is used to take, transfer, and add small amounts of solid chemicals during experiments.",
  },
  {
    name: "main-testube-01",
    title: "Test Tube",
    explanation:
      "A test tube is used to hold, mix, or heat small amounts of chemicals during simple laboratory tests.",
  },
  {
    name: "main-testube-02",
    title: "Test Tube",
    explanation:
      "A test tube is used to hold, mix, or heat small amounts of chemicals during simple laboratory tests.",
  },
  {
    name: "main-testube-03",
    title: "Test Tube",
    explanation:
      "A test tube is used to hold, mix, or heat small amounts of chemicals during simple laboratory tests.",
  },
]

const InfoBox = ({ clickedModel }) => {

  const {isObjectInfo,setIsObjectInfo} = useContext(InteractionContext)

  const selectedInfo = labObjectExplanations.find(
    (item) => item.name === clickedModel
  )

  if (!selectedInfo) return null

  return (
    <div className="main-guidelines info-box-container">
      <div className="guideline-container">
        <div className="main-guidelines-title">
          <h1>{selectedInfo.title}</h1>
        </div>

        <div className="guideline-inner-container">
          <p>{selectedInfo.explanation}</p>
        </div>
              <button onClick={()=>{setIsObjectInfo(false)}}>Close</button>

      </div>
    </div>
  )
}

export default InfoBox