import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const StirReaction = ({
  hand,
  spoonRef,
  beakerRef,
}) => {
  const liquidRef = useRef(null)

  // Store every salt child inside the spoon
  const saltMeshesRef = useRef([])

  const canReactRef = useRef(false)
  const reactionFinishedRef = useRef(false)

  const targetColorRef = useRef(
    new THREE.Color("#EAFBFF")
  )

  const {
    rightBeakerFillData,
    leftBeakerFillData,
  } = useContext(InteractionContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  /*
    hand represents the spoon hand,
    so the beaker is in the opposite hand.
  */
  const beakerFillData =
    hand === "left"
      ? rightBeakerFillData
      : leftBeakerFillData

  useEffect(() => {
    if (
      !spoonRef?.current ||
      !beakerRef?.current
    ) {
      return
    }

    liquidRef.current = null
    saltMeshesRef.current = []

    canReactRef.current = false
    reactionFinishedRef.current = false

    /*
      Find the visible liquid inside the beaker.
    */
    beakerRef.current.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      if (
        child.isMesh &&
        child.visible &&
        name.includes("liquid")
      ) {
        liquidRef.current = child
      }
    })

    /*
      Find every visible salt child
      inside the spoon.
    */
    spoonRef.current.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      if (
        child.isMesh &&
        child.visible &&
        name.includes("salt")
      ) {
        /*
          Clone the material but preserve
          its current opacity.

          Do not reset opacity to 1 because
          StirReaction may mount again.
        */
        if (Array.isArray(child.material)) {
          child.material =
            child.material.map((material) => {
              const clonedMaterial =
                material.clone()

              clonedMaterial.transparent = true
              clonedMaterial.opacity =
                material.opacity ?? 1

              clonedMaterial.needsUpdate = true

              return clonedMaterial
            })
        } else if (child.material) {
          const currentOpacity =
            child.material.opacity ?? 1

          child.material =
            child.material.clone()

          child.material.transparent = true
          child.material.opacity =
            currentOpacity

          child.material.needsUpdate = true
        }

        saltMeshesRef.current.push(child)
      }
    })

    const liquidName =
      beakerFillData?.name?.toLowerCase() ||
      ""

    const isWater =
      liquidName.includes("water") ||
      liquidName.includes("h2o")

    if (
      !isWater ||
      !liquidRef.current ||
      saltMeshesRef.current.length === 0
    ) {
      return
    }

    /*
      Prepare the water material.
    */
    if (
      Array.isArray(
        liquidRef.current.material
      )
    ) {
      liquidRef.current.material =
        liquidRef.current.material.map(
          (material) => {
            const clonedMaterial =
              material.clone()

            clonedMaterial.transparent = true
            clonedMaterial.opacity = 0.35
            clonedMaterial.depthWrite = false
            clonedMaterial.needsUpdate = true

            return clonedMaterial
          }
        )
    } else if (
      liquidRef.current.material
    ) {
      liquidRef.current.material =
        liquidRef.current.material.clone()

      liquidRef.current.material.transparent =
        true

      liquidRef.current.material.opacity =
        0.35

      liquidRef.current.material.depthWrite =
        false

      liquidRef.current.material.needsUpdate =
        true
    }

    canReactRef.current = true
  }, [
    spoonRef,
    beakerRef,
    hand,
    beakerFillData?.name,
  ])

  useFrame((_, delta) => {
    if (!canReactRef.current) return
    if (reactionFinishedRef.current) return

    let highestSaltOpacity = 0

    /*
      Fade every salt child mesh.
    */
    saltMeshesRef.current.forEach(
      (saltMesh) => {
        if (!saltMesh?.material) return

        if (Array.isArray(saltMesh.material)) {
          saltMesh.material.forEach(
            (material) => {
              material.opacity = Math.max(
                0,
                material.opacity -
                  delta * 1.2
              )

              highestSaltOpacity = Math.max(
                highestSaltOpacity,
                material.opacity
              )
            }
          )
        } else {
          saltMesh.material.opacity =
            Math.max(
              0,
              saltMesh.material.opacity -
                delta * 1.2
            )

          highestSaltOpacity = Math.max(
            highestSaltOpacity,
            saltMesh.material.opacity
          )
        }
      }
    )

    /*
      Change the liquid colour.
    */
    const liquid = liquidRef.current

    if (Array.isArray(liquid?.material)) {
      liquid.material.forEach(
        (material) => {
          material.color?.lerp(
            targetColorRef.current,
            delta * 1.2
          )
        }
      )
    } else {
      liquid?.material?.color?.lerp(
        targetColorRef.current,
        delta * 1.2
      )
    }

    /*
      Hide every salt child only after
      all materials have faded.
    */
    if (highestSaltOpacity <= 0.01) {
      saltMeshesRef.current.forEach(
        (saltMesh) => {
          saltMesh.visible = false
        }
      )

      reactionFinishedRef.current = true
      canReactRef.current = false

      if (
        selectedLesson === 1 &&
        lessonStep === 9
      ) {
        setLessonStep(10)
      }
    }
  })

  return null
}

export default StirReaction