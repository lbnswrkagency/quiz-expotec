import React, { useState, useEffect } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import "./QuizCard.scss";
import LogoUpload from "../LogoUpload/LogoUpload";
import axios from "axios";
import ColorPicker from "../ColorPicker/ColorPicker";
import Modal from "react-modal";
import QuizData from "../QuizData/QuizData";

Modal.setAppElement("#root");

const QuizCard = ({
  quiz,
  quizzes,
  handleUpdateQuiz,
  showDeleteConfirmationDialog,
  setQuizzes,
  setRefetch,
  refetch,
  colorSchemes,
}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(quiz.title);
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [logoData, setLogoData] = useState(null);
  const colorSchema = colorSchemes.find((scheme) => scheme.quizId === quiz._id);
  const [showDataModal, setShowDataModal] = useState(false);
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    fetchLogo(quiz._id);
  }, [quiz._id, refetch]);

  useEffect(() => {
    fetchQuizData();
  }, [quiz._id]);
  async function fetchQuizData() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/data/${quiz._id}`
      );
      const data = await response.json();
      setQuizData(data);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  }

  const fetchLogo = async (quizId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/logo/${quizId}`
      );
      if (response.status === 200 && !response.data.global) {
        setLogoData(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Logo not found for the quiz:", error);
        setLogoData(null); // add this line
      } else {
        console.error("Error fetching the logo from the server:", error);
      }
    }
  };

  useEffect(() => {
    setNewTitle(quiz.title);
  }, [quiz]);

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleUpdateQuiz(quiz._id, newTitle);
    setEditing(false);
  };

  const handleNewQuestionTextChange = (e) => {
    setNewQuestionText(e.target.value);
  };

  const handleAddQuestionSubmit = (e) => {
    e.preventDefault();
    handleAddQuestion(quiz._id, newQuestionText);
    setNewQuestionText("");
    setAddingQuestion(false);
  };

  // Function to handle adding a question
  const handleAddQuestion = async (quizId, newQuestionText) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/question/create`,
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
        `${process.env.REACT_APP_API_BASE_URL}/question/${questionId}`,
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
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/question/${questionId}`
      );
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
  const isQuizLive = (quiz) => {
    // If there are no questions, the quiz is not live.
    if (quiz.questions.length === 0) {
      return false;
    }

    for (let question of quiz.questions) {
      let hasCorrectAnswer = false;
      for (let answer of question.answers) {
        if (answer.isCorrect) {
          hasCorrectAnswer = true;
          break;
        }
      }
      if (!hasCorrectAnswer) {
        return false;
      }
    }

    return true;
  };

  return (
    <div className="quiz-card">
      <div
        className="quiz-card-header"
        style={{
          backgroundColor: colorSchema
            ? colorSchema.leadingColor
            : "defaultColor",
        }}
      >
        {logoData ? (
          <img
            className="quiz-card-logo"
            src={logoData.base64String}
            alt="Quiz logo"
          />
        ) : (
          <p className="quiz-card-logo">Quiz Logo hochladen</p>
        )}
        <div className="quiz-card-upload">
          <LogoUpload
            text={logoData ? "Logo ersetzen" : "Logo hochladen"}
            global={false}
            quizId={quiz._id}
            setRefetch={setRefetch}
            refetch={refetch}
          />
        </div>{" "}
        <div className="quiz-card-picker">
          {" "}
          <ColorPicker
            quizId={quiz._id}
            setRefetch={setRefetch}
            refetch={refetch}
          />
        </div>
        {isQuizLive(quiz) ? (
          <div className="quiz-card-live">
            <p> Das Quiz ist nun spielbar unter folgendem Link:</p>
            <a
              href={`${process.env.REACT_APP_CLIENT_BASE_URL}/quiz/${quiz.uniqueLink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {process.env.REACT_APP_CLIENT_BASE_URL}/quiz/{quiz.uniqueLink}
            </a>
          </div>
        ) : (
          <div className="quiz-card-live">
            <p>
              Es wird mindestens eine Frage benötigt und pro Frage mindestens
              eine richtige Antwort, damit das Quiz spielbar ist.
            </p>
          </div>
        )}
        {editing ? (
          <form className="quiz-card-edit" onSubmit={handleEditSubmit}>
            <input
              className="general-input"
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              autoFocus
            />
            <button className="general-button" type="submit">
              Speichern
            </button>
            <button
              className="general-button"
              onClick={() => setEditing(false)}
            >
              Abbrechen
            </button>
          </form>
        ) : (
          <>
            <h2 className="quiz-card-title">{quiz.title}</h2>
            <button
              className="quiz-card-data general-button"
              onClick={() => setShowDataModal(true)}
            >
              Quiz Daten Analyse
            </button>

            <Modal isOpen={showDataModal}>
              <button
                className="general-button"
                onClick={() => setShowDataModal(false)}
              >
                Schließen
              </button>
              {quizData && <QuizData data={quizData} />}
            </Modal>
            <div className="quiz-card-actions">
              <button
                className="general-button"
                onClick={() => setEditing(true)}
              >
                Quiz Bearbeiten
              </button>
              <button
                className="general-button"
                onClick={() => showDeleteConfirmationDialog(quiz._id)}
              >
                Quiz Löschen
              </button>
            </div>
          </>
        )}
      </div>

      <div className="question-list">
        {quiz.questions.map((question) => (
          <QuestionCard
            key={question._id} // Add the key prop here
            quiz={quiz}
            quizzes={quizzes}
            setQuizzes={setQuizzes}
            question={question}
            handleAddQuestion={handleAddQuestion}
            handleUpdateQuestion={handleUpdateQuestion}
            handleDeleteQuestion={handleDeleteQuestion}
            colorSchemes={colorSchemes}
          />
        ))}
      </div>
      {addingQuestion ? (
        <form
          onSubmit={handleAddQuestionSubmit}
          className="quiz-card-add-question"
        >
          <input
            type="text"
            value={newQuestionText}
            onChange={handleNewQuestionTextChange}
            placeholder="Enter new question"
            autoFocus
            className="general-input"
          />
          <button className="general-button" type="submit">
            Save Question
          </button>
          <button
            className="general-button"
            onClick={() => setAddingQuestion(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          className="general-button quiz-card-add-question"
          onClick={() => setAddingQuestion(true)}
        >
          Frage hinzufügen
        </button>
      )}
    </div>
  );
};

export default QuizCard;
