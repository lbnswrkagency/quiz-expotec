import React, { useState, useEffect, Fragment } from "react";
import "./AdminDashboard.scss";
import axios from "axios";
import AnswerCard from "../AnswerCard/AnswerCard";
import QuestionCard from "../QuestionCard/QuestionCard";
import QuizCard from "../QuizCard/QuizCard";

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizTitle, setQuizTitle] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  useEffect(() => {
    const loadQuizzes = async () => {
      const allQuizzes = await fetchAllQuizzes();

      setQuizzes(allQuizzes);
    };

    loadQuizzes();
  }, []);

  const showDeleteConfirmationDialog = (quizId) => {
    setDeleteCandidate(quizId);
    setShowDeleteConfirmation(true);
  };

  const fetchAllQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quiz/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      return [];
    }
  };

  const handleQuizTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const createQuiz = async (title) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/quiz/create",
        {
          title,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating quiz:", error);
      return null;
    }
  };

  const handleAddQuiz = async () => {
    if (quizTitle) {
      const newQuiz = await createQuiz(quizTitle);
      if (newQuiz) {
        setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);
      }
      setQuizTitle("");
    }
  };

  // Function to handle updating a quiz
  const handleUpdateQuiz = async (quizId, newTitle) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/quiz/${quizId}`,
        { title: newTitle }
      );
      const updatedQuiz = response.data;
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) => (quiz._id === quizId ? updatedQuiz : quiz))
      );
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  // Function to handle deleting a quiz
  const handleDeleteQuiz = async (quizId) => {
    console.log(quizId);
    try {
      await axios.delete(`http://localhost:5000/api/quiz/${quizId}`);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz._id !== quizId)
      );
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  // Function to handle adding a question
  const handleAddQuestion = async (quizId, newQuestionText) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/question/create",
        {
          quizId,
          text: newQuestionText,
        }
      );

      const newQuestion = response.data;
      const updatedQuiz = quizzes.find((quiz) => quiz._id === quizId);

      // Check if the question is already present in the questions array
      if (
        updatedQuiz.questions.some(
          (question) => question._id === newQuestion._id
        )
      ) {
        console.log("Question already exists.");
        return;
      }

      updatedQuiz.questions.push(newQuestion);
      setQuizzes(
        quizzes.map((quiz) => (quiz._id === quizId ? updatedQuiz : quiz))
      );
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  // Function to handle updating a question
  const handleUpdateQuestion = async (quizId, questionId, newText) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/question/${questionId}`,
        { text: newText }
      );
      const updatedQuestion = response.data;
      const updatedQuiz = quizzes.find((quiz) => quiz._id === quizId);

      updatedQuiz.questions = updatedQuiz.questions.map((question) =>
        question._id === questionId ? updatedQuestion : question
      );
      setQuizzes(
        quizzes.map((quiz) => (quiz._id === quizId ? updatedQuiz : quiz))
      );
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  // Function to handle deleting a question
  const handleDeleteQuestion = async (quizId, questionId) => {
    try {
      await axios.delete(`http://localhost:5000/api/question/${questionId}`);
      const updatedQuiz = quizzes.find((quiz) => quiz._id === quizId);

      updatedQuiz.questions = updatedQuiz.questions.filter(
        (question) => question._id !== questionId
      );
      setQuizzes(
        quizzes.map((quiz) => (quiz._id === quizId ? updatedQuiz : quiz))
      );
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  // Function to handle adding an answer
  const handleAddAnswer = async (quizId, questionId, newAnswerText) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/answer/create",
        {
          quizId,
          questionId,
          text: newAnswerText,
        }
      );

      const newAnswer = response.data;
      const updatedQuiz = quizzes.find((quiz) => quiz._id === quizId);
      const updatedQuestion = updatedQuiz.questions.find(
        (question) => question._id === questionId
      );
      updatedQuestion.answers.push(newAnswer);
      setQuizzes(
        quizzes.map((quiz) => (quiz._id === quizId ? updatedQuiz : quiz))
      );
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };

  // Function to handle updating an answer
  const handleUpdateAnswer = (quizId, questionId, answerId) => {
    // TODO: Implement the logic for updating an answer
  };

  // Function to handle deleting an answer
  const handleDeleteAnswer = (quizId, questionId, answerId) => {
    // TODO: Implement the logic for deleting an answer
  };

  console.log(quizzes);

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddQuiz();
          }}
        >
          <input
            type="text"
            value={quizTitle}
            onChange={handleQuizTitleChange}
            placeholder="Quiz title"
          />
          <button type="submit">Create Quiz</button>
        </form>
      </div>

      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <QuizCard
            quizzes={quizzes}
            key={quiz._id}
            quiz={quiz}
            handleUpdateQuiz={handleUpdateQuiz}
            showDeleteConfirmationDialog={showDeleteConfirmationDialog}
            handleAddQuestion={handleAddQuestion}
            handleAddAnswer={handleAddAnswer}
            handleUpdateQuestion={handleUpdateQuestion}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        ))}
      </div>
      {showDeleteConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-dialog-content">
            <p>Are you sure you want to delete this Quiz?</p>
            <div className="confirmation-dialog-actions">
              <button onClick={() => handleDeleteQuiz(deleteCandidate)}>
                Yes
              </button>
              <button onClick={() => setShowDeleteConfirmation(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
