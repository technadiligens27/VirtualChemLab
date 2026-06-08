import { useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const HoldRight = ({ modeldata }) => {
  const { camera } = useThree()

  const offset = useMemo(() => {
    return new THREE.Vector3(-2, 7, 0)
  }, [])

  useFrame(() => {
    if (!modeldata?.ref?.current) return

    const object = modeldata.ref.current

    const targetPosition = offset
      .clone()
      .applyQuaternion(camera.quaternion)
      .add(camera.position)

    object.position.copy(targetPosition)

    object.rotation.set(
      camera.rotation.x,
      camera.rotation.y,
      camera.rotation.z
    )

    object.scale.set(1, 1, 1)
    object.visible = true
  })

  return null
}

export default HoldRight