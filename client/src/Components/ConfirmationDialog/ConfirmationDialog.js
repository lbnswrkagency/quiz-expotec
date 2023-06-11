import React from "react";
import "./ConfirmationDialog.scss";

const ConfirmationDialog = ({ show, onConfirm, onCancel, content }) => {
  if (!show) return null;

  return (
    <div className="confirmation-dialog">
      <div className="confirmation-dialog-content">
        <p>Sicher das du {content} löschen willst?</p>
        <div className="confirmation-dialog-actions">
          <button onClick={onConfirm}>Ja</button>
          <button onClick={onCancel}>Nein</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
