import { useFrame, useThree } from '@react-three/fiber'
import { useContext, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { InteractionContext } from '../../Contexts/InteractionContext/InteractionContext';

const PlayerController = () => {
  const { camera } = useThree();

  const {hasSat} = useContext(InteractionContext)

  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'KeyW') keys.current.forward = true
      if (event.code === 'KeyS') keys.current.backward = true
      if (event.code === 'KeyA') keys.current.left = true
      if (event.code === 'KeyD') keys.current.right = true
    }

    const handleKeyUp = (event) => {
      if (event.code === 'KeyW') keys.current.forward = false
      if (event.code === 'KeyS') keys.current.backward = false
      if (event.code === 'KeyA') keys.current.left = false
      if (event.code === 'KeyD') keys.current.right = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((state, delta) => {

    if (hasSat.current) {
      camera.position.y = 8
      return
    }    
    const speed = 25

    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward)

    // Prevent flying up/down when looking up/down
    forward.y = 0
    forward.normalize()

    const right = new THREE.Vector3()
    right.crossVectors(forward, camera.up).normalize()

    if (keys.current.forward) {
      camera.position.addScaledVector(forward, speed * delta)
    }

    if (keys.current.backward) {
      camera.position.addScaledVector(forward, -speed * delta)
    }

    if (keys.current.left) {
      camera.position.addScaledVector(right, -speed * delta)
    }

    if (keys.current.right) {
      camera.position.addScaledVector(right, speed * delta)
    }


    camera.position.y = 10.6
  })

  return null
}

export default PlayerController