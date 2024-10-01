// models/logoModel.js

const mongoose = require("mongoose");

const LogoSchema = mongoose.Schema({
  base64String: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    default: null,
  },
  global: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["global", "quiz", "kampagnen"],
    default: "quiz",
  },
  positionX: {
    type: Number,
    default: 0,
  },
  positionY: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Logo", LogoSchema);
