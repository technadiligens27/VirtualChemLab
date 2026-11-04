import "./EnthalpyLessonOverview.css"

const EnthalpyLessonOverview = ({
  reactionData,
  onStartLesson,
}) => {
  if (!reactionData) return null

  const {
    topTitle,
    label,
    title,
    reactionType,
    reactionIcon,
    equation = [],
    noticeTitle,
    notices = [],
    informationTitle,
    information = [],
    importantTitle,
    importantText,
    buttonText,
  } = reactionData

  return (
    <div className="reaction-one-overlay">
      <div className="reaction-one-container">
        <div className="reaction-one-top-title">
          <h1>{topTitle}</h1>
        </div>

        <div className="reaction-one-content">
          <div className="reaction-one-main">
            <div className="reaction-one-heading">
              <p className="reaction-one-label">
                {label}
              </p>

              <h1>{title}</h1>
            </div>

            <div className="reaction-one-type">
              <div className="reaction-one-fire-icon">
                {reactionIcon}
              </div>

              <span>{reactionType}</span>
            </div>

            <div className="reaction-one-equation">
              <div className="reaction-one-flask-icon">
                ⚗
              </div>

              <div className="reaction-one-equation-text">
                {equation.map((equationPart) => (
                  <span
                    key={equationPart.id}
                    className={
                      equationPart.className || ""
                    }
                  >
                    {equationPart.content}
                  </span>
                ))}
              </div>
            </div>

            <div className="reaction-one-notice">
              <div className="reaction-one-section-heading">
                <div className="reaction-one-eye-icon">
                  ◉
                </div>

                <h2>{noticeTitle}</h2>

                <div className="reaction-one-heading-line" />
              </div>

              <div className="reaction-one-notice-list">
                {notices.map((notice, index) => (
                  <div
                    className="reaction-one-notice-item"
                    key={`${notice}-${index}`}
                  >
                    <span className="reaction-one-check">
                      ✓
                    </span>

                    <p>{notice}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="reaction-one-information">
            <div className="reaction-one-information-header">
              <div className="reaction-one-information-icon">
                i
              </div>

              <h2>{informationTitle}</h2>
            </div>

            <div className="reaction-one-information-content">
              {information.map((paragraph, index) => (
                <p key={`${paragraph}-${index}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="reaction-one-footer">
          <div className="reaction-one-important">
            <div className="reaction-one-warning-icon">
              !
            </div>

            <p>
              <strong>{importantTitle}</strong>

              <span>{importantText}</span>
            </p>
          </div>

          <button
            className="reaction-one-next-button"
            type="button"
            onClick={onStartLesson}
          >
            <span>{buttonText}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default EnthalpyLessonOverview