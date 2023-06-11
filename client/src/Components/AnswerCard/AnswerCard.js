import React, { useState, useEffect } from "react";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import "./AnswerCard.scss";

const AnswerCard = ({
  quiz,
  question,
  answer,
  handleUpdateAnswer,
  handleDeleteAnswer,
  handleUpdateCorrectness,
}) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(answer.text);
  const [renderKey, setRenderKey] = useState(Date.now());
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);

  useEffect(() => {
    setRenderKey(Date.now());
  }, [answer.isCorrect]);

  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleUpdateAnswer(quiz._id, question._id, answer._id, newText);
    setEditing(false);
  };

  const handleConfirmedDeleteAnswer = () => {
    handleDeleteAnswer(quiz._id, question._id, answer._id);
    setShowDeleteConfirmationDialog(false);
  };

  return (
    <div
      key={renderKey}
      className={`answer-card ${answer.isCorrect ? "correct" : ""}`}
    >
      {showDeleteConfirmationDialog && (
        <ConfirmationDialog
          show={showDeleteConfirmationDialog}
          onConfirm={handleConfirmedDeleteAnswer}
          onCancel={() => setShowDeleteConfirmationDialog(false)}
          content={"die Antwort"}
        />
      )}
      {editing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            className="general-input"
            value={newText}
            onChange={handleTextChange}
            autoFocus
          />
          <button className="general-button" type="submit">
            Speichern
          </button>
          <button
            className="general-button"
            type="button"
            onClick={() => setEditing(false)}
          >
            Abbrechen
          </button>
        </form>
      ) : (
        <>
          <h3 className="answer-card-title">{answer.text}</h3>
          <div className="answer-actions">
            <button className="general-button" onClick={() => setEditing(true)}>
              Antwort Editieren
            </button>
            <button
              className="general-button"
              onClick={() => setShowDeleteConfirmationDialog(true)}
            >
              Antwort Löschen
            </button>
            <button
              className="general-button"
              onClick={() =>
                handleUpdateCorrectness(quiz._id, question._id, answer._id)
              }
            >
              Richtige Antwort
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AnswerCard;
