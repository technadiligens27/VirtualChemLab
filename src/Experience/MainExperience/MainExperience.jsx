import { Canvas } from '@react-three/fiber'
import ChemEnvironment from '../ChemEnvironment/ChemEnvironment'
import { Environment, OrbitControls, PointerLockControls } from '@react-three/drei'
import PlayerController from '../PlayerController/PlayerController'
import ChairSlide from '../Interactions/ChairSlide/ChairSlide'
import GogglesPut from '../Interactions/GogglesPut/GogglesPut'

const MainExperience = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [-5, 0,25]
      }}
      gl={{
        antialias: true,
      }}
    //   dpr={[1, 2]}
    >
      <ambientLight intensity={1.5} />
      <ChemEnvironment/>
      {/* <OrbitControls/> */}
      <Environment preset='city'/>
      <PlayerController/>
      <PointerLockControls/>

      <ChairSlide/>
      <GogglesPut/>


    </Canvas>
  )
}

export default MainExperience