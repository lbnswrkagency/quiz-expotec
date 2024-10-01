const Quiz = require("../models/quizModel");
const Question = require("../models/questionModel");
const Answer = require("../models/answerModel");
const Logo = require("../models/logoModel");
const Data = require("../models/dataModel");
const Color = require("../models/colorModel");
const { deleteFileFromS3ByKey } = require("../utils/s3Uploader");

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate({
        path: "questions",
        populate: {
          path: "answers",
        },
      })
      .exec();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId)
      .populate({
        path: "questions",
        populate: {
          path: "answers",
        },
      })
      .exec();
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createQuiz = async (req, res) => {
  const quiz = new Quiz(req.body);
  try {
    const savedQuiz = await quiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.quizId,
      req.body,
      { new: true }
    )
      .populate({
        path: "questions",
        populate: {
          path: "answers",
        },
      })
      .exec();

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId)
      .populate({
        path: "questions",
        populate: {
          path: "answers",
        },
      })
      .exec();

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Delete associated questions and answers
    for (const question of quiz.questions) {
      for (const answer of question.answers) {
        await Answer.findByIdAndDelete(answer._id);
      }
      await Question.findByIdAndDelete(question._id);
    }

    // Delete associated Logo
    await Logo.findOneAndDelete({ quizId: quiz._id });

    // Delete associated Data
    await Data.findOneAndDelete({ quizId: quiz._id });

    // Delete associated Color
    await Color.findOneAndDelete({ quizId: quiz._id });

    // Delete associated background image from S3
    if (quiz.backgroundImageUrl) {
      const backgroundImageUrl = quiz.backgroundImageUrl;
      const url = new URL(backgroundImageUrl);
      const s3Key = decodeURIComponent(url.pathname.substring(1)); // Remove leading '/'
      await deleteFileFromS3ByKey(s3Key);
    }

    // Delete the quiz
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.quizId);

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getQuizByUniqueLink = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ uniqueLink: req.params.uniqueLink })
      .populate({
        path: "questions",
        populate: {
          path: "answers",
        },
      })
      .exec();
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
