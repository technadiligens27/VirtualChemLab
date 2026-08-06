import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const ClampBurette = () => {
  const {
    buretteClampRef,
    mainBuiretteRef,
  } = useContext(ModelContext)

  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const originalTransformRef = useRef(null)

  useEffect(() => {
    if (
      selectedLesson === 8 &&
      lessonStep === 24
    ) {
      setLessonStep(25)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

    useEffect(() => {
    if (
      selectedLesson === 9 &&
      lessonStep === 21
    ) {
      setLessonStep(22)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  useEffect(() => {
    const clamp = buretteClampRef?.current
    const burette = mainBuiretteRef?.current

    if (!clamp || !burette) {
      console.log(
        "Clamp or burette was not found"
      )
      return
    }

    let clampPosition = null

    clamp.traverse((child) => {
      if (
        !clampPosition &&
        child.name
          ?.toLowerCase()
          .includes("clamp-position")
      ) {
        clampPosition = child
      }
    })

    if (!clampPosition) {
      console.log(
        "Clamp Position was not found"
      )
      return
    }

    if (!originalTransformRef.current) {
      originalTransformRef.current = {
        parent: burette.parent,
        position: burette.position.clone(),
        rotation: burette.rotation.clone(),
        scale: burette.scale.clone(),
      }
    }

    // Remove burette from camera/old parent
    // and attach it to clamp marker
    clampPosition.add(burette)

    // Position relative to clamp marker
    burette.position.set(0.5, 1, 0)
    burette.rotation.set(0, 0, 0)
    burette.scale.set(1, 0.8, 0.8)

    burette.updateMatrixWorld(true)

    console.log(
      "Burette attached to clamp successfully"
    )

    return () => {
      const original =
        originalTransformRef.current

      if (!original || !burette) return

      if (original.parent) {
        original.parent.add(burette)
      }

      burette.position.copy(
        original.position
      )

      burette.rotation.copy(
        original.rotation
      )

      burette.scale.copy(
        original.scale
      )

      burette.updateMatrixWorld(true)

      console.log(
        "Burette returned to original position"
      )
    }
  }, [
    buretteClampRef,
    mainBuiretteRef,
  ])

  return null
}

export default ClampBurette