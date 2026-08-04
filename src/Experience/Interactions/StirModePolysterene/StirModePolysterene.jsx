import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const StirModePolysterene = ({
  heightOffset = 10,
  xOffset = -0.1,
  zOffset = -0.5,
  stirRadius = 0.08,
  stirSpeed = 4,
}) => {
  const {
    spoonRef,
    mainPolystereneRef,
  } = useContext(ModelContext)

  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const {setShowBubbles} = useContext(InteractionContext)

  const originalTransformRef = useRef(null)
  const stirPointRef = useRef(null)

  const isStirringRef = useRef(false)
  const angleRef = useRef(0)
  const stopTimerRef = useRef(null)

  const hasCompletedTwoRotationsRef =
    useRef(false)

  const stirCentreWorldRef = useRef(
    new THREE.Vector3()
  )

  const spoonTargetWorldRef = useRef(
    new THREE.Vector3()
  )

  useEffect(() => {
    if (
      selectedLesson === 8 &&
      lessonStep === 33
    ) {
      setLessonStep(34)
    }
  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])

  useEffect(() => {
    const spoon = spoonRef?.current
    const polystyrene =
      mainPolystereneRef?.current

    if (!spoon || !polystyrene) {
      console.log(
        "Spoon or polystyrene cup was not found"
      )

      return
    }

    originalTransformRef.current = {
      parent: spoon.parent,
      position: spoon.position.clone(),
      rotation: spoon.rotation.clone(),
      scale: spoon.scale.clone(),
    }

    let stirPoint = null

    polystyrene.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      if (
        !stirPoint &&
        name.includes("stir")
      ) {
        stirPoint = child
      }
    })

    if (!stirPoint) {
      console.log(
        "Stir point was not found inside the polystyrene cup"
      )

      return
    }

    stirPointRef.current = stirPoint

    angleRef.current = 0
    hasCompletedTwoRotationsRef.current =
      false

    stirPoint.add(spoon)

    stirPoint.updateWorldMatrix(
      true,
      false
    )

    stirPoint.getWorldPosition(
      stirCentreWorldRef.current
    )

    spoonTargetWorldRef.current.set(
      stirCentreWorldRef.current.x +
        xOffset +
        stirRadius,

      stirCentreWorldRef.current.y +
        heightOffset,

      stirCentreWorldRef.current.z +
        zOffset
    )

    stirPoint.worldToLocal(
      spoonTargetWorldRef.current
    )

    spoon.position.copy(
      spoonTargetWorldRef.current
    )

    spoon.rotation.set(
      Math.PI / 7,
      0,
      -Math.PI / 12
    )

    spoon.scale.set(
      0.5,
      0.5,
      0.5
    )

    spoon.updateMatrixWorld(true)

    const handleWheel = (event) => {
      if (event.deltaY <= 0) return

      isStirringRef.current = true

      clearTimeout(
        stopTimerRef.current
      )

      stopTimerRef.current =
        setTimeout(() => {
          isStirringRef.current = false
        }, 150)
    }

    window.addEventListener(
      "wheel",
      handleWheel,
      { passive: true }
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )

      clearTimeout(
        stopTimerRef.current
      )

      isStirringRef.current = false
      stirPointRef.current = null

      angleRef.current = 0
      hasCompletedTwoRotationsRef.current =
        false

      const original =
        originalTransformRef.current

      if (!original) return

      if (original.parent) {
        original.parent.add(spoon)
      }

      spoon.position.copy(
        original.position
      )

      spoon.rotation.copy(
        original.rotation
      )

      spoon.scale.copy(
        original.scale
      )

      spoon.updateMatrixWorld(true)

      console.log(
        "Spoon detached and returned"
      )
    }
  }, [
    spoonRef,
    mainPolystereneRef,
    heightOffset,
    xOffset,
    zOffset,
    stirRadius,
  ])

  useFrame((_, delta) => {
    const spoon = spoonRef?.current
    const stirPoint =
      stirPointRef.current

    if (
      !spoon ||
      !stirPoint ||
      !isStirringRef.current
    ) {
      return
    }

    angleRef.current +=
      stirSpeed * delta

    const angle =
      angleRef.current

    stirPoint.updateWorldMatrix(
      true,
      false
    )

    stirPoint.getWorldPosition(
      stirCentreWorldRef.current
    )

    spoonTargetWorldRef.current.set(
      stirCentreWorldRef.current.x +
        xOffset +
        Math.cos(angle) *
          stirRadius,

      stirCentreWorldRef.current.y +
        heightOffset,

      stirCentreWorldRef.current.z +
        zOffset +
        Math.sin(angle) *
          stirRadius
    )

    stirPoint.worldToLocal(
      spoonTargetWorldRef.current
    )

    spoon.position.copy(
      spoonTargetWorldRef.current
    )

    spoon.rotation.y = -angle

    spoon.updateMatrixWorld(true)

    const oneFullRotation =
      Math.PI * 2

    if (
      angleRef.current >=
        oneFullRotation &&
      !hasCompletedTwoRotationsRef.current
    ) {
      hasCompletedTwoRotationsRef.current =
        true

      setShowBubbles(true)
    }
  })

  return null
}

export default StirModePolysterene