import { useContext, useEffect, useRef } from "react"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"

import FillDropper from "../FillDropper/FillDropper"

const PROTEIN_LESSON = 7
const SCROLL_SPEED = 0.0008

const DROP_ANIMATION_STEPS = [7, 9, 14]

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

const hasLiquid = (liquid) => {
  return liquid?.visible && liquid.scale.y > 0
}

const DropperScrollAnimation = ({hand}) => {
  const {
    dropperAnimationAction,
    mainDropperRef,
  } = useContext(ModelContext)

  const {
    isDropperFilled,
    setIsDropperFilled,
    selectedLeftHand,
    leftBeakerFillData,
  } = useContext(InteractionContext)

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const { setIsBiuretReaction } =
    useContext(ReactionContext)

  const latestDataRef = useRef({
    selectedLesson,
    lessonStep,
    selectedLeftHand,
    leftBeakerFillData,
  })

  useEffect(() => {
    latestDataRef.current = {
      selectedLesson,
      lessonStep,
      selectedLeftHand,
      leftBeakerFillData,
    }
  }, [
    selectedLesson,
    lessonStep,
    selectedLeftHand,
    leftBeakerFillData,
  ])

  const startProteinReaction = () => {
    const dropper = mainDropperRef?.current
    const beaker =
      latestDataRef.current.selectedLeftHand?.ref?.current

    if (!dropper || !beaker) return

    const dropperLiquid = findLiquid(dropper)
    const beakerLiquid = findLiquid(beaker, true)

    const isProteinSample =
      latestDataRef.current.leftBeakerFillData?.name ===
      "Protein Sample"

    const canReact =
      hasLiquid(dropperLiquid) &&
      hasLiquid(beakerLiquid) &&
      isProteinSample

    if (!canReact) return

    setIsDropperFilled(false)
    setIsBiuretReaction(true)
  }

  const handleCompletedAnimation = (actionTime, duration) => {
    if (actionTime < duration) return

    const { selectedLesson, lessonStep } =
      latestDataRef.current

    if (selectedLesson !== PROTEIN_LESSON) return

    if (lessonStep === 7) {
      setLessonStep(8)
    }

    if (lessonStep === 14) {
      startProteinReaction()
      setLessonStep(15)
    }
  }

    const handleDropperReleased = (actionTime) => {
      const { selectedLesson, lessonStep } =
        latestDataRef.current

      const isFullyReleased = actionTime <= 0

      if (
        selectedLesson === PROTEIN_LESSON &&
        lessonStep === 9 &&
        isFullyReleased
      ) {
        setIsDropperFilled(true)
        setLessonStep(10)
      }
    }

  useEffect(() => {
    const action = dropperAnimationAction

    if (!action) return

    const mixer = action.getMixer()
    const duration = action.getClip().duration

    action.setLoop(THREE.LoopOnce, 1)
    action.clampWhenFinished = true
    action.play()
    action.paused = true

    mixer.update(0)

    const handleScroll = (event) => {
      const { selectedLesson, lessonStep } =
        latestDataRef.current

      const canAnimate =
        selectedLesson === PROTEIN_LESSON &&
        DROP_ANIMATION_STEPS.includes(lessonStep)

      if (!canAnimate) return

      event.preventDefault()

      const scrollAmount =
        Math.abs(event.deltaY) * SCROLL_SPEED

      if (event.deltaY > 0) {
        // Scroll down — squeeze
        action.time += scrollAmount
      } else {
        // Scroll up — unsqueeze
        action.time -= scrollAmount
      }

      action.time = THREE.MathUtils.clamp(
        action.time,
        0,
        duration
      )

      mixer.update(0)

      if (event.deltaY < 0) {
        handleDropperReleased(action.time)
      }

      handleCompletedAnimation(action.time, duration)
    }

    window.addEventListener("wheel", handleScroll, {
      passive: false,
    })

    return () => {
      window.removeEventListener(
        "wheel",
        handleScroll
      )
    }
  }, [dropperAnimationAction])

  return isDropperFilled ? <FillDropper hand={hand} /> : null
}

export default DropperScrollAnimation