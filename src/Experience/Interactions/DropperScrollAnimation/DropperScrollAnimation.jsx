import { useContext, useEffect, useRef } from "react"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"

import FillDropper from "../FillDropper/FillDropper"

const DropperScrollAnimation = () => {
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
    setLessonStep,
    selectedLesson,
    lessonStep,
  } = useContext(MainGuidelineContext)

  const { setIsBiuretReaction } =
    useContext(ReactionContext)

  const selectedLessonRef = useRef(selectedLesson)
  const lessonStepRef = useRef(lessonStep)
  const selectedLeftHandRef = useRef(selectedLeftHand)
  const leftBeakerFillDataRef = useRef(leftBeakerFillData)

  useEffect(() => {
    selectedLessonRef.current = selectedLesson
    lessonStepRef.current = lessonStep
    selectedLeftHandRef.current = selectedLeftHand
    leftBeakerFillDataRef.current = leftBeakerFillData
  }, [
    selectedLesson,
    lessonStep,
    selectedLeftHand,
    leftBeakerFillData,
  ])

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

    const checkProteinReaction = () => {
      const dropper = mainDropperRef?.current
      const beaker =
        selectedLeftHandRef.current?.ref?.current

      if (!dropper || !beaker) return

      let dropperLiquid = null
      let beakerLiquid = null

      dropper.traverse((child) => {
        if (
          child.name?.toLowerCase().includes("liquid")
        ) {
          dropperLiquid = child
        }
      })

      beaker.traverse((child) => {
        if (
          child.name?.toLowerCase().includes("liquid") &&
          child.visible
        ) {
          beakerLiquid = child
        }
      })

      const correctReaction =
        dropperLiquid?.visible &&
        dropperLiquid.scale.y > 0 &&
        beakerLiquid?.visible &&
        beakerLiquid.scale.y > 0 &&
        leftBeakerFillDataRef.current?.name ===
          "Protein Sample"

      if (correctReaction) {
        setIsDropperFilled(false)
        setIsBiuretReaction(true)
      }
    }

    const handleScroll = (event) => {
      event.preventDefault()

      const amount = Math.abs(event.deltaY) * 0.0008
      const wasFullySqueezed =
        action.time >= duration

      if (event.deltaY > 0) {
        action.time += amount
      } else {
        action.time -= amount

        if (
          wasFullySqueezed &&
          selectedLessonRef.current === 7 &&
          lessonStepRef.current === 9
        ) {
          setIsDropperFilled(true)
          setLessonStep(10)
        }
      }

      action.time = THREE.MathUtils.clamp(
        action.time,
        0,
        duration
      )

      mixer.update(0)

      if (
        action.time >= duration &&
        selectedLessonRef.current === 7 &&
        lessonStepRef.current === 7
      ) {
        setLessonStep(8)
      }

      if (
        action.time >= duration &&
        selectedLessonRef.current === 7 &&
        lessonStepRef.current === 14
      ) {
        checkProteinReaction()
        setLessonStep(15)
      }
    }

    window.addEventListener("wheel", handleScroll, {
      passive: false,
    })

    return () => {
      window.removeEventListener("wheel", handleScroll)
    }
  }, [
    dropperAnimationAction,
    mainDropperRef,
    setLessonStep,
    setIsDropperFilled,
    setIsBiuretReaction,
  ])

  return isDropperFilled ? <FillDropper /> : null
}

export default DropperScrollAnimation