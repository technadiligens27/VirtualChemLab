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

import FillVolumetricPipette from "../FillVolumetricPipette/FillVolumetricPipette"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import PourVolumetricPipette from "../PourVolumetricPipette/PourVolumetricPipette"

const VolumetricRubberAnimation = ({
  modelRef,
  fillerScaleSpeed = 0.1,
  fillerMinScaleX = 0.45,
}) => {
  const fillerRef = useRef(null)

  const originalFillerScaleXRef =
    useRef(null)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const {
    isVolumetricPipetteMode,
    isVolumetricPipetteFilled,
    fillVolumetricPipette,
    setFillVolumetricPipette,
    pourFromVolumetricPipette,
    setPourFromVolumetricPipette,
    selectedRightHand,
  } = useContext(
    InteractionContext
  )

  const {
    normalBeakerRef,
    volumetricRef,
    conicalBeakerRef,
    naohBottleRef,
  } = useContext(ModelContext)

  // =========================================
  // ONLY ALLOW SCROLL AT THESE STEPS
  // =========================================

  // Scroll down = squeeze filler.
  const canScrollDown =
    (selectedLesson === 11 &&
      [7, 14, 35, 42].includes(
        lessonStep
      )) ||
    (selectedLesson === 12.2 &&
      [67, 91,74,98].includes(
        lessonStep
      ))

  // Scroll up = release filler.
  const canScrollUp =
    (selectedLesson === 11 &&
      [9,37].includes(lessonStep)) ||
    (selectedLesson === 12.2 &&
      [69,93].includes(lessonStep))

  // =========================================
  // FIND FILLER CHILD
  // =========================================

  useEffect(() => {
  const shouldResetFiller =
    (selectedLesson === 11 && [15].includes(lessonStep))    

  if ( !shouldResetFiller || !fillerRef.current || originalFillerScaleXRef.current === null ) {
    return
  }

  fillerRef.current.scale.x =
    originalFillerScaleXRef.current

  fillerRef.current.updateMatrixWorld(
    true
  )

  console.log(
    "Filler reset to normal scale"
  )
}, [
  selectedLesson,
  lessonStep,
])

  useEffect(() => {
    const model = modelRef?.current

    if (!model) {
      return
    }

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (childName.includes("filler")) {
        fillerRef.current = child

        originalFillerScaleXRef.current =
          child.scale.x

        console.log(
          "Filler found:",
          child
        )
      }
    })

    if (!fillerRef.current) {
      console.log("Filler child not found")
    }

    return () => {
      if (
        !fillerRef.current ||
        originalFillerScaleXRef.current ===
          null
      ) {
        return
      }

      fillerRef.current.scale.x =
        originalFillerScaleXRef.current

      fillerRef.current.updateMatrixWorld(
        true
      )
    }
  }, [modelRef])

  // =========================================
  // CONTROL FILLER SCALE
  // =========================================

  const controlFillerScale = (
    direction
  ) => {
    if (!fillerRef.current) {
      return
    }

    if (
      originalFillerScaleXRef.current ===
      null
    ) {
      return
    }

    const filler = fillerRef.current

    const originalScaleX =
      originalFillerScaleXRef.current

    // =======================================
    // SQUEEZE FILLER
    // =======================================

    if (direction === "down") {
      const previousScaleX = filler.scale.x

      filler.scale.x = Math.max(
        filler.scale.x - fillerScaleSpeed,
        fillerMinScaleX
      )

      const fullyPressed =
        previousScaleX > fillerMinScaleX &&
        filler.scale.x === fillerMinScaleX

      if (fullyPressed) {
        console.log(
          "Filler fully pressed down"
        )

        if (
          selectedLesson === 11 &&
          lessonStep === 7
        ) {
          setLessonStep(8)
        }

        if (
          selectedLesson === 11 &&
          lessonStep === 35
        ) {
          setLessonStep(36)
        }

        if (
          selectedLesson === 11 &&
          lessonStep === 42
        ) {
          setLessonStep(43)
        }

        if (
          selectedLesson === 12.2 &&
          lessonStep === 67
        ) {
          setLessonStep(68)
        }

        if (
          selectedLesson === 12.2 &&
          lessonStep === 91
        ) {
          setLessonStep(92)
        }

        if (isVolumetricPipetteFilled) {
          setPourFromVolumetricPipette(
            true
          )
        }
      }
    }

    // =======================================
    // RELEASE FILLER
    // =======================================

    if (direction === "up") {
      const previousScaleX = filler.scale.x

      filler.scale.x = Math.min(
        filler.scale.x + fillerScaleSpeed,
        originalScaleX
      )

      const fullyReleased =
        previousScaleX < originalScaleX &&
        filler.scale.x === originalScaleX

      if (fullyReleased) {
        console.log("Filler fully released")

        if (
          selectedLesson === 11 &&
          lessonStep === 37
        ) {
          setLessonStep(38)
        }

        if (
          selectedLesson === 12.2 &&
          lessonStep === 69
        ) {
          setLessonStep(70)
        }

        if (
          isVolumetricPipetteMode &&
          !fillVolumetricPipette
        ) {
          setFillVolumetricPipette(true)
        }
      }
    }

    filler.updateMatrixWorld(true)
  }

  // =========================================
  // MOUSE WHEEL
  // =========================================

  useEffect(() => {
    const handleWheel = (event) => {
      // Scroll down — only squeeze at allowed steps.
      if (event.deltaY > 0) {
        if (!canScrollDown) {
          return
        }

        controlFillerScale("down")
      }

      // Scroll up — only release at allowed steps.
      if (event.deltaY < 0) {
        if (!canScrollUp) {
          return
        }

        controlFillerScale("up")
      }
    }

    window.addEventListener(
      "wheel",
      handleWheel
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [
    fillerScaleSpeed,
    fillerMinScaleX,
    lessonStep,
    selectedLesson,
    isVolumetricPipetteMode,
    isVolumetricPipetteFilled,
    pourFromVolumetricPipette,
    canScrollDown,
    canScrollUp,
  ])

  return (
    <>
      {fillVolumetricPipette &&
        isVolumetricPipetteMode &&
        selectedRightHand?.name ===
          "main-normal-beaker" && (
          <FillVolumetricPipette
            modelRef={modelRef}
            otherModelRef={normalBeakerRef}
          />
        )}

      {[11.1, 11].includes(
        selectedLesson
      ) &&
        selectedRightHand?.name ===
          "volumetric-flask" &&
        fillVolumetricPipette &&
        isVolumetricPipetteMode && (
          <FillVolumetricPipette
            modelRef={modelRef}
            otherModelRef={volumetricRef}
            decreaseAmount={0.7}
          />
        )}

      {[12, 12.1, 12.2].includes(
        selectedLesson
      ) &&
        selectedRightHand?.name ===
          "volumetric-flask" &&
        fillVolumetricPipette &&
        isVolumetricPipetteMode && (
          <FillVolumetricPipette
            modelRef={modelRef}
            otherModelRef={volumetricRef}
          />
        )}

      {selectedRightHand?.name ===
        "main-Conical-Flask" &&
        fillVolumetricPipette &&
        isVolumetricPipetteMode && (
          <FillVolumetricPipette
            modelRef={modelRef}
            otherModelRef={conicalBeakerRef}
          />
        )}

      {selectedRightHand?.name ===
        "NaOH-bottle" &&
        fillVolumetricPipette &&
        isVolumetricPipetteMode && (
          <FillVolumetricPipette
            decreaseAmount={0.7}
            modelRef={modelRef}
            otherModelRef={naohBottleRef}
          />
        )}

      {selectedRightHand?.name ===
        "volumetric-flask" &&
        pourFromVolumetricPipette &&
        isVolumetricPipetteMode && (
          <PourVolumetricPipette
            modelRef={modelRef}
            otherModelRef={volumetricRef}
            pourScaleAmount={2}
          />
        )}

      {[11.1, 11].includes(
        selectedLesson
      ) &&
        selectedRightHand?.name ===
          "main-Conical-Flask" &&
        pourFromVolumetricPipette &&
        isVolumetricPipetteMode && (
          <PourVolumetricPipette
            modelRef={modelRef}
            otherModelRef={conicalBeakerRef}
            otherLiquidAmount={0.2}
          />
        )}

      {selectedLesson === 12.2 &&
        selectedRightHand?.name ===
          "main-Conical-Flask" &&
        pourFromVolumetricPipette &&
        isVolumetricPipetteMode && (
          <PourVolumetricPipette
            modelRef={modelRef}
            otherModelRef={conicalBeakerRef}
            otherLiquidAmount={0.2}
          />
        )}
    </>
  )
}

export default VolumetricRubberAnimation