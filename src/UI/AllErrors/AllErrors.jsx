import { useContext } from "react"
import ErrorMsg from "../ErrorMsg/ErrorMsg"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllErrors = ()=>{

    const {showErrorMsgNo,setShowErrorMsgNo} = useContext(MainGuidelineContext);

    return(
        <>
            {showErrorMsgNo === 1 && <ErrorMsg text="Use left hand" />}
            {showErrorMsgNo === 2 && <ErrorMsg text="Wrong liquid or amount" />}
            {showErrorMsgNo === 3 && <ErrorMsg text="Press P to pour" />}
            {showErrorMsgNo === 4 && <ErrorMsg text="Not available now" />}
            {showErrorMsgNo === 5 && <ErrorMsg text="Select 50 ml indicator" />}
            {showErrorMsgNo === 6 && <ErrorMsg text="Select red litmus" />}
            {showErrorMsgNo === 7 && <ErrorMsg text="Select 50 ml starch" />}
            {showErrorMsgNo === 8 && <ErrorMsg text="No reaction found" />}
            {showErrorMsgNo === 9 && <ErrorMsg text="Beaker is empty" />}
            {showErrorMsgNo === 10 && <ErrorMsg text="Beaker is full" />}
            {showErrorMsgNo === 11 && <ErrorMsg text="No liquid to test" />}
            {showErrorMsgNo === 12 && <ErrorMsg text="Select conical flask" />}
            {showErrorMsgNo === 13 && <ErrorMsg text="Hold the spoon first" />}
        </>
    )
}

export default AllErrors