import axios from "axios";

const ANALYTICS_API = `${process.env.REACT_APP_API_BASE_URL}/data`;

const analytics = {
  totalQuestions: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,

  updateQuizData: async function (quizId, isCorrect) {
    this.totalQuestions += 1;
    isCorrect ? (this.correctAnswers += 1) : (this.incorrectAnswers += 1);
    try {
      const response = await axios.put(`${ANALYTICS_API}/updateQuizData`, {
        quizId,
        isCorrect,
      });
      this.totalQuestions = response.data.totalQuestions;
      this.correctAnswers = response.data.correctAnswers;
      this.incorrectAnswers = response.data.incorrectAnswers;
    } catch (error) {
      console.error("Error updating quiz data:", error);
    }
  },

  getQuizData: async function (quizId) {
    try {
      const response = await axios.get(`${ANALYTICS_API}/${quizId}`);
      this.totalQuestions = response.data.totalQuestions;
      this.correctAnswers = response.data.correctAnswers;
      this.incorrectAnswers = response.data.incorrectAnswers;
      return response.data;
    } catch (error) {
      console.error("Error getting quiz data:", error);
    }
  },

  incrementParticipants: async function (quizId) {
    try {
      const response = await axios.post(
        `${ANALYTICS_API}/incrementParticipants`,
        { quizId }
      );
      return response.data;
    } catch (error) {
      console.error("Error in incrementing participants count:", error);
    }
  },
};

export default analytics;
