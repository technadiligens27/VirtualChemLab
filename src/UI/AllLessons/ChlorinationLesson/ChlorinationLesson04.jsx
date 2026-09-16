import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"
import DialogBox from "../../AllDialogBox/DialogBox/DialogBox"

const ChlorinationLesson04 = () => {
  const { selectedLesson,setLessonStep,setSafetyStep,lessonStep } = useContext(MainGuidelineContext)

  const {setSelectedRightHand,setSelectedLeftHand,selectedLeftHand,selectedRightHand,setIsClampTestube,setIsClampInCenter,
    setIsModelCentre} = useContext(InteractionContext)

  const {
    graduatedBeakerRef,
    conicalBeakerRef02,
    conicalBeakerRef,

    seperatingFunnelRef,
    pipetteRef,

    gogglesRef,
    gloverightRef,graduatedBeaker50OriginalStateRef,
    gloveleftRef,potassiumHydrogenCarbonateRef,separatingFunnelBungRef
  } = useContext(ModelContext)

  useEffect(()=>{
    if(selectedLesson!==14.3)return
    setLessonStep(85)
    setSafetyStep(4)

    setIsClampInCenter(true)
    setIsClampTestube(true)
    setIsModelCentre(true)

    setSelectedLeftHand(null)
    setSelectedRightHand(null)

    if(conicalBeakerRef.current){
        conicalBeakerRef.current.visible = false
    }

    if(conicalBeakerRef02.current){
        conicalBeakerRef02.current.visible = true
    }

    if(seperatingFunnelRef.current){
        seperatingFunnelRef.current.visible = true
        separatingFunnelBungRef.current.visible = true
    }

    if (gogglesRef?.current) {
        gogglesRef.current.visible = false
    }

    if (gloverightRef?.current) {
        gloverightRef.current.visible =false
    }

    if (gloveleftRef?.current) {
        gloveleftRef.current.visible = false
    }

  },[selectedLesson])

  useEffect(()=>{
    if(selectedLesson==14.3 && lessonStep==85){
        setSelectedLeftHand(null)
        setSelectedRightHand(null)
    }
    
  },[selectedLesson,lessonStep])



useEffect(() => {
  const model = conicalBeakerRef02?.current

  if (!model) return

  model.traverse((child) => {
    const childName =
      child.name?.toLowerCase() || ""

    if (
      !child.isMesh ||
      !childName.includes("liquid")
    ) {
      return
    }

    child.visible = true
    child.scale.y = 0.3

    const materials = Array.isArray(
      child.material
    )
      ? child.material
      : [child.material]

    materials.forEach((material) => {
      if (!material) return

      material.color.set("#ffffff")
      material.transparent = true
      material.opacity = 0.35
      material.needsUpdate = true
    })
  })
}, [conicalBeakerRef02])

  useEffect(()=>{
    if(potassiumHydrogenCarbonateRef.current){
      if(selectedLesson==14.3 && lessonStep>=64){
         potassiumHydrogenCarbonateRef.current.visible=false
       }
      }
   },[potassiumHydrogenCarbonateRef,selectedLesson,lessonStep])


  return (
        <>

        {lessonStep ==85 && <DialogBox text={
          <>
             Pick Up <strong>Spatula</strong> to <strong>Right Hand</strong>
          </>
          } 
        />}  

        {lessonStep ==86 && <DialogBox text={
          <>
             Click the <strong>Conical Flask</strong> to <strong>Left Hand</strong>
          </>
          } 
        />}  
        {lessonStep ==87 && <DialogBox text={
          <>
            87
          </>
          } 
        />}  

        </>
  )
}

export default ChlorinationLesson04