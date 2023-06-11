const mongoose = require("mongoose");
const slugify = require("slugify");
const shortid = require("shortid");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  uniqueLink: {
    type: String,
    default: function () {
      // This function will be called to generate the unique link
      const titleSlug = slugify(this.title, { lower: true }); // Convert title to URL-friendly string
      const uniqueId = shortid.generate(); // Generate a short unique ID
      return `${titleSlug}-${uniqueId}`; // Combine the two to get the unique link
    },
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
