// src/Components/BackgroundImageUpload/BackgroundImageUpload.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BackgroundImageUpload.scss";

const BackgroundImageUpload = ({ quizId, setRefetch, refetch }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch the current backgroundImageUrl for the quiz
    const fetchBackgroundImageUrl = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/quiz/${quizId}`
        );
        setBackgroundImageUrl(response.data.backgroundImageUrl);
      } catch (error) {
        console.error("Error fetching background image URL:", error);
      }
    };

    fetchBackgroundImageUrl();
  }, [quizId, refetch]);

  const handleFileChange = (file) => {
    const fileSizeInMB = file.size / (1024 * 1024);
    const validFileTypes = ["image/jpeg", "image/png"];
    const isValidFileType = validFileTypes.includes(file.type);

    if (!isValidFileType) {
      setErrorMessage("Ungültiger Dateityp. Nur JPEG und PNG sind erlaubt.");
    } else if (fileSizeInMB > 2) {
      setErrorMessage("Dateigröße überschreitet das Limit von 2MB.");
    } else {
      setErrorMessage("");
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("quizId", quizId);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/background-image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSelectedFile(null);
      setRefetch(!refetch);
      // Fetch the updated background image URL
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/quiz/${quizId}`
      );
      setBackgroundImageUrl(response.data.backgroundImageUrl);
    } catch (error) {
      console.error("Error uploading background image:", error);
      setErrorMessage("Fehler beim Hochladen des Hintergrundbildes.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/background-image/${quizId}`
      );
      setBackgroundImageUrl(null);
      setRefetch(!refetch);
    } catch (error) {
      console.error("Error deleting background image:", error);
      setErrorMessage("Fehler beim Löschen des Hintergrundbildes.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="background-image-upload">
      {backgroundImageUrl ? (
        <div className="background-image-preview">
          <img src={backgroundImageUrl} alt="Background Preview" />
          <div className="background-image-buttons">
            <label className="upload-button">
              Hintergrundbild ersetzen
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
            </label>
            <button onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Lösche..." : "Hintergrundbild löschen"}
            </button>
          </div>
          {selectedFile && (
            <div className="upload-actions">
              <p>Ausgewählte Datei: {selectedFile.name}</p>
              <button onClick={handleUpload} disabled={isLoading}>
                {isLoading ? "Lädt hoch..." : "Hochladen"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="background-image-upload-new">
          <label className="upload-button">
            Hintergrundbild hochladen
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </label>
          {selectedFile && (
            <div className="upload-actions">
              <p>Ausgewählte Datei: {selectedFile.name}</p>
              <button onClick={handleUpload} disabled={isLoading}>
                {isLoading ? "Lädt hoch..." : "Hochladen"}
              </button>
            </div>
          )}
        </div>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default BackgroundImageUpload;
