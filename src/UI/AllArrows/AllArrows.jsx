import { useContext } from "react"
import { ModelContext } from "../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext";
import ArrowGuides from "../ArrowGuides/ArrowGuides";

const AllArrows=()=>{

    const {arrowNormalBeakerRef,arrowChairRef} = useContext(ModelContext);
    const {showArrrowChair,showNormalBeakerArrow} = useContext(MainGuidelineContext)

    return(
        <>
        {showArrrowChair && <ArrowGuides arrowRef={arrowChairRef} speed={2.5} height={3} showStatus={showArrrowChair}/>}
        {showNormalBeakerArrow && <ArrowGuides arrowRef={arrowNormalBeakerRef} speed={2.5} height={0.5} showStatus={showNormalBeakerArrow}/>}

        </>
    )
}

export default AllArrows