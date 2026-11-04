import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const PlaceFilterFunnel = ({ foldedFilterRef, funnelRef }) => {
  const targetWorldPos = useRef(new THREE.Vector3())
  const targetLocalPos = useRef(new THREE.Vector3())

  // Adjust position here
  const offsetRef = useRef(new THREE.Vector3(0, 1, 0))

  useFrame(() => {
    if (!foldedFilterRef?.current || !funnelRef?.current) return

    let emptyPoint = null

    funnelRef.current.traverse((child) => {
      if (child.name === "funnel-filter-empty") {
        emptyPoint = child
      }
    })

    if (!emptyPoint) return

    emptyPoint.getWorldPosition(targetWorldPos.current)

    targetLocalPos.current.copy(targetWorldPos.current)

    if (foldedFilterRef.current.parent) {
      foldedFilterRef.current.parent.worldToLocal(targetLocalPos.current)
    }

    foldedFilterRef.current.position.copy(targetLocalPos.current)
    foldedFilterRef.current.position.add(offsetRef.current)

    foldedFilterRef.current.visible = true
    foldedFilterRef.current.scale.set(1,1,1)
  })

  return null
}

export default PlaceFilterFunnel