import { useEffect } from "react"

const FoldFilter = ({ filterPaperRef, filterFoldedPaperRef }) => {
  useEffect(() => {
    if (!filterPaperRef?.current || !filterFoldedPaperRef?.current) return

    const filterPaper = filterPaperRef.current
    const foldedPaper = filterFoldedPaperRef.current

    // Attach folded paper to same parent as filter paper
    filterPaper.parent.add(foldedPaper)

    // Copy local transform
    foldedPaper.position.copy(filterPaper.position)
    foldedPaper.scale.copy(filterPaper.scale)

    // Switch visibility
    filterPaper.visible = false
    filterPaper.rotation.x = Math.PI/5
    foldedPaper.visible = true
  }, [filterPaperRef, filterFoldedPaperRef])

  return null
}

export default FoldFilter