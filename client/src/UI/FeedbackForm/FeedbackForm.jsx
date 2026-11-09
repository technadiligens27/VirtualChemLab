import {
  useContext,
  useState,
} from "react"

import axios from "axios"

import "./FeedbackForm.css"

import {
  InteractionContext,
} from "../../Contexts/InteractionContext/InteractionContext"

import {
  MainGuidelineContext,
} from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  useResetLesson,
} from "../ResetLessonButton/ResetLessonButton"

const FeedbackForm = ({
  title = "Help Us Improve",

  onSubmit,

  onSkip,
}) => {
  const {
    feedbackAnswers,
    setFeedbackAnswers,
    setShowFeedBackForm,
  } = useContext(
    InteractionContext
  )

  const {
    selectedLesson,
  } = useContext(
    MainGuidelineContext
  )

  const resetLesson =
    useResetLesson()

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false)

  const feedbackQuestions = [
    {
      id: "easyToFollow",

      question:
        "Was the lesson easy to follow?",
    },

    {
      id: "instructionsClear",

      question:
        "Did the instructions make sense?",
    },

    {
      id: "interactionsWorked",

      question:
        "Did the 3D interactions work well?",
    },

    {
      id: "controlsEasy",

      question:
        "Were the controls easy to use?",
    },

    {
      id: "designGood",

      question:
        "Was the lesson design visually appealing?",
    },

    {
      id: "supportedStudies",

      question:
        "Do you think this virtual lab would support your studies?",
    },
  ]

  const handleAnswerChange = (
    questionId,
    answer
  ) => {
    setFeedbackAnswers(
      (previousAnswers) => ({
        ...previousAnswers,

        [questionId]: answer,
      })
    )
  }

  const handleCommentChange = (
    event
  ) => {
    setFeedbackAnswers(
      (previousAnswers) => ({
        ...previousAnswers,

        comments: event.target.value,
      })
    )
  }

  const finishFeedback = (
    completedFeedback
  ) => {
    onSubmit?.(completedFeedback)

    setFeedbackAnswers({})

    setShowFeedBackForm(false)

    resetLesson()
  }

  const handleSkip = () => {
    onSkip?.()

    setFeedbackAnswers({})

    setShowFeedBackForm(false)

    resetLesson()
  }

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault()

    const answers = {}

    feedbackQuestions.forEach(
      (feedbackQuestion) => {
        answers[feedbackQuestion.id] =
          feedbackAnswers?.[
            feedbackQuestion.id
          ] || ""
      }
    )

    const completedFeedback = {
      selectedLesson,

      answers,

      comments:
        feedbackAnswers?.comments || "",
    }

    try {
      setIsSubmitting(true)

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/feedback`,
        completedFeedback,
        {
          withCredentials: true,
        }
      )

      console.log(
        "Feedback saved:",
        response.data
      )

      finishFeedback(completedFeedback)
    } catch (error) {
      console.error(
        error.response?.data?.message ||
          "Could not submit feedback."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="feedback-form-overlay">
      <section className="feedback-form-container">
        <div className="feedback-form-title-tab">
          <h1>
            {title}
          </h1>
        </div>

        <form
          className="feedback-form-content"
          onSubmit={handleSubmit}
        >
          <div className="feedback-form-heading">
            <p>
              Quick Feedback
            </p>

            <h2>
              Tell us about your experience
            </h2>

            <span>
              Your feedback helps us improve
              future chemistry lessons.
            </span>
          </div>

          <div className="feedback-form-main">
            <div className="feedback-question-list">
              {feedbackQuestions.map(
                (
                  feedbackQuestion,
                  index
                ) => (
                  <div
                    className="feedback-question-card"
                    key={feedbackQuestion.id}
                  >
                    <div className="feedback-question-number">
                      {index + 1}
                    </div>

                    <p>
                      {feedbackQuestion.question}
                    </p>

                    <div className="feedback-answer-options">
                      {[
                        "Yes",
                        "Mostly",
                        "No",
                      ].map((answer) => (
                        <button
                          type="button"
                          key={answer}
                          className={`
                            feedback-answer-button
                            ${
                              feedbackAnswers?.[
                                feedbackQuestion.id
                              ] === answer
                                ? "feedback-answer-selected"
                                : ""
                            }
                          `}
                          onClick={() => {
                            handleAnswerChange(
                              feedbackQuestion.id,
                              answer
                            )
                          }}
                        >
                          {answer}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="feedback-comments-card">
              <div className="feedback-comments-heading">
                <div className="feedback-comments-icon">
                  7
                </div>

                <div>
                  <h3>
                    Additional Comments
                  </h3>

                  <p>
                    Tell us anything else that
                    could improve the lesson.
                  </p>
                </div>
              </div>

              <textarea
                value={
                  feedbackAnswers?.comments || ""
                }
                onChange={handleCommentChange}
                placeholder="Write your feedback here..."
                maxLength={500}
              />

              <small>
                {
                  feedbackAnswers?.comments
                    ?.length || 0
                }
                /500
              </small>
            </div>
          </div>

          <div className="feedback-form-footer">
            <button
              type="button"
              className="feedback-skip-button"
              onClick={handleSkip}
            >
              Skip for now
            </button>

            <button
              type="submit"
              className="feedback-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Sending..."
                : "Send Feedback"}

              <span>
                ›
              </span>
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default FeedbackForm