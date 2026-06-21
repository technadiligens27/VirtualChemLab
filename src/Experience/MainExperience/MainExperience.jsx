import { Canvas } from '@react-three/fiber'
import { Perf } from "r3f-perf";
import ChemEnvironment from '../ChemEnvironment/ChemEnvironment'
import { Environment, OrbitControls, PointerLockControls } from '@react-three/drei'
import PlayerController from '../PlayerController/PlayerController'
import ChairSlide from '../Interactions/ChairSlide/ChairSlide'
import GogglesPut from '../Interactions/GogglesPut/GogglesPut'
import { useContext, useEffect } from 'react'
import { InteractionContext } from '../../Contexts/InteractionContext/InteractionContext'
import { ModelContext } from '../../Contexts/ModelContext/ModelContext'
import Interaction from '../Interactions/Interaction'
import FillBeakerBox from '../Interactions/FillBeakerBox/FillBeakerBox'

const MainExperience = () => {

  const {hasSat} = useContext(InteractionContext);
  const {isSitting} = useContext(ModelContext)
  
  useEffect(() => {
    if (!isSitting) return

    if (document.pointerLockElement) {
      document.exitPointerLock()
    }
  }, [isSitting])


  return (
    <Canvas
      camera={{
        fov: 75,
        near: 0.1,
        far: 100,
        position: [-5, 0,45]
      }}
      gl={{
        antialias: true,
      }}
    //   dpr={[1, 2]}
    >
      <ambientLight intensity={1} />
      <ChemEnvironment/>
      {/* <OrbitControls/> */}
      <Environment preset='sunset'/>
      <PlayerController/>

      {!isSitting && <PointerLockControls/>}
      {/* <PointerLockControls/> */}

      <Interaction/>
      <Perf position="top-right" />

    </Canvas>
  )
}

export default MainExperience