const Feedback = require("../Models/Feedback")

const submitFeedback = async (request,response) => {
  try {
    if (!request.session.userId) {
      return response.status(401).json({
        success: false,

        message:
          "Please sign in before sending feedback.",
      })
    }

    const {
      selectedLesson,
      answers,
      comments,
    } = request.body

    const feedback = await Feedback.create({
      userId: request.session.userId,

      selectedLesson,

      answers,

      comments,
    })

    return response.status(201).json({
      success: true,

      feedbackId: feedback._id,
    })
  } catch (error) {
    console.error(error)

    return response.status(500).json({
      success: false,

      message:
        "Could not save feedback.",
    })
  }
}

module.exports = {
  submitFeedback,
}