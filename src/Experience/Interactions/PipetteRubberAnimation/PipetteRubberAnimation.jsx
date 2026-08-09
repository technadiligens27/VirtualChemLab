import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

const PipetteRubberAnimation = ({
  rubberScaleSpeed = 0.1,
  rubberMinScaleX = 0.45,
}) => {
  const { pipetteRef } = useContext(ModelContext)

  const rubberRef = useRef(null)
  const originalRubberScaleXRef = useRef(null)

  useEffect(() => {
    if (!pipetteRef?.current) return

    pipetteRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (childName.includes("rubber")) {
        rubberRef.current = child
        originalRubberScaleXRef.current = child.scale.x
      }
    })

    if (!rubberRef.current) {
      console.log("Rubber child not found")
    }

    return () => {
      if (!rubberRef.current || originalRubberScaleXRef.current === null) return

      rubberRef.current.scale.x = originalRubberScaleXRef.current
      rubberRef.current.updateMatrixWorld(true)
    }
  }, [pipetteRef])

  const controlRubberScale = (direction) => {
    if (!rubberRef.current) return
    if (originalRubberScaleXRef.current === null) return

    const rubber = rubberRef.current
    const originalScaleX = originalRubberScaleXRef.current

    if (direction === "down") {
      rubber.scale.x = Math.max(
        rubber.scale.x - rubberScaleSpeed,
        rubberMinScaleX
      )
    }

    if (direction === "up") {
      rubber.scale.x = Math.min(
        rubber.scale.x + rubberScaleSpeed,
        originalScaleX
      )
    }

    rubber.updateMatrixWorld(true)
  }

  useEffect(() => {
    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        controlRubberScale("down")
      }

      if (event.deltaY < 0) {
        controlRubberScale("up")
      }
    }

    window.addEventListener("wheel", handleWheel)

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [
    rubberScaleSpeed,
    rubberMinScaleX,
  ])

  return null
}

export default PipetteRubberAnimation