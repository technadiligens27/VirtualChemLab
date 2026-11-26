import "./MobileLookIndicator.css"

const MobileLookIndicator = () => {

  return (
    <div className="mobile-look-indicator">

      <div className="mobile-look-circle">

        <span className="look-arrow look-up">↑</span>

        <span className="look-arrow look-down">↓</span>

        <span className="look-arrow look-left">←</span>

        <span className="look-arrow look-right">→</span>

        <div className="look-center" />

      </div>

      <p className="mobile-look-label">
        Drag to look
      </p>

    </div>
  )
}

export default MobileLookIndicator