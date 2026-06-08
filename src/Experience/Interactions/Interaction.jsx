import { useContext } from "react"
import ChairSlide from "./ChairSlide/ChairSlide"
import GlovesPut from "./GlovesPut/GlovesPut"
import GogglesPut from "./GogglesPut/GogglesPut"
import { ModelContext } from "../../Contexts/ModelContext/ModelContext"
import ClickObject from "./ClickBeaker/ClickBeaker"

const Interaction = () => {
  const { normalBeakerRef } = useContext(ModelContext)

  return (
    <>
      <GogglesPut />
      <ChairSlide />
      <GlovesPut />
      <ClickObject/>
    </>
  )
}

export default Interaction