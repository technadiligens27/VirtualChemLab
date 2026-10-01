import { useContext } from "react"
import ModelFocusMode from "./ModelFocusMode/ModelFocusMode"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import ModelFocusLesson14 from "./ModelFocusLesson14"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import ModelFocusLesson13 from "./ModelFocusLesson13"
import ModelFocusLesson08 from "./ModelFocusLesson08"
import ModelFocusLesson09 from "./ModelFocusLesson09"

const AllModeFocusModes = () =>{

    const {isExplanationOpen,setIsExplanationOpen,selectedLesson} = useContext(MainGuidelineContext)

    return(
        <>
        {isExplanationOpen && [14,14.1,14.2,14.3,14.4].includes(selectedLesson) && <ModelFocusLesson14/> }    
        {isExplanationOpen && [13].includes(selectedLesson) && <ModelFocusLesson13/> }    
        {isExplanationOpen && [8].includes(selectedLesson) && <ModelFocusLesson08/> }    
        {isExplanationOpen && [9].includes(selectedLesson) && <ModelFocusLesson09/> }    

        </>
    )
}

export default AllModeFocusModes