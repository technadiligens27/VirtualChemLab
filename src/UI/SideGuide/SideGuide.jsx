import "./SideGuide.css"

const controls = [
  {
    icon: "./ArrowMovement.png",
    text: "Look Around",
    className: "look-guide",
  },
  {
    icon: "./w-icon.png",
    text: "Move Forward",
  },
  {
    icon: "./A-icon.png",
    text: "Move Left",
  },
  {
    icon: "./D-icon.png",
    text: "Move Right",
  },
  {
    icon: "./S-icon.png",
    text: "Move Back",
  },
]

const SideGuide = () => {
  return (
    <aside className="side-guide-container">
      <h2 className="side-guide-title">
        Controls
      </h2>

      <div className="side-guide-list">
        {controls.map((control) => (
          <div
            className={`side-guide ${control.className || ""}`}
            key={control.text}
          >
            <div className="side-guide-icon">
              <img
                src={control.icon}
                alt={control.text}
              />
            </div>

            <p>{control.text}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SideGuide