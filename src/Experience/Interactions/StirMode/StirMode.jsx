import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import StirReaction from "../StirReaction/StirReaction"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"

const StirMode = ({ spoonRef, beakerRef, hand }) => {
  const { isStirring, setIsStirring } = useContext(InteractionContext);
  const {} = useContext(ReactionContext)

  const centerWorld = useRef(new THREE.Vector3())
  const centerLocal = useRef(new THREE.Vector3())
  const foundStirPoint = useRef(false)

  const targetAngle = useRef(0)
  const currentAngle = useRef(0)

  const scrollStopTimer = useRef(null)

  const radius = 0.3
  const heightOffset = 2

  useEffect(() => {
    if (!beakerRef?.current || !spoonRef?.current) return

    if (hand === "left") {
      beakerRef.current.position.x -= 2.5
    }

    if (hand === "right") {
      beakerRef.current.position.x += 2
    }

    beakerRef.current.traverse((child) => {
      if (child.name?.toLowerCase().includes("stir")) {
        child.visible = true
        child.getWorldPosition(centerWorld.current)
        foundStirPoint.current = true
      }
    })
  }, [beakerRef, spoonRef, hand])

  useEffect(() => {
    const handleWheel = (e) => {
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
  })

  return (
    <>
    {isStirring &&  <StirReaction/>}
    </>
  )
}

export default StirMode