import { useContext } from "react"
import ErrorMsg from "../ErrorMsg/ErrorMsg"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AllErrors = ()=>{

    const {showErrorMsgNo,setShowErrorMsgNo} = useContext(MainGuidelineContext);

    return(
        <>

            {showErrorMsgNo ===1 && <ErrorMsg text={'Pls pick with left hand'}/> }
            {showErrorMsgNo ===2 && <ErrorMsg text={'Pls Correct Liquid and Amount'}/> }
            {showErrorMsgNo ===3 && <ErrorMsg text={'Press P for pouring mode'}/> }
            {showErrorMsgNo == 4 && <ErrorMsg text={'Cant do that right now'}/>}
            {showErrorMsgNo == 5 && <ErrorMsg text={'Pls Select Uniersal Indicatoe and then 50 ml'}/>}
            {showErrorMsgNo == 6 && <ErrorMsg text={'Pls Select Red Litmus Paper'}/>}
            {showErrorMsgNo == 7 && <ErrorMsg text={'Pls Select Starch Solution and 50 ml'}/>}
            {showErrorMsgNo == 8 && <ErrorMsg text={'No Visible Reaction Found'}/>}
            {showErrorMsgNo == 9 && <ErrorMsg text={'No Liquid Inside beaker to pour'}/>}
            {showErrorMsgNo == 10 && <ErrorMsg text={'Beaker Already full'}/>}
            {showErrorMsgNo == 11 && <ErrorMsg text={'No Liquid to test'}/>}
            {showErrorMsgNo == 12 && <ErrorMsg text={'Select Conical Flask'}/>}
            {showErrorMsgNo == 13 && <ErrorMsg text={'Should Have Spoon in Hand to fill salt'}/>}
        </>
    )
}

export default AllErrors