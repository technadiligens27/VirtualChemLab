import { useGLTF } from '@react-three/drei'
import { useContext, useEffect, useRef } from 'react';
import { ModelContext } from '../../Contexts/ModelContext/ModelContext';
import ChairSlide from '../Interactions/ChairSlide/ChairSlide';

const ChemEnvironment = () => {

  const {chairRef,gogglesRef,gloveleftRef,gloverightRef,normalBeakerRef,conicalBeakerRef,
         roundBeakerRef,graduatedBeakerRef
  } = useContext(ModelContext)

  const { scene } = useGLTF('/VirtualChemLab.glb');

  useEffect(() => {
    chairRef.current = scene.getObjectByName('main-chair-head')
    gogglesRef.current = scene.getObjectByName('Goggles');
    gloveleftRef.current = scene.getObjectByName('main-glove-left');
    gloverightRef.current = scene.getObjectByName('main-glove-right');
    normalBeakerRef.current = scene.getObjectByName('main-normal-beaker');
    conicalBeakerRef.current = scene.getObjectByName('main-Conical-Flask');
    roundBeakerRef.current = scene.getObjectByName('main-Round-bottom-flask');
    graduatedBeakerRef.current = scene.getObjectByName('main-graduated-cylinder');

  }, [scene])

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