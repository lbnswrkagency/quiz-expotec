const express = require("express");
const logoController = require("../controllers/logoController");
const router = express.Router();

router.post("/", logoController.uploadLogo);
router.get("/:quizId?", logoController.getLogo);

module.exports = router;
