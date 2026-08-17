import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import { useFrame } from "@react-three/fiber"

import { ModelContext } from "../../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import FillLiquidBeaker from "../../FillLiquid/FillLiquidBeaker/FillLiquidBeaker"

const PourFromGraduatedCylinder = ({
  isPouring,
  pourSpeed = 170,
  fallDistance = 125,
  liquidDecreaseSpeed = 5,
}) => {
  const {
    graduatedBeakerRef,
    testube01Ref,
    testube02Ref,
    testube03Ref,
  } = useContext(ModelContext)

  const {
    fillTestubeLiquid,
    setFillTestubeLiquid,
    selectedLeftHand,
  } = useContext(InteractionContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const pourLiquidRef = useRef(null)
  const cylinderLiquidRef = useRef(null)
  const isPourFinishedRef = useRef(false)

  const [isPourFullyScaled, setIsPourFullyScaled] = useState(false)

  useEffect(() => {
    if (!graduatedBeakerRef?.current) return

    graduatedBeakerRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (child.isMesh && childName.includes("pour-fluid")) {
        pourLiquidRef.current = child

        child.visible = false
        child.scale.set(1, 0, 1)
      }

      if (child.isMesh && childName.includes("liquid")) {
        cylinderLiquidRef.current = child
      }
    })

    return () => {
      if (!pourLiquidRef.current) return

      pourLiquidRef.current.visible = false
      pourLiquidRef.current.scale.y = 0
    }
  }, [graduatedBeakerRef])

  useEffect(() => {
    if (isPouring) {
      isPourFinishedRef.current = false
      setIsPourFullyScaled(false)
    }
  }, [isPouring])

  useFrame((_, delta) => {
    if (!pourLiquidRef.current || !cylinderLiquidRef.current) return

    if (!isPouring) {
      pourLiquidRef.current.visible = false
      pourLiquidRef.current.scale.y = 0

      if (isPourFullyScaled) {
        setIsPourFullyScaled(false)
      }

      return
    }

    if (cylinderLiquidRef.current.scale.y <= 0) {
      cylinderLiquidRef.current.scale.y = 0
      cylinderLiquidRef.current.visible = false

      pourLiquidRef.current.visible = false
      pourLiquidRef.current.scale.y = 0

      if (isPourFullyScaled) {
        setIsPourFullyScaled(false)
      }

      if (!isPourFinishedRef.current) {
        isPourFinishedRef.current = true

        if (selectedLesson === 10 && lessonStep === 23) {
          setLessonStep(24)
        }

        if (selectedLesson === 10 && lessonStep === 30) {
          setLessonStep(31)
        }

        if (selectedLesson === 10 && lessonStep === 37) {
          setLessonStep(38)
        }
      }

      return
    }

    pourLiquidRef.current.visible = true

    pourLiquidRef.current.scale.y = Math.min(
      pourLiquidRef.current.scale.y + delta * pourSpeed,
      fallDistance
    )

    if (pourLiquidRef.current.scale.y >= fallDistance && !isPourFullyScaled) {
      setIsPourFullyScaled(true)

      if (!fillTestubeLiquid) {
        setFillTestubeLiquid(true)
      }
    }

    cylinderLiquidRef.current.scale.y = Math.max(
      cylinderLiquidRef.current.scale.y - delta * liquidDecreaseSpeed,
      0
    )
  })

  const canFillTestTube =
    fillTestubeLiquid &&
    isPouring &&
    isPourFullyScaled

  return (
    <>
      {selectedLeftHand?.name === "main-testube-01" && canFillTestTube && (
        <FillLiquidBeaker
          modelRef={testube01Ref}
          amount={20}
          color="#f3f4f6"
          isPouring={canFillTestTube}
        />
      )}

      {selectedLeftHand?.name === "main-testube-02" && canFillTestTube && (
        <FillLiquidBeaker
          modelRef={testube02Ref}
          amount={50}
          color="#f3f4f6"
          isPouring={canFillTestTube}
        />
      )}

      {selectedLeftHand?.name === "main-testube-03" && canFillTestTube && (
        <FillLiquidBeaker
          modelRef={testube03Ref}
          amount={50}
          color="#f3f4f6"
          isPouring={canFillTestTube}
        />
      )}
    </>
  )
}

export default PourFromGraduatedCylinder