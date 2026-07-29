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
import ClickHitbox from "../ClickHitbox/ClickHitbox"

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

    isStirMode,
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
    isObjectInfo,setIsObjectInfo,
    spoonHasSalt, setSpoonHasSalt,
    setIsAddSalt,
    isDropperPlaced,setIsDropperPlaced,
    isPlacePolysterene,setIsPlacePolysterene,
    setIsPottasiumCarobnateInSpoon,setIsPourIntoTestube,
    isPourIntoTestube,setIsWeighTestube,isWeighTestube,
    isClampInCenter,setIsClampInCenter,setIsPlaceThermometer,
    isPlaceThermometer,setIsPolystereneStirMode,isPolystereneStirMode

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
    saltContainerRef,

    funnelRef,mainDropperRef,
    mainPolystereneRef,
    pottasiumCarbonateContainerRef,
    digitalBalanceRef,
    mainBuiretteRef,
    buretteClampRef,
    mainThermometerRef
    
  } = useContext(ModelContext)

  const { lessonStep, setShowErrorMsgNo, isMainGuideline,selectedLesson,isTutorialMode,setLessonStep} =
    useContext(MainGuidelineContext)

 const {isBalancePlaced,setIsBalancePlaced,isBuiretteClamped,setIsBuiretteClamped,
  isBeakerNearClamp,setIsBeakerNearClamp
 } = useContext(InteractionContext)  

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
      {
        name: "salt-container",
        ref:saltContainerRef
      },

      {
        name: "main-dropper",
        ref:mainDropperRef
      },

      {
        name:'mainPolysterene',
       ref:mainPolystereneRef
      },
      {
        name:'pottasium-carbonate-container',
        ref:pottasiumCarbonateContainerRef
      },
      {
        name:'mainMassBalance',
        ref:digitalBalanceRef
      },
      {
        name:'main-buirette',
        ref:mainBuiretteRef
      },
      {
        name:'mainBuretteClamp',
        ref:buretteClampRef
      },
      {
        name:'mainThermometer',
        ref: mainThermometerRef
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
      funnelRef,
      saltContainerRef,
      mainDropperRef,
      mainPolystereneRef,
      pottasiumCarbonateContainerRef,
      digitalBalanceRef,
      mainBuiretteRef,
      buretteClampRef
    ]
  )

  const isSpoon = (name) => name === "main-spoon"

  const isFunnel = (name) => name === "main-funnel"

  const isLitmus = (name) => name?.toLowerCase().includes("litmus")

  const isDropper = (name) =>name === "main-dropper"

  const isTestTube = (name) => name === "main-testube-01" || name === "main-testube-02" || name === "main-testube-03"

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

  const handlePlaceBeaker = () => {
  setIsBeakerNearClamp(true);
  setSelectedObject(null);
}

  const handlePlaceBeakerRemove = ()=>{
    setIsBeakerNearClamp(false)
    if(lessonStep===28 && selectedLesson===8){
      setLessonStep(29);
      moveObjectToLeftHand()
    }
  }

  const moveObjectToLeftHand = () => {
  if (!selectedObject?.isHolding) return
  if (selectedLeftHand) {
    console.log("Left hand is already full")
    return
  }

  const currentHandData =
    selectedObject.hand === "right"
      ? selectedRightHand
      : selectedLeftHand

  if (!currentHandData) return

  setSelectedLeftHand({
    ...currentHandData,
    hand: "left",
  })

  if (selectedObject.hand === "right") {
    setSelectedRightHand(null)
  }

  setSelectedObject(null)

  console.log(
    currentHandData.name,
    "moved to left hand"
  )
}
  const handlePlaceBuretteInCentre = () => {
    console.log("Place burette in centre")
    setIsClampInCenter(true)
    setSelectedObject(null)

    // Add placement state here
    // setIsBuretteInCentre(true)
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
    const handData = getHandData(hand)

    if (!handData?.ref?.current) return

    if ( handData.name === "main-spoon" && selectedLesson === 8 && lessonStep === 15) {
      setLessonStep(16)
    }

    if (  hand === "left" &&  selectedLesson === 8 && lessonStep === 7 ) {
      setLessonStep(8)
    }

    if ( handData.name === "main-spoon" && isPourIntoTestube ) {
      setIsPourIntoTestube(false)
    }

    if ( handData.name === "main-testube-01" && isWeighTestube ) {
      if(lessonStep === 17 && selectedLesson ===8){
        setLessonStep(18)
      }
    }

    const object = handData.ref.current

    handData.originalParent.add(object)

    object.position.copy(handData.originalPosition)
    object.rotation.copy(handData.originalRotation)
    object.scale.set(1, 1, 1)

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
      console.log(clickedObject)

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

      
    if(lessonStep===6 && selectedLesson===7){
      if(objectName !=='main-dropper'){
        setShowErrorMsgNo(12)
        return false
      }
        
    }

    if(lessonStep==6 && selectedLesson ===6){
      if(objectName !== 'main-Conical-Flask'){
        setShowErrorMsgNo(12)
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
    
    if(selectedLesson===8 && lessonStep===8){
      if (objectName !== "main-testube-01") {
        setShowErrorMsgNo(1)
        return false
      }
    }

    if(selectedLesson===8 && lessonStep ==3){
      if (objectName !== "main-normal-beaker") {
        setShowErrorMsgNo(1)
        return false
      }
    }

    if (selectedLesson === 7 && lessonStep === 3) {
      if (objectName !== "main-testube-01") {
        setShowErrorMsgNo(1)
        return false
      }

      return true
    }


    if (lessonStep === 3) {
      if (objectName !== "main-normal-beaker") {
        setShowErrorMsgNo(1)
        return false
      }
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
  if (!validateRightHandPick(selectedObject?.name)) return

  const data = createHandObjectData("right")

  console.log("Going to right hand:", data.name)

  setSelectedRightHand(data)
  setSelectedObject(null)
}

  const toggleFunnelMode = () => {
    setIsFunnelMode((prev) => !prev)
    setSelectedObject(null)
  }

  const toggleStirMode = () => {
  if ( isTutorialMode && selectedLesson === 1 && lessonStep === 7) {
    setShowErrorMsgNo(4)
    setSelectedObject(null)
    return
  }

  setIsLitmusMode(false)
  setIsStirMode((prev) => !prev)
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

  // useEffect(()=>{
  //   console.log('lessonStep:',lessonStep)
  // },[lessonStep])


  const openFillBeakerBox = () => {
      if (!selectedObject) return

      if (isTutorialMode) {
        if (
          selectedLesson === 7 &&
          lessonStep !== 11 &&
          lessonStep !== 4
        ) {
          setShowErrorMsgNo(4)
          setSelectedObject(null)
          return
        }
      }

      if (
        isMainGuideline &&
        lessonStep === 8 &&
        selectedObject.hand === "left" &&
        selectedLesson !== 8
      ) {
        setShowErrorMsgNo(4)
        setSelectedObject(null)
        return
      }

      if (isMainGuideline) {
        const isAllowedStep =
          lessonStep === 4 ||
          lessonStep === 7 ||
          lessonStep === 8 ||
          (selectedLesson === 7 &&
            (lessonStep === 4 || lessonStep === 11)) ||
          (selectedLesson === 8 &&
            lessonStep === 19)

        if (!isAllowedStep) {
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

   const togglePourIntoTestTube = () => {
      setIsPourIntoTestube((previousValue) => {
        if (previousValue) {
          if(selectedLesson===8 && lessonStep === 13)
          setLessonStep(14)
        }

        return !previousValue
      })

      setSelectedObject(null)
    }

    const pourIntoTestTube = () => {
      setIsPourIntoTestube(true)
      setSelectedObject(null)
    }


    const handleClampBurette = () => {
        setIsBuiretteClamped((previousValue) => !previousValue)

        if (selectedObject?.hand === "left") {
          setSelectedLeftHand(null)
        }

        if (selectedObject?.hand === "right") {
          setSelectedRightHand(null)
        }

        setSelectedObject(null)

        if (
          selectedLesson === 8 &&
          lessonStep === 23
        ) {
          setLessonStep(24)
        }
      }

    const handleWeighTestTube = () => {
        if (
          isBalancePlaced &&
          selectedLesson === 8 &&
          (lessonStep === 16 || lessonStep === 17) &&
          isTestTube(selectedObject?.name)
        ) {
          setIsWeighTestube(true)

          if (lessonStep === 16) {
            setLessonStep(17)
          }

          setSelectedObject(null)
          return
        }

        setShowErrorMsgNo(4)
        setSelectedObject(null)
      }

  const handleMainHoldingAction = () => {
      // All held test tubes in Lesson 8 use weighing
      if (selectedLesson === 8 && isTestTube(selectedObject?.name)) {
        handleWeighTestTube()
        return
      }

      if (isSpoon(selectedObject.name)) {
          togglePourIntoTestTube()
          return
        

        toggleStirMode()
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
  // In Lesson 8, test tubes are weighed,
  // not filled using Add Liquid
  if ( selectedLesson === 8 && isTestTube(selectedObject?.name)) {
    return "Weigh Test Tube"
  }

  if (isSpoon(selectedObject.name)) {
    
      return isPourIntoTestube ? "Disable Pour Mode" : "Pour Into Test Tube"
      return isStirMode ? "Exit Stir Mode" : "Stir"
  }

  if (isLitmus(selectedObject.name)) {
    return isLitmusMode ? "Stop Test" : "Test Liquid"
  }

  if (isAnyFilterPaper(selectedObject.name)) {
    return isFilterFolded ? "Unfold Paper" : "Fold Paper"
  }

  return "Add Liquid"
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
  if ( isTutorialMode && selectedLesson === 1 && lessonStep === 6 && selectedObject?.name !== "main-spoon") {
    return <p>Can't pick now</p>
  }

  if (isTutorialMode && lessonStep !== 3 && lessonStep !== 6 && selectedLesson !==8) {
    return <p>Can't pick now</p>
  }

  if (isObjectInfo) return null

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

const addSaltToSpoon = () => {
  if (
    selectedLeftHand?.name !== "main-spoon" && selectedRightHand?.name !== "main-spoon"){
      console.log("selectedLeftHand:", selectedLeftHand)
      console.log("selectedRightHand:", selectedRightHand)
      setShowErrorMsgNo(13)
      return
  }  
  setIsAddSalt(true)
}

const handlePlacePolysterene = () => {
  if(isTutorialMode){
    if ( selectedLesson === 8 && lessonStep === 6) {
      setIsPlacePolysterene(true)
      setSelectedObject(null)
      return
    }
  }

  if(!isTutorialMode){
    setIsPlacePolysterene(true)
      setSelectedObject(null)
      return
  }
  

  setShowErrorMsgNo(4)
  setSelectedObject(null)
}

  const placeDropper = () => {
    if (
      isTutorialMode &&
      selectedLesson === 7 &&
      (lessonStep === 13 || lessonStep === 8)
    ) {
      setIsDropperPlaced(true)

      // Close the old popup after placing
      setSelectedObject(null)
      return
    }

    setShowErrorMsgNo(12)
    setSelectedObject(null)
  }


  useEffect(() => {
    setSelectedObject(null)
  }, [isDropperPlaced])

  const removeDropper = () => {
    if (
      isTutorialMode &&
      selectedLesson === 7 &&
      lessonStep !== 14 &&
      lessonStep !== 10
    ) {
      setShowErrorMsgNo(12)
      setSelectedObject(null)
      return
    }

    setIsDropperPlaced(false)
    setSelectedObject(null)

    if (
      isTutorialMode &&
      selectedLesson === 7 &&
      lessonStep === 10
    ) {
      setLessonStep(11)
    }
  }

  const keepWeighedTestTubeOnTable = (hand) => {
  const handData = getHandData(hand)

  if (!handData?.ref?.current) {
    return
  }

  const testube = handData.ref.current

  // First move directly from balance
  // back to its original table parent
  handData.originalParent.add(testube)

  testube.position.copy(
    handData.originalPosition
  )

  testube.rotation.copy(
    handData.originalRotation
  )

  testube.scale.set(1, 1, 1)

  testube.updateMatrixWorld(true)

  // Now reset the balance reading
  setIsWeighTestube(false)

  // The test tube is no longer held
  clearHandData(hand)

  setSelectedObject(null)

  if (
    selectedLesson === 8 &&
    lessonStep === 17
  ) {
    setLessonStep(18)
  }

  console.log(
    "Test tube moved directly from balance to table"
  )
}

 const handleRemoveTestTube = () => {
    if (
      !isWeighTestube ||
      !isTestTube(selectedObject?.name)
    ) {
      return
    }

    console.log(
      "Test tube removed from balance"
    )

    // HoldLeft/HoldRight will place it back
    // in the previously selected hand
    setIsWeighTestube(false)

    setSelectedObject(null)
}
const handlePlaceBalance = () => {
  setIsBalancePlaced((previousValue) => !previousValue)
  setSelectedObject(null)
  if(isBalancePlaced && selectedLesson ===8 && lessonStep ===22){
      setLessonStep(23)
    }
}

  const handleRemoveBalance = ()=>{
    setIsBalancePlaced(false)
    
  }

  useEffect(()=>{
    console.log({
  left: selectedLeftHand?.name,
  right: selectedRightHand?.name,
  isPlacePolysterene,
  isPlaceThermometer,
})
  },[selectedLeftHand,selectedRightHand,isPlacePolysterene,isPlaceThermometer])

  const placeThermometer=()=>{
    setIsPlaceThermometer(true)
  }
  const removeThermometer = ()=>{
    setIsPlaceThermometer(false)
  }

  const addPottasiumCarbinateToSpoon = ()=>{
    setIsPottasiumCarobnateInSpoon(true);
  }

  useEffect(()=>{
    console.log('lessonStep:',lessonStep)
  },[lessonStep])

  const handleRemoveClampFromCenter = ()=>{
    setIsClampInCenter(false)
    if(selectedLesson ===8 && lessonStep===29){
      setLessonStep(30)
    }
  }

  const handlePolystereneStirMode = ()=>{
    
    setIsPolystereneStirMode(true)
    setSelectedObject(null)
  }

  const removePolystereneStirMode = ()=>{
    console.log('UnStir')
    setIsPolystereneStirMode(false);
    setSelectedObject(null)
  }

  useEffect(()=>{
    console.log('isPlacePolysterene:',isPlacePolysterene)
  },[isPlacePolysterene])

  const renderTableObjectButtons = () => {
    if ( selectedObject?.name === "mainBuretteClamp" && isBuiretteClamped) {
      return (
        <>
          <button
            onClick={isClampInCenter ? handleRemoveClampFromCenter : handlePlaceBuretteInCentre }
          >
            {isClampInCenter
              ? "Remove From Center"
              : "Place In Centre"}
          </button>  
          
          {
            isBuiretteClamped &&
            <button>
              Unclamped
            </button>
          }
          {/* <button>
            {isBuiretteClamped
              ? "Unclamped"
              : "Place In Centre"}
          </button>      */}
        </>

      )
    }
    if (selectedObject?.name === "salt-container") {
      return (
        <button onClick={addSaltToSpoon}>
          Take Salt
        </button>
      )
    }

    if (selectedObject?.name === "pottasium-carbonate-container") {
      return (
        <button
          onClick={addPottasiumCarbinateToSpoon}
        >
          Take Potassium Carbonate
        </button>
      )
    }

    if (selectedObject?.name === "mainMassBalance") {
      return (
        <button onClick={handlePlaceBalance}>
          {isBalancePlaced
            ? "Remove Balance"
            : "Place Balance"}
        </button>
      )
    }

    

    return renderHandSelectionButtons()
    
  }

const renderHeldObjectButtons = () => {
  if (!selectedObject?.isHolding) return null

  if ( selectedLesson === 8 && selectedObject.name === "main-normal-beaker" && isTutorialMode) {
    return (
      <>
        <button
          onClick={() =>
            keepBackOnTable(selectedObject.hand)
          }
        >
          Keep Back On Table
        </button>

        {!isBeakerNearClamp && (
          <>
            <button onClick={openFillBeakerBox}>
              Add Liquid
            </button>

            <button onClick={handlePlaceBeaker}>
              Place Beaker
            </button>
          </>
        )}

        {isBeakerNearClamp && (
          <button onClick={handlePlaceBeakerRemove}>
            Remove Beaker
          </button>
        )}

        {isPlacePolysterene && isPlaceThermometer && !isPolystereneStirMode && (
          <button onClick={handlePolystereneStirMode}>
            Stir
          </button>
        )}

        {
        isPlacePolysterene && isPlaceThermometer && isPolystereneStirMode && (
          <button onClick={removePolystereneStirMode}>
            Unstir
          </button>
        )

        }
      </>
    )
  }

  if(selectedObject.name === "main-normal-beaker" ){

  }


  if(selectedObject.name === "main-normal-beaker" && !isTutorialMode){
    return(
      <>
        <button
          onClick={() =>
            keepBackOnTable(selectedObject.hand)
          }
        >
          Keep Back On Table
        </button>

        {!isBeakerNearClamp && (
          <>
            <button onClick={openFillBeakerBox}>
              Add Liquid
            </button>

            <button onClick={handlePlaceBeaker}>
              Place Beaker
            </button>
          </>
        )}

        {isBeakerNearClamp && (
          <button onClick={handlePlaceBeakerRemove}>
            Remove Beaker
          </button>
        )}

        {isPlacePolysterene && isPlaceThermometer && (
          <button onClick={handlePolystereneStirMode}>
            Stir
          </button>
        )}

        {
          isPlacePolysterene && isPlaceThermometer && isPolystereneStirMode && (
            <button onClick={removePolystereneStirMode}>
              Unstir
            </button>
        )}
      </>
    )

  }

  if(selectedObject.name === "mainThermometer"){
     return(
      <>
        <button onClick={() => keepBackOnTable(selectedObject.hand)}>
          Keep Back On Table
        </button>

        {!isPlaceThermometer && 
          <button onClick={()=>placeThermometer()}>
            Place Thermometer
          </button>
        }

        {isPlaceThermometer && 
          <button onClick={()=>removeThermometer()}>
            Remove Thermometer
          </button>
        }
      </>
    )   
  }


  if (selectedObject.name === "main-buirette") {
      return (
        <>
          <button
            onClick={() =>
              keepBackOnTable(selectedObject.hand)
            }
          >
            Keep Back On Table
          </button>

          <button onClick={openFillBeakerBox}>
            Add Liquid
          </button>

          <button onClick={handleClampBurette}>
            {isBuiretteClamped ? "Unclamp" : "Clamp"}
          </button>
        </>
      )
    }

    

    if ( isWeighTestube && isTestTube(selectedObject.name)) {
      return (
        <>
          <button
            onClick={() =>
              keepWeighedTestTubeOnTable(
                selectedObject.hand
              )
            }
          >
            Keep Back On Table
          </button>

          <button onClick={handleRemoveTestTube}>
            Remove Test Tube
          </button>
        </>
      )
    }

  if ( isFilterFolded && isFoldedFilterPaper(selectedObject.name)) {
    return (
      <>
        <button
          onClick={() =>
            unfoldFilterPaper(selectedObject.hand)
          }
        >
          Unfold Paper
        </button>

        <button
          onClick={() =>
            placeFilterInFunnel(selectedObject.hand)
          }
        >
          Place in Funnel
        </button>
      </>
    )
  }

  if (isFunnel(selectedObject.name)) {
    return (
      <>
        <button onClick={toggleFunnelMode}>
          {isFunnelMode
            ? "Exit Funnel Mode"
            : "Funnel Mode"}
        </button>

        {isFilterInFunnel ? (
          <button
            onClick={() =>
              removeFilterFromFunnel(
                selectedObject.hand
              )
            }
          >
            Remove Filter
          </button>
        ) : (
          <button
            onClick={() =>
              keepBackOnTable(selectedObject.hand)
            }
          >
            Keep Back On Table
          </button>
        )}
      </>
    )
  }

  if (selectedObject.name === "mainPolysterene") {
    return (
      <>
        <button
          onClick={() =>
            keepBackOnTable(selectedObject.hand)
          }
        >
          Keep Back On Table
        </button>

        <button onClick={()=>handlePlacePolysterene()} >
          Place In Beaker
        </button>
      </>
    )
  }

  if (selectedObject.name === "main-dropper") {
    return isDropperPlaced ? (
      <button onClick={removeDropper}>
        Remove Dropper
      </button>
    ) : (
      <>
        <button
          onClick={() =>
            keepBackOnTable(selectedObject.hand)
          }
        >
          Keep Back On Table
        </button>

        <button onClick={()=>placeDropper()}>
          Place Dropper
        </button>
      </>
    )
  }

  return (
    <>
      <button
        onClick={() =>
          keepBackOnTable(selectedObject.hand)
        }
      >
        Keep Back On Table
      </button>

      {canShowMainHoldingButton() && (
        <button onClick={handleMainHoldingAction}>
          {getMainHoldingButtonText()}
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
          {selectedObject.isHolding
            ? renderHeldObjectButtons()
            : renderTableObjectButtons()}
        </div>
      </Html>
    )}

    {selectedLeftHand && !isDragging && (
      <HoldLeft modeldata={selectedLeftHand} />
    )}

    {selectedRightHand && (
      <HoldRight modeldata={selectedRightHand} />
    )}

    <ClickHitbox
      modelRef={spoonRef}
      multiplier={2}
    />

    <ClickHitbox
      modelRef={mainDropperRef}
      multiplier={2}
    />

    <ClickHitbox
      modelRef={testube01Ref}
      multiplier={1.2}
    />

    <ClickHitbox
      modelRef={redLitmusRef}
      multiplier={2}
    />

    <ClickHitbox
      modelRef={mainPolystereneRef}
      multiplier={1.5}
    />

    <ClickHitbox
      modelRef={mainBuiretteRef}
      multiplier={1.5}
    />

    <ClickHitbox
      modelRef={buretteClampRef}
      multiplier={1.5}    
    />

    <ClickHitbox
      modelRef={mainThermometerRef}
      multiplier={1.5}
    />



  </>
)
}

export default ClickObject