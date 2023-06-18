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
        <li>Geben Sie einen Titel und eine Beschreibung für Ihr Quiz ein.</li>
        <li>Klicken Sie auf "Erstellen", um das Quiz zu speichern.</li>
      </ol>

      <h3 className="handbuch-section-title">Quiz bearbeiten</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard das Quiz aus, das Sie bearbeiten
          möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Quiz bearbeiten".</li>
        <li>Nehmen Sie die gewünschten Änderungen vor.</li>
        <li>Klicken Sie auf "Änderungen speichern".</li>
      </ol>

      <h3 className="handbuch-section-title">Quiz löschen</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard das Quiz aus, das Sie löschen möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Quiz löschen".</li>
        <li>Bestätigen Sie die Löschung.</li>
      </ol>

      <h3 className="handbuch-section-title">Ein Quiz "live" schalten</h3>
      <p className="handbuch-text">
        Ein Quiz wird automatisch "live" geschaltet, sobald Sie es erstellt
        haben und es mindestens eine Frage mit mindestens einer als korrekt
        markierten Antwort gibt. Benutzer können das Quiz sehen und daran
        teilnehmen. Wenn Sie Änderungen an einem Quiz vornehmen, werden diese
        sofort wirksam und sind für die Benutzer sichtbar.
      </p>

      <h3 className="handbuch-section-title">Frage erstellen</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard das Quiz aus, für das Sie eine Frage
          erstellen möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Frage erstellen".</li>
        <li>
          Geben Sie den Text und die Antwortoptionen für die Frage ein.
          Markieren Sie die richtige Antwort.
        </li>
        <li>Klicken Sie auf "Erstellen", um die Frage zu speichern.</li>
      </ol>

      <h3 className="handbuch-section-title">Frage bearbeiten</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard die Frage aus, die Sie bearbeiten
          möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Frage bearbeiten".</li>
        <li>
          Nehmen Sie die gewünschten Änderungen vor, einschließlich der
          Markierung der richtigen Antwort.
        </li>
        <li>Klicken Sie auf "Änderungen speichern".</li>
      </ol>

      <h3 className="handbuch-section-title">Frage löschen</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard die Frage aus, die Sie löschen möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Frage löschen".</li>
        <li>Bestätigen Sie die Löschung.</li>
      </ol>

      <h3 className="handbuch-section-title">Antwort erstellen</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard die Frage aus, für die Sie eine Antwort
          erstellen möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Antwort erstellen".</li>
        <li>Geben Sie den Text der Antwort ein.</li>
        <li>
          Um die Antwort als die richtige Antwort zu markieren, klicken Sie auf
          das Kontrollkästchen "Diese Antwort ist korrekt".
        </li>
        <li>Klicken Sie auf "Erstellen", um die Antwort zu speichern.</li>
      </ol>

      <h3 className="handbuch-section-title">Antwort bearbeiten</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard die Antwort aus, die Sie bearbeiten
          möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Antwort bearbeiten".</li>
        <li>Nehmen Sie die gewünschten Änderungen am Text der Antwort vor.</li>
        <li>
          Um die Antwort als die richtige Antwort zu markieren, klicken Sie auf
          das Kontrollkästchen "Diese Antwort ist korrekt". Sie können die
          Markierung auch entfernen, indem Sie das Kontrollkästchen
          deaktivieren.
        </li>
        <li>Klicken Sie auf "Änderungen speichern".</li>
      </ol>

      <h3 className="handbuch-section-title">Antwort löschen</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard die Antwort aus, die Sie löschen
          möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Antwort löschen".</li>
        <li>Bestätigen Sie die Löschung.</li>
      </ol>

      <h3 className="handbuch-section-title">
        Eine Farbe für das Quiz festlegen
      </h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard das Quiz aus, für das Sie eine Farbe
          festlegen möchten.
        </li>
        <li>
          Wählen Sie eine Hauptfarbe aus dem Farbwähler aus. Diese Farbe wird
          als Hauptfarbe für das Quiz verwendet und beeinflusst die Farbgebung
          des gesamten Quiz, einschließlich der Hintergrundfarben und
          Schriftfarben.
        </li>
        <li>Klicken Sie auf "Änderungen speichern".</li>
      </ol>
      <p className="handbuch-text">
        Die Farbeinstellungen in dieser App sind dynamisch und passen sich
        automatisch an die von Ihnen gewählte Hauptfarbe an. Dabei wird auch die
        Lesbarkeit der Texte sichergestellt.
      </p>

      <h3 className="handbuch-section-title">Quiz Datenanalyse</h3>
      <ol className="handbuch-text">
        <li>
          Wählen Sie im Admin-Dashboard das Quiz aus, dessen Daten Sie
          analysieren möchten.
        </li>
        <li>Klicken Sie auf die Schaltfläche "Quiz Datenanalyse".</li>
        <li>
          Sie können nun verschiedene statistische Daten zum Quiz einsehen, wie
          zum Beispiel die Anzahl der Teilnahmen, die durchschnittliche
          Punktzahl, die Anzahl der richtigen und falschen Antworten pro Frage
          und vieles mehr. Diese Daten werden automatisch erfasst und
          aktualisiert.
        </li>
      </ol>

      <button className="handbuch-close-button" onClick={handleHandbuchClose}>
        Schließen
      </button>
    </div>
  );
};

export default Handbuch;
