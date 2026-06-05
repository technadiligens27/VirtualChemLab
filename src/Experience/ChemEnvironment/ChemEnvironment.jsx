import { useGLTF } from '@react-three/drei'
import { useContext, useEffect, useRef } from 'react';
import { ModelContext } from '../../Contexts/ModelContext/ModelContext';
import ChairSlide from '../Interactions/ChairSlide/ChairSlide';

const ChemEnvironment = () => {

  const {chairRef} = useContext(ModelContext)

  const { scene } = useGLTF('/VirtualChemLab.glb');

  useEffect(() => {
    chairRef.current = scene.getObjectByName('main-chair-head')

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