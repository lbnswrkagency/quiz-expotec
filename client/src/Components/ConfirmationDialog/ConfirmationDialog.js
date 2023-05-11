import React from "react";

const ConfirmationDialog = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="confirmation-dialog">
      <div className="confirmation-dialog-content">
        <p>Are you sure you want to delete this Quiz?</p>
        <div className="confirmation-dialog-actions">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
