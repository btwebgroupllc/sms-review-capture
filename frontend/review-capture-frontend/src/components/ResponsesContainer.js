import React, { useContext, useState } from "react";
import "../styles/ResponseContainer.css";
import ResponseContext from "../contexts/ResponseContext";

function ResponsesContainer() {
  const { text, setText } = useContext(ResponseContext);
  const [responseStrings, setResponseStrings] = useState({
    1: "",
    2: "",
    3: "",
  });
  const [responseLinks, setResponseLinks] = useState({
    1: "",
    2: "",
    3: "",
  });
  return (
    <div className="responses-container">
      <div className="response text-content">
        <h4>What would you like the text to say?</h4>
        <textarea
          placeholder="Input text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="response response-1">
        <h4>Response 1</h4>
        <input placeholder="Response String..." />
        <textarea
          placeholder="Input text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="response response-2">
        <h4>Response 2</h4>
        <input placeholder="Response String..." />
        <textarea
          placeholder="Input text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="response response-3">
        <h4>Response 3</h4>
        <input placeholder="Response String..." />
        <textarea
          placeholder="Input text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
}

export default ResponsesContainer;
