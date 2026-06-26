import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import HoldLeft from "../HoldLeft/HoldLeft"
import HoldRight from "../HoldRight/HoldRight"

const ClickObject = () => {
  const {
    selectedLeftHand,
    setSelectedLeftHand,
    selectedRightHand,
    setSelectedRightHand,

    isFillBeakerBoxOpen,
    setIsFillBeakerBoxOpen,

    setIsFillUpBeaker,
    setFillBeakerHand,

    isDragging,

    setIsStirMode,
    setIsLitmusMode,
    isLitmusMode,

    isFilterFolded,
    setIsFilterFolded,

    isFilterInFunnel,
    setIsFilterInFunnel
  } = useContext(InteractionContext)

  const {
    normalBeakerRef,
    conicalBeakerRef,
    roundBeakerRef,
    graduatedBeakerRef,

    spoonRef,
    redLitmusRef,
    blueLitmusRef,

    testube01Ref,
    testube02Ref,
    testube03Ref,

    filterPaperRef,
    filterFoldedPaperRef,

    funnelRef
  } = useContext(ModelContext)

  const { camera, gl, scene } = useThree()

  const [selectedObject, setSelectedObject] = useState(null)

  const foldedOriginalTransformRef = useRef(null)

  const selectableObjects = useMemo(
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
        name: "main-spoon",
        ref: spoonRef,
      },
      {
        name: "main-red-litmus",
        ref: redLitmusRef,
      },
      {
        name: "main-blue-litmus",
        ref: blueLitmusRef,
      },
      {
        name: "main-testube-01",
        ref: testube01Ref,
      },
      {
        name: "main-testube-02",
        ref: testube02Ref,
      },
      {
        name: "main-testube-03",
        ref: testube03Ref,
      },
      {
        name: "main-filter-paper",
        ref: filterPaperRef,
      },
      {
        name: "main-folded-paper",
        ref: filterFoldedPaperRef,
      },
      {
        name:'main-funnel',
        ref:funnelRef
      }
    ],
    [
      normalBeakerRef,
      conicalBeakerRef,
      roundBeakerRef,
      graduatedBeakerRef,
      spoonRef,
      redLitmusRef,
      blueLitmusRef,
      testube01Ref,
      testube02Ref,
      testube03Ref,
      filterPaperRef,
      filterFoldedPaperRef,
      funnelRef
    ]
  )

  const isSpoon = (name) => name === "main-spoon";

  const isFunnel = (name) => name === "main-funnel"

  const isLitmus = (name) => name?.toLowerCase().includes("litmus")

  const isFlatFilterPaper = (name) =>
    name?.toLowerCase().includes("filter-paper")

  const isFoldedFilterPaper = (name) =>
    name?.toLowerCase().includes("folded-paper")

  const isAnyFilterPaper = (name) =>
    isFlatFilterPaper(name) || isFoldedFilterPaper(name)

  const isClickedInsideObject = (clickedObject, mainObject) => {
    let current = clickedObject

    while (current) {
      if (current === mainObject) return true
      current = current.parent
    }

    return false
  }

  const copyTransform = (fromObject, toObject) => {
    if (!fromObject || !toObject) return

    toObject.position.copy(fromObject.position)
    toObject.rotation.copy(fromObject.rotation)
    toObject.scale.copy(fromObject.scale)
  }

  const applyTransform = (object, transform) => {
    if (!object || !transform) return

    if (transform.parent) {
      transform.parent.add(object)
    } else {
      scene.add(object)
    }

    object.position.copy(transform.position)
    object.rotation.copy(transform.rotation)
    object.scale.copy(transform.scale)
  }

  useEffect(() => {
    if (!filterFoldedPaperRef.current) return

    if (!foldedOriginalTransformRef.current) {
      foldedOriginalTransformRef.current = {
        parent: filterFoldedPaperRef.current.parent,
        position: filterFoldedPaperRef.current.position.clone(),
        rotation: filterFoldedPaperRef.current.rotation.clone(),
        scale: filterFoldedPaperRef.current.scale.clone(),
      }
    }
  }, [filterFoldedPaperRef])

  useEffect(() => {
    if (!filterPaperRef.current || !filterFoldedPaperRef.current) return

    if (isFilterFolded) {
      filterPaperRef.current.visible = false
      filterFoldedPaperRef.current.visible = true
    } else {
      filterPaperRef.current.visible = true
      filterFoldedPaperRef.current.visible = false
    }
  }, [isFilterFolded, filterPaperRef, filterFoldedPaperRef])

  const foldFilterPaper = (hand) => {
    const flatPaper = filterPaperRef.current
    const foldedPaper = filterFoldedPaperRef.current

    if (!flatPaper || !foldedPaper) return

    const handData = hand === "left" ? selectedLeftHand : selectedRightHand

    copyTransform(flatPaper, foldedPaper)

    flatPaper.visible = false
    foldedPaper.visible = true

    const newHandData = {
      hand,
      name: "main-folded-paper",
      ref: filterFoldedPaperRef,

      originalParent: handData?.originalParent,
      originalPosition: handData?.originalPosition,
      originalRotation: handData?.originalRotation,
    }

    if (hand === "left") {
      setSelectedLeftHand(newHandData)
    }

    if (hand === "right") {
      setSelectedRightHand(newHandData)
    }

    setIsFilterFolded(true)
    console.log("Filter paper folded")
  }

  const unfoldFilterPaper = (hand) => {
    const flatPaper = filterPaperRef.current
    const foldedPaper = filterFoldedPaperRef.current

    if (!flatPaper || !foldedPaper) return

    const handData = hand === "left" ? selectedLeftHand : selectedRightHand

    copyTransform(foldedPaper, flatPaper)

    foldedPaper.visible = false
    flatPaper.visible = true

    applyTransform(foldedPaper, foldedOriginalTransformRef.current)

    const newHandData = {
      hand,
      name: "main-filter-paper",
      ref: filterPaperRef,

      originalParent: handData?.originalParent,
      originalPosition: handData?.originalPosition,
      originalRotation: handData?.originalRotation,
    }

    if (hand === "left") {
      setSelectedLeftHand(newHandData)
    }

    if (hand === "right") {
      setSelectedRightHand(newHandData)
    }

    setIsFilterFolded(false)
    console.log("Filter paper unfolded")
  }

  const placeFilterInFunnel = (hand) => {
    const foldedPaper = filterFoldedPaperRef.current

    if (!foldedPaper) return

    console.log("Place folded filter paper in funnel")

    setIsFilterInFunnel(true)

    if (hand === "left") {
      setSelectedLeftHand(null)
    }

    if (hand === "right") {
      setSelectedRightHand(null)
    }

    setSelectedObject(null)
  }

  const keepBackOnTable = (hand) => {
    const handData = hand === "left" ? selectedLeftHand : selectedRightHand

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

    if (isFilterFolded && isFoldedFilterPaper(handData.name)) {
      const flatPaper = filterPaperRef.current
      const foldedPaper = filterFoldedPaperRef.current

      if (flatPaper && foldedPaper) {
        flatPaper.visible = false
        foldedPaper.visible = true
      }
    }

    if (!isFilterFolded && isFlatFilterPaper(handData.name)) {
      const flatPaper = filterPaperRef.current
      const foldedPaper = filterFoldedPaperRef.current

      if (flatPaper && foldedPaper) {
        flatPaper.visible = true
        foldedPaper.visible = false
        applyTransform(foldedPaper, foldedOriginalTransformRef.current)
      }
    }

    if (isLitmus(handData.name)) {
      setIsLitmusMode(false)
    }

    if (isSpoon(handData.name)) {
      setIsStirMode(false)
    }

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

      const clickableObjects = selectableObjects
        .map((item) => item.ref?.current)
        .filter(Boolean)

      const intersects = raycaster.intersectObjects(clickableObjects, true)

      if (intersects.length === 0) {
        setSelectedObject(null)
        return
      }

      const clickedObject = intersects[0].object

      const isLeftHoldingClickedObject =
        selectedLeftHand?.ref?.current &&
        isClickedInsideObject(clickedObject, selectedLeftHand.ref.current)

      const isRightHoldingClickedObject =
        selectedRightHand?.ref?.current &&
        isClickedInsideObject(clickedObject, selectedRightHand.ref.current)

      if (isLeftHoldingClickedObject) {
        const worldPosition = new THREE.Vector3()
        selectedLeftHand.ref.current.getWorldPosition(worldPosition)

        setSelectedObject({
          name: selectedLeftHand.name,
          ref: selectedLeftHand.ref,
          position: [worldPosition.x, worldPosition.y + 1, worldPosition.z],
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
          position: [worldPosition.x, worldPosition.y + 1, worldPosition.z],
          isHolding: true,
          hand: "right",
        })

        return
      }

      const selectedItem = selectableObjects.find((item) => {
        if (!item.ref?.current) return false
        return isClickedInsideObject(clickedObject, item.ref.current)
      })

      if (!selectedItem) {
        setSelectedObject(null)
        return
      }

      const worldPosition = new THREE.Vector3()
      selectedItem.ref.current.getWorldPosition(worldPosition)

      setSelectedObject({
        name: selectedItem.name,
        ref: selectedItem.ref,
        position: [worldPosition.x, worldPosition.y + 1, worldPosition.z],
        isHolding: false,
      })
    }

    gl.domElement.addEventListener("click", handleClick)

    return () => {
      gl.domElement.removeEventListener("click", handleClick)
    }
  }, [camera, gl, selectableObjects, selectedLeftHand, selectedRightHand])

  const removeFilterFromFunnel = () => {
  setIsFilterInFunnel(false)
  setSelectedObject(null)
}



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
                {isFilterFolded && isFoldedFilterPaper(selectedObject.name) ? (
                  <>
                    <button
                      onClick={() => {
                        unfoldFilterPaper(selectedObject.hand)
                        setSelectedObject(null)
                      }}
                    >
                      Unfold Paper
                    </button>

                    <button
                      onClick={() => {
                        placeFilterInFunnel(selectedObject.hand)
                      }}
                    >
                      Place in Funnel
                    </button>
                  </>
                ) : isFunnel(selectedObject.name) ? (
                  <>
                    <button
                      onClick={() => {
                        console.log("Funnel mode")
                        setSelectedObject(null)
                      }}
                    >
                      Funnel Mode
                    </button>

                    {isFilterInFunnel && (
                      <button
                        onClick={() => {
                          removeFilterFromFunnel()
                        }}
                      >
                        Remove Filter
                      </button>
                    )}

                    {!isFilterInFunnel && (
                      <button
                        onClick={() => {
                          keepBackOnTable(selectedObject.hand)
                        }}
                      >
                        Keep Back On Table
                      </button>
                    )}
                  </>
                ) : (
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
                        if (isSpoon(selectedObject.name)) {
                          setIsLitmusMode(false)
                          setIsStirMode(true)
                          setSelectedObject(null)
                          return
                        }

                        if (isLitmus(selectedObject.name)) {
                          setIsStirMode(false)

                          if (isLitmusMode) {
                            setIsLitmusMode(false)
                          } else {
                            setIsLitmusMode(true)
                          }

                          setSelectedObject(null)
                          return
                        }

                        if (isAnyFilterPaper(selectedObject.name)) {
                          if (isFilterFolded) {
                            unfoldFilterPaper(selectedObject.hand)
                          } else {
                            foldFilterPaper(selectedObject.hand)
                          }

                          setSelectedObject(null)
                          return
                        }

                        setIsLitmusMode(false)
                        setIsStirMode(false)

                        setSelectedObject(null)
                        setIsFillUpBeaker(false)
                        setFillBeakerHand(selectedObject.hand)
                        setIsFillBeakerBoxOpen(true)
                      }}
                    >
                      {isSpoon(selectedObject.name)
                        ? "Stir"
                        : isLitmus(selectedObject.name)
                        ? isLitmusMode
                          ? "Stop Test"
                          : "Test Liquid"
                        : isAnyFilterPaper(selectedObject.name)
                        ? isFilterFolded
                          ? "Unfold Paper"
                          : "Fold Paper"
                        : "Fill Beaker"}
                    </button>
                  </>
                )}
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
                        originalPosition:
                          selectedObject.ref.current.position.clone(),
                        originalRotation:
                          selectedObject.ref.current.rotation.clone(),
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
                        originalPosition:
                          selectedObject.ref.current.position.clone(),
                        originalRotation:
                          selectedObject.ref.current.rotation.clone(),
                      })

                      setSelectedObject(null)
                    }}
                  >
                    Right Hand
                  </button>
                )}

                {selectedLeftHand && selectedRightHand && (
                  <p style={{ margin: 0 }}>Both hands are full</p>
                )}
              </>
            )}
          </div>
        </Html>
      )}

      {selectedLeftHand && !isDragging && (
        <HoldLeft modeldata={selectedLeftHand} />
      )}

      {selectedRightHand && <HoldRight modeldata={selectedRightHand} />}
    </>
  )
}

export default ClickObject