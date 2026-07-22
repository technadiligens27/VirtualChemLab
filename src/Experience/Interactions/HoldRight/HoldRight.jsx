import { useContext, useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

import PouringMode from "../PouringMode/PouringMode"
import FillUpBeaker from "../FillUpBeaker/FillUpBeaker"
import StirMode from "../StirMode/StirMode"
import LitmusMode from "../LitmusMode/LitmusMode"
import FoldFilter from "../FoldFilter/FoldFilter"
import PlaceFilterFunnel from "../PlaceFilterFunnel/PlaceFilterFunnel"
import FunnelMode from "../FunnelMode/FunnelMode"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import LiquidLabels from "../../../UI/LiquidLabels/LiquidLabels"
import { TransformControls } from "@react-three/drei"
import DropperPlaced from "../DropperPlaced/DropperPlaced"
import DropperScrollAnimation from "../DropperScrollAnimation/DropperScrollAnimation"
import { ReactionContext } from "../../../Contexts/ReactionContext/ReactionContext"
const HoldRight = ({ modeldata }) => {
  const {
    isFillUpBeaker,
    fillBeakerHand,

    selectedRightHand,
    selectedLeftHand,

    isStirMode,
    isLitmusMode,

    leftBeakerFillData,

    isFilterFolded,
    isFilterInFunnel,

    isFunnelMode,
    selectedModelRight,isDropperPlaced,
    isDropperFilled
  } = useContext(InteractionContext)

  const {
    filterFoldedPaperRef,
    filterPaperRef,
    funnelRef,
  } = useContext(ModelContext)

  const {lessonStep,isMainGuideline,setLessonStep,selectedLesson,isTutorialMode} = useContext(MainGuidelineContext)

  const {isReactionRef} = useContext(ReactionContext)


  const { camera, gl, scene } = useThree()
const transformControlsRef = useRef()
  useEffect(()=>{
    selectedModelRight.current = modeldata.ref.current
  },[])

  const defaultOffsetRef = useRef(new THREE.Vector3(4.5, -0.5, -5))
  const rotationZRef = useRef(0)

  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseRef = useRef(new THREE.Vector2())

  const isDraggingRef = useRef(false)
  const previousMouseRef = useRef({ x: 0, y: 0 })

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
      previousMouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleWheel = (e) => {
      // When Funnel Mode is active, wheel should only control FunnelMode Y height
      if (isFunnelMode) return
      if(selectedRightHand) return

      e.preventDefault()

      const maxRotation = Math.PI / 5

      if (e.deltaY > 0) {
        rotationZRef.current = Math.min(
          rotationZRef.current + 0.15,
          maxRotation
        )
      } else {
        rotationZRef.current = Math.max(
          rotationZRef.current - 0.15,
          -maxRotation
        )
      }
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("wheel", handleWheel, {
      passive: false,
    })

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
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

    object.position.copy(defaultOffsetRef.current)
    object.rotation.set(0, 0, 0)
    
      if (object.name === "main-normal-beaker") {
        object.rotation.y = Math.PI // 180 degrees
      }
    if (object.name === "main-spoon") {
      object.rotation.set(
        -1.4285088984579244,
        -0.30110700753116976,
        -1.0212733683935664
      )
      object.scale.set(1, 1, 1);
      object.position.x =3.5
    } else if (
      object.name === "main-red-litmus" ||
      object.name === "main-blue-litmus"
    ) {
      object.rotation.x = Math.PI / 2
      object.scale.set(1.5, 1.5, 1.5)
    } else if (
      object.name === "main-testube-01" ||
      object.name === "main-testube-02" ||
      object.name === "main-testube-03"
    ) {
      object.scale.set(1.8, 1.8, 1.8)
    } else if (object.name === "main-filter-paper") {
      object.scale.set(1.3, 1.3, 1.3)
      object.rotation.x = Math.PI / 3
      object.rotation.z = -2
    } else {
      object.scale.set(1, 1, 1)
    }

    object.visible = true
    object.frustumCulled = false
  }, [camera, scene, modeldata])

 
  const isLitmus = (name) => name?.toLowerCase().includes("litmus");

  useEffect(()=>{
    if(lessonStep===6 && isMainGuideline){
      setLessonStep(7)
    }
  },[lessonStep,isMainGuideline])

  // useEffect(()=>{
  //   if(lessonStep===6 && selectedLesson===7 && isTutorialMode){
  //     setLessonStep(7)
  //   }
  // })

  return (
    <>
      {isFillUpBeaker && fillBeakerHand === "right" && selectedRightHand && (
        <FillUpBeaker
          beakerRef={selectedRightHand.ref}
          hand="right"
        />
      )}

      {!isStirMode &&
        !isLitmusMode &&
        !isFunnelMode &&
        selectedLeftHand &&
        selectedRightHand && (
          <PouringMode hand="right" />
        )}

      {isStirMode &&
        selectedRightHand?.name === "main-spoon" &&
        selectedLeftHand && (
          <StirMode
            spoonRef={selectedRightHand.ref}
            beakerRef={selectedLeftHand.ref}
            hand="right"
          />
      )}

      {isLitmusMode &&
        selectedLeftHand &&
        selectedRightHand &&
        isLitmus(selectedRightHand.name) && (
          <LitmusMode
            litmusRef={selectedRightHand.ref}
            beakerRef={selectedLeftHand.ref}
            hand="right"
            beakerFillData={leftBeakerFillData}
          />
        )}

      {isFilterFolded && (
        <FoldFilter
          filterPaperRef={filterPaperRef}
          filterFoldedPaperRef={filterFoldedPaperRef}
        />
      )}

      {isFilterInFunnel &&
        selectedRightHand?.name === "main-folded-paper" &&
        selectedLeftHand?.name === "main-funnel" && (
          <PlaceFilterFunnel
            foldedFilterRef={filterFoldedPaperRef}
            funnelRef={funnelRef}
            hand="right"
          />
        )}

      {
        isFunnelMode  &&
        <FunnelMode beakerRef={selectedLeftHand.ref} funnelRef={funnelRef} hand='right'/>
      }

      {
        isDropperPlaced && <DropperPlaced hand='right' beakerRef={selectedLeftHand.ref}/>
      }

      {(selectedRightHand?.name === "main-dropper" || isDropperPlaced) && <DropperScrollAnimation hand={'right'}/>}

      {
       !isDropperFilled &&!isStirMode &&  !isLitmusMode && !isDropperPlaced && isReactionRef.current ===false &&  <LiquidLabels modelRef={modeldata.ref} hand={'right'}/>
      }
    </>
  )
}

export default HoldRight