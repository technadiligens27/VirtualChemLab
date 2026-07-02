import { useContext } from "react"
import ErrorMsg from "../ErrorMsg/ErrorMsg"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllErrors = ()=>{

    const {showErrorMsgNo,setShowErrorMsgNo} = useContext(MainGuidelineContext);

    return(
        <>

            {showErrorMsgNo ===1 && <ErrorMsg text={'Pls pick with left hand'}/> }
            
        </>
    )
}

export default AllErrors