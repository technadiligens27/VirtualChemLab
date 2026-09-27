import { useContext } from "react"
import ModelFocusMode from "./ModelFocusMode/ModelFocusMode"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import ModelFocusLesson14 from "./ModelFocusLesson14"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllModeFocusModes = () =>{

    const {isExplanationOpen,setIsExplanationOpen,selectedLesson} = useContext(MainGuidelineContext)

    return(
        <>
        {isExplanationOpen && [14,14.1,14.2,14.3,14.4].includes(selectedLesson) && <ModelFocusLesson14/> }    
        </>
    )
}

export default AllModeFocusModes