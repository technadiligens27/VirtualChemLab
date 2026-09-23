import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import * as THREE from "three"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

import {
  ReactionContext,
} from "../../../Contexts/ReactionContext/ReactionContext"

import PourDropletsFromModel from "../PourDropletsFromModel/PourDropletsFromModel"
import FillDropperLiquid from "../FillDropperLiquid/FillDropperLiquid"


const PROTEIN_LESSONS = [
  7,
  14.3,
]

const SCROLL_SPEED = 0.0008

const DROP_ANIMATION_STEPS = [
  7,
  9,
  14,
  116,
  118,
  124,
]

const findLiquid = (
  object,
  onlyVisible = false
) => {
  let liquid = null

  object?.traverse((child) => {
    const isLiquid =
      child.name
        ?.toLowerCase()
        .includes("liquid")

    if (!isLiquid) return

    if (
      onlyVisible &&
      !child.visible
    ) {
      return
    }

    liquid = child
  })

  return liquid
}

const hasLiquid = (liquid) => {
  return (
    liquid?.visible &&
    liquid.scale.y > 0
  )
}

const DropperScrollAnimation = ({
  hand,
}) => {
  const {
    dropperAnimationAction,
    mainDropperRef,testube02Ref
  } = useContext(ModelContext)

  const {
    isDropperFilled,
    setIsDropperFilled,

    selectedLeftHand,
    leftBeakerFillData,
  } = useContext(
    InteractionContext
  )

  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const {
    setIsBiuretReaction,
  } = useContext(
    ReactionContext
  )

  // =========================================
  // POUR STATE
  // =========================================

  const [isPourFromDropper,setIsPourFromDropper] = useState(false)

  // Prevents the pour from being triggered
  // repeatedly while action.time remains
  // at the maximum value.
  const pourTriggeredRef = useRef(false)

  // =========================================
  // LATEST DATA
  // =========================================

  const latestDataRef =
    useRef({
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

  // =========================================
  // RESET POUR FOR NEW SQUEEZE STEPS
  // =========================================

  useEffect(() => {
    if (
      DROP_ANIMATION_STEPS.includes(
        lessonStep
      )
    ) {
      setIsPourFromDropper(false)

      pourTriggeredRef.current =
        false
    }
  }, [
    lessonStep,
  ])

  // =========================================
  // PROTEIN REACTION
  // =========================================

  const startProteinReaction = () => {
    const dropper =
      mainDropperRef?.current

    const beaker =
      latestDataRef.current
        .selectedLeftHand
        ?.ref
        ?.current

    if (
      !dropper ||
      !beaker
    ) {
      return
    }

    const dropperLiquid =
      findLiquid(dropper)

    const beakerLiquid =
      findLiquid(
        beaker,
        true
      )

    const isProteinSample =
      latestDataRef.current
        .leftBeakerFillData
        ?.name ===
      "Protein Sample"

    const canReact =
      hasLiquid(
        dropperLiquid
      ) &&
      hasLiquid(
        beakerLiquid
      ) &&
      isProteinSample

    if (!canReact) return

    setIsDropperFilled(false)

    setIsBiuretReaction(
      true
    )
  }

  // =========================================
  // FULLY SQUEEZED
  // =========================================

  const handleCompletedAnimation = (
    actionTime,
    duration
  ) => {
    if (
      actionTime < duration
    ) {
      return
    }

    const {
      selectedLesson,
      lessonStep,
    } = latestDataRef.current

    if (
      !PROTEIN_LESSONS.includes(
        selectedLesson
      )
    ) {
      return
    }

    // =====================================
    // START POUR FROM DROPPER
    // =====================================

    if (
      !pourTriggeredRef.current
    ) {
      pourTriggeredRef.current =
        true

      setIsPourFromDropper(
        true
      )
    }

    // =====================================
    // LESSON 14.3
    // =====================================

    if (
      selectedLesson === 14.3 &&
      lessonStep === 124
    ) {
      setLessonStep(125)

      return
    }

    if (
      selectedLesson === 14.3 &&
      lessonStep === 116
    ) {
      setLessonStep(117)

      return
    }

    // =====================================
    // LESSON 7
    // =====================================

    if (
      selectedLesson === 7 &&
      lessonStep === 7
    ) {
      setLessonStep(8)

      return
    }

    if (
      selectedLesson === 7 &&
      lessonStep === 14
    ) {
      startProteinReaction()

      setLessonStep(15)

      return
    }
  }

  // =========================================
  // FULLY RELEASED
  // =========================================

  const handleDropperReleased = (
    actionTime
  ) => {
    const {
      selectedLesson,
      lessonStep,
    } = latestDataRef.current

    const isFullyReleased =
      actionTime <= 0

    if (
      !PROTEIN_LESSONS.includes(
        selectedLesson
      )
    ) {
      return
    }

    if (
      selectedLesson === 14.3 &&
      lessonStep === 118 &&
      isFullyReleased
    ) {
      // Ready for another future squeeze.
      setIsPourFromDropper(false)

      pourTriggeredRef.current =
        false

      setIsDropperFilled(true)

      setLessonStep(119)

      return
    }

    if (
      selectedLesson === 7 &&
      lessonStep === 9 &&
      isFullyReleased
    ) {
      setIsPourFromDropper(false)

      pourTriggeredRef.current =
        false

      setIsDropperFilled(true)

      setLessonStep(10)
    }
  }

  // =========================================
  // SCROLL ANIMATION
  // =========================================

  useEffect(() => {
    const action =
      dropperAnimationAction

    if (!action) return

    const mixer =
      action.getMixer()

    const duration =
      action
        .getClip()
        .duration

    action.setLoop(
      THREE.LoopOnce,
      1
    )

    action.clampWhenFinished =
      true

    action.play()

    action.paused =
      true

    mixer.update(0)

    const handleScroll = (
      event
    ) => {
      const {
        selectedLesson,
        lessonStep,
      } = latestDataRef.current

      const canAnimate =
        PROTEIN_LESSONS.includes(
          selectedLesson
        ) &&
        DROP_ANIMATION_STEPS.includes(
          lessonStep
        )

      if (!canAnimate) {
        return
      }

      event.preventDefault()

      const scrollAmount =
        Math.abs(
          event.deltaY
        ) *
        SCROLL_SPEED

      // =====================================
      // SCROLL DOWN — SQUEEZE
      // =====================================

      if (
        event.deltaY > 0
      ) {
        action.time +=
          scrollAmount
      }

      // =====================================
      // SCROLL UP — RELEASE
      // =====================================

      else {
        action.time -=
          scrollAmount
      }

      // =====================================
      // LIMIT ANIMATION
      // =====================================

      action.time =
        THREE.MathUtils.clamp(
          action.time,
          0,
          duration
        )

      mixer.update(0)

      // =====================================
      // RELEASE CHECK
      // =====================================

      if (
        event.deltaY < 0
      ) {
        handleDropperReleased(
          action.time
        )
      }

      // =====================================
      // SQUEEZE COMPLETE CHECK
      // =====================================

      handleCompletedAnimation(
        action.time,
        duration
      )
    }

    window.addEventListener(
      "wheel",
      handleScroll,
      {
        passive: false,
      }
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleScroll
      )
    }
  }, [
    dropperAnimationAction,
  ])

  // =========================================
  // RENDER
  // =========================================

  return (
    <>
      {isDropperFilled && !isPourFromDropper && (
        <FillDropperLiquid
          color="#ffffff"
          opacity={0.35}
          amount={1}
          speed={1}
          otherModelRef={testube02Ref}
          otherLiquidEndAmount={0.6}
        />
      )}

      {isDropperFilled && isPourFromDropper && (
        <PourDropletsFromModel
          modelRef={mainDropperRef}
          fallAxis={"y"}
          loopTimes = {4}
          startDelay={0}
        />
      )}
    </>
  )
}

export default DropperScrollAnimation