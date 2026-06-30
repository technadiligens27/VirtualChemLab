import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const FunnelMode = ({ beakerRef, funnelRef, hand }) => {
  const targetWorldPos = useRef(new THREE.Vector3())
  const targetLocalPos = useRef(new THREE.Vector3())

  const originalBeakerPosRef = useRef(null)
  const originalBeakerRotRef = useRef(null)

  const originalFunnelPosRef = useRef(null)
  const originalFunnelRotRef = useRef(null)

  // If funnel is in left hand, beaker is usually in right hand, so move beaker left
  const beakerOffsetLeftRef = useRef(new THREE.Vector3(-4.5, 0, 0))

  // If funnel is in right hand, beaker is usually in left hand, so move beaker right
  const beakerOffsetRightRef = useRef(new THREE.Vector3(4, 0, 0))

  // Funnel height settings
  const minFunnelHeight = 1.2
  const maxFunnelHeight = 5.2
  const funnelHeightRef = useRef(4.5)

  const scrollSpeed = 0.01

  useEffect(() => {
    if (!beakerRef?.current || !funnelRef?.current) return

    originalBeakerPosRef.current = beakerRef.current.position.clone()
    originalBeakerRotRef.current = beakerRef.current.rotation.clone()

    originalFunnelPosRef.current = funnelRef.current.position.clone()
    originalFunnelRotRef.current = funnelRef.current.rotation.clone()

    return () => {
      if (beakerRef?.current && originalBeakerPosRef.current) {
        beakerRef.current.position.copy(originalBeakerPosRef.current)
        beakerRef.current.rotation.copy(originalBeakerRotRef.current)
      }

      if (funnelRef?.current && originalFunnelPosRef.current) {
        funnelRef.current.position.copy(originalFunnelPosRef.current)
        funnelRef.current.rotation.copy(originalFunnelRotRef.current)
      }
    }
  }, [beakerRef, funnelRef])

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()

      if (e.deltaY < 0) {
        funnelHeightRef.current += scrollSpeed * Math.abs(e.deltaY)
      }

      if (e.deltaY > 0) {
        funnelHeightRef.current -= scrollSpeed * Math.abs(e.deltaY)
      }

      funnelHeightRef.current = THREE.MathUtils.clamp(
        funnelHeightRef.current,
        minFunnelHeight,
        maxFunnelHeight
      )
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [])

  useFrame(() => {
    if (!beakerRef?.current || !funnelRef?.current) return
    if (!originalBeakerPosRef.current) return

    const beakerOffset =
      hand === "right"
        ? beakerOffsetRightRef.current
        : beakerOffsetLeftRef.current

    const targetBeakerPos = originalBeakerPosRef.current
      .clone()
      .add(beakerOffset)

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

    targetLocalPos.current.y += funnelHeightRef.current

    funnelRef.current.position.lerp(targetLocalPos.current, 0.1)
    funnelRef.current.visible = true
  })

  return null
}

export default FunnelMode