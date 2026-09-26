import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import { useFrame } from "@react-three/fiber"

import {
  ModelContext,
} from "../../../../Contexts/ModelContext/ModelContext"

import {
  InteractionContext,
} from "../../../../Contexts/InteractionContext/InteractionContext"

import {
  MainGuidelineContext,
} from "../../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import FillLiquidBeaker from "../../FillLiquid/FillLiquidBeaker/FillLiquidBeaker"


const PourFromGraduatedCylinder = ({
  isPouring,

  speed = 1,
  pourSpeed = 1,

  // Final Y scale of the pouring stream.
  pourScaleY = 1,

  otherModelRef = null,
  otherModelAmount = 0.6,

  otherModelColor = "#f3f4f6",
  otherModelOpacity = 0.6,
}) => {
  const {
    graduatedBeakerRef,

    testube01Ref,
    testube02Ref,
    testube03Ref,

    conicalBeakerRef02,
    boilingTube01Ref,
  } = useContext(ModelContext)


  const {
    fillTestubeLiquid,
    setFillTestubeLiquid,

    selectedLeftHand,
  } = useContext(
    InteractionContext
  )


  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )


  // =============================================
  // OBJECT REFS
  // =============================================

  const pourLiquidRef =
    useRef(null)

  const cylinderLiquidRef =
    useRef(null)

  const otherModelLiquidRef =
    useRef(null)

  const conicalUpperLiquidRef =
    useRef(null)


  // =============================================
  // STARTING SCALE VALUES
  // =============================================

  const cylinderStartScaleRef =
    useRef(0)

  const otherModelStartScaleRef =
    useRef(0)


  // =============================================
  // POUR PROGRESS
  // =============================================

  const progressRef =
    useRef(0)

  const isPourFinishedRef =
    useRef(false)


  const [
    isPourFullyScaled,
    setIsPourFullyScaled,
  ] = useState(false)


  // =============================================
  // FIND GRADUATED CYLINDER LIQUID
  // AND POUR STREAM
  // =============================================

  useEffect(() => {
    const cylinder =
      graduatedBeakerRef?.current


    if (!cylinder) return


    cylinder.traverse((child) => {
      if (!child.isMesh) return


      const childName =
        child.name
          ?.toLowerCase() || ""


      // =========================================
      // POUR STREAM
      // =========================================

      if (
        childName.includes(
          "pour"
        )
      ) {
        pourLiquidRef.current =
          child


        child.visible =
          false


        child.scale.set(
          child.scale.x,
          0,
          child.scale.z
        )


        return
      }


      // =========================================
      // CYLINDER LIQUID
      // =========================================

      if (
        childName.includes(
          "liquid"
        )
      ) {
        cylinderLiquidRef.current =
          child
      }
    })


    return () => {
      if (
        !pourLiquidRef.current
      ) {
        return
      }


      pourLiquidRef.current.visible =
        false


      pourLiquidRef.current.scale.y =
        0
    }
  }, [
    graduatedBeakerRef,
  ])


  // =============================================
  // FIND AND STYLE RECEIVER LIQUID
  // =============================================

  useEffect(() => {
    if (
      !otherModelRef?.current
    ) {
      otherModelLiquidRef.current =
        null

      conicalUpperLiquidRef.current =
        null


      return
    }


    const otherModel =
      otherModelRef.current


    const isConicalFlask02 =
      otherModel ===
      conicalBeakerRef02?.current


    otherModelLiquidRef.current =
      null

    conicalUpperLiquidRef.current =
      null


    otherModel.traverse((child) => {
      if (!child.isMesh) return


      const childName =
        child.name
          ?.trim()
          .toLowerCase() || ""


      const isUpperLiquid =
        childName ===
        "conical-flask-02-liquid-upper"


      const isBottomLiquid =
        childName ===
        "conical-flask-02-liquid-bottom"


      // =========================================
      // CONICAL FLASK 02 LIQUIDS
      // =========================================

      if (isConicalFlask02) {
        if (
          isUpperLiquid
        ) {
          conicalUpperLiquidRef.current =
            child
        }


        if (
          isBottomLiquid
        ) {
          otherModelLiquidRef.current =
            child
        }


        return
      }


      // =========================================
      // NORMAL RECEIVER LIQUID
      // =========================================

      if (
        !otherModelLiquidRef.current &&
        childName.includes(
          "liquid"
        )
      ) {
        otherModelLiquidRef.current =
          child
      }
    })


    const receiverLiquid =
      otherModelLiquidRef.current


    if (!receiverLiquid) {
      return
    }


    // =========================================
    // MATERIAL UPDATE
    // =========================================

    const updateMaterial =
      (material) => {
        if (!material) {
          return material
        }


        const clonedMaterial =
          material.clone()


        clonedMaterial.color?.set(
          otherModelColor
        )


        clonedMaterial.transparent =
          true


        clonedMaterial.opacity =
          otherModelOpacity


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


    const updateLiquidMaterials =
      (liquid) => {
        if (!liquid) return


        if (
          Array.isArray(
            liquid.material
          )
        ) {
          liquid.material =
            liquid.material.map(
              updateMaterial
            )
        } else {
          liquid.material =
            updateMaterial(
              liquid.material
            )
        }
      }


    updateLiquidMaterials(
      receiverLiquid
    )


    if (
      isConicalFlask02 &&
      conicalUpperLiquidRef.current
    ) {
      updateLiquidMaterials(
        conicalUpperLiquidRef.current
      )
    }
  }, [
    otherModelRef,
    conicalBeakerRef02,
    otherModelColor,
    otherModelOpacity,
  ])


  // =============================================
  // START NEW POUR
  // =============================================

  useEffect(() => {
    if (!isPouring) return


    progressRef.current =
      0


    isPourFinishedRef.current =
      false


    setIsPourFullyScaled(
      false
    )


    // =========================================
    // RESET POUR STREAM
    // =========================================

    if (
      pourLiquidRef.current
    ) {
      pourLiquidRef.current.scale.y =
        0


      pourLiquidRef.current.visible =
        true
    }


    // =========================================
    // SAVE CYLINDER LIQUID START SCALE
    // =========================================

    if (
      cylinderLiquidRef.current
    ) {
      cylinderStartScaleRef.current =
        cylinderLiquidRef.current
          .scale.y
    }


    // =========================================
    // SAVE RECEIVER START SCALE
    // =========================================

    if (
      otherModelRef?.current &&
      otherModelLiquidRef.current
    ) {
      otherModelStartScaleRef.current =
        otherModelLiquidRef.current
          .scale.y


      otherModelLiquidRef.current.visible =
        true
    }


    // =========================================
    // KEEP CONICAL UPPER LIQUID VISIBLE
    // =========================================

    if (
      otherModelRef?.current ===
        conicalBeakerRef02?.current &&
      conicalUpperLiquidRef.current
    ) {
      conicalUpperLiquidRef.current.visible =
        true
    }
  }, [
    isPouring,
    otherModelRef,
    conicalBeakerRef02,
  ])


  // =============================================
  // POUR ANIMATION
  // =============================================

  useFrame((_, delta) => {
    const pourLiquid =
      pourLiquidRef.current


    const cylinderLiquid =
      cylinderLiquidRef.current


    if (
      !pourLiquid ||
      !cylinderLiquid
    ) {
      return
    }


    // =========================================
    // NOT POURING
    // =========================================

    if (!isPouring) {
      pourLiquid.visible =
        false


      pourLiquid.scale.y =
        0


      if (
        isPourFullyScaled
      ) {
        setIsPourFullyScaled(
          false
        )
      }


      return
    }


    // =========================================
    // ALREADY FINISHED
    // =========================================

    if (
      isPourFinishedRef.current
    ) {
      pourLiquid.visible =
        false


      pourLiquid.scale.y =
        0


      return
    }


    // =========================================
    // TRANSFER PROGRESS
    // =========================================

    progressRef.current =
      Math.min(
        progressRef.current +
          delta * speed,

        1
      )


    const progress =
      progressRef.current


    // =========================================
    // POUR STREAM
    // =========================================

    pourLiquid.visible =
      true


    pourLiquid.scale.y =
      Math.min(
        pourLiquid.scale.y +
          delta * pourSpeed,

        pourScaleY
      )


    // =========================================
    // STREAM REACHED FINAL Y SCALE
    // =========================================

    if (
      pourLiquid.scale.y >=
        pourScaleY &&
      !isPourFullyScaled
    ) {
      setIsPourFullyScaled(
        true
      )


      if (
        !otherModelRef &&
        !fillTestubeLiquid
      ) {
        setFillTestubeLiquid(
          true
        )
      }
    }


    // =========================================
    // CYLINDER LIQUID DECREASE
    // =========================================

    cylinderLiquid.scale.y =
      Math.max(
        cylinderStartScaleRef.current *
          (1 - progress),

        0
      )


    // =========================================
    // RECEIVER LIQUID INCREASE
    // =========================================

    if (
      otherModelRef?.current &&
      otherModelLiquidRef.current
    ) {
      const otherLiquid =
        otherModelLiquidRef.current


      otherLiquid.visible =
        true


      otherLiquid.scale.y =
        otherModelStartScaleRef.current +
        otherModelAmount *
          progress


      if (
        otherModelRef.current ===
          conicalBeakerRef02?.current &&
        conicalUpperLiquidRef.current
      ) {
        conicalUpperLiquidRef.current.visible =
          true
      }
    }


    // =========================================
    // POUR FINISHED
    // =========================================

    if (
      progress >= 1
    ) {
      cylinderLiquid.scale.y =
        0


      cylinderLiquid.visible =
        false


      pourLiquid.visible =
        false


      pourLiquid.scale.y =
        0


      // =========================================
      // RECEIVER FINAL AMOUNT
      // =========================================

      if (
        otherModelRef?.current &&
        otherModelLiquidRef.current
      ) {
        otherModelLiquidRef.current.visible =
          true


        otherModelLiquidRef.current.scale.y =
          otherModelStartScaleRef.current +
          otherModelAmount
      }


      // =========================================
      // KEEP UPPER CONICAL LIQUID VISIBLE
      // =========================================

      if (
        otherModelRef?.current ===
          conicalBeakerRef02?.current &&
        conicalUpperLiquidRef.current
      ) {
        conicalUpperLiquidRef.current.visible =
          true
      }


      // =========================================
      // FINISH LOGIC
      // =========================================

      if (
        !isPourFinishedRef.current
      ) {
        isPourFinishedRef.current =
          true


        if (
          selectedLesson === 13 &&
          lessonStep === 3.5
        ) {
          setLessonStep(
            3.6
          )
        }


        if (
          selectedLesson === 14 &&
          lessonStep === 13
        ) {
          setLessonStep(
            14
          )
        }


        if (
          selectedLesson === 14 &&
          lessonStep === 8
        ) {
          setLessonStep(
            9
          )
        }


        if (
          selectedLesson === 10 &&
          lessonStep === 23
        ) {
          setLessonStep(
            24
          )
        }


        if (
          selectedLesson === 10 &&
          lessonStep === 30
        ) {
          setLessonStep(
            31
          )
        }


        if (
          selectedLesson === 10 &&
          lessonStep === 37
        ) {
          setLessonStep(
            38
          )
        }
      }
    }
  })


  // =============================================
  // OLD FillLiquidBeaker SYSTEM
  // ONLY WHEN otherModelRef IS NOT PROVIDED
  // =============================================

  const canFillTestTube =
    fillTestubeLiquid &&
    isPouring &&
    isPourFullyScaled


  return (
    <>
      {!otherModelRef && (
        <>
          {selectedLeftHand?.name ===
            "main-testube-01" &&
            canFillTestTube && (
              <FillLiquidBeaker
                modelRef={
                  testube01Ref
                }
                amount={20}
                color="#f3f4f6"
                isPouring={
                  canFillTestTube
                }
              />
            )}


          {selectedLeftHand?.name ===
            "main-testube-02" &&
            canFillTestTube && (
              <FillLiquidBeaker
                modelRef={
                  testube02Ref
                }
                amount={50}
                color="#f3f4f6"
                isPouring={
                  canFillTestTube
                }
              />
            )}


          {selectedLeftHand?.name ===
            "main-testube-03" &&
            canFillTestTube && (
              <FillLiquidBeaker
                modelRef={
                  testube03Ref
                }
                amount={50}
                color="#f3f4f6"
                isPouring={
                  canFillTestTube
                }
              />
            )}


          {selectedLeftHand?.name ===
            "boiliing-tube-01" &&
            canFillTestTube && (
              <FillLiquidBeaker
                modelRef={
                  boilingTube01Ref
                }
                amount={0.6}
                color="#f3f4f6"
                isPouring={
                  canFillTestTube
                }
              />
            )}
        </>
      )}
    </>
  )
}

export default PourFromGraduatedCylinder