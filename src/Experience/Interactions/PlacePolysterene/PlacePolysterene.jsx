import { useContext, useEffect } from "react"
import * as THREE from "three"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext";

const PlacePolysterene = ({beakerRef,polystereneRef,hand,}) => {
  const {setSelectedLeftHand,setSelectedRightHand,setIsPlacePolysterene} = useContext(InteractionContext);
  const {selectedLesson,lessonStep, setLessonStep} = useContext(MainGuidelineContext)

  useEffect(()=>{
    if(lessonStep===6 && selectedLesson ===8){
      setLessonStep(7)
    }
  },[lessonStep,selectedLesson])

  useEffect(() => {
    const beaker = beakerRef?.current
    const cup = polystereneRef?.current

    if (!beaker || !cup) return

    let stirPoint = null

    beaker.traverse((child) => {
      if (
        !stirPoint &&
        child.name?.toLowerCase().includes("stir")
      ) {
        stirPoint = child
      }
    })

    if (!stirPoint) {
      console.log("Stir position was not found")
      return
    }

    const stirWorldPosition = new THREE.Vector3()

    stirPoint.getWorldPosition(stirWorldPosition)

    // Place the cup inside the beaker
    beaker.attach(cup)

    const localPosition = beaker.worldToLocal(
      stirWorldPosition.clone()
    )

    cup.position.copy(localPosition)
    cup.position.y += 1.8

    cup.rotation.set(0, 0, 0)
    cup.scale.set(1.3, 1.3, 1.3)

    // Free the hand that was holding the cup
    if (hand === "right") {
      setSelectedRightHand(null)
    } else {
      setSelectedLeftHand(null)
    }

  
  }, [
    beakerRef,
    polystereneRef,
    hand,
    setSelectedLeftHand,
    setSelectedRightHand,
  ])

  return null
}

export default PlacePolysterene