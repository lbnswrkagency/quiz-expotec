import React, { useState, useEffect, Fragment } from "react";
import "./AdminDashboard.scss";
import axios from "axios";
import QuizCard from "../QuizCard/QuizCard";
import LogoUpload from "../LogoUpload/LogoUpload";
import Pagination from "../Pagination/Pagination";

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizTitle, setQuizTitle] = useState("");
  const [logoData, setLogoData] = useState(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    fetchGlobalLogo();
  }, [refetch]);

  const fetchGlobalLogo = async () => {
    try {
      const response = await axios.get(
        "https://quiz-mxtc.onrender.com/api/logo"
      );
      setLogoData(response.data.base64String);
    } catch (error) {
      console.error("Error fetching global logo:", error);
    }
  };

  const handleQuizTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const createQuiz = async (title) => {
    try {
      const response = await axios.post(
        "https://quiz-mxtc.onrender.com/api/quiz/create",
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
      fetchGlobalLogo(); // Add this line
      setRefetch(!refetch);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-header-upload">
          {" "}
          <LogoUpload
            text={logoData ? "Logo ersetzen" : "Logo hochladen"}
            global={true}
            onUpload={fetchGlobalLogo}
            setRefetch={setRefetch}
            refetch={refetch}
          />
        </div>

        {logoData ? (
          <img
            className="admin-dashboard-header-logo"
            src={logoData}
            alt="Logo"
          />
        ) : (
          <p className="admin-dashboard-header-logo">Haupt Logo hochladen</p>
        )}

        <h1 className="admin-dashboard-header-title">Admin Dashboard</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddQuiz();
          }}
          className="admin-dashboard-header-form"
        >
          <input
            type="text"
            value={quizTitle}
            onChange={handleQuizTitleChange}
            placeholder="Quiz Titel"
            className="general-input"
          />
          <button
            className="admin-dashboard-header-submit general-button"
            type="submit"
          >
            Quiz Erstellen
          </button>
        </form>
      </div>

      <Pagination items={quizzes} setRefetch={setRefetch} refetch={refetch}>
        {(quiz) => <QuizCard quiz={quiz} />}
      </Pagination>
    </div>
  );
};

export default AdminDashboard;
