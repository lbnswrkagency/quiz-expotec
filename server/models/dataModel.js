const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  totalQuestions: {
    type: Number,
    default: 0,
  },
  correctAnswers: {
    type: Number,
    default: 0,
  },
  incorrectAnswers: {
    type: Number,
    default: 0,
  },
  participants: {
    type: Number,
    default: 0,
  },
});

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
