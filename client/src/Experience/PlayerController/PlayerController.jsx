import {
  useFrame,
  useThree,
} from "@react-three/fiber"

import {
  useContext,
  useEffect,
  useRef,
} from "react"

import * as THREE from "three"

import {
  InteractionContext,
} from "../../Contexts/InteractionContext/InteractionContext"

const PlayerController = ({
  // Add only models the player
  // should NOT walk through.
  blockedModels = [],

  playerRadius = 0.7,

  playerStandingHeight = 10.6,

  playerSittingHeight = 9,

  movementSpeed = 25,
}) => {
  const {
    camera,
  } = useThree()

  const {
    hasSat,
  } = useContext(
    InteractionContext
  )

  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  const modelBoxRef =
    useRef(new THREE.Box3())

  const forwardRef =
    useRef(new THREE.Vector3())

  const rightRef =
    useRef(new THREE.Vector3())

  const movementRef =
    useRef(new THREE.Vector3())

  const nextPositionRef =
    useRef(new THREE.Vector3())

  // =========================================================
  // CHECK IF PLAYER WOULD HIT A BLOCKED MODEL
  // =========================================================

  const doesPlayerHitBlockedModel = (
    nextPosition
  ) => {
    return blockedModels.some(
      (modelRef) => {
        const model =
          modelRef?.current

        if (
          !model ||
          !model.visible
        ) {
          return false
        }

        model.updateWorldMatrix(
          true,
          true
        )

        modelBoxRef.current.setFromObject(
          model
        )

        const modelBox =
          modelBoxRef.current

        return (
          nextPosition.x +
            playerRadius >
            modelBox.min.x &&
          nextPosition.x -
            playerRadius <
            modelBox.max.x &&
          nextPosition.z +
            playerRadius >
            modelBox.min.z &&
          nextPosition.z -
            playerRadius <
            modelBox.max.z
        )
      }
    )
  }

  // =========================================================
  // KEYBOARD CONTROLS
  // =========================================================

  useEffect(() => {
    const handleKeyDown = (
      event
    ) => {
      if (event.code === "KeyW") {
        keys.current.forward = true
      }

      if (event.code === "KeyS") {
        keys.current.backward = true
      }

      if (event.code === "KeyA") {
        keys.current.left = true
      }

      if (event.code === "KeyD") {
        keys.current.right = true
      }
    }

    const handleKeyUp = (
      event
    ) => {
      if (event.code === "KeyW") {
        keys.current.forward = false
      }

      if (event.code === "KeyS") {
        keys.current.backward = false
      }

      if (event.code === "KeyA") {
        keys.current.left = false
      }

      if (event.code === "KeyD") {
        keys.current.right = false
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    )

    window.addEventListener(
      "keyup",
      handleKeyUp
    )

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      )

      window.removeEventListener(
        "keyup",
        handleKeyUp
      )
    }
  }, [])

  // =========================================================
  // PLAYER MOVEMENT + COLLISION
  // =========================================================

  useFrame((_, delta) => {
    // Keep seated user in chair position.
    if (hasSat.current) {
      camera.position.y =
        playerSittingHeight

      return
    }

    const forward =
      forwardRef.current

    const right =
      rightRef.current

    const movement =
      movementRef.current

    const nextPosition =
      nextPositionRef.current

    // ==========================================
    // CAMERA FORWARD DIRECTION
    // ==========================================

    camera.getWorldDirection(
      forward
    )

    // Do not move up/down when camera looks up.
    forward.y = 0

    forward.normalize()

    // ==========================================
    // CAMERA RIGHT DIRECTION
    // ==========================================

    right.crossVectors(
      forward,
      camera.up
    )

    right.normalize()

    // ==========================================
    // CREATE MOVEMENT VECTOR
    // ==========================================

    movement.set(0, 0, 0)

    if (keys.current.forward) {
      movement.add(forward)
    }

    if (keys.current.backward) {
      movement.sub(forward)
    }

    if (keys.current.left) {
      movement.sub(right)
    }

    if (keys.current.right) {
      movement.add(right)
    }

    // Keep player on floor when not moving.
    if (movement.lengthSq() === 0) {
      camera.position.y =
        playerStandingHeight

      return
    }

    movement.normalize()

    movement.multiplyScalar(
      movementSpeed * delta
    )

    // ==========================================
    // MOVE X AXIS
    //
    // Separate X and Z checking makes the player
    // slide smoothly beside a wall.
    // ==========================================

    nextPosition.copy(
      camera.position
    )

    nextPosition.x +=
      movement.x

    if (
      !doesPlayerHitBlockedModel(
        nextPosition
      )
    ) {
      camera.position.x =
        nextPosition.x
    }

    // ==========================================
    // MOVE Z AXIS
    // ==========================================

    nextPosition.copy(
      camera.position
    )

    nextPosition.z +=
      movement.z

    if (
      !doesPlayerHitBlockedModel(
        nextPosition
      )
    ) {
      camera.position.z =
        nextPosition.z
    }

    // Keep player at walking height.
    camera.position.y =
      playerStandingHeight
  })

  return null
}

export default PlayerController