import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import StirReaction from "../StirReaction/StirReaction"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const StirMode = ({ spoonRef, beakerRef, hand }) => {
  const { isStirring, setIsStirring } =useContext(InteractionContext)
  const  {lessonStep,setLessonStep,selectedLesson} = useContext(MainGuidelineContext)

  const centerWorld = useRef(new THREE.Vector3())
  const centerLocal = useRef(new THREE.Vector3())
  const foundStirPoint = useRef(false)

  const targetAngle = useRef(0)
  const currentAngle = useRef(0)
  const scrollStopTimer = useRef(null)

  // Save positions before Stir Mode starts
  const originalBeakerPosition = useRef(null)
  const originalSpoonPosition = useRef(null)
  const originalSpoonRotation = useRef(null)

  const radius = 0.2
  const heightOffset = 0.5

  useEffect(()=>{
    if(selectedLesson==1 && lessonStep==8){
      setLessonStep(9)
    }
  },[lessonStep])

  useEffect(() => {
    if (!beakerRef?.current || !spoonRef?.current) return

    // Save original transforms
    originalBeakerPosition.current =
      beakerRef.current.position.clone()

    originalSpoonPosition.current =
      spoonRef.current.position.clone()

    originalSpoonRotation.current =
      spoonRef.current.rotation.clone()

    if (hand === "left") {
      beakerRef.current.position.x -= 2.5
    }

    if (hand === "right") {
      beakerRef.current.position.x += 4
    }

    beakerRef.current.traverse((child) => {
      if (child.name?.toLowerCase().includes("stir")) {
        child.visible = true
        child.getWorldPosition(centerWorld.current)
        foundStirPoint.current = true
      }
    })

    // Runs when Exit Stir Mode is clicked
    return () => {
      setIsStirring(false)
      foundStirPoint.current = false

      if (originalBeakerPosition.current) {
        beakerRef.current?.position.copy(
          originalBeakerPosition.current
        )
      }

      if (originalSpoonPosition.current) {
        spoonRef.current?.position.copy(
          originalSpoonPosition.current
        )
      }

      if (originalSpoonRotation.current) {
        spoonRef.current?.rotation.copy(
          originalSpoonRotation.current
        )
      }

      beakerRef.current?.traverse((child) => {
        if (child.name?.toLowerCase().includes("stir")) {
          child.visible = false
        }
      })
    }
  }, [beakerRef, spoonRef, hand, setIsStirring])

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      targetAngle.current += e.deltaY * 0.004

      setIsStirring(true)

      if (scrollStopTimer.current) {
        clearTimeout(scrollStopTimer.current)
      }

      scrollStopTimer.current = setTimeout(() => {
        setIsStirring(false)
      }, 250)
    }

    window.addEventListener("wheel", handleWheel)

    return () => {
      window.removeEventListener("wheel", handleWheel)

      if (scrollStopTimer.current) {
        clearTimeout(scrollStopTimer.current)
      }

      setIsStirring(false)
    }
  }, [setIsStirring])

  useFrame((_, delta) => {
    if (!spoonRef?.current || !foundStirPoint.current) return

    currentAngle.current = THREE.MathUtils.lerp(
      currentAngle.current,
      targetAngle.current,
      1 - Math.exp(-8 * delta)
    )

    const x = Math.cos(currentAngle.current) * radius
    const z = Math.sin(currentAngle.current) * radius

    centerLocal.current.copy(centerWorld.current)

    if (spoonRef.current.parent) {
      spoonRef.current.parent.worldToLocal(centerLocal.current)
    }

    spoonRef.current.position.set(
      centerLocal.current.x + x,
      centerLocal.current.y + heightOffset,
      centerLocal.current.z + z
    )

    spoonRef.current.lookAt(centerWorld.current)

    // Adjust spoon rotation after lookAt
    spoonRef.current.rotateX(-1.4285)
    spoonRef.current.rotateY(-5.3011)
    spoonRef.current.rotateZ(0.0213)
  })

  return <>{isStirring && <StirReaction hand={hand} spoonRef={spoonRef} beakerRef={beakerRef} />}</>
}

export default StirMode