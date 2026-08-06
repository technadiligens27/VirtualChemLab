import {
  useContext,
  useEffect,
  useRef,
} from "react"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PlaceDigitalBalance = () => {
  const {
    balancePositionRef,
    digitalBalanceRef,
  } = useContext(ModelContext)

  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const originalPositionRef = useRef(null)

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
    const balancePosition =
      balancePositionRef?.current

    const digitalBalance =
      digitalBalanceRef?.current

    if (!balancePosition || !digitalBalance) return

    // Save original position
    originalPositionRef.current =
      digitalBalance.position.clone()

    const balanceWorldPosition =
      new THREE.Vector3()

    balancePosition.getWorldPosition(
      balanceWorldPosition
    )

    const balanceParent = digitalBalance.parent

    if (balanceParent) {
      balanceParent.worldToLocal(
        balanceWorldPosition
      )
    }

    digitalBalance.position.copy(
      balanceWorldPosition
    )

    digitalBalance.updateMatrixWorld(true)

    // Runs when component unmounts
    return () => {
      if (originalPositionRef.current) {
        digitalBalance.position.copy(
          originalPositionRef.current
        )

        digitalBalance.updateMatrixWorld(true)
      }
    }
  }, [
    balancePositionRef,
    digitalBalanceRef,
  ])

  return null
}

export default PlaceDigitalBalance