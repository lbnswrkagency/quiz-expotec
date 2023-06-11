const mongoose = require("mongoose");

const ColorSchema = mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  leadingColor: {
    type: String,
    required: true,
  },
  gradientBackground: {
    type: String,
    required: true,
  },
  questionBackgroundColor: {
    type: String,
    required: true,
  },
  questionTextColor: {
    type: String,
    required: true,
  },
  answerBackgroundColor: {
    type: String,
    required: true,
  },
  answerTextColor: {
    type: String,
    required: true,
  },
  answerBorderColor: {
    type: String,
    required: true,
  },
  nextButtonBackgroundColor: {
    type: String,
    required: true,
  },
  nextButtonTextColor: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Color", ColorSchema);
