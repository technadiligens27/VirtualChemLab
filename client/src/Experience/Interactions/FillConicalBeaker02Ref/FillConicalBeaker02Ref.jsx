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
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

const FillConicalBeaker02 = ({
  amount = 1,
  opacity = 0.3,
  colorUpper = "#ffffff",
  colorBottom = "#ffffff",
  speed = 2,

  // Seconds before filling starts
  startDelay = 0,
}) => {
  const {
    conicalBeakerRef02,
  } = useContext(ModelContext)

  const liquidsRef =
    useRef([])

  const elapsedTimeRef =
    useRef(0)


  // =========================================
  // INITIALIZE
  // =========================================

  useEffect(() => {
    const beaker =
      conicalBeakerRef02?.current

    if (!beaker) return

    const liquids = []

    elapsedTimeRef.current = 0


    beaker.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      if (
        !child.isMesh ||
        !name.includes("liquid")
      ) {
        return
      }


      const isUpperLiquid =
        name.includes("upper")

      const isBottomLiquid =
        name.includes("bottom")


      const liquidColor =
        isUpperLiquid
          ? colorUpper
          : isBottomLiquid
            ? colorBottom
            : colorBottom


      const originalMaterials =
        Array.isArray(child.material)
          ? child.material
          : [child.material]


      const clonedMaterials =
        originalMaterials.map(
          (material) => {
            const clonedMaterial =
              material.clone()

            if (
              clonedMaterial.color
            ) {
              clonedMaterial.color.set(
                liquidColor
              )
            }

            clonedMaterial.transparent =
              true

            clonedMaterial.opacity =
              opacity

            clonedMaterial.needsUpdate =
              true

            return clonedMaterial
          }
        )


      child.material =
        Array.isArray(child.material)
          ? clonedMaterials
          : clonedMaterials[0]


      // =========================================
      // MAKE PARENTS VISIBLE
      // =========================================

      let currentObject =
        child

      while (
        currentObject
      ) {
        currentObject.visible =
          true

        if (
          currentObject ===
          beaker
        ) {
          break
        }

        currentObject =
          currentObject.parent
      }


      liquids.push(
        child
      )
    })


    liquidsRef.current =
      liquids


    // =========================================
    // CLEANUP
    // =========================================

    return () => {
      liquidsRef.current =
        []

      elapsedTimeRef.current =
        0
    }

  }, [
    conicalBeakerRef02,
    colorUpper,
    colorBottom,
    opacity,
  ])


  // =========================================
  // ANIMATION
  // =========================================

  useFrame((_, delta) => {

    elapsedTimeRef.current +=
      delta


    // =========================================
    // START DELAY
    // =========================================

    if (
      elapsedTimeRef.current <
      startDelay
    ) {
      return
    }


    const targetAmount =
      Math.max(
        amount,
        0
      )


    liquidsRef.current.forEach(
      (liquid) => {

        liquid.scale.y =
          THREE.MathUtils.damp(
            liquid.scale.y,
            targetAmount,
            speed,
            delta
          )


        if (
          Math.abs(
            liquid.scale.y -
            targetAmount
          ) < 0.001
        ) {
          liquid.scale.y =
            targetAmount
        }


        liquid.visible =
          liquid.scale.y >
          0.001


        liquid.updateMatrixWorld(
          true
        )
      }
    )
  })


  return null
}

export default FillConicalBeaker02