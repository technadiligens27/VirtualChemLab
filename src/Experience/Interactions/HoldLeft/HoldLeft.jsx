import { useContext, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import PouringLiquid from "../PouringLiquid/PouringLiquid"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import FillUpBeaker from "../FillUpBeaker/FillUpBeaker"
import PouringMode from "../PouringMode/PouringMode"

const HoldLeft = ({ modeldata }) => {

  const {isFillUpBeaker,selectedLeftHand,
    fillBeakerHand,setIsPouring,
    selectedRightHand} = useContext(InteractionContext)

  const { camera, gl, scene } = useThree()


  const defaultOffsetRef = useRef(new THREE.Vector3(-4, -0.5, -5))
  const rotationZRef = useRef(0)

  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseRef = useRef(new THREE.Vector2())
  const isDraggingRef = useRef(false)

  useEffect(() => {
    const canvas = gl.domElement

    const handleMouseDown = (e) => {
      if (!modeldata?.ref?.current) return

      const rect = canvas.getBoundingClientRect()

      mouseRef.current.x =
        ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y =
        -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycasterRef.current.setFromCamera(mouseRef.current, camera)

      const hits = raycasterRef.current.intersectObject(
        modeldata.ref.current,
        true
      )

      if (hits.length === 0) return

      isDraggingRef.current = true
    }

    const handleWheel = (e) => {
      // if (!isDraggingRef.current) return

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

    // const handleMouseUp = () => {
    //   if (!isDraggingRef.current) return
    //   isDraggingRef.current = false
    //   setIsPouring(false)
    // }

    canvas.addEventListener("mousedown", handleMouseDown)
    // window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      // window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("wheel", handleWheel)
    }
  }, [camera, gl, modeldata])

  useEffect(() => {
    if (!modeldata?.ref?.current) return

    if (!scene.children.includes(camera)) {
      scene.add(camera)
    }

    const object = modeldata.ref.current

    camera.add(object)

    object.position.copy(defaultOffsetRef.current)
    object.rotation.set(0, 0, 0)
    object.scale.set(1, 1, 1)
    object.visible = true
    object.frustumCulled = false
  }, [camera, scene, modeldata])

  useFrame(() => {
    if (!modeldata?.ref?.current) return

    const object = modeldata.ref.current


  })

  return (
    <>
      {isFillUpBeaker &&
        fillBeakerHand === "left" &&
         (
          <FillUpBeaker
            beakerRef={selectedLeftHand.ref}
            hand="left"
          />
        )}

      {selectedLeftHand &&selectedRightHand && (<PouringMode hand={'left'}/>)}

    </>
  )
}

export default HoldLeft