import { useEffect } from "react"
import * as THREE from "three"

const PlacePolysterene = ({
  beakerRef,
  polystereneRef,
  hand,
}) => {
  useEffect(() => {
    const beaker = beakerRef?.current
    const cup = polystereneRef?.current

    if (!beaker || !cup) return

    const polystereneHand = hand
    const beakerHand =
      hand === "right" ? "left" : "right"

    console.log("Polystyrene hand:", polystereneHand)
    console.log("Beaker hand:", beakerHand)

    let stirPoint = null
    beaker.position.x =0

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

    beaker.attach(cup)

    const localPosition = beaker.worldToLocal(
      stirWorldPosition.clone()
    )

    cup.position.copy(localPosition)

    // Height offset
    cup.position.y += 2.2

    cup.rotation.set(0, 0, 0)
  }, [
    beakerRef,
    polystereneRef,
    hand,
  ])

  return null
}

export default PlacePolysterene