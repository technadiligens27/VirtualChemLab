import {
  useContext,
  useEffect,
} from "react"

import * as THREE from "three"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  ReactionContext,
} from "../../../Contexts/ReactionContext/ReactionContext"

import ProteinBiuretReaction from
  "../../AllReactions/ProteinBiuretReaction/ProteinBiuretReaction"

const DropperPlaced = ({
  beakerRef,
  hand,

  beakerScale = 1,
  dropperScale = 1,

  // Height above the dropper marker.
  dropperYOffset = 3,
}) => {
  const {
    mainDropperRef,
  } = useContext(ModelContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const {
    isBiuretReaction,
  } = useContext(ReactionContext)

  useEffect(() => {
    if (selectedLesson === 7 &&lessonStep === 8) {
      setLessonStep(9)
    }
    if (selectedLesson === 7 &&lessonStep === 13) {
      setLessonStep(14)
    }
    if(selectedLesson ==14.3 && lessonStep == 117 ){
      setLessonStep(118)
    }
    if(selectedLesson ==14.3 && lessonStep == 123 ){
      setLessonStep(124)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  useEffect(() => {
    const beaker = beakerRef?.current
    const dropper = mainDropperRef?.current

    if (!beaker || !dropper) {
      return
    }

    const originalBeakerPosition =
      beaker.position.clone()

    const originalBeakerScale =
      beaker.scale.clone()

    const originalDropperPosition =
      dropper.position.clone()

    const originalDropperQuaternion =
      dropper.quaternion.clone()

    const originalDropperScale =
      dropper.scale.clone()

    let marker = null

    beaker.position.x = 0

    beaker.scale.set(
      beakerScale,
      beakerScale,
      beakerScale
    )

    dropper.scale.set(
      dropperScale,
      dropperScale,
      dropperScale
    )

    beaker.updateMatrixWorld(true)
    dropper.updateMatrixWorld(true)

    beaker.traverse((child) => {
      if (
        !marker &&
        child.name?.toLowerCase().includes(
          "bottom"
        )
      ) {
        marker = child
      }
    })

    if (!marker) {
      beaker.position.copy(
        originalBeakerPosition
      )

      beaker.scale.copy(
        originalBeakerScale
      )

      dropper.scale.copy(
        originalDropperScale
      )

      beaker.updateMatrixWorld(true)
      dropper.updateMatrixWorld(true)

      return
    }

    const markerWorldPosition =
      new THREE.Vector3()

    const markerWorldQuaternion =
      new THREE.Quaternion()

    marker.getWorldPosition(
      markerWorldPosition
    )

    marker.getWorldQuaternion(
      markerWorldQuaternion
    )

    markerWorldPosition.y +=
      dropperYOffset

    if (dropper.parent) {
      dropper.parent.worldToLocal(
        markerWorldPosition
      )

      const parentWorldQuaternion =
        new THREE.Quaternion()

      dropper.parent.getWorldQuaternion(
        parentWorldQuaternion
      )

      dropper.quaternion
        .copy(parentWorldQuaternion.invert())
        .multiply(markerWorldQuaternion)
    } else {
      dropper.quaternion.copy(
        markerWorldQuaternion
      )
    }

    dropper.position.copy(
      markerWorldPosition
    )

    dropper.updateMatrixWorld(true)

    return () => {
      beaker.position.copy(
        originalBeakerPosition
      )

      beaker.scale.copy(
        originalBeakerScale
      )

      dropper.position.copy(
        originalDropperPosition
      )

      dropper.quaternion.copy(
        originalDropperQuaternion
      )

      dropper.scale.copy(
        originalDropperScale
      )

      beaker.updateMatrixWorld(true)
      dropper.updateMatrixWorld(true)
    }
  }, [
    beakerRef,
    mainDropperRef,
    hand,
    beakerScale,
    dropperScale,
    dropperYOffset,
  ])

  return (
    <>
      {isBiuretReaction && (
        <ProteinBiuretReaction
          beakerRef={beakerRef}
          mainDropperRef={mainDropperRef}
          hand={hand}
        />
      )}
    </>
  )
}

export default DropperPlaced