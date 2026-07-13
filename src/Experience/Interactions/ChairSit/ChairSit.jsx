import { useFrame, useThree } from '@react-three/fiber'
import { useContext, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import Message from '../../Message/Message'
import { ModelContext } from '../../../Contexts/ModelContext/ModelContext'
import { InteractionContext } from '../../../Contexts/InteractionContext/InteractionContext'

const ChairSit = () => {
  const { chairRef  } = useContext(ModelContext)
  const { hasSat,setIsSitting,setChairStep } = useContext(InteractionContext)

  const { camera } = useThree()

  const [show, setShow] = useState(false)

  const chairPosition = useRef(new THREE.Vector3())

  const beforeSitPosition = useRef(new THREE.Vector3())
  const beforeSitRotation = useRef(new THREE.Euler())

  useFrame(() => {
    if (!chairRef.current) return

    chairRef.current.getWorldPosition(chairPosition.current)

    const distance = camera.position.distanceTo(chairPosition.current)

    setShow(distance < 10 || hasSat.current)
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.code === 'KeyE' &&
        show &&
        !hasSat.current &&
        chairRef.current
      ) {
        beforeSitPosition.current.copy(camera.position)
        beforeSitRotation.current.copy(camera.rotation)

        gsap.to(camera.position, {
          x: chairPosition.current.x,
          y: chairPosition.current.y - 4,
          z: chairPosition.current.z,
          duration: 1.5,
          ease: 'power2.inOut',
          onComplete: () => {
            hasSat.current = true
            setIsSitting(true)
            setChairStep(0)
          }
        })

        gsap.to(camera.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.5,
          ease: 'power2.inOut'
        })
      }

      if (event.code === 'KeyG' && hasSat.current) {
        gsap.to(camera.position, {
          x: beforeSitPosition.current.x,
          y: beforeSitPosition.current.y,
          z: beforeSitPosition.current.z,
          duration: 1.5,
          ease: 'power2.inOut'
        })

        gsap.to(camera.rotation, {
          x: beforeSitRotation.current.x,
          y: beforeSitRotation.current.y,
          z: beforeSitRotation.current.z,
          duration: 1.5,
          ease: 'power2.inOut'
        })

        hasSat.current = false
        setIsSitting(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [show, camera, setIsSitting])

  if (!show) return null

  return (
        <>

    {/* <Message
    
      position={[
        chairPosition.current.x,
        chairPosition.current.y + 2,
        chairPosition.current.z
      ]}
      message={
        hasSat.current
          ? 'Press G to Stand Up'
          : 'Press E to Sit'
      }
    /> */}


    </>
  )
}

export default ChairSit