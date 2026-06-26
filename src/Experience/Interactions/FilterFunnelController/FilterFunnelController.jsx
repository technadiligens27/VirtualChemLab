import { useContext } from "react"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import PlaceFilterFunnel from "../PlaceFilterFunnel/PlaceFilterFunnel"

const FilterFunnelController = () => {
  const { isFilterInFunnel } = useContext(InteractionContext)

  const {
    filterFoldedPaperRef,
    funnelRef,
  } = useContext(ModelContext)

  if (!isFilterInFunnel) return null

  return (
    <PlaceFilterFunnel
      foldedFilterRef={filterFoldedPaperRef}
      funnelRef={funnelRef}
    />
  )
}

export default FilterFunnelController