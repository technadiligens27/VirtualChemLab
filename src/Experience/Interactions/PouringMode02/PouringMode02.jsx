import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import * as THREE from "three"

import PourFromModel from "../Pouring/PourFromModel/PourFromModel"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

const PouringMode02 = ({
  pourModelRef,
  receiveModelRef,

  hand,

  // Pour model offset from mouth.
  pourModelXOffset = 0,
  pourModelYOffset = 0,
  pourModelZOffset = 0,

  pourModelScale = 1,

  // Fixed pour-model rotation.
  pourModelXRotation = 0,
  pourModelYRotation = 0,
  pourModelZRotation = 0,

  // Receiving-model offsets.
  receiveModelXOffset = 0,
  receiveModelYOffset = 0,
  receiveModelZOffset = 0,

  receiveModelScale = 1,

  // Scroll rotation settings.
  maximumRotation = Math.PI / 5,
  rotationSpeed = 0.15,
}) => {
  const rotationZRef =
    useRef(0)

  const baseRotationRef =
    useRef(
      new THREE.Euler()
    )

  const isReadyRef =
    useRef(false)

  const [
    isPouring,
    setIsPouring,
  ] = useState(false)

  const {
    selectedLeftHand,
    selectedRightHand,
  } = useContext(
    InteractionContext
  )

  const {
    conicalBeakerRef02,
    roundBeakerRef,testube01Ref
  } = useContext(
    ModelContext
  )

  // ==========================================
  // POSITION AND SCALE MODELS
  // ==========================================

  useLayoutEffect(() => {
    const pourModel =
      pourModelRef?.current

    const receiveModel =
      receiveModelRef?.current

    if (!pourModel || !receiveModel) {
      console.log(
        "Pouring or receiving model was not found"
      )

      return
    }

    if (pourModel === receiveModel) {
      console.log(
        "Pouring and receiving models cannot be the same"
      )

      return
    }

    const pourParent =
      pourModel.parent

    const receiveParent =
      receiveModel.parent

    if (!pourParent || !receiveParent) {
      console.log(
        "Both models must have a parent"
      )

      return
    }

    // ========================================
    // SAVE POUR MODEL STATE
    // ========================================

    const originalPourState = {
      parent:
        pourParent,

      position:
        pourModel.position.clone(),

      quaternion:
        pourModel.quaternion.clone(),

      scale:
        pourModel.scale.clone(),

      visible:
        pourModel.visible,

      matrixAutoUpdate:
        pourModel.matrixAutoUpdate,
    }

    // ========================================
    // SAVE RECEIVE MODEL STATE
    // ========================================

    const originalReceiveState = {
      parent:
        receiveParent,

      position:
        receiveModel.position.clone(),

      quaternion:
        receiveModel.quaternion.clone(),

      scale:
        receiveModel.scale.clone(),

      visible:
        receiveModel.visible,

      matrixAutoUpdate:
        receiveModel.matrixAutoUpdate,
    }

    // ========================================
    // FIND AND HIDE POUR-MODEL BUNGS
    // ========================================

    const bungChildren = []

    pourModel.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        childName.includes("bung")
      ) {
        bungChildren.push(child)

        child.visible = false

        console.log(
          "Hidden bung:",
          child.name
        )
      }
    })

    // ========================================
    // FIND RECEIVING MODEL MOUTH
    // ========================================

    let mouth = null

    receiveModel.traverse((child) => {
      if (mouth) return

      const childName =
        child.name?.toLowerCase() || ""

      if (
        childName.includes("mouth")
      ) {
        mouth = child
      }
    })

    if (!mouth) {
      console.log(
        "A child containing 'mouth' was not found"
      )

      // Restore bung visibility because
      // the effect cannot continue.
      bungChildren.forEach((child) => {
        child.visible = true
      })

      return
    }

    pourModel.matrixAutoUpdate = true
    receiveModel.matrixAutoUpdate = true

    // ========================================
    // POSITION AND SCALE RECEIVE MODEL
    // ========================================

    receiveModel.position.set(
      originalReceiveState.position.x +
        receiveModelXOffset,

      originalReceiveState.position.y +
        receiveModelYOffset,

      originalReceiveState.position.z +
        receiveModelZOffset
    )

    receiveModel.scale.copy(
      originalReceiveState.scale
    )

    receiveModel.scale.multiplyScalar(
      receiveModelScale
    )

    // Keep this if you want the receiving
    // model's X position forced to zero.
    receiveModel.position.x = 0

    receiveModel.updateMatrix()
    receiveModel.updateMatrixWorld(true)

    mouth.updateMatrixWorld(true)

    // ========================================
    // COPY MOUTH POSITION
    // ========================================

    const mouthWorldPosition =
      new THREE.Vector3()

    mouth.getWorldPosition(
      mouthWorldPosition
    )

    pourParent.updateMatrixWorld(true)

    // Convert the mouth world position into
    // the pour model parent's local space.
    const mouthLocalPosition =
      pourParent.worldToLocal(
        mouthWorldPosition.clone()
      )

    // Keep the pour model's original parent.
    // It is not attached to the mouth.
    pourModel.position.set(
      mouthLocalPosition.x +
        pourModelXOffset,

      mouthLocalPosition.y +
        pourModelYOffset,

      mouthLocalPosition.z +
        pourModelZOffset
    )

    // ========================================
    // SCALE POUR MODEL
    // ========================================

    pourModel.scale.copy(
      originalPourState.scale
    )

    pourModel.scale.multiplyScalar(
      pourModelScale
    )

    // ========================================
    // APPLY FIXED ROTATION
    // ========================================

    pourModel.quaternion.copy(
      originalPourState.quaternion
    )

    pourModel.rotation.x +=
      pourModelXRotation

    pourModel.rotation.y +=
      pourModelYRotation

    pourModel.rotation.z +=
      pourModelZRotation

    pourModel.updateMatrix()
    pourModel.updateMatrixWorld(true)

    // Save the rotation before applying
    // the scroll-controlled rotation.
    baseRotationRef.current.copy(
      pourModel.rotation
    )

    rotationZRef.current = 0
    isReadyRef.current = true

    setIsPouring(false)

    console.log(
      "Pour model moved to mouth position:",
      mouth.name
    )

    // ========================================
    // CLEANUP
    // ========================================

    return () => {
      isReadyRef.current = false
      rotationZRef.current = 0

      // Make all bung children visible again.
      bungChildren.forEach((child) => {
        child.visible = true

        console.log(
          "Restored bung:",
          child.name
        )
      })

      // Restore pour model parent if another
      // component changed it.
      if (
        originalPourState.parent &&
        pourModel.parent !==
          originalPourState.parent
      ) {
        originalPourState.parent.add(
          pourModel
        )
      }

      // Restore receive model parent if another
      // component changed it.
      if (
        originalReceiveState.parent &&
        receiveModel.parent !==
          originalReceiveState.parent
      ) {
        originalReceiveState.parent.add(
          receiveModel
        )
      }

      // Restore pour model completely.
      pourModel.position.copy(
        originalPourState.position
      )

      pourModel.quaternion.copy(
        originalPourState.quaternion
      )

      pourModel.scale.copy(
        originalPourState.scale
      )

      pourModel.visible =
        originalPourState.visible

      pourModel.matrixAutoUpdate =
        originalPourState.matrixAutoUpdate

      // Restore receiving model completely.
      receiveModel.position.copy(
        originalReceiveState.position
      )

      receiveModel.quaternion.copy(
        originalReceiveState.quaternion
      )

      receiveModel.scale.copy(
        originalReceiveState.scale
      )

      receiveModel.visible =
        originalReceiveState.visible

      receiveModel.matrixAutoUpdate =
        originalReceiveState.matrixAutoUpdate

      pourModel.updateMatrix()
      pourModel.updateMatrixWorld(true)

      receiveModel.updateMatrix()
      receiveModel.updateMatrixWorld(true)
    }
  }, [
    pourModelRef,
    receiveModelRef,

    pourModelXOffset,
    pourModelYOffset,
    pourModelZOffset,
    pourModelScale,

    pourModelXRotation,
    pourModelYRotation,
    pourModelZRotation,

    receiveModelXOffset,
    receiveModelYOffset,
    receiveModelZOffset,
    receiveModelScale,
  ])

  // ==========================================
  // MOUSE-WHEEL ROTATION
  // ==========================================

  useEffect(() => {
    const handleWheel = (event) => {
      if (
        !isReadyRef.current ||
        !pourModelRef?.current
      ) {
        return
      }

      event.preventDefault()

      if (event.deltaY > 0) {
        rotationZRef.current =
          Math.min(
            rotationZRef.current +
              rotationSpeed,

            maximumRotation
          )
      }

      if (event.deltaY < 0) {
        rotationZRef.current =
          Math.max(
            rotationZRef.current -
              rotationSpeed,

            0
          )
      }

      const isFullyRotated =
        rotationZRef.current >=
        maximumRotation - 0.001

      setIsPouring(
        isFullyRotated
      )
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
    pourModelRef,
    maximumRotation,
    rotationSpeed,
  ])

  // ==========================================
  // APPLY SCROLL ROTATION
  // ==========================================

  useFrame(() => {
    const pourModel =
      pourModelRef?.current

    if (
      !pourModel ||
      !isReadyRef.current
    ) {
      return
    }

    const handRotationDirection =
      hand?.toLowerCase() === "left"
        ? -1
        : 1

    pourModel.rotation.set(
      baseRotationRef.current.x,

      baseRotationRef.current.y,

      baseRotationRef.current.z +
        rotationZRef.current *
          handRotationDirection
    )

    pourModel.updateMatrixWorld(true)
  })

  return (
    <>
      {selectedLeftHand?.name ===
        "main-Conical-Flask-02" &&
        selectedRightHand?.name ===
          "main-Round-bottom-flask" && (
          <PourFromModel
            isPouring={isPouring}
            modelRef={
              conicalBeakerRef02
            }
            otherModelRef={
              roundBeakerRef
            }
            modelLiquidEndScale={0.1}
            otherLiquidEndScale={1}
            otherLiquidColor = {"#F4D35E"}
          />
        )}

      {selectedLeftHand?.name ===
        "main-Conical-Flask-02" &&
        selectedRightHand?.name ===
          "main-testube-01" && (
          <PourFromModel
            isPouring={isPouring}
            modelRef={
              conicalBeakerRef02
            }
            otherModelRef={
              testube01Ref
            }
            modelLiquidEndScale={0}
            otherLiquidEndScale={11.4}
            otherLiquidColor = {"#ffffff"}
            speed={15}
          />
        )}


    </>
  )
}

export default PouringMode02