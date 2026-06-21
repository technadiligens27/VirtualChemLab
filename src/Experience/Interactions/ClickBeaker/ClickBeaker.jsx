import { useContext, useEffect, useMemo, useState } from "react"
import { useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import HoldLeft from "../HoldLeft/HoldLeft"
import HoldRight from "../HoldRight/HoldRight"
import FillUpBeaker from "../FillUpBeaker/FillUpBeaker"

const ClickObject = () => {
  const {
    selectedLeftHand,
    setSelectedLeftHand,
    selectedRightHand,
    setSelectedRightHand,
    isFillBeakerBoxOpen,setIsFillBeakerBoxOpen,
    isFillUpBeaker,setIsFillUpBeaker,
    fillBeakerHand,setFillBeakerHand,
    isDragging,setIsDragging,
    selectedBeakerBoxHand,setSelectedBeakerBoxHand

  } = useContext(InteractionContext)

  const {
    normalBeakerRef,
    conicalBeakerRef,
    roundBeakerRef,
    graduatedBeakerRef,
    spoonRef
  } = useContext(ModelContext)

  const { camera, gl, scene } = useThree()

  const [selectedObject, setSelectedObject] = useState(null)

  const beakers = useMemo(
    () => [
      {
        name: "main-normal-beaker",
        ref: normalBeakerRef,
      },
      {
        name: "main-Conical-Flask",
        ref: conicalBeakerRef,
      },
      {
        name: "main-Round-bottom-flask",
        ref: roundBeakerRef,
      },
      {
        name: "main-graduated-cylinder",
        ref: graduatedBeakerRef,
      },
      {
        name:"main-spoon",
        ref:spoonRef
      }
    ],
    [
      normalBeakerRef,
      conicalBeakerRef,
      roundBeakerRef,
      graduatedBeakerRef,
    ]
  )

  const isClickedInsideObject = (clickedObject, mainObject) => {
    let current = clickedObject

    while (current) {
      if (current === mainObject) return true
      current = current.parent
    }

    return false
  }

    const keepBackOnTable = (hand) => {
      const handData =
        hand === "left" ? selectedLeftHand : selectedRightHand

      if (!handData?.ref?.current) return

      const object = handData.ref.current

      if (handData.originalParent) {
        handData.originalParent.add(object)
      } else {
        scene.add(object)
      }

      object.position.copy(handData.originalPosition)
      object.rotation.copy(handData.originalRotation)
      object.scale.set(1, 1, 1)
      object.visible = true

      if (hand === "left") {
        setSelectedLeftHand(null)
      }

      if (hand === "right") {
        setSelectedRightHand(null)
      }

      setSelectedObject(null)
    }

  useEffect(() => {
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)

      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length === 0) return

      const clickedObject = intersects[0].object

      const isLeftHoldingClickedObject =
        selectedLeftHand?.ref?.current &&
        isClickedInsideObject(
          clickedObject,
          selectedLeftHand.ref.current
        )

      const isRightHoldingClickedObject =
        selectedRightHand?.ref?.current &&
        isClickedInsideObject(
          clickedObject,
          selectedRightHand.ref.current
        )

      if (isLeftHoldingClickedObject) {
        const worldPosition = new THREE.Vector3()
        selectedLeftHand.ref.current.getWorldPosition(worldPosition)

        setSelectedObject({
          name: selectedLeftHand.name,
          ref: selectedLeftHand.ref,
          position: [
            worldPosition.x,
            worldPosition.y + 1,
            worldPosition.z,
          ],
          isHolding: true,
          hand: "left",
        })

        return
      }

      if (isRightHoldingClickedObject) {
        const worldPosition = new THREE.Vector3()
        selectedRightHand.ref.current.getWorldPosition(worldPosition)

        setSelectedObject({
          name: selectedRightHand.name,
          ref: selectedRightHand.ref,
          position: [
            worldPosition.x,
            worldPosition.y + 1,
            worldPosition.z,
          ],
          isHolding: true,
          hand: "right",
        })

        return
      }

      const selectedBeaker = beakers.find((beaker) => {
        if (!beaker.ref?.current) return false

        return isClickedInsideObject(
          clickedObject,
          beaker.ref.current
        )
      })

      if (!selectedBeaker) {
        setSelectedObject(null)
        return
      }

      const worldPosition = new THREE.Vector3()
      selectedBeaker.ref.current.getWorldPosition(worldPosition)

      setSelectedObject({
        name: selectedBeaker.name,
        ref: selectedBeaker.ref,
        position: [
          worldPosition.x,
          worldPosition.y + 1,
          worldPosition.z,
        ],
        isHolding: false,
      })
    }

    gl.domElement.addEventListener("click", handleClick)

    return () => {
      gl.domElement.removeEventListener("click", handleClick)
    }
  }, [
    camera,
    gl,
    scene,
    beakers,
    selectedLeftHand,
    selectedRightHand,
    setSelectedLeftHand,
    setSelectedRightHand,
    isFillBeakerBoxOpen,
    setIsFillBeakerBoxOpen,
  ])

  return (
    <>
      {selectedObject && !isFillBeakerBoxOpen && (
        <Html position={selectedObject.position} center>
          <div
            style={{
              background: "white",
              padding: "10px",
              borderRadius: "8px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
              {selectedObject.isHolding ? (
                <>
                  <button
                    onClick={() => {
                      keepBackOnTable(selectedObject.hand)
                    }}
                  >
                    Keep Back On Table
                  </button>

                  <button
                    onClick={() => {
                      setSelectedObject(null)
                      setIsFillUpBeaker(false)
                      setFillBeakerHand(selectedObject.hand)
                      setIsFillBeakerBoxOpen(true)
                    }}
                  >
                    Fill Beaker
                  </button>
                </>
              ) : (
              <>
                {!selectedLeftHand && (
                  <button
                    onClick={() => {
                      setSelectedLeftHand({
                        hand: "left",
                        name: selectedObject.name,
                        ref: selectedObject.ref,
                        originalParent: selectedObject.ref.current.parent,
                        originalPosition: selectedObject.ref.current.position.clone(),
                        originalRotation: selectedObject.ref.current.rotation.clone(),
                      })

                      setSelectedObject(null)
                    }}
                  >
                    Left Hand
                  </button>
                )}

                {!selectedRightHand && (
                  <button
                    onClick={() => {
                      setSelectedRightHand({
                        hand: "right",
                        name: selectedObject.name,
                        ref: selectedObject.ref,
                        originalParent: selectedObject.ref.current.parent,
                        originalPosition: selectedObject.ref.current.position.clone(),
                        originalRotation: selectedObject.ref.current.rotation.clone(),
                      })

                      setSelectedObject(null)
                    }}
                  >
                    Right Hand
                  </button>
                )}

                {selectedLeftHand && selectedRightHand && (
                  <p style={{ margin: 0 }}>
                    Both hands are full
                  </p>
                )}
              </>
            )}
          </div>
        </Html>
      )}

      {selectedLeftHand && !isDragging && (
        <HoldLeft modeldata={selectedLeftHand} />
      )}

      {selectedRightHand && (
        <HoldRight modeldata={selectedRightHand} />
      )}


    </>
  )
}

export default ClickObject