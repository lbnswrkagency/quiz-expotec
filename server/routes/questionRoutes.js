const express = require("express");
const {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

const router = express.Router();

router.get("/all", getAllQuestions);
router.get("/:questionId", getQuestionById);
router.post("/create", createQuestion);
router.put("/:questionId", updateQuestion);
router.delete("/:questionId", deleteQuestion);

module.exports = router;
