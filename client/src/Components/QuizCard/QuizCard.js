import React, { useState, useEffect } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";

const QuizCard = ({
  quiz,
  handleUpdateQuiz,
  showDeleteConfirmationDialog,
  handleAddQuestion,
  handleAddAnswer,
  handleUpdateQuestion,
  handleDeleteQuestion,
}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(quiz.title);
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState("");

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

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        {editing ? (
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              autoFocus
            />
            <button type="submit">Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </form>
        ) : (
          <>
            <h2>{quiz.title}</h2>
            <div className="quiz-actions">
              <button onClick={() => setEditing(true)}>Edit Quiz</button>
              <button onClick={() => showDeleteConfirmationDialog(quiz._id)}>
                Delete Quiz
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
            question={question}
            handleAddAnswer={handleAddAnswer}
            handleUpdateQuestion={handleUpdateQuestion}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        ))}
      </div>
      {addingQuestion ? (
        <form onSubmit={handleAddQuestionSubmit}>
          <input
            type="text"
            value={newQuestionText}
            onChange={handleNewQuestionTextChange}
            placeholder="Enter new question"
            autoFocus
          />
          <button type="submit">Save Question</button>
          <button onClick={() => setAddingQuestion(false)}>Cancel</button>
        </form>
      ) : (
        <button onClick={() => setAddingQuestion(true)}>Add Question</button>
      )}
    </div>
  );
};

export default QuizCard;
