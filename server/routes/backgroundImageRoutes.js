// routes/backgroundImageRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // Use multer without storage to get buffer

const {
  uploadBackgroundImage,
  deleteBackgroundImage,
} = require("../controllers/backgroundImageController");

router.post("/upload", upload.single("file"), uploadBackgroundImage);
router.delete("/:quizId", deleteBackgroundImage);

module.exports = router;
