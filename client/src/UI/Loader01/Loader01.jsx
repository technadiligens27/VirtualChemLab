import "./Loader01.css"

const Loader01 = () => {
  return (
    <div className="loader01-wrapper">
      <button
        className="loader01"
        type="button"
        disabled
      >
        <span
          role="status"
          className="loader01-spinner"
        >
          <span className="loader01-screen-reader">
            Loading...
          </span>
        </span>

        Loading 3D Environment
      </button>
    </div>
  )
}

export default Loader01