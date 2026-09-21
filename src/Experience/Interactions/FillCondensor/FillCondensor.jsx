import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const FillCondensor = ({
  amount = 1,
  speed = 1,
}) => {
  const {
    condensorRef,
  } = useContext(ModelContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const liquidMeshesRef =
    useRef([])

  const hasAdvancedRef =
    useRef(false)

  useEffect(() => {
    const condensor =
      condensorRef?.current

    if (!condensor) return

    const liquidMeshes = []

    condensor.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      if (
        child.isMesh &&
        name.includes("liquid")
      ) {
        liquidMeshes.push(child)
        child.visible = true
      }
    })

    liquidMeshesRef.current =
      liquidMeshes
  }, [condensorRef])

  useEffect(() => {
    hasAdvancedRef.current = false
  }, [amount, selectedLesson, lessonStep])

  useFrame((_, delta) => {
    const liquidMeshes =
      liquidMeshesRef.current

    if (!liquidMeshes.length) return

    liquidMeshes.forEach((liquid) => {
      liquid.scale.y +=
        (amount - liquid.scale.y) *
        Math.min(speed * delta, 1)
    })

    const isFilled =
      liquidMeshes.every(
        (liquid) =>
          Math.abs(
            liquid.scale.y - amount
          ) < 0.01
      )

    if (
      isFilled &&
      !hasAdvancedRef.current &&
      selectedLesson === 14.3 &&
      lessonStep === 107
    ) {
      hasAdvancedRef.current = true
      setLessonStep(108)
    }
  })

  return null
}

export default FillCondensor