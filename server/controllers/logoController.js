const Logo = require("../models/logoModel");
exports.uploadLogo = async (req, res) => {
  const { base64String, mimeType, quizId, global } = req.body;

  try {
    // if a logo is being uploaded for a specific quiz, replace the existing one
    if (quizId) {
      const existingQuizLogo = await Logo.findOne({ quizId });
      if (existingQuizLogo) {
        await Logo.deleteOne({ _id: existingQuizLogo._id });
      }
    }

    // if a global logo is being uploaded, replace the existing one
    if (global) {
      const existingGlobalLogo = await Logo.findOne({ global: true });
      if (existingGlobalLogo) {
        await Logo.deleteOne({ _id: existingGlobalLogo._id });
      }
    }

    const logo = new Logo({
      base64String,
      mimeType,
      quizId: quizId ? quizId : null,
      global: global ? global : false,
    });

    const savedLogo = await logo.save();

    res.json(savedLogo);
  } catch (error) {
    console.error("Error uploading logo:", error);
    res.status(500).json({ message: "Error uploading logo" });
  }
};

exports.getLogo = async (req, res) => {
  const { quizId } = req.params;

  try {
    let logo;
    if (quizId) {
      logo = await Logo.findOne({ quizId });
      if (!logo) {
        logo = await Logo.findOne({ global: true });
      }
    } else {
      logo = await Logo.findOne({ global: true });
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
