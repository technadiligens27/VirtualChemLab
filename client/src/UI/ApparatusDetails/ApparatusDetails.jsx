import "./ApparatusDetails.css"

const ApparatusDetails = ({
  apparatus,

  onClose,
}) => {
  if (!apparatus) {
    return null
  }

  return (
    <div className="apparatus-details-overlay">
      <section className="apparatus-details-container">
        <button
          type="button"
          className="apparatus-details-close"
          onClick={onClose}
          aria-label="Close apparatus details"
        >
          ×
        </button>

        <div className="apparatus-details-title-tab">
          <h1>
            Apparatus Details
          </h1>
        </div>

        <div className="apparatus-details-content">
          <div className="apparatus-details-image-card">
            <div className="apparatus-details-number">
              {apparatus.number}
            </div>

            <img
              src={apparatus.imagePath}
              alt={apparatus.name}
            />
          </div>

          <div className="apparatus-details-information">
            <h2>
              {apparatus.name}
            </h2>

            <div className="apparatus-details-divider" />

            <div className="apparatus-details-section">
              <h3>
                What is it used for?
              </h3>

              <p>
                {apparatus.description ||
                  apparatus.text ||
                  "This apparatus is used during laboratory experiments."}
              </p>
            </div>

            {apparatus.uses?.length > 0 && (
              <div className="apparatus-details-section">
                <h3>
                  Key Uses
                </h3>

                <ul>
                  {apparatus.uses.map(
                    (use) => (
                      <li key={use}>
                        <span>
                          ✓
                        </span>

                        {use}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            <button
              type="button"
              className="apparatus-details-back-button"
              onClick={onClose}
            >
              Back to Apparatus

              <span>
                ‹
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ApparatusDetails