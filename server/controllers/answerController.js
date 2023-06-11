const Question = require("../models/questionModel");
const Answer = require("../models/answerModel");

exports.getAllAnswers = async (req, res) => {
  console.log("object");
  try {
    const question = await Question.findById(req.query.questionId).populate(
      "answers"
    );
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(question.answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAnswerById = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAnswer = async (req, res) => {
  const answer = new Answer(req.body);

  console.log(req.body)

  try {
    const savedAnswer = await answer.save();
    const question = await Question.findById(req.body.questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.answers.push(savedAnswer._id);
    await question.save();
    res.status(201).json(savedAnswer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const answerToUpdate = await Answer.findById(req.params.answerId);
    if (!answerToUpdate) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const updatedAnswer = await Answer.findByIdAndUpdate(
      req.params.answerId,
      { text: req.body.text },
      { new: true }
    );

    res.status(200).json(updatedAnswer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteAnswer = async (req, res) => {
  try {
    const deletedAnswer = await Answer.findByIdAndDelete(req.params.answerId);
    if (!deletedAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCorrectness = async (req, res) => {
  try {
    const answerToUpdate = await Answer.findById(req.params.answerId);
    if (!answerToUpdate) {
      return res.status(404).json({ message: "Answer not found" });
    }

    // find the parent question
    const parentQuestion = await Question.findOne({ answers: req.params.answerId });
    if (!parentQuestion) {
      return res.status(404).json({ message: "Parent question not found" });
    }

    // set isCorrect to false for all other answers of the parent question
    await Answer.updateMany(
      { _id: { $in: parentQuestion.answers, $ne: req.params.answerId } },
      { isCorrect: false }
    );

    // set isCorrect to true for the answer in question
    const updatedAnswer = await Answer.findByIdAndUpdate(
      req.params.answerId,
      { isCorrect: true },
      { new: true }
    );

    res.status(200).json(updatedAnswer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

