import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import * as THREE from "three"
import { MainGuidelineContext } from "../../../../Contexts/MainGuidelineContext/MainGuidelineContext"



const PourFromModel = ({
  modelRef,
  otherModelRef,

  isPouring = false,

  // Maximum Y scale of the pour stream.
  pourScale = 1,

  // Pour stream growth/shrink speed.
  speed = 5,

  // Final scale of receiving liquid.
  otherLiquidEndScale = 1,

  // 0.25 means approximately 4 seconds.
  liquidSpeed = 0.25,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const pourMeshesRef = useRef([])
  const sourceLiquidsRef = useRef([])
  const receivingLiquidsRef = useRef([])

  const progressRef = useRef(0)
  const finishedRef = useRef(false)

  const isSeparatingFunnelRef =
    useRef(false)

  // ============================================
  // FIND AND PREPARE OBJECTS
  // ============================================

  useEffect(() => {
    const sourceModel =
      modelRef?.current

    const receivingModel =
      otherModelRef?.current

    console.log(
      "[PourFromModel] Source model:",
      sourceModel
    )

    console.log(
      "[PourFromModel] Receiving model:",
      receivingModel
    )

    if (!sourceModel) {
      console.error(
        "[PourFromModel] modelRef.current is missing."
      )

      return
    }

    if (!receivingModel) {
      console.error(
        "[PourFromModel] otherModelRef.current is missing."
      )

      return
    }

    const pourMeshes = []
    const sourceLiquids = []
    const receivingLiquids = []

    const foundPourMeshes =
      new Set()

    let isSeparatingFunnel = false

    // ============================================
    // FIND SOURCE POUR AND LIQUID
    // ============================================

    sourceModel.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      // Find the object containing "pour",
      // then control its inner mesh.
      if (name.includes("pour")) {
        console.log(
          "[PourFromModel] Pour parent found:",
          child.name
        )

        child.visible = true

        child.traverse((innerChild) => {
          if (!innerChild.isMesh) {
            return
          }

          if (
            foundPourMeshes.has(innerChild)
          ) {
            return
          }

          foundPourMeshes.add(innerChild)

          console.log(
            "[PourFromModel] Pour mesh found:",
            {
              name: innerChild.name,
              parent:
                innerChild.parent?.name,
              scale:
                innerChild.scale.toArray(),
              visible:
                innerChild.visible,
            }
          )

          pourMeshes.push({
            object: innerChild,

            originalScale:
              innerChild.scale.clone(),

            originalVisible:
              innerChild.visible,
          })
        })
      }

      // Find the source liquid, but ignore
      // any pour object containing "liquid".
      if (
        name.includes("liquid") &&
        !name.includes("pour")
      ) {
        console.log(
          "[PourFromModel] Source liquid found:",
          child.name
        )

        sourceLiquids.push({
          object: child,

          originalScale:
            child.scale.clone(),

          originalVisible:
            child.visible,

          startScaleY:
            child.scale.y,
        })
      }
    })

    // ============================================
    // FIND RECEIVING LIQUID
    // ============================================

    receivingModel.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      const normalizedName =
        name.replace(/[-_\s]/g, "")

      if (
        normalizedName.includes(
          "separatingfunnel"
        ) ||
        normalizedName.includes(
          "sepratingfunnel"
        )
      ) {
        isSeparatingFunnel = true
      }

      if (
        name.includes("liquid") &&
        !name.includes("pour")
      ) {
        console.log(
          "[PourFromModel] Receiving liquid found:",
          child.name
        )

        receivingLiquids.push({
          object: child,

          originalScale:
            child.scale.clone(),

          originalVisible:
            child.visible,

          startScaleX:
            child.scale.x,

          startScaleY:
            child.scale.y,

          startScaleZ:
            child.scale.z,
        })
      }
    })

    // Also check the receiving root name.
    const receivingRootName =
      receivingModel.name
        ?.toLowerCase()
        .replace(/[-_\s]/g, "") || ""

    if (
      receivingRootName.includes(
        "separatingfunnel"
      ) ||
      receivingRootName.includes(
        "sepratingfunnel"
      )
    ) {
      isSeparatingFunnel = true
    }

    pourMeshesRef.current =
      pourMeshes

    sourceLiquidsRef.current =
      sourceLiquids

    receivingLiquidsRef.current =
      receivingLiquids

    isSeparatingFunnelRef.current =
      isSeparatingFunnel

    progressRef.current = 0
    finishedRef.current = false

    // ============================================
    // INITIAL POUR STATE
    // ============================================

    pourMeshes.forEach(({ object }) => {
      object.visible = false
      object.frustumCulled = false

      object.scale.set(
        1,
        0,
        1
      )

      object.updateMatrixWorld(true)
    })

    console.log(
      "[PourFromModel] Setup results:",
      {
        pourMeshes:
          pourMeshes.map(
            ({ object }) =>
              object.name
          ),

        sourceLiquids:
          sourceLiquids.map(
            ({ object }) =>
              object.name
          ),

        receivingLiquids:
          receivingLiquids.map(
            ({ object }) =>
              object.name
          ),

        isSeparatingFunnel,
      }
    )

    if (pourMeshes.length === 0) {
      console.error(
        "[PourFromModel] No inner mesh found inside the object containing 'pour'."
      )
    }

    if (sourceLiquids.length === 0) {
      console.error(
        "[PourFromModel] No source liquid found."
      )
    }

    if (
      receivingLiquids.length === 0
    ) {
      console.error(
        "[PourFromModel] No receiving liquid found."
      )
    }

    // ============================================
    // CLEANUP
    // ============================================

    return () => {
      console.log(
        "[PourFromModel] Restoring original states."
      )

      pourMeshes.forEach((item) => {
        item.object.scale.copy(
          item.originalScale
        )

        item.object.visible =
          item.originalVisible

        item.object.updateMatrixWorld(true)
      })

      sourceLiquids.forEach((item) => {
        item.object.scale.copy(
          item.originalScale
        )

        item.object.visible =
          item.originalVisible

        item.object.updateMatrixWorld(true)
      })

      receivingLiquids.forEach((item) => {
        item.object.scale.copy(
          item.originalScale
        )

        item.object.visible =
          item.originalVisible

        item.object.updateMatrixWorld(true)
      })

      pourMeshesRef.current = []
      sourceLiquidsRef.current = []
      receivingLiquidsRef.current = []

      progressRef.current = 0
      finishedRef.current = false

      isSeparatingFunnelRef.current =
        false
    }
  }, [
    modelRef,
    otherModelRef,
  ])

  // ============================================
  // DEBUG POURING STATE
  // ============================================

  useEffect(() => {
    console.log(
      "[PourFromModel] isPouring:",
      isPouring
    )
  }, [isPouring])

  // ============================================
  // ANIMATION
  // ============================================

  useFrame((_, delta) => {
    const transferIsActive =
      Boolean(isPouring) &&
      !finishedRef.current

    // ============================================
    // UPDATE SHARED TRANSFER PROGRESS
    // ============================================

    if (transferIsActive) {
      progressRef.current =
        Math.min(
          progressRef.current +
            liquidSpeed * delta,
          1
        )

      if (progressRef.current >= 1) {
        progressRef.current = 1
        finishedRef.current = true

        console.log(
          "[PourFromModel] Transfer finished."
        )

        // Advance lesson 14.1:
        // step 38 -> step 39.
        if (
          selectedLesson === 14.1 &&
          lessonStep === 38
        ) {
          console.log(
            "[PourFromModel] Advancing lesson step 38 -> 39."
          )

          setLessonStep(39)
        }
      }
    }

    const progress =
      progressRef.current

    // ============================================
    // REDUCE SOURCE LIQUID
    // ============================================

    sourceLiquidsRef.current.forEach(
      ({
        object,
        startScaleY,
      }) => {
        object.scale.y =
          THREE.MathUtils.lerp(
            startScaleY,
            0,
            progress
          )

        if (object.scale.y <= 0.001) {
          object.scale.y = 0
          object.visible = false
        } else {
          object.visible = true
        }

        object.updateMatrix()
      }
    )

    // ============================================
    // INCREASE RECEIVING LIQUID
    // ============================================

    receivingLiquidsRef.current.forEach(
      ({
        object,
        startScaleX,
        startScaleY,
        startScaleZ,
      }) => {
        if (
          isSeparatingFunnelRef.current
        ) {
          // Separating funnel:
          // scale X, Y and Z.
          object.scale.x =
            THREE.MathUtils.lerp(
              startScaleX,
              otherLiquidEndScale,
              progress
            )

          object.scale.y =
            THREE.MathUtils.lerp(
              startScaleY,
              otherLiquidEndScale,
              progress
            )

          object.scale.z =
            THREE.MathUtils.lerp(
              startScaleZ,
              otherLiquidEndScale,
              progress
            )
        } else {
          // Other models:
          // scale only Y.
          object.scale.y =
            THREE.MathUtils.lerp(
              startScaleY,
              otherLiquidEndScale,
              progress
            )
        }

        object.visible =
          object.scale.y > 0.001

        object.updateMatrix()
      }
    )

    // ============================================
    // POUR STREAM
    // ============================================

    const showPourStream =
      Boolean(isPouring) &&
      !finishedRef.current

    pourMeshesRef.current.forEach(
      ({ object }) => {
        if (showPourStream) {
          object.visible = true
          object.frustumCulled = false

          if (object.parent) {
            object.parent.visible = true
          }

          object.scale.y =
            Math.min(
              object.scale.y +
                speed * delta,
              pourScale
            )
        } else {
          object.scale.y =
            Math.max(
              object.scale.y -
                speed * delta,
              0
            )

          if (object.scale.y <= 0) {
            object.scale.y = 0
            object.visible = false
          }
        }

        object.updateMatrixWorld(true)
      }
    )
  })

  return null
}

export default PourFromModel