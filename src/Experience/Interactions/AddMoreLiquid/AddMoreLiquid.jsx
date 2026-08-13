import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AddMoreLiquid = ({
  liquidRef,
  amount,
  speed = 10,
  pourModelRef,
}) => {
  const targetYRef = useRef(null)
  const pourLiquidRef = useRef(null)
  const pourStartScaleRef = useRef(null)

  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)

    console.log("AddMore")
  useEffect(() => {
    if (!liquidRef?.current) return

    targetYRef.current = liquidRef.current.scale.y + amount
  }, [liquidRef, amount])

  useEffect(() => {
    if (!pourModelRef?.current) return

    pourLiquidRef.current = null

    pourModelRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (childName.includes("liquid")) {
        pourLiquidRef.current = child
        pourStartScaleRef.current = child.scale.y
      }
    })
  }, [pourModelRef])


  useEffect(()=>{
    if(selectedLesson===10 && lessonStep===110){
        setLessonStep(111)
    }
  },[selectedLesson,lessonStep])

  useFrame((_, delta) => {
    if (!liquidRef?.current || targetYRef.current === null) return

    const currentY = liquidRef.current.scale.y
    const targetY = targetYRef.current

    if (currentY < targetY) {
      liquidRef.current.scale.y = Math.min(
        currentY + speed * delta,
        targetY
      )
    }

    if (pourLiquidRef.current && pourLiquidRef.current.scale.y > 0) {
      pourLiquidRef.current.scale.y = Math.max(
        pourLiquidRef.current.scale.y - speed * delta,
        0
      )

      if (pourLiquidRef.current.scale.y === 0) {
        pourLiquidRef.current.visible = false
      }
    }
  })

  return null
}

export default AddMoreLiquid