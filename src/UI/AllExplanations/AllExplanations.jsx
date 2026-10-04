import { useContext } from "react"
import AllExplanationLesson14 from "./AllExplanationLesson14"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"
import AllExplanationLesson13 from "./AllExplanationsLesson13"
import AllExplanationLesson08 from "./AllExplanationLesson08"
import AllExplanationLesson09 from "./AllExplanationLesson09"
import AllExplanationLesson11 from "./AllExplanationLesson11"
import AllExplanationLesson12 from "./AllExplanationLesson12"

const AllExplanations = ()=>{

    const {selectedLesson} = useContext(MainGuidelineContext)

    return(
        <>  
          {[14,14.1,14.2,14.3,14.4].includes(selectedLesson) && <AllExplanationLesson14/>}  
          {[13].includes(selectedLesson) && <AllExplanationLesson13/>}  
          {[8].includes(selectedLesson) && <AllExplanationLesson08/>}  
          {[9].includes(selectedLesson) && <AllExplanationLesson09/>}  
          {[11,11.1].includes(selectedLesson) && <AllExplanationLesson11/>}  
          {[12,12.1,12.2].includes(selectedLesson) && <AllExplanationLesson12/>}  

        </>
    )
}

export default AllExplanations