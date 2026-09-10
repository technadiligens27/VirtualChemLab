import {
  useContext,
  useEffect,
} from "react"

import * as THREE from "three"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const ConicalGasCloud = ({
  startDelay = 500,
  riseDistance = 1,
  riseSpeed = 0.45,
  startOpacity = 0.1,
}) => {
  const {
    conicalBeakerRef,
  } = useContext(ModelContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  useEffect(() => {
    if (!conicalBeakerRef?.current) {
      return
    }

    let cancelled = false
    let frameId = null
    let startTimer = null
    let hasFinished = false

    let gasObject = null

    conicalBeakerRef.current.traverse((child) => {
      if (gasObject) return

      const childName =
        child.name?.toLowerCase() || ""

      if (childName.includes("gas-large")) {
        gasObject = child
      }
    })

    if (!gasObject) {
      console.warn(
        'ConicalGasCloud: No object containing "gas-large" was found.'
      )

      return
    }

    const originalPosition =
      gasObject.position.clone()

    const originalVisible =
      gasObject.visible

    const originalMaterials = []
    const gasMaterials = []

    gasObject.traverse((child) => {
      if (!child.isMesh || !child.material) {
        return
      }

      originalMaterials.push({
        mesh: child,
        material: child.material,
      })

      if (Array.isArray(child.material)) {
        child.material = child.material.map(
          (material) => {
            const clonedMaterial =
              material.clone()

            clonedMaterial.transparent = true
            clonedMaterial.depthWrite = false
            clonedMaterial.opacity = 0
            clonedMaterial.needsUpdate = true

            gasMaterials.push(clonedMaterial)

            return clonedMaterial
          }
        )

        return
      }

      const clonedMaterial =
        child.material.clone()

      clonedMaterial.transparent = true
      clonedMaterial.depthWrite = false
      clonedMaterial.opacity = 0
      clonedMaterial.needsUpdate = true

      child.material = clonedMaterial
      gasMaterials.push(clonedMaterial)
    })

    const safeStartOpacity =
      THREE.MathUtils.clamp(
        startOpacity,
        0,
        1
      )

    const safeSpeed = Math.max(
      Math.abs(riseSpeed),
      0.001
    )

    const animationDuration =
      (Math.abs(riseDistance) / safeSpeed) *
      1000

    const setGasOpacity = (opacity) => {
      const safeOpacity =
        THREE.MathUtils.clamp(
          opacity,
          0,
          1
        )

      gasMaterials.forEach((material) => {
        material.transparent = true
        material.depthWrite = false
        material.opacity = safeOpacity
        material.needsUpdate = true
      })
    }

    gasObject.position.copy(originalPosition)
    gasObject.visible = false

    setGasOpacity(0)

    const startAnimation = () => {
      if (cancelled) return

      gasObject.position.copy(
        originalPosition
      )

      gasObject.visible = true
      setGasOpacity(safeStartOpacity)

      const startedAt = performance.now()

      const updateAnimation = (
        currentTime
      ) => {
        if (cancelled) return

        const elapsed =
          currentTime - startedAt

        const progress =
          THREE.MathUtils.clamp(
            elapsed /
              Math.max(animationDuration, 1),
            0,
            1
          )

        gasObject.position.y =
          originalPosition.y +
          riseDistance * progress

        const currentOpacity =
          safeStartOpacity * (1 - progress)

        setGasOpacity(currentOpacity)

        if (progress < 1) {
          frameId =
            requestAnimationFrame(
              updateAnimation
            )

          return
        }

        // Force the exact final visual state.
        gasObject.position.y =
          originalPosition.y +
          riseDistance

        setGasOpacity(0)
        gasObject.visible = false
        frameId = null

        // Advance the lesson only once.
        if (
          !hasFinished &&
          selectedLesson === 14 &&
          lessonStep === 19
        ) {
          hasFinished = true
          setLessonStep(20)
        }
      }

      frameId =
        requestAnimationFrame(
          updateAnimation
        )
    }

    startTimer = setTimeout(
      startAnimation,
      Math.max(startDelay, 0)
    )

    return () => {
      cancelled = true

      clearTimeout(startTimer)

      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }

      gasObject.position.copy(
        originalPosition
      )

      gasObject.visible =
        originalVisible

      originalMaterials.forEach(
        ({ mesh, material }) => {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(
              (clonedMaterial) => {
                clonedMaterial.dispose()
              }
            )
          } else {
            mesh.material.dispose()
          }

          mesh.material = material
        }
      )
    }
  }, [
    conicalBeakerRef,
    selectedLesson,
    lessonStep,
    setLessonStep,
    startDelay,
    riseDistance,
    riseSpeed,
    startOpacity,
  ])

  return null
}

export default ConicalGasCloud