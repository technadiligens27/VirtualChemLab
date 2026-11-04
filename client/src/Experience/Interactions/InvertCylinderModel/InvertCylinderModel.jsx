import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const InvertCylinderModel = ({
  cylinderXOffset = 0,
  cylinderYOffset = 3,

  cylinderXScale = 0.6,
  cylinderYScale = 1,
  cylinderScale = 0.8,

  liquidYOffset = 0,

  beakerScale = 0.7,
  beakerXScale = 0.86,
}) => {
  const {
    graduatedCylinder100Ref,
    normalBeakerRef,
  } = useContext(ModelContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const cylinderOriginalRef =
    useRef(null)

  const beakerOriginalRef =
    useRef(null)

  const liquidOriginalRef =
    useRef(null)

  // =============================================
  // LESSON STEP
  // =============================================

  useEffect(() => {
    if (
      selectedLesson === 13 &&
      lessonStep === 11
    ) {
      setLessonStep(12)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  // =============================================
  // POSITION MODELS
  // =============================================

  useLayoutEffect(() => {
    const cylinder =
      graduatedCylinder100Ref?.current

    const beaker =
      normalBeakerRef?.current

    if (
      !cylinder ||
      !beaker
    ) {
      return
    }

    // =============================================
    // FIND STIR POSITION IN BEAKER
    // =============================================

    let stirPosition =
      null

    beaker.traverse(
      (child) => {
        if (stirPosition) {
          return
        }

        const childName =
          child.name
            ?.toLowerCase() ||
          ""

        if (
          childName.includes(
            "stir"
          )
        ) {
          stirPosition =
            child
        }
      }
    )

    if (!stirPosition) {
      console.log(
        "❌ No child containing 'stir' found in normal beaker"
      )

      return
    }

    console.log(
      "✅ Stir position found:",
      stirPosition.name
    )

    // =============================================
    // FIND LIQUID INSIDE CYLINDER
    // =============================================

    let cylinderLiquid =
      null

    cylinder.traverse(
      (child) => {
        if (
          cylinderLiquid
        ) {
          return
        }

        const childName =
          child.name
            ?.toLowerCase() ||
          ""

        if (
          childName.includes(
            "liquid"
          )
        ) {
          cylinderLiquid =
            child
        }
      }
    )

    // =============================================
    // SAVE ORIGINAL CYLINDER STATE
    // =============================================

    cylinderOriginalRef.current = {
      parent:
        cylinder.parent,

      position:
        cylinder.position.clone(),

      quaternion:
        cylinder.quaternion.clone(),

      scale:
        cylinder.scale.clone(),
    }

    // =============================================
    // SAVE ORIGINAL BEAKER STATE
    // =============================================

    beakerOriginalRef.current = {
      parent:
        beaker.parent,

      position:
        beaker.position.clone(),

      quaternion:
        beaker.quaternion.clone(),

      scale:
        beaker.scale.clone(),
    }

    // =============================================
    // SAVE ORIGINAL LIQUID STATE
    // =============================================

    if (
      cylinderLiquid
    ) {
      liquidOriginalRef.current = {
        position:
          cylinderLiquid.position.clone(),

        quaternion:
          cylinderLiquid.quaternion.clone(),

        scale:
          cylinderLiquid.scale.clone(),
      }
    }

    // =============================================
    // SCALE / POSITION NORMAL BEAKER
    // =============================================

    beaker.scale.set(
      beakerXScale,
      beakerScale,
      beakerScale
    )

    beaker.position.x = 0
    beaker.position.y = -0.5

    beaker.updateMatrixWorld(
      true
    )

    // =============================================
    // ATTACH CYLINDER TO STIR POSITION
    // =============================================

    stirPosition.attach(
      cylinder
    )

    // =============================================
    // POSITION CYLINDER
    // =============================================

    cylinder.position.set(
      cylinderXOffset,
      cylinderYOffset,
      0
    )

    // =============================================
    // ROTATE CYLINDER UPSIDE DOWN
    // =============================================

    cylinder.rotation.set(
      0,
      0,
      Math.PI
    )

    // =============================================
    // SCALE CYLINDER
    // =============================================

    cylinder.scale.set(
      cylinderXScale,
      cylinderYScale,
      cylinderScale
    )

    // =============================================
    // MOVE LIQUID Y POSITION
    // =============================================

    if (
      cylinderLiquid
    ) {
      cylinderLiquid.position.y =
        liquidOriginalRef.current.position.y +
        liquidYOffset

      cylinderLiquid.updateMatrixWorld(
        true
      )

      console.log(
        "✅ Cylinder liquid Y offset:",
        liquidYOffset
      )
    }

    cylinder.updateMatrixWorld(
      true
    )

    console.log(
      "✅ Graduated cylinder inverted and moved to stir position"
    )

    // =============================================
    // CLEANUP / UNMOUNT
    // =============================================

    return () => {
      const cylinderOriginal =
        cylinderOriginalRef.current

      const beakerOriginal =
        beakerOriginalRef.current

      const liquidOriginal =
        liquidOriginalRef.current

      // ===========================================
      // RESTORE LIQUID
      // ===========================================

      if (
        cylinderLiquid &&
        liquidOriginal
      ) {
        cylinderLiquid.position.copy(
          liquidOriginal.position
        )

        cylinderLiquid.quaternion.copy(
          liquidOriginal.quaternion
        )

        cylinderLiquid.scale.copy(
          liquidOriginal.scale
        )

        cylinderLiquid.updateMatrixWorld(
          true
        )
      }

      // ===========================================
      // RESTORE CYLINDER
      // ===========================================

      if (
        cylinderOriginal
      ) {
        if (
          cylinderOriginal.parent
        ) {
          cylinderOriginal.parent.add(
            cylinder
          )
        }

        cylinder.position.copy(
          cylinderOriginal.position
        )

        cylinder.quaternion.copy(
          cylinderOriginal.quaternion
        )

        cylinder.scale.copy(
          cylinderOriginal.scale
        )

        cylinder.updateMatrixWorld(
          true
        )
      }

      // ===========================================
      // RESTORE BEAKER
      // ===========================================

      if (
        beakerOriginal
      ) {
        if (
          beakerOriginal.parent
        ) {
          beakerOriginal.parent.add(
            beaker
          )
        }

        beaker.position.copy(
          beakerOriginal.position
        )

        beaker.quaternion.copy(
          beakerOriginal.quaternion
        )

        beaker.scale.copy(
          beakerOriginal.scale
        )

        beaker.updateMatrixWorld(
          true
        )
      }

      console.log(
        "✅ Cylinder, liquid and beaker restored"
      )
    }
  }, [
    graduatedCylinder100Ref,
    normalBeakerRef,

    cylinderXOffset,
    cylinderYOffset,

    cylinderXScale,
    cylinderYScale,
    cylinderScale,

    liquidYOffset,

    beakerScale,
    beakerXScale,
  ])

  return null
}

export default InvertCylinderModel