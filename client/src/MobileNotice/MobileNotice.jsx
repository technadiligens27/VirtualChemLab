import "./MobileNotice.css"

const previewUrl = `${import.meta.env.BASE_URL}skillmate3d-preview.mp4`

const MobileNotice = () => {
  return (
    <div className="mobile-notice-container">
      <div className="mobile-notice-inner-container">
        <h1>
          <span className="mobile-span">Your Lab</span> Awaits!!
        </h1>

        <p className="mobile-notice-description">
          Open SkillMate3D on a laptop or desktop to try the interactive 3D demo
          and run the experiments yourself.
        </p>

        <figure className="mobile-notice-preview">
          <video
            className="mobile-notice-video"
            src={previewUrl}
            controls
            playsInline
            preload="none"
            aria-label="SkillMate3D virtual chemistry lab preview"
          >
            <a href={previewUrl}>Open the lab preview video</a>
          </video>

          <figcaption className="mobile-notice-caption">
            Watch the preview above to see SkillMate3D in action.
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

export default MobileNotice