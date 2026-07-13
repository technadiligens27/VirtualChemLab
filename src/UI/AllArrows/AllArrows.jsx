import { useContext } from "react"
import { ModelContext } from "../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext";
import ArrowGuides from "../ArrowGuides/ArrowGuides";

const AllArrows=()=>{


    const {arrowNormalBeakerRef,arrowChairRef,arrowGogglesRef,arrowLeftGloveRef,
        arrowRightGloveRef,arrowRedLitmusRef,conicalBeakerRef,arrowConicalFlaskRef,
        arrowSpoonRef
    } = useContext(ModelContext);

    const {showArrrowChair,showNormalBeakerArrow,showGogglesArrow,showLeftGloveArrow,
        showRightGloveArrow,showRedLitmusArrow,setShowRedLitmusArrow,isMainGuideline,
        showConicalArrow,setShowArrowConicalArrow,showSpoonArrow   
    } = useContext(MainGuidelineContext)

    if(!isMainGuideline){
        return (
            <>
             {showArrrowChair && <ArrowGuides arrowRef={arrowChairRef} speed={2.5} height={3} showStatus={showArrrowChair}/>}
            </>
        )
    }

    return(
        <>
        {showArrrowChair && <ArrowGuides arrowRef={arrowChairRef} speed={2.5} height={3} showStatus={showArrrowChair}/>}     
        {showNormalBeakerArrow && <ArrowGuides arrowRef={arrowNormalBeakerRef} speed={2.5} height={0.5} showStatus={showNormalBeakerArrow}/>};
        {showConicalArrow && <ArrowGuides arrowRef={arrowConicalFlaskRef} speed={2.5} height={0.5} showStatus={showConicalArrow}/> }
        {showGogglesArrow && <ArrowGuides arrowRef={arrowGogglesRef} speed={2.5} height={0.5} showStatus={showGogglesArrow}/> }
        {showLeftGloveArrow && <ArrowGuides arrowRef={arrowLeftGloveRef} speed={2.5} height={0.5} showStatus={showLeftGloveArrow}/> }
        {showRightGloveArrow && <ArrowGuides arrowRef={arrowRightGloveRef} speed={2.5} height={0.5} showStatus={showRightGloveArrow}/> }
        {showRedLitmusArrow && <ArrowGuides arrowRef={arrowRedLitmusRef} speed={2.5} height={0.5} showStatus={showRedLitmusArrow}/>}
        {showSpoonArrow && <ArrowGuides arrowRef={arrowSpoonRef} speed={2.5} height={0.5} showStatus={showSpoonArrow}/>}
        </>
    )
}

export default AllArrows