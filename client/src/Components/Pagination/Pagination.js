import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizCard from "../QuizCard/QuizCard";
import "./Pagination.scss";

const quizzesPerPage = 1; // Change this to the number of quizzes you want per page

const Pagination = ({ setRefetch, refetch }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [colorSchemes, setColorSchemes] = useState([]);

  useEffect(() => {
    loadQuizzes();
  }, [refetch]);

  const loadQuizzes = async () => {
    const allQuizzes = await fetchAllQuizzes();
    const allColorSchemes = await fetchAllColorSchemes();
    setQuizzes(allQuizzes);
    setColorSchemes(allColorSchemes);
    setTotalPages(Math.ceil(allQuizzes.length / quizzesPerPage));
  };

  const fetchAllColorSchemes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/color`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching color schemes:", error);
      return [];
    }
  };
  const fetchAllQuizzes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/quiz/all`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      return [];
    }
  };

  const handleUpdateQuiz = async (quizId, newTitle) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/quiz/${quizId}`,
        { title: newTitle }
      );
      const updatedQuiz = response.data;
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) => (quiz._id === quizId ? updatedQuiz : quiz))
      );

      setRefetch(!refetch);
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  const showDeleteConfirmationDialog = (quizId) => {
    setDeleteCandidate(quizId);
    setShowDeleteConfirmation(true);
  };

  // Function to handle deleting a quiz
  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/quiz/${quizId}`
      );
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz._id !== quizId)
      );
      setShowDeleteConfirmation(false);
      setRefetch(!refetch);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pagination">
      <div className="pagination-navigation">
        <button className="general-button" onClick={prevPage}>
          Zurück
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className="general-button-page"
            onClick={() => goToPage(index + 1)}
            key={index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button className="general-button" onClick={nextPage}>
          Weiter
        </button>
      </div>
      {quizzes
        .slice((currentPage - 1) * quizzesPerPage, currentPage * quizzesPerPage)
        .map((quiz) => (
          <QuizCard
            quizzes={quizzes}
            key={quiz._id}
            quiz={quiz}
            handleUpdateQuiz={handleUpdateQuiz}
            showDeleteConfirmationDialog={showDeleteConfirmationDialog}
            setQuizzes={setQuizzes}
            setRefetch={setRefetch}
            refetch={refetch}
            colorSchemes={colorSchemes}
          />
        ))}

      {showDeleteConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-dialog-content">
            <p>Bist du dir sicher das du das Quiz löschen willst?</p>
            <div className="confirmation-dialog-actions">
              <button onClick={() => handleDeleteQuiz(deleteCandidate)}>
                Ja
              </button>
              <button onClick={() => setShowDeleteConfirmation(false)}>
                Nein
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
