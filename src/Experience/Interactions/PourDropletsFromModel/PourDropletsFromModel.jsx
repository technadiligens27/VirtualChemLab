import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import FillLiquidBeaker from "../FillLiquid/FillLiquidBeaker/FillLiquidBeaker"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import FillConicalBeaker from "../FillConicalBeaker/FillConicalBeaker"

const PourDropletsFromModel = ({
  modelRef,

  fallDistance = 2,
  fallTime = 1,
  gap = 0.3,

  fallAxis = "x",

  // Seconds before the first drop starts.
  startDelay = 3,

  loopTimes = 10,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const {conicalBeakerRef02} = useContext(ModelContext)

  const dropletsRef =
    useRef([])

  const elapsedTimeRef =
    useRef(0)

  const hasAdvancedRef =
    useRef(false)

  useEffect(() => {
    const model =
      modelRef?.current

    if (!model) return

    const droplets = []

    model.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      if (name.includes("droplet")) {
        droplets.push({
          object: child,
          startPosition:
            child.position.clone(),
        })

        child.visible = true
      }
    })

    dropletsRef.current = droplets
    elapsedTimeRef.current = 0
    hasAdvancedRef.current = false

    return () => {
      droplets.forEach((droplet) => {
        droplet.object.position.copy(
          droplet.startPosition
        )
      })
    }
  }, [
    modelRef,
  ])

  useFrame((_, delta) => {
    const droplets =
      dropletsRef.current

    if (!droplets.length) return

    elapsedTimeRef.current += delta

    if (
      elapsedTimeRef.current < startDelay
    ) {
      return
    }

    const animationTime =
      elapsedTimeRef.current -
      startDelay

    const safeFallTime =
      Math.max(fallTime, 0.001)

    const safeGap =
      Math.max(gap, 0)

    const fullCycleTime =
      safeFallTime + safeGap

    const hasLoopLimit =
      Number.isFinite(loopTimes)

    const totalLoopTime =
      hasLoopLimit
        ? Math.max(
            1,
            Math.floor(loopTimes)
          ) * fullCycleTime
        : Infinity

    const hasFinished =
      animationTime >= totalLoopTime

    const cycleTime =
      hasFinished
        ? safeFallTime
        : animationTime %
          fullCycleTime

    const isFalling =
      cycleTime < safeFallTime

    const fallProgress =
      isFalling
        ? cycleTime / safeFallTime
        : 1

    const axis =
      ["x", "y", "z"].includes(
        fallAxis.toLowerCase()
      )
        ? fallAxis.toLowerCase()
        : "y"

    droplets.forEach(
      ({
        object,
        startPosition,
      }) => {
        object.position.copy(
          startPosition
        )

        object.position[axis] -=
          fallDistance * fallProgress

        object.visible = true
        object.updateMatrixWorld(true)
      }
    )

    if (
      hasFinished &&
      !hasAdvancedRef.current &&
      selectedLesson === 14.3 &&
      lessonStep === 109
    ) {
      hasAdvancedRef.current = true
      setLessonStep(110)
    }
  })

  return (
    <>

    
    </>
  )
}

export default PourDropletsFromModel