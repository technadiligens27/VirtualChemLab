import { useContext } from 'react'
import './InfoDialogBox.css'
import { InteractionContext } from '../../Contexts/InteractionContext/InteractionContext'

const InfoDialogBox = ({clickedModel})=>{

    const {isObjectInfo,setIsObjectInfo} = useContext(InteractionContext);

      let name = ""

      if (clickedModel === "main-normal-beaker") {
        name = "Normal Beaker"
        }

        if (clickedModel === "main-Conical-Flask") {
        name = "Conical Flask"
        }

        if (clickedModel === "main-funnel") {
        name = "Funnel"
        }

        if (clickedModel === "main-graduated-cylinder") {
        name = "Graduated Cylinder"
        }

        if (clickedModel === "main-Round-bottom-flask") {
        name = "Round Bottom Flask"
        }

        if (clickedModel === "main-filter-paper") {
        name = "Filter Paper"
        }

        if (clickedModel === "main-folded-paper") {
        name = "Folded Filter Paper"
        }

        if (clickedModel === "main-red-litmus") {
        name = "Red Litmus Paper"
        }

        if (clickedModel === "main-blue-litmus") {
        name = "Blue Litmus Paper"
        }
        if(clickedModel === 'Goggles'){
            name === 'Safety Goggles'
        }

        if(clickedModel === 'main-glove-left' || clickedModel === 'main-glove-right'){
            name === 'Safety Glove'
        }

    return(
        <div className="dialog-box-container info-dialog-box">
            <div className="dialog-box-inner-container info-dialog-inner-box">
                <p>{name}</p>
                <button onClick={()=>setIsObjectInfo(true)}>Learn More</button>
            </div>
        </div>
    )
}

export default InfoDialogBox