import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const AddMoreLiquid = ({
  liquidRef,
  amount,
  speed = 10,
  pourModelRef,
}) => {
  const targetYRef = useRef(null)
  const pourLiquidRef = useRef(null)
  const pourStartScaleRef = useRef(null)
  const pouringFinishedRef = useRef(false)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const {
    setShowIodobutanePrecipitate,
    setIsAddMoreLiquid,
    setIsPouring,
    showBromobutanePrecipitate,setShowBromobutanePrecipitate,
    showChlorobutanePrecipitate,setShowChlorobutanePrecipitate
  } = useContext(InteractionContext)

  useEffect(() => {
    if (!liquidRef?.current) return

    targetYRef.current =
      liquidRef.current.scale.y + amount

    pouringFinishedRef.current = false
  }, [
    liquidRef,
    amount,
  ])

  useEffect(() => {
    if (!pourModelRef?.current) return

    pourLiquidRef.current = null

    pourModelRef.current.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (!childName.includes("liquid")) return
      if (!child.isMesh) return

      pourLiquidRef.current = child

      pourStartScaleRef.current =
        child.scale.y
    })
  }, [pourModelRef])

  // useEffect(() => {
  //   if (selectedLesson === 10 && lessonStep === 110) {
  //     setLessonStep(111)
  //   }
  // }, [
  //   selectedLesson,
  //   lessonStep,
  //   setLessonStep,
  // ])

  useFrame((_, delta) => {
    if (!liquidRef?.current || targetYRef.current === null) return
    if (!pourLiquidRef.current) return
    if (pouringFinishedRef.current) return

    const currentY =
      liquidRef.current.scale.y

    const targetY =
      targetYRef.current

    const pourCurrentY =
      pourLiquidRef.current.scale.y

    /*
      Source test tube is empty.

      Stop pouring completely.
    */

  if (pourLiquidRef.current.scale.y <= 0) {
    pourLiquidRef.current.scale.y = 0
    pourLiquidRef.current.visible = false

    pouringFinishedRef.current = true

    setIsPouring(false)
    setIsAddMoreLiquid(false)

    if (liquidRef.current.name === "main-testube-01-liquid") {
      setShowIodobutanePrecipitate(true)
    }

    if (liquidRef.current.name === "main-testube-02-liquid") {
      setShowBromobutanePrecipitate(true)
    }

    if (liquidRef.current.name === "main-testube-03-liquid") {
      setShowChlorobutanePrecipitate(true)
    }

    console.log("Pouring finished")

    return
  }

    /*
      Increase receiving liquid only
      while the source still has liquid.
    */

    if (currentY < targetY) {
      liquidRef.current.scale.y = Math.min(
        currentY + speed * delta,
        targetY
      )
    }

    /*
      Reduce liquid inside source
      test tube.
    */

    pourLiquidRef.current.scale.y = Math.max(
      pourCurrentY - speed * delta,
      0
    )

    /*
      Catch the exact frame where
      source becomes empty.
    */

    if (pourLiquidRef.current.scale.y <= 0) {
      pourLiquidRef.current.scale.y = 0
      pourLiquidRef.current.visible = false

      pouringFinishedRef.current = true

      setIsPouring(false)
      setIsAddMoreLiquid(false)
      
    if (liquidRef.current.name === "main-testube-01-liquid") {
      setShowIodobutanePrecipitate(true)
    }

    if (liquidRef.current.name === "main-testube-02-liquid") {
      setShowBromobutanePrecipitate(true)
    }

    if (liquidRef.current.name === "main-testube-03-liquid") {
      setShowChlorobutanePrecipitate(true)
    }

      console.log("Pouring finished")
    }
  })

  return <></>
}

export default AddMoreLiquid