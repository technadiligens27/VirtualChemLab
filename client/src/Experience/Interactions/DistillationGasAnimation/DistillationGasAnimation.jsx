import {
  useContext,
  useEffect,
  useRef,
} from "react"

import * as THREE from "three"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

const DistillationGasAnimation = ({
  startDelay = 2000,
  times = 3,
  gap = 1000,
}) => {
  const {
    distillationGasAnimationActions,
  } = useContext(InteractionContext)

  const {
    distillationHeadRef,
  } = useContext(ModelContext)

  const timeoutIdsRef =
    useRef([])

  useEffect(() => {
    const actions =
      Object.values(
        distillationGasAnimationActions || {}
      ).filter(Boolean)

    const distillationHead =
      distillationHeadRef?.current

    if (
      !actions.length ||
      !distillationHead
    ) {
      return
    }

    const clearAllTimeouts = () => {
      timeoutIdsRef.current.forEach(
        (timeoutId) => {
          clearTimeout(timeoutId)
        }
      )

      timeoutIdsRef.current = []
    }

    const showGasChildren = () => {
      distillationHead.children.forEach(
        (child) => {
          const childName =
            child.name?.toLowerCase() || ""

          if (!childName.includes("gas")) {
            return
          }

          // Make the named gas model and everything
          // inside that model visible.
          child.traverse((gasChild) => {
            gasChild.visible = true
          })
        }
      )
    }

    const playGasAnimations = () => {
      // First reveal the three gas models.
      showGasChildren()

      // Then play their animations.
      actions.forEach((action) => {
        action.stop()
        action.reset()

        action.setLoop(
          THREE.LoopOnce,
          1
        )

        action.clampWhenFinished = true
        action.play()
      })
    }

    const longestAnimationTime =
      Math.max(
        ...actions.map((action) =>
          action.getClip().duration
        )
      ) * 1000

    const totalTimes =
      Math.max(
        1,
        Math.floor(times)
      )

    for (
      let index = 0;
      index < totalTimes;
      index += 1
    ) {
      const delayInMilliseconds =
        startDelay +
        index *
          (longestAnimationTime + gap)

      const timeoutId =
        setTimeout(
          playGasAnimations,
          delayInMilliseconds
        )

      timeoutIdsRef.current.push(
        timeoutId
      )
    }

    return () => {
      clearAllTimeouts()

      actions.forEach((action) => {
        action.stop()
      })
    }
  }, [
    distillationGasAnimationActions,
    distillationHeadRef,
    startDelay,
    times,
    gap,
  ])

  return null
}

export default DistillationGasAnimation