const mongoose = require(
  "mongoose"
)

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    selectedLesson: {
      type: Number,

      required: true,
    },

    answers: {
      type: Object,

      required: true,
    },

    comments: {
      type: String,

      trim: true,

      maxlength: 500,

      default: "",
    },
  },
  {
    timestamps: true,
  }
)

const Feedback = mongoose.model(
  "Feedback",
  feedbackSchema
)

module.exports = Feedback