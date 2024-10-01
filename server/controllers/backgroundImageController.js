// controllers/backgroundImageController.js

const path = require("path");
const Quiz = require("../models/quizModel");
const { uploadToS3, deleteFileFromS3 } = require("../utils/s3Uploader");

exports.uploadBackgroundImage = async (req, res) => {
  const quizId = req.body.quizId;
  const file = req.file;

  if (!file) return res.status(400).json({ error: "No file uploaded." });

  // Generate a unique file name using timestamp to prevent caching issues
  const timestamp = Date.now();
  const fileExtension = path.extname(file.originalname);
  const fileName = `background-${quizId}-${timestamp}${fileExtension}`;
  const folder = "background-images";
  const mimetype = file.mimetype;

  try {
    // Fetch the existing quiz to get the old backgroundImageUrl
    const existingQuiz = await Quiz.findById(quizId);

    if (!existingQuiz) {
      return res.status(404).json({ error: "Quiz not found." });
    }

    // If there's an existing background image, delete it from S3
    if (existingQuiz.backgroundImageUrl) {
      const oldImageUrl = existingQuiz.backgroundImageUrl;
      const url = new URL(oldImageUrl);
      const oldFileName = url.pathname.split("/").pop(); // Extract the file name
      await deleteFileFromS3(folder, oldFileName);
    }

    // Upload the new image
    const imageUrl = await uploadToS3(file.buffer, folder, fileName, mimetype);

    // Update the quiz document with the new image URL
    existingQuiz.backgroundImageUrl = imageUrl;
    await existingQuiz.save();

    res.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Error uploading background image:", error);
    res.status(500).json({ error: "Failed to upload background image" });
  }
};

exports.deleteBackgroundImage = async (req, res) => {
  const quizId = req.params.quizId;
  const folder = "background-images";

  try {
    const existingQuiz = await Quiz.findById(quizId);

    if (!existingQuiz) {
      return res.status(404).json({ error: "Quiz not found." });
    }

    // If there's a background image, delete it from S3
    if (existingQuiz.backgroundImageUrl) {
      const oldImageUrl = existingQuiz.backgroundImageUrl;
      const url = new URL(oldImageUrl);
      const oldFileName = url.pathname.split("/").pop(); // Extract the file name
      await deleteFileFromS3(folder, oldFileName);
    }

    // Remove the backgroundImageUrl from the quiz document
    existingQuiz.backgroundImageUrl = null;
    await existingQuiz.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting background image:", error);
    res.status(500).json({ error: "Failed to delete background image" });
  }
};
