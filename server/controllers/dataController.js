const Data = require("../models/dataModel");

async function getOrCreateData(quizId) {
  let data = await Data.findOne({ quizId });
  if (!data) {
    data = new Data({
      quizId: quizId,
    });
    await data.save();
  }
  return data;
}

exports.updateQuizData = async (req, res) => {
  try {
    const data = await getOrCreateData(req.body.quizId);
    data.totalQuestions += 1;
    req.body.isCorrect
      ? (data.correctAnswers += 1)
      : (data.incorrectAnswers += 1);
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuizData = async (req, res) => {
  try {
    const data = await getOrCreateData(req.params.quizId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.incrementParticipants = async (req, res) => {
  try {
    const data = await getOrCreateData(req.body.quizId);
    data.participants += 1;
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
