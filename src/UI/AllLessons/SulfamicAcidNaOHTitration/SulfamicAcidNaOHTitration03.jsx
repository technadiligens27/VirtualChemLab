import {
  useContext,
  useEffect,
} from "react"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

import DialogBox from "../../AllDialogBox/DialogBox/DialogBox.jsx"

const SulfamicAcidNaOHTitration03 = () => {
  const {
    setSelectedRightHand,
    setSelectedLeftHand,
  } = useContext(InteractionContext)

  const {
    lessonStep,
    selectedLesson,
    setSafetyStep,setLessonStep
  } = useContext(MainGuidelineContext)

  const {
    gogglesRef,
    gloverightRef,
    gloveleftRef,
    normalBeakerRef,volumetricRef,volumetricBung
  } = useContext(ModelContext)

  // =========================================================
  // INITIALIZE PART 2
  // =========================================================

  useEffect(() => {
    if (selectedLesson !== 12.2) return
    if (!normalBeakerRef?.current || !volumetricRef?.current || !volumetricBung?.current) return

    // =======================================================
    // SAFETY STATE
    // =======================================================

    setSafetyStep(4)
    setLessonStep(50)

    if (gogglesRef?.current) {
      gogglesRef.current.visible = false
    }

    if (gloverightRef?.current) {
      gloverightRef.current.visible = false
    }

    if (gloveleftRef?.current) {
      gloveleftRef.current.visible = false
    }

    if(volumetricBung?.current){
      volumetricBung.current.visible = true
    }


    // =======================================================
    // NORMAL BEAKER -> LEFT HAND
    // =======================================================

    const normalBeaker =
      normalBeakerRef.current

    setSelectedLeftHand({
      hand: "left",

      name: "main-normal-beaker",

      ref: normalBeakerRef,

      originalParent:
        normalBeaker.parent,

      originalPosition:
        normalBeaker.position.clone(),

      originalRotation:
        normalBeaker.rotation.clone(),
    })

    // =======================================================
    // RIGHT HAND EMPTY
    // =======================================================

    setSelectedRightHand({
      hand: "right",

      name: "volumetric-flask",

      ref: volumetricRef,

      originalParent:
        volumetricRef.current.parent,

      originalPosition:
        volumetricRef.current.position.clone(),

      originalRotation:
        volumetricRef.current.rotation.clone(),
    })

    console.log(
      "Sulfamic Acid Na.currentOH Titration Part 3 initialized"
    )
  }, [
    selectedLesson,
    setSafetyStep,
    setSelectedLeftHand,
    setSelectedRightHand,
    gloveleftRef,
    gloverightRef,
    gogglesRef,volumetricBung,
    normalBeakerRef,volumetricRef
  ])

  useEffect(() => {
    if (selectedLesson !== 12.2) return
    if (!volumetricRef?.current) return

    volumetricRef.current.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        child.isMesh &&
        childName.includes("liquid")
      ) {
        child.visible = true
        child.scale.y = 1

        if (child.material) {
          child.material = child.material.clone()
          child.material.transparent = true
          child.material.opacity = 0.6
        }
      }
    })
  }, [
    selectedLesson,
    volumetricRef,
  ])

  // =========================================================
  // GUIDELINES
  // =========================================================

  return (
    <>
      {lessonStep==50 && (<DialogBox text={"Keep Back Beaker In Table"}/>)}
      {lessonStep==51 && (<DialogBox text={"Keep Volumetric Flask In Table"}/>)}
      {lessonStep==52 && (<DialogBox text={"Pick Up Burette To Left Hand"}/>)}
      {lessonStep==53 && (<DialogBox text={"Take funnel to Right Hand"}/>)}
      {lessonStep==54 && (<DialogBox text={"Click Funnel and select Funnel Mode"}/>)}
      {lessonStep==55 && (<DialogBox text={"Click Volumetric Flask and Select Right Hand"}/>)}
      {lessonStep==56 && (<DialogBox text={"Press P for Pouring Mode"}/>)}
      {lessonStep==57 && (<DialogBox text={"Scroll Down to Pour"}/>)}
      {lessonStep==58 && (<DialogBox text={"Press P to Exit Pouring Mode"}/>)}
      {lessonStep==59 && (<DialogBox text={"Keep Vokumetric Flask In table"}/>)}
      {lessonStep==60 && (<DialogBox text={"Click Buirette and Select Exit Funnel Mode"}/>)}
      {lessonStep==61 && (<DialogBox text={"Clamp Burette"}/>)}
      {lessonStep==62 && (<DialogBox text={"Keep Funnel In Table"}/>)}
      {lessonStep==63 && (<DialogBox text={"Take Normale Beaker into Right Hand"}/>)}
      {lessonStep==64 && (<DialogBox text={"Click Normale Beaker and select Add Liquid"}/>)}
      {lessonStep==65 && (<DialogBox text={"NaOH -25cm3"}/>)}
      {lessonStep==66 && (<DialogBox text={"Take VOlumetric Pipette to Left Hand"}/>)}
      {lessonStep==67 && (<DialogBox text={"Scroll Donw to relase air"}/>)}     
      {lessonStep==68 && (<DialogBox text={"Click Volumetric Pipette and select Pipette Mode"}/>)}
      {lessonStep==69 && (<DialogBox text={"Scroll Up to to get the lqiuid"}/>)}
      {lessonStep==70 && (<DialogBox text={"Exit Pipette Mode"}/>)}
      {lessonStep==71 && (<DialogBox text={"Keep Beaker Back in Table"}/>)}
      {lessonStep==72 && (<DialogBox text={"Take Conical Flask To Right Hand"}/>)}
      {lessonStep==73 && (<DialogBox text={"Go TO Pippete Mode"}/>)}
      {lessonStep==74 && (<DialogBox text={"Scroll Donw to Pour"}/>)}
      {lessonStep==75 && (<DialogBox text={"Exit Pipeete Mode"}/>)}
      {lessonStep==76 && (<DialogBox text={"Keep Volumetric Pipette Back On Table"}/>)}
      {lessonStep==77 && (<DialogBox text={"Take Methyl Orange Bottle to Left Hand"}/>)}
      {lessonStep==78 && (<DialogBox text={"Click Dropper and select Pour into Testube"}/>)}
      {lessonStep==79 && (<DialogBox text={"Squeeze Bottle to Pour Liquid "}/>)}
      {lessonStep==80 && (<DialogBox text={"Exit Pour Mode"}/>)}
      {lessonStep==81 && (<DialogBox text={"Keep Methyl Orange Bottle Back In Table "}/>)}
      {lessonStep==82 && (<DialogBox text={"Place Clamp in Centre"}/>)}
      {lessonStep==83 && (<DialogBox text={"Click Conical Flask and Select Place Near Beaker"}/>)}
      {lessonStep==84 && (<DialogBox text={"Scroll Down To Pour"}/>)}
      {lessonStep==85 && (<DialogBox text={"85"}/>)}

    </>
  )
}

export default SulfamicAcidNaOHTitration03