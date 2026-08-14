import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import FillLiquidBeaker from "../FillLiquid/FillLiquidBeaker/FillLiquidBeaker";
import ReactionTimer from "../../../UI/ReactionTimer/ReactionTimer";
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const PourFromTestube = ({isPouring,hand,model,liquidColor}) => {

  const pourRef = useRef(null);

  const {testube03Ref,testube04Ref,testube01Ref} = useContext(ModelContext);
  const {selectedRightHand,selectedLeftHand,isReactionTimerRunning,setIsReactionTimerRunning} = useContext(InteractionContext);
  const {lessonStep,setLessonStep} = useContext(MainGuidelineContext)

  const timerStartRef = useRef(null)
  const timerIntervalRef = useRef(null)

  useEffect(() => {

    if (!model) return

    model.traverse((child) => {
      const name = child.name?.toLowerCase() || ""

      if (name.includes("pour")) {
        pourRef.current = child

        child.visible = false
        child.scale.y = 0

        child.traverse((pourChild) => {
          if (!pourChild.isMesh || !pourChild.material) return

          if (Array.isArray(pourChild.material)) {
            pourChild.material = pourChild.material.map((material) =>
              material.clone()
            )
          } else {
            pourChild.material = pourChild.material.clone()
          }
        })
      }
    })

    if (!pourRef.current) {
      console.log("No Pour Found")
    }
  }, [model])

  useEffect(() => {
    const pour = pourRef.current

    if (!pour || !liquidColor) return

    pour.traverse((child) => {
      if (!child.isMesh || !child.material) return

      if (Array.isArray(child.material)) {
        child.material.forEach((material) => {
          material.color?.set(liquidColor)
          material.needsUpdate = true
        })
      } else {
        child.material.color?.set(liquidColor)
        child.material.needsUpdate = true
      }
    })
  }, [liquidColor])

  useEffect(()=>{
    if(isPouring){
      setIsReactionTimerRunning(true)
    }
  },[isPouring])

  useFrame((_, delta) => {
    const pour = pourRef.current

    if (!pour) return

    if (isPouring) {
      pour.visible = true

      pour.scale.y = Math.min(
        pour.scale.y + 80 * delta,
        25
      )
    } else {
      pour.scale.y = Math.max(
        pour.scale.y - 80 * delta,
        0
      )

      if (pour.scale.y === 0) {
        pour.visible = false
      }
    }
  })



  return (
    <>
    {selectedLeftHand?.name === "main-testube-01" && selectedRightHand?.name === "main-testube-04" &&
      <FillLiquidBeaker
        modelRef={testube01Ref}
        amount={50}
        color="#f3f4f6"
        isPouring={isPouring}
        pourModelRef={testube04Ref}
       />
    }

    {
       

    }

    </>
  )
}

export default PourFromTestube