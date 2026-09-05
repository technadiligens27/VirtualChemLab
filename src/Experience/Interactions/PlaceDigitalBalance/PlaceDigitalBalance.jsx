import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"

import * as THREE from "three"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"


const PlaceDigitalBalance = () => {
  const {
    balancePositionRef,
    digitalBalanceRef,
  } = useContext(ModelContext)

  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const originalPositionRef =
    useRef(null)


  // =====================================================
  // LESSON STEP UPDATES
  // =====================================================

  useEffect(() => {
    if (
      selectedLesson === 8 &&
      lessonStep === 14
    ) {
      setLessonStep(15)
    }
  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])


  useEffect(() => {
    if (
      selectedLesson === 9 &&
      lessonStep === 12
    ) {
      setLessonStep(13)
    }
  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])


  useEffect(() => {
    if (
      selectedLesson === 9 &&
      lessonStep === 34
    ) {
      setLessonStep(35)
    }
  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])


  useEffect(() => {
    if (
      selectedLesson === 12 &&
      lessonStep === 4
    ) {
      setLessonStep(5)
    }
  }, [
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])


  // =====================================================
  // PLACE DIGITAL BALANCE
  // =====================================================

  useLayoutEffect(() => {
    const balancePosition =
      balancePositionRef?.current

    const digitalBalance =
      digitalBalanceRef?.current

    if (
      !balancePosition ||
      !digitalBalance
    ) {
      return
    }


    // =============================================
    // SAVE ORIGINAL POSITION BEFORE MOVING
    // =============================================

    const originalPosition =
      digitalBalance.position.clone()

    originalPositionRef.current =
      originalPosition


    // =============================================
    // GET TARGET WORLD POSITION
    // =============================================

    const targetWorldPosition =
      new THREE.Vector3()

    balancePosition.getWorldPosition(
      targetWorldPosition
    )


    // =============================================
    // CONVERT TO DIGITAL BALANCE PARENT SPACE
    // =============================================

    const parent =
      digitalBalance.parent

    if (parent) {
      parent.worldToLocal(
        targetWorldPosition
      )
    }


    // =============================================
    // MOVE DIGITAL BALANCE
    // =============================================

    digitalBalance.position.copy(
      targetWorldPosition
    )

    digitalBalance.updateMatrixWorld(true)


    // =============================================
    // UNMOUNT → RESTORE ORIGINAL POSITION
    // =============================================

    return () => {
      const balance =
        digitalBalanceRef?.current

      if (
        !balance ||
        !originalPositionRef.current
      ) {
        return
      }

      balance.position.copy(
        originalPositionRef.current
      )

      balance.updateMatrixWorld(true)
    }
  }, [
    balancePositionRef,
    digitalBalanceRef,
  ])


  return null
}

export default PlaceDigitalBalance