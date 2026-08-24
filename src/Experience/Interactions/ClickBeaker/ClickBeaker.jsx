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
    isPlaceThermometer,setIsPolystereneStirMode,isPolystereneStirMode,setIsPotassiumHydrogenCarbonateInSpoon,
    isThermometerRisen,setIsThermometerRisen,setIsPolystereneCovered,isPolystereneCovered,
    fillBeakerModel,setFillBeakerModel,isPipetteMode,setIsPipetteMode,setTestubesInBeaker,isVolumetricPipetteMode,
    setIsVolumetricPipetteMode,isPhenopthalinePourMode,setIsPhenopthalinePourMode,isCleanBeaker,setIsCleanBeaker,
    isSulfamicInSpoon,setIsSulfamicInSpoon,

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
    testube04Ref,
    testube05Ref,
    testube06Ref,

    filterPaperRef,
    filterFoldedPaperRef,
    saltContainerRef,

    funnelRef,mainDropperRef,
    mainPolystereneRef,
    pottasiumCarbonateContainerRef,
    digitalBalanceRef,
    mainBuiretteRef,
    buretteClampRef,
    mainThermometerRef,
    mainPolysterene2Ref,
    thermometerLiquidRef,
    potassiumHydrogenCarbonateRef,
    kettleRef,pipetteRef,iodobutaneBottleRef,
    bromobutaneBottleRef,chlorobutaneBottleRef,volumetricPipetteRef,
    volumetricRef,volumetricBung,phenopthalineBottleRef,
    sulfamicBottleRef
  } = useContext(ModelContext)

  const { lessonStep,setSelectedLesson,setShowErrorMsgNo, isMainGuideline,selectedLesson,isTutorialMode,setLessonStep} =
    useContext(MainGuidelineContext)

 const {isBalancePlaced,setIsBalancePlaced,isBuiretteClamped,setIsBuiretteClamped,
  isBeakerNearClamp,setIsBeakerNearClamp } = useContext(InteractionContext)  

  const { camera, gl, scene } = useThree()

  const [selectedObject, setSelectedObject] = useState(null)

  const flatOriginalTransformRef = useRef(null)
  const foldedOriginalTransformRef = useRef(null);
  const thermometerOriginalTransformRef = useRef(null)

  const testube01RackRef = useRef(null)  
  const testube02RackRef = useRef(null)
  const testube03RackRef = useRef(null)
  const testube04RackRef = useRef(null)
  const testube05RackRef = useRef(null)
  const testube06RackRef = useRef(null)

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
        name: "main-testube-04",
        ref: testube04Ref,
      },
      {
        name: "main-testube-05",
        ref: testube05Ref,
      },
      {
        name: "main-testube-06",
        ref: testube06Ref,
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
      },
      {
        name:'mainPolysterene2',
        ref:mainPolysterene2Ref
      },
      {
        name : 'potassium-hydrogencarbonate',
        ref:potassiumHydrogenCarbonateRef
     },

      {
        name:'kettle',
        ref:kettleRef
      },
      {
        name:'pipette',
        ref:pipetteRef
      },
      {
        name:'iodobutane-bottle',
        ref:iodobutaneBottleRef
      },
      {
        name:'bromobutane-bottle',
        ref:bromobutaneBottleRef
      },
      {
        name:'chlorobutane-bottle',
        ref:chlorobutaneBottleRef
      },
      {
        name:'volumetric-flask',
        ref:volumetricRef
      },
      {
        name:"volumetric-pipette",
        ref:volumetricPipetteRef
      },
      {
        name:"phenopthaline-dropper-bottle",
        ref:phenopthalineBottleRef
      },
      {
        name:"sulfamic-bottle",
        ref:sulfamicBottleRef
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
      mainDropperRef,
      mainPolystereneRef,
      pottasiumCarbonateContainerRef,
      digitalBalanceRef,
      mainBuiretteRef,
      buretteClampRef,
      mainPolysterene2Ref,
      potassiumHydrogenCarbonateRef,
      kettleRef,pipetteRef,
      bromobutaneBottleRef,
      chlorobutaneBottleRef,
      testube04Ref,testube05Ref,testube06Ref,
      volumetricPipetteRef,volumetricRef,
      volumetricPipetteRef,phenopthalineBottleRef,
      sulfamicBottleRef
    ]
  )

  const isSpoon = (name) => name === "main-spoon"

  const isFunnel = (name) => name === "main-funnel"

  const isLitmus = (name) => name?.toLowerCase().includes("litmus")

  const isDropper = (name) =>name === "main-dropper"

  const isTestTube = (name) => name === "main-testube-01" || name === "main-testube-02" || name === "main-testube-03" 
                                        || name === "main-testube-04" || name === "main-testube-05" || name === "main-testube-06"

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
    if(selectedLesson===8 && lessonStep!==26){
      setShowErrorMsgNo(1)
      return
    }

    
  setIsBeakerNearClamp(true);
  setSelectedObject(null);
}

  const handlePlaceBeakerRemove = ()=>{
    setIsBeakerNearClamp(false)
    if(lessonStep===28 && selectedLesson===8){
      setLessonStep(28.5);
      moveObjectToLeftHand()
    }

    if(lessonStep===25 && selectedLesson===9){
      setLessonStep(26);
      moveObjectToLeftHand()
    }

    if(lessonStep===53 && selectedLesson===11.1){
      setLessonStep(54);      
    }

    if(lessonStep===70 && selectedLesson===11.1){
      setLessonStep(71);      
    }
  }

  const handleCleanBeaker = ()=>{
    setIsCleanBeaker(true);
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

  const moveObjectToRightHand = () => {
    if (!selectedObject?.isHolding) return

    if (selectedRightHand) {
      console.log("Right hand is already full")
      return
    }

    const currentHandData =
      selectedObject.hand === "left"
        ? selectedLeftHand
        : selectedRightHand

    if (!currentHandData) return

    setSelectedRightHand({
      ...currentHandData,
      hand: "right",
    })

    if (selectedObject.hand === "left") {
      setSelectedLeftHand(null)
    }

    setSelectedObject(null)

    console.log(
      currentHandData.name,
      "moved to right hand"
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

    //--------Selected Lesson 10--------------

    if(selectedLesson==10){

      if([5,20,21,22,23,24,26,27,29,30,31,33,34,36,37,38,42,43,44,45,46,48,49,50,51,53,54,55,56,58,59,60,61,63,64,65,66,69,70,71,75,
        76,77,80,82,83,84,85,86,87,90,91

      ].includes(lessonStep)){
        setShowErrorMsgNo(1)
        return
      }

      if(hand==='right' && [14,25,32,47,52,57,62,67,68,72,78,79,81].includes(lessonStep)){
        setShowErrorMsgNo(1)
        return        
      }

      if(hand==='left' && [17,39,92,95].includes(lessonStep)){
        setShowErrorMsgNo(1)
        return        
      }      

    }

    if (!handData?.ref?.current) return

    if (handData.name === "main-spoon" &&selectedLesson === 12 && lessonStep === 13) {
      setLessonStep(14)
    }

    if (handData.name === "main-spoon" &&selectedLesson === 8 && lessonStep === 15) {
      setLessonStep(16)
    }

    if (handData.name === "main-spoon" &&selectedLesson === 12.1 && lessonStep === 25) {
      setLessonStep(26)
    }

    if (handData.name === "main-spoon" && selectedLesson === 9 && lessonStep === 14) {
      setLessonStep(15)
    }

    if(lessonStep===5 && selectedLesson ===9 && handData.name === "main-normal-beaker"){
      setLessonStep(6)
    }

    if(lessonStep===106  && selectedLesson === 10 && handData.name === "main-normal-beaker"){
      setLessonStep(107)
    }

    if(lessonStep===8 && selectedLesson ===10 && handData.name === "main-normal-beaker"){
      setLessonStep(9)
    }

    if(lessonStep===23 && selectedLesson ===11 && handData.name === "main-normal-beaker"){
      setLessonStep(23.5)
    }

    if(lessonStep===9 && selectedLesson ===10 && handData.name === "kettle"){
      setLessonStep(10)
    }


    if (hand === "left" &&selectedLesson === 8 &&lessonStep === 7) {
      setLessonStep(8)
    }

    if (handData.name === "main-spoon" &&isPourIntoTestube) {
      setIsPourIntoTestube(false)
    }

    if (handData.name === "main-testube-01" && selectedLesson===10 && lessonStep ===14) {
      setLessonStep(15)
    }

    if (handData.name === "main-testube-01" && selectedLesson===10 && lessonStep ===25) {
      setLessonStep(26)
    }

    if (handData.name === "main-testube-01" && selectedLesson===12 && lessonStep ===21) {
      setLessonStep(22)
      setSelectedLesson(12.1)
    }

    if (handData.name === "main-testube-02" && selectedLesson===10 && lessonStep ===17) {
      setLessonStep(18)
    }

    if (handData.name === "main-testube-02" && selectedLesson===10 && lessonStep ===32) {
      setLessonStep(33)
    }

    
    if (handData.name === "main-testube-02" && selectedLesson===10 && lessonStep ===62) {
      setLessonStep(63)
    }

    if (handData.name === "main-testube-03" && selectedLesson===10 && lessonStep ===18) {
      setLessonStep(19)
    }

    if (handData.name === "main-testube-03" && selectedLesson===10 && lessonStep ===40) {
      setLessonStep(41)
    }

    if (handData.name === "main-testube-03" && selectedLesson===10 && lessonStep ===72) {
      setLessonStep(73)
    }

    if (handData.name === "main-testube-04" && selectedLesson===10 && lessonStep ===99) {
      setLessonStep(100)
    }

    if (handData.name === "pipette" && selectedLesson===10 && lessonStep ===73) {
      setLessonStep(74)
    }

    if (handData.name === "main-testube-01" && selectedLesson===10 && lessonStep ===52) {
      setLessonStep(53)
    }

    if (handData.name === "main-testube-01" && selectedLesson===10 && lessonStep ===78) {
      setLessonStep(79)
    }

    if (handData.name === "main-testube-01" && selectedLesson===10 && lessonStep ===113) {
      setLessonStep(114)
    }

    if (handData.name === "main-testube-04" && selectedLesson===10 && lessonStep ===114) {
      setLessonStep(115)
    }

    if (handData.name === "main-graduated-cylinder" && selectedLesson===10 && lessonStep ===39) {
      setLessonStep(40)
    }

    if (handData.name === "iodobutane-bottle" && selectedLesson===10 && lessonStep ===47) {
      setLessonStep(48)
    }

    if (handData.name === "bromobutane-bottle" && selectedLesson===10 && lessonStep ===57) {
      setLessonStep(58)
    }

    if (handData.name === "chlorobutane-bottle" && selectedLesson===10 && lessonStep ===67) {
      setLessonStep(68)
    }

    if (handData.name === "main-testube-03" && selectedLesson===10 && lessonStep ===81) {
      setLessonStep(82)
    }

    if (handData.name === "main-normal-beaker" && selectedLesson===10 && lessonStep ===88) {
      setLessonStep(89)
    }

    if (handData.name === "main-testube-05" && selectedLesson===10 && lessonStep ===95) {
      setLessonStep(96)
    }

    console.log("lesson:",lessonStep)

    if (handData.name === "main-normal-beaker" && selectedLesson===11 && lessonStep ===11) {
      setLessonStep(12)
    }

    if (handData.name === "main-testube-02" && selectedLesson===10 && lessonStep ===121) {
      setLessonStep(122)
    }
    if (handData.name === "main-testube-03" && selectedLesson===10 && lessonStep ===122) {
      setLessonStep(123)
    }

    if (handData.name === "volumetric-pipette" && selectedLesson===11 && lessonStep ===16) {
      setLessonStep(17)
    }
    if (handData.name === "volumetric-flask" && selectedLesson===11 && lessonStep ===39) {
      setLessonStep(40)
    }

    if (handData.name === "volumetric-pipette" && selectedLesson===11 && lessonStep ===44) {
      setLessonStep(45)
      setSelectedLesson(11.1)
    }   
    
    if (handData.name === "phenopthaline-dropper-bottle" && selectedLesson===11.1 && lessonStep ===49) {
      setLessonStep(50)
    }  
    if (handData.name === "phenopthaline-dropper-bottle" && selectedLesson===11.1 && lessonStep ===62) {
      setLessonStep(63)
    }        
    if ( handData.name === "main-testube-01" && isWeighTestube) {

      if (lessonStep === 17 && selectedLesson === 8) {
        setLessonStep(18)
      }
      
      if (lessonStep === 15 && selectedLesson === 9) {
        setLessonStep(16)
      }

    }

    if (handData.name === "mainThermometer") {
      if (
        lessonStep === 43 &&
        selectedLesson === 8
      ) {
        setLessonStep(44)
      }


      

    }

    const object = handData.ref.current

    handData.originalParent.add(object)

    object.position.copy(
      handData.originalPosition
    )

    object.rotation.copy(
      handData.originalRotation
    )

    object.scale.set(1, 1, 1)
    object.updateMatrixWorld(true)

    clearHandData(hand)
    setSelectedObject(null)

    requestAnimationFrame(() => {
      object.scale.set(1, 1, 1)
      object.updateMatrixWorld(true)

      console.log(
        "Final table scale:",
        object.scale
      )
    })
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

     if (
    selectedLesson === 10 &&
    selectedItem.name === "mainMassBalance"
  ) {
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

    if(lessonStep==8){
        if(objectName !== "mainPolysterene"){
          setShowErrorMsgNo(1)
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

    //--------------Selected Lesson 08---------------------------

    if(selectedLesson==8){
      if(lessonStep==3){
        setShowErrorMsgNo(1)
        return false
      }
      if(lessonStep===7 && objectName !=="main-testube-01"){
        setShowErrorMsgNo(1)
        return false
      }
    }
    //--------------------Selected Lesson 10--------

    if(selectedLesson===10){
      if([3, 10,11,18,41,74,75,79,89].includes(lessonStep)){
        setShowErrorMsgNo(1)
        return false
      }
      if(lessonStep==4 && objectName!=="kettle"){
        setShowErrorMsgNo(1)
        return false 
      }
      if(lessonStep==12 && objectName!=="main-testube-02"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==19 && objectName!=="main-graduated-cylinder"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==42 && objectName!=="pipette"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==76 && objectName!=="main-testube-02"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==84 && objectName!=="main-testube-01"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==86 && objectName!=="main-testube-03"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==92 && objectName!=="main-testube-05"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==96 && objectName!=="main-testube-06"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==102 && objectName!=="main-testube-04"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==104 && objectName!=="main-testube-05"){
        setShowErrorMsgNo(1)
        return false 
      }      
      
    }

    return true
  }

  const validateLeftHandPick = (objectName) => {
    if (!isMainGuideline) return true
    
    // if(selectedLesson===8 && lessonStep===8){{
    //   if (objectName !== "main-testube-01") {
    //     setShowErrorMsgNo(1)
    //     return false
    //   }
    // }

    if(selectedLesson ===8){
      if(lessonStep===8){
        if (objectName !== "main-testube-01") {
          setShowErrorMsgNo(1)
          return false
      }
    }
      // if(lessonStep===8){
      //   if(objectName !== "mainPolysterene"){
      //     setShowErrorMsgNo(1)
      //     return false
      //   }
      // }
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

    //---------------Selected Lesson 10-------------//

    if(selectedLesson===10){

      if([19,20].includes(lessonStep)){
        setShowErrorMsgNo(1)
        return false
      }

      if(lessonStep===3){
        if(objectName !== "main-normal-beaker"){
          setShowErrorMsgNo(1)
          return false
        }
      }

      if(lessonStep==10 && objectName !=='main-testube-01'){
         setShowErrorMsgNo(1)
        return false  
      }

      if(lessonStep==15 && objectName!=="main-testube-03"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==21 && objectName!=="main-testube-01"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==26 && objectName!=="main-testube-02"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==33 && objectName!=="main-testube-03"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==41 && objectName!=="iodobutane-bottle"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==53 && objectName!=="bromobutane-bottle"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==58 && objectName!=="main-testube-02"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==63 && objectName!=="chlorobutane-bottle"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==68 && objectName!=="main-testube-03"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==74 && objectName!=="main-testube-01"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==79 && objectName!=="main-testube-03"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==82 && objectName!=="main-normal-beaker"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==89 && objectName!=="main-testube-04"){
        setShowErrorMsgNo(1)
        return false 
      }

      if(lessonStep==100 && objectName!=="main-normal-beaker"){
        setShowErrorMsgNo(1)
        return false 
      }

    }


    // if (lessonStep === 3) {
    //   if (objectName !== "main-normal-beaker") {
    //     setShowErrorMsgNo(1)
    //     return false
    //   }
    // }

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

  if(isStirMode){
    if(selectedLesson===12.1 && lessonStep ===24){
      setLessonStep(25)
    }
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



  // if (isTutorialMode) {
  //   if (selectedLesson === 7 && lessonStep !== 11 && lessonStep !== 4) {
  //     setShowErrorMsgNo(4)
  //     setSelectedObject(null)
  //     return
  //   }
  // }

  // if (isMainGuideline && lessonStep === 8 && selectedObject.hand === "left" && selectedLesson !== 8) {
  //   setShowErrorMsgNo(4)
  //   setSelectedObject(null)
  //   return
  // }

  if (isMainGuideline) {
    const isAllowedStep =
      // lessonStep === 4 ||
      // lessonStep === 7 ||
      // lessonStep === 8 ||
      (selectedLesson === 7 && (lessonStep === 4 || lessonStep === 11)) ||
      (selectedLesson === 8 && lessonStep === 19) ||
      (selectedLesson === 9 && lessonStep === 17) ||
      (selectedLesson === 10 && lessonStep === 20) ||
      (selectedLesson === 10 && lessonStep === 27) ||
      (selectedLesson===10 && ([20,34,90,93,97].includes(lessonStep))) ||
      (selectedLesson===11 && ([4,18,31].includes(lessonStep)) ) ||
      (selectedLesson===11.1 && ([55,56,64].includes(lessonStep))) ||
      (selectedLesson ===12 && ([16].includes(lessonStep))) ||
      (selectedLesson ==12.1) && ([30,36].includes(lessonStep))


    if (!isAllowedStep) {
      setShowErrorMsgNo(4)
      setSelectedObject(null)
      return
    }

    // if (selectedLesson === 3 && lessonStep !== 4) {
    //   setShowErrorMsgNo(4)
    //   setSelectedObject(null)
    //   return
    // }
  }

  const selectedHand = selectedObject.hand

  setIsLitmusMode(false)
  setIsStirMode(false)
  setIsFillUpBeaker(false)
  setFillBeakerModel(selectedObject.name)
  setFillBeakerHand(selectedHand)
  setIsFillBeakerBoxOpen(true)
  setSelectedObject(null)
}

   const togglePourIntoTestTube = () => {
      setIsPourIntoTestube((previousValue) => {
        if (previousValue) {
          if(selectedLesson===8 && lessonStep === 13){
            setLessonStep(14)
          }

          if(selectedLesson ===9 && lessonStep ===11){
            setLessonStep(12)
          }
          
          if(selectedLesson===12 && lessonStep===11){
            setLessonStep(12)
          }
        }

        return !previousValue
      })

      setSelectedObject(null)
    }

    const pourIntoTestTube = () => {
      setIsPourIntoTestube(true)
      setSelectedObject(null)
    }

    useEffect(()=>{
      console.log("isBuiretteClamped:",isBuiretteClamped)
    },[isBuiretteClamped])


const handleClampBurette = () => {
  // CURRENT false = we are about to CLAMP
  if (!isBuiretteClamped) {
    if (selectedObject?.hand === "left") {
      setSelectedLeftHand(null)
    }

    if (selectedObject?.hand === "right") {
      setSelectedRightHand(null)
    }
  }

  // CURRENT true = we are about to UNCLAMP
  if (isBuiretteClamped) {
    setSelectedLeftHand({
      hand: "left",
      name: "main-buirette",
      ref: mainBuiretteRef,

      originalParent: mainBuiretteRef.current.parent,
      originalPosition:
        mainBuiretteRef.current.position.clone(),
      originalRotation:
        mainBuiretteRef.current.rotation.clone(),
    })

    console.log(
      "✅ Burette moved to left hand after unclamping"
    )
  }

  setIsBuiretteClamped(
    (previousValue) => !previousValue
  )

  setSelectedObject(null)

  if (
    selectedLesson === 8 &&
    lessonStep === 23
  ) {
    setLessonStep(24)
  }
  if(selectedLesson===11.1 && lessonStep ===63){
      setLessonStep(64)
    }  
}

  const weighedTestTubeHandDataRef = useRef(null)

  const handleWeighTestTube = () => {
    if (
      isBalancePlaced &&
      [8, 9, 12].includes(selectedLesson) &&
      [16, 17, 39, 13, 35, 5,12].includes(lessonStep) &&
      isTestTube(selectedObject?.name)
    ) {
      weighedTestTubeHandDataRef.current =
      selectedObject.hand === "left"
        ? { ...selectedLeftHand }
        : { ...selectedRightHand }

      setIsWeighTestube(true)

      if (selectedLesson === 12 && lessonStep === 5) {
        setLessonStep(6)
      }

      if (selectedLesson === 12 && lessonStep === 12) {
        setLessonStep(13)
      }

      if (selectedLesson === 8 && lessonStep === 39) {
        setLessonStep(40)
      }

      if (selectedLesson === 9 && lessonStep === 13) {
        setLessonStep(14)
      }

      if (selectedLesson === 9 && lessonStep === 35) {
        setLessonStep(36)
      }

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
      if (([8,9,12].includes(selectedLesson)) && isTestTube(selectedObject?.name)) {
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
  if ( (selectedLesson === 8 || selectedLesson ===9 || selectedLesson===12) && isTestTube(selectedObject?.name)) {
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
  if (
    isTutorialMode &&
    selectedLesson !== 9 && selectedLesson !==10 && selectedLesson !==8 && selectedLesson !==11 &&
     selectedLesson !==11.1 && selectedLesson !== 12 && selectedLesson !== 12.1
  ) {
    return <p>Can't pick now</p>
  }

  if (
    isTutorialMode &&
    selectedLesson === 1 &&
    lessonStep === 6 &&
    selectedObject?.name !== "main-spoon"
  ) {
    return <p>Can't pick now</p>
  }

  // if (
  //   isTutorialMode &&
  //   lessonStep !== 3 &&
  //   lessonStep !== 6 &&
  //   selectedLesson !== 8 &&
  //   selectedLesson !== 9 && 
  //   selectedLesson !==10 
  // ) {
  //   return <p>Can't pick now</p>
  // }

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

    if ( selectedLesson === 9 && lessonStep === 4) {
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

    if (
    selectedLesson === 9 &&
    lessonStep === 15
  ) {
    setLessonStep(16)
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

  const previousHandData =
    weighedTestTubeHandDataRef.current

  if (!previousHandData) {
    console.log(
      "Previous test tube hand data not found"
    )
    return
  }

  // Lesson 12 Step 14
  // Force test tube into RIGHT hand
  if (
    selectedLesson === 12 &&
    lessonStep === 14
  ) {
    setSelectedRightHand({
      ...previousHandData,
      hand: "right",
    })

    setSelectedLeftHand(null)

    setIsWeighTestube(false)

    weighedTestTubeHandDataRef.current =
      null

    setLessonStep(15)
    setSelectedObject(null)

    return
  }

  // Normally return to original hand
  if (
    previousHandData.hand === "left"
  ) {
    setSelectedLeftHand(
      previousHandData
    )
  }

  if (
    previousHandData.hand === "right"
  ) {
    setSelectedRightHand(
      previousHandData
    )
  }

  if (
    selectedLesson === 12 &&
    lessonStep === 6
  ) {
    setLessonStep(7)
  }

  console.log(
    "Test tube removed from balance →",
    previousHandData.hand
  )

  setIsWeighTestube(false)

  weighedTestTubeHandDataRef.current =
    null

  setSelectedObject(null)
}

const handlePlaceBalance = () => {
  setIsBalancePlaced(true)
  setSelectedObject(null)

  if(lessonStep===38 && selectedLesson===8){
    setLessonStep(39)
  }

}

  const handleRemoveBalance=()=>{
      setIsBalancePlaced(false);
      setSelectedObject(null)
      if(isBalancePlaced && selectedLesson ===8 && lessonStep ===22){
        setLessonStep(23)
      }

      if(isBalancePlaced && selectedLesson ===9 && lessonStep ===20){
        setLessonStep(21)
      }
  }

  const handleShowBung=(modelName)=>{

    if(selectedLesson===10 && lessonStep ===75){
      setLessonStep(76)
    }

    if(selectedLesson===10 && lessonStep ===77){
      setLessonStep(78)
    }

    if(selectedLesson===10 && lessonStep ===80){
      setLessonStep(81)
    }

    if (selectedLesson === 10 && lessonStep === 112) {
      setLessonStep(113)
    }


    if(modelName==="main-testube-01"){
      testube01Ref.current.traverse((child)=>{
        if(child.isMesh && child.name.includes('bung')){
          child.visible=true
        }
      })
    }

    if(modelName==="main-testube-02"){
      testube02Ref.current.traverse((child)=>{
        if(child.isMesh && child.name.includes('bung')){
          child.visible=true
        }
      })
    }
    
    if(modelName==="main-testube-03"){
      testube03Ref.current.traverse((child)=>{
        if(child.isMesh && child.name.includes('bung')){
          child.visible=true
        }
      })
    }     


  }



  useEffect(()=>{
    console.log({
  left: selectedLeftHand?.name,
  right: selectedRightHand?.name,
  isPlacePolysterene,
  isPlaceThermometer,
})
  },[selectedLeftHand,selectedRightHand,isPlacePolysterene,isPlaceThermometer])

  const placeThermometer = () => {
      const thermometer = mainThermometerRef.current

      if (!thermometer) return

      if (!thermometerOriginalTransformRef.current) {
        const handData =
          selectedRightHand?.name === "mainThermometer"
            ? selectedRightHand
            : selectedLeftHand

        thermometerOriginalTransformRef.current = {
          parent: handData?.originalParent,
          position: handData?.originalPosition?.clone(),
          rotation: handData?.originalRotation?.clone(),
        }
      }

      setIsPlaceThermometer(true)
      setSelectedObject(null)
}

  const removeThermometer = () => {
    const original =
      thermometerOriginalTransformRef.current

    if (!original) {
      console.log(
        "Thermometer original transform was not found"
      )
      return
    }

    setIsPlaceThermometer(false)

    setSelectedRightHand({
      hand: "right",
      name: "mainThermometer",
      ref: mainThermometerRef,
      originalParent: original.parent,
      originalPosition: original.position.clone(),
      originalRotation: original.rotation.clone(),
    })

    setSelectedObject(null)

    if (
      selectedLesson === 8 &&
      lessonStep === 40
    ) {
      setLessonStep(41)
    }
  }

  const resetThermometer = ()=>{
    setIsThermometerRisen(false);
    thermometerLiquidRef.current.scale.set(0,0,0);
    thermometerLiquidRef.current.visible = false;

    if(selectedLesson===8 && lessonStep==41){
      setLessonStep(42);
    }

  }

  const labelTestube = (modelName) => {
  if (modelName === "main-testube-01") {
    testube01Ref.current?.traverse((child) => {
      if (child.name?.toLowerCase().includes("label")) {
        child.visible = true

        child.traverse((labelChild) => {
          labelChild.visible = true
        })
      }
    })
  }

  if (modelName === "main-testube-02") {
    testube02Ref.current?.traverse((child) => {
      if (child.name?.toLowerCase().includes("label")) {
        child.visible = true

        child.traverse((labelChild) => {
          labelChild.visible = true
        })
      }
    })
  }

  if (modelName === "main-testube-03") {
    testube03Ref.current?.traverse((child) => {
      if (child.name?.toLowerCase().includes("label")) {
        child.visible = true

        child.traverse((labelChild) => {
          labelChild.visible = true
        })
      }
    })
  }

  if(isTutorialMode){
    if(selectedLesson===10 && lessonStep===11){
      setLessonStep(12)
    }

    if(selectedLesson===10 && lessonStep===13){
      setLessonStep(14)
    }

    if(selectedLesson===10 && lessonStep===16){
      setLessonStep(17)
    }
  }
}

  const disposeCup = ()=>{
    setIsPlacePolysterene(false)
    if(lessonStep==42 && selectedLesson==8){
      mainPolystereneRef.current.visible=false
      setLessonStep(43)
    }
  }

  const coverPolystereneCup = ()=>{
    setIsPolystereneCovered(true)
  }

  const removePolystereneLid = ()=>{
    setIsPolystereneCovered(false)
  }

  const addPottasiumCarbinateToSpoon = ()=>{
    if(selectedLesson===8 && lessonStep!==10){
      setShowErrorMsgNo(1)
      return
    }

    if(selectedLesson ===10){
      setShowErrorMsgNo(1)
      return
    }
    setIsPottasiumCarobnateInSpoon(true);
  }

  const addPotassiumHydrogencarbonateToSpoon = ()=>{
    if(selectedLesson===8 && lessonStep!==12){
      setShowErrorMsgNo(1)
      return
    }

    if(selectedLesson===10){
      setShowErrorMsgNo(1)
      return      
    }
    setIsPotassiumHydrogenCarbonateInSpoon(true)
  }

  useEffect(()=>{
    console.log('lessonStep:',lessonStep)
  },[lessonStep])

  const handleRemoveClampFromCenter = ()=>{
    setIsClampInCenter(false)
    if(selectedLesson ===8 && lessonStep===29){
      setLessonStep(30)
    }

    if(selectedLesson ===9 && lessonStep===27){
      setLessonStep(28)
    }

    if(selectedLesson ===11.1 && lessonStep===57){
      setLessonStep(58)
    }
  }

  const handlePolystereneStirMode = ()=>{
    
    setIsPolystereneStirMode(true)
    setSelectedObject(null)
  }

  const removePolystereneStirMode = ()=>{
    setIsPolystereneStirMode(false);
    setSelectedObject(null);

    if(lessonStep===37 && selectedLesson===8){
      setLessonStep(38)
    }
  }

  const placeTestubeInBeaker = () => {
    if (!selectedObject) return

    const handData =
      selectedObject.hand === "left"
        ? selectedLeftHand
        : selectedRightHand

    if (!handData) return

    if (selectedObject.name === "main-testube-01") {
      if (!testube01RackRef.current) {
        testube01RackRef.current = {
          parent: handData.originalParent,
          position: handData.originalPosition.clone(),
          rotation: handData.originalRotation.clone(),
        }
      }

      setTestubesInBeaker((prev) => ({
        ...prev,
        tube1: true,
      }))
    }

    if (selectedObject.name === "main-testube-02") {
      if (!testube02RackRef.current) {
        testube02RackRef.current = {
          parent: handData.originalParent,
          position: handData.originalPosition.clone(),
          rotation: handData.originalRotation.clone(),
        }
      }

      setTestubesInBeaker((prev) => ({
        ...prev,
        tube2: true,
      }))
    }

    if (selectedObject.name === "main-testube-03") {
      if (!testube03RackRef.current) {
        testube03RackRef.current = {
          parent: handData.originalParent,
          position: handData.originalPosition.clone(),
          rotation: handData.originalRotation.clone(),
        }
      }

      setTestubesInBeaker((prev) => ({
        ...prev,
        tube3: true,
      }))
    }

    if (selectedObject.name === "main-testube-04") {
      if (!testube04RackRef.current) {
        testube04RackRef.current = {
          parent: handData.originalParent,
          position: handData.originalPosition.clone(),
          rotation: handData.originalRotation.clone(),
        }
      }

      setTestubesInBeaker((prev) => ({
        ...prev,
        tube4: true,
      }))
    }

    if (selectedObject.name === "main-testube-05") {
      if (!testube05RackRef.current) {
        testube05RackRef.current = {
          parent: handData.originalParent,
          position: handData.originalPosition.clone(),
          rotation: handData.originalRotation.clone(),
        }
      }

      setTestubesInBeaker((prev) => ({
        ...prev,
        tube5: true,
      }))
    }

    if (selectedObject.name === "main-testube-06") {
      if (!testube06RackRef.current) {
        testube06RackRef.current = {
          parent: handData.originalParent,
          position: handData.originalPosition.clone(),
          rotation: handData.originalRotation.clone(),
        }
      }

      setTestubesInBeaker((prev) => ({
        ...prev,
        tube6: true,
      }))
    }

    if (selectedLesson === 10 && lessonStep === 83) {
      setLessonStep(84)
    }

    if (selectedLesson === 10 && lessonStep === 85) {
      setLessonStep(86)
    }

    if (selectedLesson === 10 && lessonStep === 87) {
      setLessonStep(88)
    }

    if (selectedLesson === 10 && lessonStep === 101) {
      setLessonStep(102)
    }

    if (selectedLesson === 10 && lessonStep === 103) {
      setLessonStep(104)
    }

    if (selectedLesson === 10 && lessonStep === 105) {
      setLessonStep(106)
    }

    if (selectedObject.hand === "left") {
      setSelectedLeftHand(null)
    }

    if (selectedObject.hand === "right") {
      setSelectedRightHand(null)
    }

    setSelectedObject(null)
  }

  const removeTestubeInBeaker = ()=>{
    setTestubeInBeaker(false)
  }


  const removeBung = (modelName)=>{
    if(modelName==="main-testube-01"){
      testube01Ref.current.traverse((child)=>{
        if(child.isMesh && child.name.includes('bung')){
          child.visible=false
        }
      })
    }

    if(modelName==="main-testube-02"){
      testube02Ref.current.traverse((child)=>{
        if(child.isMesh && child.name.includes('bung')){
          child.visible=false
        }
      })
    } 

    if(modelName==="main-testube-03"){
      testube03Ref.current.traverse((child)=>{
        if(child.isMesh && child.name.includes('bung')){
          child.visible=false
        }
      })
    }       
    

    if(selectedLesson===10 && lessonStep==108){
      setLessonStep(109)    
    }

    if(selectedLesson===10 && lessonStep==116){
      setLessonStep(117)    
    }

 

    setSelectedObject(null)
  }



  const renderClampTableButtons=()=>{
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
            <button  onClick={handleClampBurette}>
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
  }

  const addSulfamicAcidToSpoon = ()=>{
    setIsSulfamicInSpoon(true)
  }

  const renderSaltContainerTableButtons=()=>{
    if (selectedObject?.name === "salt-container") {
      return (
        <button onClick={addSaltToSpoon}>
          Take Salt
        </button>
      )
    }
  }

  const renderSulfamicTableButtons = ()=>{
    if(selectedObject?.name === "sulfamic-bottle"){
      return(
        <button onClick={addSulfamicAcidToSpoon}>
          Take Sulfamic Acid
        </button>
      )
    }
  }

  const renderPotassiumHydrogencarbonateTableButtons = ()=>{
    if (selectedObject?.name === "potassium-hydrogencarbonate") {
      return (
        <button onClick={addPotassiumHydrogencarbonateToSpoon}>
          Take Potassium Hydrogencarbonate
        </button>
      )
    }
  }

  const renderPottasiumCarbinateTableButtons = ()=>{
    if (selectedObject?.name === "pottasium-carbonate-container") {
      return (
        <button onClick={addPottasiumCarbinateToSpoon}>
          Take Potassium Carbonate
        </button>
      )
    }
  }

  const renderDigitalBalanceTableButtons=()=>{
    if (selectedObject?.name === "mainMassBalance") {
      // return (
      //   <button onClick={handlePlaceBalance}>
      //     {isBalancePlaced
      //       ? "Remove Balance"
      //       : "Place Balance"}
      //   </button>
      // )

      return (
        <>
          {isBalancePlaced && (
            <button onClick={handleRemoveBalance}>
              Remove Balance
            </button>
          )}

          {!isBalancePlaced && (
            <button onClick={handlePlaceBalance}>
              Place Balance
            </button>
          )}
        </>
      )
    }

  }
  

  const renderTableObjectButtons = () => {

    const SulfamicTableButtons=  renderSulfamicTableButtons()
    if(SulfamicTableButtons) return SulfamicTableButtons

    const  normaleBeakerButtons = renderNormalBeakerTableButtons()
    if (normaleBeakerButtons) return normaleBeakerButtons

    const clampButtons = renderClampTableButtons()
    if (clampButtons) return clampButtons

    const saltButtons = renderSaltContainerTableButtons()
    if (saltButtons) return saltButtons

    const PotassiumHydrogencarbonate =renderPotassiumHydrogencarbonateTableButtons()
    if(PotassiumHydrogencarbonate) return PotassiumHydrogencarbonate

    const potassiumButtons =
      renderPottasiumCarbinateTableButtons()

    if (potassiumButtons) return potassiumButtons

    const balanceButtons =
      renderDigitalBalanceTableButtons()

    if (balanceButtons) return balanceButtons

    return renderHandSelectionButtons()

  }

  const handleRemoveTubes = () => {
    if (selectedLesson !== 10) return

    if (lessonStep === 107) {

      if (!testube01Ref.current || !testube04Ref.current) return
      if (!testube01RackRef.current || !testube04RackRef.current) return

      const tube1Rack = testube01RackRef.current
      const tube4Rack = testube04RackRef.current

      setSelectedLeftHand({
        hand: "left",
        name: "main-testube-01",
        ref: testube01Ref,

        originalParent: tube1Rack.parent,
        originalPosition: tube1Rack.position.clone(),
        originalRotation: tube1Rack.rotation.clone(),
      })

      setSelectedRightHand({
        hand: "right",
        name: "main-testube-04",
        ref: testube04Ref,

        originalParent: tube4Rack.parent,
        originalPosition: tube4Rack.position.clone(),
        originalRotation: tube4Rack.rotation.clone(),
      })

      setTestubesInBeaker((prev) => ({
        ...prev,
        tube1: false,
        tube4: false,
      }))

      setLessonStep(108)
    }

    if (lessonStep === 115) {
  if (!testube02Ref.current || !testube05Ref.current) return
  if (!testube02RackRef.current || !testube05RackRef.current) return

  setSelectedLeftHand({
    hand: "left",
    name: "main-testube-02",
    ref: testube02Ref,
    originalParent: testube02RackRef.current.parent,
    originalPosition: testube02RackRef.current.position.clone(),
    originalRotation: testube02RackRef.current.rotation.clone(),
  })

  setSelectedRightHand({
    hand: "right",
    name: "main-testube-05",
    ref: testube05Ref,
    originalParent: testube05RackRef.current.parent,
    originalPosition: testube05RackRef.current.position.clone(),
    originalRotation: testube05RackRef.current.rotation.clone(),
  })

  setTestubesInBeaker((prev) => ({
    ...prev,
    tube2: false,
    tube5: false,
  }))

  setLessonStep(116)
  setSelectedObject(null)

  return
}
    setSelectedObject(null)
  }

  const handleVolumetricPippeteMode = ()=>{
    console.log(isVolumetricPipetteMode)
    setIsVolumetricPipetteMode(true)
  }
  const removeVolumetricPippeteMode = ()=>{
    if(selectedLesson===11 && lessonStep===10){
      setLessonStep(11)
    }
    if(selectedLesson===11 && lessonStep===15){
      setLessonStep(16)
    }

    if(selectedLesson===11 && lessonStep===38){
      setLessonStep(39)
    }

    if(selectedLesson===11 && lessonStep===43){
      setLessonStep(44)
    }    
    setIsVolumetricPipetteMode(false)
  }
  const renderVolumetricPippeteHeldButtons=()=>{
    if(isTutorialMode){
      if (selectedObject.name === "volumetric-pipette" && selectedLesson===11 && ([8,13,36,41].includes(lessonStep))) {
        return (
          <button onClick={handleVolumetricPippeteMode}>
            Pipette Mode
          </button>
        )
      }
      if(selectedObject.name === "volumetric-pipette" && isVolumetricPipetteMode){
          return (
          <button onClick={removeVolumetricPippeteMode}>
            Exit Pipette Mode
          </button>
        )
      }
    }



    if(!isTutorialMode){
      console.log("Hello")
      if(selectedObject.name === "volumetric-pipette" && !isVolumetricPipetteMode){
          return (
          <button onClick={handleVolumetricPippeteMode}>
            Pipette Mode
          </button>
        )
      }

      if(selectedObject.name === "volumetric-pipette" && isVolumetricPipetteMode){
          return (
          <button onClick={removeVolumetricPippeteMode}>
            Exit Pipette Mode
          </button>
        )
      }
    }
  
  }

  const handleRemovePhenopthalinPourMode=()=>{
     setIsPhenopthalinePourMode(false)
     if(selectedLesson===11.1 && lessonStep==48){
          setLessonStep(49)
     }
     if(selectedLesson===11.1 && lessonStep==61){
          setLessonStep(62)
     }
  }
  
  const renderPhenopthalineHeldButtons = ()=>{
    if(selectedObject?.name === "phenopthaline-dropper-bottle"){
      return(
        <>
         {!isPhenopthalinePourMode && (
            <button onClick={() => setIsPhenopthalinePourMode(true)}>
              Pour Mode
            </button>
          )}

          {isPhenopthalinePourMode && (
            <button onClick={() => handleRemovePhenopthalinPourMode()}>
              Exit Pour Mode
            </button>
          )}
                  <button onClick={() => keepBackOnTable(selectedObject.hand)}>
          Keep Back In  Table
        </button>  
    
        </>

      )
    }
  }

  const renderNormalBeakerTableButtons = ()=>{
    if (selectedObject?.name === "main-normal-beaker" && selectedLesson===10 && (lessonStep==107 || lessonStep===115)) {
      return (
        <button onClick={()=>{handleRemoveTubes()}}>
          Remove Tubes from Water Bath
        </button>
      )
    }

    // if(selectedObject?.name === "main-normal-beaker" && !isTutorialMode){
    //   return (
    //     <button onClick={()=>{handleRemoveTubes()}}>
    //       Remove Tubes from Water Bath
    //     </button>
    //   )
    // }
  }

  const renderConicalHeldButtons = () => {
    if (selectedObject.name === "main-Conical-Flask") {
      if (isTutorialMode) {
        if (
          selectedLesson === 11.1 &&
          (lessonStep === 51 || lessonStep==68 )&&
          !isBeakerNearClamp
        ) {
          return (
            <button onClick={handlePlaceBeaker}>
              Place Beaker
            </button>
          )
        }
        if (
          selectedLesson === 11.1 &&
          (lessonStep === 53 || lessonStep === 70)
        ) {
          return (
            <button onClick={handlePlaceBeakerRemove}>
              Remove Beaker
            </button>
          )
        }

        if (
          selectedLesson === 11.1 && lessonStep === 54) {
          return (
            <button onClick={handleCleanBeaker}>
              Clean Flask
            </button>
          )
        }
      }
    }

    return null
  }

  const renderNormalBeakerHeldButtons=()=>{
      //----------------Tutorial Mode-------------////
      if ( (selectedLesson === 8 || selectedLesson === 9) && selectedObject.name === "main-normal-beaker" && isTutorialMode) {
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
              {/* <button onClick={openFillBeakerBox}>
                Add Liquid
              </button> */}

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

        {
          lessonStep === 40 && selectedLesson ===8 && (
            <button onClick={removeThermometer}>
              Remove Thermometer
            </button>
          )
        }

        {
          lessonStep === 42 && selectedLesson ===8 && (
            <button onClick={disposeCup}>
              Dispose Cup
            </button>
          )
        }

        {
          lessonStep===28.5 && selectedLesson ===8 && (
            <button onClick={coverPolystereneCup}>
              Cover Cup
            </button>
          )

        }

        {
          lessonStep===26 && selectedLesson ===9 && (
            <button onClick={coverPolystereneCup}>
              Cover Cup
            </button>
          )

        }


      </>
    )
  }



  //-----------------Free Roam--------------////
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

        {
          isPlaceThermometer && (
            <button onClick={removeThermometer}>
              Remove Thermometer
            </button>
          )
        }

        {
          
            <button onClick={coverPolystereneCup}>
              Cover Cup
            </button>
          

        }
      </>
    )

  }


  }

  useEffect(()=>{
    console.log('isThermometerRisen:',isThermometerRisen)
  },[isThermometerRisen])

const renderThermometerHeldButtons=()=>{
    
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

        {
          isThermometerRisen && !isPlaceThermometer && selectedRightHand.name==='mainThermometer' && !isTutorialMode &&
          <button onClick={resetThermometer}>
            Reset Thermometer
          </button>
        }

       {/* //--------------TutorialBased--------------/////// */}

       {
          selectedLesson===8 && lessonStep===41 &&
          <button onClick={resetThermometer}>
            Reset Thermometer
          </button>
        }


      </>
    )   
  }
}

const renderBuretteHeldButtons = ()=>{
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
}


const renderTestubeHeldButtons = ()=>{
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

    if(selectedLesson==10 && (lessonStep==11 ||lessonStep==13 || lessonStep===16 ) && isTestTube(selectedObject.name)){
      return (
        <>
          {selectedObject?.name === "main-testube-01" && (
            <button onClick={() => labelTestube("main-testube-01")}>
              Label
            </button>
          )}

          {selectedObject?.name === "main-testube-02" && (
            <button onClick={() => labelTestube("main-testube-02")}>
              Label
            </button>
          )}


          {selectedObject?.name === "main-testube-03" && (
            <button onClick={() => labelTestube("main-testube-03")}>
              Label
            </button>
          )}
        </>
      )

    }

    if(selectedLesson===10 && (lessonStep===75 || lessonStep===77 || lessonStep===80 || lessonStep===89) && isTestTube(selectedObject.name)){
      return(
        <>
          <button onClick={()=>handleShowBung(selectedObject.name)}>
            Place Bung
          </button>       
        </>
      )

    }

    if(selectedLesson===10 && (lessonStep===108 || lessonStep==116) && isTestTube(selectedObject.name)){
      return(
        <>
          <button onClick={()=>{removeBung(selectedObject.name)}}>
            Remove Bung
          </button>       
        </>
      )

    }

     if(selectedLesson===10 && (lessonStep==83 || lessonStep===85 || lessonStep===87 || lessonStep===101  || 
      lessonStep===103 || lessonStep===105 ||lessonStep===112) && isTestTube(selectedObject.name)){
      return(
        <>
          <button onClick={placeTestubeInBeaker}>
            Place In Beaker
          </button>     
        </>
      )

    }

    if(!isTutorialMode){
      return(
        <>
          {/* <button onClick={()=>handleShowBung(selectedObject.name)}>
            Place Bung
          </button> */}

          <button onClick={()=>{keepBackOnTable(selectedObject.hand)}}>
            Keep Back On Table
          </button>

          <button onClick={placeTestubeInBeaker}>
            Place In Beaker
          </button>

          <button onClick={openFillBeakerBox}>
            Add Liquid
          </button>
              
        </>

      )
    }
}

const placeVolmetricBung = ()=>{
  if(selectedLesson===11 && lessonStep===23.5){
    setLessonStep(24)
  }
   volumetricBung.current.visible = true
}

const renderVolumetricHeldButtons = ()=>{
      if (selectedObject.name === "volumetric-flask") {
        return (
          <>
            <button
              onClick={() =>
                keepBackOnTable(selectedObject.hand)
              }
            >
              Keep Back On Table
            </button>

            <button onClick={placeVolmetricBung} >
              Place Bung
            </button>
          </>
    )
  }
}

const renderPolystereneHeldButtons=()=>{
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
}

  const renderDropperHeldButtons=()=>{
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
  }

const handlePipetteMode = ()=>{
  setIsPipetteMode(true)
  setSelectedObject(null)
}

const handleRemovePipetteMode =()=>{
  setIsPipetteMode(false)
    setSelectedObject(null)

  if(selectedLesson===10 && lessonStep ===46){
    setLessonStep(47)
  }

  if(selectedLesson===10 && lessonStep ===51){
    setLessonStep(52)
  }

  if(selectedLesson===10 && lessonStep ===56){
    setLessonStep(57)
  }

  if(selectedLesson===10 && lessonStep ===61){
    setLessonStep(62)
  }

  if(selectedLesson===10 && lessonStep ===66){
    setLessonStep(67)
  }

  if(selectedLesson===10 && lessonStep ===71){
    setLessonStep(72)
  }
}

const renderPipetteHeldButtons = () => {
  if (selectedObject?.name === "pipette") {
    return (
      <>
        <button onClick={() => keepBackOnTable(selectedObject.hand)}>
          Keep Back On Table
        </button>

        {!isPipetteMode && (
          <button onClick={handlePipetteMode}>
            Pipette Mode
          </button>
        )}

        {isPipetteMode && (
          <button onClick={handleRemovePipetteMode}>
            Exit Pipette Mode
          </button>
        )}
      </>
    )
  }
}

const renderIodobutaneHeldButtons=()=>{
   if (selectedObject?.name === "iodobutane-bottle") {
    return (
      <>
        <button onClick={() => keepBackOnTable(selectedObject.hand)}>
          Keep Back On Table
        </button>
      </>
    )
  }
}

const renderFunnelHeldButtons=()=>{
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
}


const renderHeldSpoonButtons = () => {
  if (isSpoon(selectedObject.name)) {
    if (!isTutorialMode) {
      return (
        <>
          <button onClick={toggleStirMode}>
            {isStirMode
              ? "Exit Stir Mode"
              : "Stir Mode"}
          </button>

          <button
            onClick={() =>
              keepBackOnTable(
                selectedObject.hand
              )
            }
          >
            Keep Back On Table
          </button>
        </>
      )
    }

    if (isTutorialMode && selectedLesson===12.1 && ([23,24].includes(lessonStep))) {
      return (
        <>
          <button onClick={toggleStirMode}>
            {isStirMode
              ? "Exit Stir Mode"
              : "Stir Mode"}
          </button>


        </>
      )
    }



  }

  return null
}

const renderHeldObjectButtons = () => {
  if (!selectedObject?.isHolding) return null

  const SpoonButtons = renderHeldSpoonButtons()
  if(SpoonButtons) return SpoonButtons

  const concialFlaskButtons =  renderConicalHeldButtons()
  if(concialFlaskButtons) return concialFlaskButtons

  const phenopthalineButtons = renderPhenopthalineHeldButtons()
  if(phenopthalineButtons) return phenopthalineButtons

  const volumetricButtons = renderVolumetricHeldButtons()
  if(volumetricButtons) return volumetricButtons

  const volumetricPippetteButtons = renderVolumetricPippeteHeldButtons()
  if(volumetricPippetteButtons ) return volumetricPippetteButtons 

  const normalBeakerButtons =
    renderNormalBeakerHeldButtons()

  if (normalBeakerButtons) return normalBeakerButtons

  const thermometerButtons =
    renderThermometerHeldButtons()

  if (thermometerButtons) return thermometerButtons

  const buretteButtons =
    renderBuretteHeldButtons()

  if (buretteButtons) return buretteButtons

  const testTubeButtons =
    renderTestubeHeldButtons()
  if (testTubeButtons) return testTubeButtons

  const polystyreneButtons =
    renderPolystereneHeldButtons()

  if (polystyreneButtons) return polystyreneButtons

  const dropperButtons =
    renderDropperHeldButtons()

  if (dropperButtons) return dropperButtons

  const funnelButtons =
    renderFunnelHeldButtons()

  if (funnelButtons) return funnelButtons

  const pipetteButtons = renderPipetteHeldButtons()
  if (pipetteButtons) return pipetteButtons

  const iodobutaneButtons = renderIodobutaneHeldButtons()
  if(iodobutaneButtons) return iodobutaneButtons


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
      <Html position={selectedObject.position} center
      zIndexRange={[100,0]}>
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
      multiplier={1.2}
    />

    <ClickHitbox
      modelRef={buretteClampRef}
      multiplier={1.1}    
    />

    <ClickHitbox
      modelRef={mainThermometerRef}
      multiplier={1.2}
    />

    <ClickHitbox
      modelRef={volumetricPipetteRef}
      multiplier={1.2}
    />



  </>
)
}

export default ClickObject