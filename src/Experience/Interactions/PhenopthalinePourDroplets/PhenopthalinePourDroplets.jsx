import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PhenopthalinePourDroplets = ({
  modelRef,

  fallSpeed = 12,
  dropletDelay = 0.8,
  fallDistance = 30,

  dropletColor = "#ffffff",
  dropletOpacity = 1,
}) => {
  const { setPourDroplets } = useContext(InteractionContext)
  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)
  

  const dropletsRef = useRef([])
  const originalPositionsRef = useRef([])
  const originalMaterialsRef = useRef([])

  const elapsedTimeRef = useRef(0)
  const isFinishedRef = useRef(false)

  useEffect(() => {
    if (!modelRef?.current) return

    const foundDroplets = []

    modelRef.current.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (childName.includes("droplet")) {
        foundDroplets.push(child)
      }
    })

    // ONLY USE FIRST 3 DROPLETS
    const threeDroplets =
      foundDroplets.slice(0, 3)

    if (threeDroplets.length < 3) {
      console.log(
        "Need 3 phenolphthalein droplets, found:",
        threeDroplets.length
      )

      return
    }

    dropletsRef.current = threeDroplets

    originalPositionsRef.current =
      threeDroplets.map((droplet) =>
        droplet.position.clone()
      )

    originalMaterialsRef.current =
      threeDroplets.map((droplet) =>
        droplet.material || null
      )

    threeDroplets.forEach((droplet) => {
      droplet.visible = true

      if (droplet.material) {
        droplet.material =
          droplet.material.clone()

        droplet.material.color =
          new THREE.Color(dropletColor)

        droplet.material.transparent = true
        droplet.material.opacity =
          dropletOpacity

        droplet.material.needsUpdate = true
      }
    })

    elapsedTimeRef.current = 0
    isFinishedRef.current = false

    console.log(
      "✅ Starting exactly 3 droplets"
    )

    return () => {
      threeDroplets.forEach(
        (droplet, index) => {
          const originalPosition =
            originalPositionsRef.current[index]

          if (originalPosition) {
            droplet.position.copy(
              originalPosition
            )
          }

          if (
            originalMaterialsRef.current[index]
          ) {
            droplet.material =
              originalMaterialsRef.current[index]
          }

          droplet.visible = false

          droplet.updateMatrixWorld(true)
        }
      )

      dropletsRef.current = []
      elapsedTimeRef.current = 0
    }
  }, [
    modelRef,
    dropletColor,
    dropletOpacity,
  ])

  useFrame((_, delta) => {
    if (isFinishedRef.current) return

    if (dropletsRef.current.length !== 3) {
      return
    }

    elapsedTimeRef.current += delta

    let finishedCount = 0

    dropletsRef.current.forEach(
      (droplet, index) => {
        const originalPosition =
          originalPositionsRef.current[index]

        if (!originalPosition) return

        const startTime =
          index * dropletDelay

        if (
          elapsedTimeRef.current <
          startTime
        ) {
          return
        }

        const targetZ =
          originalPosition.z -
          fallDistance

        if (
          droplet.position.z <= targetZ
        ) {
          droplet.position.z = targetZ

          droplet.visible = false

          finishedCount += 1

          return
        }

        droplet.position.z -=
          fallSpeed * delta

        if (
          droplet.position.z <= targetZ
        ) {
          droplet.position.z = targetZ

          droplet.visible = false

          finishedCount += 1
        }

        droplet.updateMatrixWorld(true)
      }
    )

    // EXACTLY 3 FINISHED
    if (
      finishedCount === 3 &&
      !isFinishedRef.current
    ) {
      isFinishedRef.current = true

      console.log(
        "✅ Exactly 3 phenolphthalein droplets poured - FINISHED"
      )
      if(selectedLesson===11.1 && lessonStep===47){
        setLessonStep(48)
      }
      if(selectedLesson===11.1 && lessonStep===60){
        setLessonStep(61)
      }
      setPourDroplets(false)
    }
  })

  return null
}

export default PhenopthalinePourDroplets