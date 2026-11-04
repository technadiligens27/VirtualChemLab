import { useContext, useEffect } from "react"
import * as THREE from "three"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const PlaceTestubeInBeaker = ({
  testubeRef,
  xPos = 0,
  yPos = 0,
  zPos = 0,
  scale = 1,
  hand,
}) => {
  const { normalBeakerRef } = useContext(ModelContext)

  const {
    setSelectedRightHand,
    setSelectedLeftHand,
  } = useContext(InteractionContext)

  useEffect(() => {
    if (!normalBeakerRef.current || !testubeRef?.current) return

    let topPoint = null

    normalBeakerRef.current.traverse((child) => {
      if (child.name?.toLowerCase().includes("top")) {
        topPoint = child
      }
    })

    if (!topPoint) return

    const testube = testubeRef.current
    const worldPosition = new THREE.Vector3()

    topPoint.getWorldPosition(worldPosition)

    normalBeakerRef.current.attach(testube)

    normalBeakerRef.current.worldToLocal(worldPosition)

    testube.position.set(
      worldPosition.x + xPos,
      worldPosition.y + yPos,
      worldPosition.z + zPos
    )

    testube.scale.set(scale, scale, scale)

    // if (hand === "right") {
    //   setSelectedRightHand(null)
    // }

    // if (hand === "left") {
    //   setSelectedLeftHand(null)
    // }
  }, [normalBeakerRef, testubeRef, xPos, yPos, zPos, scale, hand])

  return null
}

export default PlaceTestubeInBeaker