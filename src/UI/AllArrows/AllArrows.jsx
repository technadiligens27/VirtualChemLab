import { useContext } from "react"
import { ModelContext } from "../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext";
import ArrowGuides from "../ArrowGuides/ArrowGuides";

const AllArrows=()=>{


    const {arrowNormalBeakerRef,arrowChairRef,arrowGogglesRef,arrowLeftGloveRef,
        arrowRightGloveRef,arrowRedLitmusRef
    } = useContext(ModelContext);
    const {showArrrowChair,showNormalBeakerArrow,showGogglesArrow,showLeftGloveArrow,
        showRightGloveArrow,showRedLitmusArrow,setShowRedLitmusArrow        
    } = useContext(MainGuidelineContext)

    return(
        <>
        {showArrrowChair && <ArrowGuides arrowRef={arrowChairRef} speed={2.5} height={3} showStatus={showArrrowChair}/>}
        {showNormalBeakerArrow && <ArrowGuides arrowRef={arrowNormalBeakerRef} speed={2.5} height={0.5} showStatus={showNormalBeakerArrow}/>};
        {showGogglesArrow && <ArrowGuides arrowRef={arrowGogglesRef} speed={2.5} height={0.5} showStatus={showGogglesArrow}/> }
        {showLeftGloveArrow && <ArrowGuides arrowRef={arrowLeftGloveRef} speed={2.5} height={0.5} showStatus={showLeftGloveArrow}/> }
        {showRightGloveArrow && <ArrowGuides arrowRef={arrowRightGloveRef} speed={2.5} height={0.5} showStatus={showRightGloveArrow}/> }
        {showRedLitmusArrow && <ArrowGuides arrowRef={arrowRedLitmusRef} speed={2.5} height={0.5} showStatus={showRedLitmusArrow}/>}

        </>
    )
}

export default AllArrows