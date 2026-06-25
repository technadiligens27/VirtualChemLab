import { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const LitmusMode = ({ litmusRef, beakerRef, hand }) => {
  const { camera, gl } = useThree()

  const stirPointRef = useRef(null)

  const centerWorldRef = useRef(new THREE.Vector3())
  const targetLocalRef = useRef(new THREE.Vector3())

  const hasTouchedRef = useRef(false)

  const yOffsetRef = useRef(3.4)

  const originalLitmusPositionRef = useRef(null)
  const originalLitmusRotationRef = useRef(null)
  const originalLitmusScaleRef = useRef(null)

  const originalBeakerPositionRef = useRef(null)
  const originalBeakerRotationRef = useRef(null)
  const originalBeakerScaleRef = useRef(null)

  const xOffset = hand === "right" ? 0.2 : -0.2
  const zOffset = 0

  useEffect(() => {
    if (!litmusRef?.current || !beakerRef?.current) return

    const litmusObject = litmusRef.current
    const beakerObject = beakerRef.current

    originalLitmusPositionRef.current = litmusObject.position.clone()
    originalLitmusRotationRef.current = litmusObject.rotation.clone()
    originalLitmusScaleRef.current = litmusObject.scale.clone()

    originalBeakerPositionRef.current = beakerObject.position.clone()
    originalBeakerRotationRef.current = beakerObject.rotation.clone()
    originalBeakerScaleRef.current = beakerObject.scale.clone()

    // center of screen in front of camera
    const centerWorldPosition = new THREE.Vector3(0, -0.5, -5)

    // convert from camera local space to world space
    camera.localToWorld(centerWorldPosition)

    // convert world position to beaker parent's local space
    if (beakerObject.parent) {
      beakerObject.parent.worldToLocal(centerWorldPosition)
    }

    // move beaker to center
    beakerObject.position.copy(centerWorldPosition)
    beakerObject.rotation.set(0, 0, 0)
    beakerObject.scale.set(1, 1, 1)

    return () => {
      if (!litmusRef?.current || !beakerRef?.current) return

      litmusRef.current.position.copy(originalLitmusPositionRef.current)
      litmusRef.current.rotation.copy(originalLitmusRotationRef.current)
      litmusRef.current.scale.copy(originalLitmusScaleRef.current)

      beakerRef.current.position.copy(originalBeakerPositionRef.current)
      beakerRef.current.rotation.copy(originalBeakerRotationRef.current)
      beakerRef.current.scale.copy(originalBeakerScaleRef.current)

      litmusRef.current.visible = true
      beakerRef.current.visible = true
    }
  }, [litmusRef, beakerRef, camera])

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      e.stopPropagation()

      const speed = 0.2

      if (e.deltaY > 0) {
        yOffsetRef.current -= speed
      } else {
        yOffsetRef.current += speed
      }

      yOffsetRef.current = THREE.MathUtils.clamp(
        yOffsetRef.current,
        1.5,
        3.4
      )
    }

    gl.domElement.addEventListener("wheel", handleWheel, {
      passive: false,
    })

    return () => {
      gl.domElement.removeEventListener("wheel", handleWheel)
    }
  }, [gl])

  useFrame(() => {
    if (!litmusRef?.current || !beakerRef?.current) return

    stirPointRef.current = null

    beakerRef.current.traverse((child) => {
      if (child.name?.toLowerCase().includes("stir")) {
        stirPointRef.current = child
      }
    })

    if (!stirPointRef.current) return

    const litmusObject = litmusRef.current

    stirPointRef.current.getWorldPosition(centerWorldRef.current)

    targetLocalRef.current.copy(centerWorldRef.current)

    if (litmusObject.parent) {
      litmusObject.parent.worldToLocal(targetLocalRef.current)
    } else {
      targetLocalRef.current.copy(
        camera.worldToLocal(centerWorldRef.current.clone())
      )
    }

    targetLocalRef.current.add(
      new THREE.Vector3(
        xOffset,
        yOffsetRef.current,
        zOffset
      )
    )

    litmusObject.position.lerp(targetLocalRef.current, 0.2)

    litmusObject.rotation.set(
      Math.PI / 2,
      0,
      hand === "right" ? Math.PI / 8 : -Math.PI / 8
    )

    litmusObject.scale.set(1.5, 1.5, 1.5)
    litmusObject.visible = true
    litmusObject.frustumCulled = false

    const litmusWorldPosition = new THREE.Vector3()
    litmusObject.getWorldPosition(litmusWorldPosition)

    const distance = litmusWorldPosition.distanceTo(centerWorldRef.current)

    if (distance < 1.6 && !hasTouchedRef.current) {
      hasTouchedRef.current = true
      console.log("Litmus touched liquid/beaker")

      litmusObject.traverse((child) => {
        if (!child.isMesh || !child.material) return

        child.material = child.material.clone()
        child.material.color.set("#000000")
        child.material.needsUpdate = true
      })
    }

    if (distance > 1.6) {
      hasTouchedRef.current = false
    }
  })

  return null
}

export default LitmusMode