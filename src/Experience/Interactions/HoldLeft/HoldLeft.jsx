import { useContext, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import PouringLiquid from "../PouringLiquid/PouringLiquid"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import FillUpBeaker from "../FillUpBeaker/FillUpBeaker"
import PouringMode from "../PouringMode/PouringMode"
import StirMode from "../StirMode/StirMode"
import LitmusMode from "../LitmusMode/LitmusMode"
import FoldFilter from "../FoldFilter/FoldFilter"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import PlaceFilterFunnel from "../PlaceFilterFunnel/PlaceFilterFunnel"
import FunnelMode from "../FunnelMode/FunnelMode"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import LiquidLabels from "../../../UI/LiquidLabels/LiquidLabels"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"

const HoldLeft = ({ modeldata }) => {

  const {isFillUpBeaker,selectedLeftHand,
    fillBeakerHand,setIsPouring,isStirMode,isLitmusMode,
    selectedRightHand,setPouredFromLeft,rightBeakerFillData,
    isFilterFolded,setIsFilterFolded,isFilterInFunnel,setIsFilterInFunnel,
    isFunnelMode,setIsFunnelMode,selectedModelLeft,isDropperPlaced
  } = useContext(InteractionContext)

  const {filterFoldedPaperRef,filterPaperRef,funnelRef} = useContext(ModelContext);
  const {lessonStep,setLessonStep,isMainGuideline,setShowNormalBeakerArrow} = useContext(MainGuidelineContext)

  const {isReactionRef} = useContext(ReactionContext)

  const { camera, gl, scene } = useThree();

  useEffect(()=>{
    selectedModelLeft.current = modeldata.ref.current
  },[])

  useEffect(()=>{
    console.log('selectedModelLeft:',selectedModelLeft)
  },[selectedModelLeft])

  const defaultOffsetRef = useRef(new THREE.Vector3(-4, -0.5, -5))
  const rotationZRef = useRef(0)

  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseRef = useRef(new THREE.Vector2())
  const isDraggingRef = useRef(false)

  useEffect(()=>{
    if(lessonStep===3 && isMainGuideline){
      setLessonStep(4);
      setShowNormalBeakerArrow(false)
    }
  },[lessonStep])



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
      if (isFunnelMode) return
      if (selectedRightHand) return
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

    canvas.addEventListener("mousedown", handleMouseDown)
    // window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      // window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("wheel", handleWheel)
    }
  }, [camera, gl, modeldata, isFunnelMode, selectedRightHand])

  useEffect(() => {
    if (!modeldata?.ref?.current) return

    if (!scene.children.includes(camera)) {
      scene.add(camera)
    }

    const object = modeldata.ref.current

    camera.add(object)

    object.position.copy(defaultOffsetRef.current);
    object.rotation.set(0, 0, 0);

    if (object.name === "main-spoon") {
      object.rotation.x = Math.PI / 2
      object.rotation.z = Math.PI / 6
      object.scale.set(1, 1, 1)
    } 
    else if (
      object.name === "main-red-litmus" ||
      object.name === "main-blue-litmus"
    ) {
      object.rotation.x = Math.PI / 2
      object.scale.set(1.5, 1.5, 1.5)
    } 
    else if (
      object.name === "main-testube-01" ||
      object.name === "main-testube-02" ||
      object.name === "main-testube-03"
    ) {
      object.scale.set(1.8, 1.8, 1.8)
    } 
    else if(object.name === "main-filter-paper"){
      object.scale.set(1.3, 1.3, 1.3);
      object.rotation.x = Math.PI / 3;
      object.rotation.z = 2
    }
    else if(object.name === "main-normal-beaker"){
      object.scale.set(0.9, 0.9, 0.9);
      
    }
    else {
      object.scale.set(1, 1, 1)
    }
    
    object.visible = true
    object.frustumCulled = false
  }, [camera, scene, modeldata])

  useFrame(() => {
    if (!modeldata?.ref?.current) return

    const object = modeldata.ref.current


  })

  // useEffect(()=>{
  //   console.log("selectedLeftHand",selectedLeftHand)
  // },[selectedLeftHand])

  useEffect(()=>{
  },[isFilterInFunnel])
const isLitmus = (name) => name?.toLowerCase().includes("litmus")
  return (
    <>
      {isFillUpBeaker && fillBeakerHand === "left" && (
        <FillUpBeaker
          beakerRef={selectedLeftHand.ref}
          hand="left"
        />
      )}

      {!isStirMode &&
        !isLitmusMode &&
        !isFunnelMode &&
        selectedLeftHand &&
        selectedRightHand && (
          <PouringMode hand="left" />
      )}

      {isStirMode &&
          selectedLeftHand?.name === "main-spoon" &&
          selectedRightHand && (
            <StirMode
              spoonRef={selectedLeftHand.ref}
              beakerRef={selectedRightHand.ref}
              hand="left"
            />
      )}

      {isLitmusMode &&
      selectedLeftHand &&
      selectedRightHand &&
      isLitmus(selectedLeftHand.name) && (
        <LitmusMode
          litmusRef={selectedLeftHand.ref}
          beakerRef={selectedRightHand.ref}
          hand="left"
          beakerFillData={rightBeakerFillData}
        />
      )}

      {isFilterFolded && (
        <FoldFilter
          filterPaperRef={filterPaperRef}
          filterFoldedPaperRef={filterFoldedPaperRef}
        />
      )}

      {isFilterInFunnel &&
        selectedLeftHand?.name === "main-folded-paper" &&
        selectedRightHand?.name === "main-funnel" && (
          <PlaceFilterFunnel
            foldedFilterRef={filterFoldedPaperRef}
            funnelRef={funnelRef}
            hand={'left'}
          />
      )}

      {
        isFunnelMode  &&
        <FunnelMode beakerRef={selectedRightHand.ref} funnelRef={funnelRef} hand='left'/>
      }

      {
       !isStirMode &&  !isLitmusMode && !isDropperPlaced && isReactionRef.current===false && <LiquidLabels modelRef={modeldata.ref} hand={'left'}/>
      }

    </>
  )
}

export default HoldLeft