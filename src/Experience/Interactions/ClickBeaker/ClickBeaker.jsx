import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import './ClickBeaker.css'
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import HoldLeft from "../HoldLeft/HoldLeft"
import HoldRight from "../HoldRight/HoldRight"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

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
    setIsFilterInFunnel,

    isFunnelMode,
    setIsFunnelMode,
    clickedModel,setClickedModel,
    isObjectInfo,setIsObjectInfo
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

    funnelRef,
  } = useContext(ModelContext)

  const { lessonStep, setShowErrorMsgNo, isMainGuideline,selectedLesson,isTutorialMode} =
    useContext(MainGuidelineContext)

  const { camera, gl, scene } = useThree()

  const [selectedObject, setSelectedObject] = useState(null)

  const flatOriginalTransformRef = useRef(null)
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
        name: "main-funnel",
        ref: funnelRef,
      },
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
      funnelRef,
    ]
  )

  const isSpoon = (name) => name === "main-spoon"

  const isFunnel = (name) => name === "main-funnel"

  const isLitmus = (name) => name?.toLowerCase().includes("litmus")

  const isFlatFilterPaper = (name) =>
    name?.toLowerCase().includes("filter-paper")

  const isFoldedFilterPaper = (name) =>
    name?.toLowerCase().includes("folded-paper")

  const isAnyFilterPaper = (name) =>
    isFlatFilterPaper(name) || isFoldedFilterPaper(name)

  const getHandData = (hand) => {
    return hand === "left" ? selectedLeftHand : selectedRightHand
  }

  const setHandData = (hand, data) => {
    if (hand === "left") {
      setSelectedLeftHand(data)
    }

    if (hand === "right") {
      setSelectedRightHand(data)
    }
  }

  const clearHandData = (hand) => {
    if (hand === "left") {
      setSelectedLeftHand(null)
    }

    if (hand === "right") {
      setSelectedRightHand(null)
    }
  }

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

  const saveOriginalFilterTransforms = () => {
    if (filterPaperRef.current && !flatOriginalTransformRef.current) {
      flatOriginalTransformRef.current = {
        parent: filterPaperRef.current.parent,
        position: filterPaperRef.current.position.clone(),
        rotation: filterPaperRef.current.rotation.clone(),
        scale: filterPaperRef.current.scale.clone(),
      }
    }

    if (
      filterFoldedPaperRef.current &&
      !foldedOriginalTransformRef.current
    ) {
      foldedOriginalTransformRef.current = {
        parent: filterFoldedPaperRef.current.parent,
        position: filterFoldedPaperRef.current.position.clone(),
        rotation: filterFoldedPaperRef.current.rotation.clone(),
        scale: filterFoldedPaperRef.current.scale.clone(),
      }
    }
  }

  const updateFilterPaperVisibility = () => {
    if (!filterPaperRef.current || !filterFoldedPaperRef.current) return

    const flatPaper = filterPaperRef.current
    const foldedPaper = filterFoldedPaperRef.current

    if (isFilterInFunnel) {
      flatPaper.visible = false
      foldedPaper.visible = true
      return
    }

    if (isFilterFolded) {
      flatPaper.visible = false
      foldedPaper.visible = true
    } else {
      flatPaper.visible = true
      foldedPaper.visible = false
    }
  }

  useEffect(() => {
    saveOriginalFilterTransforms()
  }, [filterPaperRef, filterFoldedPaperRef])

  useEffect(() => {
    updateFilterPaperVisibility()
  }, [
    isFilterFolded,
    isFilterInFunnel,
    filterPaperRef,
    filterFoldedPaperRef,
  ])

  const foldFilterPaper = (hand) => {
    const flatPaper = filterPaperRef.current
    const foldedPaper = filterFoldedPaperRef.current

    if (!flatPaper || !foldedPaper) return

    const handData = getHandData(hand)

    copyTransform(flatPaper, foldedPaper)

    flatPaper.visible = false
    foldedPaper.visible = true

    const originalTransform = flatOriginalTransformRef.current

    const newHandData = {
      hand,
      name: "main-folded-paper",
      ref: filterFoldedPaperRef,

      originalParent: originalTransform?.parent || handData?.originalParent,
      originalPosition:
        originalTransform?.position?.clone() ||
        handData?.originalPosition?.clone(),
      originalRotation:
        originalTransform?.rotation?.clone() ||
        handData?.originalRotation?.clone(),
    }

    setHandData(hand, newHandData)

    setIsFilterFolded(true)
    setSelectedObject(null)
  }

  const unfoldFilterPaper = (hand) => {
    const flatPaper = filterPaperRef.current
    const foldedPaper = filterFoldedPaperRef.current

    if (!flatPaper || !foldedPaper) return

    const originalTransform = flatOriginalTransformRef.current

    copyTransform(foldedPaper, flatPaper)

    foldedPaper.visible = false
    flatPaper.visible = true

    applyTransform(foldedPaper, foldedOriginalTransformRef.current)

    const newHandData = {
      hand,
      name: "main-filter-paper",
      ref: filterPaperRef,

      originalParent: originalTransform?.parent || flatPaper.parent,
      originalPosition:
        originalTransform?.position?.clone() || flatPaper.position.clone(),
      originalRotation:
        originalTransform?.rotation?.clone() || flatPaper.rotation.clone(),
    }

    setHandData(hand, newHandData)

    setIsFilterFolded(false)
    setSelectedObject(null)
  }

  const placeFilterInFunnel = (hand) => {
    const foldedPaper = filterFoldedPaperRef.current
    const flatPaper = filterPaperRef.current

    if (!foldedPaper) return

    if (flatPaper) {
      flatPaper.visible = false
    }

    foldedPaper.visible = true
    foldedPaper.scale.set(1, 1, 1)

    setIsFilterInFunnel(true)
    setIsFilterFolded(true)

    clearHandData(hand)

    setSelectedObject(null)
  }

  const removeFilterFromFunnel = (funnelHand) => {
    const foldedPaper = filterFoldedPaperRef.current
    const flatPaper = filterPaperRef.current

    if (!foldedPaper) return

    const targetHand = funnelHand === "right" ? "left" : "right"

    const isTargetHandBusy =
      targetHand === "left" ? selectedLeftHand : selectedRightHand

    if (isTargetHandBusy) {
      console.log("Opposite hand is already full")
      return
    }

    const originalTransform = flatOriginalTransformRef.current

    if (flatPaper) {
      flatPaper.visible = false
    }

    foldedPaper.visible = true
    foldedPaper.scale.set(1, 1, 1)

    const newHandData = {
      hand: targetHand,
      name: "main-folded-paper",
      ref: filterFoldedPaperRef,

      originalParent: originalTransform?.parent || foldedPaper.parent,
      originalPosition:
        originalTransform?.position?.clone() || foldedPaper.position.clone(),
      originalRotation:
        originalTransform?.rotation?.clone() || foldedPaper.rotation.clone(),
    }

    setIsFilterInFunnel(false)
    setIsFilterFolded(true)

    setHandData(targetHand, newHandData)

    setSelectedObject(null)
  }

  const handleFilterVisibilityAfterKeepBack = (handData) => {
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
  }

  const handleModeAfterKeepBack = (handData) => {
    if (isLitmus(handData.name)) {
      setIsLitmusMode(false)
    }

    if (isSpoon(handData.name)) {
      setIsStirMode(false)
    }
  }

  const keepBackOnTable = (hand) => {
    if (hand === "left" && isMainGuideline) {
      setShowErrorMsgNo(4)
      setSelectedObject(null)
      return
    }

    if (hand === "right" && isMainGuideline) {
      setShowErrorMsgNo(4)
      setSelectedObject(null)
      return
    }

    const handData = getHandData(hand)

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

    handleFilterVisibilityAfterKeepBack(handData)
    handleModeAfterKeepBack(handData)

    clearHandData(hand)

    setSelectedObject(null)
  }

  const getWorldPopupPosition = (objectRef) => {
    const worldPosition = new THREE.Vector3()
    objectRef.current.getWorldPosition(worldPosition)

    return [worldPosition.x, worldPosition.y + 1, worldPosition.z]
  }

  const selectHeldObject = (handData, hand) => {
    setSelectedObject({
      name: handData.name,
      ref: handData.ref,
      position: getWorldPopupPosition(handData.ref),
      isHolding: true,
      hand,
    })
  }

  const selectTableObject = (selectedItem) => {
    setSelectedObject({
      name: selectedItem.name,
      ref: selectedItem.ref,
      position: getWorldPopupPosition(selectedItem.ref),
      isHolding: false,
    })
  }

  const handleHoldingObjectClick = (clickedObject) => {
    const isLeftHoldingClickedObject =
      selectedLeftHand?.ref?.current &&
      isClickedInsideObject(clickedObject, selectedLeftHand.ref.current)

    const isRightHoldingClickedObject =
      selectedRightHand?.ref?.current &&
      isClickedInsideObject(clickedObject, selectedRightHand.ref.current)

    if (isLeftHoldingClickedObject) {
      console.log("Clicked object:", selectedLeftHand.name)

      selectHeldObject(selectedLeftHand, "left")
      return true
    }

    if (isRightHoldingClickedObject) {
      console.log("Clicked object:", selectedRightHand.name)

      selectHeldObject(selectedRightHand, "right")
      return true
    }

    return false
  }

  const handleTableObjectClick = (clickedObject) => {
    const selectedItem = selectableObjects.find((item) => {
      if (!item.ref?.current) return false
      return isClickedInsideObject(clickedObject, item.ref.current)
    })

    if (!selectedItem) {
      setSelectedObject(null)
      return
    }

    setClickedModel(selectedItem.name)

    selectTableObject(selectedItem)
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

      const clickedHoldingObject = handleHoldingObjectClick(clickedObject)

      if (clickedHoldingObject) return

      handleTableObjectClick(clickedObject)
    }

    gl.domElement.addEventListener("click", handleClick)

    return () => {
      gl.domElement.removeEventListener("click", handleClick)
    }
  }, [
    camera,
    gl,
    selectableObjects,
    selectedLeftHand,
    selectedRightHand,
  ])

  const validateRightHandPick = (objectName) => {
    if (!isMainGuideline) return true

    if(lessonStep==6 && selectedLesson ===6){
      if(objectName !== 'main-Conical-Flask'){
        setShowErrorMsgNo(6)
        return false
      }
    }

    if(lessonStep==6 && selectedLesson ===3){
      if(objectName !== 'main-red-litmus'){
        setShowErrorMsgNo(6)
        return false
      }
    }

    if (lessonStep === 3) {
      setShowErrorMsgNo(1)
      return false
    }

    return true
  }

  const validateLeftHandPick = (objectName) => {
    if (!isMainGuideline) return true

    if (lessonStep === 3 && objectName !== "main-normal-beaker") {
      setShowErrorMsgNo(1)
      return false
    }

    return true
  }

  const createHandObjectData = (hand) => {
    return {
      hand,
      name: selectedObject.name,
      ref: selectedObject.ref,
      originalParent: selectedObject.ref.current.parent,
      originalPosition: selectedObject.ref.current.position.clone(),
      originalRotation: selectedObject.ref.current.rotation.clone(),
    }
  }

  const pickObjectWithLeftHand = () => {
    if (!validateLeftHandPick(selectedObject.name)) return

    setSelectedLeftHand(createHandObjectData("left"))
    setSelectedObject(null)
  }

  const pickObjectWithRightHand = () => {
    if (!validateRightHandPick(selectedObject.name)) return

    setSelectedRightHand(createHandObjectData("right"))
    setSelectedObject(null)
  }

  const toggleFunnelMode = () => {
    setIsFunnelMode((prev) => !prev)
    setSelectedObject(null)
  }

  const startStirMode = () => {
    setIsLitmusMode(false)
    setIsStirMode(true)
    setSelectedObject(null)
  }

  const toggleLitmusMode = () => {
      setIsStirMode(false)

      const otherHandData = getOtherHandData(selectedObject.hand)

      if (!isLitmusMode && !otherHandData) {
        setSelectedObject(null)
        return
      }

      if (isLitmusMode) {
        if (lessonStep === 8) {
          setShowErrorMsgNo(4)
          return
        }

        setIsLitmusMode(false)
      } else {
        setIsLitmusMode(true)
      }

      setSelectedObject(null)
    }

  const handleFilterPaperAction = () => {
    if (isFilterFolded) {
      unfoldFilterPaper(selectedObject.hand)
    } else {
      foldFilterPaper(selectedObject.hand)
    }
  }

  useEffect(()=>{
    console.log('lessonStep:',lessonStep)
  },[lessonStep])


  const openFillBeakerBox = () => {
    if (!selectedObject) return

    // Only show wrong when lesson step is 8
    // and the clicked object is in the left hand
    if (
      isMainGuideline &&
      lessonStep === 8 &&
      selectedObject.hand === "left"
    ) {
      console.log("Wrong")
      setShowErrorMsgNo(4)
      setSelectedObject(null)
      return
    }

    if (isMainGuideline) {
      if (lessonStep !== 4 && lessonStep !== 7 && lessonStep !== 8) {
        setShowErrorMsgNo(4)
        setSelectedObject(null)
        return
      }

      if (
        selectedLesson === 3 &&
        lessonStep !== 4
      ) {
        setShowErrorMsgNo(4)
        setSelectedObject(null)
        return
      }
    }

    const selectedHand = selectedObject.hand

    setIsLitmusMode(false)
    setIsStirMode(false)
    setIsFillUpBeaker(false)

    setFillBeakerHand(selectedHand)
    setIsFillBeakerBoxOpen(true)
    setSelectedObject(null)
  }

  const handleMainHoldingAction = () => {
    if (isSpoon(selectedObject.name)) {
      startStirMode()
      return
    }

    if (isLitmus(selectedObject.name)) {
      toggleLitmusMode()
      return
    }

    if (isAnyFilterPaper(selectedObject.name)) {
      handleFilterPaperAction()
      return
    }

    openFillBeakerBox()
  }

  const getMainHoldingButtonText = () => {
    if (isSpoon(selectedObject.name)) {
      return "Stir"
    }

    if (isLitmus(selectedObject.name)) {
      return isLitmusMode ? "Stop Test" : "Test Liquid"
    }

    if (isAnyFilterPaper(selectedObject.name)) {
      return isFilterFolded ? "Unfold Paper" : "Fold Paper"
    }

    return "Fill Beaker"
  }


  const getOtherHandData = (hand) => {
  return hand === "left" ? selectedRightHand : selectedLeftHand
}

const canShowMainHoldingButton = () => {
  if (!selectedObject?.isHolding) return false

  if (isLitmus(selectedObject.name)) {
    const otherHandData = getOtherHandData(selectedObject.hand)

    // Show Stop Test if test already started
    if (isLitmusMode) return true

    // Show Test Liquid only if other hand has something
    return !!otherHandData
  }

  return true
}


  const renderHandSelectionButtons = () => {
    if ( isTutorialMode && lessonStep !== 3 && lessonStep !== 6) {
      return <p>Can't pick now</p>
    }
    if (isObjectInfo) {
      return null
    }

    if (selectedLeftHand && selectedRightHand) {
      return <p>Both hands are full</p>
    }

    return (
      <>
        {!selectedLeftHand && (
          <button onClick={pickObjectWithLeftHand}>
            Left Hand
          </button>
        )}

        {!selectedRightHand && (
          <button onClick={pickObjectWithRightHand}>
            Right Hand
          </button>
        )}
      </>
    )
  }

  return (
    <>
      {selectedObject && !isFillBeakerBoxOpen && (
        <Html position={selectedObject.position} center>
          <div className="click-btn-container">

            
            {selectedObject.isHolding ? (
              <>
                {isFilterFolded &&
                isFoldedFilterPaper(selectedObject.name) ? (
                  <>
                    <button
                      onClick={() => {
                        unfoldFilterPaper(selectedObject.hand)
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
                    <button onClick={toggleFunnelMode}>
                      {isFunnelMode ? "Exit Funnel Mode" : "Funnel Mode"}
                    </button>

                    {isFilterInFunnel && (
                      <button
                        onClick={() => {
                          removeFilterFromFunnel(selectedObject.hand)
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

                    {canShowMainHoldingButton() && (
                      <button onClick={handleMainHoldingAction}>
                        {getMainHoldingButtonText()}
                      </button>
                    )}
                  </>
                )}
              </>
            ) : (
            <>
              {renderHandSelectionButtons()}
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