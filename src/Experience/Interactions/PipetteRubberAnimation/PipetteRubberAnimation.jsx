import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

// import {PourDropletsFromModel} from "../../../Experience/Interactions/PourDropletsFromModel/PourDropletsFromModel.jsx"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext.jsx"
import PourDropletsFromModel from "../PourDropletsFromModel/PourDropletsFromModel.jsx"


const PipetteRubberAnimation = ({
  modelRef,

  rubberScaleSpeed = 0.1,
  rubberMinScaleX = 0.45,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const {
    fillPippette,
    setFillPipette,
    isPipetteFilled,
    setPipetteDroplet,
  } = useContext(
    InteractionContext
  )

  const {graduatedPipetteRef} = useContext(ModelContext)

  const [isFullySqueezed,setIsFullySqueezed] = useState(false)

  const rubberRef =
    useRef(null)

  const originalRubberScaleXRef =
    useRef(null)

  const [
    fillAmount,
    setFillAmount,
  ] = useState(0)


  // =========================================
  // FIND RUBBER CHILD
  // =========================================

  useEffect(() => {
    const model =
      modelRef?.current

    if (!model) return

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        childName.includes("rubber")
      ) {
        rubberRef.current =
          child

        originalRubberScaleXRef.current =
          child.scale.x
      }
    })

    if (!rubberRef.current) {
      console.log(
        "Rubber child not found"
      )
    }

    return () => {
      if (
        !rubberRef.current || originalRubberScaleXRef.current === null
      ) {
        return
      }

      rubberRef.current.scale.x =
        originalRubberScaleXRef.current

      rubberRef.current.updateMatrixWorld(
        true
      )
    }
  }, [modelRef])


  // =========================================
  // CONTROL RUBBER
  // =========================================

  const controlRubberScale = (direction) => {
    if (!rubberRef.current) return

    if (originalRubberScaleXRef.current ===null) {
      return
    }

    const rubber =  rubberRef.current
    const originalScaleX = originalRubberScaleXRef.current 

    // =========================================
    // SQUEEZE RUBBER
    // =========================================

    if (direction === "down") {
      const previousScaleX = rubber.scale.x

      rubber.scale.x =
        Math.max(rubber.scale.x - rubberScaleSpeed, rubberMinScaleX)

      const reachedMinimum =
        previousScaleX >
          rubberMinScaleX &&
        rubber.scale.x ===
          rubberMinScaleX

      if (reachedMinimum) {

        console.log("fully Squeezed")

        setIsFullySqueezed(true)

        if (isPipetteFilled) {
          setPipetteDroplet(
            true
          )
        }

        if (
          selectedLesson ===
            10 &&
          lessonStep === 43
        ) {
          setLessonStep(44)
        }
      }
    }


    // =========================================
    // RELEASE RUBBER
    // =========================================

    if (direction === "up") {
      const previousScaleX =
        rubber.scale.x

      rubber.scale.x =
        Math.min(
          rubber.scale.x +
            rubberScaleSpeed,

          originalScaleX
        )

      if (!isPipetteFilled) {
        setFillPipette(true)
      }

      const fullyReleased =
        previousScaleX <
          originalScaleX &&
        rubber.scale.x ===
          originalScaleX

      if (fullyReleased) {
        console.log(
          "Rubber fully released"
        )

        if (
          selectedLesson ===
            10 &&
          lessonStep === 45
        ) {
          setLessonStep(46)
        }

        if (
          selectedLesson ===
            10 &&
          lessonStep === 55
        ) {
          setLessonStep(56)
        }

        if (
          selectedLesson ===
            10 &&
          lessonStep === 65
        ) {
          setLessonStep(66)
        }


        if (
          selectedLesson ===
            14.4 &&
          lessonStep === 138
        ) {
          setLessonStep(139)
        }


      }
    }


    rubber.updateMatrixWorld(
      true
    )
  }


  // =========================================
  // MOUSE WHEEL
  // =========================================

  useEffect(() => {
    const handleWheel = (
      event
    ) => {
      if (event.deltaY > 0) {
        controlRubberScale(
          "down"
        )
      }

      if (event.deltaY < 0) {
        controlRubberScale(
          "up"
        )
      }
    }

    window.addEventListener(
      "wheel",
      handleWheel
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [
    rubberScaleSpeed,
    rubberMinScaleX,
    selectedLesson,
    lessonStep,
    setLessonStep,
    isPipetteFilled,
    modelRef,
  ])


  return (
    <>
      {isFullySqueezed && (<PourDropletsFromModel 
        modelRef={graduatedPipetteRef} 
        fallAxis={"y"} 
        startDelay={0} 
        fallDistance={1} 
        reduceModelLiquid = {true}
        reduceModelLiquidAmount={0}
        loopTimes={4}
        />)}
    
    </>
  )
}

export default PipetteRubberAnimation