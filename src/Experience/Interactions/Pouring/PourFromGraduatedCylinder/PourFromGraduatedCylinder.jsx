import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

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
  pourSpeed = 5,

  // Final Y scale of the pouring stream.
  pourScaleY = 1,

  otherModelRef = null,

  // Final Y scale of the receiver liquid.
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
  } = useContext(InteractionContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  // =============================================
  // OBJECT REFS
  // =============================================

  const pourLiquidRef = useRef(null)
  const cylinderLiquidRef = useRef(null)
  const otherModelLiquidRef = useRef(null)
  const conicalUpperLiquidRef = useRef(null)

  // =============================================
  // SCALE / PROGRESS REFS
  // =============================================

  const cylinderStartScaleRef = useRef(0)
  const otherModelStartScaleRef = useRef(0)

  const progressRef = useRef(0)

  const hasStartedPourRef = useRef(false)
  const isPourFinishedRef = useRef(false)

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

    if (!cylinder) {
      return
    }

    cylinder.traverse((child) => {
      if (!child.isMesh) {
        return
      }

      const childName =
        child.name?.toLowerCase() || ""

      if (childName.includes("pour")) {
        pourLiquidRef.current = child

        child.visible = false

        child.scale.set(
          child.scale.x,
          0,
          child.scale.z
        )

        return
      }

      if (childName.includes("liquid")) {
        cylinderLiquidRef.current = child
      }
    })

    return () => {
      if (!pourLiquidRef.current) {
        return
      }

      pourLiquidRef.current.visible = false
      pourLiquidRef.current.scale.y = 0
    }
  }, [graduatedBeakerRef])

  // =============================================
  // FIND AND STYLE RECEIVER LIQUID
  // =============================================

  useEffect(() => {
    if (!otherModelRef?.current) {
      otherModelLiquidRef.current = null
      conicalUpperLiquidRef.current = null

      return
    }

    const otherModel = otherModelRef.current

    const isConicalFlask02 =
      otherModel ===
      conicalBeakerRef02?.current

    otherModelLiquidRef.current = null
    conicalUpperLiquidRef.current = null

    otherModel.traverse((child) => {
      if (!child.isMesh) {
        return
      }

      const childName =
        child.name?.trim().toLowerCase() || ""

      const isUpperLiquid =
        childName ===
        "conical-flask-02-liquid-upper"

      const isBottomLiquid =
        childName ===
        "conical-flask-02-liquid-bottom"

      if (isConicalFlask02) {
        if (isUpperLiquid) {
          conicalUpperLiquidRef.current =
            child
        }

        if (isBottomLiquid) {
          otherModelLiquidRef.current =
            child
        }

        return
      }

      if (
        !otherModelLiquidRef.current &&
        childName.includes("liquid")
      ) {
        otherModelLiquidRef.current = child
      }
    })

    const updateMaterial = (material) => {
      if (!material) {
        return material
      }

      const clonedMaterial = material.clone()

      clonedMaterial.color?.set(
        otherModelColor
      )

      clonedMaterial.transparent = true
      clonedMaterial.opacity =
        otherModelOpacity

      clonedMaterial.depthWrite = false

      if ("roughness" in clonedMaterial) {
        clonedMaterial.roughness = 0.1
      }

      if ("metalness" in clonedMaterial) {
        clonedMaterial.metalness = 0
      }

      clonedMaterial.needsUpdate = true

      return clonedMaterial
    }

    const updateLiquidMaterials = (
      liquid
    ) => {
      if (!liquid) {
        return
      }

      if (Array.isArray(liquid.material)) {
        liquid.material =
          liquid.material.map(updateMaterial)

        return
      }

      liquid.material = updateMaterial(
        liquid.material
      )
    }

    updateLiquidMaterials(
      otherModelLiquidRef.current
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
  // START / RESUME POUR
  // =============================================

  useEffect(() => {
    if (!isPouring) {
      return
    }

    /*
     * Save start values only once.
     * Scrolling up and then down again will
     * continue from the current progress.
     */
    if (!hasStartedPourRef.current) {
      hasStartedPourRef.current = true

      progressRef.current = 0
      isPourFinishedRef.current = false

      setIsPourFullyScaled(false)

      if (cylinderLiquidRef.current) {
        cylinderStartScaleRef.current =
          cylinderLiquidRef.current.scale.y
      }

      if (
        otherModelRef?.current &&
        otherModelLiquidRef.current
      ) {
        otherModelStartScaleRef.current =
          otherModelLiquidRef.current.scale.y

        otherModelLiquidRef.current.visible =
          true
      }

      if (
        otherModelRef?.current ===
          conicalBeakerRef02?.current &&
        conicalUpperLiquidRef.current
      ) {
        conicalUpperLiquidRef.current.visible =
          true
      }
    }

    /*
     * Only restart the stream visual.
     * Do not reset progress or liquid levels.
     */
    if (pourLiquidRef.current) {
      pourLiquidRef.current.scale.y = 0
      pourLiquidRef.current.visible = true
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
    const pourLiquid = pourLiquidRef.current
    const cylinderLiquid =
      cylinderLiquidRef.current

    if (!pourLiquid || !cylinderLiquid) {
      return
    }

    // ===========================================
    // NOT POURING
    // ===========================================

    if (!isPouring) {
      pourLiquid.visible = false
      pourLiquid.scale.y = 0

      if (isPourFullyScaled) {
        setIsPourFullyScaled(false)
      }

      return
    }

    // ===========================================
    // ALREADY FINISHED
    // ===========================================

    if (isPourFinishedRef.current) {
      pourLiquid.visible = false
      pourLiquid.scale.y = 0

      return
    }

    // ===========================================
    // TRANSFER PROGRESS
    // ===========================================

    progressRef.current = Math.min(
      progressRef.current + delta * speed,
      1
    )

    const progress = progressRef.current

    // ===========================================
    // POUR STREAM
    // ===========================================

    pourLiquid.visible = true

    pourLiquid.scale.y = Math.min(
      pourLiquid.scale.y + delta * pourSpeed,
      pourScaleY
    )

    if (
      pourLiquid.scale.y >= pourScaleY &&
      !isPourFullyScaled
    ) {
      setIsPourFullyScaled(true)

      if (
        !otherModelRef &&
        !fillTestubeLiquid
      ) {
        setFillTestubeLiquid(true)
      }
    }

    // ===========================================
    // CYLINDER LIQUID DECREASE
    // ===========================================

    cylinderLiquid.scale.y = Math.max(
      cylinderStartScaleRef.current *
        (1 - progress),
      0
    )

    // ===========================================
    // RECEIVER LIQUID INCREASE
    // ===========================================

    if (
      otherModelRef?.current &&
      otherModelLiquidRef.current
    ) {
      const otherLiquid =
        otherModelLiquidRef.current

      otherLiquid.visible = true

      /*
       * otherModelAmount is the final scale.
       * It does not add again when pouring resumes.
       */
      otherLiquid.scale.y =
        otherModelStartScaleRef.current +
        (
          otherModelAmount -
          otherModelStartScaleRef.current
        ) *
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

    // ===========================================
    // POUR FINISHED
    // ===========================================

    if (progress < 1) {
      return
    }

    cylinderLiquid.scale.y = 0
    cylinderLiquid.visible = false

    pourLiquid.visible = false
    pourLiquid.scale.y = 0

    if (
      otherModelRef?.current &&
      otherModelLiquidRef.current
    ) {
      otherModelLiquidRef.current.visible =
        true

      // Always use the parameter as final scale.
      otherModelLiquidRef.current.scale.y =
        otherModelAmount
    }

    if (
      otherModelRef?.current ===
        conicalBeakerRef02?.current &&
      conicalUpperLiquidRef.current
    ) {
      conicalUpperLiquidRef.current.visible =
        true
    }

    if (isPourFinishedRef.current) {
      return
    }

    isPourFinishedRef.current = true

    if (
      selectedLesson === 13 &&
      lessonStep === 3.5
    ) {
      setLessonStep(3.6)
    }

    if (
      selectedLesson === 14 &&
      lessonStep === 13
    ) {
      setLessonStep(14)
    }

    if (
      selectedLesson === 14 &&
      lessonStep === 8
    ) {
      setLessonStep(9)
    }

    if (
      selectedLesson === 10 &&
      lessonStep === 23
    ) {
      setLessonStep(24)
    }

    if (
      selectedLesson === 10 &&
      lessonStep === 30
    ) {
      setLessonStep(31)
    }

    if (
      selectedLesson === 10 &&
      lessonStep === 37
    ) {
      setLessonStep(38)
    }
  })

  // =============================================
  // OLD FILL LIQUID SYSTEM
  // Only used when no otherModelRef exists.
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
                modelRef={testube01Ref}
                amount={20}
                color="#f3f4f6"
                isPouring={canFillTestTube}
              />
            )}

          {selectedLeftHand?.name ===
            "main-testube-02" &&
            canFillTestTube && (
              <FillLiquidBeaker
                modelRef={testube02Ref}
                amount={50}
                color="#f3f4f6"
                isPouring={canFillTestTube}
              />
            )}

          {selectedLeftHand?.name ===
            "main-testube-03" &&
            canFillTestTube && (
              <FillLiquidBeaker
                modelRef={testube03Ref}
                amount={50}
                color="#f3f4f6"
                isPouring={canFillTestTube}
              />
            )}

          {selectedLeftHand?.name ===
            "boiliing-tube-01" &&
            canFillTestTube && (
              <FillLiquidBeaker
                modelRef={boilingTube01Ref}
                amount={0.6}
                color="#f3f4f6"
                isPouring={canFillTestTube}
              />
            )}
        </>
      )}
    </>
  )
}

export default PourFromGraduatedCylinder