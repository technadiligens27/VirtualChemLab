import {
  useContext,
  useEffect,
  useRef,
} from "react"
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
    setIsPotassiumTransferred,
    setIsPottasiumCarobnateInTestube01,
  } = useContext(InteractionContext)

  const spoonRotationXRef = useRef(0)
  const minimumRotationXRef = useRef(0)
  const maximumRotationXRef = useRef(0)

  const originalSpoonPositionRef = useRef(null)
  const originalSpoonRotationRef = useRef(null)

  const originalTestTubePositionRef =
    useRef(null)

  const originalTestTubeRotationRef =
    useRef(null)

  const potassiumPiecesRef = useRef([])
  const powderMaterialsRef = useRef([])

  const isPotassiumFallingRef =
    useRef(false)

  const targetPowderOpacityRef =
    useRef(0)

  const powderRevealFinishedRef =
    useRef(false)

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
    if (
      selectedLesson === 9 &&
      lessonStep === 9
    ) {
      setLessonStep(10)
    }
  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])

  useEffect(() => {
    const testTube =
      testubeRef?.current

    const spoon =
      spoonRef?.current

    if (!testTube || !spoon) return

    const spoonParent = spoon.parent

    if (!spoonParent) {
      console.log(
        "Spoon parent not found"
      )
      return
    }

    let mouth = null

    const potassiumPieces = []
    const powderMaterials = []

    spoon.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        childName.includes(
          "pottasium"
        )
      ) {
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

testTube.traverse((child) => {
  const childName =
    child.name?.toLowerCase() || ""

  // Mouth can be an Object3D or Empty,
  // so do not require child.isMesh here.
  if (
    !mouth &&
    childName.includes("mouth")
  ) {
    mouth = child

    console.log(
      "Test tube mouth found:",
      child.name
    )
  }

  // Only handle actual powder meshes here.
  if (
    child.isMesh &&
    childName.startsWith(
      "testube01-powder"
    ) &&
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

    child.material =
      Array.isArray(child.material)
        ? clonedMaterials
        : clonedMaterials[0]

    child.visible =
      isPotassiumTransferred
  }
})

    powderMaterialsRef.current =
      powderMaterials

    console.log(
      "Potassium spoon pieces:",
      potassiumPieces.length
    )

    console.log(
      "Test tube powder materials:",
      powderMaterials.length
    )

    if (!mouth) {
      console.log(
        "Test tube mouth not found"
      )
      return
    }

    originalSpoonPositionRef.current =
      spoon.position.clone()

    originalSpoonRotationRef.current =
      spoon.rotation.clone()

    originalTestTubePositionRef.current =
      testTube.position.clone()

    originalTestTubeRotationRef.current =
      testTube.rotation.clone()

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

      // The transfer animation has already
      // completed, so stop controlling opacity.
      powderRevealFinishedRef.current =
        true
    } else {
      targetPowderOpacityRef.current = 0

      powderRevealFinishedRef.current =
        false
    }

    testTube.position.x = 0
    testTube.updateMatrixWorld(true)

    spoonParent.updateMatrixWorld(true)

    const targetPosition =
      new THREE.Vector3()

    mouth.getWorldPosition(
      targetPosition
    )

    targetPosition.y +=
      heightOffset

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

    const startingRotationX =
      spoon.rotation.x

    spoonRotationXRef.current =
      startingRotationX

    minimumRotationXRef.current =
      startingRotationX

    maximumRotationXRef.current =
      startingRotationX +
      Math.PI / 2

    spoon.updateMatrixWorld(true)

    return () => {
      isPotassiumFallingRef.current =
        false

      const currentSpoon =
        spoonRef?.current

      const currentTestTube =
        testubeRef?.current

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

      // Do not continuously restore opacity here.
      // The next component must be able to fade
      // the test-tube powder independently.
      if (!isPotassiumTransferred) {
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

        powderMaterialsRef.current.forEach(
          ({ object, material }) => {
            object.visible = false
            material.opacity = 0
            material.needsUpdate = true
          }
        )
      } else {
        potassiumPiecesRef.current.forEach(
          (piece) => {
            piece.object.visible = false
          }
        )
      }

      potassiumPiecesRef.current = []
      powderMaterialsRef.current = []

      currentSpoon?.updateMatrixWorld(
        true
      )

      currentTestTube?.updateMatrixWorld(
        true
      )
    }
  }, [
    testubeRef,
    spoonRef,
    hand,
    heightOffset,
    xOffset,
    isPotassiumTransferred,
  ])

  useEffect(() => {
    const spoon =
      spoonRef?.current

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

        powderRevealFinishedRef.current =
          false

        targetPowderOpacityRef.current =
          0

        powderMaterialsRef.current.forEach(
          ({ object, material }) => {
            object.visible = true
            material.opacity = 0
            material.needsUpdate = true
          }
        )

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

  useEffect(() => {
    if (
      isPotassiumTransferred &&
      selectedLesson === 8 &&
      lessonStep === 12
    ) {
      setLessonStep(13)
    }
  }, [
    lessonStep,
    selectedLesson,
    isPotassiumTransferred,
    setLessonStep,
  ])

    useEffect(() => {
    if (
      isPotassiumTransferred &&
      selectedLesson === 9 &&
      lessonStep === 10
    ) {
      setLessonStep(11)
    }
  }, [
    lessonStep,
    selectedLesson,
    isPotassiumTransferred,
    setLessonStep,
  ])

  useFrame((_, delta) => {
    const potassiumPieces =
      potassiumPiecesRef.current

    if (
      isPotassiumFallingRef.current
    ) {
      const maximumFallDistance =
        3.5

      let finishedCount = 0

      potassiumPieces.forEach(
        (piece) => {
          if (piece.finished) {
            finishedCount += 1
            return
          }

          piece.elapsed += delta

          if (
            piece.elapsed <
            piece.delay
          ) return

          const object =
            piece.object

          const parent =
            object.parent

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

          object.position.copy(
            localPosition
          )

          object.updateMatrixWorld(true)
        }
      )

      if (
        potassiumPieces.length > 0
      ) {
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

        targetPowderOpacityRef.current =
          1

        setIsPotassiumTransferred(
          true
        )

        setIsPottasiumCarobnateInTestube01(
          true
        )

        potassiumPieces.forEach(
          (piece) => {
            piece.object.visible = false
          }
        )
      }
    }

    // Stop touching the test-tube powder
    // after its reveal reaches full opacity.
    if (
      powderRevealFinishedRef.current
    ) return

    let allPowderVisible =
      powderMaterialsRef.current.length >
      0

    powderMaterialsRef.current.forEach(
      ({ object, material }) => {
        const targetOpacity =
          targetPowderOpacityRef.current

        if (targetOpacity > 0) {
          object.visible = true
        }

        material.opacity =
          THREE.MathUtils.damp(
            material.opacity,
            targetOpacity,
            4,
            delta
          )

        if (material.opacity < 0.99) {
          allPowderVisible = false
        }

        material.needsUpdate = true
      }
    )

    if (
      isPotassiumTransferred &&
      targetPowderOpacityRef.current ===
        1 &&
      allPowderVisible
    ) {
      powderMaterialsRef.current.forEach(
        ({ object, material }) => {
          object.visible = true
          material.opacity = 1
          material.needsUpdate = true
        }
      )

      // Critical: from this point onward,
      // this component no longer changes opacity.
      powderRevealFinishedRef.current =
        true

      console.log(
        "Powder reveal completed. Opacity control released."
      )
    }
  })

  return null
}

export default PourIntoTestubeFromSpoon