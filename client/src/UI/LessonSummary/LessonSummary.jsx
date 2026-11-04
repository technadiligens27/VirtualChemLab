import "./LessonSummary.css"

const LessonSummary = ({
  summaryData,
  onClose,
  onBackToLessons,
}) => {
  if (!summaryData) return null

  const {
    headerTitle,
    lessonTitle,
    description,
    lessonIcon,

    whatHappened,
    steps = [],

    keyTakeaways,
    materialsUsed,

    conclusion,
    whatsNext,

    backButtonText,
  } = summaryData

  return (
    <div className="lesson-summary-overlay">
      <div className="lesson-summary-container">

        {/* HEADER */}

        {headerTitle && (
          <div className="summary-header-container">
            <img
              src="./clipboard-icon.png"
              alt="Lesson summary"
            />

            <h1>{headerTitle}</h1>
          </div>
        )}

        <button
          className="summary-close-btn"
          onClick={onClose}
          aria-label="Close lesson summary"
        >
          ×
        </button>

        {/* TOP LEFT LESSON INFORMATION */}

        <div className="summary-lesson-intro">
          {lessonIcon && (
            <div className="summary-lesson-icon">
              <img
                src={lessonIcon}
                alt={lessonTitle || "Lesson"}
              />
            </div>
          )}

          <div className="summary-lesson-intro-content">
            {lessonTitle && (
              <h1>{lessonTitle}</h1>
            )}

            {description && (
              <p>{description}</p>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}

        <div className="summary-main-content">

          {/* LEFT COLUMN */}

          <div className="summary-left-column">

            {whatHappened && (
              <div className="summary-card what-happened-card">

                <div className="summary-card-title">
                  {whatHappened.icon && (
                    <img
                      src={whatHappened.icon}
                      alt=""
                    />
                  )}

                  {whatHappened.title && (
                    <h2>{whatHappened.title}</h2>
                  )}
                </div>

                {whatHappened.description && (
                  <p className="what-happened-description">
                    {whatHappened.description}
                  </p>
                )}

                {steps.length > 0 && (
                  <div className="summary-steps-container">
                    {steps.map((step, index) => {
                      if (!step) return null

                      return (
                        <div
                          className="summary-step-wrapper"
                          key={step.id || index}
                        >
                          <div className="summary-step">

                            {step.imgPath && (
                              <div className="summary-step-image">
                                <img
                                  src={step.imgPath}
                                  alt={
                                    step.alt ||
                                    step.text ||
                                    `Step ${index + 1}`
                                  }
                                />
                              </div>
                            )}

                            <div className="summary-step-description">
                              <span className="summary-step-number">
                                {step.number || index + 1}
                              </span>

                              {step.text && (
                                <p>{step.text}</p>
                              )}
                            </div>
                          </div>

                          {index < steps.length - 1 && (
                            <div className="summary-step-arrow">
                              →
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {conclusion && (
              <div className="summary-bottom-card conclusion-card">

                {conclusion.icon && (
                  <div className="summary-bottom-icon conclusion-icon">
                    <img
                      src={conclusion.icon}
                      alt=""
                    />
                  </div>
                )}

                <div className="summary-bottom-content">
                  {conclusion.title && (
                    <h2>{conclusion.title}</h2>
                  )}

                  {conclusion.text && (
                    <p>{conclusion.text}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}

          <div className="summary-right-column">

            {keyTakeaways &&
              (keyTakeaways.title ||
                keyTakeaways.icon ||
                keyTakeaways.items?.length > 0) && (
                <div className="summary-card key-takeaways-card">

                  <div className="summary-card-title green-title">
                    {keyTakeaways.icon && (
                      <img
                        src={keyTakeaways.icon}
                        alt=""
                      />
                    )}

                    {keyTakeaways.title && (
                      <h2>{keyTakeaways.title}</h2>
                    )}
                  </div>

                  {keyTakeaways.items?.length > 0 && (
                    <div className="takeaways-list">
                      {keyTakeaways.items.map((item, index) => (
                        item && (
                          <div
                            className="takeaway-item"
                            key={index}
                          >
                            <span className="takeaway-check">
                              ✓
                            </span>

                            <p>{item}</p>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              )}

            {materialsUsed &&
              (materialsUsed.title ||
                materialsUsed.icon ||
                materialsUsed.items?.length > 0) && (
                <div className="summary-card materials-used-card">

                  <div className="summary-card-title">
                    {materialsUsed.icon && (
                      <img
                        src={materialsUsed.icon}
                        alt=""
                      />
                    )}

                    {materialsUsed.title && (
                      <h2>{materialsUsed.title}</h2>
                    )}
                  </div>

                  {materialsUsed.items?.length > 0 && (
                    <div className="materials-used-list">
                      {materialsUsed.items.map((item, index) => {
                        if (!item) return null

                        return (
                          <div
                            className="material-used-item"
                            key={item.id || index}
                          >
                            {item.imgPath && (
                              <img
                                src={item.imgPath}
                                alt={
                                  item.alt ||
                                  item.name ||
                                  "Material"
                                }
                              />
                            )}

                            {item.name && (
                              <p>{item.name}</p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

            {whatsNext && (
              <div className="summary-bottom-card whats-next-card">

                {whatsNext.icon && (
                  <div className="summary-bottom-icon whats-next-icon">
                    <img
                      src={whatsNext.icon}
                      alt=""
                    />
                  </div>
                )}

                <div className="summary-bottom-content">
                  {whatsNext.title && (
                    <h2>{whatsNext.title}</h2>
                  )}

                  {whatsNext.text && (
                    <p>{whatsNext.text}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM BUTTON */}

        {backButtonText && (
          <div className="summary-back-btn-container">
            <button onClick={onBackToLessons}>
              {backButtonText}

              <span>📖</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LessonSummary