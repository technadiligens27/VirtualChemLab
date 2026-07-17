import { useContext, useEffect } from "react"
import * as THREE from "three"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import DropperScrollAnimation from "../DropperScrollAnimation/DropperScrollAnimation"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"
import ProteinBiuretReaction from "../../AllReactions/ProteinBiuretReaction/ProteinBiuretReaction"

const DropperPlaced = ({ beakerRef, hand }) => {
  const { mainDropperRef } = useContext(ModelContext)
  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext);
  const {isBiuretReaction,setIsBiuretReaction,} = useContext(ReactionContext)

  useEffect(()=>{
    if(selectedLesson ===7 && lessonStep===8){
      setLessonStep(9)
    }
  },[selectedLesson,lessonStep])

  useEffect(()=>{
    if(selectedLesson ===7 && lessonStep===13){
      setLessonStep(14)
    }
  },[selectedLesson,lessonStep])


  useEffect(() => {
    const beaker = beakerRef?.current
    const dropper = mainDropperRef?.current

    if (!beaker || !dropper) return

    // Save the original transforms
    const originalBeakerPosition = beaker.position.clone()
    const originalDropperPosition = dropper.position.clone()
    const originalDropperQuaternion =
      dropper.quaternion.clone()

    let marker = null

    // Temporarily center the beaker
    beaker.position.x = 0
    beaker.updateMatrixWorld(true)

    // Find the child containing "dropper" in its name
    beaker.traverse((child) => {
      if (
        !marker &&
        child.name?.toLowerCase().includes("dropper")
      ) {
        marker = child
      }
    })

    if (!marker) {
      console.warn("Dropper marker not found")

      // Restore beaker because the effect exits early
      beaker.position.copy(originalBeakerPosition)
      beaker.updateMatrixWorld(true)

      return
    }

    const markerWorldPosition = new THREE.Vector3()
    const markerWorldQuaternion = new THREE.Quaternion()

    marker.getWorldPosition(markerWorldPosition)
    marker.getWorldQuaternion(markerWorldQuaternion)

    // Height offset
    markerWorldPosition.y += 3

    if (dropper.parent) {
      // Convert marker world position into the
      // dropper parent's local coordinate system
      dropper.parent.worldToLocal(markerWorldPosition)

      const parentWorldQuaternion =
        new THREE.Quaternion()

      dropper.parent.getWorldQuaternion(
        parentWorldQuaternion
      )

      // Convert marker world rotation into the
      // dropper parent's local rotation
      dropper.quaternion
        .copy(parentWorldQuaternion.invert())
        .multiply(markerWorldQuaternion)
    } else {
      dropper.quaternion.copy(markerWorldQuaternion)
    }

    dropper.position.copy(markerWorldPosition)
    dropper.updateMatrixWorld(true)

    return () => {
      // Restore original transforms
      beaker.position.copy(originalBeakerPosition)

      dropper.position.copy(originalDropperPosition)
      dropper.quaternion.copy(
        originalDropperQuaternion
      )

      beaker.updateMatrixWorld(true)
      dropper.updateMatrixWorld(true)
    }
  }, [beakerRef, mainDropperRef, hand])

  return (
    <>
      {isBiuretReaction && <ProteinBiuretReaction beakerRef={beakerRef} mainDropperRef={mainDropperRef} hand={hand}/>}
    </>
  )
  
}

export default DropperPlaced