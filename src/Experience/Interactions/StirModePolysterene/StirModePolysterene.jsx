import {
  useContext,
  useEffect,
  useRef,
} from "react"
import { useFrame } from "@react-three/fiber"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const StirModePolysterene = ({
  heightOffset = 0,
  xOffset = 0,
  zOffset = 0,
  stirRadius = 0.003,
  stirSpeed = 4,
}) => {
  const {
    spoonRef,
    mainPolystereneRef,
  } = useContext(ModelContext)

  const {lessonStep,selectedLesson,setLessonStep} = useContext(MainGuidelineContext)

  useEffect(()=>{
    if(selectedLesson===8 && lessonStep ==33){
        setLessonStep(34)
    }
  },[lessonStep,selectedLesson])

  const originalTransformRef = useRef(null)

  const stirPointRef = useRef(null)

  const isStirringRef = useRef(false)
  const angleRef = useRef(0)
  const stopTimerRef = useRef(null)

  useEffect(() => {
    const spoon = spoonRef?.current
    const polystyrene =
      mainPolystereneRef?.current

    if (!spoon || !polystyrene) {
      console.log(
        "Spoon or polystyrene cup was not found"
      )
      return
    }

    originalTransformRef.current = {
      parent: spoon.parent,
      position: spoon.position.clone(),
      rotation: spoon.rotation.clone(),
      scale: spoon.scale.clone(),
    }

    let stirPoint = null

    polystyrene.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      if (
        !stirPoint &&
        name.includes("stir")
      ) {
        stirPoint = child
      }
    })

    if (!stirPoint) {
      console.log(
        "Stir point was not found inside the polystyrene cup"
      )
      return
    }

    stirPointRef.current = stirPoint

    // Attach spoon to stir point
    stirPoint.add(spoon)

    spoon.position.set(
      xOffset + stirRadius,
      heightOffset,
      zOffset
    )

    // Keep spoon tilted like real stirring
    spoon.rotation.set(
      Math.PI / 7,
      0,
      -Math.PI / 12
    )

    spoon.scale.set(0.5, 2, 1)
    spoon.updateMatrixWorld(true)

    const handleWheel = (event) => {
      // Only stir when scrolling down
      if (event.deltaY <= 0) return

      isStirringRef.current = true

      clearTimeout(stopTimerRef.current)

      // Stop stirring shortly after scrolling stops
      stopTimerRef.current = setTimeout(() => {
        isStirringRef.current = false
      }, 150)
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

      clearTimeout(stopTimerRef.current)

      isStirringRef.current = false
      stirPointRef.current = null

      const original =
        originalTransformRef.current

      if (!original) return

      if (original.parent) {
        original.parent.add(spoon)
      }

      spoon.position.copy(
        original.position
      )

      spoon.rotation.copy(
        original.rotation
      )

      spoon.scale.copy(
        original.scale
      )

      spoon.updateMatrixWorld(true)

      console.log(
        "Spoon detached and returned"
      )
    }
  }, [
    spoonRef,
    mainPolystereneRef,
    heightOffset,
    xOffset,
    zOffset,
    stirRadius,
  ])

  useFrame((_, delta) => {
    const spoon = spoonRef?.current

    if (
      !spoon ||
      !stirPointRef.current ||
      !isStirringRef.current
    ) {
      return
    }

    angleRef.current +=
      stirSpeed * delta

    const angle = angleRef.current

    // Move the spoon around the cup
    spoon.position.x =
      xOffset +
      Math.cos(angle) * stirRadius

    spoon.position.z =
      zOffset +
      Math.sin(angle) * stirRadius

    spoon.position.y =
      heightOffset

    // Turn spoon around the centre
    spoon.rotation.y = -angle

    spoon.updateMatrixWorld(true)
  })

  return null
}

export default StirModePolysterene