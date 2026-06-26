import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const FunnelMode = ({ beakerRef, funnelRef }) => {
  const targetWorldPos = useRef(new THREE.Vector3())
  const targetLocalPos = useRef(new THREE.Vector3())

  const originalBeakerPosRef = useRef(null)

  // Move beaker more left here
  const beakerOffsetRef = useRef(new THREE.Vector3(-4.5, 0, 0))

  // Adjust funnel position here
  const funnelOffsetRef = useRef(new THREE.Vector3(0, 1.5, 0))

  useEffect(() => {
    if (!beakerRef?.current) return

    if (!originalBeakerPosRef.current) {
      originalBeakerPosRef.current = beakerRef.current.position.clone()
    }
  }, [beakerRef])

  useFrame(() => {
    if (!beakerRef?.current || !funnelRef?.current) return
    if (!originalBeakerPosRef.current) return

    // Move beaker left from its original hand position
    const targetBeakerPos = originalBeakerPosRef.current
      .clone()
      .add(beakerOffsetRef.current)

    beakerRef.current.position.lerp(targetBeakerPos, 0.1)

    let stirPoint = null

    beakerRef.current.traverse((child) => {
      if (child.name?.toLowerCase().includes("stir")) {
        stirPoint = child
      }
    })

    if (!stirPoint) return

    stirPoint.getWorldPosition(targetWorldPos.current)

    targetLocalPos.current.copy(targetWorldPos.current)

    if (funnelRef.current.parent) {
      funnelRef.current.parent.worldToLocal(targetLocalPos.current)
    }

    // Add funnel offset AFTER worldToLocal because both are attached to camera/hand
    targetLocalPos.current.add(funnelOffsetRef.current)

    funnelRef.current.position.lerp(targetLocalPos.current, 0.1)
    funnelRef.current.visible = true
  })

  return null
}

export default FunnelMode