import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const CopperPrecipitate = ({
  beakerRef,
  downDistance = 1.7,
  fallDelay = 0.5,
}) => {
  const precipitateMeshesRef = useRef([])
  const progressRef = useRef(0)
  const frameLogDoneRef = useRef(false)

  const moveDuration = 4
  const opacityDuration = 1.2

  useEffect(() => {
    console.log("CopperPrecipitate mounted")

    if (!beakerRef?.current) {
      console.log("beakerRef.current not found")
      return
    }

    const beaker = beakerRef.current

    console.log("beaker found:", beaker.name, beaker)

    precipitateMeshesRef.current = []
    progressRef.current = 0
    frameLogDoneRef.current = false

    let liquidTopEmpty = null
    let precipitateHolder = null

    console.log("Searching beaker children...")

    beaker.traverse((child) => {
      const childName = child.name?.toLowerCase()

      console.log("child:", {
        name: child.name,
        type: child.type,
        isMesh: child.isMesh,
        visible: child.visible,
        scale: child.scale,
      })

      if (childName?.includes("top")) {
        liquidTopEmpty = child
        console.log("FOUND liquidTopEmpty:", child.name)
      }

      if (childName?.includes("precipitate-empty")) {
        precipitateHolder = child
        console.log("FOUND precipitateHolder:", child.name)
      }
    })

    if (!liquidTopEmpty) {
      console.log("ERROR: normal-beaker-top empty not found")
      return
    }

    if (!precipitateHolder) {
      console.log("ERROR: precipitate-empty holder not found")
      return
    }

    // Important: if the holder is invisible, all child blobs will also be invisible
    precipitateHolder.visible = true

    console.log("liquidTopEmpty object:", liquidTopEmpty)
    console.log("precipitateHolder object:", precipitateHolder)

    const liquidTopWorldPosition = new THREE.Vector3()
    liquidTopEmpty.getWorldPosition(liquidTopWorldPosition)

    console.log("liquidTopWorldPosition:", liquidTopWorldPosition)

    const liquidTopLocalPosition = liquidTopWorldPosition.clone()
    precipitateHolder.worldToLocal(liquidTopLocalPosition)

    console.log("liquidTopLocalPosition inside precipitateHolder:", liquidTopLocalPosition)

    const precipitateMeshes = []

    console.log("Searching blobs inside precipitateHolder...")

    precipitateHolder.traverse((child) => {
      console.log("holder child:", {
        name: child.name,
        type: child.type,
        isMesh: child.isMesh,
        visible: child.visible,
        hasMaterial: !!child.material,
        position: child.position,
        scale: child.scale,
      })

      if (child.isMesh && child.material) {
        precipitateMeshes.push(child)
        console.log("FOUND precipitate mesh:", child.name)
      }
    })

    console.log("Total precipitate meshes found:", precipitateMeshes.length)

    if (precipitateMeshes.length === 0) {
      console.log("ERROR: No precipitate blobs found inside precipitate-empty")
      return
    }

    precipitateMeshes.forEach((mesh, index) => {
      console.log(`Setting up blob ${index}:`, mesh.name)

      mesh.visible = false
      mesh.frustumCulled = false
      mesh.renderOrder = 999

      const oldWorldPos = new THREE.Vector3()
      mesh.getWorldPosition(oldWorldPos)

      console.log(`Blob ${index} old world position:`, oldWorldPos)
      console.log(`Blob ${index} old local position:`, mesh.position.clone())
      console.log(`Blob ${index} old scale:`, mesh.scale.clone())

      mesh.material = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#0284C7"),
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,

        // For debugging, false makes it easier to see through glass.
        // Later you can change this back to true.
        depthTest: false,
        depthWrite: false,
      })

      const originalPosition = mesh.position.clone()

      const randomEndX = (Math.random() - 0.5) * 0.15
      const randomEndZ = (Math.random() - 0.5) * 0.15

      const startPosition = originalPosition.clone()

      // Only take the Y position from the liquid top
      startPosition.y = liquidTopLocalPosition.y

      const endPosition = startPosition.clone()
      endPosition.y -= downDistance

      // Small random settling movement
      endPosition.x += randomEndX
      endPosition.z += randomEndZ

      mesh.position.copy(startPosition)

      console.log(`Blob ${index} startPosition:`, startPosition)
      console.log(`Blob ${index} endPosition:`, endPosition)
      console.log(`Blob ${index} new local position:`, mesh.position.clone())

      const randomDelay = Math.random() * 1.4
      const randomDuration = moveDuration + Math.random() * 2

      const swayAmount = 0.015 + Math.random() * 0.035
      const swaySpeed = 2 + Math.random() * 3
      const phase = Math.random() * Math.PI * 2

      const rotationSpeed = {
        x: (Math.random() - 0.5) * 0.8,
        y: (Math.random() - 0.5) * 0.8,
        z: (Math.random() - 0.5) * 0.8,
      }

      precipitateMeshesRef.current.push({
        mesh,
        startPosition,
        endPosition,
        randomDelay,
        randomDuration,
        swayAmount,
        swaySpeed,
        phase,
        rotationSpeed,
      })
    })

    console.log(
      "Final precipitateMeshesRef count:",
      precipitateMeshesRef.current.length
    )
  }, [beakerRef, downDistance])

  useFrame((_, delta) => {
    if (precipitateMeshesRef.current.length === 0) return

    progressRef.current += delta

    if (!frameLogDoneRef.current) {
      console.log("Animation started")
      console.log("Current progress time:", progressRef.current)
      console.log("Blobs in animation:", precipitateMeshesRef.current.length)
      frameLogDoneRef.current = true
    }

    precipitateMeshesRef.current.forEach((blob, index) => {
      const {
        mesh,
        startPosition,
        endPosition,
        randomDelay,
        randomDuration,
        swayAmount,
        swaySpeed,
        phase,
        rotationSpeed,
      } = blob

      if (!mesh.material) {
        console.log(`Blob ${index} has no material`)
        return
      }

      const localTime = progressRef.current - fallDelay - randomDelay

      if (localTime < 0) return

      const opacityProgress = Math.min(localTime / opacityDuration, 1)
      const moveProgress = Math.min(localTime / randomDuration, 1)

      const smoothProgress =
        moveProgress * moveProgress * (3 - 2 * moveProgress)

      mesh.visible = true

      mesh.position.lerpVectors(startPosition, endPosition, smoothProgress)

      mesh.position.x +=
        Math.sin(progressRef.current * swaySpeed + phase) *
        swayAmount *
        (1 - smoothProgress)

      mesh.position.z +=
        Math.cos(progressRef.current * swaySpeed + phase) *
        swayAmount *
        (1 - smoothProgress)

      mesh.rotation.x += rotationSpeed.x * delta
      mesh.rotation.y += rotationSpeed.y * delta
      mesh.rotation.z += rotationSpeed.z * delta

      mesh.material.opacity = opacityProgress
      mesh.material.needsUpdate = true

      if (index === 0 && moveProgress > 0 && moveProgress < 0.05) {
        console.log("First blob became visible:", {
          name: mesh.name,
          visible: mesh.visible,
          opacity: mesh.material.opacity,
          localTime,
          moveProgress,
          position: mesh.position.clone(),
          scale: mesh.scale.clone(),
        })
      }

      if (moveProgress >= 1) {
        mesh.position.copy(endPosition)
      }
    })
  })

  return null
}

export default CopperPrecipitate