import React, { useState } from "react";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Function to handle adding a new quiz
  const handleAddQuiz = () => {
    // TODO: Implement the logic for adding a new quiz
  };

  // Function to handle updating a quiz
  const handleUpdateQuiz = (quizId) => {
    // TODO: Implement the logic for updating a quiz
  };

  // Function to handle deleting a quiz
  const handleDeleteQuiz = (quizId) => {
    // TODO: Implement the logic for deleting a quiz
  };

  // Function to handle adding a question
  const handleAddQuestion = (quizId) => {
    // TODO: Implement the logic for adding a question
  };

  // Function to handle updating a question
  const handleUpdateQuestion = (quizId, questionId) => {
    // TODO: Implement the logic for updating a question
  };

  // Function to handle deleting a question
  const handleDeleteQuestion = (quizId, questionId) => {
    // TODO: Implement the logic for deleting a question
  };

  // Function to handle adding an answer
  const handleAddAnswer = (quizId, questionId) => {
    // TODO: Implement the logic for adding an answer
  };

  // Function to handle updating an answer
  const handleUpdateAnswer = (quizId, questionId, answerId) => {
    // TODO: Implement the logic for updating an answer
  };

  // Function to handle deleting an answer
  const handleDeleteAnswer = (quizId, questionId, answerId) => {
    // TODO: Implement the logic for deleting an answer
  };
  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleAddQuiz}>Add Quiz</button>
      </div>

      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-card">
            <div className="quiz-header">
              <h2>{quiz.title}</h2>
              <div className="quiz-actions">
                <button onClick={() => handleUpdateQuiz(quiz.id)}>
                  Edit Quiz
                </button>
                <button onClick={() => handleDeleteQuiz(quiz.id)}>
                  Delete Quiz
                </button>
              </div>
            </div>

            <div className="question-list">
              {quiz.questions.map((question) => (
                <div key={question.id} className="question-card">
                  <h3>{question.text}</h3>
                  <div className="question-actions">
                    <button
                      onClick={() => handleAddAnswer(quiz.id, question.id)}
                    >
                      Add Answer
                    </button>
                    <button
                      onClick={() => handleUpdateQuestion(quiz.id, question.id)}
                    >
                      Edit Question
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(quiz.id, question.id)}
                    >
                      Delete Question
                    </button>
                  </div>

                  <div className="answer-list">
                    {question.answers.map((answer) => (
                      <div key={answer.id} className="answer-card">
                        <div className="answer-text">{answer.text}</div>
                        <div className="answer-actions">
                          <button
                            onClick={() =>
                              handleUpdateAnswer(
                                quiz.id,
                                question.id,
                                answer.id
                              )
                            }
                          >
                            Edit Answer
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteAnswer(
                                quiz.id,
                                question.id,
                                answer.id
                              )
                            }
                          >
                            Delete Answer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={() => handleAddQuestion(quiz.id)}>
                Add Question
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
