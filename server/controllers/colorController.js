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
    const darkerColor = chroma(leadingColor).darken(1.5).hex();
    const colors = chroma.scale([leadingColor, darkerColor]).colors(3);
    const gradientBackground = `linear-gradient(${colors[0]}, ${colors[1]}, ${colors[2]})`;

    // Calculate complementary color
    const complementaryColor = chroma(leadingColor).rgb();
    const hue = (chroma(complementaryColor).get("hcl.h") + 180) % 360;
    let questionBackgroundColor = chroma
      .lch(
        chroma(complementaryColor).get("hcl.l"),
        chroma(complementaryColor).get("hcl.c"),
        hue
      )
      .hex();

    // If the leading color is very dark, brighten the question background color
    if (chroma(leadingColor).luminance() < 0.3) {
      questionBackgroundColor = chroma(questionBackgroundColor)
        .brighten(1.5)
        .hex();
    }

    const answerBackgroundColor = chroma(leadingColor).brighten().hex();

    // Generate colors for next button and answer border
    const nextButtonBackgroundColor = chroma(leadingColor).brighten(2).hex();
    const nextButtonTextColor =
      chroma.contrast(nextButtonBackgroundColor, "white") > 4.5
        ? "white"
        : "black";
    const answerBorderColor = chroma(leadingColor).darken(2).hex();

    // For questionTextColor and answerTextColor, we use questionBackgroundColor
    // If the questionBackgroundColor is a bright color (luminance > 0.5), make the answerTextColor a darker shade of questionBackgroundColor
    let questionTextColor, answerTextColor;
    if (chroma(questionBackgroundColor).luminance() > 0.5) {
      questionTextColor = "black";
      answerTextColor = chroma(questionBackgroundColor).darken(1.5).hex();

      // If the leading color is very bright, set the answer text color to black
      console.log("Brightness", chroma(leadingColor).luminance());
      if (chroma(leadingColor).luminance() > 0.5) {
        answerTextColor = "black";
      }
    } else {
      questionTextColor = "white";
      answerTextColor = questionBackgroundColor;
    }

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
