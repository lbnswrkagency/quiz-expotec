const express = require("express");
const {
  getAllAnswers,
  getAnswerById,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  updateCorrectness
} = require("../controllers/answerController");

const router = express.Router();

router.get("/all", getAllAnswers);
router.get("/:answerId", getAnswerById);
router.post("/create", createAnswer);
router.put("/:answerId", updateAnswer);
router.delete("/:answerId", deleteAnswer);
router.put("/:answerId/correct", updateCorrectness);


module.exports = router;
