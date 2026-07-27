import {
  useContext,
  useEffect,
  useRef,
} from "react"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PlaceBeakerNearClamp = ({
  beakerRef,
  heightOffset = 0,
  xOffset = 0,
  scaleOffset = 1,
}) => {
  const { buretteClampRef } =
    useContext(ModelContext)

  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const originalDataRef = useRef(null)

  useEffect(() => {
    if (
      lessonStep === 26 &&
      selectedLesson === 8
    ) {
      setLessonStep(27)
    }
  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])

  useEffect(() => {
    const beaker = beakerRef?.current
    const clamp = buretteClampRef?.current

    if (!beaker || !clamp) return

    let clampPosition = null

    clamp.traverse((child) => {
      if (child.name === "clamp-position") {
        clampPosition = child
      }
    })

    if (!clampPosition) {
      console.log(
        "Clamp position was not found"
      )
      return
    }

    originalDataRef.current = {
      parent: beaker.parent,
      position: beaker.position.clone(),
      rotation: beaker.rotation.clone(),
      scale: beaker.scale.clone(),
    }

    const scene = clamp.parent.parent

    const worldPosition =
      new THREE.Vector3()

    clampPosition.getWorldPosition(
      worldPosition
    )

    scene.attach(beaker)

    scene.worldToLocal(worldPosition)

    beaker.position.copy(worldPosition)

    // Move left or right
    beaker.position.x += xOffset

    // Move up or down
    beaker.position.y += heightOffset

    // Change scale
    beaker.scale.setScalar(scaleOffset)

    beaker.updateMatrixWorld(true)

    return () => {
      const original =
        originalDataRef.current

      if (!original) return

      original.parent.add(beaker)

      beaker.position.copy(
        original.position
      )

      beaker.rotation.copy(
        original.rotation
      )

      beaker.scale.copy(
        original.scale
      )

      beaker.updateMatrixWorld(true)
    }
  }, [
    beakerRef,
    buretteClampRef,
    heightOffset,
    xOffset,
    scaleOffset,
  ])

  return null
}

export default PlaceBeakerNearClamp