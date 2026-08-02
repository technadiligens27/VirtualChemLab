import {
  useContext,
  useEffect,
  useRef,
} from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PourFromBurette = ({
  scaleSpeed = 0.09,
  minimumScaleY = 0,
  smoothSpeed = 2,
}) => {
  
  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const { mainBuiretteRef } =
    useContext(ModelContext)
  
  const pourRef = useRef(null)
  const liquidRef = useRef(null)

  const isScrollingRef = useRef(false)
  const isPourFinishedRef = useRef(false)

  useEffect(() => {
    const handleWheel = (event) => {
      const liquid = liquidRef.current

      if (event.deltaY <= 0) return
      if (!liquid) return
      if (liquid.scale.y <= 0) return
      if (isScrollingRef.current) return
      if (isPourFinishedRef.current) return

      isScrollingRef.current = true

      console.log("Burette pouring started")
    }

    window.addEventListener(
      "wheel",
      handleWheel,
      { passive: true }
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [])

  useEffect(() => {
    const burette =
      mainBuiretteRef.current

    if (!burette) {
      console.log("No Burette Found")
      return
    }

    burette.traverse((child) => {
      if (
        child.isMesh &&
        child.name.includes("pour")
      ) {
        pourRef.current = child

        child.scale.y = minimumScaleY
        child.visible = false
      }

      if (
        child.isMesh &&
        child.name.includes("liquid")
      ) {
        liquidRef.current = child
      }
    })
  }, [
    mainBuiretteRef,
    minimumScaleY,
  ])

  useFrame((state, delta) => {
    const pour = pourRef.current
    const liquid = liquidRef.current

    if (!pour) return
    if (!liquid) return
    if (!isScrollingRef.current) return

    if (liquid.scale.y <= 0) {
      liquid.scale.y = 0
      pour.visible = false
      pour.scale.y = minimumScaleY

      isScrollingRef.current = false
      isPourFinishedRef.current = true

      return
    }

    pour.visible = true

    pour.scale.y =
      THREE.MathUtils.damp(
        pour.scale.y,
        80,
        smoothSpeed,
        delta
      )

    liquid.scale.y = Math.max(
      liquid.scale.y - scaleSpeed * delta,
      0
    )

    if (liquid.scale.y <= 0) {
      liquid.scale.y = 0
      pour.visible = false
      pour.scale.y = minimumScaleY

      isScrollingRef.current = false
      isPourFinishedRef.current = true

      console.log("Burette pouring finished")

      if (
        selectedLesson === 8 &&
        lessonStep === 27
      ) {
        setLessonStep(28)
      }
    }
  })

  return null
}

export default PourFromBurette