import React, { useState } from "react";
import axios from "axios";
import { Button, Upload, message, Spin, Alert } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const LogoUpload = ({ global, quizId, setRefetch, refetch, text }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const beforeUpload = (file) => {
    const fileSizeInMB = file.size / (1024 * 1024);
    const validFileTypes = ["image/jpeg", "image/png"];
    const isValidFileType = validFileTypes.includes(file.type);

    if (!isValidFileType) {
      setErrorMessage(
        "Invalid file type. Only jpeg and png files are allowed."
      );
    } else if (fileSizeInMB > 2) {
      setErrorMessage("File size exceeds limit of 2MB.");
    } else {
      setErrorMessage("");
      setSelectedFile(file);
    }

    return false; // prevent auto uploading
  };

  // Function to send the base64 string to your backend
  const sendBase64ToServer = async (base64String, mimeType) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://quiz-mxtc.onrender.com/api/logo",
        {
          base64String,
          mimeType,
          quizId,
          global,
        }
      );

      if (response.status === 200) {
        setAlertOpen(true);
        setSelectedFile(null);
        setRefetch(!refetch);
      }
    } catch (error) {
      console.error("Error sending the logo to the server:", error);
      setErrorMessage("Error sending the logo to the server");
    }
    setIsLoading(false);
  };

  const handleUploadButton = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // We will send this base64 string to the backend
      sendBase64ToServer(reader.result, selectedFile.type); // passing mimeType
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="logo-upload">
      <Upload beforeUpload={beforeUpload} maxCount={1} showUploadList={false}>
        <Button icon={<UploadOutlined />}>{text}</Button>
      </Upload>
      {selectedFile && !isLoading && (
        <Button onClick={handleUploadButton} type="primary">
          Hochladen
        </Button>
      )}
      {isLoading && <Spin />}
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      {errorMessage && (
        <Alert message={errorMessage} type="error" showIcon closable />
      )}
      {alertOpen && (
        <Alert
          message="Success"
          description="Logo uploaded successfully!"
          type="success"
          showIcon
          closable
          onClose={() => setAlertOpen(false)}
        />
      )}
    </div>
  );
};

export default LogoUpload;
