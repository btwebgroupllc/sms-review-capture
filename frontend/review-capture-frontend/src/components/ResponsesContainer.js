import React from "react";
import "../styles/ResponseContainer.css";

function ResponsesContainer() {
  return (
    <div className="responses-container">
      <div className="response text-content">
        <input placeholder="Please enter what you would like the text to say..." />
      </div>
      <div className="response response-1">
        <input placeholder="Please enter what you would like the text to say..." />
      </div>
      <div className="response response-2">
        <input placeholder="Please enter what you would like the text to say..." />
      </div>
      <div className="response response-3">
        <input placeholder="Please enter what you would like the text to say..." />
      </div>
    </div>
  );
}

export default ResponsesContainer;
