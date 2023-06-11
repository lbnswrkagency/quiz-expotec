const express = require("express");
const { updateQuizData, getQuizData, incrementParticipants } = require("../controllers/dataController");

const router = express.Router();

router.put("/updateQuizData", updateQuizData);
router.get("/:quizId", getQuizData);
router.post("/incrementParticipants", incrementParticipants);

module.exports = router;
