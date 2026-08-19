import { useContext, useEffect } from "react"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

import DialogBox from "../../AllDialogBox/DialogBox/DialogBox.jsx"

const HCLTitration2 = () => {
  const {
    setIsVolumetricPipetteFilled,setIsBuiretteClamped 
  } = useContext(InteractionContext)

  const {
    lessonStep,
    selectedLesson,setSafetyStep
  } = useContext(MainGuidelineContext)

  const {
    conicalBeakerRef,mainBuiretteRef,gogglesRef,gloverightRef,gloveleftRef,volumetricBung,volumetricRef
  } = useContext(ModelContext)

  useEffect(()=>{
    setIsBuiretteClamped(true)
    setSafetyStep(4)
  },[])

  useEffect(()=>{
    gogglesRef.current.visible=false;
    gloverightRef.current.visible=false;
    gloveleftRef.current.visible=false;
    volumetricBung.current.visible=true
  },[])

  useEffect(() => {
    if (selectedLesson !== 11.1) return

    const interval = setInterval(() => {
      if (
        !conicalBeakerRef?.current ||
        !mainBuiretteRef?.current ||
        !volumetricRef?.current
      ) {
        return
      }

      let conicalLiquidFound = false
      let buretteLiquidFound = false
      let volumetricLiquidFound = false

      // -------------------------
      // CONICAL FLASK LIQUID
      // -------------------------

      conicalBeakerRef.current.traverse((child) => {
        const childName =
          child.name?.toLowerCase() || ""

        if (childName.includes("liquid")) {
          child.visible = true
          child.scale.y = 0.2
          child.updateMatrixWorld(true)

          conicalLiquidFound = true

        }
      })

      // -------------------------
      // BURETTE LIQUID
      // -------------------------

      mainBuiretteRef.current.traverse((child) => {
        const childName =
          child.name?.toLowerCase() || ""

        if (childName.includes("liquid")) {
          child.visible = true
          child.scale.y = 1
          child.updateMatrixWorld(true)

          buretteLiquidFound = true

        }
      })

      volumetricRef.current.traverse((child) => {
        const childName =
          child.name?.toLowerCase() || ""

        if (childName.includes("liquid")) {
          child.visible = true
          child.scale.y = 0.6
          child.updateMatrixWorld(true)

          volumetricLiquidFound = true

        }
      })

      // Only stop checking once both liquids were found
      if (
        conicalLiquidFound &&
        buretteLiquidFound &&
        volumetricLiquidFound
      ) {
        console.log(
          "HCl Titration Part 2 state initialized"
        )

        setIsVolumetricPipetteFilled(false)

        clearInterval(interval)
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [
    selectedLesson,
    conicalBeakerRef,
    mainBuiretteRef,volumetricRef,
    setIsVolumetricPipetteFilled,
  ])

  return (
    <>
      {lessonStep === 46 && (
        <DialogBox text="46" />
      )}
    </>
  )
}

export default HCLTitration2