import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { useFrame } from "@react-three/fiber"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PipetteDroplets = ({
  fallDistance = 2,
  fallSpeed = 2,
  dropletSpacing = 0.3,
  liquidDecreaseSpeed = 0.2,
}) => {
  const { pipetteRef } = useContext(ModelContext)
  const { setPipetteDroplet,setFillPipette,setIsPipetteFilled } = useContext(InteractionContext)

  const {
    lessonStep,
    selectedLesson,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const dropletsRef = useRef([])
  const liquidRef = useRef(null)

  const currentDropletIndexRef = useRef(0)
  const spacingTimerRef = useRef(0)
  const isSequenceRunningRef = useRef(false)

  useEffect(() => {
    if (!pipetteRef?.current) return

    dropletsRef.current = []
    liquidRef.current = null

    pipetteRef.current.traverse((child) => {
      const childName = child.name?.toLowerCase() || ""

      if (childName.includes("droplet")) {
        dropletsRef.current.push({
          mesh: child,
          originalY: child.position.y,
          isFalling: false,
          finished: false,
        })

        child.visible = false
      }

      if (childName.includes("liquid")) {
        liquidRef.current = child
      }
    })

    if (dropletsRef.current.length === 0) {
      console.log("No droplets found")
      return
    }

    currentDropletIndexRef.current = 0
    spacingTimerRef.current = 0
    isSequenceRunningRef.current = true

    const firstDroplet = dropletsRef.current[0]

    firstDroplet.mesh.visible = true
    firstDroplet.isFalling = true

    return () => {
      dropletsRef.current.forEach((dropletData) => {
        dropletData.mesh.visible = false
        dropletData.mesh.position.y = dropletData.originalY
      })

      dropletsRef.current = []
      currentDropletIndexRef.current = 0
      spacingTimerRef.current = 0
      isSequenceRunningRef.current = false

      if (lessonStep === 50 && selectedLesson === 10) {
        setLessonStep(51)
      }

      if (lessonStep === 60 && selectedLesson === 10) {
        setLessonStep(61)
      }
      setFillPipette(false);
      setIsPipetteFilled(false)
    }
  }, [pipetteRef])

  useFrame((_, delta) => {
    if (!isSequenceRunningRef.current) return
    if (dropletsRef.current.length === 0) return

    if (liquidRef.current) {
      liquidRef.current.scale.y = Math.max(
        0,
        liquidRef.current.scale.y - liquidDecreaseSpeed * delta
      )

      if (liquidRef.current.scale.y === 0) {
        liquidRef.current.visible = false
      }
    }

    const currentIndex = currentDropletIndexRef.current
    const dropletData = dropletsRef.current[currentIndex]

    if (!dropletData) return

    if (dropletData.isFalling) {
      dropletData.mesh.position.y -= fallSpeed * delta

      if (dropletData.mesh.position.y <= dropletData.originalY - fallDistance) {
        dropletData.mesh.visible = false
        dropletData.mesh.position.y = dropletData.originalY

        dropletData.isFalling = false
        dropletData.finished = true

        spacingTimerRef.current = 0
      }

      return
    }

    if (dropletData.finished) {
      spacingTimerRef.current += delta

      if (spacingTimerRef.current < dropletSpacing) return

      const nextIndex = currentIndex + 1

      if (nextIndex >= dropletsRef.current.length) {
        if (liquidRef.current) {
          liquidRef.current.scale.y = 0
          liquidRef.current.visible = false
        }

        isSequenceRunningRef.current = false
        setPipetteDroplet(false)

        return
      }

      currentDropletIndexRef.current = nextIndex
      spacingTimerRef.current = 0

      const nextDroplet = dropletsRef.current[nextIndex]

      nextDroplet.mesh.visible = true
      nextDroplet.isFalling = true
    }
  })

  return null
}

export default PipetteDroplets