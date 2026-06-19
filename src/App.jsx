
import { useContext } from 'react'
import './App.css'
import FillBeakerBox from './Experience/Interactions/FillBeakerBox/FillBeakerBox'
import MainExperience from './Experience/MainExperience/MainExperience'
import { InteractionContext } from './Contexts/InteractionContext/InteractionContext'

function App() {

  const {isFillBeakerBoxOpen} = useContext(InteractionContext)

  return (
    <>
      <MainExperience/>
      {isFillBeakerBoxOpen && <FillBeakerBox/>}
    </>
  )
}

export default App
