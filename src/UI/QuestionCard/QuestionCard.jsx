import {
  useState,
} from "react"

import "./QuestionCard.css"

const QuestionCard = ({
  questionSetTitle,

  questionNumber,

  question,

  answers,

  correctAnswer,

  hintText,

  submitButtonText = "Submit Answer",

  continueButtonText = "Continue",

  correctMessage = "Correct! Well done.",

  incorrectMessage =
    "Not quite. The correct answer is highlighted.",

  onContinue,
}) => {
  const [
    selectedAnswer,
    setSelectedAnswer,
  ] = useState(null)

  const [
    isSubmitted,
    setIsSubmitted,
  ] = useState(false)

  // ==========================================
  // SELECT ANSWER
  // ==========================================

  const handleAnswerClick = (
    answerId
  ) => {
    if (isSubmitted) return

    setSelectedAnswer(
      answerId
    )
  }

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = () => {
    if (!selectedAnswer) {
      return
    }

    setIsSubmitted(true)
  }

  // ==========================================
  // CONTINUE
  // ==========================================

  const handleContinue = () => {
    if (onContinue) {
      onContinue()
    }
  }

  // ==========================================
  // ANSWER CLASS
  // ==========================================

  const getAnswerClass = (
    answerId
  ) => {
    let className =
      "question-card-answer"

    if (
      selectedAnswer ===
        answerId &&
      !isSubmitted
    ) {
      className +=
        " question-card-answer-selected"
    }

    if (isSubmitted) {
      if (
        answerId ===
        correctAnswer
      ) {
        className +=
          " question-card-answer-correct"
      }

      else if (
        answerId ===
          selectedAnswer &&
        selectedAnswer !==
          correctAnswer
      ) {
        className +=
          " question-card-answer-wrong"
      }
    }

    return className
  }

  const isCorrect =
    selectedAnswer ===
    correctAnswer

  return (
    <div className="question-card-overlay">

      <div
        className="question-card-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="question-card-set-title"
      >

        {/* =====================================
            TOP TITLE
        ===================================== */}

        <div className="question-card-top-title">

          <h1>
            QUESTION TIME
          </h1>

        </div>

        {/* =====================================
            CONTENT
        ===================================== */}

        <div className="question-card-content">

          {/* ===================================
              SET TITLE
          =================================== */}

          <h2
            id="question-card-set-title"
            className="question-card-set-title"
          >
            {questionSetTitle}
          </h2>

          {/* ===================================
              QUESTION
          =================================== */}

          <div className="question-card-question">

            <div
              className="question-card-number"
              aria-hidden="true"
            >
              Q{questionNumber}.
            </div>

            <p>
              {question}
            </p>

          </div>

          {/* ===================================
              DIVIDER
          =================================== */}

          <div
            className="question-card-divider"
            aria-hidden="true"
          >

            <span />

            <div />

            <span />

          </div>

          {/* ===================================
              ANSWERS
          =================================== */}

          <div
            className="question-card-answers"
            role="radiogroup"
            aria-labelledby="question-card-set-title"
          >

            {answers.map(
              (answer) => {
                const isThisCorrect =
                  answer.id ===
                  correctAnswer

                const isThisSelected =
                  selectedAnswer ===
                  answer.id

                return (
                  <button
                    key={
                      answer.id
                    }
                    type="button"
                    role="radio"
                    aria-checked={
                      isThisSelected
                    }
                    disabled={
                      isSubmitted
                    }
                    className={
                      getAnswerClass(
                        answer.id
                      )
                    }
                    onClick={() =>
                      handleAnswerClick(
                        answer.id
                      )
                    }
                  >

                    <div
                      className="question-card-answer-letter"
                      aria-hidden="true"
                    >
                      {answer.id}
                    </div>

                    <div className="question-card-answer-text">
                      {answer.text}
                    </div>

                    {/* =================================
                        CORRECT
                    ================================= */}

                    {isSubmitted &&
                      isThisCorrect && (
                        <div className="question-card-result-label question-card-result-correct">

                          ✓ Correct

                        </div>
                      )}

                    {/* =================================
                        WRONG
                    ================================= */}

                    {isSubmitted &&
                      isThisSelected &&
                      !isThisCorrect && (
                        <div className="question-card-result-label question-card-result-wrong">

                          ✕ Incorrect

                        </div>
                      )}

                  </button>
                )
              }
            )}

          </div>

          {/* ===================================
              FOOTER
          =================================== */}

          <div className="question-card-footer">

            <div className="question-card-hint">

              <p
                aria-live="polite"
              >
                {
                  isSubmitted
                    ? isCorrect
                      ? correctMessage
                      : incorrectMessage
                    : hintText
                }
              </p>

            </div>

            {/* =================================
                SUBMIT
            ================================= */}

            {!isSubmitted ? (
              <button
                type="button"
                className="question-card-submit"
                disabled={
                  !selectedAnswer
                }
                onClick={
                  handleSubmit
                }
              >

                {
                  submitButtonText
                }

                <span
                  aria-hidden="true"
                >
                  ❯
                </span>

              </button>
            ) : (

              /* =================================
                  CONTINUE
              ================================= */

              <button
                type="button"
                className="question-card-submit"
                onClick={
                  handleContinue
                }
              >

                {
                  continueButtonText
                }

                <span
                  aria-hidden="true"
                >
                  ❯
                </span>

              </button>

            )}

          </div>

        </div>

      </div>

    </div>
  )
}

export default QuestionCard