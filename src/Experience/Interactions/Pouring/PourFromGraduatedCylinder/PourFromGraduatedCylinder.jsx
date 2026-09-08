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

  speed = 1, // liquid transfer speed
  pourSpeed = 200, // pour stream speed
  fallDistance = 55, // pour stream length

  otherModelRef = null, // custom receiver model
  otherModelAmount = 0.6, // receiver liquid amount

  otherModelColor = "#f3f4f6", // receiver liquid color
  otherModelOpacity = 0.6, // receiver liquid opacity
}) => {
  const {
    graduatedBeakerRef,

    testube01Ref,
    testube02Ref,
    testube03Ref,

    boilingTube01Ref,
  } = useContext(
    ModelContext
  )

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
  // + POUR FLUID
  // =============================================

  useEffect(() => {
    const cylinder =
      graduatedBeakerRef?.current

    if (!cylinder) return

    cylinder.traverse(
      (child) => {
        const childName =
          child.name?.toLowerCase() ||
          ""

        // =========================================
        // FIND POUR STREAM
        // =========================================

        if (
          child.isMesh &&
          childName.includes(
            "pour-fluid"
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
        }

        // =========================================
        // FIND CYLINDER LIQUID
        // =========================================

        if (
          child.isMesh &&
          childName.includes(
            "liquid"
          ) &&
          !childName.includes(
            "pour-fluid"
          )
        ) {
          cylinderLiquidRef.current =
            child
        }
      }
    )

    return () => {
      if (
        pourLiquidRef.current
      ) {
        pourLiquidRef.current.visible =
          false

        pourLiquidRef.current.scale.y =
          0
      }
    }
  }, [
    graduatedBeakerRef,
  ])

  // =============================================
  // FIND LIQUID INSIDE CUSTOM RECEIVER
  // =============================================

  useEffect(() => {
    if (
      !otherModelRef?.current
    ) {
      otherModelLiquidRef.current =
        null

      return
    }

    const otherModel =
      otherModelRef.current

    otherModelLiquidRef.current =
      null

    otherModel.traverse(
      (child) => {
        if (
          otherModelLiquidRef.current
        ) {
          return
        }

        const childName =
          child.name?.toLowerCase() ||
          ""

        if (
          child.isMesh &&
          childName.includes(
            "liquid"
          )
        ) {
          otherModelLiquidRef.current =
            child

          // =======================================
          // CUSTOM RECEIVER MATERIAL
          // =======================================

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

          if (
            Array.isArray(
              child.material
            )
          ) {
            child.material =
              child.material.map(
                updateMaterial
              )
          } else if (
            child.material
          ) {
            child.material =
              updateMaterial(
                child.material
              )
          }
        }
      }
    )
  }, [
    otherModelRef,
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
    // SAVE CYLINDER START SCALE
    // =========================================

    if (
      cylinderLiquidRef.current
    ) {
      cylinderStartScaleRef.current =
        cylinderLiquidRef.current.scale.y
    }

    // =========================================
    // SAVE RECEIVER START SCALE
    // =========================================

    if (
      otherModelRef?.current &&
      otherModelLiquidRef.current
    ) {
      otherModelStartScaleRef.current =
        otherModelLiquidRef.current.scale.y

      otherModelLiquidRef.current.visible =
        true
    }
  }, [
    isPouring,
    otherModelRef,
  ])

  // =============================================
  // POUR ANIMATION
  // =============================================

  useFrame(
    (
      _,
      delta
    ) => {
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

      if (
        !isPouring
      ) {
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
            delta *
              speed,
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
            delta *
              pourSpeed,
          fallDistance
        )

      // =========================================
      // STREAM REACHED RECEIVER
      // =========================================

      if (
        pourLiquid.scale.y >=
          fallDistance &&
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
            (
              1 -
              progress
            ),
          0
        )

      // =========================================
      // CUSTOM RECEIVER LIQUID INCREASE
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

        // =======================================
        // CUSTOM RECEIVER FINAL VALUE
        // =======================================

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

        // =======================================
        // RUN FINISH LOGIC ONCE
        // =======================================

        if (
          !isPourFinishedRef.current
        ) {
          isPourFinishedRef.current =
            true

          console.log(
            "Graduated cylinder pouring finished"
          )

          if (
            selectedLesson ===
              13 &&
            lessonStep ===
              3.5
          ) {
            setLessonStep(
              3.6
            )
          }

          if (
            selectedLesson ===
              10 &&
            lessonStep ===
              23
          ) {
            setLessonStep(
              24
            )
          }

          if (
            selectedLesson ===
              10 &&
            lessonStep ===
              30
          ) {
            setLessonStep(
              31
            )
          }

          if (
            selectedLesson ===
              10 &&
            lessonStep ===
              37
          ) {
            setLessonStep(
              38
            )
          }
        }
      }
    }
  )

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