import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import CopperPrecipitate from "../../AllReactions/CopperPrecipitate/CopperPrecipitate"

const CONICAL_FILL_SPEED = 0.2
const CONICAL_LIQUID_OPACITY = 0.55

const Reaction = ({ hand }) => {
  const {
    leftBeakerFillData,
    rightBeakerFillData,

    pouredFromLeft,
    pouredFromRight,

    selectedLeftHand,
    selectedRightHand,

    liquidLeftModel,
    liquidRightModel,

    isPouring,
  } = useContext(InteractionContext)

  const {
    lessonStep,
    setLessonStep,
    setShowErrorMsgNo,
  } = useContext(MainGuidelineContext)

  const {
    isSaltWaterReaction,
    setIsSaltWaterReaction,

    isHclUniversal,
    setIsHclUniversal,

    isNaohUniversal,
    setIsNaohUniversal,

    isStarchIodine,
    setIsStarchIodine,

    isCopperSulfateNaoh,
    setIsCopperSulfateNaoh,

    isAcidBase,
    setIsAcidBase,

    isBiuretReaction,
    setIsBiuretReaction,

    stirrLiquidRef,
    isReactionRef,
  } = useContext(ReactionContext)

  const liquidRef = useRef(null)
  const targetColorRef = useRef(null)
  const activeReactionRef = useRef(null)
  const targetBeakerRef = useRef(null)

  /*
   * Conical flask visual filling refs.
   *
   * This does not store real millilitres.
   * 0 means empty and 1 means visually full.
   */
  const isConicalTargetRef = useRef(false)
  const conicalLiquidMeshesRef = useRef([])
  const conicalFillProgressRef = useRef(0)

  const finishLoggedRef = useRef(false)
  const lessonStepChangedRef = useRef(false)

  const setLiquidOpacity = (mesh, opacity) => {
  if (!mesh?.material) return

  const materials = Array.isArray(mesh.material)
    ? mesh.material
    : [mesh.material]

  materials.forEach((material) => {
    material.transparent = true
    material.opacity = opacity
    material.needsUpdate = true
  })
}

  const resetReactions = useCallback(() => {
    setIsSaltWaterReaction(false)
    setIsHclUniversal(false)
    setIsNaohUniversal(false)
    setIsStarchIodine(false)
    setIsCopperSulfateNaoh(false)
    setIsAcidBase(false);
    setIsBiuretReaction(false)
  }, [
    setIsSaltWaterReaction,
    setIsHclUniversal,
    setIsNaohUniversal,
    setIsStarchIodine,
    setIsCopperSulfateNaoh,
    setIsAcidBase,
    setIsBiuretReaction
  ])

  const clearReactionRefs = useCallback(() => {
    liquidRef.current = null
    targetColorRef.current = null
    activeReactionRef.current = null
    targetBeakerRef.current = null
    stirrLiquidRef.current = null

    isConicalTargetRef.current = false
    conicalLiquidMeshesRef.current = []
    conicalFillProgressRef.current = 0

    finishLoggedRef.current = false
  }, [stirrLiquidRef])

  const reactions = useMemo(
    () => [
      {
        name: "salt-water",
        chemicals: ["Water (H2O)", "Salt (NaCl)"],
        color: "#62b3f0",
        run: () => {
          resetReactions()
          setIsSaltWaterReaction(true)
        },
      },
      {
        name: "hcl-universal",
        chemicals: [
          "Hydrochloric Acid (HCl)",
          "Universal indicator",
        ],
        color: "#ef4444",
        run: () => {
          resetReactions()
          setIsHclUniversal(true)
        },
      },
      {
        name: "naoh-universal",
        chemicals: [
          "Sodium Hydroxide (NaOH)",
          "Universal indicator",
        ],
        color: "#8b5cf6",
        run: () => {
          resetReactions()
          setIsNaohUniversal(true)
        },
      },
      {
        name: "iodine-starch",
        chemicals: [
          "Iodine solution",
          "Starch solution",
        ],
        color: "#0f172a",
        run: () => {
          resetReactions()
          setIsStarchIodine(true)
        },
      },
      {
        name: "copper-sulfate-naoh",
        chemicals: [
          "Copper Sulfate (CuSO4)",
          "Sodium Hydroxide (NaOH)",
        ],
        color: "#7dd3fc",
        run: () => {
          resetReactions()
          setIsCopperSulfateNaoh(true)
        },
      },
      {
        name: "acid-base-neutralization",
        chemicals: [
          "Hydrochloric Acid (HCl)",
          "Sodium Hydroxide (NaOH)",
        ],
        color: "#22c55e",
        run: () => {
          resetReactions()
          setIsAcidBase(true)
        },
      },
      {
        name: "protein-biuret",
        chemicals: [
          "Protein Sample",
          "Biuret Reagent",
        ],
        color: "#7b2cbf",
        run: () => {
          resetReactions();
          setIsBiuretReaction(true)
        },
      },
    ],
    [
      resetReactions,
      setIsSaltWaterReaction,
      setIsHclUniversal,
      setIsNaohUniversal,
      setIsStarchIodine,
      setIsCopperSulfateNaoh,
      setIsAcidBase,
    ]
  )

  /*
   * Finds the currently visible liquid mesh.
   *
   * This is important for the conical flask because it contains
   * several different liquid meshes.
   */
  const findLiquidMesh = (model) => {
    if (!model) return null

    if (typeof model.traverse !== "function") {
      console.log("This is not a Three.js object:", model)
      return null
    }

    let firstLiquidMesh = null
    let visibleLiquidMesh = null

    model.traverse((child) => {
      if (!child.isMesh) return

      const childName = child.name?.toLowerCase()

      if (!childName?.includes("liquid")) return

      if (!firstLiquidMesh) {
        firstLiquidMesh = child
      }

      if (child.visible) {
        visibleLiquidMesh = child
      }
    })

    return visibleLiquidMesh || firstLiquidMesh
  }

  /*
   * Finds all five prepared conical liquid meshes.
   *
   * Expected names:
   * conical-liquid-10
   * conical-liquid-25
   * conical-liquid-50
   * conical-liquid-75
   * conical-liquid-100
   */
  const findConicalLiquidMeshes = (model) => {
    if (!model) return []

    if (typeof model.traverse !== "function") {
      return []
    }

    const conicalMeshes = []

    model.traverse((child) => {
      if (!child.isMesh) return

      const childName = child.name?.toLowerCase()

      if (!childName?.includes("conical-liquid")) {
        return
      }

      const amountMatch = childName.match(
        /conical-liquid-(100|75|50|25|10)(?!\d)/
      )

      if (!amountMatch) return

      conicalMeshes.push({
        amount: Number(amountMatch[1]),
        mesh: child,

        // Save the original Blender scale.
        originalScale: child.scale.clone(),
      })
    })

    conicalMeshes.sort(
      (firstMesh, secondMesh) =>
        firstMesh.amount - secondMesh.amount
    )

    return conicalMeshes
  }

  const prepareLiquidMaterial = (mesh) => {
    if (!mesh?.material) return

    /*
     * Only clone the material once.
     * This prevents creating a new material every time the effect runs.
     */
    if (!mesh.userData.reactionMaterialPrepared) {
      mesh.material = Array.isArray(mesh.material)
        ? mesh.material.map((material) => material.clone())
        : mesh.material.clone()

      mesh.userData.reactionMaterialPrepared = true
    }

    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material]

    materials.forEach((material) => {
      material.transparent = true
      material.opacity = 0.55
      material.needsUpdate = true
    })
  }

  const getMeshColor = (mesh) => {
    if (!mesh?.material) return null

    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material]

    const materialWithColor = materials.find(
      (material) => material?.color
    )

    if (!materialWithColor?.color) {
      return null
    }

    return materialWithColor.color.clone()
  }

  const applyColorToMesh = (mesh, color) => {
    if (!mesh?.material || !color) return

    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material]

    materials.forEach((material) => {
      if (!material.color) return

      material.color.copy(color)
      material.needsUpdate = true
    })
  }

  /*
   * Detects which conical mesh is currently visible and converts it
   * into visual progress.
   *
   * Example:
   * 25 mesh visible = 0.25 progress
   * 50 mesh visible = 0.50 progress
   */
  const getStartingConicalProgress = (conicalMeshes) => {
    const visibleMeshes = conicalMeshes.filter(
      ({ mesh }) => mesh.visible
    )

    if (visibleMeshes.length === 0) {
      return 0
    }

    const highestVisibleMesh =
      visibleMeshes[visibleMeshes.length - 1]

    return highestVisibleMesh.amount / 100
  }

  /*
   * Hides every conical liquid mesh and shows only the correct one.
   *
   * No scale is increased here.
   */
 const showConicalLiquidForProgress = (progress) => {
  const conicalMeshes = conicalLiquidMeshesRef.current

  if (conicalMeshes.length === 0) {
    return null
  }

  const previousLiquidColor = getMeshColor(
    liquidRef.current
  )

  /*
   * First hide every mesh and restore its original Blender scale.
   */
  conicalMeshes.forEach((entry) => {
    entry.mesh.visible = false
    entry.mesh.scale.copy(entry.originalScale)

    setLiquidOpacity(entry.mesh, 0)
  })

  /*
   * Empty flask.
   */
  if (progress <= 0) {
    return null
  }

  const firstEntry = conicalMeshes[0]
  const lastEntry =
    conicalMeshes[conicalMeshes.length - 1]

  let lowerEntry = firstEntry
  let upperEntry = firstEntry
  let blendAmount = 0
  let fadeInAmount = 1

  /*
   * Smoothly fade in the first 10 ml mesh.
   */
  const firstProgress =
    firstEntry.amount / 100

  if (progress <= firstProgress) {
    lowerEntry = firstEntry
    upperEntry = firstEntry

    fadeInAmount = THREE.MathUtils.clamp(
      progress / firstProgress,
      0,
      1
    )
  } else if (progress >= 1) {
    /*
     * Flask is completely full.
     */
    lowerEntry = lastEntry
    upperEntry = lastEntry
    fadeInAmount = 1
  } else {
    /*
     * Find the two meshes that the progress is currently between.
     *
     * Example:
     * progress 0.40 is between 25 ml and 50 ml.
     */
    for (
      let index = 1;
      index < conicalMeshes.length;
      index++
    ) {
      const previousEntry =
        conicalMeshes[index - 1]

      const nextEntry =
        conicalMeshes[index]

      const previousProgress =
        previousEntry.amount / 100

      const nextProgress =
        nextEntry.amount / 100

      if (
        progress >= previousProgress &&
        progress <= nextProgress
      ) {
        lowerEntry = previousEntry
        upperEntry = nextEntry

        blendAmount = THREE.MathUtils.clamp(
          (progress - previousProgress) /
            (nextProgress - previousProgress),
          0,
          1
        )

        break
      }
    }
  }

  /*
   * We are showing only one mesh.
   */
  if (lowerEntry === upperEntry) {
    lowerEntry.mesh.visible = true

    setLiquidOpacity(
      lowerEntry.mesh,
      CONICAL_LIQUID_OPACITY * fadeInAmount
    )

    if (previousLiquidColor) {
      applyColorToMesh(
        lowerEntry.mesh,
        previousLiquidColor
      )
    }

    liquidRef.current = lowerEntry.mesh
  } else {
    /*
     * Crossfade between the lower and upper liquid meshes.
     */
    lowerEntry.mesh.visible = true
    upperEntry.mesh.visible = true

    setLiquidOpacity(
      lowerEntry.mesh,
      CONICAL_LIQUID_OPACITY *
        (1 - blendAmount)
    )

    setLiquidOpacity(
      upperEntry.mesh,
      CONICAL_LIQUID_OPACITY *
        blendAmount
    )

    /*
     * Keep both meshes using the same reaction colour.
     */
    if (previousLiquidColor) {
      applyColorToMesh(
        lowerEntry.mesh,
        previousLiquidColor
      )

      applyColorToMesh(
        upperEntry.mesh,
        previousLiquidColor
      )
    }

    /*
     * Use whichever mesh is currently more visible.
     */
    liquidRef.current =
      blendAmount < 0.5
        ? lowerEntry.mesh
        : upperEntry.mesh
  }

  stirrLiquidRef.current = liquidRef.current

  if (pouredFromLeft) {
    liquidRightModel.current =
      liquidRef.current
  } else {
    liquidLeftModel.current =
      liquidRef.current
  }

  return liquidRef.current
}

  /*
   * Visually fills the conical flask.
   *
   * This increases progress only. It does not increase scale.
   */
  const increaseConicalVisualProgress = (delta) => {
    conicalFillProgressRef.current = Math.min(
      conicalFillProgressRef.current +
        delta * CONICAL_FILL_SPEED,
      1
    )

    showConicalLiquidForProgress(
      conicalFillProgressRef.current
    )

    if (
      conicalFillProgressRef.current >= 1 &&
      !finishLoggedRef.current
    ) {
      setShowErrorMsgNo(10)
      finishLoggedRef.current = true

      return true
    }

    return false
  }

  const getLiquidMaxScaleY = (liquidMesh) => {
    const name =
      liquidMesh?.name?.toLowerCase()

    if (name?.includes("normal")) {
      return 55
    }

    return 55
  }

  /*
   * Used only for normal liquid meshes.
   *
   * Conical liquid meshes never enter this function.
   */
  const increaseLiquidScaleY = (
    liquidMesh,
    delta
  ) => {
    if (!liquidMesh) return false

    const maxScaleY =
      getLiquidMaxScaleY(liquidMesh)

    liquidMesh.visible = true

    liquidMesh.scale.y = Math.min(
      liquidMesh.scale.y + delta * 2,
      maxScaleY
    )

    if (
      liquidMesh.scale.y >= maxScaleY &&
      !finishLoggedRef.current
    ) {
      setShowErrorMsgNo(10)
      finishLoggedRef.current = true

      return true
    }

    return false
  }

  const isLiquidEmpty = (liquidMesh) => {
    if (!liquidMesh) return true
    if (!liquidMesh.visible) return true
    if (liquidMesh.scale.y <= 0.01) return true

    return false
  }

  /*
   * Saves the currently visible liquid mesh for each hand.
   */
  useEffect(() => {
    const leftModel =
      selectedLeftHand?.ref?.current

    const rightModel =
      selectedRightHand?.ref?.current

    const leftLiquid =
      findLiquidMesh(leftModel)

    const rightLiquid =
      findLiquidMesh(rightModel)

    if (leftLiquid) {
      liquidLeftModel.current = leftLiquid
    }

    if (rightLiquid) {
      liquidRightModel.current = rightLiquid
    }
  }, [
    selectedLeftHand,
    selectedRightHand,
    liquidLeftModel,
    liquidRightModel,
  ])

  /*
   * Finds the reaction and prepares the target liquid.
   */
  useEffect(() => {
    if (!pouredFromLeft && !pouredFromRight) {
      return
    }

    const left = leftBeakerFillData?.name
    const right = rightBeakerFillData?.name

    const reaction = reactions.find(
      (reactionItem) =>
        reactionItem.chemicals.includes(left) &&
        reactionItem.chemicals.includes(right)
    )

    if (!reaction) {
      console.log("No Visible Reaction Found")

      isReactionRef.current = false

      resetReactions()
      clearReactionRefs()

      setShowErrorMsgNo(8)

      return
    }

    reaction.run()

    isReactionRef.current = true

    activeReactionRef.current =
      reaction.name

    targetColorRef.current =
      new THREE.Color(reaction.color)

    finishLoggedRef.current = false

    /*
     * Find the beaker receiving the liquid.
     */
    if (pouredFromLeft) {
      targetBeakerRef.current =
        selectedRightHand?.ref?.current
    } else {
      targetBeakerRef.current =
        selectedLeftHand?.ref?.current
    }

    if (!targetBeakerRef.current) {
      return
    }

    /*
     * Check whether the target has the five conical liquid meshes.
     */
    const conicalMeshes =
      findConicalLiquidMeshes(
        targetBeakerRef.current
      )

    if (conicalMeshes.length > 0) {
      isConicalTargetRef.current = true

      conicalLiquidMeshesRef.current =
        conicalMeshes

      conicalMeshes.forEach(({ mesh }) => {
        prepareLiquidMaterial(mesh)
      })

      /*
       * Start from whichever mesh was already visible.
       */
      conicalFillProgressRef.current =
        getStartingConicalProgress(
          conicalMeshes
        )

      showConicalLiquidForProgress(
        conicalFillProgressRef.current
      )

      return
    }

    /*
     * Normal beaker logic.
     */
    isConicalTargetRef.current = false
    conicalLiquidMeshesRef.current = []
    conicalFillProgressRef.current = 0

    liquidRef.current = findLiquidMesh(
      targetBeakerRef.current
    )

    if (!liquidRef.current) {
      return
    }

    prepareLiquidMaterial(
      liquidRef.current
    )

    stirrLiquidRef.current =
      liquidRef.current
  }, [
    hand,
    pouredFromLeft,
    pouredFromRight,
    leftBeakerFillData,
    rightBeakerFillData,
    selectedLeftHand,
    selectedRightHand,
    reactions,
    resetReactions,
    clearReactionRefs,
    setShowErrorMsgNo,
    stirrLiquidRef,
    isReactionRef,
    liquidLeftModel,
    liquidRightModel,
  ])

  useEffect(() => {
    if (lessonStep !== 10) {
      lessonStepChangedRef.current = false
    }
  }, [lessonStep])

  useFrame((_, delta) => {
    if (!isReactionRef.current) return

    if (
      !liquidRef.current ||
      !targetColorRef.current
    ) {
      return
    }

    const canLerp =
      isSaltWaterReaction ||
      isHclUniversal ||
      isNaohUniversal ||
      isStarchIodine ||
      isCopperSulfateNaoh ||
      isAcidBase ||
      isBiuretReaction

    if (!canLerp) return
    if (!isPouring) return

    /*
     * Pouring from the left hand into the right-hand beaker.
     */
    if (pouredFromLeft) {
      const sourceLiquid =
        liquidLeftModel.current

      const targetLiquid =
        liquidRightModel.current

      if (!isLiquidEmpty(sourceLiquid)) {
        if (isConicalTargetRef.current) {
          increaseConicalVisualProgress(
            delta
          )
        } else {
          increaseLiquidScaleY(
            targetLiquid,
            delta
          )
        }
      }
    }

    /*
     * Pouring from the right hand into the left-hand beaker.
     */
    if (pouredFromRight) {
      const sourceLiquid =
        liquidRightModel.current

      const targetLiquid =
        liquidLeftModel.current

      if (!isLiquidEmpty(sourceLiquid)) {
        if (isConicalTargetRef.current) {
          increaseConicalVisualProgress(
            delta
          )
        } else {
          increaseLiquidScaleY(
            targetLiquid,
            delta
          )
        }
      }
    }

    /*
     * Change the current visible liquid to the reaction colour.
     */
    let liquidMeshesToColor = [liquidRef.current]

    if (isConicalTargetRef.current) {
      liquidMeshesToColor =
        conicalLiquidMeshesRef.current
          .map((entry) => entry.mesh)
          .filter((mesh) => mesh.visible)
    }

    liquidMeshesToColor.forEach((mesh) => {
      if (!mesh?.material) return

      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material]

      materials.forEach((material) => {
        if (!material.color) return

        material.color.lerp(
          targetColorRef.current,
          delta * 0.8
        )

        material.needsUpdate = true
      })
    })

    if (
      lessonStep === 10 &&
      !lessonStepChangedRef.current
    ) {
      lessonStepChangedRef.current = true
      setLessonStep(11)
    }
  })

  return (
    <>
      {isCopperSulfateNaoh &&
        targetBeakerRef.current && (
          <CopperPrecipitate
            beakerRef={targetBeakerRef}
          />
        )}
    </>
  )
}

export default Reaction