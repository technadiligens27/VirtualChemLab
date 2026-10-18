
import { useContext } from 'react'
import './App.css'
import FillBeakerBox from './Experience/Interactions/FillBeakerBox/FillBeakerBox'
import MainExperience from './Experience/MainExperience/MainExperience'
import { InteractionContext } from './Contexts/InteractionContext/InteractionContext'
import MainGuidelines from './UI/MainGuidelines/MainGuidelines'
import UI from './UI/UI'
import PowderBox from './UI/PowderBox/PowderBox'

function App() {

  const {isFillBeakerBoxOpen,showPowderBox} = useContext(InteractionContext)

  return (
    <>
      <UI/>
      <MainExperience/>
      {isFillBeakerBoxOpen && <FillBeakerBox/>}
      {showPowderBox && <PowderBox/>}
    </>
  )
}

export default App
