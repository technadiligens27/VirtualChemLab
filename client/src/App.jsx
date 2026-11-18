
import { useContext } from 'react'
import './App.css'
import FillBeakerBox from './Experience/Interactions/FillBeakerBox/FillBeakerBox'
import MainExperience from './Experience/MainExperience/MainExperience'
import { InteractionContext } from './Contexts/InteractionContext/InteractionContext'
import UI from './UI/UI'
import PowderBox from './UI/PowderBox/PowderBox'
import { useProgress } from '@react-three/drei'
import Loader01 from './UI/Loader01/Loader01'

function App() {

  const {isFillBeakerBoxOpen,showPowderBox} = useContext(InteractionContext)
  const {active,progress} = useProgress();

  const isLoading = (active || progress < 100)

  return (
    <>
  {isLoading && <Loader01 />}

    <div className={isLoading ? "experience-loading" : "experience-loaded"}>
          <MainExperience/>
    </div>

      {!isLoading && (
        <>
          <UI />

          {isFillBeakerBoxOpen && (
            <FillBeakerBox />
          )}

          {showPowderBox && (
            <PowderBox />
          )}
        </>
      )}
    </>

  )
}

export default App
