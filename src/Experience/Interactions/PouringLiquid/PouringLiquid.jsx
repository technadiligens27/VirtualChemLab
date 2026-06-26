import { useFrame } from "@react-three/fiber"
import { useContext, useEffect, useRef } from "react"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import Reaction from "../Reaction/Reaction"

const PouringLiquid = ({ modelRef, hand, isPouring}) => {
  const { leftBeakerFillData, rightBeakerFillData, setPouredFromLeft,
    pouredFromLeft,pouredFromRight,setPouredFromRight } =
    useContext(InteractionContext)

  const pourLiquidRef = useRef(null)
  const pourParentRef = useRef(null)

  const fillData = hand === "left" ? leftBeakerFillData : rightBeakerFillData


  useEffect(() => {
    if (!modelRef?.current) {
      return
    }

    pourLiquidRef.current = null
    pourParentRef.current = null

    modelRef.current.traverse((child) => {

      if (!child.name?.toLowerCase().includes("pour")) return


      pourParentRef.current = child
      child.visible = true

      child.traverse((innerChild) => {

        if (!innerChild.isMesh || !innerChild.material) return


        pourLiquidRef.current = innerChild
        innerChild.material = innerChild.material.clone()
        innerChild.visible = false
        innerChild.scale.set(1, 0, 1)
      })
    })

  }, [modelRef])

  useEffect(() => {
    if (hand === "left") {
      if (isPouring) {
        console.log("Pouring from left side")
        setPouredFromLeft(true)
        setPouredFromRight(false)
      } else {
        setPouredFromLeft(false)
      }
    }

    if (hand === "right") {
      if (isPouring) {
        console.log("Pouring from right side")
        setPouredFromRight(true)
        setPouredFromLeft(false)
      } else {
        setPouredFromRight(false)
      }
    }
  }, [hand, isPouring, setPouredFromLeft, setPouredFromRight])

  useEffect(() => {
    if (!pourLiquidRef.current || !fillData?.color) return

    if (Array.isArray(pourLiquidRef.current.material)) {
      pourLiquidRef.current.material.forEach((mat) =>
        mat?.color?.set(fillData.color)
      )
    } else {
      pourLiquidRef.current.material.color?.set(fillData.color)
    }
  }, [fillData?.color])

  useFrame((state, delta) => {


    if (!pourLiquidRef.current) return

    // if (!isPouring) {
    //   pourLiquidRef.current.visible = false
    //   pourLiquidRef.current.scale.y = 0
    //   return
    // }

    pourLiquidRef.current.visible = true

    if (pourLiquidRef.current.parent) {
      pourLiquidRef.current.parent.visible = true
    }



    if (!isPouring) {
  pourLiquidRef.current.visible = false
  pourLiquidRef.current.scale.y = 0
  return
}


    pourLiquidRef.current.scale.y = Math.min(
      pourLiquidRef.current.scale.y + 45 * delta,
      25
    )
  })

    return(
      <>
        
        {pouredFromLeft && <Reaction/>}
        {pouredFromRight && <Reaction/>}


      </>
    )
  }

export default PouringLiquid