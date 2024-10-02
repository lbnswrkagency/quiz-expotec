// Handbuch.js

import React from "react";
import "./Handbuch.scss";

const Handbuch = ({ handleHandbuchClose }) => {
  return (
    <div className="handbuch-modal-content">
      <h2 className="handbuch-title">Handbuch</h2>

      <h3 className="handbuch-section-title">Quiz erstellen</h3>
      <ol className="handbuch-text">
        <li>Loggen Sie sich im Admin-Dashboard ein.</li>
        <li>Klicken Sie auf die Schaltfläche "Quiz erstellen".</li>
        <li>Geben Sie einen Titel für Ihr Quiz ein.</li>
        <li>Klicken Sie auf "Speichern", um das Quiz zu erstellen.</li>
      </ol>

      <h3 className="handbuch-section-title">Quiz bearbeiten</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard das Quiz aus, das Sie bearbeiten
          möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Quiz bearbeiten".</li>
        <li>Nehmen Sie die gewünschten Änderungen vor.</li>
        <li>Klicken Sie auf "Speichern", um die Änderungen zu übernehmen.</li>
      </ol>

      <h3 className="handbuch-section-title">Quiz löschen</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard das Quiz aus, das Sie löschen möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Quiz löschen".</li>
        <li>Bestätigen Sie die Löschung im Bestätigungsdialog.</li>
      </ol>

      <h3 className="handbuch-section-title">Ein Quiz "live" schalten</h3>
      <p className="handbuch-text">
        Ein Quiz wird automatisch "live" geschaltet, sobald es mindestens eine
        Frage mit mindestens einer als korrekt markierten Antwort enthält.
        Benutzer können das Quiz sehen und daran teilnehmen. Änderungen an einem
        Quiz werden sofort wirksam und sind für die Benutzer sichtbar.
      </p>

      <h3 className="handbuch-section-title">Frage erstellen</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard das Quiz aus, für das Sie eine Frage
          erstellen möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Frage hinzufügen".</li>
        <li>Geben Sie den Text der Frage ein.</li>
        <li>Klicken Sie auf "Speichern", um die Frage zu erstellen.</li>
      </ol>

      <h3 className="handbuch-section-title">Frage bearbeiten</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard die Frage aus, die Sie bearbeiten
          möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Frage bearbeiten".</li>
        <li>Nehmen Sie die gewünschten Änderungen vor.</li>
        <li>Klicken Sie auf "Speichern", um die Änderungen zu übernehmen.</li>
      </ol>

      <h3 className="handbuch-section-title">Frage löschen</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard die Frage aus, die Sie löschen möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Frage löschen".</li>
        <li>Bestätigen Sie die Löschung im Bestätigungsdialog.</li>
      </ol>

      <h3 className="handbuch-section-title">Antwort erstellen</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard die Frage aus, für die Sie eine Antwort
          erstellen möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Antwort hinzufügen".</li>
        <li>Geben Sie den Text der Antwort ein.</li>
        <li>
          Um die Antwort als korrekt zu markieren, aktivieren Sie das
          Kontrollkästchen "Diese Antwort ist korrekt".
        </li>
        <li>Klicken Sie auf "Speichern", um die Antwort zu erstellen.</li>
      </ol>

      <h3 className="handbuch-section-title">Antwort bearbeiten</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard die Antwort aus, die Sie bearbeiten
          möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Antwort bearbeiten".</li>
        <li>Nehmen Sie die gewünschten Änderungen vor.</li>
        <li>
          Sie können die Antwort als korrekt markieren oder die Markierung
          entfernen, indem Sie das Kontrollkästchen "Diese Antwort ist korrekt"
          entsprechend anpassen.
        </li>
        <li>Klicken Sie auf "Speichern", um die Änderungen zu übernehmen.</li>
      </ol>

      <h3 className="handbuch-section-title">Antwort löschen</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard die Antwort aus, die Sie löschen
          möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Antwort löschen".</li>
        <li>Bestätigen Sie die Löschung im Bestätigungsdialog.</li>
      </ol>

      <h3 className="handbuch-section-title">Farbe für das Quiz festlegen</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard das Quiz aus, für das Sie eine Farbe
          festlegen möchten.
        </li>
        <li>
          Klicken Sie auf den Farbwähler und wählen Sie die gewünschte
          Hauptfarbe aus.
        </li>
        <li>
          Die Farbeinstellungen passen sich automatisch an die gewählte
          Hauptfarbe an und sorgen für optimale Lesbarkeit.
        </li>
      </ol>

      <h3 className="handbuch-section-title">Quiz-Datenanalyse</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard das Quiz aus, dessen Daten Sie
          analysieren möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Quiz-Datenanalyse".</li>
        <li>
          Sie erhalten Einblicke in statistische Daten wie die Anzahl der
          Teilnehmer, durchschnittliche Punktzahlen und Antwortverhalten.
        </li>
      </ol>

      <h3 className="handbuch-section-title">Hintergrundbild hochladen</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard das Quiz aus, dem Sie ein
          Hintergrundbild hinzufügen möchten.
        </li>
        <li>
          Klicken Sie auf die Schaltfläche "Hintergrundbild hochladen" oder
          "Bild ersetzen", wenn bereits ein Bild vorhanden ist.
        </li>
        <li>
          Wählen Sie eine Bilddatei im JPEG- oder PNG-Format von Ihrem Computer
          aus. Achten Sie darauf, dass die Datei nicht größer als{" "}
          <strong>2 MB</strong> ist und eine empfohlene Auflösung von{" "}
          <strong>1920x1080 Pixel</strong> hat.
        </li>
        <li>Klicken Sie auf "Hochladen", um das Bild zu speichern.</li>
        <li>
          Das Hintergrundbild wird nun im Quiz angezeigt und verbessert die
          visuelle Darstellung.
        </li>
      </ol>

      <h3 className="handbuch-section-title">Kampagnen-Logo hochladen</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard das Quiz aus, dem Sie ein Kampagnen-Logo
          hinzufügen möchten.
        </li>
        <li>
          Klicken Sie auf die Schaltfläche "Kampagnen-Logo hochladen" oder "Logo
          ersetzen", wenn bereits ein Logo vorhanden ist.
        </li>
        <li>
          Wählen Sie eine Bilddatei im JPEG- oder PNG-Format von Ihrem Computer
          aus. Achten Sie darauf, dass die Datei nicht größer als{" "}
          <strong>2 MB</strong> ist und eine empfohlene Größe von{" "}
          <strong>maximal 500x500 Pixel</strong> hat.
        </li>
        <li>Klicken Sie auf "Hochladen", um das Logo zu speichern.</li>
      </ol>

      <h3 className="handbuch-section-title">
        Position des Kampagnen-Logos festlegen
      </h3>
      <ol className="handbuch-text">
        <li>
          Nachdem Sie ein Kampagnen-Logo hochgeladen haben, erscheinen
          Auswahlfelder für die Positionierung.
        </li>
        <li>
          Wählen Sie die gewünschte Position des Logos auf dem Bildschirm, z.B.
          "Oben-Mitte", "Unten-Rechts" etc.
        </li>
        <li>
          Die Position des Logos wird automatisch gespeichert und im Quiz
          entsprechend angezeigt.
        </li>
      </ol>

      <p className="handbuch-text">
        Hinweis: Die Logos und Hintergrundbilder werden automatisch skaliert, um
        auf verschiedenen Geräten optimal dargestellt zu werden.
      </p>

      <button className="handbuch-close-button" onClick={handleHandbuchClose}>
        Schließen
      </button>
    </div>
  );
};

export default Handbuch;
