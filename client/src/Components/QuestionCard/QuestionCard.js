import React, { useState } from "react";
import AnswerCard from "../AnswerCard/AnswerCard";

const QuestionCard = ({
  quiz,
  question,
  handleAddAnswer,
  handleUpdateQuestion,
  handleDeleteQuestion,
  handleUpdateAnswer,
  handleDeleteAnswer,
  handleAddQuestion,
}) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(question.text);
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState("");

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

  const handleAddQuestionSubmit = (e) => {
    e.preventDefault();
    handleAddQuestion(quiz._id, newQuestionText);
    setNewQuestionText("");
    setAddingQuestion(false);
  };

  console.log(question);

  return (
    <div className="question-card">
      {editing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={newText}
            onChange={handleTextChange}
            autoFocus
          />
          <button type="submit">Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h3>{question.text}</h3>
          <div className="question-actions">
            <button onClick={() => setEditing(true)}>Edit Question</button>
            <button
              onClick={() => handleDeleteQuestion(quiz._id, question._id)}
            >
              Delete Question
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
              handleUpdateAnswer={() =>
                handleUpdateAnswer(quiz._id, question._id, answer._id)
              }
              handleDeleteAnswer={() =>
                handleDeleteAnswer(quiz._id, question._id, answer._id)
              }
            />
          ))}
        <button onClick={() => handleAddAnswer(quiz._id, question._id)}>
          Add Answer
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
