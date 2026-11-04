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
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const AdjustClampHandle = ({
  yOffset = 0,
  time = 1,
}) => {

  const {clampHandleRef} = useContext(ModelContext);
  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)

  const animationRef = useRef({
    started: false,
    completed: false,
    elapsedTime: 0,
    startY: 0,
    endY: 0,
  })

  useEffect(() => {
    const handleScroll = (event) => {
      const clampHandle =
        clampHandleRef?.current

      const animation =
        animationRef.current

      // Only begin when scrolling down.
      if (
        event.deltaY <= 0 ||
        !clampHandle ||
        animation.started ||
        animation.completed
      ) {
        return
      }

      animationRef.current = {
        started: true,
        completed: false,
        elapsedTime: 0,

        startY:
          clampHandle.position.y,

        endY:
          clampHandle.position.y +
          yOffset,
      }
    }

    window.addEventListener(
      "wheel",
      handleScroll
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleScroll
      )
    }
  }, [
    clampHandleRef,
    yOffset,
  ])

  useFrame((_, delta) => {
    const clampHandle =
      clampHandleRef?.current

    const animation =
      animationRef.current

    if (
      !clampHandle ||
      !animation.started ||
      animation.completed
    ) {
      return
    }

    animation.elapsedTime += delta

    const duration =
      Math.max(time, 0.001)

    const progress =
      Math.min(
        animation.elapsedTime / duration,
        1
      )

    const easedProgress =
      THREE.MathUtils.smoothstep(
        progress,
        0,
        1
      )

    clampHandle.position.y =
      THREE.MathUtils.lerp(
        animation.startY,
        animation.endY,
        easedProgress
      )

    if (progress >= 1) {
      clampHandle.position.y =
        animation.endY

      animation.completed = true

      if(selectedLesson==14.3 && lessonStep==100){
        setLessonStep(101)
      }
    }
  })

  return null
}

export default AdjustClampHandle