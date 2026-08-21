import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import PhenopthalinePourDroplets from "../PhenopthalinePourDroplets/PhenopthalinePourDroplets"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PhenopthalineSqueezeAnimation = ({
  modelRef,
  squeezeAmount = 0.08,
  squeezeSpeed = 8,
}) => {
  const {pourDroplets,setPourDroplets} = useContext(InteractionContext)
  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)

  const bottomRef = useRef(null)

  const originalScaleXRef = useRef(null)
  const targetScaleXRef = useRef(null)

  const fullySqueezedLoggedRef = useRef(false)
  const fullyReleasedLoggedRef = useRef(true)

  useEffect(() => {
    if (!modelRef?.current) return

    let bottomObject = null

    modelRef.current.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (childName.includes("bottom")) {
        bottomObject = child
      }
    })

    if (!bottomObject) {
      console.log(
        "Phenolphthalein bottle bottom child not found"
      )
      return
    }

    bottomRef.current = bottomObject

    originalScaleXRef.current =
      bottomObject.scale.x

    targetScaleXRef.current =
      bottomObject.scale.x

    console.log(
      "Phenolphthalein bottom found:",
      bottomObject.name
    )

    const handleWheel = (event) => {
      if (!bottomRef.current) return

      const originalX =
        originalScaleXRef.current

      if (originalX === null) return

      // =====================================
      // SCROLL DOWN = SQUEEZE
      // =====================================

      if (event.deltaY > 0) {
        targetScaleXRef.current =
          originalX - squeezeAmount

        fullySqueezedLoggedRef.current = false
        fullyReleasedLoggedRef.current = false
      }

      // =====================================
      // SCROLL UP = RELEASE
      // =====================================

      if (event.deltaY < 0) {
        targetScaleXRef.current =
          originalX

        fullyReleasedLoggedRef.current = false
      }
    }

    window.addEventListener(
      "wheel",
      handleWheel
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )

      if (
        bottomRef.current &&
        originalScaleXRef.current !== null
      ) {
        bottomRef.current.scale.x =
          originalScaleXRef.current

        bottomRef.current.updateMatrixWorld(true)
      }

      bottomRef.current = null
    }
  }, [
    modelRef,
    squeezeAmount,
  ])

  useFrame((_, delta) => {
    if (!bottomRef.current) return
    if (targetScaleXRef.current === null) return
    if (originalScaleXRef.current === null) return

    const bottom =
      bottomRef.current

    const targetX =
      targetScaleXRef.current

    const originalX =
      originalScaleXRef.current

    const squeezedX =
      originalX - squeezeAmount

    // Smooth animation
    bottom.scale.x +=
      (
        targetX -
        bottom.scale.x
      ) *
      Math.min(
        squeezeSpeed * delta,
        1
      )

    // Small tolerance
    const epsilon = 0.001

    // =====================================
    // FULLY SQUEEZED
    // =====================================

    if (
      Math.abs(
        bottom.scale.x - squeezedX
      ) < epsilon &&
      targetX === squeezedX &&
      !fullySqueezedLoggedRef.current
    ) {
      bottom.scale.x = squeezedX

      fullySqueezedLoggedRef.current = true

      setPourDroplets(true)
  
      console.log(
        "✅ Phenolphthalein FULLY SQUEEZED"
      )


    }

    // =====================================
    // FULLY RELEASED
    // =====================================

    if (
      Math.abs(
        bottom.scale.x - originalX
      ) < epsilon &&
      targetX === originalX &&
      !fullyReleasedLoggedRef.current
    ) {
      bottom.scale.x = originalX

      fullyReleasedLoggedRef.current = true

      console.log(
        "✅ Phenolphthalein FULLY RELEASED"
      )
    }

    bottom.updateMatrixWorld(true)
  })

  return (
    <>
        {pourDroplets && <PhenopthalinePourDroplets modelRef={modelRef}/>}
    </>
  )
}

export default PhenopthalineSqueezeAnimation