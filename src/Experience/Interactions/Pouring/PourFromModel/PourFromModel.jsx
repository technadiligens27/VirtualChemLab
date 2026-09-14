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
import ChlorinationSeparatingFunnelColorChange from "../../ChlorinationSeparatingFunnelColorChange/ChlorinationSeparatingFunnelColorChange"
import { ModelContext } from "../../../../Contexts/ModelContext/ModelContext"

const PourFromModel = ({
  modelRef,
  otherModelRef,

  isPouring = false,

  // Maximum Y-scale of the pouring stream.
  pourScale = 1,

  // Pour-stream animation speed.
  speed = 5,

  // Final scale of the source liquid.
  modelLiquidEndScale = 0,

  // Final scale of the receiving liquid.
  otherLiquidEndScale = 1,

  // Final receiving-liquid opacity.
  otherLiquidOpacity = 0.35,

  // Final receiving-liquid colour.
  otherLiquidColor = "#DCEFF7",

  // 0.25 means approximately four seconds.
  liquidSpeed = 0.25,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const {seperatingFunnelRef} = useContext(ModelContext)

  const pourMeshesRef = useRef([])
  const sourceLiquidsRef = useRef([])
  const receivingLiquidsRef = useRef([])

  const progressRef = useRef(0)
  const finishedRef = useRef(false)

  const isSourceSeparatingFunnelRef =
    useRef(false)

  const isReceivingSeparatingFunnelRef =
    useRef(false)

  // ============================================
  // CHECK WHETHER A MODEL IS A
  // SEPARATING FUNNEL
  // ============================================

  const checkIsSeparatingFunnel = (
    model
  ) => {
    let isSeparatingFunnel = false

    model?.traverse((child) => {
      const normalizedName =
        (
          child.name?.toLowerCase() ||
          ""
        ).replace(/[-_\s]/g, "")

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
    })

    return isSeparatingFunnel
  }

  useEffect(() => {
    const sourceModel =
      modelRef?.current

    const receivingModel =
      otherModelRef?.current

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

    const foundSourceLiquids =
      new Set()

    const foundReceivingLiquids =
      new Set()

    const preparedReceivingMeshes =
      new Set()

    // ============================================
    // IDENTIFY SOURCE AND RECEIVING MODELS
    // ============================================

    isSourceSeparatingFunnelRef.current =
      checkIsSeparatingFunnel(
        sourceModel
      )

    isReceivingSeparatingFunnelRef.current =
      checkIsSeparatingFunnel(
        receivingModel
      )

    console.log(
      "[PourFromModel] Source separating funnel:",
      isSourceSeparatingFunnelRef.current
    )

    console.log(
      "[PourFromModel] Receiving separating funnel:",
      isReceivingSeparatingFunnelRef.current
    )

    // ============================================
    // FIND SOURCE POUR STREAMS AND LIQUIDS
    // ============================================

    sourceModel.traverse((child) => {
      const name =
        child.name?.toLowerCase() ||
        ""

      // Find pouring-stream children.
      if (name.includes("pour")) {
        child.visible = true

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
              object: innerChild,

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

      // Find source-liquid children.
      if (
        name.includes("liquid") &&
        !name.includes("pour") &&
        !foundSourceLiquids.has(
          child
        )
      ) {
        foundSourceLiquids.add(child)

        sourceLiquids.push({
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

    // ============================================
    // FIND RECEIVING MODEL LIQUIDS
    // ============================================

    receivingModel.traverse(
      (child) => {
        const childName =
          child.name?.toLowerCase() ||
          ""

        if (
          !childName.includes("liquid") ||
          childName.includes("pour") ||
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

            // Clone the materials so other
            // GLTF instances are unaffected.
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
              object: liquidChild,

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

    // ============================================
    // INITIAL POUR-STREAM STATE
    // ============================================

    pourMeshes.forEach(
      ({ object }) => {
        object.visible = false
        object.frustumCulled = false

        object.scale.set(1, 0, 1)

        object.updateMatrixWorld(true)
      }
    )

    if (pourMeshes.length === 0) {
      console.error(
        "[PourFromModel] No pour mesh found."
      )
    }

    if (
      sourceLiquids.length === 0
    ) {
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
      const transferOccurred =
        progressRef.current > 0

      const sourceIsSeparatingFunnel =
        isSourceSeparatingFunnelRef.current

      // Restore pouring streams.
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

      // Preserve the final source-liquid
      // scale after a transfer.
      sourceLiquids.forEach((item) => {
        if (transferOccurred) {
          if (
            sourceIsSeparatingFunnel
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

      // Preserve or restore receiving
      // liquids.
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

                let currentParent =
                  meshItem.object.parent

                while (
                  currentParent &&
                  currentParent !==
                    receivingModel
                ) {
                  currentParent.visible =
                    true

                  currentParent =
                    currentParent.parent
                }
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
    }
  }, [
    modelRef,
    otherModelRef,
    modelLiquidEndScale,
  ])

  useFrame((_, delta) => {
    const transferIsActive =
      Boolean(isPouring) &&
      !finishedRef.current

    // ============================================
    // UPDATE TRANSFER PROGRESS
    // ============================================

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

        if (selectedLesson===14.1 && lessonStep===38) {
          setLessonStep(39)
        }
        if (selectedLesson===14.1 && lessonStep===43) {
          setLessonStep(44)
        }
        if (selectedLesson===14.1 && lessonStep===49) {
          setLessonStep(50)
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

    // ============================================
    // REDUCE SOURCE MODEL LIQUIDS
    // ============================================

    sourceLiquidsRef.current.forEach(
      ({
        object,
        startScaleX,
        startScaleY,
        startScaleZ,
      }) => {
        if (
          isSourceSeparatingFunnelRef.current
        ) {
          // The source is a separating
          // funnel: reduce X, Y and Z.
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

          object.visible =
            object.scale.x > 0.001 ||
            object.scale.y > 0.001 ||
            object.scale.z > 0.001
        } else {
          // Other source models:
          // reduce only the Y-axis.
          object.scale.y =
            THREE.MathUtils.lerp(
              startScaleY,
              finalSourceScale,
              progress
            )

          object.visible =
            object.scale.y > 0.001
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

    // ============================================
    // INCREASE RECEIVING MODEL LIQUIDS
    // ============================================

    receivingLiquidsRef.current.forEach(
      ({
        object,
        startScaleX,
        startScaleY,
        startScaleZ,
        liquidMeshes,
      }) => {
        if (
          isReceivingSeparatingFunnelRef.current
        ) {
          // The receiver is a separating
          // funnel: increase X, Y and Z.
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
          // Other receiving models:
          // increase only the Y-axis.
          object.scale.y =
            THREE.MathUtils.lerp(
              startScaleY,
              otherLiquidEndScale,
              progress
            )
        }

        if (
          isReceivingSeparatingFunnelRef.current
        ) {
          object.visible =
            object.scale.x > 0.001 ||
            object.scale.y > 0.001 ||
            object.scale.z > 0.001
        } else {
          object.visible =
            object.scale.y > 0.001
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
                if (!material) {
                  return
                }

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

        object.updateMatrixWorld(true)
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

          object.scale.y = Math.min(
            object.scale.y +
              speed * delta,
            pourScale
          )
        } else {
          object.scale.y = Math.max(
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

  return (
    <>

    </>
  )
}

export default PourFromModel