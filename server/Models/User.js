const mongoose = require(
  "mongoose"
)

const userSchema = new mongoose.Schema(
  {
    signedInAt: {
      type: Date,

      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model(
  "User",
  userSchema
)

module.exports = User