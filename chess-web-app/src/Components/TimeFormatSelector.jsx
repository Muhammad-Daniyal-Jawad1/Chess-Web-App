// TimeFormatSelector.js
import React from "react";
import "../css/TimeFormatSelector.scss"; // Create a separate SCSS file for styling

function TimeFormatSelector({ onSelectFormat }) {
  const handleFormatSelect = (format) => {
    onSelectFormat(format);
  };

  return (
    <div className="time-format-selector">
      <h2>Choose Time Format:</h2>
      <div className="format-buttons">
        <button onClick={() => handleFormatSelect("Classical")}>
          Classical (30 + 10)
        </button>
        <button onClick={() => handleFormatSelect("Rapid")}>Rapid (10 + 15)</button>
        <button onClick={() => handleFormatSelect("Blitz")}>Blitz (5 + 3)</button>
      </div>
      <p className="info-text">
        Select the time format for your chess game. Classical provides more
        time for each move, while Rapid and Blitz are faster-paced.
      </p>
    </div>
  );
}

export default TimeFormatSelector;