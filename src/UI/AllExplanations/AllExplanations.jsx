import { useContext } from "react"
import AllExplanationLesson14 from "./AllExplanationLesson14"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllExplanations = ()=>{

    const {selectedLesson} = useContext(MainGuidelineContext)

    return(
        <>  
          {[14,14.1,14.2,14.3,14.4].includes(selectedLesson) && <AllExplanationLesson14/>}     
        </>
    )
}

export default AllExplanations