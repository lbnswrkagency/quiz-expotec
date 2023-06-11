const express = require("express");
const colorController = require("../controllers/colorController");
const router = express.Router();

router.post("/", colorController.setColor);
router.get("/:quizId", colorController.getColor);
router.get("/", colorController.getAllColors);

module.exports = router;
