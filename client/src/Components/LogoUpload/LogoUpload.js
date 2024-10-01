// src/Components/LogoUpload/LogoUpload.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LogoUpload.scss";

const LogoUpload = ({ global, quizId, setRefetch, refetch, text, type }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [logoData, setLogoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [position, setPosition] = useState("center");

  // Mapping of positions to coordinates
  const positionMap = {
    "oben-links": { x: 10, y: 10 },
    "oben-mitte": { x: 50, y: 10 },
    "oben-rechts": { x: 90, y: 10 },
    "mitte-links": { x: 10, y: 50 },
    center: { x: 50, y: 50 },
    "mitte-rechts": { x: 90, y: 50 },
    "unten-links": { x: 10, y: 90 },
    "unten-mitte": { x: 50, y: 90 },
    "unten-rechts": { x: 90, y: 90 },
  };

  useEffect(() => {
    // Fetch existing logo data
    const fetchLogoData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/logo/${quizId}/${type}`
        );
        if (response.status === 200) {
          setLogoData(response.data);
          if (type === "kampagnen") {
            // Map existing coordinates back to position
            const existingPosition = Object.keys(positionMap).find((key) => {
              const pos = positionMap[key];
              return (
                pos.x === response.data.positionX &&
                pos.y === response.data.positionY
              );
            });
            setPosition(existingPosition || "center");
          }
        } else {
          setLogoData(null);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setLogoData(null);
        } else {
          console.error("Error fetching logo data:", error);
        }
      }
    };

    fetchLogoData();
  }, [quizId, type, refetch]);

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

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const payload = {
          base64String: reader.result,
          mimeType: selectedFile.type,
          quizId,
          global,
          type,
        };

        if (type === "kampagnen") {
          const { x, y } = positionMap[position];
          payload.positionX = x;
          payload.positionY = y;
        }

        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/logo`,
          payload
        );

        if (response.status === 200) {
          setSelectedFile(null);
          setRefetch(!refetch);
        }
      } catch (error) {
        console.error("Error uploading logo:", error);
        setErrorMessage("Fehler beim Hochladen des Logos.");
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/logo/${logoData._id}`
      );
      setLogoData(null);
      setRefetch(!refetch);
    } catch (error) {
      console.error("Error deleting logo:", error);
      setErrorMessage("Fehler beim Löschen des Logos.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePositionSelect = async (pos) => {
    setPosition(pos);

    if (logoData && !selectedFile) {
      const { x, y } = positionMap[pos];
      try {
        setIsLoading(true);
        const response = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/logo/${logoData._id}/position`,
          {
            positionX: x,
            positionY: y,
          }
        );

        if (response.status === 200) {
          setLogoData({
            ...logoData,
            positionX: x,
            positionY: y,
          });
          setRefetch(!refetch);
        }
      } catch (error) {
        console.error("Error updating logo position:", error);
        setErrorMessage("Fehler beim Aktualisieren der Position.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="logo-upload">
      {logoData ? (
        <div className="logo-preview">
          <img src={logoData.base64String} alt="Logo Vorschau" />
          <div className="logo-buttons">
            <label className="upload-button">
              {text || "Logo ersetzen"}
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
            </label>
            <button onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Lösche..." : "Logo löschen"}
            </button>
          </div>
          {type === "kampagnen" && (
            <div className="position-selector">
              <p>Position des Logos auswählen:</p>
              <div className="position-grid">
                {Object.keys(positionMap).map((pos) => (
                  <button
                    key={pos}
                    className={`position-button ${
                      position === pos ? "selected" : ""
                    }`}
                    onClick={() => handlePositionSelect(pos)}
                    disabled={isLoading}
                  >
                    {pos.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
          )}
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
        <div className="logo-upload-new">
          <label className="upload-button">
            {text || "Logo hochladen"}
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

export default LogoUpload;
