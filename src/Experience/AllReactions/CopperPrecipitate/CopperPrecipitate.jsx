import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const CopperPrecipitate = ({ beakerRef }) => {
  const precipitateMeshesRef = useRef([])
  const progressRef = useRef(0)

  const fallDuration = 3
  const opacityDuration = .5

  const fallDistance = 0

  const targetColor = new THREE.Color("#38BDF8")

  useEffect(() => {
    if (!beakerRef?.current) return

    precipitateMeshesRef.current = []
    progressRef.current = 0

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

        const originalY = child.position.y
        const startY = originalY + fallDistance

        child.position.y = startY

        precipitateMeshesRef.current.push({
          mesh: child,
          originalY,
          startY,
        })
      }
    })
  }, [beakerRef])

  useFrame((_, delta) => {
    if (precipitateMeshesRef.current.length === 0) return

    progressRef.current += delta

    const fallProgress = Math.min(progressRef.current / fallDuration, 1)
    const opacityProgress = Math.min(progressRef.current / opacityDuration, 1)

    precipitateMeshesRef.current.forEach(({ mesh, originalY, startY }) => {
      if (!mesh.material) return

      mesh.visible = true

      mesh.material.opacity = opacityProgress

      mesh.position.y = THREE.MathUtils.lerp(
        startY,
        originalY,
        fallProgress
      )
    })
  })

  return null
}

export default CopperPrecipitate