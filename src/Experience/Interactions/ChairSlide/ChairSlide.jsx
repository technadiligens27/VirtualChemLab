import { useFrame, useThree } from '@react-three/fiber'
import { useContext, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import Message from '../../Message/Message'
import { ModelContext } from '../../../Contexts/ModelContext/ModelContext'
import ChairSit from '../ChairSit/ChairSit'

const ChairSlide = () => {
  const { chairRef } = useContext(ModelContext);

  const { camera } = useThree()

  const [show, setShow] = useState(false)
  const [slid, setSlid] = useState(false)

  const chairPosition = useRef(new THREE.Vector3())
  const isSliding = useRef(false)

  useFrame(() => {
    if (!chairRef.current) return

    chairRef.current.getWorldPosition(chairPosition.current)

    const distance = camera.position.distanceTo(chairPosition.current)

    if (!slid) {
      setShow(distance < 14)
    }
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code !== 'KeyG') return
      if (!show) return
      if (!chairRef.current) return
      if (isSliding.current) return
      if (slid) return

      isSliding.current = true
      setShow(false)

      gsap.to(chairRef.current.position, {
        z: chairRef.current.position.z + 5,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          isSliding.current = false
          setSlid(true)
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [show, slid, chairRef])

  return (
    <>
      {show && chairRef.current && (
        <Message
          position={[
            chairPosition.current.x,
            chairPosition.current.y + 2,
            chairPosition.current.z
          ]}
          message="Press G to Slide"
        />
      )}

      {slid && <ChairSit />}
    </>
  )
}

export default ChairSlide