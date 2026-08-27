import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { MainGuidelineContext } from "../../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PourFromBeaker = ({
  modelRef,
  otherModelRef,
  isPouring,

  pourAmount = 10,
  liquidAmount = 0.8,

  pourSpeed = 0.5,

  // Controls only how fast
  // the visible pour stream scales up
  pourScaleSpeed = 5,

  otherLiquidColor = "#030a0b",
  otherLiquidOpacity = 0.35,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const pourRef =
    useRef(null)

  const liquidRef =
    useRef(null)

  const otherLiquidRef =
    useRef(null)

  const sourceStartScaleRef =
    useRef(0)

  const otherStartScaleRef =
    useRef(0)

  const progressRef =
    useRef(0)

  const isFinishedRef =
    useRef(false)

  const hasSourceLiquidRef =
    useRef(false)

  // =========================================================
  // FIND LIQUIDS
  // =========================================================

  useEffect(() => {
    if (
      !modelRef?.current ||
      !otherModelRef?.current
    ) {
      return
    }

    pourRef.current = null
    liquidRef.current = null
    otherLiquidRef.current = null

    // =======================================================
    // SOURCE POUR + SOURCE LIQUID
    // =======================================================

    modelRef.current.traverse(
      (child) => {
        if (!child.isMesh) return

        const childName =
          child.name?.toLowerCase() || ""

        if (
          childName.includes("pour") &&
          !pourRef.current
        ) {
          pourRef.current = child
        }

        if (
          childName.includes("liquid") &&
          !childName.includes("pour") &&
          !liquidRef.current
        ) {
          liquidRef.current = child
        }
      }
    )

    // =======================================================
    // RECEIVER LIQUID
    // =======================================================

    otherModelRef.current.traverse(
      (child) => {
        if (!child.isMesh) return

        const childName =
          child.name?.toLowerCase() || ""

        if (
          childName.includes("liquid") &&
          !childName.includes("pour") &&
          !otherLiquidRef.current
        ) {
          otherLiquidRef.current = child
        }
      }
    )

    console.log(
      "SOURCE LIQUID:",
      liquidRef.current?.name
    )

    console.log(
      "POUR:",
      pourRef.current?.name
    )

    console.log(
      "RECEIVER LIQUID:",
      otherLiquidRef.current?.name
    )

    // =======================================================
    // COPY SOURCE MATERIAL TO POUR STREAM
    // =======================================================

    if (
      pourRef.current &&
      liquidRef.current
    ) {
      if (
        Array.isArray(
          liquidRef.current.material
        )
      ) {
        pourRef.current.material =
          liquidRef.current.material.map(
            (material) =>
              material.clone()
          )
      } else if (
        liquidRef.current.material
      ) {
        pourRef.current.material =
          liquidRef.current.material.clone()
      }

      if (
        Array.isArray(
          pourRef.current.material
        )
      ) {
        pourRef.current.material.forEach(
          (material) => {
            material.needsUpdate = true
          }
        )
      } else if (
        pourRef.current.material
      ) {
        pourRef.current.material.needsUpdate =
          true
      }

      pourRef.current.scale.y = 0
      pourRef.current.visible = false
    }

    // =======================================================
    // RECEIVER LIQUID MATERIAL
    // =======================================================

    if (
      otherLiquidRef.current
    ) {
      const otherLiquid =
        otherLiquidRef.current

      const prepareOtherMaterial = (
        material
      ) => {
        if (!material) {
          return material
        }

        const cloned =
          material.clone()

        cloned.color?.set(
          otherLiquidColor
        )

        cloned.transparent =
          true

        cloned.opacity =
          otherLiquidOpacity

        cloned.depthWrite =
          false

        cloned.needsUpdate =
          true

        return cloned
      }

      if (
        Array.isArray(
          otherLiquid.material
        )
      ) {
        otherLiquid.material =
          otherLiquid.material.map(
            prepareOtherMaterial
          )
      } else if (
        otherLiquid.material
      ) {
        otherLiquid.material =
          prepareOtherMaterial(
            otherLiquid.material
          )
      }
    }

    // =======================================================
    // RESET
    // =======================================================

    progressRef.current = 0
    isFinishedRef.current = false

    hasSourceLiquidRef.current =
      false
  }, [
    modelRef,
    otherModelRef,
    otherLiquidColor,
    otherLiquidOpacity,
  ])

  // =========================================================
  // POUR MODE START / STOP
  // =========================================================

  useEffect(() => {
    if (
      !pourRef.current ||
      !liquidRef.current ||
      !otherLiquidRef.current
    ) {
      return
    }

    if (isPouring) {
      sourceStartScaleRef.current =
        liquidRef.current.scale.y

      otherStartScaleRef.current =
        otherLiquidRef.current.scale.y

      hasSourceLiquidRef.current =
        liquidRef.current.scale.y > 0

      if (
        !hasSourceLiquidRef.current
      ) {
        pourRef.current.scale.y = 0
        pourRef.current.visible = false

        console.log(
          "Cannot pour: source liquid is empty"
        )

        return
      }

      progressRef.current = 0
      isFinishedRef.current = false

      pourRef.current.scale.y = 0
      pourRef.current.visible = true

      liquidRef.current.visible = true

      otherLiquidRef.current.visible =
        true
    } else {
      pourRef.current.scale.y = 0
      pourRef.current.visible = false

      progressRef.current = 0
      isFinishedRef.current = false

      hasSourceLiquidRef.current =
        false
    }

    pourRef.current.updateMatrixWorld(
      true
    )
  }, [
    isPouring,
  ])

  // =========================================================
  // POUR ANIMATION
  // =========================================================

  useFrame((_, delta) => {
    if (!isPouring) return

    if (
      !hasSourceLiquidRef.current
    ) {
      return
    }

    if (
      !pourRef.current ||
      !liquidRef.current ||
      !otherLiquidRef.current
    ) {
      return
    }

    if (
      isFinishedRef.current
    ) {
      return
    }

    // =======================================================
    // SOURCE EMPTY
    // =======================================================

    if (
      liquidRef.current.scale.y <= 0
    ) {
      liquidRef.current.scale.y = 0

      liquidRef.current.visible =
        false

      pourRef.current.scale.y = 0

      pourRef.current.visible =
        false

      hasSourceLiquidRef.current =
        false

      isFinishedRef.current =
        true

      console.log(
        "Pour stopped: source liquid empty"
      )

      return
    }

    // =======================================================
    // PROGRESS
    // =======================================================

    progressRef.current =
      Math.min(
        progressRef.current +
          pourSpeed * delta,
        1
      )

    const progress =
      progressRef.current

    // =======================================================
    // POUR STREAM
    // =======================================================

    pourRef.current.visible =
      true

    const pourScaleProgress =
      Math.min(
        progress *
          pourScaleSpeed,
        1
      )

    pourRef.current.scale.y =
      pourAmount *
      pourScaleProgress

    // =======================================================
    // SOURCE LIQUID DECREASE
    // =======================================================

    liquidRef.current.scale.y =
      sourceStartScaleRef.current *
      (1 - progress)

    // =======================================================
    // RECEIVER LIQUID INCREASE
    // =======================================================

    otherLiquidRef.current.scale.y =
      otherStartScaleRef.current +
      liquidAmount * progress

    // =======================================================
    // KEEP RECEIVER COLOR / OPACITY
    // =======================================================

    const otherLiquid =
      otherLiquidRef.current

    if (
      Array.isArray(
        otherLiquid.material
      )
    ) {
      otherLiquid.material.forEach(
        (material) => {
          material.color?.set(
            otherLiquidColor
          )

          material.transparent =
            true

          material.opacity =
            otherLiquidOpacity

          material.depthWrite =
            false

          material.needsUpdate =
            true
        }
      )
    } else if (
      otherLiquid.material
    ) {
      otherLiquid.material.color?.set(
        otherLiquidColor
      )

      otherLiquid.material.transparent =
        true

      otherLiquid.material.opacity =
        otherLiquidOpacity

      otherLiquid.material.depthWrite =
        false

      otherLiquid.material.needsUpdate =
        true
    }

    // =======================================================
    // FINISH
    // =======================================================

    if (
      progress >= 1
    ) {
      liquidRef.current.scale.y =
        0

      liquidRef.current.visible =
        false

      otherLiquidRef.current.scale.y =
        otherStartScaleRef.current +
        liquidAmount

      pourRef.current.scale.y =
        0

      pourRef.current.visible =
        false

      hasSourceLiquidRef.current =
        false

      isFinishedRef.current =
        true

      console.log(
        "Beaker pouring finished"
      )

      if (
        selectedLesson === 11 &&
        lessonStep === 21
      ) {
        setLessonStep(22)
      }

      if (
        selectedLesson === 12.1 &&
        lessonStep === 28
      ) {
        setLessonStep(29)
      }

      if (
        selectedLesson === 12.1 &&
        lessonStep === 34
      ) {
        setLessonStep(35)
      }

      if (
        selectedLesson === 12.1 &&
        lessonStep === 40
      ) {
        setLessonStep(41)
      }
    }

    liquidRef.current.updateMatrixWorld(
      true
    )

    otherLiquidRef.current.updateMatrixWorld(
      true
    )

    pourRef.current.updateMatrixWorld(
      true
    )
  })

  return null
}

export default PourFromBeaker