import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const PourIntoTestubeFromSpoon = ({
  testubeRef,
  spoonRef,
  hand,
  heightOffset = 0.3,
  xOffset = 0.2,
}) => {
  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const {
    isPotassiumTransferred,
    setIsPotassiumTransferred,setIsPottasiumCarobnateInTestube01
  } = useContext(InteractionContext)

  const spoonRotationXRef = useRef(0)
  const minimumRotationXRef = useRef(0)
  const maximumRotationXRef = useRef(0)

  const originalSpoonPositionRef = useRef(null)
  const originalSpoonRotationRef = useRef(null)

  const originalTestTubePositionRef = useRef(null)
  const originalTestTubeRotationRef = useRef(null)

  const potassiumPiecesRef = useRef([])
  const powderMaterialsRef = useRef([])

  const isPotassiumFallingRef = useRef(false)
  const targetPowderOpacityRef = useRef(0);
  

  useEffect(() => {
    if (
      selectedLesson === 8 &&
      lessonStep === 11
    ) {
      setLessonStep(12)
    }
  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])

  useEffect(() => {
    const testTube = testubeRef?.current
    const spoon = spoonRef?.current

    if (!testTube || !spoon) return

    const spoonParent = spoon.parent

    if (!spoonParent) {
      console.log("Spoon parent not found")
      return
    }

    let mouth = null

    const potassiumPieces = []
    const powderMaterials = []

    // Find potassium pieces inside the spoon
    spoon.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (childName.includes("pottasium")) {
        potassiumPieces.push({
          object: child,

          originalPosition:
            child.position.clone(),

          originalVisible:
            child.visible,

          startWorldPosition:
            new THREE.Vector3(),

          delay:
            THREE.MathUtils.randFloat(
              0,
              0.4
            ),

          speed:
            THREE.MathUtils.randFloat(
              1.5,
              3
            ),

          zDrift:
            THREE.MathUtils.randFloat(
              -0.12,
              0.12
            ),

          elapsed: 0,
          finished: false,
        })
      }
    })

    potassiumPiecesRef.current =
      potassiumPieces

    // Find mouth and powder inside test tube
    testTube.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        !mouth &&
        childName.includes("mouth")
      ) {
        mouth = child
      }

      if (
        childName.includes("powder") &&
        child.material
      ) {
        const originalMaterials =
          Array.isArray(child.material)
            ? child.material
            : [child.material]

        const clonedMaterials =
          originalMaterials.map(
            (originalMaterial) => {
              const clonedMaterial =
                originalMaterial.clone()

              clonedMaterial.transparent = true
              clonedMaterial.depthWrite = false

              clonedMaterial.opacity =
                isPotassiumTransferred
                  ? 1
                  : 0

              clonedMaterial.needsUpdate = true

              powderMaterials.push({
                object: child,
                material: clonedMaterial,
              })

              return clonedMaterial
            }
          )

        child.material = Array.isArray(
          child.material
        )
          ? clonedMaterials
          : clonedMaterials[0]

        child.visible =
          isPotassiumTransferred
      }
    })

    powderMaterialsRef.current =
      powderMaterials

    if (!mouth) {
      console.log("Test tube mouth not found")
      return
    }

    // Save original spoon transform
    originalSpoonPositionRef.current =
      spoon.position.clone()

    originalSpoonRotationRef.current =
      spoon.rotation.clone()

    // Save original test-tube transform
    originalTestTubePositionRef.current =
      testTube.position.clone()

    originalTestTubeRotationRef.current =
      testTube.rotation.clone()

    // If already transferred, keep spoon empty
    if (isPotassiumTransferred) {
      potassiumPiecesRef.current.forEach(
        (piece) => {
          piece.object.visible = false
        }
      )

      powderMaterialsRef.current.forEach(
        ({ object, material }) => {
          object.visible = true
          material.opacity = 1
          material.needsUpdate = true
        }
      )

      targetPowderOpacityRef.current = 1
    } else {
      targetPowderOpacityRef.current = 0
    }

    // Move test tube to centre
    testTube.position.x = 0
    testTube.updateMatrixWorld(true)

    spoonParent.updateMatrixWorld(true)

    const targetPosition =
      new THREE.Vector3()

    mouth.getWorldPosition(targetPosition)

    targetPosition.y += heightOffset

    targetPosition.x +=
      hand === "right"
        ? xOffset
        : -xOffset

    const localTargetPosition =
      spoonParent.worldToLocal(
        targetPosition.clone()
      )

    spoon.position.copy(
      localTargetPosition
    )

    // Set spoon rotation limits
    const startingRotationX =
      spoon.rotation.x

    spoonRotationXRef.current =
      startingRotationX

    minimumRotationXRef.current =
      startingRotationX

    maximumRotationXRef.current =
      startingRotationX + Math.PI / 2

    spoon.updateMatrixWorld(true)

    return () => {
      isPotassiumFallingRef.current = false

      const currentSpoon =
        spoonRef?.current

      const currentTestTube =
        testubeRef?.current

      // Restore spoon position and rotation
      if (
        currentSpoon &&
        originalSpoonPositionRef.current
      ) {
        currentSpoon.position.copy(
          originalSpoonPositionRef.current
        )
      }

      if (
        currentSpoon &&
        originalSpoonRotationRef.current
      ) {
        currentSpoon.rotation.copy(
          originalSpoonRotationRef.current
        )
      }

      // Restore test-tube position and rotation
      if (
        currentTestTube &&
        originalTestTubePositionRef.current
      ) {
        currentTestTube.position.copy(
          originalTestTubePositionRef.current
        )
      }

      if (
        currentTestTube &&
        originalTestTubeRotationRef.current
      ) {
        currentTestTube.rotation.copy(
          originalTestTubeRotationRef.current
        )
      }

      if (isPotassiumTransferred) {
        // Transfer completed:
        // keep spoon potassium hidden
        potassiumPiecesRef.current.forEach(
          (piece) => {
            piece.object.visible = false
          }
        )

        // Keep powder inside test tube visible
        powderMaterialsRef.current.forEach(
          ({ object, material }) => {
            object.visible = true
            material.opacity = 1
            material.needsUpdate = true
          }
        )
      } else {
        // Transfer not completed:
        // restore potassium to spoon
        potassiumPiecesRef.current.forEach(
          (piece) => {
            piece.object.position.copy(
              piece.originalPosition
            )

            piece.object.visible =
              piece.originalVisible

            piece.elapsed = 0
            piece.finished = false
          }
        )

        // Hide powder inside test tube
        powderMaterialsRef.current.forEach(
          ({ object, material }) => {
            object.visible = false
            material.opacity = 0
            material.needsUpdate = true
          }
        )
      }

      potassiumPiecesRef.current = []
      powderMaterialsRef.current = []

      currentSpoon?.updateMatrixWorld(true)
      currentTestTube?.updateMatrixWorld(true)
    }
  }, [
    testubeRef,
    spoonRef,
    hand,
    heightOffset,
    xOffset,
    isPotassiumTransferred,
  ])

  // Rotate spoon using scroll
  useEffect(() => {
    const spoon = spoonRef?.current

    if (!spoon) return

    const rotationSpeed = 0.12

    const handleWheel = (event) => {
      event.preventDefault()

      if (event.deltaY > 0) {
        spoonRotationXRef.current =
          Math.min(
            spoonRotationXRef.current +
              rotationSpeed,
            maximumRotationXRef.current
          )
      } else {
        spoonRotationXRef.current =
          Math.max(
            spoonRotationXRef.current -
              rotationSpeed,
            minimumRotationXRef.current
          )
      }

      spoon.rotation.x =
        spoonRotationXRef.current

      spoon.updateMatrixWorld(true)

      const isFullyTilted =
        spoonRotationXRef.current >=
        maximumRotationXRef.current -
          0.001

      if (
        isFullyTilted &&
        !isPotassiumFallingRef.current &&
        !isPotassiumTransferred
      ) {
        isPotassiumFallingRef.current =
          true

        targetPowderOpacityRef.current = 0

        // Show powder mesh but begin transparent
        powderMaterialsRef.current.forEach(
          ({ object, material }) => {
            object.visible = true
            material.opacity = 0
            material.needsUpdate = true
          }
        )

        // Reset spoon particles before falling
        potassiumPiecesRef.current.forEach(
          (piece) => {
            piece.elapsed = 0
            piece.finished = false
            piece.object.visible = true

            piece.object.getWorldPosition(
              piece.startWorldPosition
            )
          }
        )
      }
    }

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [
    spoonRef,
    isPotassiumTransferred,
  ])
  
  useEffect(()=>{
    if(isPotassiumTransferred && selectedLesson===8 && lessonStep ===12){
        setLessonStep(13)
    }
  },[lessonStep,selectedLesson,isPotassiumTransferred])

  useFrame((_, delta) => {
    const potassiumPieces =
      potassiumPiecesRef.current

    if (isPotassiumFallingRef.current) {
      const maximumFallDistance = 3.5

      let finishedCount = 0

      potassiumPieces.forEach((piece) => {
        if (piece.finished) {
          finishedCount += 1
          return
        }

        piece.elapsed += delta

        if (piece.elapsed < piece.delay) {
          return
        }

        const object = piece.object
        const parent = object.parent

        if (!parent) return

        parent.updateMatrixWorld(true)

        const currentWorldPosition =
          new THREE.Vector3()

        object.getWorldPosition(
          currentWorldPosition
        )

        const distanceFallen =
          piece.startWorldPosition.y -
          currentWorldPosition.y

        if (
          distanceFallen >=
          maximumFallDistance
        ) {
          piece.finished = true
          object.visible = false

          finishedCount += 1
          return
        }

        const fallAmount =
          piece.speed * delta

        currentWorldPosition.y -=
          fallAmount

        currentWorldPosition.z +=
          piece.zDrift * delta

        const localPosition =
          parent.worldToLocal(
            currentWorldPosition.clone()
          )

        object.position.copy(localPosition)
        object.updateMatrixWorld(true)
      })

      if (potassiumPieces.length > 0) {
        targetPowderOpacityRef.current =
          finishedCount /
          potassiumPieces.length
      }

      if (
        potassiumPieces.length > 0 &&
        finishedCount ===
          potassiumPieces.length
      ) {
        isPotassiumFallingRef.current =
          false

        targetPowderOpacityRef.current = 1

        // Permanently record transfer
        setIsPotassiumTransferred(true);
        setIsPottasiumCarobnateInTestube01(true)

        // Make sure all spoon particles remain hidden
        potassiumPieces.forEach(
          (piece) => {
            piece.object.visible = false
          }
        )
      }
    }

    // Gradually reveal powder
    powderMaterialsRef.current.forEach(
      ({ object, material }) => {
        if (
          targetPowderOpacityRef.current > 0 ||
          isPotassiumTransferred
        ) {
          object.visible = true
        }

        material.opacity =
          THREE.MathUtils.damp(
            material.opacity,
            isPotassiumTransferred
              ? 1
              : targetPowderOpacityRef.current,
            4,
            delta
          )

        material.needsUpdate = true
      }
    )
  })

  return null
}

export default PourIntoTestubeFromSpoon