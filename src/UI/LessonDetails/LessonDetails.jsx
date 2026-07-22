import "./LessonDetails.css"

const LessonDetails = ({
  lessonData,
  onContinue,
}) => {
  if (!lessonData) return null

  const {
    headerTitle,
    lessonTitle,
    description,
    lessonImages = [],
    hint,
    objectives,
    materials,
    procedure,
    continueButtonText,
  } = lessonData

  return (
    <div className="lesson-details-overlay">
      <div className="lesson-details-container">

        {headerTitle && (
          <div className="lesson-header-container">
            <h1>{headerTitle}</h1>
          </div>
        )}

        <div className="lesson-details-left">
          <div className="lesson-details-overview">

            {(lessonTitle || description) && (
              <div className="lesson-details-content">
                {lessonTitle && (
                  <h1 className="lesson-sub-title">
                    {lessonTitle}
                  </h1>
                )}

                {description && <p>{description}</p>}
              </div>
            )}

            {lessonImages.length > 0 && (
              <div className="lesson-images-container">
                {lessonImages.map((image, index) => {
                  if (!image) return null

                  return (
                    <div
                      className="lesson-images"
                      key={image.id || index}
                    >
                      {image.imgPath && (
                        <img
                          src={image.imgPath}
                          alt={image.alt || image.label || "Lesson material"}
                        />
                      )}

                      {image.label && (
                        <button>{image.label}</button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {hint && (hint.imgPath || hint.text) && (
              <div className="lesson-hint-container">
                {hint.imgPath && (
                  <img
                    src={hint.imgPath}
                    alt={hint.alt || "Lesson hint"}
                  />
                )}

                {hint.text && <p>{hint.text}</p>}
              </div>
            )}
          </div>

          {continueButtonText && (
            <div className="lesson-detail-btn-container">
              <button
                className="continue-btn"
                onClick={onContinue}
              >
                {continueButtonText}
              </button>
            </div>
          )}
        </div>

        <div className="lesson-details-right">

          {objectives &&
            (objectives.title ||
              objectives.imgPath ||
              objectives.items?.length > 0) && (
              <div className="lesson-objectives-container">
                <div className="">
                  {objectives.imgPath && (
                    <img
                      src={objectives.imgPath}
                      alt={objectives.alt || "Objectives"}
                    />
                  )}

                  {objectives.title && (
                    <h1 className="lesson-sub-title">
                      {objectives.title}
                    </h1>
                  )}

                  {objectives.items?.length > 0 && (
                    <div className="objective-container">
                      {objectives.items.map((item, index) => (
                        item && <p key={index}>{item}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

          {materials &&
            (materials.title ||
              materials.imgPath ||
              materials.items?.length > 0) && (
              <div className="lesson-objectives-container lesson-materials-container">
                <div className="">
                  {materials.imgPath && (
                    <img
                      src={materials.imgPath}
                      alt={materials.alt || "Materials"}
                    />
                  )}

                  {materials.title && (
                    <h1 className="lesson-sub-title">
                      {materials.title}
                    </h1>
                  )}

                  {materials.items?.length > 0 && (
                    <div className="objective-container">
                      {materials.items.map((item, index) => (
                        item && <p key={index}>{item}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

          {procedure &&
            (procedure.title ||
              procedure.imgPath ||
              procedure.items?.length > 0) && (
              <div className="lesson-objectives-container lesson-procedure-container">
                <div className="">
                  {procedure.imgPath && (
                    <img
                      src={procedure.imgPath}
                      alt={procedure.alt || "Procedure"}
                    />
                  )}

                  {procedure.title && (
                    <h1 className="lesson-sub-title">
                      {procedure.title}
                    </h1>
                  )}

                  {procedure.items?.length > 0 && (
                    <div className="objective-container procedure-container">
                      {procedure.items.map((item, index) => (
                        item && <p key={index}>{item}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

        </div>
      </div>
    </div>
  )
}

export default LessonDetails