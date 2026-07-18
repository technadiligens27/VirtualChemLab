import "./SideGuide.css"

const SideGuide = () => {
  return (
    <div className="side-guide-container">
      <div className="side-guide look-guide">
        <img src="./ArrowMovement.png" alt="" />
        <p>Look around</p>
      </div>

      <div className="side-guide">
        <img src="./w-icon.png" alt="" />
        <p>Move Forward</p>
      </div>

      <div className="side-guide">
        <img src="./A-icon.png" alt="" />
        <p>Move Left</p>
      </div>

      <div className="side-guide">
        <img src="./D-icon.png" alt="" />
        <p>Move Right</p>
      </div>

      <div className="side-guide">
        <img src="./S-icon.png" alt="" />
        <p>Move Back</p>
      </div>

      
    </div>
  )
}

export default SideGuide