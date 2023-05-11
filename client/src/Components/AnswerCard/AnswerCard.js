import React, { useState } from "react";

function AnswerCard({ question, handleAddAnswer }) {
  const [newAnswerText, setNewAnswerText] = useState("");

  const handleChange = (e) => {
    setNewAnswerText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddAnswer(newAnswerText);
    setNewAnswerText("");
  };

  return (
    <div className="answer-card">
      <h3>{question}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newAnswerText}
          onChange={handleChange}
          placeholder="Type your answer here"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AnswerCard;
