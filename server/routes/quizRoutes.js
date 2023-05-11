const express = require("express");
const {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

const router = express.Router();

router.get("/all", getAllQuizzes);
router.get("/:quizId", getQuizById);
router.post("/create", createQuiz);
router.put("/:quizId", updateQuiz);
router.delete("/:quizId", deleteQuiz);

module.exports = router;
