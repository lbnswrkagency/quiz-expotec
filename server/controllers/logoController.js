// controllers/logoController.js

const mongoose = require("mongoose"); // Add this line
const Logo = require("../models/logoModel");

exports.uploadLogo = async (req, res) => {
  const { base64String, mimeType, quizId, global, type, positionX, positionY } =
    req.body;

  try {
    const logoType = type || (global ? "global" : "quiz");

    // Delete existing logo of the same type
    const existingLogo = await Logo.findOne({ quizId, type: logoType });
    if (existingLogo) {
      await Logo.deleteOne({ _id: existingLogo._id });
    }

    const logoData = {
      base64String,
      mimeType,
      quizId: quizId ? quizId : null,
      global: global ? global : false,
      type: logoType,
    };

    if (type === "kampagnen") {
      logoData.positionX = positionX || 0;
      logoData.positionY = positionY || 0;
    }

    const logo = new Logo(logoData);

    const savedLogo = await logo.save();

    res.json(savedLogo);
  } catch (error) {
    console.error("Error uploading logo:", error);
    res.status(500).json({ message: "Error uploading logo" });
  }
};

exports.getLogo = async (req, res) => {
  let { quizId, type } = req.params;

  // Normalize quizId and type
  if (quizId === "null" || quizId === "undefined") {
    quizId = null;
  }

  if (type === "null" || type === "undefined") {
    type = null;
  }

  try {
    let logo;

    if (!quizId && !type) {
      // This is the case for the global logo (main logo)
      logo = await Logo.findOne({ global: true });
    } else if (quizId && mongoose.Types.ObjectId.isValid(quizId)) {
      // Query using quizId and type
      logo = await Logo.findOne({ quizId, type: type || "quiz" });
      if (!logo) {
        // Fallback to global logo of the specified type
        logo = await Logo.findOne({ global: true, type: type || "quiz" });
      }
    } else if (type) {
      // If only type is provided, find a logo of that type
      logo = await Logo.findOne({ type });
    } else {
      // Invalid quizId
      return res.status(400).json({ message: "Invalid quizId" });
    }

    if (!logo) {
      return res.status(404).json({ message: "No logo found" });
    }

    res.json(logo);
  } catch (error) {
    console.error("Error getting logo:", error);
    res.status(500).json({ message: "Error getting logo" });
  }
};

exports.deleteLogo = async (req, res) => {
  const { logoId } = req.params;

  try {
    await Logo.deleteOne({ _id: logoId });
    res.json({ message: "Logo deleted successfully" });
  } catch (error) {
    console.error("Error deleting logo:", error);
    res.status(500).json({ message: "Error deleting logo" });
  }
};

exports.updateLogoPosition = async (req, res) => {
  const { logoId } = req.params;
  const { positionX, positionY } = req.body;

  try {
    const updatedLogo = await Logo.findByIdAndUpdate(
      logoId,
      { positionX, positionY },
      { new: true }
    );

    if (!updatedLogo) {
      return res.status(404).json({ message: "Logo not found" });
    }

    res.status(200).json(updatedLogo);
  } catch (error) {
    console.error("Error updating logo position:", error);
    res.status(500).json({ message: "Error updating logo position" });
  }
};
