import React, { useState } from "react";
import AnswerCard from "../AnswerCard/AnswerCard";
import "./QuestionCard.scss";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

import axios from "axios";

const QuestionCard = ({
  quiz,
  quizzes,
  setQuizzes,
  question,
  handleUpdateQuestion,
  handleDeleteQuestion,
  colorSchemes,
}) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(question.text);
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [addingAnswer, setAddingAnswer] = useState(false);
  const [newAnswerText, setNewAnswerText] = useState("");
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);
  const colorSchema = colorSchemes.find((scheme) => scheme.quizId === quiz._id);

  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleUpdateQuestion(quiz._id, question._id, newText);
    setEditing(false);
  };

  const handleNewQuestionTextChange = (e) => {
    setNewQuestionText(e.target.value);
  };

  const handleNewAnswerTextChange = (e) => {
    setNewAnswerText(e.target.value);
  };

  const handleAddAnswerSubmit = (e) => {
    e.preventDefault();
    handleAddAnswer(quiz._id, question._id, newAnswerText);
    setNewAnswerText("");
    setAddingAnswer(false);
  };

  // Function to handle adding an answer
  const handleAddAnswer = async (quizId, questionId, newText) => {
    try {
      const response = await axios.post(
        `https://quiz-mxtc.onrender.com/api/answer/create`,
        {
          text: newText,
          isCorrect: false, // isCorrect is false by default
          questionId: questionId, // Add this line
        }
      );
      const newAnswer = response.data;
      const updatedQuiz = quizzes.find((quiz) => quiz._id === quizId);
      const updatedQuestion = updatedQuiz.questions.find(
        (question) => question._id === questionId
      );
      updatedQuestion.answers = [...updatedQuestion.answers, newAnswer];
      setQuizzes(
        quizzes.map((quiz) => (quiz._id === quizId ? updatedQuiz : quiz))
      );
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };

  // Function to handle updating an answer
  const handleUpdateAnswer = async (quizId, questionId, answerId, newText) => {
    try {
      const response = await axios.put(
        `https://quiz-mxtc.onrender.com/api/answer/${answerId}`,
        { text: newText }
      );

      const updatedAnswer = response.data;
      const updatedQuiz = quizzes.find((quiz) => quiz._id === quizId);
      const updatedQuestion = updatedQuiz.questions.find(
        (question) => question._id === questionId
      );
      updatedQuestion.answers = updatedQuestion.answers.map((answer) =>
        answer._id === answerId ? updatedAnswer : answer
      );
      setQuizzes(
        quizzes.map((quiz) => (quiz._id === quizId ? updatedQuiz : quiz))
      );
    } catch (error) {
      console.error("Error updating answer:", error);
    }
  };

  const handleUpdateCorrectness = async (quizId, questionId, answerId) => {
    try {
      const response = await axios.put(
        `https://quiz-mxtc.onrender.com/api/answer/${answerId}/correct`
      );

      const updatedCorrectAnswer = response.data;
      const updatedQuiz = quizzes.find((quiz) => quiz._id === quizId);
      const updatedQuestion = updatedQuiz.questions.find(
        (question) => question._id === questionId
      );

      // Set the isCorrect property of all answers to false, except for the one that is being updated
      updatedQuestion.answers = updatedQuestion.answers.map((answer) =>
        answer._id === answerId
          ? updatedCorrectAnswer
          : { ...answer, isCorrect: false }
      );

      setQuizzes(
        quizzes.map((quiz) => (quiz._id === quizId ? updatedQuiz : quiz))
      );
    } catch (error) {
      console.error("Error updating answer correctness:", error);
    }
  };

  // Function to handle deleting an answer
  const handleDeleteAnswer = async (quizId, questionId, answerId) => {
    try {
      await axios.delete(
        `https://quiz-mxtc.onrender.com/api/answer/${answerId}`
      );
      const updatedQuiz = quizzes.find((quiz) => quiz._id === quizId);
      const updatedQuestion = updatedQuiz.questions.find(
        (question) => question._id === questionId
      );

      updatedQuestion.answers = updatedQuestion.answers.filter(
        (answer) => answer._id !== answerId
      );
      setQuizzes(
        quizzes.map((quiz) => (quiz._id === quizId ? updatedQuiz : quiz))
      );
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  };

  const handleConfirmedDeleteQuestion = () => {
    handleDeleteQuestion(quiz._id, question._id);
    setShowDeleteConfirmationDialog(false);
  };

  return (
    <div className="question-card">
      {showDeleteConfirmationDialog && (
        <ConfirmationDialog
          show={showDeleteConfirmationDialog}
          onConfirm={handleConfirmedDeleteQuestion}
          onCancel={() => setShowDeleteConfirmationDialog(false)}
          content={"die Frage"}
        />
      )}
      {editing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={newText}
            onChange={handleTextChange}
            autoFocus
            className="general-input"
          />
          <button className="general-button" type="submit">
            Speichern
          </button>
          <button className="general-button" onClick={() => setEditing(false)}>
            Abbrechen
          </button>
        </form>
      ) : (
        <>
          <h3 className="question-card-title">{question.text}</h3>

          <div className="question-card-actions">
            <button className="general-button" onClick={() => setEditing(true)}>
              Frage Bearbeiten
            </button>
            <button
              className="general-button"
              onClick={() => setShowDeleteConfirmationDialog(true)}
            >
              Frage Löschen
            </button>
          </div>
        </>
      )}

      <div className="answer-list">
        {question.answers &&
          question.answers.map((answer) => (
            <AnswerCard
              key={answer._id}
              quiz={quiz}
              question={question}
              answer={answer}
              handleUpdateAnswer={handleUpdateAnswer}
              handleDeleteAnswer={() =>
                handleDeleteAnswer(quiz._id, question._id, answer._id)
              }
              handleUpdateCorrectness={handleUpdateCorrectness}
            />
          ))}
        {addingAnswer ? (
          <form onSubmit={handleAddAnswerSubmit}>
            <input
              type="text"
              value={newAnswerText}
              onChange={handleNewAnswerTextChange}
              placeholder="Enter new answer"
              autoFocus
              className="general-input"
            />
            <button className="general-button" type="submit">
              Antwort speichern
            </button>
            <button
              className="general-button"
              onClick={() => setAddingAnswer(false)}
            >
              Abbrechen
            </button>
          </form>
        ) : (
          <button
            className="question-card-add-answer general-button"
            onClick={() => setAddingAnswer(true)}
          >
            Antwort hinzufügen
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
