import { useContext } from "react"
import DialogBox from "./DialogBox/DialogBox"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllDialogBox = ()=>{

    const {selectedMainGuideline,showArrrowChair,lessonStep} = useContext(MainGuidelineContext)

    return(
        <>
        {selectedMainGuideline === 5 
        && showArrrowChair 
        && <DialogBox text={"Walk over to the chair indicated by the arrow"}/>}

       {
        lessonStep ===3 && <DialogBox text={"Pick Up Beaker"}/>
       }     

        </>
    )
}

export default AllDialogBox