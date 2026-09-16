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

const ChlorinationLesson03 = () => {
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
    gloveleftRef,potassiumHydrogenCarbonateRef
  } = useContext(ModelContext)

  // =============================================
  // INITIALIZE LESSON
  // =============================================

  useEffect(() => {
    if (selectedLesson !== 14.2) {
      return
    }

    setSafetyStep(4)
    setLessonStep(65)
    setIsClampTestube(true)
    setIsClampInCenter(true)
    setIsModelCentre(true)
  }, [
    selectedLesson,
    setSafetyStep,
    setLessonStep,
    setIsClampInCenter,
    setIsClampTestube,
  ])

  // =============================================
  // MODEL VISIBILITY
  // =============================================

  useEffect(() => {
    if (selectedLesson !== 14.2) {
      return
    }

    if (conicalBeakerRef02?.current) {
      conicalBeakerRef02.current.visible =
        true
    }

    if (conicalBeakerRef?.current) {
      conicalBeakerRef.current.visible =
        false
    }

    if (graduatedBeakerRef?.current) {
      graduatedBeakerRef.current.visible =
        true
    }

    if (seperatingFunnelRef?.current) {
      seperatingFunnelRef.current.visible =
        true
    }

    if (pipetteRef?.current) {
      pipetteRef.current.visible =
        false
    }

    if (gogglesRef?.current) {
      gogglesRef.current.visible =
        false
    }

    if (gloverightRef?.current) {
      gloverightRef.current.visible =
        false
    }

    if (gloveleftRef?.current) {
      gloveleftRef.current.visible =
        false
    }
  }, [
    selectedLesson,
    conicalBeakerRef02,
    conicalBeakerRef,
    graduatedBeakerRef,
    seperatingFunnelRef,
    pipetteRef,
    gogglesRef,
    gloverightRef,
    gloveleftRef,
  ])

  // =============================================
  // EMPTY CONICAL FLASK
  // =============================================

  useEffect(() => {
    if (
      selectedLesson !== 14.2 ||
      !conicalBeakerRef02?.current
    ) {
      return
    }

    const conicalBeaker02 =
      conicalBeakerRef02.current

    conicalBeaker02.visible = true

    conicalBeaker02.traverse(
      (child) => {
        const name =
          child.name?.toLowerCase() ||
          ""

        if (!name.includes("liquid")) {
          return
        }

        child.visible = false

        /*
         * Only reduce Y so the liquid can
         * be filled again later.
         */
        child.scale.y = 0

        child.updateMatrixWorld(true)
      }
    )

    conicalBeaker02.updateMatrixWorld(
      true
    )
  }, [
    selectedLesson,
    conicalBeakerRef02,
  ])

  // =============================================
  // GRADUATED CYLINDER LIQUID
  // =============================================

  useEffect(() => {
    if (selectedLesson !== 14.2 || !graduatedBeakerRef?.current ) {
      return
    }
    const graduatedBeaker = graduatedBeakerRef.current
    graduatedBeaker.visible = true

    graduatedBeaker.traverse(
      (child) => {
        if (!child.isMesh) {
          return
        }

        const name =
          child.name?.toLowerCase() ||
          ""

        if (!name.includes("liquid")) {
          return
        }

        child.visible = true
        child.frustumCulled = false

        child.scale.x = 1
        child.scale.y = 0.4
        child.scale.z = 1

        const updateMaterial = (
          material
        ) => {
          if (!material) {
            return material
          }

          const clonedMaterial =
            material.clone()

          clonedMaterial.color?.set(
            "#f5fbff"
          )

          clonedMaterial.transparent =
            true

          clonedMaterial.opacity = 0.38
          clonedMaterial.depthWrite =
            false

          if (
            "roughness" in
            clonedMaterial
          ) {
            clonedMaterial.roughness =
              0.1
          }

          if (
            "metalness" in
            clonedMaterial
          ) {
            clonedMaterial.metalness =
              0
          }

          if (
            "transmission" in
            clonedMaterial
          ) {
            clonedMaterial.transmission =
              0.3
          }

          if (
            "thickness" in
            clonedMaterial
          ) {
            clonedMaterial.thickness =
              0.2
          }

          clonedMaterial.needsUpdate =
            true

          return clonedMaterial
        }

        if (
          Array.isArray(child.material)
        ) {
          child.material =
            child.material.map(
              updateMaterial
            )
        } else if (child.material) {
          child.material =
            updateMaterial(
              child.material
            )
        }

        child.updateMatrixWorld(true)
      }
    )

    graduatedBeaker.updateMatrixWorld(
      true
    )
  }, [
    selectedLesson,
    graduatedBeakerRef,
  ])

  // =============================================
  // SEPARATING FUNNEL LIQUIDS
  // =============================================

  useEffect(() => {
    if (
      selectedLesson !== 14.2 ||
      !seperatingFunnelRef?.current
    ) {
      return
    }

    const separatingFunnel =
      seperatingFunnelRef.current

    separatingFunnel.visible = true

    separatingFunnel.traverse(
      (child) => {
        if (!child.isMesh) {
          return
        }

        const normalizedName =
          (
            child.name?.toLowerCase() ||
            ""
          ).replace(/[-_\s]/g, "")

        const isUpperLiquid =
          normalizedName.includes(
            "separatingfunnelliquidupper"
          )

        const isBottomLiquid =
          normalizedName.includes(
            "separatingfunnelliquidbottom"
          )

        if (
          !isUpperLiquid &&
          !isBottomLiquid
        ) {
          return
        }

        child.visible = true
        child.frustumCulled = false
        child.scale.set(0.7, 0.7, 0.7)

        // Directly assign the layer colour.
        const liquidColor =
          isUpperLiquid
            ? "#F4D35E"
            : "#F4D35E"

        const updateMaterial = (
          material
        ) => {
          if (!material) {
            return material
          }

          const clonedMaterial =
            material.clone()

          clonedMaterial.color?.set(
            liquidColor
          )

          clonedMaterial.transparent =
            true

          clonedMaterial.opacity = 0.35
          clonedMaterial.depthWrite =
            false

          if (
            "roughness" in
            clonedMaterial
          ) {
            clonedMaterial.roughness =
              0.1
          }

          if (
            "metalness" in
            clonedMaterial
          ) {
            clonedMaterial.metalness =
              0
          }

          clonedMaterial.needsUpdate =
            true

          return clonedMaterial
        }

        if (
          Array.isArray(child.material)
        ) {
          child.material =
            child.material.map(
              updateMaterial
            )
        } else if (child.material) {
          child.material =
            updateMaterial(
              child.material
            )
        }

        /*
         * Ensure every group containing the
         * liquid is visible.
         */
        let currentParent =
          child.parent

        while (
          currentParent &&
          currentParent !==
            separatingFunnel
        ) {
          currentParent.visible = true

          currentParent =
            currentParent.parent
        }

        child.updateMatrixWorld(true)
      }
    )

    separatingFunnel.updateMatrixWorld(
      true
    )
  }, [
    selectedLesson,
    seperatingFunnelRef,
  ])

  // =============================================
  // CONICAL FLASK — LEFT HAND
  // =============================================

  useEffect(() => {
    if (
      selectedLesson !== 14.2 ||
      !conicalBeakerRef02?.current
    ) {
      return
    }

    if (
      selectedLeftHand?.name ===
      "main-Conical-Flask-02"
    ) {
      return
    }

    const conicalBeaker02 =
      conicalBeakerRef02.current

    setSelectedLeftHand({
      hand: "left",

      name:
        "main-Conical-Flask-02",

      ref: conicalBeakerRef02,

      originalParent:
        conicalBeaker02.parent,

      originalPosition:
        conicalBeaker02.position.clone(),

      originalRotation:
        conicalBeaker02.rotation.clone(),

      originalScale:
        conicalBeaker02.scale.clone(),
    })
  }, [
    selectedLesson,
    conicalBeakerRef02,
    setSelectedLeftHand,
  ])

// =============================================
// MEASURING CYLINDER — RIGHT HAND
// =============================================

useEffect(() => {
  if (selectedLesson !== 14.2) {
    return
  }

  if (
    !graduatedBeakerRef?.current ||
    !graduatedBeaker50OriginalStateRef?.current
  ) {
    return
  }

  const original =
    graduatedBeaker50OriginalStateRef.current

  setSelectedRightHand({
    hand: "right",

    name:
      "main-graduated-cylinder",

    ref:
      graduatedBeakerRef,

    originalParent:
      original.parent,

    originalPosition:
      original.position.clone(),

    originalRotation:
      original.rotation.clone(),

    originalScale:
      original.scale.clone(),
  })
}, [
  selectedLesson,
  graduatedBeakerRef,
  graduatedBeaker50OriginalStateRef,
  setSelectedRightHand,
])

      useEffect(()=>{
            if(potassiumHydrogenCarbonateRef.current){
                if(selectedLesson==14.2 && lessonStep>=64){
                    potassiumHydrogenCarbonateRef.current.visible=false
                }
            }
        },[potassiumHydrogenCarbonateRef,selectedLesson,lessonStep])


  return (
        <>
            {lessonStep ==65 && <DialogBox text={
                <>
                   Click the <strong>Clamp</strong> and select <strong>Add Funnel</strong>
                </>
            }   />}
            {lessonStep ==66 && <DialogBox text={
                <>
                   Now Click <strong>Held Measuring Cylinder</strong> and select <strong>Pour Mode</strong>
                </>
            }   />}

            {lessonStep ==67 && <DialogBox text={
                <>
                   <strong>Scroll Down</strong> to <strong>Pour Sodium Hydrogencarbonate</strong>
                </>
            }   />}
        
            {lessonStep ==68 && <DialogBox text={
                <>
                 Click the <strong>Measuring Cylinder </strong>and Select <strong>Exit Pour Mode</strong>
                </>
            }   />}

            {lessonStep ==69 && <DialogBox text={
                <>
                   Keep <strong>Measuring Cylinder</strong> Back In <strong>Table</strong>
                </>
            }   />}
            {lessonStep ==70 && <DialogBox text={
                <>
                   Click the <strong>Clamp</strong> and Select <strong>Unclamp Separating Funnel</strong>
                </>
            }   />}
            {lessonStep ==71 && <DialogBox text={
                <>
           Click the Held <strong>Separating Funnel</strong>  and select <strong>Remove Funnel and Add Bung</strong> 
                </>
            }   />}

            {lessonStep ==72 && <DialogBox text={
                <>
           <strong>Scroll Down</strong> to <strong>Swirl</strong> the <strong>Separating Funnel</strong>
                </>
            }   />}

            {lessonStep ==73 && <DialogBox text={
                <>
              Observe the CO₂ rising, but with less intensity than before.
                </>
            }   />}

            {lessonStep ==74 && <DialogBox text={
                <>
             <strong>Remove Bung</strong> of <strong>Separating Funnel</strong> to <strong>Release Pressure</strong>
                </>
            }   />}

            {lessonStep ==75 && <DialogBox text={
                <>
             <strong>Add Bung</strong> again to <strong>Separating Funnel</strong> 
                </>
            }   />}

            {lessonStep ==76 && <DialogBox text={
                <>
           <strong>Scroll Down</strong> to <strong>Swirl</strong> the <strong>Separating Funnel</strong> again
                </>
            }   />}

            {lessonStep ==77 && <DialogBox text={
                <>
              Observe the CO₂ rising, but with less intensity than before.
                </>
            }   />}

            {lessonStep ==78 && <DialogBox text={
                <>
             <strong>Remove Bung</strong> of <strong>Separating Funnel</strong> to <strong>Release Pressure</strong>
                </>
            }   />}
            {lessonStep ==79 && <DialogBox text={
                <>
             <strong>Add Bung</strong> again to <strong>Separating Funnel</strong> 
                </>
            }   />}

            {lessonStep ==80 && <DialogBox text={
                <>
             Click the Held <strong>Separating Funnel</strong>  and select <strong>Clamp</strong> 
                </>
            }   />}

            {lessonStep ==81 && <DialogBox text={
                <>
             <strong>Scroll Down</strong> to <strong>Pour</strong> and Discard aqueous Layer
                </>
            }   />}
            {lessonStep ==82 && <DialogBox text={
                <>
             Click the <strong>Beaker</strong> under the Clamp and select <strong>Remove Beaker</strong>
                </>
            }   />}

            {lessonStep ==83 && <DialogBox text={
                <>
             Click the <strong>Conical Flask</strong> and Select <strong>Place Beaker Near Clamp</strong> 
                </>
            }   />}  

            {lessonStep ==84 && <DialogBox text={
                <>
             <strong>Scroll Down</strong> to <strong>Pour</strong> from  <strong>Separating Funnel</strong>
                </>
            }   />}

            {lessonStep ==85 && <DialogBox text={
                <>
             85
                </>
            }   />}                


        </>
  )
}

export default ChlorinationLesson03