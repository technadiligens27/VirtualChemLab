import { useGLTF } from '@react-three/drei'
import { useContext, useEffect, useRef } from 'react';
import { ModelContext } from '../../Contexts/ModelContext/ModelContext';
import ChairSlide from '../Interactions/ChairSlide/ChairSlide';
import { saveModelStartState } from "../resetModels/resetModels.jsx"

const ChemEnvironment = () => {

  const {chairRef,gogglesRef,gloveleftRef,gloverightRef,normalBeakerRef,conicalBeakerRef,
         roundBeakerRef,graduatedBeakerRef,normalBeakerLiquidRef,conicalBeakerLiquidRef,spoonRef,
         saltRef,redLitmusRef,blueLitmusRef,testube01Ref,testube02Ref,testube03Ref,filterPaperRef,
         filterFoldedPaper,filterFoldedPaperRef,funnelRef,arrowChairRef,arrowNormalBeakerRef,
         arrowGogglesRef,arrowLeftGloveRef,arrowRightGloveRef,arrowRedLitmusRef,normalPrecipitateRef,
         arrowConicalFlaskRef,arrowSpoonRef,saltContainerRef,arrowSaltContainerRef
  } = useContext(ModelContext)

  const { scene } = useGLTF(`${import.meta.env.BASE_URL}VirtualChemLab.glb`)

  const hidePourObjects = (objectRef) => {
  if (!objectRef.current) return

  objectRef.current.traverse((child) => {
    if (child.name?.toLowerCase().includes("pour")) {
      child.visible = false
    }
  })
}

  const hidePrecipitateObjects = (root) => {
  if (!root) return

  root.traverse((child) => {
    const childName = child.name?.toLowerCase()

    if (childName?.includes("precipitate")) {
      child.visible = false
      // console.log("Precipitate hidden:", child.name)
    }
  })
}

const hideSaltBits = (root) => {
  if (!root) return

  root.traverse((child) => {
    const childName = child.name?.toLowerCase()

    if (childName?.includes("salt-bits")) {
      child.visible = false
      // console.log("Precipitate hidden:", child.name)
    }
  })
}

const hideLiquidObjects=(root)=>{
  if (!root) return

  root.traverse((child) => {
    const childName = child.name?.toLowerCase()

    if (childName?.includes("liquid")) {
      child.visible = false
      // console.log("Precipitate hidden:", child.name)
    }
  })
}


  useEffect(() => {
    chairRef.current = scene.getObjectByName('main-chair')
    gogglesRef.current = scene.getObjectByName('Goggles');
    gloveleftRef.current = scene.getObjectByName('main-glove-left');
    gloverightRef.current = scene.getObjectByName('main-glove-right');

    normalBeakerRef.current = scene.getObjectByName('main-normal-beaker');
    conicalBeakerRef.current = scene.getObjectByName('main-Conical-Flask');
    
    hidePourObjects(normalBeakerRef)
    hidePourObjects(conicalBeakerRef)

    roundBeakerRef.current = scene.getObjectByName('main-Round-bottom-flask');
    graduatedBeakerRef.current = scene.getObjectByName('main-graduated-cylinder');
    spoonRef.current = scene.getObjectByName('main-spoon');
    saltRef.current = scene.getObjectByName('main-salt')
    redLitmusRef.current = scene.getObjectByName('main-red-litmus')
    blueLitmusRef.current = scene.getObjectByName('main-blue-litmus');
    testube01Ref.current = scene.getObjectByName('main-testube-01');
    testube02Ref.current = scene.getObjectByName('main-testube-02');
    testube03Ref.current = scene.getObjectByName('main-testube-03');
    filterPaperRef.current = scene.getObjectByName('main-filter-paper');

    filterFoldedPaperRef.current = scene.getObjectByName('main-folded-paper')
    filterFoldedPaperRef.current.visible = false;

    funnelRef.current = scene.getObjectByName('main-funnel');

    normalBeakerLiquidRef.current = scene.getObjectByName('main-normal-beaker-liquid');
    if (normalBeakerLiquidRef.current) {
        normalBeakerLiquidRef.current.visible = false;
    }    
    
    conicalBeakerLiquidRef.current = scene.getObjectByName('main-Conical-Flask-liquid');
    if (conicalBeakerLiquidRef.current) {
    conicalBeakerLiquidRef.current.visible = false;
  }

  saltContainerRef.current = scene.getObjectByName('salt-container')
  
  hidePrecipitateObjects(scene)
  hideLiquidObjects(scene)
  hideSaltBits(scene)

  }, [scene])


  useEffect(() => {
    
      arrowChairRef.current = scene.getObjectByName('chair-arrow');
      arrowChairRef.current.visible = false

      arrowNormalBeakerRef.current = scene.getObjectByName('normalBeakerArrow');
      arrowNormalBeakerRef.current.visible = false;

      arrowGogglesRef.current = scene.getObjectByName('goggles-arrow');
      arrowGogglesRef.current.visible = false;

      arrowLeftGloveRef.current = scene.getObjectByName('gloves-left-arrow');
      arrowLeftGloveRef.current.visible = false;
      
      arrowRightGloveRef.current = scene.getObjectByName('gloves-right-arrow');
      arrowRightGloveRef.current.visible = false;
      
      arrowRedLitmusRef.current = scene.getObjectByName('red-litmus-arrow');
      arrowRedLitmusRef.current.visible = false;

      arrowConicalFlaskRef.current = scene.getObjectByName('conicalFlaskArrow');
      arrowConicalFlaskRef.current.visible = false

      arrowSpoonRef.current = scene.getObjectByName('spoon-arrow')
      arrowSpoonRef.current.visible = false

      arrowSaltContainerRef.current = scene.getObjectByName('salt-container-arrow');
      arrowSaltContainerRef.current.visible = false

  }, [scene])

  const hasSavedModelsRef = useRef(false)

useEffect(() => {
  if (hasSavedModelsRef.current) return

  const labModels = [
    normalBeakerRef,
    conicalBeakerRef,
    roundBeakerRef,
    graduatedBeakerRef,
    spoonRef,
    saltRef,
    redLitmusRef,
    blueLitmusRef,
    testube01Ref,
    testube02Ref,
    testube03Ref,
    filterPaperRef,
    filterFoldedPaperRef,
    funnelRef,
  ]

  labModels.forEach((modelRef) => {
    if (modelRef.current) {
      saveModelStartState(modelRef.current)
    }
  })

  hasSavedModelsRef.current = true
}, [])


  return (
    <>

      <primitive
        object={scene}
        scale={0.5}
        position={[0, 0, 0]}
      />

    </>
  )
}

export default ChemEnvironment