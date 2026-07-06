import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const CopperPrecipitate = ({ beakerRef, downDistance = 1.7 }) => {
  const precipitateMeshesRef = useRef([])
  const progressRef = useRef(0)

  const moveDuration = 2
  const opacityDuration = 0.5

  const targetColor = new THREE.Color("#38BDF8")

  useEffect(() => {
    if (!beakerRef?.current) return

    precipitateMeshesRef.current = []
    progressRef.current = 0

    let normalTopObject = null

    beakerRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase()

      if (childName?.includes("normal-beaker-top")) {
        normalTopObject = child
      }
    })

    if (!normalTopObject) {
      console.log("normal-beaker-top empty not found")
      return
    }

    const normalTopWorldPos = new THREE.Vector3()
    normalTopObject.getWorldPosition(normalTopWorldPos)

    beakerRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase()

      if (
        child.isMesh &&
        childName?.includes("precipitate") &&
        child.material
      ) {
        child.visible = true
        child.frustumCulled = false
        child.renderOrder = 999

        child.material = new THREE.MeshBasicMaterial({
          color: targetColor,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          depthTest: false,
          depthWrite: false,
        })

        const localTargetPos = normalTopWorldPos.clone()

        if (child.parent) {
          child.parent.worldToLocal(localTargetPos)
        }

        // Start at normal-beaker-top
        child.position.copy(localTargetPos)

        const startY = child.position.y
        const endY = startY - downDistance

        precipitateMeshesRef.current.push({
          mesh: child,
          startY,
          endY,
        })
      }
    })
  }, [beakerRef, downDistance])

  useFrame((_, delta) => {
    if (precipitateMeshesRef.current.length === 0) return

    progressRef.current += delta

    const moveProgress = Math.min(progressRef.current / moveDuration, 1)
    const opacityProgress = Math.min(progressRef.current / opacityDuration, 1)

    precipitateMeshesRef.current.forEach(({ mesh, startY, endY }) => {
      if (!mesh.material) return

      mesh.visible = true
      mesh.material.opacity = opacityProgress

      mesh.position.y = THREE.MathUtils.lerp(
        startY,
        endY,
        moveProgress
      )
    })
  })

  return null
}

export default CopperPrecipitate