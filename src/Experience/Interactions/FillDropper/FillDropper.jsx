import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const MAX_SCALE_Y = 8
const FILL_SPEED = 7.5

const findLiquid = (object, onlyVisible = false) => {
  let liquid = null

  object?.traverse((child) => {
    const isLiquid = child.name
      ?.toLowerCase()
      .includes("liquid")

    if (!isLiquid) return
    if (onlyVisible && !child.visible) return

    liquid = child
  })

  return liquid
}

const cloneMaterial = (object) => {
  if (!object?.material) return null

  object.material = Array.isArray(object.material)
    ? object.material.map((material) => material.clone())
    : object.material.clone()

  return Array.isArray(object.material)
    ? object.material[0]
    : object.material
}

const getMaterial = (object) => {
  if (!object?.material) return null

  return Array.isArray(object.material)
    ? object.material[0]
    : object.material
}

const FillDropper = ({ hand }) => {
  const { mainDropperRef } = useContext(ModelContext)

  const {
    selectedLeftHand,
    selectedRightHand,
  } = useContext(InteractionContext)

  const liquidRef = useRef(null)

  const getBeaker = () => {
    const oppositeHand =
      hand === "right"
        ? selectedLeftHand
        : selectedRightHand

    return oppositeHand?.ref?.current
  }

  const copyBeakerColor = (dropperLiquid) => {
    const beaker = getBeaker()
    if (!beaker) return

    const beakerLiquid = findLiquid(beaker, true)

    if (!beakerLiquid) {
      console.warn("Beaker liquid not found")
      return
    }

    const beakerMaterial = getMaterial(beakerLiquid)
    const dropperMaterial = cloneMaterial(dropperLiquid)

    if (!beakerMaterial?.color || !dropperMaterial?.color) {
      return
    }

    dropperMaterial.color.copy(beakerMaterial.color)
    dropperMaterial.needsUpdate = true
  }

  useEffect(() => {
    const dropper = mainDropperRef?.current
    if (!dropper) return

    const dropperLiquid = findLiquid(dropper)

    if (!dropperLiquid) {
      console.warn("Dropper liquid not found")
      return
    }

    liquidRef.current = dropperLiquid

    copyBeakerColor(dropperLiquid)

    dropperLiquid.visible = true
    dropperLiquid.scale.y = 0
  }, [
    hand,
    mainDropperRef,
    selectedLeftHand,
    selectedRightHand,
  ])

  useFrame((_, delta) => {
    const liquid = liquidRef.current
    if (!liquid) return

    liquid.scale.y = Math.min(
      liquid.scale.y + FILL_SPEED * delta,
      MAX_SCALE_Y
    )
  })

  return null
}

export default FillDropper