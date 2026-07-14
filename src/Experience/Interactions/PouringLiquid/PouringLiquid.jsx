import { useFrame } from "@react-three/fiber"
import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"

import Reaction from "../Reaction/Reaction"

const visibleReactions = [
  ["Water (H2O)", "Salt (NaCl)"],

  [
    "Hydrochloric Acid (HCl)",
    "Universal indicator",
  ],

  [
    "Sodium Hydroxide (NaOH)",
    "Universal indicator",
  ],

  [
    "Iodine solution",
    "Starch solution",
  ],

  [
    "Copper Sulfate (CuSO4)",
    "Sodium Hydroxide (NaOH)",
  ],

  [
    "Hydrochloric Acid (HCl)",
    "Sodium Hydroxide (NaOH)",
  ],
]

const PouringLiquid = ({
  model,
  hand,
  isPouring,
}) => {
  const {
    leftBeakerFillData,
    rightBeakerFillData,

    setPouredFromLeft,
    setPouredFromRight,

    selectedLeftHand,
    selectedRightHand,
  } = useContext(InteractionContext)

  const {
    setShowErrorMsgNo,
  } = useContext(MainGuidelineContext)

  const {
    isReactionRef,
  } = useContext(ReactionContext)

  const pourLiquidRef = useRef(null)
  const pourParentRef = useRef(null)

  const liquidInsideRef = useRef(null)

  const noLiquidLoggedRef =
    useRef(false)

  const noReactionLoggedRef =
    useRef(false)

  const actualPouringRef =
    useRef(false)

  const fillData =
    hand === "left"
      ? leftBeakerFillData
      : rightBeakerFillData

  /*
   * Find and prepare the pouring-stream mesh.
   */
  useEffect(() => {
    if (!model) return

    pourLiquidRef.current = null
    pourParentRef.current = null

    actualPouringRef.current = false

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (!childName.includes("pour")) {
        return
      }

      pourParentRef.current = child
      child.visible = true

      child.traverse((innerChild) => {
        if (!innerChild.isMesh) return
        if (!innerChild.material) return

        pourLiquidRef.current =
          innerChild

        /*
         * Clone only once.
         */
        if (
          !innerChild.userData
            .pourMaterialPrepared
        ) {
          innerChild.material =
            Array.isArray(
              innerChild.material
            )
              ? innerChild.material.map(
                  (material) =>
                    material.clone()
                )
              : innerChild.material.clone()

          innerChild.userData
            .pourMaterialPrepared = true
        }

        innerChild.visible = false

        innerChild.scale.set(
          1,
          0,
          1
        )
      })
    })
  }, [model])

  /*
   * Change the pouring-stream colour.
   */
  useEffect(() => {
    if (!pourLiquidRef.current) return
    if (!fillData?.color) return

    const materials =
      Array.isArray(
        pourLiquidRef.current.material
      )
        ? pourLiquidRef.current.material
        : [
            pourLiquidRef.current
              .material,
          ]

    materials.forEach((material) => {
      material.color?.set(
        fillData.color
      )

      material.needsUpdate = true
    })
  }, [fillData?.color])

  const hasVisibleReaction = () => {
    const left =
      leftBeakerFillData?.name

    const right =
      rightBeakerFillData?.name

    if (!left || !right) {
      return false
    }

    return visibleReactions.some(
      (reaction) =>
        reaction.includes(left) &&
        reaction.includes(right)
    )
  }

  /*
   * Find a liquid mesh but ignore the pouring stream.
   */
  const findLiquidMesh = (
    targetModel
  ) => {
    if (!targetModel) return null

    if (
      typeof targetModel.traverse !==
      "function"
    ) {
      return null
    }

    let visibleLiquid = null
    let firstLiquid = null

    targetModel.traverse((child) => {
      if (!child.isMesh) return

      const childName =
        child.name?.toLowerCase() || ""

      if (!childName.includes("liquid")) {
        return
      }

      if (childName.includes("pour")) {
        return
      }

      if (!firstLiquid) {
        firstLiquid = child
      }

      if (
        child.visible &&
        child.scale.y > 0.01
      ) {
        visibleLiquid = child
      }
    })

    return visibleLiquid || firstLiquid
  }

  const getLiquidMaxScaleY = (
    liquidMesh
  ) => {
    const liquidName =
      liquidMesh?.name?.toLowerCase() ||
      ""

    if (
      liquidName.includes("normal")
    ) {
      return 55
    }

    if (
      liquidName.includes("conical")
    ) {
      return 200
    }

    return 55
  }

  const isTargetBeakerFull = () => {
    const targetModel =
      hand === "left"
        ? selectedRightHand?.ref?.current
        : selectedLeftHand?.ref?.current

    if (!targetModel) return false

    const targetLiquid =
      findLiquidMesh(targetModel)

    if (!targetLiquid) return false

    const maxScaleY =
      getLiquidMaxScaleY(
        targetLiquid
      )

    return (
      targetLiquid.scale.y >=
      maxScaleY - 0.05
    )
  }

  /*
   * Find the liquid inside the object being poured.
   */
  const hasLiquidInsideBeaker = () => {
    if (!model) return false

    let hasLiquid = false

    liquidInsideRef.current = null

    model.traverse((child) => {
      if (hasLiquid) return
      if (!child.isMesh) return

      const childName =
        child.name?.toLowerCase() || ""

      if (!childName.includes("liquid")) {
        return
      }

      /*
       * Do not select the pouring stream.
       */
      if (childName.includes("pour")) {
        return
      }

      if (
        child.visible &&
        child.scale.y > 0.01
      ) {
        hasLiquid = true

        liquidInsideRef.current =
          child
      }
    })

    return hasLiquid
  }

  const stopPouring = (forceReset = false) => {
    if (pourLiquidRef.current) {
      pourLiquidRef.current.visible = false
      pourLiquidRef.current.scale.y = 0
    }

    if (forceReset) {
      setPouredFromLeft(false)
      setPouredFromRight(false)

      actualPouringRef.current = false

      return
    }

    if (
      !actualPouringRef.current
    ) {
      return
    }

    if (hand === "left") {
      setPouredFromLeft(false)
    }

    if (hand === "right") {
      setPouredFromRight(false)
    }

    actualPouringRef.current = false
  }

  const startPouring = () => {
    if (
      actualPouringRef.current
    ) {
      return
    }

    if (hand === "left") {
      console.log(
        "Pouring from left side"
      )

      setPouredFromLeft(true)
      setPouredFromRight(false)
    }

    if (hand === "right") {
      console.log(
        "Pouring from right side"
      )

      setPouredFromRight(true)
      setPouredFromLeft(false)
    }

    actualPouringRef.current = true
  }

  useFrame((_, delta) => {
    if (!pourLiquidRef.current) {
      return
    }

    const hasLiquid =
      hasLiquidInsideBeaker()

    /*
     * The object is no longer tilted enough.
     */
    if (!isPouring) {
      noLiquidLoggedRef.current =
        false

      noReactionLoggedRef.current =
        false

      stopPouring()

      return
    }

    /*
     * The source object has no liquid.
     */
    if (!hasLiquid) {
      if (
        !noLiquidLoggedRef.current
      ) {
        setShowErrorMsgNo(9)

        noLiquidLoggedRef.current =
          true
      }

      stopPouring()

      return
    }

    /*
     * Stop when the receiving beaker is full.
     */
    if (isTargetBeakerFull()) {
      console.log(
        "Target beaker is full. Stop pouring."
      )

      stopPouring()

      return
    }

    /*
     * The selected liquids do not create a visible reaction.
     */
    if (!hasVisibleReaction()) {
      if (
        !noReactionLoggedRef.current
      ) {
        console.log(
          "No Visible Reaction Found"
        )

        setShowErrorMsgNo(8)

        noReactionLoggedRef.current =
          true
      }

      isReactionRef.current = false

      stopPouring(true)

      return
    }

    noLiquidLoggedRef.current =
      false

    noReactionLoggedRef.current =
      false

    startPouring()

    /*
     * Show the pouring stream.
     */
    pourLiquidRef.current.visible =
      true

    if (
      pourLiquidRef.current.parent
    ) {
      pourLiquidRef.current.parent
        .visible = true
    }

    pourLiquidRef.current.scale.y =
      Math.min(
        pourLiquidRef.current.scale.y +
          45 * delta,
        25
      )

    /*
     * Reduce the liquid inside the source object.
     */
    if (liquidInsideRef.current) {
      const liquidName =
        liquidInsideRef.current.name
          ?.toLowerCase() || ""

      let reduceSpeed = 2

      if (
        liquidName.includes(
          "conical-liquid"
        )
      ) {
        reduceSpeed = 0.05
      }

      liquidInsideRef.current.scale.y =
        Math.max(
          liquidInsideRef.current.scale.y -
            reduceSpeed * delta,
          0
        )

      if (
        liquidInsideRef.current.scale.y <=
        0.01
      ) {
        liquidInsideRef.current.scale.y =
          0

        liquidInsideRef.current.visible =
          false

        stopPouring()
      }
    }
  })

  /*
   * Keep Reaction mounted while pouring mode is active.
   * This prevents its refs from resetting when the user
   * stops tilting and then starts pouring again.
   */
  return <Reaction hand={hand} />
}

export default PouringLiquid