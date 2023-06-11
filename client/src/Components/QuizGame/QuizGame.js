// QuizGame.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./QuizGame.scss";
import analytics from "../../Utils/analytics";

const QuizGame = () => {
  const { uniqueLink } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [quizIsLive, setQuizIsLive] = useState(false);

  const [colorScheme, setColorScheme] = useState(null);
  const [globalLogo, setGlobalLogo] = useState(null);
  const [localLogo, setLocalLogo] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/quiz/link/${uniqueLink}`
        );
        setQuiz(response.data);
        setQuizIsLive(isQuizLive(response.data)); // Check if the quiz is live
        analytics.incrementParticipants(response.data._id);

        const colorResponse = await axios.get(
          `http://localhost:5001/api/color/${response.data._id}`
        );
        setColorScheme(colorResponse.data);

        // const globalLogoResponse = await axios.get(`http://localhost:5001/api/logo`);
        // setGlobalLogo(globalLogoResponse.data);

        // const localLogoResponse = await axios.get(`http://localhost:5001/api/logo/${response.data._id}`);
        // setLocalLogo(localLogoResponse.data || globalLogoResponse.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuiz();
  }, [uniqueLink]);

  // Fetch global and local logos when the component is first mounted and whenever uniqueLink changes
  useEffect(() => {
    const fetchGlobalLogo = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/logo`);
        if (response.status === 200) {
          setGlobalLogo(response.data);
        }
      } catch (error) {
        console.error("Error fetching the global logo from the server:", error);
      }
    };

    const fetchLocalLogo = async () => {
      if (quiz) {
        // Only fetch local logo if quiz is not null
        try {
          const response = await axios.get(
            `http://localhost:5001/api/logo/${quiz._id}`
          );
          if (response.status === 200) {
            setLocalLogo(response.data);
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log("Local logo not found for the quiz:", error);
          } else {
            console.error(
              "Error fetching the local logo from the server:",
              error
            );
          }
        }
      }
    };

    fetchGlobalLogo();
    fetchLocalLogo();
  }, [uniqueLink, quiz]); // Added quiz as a dependency

  // Function to check if the quiz is live
  const isQuizLive = (quiz) => {
    if (quiz.questions.length > 0) {
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
    }
    return true;
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setAnswerSubmitted(true);
    analytics.updateQuizData(quiz._id, answer.isCorrect);

    // Add this line to increment correct answers count if the answer is correct
    if (answer.isCorrect) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === quiz.questions.length - 1) {
      setIsQuizOver(true);
      // Move incrementParticipants here to ensure it only increments when a quiz is completed
      analytics.incrementParticipants(quiz._id);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
    setIsQuizOver(false);
    setCorrectAnswersCount(0);
  };
  // In the same place...
  if (!quiz) return null;

  // New condition
  if (!quizIsLive) {
    return (
      <div>
        <h1>Quiz is currently under construction!</h1>
        <p>Please contact the quiz administrator for more information.</p>
      </div>
    );
  }
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const answerLabels = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

  const getCorrectAnswer = (question) => {
    for (let i = 0; i < question.answers.length; i++) {
      if (question.answers[i].isCorrect) {
        return { label: answerLabels[i], answer: question.answers[i] };
      }
    }
  };

  console.log("global logo", globalLogo);
  console.log("local logo", localLogo);

  return (
    <div
      className="quiz"
      style={{
        backgroundImage: colorScheme?.gradientBackground,
        color: colorScheme?.questionTextColor,
      }}
    >
      <div className="quiz-container">
        <div className="quiz-header">
          {globalLogo ? (
            <img
              className="quiz-header-global-logo"
              src={globalLogo.base64String}
              alt="Global Logo"
            />
          ) : (
            <span className="logo-placeholder">Haupt Logo hochladen</span>
          )}

          {localLogo && localLogo.global !== true ? (
            <img
              className="quiz-header-local-logo"
              src={localLogo.base64String}
              alt="Local Logo"
            />
          ) : (
            <span className="logo-placeholder">Quiz Logo Hochladen</span>
          )}
        </div>

        {isQuizOver ? (
          <>
            <div className="quiz-done">
              <h1 className="quiz-done-title">Herzlichen Glückwunsch!</h1>
              <h2 className="quiz-done-result">
                Sie haben{" "}
                <b>
                  {correctAnswersCount} von {quiz.questions.length}
                </b>{" "}
                richtigen Antworten
              </h2>
            </div>
            <div className="quiz-done-sub">
              <p className="quiz-done-sub-text">
                Wenn Sie weitere Informationen zum Thema Gesundheit und Vorsorge
                erhalten möchten, sprechen Sie uns gerne an.
              </p>
              <h3 className="quiz-done-sub-link">
                <a
                  href="https://www.bundesgesundheitsministerium.de"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.bundesgesundheitsministerium.de
                </a>
              </h3>
            </div>
            <button className="quiz-next" onClick={handleRestartQuiz}>
              Quiz Neu starten
            </button>
          </>
        ) : (
          <>
            {/* <p>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p> */}
            {answerSubmitted ? (
              <>
                <div className="quiz-submit">
                  <h2
                    className={`quiz-answer-title ${
                      selectedAnswer.isCorrect ? "correct" : "incorrect"
                    }`}
                  >
                    {selectedAnswer.isCorrect ? "Richtig!" : "Leider Falsch!"}
                  </h2>

                  {!selectedAnswer.isCorrect && (
                    <p className="quiz-answer-sub correct-answer">
                      Die richtige Antwort lautet:{" "}
                    </p>
                  )}

                  <p
                    className="quiz-answers-button quiz-answers-button-2"
                    style={{
                      backgroundColor: colorScheme?.answerBackgroundColor,
                      color: colorScheme?.answerTextColor,
                    }}
                  >
                    <p className="quiz-answers-text">
                      {" "}
                      <span>{getCorrectAnswer(currentQuestion).label} </span>
                      {getCorrectAnswer(currentQuestion).answer.text}
                    </p>
                  </p>
                </div>

                <button
                  className="quiz-next"
                  onClick={handleNextQuestion}
                  style={{
                    backgroundColor: colorScheme?.nextButtonBackgroundColor,
                    color: colorScheme?.nextButtonTextColor,
                  }}
                >
                  Weiter
                </button>
              </>
            ) : (
              <>
                <div
                  className="quiz-question"
                  style={{
                    backgroundColor: colorScheme?.questionBackgroundColor,
                    color: colorScheme?.questionTextColor,
                  }}
                >
                  <span
                    className="quiz-triangle"
                    style={{
                      backgroundColor: colorScheme?.questionBackgroundColor,
                    }}
                  ></span>
                  <p className="quiz-question-text">{currentQuestion.text}</p>
                </div>

                <div className="quiz-answers">
                  {currentQuestion.answers.map((answer, index) => (
                    <button
                      className="quiz-answers-button"
                      key={index}
                      onClick={() => handleAnswerSelect(answer)}
                      style={{
                        backgroundColor: colorScheme?.answerBackgroundColor,
                        color: colorScheme?.answerTextColor,
                        border: `1px solid ${colorScheme?.answerBorderColor}`,
                      }}
                    >
                      <p className="quiz-answers-text">
                        <span>{answerLabels[index]}</span> {answer.text}
                      </p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizGame;
