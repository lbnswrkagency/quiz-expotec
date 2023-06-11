const mongoose = require("mongoose");

const LogoSchema = mongoose.Schema({
  base64String: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    default: null
  },
  global: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Logo", LogoSchema);
