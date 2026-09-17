import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import * as THREE from "three"

import {
  MainGuidelineContext,
} from "../../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PourFromModel = ({
  modelRef,
  otherModelRef,

  isPouring = false,

  pourScale = 1,
  speed = 5,

  modelLiquidEndScale = 0,
  otherLiquidEndScale = 1,

  otherLiquidOpacity = 0.35,
  otherLiquidColor = "#DCEFF7",

  liquidSpeed = 0.25,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const pourMeshesRef =
    useRef([])

  const sourceLiquidsRef =
    useRef([])

  const receivingLiquidsRef =
    useRef([])

  const progressRef =
    useRef(0)

  const finishedRef =
    useRef(false)

  const isSourceSeparatingFunnelRef =
    useRef(false)

  const isReceivingSeparatingFunnelRef =
    useRef(false)

  const isSourceConicalFlask02Ref =
    useRef(false)

  // Special receiving-model case.
  const isReceivingRoundBottomFlaskRef =
    useRef(false)

  // ============================================
  // NAME HELPERS
  // ============================================

  const normalizeName = (name) =>
    (
      name?.toLowerCase() || ""
    ).replace(/[-_\s]/g, "")

  const modelContainsName = (
    model,
    expectedName
  ) => {
    const normalizedExpectedName =
      normalizeName(expectedName)

    if (
      normalizeName(model?.name) ===
      normalizedExpectedName
    ) {
      return true
    }

    let found = false

    model?.traverse((child) => {
      if (
        normalizeName(child.name) ===
        normalizedExpectedName
      ) {
        found = true
      }
    })

    return found
  }

  // ============================================
  // MODEL CHECKS
  // ============================================

  const checkIsSeparatingFunnel = (
    model
  ) => {
    let found = false

    model?.traverse((child) => {
      const name =
        normalizeName(child.name)

      if (
        name.includes(
          "separatingfunnel"
        ) ||
        name.includes(
          "sepratingfunnel"
        )
      ) {
        found = true
      }
    })

    return found
  }

  const checkIsConicalFlask02 = (
    model
  ) =>
    modelContainsName(
      model,
      "main-Conical-Flask-02"
    )

  const checkIsRoundBottomFlask = (
    model
  ) =>
    modelContainsName(
      model,
      "main-Round-bottom-flask"
    )

  // ============================================
  // INITIALIZE
  // ============================================

  useEffect(() => {
    const sourceModel =
      modelRef?.current

    const receivingModel =
      otherModelRef?.current

    if (!sourceModel) {
      console.error(
        "[PourFromModel] Source model is missing."
      )

      return
    }

    if (!receivingModel) {
      console.error(
        "[PourFromModel] Receiving model is missing."
      )

      return
    }

    const pourMeshes = []
    const sourceLiquids = []
    const receivingLiquids = []

    const foundPourMeshes =
      new Set()

    const foundSourceLiquids =
      new Set()

    const foundReceivingLiquids =
      new Set()

    const preparedReceivingMeshes =
      new Set()

    // ==========================================
    // IDENTIFY SOURCE AND RECEIVING MODELS
    // ==========================================

    isSourceSeparatingFunnelRef.current =
      checkIsSeparatingFunnel(
        sourceModel
      )

    isReceivingSeparatingFunnelRef.current =
      checkIsSeparatingFunnel(
        receivingModel
      )

    isSourceConicalFlask02Ref.current =
      checkIsConicalFlask02(
        sourceModel
      )

    isReceivingRoundBottomFlaskRef.current =
      checkIsRoundBottomFlask(
        receivingModel
      )

    console.log(
      "[PourFromModel] Source:",
      sourceModel.name
    )

    console.log(
      "[PourFromModel] Receiver:",
      receivingModel.name
    )

    console.log(
      "[PourFromModel] Receiver is round-bottom flask:",
      isReceivingRoundBottomFlaskRef.current
    )

    // ==========================================
    // FIND SOURCE STREAMS AND LIQUIDS
    // ==========================================

    sourceModel.traverse((child) => {
      const name =
        child.name?.toLowerCase() ||
        ""

      const normalizedName =
        normalizeName(child.name)

      // Find pour streams.
      if (name.includes("pour")) {
        child.traverse(
          (innerChild) => {
            if (!innerChild.isMesh) {
              return
            }

            if (
              foundPourMeshes.has(
                innerChild
              )
            ) {
              return
            }

            foundPourMeshes.add(
              innerChild
            )

            pourMeshes.push({
              object:
                innerChild,

              originalScale:
                innerChild.scale.clone(),

              originalVisible:
                innerChild.visible,

              originalFrustumCulled:
                innerChild.frustumCulled,
            })
          }
        )
      }

      const isConicalUpper =
        normalizedName.includes(
          "conicalflask02liquidupper"
        )

      const isConicalBottom =
        normalizedName.includes(
          "conicalflask02liquidbottom"
        )

      const isConicalLiquid =
        isConicalUpper ||
        isConicalBottom

      const isNormalLiquid =
        name.includes("liquid") &&
        !name.includes("pour")

      const shouldIncludeLiquid =
        isSourceConicalFlask02Ref.current
          ? isConicalLiquid
          : isNormalLiquid

      if (
        !shouldIncludeLiquid ||
        foundSourceLiquids.has(child)
      ) {
        return
      }

      foundSourceLiquids.add(child)

      sourceLiquids.push({
        object:
          child,

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

        isConicalLiquid,
      })
    })

    // ==========================================
    // FIND RECEIVING LIQUIDS
    // ==========================================

    receivingModel.traverse(
      (child) => {
        const name =
          child.name?.toLowerCase() ||
          ""

        if (
          !name.includes("liquid") ||
          name.includes("pour") ||
          foundReceivingLiquids.has(
            child
          )
        ) {
          return
        }

        foundReceivingLiquids.add(
          child
        )

        const liquidMeshes = []

        child.traverse(
          (liquidChild) => {
            if (!liquidChild.isMesh) {
              return
            }

            if (
              preparedReceivingMeshes.has(
                liquidChild
              )
            ) {
              return
            }

            preparedReceivingMeshes.add(
              liquidChild
            )

            const originalMaterial =
              liquidChild.material

            const originalMaterials =
              Array.isArray(
                originalMaterial
              )
                ? originalMaterial
                : [originalMaterial]

            const clonedMaterials =
              originalMaterials.map(
                (material) => {
                  if (!material) {
                    return null
                  }

                  const clonedMaterial =
                    material.clone()

                  clonedMaterial.transparent =
                    true

                  clonedMaterial.needsUpdate =
                    true

                  return clonedMaterial
                }
              )

            liquidChild.material =
              Array.isArray(
                originalMaterial
              )
                ? clonedMaterials
                : clonedMaterials[0]

            liquidMeshes.push({
              object:
                liquidChild,

              originalVisible:
                liquidChild.visible,

              originalFrustumCulled:
                liquidChild.frustumCulled,

              originalMaterial,

              clonedMaterials,

              startOpacities:
                clonedMaterials.map(
                  (material) =>
                    material?.opacity ??
                    1
                ),

              startColors:
                clonedMaterials.map(
                  (material) =>
                    material?.color
                      ? material.color.clone()
                      : null
                ),
            })
          }
        )

        receivingLiquids.push({
          object:
            child,

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

          liquidMeshes,
        })
      }
    )

    pourMeshesRef.current =
      pourMeshes

    sourceLiquidsRef.current =
      sourceLiquids

    receivingLiquidsRef.current =
      receivingLiquids

    progressRef.current = 0
    finishedRef.current = false

    // ==========================================
    // INITIAL POUR-STREAM STATE
    // ==========================================

    pourMeshes.forEach(
      ({ object }) => {
        object.visible = false
        object.frustumCulled = false

        object.scale.y = 0

        object.updateMatrixWorld(true)
      }
    )

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

    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {
      const transferOccurred =
        progressRef.current > 0

      // Restore pour streams.
      pourMeshes.forEach((item) => {
        item.object.scale.copy(
          item.originalScale
        )

        item.object.visible =
          item.originalVisible

        item.object.frustumCulled =
          item.originalFrustumCulled

        item.object.updateMatrixWorld(
          true
        )
      })

      // Preserve source final state.
      sourceLiquids.forEach((item) => {
        if (transferOccurred) {
          if (
            isSourceSeparatingFunnelRef.current
          ) {
            item.object.scale.set(
              modelLiquidEndScale,
              modelLiquidEndScale,
              modelLiquidEndScale
            )
          } else {
            item.object.scale.y =
              modelLiquidEndScale
          }

          item.object.visible =
            modelLiquidEndScale >
            0.001
        } else {
          item.object.scale.copy(
            item.originalScale
          )

          item.object.visible =
            item.originalVisible
        }

        item.object.updateMatrixWorld(
          true
        )
      })

      // Preserve receiving final state,
      // or restore if no transfer occurred.
      receivingLiquids.forEach(
        (item) => {
          if (transferOccurred) {
            item.object.visible = true

            item.liquidMeshes.forEach(
              (meshItem) => {
                meshItem.object.visible =
                  true

                meshItem.object.frustumCulled =
                  false
              }
            )
          } else {
            item.object.scale.copy(
              item.originalScale
            )

            item.object.visible =
              item.originalVisible

            item.liquidMeshes.forEach(
              (meshItem) => {
                meshItem.object.material =
                  meshItem.originalMaterial

                meshItem.object.visible =
                  meshItem.originalVisible

                meshItem.object.frustumCulled =
                  meshItem.originalFrustumCulled

                meshItem.clonedMaterials.forEach(
                  (material) => {
                    material?.dispose()
                  }
                )
              }
            )
          }

          item.object.updateMatrixWorld(
            true
          )
        }
      )

      pourMeshesRef.current = []
      sourceLiquidsRef.current = []
      receivingLiquidsRef.current = []

      progressRef.current = 0
      finishedRef.current = false

      isSourceSeparatingFunnelRef.current =
        false

      isReceivingSeparatingFunnelRef.current =
        false

      isSourceConicalFlask02Ref.current =
        false

      isReceivingRoundBottomFlaskRef.current =
        false
    }
  }, [
    modelRef,
    otherModelRef,
    modelLiquidEndScale,
  ])

  // ============================================
  // ANIMATION
  // ============================================

  useFrame((_, delta) => {
    const transferIsActive =
      Boolean(isPouring) &&
      !finishedRef.current

    // ==========================================
    // UPDATE PROGRESS
    // ==========================================

    if (transferIsActive) {
      progressRef.current =
        Math.min(
          progressRef.current +
            liquidSpeed * delta,

          1
        )

      if (
        progressRef.current >= 1
      ) {
        progressRef.current = 1
        finishedRef.current = true

        if (
          selectedLesson === 14.1 &&
          lessonStep === 38
        ) {
          setLessonStep(39)
        }

        if (
          selectedLesson === 14.1 &&
          lessonStep === 43
        ) {
          setLessonStep(44)
        }

        if (
          selectedLesson === 14.1 &&
          lessonStep === 49
        ) {
          setLessonStep(50)
        }

        if (
          selectedLesson === 14.1 &&
          lessonStep === 61
        ) {
          setLessonStep(62)
        }

        if (
          selectedLesson === 14.2 &&
          lessonStep === 67
        ) {
          setLessonStep(68)
        }

        if (
          selectedLesson === 14.2 &&
          lessonStep === 81
        ) {
          setLessonStep(82)
        }

        if (
          selectedLesson === 14.2 &&
          lessonStep === 84
        ) {
          setLessonStep(85)
        }

        if (
          selectedLesson === 14.3 &&
          lessonStep === 96
        ) {
          setLessonStep(97)
        }
      }
    }

    const progress =
      progressRef.current

    const finalSourceScale =
      Math.max(
        0,
        modelLiquidEndScale
      )

    const finalOpacity =
      THREE.MathUtils.clamp(
        otherLiquidOpacity,
        0,
        1
      )

    const finalLiquidColor =
      new THREE.Color(
        otherLiquidColor
      )

    // ==========================================
    // DECREASE SOURCE LIQUIDS
    // ==========================================

    sourceLiquidsRef.current.forEach(
      ({
        object,
        startScaleX,
        startScaleY,
        startScaleZ,
        isConicalLiquid,
      }) => {
        if (
          isSourceConicalFlask02Ref.current &&
          isConicalLiquid
        ) {
          // Both Conical Flask 02 liquids
          // decrease on Y.
          object.scale.y =
            THREE.MathUtils.lerp(
              startScaleY,
              finalSourceScale,
              progress
            )
        } else if (
          isSourceSeparatingFunnelRef.current
        ) {
          object.scale.x =
            THREE.MathUtils.lerp(
              startScaleX,
              finalSourceScale,
              progress
            )

          object.scale.y =
            THREE.MathUtils.lerp(
              startScaleY,
              finalSourceScale,
              progress
            )

          object.scale.z =
            THREE.MathUtils.lerp(
              startScaleZ,
              finalSourceScale,
              progress
            )
        } else {
          object.scale.y =
            THREE.MathUtils.lerp(
              startScaleY,
              finalSourceScale,
              progress
            )
        }

        if (
          isSourceSeparatingFunnelRef.current
        ) {
          object.visible =
            Math.abs(object.scale.x) >
              0.001 ||
            Math.abs(object.scale.y) >
              0.001 ||
            Math.abs(object.scale.z) >
              0.001
        } else {
          object.visible =
            Math.abs(object.scale.y) >
            0.001
        }

        if (!object.visible) {
          if (
            isSourceSeparatingFunnelRef.current
          ) {
            object.scale.set(0, 0, 0)
          } else {
            object.scale.y = 0
          }
        }

        object.updateMatrixWorld(true)
      }
    )

    // ==========================================
    // INCREASE RECEIVING LIQUIDS
    // ==========================================

    receivingLiquidsRef.current.forEach(
      ({
        object,
        startScaleX,
        startScaleY,
        startScaleZ,
        liquidMeshes,
      }) => {
        /*
         * Scale on all axes when receiving:
         *
         * 1. Separating funnel
         * 2. main-Round-bottom-flask
         */
        const scaleAllAxes =
          isReceivingSeparatingFunnelRef.current ||
          isReceivingRoundBottomFlaskRef.current

        if (scaleAllAxes) {
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
          object.scale.y =
            THREE.MathUtils.lerp(
              startScaleY,
              otherLiquidEndScale,
              progress
            )
        }

        if (scaleAllAxes) {
          object.visible =
            Math.abs(object.scale.x) >
              0.001 ||
            Math.abs(object.scale.y) >
              0.001 ||
            Math.abs(object.scale.z) >
              0.001
        } else {
          object.visible =
            Math.abs(object.scale.y) >
            0.001
        }

        liquidMeshes.forEach(
          ({
            object: liquidMesh,
            clonedMaterials,
            startOpacities,
            startColors,
          }) => {
            if (progress > 0) {
              liquidMesh.visible = true

              liquidMesh.frustumCulled =
                false

              let currentParent =
                liquidMesh.parent

              while (
                currentParent &&
                currentParent !==
                  otherModelRef?.current
              ) {
                currentParent.visible =
                  true

                currentParent =
                  currentParent.parent
              }
            }

            clonedMaterials.forEach(
              (material, index) => {
                if (!material) return

                material.transparent =
                  true

                material.opacity =
                  THREE.MathUtils.lerp(
                    startOpacities[index],
                    finalOpacity,
                    progress
                  )

                material.depthWrite =
                  material.opacity >= 1

                const startColor =
                  startColors[index]

                if (
                  material.color &&
                  startColor
                ) {
                  material.color.lerpColors(
                    startColor,
                    finalLiquidColor,
                    progress
                  )
                }

                material.needsUpdate =
                  true
              }
            )
          }
        )

        object.updateMatrix()
        object.updateMatrixWorld(true)
      }
    )

    // ==========================================
    // POUR STREAM
    // ==========================================

    const showPourStream =
      Boolean(isPouring) &&
      !finishedRef.current

    pourMeshesRef.current.forEach(
      ({ object }) => {
        if (showPourStream) {
          object.visible = true
          object.frustumCulled = false

          if (object.parent) {
            object.parent.visible =
              true
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

          if (
            object.scale.y <= 0
          ) {
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