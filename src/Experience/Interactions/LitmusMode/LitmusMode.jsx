import { useEffect, useRef } from "react"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"

const LitmusMode = ({ litmusRef, beakerRef, hand }) => {
  const { camera } = useThree()

  const stirPointRef = useRef(null)
  const originalPositionRef = useRef(null)
  const originalRotationRef = useRef(null)

  useEffect(() => {
    if (!litmusRef?.current || !beakerRef?.current) return

    stirPointRef.current = null

    beakerRef.current.traverse((child) => {
      if (child.name?.toLowerCase().includes("stir")) {
        stirPointRef.current = child
      }
    })

    if (!stirPointRef.current) {
      console.log("No stir point found inside beaker/test tube")
      return
    }

    const litmusObject = litmusRef.current

    originalPositionRef.current = litmusObject.position.clone()
    originalRotationRef.current = litmusObject.rotation.clone()

    const worldPosition = new THREE.Vector3()
    stirPointRef.current.getWorldPosition(worldPosition)

    const localPosition = camera.worldToLocal(worldPosition.clone())

    if (hand === "right") {
      localPosition.add(new THREE.Vector3(0.2, 0.4, 0))
    }

    if (hand === "left") {
      localPosition.add(new THREE.Vector3(-0.2, 0.4, 0))
    }

    litmusObject.position.copy(localPosition)

    litmusObject.rotation.set(
      Math.PI / 2,
      0,
      hand === "right" ? Math.PI / 8 : -Math.PI / 8
    )

    litmusObject.visible = true
    litmusObject.frustumCulled = false
  }, [litmusRef, beakerRef, camera, hand])

  return null
}

export default LitmusMode