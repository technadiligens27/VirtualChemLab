import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PhenopthalinePourDroplets = ({
  modelRef,

  fallSpeed = 12,
  dropletDelay = 0.8,
  fallDistance = 20,

  dropletColor = "#ffffff",
  dropletOpacity = 1,
}) => {
  const {
    setPourDroplets,
  } = useContext(InteractionContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const dropletsRef = useRef([])
  const originalPositionsRef = useRef([])
  const originalMaterialsRef = useRef([])

  const elapsedTimeRef = useRef(0)
  const isFinishedRef = useRef(false)

  // ==========================================
  // FIND DROPLETS
  // ==========================================

  useEffect(() => {
    if (!modelRef?.current) return

    const foundDroplets = []

    modelRef.current.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        childName.includes("droplet")
      ) {
        foundDroplets.push(child)
      }
    })

    // ========================================
    // ONLY FIRST 3
    // ========================================

    const threeDroplets =
      foundDroplets.slice(0, 3)

    if (threeDroplets.length < 3) {
      console.log(
        "Need 3 phenolphthalein droplets, found:",
        threeDroplets.length
      )

      return
    }

    dropletsRef.current =
      threeDroplets

    // ========================================
    // STORE ORIGINAL POSITIONS
    // ========================================

    originalPositionsRef.current =
      threeDroplets.map(
        (droplet) =>
          droplet.position.clone()
      )

    // ========================================
    // STORE ORIGINAL MATERIALS
    // ========================================

    originalMaterialsRef.current =
      threeDroplets.map(
        (droplet) =>
          droplet.material || null
      )

    // ========================================
    // PREPARE DROPLETS
    // ========================================

    threeDroplets.forEach(
      (droplet) => {
        // IMPORTANT:
        // all droplets start hidden
        droplet.visible = false

        if (droplet.material) {
          droplet.material =
            droplet.material.clone()

          droplet.material.color =
            new THREE.Color(
              dropletColor
            )

          droplet.material.transparent =
            true

          droplet.material.opacity =
            dropletOpacity

          droplet.material.needsUpdate =
            true
        }

        droplet.updateMatrixWorld(true)
      }
    )

    elapsedTimeRef.current = 0
    isFinishedRef.current = false

    console.log(
      "✅ Starting 3 droplets one by one"
    )

    // ========================================
    // CLEANUP
    // ========================================

    return () => {
      threeDroplets.forEach(
        (droplet, index) => {
          const originalPosition =
            originalPositionsRef.current[
              index
            ]

          if (originalPosition) {
            droplet.position.copy(
              originalPosition
            )
          }

          if (
            originalMaterialsRef.current[
              index
            ]
          ) {
            droplet.material =
              originalMaterialsRef.current[
                index
              ]
          }

          droplet.visible = false

          droplet.updateMatrixWorld(true)
        }
      )

      dropletsRef.current = []

      elapsedTimeRef.current = 0

      isFinishedRef.current = false
    }
  }, [
    modelRef,
    dropletColor,
    dropletOpacity,
  ])

  // ==========================================
  // ANIMATION
  // ==========================================

  useFrame((_, delta) => {
    if (isFinishedRef.current) {
      return
    }

    if (
      dropletsRef.current.length !== 3
    ) {
      return
    }

    elapsedTimeRef.current += delta

    let finishedCount = 0

    dropletsRef.current.forEach(
      (droplet, index) => {
        const originalPosition =
          originalPositionsRef.current[
            index
          ]

        if (!originalPosition) {
          return
        }

        // ====================================
        // THIS DROPLET'S START TIME
        // ====================================

        const startTime =
          index * dropletDelay

        // ====================================
        // NOT STARTED YET
        // KEEP HIDDEN
        // ====================================

        if (
          elapsedTimeRef.current <
          startTime
        ) {
          droplet.visible = false
          return
        }

        // ====================================
        // STARTED
        // MAKE THIS DROPLET VISIBLE
        // ====================================

        const targetZ =
          originalPosition.z -
          fallDistance

        // ====================================
        // ALREADY FINISHED
        // ====================================

        if (
          droplet.position.z <=
          targetZ
        ) {
          droplet.position.z =
            targetZ

          droplet.visible =
            false

          finishedCount += 1

          return
        }

        // ====================================
        // CURRENT DROPLET FALLING
        // ====================================

        droplet.visible = true

        droplet.position.z -=
          fallSpeed * delta

        // ====================================
        // DROPLET REACHED TARGET
        // ====================================

        if (
          droplet.position.z <=
          targetZ
        ) {
          droplet.position.z =
            targetZ

          droplet.visible =
            false

          finishedCount += 1
        }

        droplet.updateMatrixWorld(
          true
        )
      }
    )

    // ========================================
    // ALL 3 FINISHED
    // ========================================

    if (
      finishedCount === 3 &&
      !isFinishedRef.current
    ) {
      isFinishedRef.current = true

      // Make absolutely sure
      // everything is hidden
      dropletsRef.current.forEach(
        (droplet) => {
          droplet.visible = false
          droplet.updateMatrixWorld(
            true
          )
        }
      )

      console.log(
        "✅ Exactly 3 phenolphthalein droplets poured - FINISHED"
      )

      if (
        selectedLesson === 11.1 &&
        lessonStep === 47
      ) {
        setLessonStep(48)
      }

      if (
        selectedLesson === 11.1 &&
        lessonStep === 60
      ) {
        setLessonStep(61)
      }

      setPourDroplets(false)
    }
  })

  return null
}

export default PhenopthalinePourDroplets