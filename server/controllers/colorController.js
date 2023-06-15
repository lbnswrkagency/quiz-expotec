const Color = require("../models/colorModel");
const chroma = require("chroma-js");

exports.setColor = async (req, res) => {
  const { leadingColor, quizId } = req.body;

  try {
    // Delete existing color scheme for this quiz, if one exists
    const existingColorScheme = await Color.findOne({ quizId });
    if (existingColorScheme) {
      await Color.deleteOne({ _id: existingColorScheme._id });
    }

    // Generate colors
    const colors = chroma.scale([leadingColor, "black"]).colors(3);
    const gradientBackground = `linear-gradient(${colors[0]}, ${colors[1]}, ${colors[2]})`;
    const questionBackgroundColor = chroma(leadingColor).darken().hex();
    const questionTextColor =
      chroma.contrast(questionBackgroundColor, "white") > 4.5
        ? "white"
        : "black";
    const answerBackgroundColor = chroma(leadingColor).brighten().hex();
    const answerTextColor =
      chroma.contrast(answerBackgroundColor, "white") > 4.5 ? "white" : "black";

    // Generate colors for next button and answer border
    const nextButtonBackgroundColor = chroma(leadingColor).brighten(2).hex();
    const nextButtonTextColor =
      chroma.contrast(nextButtonBackgroundColor, "white") > 4.5
        ? "white"
        : "black";
    const answerBorderColor = chroma(leadingColor).darken(2).hex();

    // Create new color scheme
    const color = new Color({
      quizId,
      leadingColor,
      gradientBackground,
      questionBackgroundColor,
      questionTextColor,
      answerBackgroundColor,
      answerTextColor,
      nextButtonBackgroundColor,
      nextButtonTextColor,
      answerBorderColor,
    });

    const savedColor = await color.save();

    res.json(savedColor);
  } catch (error) {
    console.error("Error setting color:", error);
    res.status(500).json({ message: "Error setting color" });
  }
};

exports.getColor = async (req, res) => {
  const { quizId } = req.params;

  try {
    const color = await Color.findOne({ quizId });

    if (!color) {
      return res
        .status(404)
        .json({ message: "No color scheme found for this quiz" });
    }

    res.json(color);
  } catch (error) {
    console.error("Error getting color:", error);
    res.status(500).json({ message: "Error getting color" });
  }
};

// in colorController.js

exports.getAllColors = async (req, res) => {
  try {
    const allColors = await Color.find({});
    res.json(allColors);
  } catch (error) {
    console.error("Error getting all colors:", error);
    res.status(500).json({ message: "Error getting all colors" });
  }
};
