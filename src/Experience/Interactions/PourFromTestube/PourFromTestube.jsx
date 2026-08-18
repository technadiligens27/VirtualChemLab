import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import { useFrame } from "@react-three/fiber"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import FillLiquidBeaker from "../FillLiquid/FillLiquidBeaker/FillLiquidBeaker"

const PourFromTestube = ({
  isPouring,
  hand,
  model,
  liquidColor,
}) => {
  const pourRef = useRef(null)
  const liquidRef = useRef(null)
  const hasLoggedEmptyRef = useRef(false)

  const [sourceHasLiquid, setSourceHasLiquid] = useState(true)

  const {
    testube01Ref,
    testube02Ref,
    testube03Ref,
    testube04Ref,
    testube05Ref,
    testube06Ref,
  } = useContext(ModelContext)

  const {
    selectedRightHand,
    selectedLeftHand,

    setIsReactionTimerRunning,
    setIsPouring,
  } = useContext(InteractionContext)

  const {
    setShowErrorMsgNo,
  } = useContext(MainGuidelineContext)

  /*
   * Find pouring liquid mesh
   */
  useEffect(() => {
    if (!model) return

    pourRef.current = null

    model.traverse((child) => {
      const name = child.name?.toLowerCase() || ""

      if (name.includes("pour")) {
        pourRef.current = child

        console.log("Pour Found:", child.name)

        child.visible = false
        child.scale.y = 0

        child.traverse((pourChild) => {
          if (!pourChild.isMesh || !pourChild.material) return

          if (Array.isArray(pourChild.material)) {
            pourChild.material = pourChild.material.map((material) =>
              material.clone()
            )
          } else {
            pourChild.material = pourChild.material.clone()
          }
        })
      }
    })

    if (!pourRef.current) {
      console.log("No Pour Found")
    }
  }, [model])

  /*
   * Find source test tube liquid
   */
  useEffect(() => {
    if (!model) return

    liquidRef.current = null

    model.traverse((child) => {
      const name = child.name?.toLowerCase() || ""

      if (name.includes("liquid") && !name.includes("pour")) {
        liquidRef.current = child

        console.log("Liquid Found:", child.name)
      }
    })

    if (!liquidRef.current) {
      console.log("No Liquid Found")
      return
    }

    if (liquidRef.current.scale.y <= 0.001) {
      setSourceHasLiquid(false)
    } else {
      setSourceHasLiquid(true)
    }
  }, [model])

  /*
   * Set pouring liquid color
   */
  useEffect(() => {
    const pour = pourRef.current

    if (!pour || !liquidColor) return

    pour.traverse((child) => {
      if (!child.isMesh || !child.material) return

      if (Array.isArray(child.material)) {
        child.material.forEach((material) => {
          material.color?.set(liquidColor)
          material.needsUpdate = true
        })
      } else {
        child.material.color?.set(liquidColor)
        child.material.needsUpdate = true
      }
    })
  }, [liquidColor])

  /*
   * Start timer only when actual liquid can pour
   */
  useEffect(() => {
    if (isPouring && sourceHasLiquid) {
      setIsReactionTimerRunning(true)
    }
  }, [
    isPouring,
    sourceHasLiquid,
    setIsReactionTimerRunning,
  ])

  /*
   * Pour animation + empty source detection
   */
  useFrame((_, delta) => {
    const pour = pourRef.current
    const liquid = liquidRef.current

    if (!pour) return

    /*
     * Source has been refilled
     */
    if (liquid && liquid.scale.y > 0.001 && liquid.visible && !sourceHasLiquid) {
      setSourceHasLiquid(true)
      hasLoggedEmptyRef.current = false
    }

    /*
     * Source has become empty
     */
    if (liquid && liquid.scale.y <= 0.2 && sourceHasLiquid) {
      liquid.scale.y = 0

      setSourceHasLiquid(false)
      setIsPouring(false)

      if (!hasLoggedEmptyRef.current) {
        setShowErrorMsgNo(1)
        hasLoggedEmptyRef.current = true
      }
    }

    /*
     * Only show pouring stream if:
     *
     * 1. Tube is tilted enough
     * 2. Source actually contains liquid
     */
    if (isPouring && sourceHasLiquid) {
      pour.visible = true

      pour.scale.y = Math.min(
        pour.scale.y + 80 * delta,
        25
      )

      return
    }

    /*
     * Stop / shrink pouring stream
     */
    pour.scale.y = Math.max(
      pour.scale.y - 80 * delta,
      0
    )

    if (pour.scale.y <= 0.001) {
      pour.scale.y = 0
      pour.visible = false
    }
  })

  const canActuallyPour = isPouring && sourceHasLiquid

  return (
    <>
      {selectedLeftHand?.name === "main-testube-01" && selectedRightHand?.name === "main-testube-04" && (
        <FillLiquidBeaker
          modelRef={testube01Ref}
          amount={50}
          color="#f3f4f6"
          isPouring={canActuallyPour}
          pourModelRef={testube04Ref}
        />
      )}

      {selectedLeftHand?.name === "main-testube-02" && selectedRightHand?.name === "main-testube-05" && (
        <FillLiquidBeaker
          modelRef={testube02Ref}
          amount={80}
          color="#f3f4f6"
          isPouring={canActuallyPour}
          pourModelRef={testube05Ref}
        />
      )}

      {selectedLeftHand?.name === "main-testube-03" && selectedRightHand?.name === "main-testube-06" && (
        <FillLiquidBeaker
          modelRef={testube03Ref}
          amount={70}
          color="#f3f4f6"
          isPouring={canActuallyPour}
          pourModelRef={testube06Ref}
        />
      )}
    </>
  )
}

export default PourFromTestube