import React, { useState, useEffect, Fragment } from "react";
import "./AdminDashboard.scss";
import axios from "axios";
import QuizCard from "../QuizCard/QuizCard";
import LogoUpload from "../LogoUpload/LogoUpload";
import Pagination from "../Pagination/Pagination";
import Handbuch from "../Handbuch/Handbuch";

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizTitle, setQuizTitle] = useState("");
  const [logoData, setLogoData] = useState(null);
  const [logoDataId, setLogoDataId] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [showHandbuch, setShowHandbuch] = useState(false);

  useEffect(() => {
    fetchGlobalLogo();
  }, [refetch]);

  const handleHandbuchOpen = () => {
    setShowHandbuch(true);
  };

  const handleHandbuchClose = () => {
    setShowHandbuch(false);
  };

  const fetchGlobalLogo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/logo`
      );
      if (response.status === 200) {
        setLogoData(response.data.base64String);
        setLogoDataId(response.data._id);
      } else {
        setLogoData(null);
        setLogoDataId(null);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setLogoData(null);
        setLogoDataId(null);
      } else {
        console.error("Error fetching global logo:", error);
      }
    }
  };

  const handleQuizTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const createQuiz = async (title) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/quiz/create`,
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

  const deleteLogo = async (logoId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/logo/${logoDataId}`
      );
      fetchGlobalLogo(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting logo:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <button
          className="admin-dashboard-header-handbuch general-button"
          onClick={handleHandbuchOpen}
        >
          Handbuch
        </button>
        {showHandbuch && (
          <div className="handbuch-modal">
            <button onClick={handleHandbuchClose}>Schließen</button>
            <Handbuch handleHandbuchClose={handleHandbuchClose} />
          </div>
        )}
        <div className="admin-dashboard-header-upload">
          {" "}
          <LogoUpload
            text={logoData ? "Logo ersetzen" : "Logo hochladen"}
            global={true}
            quizId={null} // No quizId for global logo
            setRefetch={setRefetch}
            refetch={refetch}
            type="global"
          />
        </div>

        {logoData ? (
          <Fragment>
            <img
              className="admin-dashboard-header-logo"
              src={logoData}
              alt="Logo"
            />
            <button
              className="admin-dashboard-header-delete-button general-button"
              onClick={() => deleteLogo(logoData._id)}
            >
              Logo löschen
            </button>
          </Fragment>
        ) : (
          <p className="admin-dashboard-header-logo">Haupt Logo hochladen</p>
        )}

        <h1 className="admin-dashboard-header-title">Admin - Dashboard</h1>
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
