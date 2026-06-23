import { useContext, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import PouringLiquid from "../PouringLiquid/PouringLiquid"
import * as THREE from "three"

const PouringMode = ({ hand }) => {
  const { camera } = useThree()

  const { selectedRightHand, selectedLeftHand,setPouredFromLeft } =
    useContext(InteractionContext)

  const emptyRef = useRef(null)
  const rotationZRef = useRef(0)

  const [isPouring, setIsPouring] = useState(false)
  const [activeObject, setActiveObject] = useState(null)

  useEffect(() => {
    emptyRef.current = null

    const sourceObject =
      hand === "right"
        ? selectedLeftHand?.ref?.current
        : selectedRightHand?.ref?.current

    if (!sourceObject) return

    sourceObject.traverse((child) => {
      if (child.name?.toLowerCase().includes("empty")) {
        emptyRef.current = child
      }
    })
  }, [hand, selectedLeftHand, selectedRightHand])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() !== "p") return

      // Right hand = P
      if (hand === "right" && e.shiftKey) return

      // Left hand = Shift + P
      if (hand === "left" && !e.shiftKey) return

      const targetObject =
        hand === "right"
          ? selectedRightHand?.ref?.current
          : selectedLeftHand?.ref?.current

      if (!emptyRef.current || !targetObject) return

      if (hand === "right") {
        selectedLeftHand?.ref?.current?.position.set(-1, -0.5, -5)

        const worldPosition = new THREE.Vector3()
        emptyRef.current.getWorldPosition(worldPosition)

        const localPosition = camera.worldToLocal(worldPosition.clone())
        localPosition.add(new THREE.Vector3(2.7, 3.1, 0))

        targetObject.position.copy(localPosition)
      }

      if (hand === "left") {
        selectedRightHand?.ref?.current?.position.set(1, -1, -5)

        const worldPosition = new THREE.Vector3()
        emptyRef.current.getWorldPosition(worldPosition)

        const localPosition = camera.worldToLocal(worldPosition.clone())
        localPosition.add(new THREE.Vector3(-2, 0.1, -0.5))

        targetObject.position.copy(localPosition)
      }

      rotationZRef.current = 0
      setIsPouring(false)
      setActiveObject(targetObject)
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [hand, selectedRightHand, selectedLeftHand, camera])

  useEffect(() => {
    const handleWheel = (e) => {
      if (!activeObject) return

      e.preventDefault()

      const maxRotation = Math.PI / 5

      if (e.deltaY > 0) {
        rotationZRef.current = Math.max(
          rotationZRef.current - 0.15,
          -maxRotation
        )
      } else {
        rotationZRef.current = Math.min(
          rotationZRef.current + 0.15,
          maxRotation
        )
      }
    }

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    })

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [activeObject])

  useFrame(() => {
    if (!activeObject) return

    activeObject.rotation.set(0, 0, rotationZRef.current)

    const pouringAngle = Math.PI / 5
    const pouringNow = Math.abs(rotationZRef.current) >= pouringAngle

    if (pouringNow !== isPouring) {
      setIsPouring(pouringNow)

    }
  })

return (
  <>
    {activeObject && (
      <PouringLiquid
        modelRef={{ current: activeObject }}
        hand={hand}
        isPouring={isPouring}
      />
    )}
  </>
)
}

export default PouringMode